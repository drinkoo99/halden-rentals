import { ObjectId } from "mongodb";
import { describe, expect, it } from "vitest";
import type { CatalogueSeed } from "../types";
import { catalogueSeedFromStatic } from "./fromStatic";
import { planSeed, type ExistingCatalogue, type StoredDoc } from "./plan";

const seed = () => structuredClone(catalogueSeedFromStatic());
const at = new Date("2026-11-20T10:00:00Z");
const stored = (doc: object, extra: Record<string, unknown> = {}): StoredDoc => ({ _id: new ObjectId(), ...structuredClone(doc), createdAt: at, updatedAt: at, ...extra });
const empty = (): ExistingCatalogue => ({ locations: [], vehicleModels: [], extras: [] });
const seeded = (s: CatalogueSeed = seed()): ExistingCatalogue => ({
  locations: s.locations.map((d) => stored(d)),
  vehicleModels: s.vehicleModels.map((d) => stored(d)),
  extras: s.extras.map((d) => stored(d)),
});
const counts = (p: ReturnType<typeof planSeed>) =>
  Object.fromEntries(p.collections.map((c) => [c.collection, [c.inserts.length, c.updates.length, c.unchanged.length, c.unmanagedSkipped.length, c.orphanedDemo.length, c.conflicts.length]]));

describe("planSeed", () => {
  it("plans every seed document as an insert into empty collections", () => {
    const p = planSeed(seed(), empty());
    expect(p.safe).toBe(true);
    expect(p.writes).toBe(20);
    expect(counts(p)).toEqual({ locations: [5, 0, 0, 0, 0, 0], vehicleModels: [10, 0, 0, 0, 0, 0], extras: [5, 0, 0, 0, 0, 0] });
    expect(p.collections.map((c) => c.seedCount)).toEqual([5, 10, 5]);
  });

  it("plans zero writes when the stored demo documents equal the seed (timestamps and _id ignored)", () => {
    const p = planSeed(seed(), seeded());
    expect(p.safe).toBe(true);
    expect(p.writes).toBe(0);
    expect(counts(p)).toEqual({ locations: [0, 0, 5, 0, 0, 0], vehicleModels: [0, 0, 10, 0, 0, 0], extras: [0, 0, 5, 0, 0, 0] });
  });

  it("is deterministic", () => {
    const existing = seeded();
    existing.vehicleModels[0].headline = "Edited";
    expect(planSeed(seed(), existing)).toEqual(planSeed(seed(), existing));
  });

  it("updates only the changed fields of a demo-owned document, and unsets fields the seed no longer has", () => {
    const existing = seeded();
    const rr = existing.vehicleModels.find((d) => d.slug === "range-rover-autobiography")!;
    rr.headline = "Edited by hand";
    (rr.displayRate as { amountCents: number }).amountCents = 1;
    rr.galleryBadge ??= "x";
    const s = seed();
    delete (s.vehicleModels.find((d) => d.slug === "range-rover-autobiography") as Record<string, unknown>).galleryBadge;
    const p = planSeed(s, existing);
    const vm = p.collections.find((c) => c.collection === "vehicleModels")!;
    expect(vm.updates).toHaveLength(1);
    expect(vm.updates[0]).toMatchObject({ key: "range-rover-autobiography", _id: rr._id, unset: ["galleryBadge"] });
    expect(Object.keys(vm.updates[0].set).sort()).toEqual(["displayRate", "headline"]);
    expect(vm.unchanged).toHaveLength(9);
  });

  it("never treats a document as demo-owned just because its key matches: non-demo + seed key = conflict", () => {
    const existing = seeded();
    existing.locations[0].dataOrigin = "managed";
    const p = planSeed(seed(), existing);
    expect(p.safe).toBe(false);
    const loc = p.collections.find((c) => c.collection === "locations")!;
    expect(loc.conflicts).toEqual([{ collection: "locations", key: "zrh", problem: expect.stringContaining('not demo-owned (dataOrigin "managed")') }]);
    expect(loc.updates).toEqual([]);
    expect(loc.inserts).toEqual([]);
  });

  it("leaves unmanaged documents outside the seed alone, and keeps orphaned demo documents", () => {
    const existing = seeded();
    existing.locations.push(stored({ ...seed().locations[0], code: "abc", iataCode: "ABC", sortOrder: 999, dataOrigin: "managed" }));
    existing.extras.push(stored({ ...seed().extras[0], code: "old-extra", sortOrder: 999 }));
    const p = planSeed(seed(), existing);
    expect(p.safe).toBe(true);
    expect(p.writes).toBe(0);
    expect(p.collections.find((c) => c.collection === "locations")!.unmanagedSkipped).toEqual(["abc"]);
    expect(p.collections.find((c) => c.collection === "extras")!.orphanedDemo).toEqual(["old-extra"]);
  });

  it("reports a conflict when another document already holds a uniquely indexed value the seed needs", () => {
    const existing = empty();
    const s = seed();
    existing.vehicleModels.push(stored({ ...s.vehicleModels[0], slug: "someone-elses-car", dataOrigin: "managed" })); // same exhibit "08"
    existing.locations.push(stored({ ...s.locations[0], code: "xyz", dataOrigin: "managed" })); // same IATA "ZRH"
    const p = planSeed(s, existing);
    expect(p.safe).toBe(false);
    expect(p.collections.find((c) => c.collection === "vehicleModels")!.conflicts[0].problem).toContain('exhibit "08" is already used by "someone-elses-car"');
    expect(p.collections.find((c) => c.collection === "locations")!.conflicts[0].problem).toContain('iataCode "ZRH" is already used by "xyz"');
  });

  it("makes the whole plan unsafe when any stored document is invalid — in any collection", () => {
    const existing = seeded();
    existing.extras[4].icon = "not_an_icon"; // invalid in the LAST collection
    const p = planSeed(seed(), existing);
    expect(p.safe).toBe(false);
    expect(p.validationErrors).toEqual([{ collection: "extras", key: existing.extras[4].code, source: "stored", problem: expect.stringMatching(/^icon: /) }]);
  });

  it("reports stored validation problems as field paths only, never values", () => {
    const existing = seeded();
    existing.locations[0].timezone = "Secret/Value-12345";
    existing.locations[1].phone = "+41 secret";
    const problems = planSeed(seed(), existing).validationErrors.map((v) => v.problem).join(" | ");
    expect(problems).toMatch(/timezone: /);
    expect(problems).not.toContain("Secret/Value-12345");
    expect(problems).not.toContain("+41 secret");
  });

  it("rejects stored documents missing timestamps or with a non-ObjectId _id", () => {
    const existing = seeded();
    delete existing.vehicleModels[2].createdAt;
    existing.extras[0]._id = "not-an-object-id";
    const p = planSeed(seed(), existing);
    expect(p.safe).toBe(false);
    expect(p.validationErrors.map((v) => `${v.collection}:${v.problem.split(":")[0]}`).sort()).toEqual(["extras:_id", "vehicleModels:createdAt"]);
  });

  it("reports duplicate natural keys among stored documents", () => {
    const existing = seeded();
    existing.extras.push(stored(seed().extras[0]));
    const p = planSeed(seed(), existing);
    expect(p.safe).toBe(false);
    expect(p.validationErrors.map((v) => v.problem)).toContain("2 stored documents share this natural key");
  });

  it("makes the plan unsafe when the seed itself is invalid", () => {
    const s = seed();
    s.vehicleModels[0].displayRate.amountCents = -5;
    const p = planSeed(s, empty());
    expect(p.safe).toBe(false);
    expect(p.validationErrors.some((v) => v.source === "seed" && v.collection === "vehicleModels")).toBe(true);
  });
});
