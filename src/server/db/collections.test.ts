import { describe, expect, it, vi } from "vitest";
import { COLLECTIONS, ensureCollections, indexName, type CollectionSpec } from "./collections";

function fakeDb(existing: string[]) {
  const createIndexes = vi.fn(async () => []);
  return {
    db: {
      listCollections: () => ({ toArray: async () => existing.map((name) => ({ name })) }),
      createCollection: vi.fn(async () => ({})),
      command: vi.fn(async () => ({ ok: 1 })),
      collection: vi.fn(() => ({ createIndexes })),
    },
    createIndexes,
  };
}

const specs: CollectionSpec[] = [
  { name: "widgets", indexes: [{ key: { slug: 1 }, unique: true }], validator: { $jsonSchema: { bsonType: "object" } } },
  { name: "events", indexes: [{ key: { at: -1 }, name: "by_time" }] },
];

describe("collection setup", () => {
  it("registers no collections in M1", () => {
    expect(COLLECTIONS).toEqual([]);
  });

  it("dry run plans actions without touching the database", async () => {
    const { db, createIndexes } = fakeDb(["events"]);
    const actions = await ensureCollections(db as never, specs, { apply: false });
    expect(actions).toEqual([
      { action: "create-collection", collection: "widgets" },
      { action: "ensure-indexes", collection: "widgets", indexes: ["slug_1"] },
      { action: "ensure-indexes", collection: "events", indexes: ["by_time"] },
    ]);
    expect(db.createCollection).not.toHaveBeenCalled();
    expect(createIndexes).not.toHaveBeenCalled();
  });

  it("apply creates missing collections with validators, updates existing validators and ensures indexes", async () => {
    const { db, createIndexes } = fakeDb(["widgets"]);
    await ensureCollections(db as never, specs, { apply: true });
    expect(db.command).toHaveBeenCalledWith({ collMod: "widgets", validator: specs[0].validator, validationLevel: "moderate" });
    expect(db.createCollection).toHaveBeenCalledWith("events", {});
    expect(createIndexes).toHaveBeenCalledTimes(2);
  });

  it("names indexes like MongoDB does", () => {
    expect(indexName({ key: { unitId: 1, blockStart: 1 } })).toBe("unitId_1_blockStart_1");
  });
});
