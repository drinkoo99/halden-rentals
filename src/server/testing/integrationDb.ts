import { randomBytes } from "node:crypto";
import type { Db, MongoClient } from "mongodb";
import { createMongoClient } from "../db/mongo";
import { isTestDatabase, resolveTestDatabase, TargetGuardError } from "../db/targets";

/**
 * Integration-test database harness (M2 P2b). The ONLY way integration tests may reach MongoDB.
 *
 * Isolation is per test run, not per database:
 * - the database comes exclusively from `resolveTestDatabase` (halden_test[_suffix], never the
 *   application database, never production) — there is no fallback to MONGODB_DB or "halden";
 * - the connected handle's name is re-checked before it is handed out and again before cleanup;
 * - every collection a run creates is named `it_<runId>_<name>`; cleanup drops only collections with
 *   that exact run prefix (concurrent runs and anything else in the test database are untouched);
 * - only `drop()` on individual, prefix-matched collections — never dropDatabase.
 *
 * Use `withIntegrationDatabase(fn)`: cleanup and close run in a finally block, and a cleanup failure
 * never hides the test's own failure.
 */

type Env = Record<string, string | undefined>;

/** `<yyyymmddhhmmss UTC>_<12 hex>`: time-ordered and collision-resistant (48 random bits per run). */
export const RUN_ID_PATTERN = /^\d{14}_[0-9a-f]{12}$/;
/** Base names a test may scope: a letter, then letters/digits, at most 41 characters. */
export const BASE_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]{0,40}$/;
export const RUN_COLLECTION_PREFIX = "it_";

export function newRunId(now: Date = new Date(), random: Buffer = randomBytes(6)): string {
  const stamp = now.toISOString().replace(/\D/g, "").slice(0, 14);
  const id = `${stamp}_${random.toString("hex")}`;
  if (!RUN_ID_PATTERN.test(id)) throw new TargetGuardError(`Invalid run id "${id}"`);
  return id;
}

/** `it_<runId>_<base>`, after validating both parts. */
export function scopedName(runId: string, base: string): string {
  if (!RUN_ID_PATTERN.test(runId)) throw new TargetGuardError(`Invalid run id "${runId}"`);
  if (!BASE_NAME_PATTERN.test(base)) throw new TargetGuardError(`Invalid collection base name "${base}" (letters and digits only, starting with a letter, max 41)`);
  return `${RUN_COLLECTION_PREFIX}${runId}_${base}`;
}

/** True only for a well-formed collection name created by exactly this run. */
export function belongsToRun(collectionName: string, runId: string): boolean {
  if (!RUN_ID_PATTERN.test(runId)) return false;
  const prefix = `${RUN_COLLECTION_PREFIX}${runId}_`;
  return collectionName.startsWith(prefix) && BASE_NAME_PATTERN.test(collectionName.slice(prefix.length));
}

/**
 * Throws unless `db` is the guard-resolved test database: a halden_test[_suffix] name, equal to what
 * `resolveTestDatabase` returns for this environment (so it also differs from MONGODB_DB and is not production).
 */
export function assertIntegrationDatabase(db: Pick<Db, "databaseName">, env: Env): void {
  const expected = resolveTestDatabase(env);
  if (!isTestDatabase(db.databaseName) || db.databaseName !== expected)
    throw new TargetGuardError(`Refusing to use database "${db.databaseName}" for integration tests (expected "${expected}").`);
}

type CleanupDb = Pick<Db, "databaseName" | "listCollections" | "collection">;

/**
 * Drop this run's collections (and nothing else). Re-checks the database first. Every matching
 * collection is attempted; failures are collected and thrown together afterwards. A collection that
 * has already gone (NamespaceNotFound) is not an error.
 */
export async function cleanupRun(db: CleanupDb, runId: string, env: Env): Promise<string[]> {
  assertIntegrationDatabase(db, env);
  if (!RUN_ID_PATTERN.test(runId)) throw new TargetGuardError(`Invalid run id "${runId}"`);
  const names = (await db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name).filter((n) => belongsToRun(n, runId));
  const dropped: string[] = [];
  const failures: unknown[] = [];
  for (const name of names) {
    try {
      await db.collection(name).drop();
      dropped.push(name);
    } catch (err) {
      if ((err as { codeName?: string }).codeName !== "NamespaceNotFound") failures.push(err);
    }
  }
  if (failures.length) throw new AggregateError(failures, `Cleanup could not drop ${failures.length} collection(s) of run ${runId}`);
  return dropped;
}

export type IntegrationDatabase = {
  /** Always the guard-resolved test database (e.g. "halden_test"). */
  name: string;
  db: Db;
  runId: string;
  /** Collection name scoped to this run: `it_<runId>_<base>`. */
  scoped: (base: string) => string;
  /** Drops this run's collections only. */
  cleanup: () => Promise<string[]>;
  close: () => Promise<void>;
};

type ClientFactory = (uri: string) => MongoClient;

/** Connect to the guard-resolved test database. Throws (before connecting) if the configuration is unsafe. */
export async function openIntegrationDatabase(
  env: Env = process.env,
  // generous timeouts: TLS handshakes to the shared Atlas cluster can take several seconds on slow links
  createClient: ClientFactory = (uri) =>
    createMongoClient(uri, { appName: "halden-integration-tests", serverSelectionTimeoutMS: 20_000, connectTimeoutMS: 20_000 }),
): Promise<IntegrationDatabase> {
  const name = resolveTestDatabase(env); // throws for missing URI, halden, production, wrong naming, == MONGODB_DB
  const client = createClient(env.MONGODB_URI as string);
  try {
    await client.connect();
    const db = client.db(name);
    assertIntegrationDatabase(db, env);
    const runId = newRunId();
    return {
      name,
      db,
      runId,
      scoped: (base) => scopedName(runId, base),
      cleanup: () => cleanupRun(db, runId, env),
      close: () => client.close(),
    };
  } catch (err) {
    await client.close().catch(() => {});
    throw err;
  }
}

/**
 * Run `fn` against a fresh run of the integration database. Cleanup and close always run (finally).
 * - fn fails, cleanup fine      → fn's error is rethrown unchanged;
 * - fn fails, cleanup fails     → AggregateError([fnError, cleanupError]) — the original stays first;
 * - fn succeeds, cleanup fails  → the cleanup error is thrown (leftovers must fail the test).
 */
export async function withIntegrationDatabase<T>(
  fn: (it: IntegrationDatabase) => Promise<T>,
  open: () => Promise<IntegrationDatabase> = () => openIntegrationDatabase(),
): Promise<T> {
  const it = await open();
  let result: T | undefined;
  let failed = false;
  let failure: unknown;
  const cleanupErrors: unknown[] = [];
  try {
    result = await fn(it);
  } catch (err) {
    failed = true;
    failure = err;
  } finally {
    try {
      await it.cleanup();
    } catch (err) {
      cleanupErrors.push(err);
    }
    try {
      await it.close();
    } catch (err) {
      cleanupErrors.push(err);
    }
  }
  if (failed && cleanupErrors.length) throw new AggregateError([failure, ...cleanupErrors], "Integration test failed, and its cleanup also failed");
  if (failed) throw failure;
  if (cleanupErrors.length) throw cleanupErrors.length === 1 ? cleanupErrors[0] : new AggregateError(cleanupErrors, "Integration test cleanup failed");
  return result as T;
}
