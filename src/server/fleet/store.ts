import { randomBytes } from "node:crypto";
import { ObjectId, type Db } from "mongodb";
import { CATALOGUE_COLLECTIONS } from "../catalogue/collections";
import { AppError } from "../http/errors";
import { FLEET_COLLECTIONS, type FleetCollectionNames } from "./collections";
import { canTransition, type BlockInput, type CreateUnitInput, type FleetStatus, type UpdateUnitInput } from "./schemas";

/**
 * Fleet inventory persistence (M6). No Next.js imports: the API routes wrap it, the integration tests run
 * it against run-scoped collections. Data rules enforced here:
 * - a unit references an existing (not archived) vehicle model and an active hub;
 * - unit code, plate and VIN are unique (also guaranteed by unique indexes);
 * - the odometer never goes backwards; the model of a physical car never changes;
 * - status changes follow STATUS_TRANSITIONS and are applied only if nobody changed the status meanwhile;
 * - a rented car cannot be reassigned to another hub (it moves on return);
 * - blocks of one unit never overlap and must end in the future.
 */

export type UnitDoc = {
  _id: ObjectId;
  unitCode: string;
  modelSlug: string;
  registration: string;
  vin?: string;
  locationCode: string;
  status: FleetStatus;
  mileageKm: number;
  year: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type BlockDoc = { _id: ObjectId; unitId: ObjectId; kind: "maintenance" | "unavailable"; startsAt: Date; endsAt: Date; reason?: string; createdBy: ObjectId; createdAt: Date };

export type FleetContext = {
  db: Pick<Db, "collection" | "listCollections">;
  names?: FleetCollectionNames;
  catalogueNames?: { locations: string; vehicleModels: string };
  now?: () => Date;
};

const names = (ctx: FleetContext) => ctx.names ?? FLEET_COLLECTIONS;
const catalogue = (ctx: FleetContext) => ctx.catalogueNames ?? CATALOGUE_COLLECTIONS;
const now = (ctx: FleetContext) => (ctx.now ? ctx.now() : new Date());
export const unitsOf = (ctx: FleetContext) => ctx.db.collection<UnitDoc>(names(ctx).fleetUnits);
export const blocksOf = (ctx: FleetContext) => ctx.db.collection<BlockDoc>(names(ctx).availabilityBlocks);

/** What staff see (the API never returns raw documents). */
export type StaffUnit = Omit<UnitDoc, "_id" | "createdAt" | "updatedAt"> & { id: string; createdAt: string; updatedAt: string };
export function toStaffUnit(u: UnitDoc): StaffUnit {
  const { _id, createdAt, updatedAt, ...rest } = u;
  return { id: _id.toHexString(), ...rest, createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString() };
}
export type StaffBlock = { id: string; unitId: string; kind: BlockDoc["kind"]; startsAt: string; endsAt: string; reason?: string; createdAt: string };
export function toStaffBlock(b: BlockDoc): StaffBlock {
  return { id: b._id.toHexString(), unitId: b.unitId.toHexString(), kind: b.kind, startsAt: b.startsAt.toISOString(), endsAt: b.endsAt.toISOString(), ...(b.reason ? { reason: b.reason } : {}), createdAt: b.createdAt.toISOString() };
}

// ---- setup guard (same rule as auth: never let MongoDB create these collections without their indexes) ----
const ready = new WeakMap<object, Map<string, Promise<void>>>();
export function assertFleetReady(ctx: FleetContext): Promise<void> {
  const wanted = Object.values(names(ctx));
  const key = wanted.join(",");
  let perDb = ready.get(ctx.db as object);
  if (!perDb) ready.set(ctx.db as object, (perDb = new Map()));
  let check = perDb.get(key);
  if (!check) {
    const cache = perDb;
    check = (async () => {
      const existing = new Set((await ctx.db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name));
      const missing = wanted.filter((n) => !existing.has(n));
      if (missing.length) throw new AppError("SERVICE_UNAVAILABLE", `Fleet collections are not set up (${missing.join(", ")}); run db:setup`);
    })();
    check.catch(() => cache.delete(key));
    perDb.set(key, check);
  }
  return check;
}

export function parseId(id: string): ObjectId {
  if (!/^[0-9a-f]{24}$/i.test(id)) throw new AppError("NOT_FOUND", "No fleet unit with this id.");
  return new ObjectId(id);
}

async function assertModel(ctx: FleetContext, slug: string) {
  const model = await ctx.db.collection(catalogue(ctx).vehicleModels).findOne({ slug, status: { $ne: "archived" } }, { projection: { _id: 1 } });
  if (!model) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: [{ path: "modelSlug", message: "no such vehicle model in the catalogue" }] });
}
async function assertLocation(ctx: FleetContext, code: string, path = "locationCode") {
  const loc = await ctx.db.collection(catalogue(ctx).locations).findOne({ code, status: "active" }, { projection: { _id: 1 } });
  if (!loc) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: [{ path, message: "no such active hub" }] });
}

function duplicate(err: unknown): never {
  const e = err as { code?: number; keyPattern?: Record<string, unknown> };
  if (e.code === 11000) {
    const field = Object.keys(e.keyPattern ?? {})[0] ?? "field";
    const label = field === "registration" ? "registration plate" : field === "vin" ? "VIN" : field;
    throw new AppError("CONFLICT", `Another fleet unit already has this ${label}.`, { details: [{ path: field, message: "already in use" }] });
  }
  throw err;
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I
const newUnitCode = () => "FU-" + Array.from(randomBytes(6), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");

// ---- units ----------------------------------------------------------------------------------------
export async function createUnit(ctx: FleetContext, input: CreateUnitInput): Promise<UnitDoc> {
  await assertFleetReady(ctx);
  await assertModel(ctx, input.modelSlug);
  await assertLocation(ctx, input.locationCode);
  const at = now(ctx);
  for (let attempt = 0; ; attempt++) {
    const doc: UnitDoc = {
      _id: new ObjectId(),
      unitCode: newUnitCode(),
      modelSlug: input.modelSlug,
      registration: input.registration,
      ...(input.vin ? { vin: input.vin } : {}),
      locationCode: input.locationCode,
      status: input.status,
      mileageKm: input.mileageKm,
      year: input.year,
      ...(input.notes ? { notes: input.notes } : {}),
      createdAt: at,
      updatedAt: at,
    };
    try {
      await unitsOf(ctx).insertOne(doc);
      return doc;
    } catch (err) {
      const e = err as { code?: number; keyPattern?: Record<string, unknown> };
      if (e.code === 11000 && e.keyPattern?.unitCode && attempt < 3) continue; // generated code collided: draw again
      duplicate(err);
    }
  }
}

export async function listUnits(ctx: FleetContext, filter: { model?: string; location?: string; status?: FleetStatus } = {}): Promise<UnitDoc[]> {
  await assertFleetReady(ctx);
  const q: Record<string, unknown> = {};
  if (filter.model) q.modelSlug = filter.model;
  if (filter.location) q.locationCode = filter.location;
  if (filter.status) q.status = filter.status;
  return unitsOf(ctx).find(q).sort({ locationCode: 1, modelSlug: 1, unitCode: 1 }).limit(1000).toArray();
}

export async function getUnit(ctx: FleetContext, id: ObjectId): Promise<UnitDoc> {
  await assertFleetReady(ctx);
  const unit = await unitsOf(ctx).findOne({ _id: id });
  if (!unit) throw new AppError("NOT_FOUND", "No fleet unit with this id.");
  return unit;
}

export async function updateUnit(ctx: FleetContext, id: ObjectId, patch: UpdateUnitInput): Promise<UnitDoc> {
  const unit = await getUnit(ctx, id);
  if (patch.locationCode && patch.locationCode !== unit.locationCode) {
    if (unit.status === "rented") throw new AppError("CONFLICT", "A rented car cannot be moved to another hub; it is reassigned when it is returned.");
    await assertLocation(ctx, patch.locationCode);
  }
  if (patch.mileageKm !== undefined && patch.mileageKm < unit.mileageKm)
    throw new AppError("CONFLICT", "The mileage cannot go below the recorded odometer reading.", { details: [{ path: "mileageKm", message: `currently ${unit.mileageKm} km` }] });
  const set: Record<string, unknown> = { updatedAt: now(ctx) };
  const unset: Record<string, ""> = {};
  for (const [key, value] of Object.entries(patch)) {
    if (value === null || value === "") unset[key] = "";
    else if (value !== undefined) set[key] = value;
  }
  try {
    const res = await unitsOf(ctx).findOneAndUpdate({ _id: id, updatedAt: unit.updatedAt }, { $set: set, ...(Object.keys(unset).length ? { $unset: unset } : {}) }, { returnDocument: "after" });
    if (!res) throw new AppError("CONFLICT", "This fleet unit was changed meanwhile; reload and try again.");
    return res;
  } catch (err) {
    if (err instanceof AppError) throw err;
    duplicate(err);
  }
}

export async function changeStatus(ctx: FleetContext, id: ObjectId, to: FleetStatus): Promise<UnitDoc> {
  const unit = await getUnit(ctx, id);
  if (unit.status === to) return unit;
  if (!canTransition(unit.status, to)) throw new AppError("CONFLICT", `A ${unit.status} car cannot be marked ${to}.`, { details: [{ path: "status", message: `allowed from ${unit.status}: see STATUS_TRANSITIONS` }] });
  const res = await unitsOf(ctx).findOneAndUpdate({ _id: id, status: unit.status }, { $set: { status: to, updatedAt: now(ctx) } }, { returnDocument: "after" });
  if (!res) throw new AppError("CONFLICT", "The status was changed meanwhile; reload and try again.");
  return res;
}

// ---- availability blocks -------------------------------------------------------------------------------
export async function listBlocks(ctx: FleetContext, unitId: ObjectId, from: Date = now(ctx)): Promise<BlockDoc[]> {
  await assertFleetReady(ctx);
  return blocksOf(ctx).find({ unitId, endsAt: { $gt: from } }).sort({ startsAt: 1 }).toArray();
}

export async function createBlock(ctx: FleetContext, unitId: ObjectId, input: BlockInput, createdBy: ObjectId): Promise<BlockDoc> {
  await getUnit(ctx, unitId);
  if (input.endsAt <= now(ctx)) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: [{ path: "endsAt", message: "must be in the future" }] });
  const clash = await blocksOf(ctx).findOne({ unitId, startsAt: { $lt: input.endsAt }, endsAt: { $gt: input.startsAt } });
  if (clash) throw new AppError("CONFLICT", "This period overlaps an existing block for this car.", { details: [{ path: "startsAt", message: `overlaps ${clash._id.toHexString()}` }] });
  const doc: BlockDoc = {
    _id: new ObjectId(),
    unitId,
    kind: input.kind,
    startsAt: input.startsAt,
    endsAt: input.endsAt,
    ...(input.reason ? { reason: input.reason } : {}),
    createdBy,
    createdAt: now(ctx),
  };
  await blocksOf(ctx).insertOne(doc);
  return doc;
}

export async function deleteBlock(ctx: FleetContext, unitId: ObjectId, blockId: ObjectId): Promise<void> {
  await assertFleetReady(ctx);
  const res = await blocksOf(ctx).deleteOne({ _id: blockId, unitId });
  if (res.deletedCount !== 1) throw new AppError("NOT_FOUND", "No such block for this fleet unit.");
}
