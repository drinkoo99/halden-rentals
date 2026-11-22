import type { Document } from "mongodb";
import type { CollectionSpec } from "../db/collections";
import { BLOCK_KINDS, FLEET_STATUSES, MAX_MILEAGE_KM } from "./schemas";

/**
 * Fleet collections (M6), applied by `db:setup`:
 * - fleetUnits: one document per physical car. Unique unit code, unique plate, unique VIN when present.
 *   `{ modelSlug, locationCode, status }` serves the staff filters and the availability lookup.
 * - availabilityBlocks: maintenance / unavailability windows `[startsAt, endsAt)` per unit; looked up by
 *   unit and end time (every block that ends after a requested start).
 */
export const FLEET_COLLECTIONS = { fleetUnits: "fleetUnits", availabilityBlocks: "availabilityBlocks" } as const;
export type FleetCollectionNames = Record<keyof typeof FLEET_COLLECTIONS, string>;

const str = (extra: Document = {}): Document => ({ bsonType: "string", minLength: 1, ...extra });
const int = (extra: Document = {}): Document => ({ bsonType: ["int", "long"], ...extra });
const date = (): Document => ({ bsonType: "date" });
const validator = (required: string[], properties: Document): Document => ({
  $jsonSchema: { bsonType: "object", required, additionalProperties: false, properties },
});

export const FLEET_COLLECTION_SPECS: CollectionSpec[] = [
  {
    name: FLEET_COLLECTIONS.fleetUnits,
    validator: validator(["_id", "unitCode", "modelSlug", "registration", "locationCode", "status", "mileageKm", "year", "createdAt", "updatedAt"], {
      _id: { bsonType: "objectId" },
      unitCode: str({ pattern: "^FU-[A-Z0-9]{6}$" }),
      modelSlug: str({ maxLength: 80 }),
      registration: str({ maxLength: 15, pattern: "^[A-Z0-9][A-Z0-9 -]*$" }),
      vin: str({ pattern: "^[A-HJ-NPR-Z0-9]{17}$" }),
      locationCode: str({ pattern: "^[a-z]{3}$" }),
      status: { enum: [...FLEET_STATUSES] },
      mileageKm: int({ minimum: 0, maximum: MAX_MILEAGE_KM }),
      year: int({ minimum: 1950, maximum: 2100 }),
      notes: { bsonType: "string", maxLength: 1000 },
      createdAt: date(),
      updatedAt: date(),
    }),
    indexes: [
      { name: "fleetUnits_code_unique", key: { unitCode: 1 }, unique: true },
      { name: "fleetUnits_registration_unique", key: { registration: 1 }, unique: true },
      { name: "fleetUnits_vin_unique", key: { vin: 1 }, unique: true, partialFilterExpression: { vin: { $type: "string" } } },
      { name: "fleetUnits_model_location_status", key: { modelSlug: 1, locationCode: 1, status: 1 } },
    ],
  },
  {
    name: FLEET_COLLECTIONS.availabilityBlocks,
    validator: validator(["_id", "unitId", "kind", "startsAt", "endsAt", "createdBy", "createdAt"], {
      _id: { bsonType: "objectId" },
      unitId: { bsonType: "objectId" },
      kind: { enum: [...BLOCK_KINDS] },
      startsAt: date(),
      endsAt: date(),
      reason: { bsonType: "string", maxLength: 1000 },
      createdBy: { bsonType: "objectId" },
      createdAt: date(),
    }),
    indexes: [{ name: "availabilityBlocks_unit_end", key: { unitId: 1, endsAt: 1 } }],
  },
];
