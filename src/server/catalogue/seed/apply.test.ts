import { ObjectId } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { applySeedPlan, DEFAULT_COLLECTION_NAMES } from "./apply";
import type { SeedPlan } from "./plan";

// Unit tests of the write step with a recording fake; the real database is covered by seed.int.test.ts.
function fakeDb(behaviour: { insertError?: Record<string, unknown>; matched?: number; updateError?: Record<string, unknown> } = {}) {
  const calls: { op: string; collection: string; arg: unknown; arg2?: unknown }[] = [];
  const db = {
    databaseName: "x",
    collection: vi.fn((name: string) => ({
      insertOne: vi.fn(async (doc: unknown) => {
        calls.push({ op: "insertOne", collection: name, arg: doc });
        if (behaviour.insertError) throw Object.assign(new Error("insert failed"), behaviour.insertError);
        return { acknowledged: true };
      }),
      updateOne: vi.fn(async (filter: unknown, update: unknown) => {
        calls.push({ op: "updateOne", collection: name, arg: filter, arg2: update });
        if (behaviour.updateError) throw Object.assign(new Error("update failed"), behaviour.updateError);
        return { matchedCount: behaviour.matched ?? 1, modifiedCount: behaviour.matched ?? 1 };
      }),
      deleteOne: vi.fn(),
      deleteMany: vi.fn(),
      drop: vi.fn(),
    })),
    listCollections: vi.fn(),
    command: vi.fn(),
    createCollection: vi.fn(),
    dropDatabase: vi.fn(),
  };
  return { db, calls };
}

const id = new ObjectId();
const plan = (over: Partial<SeedPlan> = {}): SeedPlan => ({
  safe: true,
  writes: 2,
  validationErrors: [],
  collections: [
    { collection: "locations", seedCount: 1, inserts: [{ key: "zrh", doc: { code: "zrh", dataOrigin: "demo" } }], updates: [], unchanged: [], unmanagedSkipped: [], orphanedDemo: [], conflicts: [] },
    { collection: "vehicleModels", seedCount: 1, inserts: [], updates: [{ key: "gt3", _id: id, set: { headline: "H" }, unset: ["galleryBadge"] }], unchanged: [], unmanagedSkipped: [], orphanedDemo: [], conflicts: [] },
    { collection: "extras", seedCount: 0, inserts: [], updates: [], unchanged: [], unmanagedSkipped: [], orphanedDemo: [], conflicts: [] },
  ],
  ...over,
});
const now = new Date("2026-11-22T12:00:00Z");

describe("applySeedPlan", () => {
  it("refuses an unsafe plan without writing anything", async () => {
    const { db, calls } = fakeDb();
    await expect(applySeedPlan(db as never, plan({ safe: false }), DEFAULT_COLLECTION_NAMES, now)).rejects.toThrow("Nothing was written");
    expect(calls).toEqual([]);
  });

  it("inserts with timestamps and updates only demo-owned documents by _id + natural key; never deletes", async () => {
    const { db, calls } = fakeDb();
    const report = await applySeedPlan(db as never, plan(), DEFAULT_COLLECTION_NAMES, now);
    expect(report).toMatchObject({ inserted: 1, updated: 1, skipped: 0, failed: 0, complete: true });
    expect(calls[0]).toEqual({ op: "insertOne", collection: "locations", arg: { code: "zrh", dataOrigin: "demo", createdAt: now, updatedAt: now } });
    expect(calls[1]).toEqual({
      op: "updateOne",
      collection: "vehicleModels",
      arg: { _id: id, slug: "gt3", dataOrigin: "demo" },
      arg2: { $set: { headline: "H", updatedAt: now }, $unset: { galleryBadge: "" } }, // createdAt is never touched
    });
    expect(calls.some((c) => /delete|drop/i.test(c.op))).toBe(false);
  });

  it("reports a duplicate-key insert race as skipped instead of overwriting", async () => {
    const { db } = fakeDb({ insertError: { code: 11000, codeName: "DuplicateKey" } });
    const report = await applySeedPlan(db as never, plan(), DEFAULT_COLLECTION_NAMES, now);
    expect(report.outcomes[0]).toMatchObject({ op: "insert", result: "skipped", reason: expect.stringContaining("not overwritten") });
    expect(report.updated).toBe(1); // other planned writes still happen
    expect(report.complete).toBe(false);
  });

  it("skips an update whose document changed ownership or vanished since planning", async () => {
    const { db } = fakeDb({ matched: 0 });
    const report = await applySeedPlan(db as never, plan(), DEFAULT_COLLECTION_NAMES, now);
    expect(report.outcomes[1]).toMatchObject({ op: "update", result: "skipped", reason: expect.stringContaining("changed ownership") });
    expect(report.complete).toBe(false);
  });

  it("stops at an unexpected error and reports the rest as not attempted (partial outcome, no atomicity claim)", async () => {
    const { db, calls } = fakeDb({ insertError: { code: 13, codeName: "Unauthorized", name: "MongoServerError" } });
    const report = await applySeedPlan(db as never, plan(), DEFAULT_COLLECTION_NAMES, now);
    expect(report.outcomes).toEqual([
      { collection: "locations", key: "zrh", op: "insert", result: "failed", reason: "MongoServerError (Unauthorized)" },
      { collection: "vehicleModels", key: "gt3", op: "update", result: "failed", reason: "not attempted: MongoServerError (Unauthorized)" },
    ]);
    expect(calls.map((c) => c.op)).toEqual(["insertOne"]); // the update was never sent
    expect(report).toMatchObject({ inserted: 0, updated: 0, failed: 2, complete: false });
  });

  it("writes to the collection names it is given (run-scoped names in tests)", async () => {
    const { db, calls } = fakeDb();
    await applySeedPlan(db as never, plan(), { locations: "it_x_locations", vehicleModels: "it_x_vehicleModels", extras: "it_x_extras" }, now);
    expect(calls.map((c) => c.collection)).toEqual(["it_x_locations", "it_x_vehicleModels"]);
  });
});
