import { ObjectId } from "mongodb";
import { describe, expect, it } from "vitest";
import { brandOptions, categoryOptions, featureOptions, powertrainOptions, vehicles } from "@/data/vehicles";
import { extraSchema, locationSchema, storedExtraSchema, storedLocationSchema, storedVehicleModelSchema, vehicleModelSchema } from "./schemas";
import { catalogueSeedFromStatic } from "./seed/fromStatic";
import { CATEGORY_LABELS, FEATURE_LABELS, POWERTRAIN_LABELS, POWERTRAINS, TRANSMISSIONS, VEHICLE_CATEGORIES, VEHICLE_FEATURES } from "./taxonomy";

const seed = catalogueSeedFromStatic();
const location = seed.locations[0];
const vehicle = seed.vehicleModels[0];
const extra = seed.extras[0];

/** Path of the first issue when parsing fails, for readable assertions. */
const firstIssuePath = (r: { success: boolean; error?: { issues: { path: PropertyKey[] }[] } }) => (r.success ? null : r.error!.issues[0].path.join("."));

describe("catalogue taxonomy matches the static catalogue", () => {
  it("uses the same filter labels as the fleet UI options", () => {
    expect(categoryOptions.map((o) => [o.value, o.label])).toEqual(VEHICLE_CATEGORIES.map((c) => [c, CATEGORY_LABELS[c].filterLabel]));
    expect(powertrainOptions.map((o) => [o.value, o.label])).toEqual(POWERTRAINS.map((p) => [p, POWERTRAIN_LABELS[p]]));
    expect(featureOptions.map((o) => [o.value, o.label])).toEqual(VEHICLE_FEATURES.map((f) => [f, FEATURE_LABELS[f]]));
  });

  it("derives each vehicle's category label exactly as the static data spells it", () => {
    for (const v of vehicles) expect(CATEGORY_LABELS[v.category].label).toBe(v.categoryLabel);
  });

  it("represents every catalogue brand in the fleet UI's brand options", () => {
    const brands = [...new Set(seed.vehicleModels.map((v) => v.brand))];
    expect(brands.filter((b) => !(brandOptions as readonly string[]).includes(b))).toEqual([]);
  });

  it("covers every enum value the static vehicles use", () => {
    for (const v of vehicles) {
      expect(VEHICLE_CATEGORIES).toContain(v.category);
      expect(POWERTRAINS).toContain(v.powertrain);
      expect(TRANSMISSIONS).toContain(v.transmission);
      for (const f of v.features) expect(VEHICLE_FEATURES).toContain(f);
    }
  });
});

describe("location schema", () => {
  it("accepts a mapped location", () => {
    expect(locationSchema.safeParse(location).success).toBe(true);
  });

  it.each([
    ["unknown field", { ...location, phone: "+41 00 000 00 00" }, ""],
    ["upper-case code", { ...location, code: "ZRH" }, "code"],
    ["bad IATA code", { ...location, iataCode: "zr" }, "iataCode"],
    ["non-IANA time zone", { ...location, timezone: "CEST" }, "timezone"],
    ["unknown status", { ...location, status: "open" }, "status"],
    ["latitude out of range", { ...location, coordinates: { lat: 91, lng: 8 } }, "coordinates.lat"],
    ["leading whitespace", { ...location, city: " Zurich" }, "city"],
    ["empty text", { ...location, name: "" }, "name"],
    ["wrong schema version", { ...location, schemaVersion: 2 }, "schemaVersion"],
  ])("rejects %s", (_label, doc, path) => {
    const r = locationSchema.safeParse(doc);
    expect(r.success).toBe(false);
    expect(firstIssuePath(r)).toBe(path);
  });

  it("stored form requires an ObjectId and timestamps", () => {
    const now = new Date();
    expect(storedLocationSchema.safeParse({ ...location, _id: new ObjectId(), createdAt: now, updatedAt: now }).success).toBe(true);
    expect(storedLocationSchema.safeParse({ ...location, _id: "abc", createdAt: now, updatedAt: now }).success).toBe(false);
    expect(storedLocationSchema.safeParse(location).success).toBe(false);
  });
});

describe("vehicle model schema", () => {
  it("accepts a mapped vehicle model", () => {
    expect(vehicleModelSchema.safeParse(vehicle).success).toBe(true);
  });

  it.each([
    ["slug with spaces", { ...vehicle, slug: "range rover" }, "slug"],
    ["slug shorter than 3 characters", { ...vehicle, slug: "rr" }, "slug"],
    ["slug longer than 80 characters", { ...vehicle, slug: "a".repeat(81) }, "slug"],
    ["empty mobile copy object", { ...vehicle, mobile: {} }, "mobile"],
    ["published with a zero display rate", { ...vehicle, status: "published", displayRate: { amountCents: 0, currency: "EUR" } }, "displayRate.amountCents"],
    ["slug with upper case", { ...vehicle, slug: "Range-Rover" }, "slug"],
    ["non-integer cents", { ...vehicle, displayRate: { amountCents: 390.5, currency: "EUR" } }, "displayRate.amountCents"],
    ["negative cents", { ...vehicle, displayRate: { amountCents: -1, currency: "EUR" } }, "displayRate.amountCents"],
    ["other currency", { ...vehicle, displayRate: { amountCents: 39000, currency: "CHF" } }, "displayRate.currency"],
    ["remote image", { ...vehicle, media: { ...vehicle.media, hero: { src: "https://example.com/a.jpg", alt: "x" } } }, "media.hero.src"],
    ["image path traversal", { ...vehicle, media: { ...vehicle.media, hero: { src: "/images/../secret.jpg", alt: "x" } } }, "media.hero.src"],
    ["image without alt", { ...vehicle, media: { ...vehicle.media, hero: { src: "/images/a.jpg", alt: "" } } }, "media.hero.alt"],
    ["unknown category", { ...vehicle, category: "van" }, "category"],
    ["unknown feature", { ...vehicle, features: ["awd", "jetpack"] }, "features.1"],
    ["repeated feature", { ...vehicle, features: ["awd", "awd"] }, "features"],
    ["unknown powertrain", { ...vehicle, specs: { ...vehicle.specs, powertrain: "steam" } }, "specs.powertrain"],
    ["no narrative", { ...vehicle, narrative: [] }, "narrative"],
    ["bad home hub code", { ...vehicle, homeLocationCode: "Zurich" }, "homeLocationCode"],
    ["unknown status", { ...vehicle, status: "live" }, "status"],
    ["legacy 'available' field", { ...vehicle, available: true }, ""],
  ])("rejects %s", (_label, doc, path) => {
    const r = vehicleModelSchema.safeParse(doc);
    expect(r.success).toBe(false);
    expect(firstIssuePath(r)).toBe(path);
  });

  it("accepts a 3-character slug, mobile copy with one field, and a draft without a rate yet", () => {
    expect(vehicleModelSchema.safeParse({ ...vehicle, slug: "gt3" }).success).toBe(true);
    expect(vehicleModelSchema.safeParse({ ...vehicle, mobile: { subtitle: "Long Wheelbase" } }).success).toBe(true);
    expect(vehicleModelSchema.safeParse({ ...vehicle, status: "draft", displayRate: { amountCents: 0, currency: "EUR" } }).success).toBe(true);
  });

  it("stored form requires an ObjectId and timestamps", () => {
    const now = new Date();
    expect(storedVehicleModelSchema.safeParse({ ...vehicle, _id: new ObjectId(), createdAt: now, updatedAt: now }).success).toBe(true);
    expect(storedVehicleModelSchema.safeParse({ ...vehicle, _id: new ObjectId(), createdAt: now }).success).toBe(false);
  });

  it("stored form also enforces the published-rate rule", () => {
    const now = new Date();
    const zeroRate = { ...vehicle, displayRate: { amountCents: 0, currency: "EUR" }, _id: new ObjectId(), createdAt: now, updatedAt: now };
    expect(firstIssuePath(storedVehicleModelSchema.safeParse(zeroRate))).toBe("displayRate.amountCents");
  });
});

describe("stored schemas reject unknown fields", () => {
  const now = new Date();
  const meta = () => ({ _id: new ObjectId(), createdAt: now, updatedAt: now });
  it.each([
    ["location", storedLocationSchema, () => ({ ...location, ...meta(), legacy: 1 })],
    ["vehicle model", storedVehicleModelSchema, () => ({ ...vehicle, ...meta(), __v: 0 })],
    ["extra", storedExtraSchema, () => ({ ...extra, ...meta(), priceEuros: 45 })],
  ] as const)("%s", (_label, schema, doc) => {
    const r = schema.safeParse(doc());
    expect(r.success).toBe(false);
    expect(firstIssuePath(r)).toBe("");
  });
});

describe("extra schema", () => {
  it("accepts every mapped extra", () => {
    for (const e of seed.extras) expect(extraSchema.safeParse(e).success).toBe(true);
  });

  it.each([
    ["icon outside the loaded subset", { ...extra, icon: "rocket_launch" }, "icon"],
    ["unknown charge unit", { ...extra, charge: { ...extra.charge, unit: "per_hour" } }, "charge.unit"],
    ["zero max quantity", { ...extra, maxQuantity: 0 }, "maxQuantity"],
    ["unknown category", { ...extra, category: "luxury" }, "category"],
    ["code with spaces", { ...extra, code: "child seat" }, "code"],
  ])("rejects %s", (_label, doc, path) => {
    const r = extraSchema.safeParse(doc);
    expect(r.success).toBe(false);
    expect(firstIssuePath(r)).toBe(path);
  });

  it("rejects an included extra that carries a charge, in both content and stored form", () => {
    const included = seed.extras.find((e) => e.included)!;
    const charged = { ...included, charge: { ...included.charge, amountCents: 500 } };
    expect(firstIssuePath(extraSchema.safeParse(charged))).toBe("charge.amountCents");
    const now = new Date();
    expect(storedExtraSchema.safeParse({ ...charged, _id: new ObjectId(), createdAt: now, updatedAt: now }).success).toBe(false);
    expect(storedExtraSchema.safeParse({ ...included, _id: new ObjectId(), createdAt: now, updatedAt: now }).success).toBe(true);
  });
});
