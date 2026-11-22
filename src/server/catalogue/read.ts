import type { Db } from "mongodb";
import type { z } from "zod";
import { AppError } from "../http/errors";
import { errorSummary, log } from "../log";
import { CATALOGUE_COLLECTIONS } from "./collections";
import { PUBLIC_STATUS, toPublic, type PublicExtra, type PublicLocation, type PublicVehicle } from "./public";
import { storedExtraSchema, storedLocationSchema, storedVehicleModelSchema } from "./schemas";

/**
 * Read the public catalogue from MongoDB (M3). One query per collection: public status only, catalogue
 * order (served by the `<collection>_status_sort` index). Every document is validated against the stored
 * schema before anything is returned, then stripped of internal fields (see public.ts).
 *
 * Failures never leak driver messages: a database error becomes SERVICE_UNAVAILABLE (503) and a document
 * that fails validation becomes INTERNAL (500); both are logged with names and field paths only.
 * No Next.js imports, so this is unit- and integration-testable; the cached entry points live in service.ts.
 */

export type CatalogueCollectionNames = Record<keyof typeof CATALOGUE_COLLECTIONS, string>;
type ReadDb = Pick<Db, "collection">;

async function readPublic<T>(
  db: ReadDb,
  collection: string,
  status: string,
  schema: z.ZodType,
  keyField: string,
): Promise<T[]> {
  let docs: Record<string, unknown>[];
  try {
    docs = await db.collection(collection).find({ status }).sort({ sortOrder: 1 }).toArray();
  } catch (err) {
    log("error", "catalogue read failed", { collection, ...errorSummary(err) });
    throw new AppError("SERVICE_UNAVAILABLE", "Catalogue unavailable", { cause: err });
  }
  return docs.map((doc) => {
    const result = schema.safeParse(doc);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.map(String).join(".") || "(document)");
      log("error", "catalogue document failed validation", { collection, key: String(doc[keyField] ?? "(no key)"), paths });
      throw new AppError("INTERNAL", "Invalid catalogue document");
    }
    return toPublic(result.data as object) as T;
  });
}

export const readPublicLocations = (db: ReadDb, names: CatalogueCollectionNames = CATALOGUE_COLLECTIONS) =>
  readPublic<PublicLocation>(db, names.locations, PUBLIC_STATUS.locations, storedLocationSchema, "code");

export const readPublicVehicles = (db: ReadDb, names: CatalogueCollectionNames = CATALOGUE_COLLECTIONS) =>
  readPublic<PublicVehicle>(db, names.vehicleModels, PUBLIC_STATUS.vehicleModels, storedVehicleModelSchema, "slug");

export const readPublicExtras = (db: ReadDb, names: CatalogueCollectionNames = CATALOGUE_COLLECTIONS) =>
  readPublic<PublicExtra>(db, names.extras, PUBLIC_STATUS.extras, storedExtraSchema, "code");
