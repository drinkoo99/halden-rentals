import type { z } from "zod";
import { canonical } from "../../db/collections";
import { storedExtraSchema, storedLocationSchema, storedVehicleModelSchema } from "../schemas";
import type { CatalogueSeed } from "../types";
import { validateCatalogueSeed } from "./validate";

/**
 * Seed planning (M2 P2d). Pure: given the desired demo seed and the documents currently stored,
 * decide what to insert, update or leave alone. No I/O; apply.ts performs the writes.
 *
 * Rules:
 * - the seed manages ONLY documents with `dataOrigin: "demo"`;
 * - a seed key with no stored document → insert;
 * - a demo-owned stored document → update only the content fields that differ (unchanged → no write);
 * - a NON-demo stored document with a seed natural key, or holding a value another seed document needs
 *   under a unique index (exhibit, IATA code) → conflict: the whole run is unsafe;
 * - stored documents the seed does not mention are left alone (reported, never deleted);
 * - the seed and every stored document are validated first; any problem anywhere makes the whole plan
 *   unsafe, so nothing is written to any collection.
 *
 * Timestamps and `_id` are storage metadata: they never take part in the comparison, so a second run
 * after a successful apply plans zero writes.
 */

export type CatalogueKey = keyof CatalogueSeed;
export const SEED_ORDER: CatalogueKey[] = ["locations", "vehicleModels", "extras"];

/** Natural key per collection (P1) and the other uniquely indexed fields (P2a). */
export const NATURAL_KEY: Record<CatalogueKey, string> = { locations: "code", vehicleModels: "slug", extras: "code" };
export const SECONDARY_UNIQUE: Record<CatalogueKey, string[]> = { locations: ["iataCode"], vehicleModels: ["exhibit"], extras: [] };

const STORED_SCHEMA: Record<CatalogueKey, z.ZodType> = {
  locations: storedLocationSchema,
  vehicleModels: storedVehicleModelSchema,
  extras: storedExtraSchema,
};

/** Fields that are storage metadata, not seed content. */
const METADATA = new Set(["_id", "createdAt", "updatedAt"]);

export type StoredDoc = Record<string, unknown> & { _id: unknown };
export type ExistingCatalogue = Record<CatalogueKey, StoredDoc[]>;

export type SeedValidationError = { collection: CatalogueKey; key: string; source: "seed" | "stored"; problem: string };
export type SeedConflict = { collection: CatalogueKey; key: string; problem: string };
export type SeedInsert = { key: string; doc: Record<string, unknown> };
export type SeedUpdate = { key: string; _id: unknown; set: Record<string, unknown>; unset: string[] };

export type CollectionPlan = {
  collection: CatalogueKey;
  seedCount: number;
  inserts: SeedInsert[];
  updates: SeedUpdate[];
  unchanged: string[];
  /** stored documents not owned by the seed (dataOrigin ≠ "demo") that the seed does not touch */
  unmanagedSkipped: string[];
  /** demo documents no longer in the seed: left alone, never deleted */
  orphanedDemo: string[];
  conflicts: SeedConflict[];
};

export type SeedPlan = {
  collections: CollectionPlan[];
  validationErrors: SeedValidationError[];
  /** true only when there are no validation errors and no conflicts in ANY collection */
  safe: boolean;
  writes: number;
};

const keyOf = (collection: CatalogueKey, doc: Record<string, unknown>) => String(doc[NATURAL_KEY[collection]] ?? "(no key)");
const content = (doc: Record<string, unknown>) => Object.fromEntries(Object.entries(doc).filter(([k]) => !METADATA.has(k)));

/** Validation problems as "path: message" — field paths and rule messages only, never stored values. */
function problemsOf(result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }): string[] {
  return result.success ? [] : result.error!.issues.map((i) => `${i.path.map(String).join(".") || "(document)"}: ${i.message}`);
}

export function planSeed(seed: CatalogueSeed, existing: ExistingCatalogue): SeedPlan {
  const validationErrors: SeedValidationError[] = validateCatalogueSeed(seed).map((i) => ({ ...i, source: "seed" as const }));

  // every stored document must be valid before anything is planned
  for (const collection of SEED_ORDER) {
    const seen = new Map<string, number>();
    for (const doc of existing[collection]) {
      const key = keyOf(collection, doc);
      for (const problem of problemsOf(STORED_SCHEMA[collection].safeParse(doc))) validationErrors.push({ collection, key, source: "stored", problem });
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }
    for (const [key, n] of seen) if (n > 1) validationErrors.push({ collection, key, source: "stored", problem: `${n} stored documents share this natural key` });
  }

  const collections = SEED_ORDER.map((collection): CollectionPlan => {
    const desired = seed[collection] as unknown as Record<string, unknown>[];
    const stored = existing[collection];
    const keyField = NATURAL_KEY[collection];
    const byKey = new Map(stored.map((d) => [keyOf(collection, d), d]));
    const seedKeys = new Set(desired.map((d) => keyOf(collection, d)));
    const plan: CollectionPlan = { collection, seedCount: desired.length, inserts: [], updates: [], unchanged: [], unmanagedSkipped: [], orphanedDemo: [], conflicts: [] };

    for (const want of desired) {
      const key = keyOf(collection, want);
      const have = byKey.get(key);
      if (!have) {
        plan.inserts.push({ key, doc: want });
        continue;
      }
      if (have.dataOrigin !== "demo") {
        plan.conflicts.push({ collection, key, problem: `a document with ${keyField} "${key}" exists but is not demo-owned (dataOrigin "${String(have.dataOrigin)}"); it will not be overwritten` });
        continue;
      }
      const current = content(have);
      const set: Record<string, unknown> = {};
      for (const [field, value] of Object.entries(want)) if (canonical(current[field]) !== canonical(value)) set[field] = value;
      const unset = Object.keys(current).filter((field) => !(field in want));
      if (Object.keys(set).length || unset.length) plan.updates.push({ key, _id: have._id, set, unset });
      else plan.unchanged.push(key);
    }

    // a stored document outside the seed may still hold a uniquely indexed value a seed document needs
    for (const field of SECONDARY_UNIQUE[collection]) {
      for (const want of desired) {
        const holder = want[field] !== undefined && stored.find((d) => d[field] === want[field] && keyOf(collection, d) !== keyOf(collection, want));
        if (holder)
          plan.conflicts.push({
            collection,
            key: keyOf(collection, want),
            problem: `${field} "${String(want[field])}" is already used by "${keyOf(collection, holder)}" (dataOrigin "${String(holder.dataOrigin)}")`,
          });
      }
    }

    for (const doc of stored) {
      const key = keyOf(collection, doc);
      if (seedKeys.has(key)) continue;
      if (doc.dataOrigin === "demo") plan.orphanedDemo.push(key);
      else plan.unmanagedSkipped.push(key);
    }
    return plan;
  });

  const conflicts = collections.reduce((n, c) => n + c.conflicts.length, 0);
  const safe = validationErrors.length === 0 && conflicts === 0;
  const writes = collections.reduce((n, c) => n + c.inserts.length + c.updates.length, 0);
  return { collections, validationErrors, safe, writes };
}
