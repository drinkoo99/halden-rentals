import { describe, expect, it } from "vitest";
import { isTestDatabase } from "../db/targets";
import { belongsToRun, openIntegrationDatabase, RUN_COLLECTION_PREFIX, withIntegrationDatabase } from "./integrationDb";

/**
 * Harness smoke test against the real test database (halden_test). Runs only via
 * `npm run test:integration`. Proves: the database is the guard-resolved test database; a run can
 * write and read its own scoped collections; cleanup removes exactly that run's collections — on
 * success and on failure — and leaves concurrent runs and everything else alone.
 *
 * Assertions only look at this file's own run collections plus the non-run collections, so other
 * runs using halden_test at the same time cannot make these tests flaky.
 */

/** Read-only snapshot of the test database's collection names. */
async function collectionNames(): Promise<string[]> {
  const it = await openIntegrationDatabase();
  try {
    return (await it.db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name).sort();
  } finally {
    await it.close();
  }
}
const nonRunCollections = (names: string[]) => names.filter((n) => !n.startsWith(RUN_COLLECTION_PREFIX));

type Probe = { _id: string; value: number; at: Date };

describe("integration database harness (halden_test)", () => {
  it("connects only to the guard-resolved test database", async () => {
    await withIntegrationDatabase(async (it) => {
      expect(it.name).toBe("halden_test");
      expect(it.db.databaseName).toBe("halden_test");
      expect(isTestDatabase(it.db.databaseName)).toBe(true);
      expect((await it.db.command({ ping: 1 })).ok).toBe(1);
    });
  });

  it("writes and reads in a run-scoped collection, then removes it", async () => {
    let runId = "";
    let name = "";
    await withIntegrationDatabase(async (it) => {
      runId = it.runId;
      name = it.scoped("probe");
      expect(belongsToRun(name, runId)).toBe(true);
      const probes = it.db.collection<Probe>(name);
      await probes.insertOne({ _id: "probe-1", value: 42, at: new Date() });
      expect(await probes.findOne({ _id: "probe-1" })).toMatchObject({ _id: "probe-1", value: 42 });
    });
    expect((await collectionNames()).filter((n) => belongsToRun(n, runId))).toEqual([]);
  });

  it("cleans up only its own run — a concurrent run's collections survive until that run cleans up", async () => {
    const othersBefore = nonRunCollections(await collectionNames());
    let runIds: string[] = [];
    // nested: each run gets the harness's finally-based cleanup, so no cleanup failure is swallowed
    await withIntegrationDatabase(async (runA) => {
      await withIntegrationDatabase(async (runB) => {
        runIds = [runA.runId, runB.runId];
        expect(runA.runId).not.toBe(runB.runId);
        await runA.db.collection(runA.scoped("shared")).insertOne({ run: "A" });
        await runB.db.collection(runB.scoped("shared")).insertOne({ run: "B" });

        expect(await runA.cleanup()).toEqual([runA.scoped("shared")]);
        const mid = await collectionNames();
        expect(mid).not.toContain(runA.scoped("shared"));
        expect(mid).toContain(runB.scoped("shared")); // the other run is untouched
        expect(await runB.db.collection(runB.scoped("shared")).countDocuments()).toBe(1);
      });
    });
    const after = await collectionNames();
    expect(after.filter((n) => runIds.some((id) => belongsToRun(n, id)))).toEqual([]);
    expect(nonRunCollections(after)).toEqual(othersBefore); // nothing outside the run prefixes changed
  });

  it("cleans up after a failing test and rethrows the original failure", async () => {
    let runId = "";
    const original = new Error("deliberate test failure");
    await expect(
      withIntegrationDatabase(async (it) => {
        runId = it.runId;
        await it.db.collection(it.scoped("failing")).insertOne({ step: 1 });
        throw original;
      }),
    ).rejects.toBe(original);
    expect((await collectionNames()).filter((n) => belongsToRun(n, runId))).toEqual([]);
  });
});
