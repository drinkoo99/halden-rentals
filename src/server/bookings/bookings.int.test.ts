import { randomUUID } from "node:crypto";
import { ObjectId } from "mongodb";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Role } from "../auth/schemas";
import { CATALOGUE_COLLECTION_SPECS } from "../catalogue/collections";
import { seedCatalogue } from "../catalogue/seed/apply";
import { catalogueSeedFromStatic } from "../catalogue/seed/fromStatic";
import { ensureCollections } from "../db/collections";
import { isTestDatabase } from "../db/targets";
import { FLEET_COLLECTION_SPECS } from "../fleet/collections";
import { createUnitInput } from "../fleet/schemas";
import { changeStatus, createBlock, createUnit, updateUnit, type UnitDoc } from "../fleet/store";
import { openIntegrationDatabase, type IntegrationDatabase } from "../testing/integrationDb";
import { BOOKING_COLLECTION_SPECS } from "./collections";
import { bookingPolicy } from "./policy";
import type { CreateBookingInput } from "./schemas";
import {
  assignUnit,
  bookingsOf,
  cancelBooking,
  checkIn,
  checkOut,
  confirmBooking,
  createHold,
  customerBooking,
  customerBookings,
  expireHolds,
  quoteTrip,
  staffBookings,
  unitSchedule,
  type BookingContext,
} from "./store";

/**
 * The booking engine against the real test database (halden_test): run-scoped catalogue (real seed),
 * fleet and booking collections with the real validators and indexes, real transactions. Every test uses
 * its own vehicle model or dates so tests stay independent; afterAll drops this run's collections.
 */
let tdb: IntegrationDatabase;
let ctx: BookingContext;
let clock = new Date("2030-06-01T08:00:00Z"); // 10:00 in Munich (CEST)
const actor = (role: Role = "customer") => ({ id: new ObjectId(), role });
const staff = actor("staff");
const driver = { firstName: "Clara", lastName: "Bergmann", email: "clara@example.com", phone: "+41 79 123 4567", dob: "14/08/1980", licenceCountry: "CHE", licenceNumber: "B-84920419", notes: "" };
let plate = 0;
const addCar = (model: string, hub = "muc", over: Record<string, unknown> = {}) =>
  createUnit(ctx, createUnitInput.parse({ modelSlug: model, registration: `T ${++plate}`, locationCode: hub, mileageKm: 1000, year: 2025, ...over }));
const trip = (model: string, from: string, to: string, over: Partial<CreateBookingInput> = {}) => ({ model, pickup: "muc", from, to, extras: {}, ...over });
async function hold(customer: { id: ObjectId; role: Role }, model: string, from: string, to: string, over: Partial<CreateBookingInput> = {}) {
  const t = trip(model, from, to, over);
  const q = await quoteTrip(ctx, { ...t, extras: t.extras ?? {} });
  return createHold(ctx, customer, { ...t, extras: t.extras ?? {}, driver, idempotencyKey: randomUUID(), expectedTotalCents: q.price.totalCents, ...over } as CreateBookingInput);
}
const unitOf = async (id: ObjectId | null) => (await ctx.db.collection<UnitDoc>(ctx.names!.fleetUnits).findOne({ _id: id! }))!;

beforeAll(async () => {
  tdb = await openIntegrationDatabase();
  expect(isTestDatabase(tdb.db.databaseName)).toBe(true);
  const catalogueNames = { locations: tdb.scoped("bklocations"), vehicleModels: tdb.scoped("bkvehicleModels"), extras: tdb.scoped("bkextras") };
  const fleetNames = { fleetUnits: tdb.scoped("bkfleetUnits"), availabilityBlocks: tdb.scoped("bkavailabilityBlocks") };
  const bookingNames = { bookings: tdb.scoped("bookings"), bookingLocks: tdb.scoped("bookingLocks") };
  const scoped: Record<string, string> = { ...catalogueNames, ...fleetNames, ...bookingNames };
  const specs = [...CATALOGUE_COLLECTION_SPECS, ...FLEET_COLLECTION_SPECS, ...BOOKING_COLLECTION_SPECS].map((s) => ({ ...s, name: scoped[s.name] }));
  expect((await ensureCollections(tdb.db, specs, { apply: true })).conflicts).toEqual([]);
  expect((await seedCatalogue(tdb.db, catalogueSeedFromStatic(), { apply: true, names: catalogueNames })).report?.complete).toBe(true);
  ctx = { db: tdb.db, startSession: tdb.startSession, names: fleetNames, catalogueNames, bookingNames, now: () => clock, policy: bookingPolicy({}), mailer: null };
});
afterAll(async () => {
  if (!tdb) return;
  try {
    await tdb.cleanup();
  } finally {
    await tdb.close();
  }
});

describe("quotes", () => {
  it("prices on the server in cents: rate × started days + extras + 19 % VAT, included extras free", async () => {
    await addCar("lexus-lc-500");
    const q = await quoteTrip(ctx, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-13T09:00", { extras: { waiver: 1 } }));
    expect(q.available).toBe(true);
    expect(q.price).toMatchObject({ currency: "EUR", days: 3, dailyRateCents: 37500, rentalCents: 112500, subtotalCents: 126000, vatCents: 23940, totalCents: 149940 });
    expect(q.price.extras.map((e) => [e.code, e.amountCents])).toEqual([["waiver", 13500], ["winter", 0]]);
    expect(q.start.toISOString()).toBe("2030-06-10T08:00:00.000Z"); // 10:00 Munich time (CEST)
  });

  it("rejects unknown extras, quantities above the maximum, past starts and unknown hubs", async () => {
    await expect(quoteTrip(ctx, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-12T10:00", { extras: { jetpack: 1 } }))).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
    await expect(quoteTrip(ctx, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-12T10:00", { extras: { childseat: 3 } }))).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
    await expect(quoteTrip(ctx, trip("lexus-lc-500", "2030-05-30T10:00", "2030-06-02T10:00"))).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
    await expect(quoteTrip(ctx, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-12T10:00", { pickup: "xxx" }))).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
  });

  it("adds the configured one-way fee only for one-way trips (none until the business sets one)", async () => {
    const oneWay = { ...ctx, policy: bookingPolicy({ ONE_WAY_FEE_EUR: "150" }) };
    const same = await quoteTrip(oneWay, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-11T10:00"));
    const diff = await quoteTrip(oneWay, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-11T10:00", { return: "zrh" }));
    expect(same.price.fees).toEqual([]);
    expect(diff.price.fees).toEqual([{ code: "one_way", label: "One-way return fee", amountCents: 15000 }]);
    expect(diff.price.totalCents - same.price.totalCents).toBe(15000 + Math.round(15000 * 0.19));
    expect((await quoteTrip(ctx, trip("lexus-lc-500", "2030-06-10T10:00", "2030-06-11T10:00", { return: "zrh" }))).price.fees).toEqual([]);
  });
});

describe("holds and confirmation", () => {
  it("holds a specific car with an immutable price snapshot, then confirms it", async () => {
    const customer = actor();
    const car = await addCar("porsche-911-carrera");
    const { booking } = await hold(customer, "porsche-911-carrera", "2030-06-10T10:00", "2030-06-12T10:00", { extras: { childseat: 2 } });
    expect(booking).toMatchObject({ status: "held", unitId: car._id, pickupLocationCode: "muc", returnLocationCode: "muc", vehicle: { name: expect.stringContaining("911") } });
    expect(booking.reference).toMatch(/^HLD-0601-[A-Z0-9]{4}$/);
    expect(booking.holdExpiresAt!.getTime() - clock.getTime()).toBe(15 * 60_000);
    const total = booking.price.totalCents;

    // a later catalogue price change does not touch the stored booking
    await ctx.db.collection(ctx.catalogueNames!.vehicleModels).updateOne({ slug: "porsche-911-carrera" }, { $set: { "displayRate.amountCents": 99900 } });
    const { booking: confirmed, email } = await confirmBooking(ctx, booking.reference, customer);
    expect(confirmed).toMatchObject({ status: "confirmed", holdExpiresAt: null });
    expect(confirmed.price.totalCents).toBe(total);
    expect(email).toBe("not_configured");
    expect((await customerBooking(ctx, booking.reference, customer.id)).history.map((h) => h.action)).toEqual(["held", "confirmed", "email_confirmed_not_configured"]);
    await ctx.db.collection(ctx.catalogueNames!.vehicleModels).updateOne({ slug: "porsche-911-carrera" }, { $set: { "displayRate.amountCents": 34000 } });
  });

  it("is idempotent: the same request twice gives one booking", async () => {
    await addCar("bmw-530e-xdrive-m-sport");
    const customer = actor();
    const t = trip("bmw-530e-xdrive-m-sport", "2030-06-10T10:00", "2030-06-12T10:00");
    const q = await quoteTrip(ctx, t);
    const input = { ...t, driver, idempotencyKey: randomUUID(), expectedTotalCents: q.price.totalCents } as CreateBookingInput;
    const [a, b] = await Promise.all([createHold(ctx, customer, input), createHold(ctx, customer, input)]);
    expect(a.booking.reference).toBe(b.booking.reference);
    expect([a.replayed, b.replayed].sort()).toEqual([false, true]);
    expect(await bookingsOf(ctx).countDocuments({ customerId: customer.id })).toBe(1);
  });

  it("refuses when the price changed since the customer reviewed it", async () => {
    await addCar("volvo-xc90-ultimate-b6");
    const t = trip("volvo-xc90-ultimate-b6", "2030-06-10T10:00", "2030-06-12T10:00");
    await expect(createHold(ctx, actor(), { ...t, driver, idempotencyKey: randomUUID(), expectedTotalCents: 1 } as CreateBookingInput)).rejects.toMatchObject({
      code: "CONFLICT",
      details: { reason: "price_changed" },
    });
  });

  it("an expired hold no longer blocks the car and can no longer be confirmed", async () => {
    await addCar("toyota-land-cruiser-gr-s");
    const first = actor();
    const { booking } = await hold(first, "toyota-land-cruiser-gr-s", "2030-06-20T10:00", "2030-06-22T10:00");
    await expect(hold(actor(), "toyota-land-cruiser-gr-s", "2030-06-20T10:00", "2030-06-22T10:00")).rejects.toMatchObject({ code: "CONFLICT", details: { reason: "unavailable" } });
    const before = clock;
    clock = new Date(clock.getTime() + 15 * 60_000);
    await expect(confirmBooking(ctx, booking.reference, first)).rejects.toMatchObject({ details: { reason: "hold_expired" } });
    expect((await customerBooking(ctx, booking.reference, first.id)).status).toBe("expired");
    expect((await hold(actor(), "toyota-land-cruiser-gr-s", "2030-06-20T10:00", "2030-06-22T10:00")).booking.status).toBe("held");
    clock = before;
  });

  it("a cancelled booking releases the car", async () => {
    await addCar("mercedes-benz-s-500-4matic");
    const customer = actor();
    const { booking } = await hold(customer, "mercedes-benz-s-500-4matic", "2030-06-10T10:00", "2030-06-12T10:00");
    await confirmBooking(ctx, booking.reference, customer);
    const { booking: cancelled } = await cancelBooking(ctx, booking.reference, customer, "Change of plans");
    expect(cancelled).toMatchObject({ status: "cancelled", cancellation: { byRole: "customer", reason: "Change of plans" } });
    expect((await hold(actor(), "mercedes-benz-s-500-4matic", "2030-06-10T10:00", "2030-06-12T10:00")).booking.unitId).toEqual(booking.unitId);
    await expect(cancelBooking(ctx, booking.reference, customer)).rejects.toMatchObject({ details: { reason: "invalid_transition" } });
  });
});

describe("concurrency", () => {
  it("one car, five customers at once: exactly one hold, four clean refusals, no duplicates", async () => {
    await addCar("audi-rs6-avant-performance", "gva");
    const attempts = await Promise.allSettled(
      Array.from({ length: 5 }, () => hold(actor(), "audi-rs6-avant-performance", "2030-07-01T10:00", "2030-07-03T10:00", { pickup: "gva" })),
    );
    const ok = attempts.filter((a) => a.status === "fulfilled");
    const refused = attempts.filter((a): a is PromiseRejectedResult => a.status === "rejected");
    expect(ok).toHaveLength(1);
    expect(refused).toHaveLength(4);
    for (const r of refused) expect(r.reason).toMatchObject({ code: "CONFLICT", details: { reason: "unavailable" } });
    expect(await bookingsOf(ctx).countDocuments({ modelSlug: "audi-rs6-avant-performance", status: "held" })).toBe(1);
  });

  it("two cars, six customers at once: exactly two holds, on different cars", async () => {
    await addCar("range-rover-autobiography", "vie");
    await addCar("range-rover-autobiography", "vie");
    const attempts = await Promise.allSettled(
      Array.from({ length: 6 }, () => hold(actor(), "range-rover-autobiography", "2030-07-01T10:00", "2030-07-03T10:00", { pickup: "vie" })),
    );
    const won = attempts.flatMap((a) => (a.status === "fulfilled" ? [a.value.booking] : []));
    expect(won).toHaveLength(2);
    expect(new Set(won.map((b) => b.unitId!.toHexString())).size).toBe(2);
  });
});

describe("availability with bookings", () => {
  it("respects the 2-hour turnaround around existing bookings", async () => {
    await addCar("porsche-911-gt3-touring", "zrh");
    await hold(actor(), "porsche-911-gt3-touring", "2030-08-10T10:00", "2030-08-12T10:00", { pickup: "zrh" });
    const ask = (from: string, to: string) => quoteTrip(ctx, trip("porsche-911-gt3-touring", from, to, { pickup: "zrh" }));
    expect((await ask("2030-08-12T10:00", "2030-08-13T10:00")).available).toBe(false); // exactly at return
    expect((await ask("2030-08-12T11:59", "2030-08-13T10:00")).available).toBe(false);
    expect((await ask("2030-08-12T12:00", "2030-08-13T10:00")).available).toBe(true); // return + 2 h
    expect((await ask("2030-08-09T10:00", "2030-08-10T08:00")).available).toBe(true); // ends 2 h before pick-up
    expect((await ask("2030-08-09T10:00", "2030-08-10T08:01")).available).toBe(false);
  });

  it("follows one-way returns: the car is at the return hub afterwards, and a trip may not strand the next booking", async () => {
    await addCar("porsche-911-carrera-4s", "mxp");
    await hold(actor(), "porsche-911-carrera-4s", "2030-09-10T10:00", "2030-09-12T10:00", { pickup: "mxp", return: "zrh" });
    const ask = (pickup: string, from: string, to: string, ret = pickup) => quoteTrip(ctx, trip("porsche-911-carrera-4s", from, to, { pickup, return: ret }));
    expect((await ask("mxp", "2030-09-15T10:00", "2030-09-16T10:00")).available).toBe(false); // the car is in Zurich now
    expect((await ask("zrh", "2030-09-15T10:00", "2030-09-16T10:00")).available).toBe(true);
    expect((await ask("mxp", "2030-09-05T10:00", "2030-09-06T10:00")).available).toBe(true); // before: back at Milan in time
    expect((await ask("mxp", "2030-09-05T10:00", "2030-09-06T10:00", "gva")).available).toBe(false); // would strand the Milan pick-up
  });

  it("maintenance blocks still apply", async () => {
    const car = await addCar("lexus-lc-500", "gva");
    await createBlock(ctx, car._id, { kind: "maintenance", startsAt: new Date("2030-10-01T00:00:00Z"), endsAt: new Date("2030-10-03T00:00:00Z") }, staff.id);
    expect((await quoteTrip(ctx, trip("lexus-lc-500", "2030-10-02T10:00", "2030-10-04T10:00", { pickup: "gva" }))).available).toBe(false);
  });
});

describe("check-out and check-in", () => {
  it("hands the car over, keeps it busy while overdue, and returns it to the return hub", async () => {
    const car = await addCar("mercedes-benz-s-500-4matic", "zrh");
    const customer = actor();
    const { booking } = await hold(customer, "mercedes-benz-s-500-4matic", "2030-11-10T10:00", "2030-11-12T10:00", { pickup: "zrh", return: "gva" });
    await expect(checkOut(ctx, booking.reference, staff)).rejects.toMatchObject({ details: { reason: "invalid_transition" } }); // still held
    await confirmBooking(ctx, booking.reference, customer);
    await expect(checkOut(ctx, booking.reference, staff)).rejects.toMatchObject({ details: { reason: "too_early" } });

    const before = clock;
    clock = new Date("2030-11-10T08:30:00Z");
    await expect(checkOut(ctx, booking.reference, staff, 10)).rejects.toMatchObject({ details: { reason: "mileage" } });
    const out = await checkOut(ctx, booking.reference, staff, 1200);
    expect(out).toMatchObject({ status: "checked_out", mileageOutKm: 1200 });
    expect(await unitOf(car._id)).toMatchObject({ status: "rented", mileageKm: 1200, locationCode: "zrh" });
    await expect(cancelBooking(ctx, booking.reference, customer)).rejects.toMatchObject({ code: "CONFLICT" });

    // overdue (booked return 10:00 Geneva = 09:00Z): the car counts as busy until now (+ turnaround), not forever
    clock = new Date("2030-11-12T12:00:00Z");
    const ask = (from: string) => quoteTrip(ctx, trip("mercedes-benz-s-500-4matic", from, "2030-11-13T10:00", { pickup: "gva" }));
    expect((await ask("2030-11-12T14:00")).available).toBe(false); // 13:00Z: within now + 2 h
    expect((await ask("2030-11-12T15:00")).available).toBe(true); // 14:00Z: expected back by then

    const done = await checkIn(ctx, booking.reference, staff, { mileageKm: 1650, needsService: false });
    expect(done).toMatchObject({ status: "completed", mileageInKm: 1650 });
    expect(await unitOf(car._id)).toMatchObject({ status: "available", locationCode: "gva", mileageKm: 1650 });
    expect((await ask("2030-11-12T14:00")).available).toBe(false); // returned at 12:00Z: preparation time until 14:00Z
    expect((await ask("2030-11-12T15:00")).available).toBe(true); // 14:00Z at Geneva, its new hub
    clock = before;
  });

  it("will not hand over a car that is out of service", async () => {
    const car = await addCar("bmw-530e-xdrive-m-sport", "vie");
    const customer = actor();
    const { booking } = await hold(customer, "bmw-530e-xdrive-m-sport", "2030-12-01T10:00", "2030-12-02T10:00", { pickup: "vie" });
    await confirmBooking(ctx, booking.reference, customer);
    await changeStatus(ctx, car._id, "maintenance");
    const before = clock;
    clock = new Date("2030-12-01T09:00:00Z");
    await expect(checkOut(ctx, booking.reference, staff)).rejects.toMatchObject({ details: { reason: "unit_status" } });
    clock = before;
  });
});

describe("staff operations and ownership", () => {
  it("reassigns to another free car of the model only", async () => {
    const a = await addCar("volvo-xc90-ultimate-b6", "mxp");
    const b = await addCar("volvo-xc90-ultimate-b6", "mxp");
    const c1 = actor();
    const c2 = actor();
    const first = (await hold(c1, "volvo-xc90-ultimate-b6", "2031-01-10T10:00", "2031-01-12T10:00", { pickup: "mxp" })).booking;
    const second = (await hold(c2, "volvo-xc90-ultimate-b6", "2031-01-10T10:00", "2031-01-12T10:00", { pickup: "mxp" })).booking;
    expect(new Set([first.unitId!.toHexString(), second.unitId!.toHexString()])).toEqual(new Set([a._id.toHexString(), b._id.toHexString()]));
    await expect(assignUnit(ctx, first.reference, second.unitId!, staff)).rejects.toMatchObject({ code: "CONFLICT", details: { reason: "unavailable" } });
    const other = await addCar("volvo-xc90-ultimate-b6", "mxp");
    expect((await assignUnit(ctx, first.reference, other._id, staff)).unitId).toEqual(other._id);
    const foreign = await addCar("lexus-lc-500", "mxp");
    await expect(assignUnit(ctx, first.reference, foreign._id, staff)).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
  });

  it("protects cars with upcoming bookings from being moved or retired", async () => {
    const car = await addCar("toyota-land-cruiser-gr-s", "zrh");
    const customer = actor();
    const { booking } = await hold(customer, "toyota-land-cruiser-gr-s", "2031-02-10T10:00", "2031-02-12T10:00", { pickup: "zrh" });
    await confirmBooking(ctx, booking.reference, customer);
    await expect(updateUnit(ctx, car._id, { locationCode: "gva" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(changeStatus(ctx, car._id, "inactive")).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("customers see only their own bookings; others get 'not found'", async () => {
    await addCar("porsche-911-gt3-touring", "vie");
    const owner = actor();
    const stranger = actor();
    const { booking } = await hold(owner, "porsche-911-gt3-touring", "2031-03-10T10:00", "2031-03-12T10:00", { pickup: "vie" });
    expect((await customerBookings(ctx, owner.id)).map((b) => b.reference)).toEqual([booking.reference]);
    expect(await customerBookings(ctx, stranger.id)).toEqual([]);
    await expect(customerBooking(ctx, booking.reference, stranger.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(cancelBooking(ctx, booking.reference, stranger)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(confirmBooking(ctx, booking.reference, stranger)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("customers cannot cancel after pick-up; staff can cancel any held or confirmed booking", async () => {
    await addCar("lexus-lc-500", "vie");
    const customer = actor();
    const { booking } = await hold(customer, "lexus-lc-500", "2031-04-10T10:00", "2031-04-12T10:00", { pickup: "vie" });
    await confirmBooking(ctx, booking.reference, customer);
    const before = clock;
    clock = new Date("2031-04-10T09:00:00Z");
    await expect(cancelBooking(ctx, booking.reference, customer)).rejects.toMatchObject({ details: { reason: "past_pickup" } });
    expect((await cancelBooking(ctx, booking.reference, staff, "No-show")).booking).toMatchObject({ status: "cancelled", cancellation: { byRole: "staff" } });
    clock = before;
  });

  it("staff search by reference, customer and status; schedule shows the next allocation", async () => {
    const car = await addCar("porsche-911-carrera", "gva");
    const customer = actor();
    const { booking } = await hold(customer, "porsche-911-carrera", "2031-05-10T10:00", "2031-05-12T10:00", { pickup: "gva" });
    expect((await staffBookings(ctx, { q: booking.reference.slice(-4) })).map((b) => b.reference)).toContain(booking.reference);
    expect((await staffBookings(ctx, { q: "bergmann", status: "held", location: "gva" })).some((b) => b.reference === booking.reference)).toBe(true);
    expect((await staffBookings(ctx, { q: "nobody-by-this-name" })).length).toBe(0);
    const schedule = await unitSchedule(ctx, [car._id]);
    expect(schedule.get(car._id.toHexString())?.next?.reference).toBe(booking.reference);
  });

  it("the validator refuses malformed bookings written directly; references are unique", async () => {
    const base = (await bookingsOf(ctx).findOne({}))!;
    await expect(bookingsOf(ctx).insertOne({ ...base, _id: new ObjectId(), reference: "HLD-0101-ZZZZ", status: "teleported" as never })).rejects.toMatchObject({ code: 121 });
    await expect(bookingsOf(ctx).insertOne({ ...base, _id: new ObjectId(), idempotencyKey: randomUUID() })).rejects.toMatchObject({ code: 11000 });
    expect(await expireHolds(ctx)).toBeGreaterThanOrEqual(0);
  });
});
