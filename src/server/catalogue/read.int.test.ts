import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ensureCollections } from "../db/collections";
import { isTestDatabase } from "../db/targets";
import { openIntegrationDatabase, type IntegrationDatabase } from "../testing/integrationDb";
import { CATALOGUE_COLLECTION_SPECS, CATALOGUE_COLLECTIONS } from "./collections";
import { readPublicExtras, readPublicLocations, readPublicVehicles, type CatalogueCollectionNames } from "./read";
import { seedCatalogue } from "./seed/apply";
import { catalogueSeedFromStatic } from "./seed/fromStatic";

/**
 * The public catalogue reads against the real test database (halden_test), on run-scoped collections
 * created with the real validators and indexes and filled by the real seed. The application database is
 * never touched; afterAll drops this run's collections.
 */
const seed = catalogueSeedFromStatic();
const KEYS = Object.keys(CATALOGUE_COLLECTIONS) as (keyof typeof CATALOGUE_COLLECTIONS)[];
let tdb: IntegrationDatabase;
let names: CatalogueCollectionNames;

beforeAll(async () => {
  tdb = await openIntegrationDatabase();
  expect(isTestDatabase(tdb.db.databaseName)).toBe(true);
  names = Object.fromEntries(KEYS.map((k) => [k, tdb.scoped(`read${k}`)])) as CatalogueCollectionNames;
  const specs = CATALOGUE_COLLECTION_SPECS.map((s) => ({ ...s, name: names[s.name as keyof typeof names] }));
  expect((await ensureCollections(tdb.db, specs, { apply: true })).conflicts).toEqual([]);
});
afterAll(async () => {
  if (!tdb) return;
  try {
    await tdb.cleanup();
  } finally {
    await tdb.close();
  }
});

describe("public catalogue reads (halden_test, run-scoped collections)", () => {
  it("returns empty lists for empty collections", async () => {
    expect(await readPublicLocations(tdb.db, names)).toEqual([]);
    expect(await readPublicVehicles(tdb.db, names)).toEqual([]);
    expect(await readPublicExtras(tdb.db, names)).toEqual([]);
  });

  it("returns the seeded catalogue in catalogue order, without internal fields", async () => {
    const { report } = await seedCatalogue(tdb.db, seed, { apply: true, names });
    expect(report?.complete).toBe(true);

    const [locations, vehicles, extras] = await Promise.all([readPublicLocations(tdb.db, names), readPublicVehicles(tdb.db, names), readPublicExtras(tdb.db, names)]);
    expect(locations.map((l) => l.code)).toEqual(seed.locations.map((l) => l.code));
    expect(vehicles.map((v) => v.slug)).toEqual(seed.vehicleModels.map((v) => v.slug));
    expect(extras.map((e) => e.code)).toEqual(seed.extras.map((e) => e.code));
    for (const item of [...locations, ...vehicles, ...extras])
      for (const field of ["_id", "createdAt", "updatedAt", "dataOrigin", "schemaVersion", "status", "sortOrder"]) expect(item).not.toHaveProperty(field);
  });

  it("leaves out unpublished vehicles and inactive hubs and extras", async () => {
    const now = new Date();
    await tdb.db.collection(names.vehicleModels).insertOne({ ...seed.vehicleModels[0], slug: "draft-car", exhibit: "99", status: "draft", dataOrigin: "managed", sortOrder: 5, createdAt: now, updatedAt: now });
    await tdb.db.collection(names.locations).updateOne({ code: "vie" }, { $set: { status: "inactive" } });
    await tdb.db.collection(names.extras).updateOne({ code: "winter" }, { $set: { status: "inactive" } });

    expect((await readPublicVehicles(tdb.db, names)).map((v) => v.slug)).not.toContain("draft-car");
    expect((await readPublicLocations(tdb.db, names)).map((l) => l.code)).toEqual(["zrh", "muc", "gva", "mxp"]);
    expect((await readPublicExtras(tdb.db, names)).map((e) => e.code)).not.toContain("winter");
  });

  it("rejects a stored document that passes the database validator but not the schema", async () => {
    await tdb.db.collection(names.locations).updateOne({ code: "muc" }, { $set: { timezone: "CEST" } });
    await expect(readPublicLocations(tdb.db, names)).rejects.toMatchObject({ code: "INTERNAL" });
  });
});
