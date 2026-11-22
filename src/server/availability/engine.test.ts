import { describe, expect, it } from "vitest";
import {
  DEFAULT_POLICY,
  locationAt,
  modelAvailability,
  overlaps,
  requestProblems,
  unitAvailability,
  type Block,
  type Reservation,
  type RentalRequest,
  type UnitSnapshot,
} from "./engine";

const t = (hhmm: string, day = 10) => new Date(`2030-06-${String(day).padStart(2, "0")}T${hhmm}:00Z`);
const iv = (a: string, b: string, dayA = 10, dayB = dayA) => ({ start: t(a, dayA), end: t(b, dayB) });
const unit = (over: Partial<UnitSnapshot> = {}): UnitSnapshot => ({ id: "u1", modelSlug: "lexus-lc-500", locationCode: "muc", status: "available", ...over });
const req = (a: string, b: string, over: Partial<RentalRequest> = {}): RentalRequest => ({ ...iv(a, b), pickupLocationCode: "muc", returnLocationCode: "muc", ...over });
const block = (a: string, b: string, over: Partial<Block> = {}): Block => ({ id: "b1", unitId: "u1", kind: "maintenance", ...iv(a, b), ...over });
const booking = (a: string, b: string, over: Partial<Reservation> = {}): Reservation => ({ id: "r1", unitId: "u1", pickupLocationCode: "muc", returnLocationCode: "muc", ...iv(a, b), ...over });
const H = 3600_000;

describe("overlaps — half-open intervals [start, end)", () => {
  it.each([
    ["identical", iv("10:00", "12:00"), iv("10:00", "12:00"), true],
    ["partial, left", iv("09:00", "11:00"), iv("10:00", "12:00"), true],
    ["partial, right", iv("11:00", "13:00"), iv("10:00", "12:00"), true],
    ["contained", iv("10:30", "11:30"), iv("10:00", "12:00"), true],
    ["containing", iv("08:00", "14:00"), iv("10:00", "12:00"), true],
    ["one millisecond of overlap", { start: new Date(t("11:59").getTime() + 59_999), end: t("13:00") }, iv("10:00", "12:00"), true],
    ["back-to-back: ends exactly when the other starts", iv("08:00", "10:00"), iv("10:00", "12:00"), false],
    ["back-to-back: starts exactly when the other ends", iv("12:00", "14:00"), iv("10:00", "12:00"), false],
    ["disjoint before", iv("06:00", "08:00"), iv("10:00", "12:00"), false],
    ["disjoint after", iv("13:00", "15:00"), iv("10:00", "12:00"), false],
    ["across midnight", iv("22:00", "02:00", 10, 11), iv("01:00", "03:00", 11), true],
  ])("%s", (_l, a, b, expected) => {
    expect(overlaps(a, b)).toBe(expected);
    expect(overlaps(b, a)).toBe(expected); // symmetric
  });
});

describe("requestProblems", () => {
  const now = t("08:00");
  it("accepts a normal future rental", () => expect(requestProblems(iv("10:00", "18:00"), now)).toEqual([]));
  it("rejects an end at or before the start", () => {
    expect(requestProblems(iv("10:00", "10:00"), now)).toContain("ends_before_start");
    expect(requestProblems(iv("10:00", "09:00"), now)).toContain("ends_before_start");
  });
  it("enforces the minimum and maximum length (inclusive bounds)", () => {
    expect(requestProblems(iv("10:00", "10:59"), now)).toEqual(["too_short"]);
    expect(requestProblems(iv("10:00", "11:00"), now)).toEqual([]);
    expect(requestProblems({ start: t("10:00"), end: new Date(t("10:00").getTime() + DEFAULT_POLICY.maxRentalMs) }, now)).toEqual([]);
    expect(requestProblems({ start: t("10:00"), end: new Date(t("10:00").getTime() + DEFAULT_POLICY.maxRentalMs + 1) }, now)).toEqual(["too_long"]);
  });
  it("rejects a start in the past, but not one exactly now", () => {
    expect(requestProblems(iv("07:59", "12:00"), now)).toEqual(["starts_in_past"]);
    expect(requestProblems(iv("08:00", "12:00"), now)).toEqual([]);
  });
});

describe("unitAvailability", () => {
  it("is available when in service, at the pick-up hub and free", () => {
    expect(unitAvailability(unit(), req("10:00", "18:00"), [], [])).toEqual({ unitId: "u1", available: true, reasons: [] });
  });

  it.each(["rented", "maintenance", "inactive"] as const)("is unavailable while %s", (status) => {
    expect(unitAvailability(unit({ status }), req("10:00", "18:00"), [], []).reasons).toEqual([{ code: "status", status }]);
  });

  it("must be at the pick-up hub (no transfers); a one-way return elsewhere is fine", () => {
    expect(unitAvailability(unit({ locationCode: "zrh" }), req("10:00", "18:00"), [], []).reasons).toEqual([{ code: "location", at: "zrh" }]);
    expect(unitAvailability(unit(), req("10:00", "18:00", { returnLocationCode: "zrh" }), [], []).available).toBe(true);
  });

  describe("blocks", () => {
    it("an overlapping block makes the car unavailable", () => {
      expect(unitAvailability(unit(), req("10:00", "18:00"), [block("12:00", "13:00")], []).reasons).toEqual([{ code: "blocked", blockId: "b1", kind: "maintenance" }]);
    });
    it("a block ending exactly at pick-up, or starting exactly at return, does not", () => {
      expect(unitAvailability(unit(), req("10:00", "18:00"), [block("06:00", "10:00"), block("18:00", "20:00", { id: "b2" })], []).available).toBe(true);
    });
    it("blocks of other cars are ignored", () => {
      expect(unitAvailability(unit(), req("10:00", "18:00"), [block("12:00", "13:00", { unitId: "u2" })], []).available).toBe(true);
    });
  });

  describe("reservations (supplied from M7 on) with the turnaround buffer", () => {
    const turn = DEFAULT_POLICY.turnaroundMs;
    it("overlapping reservations conflict", () => {
      expect(unitAvailability(unit(), req("10:00", "18:00"), [], [booking("12:00", "20:00")]).reasons).toEqual([{ code: "reserved", reservationId: "r1" }]);
    });
    it("needs the full turnaround after a previous rental, inclusive of the boundary", () => {
      const prevEnd = t("10:00");
      const startAt = (ms: number): RentalRequest => ({ start: new Date(prevEnd.getTime() + ms), end: t("20:00"), pickupLocationCode: "muc", returnLocationCode: "muc" });
      expect(unitAvailability(unit(), startAt(turn - 1), [], [booking("06:00", "10:00")]).available).toBe(false);
      expect(unitAvailability(unit(), startAt(turn), [], [booking("06:00", "10:00")]).available).toBe(true);
    });
    it("needs the full turnaround before the next rental", () => {
      const next = booking("18:00", "22:00");
      expect(unitAvailability(unit(), { ...req("10:00", "16:00") }, [], [next]).available).toBe(true); // ends 2h before
      expect(unitAvailability(unit(), { ...req("10:00", "16:01") }, [], [next]).available).toBe(false);
      expect(turn).toBe(2 * H);
    });
    it("a car returned one-way to another hub is at that hub afterwards", () => {
      const oneWay = booking("06:00", "08:00", { returnLocationCode: "zrh" });
      expect(unitAvailability(unit(), req("12:00", "18:00"), [], [oneWay]).reasons).toEqual([{ code: "location", at: "zrh" }]);
      expect(unitAvailability(unit(), req("12:00", "18:00", { pickupLocationCode: "zrh" }), [], [oneWay]).available).toBe(true);
    });
  });
});

describe("locationAt", () => {
  it("uses the latest reservation that ended by then, else the unit's hub", () => {
    const rs = [booking("06:00", "08:00", { id: "a", returnLocationCode: "zrh" }), booking("09:00", "10:00", { id: "b", returnLocationCode: "gva" }), booking("20:00", "22:00", { id: "c", returnLocationCode: "vie" })];
    expect(locationAt(unit(), rs, t("05:00"))).toBe("muc");
    expect(locationAt(unit(), rs, t("08:00"))).toBe("zrh"); // ended exactly then
    expect(locationAt(unit(), rs, t("12:00"))).toBe("gva");
    expect(locationAt(unit(), rs, t("10:00", 11))).toBe("vie");
    expect(locationAt(unit(), rs.map((r) => ({ ...r, unitId: "u2" })), t("12:00"))).toBe("muc"); // other cars' trips
  });
});

describe("modelAvailability", () => {
  it("is available when at least one unit is, and counts them", () => {
    const units = [unit({ id: "u1" }), unit({ id: "u2", status: "maintenance" }), unit({ id: "u3", locationCode: "zrh" }), unit({ id: "u4" })];
    const res = modelAvailability(units, req("10:00", "18:00"), [block("11:00", "12:00", { unitId: "u4" })], []);
    expect(res.available).toBe(true);
    expect(res.availableUnits).toBe(1);
    expect(res.units.map((u) => [u.unitId, u.available])).toEqual([["u1", true], ["u2", false], ["u3", false], ["u4", false]]);
  });

  it("is unavailable with no units at all", () => {
    expect(modelAvailability([], req("10:00", "18:00"), [], [])).toEqual({ available: false, availableUnits: 0, units: [] });
  });
});
