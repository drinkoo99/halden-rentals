import { describe, expect, it } from "vitest";
import type { CatalogueSeed } from "../types";
import { catalogueSeedFromStatic } from "./fromStatic";
import { validateCatalogueSeed } from "./validate";

/** A fresh, independent copy of the real seed to break in each test. */
const fresh = (): CatalogueSeed => structuredClone(catalogueSeedFromStatic());

describe("validateCatalogueSeed", () => {
  it("accepts the real seed", () => {
    expect(validateCatalogueSeed(fresh())).toEqual([]);
  });

  it("reports schema problems with collection, key and field path", () => {
    const seed = fresh();
    seed.vehicleModels[1].displayRate.amountCents = -100;
    // a negative rate on a published model breaks two rules: the money minimum and "published needs a rate"
    expect(validateCatalogueSeed(seed)).toEqual([
      { collection: "vehicleModels", key: seed.vehicleModels[1].slug, problem: expect.stringMatching(/^displayRate\.amountCents: Too small/) },
      { collection: "vehicleModels", key: seed.vehicleModels[1].slug, problem: "displayRate.amountCents: a published vehicle must have a display rate above zero" },
    ]);
  });

  it("reports duplicate keys", () => {
    const seed = fresh();
    seed.vehicleModels[2].slug = seed.vehicleModels[0].slug;
    seed.vehicleModels[3].exhibit = seed.vehicleModels[0].exhibit;
    seed.extras[1].sortOrder = seed.extras[0].sortOrder;
    seed.locations[1].iataCode = seed.locations[0].iataCode;
    const problems = validateCatalogueSeed(seed).map((i) => `${i.collection}: ${i.problem}`);
    expect(problems).toEqual(
      expect.arrayContaining([
        `vehicleModels: duplicate slug "${seed.vehicleModels[0].slug}"`,
        `vehicleModels: duplicate exhibit "${seed.vehicleModels[0].exhibit}"`,
        `extras: duplicate sortOrder "${seed.extras[0].sortOrder}"`,
        `locations: duplicate iataCode "${seed.locations[0].iataCode}"`,
      ]),
    );
  });

  it("reports a vehicle whose home hub does not exist", () => {
    const seed = fresh();
    seed.vehicleModels[0].homeLocationCode = "xyz";
    expect(validateCatalogueSeed(seed)).toEqual([{ collection: "vehicleModels", key: seed.vehicleModels[0].slug, problem: 'homeLocationCode "xyz" does not exist' }]);
  });

  it("reports location and extra schema problems with their key and field path", () => {
    const seed = fresh();
    seed.locations[2].timezone = "CEST";
    seed.extras[3].icon = "not_an_icon";
    expect(validateCatalogueSeed(seed)).toEqual([
      { collection: "locations", key: seed.locations[2].code, problem: expect.stringMatching(/^timezone: /) },
      { collection: "extras", key: seed.extras[3].code, problem: expect.stringMatching(/^icon: /) },
    ]);
  });

  it("reports a published vehicle based at a coming_soon hub", () => {
    const seed = fresh();
    const hub = seed.vehicleModels[0].homeLocationCode;
    seed.locations.find((l) => l.code === hub)!.status = "coming_soon";
    const affected = seed.vehicleModels.filter((v) => v.homeLocationCode === hub).map((v) => v.slug);
    const issues = validateCatalogueSeed(seed);
    expect(issues.map((i) => i.key)).toEqual(affected);
    expect(issues.every((i) => i.problem === `published but its home hub "${hub}" is not active`)).toBe(true);
  });

  it("keeps exhibit numbers unique across all statuses, including archived models", () => {
    const seed = fresh();
    seed.vehicleModels[1].status = "archived";
    seed.vehicleModels[1].exhibit = seed.vehicleModels[0].exhibit;
    expect(validateCatalogueSeed(seed).map((i) => i.problem)).toEqual([`duplicate exhibit "${seed.vehicleModels[0].exhibit}"`]);
  });

  it("reports a published vehicle based at an inactive hub, but allows a draft there", () => {
    const seed = fresh();
    const hub = seed.vehicleModels[0].homeLocationCode;
    seed.locations.find((l) => l.code === hub)!.status = "inactive";
    const affected = seed.vehicleModels.filter((v) => v.homeLocationCode === hub);
    expect(validateCatalogueSeed(seed).map((i) => i.key)).toEqual(affected.map((v) => v.slug));
    for (const v of affected) v.status = "draft";
    expect(validateCatalogueSeed(seed)).toEqual([]);
  });
});
