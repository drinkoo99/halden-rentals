import { describe, expect, it } from "vitest";
import type { PublicLocation } from "../catalogue/public";
import { curbsideState, localDay, operationsSnapshot, type OpsBooking, type OpsUnit } from "./operations";
import { auditQuery, peopleQuery, roleInput, teamQuery } from "./schemas";
import { effectiveSettings } from "./settings";

const at = (iso: string) => new Date(iso);
const unit = (over: Partial<OpsUnit> = {}): OpsUnit => ({ id: "u1", unitCode: "FU-AAAAAA", registration: "ZH 1", modelSlug: "lexus-lc-500", locationCode: "zrh", status: "available", ...over });
const booking = (over: Partial<OpsBooking> = {}): OpsBooking => ({
  reference: "HLD-0601-AAAA",
  status: "confirmed",
  customer: "Clara Bergmann",
  vehicleName: "Lexus LC 500",
  unitId: "u1",
  pickup: "zrh",
  return: "zrh",
  pickupAt: at("2030-06-10T08:00:00Z"),
  returnAt: at("2030-06-12T08:00:00Z"),
  createdAt: at("2030-06-01T08:00:00Z"),
  holdExpiresAt: null,
  ...over,
});
const hubs = [
  { code: "zrh", name: "Zurich", timezone: "Europe/Zurich" },
  { code: "mxp", name: "Milan", timezone: "Europe/Rome" },
];

describe("curbside state (derived from the booking lifecycle, not a second state machine)", () => {
  it("is ready from six hours before pick-up when the assigned car is in service at the hub", () => {
    expect(curbsideState(booking(), unit(), at("2030-06-10T01:59:00Z"))).toEqual({ state: "upcoming", issues: [] });
    expect(curbsideState(booking(), unit(), at("2030-06-10T02:00:00Z"))).toEqual({ state: "ready", issues: [] });
  });

  it("needs attention for holds, missing or misplaced cars, cars out of service and late pick-ups", () => {
    expect(curbsideState(booking({ status: "held" }), unit(), at("2030-06-10T07:00:00Z")).issues).toEqual(["awaiting confirmation (hold)"]);
    expect(curbsideState(booking({ unitId: null }), undefined, at("2030-06-10T07:00:00Z")).issues).toEqual(["no car assigned"]);
    expect(curbsideState(booking(), unit({ status: "maintenance", locationCode: "mxp" }), at("2030-06-10T07:00:00Z")).issues).toEqual(["car is maintenance", "car is at MXP"]);
    expect(curbsideState(booking(), unit(), at("2030-06-10T10:00:01Z"))).toEqual({ state: "needs_attention", issues: ["pick-up time passed"] });
  });

  it("follows the rental after check-out: return expected, then overdue at the booked return", () => {
    expect(curbsideState(booking({ status: "checked_out" }), unit({ status: "rented" }), at("2030-06-12T07:59:59Z")).state).toBe("return_expected");
    expect(curbsideState(booking({ status: "checked_out" }), unit({ status: "rented" }), at("2030-06-12T08:00:00Z")).state).toBe("overdue");
    expect(curbsideState(booking({ status: "completed" }), unit(), at("2030-06-12T09:00:00Z")).state).toBe("returned");
    expect(curbsideState(booking({ status: "cancelled" }), unit(), at("2030-06-12T09:00:00Z")).state).toBe("closed");
  });
});

describe("operations snapshot", () => {
  it("judges 'today' in each hub's own time zone", () => {
    // 23:30 UTC on 9 June is already 10 June in Zurich (CEST, +2)
    expect(localDay(at("2030-06-09T23:30:00Z"), "Europe/Zurich")).toBe("2030-06-10");
    const now = at("2030-06-09T23:30:00Z");
    const snap = operationsSnapshot([booking({ pickupAt: at("2030-06-10T06:00:00Z") }), booking({ reference: "HLD-0601-BBBB", pickupAt: at("2030-06-09T20:00:00Z"), unitId: null })], [unit()], hubs, now);
    expect(snap.pickupsToday.map((r) => r.reference)).toEqual(["HLD-0601-AAAA"]);
  });

  it("collects overdue rentals, exceptions, fleet counts per hub, and filters by hub", () => {
    const now = at("2030-06-12T12:00:00Z");
    const bookings = [
      booking({ reference: "HLD-0601-OVER", status: "checked_out", returnAt: at("2030-06-12T08:00:00Z") }),
      booking({ reference: "HLD-0601-HELD", status: "held", pickupAt: at("2030-06-13T08:00:00Z"), returnAt: at("2030-06-14T08:00:00Z") }),
      booking({ reference: "HLD-0601-MILA", pickup: "mxp", return: "mxp", status: "checked_out", returnAt: at("2030-06-12T16:00:00Z"), unitId: "u3" }),
      booking({ reference: "HLD-0601-GONE", status: "cancelled", pickupAt: at("2030-06-12T13:00:00Z") }),
    ];
    const units = [unit({ status: "rented" }), unit({ id: "u2", status: "maintenance" }), unit({ id: "u3", locationCode: "mxp", status: "rented" })];
    const all = operationsSnapshot(bookings, units, hubs, now);
    expect(all.overdue.map((r) => r.reference)).toEqual(["HLD-0601-OVER"]);
    expect(all.attention.map((r) => r.reference)).toEqual(["HLD-0601-HELD"]);
    expect(all.activeRentals).toBe(2);
    expect(all.fleet).toEqual({ available: 0, rented: 2, maintenance: 1, inactive: 0 });
    expect(all.fleetByHub.mxp).toEqual({ available: 0, rented: 1, maintenance: 0, inactive: 0 });
    expect(all.pickupsToday.map((r) => r.reference)).not.toContain("HLD-0601-GONE");
    const milan = operationsSnapshot(bookings, units, hubs, now, "mxp");
    expect(milan.upcomingReturns.map((r) => r.reference)).toEqual(["HLD-0601-MILA"]);
    expect(milan.overdue).toEqual([]);
    expect(milan.fleet.maintenance).toBe(0);
  });
});

describe("staff input validation", () => {
  it("rejects smuggled fields and short or overlong searches", () => {
    expect(peopleQuery.safeParse({ q: "a" }).success).toBe(false);
    expect(peopleQuery.safeParse({ q: "x".repeat(81) }).success).toBe(false);
    expect(peopleQuery.safeParse({ role: "admin" }).success).toBe(false);
    expect(roleInput.safeParse({ role: "superuser" }).success).toBe(false);
    expect(roleInput.safeParse({ role: "staff", grantedBy: "me" }).success).toBe(false);
    expect(teamQuery.parse({ email: " Clara@Example.COM " }).email).toBe("clara@example.com");
    expect(auditQuery.safeParse({ entity: "secrets" }).success).toBe(false);
  });
});

describe("effective settings", () => {
  const hubsDoc = [{ iataCode: "ZRH", city: "Zurich", timezone: "Europe/Zurich", handover: { window: "06:00 – 23:30" } }] as unknown as PublicLocation[];
  it("shows the rules in force and whether services are configured — never a secret", () => {
    const rows = effectiveSettings({ RESEND_API_KEY: "re_supersecret123", EMAIL_FROM: "x@y.ch", ONE_WAY_FEE_EUR: "150", MONGODB_URI: "mongodb://user:pw@host" }, hubsDoc);
    const text = JSON.stringify(rows);
    expect(text).not.toContain("re_supersecret123");
    expect(text).not.toContain("user:pw");
    expect(rows.find((r) => r.label === "VAT rate")?.value).toBe("19 %");
    expect(rows.find((r) => r.label === "One-way return fee")?.value).toBe("€150");
    expect(rows.find((r) => r.label === "Transactional email")?.value).toBe("configured");
    expect(rows.find((r) => r.label === "Turnaround between rentals")?.value).toBe("2 h");
    expect(effectiveSettings({}, []).find((r) => r.label === "Transactional email")?.value).toBe("not configured");
  });
});
