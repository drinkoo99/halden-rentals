import { ObjectId } from "mongodb";
import { describe, expect, it } from "vitest";
import type { z } from "zod";
import { CATALOGUE_COLLECTION_SPECS, CATALOGUE_COLLECTIONS, extrasValidator, locationsValidator, vehicleModelsValidator } from "./collections";
import { extraSchema, locationSchema, vehicleModelSchema } from "./schemas";
import { catalogueSeedFromStatic } from "./seed/fromStatic";

type Doc = Record<string, unknown>;
const META = ["_id", "createdAt", "updatedAt"];
const jsonSchema = (v: Doc) => v.$jsonSchema as Doc;
const props = (s: Doc) => s.properties as Record<string, Doc>;

/** Keys of a Zod object schema, and the subset that is required (rejects undefined). */
function zodKeys(schema: z.ZodObject) {
  const shape = schema.shape as Record<string, z.ZodType>;
  const all = Object.keys(shape).sort();
  const required = all.filter((k) => !shape[k].safeParse(undefined).success);
  return { all, required };
}

const cases = [
  ["locations", locationsValidator, locationSchema],
  ["vehicleModels", vehicleModelsValidator, vehicleModelSchema],
  ["extras", extrasValidator, extraSchema],
] as const;

describe("validators stay in step with the Zod schemas", () => {
  it.each(cases)("%s: same top-level fields, same required fields, no additional properties", (_name, validator, schema) => {
    const s = jsonSchema(validator);
    const z = zodKeys(schema as unknown as z.ZodObject);
    expect(Object.keys(props(s)).sort()).toEqual([...z.all, ...META].sort());
    expect([...(s.required as string[])].sort()).toEqual([...z.required, ...META].sort());
    expect(s.additionalProperties).toBe(false);
  });

  it.each(cases)("%s: every enum matches the Zod enum", (_name, validator, schema) => {
    const shape = (schema as unknown as z.ZodObject).shape as Record<string, { options?: unknown[] }>;
    for (const [field, rule] of Object.entries(props(jsonSchema(validator))))
      if (rule.enum && shape[field]?.options) expect(rule.enum, field).toEqual(shape[field].options);
  });

  it("nested required fields match Zod", () => {
    const nested = (v: Doc, field: string) => [...((props(jsonSchema(v))[field].required as string[]) ?? [])].sort();
    const zodNested = (schema: z.ZodObject, field: string) => zodKeys((schema.shape as Record<string, z.ZodObject>)[field]).required;
    const vehicle = vehicleModelSchema as unknown as z.ZodObject;
    expect(nested(vehicleModelsValidator, "specs")).toEqual(zodNested(vehicle, "specs"));
    expect(nested(vehicleModelsValidator, "displayRate")).toEqual(zodNested(vehicle, "displayRate"));
    expect(nested(vehicleModelsValidator, "media")).toEqual(zodNested(vehicle, "media"));
    expect(nested(locationsValidator, "coordinates")).toEqual(zodNested(locationSchema, "coordinates"));
    expect(nested(locationsValidator, "handover")).toEqual(zodNested(locationSchema, "handover"));
    const extra = extraSchema as unknown as z.ZodObject;
    expect(nested(extrasValidator, "review")).toEqual(zodNested(extra, "review"));
    expect(nested(extrasValidator, "charge")).toEqual(zodNested(extra, "charge"));
  });
});

// ---- A small evaluator for the $jsonSchema keywords these validators use ---------------------------
// Not MongoDB itself (the P2b integration test against halden_test is authoritative); enough to show
// that the validators accept every seed document and reject the documents they are meant to reject.
function bsonTypeOf(v: unknown): string[] {
  if (v instanceof ObjectId) return ["objectId"];
  if (v instanceof Date) return ["date"];
  if (Array.isArray(v)) return ["array"];
  if (typeof v === "string") return ["string"];
  if (typeof v === "boolean") return ["bool"];
  if (typeof v === "number") return Number.isInteger(v) ? ["int", "long", "number"] : ["double", "number"];
  if (v && typeof v === "object") return ["object"];
  return ["null"];
}

function violations(schema: Doc, value: unknown, path = ""): string[] {
  const out: string[] = [];
  const here = path || "(document)";
  if (schema.bsonType) {
    const wanted = ([] as string[]).concat(schema.bsonType as string);
    if (!bsonTypeOf(value).some((t) => wanted.includes(t))) return [`${here}: bsonType`];
  }
  if (schema.enum && !(schema.enum as unknown[]).includes(value)) out.push(`${here}: enum`);
  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < (schema.minLength as number)) out.push(`${here}: minLength`);
    if (schema.maxLength !== undefined && value.length > (schema.maxLength as number)) out.push(`${here}: maxLength`);
    if (schema.pattern && !new RegExp(schema.pattern as string).test(value)) out.push(`${here}: pattern`);
  }
  if (typeof value === "number") {
    if (schema.minimum !== undefined && value < (schema.minimum as number)) out.push(`${here}: minimum`);
    if (schema.maximum !== undefined && value > (schema.maximum as number)) out.push(`${here}: maximum`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < (schema.minItems as number)) out.push(`${here}: minItems`);
    if (schema.uniqueItems && new Set(value.map((x) => JSON.stringify(x))).size !== value.length) out.push(`${here}: uniqueItems`);
    if (schema.items) value.forEach((item, i) => out.push(...violations(schema.items as Doc, item, `${path}[${i}]`)));
  }
  if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof ObjectId)) {
    const obj = value as Doc;
    if (schema.minProperties !== undefined && Object.keys(obj).length < (schema.minProperties as number)) out.push(`${here}: minProperties`);
    for (const r of (schema.required as string[]) ?? []) if (!(r in obj)) out.push(`${path ? path + "." : ""}${r}: required`);
    const p = (schema.properties as Record<string, Doc>) ?? {};
    for (const [k, v] of Object.entries(obj)) {
      if (p[k]) out.push(...violations(p[k], v, path ? `${path}.${k}` : k));
      else if (schema.additionalProperties === false) out.push(`${path ? path + "." : ""}${k}: additionalProperties`);
    }
  }
  return out;
}

const seed = catalogueSeedFromStatic();
const now = new Date();
const stored = <T extends object>(doc: T) => ({ _id: new ObjectId(), ...doc, createdAt: now, updatedAt: now });

describe("validators accept every seed document as stored", () => {
  it.each([
    ["locations", locationsValidator, seed.locations],
    ["vehicleModels", vehicleModelsValidator, seed.vehicleModels],
    ["extras", extrasValidator, seed.extras],
  ] as const)("%s", (_name, validator, docs) => {
    for (const d of docs) expect(violations(jsonSchema(validator), stored(d))).toEqual([]);
  });
});

describe("validators reject what the database must reject", () => {
  const vehicle = () => stored(structuredClone(seed.vehicleModels[0]));
  it.each([
    ["an unknown top-level field", () => ({ ...vehicle(), legacy: true }), "legacy: additionalProperties"],
    ["a missing natural key", () => { const v: Doc = vehicle(); delete v.slug; return v; }, "slug: required"],
    ["missing timestamps", () => { const v: Doc = vehicle(); delete v.createdAt; return v; }, "createdAt: required"],
    ["negative cents", () => ({ ...vehicle(), displayRate: { amountCents: -1, currency: "EUR" } }), "displayRate.amountCents: minimum"],
    ["fractional cents", () => ({ ...vehicle(), displayRate: { amountCents: 390.5, currency: "EUR" } }), "displayRate.amountCents: bsonType"],
    ["another currency", () => ({ ...vehicle(), displayRate: { amountCents: 39000, currency: "CHF" } }), "displayRate.currency: enum"],
    ["an unknown status", () => ({ ...vehicle(), status: "live" }), "status: enum"],
    ["a short slug", () => ({ ...vehicle(), slug: "rr" }), "slug: minLength"],
    ["a duplicate feature", () => ({ ...vehicle(), features: ["awd", "awd"] }), "features: uniqueItems"],
    ["an empty mobile object", () => ({ ...vehicle(), mobile: {} }), "mobile: minProperties"],
    ["a string _id", () => ({ ...vehicle(), _id: "abc" }), "_id: bsonType"],
  ])("rejects %s", (_label, make, expected) => {
    expect(violations(jsonSchema(vehicleModelsValidator), make())).toContain(expected);
  });

  it("rejects a location with a lower-case IATA code and an extra with an unknown charge unit", () => {
    expect(violations(jsonSchema(locationsValidator), stored({ ...seed.locations[0], iataCode: "zrh" }))).toContain("iataCode: pattern");
    expect(violations(jsonSchema(extrasValidator), stored({ ...seed.extras[0], charge: { ...seed.extras[0].charge, unit: "per_hour" } }))).toContain("charge.unit: enum");
  });
});

describe("indexes", () => {
  const indexes = (name: string) => CATALOGUE_COLLECTION_SPECS.find((s) => s.name === name)!.indexes;

  it("registers the three catalogue collections with validators", () => {
    expect(CATALOGUE_COLLECTION_SPECS.map((s) => [s.name, Boolean(s.validator)])).toEqual(Object.values(CATALOGUE_COLLECTIONS).map((n) => [n, true]));
  });

  it("names every index explicitly and uniquely", () => {
    const names = CATALOGUE_COLLECTION_SPECS.flatMap((s) => s.indexes.map((i) => i.name));
    expect(names.every((n) => /^[A-Za-z]+_[a-z_]+$/.test(n))).toBe(true);
    expect(new Set(names).size).toBe(names.length);
  });

  it("enforces the natural keys as unique", () => {
    const uniqueKeys = (name: string) => indexes(name).filter((i) => i.unique).map((i) => Object.keys(i.key));
    expect(uniqueKeys("locations")).toEqual([["code"], ["iataCode"]]);
    expect(uniqueKeys("vehicleModels")).toEqual([["slug"], ["exhibit"]]);
    expect(uniqueKeys("extras")).toEqual([["code"]]);
  });

  it("keeps exhibit numbers unique across all statuses (no partial filter)", () => {
    const exhibit = indexes("vehicleModels").find((i) => i.name === "vehicleModels_exhibit_unique")!;
    expect(exhibit).toEqual({ name: "vehicleModels_exhibit_unique", key: { exhibit: 1 }, unique: true });
  });

  it("indexes the public list query of each collection, and nothing else", () => {
    for (const s of CATALOGUE_COLLECTION_SPECS) {
      expect(s.indexes.filter((i) => !i.unique).map((i) => i.key)).toEqual([{ status: 1, sortOrder: 1 }]);
    }
  });
});
