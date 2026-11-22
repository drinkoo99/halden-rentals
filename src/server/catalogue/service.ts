import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { toSiteCatalogue, type SiteCatalogue } from "@/lib/catalogue";
import { getDb, isDatabaseConfigured } from "../db/client";
import { AppError } from "../http/errors";
import { log } from "../log";
import { PUBLIC_STATUS, toPublic, type PublicCatalogue, type PublicExtra, type PublicLocation, type PublicVehicle } from "./public";
import { readPublicExtras, readPublicLocations, readPublicVehicles } from "./read";
import { catalogueSeedFromStatic } from "./seed/fromStatic";

/**
 * Cached catalogue access for Route Handlers and pages (M3).
 *
 * - Each list is cached (`"use cache"`) for hours and tagged `catalogue`; a later staff edit can call
 *   `revalidateTag(CATALOGUE_CACHE_TAG)`. Errors are never cached.
 * - The API (`getPublic*`) always reads MongoDB and answers 503 when the database is not configured.
 * - Pages (`getSiteCatalogue`) read the same cached lists. Only when MONGODB_URI is NOT set at all (a fresh
 *   checkout, a build without database access) do they render the static demo catalogue, mapped through the
 *   seed so it is identical to what the database holds; this is logged. A configured but failing database is
 *   an error, never a silent fallback.
 */
export const CATALOGUE_CACHE_TAG = "catalogue";

function requireDatabase(): void {
  if (!isDatabaseConfigured()) throw new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set");
}

export async function getPublicLocations(): Promise<PublicLocation[]> {
  "use cache";
  cacheTag(CATALOGUE_CACHE_TAG);
  cacheLife("hours");
  requireDatabase();
  return readPublicLocations(await getDb());
}

export async function getPublicVehicles(): Promise<PublicVehicle[]> {
  "use cache";
  cacheTag(CATALOGUE_CACHE_TAG);
  cacheLife("hours");
  requireDatabase();
  return readPublicVehicles(await getDb());
}

export async function getPublicExtras(): Promise<PublicExtra[]> {
  "use cache";
  cacheTag(CATALOGUE_CACHE_TAG);
  cacheLife("hours");
  requireDatabase();
  return readPublicExtras(await getDb());
}

/** The static demo catalogue in public form — only used when no database is configured. */
export function staticPublicCatalogue(): PublicCatalogue {
  const seed = catalogueSeedFromStatic();
  return {
    locations: seed.locations.filter((d) => d.status === PUBLIC_STATUS.locations).map(toPublic),
    vehicles: seed.vehicleModels.filter((d) => d.status === PUBLIC_STATUS.vehicleModels).map(toPublic),
    extras: seed.extras.filter((d) => d.status === PUBLIC_STATUS.extras).map(toPublic),
  };
}

/**
 * The catalogue in the shape the pages render. Cached as a whole because the hub time-zone labels
 * (CET/CEST) depend on the current date.
 */
export async function getSiteCatalogue(): Promise<SiteCatalogue> {
  "use cache";
  cacheTag(CATALOGUE_CACHE_TAG);
  cacheLife("hours");
  let catalogue: PublicCatalogue;
  if (isDatabaseConfigured()) {
    const [locations, vehicles, extras] = await Promise.all([getPublicLocations(), getPublicVehicles(), getPublicExtras()]);
    catalogue = { locations, vehicles, extras };
  } else {
    log("warn", "MONGODB_URI is not set: rendering the static demo catalogue");
    catalogue = staticPublicCatalogue();
  }
  if (!catalogue.locations.length) throw new AppError("SERVICE_UNAVAILABLE", "The catalogue has no active locations");
  return toSiteCatalogue(catalogue, new Date());
}
