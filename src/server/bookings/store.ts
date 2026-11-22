import { randomBytes } from "node:crypto";
import { ObjectId, type ClientSession, type TransactionOptions } from "mongodb";
import type { DriverDetails } from "@/lib/booking/driverSchema";
import type { Role } from "../auth/schemas";
import type { Mailer } from "../auth/store";
import { DEFAULT_POLICY, unitAvailability, type Reservation, type ReservationSource, type UnavailableReason } from "../availability/engine";
import { checkAvailability } from "../availability/service";
import { CATALOGUE_COLLECTIONS } from "../catalogue/collections";
import { readPublicExtras, readPublicLocations, readPublicVehicles } from "../catalogue/read";
import type { PublicLocation, PublicVehicle } from "../catalogue/public";
import { blocksOf, unitsOf, type FleetContext, type UnitDoc } from "../fleet/store";
import { AppError } from "../http/errors";
import { BOOKING_COLLECTIONS, type BookingCollectionNames } from "./collections";
import { sendBookingEmail, type BookingEmail, type EmailOutcome } from "./notify";
import { bookingPolicy, type BookingPolicy } from "./policy";
import { priceBooking, type PriceSnapshot } from "./pricing";
import type { CreateBookingInput, TripInput } from "./schemas";
import { BLOCKING_STATUSES, canMove, type BookingStatus } from "./statuses";
import { instantToZoned, zonedToInstant } from "./time";
import { requestProblems } from "../availability/engine";

/**
 * The booking engine (M7). No Next.js imports: Route Handlers wrap it; integration tests run it against
 * run-scoped collections on halden_test.
 *
 * Overselling is prevented with MongoDB transactions: every transaction that can occupy or move a car
 * first writes that car's `bookingLocks` document, then re-reads the car's bookings and blocks and asks
 * the availability engine. Two transactions after the same car write the same lock document, so MongoDB
 * aborts one with a write conflict; `withTransaction` retries it, and the retry sees the winner's
 * booking. A failed attempt leaves nothing behind (the transaction is rolled back as a whole).
 */

export type Actor = { id: ObjectId; role: Role };
type HistoryEntry = { at: Date; action: string; byRole: Role | "system"; by: ObjectId | null; note?: string };
export type BookingDoc = {
  _id: ObjectId;
  reference: string;
  customerId: ObjectId;
  status: BookingStatus;
  modelSlug: string;
  unitId: ObjectId | null;
  pickupLocationCode: string;
  returnLocationCode: string;
  pickupAt: Date;
  returnAt: Date;
  price: PriceSnapshot;
  driver: Omit<DriverDetails, "notes"> & { notes?: string };
  vehicle: { name: string };
  idempotencyKey?: string;
  holdExpiresAt: Date | null;
  confirmedAt?: Date;
  cancelledAt?: Date;
  cancellation?: { byRole: Role | "system"; by: ObjectId | null; reason?: string };
  expiredAt?: Date;
  checkedOutAt?: Date;
  returnedAt?: Date;
  mileageOutKm?: number;
  mileageInKm?: number;
  staffNotes?: { at: Date; by: ObjectId; note: string }[];
  history: HistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
};

export type BookingContext = FleetContext & {
  startSession: () => ClientSession;
  catalogueNames?: { locations: string; vehicleModels: string; extras: string };
  bookingNames?: BookingCollectionNames;
  policy?: BookingPolicy;
  mailer?: Mailer | null;
};

const TX: TransactionOptions = { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" }, readPreference: "primary" };
const now = (ctx: BookingContext) => (ctx.now ? ctx.now() : new Date());
const policyOf = (ctx: BookingContext) => ctx.policy ?? bookingPolicy();
const names = (ctx: BookingContext) => ctx.bookingNames ?? BOOKING_COLLECTIONS;
const catalogueNames = (ctx: BookingContext) => ctx.catalogueNames ?? CATALOGUE_COLLECTIONS;
export const bookingsOf = (ctx: BookingContext) => ctx.db.collection<BookingDoc>(names(ctx).bookings);
const locksOf = (ctx: BookingContext) => ctx.db.collection<{ _id: ObjectId; seq: number; at: Date }>(names(ctx).bookingLocks);
const history = (action: string, actor: Actor | "system", at: Date, note?: string): HistoryEntry => ({
  at,
  action,
  byRole: actor === "system" ? "system" : actor.role,
  by: actor === "system" ? null : actor.id,
  ...(note ? { note } : {}),
});

async function inTransaction<T>(ctx: BookingContext, fn: (session: ClientSession) => Promise<T>): Promise<T> {
  const session = ctx.startSession();
  try {
    return await session.withTransaction(fn, TX);
  } finally {
    await session.endSession();
  }
}

/** Serialise every transaction that touches these cars (see the module comment). */
async function lockUnits(ctx: BookingContext, unitIds: ObjectId[], session: ClientSession) {
  const at = now(ctx);
  for (const _id of [...unitIds].sort((a, b) => a.toHexString().localeCompare(b.toHexString()))) {
    try {
      await locksOf(ctx).updateOne({ _id }, { $inc: { seq: 1 }, $set: { at } }, { upsert: true, session });
    } catch (err) {
      // two first-ever upserts of the same lock can collide on _id instead of conflicting: retry like a conflict
      const e = err as { code?: number; addErrorLabel?: (label: string) => void };
      if (e.code === 11000 && e.addErrorLabel) e.addErrorLabel("TransientTransactionError");
      throw err;
    }
  }
}

// ---- reservation source for the M6 availability engine ------------------------------------------------
/**
 * Bookings that occupy cars: held (until the hold expires), confirmed, and checked out — a checked-out
 * rental lasts at least until now, so an overdue car stays busy until it is checked in, never forever
 * after. A booking completed within the last turnaround period still counts until its actual return, so
 * the car gets its preparation time; older completed bookings are not needed (check-in moved the car).
 */
export function bookingReservations(ctx: BookingContext, opts: { session?: ClientSession; exclude?: ObjectId } = {}): ReservationSource {
  return {
    async forUnits(unitIds, _window, policy) {
      const at = now(ctx);
      const docs = await bookingsOf(ctx)
        .find(
          {
            unitId: { $in: unitIds.map((id) => new ObjectId(id)) },
            $or: [{ status: { $in: [...BLOCKING_STATUSES] } }, { status: "completed", returnedAt: { $gt: new Date(at.getTime() - policy.turnaroundMs) } }],
            ...(opts.exclude ? { _id: { $ne: opts.exclude } } : {}),
          },
          { session: opts.session },
        )
        .toArray();
      return docs
        .filter((b) => b.status !== "held" || (b.holdExpiresAt && b.holdExpiresAt > at))
        .map(
          (b): Reservation => ({
            id: b._id.toHexString(),
            unitId: b.unitId!.toHexString(),
            start: b.pickupAt,
            end: b.status === "completed" ? b.returnedAt! : b.status === "checked_out" && b.returnAt < at ? at : b.returnAt,
            pickupLocationCode: b.pickupLocationCode,
            returnLocationCode: b.returnLocationCode,
            active: b.status === "checked_out",
          }),
        );
    },
  };
}

/** Holds past their expiry become `expired` (also implied everywhere by the expiry check itself). */
export async function expireHolds(ctx: BookingContext): Promise<number> {
  const at = now(ctx);
  const res = await bookingsOf(ctx).updateMany(
    { status: "held", holdExpiresAt: { $lte: at } },
    { $set: { status: "expired", expiredAt: at, holdExpiresAt: null, updatedAt: at }, $push: { history: history("expired", "system", at) } },
  );
  return res.modifiedCount;
}

// ---- trip resolution and quotes ----------------------------------------------------------------------
export type ResolvedTrip = { vehicle: PublicVehicle; pickup: PublicLocation; returnHub: PublicLocation; start: Date; end: Date; price: PriceSnapshot };

const invalid = (path: string, message: string) => new AppError("VALIDATION_FAILED", "The request is invalid.", { details: [{ path, message }] });

export async function resolveTrip(ctx: BookingContext, input: TripInput): Promise<ResolvedTrip> {
  const cat = { ...catalogueNames(ctx), extras: catalogueNames(ctx).extras };
  const [vehicles, extras, locations] = await Promise.all([readPublicVehicles(ctx.db, cat), readPublicExtras(ctx.db, cat), readPublicLocations(ctx.db, cat)]);
  const vehicle = vehicles.find((v) => v.slug === input.model);
  if (!vehicle) throw new AppError("NOT_FOUND", "No such vehicle model.");
  const pickup = locations.find((l) => l.code === input.pickup);
  const returnHub = locations.find((l) => l.code === (input.return ?? input.pickup));
  if (!pickup) throw invalid("pickup", "no such active hub");
  if (!returnHub) throw invalid("return", "no such active hub");
  const start = zonedToInstant(input.from, pickup.timezone);
  const end = zonedToInstant(input.to, returnHub.timezone);
  if (!start) throw invalid("from", "this time does not exist at the pick-up hub (clock change)");
  if (!end) throw invalid("to", "this time does not exist at the return hub (clock change)");
  const problems = requestProblems({ start, end }, now(ctx));
  const text: Record<string, [string, string]> = {
    ends_before_start: ["to", "must be after the pick-up time"],
    too_short: ["to", "a rental lasts at least one hour"],
    too_long: ["to", "a rental lasts at most 90 days"],
    starts_in_past: ["from", "must not be in the past"],
  };
  if (problems.length) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: problems.map((p) => ({ path: text[p][0], message: text[p][1] })) });
  const price = priceBooking({ vehicle, extras, selected: input.extras, start, end, pickup: pickup.code, return: returnHub.code }, policyOf(ctx));
  return { vehicle, pickup, returnHub, start, end, price };
}

export type Quote = { available: boolean; start: Date; end: Date; price: PriceSnapshot };

/** Price and availability for a trip. No side effects (nothing is reserved). */
export async function quoteTrip(ctx: BookingContext, input: TripInput): Promise<Quote> {
  const trip = await resolveTrip(ctx, input);
  const availability = await checkAvailability(
    ctx,
    { modelSlug: trip.vehicle.slug, pickupLocationCode: trip.pickup.code, returnLocationCode: trip.returnHub.code, start: trip.start, end: trip.end },
    { reservations: bookingReservations(ctx) },
  );
  return { available: availability.available, start: trip.start, end: trip.end, price: trip.price };
}

// ---- holds -----------------------------------------------------------------------------------------
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function newReference(at: Date): string {
  const mmdd = `${String(at.getUTCMonth() + 1).padStart(2, "0")}${String(at.getUTCDate()).padStart(2, "0")}`;
  return `HLD-${mmdd}-${Array.from(randomBytes(4), (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("")}`;
}

export const UNAVAILABLE_MESSAGE = "This car is no longer available for these dates. Choose other dates or another car.";

/**
 * Reserve a car for the customer: validate, price on the server, then — in one transaction — lock every
 * car of the model, re-check availability and insert a held booking for the first free car. Repeating
 * the same request (same idempotency key) returns the existing booking instead of creating another.
 */
export async function createHold(ctx: BookingContext, customer: Actor, input: CreateBookingInput): Promise<{ booking: BookingDoc; replayed: boolean }> {
  const existing = await bookingsOf(ctx).findOne({ customerId: customer.id, idempotencyKey: input.idempotencyKey });
  if (existing) return { booking: existing, replayed: true };

  const trip = await resolveTrip(ctx, input);
  if (trip.price.totalCents !== input.expectedTotalCents)
    throw new AppError("CONFLICT", "The price changed since you reviewed it. Please review the new total.", { details: { reason: "price_changed", totalCents: trip.price.totalCents } });
  const policy = policyOf(ctx);

  for (let attempt = 0; ; attempt++) {
    try {
      const result = await inTransaction(ctx, async (session): Promise<{ doc: BookingDoc; replayed: boolean }> => {
        const at = now(ctx);
        // the same request may have committed while this transaction waited (identical concurrent requests)
        const same = await bookingsOf(ctx).findOne({ customerId: customer.id, idempotencyKey: input.idempotencyKey }, { session });
        if (same) return { doc: same, replayed: true };
        const units = await unitsOf(ctx).find({ modelSlug: trip.vehicle.slug }, { session }).sort({ unitCode: 1 }).toArray();
        if (!units.length) throw new AppError("CONFLICT", UNAVAILABLE_MESSAGE, { details: { reason: "unavailable" } });
        await lockUnits(ctx, units.map((u) => u._id), session);
        const result = await checkAvailability(
          ctx,
          { modelSlug: trip.vehicle.slug, pickupLocationCode: trip.pickup.code, returnLocationCode: trip.returnHub.code, start: trip.start, end: trip.end },
          { reservations: bookingReservations(ctx, { session }), session },
        );
        const free = result.units.find((u) => u.available);
        if (!result.available || !free) throw new AppError("CONFLICT", UNAVAILABLE_MESSAGE, { details: { reason: "unavailable" } });
        const { notes, ...driver } = input.driver;
        const doc: BookingDoc = {
          _id: new ObjectId(),
          reference: newReference(at),
          customerId: customer.id,
          status: "held",
          modelSlug: trip.vehicle.slug,
          unitId: new ObjectId(free.unitId),
          pickupLocationCode: trip.pickup.code,
          returnLocationCode: trip.returnHub.code,
          pickupAt: trip.start,
          returnAt: trip.end,
          price: trip.price,
          driver: { ...driver, ...(notes ? { notes } : {}) },
          vehicle: { name: trip.vehicle.name },
          idempotencyKey: input.idempotencyKey,
          holdExpiresAt: new Date(at.getTime() + policy.holdMs),
          history: [history("held", customer, at)],
          createdAt: at,
          updatedAt: at,
        };
        await bookingsOf(ctx).insertOne(doc, { session });
        return { doc, replayed: false };
      });
      return { booking: result.doc, replayed: result.replayed };
    } catch (err) {
      const e = err as { code?: number; keyPattern?: Record<string, unknown> };
      if (e.code === 11000 && e.keyPattern?.idempotencyKey) {
        const raced = await bookingsOf(ctx).findOne({ customerId: customer.id, idempotencyKey: input.idempotencyKey });
        if (raced) return { booking: raced, replayed: true };
      }
      if (e.code === 11000 && e.keyPattern?.reference && attempt < 3) continue; // reference collided: draw another
      throw err;
    }
  }
}

// ---- lifecycle ----------------------------------------------------------------------------------------
async function load(ctx: BookingContext, reference: string, customerId?: ObjectId): Promise<BookingDoc> {
  const doc = await bookingsOf(ctx).findOne({ reference, ...(customerId ? { customerId } : {}) });
  if (!doc) throw new AppError("NOT_FOUND", "No such booking."); // also for other customers' bookings: nothing is revealed
  return doc;
}

function transitionError(from: BookingStatus, to: BookingStatus): AppError {
  return new AppError("CONFLICT", `A ${from.replace("_", " ")} booking cannot become ${to.replace("_", " ")}.`, { details: { reason: "invalid_transition", from, to } });
}

function emailSummary(ctx: BookingContext, b: BookingDoc, hubs: PublicLocation[]) {
  const hub = (code: string) => hubs.find((h) => h.code === code);
  const p = hub(b.pickupLocationCode);
  const r = hub(b.returnLocationCode);
  return {
    reference: b.reference,
    vehicleName: b.vehicle.name,
    driverFirstName: b.driver.firstName,
    email: b.driver.email,
    pickup: p?.longName ?? b.pickupLocationCode.toUpperCase(),
    returnTo: r?.longName ?? b.returnLocationCode.toUpperCase(),
    pickupLocal: p ? instantToZoned(b.pickupAt, p.timezone) : b.pickupAt.toISOString().slice(0, 16),
    returnLocal: r ? instantToZoned(b.returnAt, r.timezone) : b.returnAt.toISOString().slice(0, 16),
    price: b.price,
  };
}

/** Send a lifecycle email and record honestly whether it went out. Never throws. */
async function notify(ctx: BookingContext, b: BookingDoc, kind: BookingEmail): Promise<EmailOutcome> {
  let outcome: EmailOutcome = "not_configured";
  try {
    const hubs = await readPublicLocations(ctx.db, { ...catalogueNames(ctx) });
    outcome = await sendBookingEmail(ctx.mailer, kind, emailSummary(ctx, b, hubs));
  } catch {
    outcome = "failed";
  }
  await bookingsOf(ctx)
    .updateOne({ _id: b._id }, { $push: { history: history(`email_${kind}_${outcome}`, "system", now(ctx)) } })
    .catch(() => {});
  return outcome;
}

/** Customer confirms their held booking (before the hold lapses). Payment arrives with M10. */
export async function confirmBooking(ctx: BookingContext, reference: string, actor: Actor): Promise<{ booking: BookingDoc; email: EmailOutcome }> {
  const isStaff = actor.role !== "customer";
  const current = await load(ctx, reference, isStaff ? undefined : actor.id);
  if (current.status !== "held") throw transitionError(current.status, "confirmed");
  const at = now(ctx);
  const updated = await bookingsOf(ctx).findOneAndUpdate(
    { _id: current._id, status: "held", holdExpiresAt: { $gt: at } },
    { $set: { status: "confirmed", confirmedAt: at, holdExpiresAt: null, updatedAt: at }, $push: { history: history("confirmed", actor, at) } },
    { returnDocument: "after" },
  );
  if (!updated) {
    await expireHolds(ctx);
    throw new AppError("CONFLICT", "The hold on this car has expired. Please start the reservation again.", { details: { reason: "hold_expired" } });
  }
  return { booking: updated, email: await notify(ctx, updated, "confirmed") };
}

/**
 * Cancel a held or confirmed booking. Customers: their own, until pick-up. Staff/admin: any, until
 * check-out. No refund logic yet — nothing is charged before M10.
 */
export async function cancelBooking(ctx: BookingContext, reference: string, actor: Actor, reason?: string): Promise<{ booking: BookingDoc; email: EmailOutcome }> {
  const isStaff = actor.role !== "customer";
  const current = await load(ctx, reference, isStaff ? undefined : actor.id);
  if (!canMove(current.status, "cancelled")) throw transitionError(current.status, "cancelled");
  const at = now(ctx);
  if (!isStaff && current.pickupAt <= at)
    throw new AppError("CONFLICT", "This booking can no longer be cancelled online; please contact the concierge.", { details: { reason: "past_pickup" } });
  const updated = await bookingsOf(ctx).findOneAndUpdate(
    { _id: current._id, status: { $in: ["held", "confirmed"] } },
    {
      $set: { status: "cancelled", cancelledAt: at, holdExpiresAt: null, cancellation: { byRole: actor.role, by: actor.id, ...(reason ? { reason } : {}) }, updatedAt: at },
      $push: { history: history("cancelled", actor, at, reason) },
    },
    { returnDocument: "after" },
  );
  if (!updated) throw new AppError("CONFLICT", "This booking was changed meanwhile; reload and try again.");
  // a booking that was only on hold was never confirmed to the customer by email, so none is sent now
  return { booking: updated, email: current.status === "confirmed" ? await notify(ctx, updated, "cancelled") : "skipped" };
}

/** Staff: move a held/confirmed booking to another car of the same model that is free for the period. */
export async function assignUnit(ctx: BookingContext, reference: string, unitId: ObjectId, staff: Actor): Promise<BookingDoc> {
  return inTransaction(ctx, async (session) => {
    const b = await bookingsOf(ctx).findOne({ reference }, { session });
    if (!b) throw new AppError("NOT_FOUND", "No such booking.");
    if (b.status !== "held" && b.status !== "confirmed") throw new AppError("CONFLICT", "Only held or confirmed bookings can be reassigned.");
    const unit = await unitsOf(ctx).findOne({ _id: unitId }, { session });
    if (!unit || unit.modelSlug !== b.modelSlug) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: [{ path: "unitId", message: "not a car of this booking's model" }] });
    await lockUnits(ctx, [unitId, ...(b.unitId ? [b.unitId] : [])], session);
    const reasons = await unitReasons(ctx, unit, b, session);
    if (reasons.length) throw new AppError("CONFLICT", "That car is not available for this booking.", { details: { reason: "unavailable", reasons } });
    const at = now(ctx);
    const res = await bookingsOf(ctx).findOneAndUpdate(
      { _id: b._id, status: b.status },
      { $set: { unitId, updatedAt: at }, $push: { history: history("assigned", staff, at, unit.unitCode) } },
      { returnDocument: "after", session },
    );
    if (!res) throw new AppError("CONFLICT", "This booking was changed meanwhile; reload and try again.");
    return res;
  });
}

/** Why `unit` cannot serve booking `b` (ignoring `b` itself). */
async function unitReasons(ctx: BookingContext, unit: UnitDoc, b: BookingDoc, session?: ClientSession): Promise<UnavailableReason[]> {
  const id = unit._id.toHexString();
  const blocks = (await blocksOf(ctx).find({ unitId: unit._id, startsAt: { $lt: b.returnAt }, endsAt: { $gt: b.pickupAt } }, { session }).toArray()).map((x) => ({
    id: x._id.toHexString(),
    unitId: id,
    kind: x.kind,
    start: x.startsAt,
    end: x.endsAt,
  }));
  const reservations = await bookingReservations(ctx, { session, exclude: b._id }).forUnits([id], { start: b.pickupAt, end: b.returnAt }, DEFAULT_POLICY);
  return unitAvailability(
    { id, modelSlug: unit.modelSlug, locationCode: unit.locationCode, status: unit.status },
    { start: b.pickupAt, end: b.returnAt, pickupLocationCode: b.pickupLocationCode, returnLocationCode: b.returnLocationCode },
    blocks,
    reservations,
  ).reasons;
}

/**
 * Staff: hand the car over. The booking must be confirmed and assigned; the car must be in service
 * (`available`) at the pick-up hub; check-out opens a few hours before the booked pick-up.
 */
export async function checkOut(ctx: BookingContext, reference: string, staff: Actor, mileageKm?: number): Promise<BookingDoc> {
  return inTransaction(ctx, async (session) => {
    const at = now(ctx);
    const b = await bookingsOf(ctx).findOne({ reference }, { session });
    if (!b) throw new AppError("NOT_FOUND", "No such booking.");
    if (!canMove(b.status, "checked_out")) throw transitionError(b.status, "checked_out");
    if (!b.unitId) throw new AppError("CONFLICT", "Assign a car before check-out.");
    if (at.getTime() < b.pickupAt.getTime() - policyOf(ctx).checkoutEarlyMs) throw new AppError("CONFLICT", "Check-out opens 6 hours before the booked pick-up.", { details: { reason: "too_early" } });
    if (at >= b.returnAt) throw new AppError("CONFLICT", "The rental period has already ended.", { details: { reason: "too_late" } });
    await lockUnits(ctx, [b.unitId], session);
    const unit = await unitsOf(ctx).findOne({ _id: b.unitId }, { session });
    if (!unit) throw new AppError("CONFLICT", "The assigned car no longer exists; assign another car.");
    if (unit.status !== "available") throw new AppError("CONFLICT", `The assigned car is ${unit.status}; it cannot be handed over.`, { details: { reason: "unit_status", status: unit.status } });
    if (unit.locationCode !== b.pickupLocationCode) throw new AppError("CONFLICT", "The assigned car is not at the pick-up hub.", { details: { reason: "unit_location", at: unit.locationCode } });
    if (mileageKm !== undefined && mileageKm < unit.mileageKm) throw new AppError("CONFLICT", "The odometer reading is below the recorded mileage.", { details: { reason: "mileage" } });
    const unitRes = await unitsOf(ctx).updateOne({ _id: unit._id, status: "available" }, { $set: { status: "rented", ...(mileageKm !== undefined ? { mileageKm } : {}), updatedAt: at } }, { session });
    if (unitRes.modifiedCount !== 1) throw new AppError("CONFLICT", "The car was changed meanwhile; reload and try again.");
    const res = await bookingsOf(ctx).findOneAndUpdate(
      { _id: b._id, status: "confirmed" },
      { $set: { status: "checked_out", checkedOutAt: at, mileageOutKm: mileageKm ?? unit.mileageKm, updatedAt: at }, $push: { history: history("checked_out", staff, at) } },
      { returnDocument: "after", session },
    );
    if (!res) throw new AppError("CONFLICT", "This booking was changed meanwhile; reload and try again.");
    return res;
  });
}

/**
 * Staff: take the car back. The booking completes; the car is now at the RETURN hub (one-way rentals move
 * it) and goes back into service — or to maintenance — with the new odometer reading.
 */
export async function checkIn(ctx: BookingContext, reference: string, staff: Actor, input: { mileageKm: number; needsService: boolean; note?: string }): Promise<BookingDoc> {
  return inTransaction(ctx, async (session) => {
    const at = now(ctx);
    const b = await bookingsOf(ctx).findOne({ reference }, { session });
    if (!b) throw new AppError("NOT_FOUND", "No such booking.");
    if (!canMove(b.status, "completed")) throw transitionError(b.status, "completed");
    await lockUnits(ctx, [b.unitId!], session);
    const unit = await unitsOf(ctx).findOne({ _id: b.unitId! }, { session });
    if (!unit) throw new AppError("CONFLICT", "The rented car no longer exists.");
    if (input.mileageKm < unit.mileageKm) throw new AppError("CONFLICT", "The odometer reading is below the recorded mileage.", { details: { reason: "mileage" } });
    await unitsOf(ctx).updateOne(
      { _id: unit._id },
      { $set: { status: input.needsService ? "maintenance" : "available", locationCode: b.returnLocationCode, mileageKm: input.mileageKm, updatedAt: at } },
      { session },
    );
    const res = await bookingsOf(ctx).findOneAndUpdate(
      { _id: b._id, status: "checked_out" },
      { $set: { status: "completed", returnedAt: at, mileageInKm: input.mileageKm, updatedAt: at }, $push: { history: history("completed", staff, at, input.note) } },
      { returnDocument: "after", session },
    );
    if (!res) throw new AppError("CONFLICT", "This booking was changed meanwhile; reload and try again.");
    return res;
  });
}

/** Staff: every car of the booking's model, with why it could or could not serve this booking. */
export async function assignmentCandidates(ctx: BookingContext, b: BookingDoc): Promise<{ unit: UnitDoc; reasons: UnavailableReason[] }[]> {
  const units = await unitsOf(ctx).find({ modelSlug: b.modelSlug }).sort({ unitCode: 1 }).toArray();
  return Promise.all(units.map(async (unit) => ({ unit, reasons: await unitReasons(ctx, unit, b) })));
}

export async function addStaffNote(ctx: BookingContext, reference: string, staff: Actor, note: string): Promise<BookingDoc> {
  const at = now(ctx);
  const res = await bookingsOf(ctx).findOneAndUpdate({ reference }, { $push: { staffNotes: { at, by: staff.id, note } }, $set: { updatedAt: at } }, { returnDocument: "after" });
  if (!res) throw new AppError("NOT_FOUND", "No such booking.");
  return res;
}

// ---- reads ----------------------------------------------------------------------------------------------
export async function customerBookings(ctx: BookingContext, customerId: ObjectId): Promise<BookingDoc[]> {
  await expireHolds(ctx);
  return bookingsOf(ctx).find({ customerId }).sort({ pickupAt: -1 }).limit(200).toArray();
}

export async function customerBooking(ctx: BookingContext, reference: string, customerId: ObjectId): Promise<BookingDoc> {
  await expireHolds(ctx);
  return load(ctx, reference, customerId);
}

export async function staffBooking(ctx: BookingContext, reference: string): Promise<BookingDoc> {
  await expireHolds(ctx);
  return load(ctx, reference);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export async function staffBookings(ctx: BookingContext, q: { status?: BookingStatus; location?: string; from?: string; to?: string; q?: string }): Promise<BookingDoc[]> {
  await expireHolds(ctx);
  const filter: Record<string, unknown> = {};
  if (q.status) filter.status = q.status;
  if (q.location) filter.$or = [{ pickupLocationCode: q.location }, { returnLocationCode: q.location }];
  if (q.from || q.to)
    filter.pickupAt = { ...(q.from ? { $gte: new Date(`${q.from}T00:00:00Z`) } : {}), ...(q.to ? { $lt: new Date(new Date(`${q.to}T00:00:00Z`).getTime() + 86_400_000) } : {}) };
  if (q.q) {
    const rx = new RegExp(escape(q.q), "i");
    const text = [{ reference: rx }, { "driver.email": rx }, { "driver.lastName": rx }, { "driver.firstName": rx }];
    if (filter.$or) filter.$and = [{ $or: filter.$or }, { $or: text }];
    else filter.$or = text;
    if (filter.$and) delete filter.$or;
  }
  return bookingsOf(ctx).find(filter).sort({ pickupAt: 1 }).limit(500).toArray();
}

/** Upcoming allocation and recent utilisation per car, from real bookings (staff fleet register). */
export async function unitSchedule(ctx: BookingContext, unitIds: ObjectId[], windowDays = 14): Promise<Map<string, { next?: { reference: string; pickupAt: Date }; utilisation: number }>> {
  const at = now(ctx);
  const since = new Date(at.getTime() - windowDays * 86_400_000);
  const docs = await bookingsOf(ctx)
    .find({ unitId: { $in: unitIds }, status: { $in: ["held", "confirmed", "checked_out", "completed"] }, returnAt: { $gt: since } })
    .toArray();
  const out = new Map<string, { next?: { reference: string; pickupAt: Date }; utilisation: number }>();
  for (const id of unitIds) {
    const own = docs.filter((d) => d.unitId?.equals(id) && (d.status !== "held" || (d.holdExpiresAt && d.holdExpiresAt > at)));
    const upcoming = own.filter((d) => d.pickupAt >= at && d.status !== "completed").sort((a, b) => a.pickupAt.getTime() - b.pickupAt.getTime())[0];
    const busyMs = own.reduce((s, d) => {
      const start = Math.max(d.pickupAt.getTime(), since.getTime());
      const end = Math.min((d.returnedAt ?? (d.status === "checked_out" ? at : d.returnAt)).getTime(), at.getTime());
      return s + Math.max(0, end - start);
    }, 0);
    out.set(id.toHexString(), { ...(upcoming ? { next: { reference: upcoming.reference, pickupAt: upcoming.pickupAt } } : {}), utilisation: Math.round((busyMs / (windowDays * 86_400_000)) * 100) });
  }
  return out;
}
