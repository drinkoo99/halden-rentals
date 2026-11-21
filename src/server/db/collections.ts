import type { CreateCollectionOptions, Db, Document, IndexDescription } from "mongodb";

/**
 * Declarative collection setup: each milestone registers the collections it introduces (name,
 * indexes, optional `$jsonSchema` validator) in `COLLECTIONS`. `scripts/db-setup.mjs` applies them;
 * nothing is created at request time.
 *
 * M1 registers none — collections arrive with the milestone that first needs them.
 * Pure module (no Next.js imports) so the setup script can import it.
 */
export type CollectionSpec = {
  name: string;
  indexes: IndexDescription[];
  /** `$jsonSchema` validator, applied with validationLevel "moderate" */
  validator?: Document;
  options?: Omit<CreateCollectionOptions, "validator">;
};

export const COLLECTIONS: CollectionSpec[] = [];

export type SetupAction =
  | { action: "create-collection"; collection: string }
  | { action: "update-validator"; collection: string }
  | { action: "ensure-indexes"; collection: string; indexes: string[] };

/** Minimal surface of `Db` used here, so tests can pass a fake. */
type DbLike = Pick<Db, "listCollections" | "createCollection" | "command" | "collection">;

/**
 * Plan (and with `apply: true`, perform) the setup for `specs`. Idempotent: creating an index that
 * already exists with the same definition is a no-op in MongoDB, and existing collections are kept.
 */
export async function ensureCollections(db: DbLike, specs: CollectionSpec[], { apply }: { apply: boolean }): Promise<SetupAction[]> {
  const existing = new Set((await db.listCollections({}, { nameOnly: true }).toArray()).map((c) => c.name));
  const actions: SetupAction[] = [];
  for (const spec of specs) {
    if (!existing.has(spec.name)) {
      actions.push({ action: "create-collection", collection: spec.name });
      if (apply)
        await db.createCollection(spec.name, {
          ...spec.options,
          ...(spec.validator ? { validator: spec.validator, validationLevel: "moderate" as const } : {}),
        });
    } else if (spec.validator) {
      actions.push({ action: "update-validator", collection: spec.name });
      if (apply) await db.command({ collMod: spec.name, validator: spec.validator, validationLevel: "moderate" });
    }
    if (spec.indexes.length) {
      actions.push({ action: "ensure-indexes", collection: spec.name, indexes: spec.indexes.map(indexName) });
      if (apply) await db.collection(spec.name).createIndexes(spec.indexes);
    }
  }
  return actions;
}

export function indexName(ix: IndexDescription): string {
  return ix.name ?? Object.entries(ix.key as Record<string, unknown>).map(([k, v]) => `${k}_${String(v)}`).join("_");
}
