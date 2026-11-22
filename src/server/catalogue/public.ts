import type { LocationDoc, VehicleModelDoc, ExtraDoc } from "./types";

/**
 * The public catalogue contract (M3): what GET /api/v1/{locations,vehicles,extras} return and what the
 * pages render. A public item is the stored document minus storage and bookkeeping fields:
 * `_id`, timestamps, `dataOrigin`, `schemaVersion`, `status` (only active/published items are public) and
 * `sortOrder` (lists are returned in catalogue order). Pure module: no database, Next.js or server-only imports.
 */

const INTERNAL_FIELDS = ["_id", "createdAt", "updatedAt", "dataOrigin", "schemaVersion", "status", "sortOrder"] as const;
type InternalField = (typeof INTERNAL_FIELDS)[number];

export type PublicLocation = Omit<LocationDoc, InternalField>;
export type PublicVehicle = Omit<VehicleModelDoc, InternalField>;
export type PublicExtra = Omit<ExtraDoc, InternalField>;
export type PublicCatalogue = { locations: PublicLocation[]; vehicles: PublicVehicle[]; extras: PublicExtra[] };

/** Copy a document without its internal fields (works for stored documents and seed documents alike). */
export function toPublic<T extends object>(doc: T): Omit<T, InternalField> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(doc)) if (!(INTERNAL_FIELDS as readonly string[]).includes(k)) out[k] = v;
  return out as Omit<T, InternalField>;
}

/** Which stored statuses are public. */
export const PUBLIC_STATUS = { locations: "active", vehicleModels: "published", extras: "active" } as const;
