import { ObjectId } from "mongodb";
import { z } from "zod";
import { ICON_NAMES } from "@/lib/icons";
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
 * Catalogue document schemas (M2). Zod is the source of truth for every catalogue document; the
 * MongoDB `$jsonSchema` validators added in P2 are a minimal backstop checked against these.
 *
 * Two layers per collection:
 * - `<name>Schema`        — the content (what the seed and, later, staff tooling write);
 * - `stored<Name>Schema`  — the content plus `_id` and timestamps, as read back from MongoDB.
 *
 * Strict objects: unknown fields are rejected. Values are validated, never rewritten (no trimming).
 */

// ---- Building blocks ---------------------------------------------------------------------------

/** Non-empty display text without leading/trailing whitespace. */
const text = (max: number) =>
  z
    .string()
    .min(1)
    .max(max)
    .refine((s) => s.trim() === s, "must not start or end with whitespace");

/** Lower-case URL key, 3–80 characters, e.g. "porsche-911-gt3-touring". */
export const slugSchema = z
  .string()
  .min(3)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lower-case words joined by '-'");

/** A local image under public/images (images stay static files; approved decision D20). */
export const imagePathSchema = z
  .string()
  .regex(/^\/images\/[A-Za-z0-9][A-Za-z0-9._-]*\.(?:jpe?g|png|webp|avif)$/, "must be a /images/… path to a jpg, png, webp or avif file");

export const imageSchema = z.strictObject({ src: imagePathSchema, alt: text(300) });

/** Money as integer cents in the catalogue currency (approved: EUR only). */
export const moneySchema = z.strictObject({
  amountCents: z.number().int().min(0).max(100_000_000),
  currency: z.literal(CATALOGUE_CURRENCY),
});

const KNOWN_TIMEZONES = new Set(Intl.supportedValuesOf("timeZone"));
export const timezoneSchema = z.string().refine((tz) => KNOWN_TIMEZONES.has(tz), "must be an IANA time zone, e.g. Europe/Zurich");

const iconSet = new Set<string>(ICON_NAMES);
/** A Material Symbols icon that is part of the subset the app loads (src/lib/icons.ts). */
export const iconSchema = z.string().refine((n) => iconSet.has(n), "must be an icon listed in src/lib/icons.ts");

const sortOrder = z.number().int().min(0).max(100_000);
const common = {
  sortOrder,
  dataOrigin: z.enum(DATA_ORIGINS),
  schemaVersion: z.literal(CATALOGUE_SCHEMA_VERSION),
};
const stored = { _id: z.instanceof(ObjectId), createdAt: z.date(), updatedAt: z.date() };

const unique = <T>(items: T[]) => new Set(items).size === items.length;

// ---- Locations ---------------------------------------------------------------------------------

export const locationCodeSchema = z.string().regex(/^[a-z]{3}$/, "must be three lower-case letters, e.g. zrh");

export const locationSchema = z.strictObject({
  /** Stable key used by other collections (e.g. vehicleModels.homeLocationCode). Never changes. */
  code: locationCodeSchema,
  iataCode: z.string().regex(/^[A-Z]{3}$/, "must be a three-letter IATA code"),
  status: z.enum(LOCATION_STATUSES),
  city: text(80),
  /** ISO 3166-1 alpha-2 */
  country: z.string().regex(/^[A-Z]{2}$/, "must be an ISO 3166-1 alpha-2 country code"),
  name: text(120),
  longName: text(160),
  /** IANA zone of the hub; future availability rules interpret local times in this zone. */
  timezone: timezoneSchema,
  coordinates: z.strictObject({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
  /** Hand-over copy shown on vehicle pages. Display text only — no opening hours are enforced from it. */
  handover: z.strictObject({ title: text(200), note: text(600), window: text(80), terminalPoint: text(120) }),
  ...common,
});

export const storedLocationSchema = locationSchema.extend(stored);

// ---- Vehicle models ------------------------------------------------------------------------------

const vehicleModelObject = z.strictObject({
  slug: slugSchema,
  /** Public visibility: only "published" models are listed. */
  status: z.enum(VEHICLE_STATUSES),
  /** Staff switch to pause bookings for a model. Not date availability (that arrives with fleet units). */
  bookable: z.boolean(),
  /** Catalogue ("exhibit") number shown on placards. */
  exhibit: z.string().regex(/^\d{2,3}$/, "must be a 2–3 digit catalogue number"),
  brand: text(60),
  model: text(80),
  name: text(120),
  category: z.enum(VEHICLE_CATEGORIES),
  year: z.number().int().min(1950).max(2100),
  specs: z.strictObject({
    seats: z.number().int().min(1).max(9),
    seatsLabel: text(80),
    transmission: z.enum(TRANSMISSIONS),
    gearbox: text(40),
    powerHp: z.number().int().min(1).max(2_000),
    powertrain: z.enum(POWERTRAINS),
  }),
  features: z.array(z.enum(VEHICLE_FEATURES)).refine(unique, "must not repeat a feature"),
  colour: text(80).optional(),
  /** Short catalogue line, e.g. "2 seats · PDK · 502 hp" */
  specLine: text(120),
  headline: text(200),
  narrative: z.array(text(2_000)).min(1),
  /** Technical dossier rows */
  specRows: z.array(z.strictObject({ label: text(60), value: text(200) })).min(1),
  amenities: z.array(text(200)),
  provenance: text(200).optional(),
  subtitle: text(200).optional(),
  galleryBadge: text(60).optional(),
  media: z.strictObject({
    hero: imageSchema,
    /** Alternative hero used by the mobile fleet screen */
    mobileHero: imageSchema.optional(),
    gallery: z.array(imageSchema),
    mobileGallery: z.array(imageSchema).optional(),
  }),
  /** Copy that Stitch wrote separately for the mobile detail screen. Omitted entirely when there is none. */
  mobile: z
    .strictObject({
      subtitle: text(200).optional(),
      narrative: text(2_000).optional(),
      amenities: z.array(z.strictObject({ title: text(120), detail: text(200) })).optional(),
    })
    .refine((m) => Object.keys(m).length > 0, "must contain at least one field (omit it when empty)")
    .optional(),
  homeLocationCode: locationCodeSchema,
  /** Advertised day rate. Data only — quotes are calculated by the pricing engine (M3). */
  displayRate: moneySchema,
  ...common,
});

/** A published model must advertise a real (non-zero) rate; drafts may not have one yet. */
const publishedHasRate = (v: { status: string; displayRate: { amountCents: number } }) => v.status !== "published" || v.displayRate.amountCents > 0;
const publishedHasRateIssue = { message: "a published vehicle must have a display rate above zero", path: ["displayRate", "amountCents"] };

export const vehicleModelSchema = vehicleModelObject.refine(publishedHasRate, publishedHasRateIssue);
export const storedVehicleModelSchema = vehicleModelObject.extend(stored).refine(publishedHasRate, publishedHasRateIssue);

// ---- Extras -------------------------------------------------------------------------------------

export const extraCodeSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lower-case letters/digits joined by '-'").max(40);

const extraObject = z.strictObject({
  code: extraCodeSchema,
  status: z.enum(EXTRA_STATUSES),
  category: z.enum(EXTRA_CATEGORIES),
  title: text(120),
  description: text(1_000),
  /** Placard line, e.g. "ITEM 01" */
  itemLabel: text(40),
  /** Tier line, e.g. "· TIER I PROTECTION" */
  tier: text(80),
  tags: z.array(text(80)),
  icon: iconSchema,
  review: z.strictObject({ title: text(160), detail: text(200), manifest: text(160) }),
  /**
   * Price per selected item. `per_day`: charged for each rental day, per item. `per_rental`: charged once
   * per rental for each selected item. Data only — the pricing engine (M3) calculates totals.
   */
  charge: moneySchema.extend({ unit: z.enum(EXTRA_CHARGE_UNITS) }),
  maxQuantity: z.number().int().min(1).max(10),
  /** Always part of the rental and cannot be removed */
  included: z.boolean(),
  image: imageSchema.optional(),
  ...common,
});

const includedIsFree = (e: { included: boolean; charge: { amountCents: number } }) => !e.included || e.charge.amountCents === 0;
const includedIsFreeIssue = { message: "an included extra cannot carry a charge", path: ["charge", "amountCents"] };

export const extraSchema = extraObject.refine(includedIsFree, includedIsFreeIssue);
export const storedExtraSchema = extraObject.extend(stored).refine(includedIsFree, includedIsFreeIssue);
