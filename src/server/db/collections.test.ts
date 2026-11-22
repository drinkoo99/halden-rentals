import { AUTH_COLLECTION_SPECS } from "../auth/collections";
import { FLEET_COLLECTION_SPECS } from "../fleet/collections";
import { describe, expect, it, vi } from "vitest";
import { CATALOGUE_COLLECTION_SPECS } from "../catalogue/collections";
import { canonical, COLLECTIONS, ensureCollections, planCollections, VALIDATION_SETTINGS, type CollectionSpec } from "./collections";

/**
 * In-memory fake of the `Db` surface used by setup. Records every call so tests can prove that a dry
 * run only reads, and that apply only performs the planned changes.
 */
type FakeIndex = { name: string; key: Record<string, number>; unique?: boolean; sparse?: boolean; partialFilterExpression?: Record<string, unknown> };
type FakeCollection = { options?: Record<string, unknown>; indexes: FakeIndex[] };

function fakeDb(initial: Record<string, FakeCollection>) {
  const state = structuredClone(initial);
  const calls: string[] = [];
  const db = {
    listCollections: vi.fn(() => {
      calls.push("listCollections");
      return { toArray: async () => Object.entries(state).map(([name, c]) => ({ name, options: c.options ?? {} })) };
    }),
    createCollection: vi.fn(async (name: string, options: Record<string, unknown>) => {
      calls.push(`createCollection:${name}`);
      state[name] = { options, indexes: [{ name: "_id_", key: { _id: 1 } }] };
    }),
    command: vi.fn(async (cmd: Record<string, unknown>) => {
      calls.push(`command:${Object.keys(cmd)[0]}:${String(Object.values(cmd)[0])}`);
      return { ok: 1 };
    }),
    collection: vi.fn((name: string) => ({
      listIndexes: () => {
        calls.push(`listIndexes:${name}`);
        return { toArray: async () => state[name].indexes };
      },
      createIndexes: vi.fn(async (ixs: FakeIndex[]) => {
        calls.push(`createIndexes:${name}:${ixs.map((i) => i.name).join(",")}`);
        state[name].indexes.push(...ixs);
      }),
    })),
  };
  return { db: db as never, calls, state };
}

const validator = { $jsonSchema: { bsonType: "object", required: ["slug"] } };
const specs: CollectionSpec[] = [
  {
    name: "widgets",
    validator,
    indexes: [
      { name: "widgets_slug_unique", key: { slug: 1 }, unique: true },
      { name: "widgets_status_sort", key: { status: 1, sortOrder: 1 } },
    ],
  },
];
const upToDate = (): Record<string, FakeCollection> => ({
  widgets: {
    options: { validator, ...VALIDATION_SETTINGS },
    indexes: [
      { name: "_id_", key: { _id: 1 } },
      { name: "widgets_slug_unique", key: { slug: 1 }, unique: true },
      { name: "widgets_status_sort", key: { status: 1, sortOrder: 1 } },
    ],
  },
});

describe("registry", () => {
  it("registers exactly the catalogue collections", () => {
    expect(COLLECTIONS).toEqual([...CATALOGUE_COLLECTION_SPECS, ...AUTH_COLLECTION_SPECS, ...FLEET_COLLECTION_SPECS]);
    expect(COLLECTIONS.map((c) => c.name)).toEqual(["locations", "vehicleModels", "extras", "users", "sessions", "authTokens", "rateLimits", "fleetUnits", "availabilityBlocks"]);
  });
});

describe("planCollections (read-only)", () => {
  it("plans a missing collection with its validator and every index", async () => {
    const { db, calls } = fakeDb({});
    expect(await planCollections(db, specs)).toEqual({
      actions: [
        { action: "create-collection", collection: "widgets" },
        { action: "create-index", collection: "widgets", index: "widgets_slug_unique" },
        { action: "create-index", collection: "widgets", index: "widgets_status_sort" },
      ],
      conflicts: [],
      unmanaged: { collections: [], indexes: [] },
    });
    expect(calls).toEqual(["listCollections"]); // a missing collection's indexes are not even listed
  });

  it("plans nothing when everything already matches (no collMod needed)", async () => {
    const { db, calls } = fakeDb(upToDate());
    expect((await planCollections(db, specs)).actions).toEqual([]);
    expect(calls).toEqual(["listCollections", "listIndexes:widgets"]);
  });

  it("treats a validator with reordered keys as unchanged, but a changed rule as different", async () => {
    const reordered = upToDate();
    reordered.widgets.options!.validator = { $jsonSchema: { required: ["slug"], bsonType: "object" } };
    expect((await planCollections(fakeDb(reordered).db, specs)).actions).toEqual([]);

    const changed = upToDate();
    changed.widgets.options!.validator = { $jsonSchema: { bsonType: "object", required: ["slug", "name"] } };
    expect((await planCollections(fakeDb(changed).db, specs)).actions).toEqual([{ action: "update-validator", collection: "widgets" }]);

    const otherLevel = upToDate();
    otherLevel.widgets.options!.validationLevel = "strict";
    expect((await planCollections(fakeDb(otherLevel).db, specs)).actions).toEqual([{ action: "update-validator", collection: "widgets" }]);
  });

  it("plans only the missing index", async () => {
    const state = upToDate();
    state.widgets.indexes = state.widgets.indexes.filter((i) => i.name !== "widgets_status_sort");
    expect((await planCollections(fakeDb(state).db, specs)).actions).toEqual([{ action: "create-index", collection: "widgets", index: "widgets_status_sort" }]);
  });

  it("reports a conflict for the same name with a different definition", async () => {
    const differentKeys = upToDate();
    differentKeys.widgets.indexes[1] = { name: "widgets_slug_unique", key: { slug: -1 }, unique: true };
    const notUnique = upToDate();
    notUnique.widgets.indexes[1] = { name: "widgets_slug_unique", key: { slug: 1 } };
    for (const state of [differentKeys, notUnique])
      expect((await planCollections(fakeDb(state).db, specs)).conflicts).toEqual([
        { collection: "widgets", index: "widgets_slug_unique", problem: "an index with this name exists with a different definition" },
      ]);
  });

  it("reports a conflict when an existing index differs only in sparse", async () => {
    const sparse = upToDate();
    sparse.widgets.indexes[1] = { name: "widgets_slug_unique", key: { slug: 1 }, unique: true, sparse: true };
    expect((await planCollections(fakeDb(sparse).db, specs)).conflicts).toEqual([
      { collection: "widgets", index: "widgets_slug_unique", problem: "an index with this name exists with a different definition" },
    ]);

    // and the other way round: the spec asks for sparse, the database index is not
    const sparseSpec: CollectionSpec[] = [{ ...specs[0], indexes: [{ ...specs[0].indexes[0], sparse: true }, specs[0].indexes[1]] }];
    expect((await planCollections(fakeDb(upToDate()).db, sparseSpec)).conflicts.map((c) => c.index)).toEqual(["widgets_slug_unique"]);
  });

  it("reports a conflict when an existing index differs only in partialFilterExpression", async () => {
    const filter = { status: { $eq: "published" } };
    const partial = upToDate();
    partial.widgets.indexes[1] = { name: "widgets_slug_unique", key: { slug: 1 }, unique: true, partialFilterExpression: filter };
    expect((await planCollections(fakeDb(partial).db, specs)).conflicts.map((c) => c.index)).toEqual(["widgets_slug_unique"]);

    // a different filter is also a different definition
    const partialSpec: CollectionSpec[] = [{ ...specs[0], indexes: [{ ...specs[0].indexes[0], partialFilterExpression: { status: { $eq: "draft" } } }, specs[0].indexes[1]] }];
    expect((await planCollections(fakeDb(partial).db, partialSpec)).conflicts.map((c) => c.index)).toEqual(["widgets_slug_unique"]);

    // the same filter with keys in another order is the same definition
    const sameFilter: CollectionSpec[] = [{ ...specs[0], indexes: [{ ...specs[0].indexes[0], partialFilterExpression: { status: { $eq: "published" } } }, specs[0].indexes[1]] }];
    expect((await planCollections(fakeDb(partial).db, sameFilter)).conflicts).toEqual([]);
  });

  it("an index option conflict blocks apply entirely", async () => {
    const state = upToDate();
    state.widgets.indexes[1] = { name: "widgets_slug_unique", key: { slug: 1 }, unique: true, sparse: true };
    state.widgets.indexes.splice(2, 1); // a missing index that would otherwise be created
    const { db, calls } = fakeDb(state);
    const report = await ensureCollections(db, specs, { apply: true });
    expect(report.applied).toBe(false);
    expect(report.actions).toEqual([{ action: "create-index", collection: "widgets", index: "widgets_status_sort" }]);
    expect(calls.every((c) => c.startsWith("list"))).toBe(true);
  });

  it("reports a conflict when the same keys are indexed under another name", async () => {
    const state = upToDate();
    state.widgets.indexes[1] = { name: "slug_1", key: { slug: 1 }, unique: true };
    expect((await planCollections(fakeDb(state).db, specs)).conflicts).toEqual([
      { collection: "widgets", index: "widgets_slug_unique", problem: 'the same keys are already indexed as "slug_1"' },
    ]);
  });

  it("treats compound key order as significant", async () => {
    const state = upToDate();
    state.widgets.indexes[2] = { name: "widgets_status_sort", key: { sortOrder: 1, status: 1 } };
    expect((await planCollections(fakeDb(state).db, specs)).conflicts.map((c) => c.index)).toEqual(["widgets_status_sort"]);
  });

  it("reports unregistered collections and indexes as unmanaged, ignoring _id_ and system collections", async () => {
    const state: Record<string, FakeCollection> = { ...upToDate(), legacy: { indexes: [{ name: "_id_", key: { _id: 1 } }] }, "system.views": { indexes: [] } };
    state.widgets.indexes.push({ name: "handmade_idx", key: { colour: 1 } });
    const plan = await planCollections(fakeDb(state).db, specs);
    expect(plan.unmanaged).toEqual({ collections: ["legacy"], indexes: [{ collection: "widgets", index: "handmade_idx" }] });
    expect(plan.actions).toEqual([]);
  });
});

describe("ensureCollections", () => {
  it("dry run only reads", async () => {
    const { db, calls } = fakeDb({});
    const report = await ensureCollections(db, specs, { apply: false });
    expect(report.applied).toBe(false);
    expect(report.actions).toHaveLength(3);
    expect(calls.every((c) => c.startsWith("listCollections") || c.startsWith("listIndexes"))).toBe(true);
  });

  it("apply creates the collection with validator and settings, then the missing indexes", async () => {
    const { db, calls } = fakeDb({});
    const report = await ensureCollections(db, specs, { apply: true });
    expect(report.applied).toBe(true);
    expect(calls.slice(1)).toEqual(["createCollection:widgets", "createIndexes:widgets:widgets_slug_unique,widgets_status_sort"]);
    expect((db as unknown as { createCollection: ReturnType<typeof vi.fn> }).createCollection).toHaveBeenCalledWith("widgets", { validator, ...VALIDATION_SETTINGS });
  });

  it("apply is idempotent: a second run plans and performs nothing", async () => {
    const { db, calls } = fakeDb({});
    await ensureCollections(db, specs, { apply: true });
    calls.length = 0;
    const second = await ensureCollections(db, specs, { apply: true });
    expect(second.actions).toEqual([]);
    expect(calls.every((c) => c.startsWith("list"))).toBe(true);
  });

  it("apply only runs collMod for a validator that really changed", async () => {
    const state = upToDate();
    state.widgets.options!.validator = { $jsonSchema: { bsonType: "object" } };
    const { db, calls } = fakeDb(state);
    await ensureCollections(db, specs, { apply: true });
    expect(calls.filter((c) => !c.startsWith("list"))).toEqual(["command:collMod:widgets"]);
  });

  it("apply changes nothing when there is any conflict", async () => {
    const state = upToDate();
    delete state.widgets.options!.validator; // would need an update…
    state.widgets.indexes[1] = { name: "widgets_slug_unique", key: { slug: -1 }, unique: true }; // …but this conflicts
    const { db, calls } = fakeDb(state);
    const report = await ensureCollections(db, specs, { apply: true });
    expect(report.applied).toBe(false);
    expect(report.conflicts).toHaveLength(1);
    expect(calls.every((c) => c.startsWith("list"))).toBe(true);
  });

  it("never drops anything", async () => {
    const state: Record<string, FakeCollection> = { ...upToDate(), legacy: { indexes: [{ name: "_id_", key: { _id: 1 } }] } };
    state.widgets.indexes.push({ name: "handmade_idx", key: { colour: 1 } });
    const { db, calls } = fakeDb(state);
    await ensureCollections(db, specs, { apply: true });
    expect(calls.some((c) => /drop/i.test(c))).toBe(false);
  });
});

describe("canonical", () => {
  it("ignores object key order but keeps array order", () => {
    expect(canonical({ a: 1, b: { c: [1, 2], d: 2 } })).toBe(canonical({ b: { d: 2, c: [1, 2] }, a: 1 }));
    expect(canonical({ a: [1, 2] })).not.toBe(canonical({ a: [2, 1] }));
  });
});
