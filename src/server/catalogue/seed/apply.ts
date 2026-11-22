import type { Db } from "mongodb";
import { planCollections, type CollectionSpec } from "../../db/collections";
import { CATALOGUE_COLLECTION_SPECS, CATALOGUE_COLLECTIONS } from "../collections";
import type { CatalogueSeed } from "../types";
import { NATURAL_KEY, planSeed, SEED_ORDER, type CatalogueKey, type ExistingCatalogue, type SeedPlan, type StoredDoc } from "./plan";

/**
 * Seed execution (M2 P2d): read → plan → (only with apply and a safe plan) write.
 *
 * Writes are sequential per document and NOT transactional: if a write fails part-way, earlier writes
 * stay. The report lists exactly what was written and what was not; re-running re-plans from the stored
 * state and converges. Nothing is ever deleted, and a document that is not demo-owned is never written.
 */

export type CollectionNames = Record<CatalogueKey, string>;
export const DEFAULT_COLLECTION_NAMES: CollectionNames = { ...CATALOGUE_COLLECTIONS };

/** `createCollection` is only part of the type because planCollections shares setup's Db shape; the seed never calls it. */
type SeedDb = Pick<Db, "databaseName" | "collection" | "listCollections" | "command" | "createCollection">;

export class SeedSetupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SeedSetupError";
  }
}

/** The target collections must exist with their validators and indexes (db:setup) before seeding. */
export async function assertSetupComplete(db: SeedDb, names: CollectionNames): Promise<void> {
  const specs: CollectionSpec[] = CATALOGUE_COLLECTION_SPECS.map((spec) => {
    const key = (Object.keys(CATALOGUE_COLLECTIONS) as CatalogueKey[]).find((k) => CATALOGUE_COLLECTIONS[k] === spec.name)!;
    return { ...spec, name: names[key] };
  });
  const plan = await planCollections(db, specs);
  if (plan.actions.length || plan.conflicts.length)
    throw new SeedSetupError(
      `Collection setup is incomplete (${plan.actions.length} pending setup action(s), ${plan.conflicts.length} conflict(s)). Run db:setup first; the seed never creates collections or indexes.`,
    );
}

export async function readCatalogue(db: SeedDb, names: CollectionNames): Promise<ExistingCatalogue> {
  const out = {} as ExistingCatalogue;
  for (const key of SEED_ORDER) out[key] = (await db.collection(names[key]).find({}).toArray()) as StoredDoc[];
  return out;
}

export type WriteOutcome = { collection: CatalogueKey; key: string; op: "insert" | "update"; result: "done" | "skipped" | "failed"; reason?: string };
export type ApplyReport = { outcomes: WriteOutcome[]; inserted: number; updated: number; skipped: number; failed: number; complete: boolean };

/**
 * Apply a SAFE plan. Inserts never overwrite (a duplicate-key race is reported as skipped); updates
 * match `_id` + natural key + `dataOrigin: "demo"`, so a document that changed ownership or vanished
 * since planning is skipped and reported. Stops at the first unexpected error and reports the rest as
 * not attempted.
 */
export async function applySeedPlan(db: SeedDb, plan: SeedPlan, names: CollectionNames, now: Date = new Date()): Promise<ApplyReport> {
  if (!plan.safe) throw new SeedSetupError("Refusing to apply an unsafe seed plan (validation errors or conflicts). Nothing was written.");
  const outcomes: WriteOutcome[] = [];
  let stopped: string | undefined;

  for (const cp of plan.collections) {
    const col = db.collection(names[cp.collection]);
    for (const ins of cp.inserts) {
      if (stopped) {
        outcomes.push({ collection: cp.collection, key: ins.key, op: "insert", result: "failed", reason: `not attempted: ${stopped}` });
        continue;
      }
      try {
        await col.insertOne({ ...ins.doc, createdAt: now, updatedAt: now });
        outcomes.push({ collection: cp.collection, key: ins.key, op: "insert", result: "done" });
      } catch (err) {
        const e = err as { code?: number; codeName?: string; name?: string };
        if (e.code === 11000) outcomes.push({ collection: cp.collection, key: ins.key, op: "insert", result: "skipped", reason: "a document with this key appeared since planning; not overwritten" });
        else {
          stopped = `${e.name ?? "Error"}${e.codeName ? ` (${e.codeName})` : ""}`;
          outcomes.push({ collection: cp.collection, key: ins.key, op: "insert", result: "failed", reason: stopped });
        }
      }
    }
    for (const up of cp.updates) {
      if (stopped) {
        outcomes.push({ collection: cp.collection, key: up.key, op: "update", result: "failed", reason: `not attempted: ${stopped}` });
        continue;
      }
      const update: Record<string, unknown> = { $set: { ...up.set, updatedAt: now } };
      if (up.unset.length) update.$unset = Object.fromEntries(up.unset.map((f) => [f, ""]));
      try {
        const res = await col.updateOne({ _id: up._id, [NATURAL_KEY[cp.collection]]: up.key, dataOrigin: "demo" } as never, update);
        if (res.matchedCount === 1) outcomes.push({ collection: cp.collection, key: up.key, op: "update", result: "done" });
        else outcomes.push({ collection: cp.collection, key: up.key, op: "update", result: "skipped", reason: "document changed ownership or was removed since planning; not written" });
      } catch (err) {
        const e = err as { codeName?: string; name?: string };
        stopped = `${e.name ?? "Error"}${e.codeName ? ` (${e.codeName})` : ""}`;
        outcomes.push({ collection: cp.collection, key: up.key, op: "update", result: "failed", reason: stopped });
      }
    }
  }

  const count = (r: WriteOutcome["result"], op?: WriteOutcome["op"]) => outcomes.filter((o) => o.result === r && (!op || o.op === op)).length;
  return {
    outcomes,
    inserted: count("done", "insert"),
    updated: count("done", "update"),
    skipped: count("skipped"),
    failed: count("failed"),
    complete: count("skipped") === 0 && count("failed") === 0,
  };
}

export type SeedRunResult = { plan: SeedPlan; report?: ApplyReport };

/**
 * The whole seed run used by the CLI and the integration tests: setup check → read → plan → apply (only
 * when `apply` is true AND the plan is safe). The plan is computed from the stored state immediately
 * before writing.
 */
export async function seedCatalogue(
  db: SeedDb,
  seed: CatalogueSeed,
  { apply, names = DEFAULT_COLLECTION_NAMES, now }: { apply: boolean; names?: CollectionNames; now?: Date },
): Promise<SeedRunResult> {
  await assertSetupComplete(db, names);
  const plan = planSeed(seed, await readCatalogue(db, names));
  if (!apply || !plan.safe || plan.writes === 0) return { plan };
  return { plan, report: await applySeedPlan(db, plan, names, now) };
}
