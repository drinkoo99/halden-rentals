import { ObjectId } from "mongodb";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { checkAvailability } from "../availability/service";
import { CATALOGUE_COLLECTION_SPECS } from "../catalogue/collections";
import { seedCatalogue } from "../catalogue/seed/apply";
import { catalogueSeedFromStatic } from "../catalogue/seed/fromStatic";
import { ensureCollections } from "../db/collections";
import { isTestDatabase } from "../db/targets";
import { openIntegrationDatabase, type IntegrationDatabase } from "../testing/integrationDb";
import { FLEET_COLLECTION_SPECS, FLEET_COLLECTIONS, type FleetCollectionNames } from "./collections";
import { createUnitInput, type CreateUnitInput } from "./schemas";
import { assertFleetReady, changeStatus, createBlock, createUnit, deleteBlock, listBlocks, listUnits, updateUnit, type FleetContext } from "./store";

/**
 * Fleet inventory and availability against the real test database (halden_test): run-scoped catalogue
 * collections (filled by the real seed) and fleet collections, all with the real validators and indexes.
 * The application database is never touched; afterAll drops this run's collections.
 */
let tdb: IntegrationDatabase;
let ctx: FleetContext;
let fleetNames: FleetCollectionNames;
let clock = new Date("2030-06-01T08:00:00Z");
const staff = new ObjectId();
let plate = 0;
const unit = (over: Partial<CreateUnitInput> = {}) =>
  createUnitInput.parse({ modelSlug: "lexus-lc-500", registration: `M HL ${++plate}`, locationCode: "muc", mileageKm: 1000, year: 2025, ...over });
const at = (iso: string) => new Date(iso);

beforeAll(async () => {
  tdb = await openIntegrationDatabase();
  expect(isTestDatabase(tdb.db.databaseName)).toBe(true);
  const catalogueNames = { locations: tdb.scoped("fleetlocations"), vehicleModels: tdb.scoped("fleetvehicleModels"), extras: tdb.scoped("fleetextras") };
  fleetNames = { fleetUnits: tdb.scoped("fleetUnits"), availabilityBlocks: tdb.scoped("availabilityBlocks") };
  const scopedNames: Record<string, string> = { ...catalogueNames, ...fleetNames }; // keyed by the real collection names
  const specs = [...CATALOGUE_COLLECTION_SPECS, ...FLEET_COLLECTION_SPECS].map((s) => ({ ...s, name: scopedNames[s.name] }));
  expect((await ensureCollections(tdb.db, specs, { apply: true })).conflicts).toEqual([]);
  expect((await seedCatalogue(tdb.db, catalogueSeedFromStatic(), { apply: true, names: catalogueNames })).report?.complete).toBe(true);
  ctx = { db: tdb.db, names: fleetNames, catalogueNames, now: () => clock };
});
afterAll(async () => {
  if (!tdb) return;
  try {
    await tdb.cleanup();
  } finally {
    await tdb.close();
  }
});

describe("fleet units", () => {
  it("registers a car against an existing model and active hub", async () => {
    const doc = await createUnit(ctx, unit());
    expect(doc).toMatchObject({ modelSlug: "lexus-lc-500", locationCode: "muc", status: "available" });
    expect(doc.unitCode).toMatch(/^FU-[A-Z2-9]{6}$/);
  });

  it("rejects unknown models and inactive or unknown hubs", async () => {
    await expect(createUnit(ctx, unit({ modelSlug: "flying-car" }))).rejects.toMatchObject({ code: "VALIDATION_FAILED", details: [{ path: "modelSlug" }] });
    await expect(createUnit(ctx, unit({ locationCode: "xxx" }))).rejects.toMatchObject({ code: "VALIDATION_FAILED", details: [{ path: "locationCode" }] });
    await tdb.db.collection(ctx.catalogueNames!.locations).updateOne({ code: "vie" }, { $set: { status: "inactive" } });
    await expect(createUnit(ctx, unit({ locationCode: "vie" }))).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
  });

  it("keeps plates and VINs unique (plates compared after normalisation); VIN is optional", async () => {
    await createUnit(ctx, createUnitInput.parse({ modelSlug: "lexus-lc-500", registration: "zh  555", locationCode: "zrh", mileageKm: 0, year: 2025, vin: "WP0ZZZ99ZTS392124" }));
    await expect(createUnit(ctx, unit({ registration: "ZH 555" }))).rejects.toMatchObject({ code: "CONFLICT", message: expect.stringContaining("registration plate") });
    await expect(createUnit(ctx, unit({ vin: "WP0ZZZ99ZTS392124" }))).rejects.toMatchObject({ code: "CONFLICT", message: expect.stringContaining("VIN") });
    await createUnit(ctx, unit());
    await createUnit(ctx, unit()); // several cars without a VIN are fine (partial unique index)
  });

  it("the database validator refuses malformed units written directly", async () => {
    const base = { unitCode: "FU-AAAAAA", modelSlug: "x", registration: "A 1", locationCode: "muc", mileageKm: 0, year: 2025, createdAt: clock, updatedAt: clock };
    await expect(tdb.db.collection(fleetNames.fleetUnits).insertOne({ ...base, status: "stolen" })).rejects.toMatchObject({ code: 121 });
    await expect(tdb.db.collection(fleetNames.fleetUnits).insertOne({ ...base, status: "available", mileageKm: -1 })).rejects.toMatchObject({ code: 121 });
  });

  it("filters by model, hub and status", async () => {
    const porsche = await createUnit(ctx, unit({ modelSlug: "porsche-911-carrera", locationCode: "gva", status: "maintenance" }));
    expect((await listUnits(ctx, { model: "porsche-911-carrera" })).map((u) => u.unitCode)).toEqual([porsche.unitCode]);
    expect((await listUnits(ctx, { location: "gva", status: "maintenance" })).map((u) => u.unitCode)).toEqual([porsche.unitCode]);
    expect(await listUnits(ctx, { location: "gva", status: "available" })).toEqual([]);
    expect((await listUnits(ctx, { location: "zrh" })).every((u) => u.locationCode === "zrh")).toBe(true);
  });

  it("updates details, never lowers the odometer, and only moves cars that are not out on rent", async () => {
    const car = await createUnit(ctx, unit({ vin: "WDD2220821A123456", notes: "Winter tyres" }));
    const moved = await updateUnit(ctx, car._id, { locationCode: "zrh", mileageKm: 1500, vin: null, notes: null });
    expect(moved).toMatchObject({ locationCode: "zrh", mileageKm: 1500 });
    expect(moved).not.toHaveProperty("vin");
    expect(moved).not.toHaveProperty("notes");
    await expect(updateUnit(ctx, car._id, { mileageKm: 1400 })).rejects.toMatchObject({ code: "CONFLICT" });
    await changeStatus(ctx, car._id, "rented");
    await expect(updateUnit(ctx, car._id, { locationCode: "muc" })).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("follows the status transitions", async () => {
    const car = await createUnit(ctx, unit({ status: "inactive" }));
    await expect(changeStatus(ctx, car._id, "rented")).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await changeStatus(ctx, car._id, "available")).status).toBe("available");
    expect((await changeStatus(ctx, car._id, "rented")).status).toBe("rented");
    await expect(changeStatus(ctx, car._id, "inactive")).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await changeStatus(ctx, car._id, "maintenance")).status).toBe("maintenance");
    await expect(changeStatus(ctx, new ObjectId(), "available")).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("availability blocks", () => {
  it("must end in the future and must not overlap another block of the same car; back-to-back is fine", async () => {
    const car = await createUnit(ctx, unit());
    await expect(createBlock(ctx, car._id, { kind: "maintenance", startsAt: at("2030-05-01T00:00:00Z"), endsAt: at("2030-05-02T00:00:00Z") }, staff)).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
    const first = await createBlock(ctx, car._id, { kind: "maintenance", startsAt: at("2030-06-10T08:00:00Z"), endsAt: at("2030-06-10T18:00:00Z") }, staff);
    await expect(createBlock(ctx, car._id, { kind: "unavailable", startsAt: at("2030-06-10T17:59:00Z"), endsAt: at("2030-06-11T08:00:00Z") }, staff)).rejects.toMatchObject({ code: "CONFLICT" });
    await createBlock(ctx, car._id, { kind: "unavailable", startsAt: at("2030-06-10T18:00:00Z"), endsAt: at("2030-06-11T08:00:00Z") }, staff);
    expect((await listBlocks(ctx, car._id)).map((b) => b.kind)).toEqual(["maintenance", "unavailable"]);
    await deleteBlock(ctx, car._id, first._id);
    await expect(deleteBlock(ctx, car._id, first._id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(await listBlocks(ctx, car._id)).toHaveLength(1);
  });
});

describe("availability over the database", () => {
  const ask = (from: string, to: string, over: Record<string, string> = {}) =>
    checkAvailability(ctx, { modelSlug: "audi-rs6-avant-performance", pickupLocationCode: "mxp", returnLocationCode: "mxp", start: at(from), end: at(to), ...over });

  it("has nothing to offer without cars at the hub", async () => {
    expect(await ask("2030-06-10T10:00:00Z", "2030-06-12T10:00:00Z")).toMatchObject({ available: false, availableUnits: 0, units: [] });
  });

  it("counts cars in service at the pick-up hub and honours block boundaries exactly", async () => {
    const a = await createUnit(ctx, unit({ modelSlug: "audi-rs6-avant-performance", locationCode: "mxp" }));
    const b = await createUnit(ctx, unit({ modelSlug: "audi-rs6-avant-performance", locationCode: "mxp" }));
    await createUnit(ctx, unit({ modelSlug: "audi-rs6-avant-performance", locationCode: "mxp", status: "maintenance" }));
    await createUnit(ctx, unit({ modelSlug: "audi-rs6-avant-performance", locationCode: "zrh" }));
    expect(await ask("2030-06-10T10:00:00Z", "2030-06-12T10:00:00Z")).toMatchObject({ available: true, availableUnits: 2 });

    await createBlock(ctx, a._id, { kind: "maintenance", startsAt: at("2030-06-12T10:00:00Z"), endsAt: at("2030-06-13T10:00:00Z") }, staff);
    await createBlock(ctx, b._id, { kind: "unavailable", startsAt: at("2030-06-09T00:00:00Z"), endsAt: at("2030-06-10T10:00:00Z") }, staff);
    expect((await ask("2030-06-10T10:00:00Z", "2030-06-12T10:00:00Z")).availableUnits).toBe(2); // both blocks only touch the boundaries
    const overlapping = await ask("2030-06-10T10:00:00Z", "2030-06-12T10:00:01Z");
    expect(overlapping.availableUnits).toBe(1);
    expect(overlapping.units.find((u) => u.unitId === a._id.toHexString())?.reasons).toEqual([{ code: "blocked", blockId: expect.any(String), kind: "maintenance" }]);
  });

  it("supports one-way rentals to another active hub", async () => {
    expect((await ask("2030-06-20T10:00:00Z", "2030-06-22T10:00:00Z", { returnLocationCode: "zrh" })).available).toBe(true);
  });

  it("validates the request: past or reversed periods, unknown models, inactive hubs", async () => {
    await expect(ask("2030-05-31T10:00:00Z", "2030-06-02T10:00:00Z")).rejects.toMatchObject({ code: "VALIDATION_FAILED", details: [{ path: "from" }] });
    await expect(ask("2030-06-12T10:00:00Z", "2030-06-10T10:00:00Z")).rejects.toMatchObject({ code: "VALIDATION_FAILED" });
    await expect(checkAvailability(ctx, { modelSlug: "flying-car", pickupLocationCode: "mxp", returnLocationCode: "mxp", start: at("2030-06-10T10:00:00Z"), end: at("2030-06-11T10:00:00Z") })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(ask("2030-06-10T10:00:00Z", "2030-06-12T10:00:00Z", { returnLocationCode: "vie" })).rejects.toMatchObject({ code: "VALIDATION_FAILED", details: [{ path: "return" }] });
  });

  it("a model that is not bookable is never available", async () => {
    await tdb.db.collection(ctx.catalogueNames!.vehicleModels).updateOne({ slug: "audi-rs6-avant-performance" }, { $set: { bookable: false } });
    expect(await ask("2030-06-10T10:00:00Z", "2030-06-12T10:00:00Z")).toMatchObject({ available: false, availableUnits: 0, bookable: false });
    clock = new Date("2030-06-01T08:00:00Z");
  });
});

describe("setup guard", () => {
  it("refuses to work before the fleet collections exist", async () => {
    const missing = { fleetUnits: tdb.scoped("missingUnits"), availabilityBlocks: tdb.scoped("missingBlocks") };
    await expect(assertFleetReady({ db: tdb.db, names: missing })).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    expect(FLEET_COLLECTIONS.fleetUnits).toBe("fleetUnits");
  });
});
