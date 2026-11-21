import type { z } from "zod";
import { extraSchema, locationSchema, vehicleModelSchema } from "../schemas";
import type { CatalogueSeed } from "../types";

/**
 * Validates a whole catalogue seed before anything is written: every document against its schema,
 * plus the rules that span documents (unique keys, references between collections).
 * Returns a list of problems; an empty list means the seed is safe to apply. Pure: no I/O.
 */
export type SeedIssue = { collection: keyof CatalogueSeed; key: string; problem: string };

function schemaIssues<T>(collection: keyof CatalogueSeed, docs: T[], schema: z.ZodType, keyOf: (d: T) => string): SeedIssue[] {
  return docs.flatMap((doc) => {
    const r = schema.safeParse(doc);
    return r.success ? [] : r.error.issues.map((i) => ({ collection, key: keyOf(doc), problem: `${i.path.join(".") || "(document)"}: ${i.message}` }));
  });
}

function duplicates<T>(collection: keyof CatalogueSeed, docs: T[], field: string, valueOf: (d: T) => string | number): SeedIssue[] {
  const seen = new Map<string | number, number>();
  for (const d of docs) seen.set(valueOf(d), (seen.get(valueOf(d)) ?? 0) + 1);
  return [...seen].filter(([, n]) => n > 1).map(([v]) => ({ collection, key: String(v), problem: `duplicate ${field} "${v}"` }));
}

export function validateCatalogueSeed(seed: CatalogueSeed): SeedIssue[] {
  const issues: SeedIssue[] = [
    ...schemaIssues("locations", seed.locations, locationSchema, (d) => d.code),
    ...schemaIssues("vehicleModels", seed.vehicleModels, vehicleModelSchema, (d) => d.slug),
    ...schemaIssues("extras", seed.extras, extraSchema, (d) => d.code),

    ...duplicates("locations", seed.locations, "code", (d) => d.code),
    ...duplicates("locations", seed.locations, "iataCode", (d) => d.iataCode),
    ...duplicates("locations", seed.locations, "sortOrder", (d) => d.sortOrder),
    ...duplicates("vehicleModels", seed.vehicleModels, "slug", (d) => d.slug),
    // exhibit numbers are unique across ALL statuses: an archived model keeps its number (approved)
    ...duplicates("vehicleModels", seed.vehicleModels, "exhibit", (d) => d.exhibit),
    ...duplicates("vehicleModels", seed.vehicleModels, "sortOrder", (d) => d.sortOrder),
    ...duplicates("extras", seed.extras, "code", (d) => d.code),
    ...duplicates("extras", seed.extras, "sortOrder", (d) => d.sortOrder),
  ];

  // References: a published vehicle's home hub must exist and be active.
  const activeHubs = new Set(seed.locations.filter((l) => l.status === "active").map((l) => l.code));
  const allHubs = new Set(seed.locations.map((l) => l.code));
  for (const v of seed.vehicleModels) {
    if (!allHubs.has(v.homeLocationCode)) issues.push({ collection: "vehicleModels", key: v.slug, problem: `homeLocationCode "${v.homeLocationCode}" does not exist` });
    else if (v.status === "published" && !activeHubs.has(v.homeLocationCode))
      issues.push({ collection: "vehicleModels", key: v.slug, problem: `published but its home hub "${v.homeLocationCode}" is not active` });
  }
  return issues;
}
