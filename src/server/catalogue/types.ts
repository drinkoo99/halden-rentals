import type { z } from "zod";
import type {
  extraSchema,
  locationSchema,
  storedExtraSchema,
  storedLocationSchema,
  storedVehicleModelSchema,
  vehicleModelSchema,
} from "./schemas";
import type {
  EXTRA_CATEGORIES,
  EXTRA_CHARGE_UNITS,
  EXTRA_STATUSES,
  LOCATION_STATUSES,
  POWERTRAINS,
  TRANSMISSIONS,
  VEHICLE_CATEGORIES,
  VEHICLE_FEATURES,
  VEHICLE_STATUSES,
} from "./taxonomy";

/** Catalogue types, inferred from the Zod schemas so the two can never disagree. */

export type VehicleCategory = (typeof VEHICLE_CATEGORIES)[number];
export type Powertrain = (typeof POWERTRAINS)[number];
export type Transmission = (typeof TRANSMISSIONS)[number];
export type VehicleFeature = (typeof VEHICLE_FEATURES)[number];
export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];
export type LocationStatus = (typeof LOCATION_STATUSES)[number];
export type ExtraStatus = (typeof EXTRA_STATUSES)[number];
export type ExtraCategory = (typeof EXTRA_CATEGORIES)[number];
export type ExtraChargeUnit = (typeof EXTRA_CHARGE_UNITS)[number];

/** Content documents (what the seed writes; `_id` and timestamps are added on insert). */
export type LocationDoc = z.infer<typeof locationSchema>;
export type VehicleModelDoc = z.infer<typeof vehicleModelSchema>;
export type ExtraDoc = z.infer<typeof extraSchema>;

/** Documents as stored in MongoDB. */
export type StoredLocation = z.infer<typeof storedLocationSchema>;
export type StoredVehicleModel = z.infer<typeof storedVehicleModelSchema>;
export type StoredExtra = z.infer<typeof storedExtraSchema>;

export type CatalogueSeed = {
  locations: LocationDoc[];
  vehicleModels: VehicleModelDoc[];
  extras: ExtraDoc[];
};
