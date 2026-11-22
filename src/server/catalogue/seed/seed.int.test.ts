import type { Db } from "mongodb";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ensureCollections } from "../../db/collections";
import { isTestDatabase } from "../../db/targets";
import { openIntegrationDatabase, type IntegrationDatabase } from "../../testing/integrationDb";
import { CATALOGUE_COLLECTION_SPECS, CATALOGUE_COLLECTIONS } from "../collections";
import { storedExtraSchema, storedLocationSchema, storedVehicleModelSchema } from "../schemas";
import { seedCatalogue, SeedSetupError, type CollectionNames } from "./apply";
import { catalogueSeedFromStatic } from "./fromStatic";
import type { CatalogueKey } from "./plan";

/**
 * Seed tooling against the real test database (halden_test), via the guarded P2b harness.
 * Every test seeds its own RUN-SCOPED collections (it_<runId>_t<N><collection>) created with the real P2a
 * validators and indexes. One guarded connection is shared by the file (fresh TLS handshakes to Atlas can
 * be slow); afterAll drops this run's collections in a finally block. The P2c collections (locations,
 * vehicleModels, extras) are never written and are checked to be intact.
 */
const seed = () => structuredClone(catalogueSeedFromStatic());
const KEYS = Object.keys(CATALOGUE_COLLECTIONS) as CatalogueKey[];

let tdb: IntegrationDatabase;
let testNo = 0;
beforeAll(async () => {
  tdb = await openIntegrationDatabase();
  expect(tdb.db.databaseName).toBe("halden_test");
});
afterAll(async () => {
  if (!tdb) return;
  try {
    await tdb.cleanup(); // drops only it_<runId>_* collections of this file's run; errors fail the file
  } finally {
    await tdb.close();
  }
});

/** Create the three catalogue collections under names unique to this test, with the real validators and indexes. */
async function scopedCatalogue(): Promise<CollectionNames> {
  expect(isTestDatabase(tdb.db.databaseName)).toBe(true);
  const tag = `t${++testNo}`;
  const names = Object.fromEntries(KEYS.map((k) => [k, tdb.scoped(`${tag}${k}`)])) as CollectionNames;
  const specs = CATALOGUE_COLLECTION_SPECS.map((s) => ({ ...s, name: names[s.name as CatalogueKey] }));
  const setup = await ensureCollections(tdb.db, specs, { apply: true });
  expect(setup.conflicts).toEqual([]);
  return names;
}
const countAll = async (db: Db, names: CollectionNames) =>
  Object.fromEntries(await Promise.all(KEYS.map(async (k) => [k, await db.collection(names[k]).countDocuments()] as const)));

describe("demo catalogue seed (halden_test, run-scoped collections)", () => {
  it("inserts all 20 seed documents into empty collections; they are valid stored documents", async () => {
    const names = await scopedCatalogue();
    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: true, names });
    expect(plan.safe).toBe(true);
    expect(report).toMatchObject({ inserted: 20, updated: 0, skipped: 0, failed: 0, complete: true });
    expect(await countAll(tdb.db, names)).toEqual({ locations: 5, vehicleModels: 10, extras: 5 });
    for (const d of await tdb.db.collection(names.locations).find().toArray()) expect(storedLocationSchema.safeParse(d).success).toBe(true);
    for (const d of await tdb.db.collection(names.vehicleModels).find().toArray()) expect(storedVehicleModelSchema.safeParse(d).success).toBe(true);
    for (const d of await tdb.db.collection(names.extras).find().toArray()) expect(storedExtraSchema.safeParse(d).success).toBe(true);
  });

  it("a second run plans 0 changes and writes nothing", async () => {
    const names = await scopedCatalogue();
    await seedCatalogue(tdb.db, seed(), { apply: true, names });
    const before = await tdb.db.collection(names.vehicleModels).find().sort({ slug: 1 }).toArray();
    const second = await seedCatalogue(tdb.db, seed(), { apply: true, names });
    expect(second.plan.writes).toBe(0);
    expect(second.report).toBeUndefined();
    expect(second.plan.collections.map((c) => c.unchanged.length)).toEqual([5, 10, 5]);
    expect(await tdb.db.collection(names.vehicleModels).find().sort({ slug: 1 }).toArray()).toEqual(before); // timestamps untouched
  });

  it("restores a changed demo document deterministically, touching only updatedAt among the timestamps", async () => {
    const names = await scopedCatalogue();
    await seedCatalogue(tdb.db, seed(), { apply: true, names, now: new Date("2026-11-01T00:00:00Z") });
    const col = tdb.db.collection(names.vehicleModels);
    await col.updateOne({ slug: "porsche-911-gt3-touring" }, { $set: { headline: "Edited by hand" } });

    const later = new Date("2026-11-02T00:00:00Z");
    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: true, names, now: later });
    const vm = plan.collections.find((c) => c.collection === "vehicleModels")!;
    expect(vm.updates.map((u) => [u.key, Object.keys(u.set), u.unset])).toEqual([["porsche-911-gt3-touring", ["headline"], []]]);
    expect(report).toMatchObject({ updated: 1, inserted: 0, complete: true });

    const doc = await col.findOne({ slug: "porsche-911-gt3-touring" });
    expect(doc?.headline).toBe(seed().vehicleModels.find((v) => v.slug === "porsche-911-gt3-touring")!.headline);
    expect(doc?.createdAt).toEqual(new Date("2026-11-01T00:00:00Z"));
    expect(doc?.updatedAt).toEqual(later);
    expect((await seedCatalogue(tdb.db, seed(), { apply: false, names })).plan.writes).toBe(0);
  });

  it("never touches an unmanaged document outside the seed", async () => {
    const names = await scopedCatalogue();
    const unmanaged = { ...seed().locations[0], code: "abc", iataCode: "ABC", sortOrder: 990, dataOrigin: "managed" as const, createdAt: new Date("2026-01-01"), updatedAt: new Date("2026-01-01") };
    await tdb.db.collection(names.locations).insertOne(unmanaged);
    const before = await tdb.db.collection(names.locations).findOne({ code: "abc" });

    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: true, names });
    expect(plan.collections.find((c) => c.collection === "locations")!.unmanagedSkipped).toEqual(["abc"]);
    expect(report?.inserted).toBe(20);
    expect(await tdb.db.collection(names.locations).findOne({ code: "abc" })).toEqual(before);
  });

  it("aborts before ANY write when an unmanaged document holds a seed natural key", async () => {
    const names = await scopedCatalogue();
    const managedZrh = { ...seed().locations[0], dataOrigin: "managed" as const, headline: undefined, createdAt: new Date(), updatedAt: new Date() };
    delete (managedZrh as Record<string, unknown>).headline;
    await tdb.db.collection(names.locations).insertOne(managedZrh);

    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: true, names });
    expect(plan.safe).toBe(false);
    expect(plan.collections.find((c) => c.collection === "locations")!.conflicts.map((c) => c.key)).toEqual(["zrh"]);
    expect(report).toBeUndefined();
    expect(await countAll(tdb.db, names)).toEqual({ locations: 1, vehicleModels: 0, extras: 0 }); // nothing written anywhere
  });

  it("aborts before ANY write when an existing document is invalid (passes the database validator, fails Zod)", async () => {
    const names = await scopedCatalogue();
    // timezone is a plain string to the database validator but must be an IANA zone for Zod
    await tdb.db.collection(names.locations).insertOne({ ...seed().locations[1], timezone: "CEST", createdAt: new Date(), updatedAt: new Date() });
    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: true, names });
    expect(plan.safe).toBe(false);
    expect(plan.validationErrors).toEqual([{ collection: "locations", key: "muc", source: "stored", problem: expect.stringMatching(/^timezone: /) }]);
    expect(report).toBeUndefined();
    expect(await countAll(tdb.db, names)).toEqual({ locations: 1, vehicleModels: 0, extras: 0 });
  });

  it("a problem in the LAST collection prevents writes to the earlier ones", async () => {
    const names = await scopedCatalogue();
    await tdb.db.collection(names.extras).insertOne({ ...seed().extras[0], icon: "not_an_icon", createdAt: new Date(), updatedAt: new Date() });
    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: true, names });
    expect(plan.safe).toBe(false);
    expect(plan.validationErrors.map((v) => v.collection)).toEqual(["extras"]);
    expect(report).toBeUndefined();
    expect(await countAll(tdb.db, names)).toEqual({ locations: 0, vehicleModels: 0, extras: 1 }); // locations and vehicleModels stay empty
  });

  it("a dry run (no apply) never writes", async () => {
    const names = await scopedCatalogue();
    const { plan, report } = await seedCatalogue(tdb.db, seed(), { apply: false, names });
    expect(plan.writes).toBe(20);
    expect(report).toBeUndefined();
    expect(await countAll(tdb.db, names)).toEqual({ locations: 0, vehicleModels: 0, extras: 0 });
  });

  it("refuses to seed collections that were not set up (never creates collections itself)", async () => {
    const names = Object.fromEntries(KEYS.map((k) => [k, tdb.scoped(`t${++testNo}${k}NotSetUp`)])) as CollectionNames;
    await expect(seedCatalogue(tdb.db, seed(), { apply: true, names })).rejects.toBeInstanceOf(SeedSetupError);
    const existing = (await tdb.db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name);
    expect(existing.filter((n) => n.includes("NotSetUp"))).toEqual([]);
  });

  it("leaves the P2c setup collections in halden_test intact and unseeded", async () => {
    expect(tdb.db.databaseName).toBe("halden_test");
    const all = (await tdb.db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name);
    for (const name of Object.values(CATALOGUE_COLLECTIONS)) {
      expect(all).toContain(name);
      expect(await tdb.db.collection(name).countDocuments()).toBe(0);
    }
  });
});
