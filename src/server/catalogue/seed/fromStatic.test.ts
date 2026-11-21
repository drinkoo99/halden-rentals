import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { extras, type Extra } from "@/data/extras";
import { locations, type Location } from "@/data/locations";
import { vehicles, type Vehicle } from "@/data/vehicles";
import { catalogueSeedFromStatic, parseCoordinates } from "./fromStatic";
import { validateCatalogueSeed } from "./validate";

const seed = catalogueSeedFromStatic();
const PUBLIC_DIR = join(__dirname, "..", "..", "..", "..", "public");

// ---- Field coverage -------------------------------------------------------------------------------
// Every field of the static source types must be accounted for. The maps are checked twice:
// - by TypeScript (`satisfies Record<keyof T, …>`): adding a field to Vehicle/Location/Extra breaks the
//   typecheck until it is listed here;
// - at runtime: every key present in the data must be listed, every "copied" field must appear at its
//   target path with the same value, and every listed field must occur in the data (no stale entries).
type Disposition =
  | { kind: "copied"; to: string } // value stored unchanged at `to`
  | { kind: "converted"; to: string; how: string } // value stored at `to` in another representation
  | { kind: "derived"; how: string } // not stored; recomputed from other data
  | { kind: "replaced"; by: string; why: string } // superseded by a different value
  | { kind: "excluded"; why: string }; // intentionally not migrated

const VEHICLE_FIELDS = {
  slug: { kind: "copied", to: "slug" },
  brand: { kind: "copied", to: "brand" },
  model: { kind: "copied", to: "model" },
  name: { kind: "copied", to: "name" },
  exhibit: { kind: "copied", to: "exhibit" },
  category: { kind: "copied", to: "category" },
  categoryLabel: { kind: "derived", how: "CATEGORY_LABELS[category].label" },
  year: { kind: "copied", to: "year" },
  seats: { kind: "copied", to: "specs.seats" },
  seatsLabel: { kind: "copied", to: "specs.seatsLabel" },
  gearbox: { kind: "copied", to: "specs.gearbox" },
  transmission: { kind: "copied", to: "specs.transmission" },
  powerHp: { kind: "copied", to: "specs.powerHp" },
  powertrain: { kind: "copied", to: "specs.powertrain" },
  features: { kind: "copied", to: "features" },
  pricePerDay: { kind: "converted", to: "displayRate.amountCents", how: "euros → integer cents" },
  available: { kind: "converted", to: "bookable", how: "renamed: a staff booking switch, not date availability" },
  colour: { kind: "copied", to: "colour" },
  specLine: { kind: "copied", to: "specLine" },
  image: { kind: "copied", to: "media.hero.src" },
  imageAlt: { kind: "copied", to: "media.hero.alt" },
  mobileImage: { kind: "copied", to: "media.mobileHero.src" },
  gallery: { kind: "copied", to: "media.gallery" },
  provenance: { kind: "copied", to: "provenance" },
  headline: { kind: "copied", to: "headline" },
  narrative: { kind: "copied", to: "narrative" },
  specs: { kind: "copied", to: "specRows" },
  amenities: { kind: "copied", to: "amenities" },
  homeLocation: { kind: "copied", to: "homeLocationCode" },
  subtitle: { kind: "copied", to: "subtitle" },
  mobileSubtitle: { kind: "copied", to: "mobile.subtitle" },
  mobileNarrative: { kind: "copied", to: "mobile.narrative" },
  mobileAmenities: { kind: "copied", to: "mobile.amenities" },
  galleryBadge: { kind: "copied", to: "galleryBadge" },
  mobileGallery: { kind: "copied", to: "media.mobileGallery" },
} satisfies Record<keyof Vehicle, Disposition>;

const LOCATION_FIELDS = {
  id: { kind: "copied", to: "code" },
  code: { kind: "copied", to: "iataCode" },
  city: { kind: "copied", to: "city" },
  label: { kind: "copied", to: "name" },
  longLabel: { kind: "copied", to: "longName" },
  timezone: { kind: "replaced", by: "timezone (IANA zone)", why: '"CEST" is a label, wrong half of the year' },
  terminalPoint: { kind: "copied", to: "handover.terminalPoint" },
  coordinates: { kind: "converted", to: "coordinates", how: '"47.4582° N, 8.5555° E" → { lat, lng }' },
  handoverTitle: { kind: "copied", to: "handover.title" },
  handoverNote: { kind: "copied", to: "handover.note" },
  handoverWindow: { kind: "copied", to: "handover.window" },
} satisfies Record<keyof Location, Disposition>;

const EXTRA_FIELDS = {
  id: { kind: "copied", to: "code" },
  item: { kind: "copied", to: "itemLabel" },
  tier: { kind: "copied", to: "tier" },
  title: { kind: "copied", to: "title" },
  description: { kind: "copied", to: "description" },
  tags: { kind: "copied", to: "tags" },
  price: { kind: "converted", to: "charge.amountCents", how: "euros → integer cents" },
  unit: { kind: "converted", to: "charge.unit", how: "day → per_day, flat → per_rental" },
  max: { kind: "copied", to: "maxQuantity" },
  included: { kind: "converted", to: "included", how: "optional flag → explicit boolean" },
  icon: { kind: "copied", to: "icon" },
  reviewTitle: { kind: "copied", to: "review.title" },
  reviewDetail: { kind: "copied", to: "review.detail" },
  manifest: { kind: "copied", to: "review.manifest" },
} satisfies Record<keyof Extra, Disposition>;

const at = (obj: unknown, path: string): unknown => path.split(".").reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string, unknown>)[k]), obj);

function checkCoverage(name: string, records: object[], docs: object[], fields: Record<string, Disposition>) {
  describe(`${name} field coverage`, () => {
    it("lists every field that occurs in the static data", () => {
      const present = new Set(records.flatMap((r) => Object.keys(r)));
      expect([...present].filter((k) => !(k in fields))).toEqual([]);
    });

    it("has no stale entries (every listed field occurs in the data)", () => {
      const present = new Set(records.flatMap((r) => Object.keys(r)));
      expect(Object.keys(fields).filter((k) => !present.has(k))).toEqual([]);
    });

    it("stores every copied field unchanged at its target, and every converted field at its target", () => {
      records.forEach((record, i) => {
        for (const [key, d] of Object.entries(fields)) {
          const value = (record as Record<string, unknown>)[key];
          if (value === undefined) continue;
          if (d.kind === "copied") expect(at(docs[i], d.to), `${name}[${i}].${key} → ${d.to}`).toEqual(value);
          if (d.kind === "converted") expect(at(docs[i], d.to), `${name}[${i}].${key} → ${d.to}`).toBeDefined();
        }
      });
    });
  });
}

checkCoverage("Vehicle", vehicles, seed.vehicleModels, VEHICLE_FIELDS);
checkCoverage("Location", locations, seed.locations, LOCATION_FIELDS);
checkCoverage("Extra", extras, seed.extras, EXTRA_FIELDS);

// ---- Fixed expectations -----------------------------------------------------------------------------
// Literal values read from src/data by hand — deliberately NOT recomputed with the mapping's own formulas.
describe("fixed expectations", () => {
  const vehicle = (slug: string) => seed.vehicleModels.find((v) => v.slug === slug)!;

  it("Range Rover Autobiography: €390/day, exhibit 08, SUV based at Munich", () => {
    expect(vehicle("range-rover-autobiography")).toMatchObject({
      exhibit: "08",
      category: "suv",
      homeLocationCode: "muc",
      displayRate: { amountCents: 39000, currency: "EUR" },
      specs: { seats: 7, transmission: "automatic", powerHp: 530 },
      bookable: true,
      status: "published",
    });
  });

  it("Porsche 911 GT3 Touring: €440/day, exhibit 09, sports car based at Munich", () => {
    expect(vehicle("porsche-911-gt3-touring")).toMatchObject({
      exhibit: "09",
      category: "sports",
      homeLocationCode: "muc",
      displayRate: { amountCents: 44000, currency: "EUR" },
      specs: { seats: 2, transmission: "automatic", powerHp: 502 },
    });
  });

  it("charges every extra as listed (cents, unit, quantity limit, included)", () => {
    expect(Object.fromEntries(seed.extras.map((e) => [e.code, [e.charge.amountCents, e.charge.unit, e.maxQuantity, e.included]]))).toEqual({
      waiver: [4500, "per_day", 1, false],
      driver: [3000, "per_day", 1, false],
      childseat: [2000, "per_day", 2, false],
      delivery: [12000, "per_rental", 1, false],
      winter: [0, "per_rental", 1, true],
    });
  });

  it("Zurich hub: IATA ZRH, coordinates 47.4582 / 8.5555", () => {
    expect(seed.locations.find((l) => l.code === "zrh")).toMatchObject({ iataCode: "ZRH", country: "CH", coordinates: { lat: 47.4582, lng: 8.5555 } });
  });
});

/** Every value in a nested structure, for "no undefined anywhere" checks. */
function walk(value: unknown, path = "", out: [string, unknown][] = []): [string, unknown][] {
  out.push([path, value]);
  if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`, out);
  return out;
}

describe("static catalogue → seed documents", () => {
  it("maps every static record, in catalogue order", () => {
    expect(seed.locations.map((l) => l.code)).toEqual(locations.map((l) => l.id));
    expect(seed.vehicleModels.map((v) => v.slug)).toEqual(vehicles.map((v) => v.slug));
    expect(seed.extras.map((e) => e.code)).toEqual(extras.map((e) => e.id));
    expect([seed.locations.length, seed.vehicleModels.length, seed.extras.length]).toEqual([5, 10, 5]);
    for (const docs of [seed.locations, seed.vehicleModels, seed.extras]) expect(docs.map((d) => d.sortOrder)).toEqual(docs.map((_, i) => (i + 1) * 10));
  });

  it("produces a seed with no schema, uniqueness or reference problems", () => {
    expect(validateCatalogueSeed(seed)).toEqual([]);
  });

  it("marks every seeded document as demo content", () => {
    for (const d of [...seed.locations, ...seed.vehicleModels, ...seed.extras]) {
      expect(d.dataOrigin).toBe("demo");
      expect(d.schemaVersion).toBe(1);
    }
  });

  it("never emits undefined values (MongoDB would store them as null)", () => {
    const undefinedPaths = walk(seed).filter(([, v]) => v === undefined).map(([p]) => p);
    expect(undefinedPaths).toEqual([]);
  });

  it("is pure: repeatable, and seed objects do not alias the static data", () => {
    expect(catalogueSeedFromStatic()).toEqual(seed);
    const copy = catalogueSeedFromStatic();
    copy.vehicleModels[0].narrative.push("changed");
    copy.vehicleModels[0].media.gallery.length = 0;
    expect(vehicles[0].narrative).not.toContain("changed");
    expect(vehicles[0].gallery.length).toBeGreaterThan(0);
  });
});

describe("vehicle parity", () => {
  it.each(vehicles.map((v, i) => [v.slug, v, i] as const))("%s keeps all of its static content", (_slug, v, i) => {
    const d = seed.vehicleModels[i];
    expect(d).toMatchObject({
      slug: v.slug,
      status: "published",
      bookable: v.available,
      exhibit: v.exhibit,
      brand: v.brand,
      model: v.model,
      name: v.name,
      category: v.category,
      year: v.year,
      specs: { seats: v.seats, seatsLabel: v.seatsLabel, transmission: v.transmission, gearbox: v.gearbox, powerHp: v.powerHp, powertrain: v.powertrain },
      features: v.features,
      specLine: v.specLine,
      headline: v.headline,
      narrative: v.narrative,
      specRows: v.specs,
      amenities: v.amenities,
      homeLocationCode: v.homeLocation,
      displayRate: { amountCents: v.pricePerDay * 100, currency: "EUR" },
    });
    // optional fields: present exactly when the static record has them
    expect(d.colour).toBe(v.colour);
    expect(d.provenance).toBe(v.provenance);
    expect(d.subtitle).toBe(v.subtitle);
    expect(d.galleryBadge).toBe(v.galleryBadge);
    expect(d.media.hero).toEqual({ src: v.image, alt: v.imageAlt });
    expect(d.media.mobileHero).toEqual(v.mobileImage ? { src: v.mobileImage, alt: v.imageAlt } : undefined);
    expect(d.media.gallery).toEqual(v.gallery);
    expect(d.media.mobileGallery).toEqual(v.mobileGallery);
    expect(d.mobile?.subtitle).toBe(v.mobileSubtitle);
    expect(d.mobile?.narrative).toBe(v.mobileNarrative);
    expect(d.mobile?.amenities).toEqual(v.mobileAmenities);
    expect("mobile" in d).toBe(Boolean(v.mobileSubtitle || v.mobileNarrative || v.mobileAmenities));
  });

  it("references only images that exist in public/images", () => {
    const srcs = seed.vehicleModels.flatMap((v) => [v.media.hero, v.media.mobileHero, ...v.media.gallery, ...(v.media.mobileGallery ?? [])]).flatMap((img) => (img ? [img.src] : []));
    const missing = [...new Set(srcs)].filter((src) => !existsSync(join(PUBLIC_DIR, src)));
    expect(missing).toEqual([]);
  });
});

describe("location parity", () => {
  it.each(locations.map((l, i) => [l.id, l, i] as const))("%s keeps all of its static content", (_id, l, i) => {
    const d = seed.locations[i];
    expect(d).toMatchObject({
      code: l.id,
      iataCode: l.code,
      status: "active",
      city: l.city,
      name: l.label,
      longName: l.longLabel,
      handover: { title: l.handoverTitle, note: l.handoverNote, window: l.handoverWindow, terminalPoint: l.terminalPoint },
    });
    // coordinates are parsed losslessly: formatting them back gives the original string
    const fmt = (n: number, pos: string, neg: string) => `${Math.abs(n).toFixed(4)}° ${n < 0 ? neg : pos}`;
    expect(`${fmt(d.coordinates.lat, "N", "S")}, ${fmt(d.coordinates.lng, "E", "W")}`).toBe(l.coordinates);
  });

  it("adds no addresses, contact details or opening-hour rules (D11)", () => {
    for (const d of seed.locations) expect(Object.keys(d).sort()).toEqual(["city", "code", "coordinates", "country", "dataOrigin", "handover", "iataCode", "longName", "name", "schemaVersion", "sortOrder", "status", "timezone"]);
  });

  it("replaces the static 'CEST' label with each hub's IANA time zone", () => {
    expect(Object.fromEntries(seed.locations.map((l) => [l.code, [l.country, l.timezone]]))).toEqual({
      zrh: ["CH", "Europe/Zurich"],
      muc: ["DE", "Europe/Berlin"],
      gva: ["CH", "Europe/Zurich"],
      mxp: ["IT", "Europe/Rome"],
      vie: ["AT", "Europe/Vienna"],
    });
  });

  it("parses all coordinate notations and rejects malformed ones", () => {
    expect(parseCoordinates("33.9425° S, 18.6022° W")).toEqual({ lat: -33.9425, lng: -18.6022 });
    expect(() => parseCoordinates("47.4582, 8.5555")).toThrow(/Unrecognised coordinates/);
  });
});

describe("extra parity", () => {
  it.each(extras.map((e, i) => [e.id, e, i] as const))("%s keeps all of its static content", (_id, e, i) => {
    const d = seed.extras[i];
    expect(d).toEqual({
      code: e.id,
      status: "active",
      category: expect.any(String),
      title: e.title,
      description: e.description,
      itemLabel: e.item,
      tier: e.tier,
      tags: e.tags,
      icon: e.icon,
      review: { title: e.reviewTitle, detail: e.reviewDetail, manifest: e.manifest },
      charge: { amountCents: e.price * 100, currency: "EUR", unit: e.unit === "day" ? "per_day" : "per_rental" },
      maxQuantity: e.max,
      included: Boolean(e.included),
      sortOrder: (i + 1) * 10,
      dataOrigin: "demo",
      schemaVersion: 1,
    });
  });

  it("groups the extras into categories", () => {
    expect(Object.fromEntries(seed.extras.map((e) => [e.code, e.category]))).toEqual({
      waiver: "protection",
      driver: "driver",
      childseat: "equipment",
      delivery: "service",
      winter: "seasonal",
    });
  });
});
