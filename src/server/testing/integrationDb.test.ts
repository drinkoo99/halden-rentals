import { describe, expect, it, vi } from "vitest";
import { TargetGuardError } from "../db/targets";
import {
  assertIntegrationDatabase,
  belongsToRun,
  cleanupRun,
  newRunId,
  openIntegrationDatabase,
  RUN_ID_PATTERN,
  scopedName,
  withIntegrationDatabase,
  type IntegrationDatabase,
} from "./integrationDb";

// Unit tests only — no database. The real-database smoke test is integrationDb.int.test.ts.
const ENV = { MONGODB_URI: "mongodb://unit-test.invalid", MONGODB_DB: "halden" };
const RUN = "20261122103000_0123456789ab";
const OTHER_RUN = "20261122103000_ba9876543210";

describe("run ids", () => {
  it("are `<UTC timestamp>_<12 hex>`", () => {
    expect(newRunId(new Date("2026-11-22T10:30:00.123Z"), Buffer.from("0123456789ab", "hex"))).toBe("20261122103000_0123456789ab");
    expect(newRunId()).toMatch(RUN_ID_PATTERN);
  });
  it("do not collide across many runs in the same second", () => {
    const now = new Date();
    const ids = new Set(Array.from({ length: 5_000 }, () => newRunId(now)));
    expect(ids.size).toBe(5_000);
  });
});

describe("scopedName", () => {
  it("prefixes a valid base name with the run", () => {
    expect(scopedName(RUN, "vehicleModels")).toBe(`it_${RUN}_vehicleModels`);
  });
  it.each(["", "1abc", "has space", "dot.name", "dollar$", "slash/x", "../x", "a".repeat(42), "ümlaut", "dash-name", "under_score"])(
    "rejects base name %j",
    (base) => {
      expect(() => scopedName(RUN, base)).toThrow(TargetGuardError);
    },
  );
  it("always prefixes, so even a base named 'system' can never be a real system collection", () => {
    expect(scopedName(RUN, "system")).toBe(`it_${RUN}_system`);
  });
  it("rejects a malformed run id", () => {
    for (const run of ["", "abc", "20261122103000_XYZ", "20261122103000_0123456789ab_extra"]) expect(() => scopedName(run, "x")).toThrow(TargetGuardError);
  });
});

describe("belongsToRun", () => {
  it("matches only well-formed names of exactly this run", () => {
    expect(belongsToRun(`it_${RUN}_locations`, RUN)).toBe(true);
    expect(belongsToRun(`it_${OTHER_RUN}_locations`, RUN)).toBe(false);
    expect(belongsToRun(`it_${RUN}locations`, RUN)).toBe(false); // missing separator
    expect(belongsToRun(`it_${RUN}_`, RUN)).toBe(false); // no base name
    expect(belongsToRun(`it_${RUN}_bad.name`, RUN)).toBe(false);
    expect(belongsToRun("locations", RUN)).toBe(false);
    expect(belongsToRun(`x_it_${RUN}_locations`, RUN)).toBe(false);
    expect(belongsToRun(`it_${RUN}_locations`, "")).toBe(false);
  });
});

describe("assertIntegrationDatabase", () => {
  it("accepts the guard-resolved test database", () => {
    expect(() => assertIntegrationDatabase({ databaseName: "halden_test" }, ENV)).not.toThrow();
  });
  it.each(["halden", "halden_dev", "halden_prod", "admin", "halden_test_other"])("refuses a handle on %s", (name) => {
    expect(() => assertIntegrationDatabase({ databaseName: name }, ENV)).toThrow(TargetGuardError);
  });
  it("refuses when the environment itself is unsafe", () => {
    expect(() => assertIntegrationDatabase({ databaseName: "halden_test" }, { ...ENV, MONGODB_DB: "halden_test" })).toThrow("must differ");
    expect(() => assertIntegrationDatabase({ databaseName: "halden_test" }, { MONGODB_DB: "halden" })).toThrow("need MONGODB_URI");
  });
});

/** Fake Db: records drops, and would record dropDatabase (which must never be called). */
function fakeDb(name: string, collections: string[], failDrop: Record<string, { codeName?: string }> = {}) {
  const dropped: string[] = [];
  const db = {
    databaseName: name,
    listCollections: vi.fn(() => ({ toArray: async () => collections.map((c) => ({ name: c })) })),
    collection: vi.fn((c: string) => ({
      drop: vi.fn(async () => {
        if (failDrop[c]) throw Object.assign(new Error("drop failed"), failDrop[c]);
        dropped.push(c);
        return true;
      }),
    })),
    dropDatabase: vi.fn(),
  };
  return { db, dropped };
}

describe("cleanupRun", () => {
  const mine = [`it_${RUN}_locations`, `it_${RUN}_extras`];
  const others = [`it_${OTHER_RUN}_locations`, "locations", "vehicleModels", `it_${RUN}x`, "system.views"];

  it("drops exactly this run's collections and nothing else", async () => {
    const { db, dropped } = fakeDb("halden_test", [...others, ...mine]);
    expect(await cleanupRun(db as never, RUN, ENV)).toEqual(mine);
    expect(dropped).toEqual(mine);
    expect(db.dropDatabase).not.toHaveBeenCalled();
  });

  it("refuses before listing or dropping anything when the handle is not the test database", async () => {
    const { db } = fakeDb("halden", mine);
    await expect(cleanupRun(db as never, RUN, ENV)).rejects.toThrow(TargetGuardError);
    expect(db.listCollections).not.toHaveBeenCalled();
    expect(db.collection).not.toHaveBeenCalled();
  });

  it("refuses a malformed run id before dropping anything", async () => {
    const { db } = fakeDb("halden_test", mine);
    await expect(cleanupRun(db as never, "", ENV)).rejects.toThrow(TargetGuardError);
    expect(db.collection).not.toHaveBeenCalled();
  });

  it("treats an already-dropped collection as done", async () => {
    const { db, dropped } = fakeDb("halden_test", mine, { [mine[0]]: { codeName: "NamespaceNotFound" } });
    expect(await cleanupRun(db as never, RUN, ENV)).toEqual([mine[1]]);
    expect(dropped).toEqual([mine[1]]);
  });

  it("attempts every collection, then reports all real failures together", async () => {
    const { db, dropped } = fakeDb("halden_test", mine, { [mine[0]]: { codeName: "Unauthorized" } });
    const err = await cleanupRun(db as never, RUN, ENV).catch((e) => e);
    expect(err).toBeInstanceOf(AggregateError);
    expect((err as AggregateError).errors).toHaveLength(1);
    expect(dropped).toEqual([mine[1]]); // the second collection was still dropped
  });
});

describe("withIntegrationDatabase", () => {
  function fakeHarness(opts: { cleanupFails?: boolean; closeFails?: boolean } = {}) {
    const calls: string[] = [];
    const it = {
      name: "halden_test",
      db: {} as never,
      runId: RUN,
      scoped: (b: string) => scopedName(RUN, b),
      cleanup: vi.fn(async () => {
        calls.push("cleanup");
        if (opts.cleanupFails) throw new Error("cleanup failed");
        return [];
      }),
      close: vi.fn(async () => {
        calls.push("close");
        if (opts.closeFails) throw new Error("close failed");
      }),
      startSession: () => {
        throw new Error("not used");
      },
    } satisfies IntegrationDatabase;
    return { it, calls, open: async () => it };
  }

  it("returns the result and always cleans up, then closes", async () => {
    const h = fakeHarness();
    expect(await withIntegrationDatabase(async () => 42, h.open)).toBe(42);
    expect(h.calls).toEqual(["cleanup", "close"]);
  });

  it("rethrows the test's own error unchanged after cleaning up", async () => {
    const h = fakeHarness();
    const original = new Error("assertion failed");
    await expect(withIntegrationDatabase(async () => { throw original; }, h.open)).rejects.toBe(original);
    expect(h.calls).toEqual(["cleanup", "close"]);
  });

  it("keeps the test's error first when cleanup also fails", async () => {
    const h = fakeHarness({ cleanupFails: true });
    const original = new Error("assertion failed");
    const err = await withIntegrationDatabase(async () => { throw original; }, h.open).catch((e) => e);
    expect(err).toBeInstanceOf(AggregateError);
    expect((err as AggregateError).errors[0]).toBe(original);
    expect(((err as AggregateError).errors[1] as Error).message).toBe("cleanup failed");
    expect(h.calls).toEqual(["cleanup", "close"]); // close still ran
  });

  it("fails a passing test when cleanup fails (no silent leftovers)", async () => {
    const h = fakeHarness({ cleanupFails: true });
    await expect(withIntegrationDatabase(async () => "ok", h.open)).rejects.toThrow("cleanup failed");
  });

  it("reports cleanup and close failures together", async () => {
    const h = fakeHarness({ cleanupFails: true, closeFails: true });
    const err = await withIntegrationDatabase(async () => "ok", h.open).catch((e) => e);
    expect(err).toBeInstanceOf(AggregateError);
    expect((err as AggregateError).errors.map((e: Error) => e.message)).toEqual(["cleanup failed", "close failed"]);
  });
});

describe("openIntegrationDatabase", () => {
  const neverCalled = () => {
    throw new Error("client must not be created");
  };

  it.each([
    ["no connection string", { MONGODB_DB: "halden" }],
    ["test database = halden", { ...ENV, MONGODB_TEST_DB: "halden" }],
    ["test database outside the naming convention", { ...ENV, MONGODB_TEST_DB: "halden_dev" }],
    ["test database equal to MONGODB_DB", { ...ENV, MONGODB_DB: "halden_test" }],
    ["production deployment", { ...ENV, VERCEL_ENV: "production" }],
  ])("refuses before creating a client: %s", async (_label, env) => {
    const create = vi.fn(neverCalled);
    await expect(openIntegrationDatabase(env, create as never)).rejects.toThrow(TargetGuardError);
    expect(create).not.toHaveBeenCalled();
  });

  it("closes the client and rethrows when connecting fails", async () => {
    const close = vi.fn(async () => {});
    const client = { connect: vi.fn(async () => { throw new Error("unreachable"); }), close, db: vi.fn() };
    await expect(openIntegrationDatabase(ENV, () => client as never)).rejects.toThrow("unreachable");
    expect(close).toHaveBeenCalled();
    expect(client.db).not.toHaveBeenCalled();
  });

  it("opens the guard-resolved test database and scopes names to a fresh run", async () => {
    const client = { connect: vi.fn(async () => {}), close: vi.fn(async () => {}), db: vi.fn((n: string) => ({ databaseName: n })) };
    const it = await openIntegrationDatabase(ENV, () => client as never);
    expect(client.db).toHaveBeenCalledWith("halden_test");
    expect(it.name).toBe("halden_test");
    expect(it.runId).toMatch(RUN_ID_PATTERN);
    expect(it.scoped("locations")).toBe(`it_${it.runId}_locations`);
  });
});
