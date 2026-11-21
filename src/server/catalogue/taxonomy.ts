/**
 * Catalogue taxonomy: the closed sets of values the catalogue uses, with their display labels.
 * Kept in code (approved decision D3): they drive validation and the fleet filters, change only with a
 * release, and are too small for a collection. Brands are deliberately NOT here — they come from the data.
 *
 * Labels are copied verbatim from the static catalogue (src/data/vehicles.ts); a parity test keeps them in sync.
 * Pure module (no Next.js / server-only imports) so seed scripts can import it.
 */

export const CATALOGUE_CURRENCY = "EUR" as const; // approved: single currency
export const CATALOGUE_SCHEMA_VERSION = 1 as const;

/**
 * Where a document's content comes from:
 * - "demo": portfolio demo content migrated from the static catalogue (Stitch designs). Not real
 *   operational data — hubs, hand-over copy and specifications are illustrative.
 * - "managed": created or edited through staff tooling in a later milestone.
 */
export const DATA_ORIGINS = ["demo", "managed"] as const;

// ---- Vehicles ---------------------------------------------------------------------------------
export const VEHICLE_CATEGORIES = ["sports", "sedan", "suv", "wagon"] as const;
export const CATEGORY_LABELS: Record<(typeof VEHICLE_CATEGORIES)[number], { label: string; filterLabel: string }> = {
  sports: { label: "Sports", filterLabel: "Sports & Grand Tourer" },
  sedan: { label: "Sedans", filterLabel: "Executive & Luxury Sedans" },
  suv: { label: "SUVs", filterLabel: "SUVs & Overlanding" },
  wagon: { label: "Performance Wagons", filterLabel: "Performance Wagons" },
};

export const POWERTRAINS = ["petrol", "diesel", "hybrid", "electric"] as const;
export const POWERTRAIN_LABELS: Record<(typeof POWERTRAINS)[number], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  electric: "Pure Electric",
};

export const TRANSMISSIONS = ["automatic", "manual"] as const;

export const VEHICLE_FEATURES = ["awd", "ski", "chauffeur", "acc"] as const;
export const FEATURE_LABELS: Record<(typeof VEHICLE_FEATURES)[number], string> = {
  awd: "All-Wheel Drive (AWD/4WD)",
  ski: "Ski rack & Winterised",
  chauffeur: "Curbside Chauffeur Delivery",
  acc: "Adaptive Cruise Control",
};

/** draft: not public · published: public catalogue · archived: retired, kept for history */
export const VEHICLE_STATUSES = ["draft", "published", "archived"] as const;

// ---- Locations --------------------------------------------------------------------------------
/** active: public · inactive: hidden · coming_soon: hidden from booking, may be announced later */
export const LOCATION_STATUSES = ["active", "inactive", "coming_soon"] as const;

// ---- Extras -----------------------------------------------------------------------------------
export const EXTRA_STATUSES = ["active", "inactive"] as const;
export const EXTRA_CATEGORIES = ["protection", "driver", "equipment", "service", "seasonal"] as const;
/**
 * How an extra's price applies, always per selected item:
 * - per_day:    charged for each rental day, for each selected item;
 * - per_rental: charged once per rental, for each selected item (e.g. 2 × a per_rental item = 2 charges).
 * Data semantics only — calculating prices belongs to the pricing milestone (M3).
 */
export const EXTRA_CHARGE_UNITS = ["per_day", "per_rental"] as const;
