import type { Document } from "mongodb";
import type { CollectionSpec } from "../db/collections";
import {
  CATALOGUE_CURRENCY,
  CATALOGUE_SCHEMA_VERSION,
  DATA_ORIGINS,
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

/**
 * MongoDB collection specs for the catalogue (M2 P2): `$jsonSchema` validators and named indexes.
 *
 * The validators are a deliberately small backstop; the Zod schemas in schemas.ts remain the source of
 * truth (rules such as "published needs a rate", time-zone validity or icon names are checked by Zod
 * only). A unit test keeps the field lists and enums here in step with Zod and the taxonomy.
 *
 * Top-level `additionalProperties: false` mirrors Zod's strict objects (approved D-P2-2); nested objects
 * stay open to keep validators small. Pure module so scripts can import it.
 */

export const CATALOGUE_COLLECTIONS = { locations: "locations", vehicleModels: "vehicleModels", extras: "extras" } as const;

// ---- Validator building blocks -------------------------------------------------------------------
const str = (extra: Document = {}): Document => ({ bsonType: "string", minLength: 1, ...extra });
const int = (extra: Document = {}): Document => ({ bsonType: ["int", "long"], ...extra });
const num = (extra: Document = {}): Document => ({ bsonType: "number", ...extra });
const bool = (): Document => ({ bsonType: "bool" });
const date = (): Document => ({ bsonType: "date" });
const oneOf = (values: readonly (string | number)[]): Document => ({ enum: [...values] });
const strArray = (extra: Document = {}): Document => ({ bsonType: "array", items: str(), ...extra });
const object = (required: string[], properties: Document = {}): Document => ({ bsonType: "object", required, properties });
const image = (): Document => object(["src", "alt"], { src: str({ pattern: "^/images/" }), alt: str() });
const money = (): Document =>
  object(["amountCents", "currency"], { amountCents: int({ minimum: 0 }), currency: oneOf([CATALOGUE_CURRENCY]) });

/** Fields every catalogue document carries (content bookkeeping + storage metadata). */
const commonProperties: Document = {
  _id: { bsonType: "objectId" },
  sortOrder: int({ minimum: 0 }),
  dataOrigin: oneOf(DATA_ORIGINS),
  schemaVersion: oneOf([CATALOGUE_SCHEMA_VERSION]),
  createdAt: date(),
  updatedAt: date(),
};
const commonRequired = ["_id", "sortOrder", "dataOrigin", "schemaVersion", "createdAt", "updatedAt"];

const validator = (required: string[], properties: Document): Document => ({
  $jsonSchema: {
    bsonType: "object",
    required: [...required, ...commonRequired],
    additionalProperties: false,
    properties: { ...properties, ...commonProperties },
  },
});

// ---- Validators ------------------------------------------------------------------------------------
export const locationsValidator = validator(
  ["code", "iataCode", "status", "city", "country", "name", "longName", "timezone", "coordinates", "handover"],
  {
    code: str({ pattern: "^[a-z]{3}$" }),
    iataCode: str({ pattern: "^[A-Z]{3}$" }),
    status: oneOf(LOCATION_STATUSES),
    city: str(),
    country: str({ pattern: "^[A-Z]{2}$" }),
    name: str(),
    longName: str(),
    timezone: str(),
    coordinates: object(["lat", "lng"], { lat: num({ minimum: -90, maximum: 90 }), lng: num({ minimum: -180, maximum: 180 }) }),
    handover: object(["title", "note", "window", "terminalPoint"], { title: str(), note: str(), window: str(), terminalPoint: str() }),
  },
);

export const vehicleModelsValidator = validator(
  [
    "slug", "status", "bookable", "exhibit", "brand", "model", "name", "category", "year", "specs", "features",
    "specLine", "headline", "narrative", "specRows", "amenities", "media", "homeLocationCode", "displayRate",
  ],
  {
    slug: str({ minLength: 3, maxLength: 80, pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" }),
    status: oneOf(VEHICLE_STATUSES),
    bookable: bool(),
    exhibit: str({ pattern: "^[0-9]{2,3}$" }),
    brand: str(),
    model: str(),
    name: str(),
    category: oneOf(VEHICLE_CATEGORIES),
    year: int({ minimum: 1950, maximum: 2100 }),
    specs: object(["seats", "seatsLabel", "transmission", "gearbox", "powerHp", "powertrain"], {
      seats: int({ minimum: 1, maximum: 9 }),
      seatsLabel: str(),
      transmission: oneOf(TRANSMISSIONS),
      gearbox: str(),
      powerHp: int({ minimum: 1, maximum: 2000 }),
      powertrain: oneOf(POWERTRAINS),
    }),
    features: { bsonType: "array", uniqueItems: true, items: oneOf(VEHICLE_FEATURES) },
    colour: str(),
    specLine: str(),
    headline: str(),
    narrative: strArray({ minItems: 1 }),
    specRows: { bsonType: "array", minItems: 1, items: object(["label", "value"], { label: str(), value: str() }) },
    amenities: strArray(),
    provenance: str(),
    subtitle: str(),
    galleryBadge: str(),
    media: object(["hero", "gallery"], {
      hero: image(),
      mobileHero: image(),
      gallery: { bsonType: "array", items: image() },
      mobileGallery: { bsonType: "array", items: image() },
    }),
    mobile: { bsonType: "object", minProperties: 1 },
    homeLocationCode: str({ pattern: "^[a-z]{3}$" }),
    displayRate: money(),
  },
);

export const extrasValidator = validator(
  ["code", "status", "category", "title", "description", "itemLabel", "tier", "tags", "icon", "review", "charge", "maxQuantity", "included"],
  {
    code: str({ maxLength: 40, pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" }),
    status: oneOf(EXTRA_STATUSES),
    category: oneOf(EXTRA_CATEGORIES),
    title: str(),
    description: str(),
    itemLabel: str(),
    tier: str(),
    tags: strArray(),
    icon: str(),
    review: object(["title", "detail", "manifest"], { title: str(), detail: str(), manifest: str() }),
    charge: object(["amountCents", "currency", "unit"], {
      amountCents: int({ minimum: 0 }),
      currency: oneOf([CATALOGUE_CURRENCY]),
      unit: oneOf(EXTRA_CHARGE_UNITS),
    }),
    maxQuantity: int({ minimum: 1, maximum: 10 }),
    included: bool(),
    image: image(),
  },
);

// ---- Collection specs ------------------------------------------------------------------------------
/**
 * Indexes (explicit names so setup can compare them):
 * - unique natural keys — locations.code, locations.iataCode, vehicleModels.slug, extras.code;
 * - vehicleModels.exhibit unique across ALL statuses (approved: archived models keep their number);
 * - { status, sortOrder } — the public list query of each collection.
 * Deliberately nothing else: with ~20 documents, extra indexes would cost more than they help.
 */
export const CATALOGUE_COLLECTION_SPECS: CollectionSpec[] = [
  {
    name: CATALOGUE_COLLECTIONS.locations,
    validator: locationsValidator,
    indexes: [
      { name: "locations_code_unique", key: { code: 1 }, unique: true },
      { name: "locations_iata_unique", key: { iataCode: 1 }, unique: true },
      { name: "locations_status_sort", key: { status: 1, sortOrder: 1 } },
    ],
  },
  {
    name: CATALOGUE_COLLECTIONS.vehicleModels,
    validator: vehicleModelsValidator,
    indexes: [
      { name: "vehicleModels_slug_unique", key: { slug: 1 }, unique: true },
      { name: "vehicleModels_exhibit_unique", key: { exhibit: 1 }, unique: true },
      { name: "vehicleModels_status_sort", key: { status: 1, sortOrder: 1 } },
    ],
  },
  {
    name: CATALOGUE_COLLECTIONS.extras,
    validator: extrasValidator,
    indexes: [
      { name: "extras_code_unique", key: { code: 1 }, unique: true },
      { name: "extras_status_sort", key: { status: 1, sortOrder: 1 } },
    ],
  },
];
