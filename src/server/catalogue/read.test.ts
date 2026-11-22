import { ObjectId } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "../http/errors";
import { readPublicExtras, readPublicLocations, readPublicVehicles } from "./read";
import { catalogueSeedFromStatic } from "./seed/fromStatic";

// Query behaviour against a recording fake Db; the real database is covered by read.int.test.ts.
const at = new Date("2026-11-20T10:00:00Z");
const stored = <T extends object>(doc: T) => ({ _id: new ObjectId(), ...structuredClone(doc), createdAt: at, updatedAt: at });

function fakeDb(docs: Record<string, unknown>[] | Error) {
  const calls: { collection: string; filter: unknown; sort: unknown }[] = [];
  const db = {
    collection: (name: string) => ({
      find: (filter: unknown) => ({
        sort: (sort: unknown) => ({
          toArray: async () => {
            calls.push({ collection: name, filter, sort });
            if (docs instanceof Error) throw docs;
            return docs;
          },
        }),
      }),
    }),
  };
  return { db: db as never, calls };
}

let logged: string[];
beforeEach(() => {
  logged = [];
  vi.spyOn(console, "error").mockImplementation((line: string) => void logged.push(line));
  vi.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

const seed = catalogueSeedFromStatic();

describe("readPublic*", () => {
  it("queries only public documents, in catalogue order, from the right collection", async () => {
    const l = fakeDb([]);
    const v = fakeDb([]);
    const e = fakeDb([]);
    await readPublicLocations(l.db);
    await readPublicVehicles(v.db);
    await readPublicExtras(e.db);
    expect(l.calls).toEqual([{ collection: "locations", filter: { status: "active" }, sort: { sortOrder: 1 } }]);
    expect(v.calls).toEqual([{ collection: "vehicleModels", filter: { status: "published" }, sort: { sortOrder: 1 } }]);
    expect(e.calls).toEqual([{ collection: "extras", filter: { status: "active" }, sort: { sortOrder: 1 } }]);
  });

  it("uses the collection names it is given", async () => {
    const { db, calls } = fakeDb([]);
    await readPublicVehicles(db, { locations: "a", vehicleModels: "it_x_vehicleModels", extras: "c" });
    expect(calls[0].collection).toBe("it_x_vehicleModels");
  });

  it("returns an empty list for an empty collection", async () => {
    expect(await readPublicVehicles(fakeDb([]).db)).toEqual([]);
  });

  it("returns valid documents without internal fields", async () => {
    const { db } = fakeDb(seed.vehicleModels.map(stored));
    const out = await readPublicVehicles(db);
    expect(out).toHaveLength(10);
    for (const item of out) {
      for (const field of ["_id", "createdAt", "updatedAt", "dataOrigin", "schemaVersion", "status", "sortOrder"]) expect(item).not.toHaveProperty(field);
    }
    expect(out[0]).toMatchObject({ slug: seed.vehicleModels[0].slug, displayRate: seed.vehicleModels[0].displayRate });
  });

  it("fails with INTERNAL (500) on an invalid stored document, logging field paths but no values", async () => {
    const bad = stored({ ...seed.locations[0], timezone: "Secret/Value-123" });
    const err = await readPublicLocations(fakeDb([bad]).db).catch((e) => e);
    expect(err).toBeInstanceOf(AppError);
    expect(err).toMatchObject({ code: "INTERNAL", status: 500 });
    expect(logged.join("\n")).toContain("timezone");
    expect(logged.join("\n")).not.toContain("Secret/Value-123");
  });

  it("fails with SERVICE_UNAVAILABLE (503) on a database error, without the driver message", async () => {
    const err = await readPublicExtras(fakeDb(Object.assign(new Error("connect to db-host:27017 failed"), { name: "MongoServerSelectionError" })).db).catch((e) => e);
    expect(err).toMatchObject({ code: "SERVICE_UNAVAILABLE", status: 503 });
    expect(logged.join("\n")).toContain("MongoServerSelectionError");
    expect(logged.join("\n")).not.toContain("db-host");
  });
});
