import type { CreateCollectionOptions, Db, Document, IndexDescription } from "mongodb";
import { CATALOGUE_COLLECTION_SPECS } from "../catalogue/collections";
import { AUTH_COLLECTION_SPECS } from "../auth/collections";
import { BOOKING_COLLECTION_SPECS } from "../bookings/collections";
import { FLEET_COLLECTION_SPECS } from "../fleet/collections";

/**
 * Declarative collection setup: each milestone registers the collections it introduces (name, named
 * indexes, optional `$jsonSchema` validator) in `COLLECTIONS`. `scripts/db-setup.ts` applies them;
 * nothing is created at request time.
 *
 * Setup is diff-based and idempotent:
 * - `planCollections` is strictly read-only (listCollections / listIndexes) and reports only real
 *   differences: missing collections, changed validators, missing indexes;
 * - conflicts (an index with the same name but another definition, or the same keys under another
 *   name) are reported and block the whole apply — setup never drops or rebuilds anything;
 * - collections and indexes present in the database but not registered are reported as unmanaged and
 *   left alone;
 * - a validator is only re-applied (collMod) when it actually differs, so routine runs need no collMod.
 *
 * Pure module (no Next.js imports) so the setup script can import it.
 */

/** Every registered index carries an explicit name, so setup can compare it reliably. */
export type NamedIndex = IndexDescription & { name: string };

export type CollectionSpec = {
  name: string;
  indexes: NamedIndex[];
  /** `$jsonSchema` validator, applied with VALIDATION_SETTINGS */
  validator?: Document;
  options?: Omit<CreateCollectionOptions, "validator" | "validationLevel" | "validationAction">;
};

/** moderate: existing documents that do not match are not re-validated until they are updated. */
export const VALIDATION_SETTINGS = { validationLevel: "moderate", validationAction: "error" } as const;

export const COLLECTIONS: CollectionSpec[] = [...CATALOGUE_COLLECTION_SPECS, ...AUTH_COLLECTION_SPECS, ...FLEET_COLLECTION_SPECS, ...BOOKING_COLLECTION_SPECS];

export type SetupAction =
  | { action: "create-collection"; collection: string }
  | { action: "update-validator"; collection: string }
  | { action: "create-index"; collection: string; index: string };

export type SetupConflict = { collection: string; index: string; problem: string };

export type SetupPlan = {
  actions: SetupAction[];
  conflicts: SetupConflict[];
  unmanaged: { collections: string[]; indexes: { collection: string; index: string }[] };
};

export type SetupReport = SetupPlan & { applied: boolean };

/** Minimal surface of `Db` used here, so tests can pass a fake. */
type DbLike = Pick<Db, "listCollections" | "createCollection" | "command" | "collection">;

/** Index options compared besides the key pattern. */
const INDEX_OPTIONS = ["unique", "sparse", "partialFilterExpression", "expireAfterSeconds", "collation"] as const;

/** JSON with object keys sorted recursively (array order kept), for order-insensitive comparison. */
export function canonical(value: unknown): string {
  const sort = (v: unknown): unknown =>
    Array.isArray(v)
      ? v.map(sort)
      : v && typeof v === "object" && !(v instanceof Date)
        ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, sort((v as Record<string, unknown>)[k])]))
        : v;
  return JSON.stringify(sort(value));
}

/** Key patterns are ordered (compound index field order matters), so compare them without sorting. */
const keyOf = (ix: Document) => JSON.stringify(Object.entries(ix.key ?? {}).map(([k, v]) => [k, Number(v) || v]));
const optionsOf = (ix: Document) => canonical(Object.fromEntries(INDEX_OPTIONS.map((o) => [o, o === "unique" || o === "sparse" ? Boolean(ix[o]) : (ix[o] ?? null)])));

/** Read-only: compares the registered specs with the database. Never writes. */
export async function planCollections(db: DbLike, specs: CollectionSpec[]): Promise<SetupPlan> {
  const infos = await db.listCollections({}, { nameOnly: false }).toArray();
  const existing = new Map(infos.map((c) => [c.name, c as { name: string; options?: Document }]));
  const plan: SetupPlan = { actions: [], conflicts: [], unmanaged: { collections: [], indexes: [] } };
  const registered = new Set(specs.map((s) => s.name));
  plan.unmanaged.collections = [...existing.keys()].filter((n) => !registered.has(n) && !n.startsWith("system.")).sort();

  for (const spec of specs) {
    const info = existing.get(spec.name);
    if (!info) {
      plan.actions.push({ action: "create-collection", collection: spec.name });
      for (const ix of spec.indexes) plan.actions.push({ action: "create-index", collection: spec.name, index: ix.name });
      continue;
    }

    if (spec.validator) {
      const o = info.options ?? {};
      const same =
        canonical(o.validator ?? null) === canonical(spec.validator) &&
        o.validationLevel === VALIDATION_SETTINGS.validationLevel &&
        o.validationAction === VALIDATION_SETTINGS.validationAction;
      if (!same) plan.actions.push({ action: "update-validator", collection: spec.name });
    }

    const current = (await db.collection(spec.name).listIndexes().toArray()) as Document[];
    const matched = new Set<string>(["_id_"]);
    for (const ix of spec.indexes) {
      const byName = current.find((c) => c.name === ix.name);
      const byKey = current.find((c) => c.name !== ix.name && keyOf(c) === keyOf(ix));
      if (byName) {
        matched.add(byName.name);
        if (keyOf(byName) !== keyOf(ix) || optionsOf(byName) !== optionsOf(ix))
          plan.conflicts.push({ collection: spec.name, index: ix.name, problem: "an index with this name exists with a different definition" });
      } else if (byKey) {
        matched.add(byKey.name);
        plan.conflicts.push({ collection: spec.name, index: ix.name, problem: `the same keys are already indexed as "${byKey.name}"` });
      } else {
        plan.actions.push({ action: "create-index", collection: spec.name, index: ix.name });
      }
    }
    for (const c of current) if (!matched.has(c.name)) plan.unmanaged.indexes.push({ collection: spec.name, index: c.name });
  }
  return plan;
}

/**
 * Plan, and with `apply: true` perform, the setup. Applies nothing when the plan has conflicts.
 * Only creates collections, (re)sets validators that differ and creates missing indexes — never drops.
 */
export async function ensureCollections(db: DbLike, specs: CollectionSpec[], { apply }: { apply: boolean }): Promise<SetupReport> {
  const plan = await planCollections(db, specs);
  if (!apply || plan.conflicts.length) return { ...plan, applied: false };

  const byName = new Map(specs.map((s) => [s.name, s]));
  for (const a of plan.actions) {
    const spec = byName.get(a.collection)!;
    if (a.action === "create-collection")
      await db.createCollection(spec.name, { ...spec.options, ...(spec.validator ? { validator: spec.validator, ...VALIDATION_SETTINGS } : {}) });
    else if (a.action === "update-validator") await db.command({ collMod: spec.name, validator: spec.validator, ...VALIDATION_SETTINGS });
  }
  for (const spec of specs) {
    const missing = new Set(plan.actions.filter((a) => a.action === "create-index" && a.collection === spec.name).map((a) => (a as { index: string }).index));
    if (missing.size) await db.collection(spec.name).createIndexes(spec.indexes.filter((ix) => missing.has(ix.name)));
  }
  return { ...plan, applied: true };
}
