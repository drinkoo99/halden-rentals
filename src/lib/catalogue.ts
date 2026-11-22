import type { Extra, ExtraId } from "@/data/extras";
import type { Location } from "@/data/locations";
import type { Vehicle } from "@/data/vehicles";
import type { PublicCatalogue, PublicExtra, PublicLocation, PublicVehicle } from "@/server/catalogue/public";
import { CATEGORY_LABELS } from "@/server/catalogue/taxonomy";

/**
 * The catalogue as the UI uses it (M3). The pages receive the public catalogue from the database and map
 * it to the view types the components were built on (`Vehicle`, `Location`, `Extra` in src/data), so the
 * components render exactly what they rendered from the static data. Pure and client-safe.
 */
export type SiteCatalogue = { vehicles: Vehicle[]; locations: Location[]; extras: Extra[] };

const drop = <T extends object>(obj: T): T => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;

/** "CET" / "CEST" for a hub's IANA zone at the given moment (the static data hard-coded "CEST"). */
export function zoneLabel(timezone: string, at: Date): string {
  const part = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, timeZoneName: "short" }).formatToParts(at).find((p) => p.type === "timeZoneName");
  return part?.value ?? timezone;
}

/** { lat: 47.4582, lng: 8.5555 } → "47.4582° N, 8.5555° E" (the format the static data used). */
export function formatCoordinates({ lat, lng }: { lat: number; lng: number }): string {
  return `${Math.abs(lat).toFixed(4)}° ${lat < 0 ? "S" : "N"}, ${Math.abs(lng).toFixed(4)}° ${lng < 0 ? "W" : "E"}`;
}

export function toLocation(l: PublicLocation, at: Date): Location {
  return {
    id: l.code,
    code: l.iataCode,
    city: l.city,
    label: l.name,
    longLabel: l.longName,
    timezone: zoneLabel(l.timezone, at),
    terminalPoint: l.handover.terminalPoint,
    coordinates: formatCoordinates(l.coordinates),
    handoverTitle: l.handover.title,
    handoverNote: l.handover.note,
    handoverWindow: l.handover.window,
  };
}

export function toVehicle(v: PublicVehicle): Vehicle {
  return drop({
    slug: v.slug,
    brand: v.brand,
    model: v.model,
    name: v.name,
    exhibit: v.exhibit,
    category: v.category,
    categoryLabel: CATEGORY_LABELS[v.category].label,
    year: v.year,
    seats: v.specs.seats,
    seatsLabel: v.specs.seatsLabel,
    gearbox: v.specs.gearbox,
    transmission: v.specs.transmission,
    powerHp: v.specs.powerHp,
    powertrain: v.specs.powertrain,
    features: [...v.features],
    pricePerDay: v.displayRate.amountCents / 100,
    available: v.bookable,
    colour: v.colour,
    specLine: v.specLine,
    image: v.media.hero.src,
    imageAlt: v.media.hero.alt,
    mobileImage: v.media.mobileHero?.src,
    gallery: v.media.gallery.map((g) => ({ src: g.src, alt: g.alt })),
    provenance: v.provenance,
    headline: v.headline,
    narrative: [...v.narrative],
    specs: v.specRows.map((s) => ({ label: s.label, value: s.value })),
    amenities: [...v.amenities],
    homeLocation: v.homeLocationCode,
    subtitle: v.subtitle,
    mobileSubtitle: v.mobile?.subtitle,
    mobileNarrative: v.mobile?.narrative,
    mobileAmenities: v.mobile?.amenities?.map((a) => ({ title: a.title, detail: a.detail })),
    galleryBadge: v.galleryBadge,
    mobileGallery: v.media.mobileGallery?.map((g) => ({ src: g.src, alt: g.alt })),
  });
}

export function toExtra(e: PublicExtra): Extra {
  return drop({
    id: e.code as ExtraId,
    item: e.itemLabel,
    tier: e.tier,
    title: e.title,
    description: e.description,
    tags: [...e.tags],
    price: e.charge.amountCents / 100,
    unit: e.charge.unit === "per_day" ? ("day" as const) : ("flat" as const),
    max: e.maxQuantity,
    included: e.included || undefined,
    icon: e.icon,
    reviewTitle: e.review.title,
    reviewDetail: e.review.detail,
    manifest: e.review.manifest,
  });
}

export function toSiteCatalogue(c: PublicCatalogue, at: Date): SiteCatalogue {
  return { vehicles: c.vehicles.map(toVehicle), locations: c.locations.map((l) => toLocation(l, at)), extras: c.extras.map(toExtra) };
}

// ---- Lookups (previously in src/data, now over the loaded catalogue) -----------------------------

export function findVehicle(vehicles: Vehicle[], slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

/** The hub with this id, else the first hub (the default pick-up). */
export function findLocation(locations: Location[], id: string | null | undefined): Location {
  return locations.find((l) => l.id === id) ?? locations[0];
}

/** Up to n other cars: same category first, then closest day rate. */
export function similarVehicles(vehicles: Vehicle[], v: Vehicle, n = 3): Vehicle[] {
  return vehicles
    .filter((x) => x.slug !== v.slug)
    .sort((a, b) => {
      const ca = a.category === v.category ? 0 : 1;
      const cb = b.category === v.category ? 0 : 1;
      return ca - cb || Math.abs(a.pricePerDay - v.pricePerDay) - Math.abs(b.pricePerDay - v.pricePerDay);
    })
    .slice(0, n);
}
