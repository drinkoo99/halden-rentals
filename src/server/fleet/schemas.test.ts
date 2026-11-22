import { describe, expect, it } from "vitest";
import { availabilityQuery, blockInput, canTransition, createUnitInput, FLEET_STATUSES, registrationSchema, STATUS_TRANSITIONS, updateUnitInput, vinSchema } from "./schemas";

const valid = { modelSlug: "lexus-lc-500", registration: "m-hl 4821", locationCode: "muc", mileageKm: 12000, year: 2025 };

describe("fleet unit validation", () => {
  it("normalises plates and VINs", () => {
    expect(registrationSchema.parse("  zh   91104 ")).toBe("ZH 91104");
    expect(registrationSchema.safeParse("ZH_91104").success).toBe(false);
    expect(registrationSchema.safeParse("A".repeat(16)).success).toBe(false);
    expect(vinSchema.parse("wp0zzz99zts392124")).toBe("WP0ZZZ99ZTS392124");
    expect(vinSchema.safeParse("WP0ZZZ99ZTS39212I").success).toBe(false); // I is not allowed
    expect(vinSchema.safeParse("WP0ZZZ99ZTS3921").success).toBe(false); // 15 chars
  });

  it("creates available by default, never as rented, and rejects unknown fields", () => {
    expect(createUnitInput.parse(valid)).toMatchObject({ registration: "M-HL 4821", status: "available" });
    expect(createUnitInput.safeParse({ ...valid, status: "rented" }).success).toBe(false);
    expect(createUnitInput.safeParse({ ...valid, unitCode: "FU-AAAAAA" }).success).toBe(false);
    expect(createUnitInput.safeParse({ ...valid, mileageKm: -1 }).success).toBe(false);
    expect(createUnitInput.safeParse({ ...valid, mileageKm: 1.5 }).success).toBe(false);
    expect(createUnitInput.safeParse({ ...valid, locationCode: "MUC" }).success).toBe(false);
  });

  it("updates: model and status are not editable here; at least one field is required", () => {
    expect(updateUnitInput.safeParse({ modelSlug: "porsche-911-carrera" }).success).toBe(false);
    expect(updateUnitInput.safeParse({ status: "available" }).success).toBe(false);
    expect(updateUnitInput.safeParse({}).success).toBe(false);
    expect(updateUnitInput.parse({ vin: null, notes: null })).toEqual({ vin: null, notes: null });
  });
});

describe("status transitions", () => {
  it("define a rule for every status", () => expect(Object.keys(STATUS_TRANSITIONS).sort()).toEqual([...FLEET_STATUSES].sort()));
  it.each([
    ["available", "rented", true],
    ["available", "maintenance", true],
    ["rented", "available", true],
    ["rented", "maintenance", true],
    ["rented", "inactive", false],
    ["maintenance", "rented", false],
    ["inactive", "rented", false],
    ["inactive", "available", true],
  ] as const)("%s → %s: %s", (from, to, ok) => expect(canTransition(from, to)).toBe(ok));
});

describe("blocks and availability queries", () => {
  it("requires time zones and an end after the start", () => {
    expect(blockInput.safeParse({ kind: "maintenance", startsAt: "2030-06-10T10:00:00", endsAt: "2030-06-10T12:00:00" }).success).toBe(false); // no zone
    expect(blockInput.safeParse({ kind: "maintenance", startsAt: "2030-06-10T10:00:00Z", endsAt: "2030-06-10T10:00:00Z" }).success).toBe(false);
    expect(blockInput.safeParse({ kind: "maintenance", startsAt: "2030-06-10T10:00:00Z", endsAt: "2031-06-11T10:00:00Z" }).success).toBe(false); // > 365 days
    expect(blockInput.parse({ kind: "unavailable", startsAt: "2030-06-10T12:00:00+02:00", endsAt: "2030-06-10T14:00:00+02:00" }).startsAt.toISOString()).toBe("2030-06-10T10:00:00.000Z");
  });

  it("defaults the return hub to the pick-up hub", () => {
    expect(availabilityQuery.parse({ model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00:00Z", to: "2030-06-12T10:00:00Z" })).toMatchObject({ pickupLocationCode: "muc", returnLocationCode: "muc" });
    expect(availabilityQuery.safeParse({ model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00:00Z", to: "2030-06-12T10:00:00Z", extra: "1" }).success).toBe(false);
  });
});
