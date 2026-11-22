import type { ClientSession } from "mongodb";
import { AppError } from "../http/errors";
import { assertFleetReady, blocksOf, unitsOf, type FleetContext } from "../fleet/store";
import { CATALOGUE_COLLECTIONS } from "../catalogue/collections";
import {
  DEFAULT_POLICY,
  modelAvailability,
  NO_RESERVATIONS,
  requestProblems,
  type AvailabilityPolicy,
  type Block,
  type ModelAvailability,
  type RentalRequest,
  type ReservationSource,
} from "./engine";

/**
 * Availability over the database (M6): validates the request, loads the model's units, their blocks and
 * (from M7 on) reservations, and runs the pure engine. Reservations default to NO_RESERVATIONS — until the
 * booking engine exists this answers "is there a car in service at that hub, free of maintenance blocks",
 * and it cannot yet prevent two customers from booking the same car.
 */

export type AvailabilityQuery = RentalRequest & { modelSlug: string };
export type AvailabilityResult = ModelAvailability & { modelSlug: string; bookable: boolean };

const PROBLEM_TEXT: Record<string, { path: string; message: string }> = {
  ends_before_start: { path: "to", message: "must be after the pick-up time" },
  too_short: { path: "to", message: "a rental lasts at least one hour" },
  too_long: { path: "to", message: "a rental lasts at most 90 days" },
  starts_in_past: { path: "from", message: "must not be in the past" },
};

export async function checkAvailability(
  ctx: FleetContext,
  query: AvailabilityQuery,
  {
    reservations = NO_RESERVATIONS,
    policy = DEFAULT_POLICY,
    session,
  }: { reservations?: ReservationSource; policy?: AvailabilityPolicy; /** read inside this transaction */ session?: ClientSession } = {},
): Promise<AvailabilityResult> {
  const now = ctx.now ? ctx.now() : new Date();
  const problems = requestProblems(query, now, policy);
  if (problems.length) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: problems.map((p) => PROBLEM_TEXT[p]) });

  await assertFleetReady(ctx);
  const cat = ctx.catalogueNames ?? CATALOGUE_COLLECTIONS;
  const model = await ctx.db.collection(cat.vehicleModels).findOne({ slug: query.modelSlug, status: "published" }, { projection: { bookable: 1 }, session });
  if (!model) throw new AppError("NOT_FOUND", "No such vehicle model.");
  const hubs = await ctx.db
    .collection(cat.locations)
    .find({ code: { $in: [query.pickupLocationCode, query.returnLocationCode] }, status: "active" }, { projection: { code: 1 }, session })
    .toArray();
  const active = new Set(hubs.map((h) => h.code as string));
  const bad = [
    ...(active.has(query.pickupLocationCode) ? [] : [{ path: "pickup", message: "no such active hub" }]),
    ...(active.has(query.returnLocationCode) ? [] : [{ path: "return", message: "no such active hub" }]),
  ];
  if (bad.length) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: bad });

  // every unit of the model: with reservations (M7) a car based elsewhere may have been returned to this hub
  const unitDocs = await unitsOf(ctx).find({ modelSlug: query.modelSlug }, { session }).sort({ unitCode: 1 }).toArray();
  const units = unitDocs.map((u) => ({ id: u._id.toHexString(), modelSlug: u.modelSlug, locationCode: u.locationCode, status: u.status }));
  const blockDocs = unitDocs.length
    ? await blocksOf(ctx).find({ unitId: { $in: unitDocs.map((u) => u._id) }, startsAt: { $lt: query.end }, endsAt: { $gt: query.start } }, { session }).toArray()
    : [];
  const blocks: Block[] = blockDocs.map((b) => ({ id: b._id.toHexString(), unitId: b.unitId.toHexString(), kind: b.kind, start: b.startsAt, end: b.endsAt }));
  const booked = units.length ? await reservations.forUnits(units.map((u) => u.id), { start: query.start, end: query.end }, policy) : [];

  const result = modelAvailability(units, query, blocks, booked, policy);
  const bookable = model.bookable !== false;
  return bookable ? { modelSlug: query.modelSlug, bookable, ...result } : { modelSlug: query.modelSlug, bookable, ...result, available: false, availableUnits: 0 };
}
