import { extras as staticExtras, type Extra } from "@/data/extras";
import { locations as staticLocations, type Location } from "@/data/locations";
import { vehicles as staticVehicles, type Vehicle } from "@/data/vehicles";
import { CATALOGUE_CURRENCY, CATALOGUE_SCHEMA_VERSION } from "../taxonomy";
import type { CatalogueSeed, ExtraCategory, ExtraDoc, LocationDoc, VehicleModelDoc } from "../types";

/**
 * Maps the static catalogue (src/data/*.ts — the Stitch demo content the frontend renders today) into
 * catalogue seed documents. Content is copied verbatim; nothing is reworded or invented.
 *
 * The only values not present in the static data are listed explicitly below:
 * - LOCATION_GEOGRAPHY: each hub city's country and IANA time zone (geographic facts, replacing the
 *   static "CEST" label, which is wrong half of the year);
 * - EXTRA_CATEGORY: a grouping for each extra (new taxonomy field);
 * - status / bookable / sortOrder / dataOrigin: catalogue bookkeeping. Every seeded document is
 *   marked `dataOrigin: "demo"` — it is portfolio demo content, not real operational data.
 *
 * Pure: no database access, no I/O. Validation happens separately (see validate.ts).
 */

const LOCATION_GEOGRAPHY: Record<string, { country: string; timezone: string }> = {
  zrh: { country: "CH", timezone: "Europe/Zurich" },
  muc: { country: "DE", timezone: "Europe/Berlin" },
  gva: { country: "CH", timezone: "Europe/Zurich" },
  mxp: { country: "IT", timezone: "Europe/Rome" },
  vie: { country: "AT", timezone: "Europe/Vienna" },
};

const EXTRA_CATEGORY: Record<string, ExtraCategory> = {
  waiver: "protection",
  driver: "driver",
  childseat: "equipment",
  delivery: "service",
  winter: "seasonal",
};

/** Catalogue order is the static array order, spaced by 10 so items can later be inserted between. */
const orderOf = (index: number) => (index + 1) * 10;

const demo = { dataOrigin: "demo" as const, schemaVersion: CATALOGUE_SCHEMA_VERSION };

/** "47.4582° N, 8.5555° E" → { lat: 47.4582, lng: 8.5555 } (S and W are negative). */
export function parseCoordinates(value: string): { lat: number; lng: number } {
  const m = value.match(/^(\d{1,2}(?:\.\d+)?)° ([NS]), (\d{1,3}(?:\.\d+)?)° ([EW])$/);
  if (!m) throw new Error(`Unrecognised coordinates: ${value}`);
  const lat = Number(m[1]) * (m[2] === "S" ? -1 : 1);
  const lng = Number(m[3]) * (m[4] === "W" ? -1 : 1);
  return { lat, lng };
}

/** Drop keys whose value is undefined, so optional fields are absent (MongoDB would store undefined as null). */
function compact<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

export function locationFromStatic(l: Location, index: number): LocationDoc {
  const geo = LOCATION_GEOGRAPHY[l.id];
  if (!geo) throw new Error(`No country/time zone recorded for location "${l.id}"`);
  return {
    code: l.id,
    iataCode: l.code,
    status: "active",
    city: l.city,
    country: geo.country,
    name: l.label,
    longName: l.longLabel,
    timezone: geo.timezone,
    coordinates: parseCoordinates(l.coordinates),
    handover: { title: l.handoverTitle, note: l.handoverNote, window: l.handoverWindow, terminalPoint: l.terminalPoint },
    sortOrder: orderOf(index),
    ...demo,
  };
}

export function vehicleModelFromStatic(v: Vehicle, index: number): VehicleModelDoc {
  const mobile = compact({
    subtitle: v.mobileSubtitle,
    narrative: v.mobileNarrative,
    amenities: v.mobileAmenities?.map((a) => ({ title: a.title, detail: a.detail })),
  });
  return compact({
    slug: v.slug,
    status: "published" as const,
    bookable: v.available,
    exhibit: v.exhibit,
    brand: v.brand,
    model: v.model,
    name: v.name,
    category: v.category,
    year: v.year,
    specs: {
      seats: v.seats,
      seatsLabel: v.seatsLabel,
      transmission: v.transmission,
      gearbox: v.gearbox,
      powerHp: v.powerHp,
      powertrain: v.powertrain,
    },
    features: [...v.features],
    colour: v.colour,
    specLine: v.specLine,
    headline: v.headline,
    narrative: [...v.narrative],
    specRows: v.specs.map((s) => ({ label: s.label, value: s.value })),
    amenities: [...v.amenities],
    provenance: v.provenance,
    subtitle: v.subtitle,
    galleryBadge: v.galleryBadge,
    media: compact({
      hero: { src: v.image, alt: v.imageAlt },
      // the static data has no separate alt for the mobile hero; the frontend renders it with imageAlt
      mobileHero: v.mobileImage ? { src: v.mobileImage, alt: v.imageAlt } : undefined,
      gallery: v.gallery.map((g) => ({ src: g.src, alt: g.alt })),
      mobileGallery: v.mobileGallery?.map((g) => ({ src: g.src, alt: g.alt })),
    }),
    mobile: Object.keys(mobile).length ? mobile : undefined,
    homeLocationCode: v.homeLocation,
    displayRate: { amountCents: v.pricePerDay * 100, currency: CATALOGUE_CURRENCY },
    sortOrder: orderOf(index),
    ...demo,
  });
}

export function extraFromStatic(e: Extra, index: number): ExtraDoc {
  const category = EXTRA_CATEGORY[e.id];
  if (!category) throw new Error(`No category recorded for extra "${e.id}"`);
  return {
    code: e.id,
    status: "active",
    category,
    title: e.title,
    description: e.description,
    itemLabel: e.item,
    tier: e.tier,
    tags: [...e.tags],
    icon: e.icon,
    review: { title: e.reviewTitle, detail: e.reviewDetail, manifest: e.manifest },
    charge: { amountCents: e.price * 100, currency: CATALOGUE_CURRENCY, unit: e.unit === "day" ? "per_day" : "per_rental" },
    maxQuantity: e.max,
    included: Boolean(e.included),
    sortOrder: orderOf(index),
    ...demo,
  };
}

/** The complete development seed, derived from the static catalogue. */
export function catalogueSeedFromStatic(): CatalogueSeed {
  return {
    locations: staticLocations.map(locationFromStatic),
    vehicleModels: staticVehicles.map(vehicleModelFromStatic),
    extras: staticExtras.map(extraFromStatic),
  };
}
