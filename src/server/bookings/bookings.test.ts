import { describe, expect, it } from "vitest";
import { createBookingInput, tripInput } from "./schemas";
import { bookingEmailText } from "./notify";
import { bookingPolicy } from "./policy";
import { priceBooking } from "./pricing";
import { BOOKING_STATUSES, BOOKING_TRANSITIONS, canMove } from "./statuses";
import { billableDays, instantToZoned, zonedToInstant } from "./time";
import { newReference } from "./store";
import { unitAvailability, type Reservation } from "../availability/engine";
import type { PublicExtra, PublicVehicle } from "../catalogue/public";

describe("hub-local times", () => {
  it("converts wall-clock time at the hub to an instant, across DST", () => {
    expect(zonedToInstant("2030-06-12T10:00", "Europe/Zurich")?.toISOString()).toBe("2030-06-12T08:00:00.000Z"); // CEST
    expect(zonedToInstant("2030-12-12T10:00", "Europe/Zurich")?.toISOString()).toBe("2030-12-12T09:00:00.000Z"); // CET
    expect(zonedToInstant("2030-06-12T10:00", "Europe/Vienna")?.toISOString()).toBe("2030-06-12T08:00:00.000Z");
  });

  it("rejects times skipped by the spring clock change and malformed input", () => {
    expect(zonedToInstant("2030-03-31T02:30", "Europe/Berlin")).toBeNull(); // 02:00 → 03:00
    expect(zonedToInstant("2030-03-31T03:30", "Europe/Berlin")?.toISOString()).toBe("2030-03-31T01:30:00.000Z");
    expect(zonedToInstant("2030-13-01T10:00", "Europe/Berlin")).toBeNull();
    expect(zonedToInstant("2030-06-12 10:00", "Europe/Berlin")).toBeNull();
  });

  it("round-trips instants to hub wall-clock time", () => {
    expect(instantToZoned(new Date("2030-06-12T08:00:00Z"), "Europe/Rome")).toBe("2030-06-12T10:00");
  });

  it("bills every started 24 hours, at least one day", () => {
    const d = (h: number) => billableDays(new Date(0), new Date(h * 3600_000));
    expect([d(1), d(24), d(25), d(48), d(71)]).toEqual([1, 1, 2, 2, 3]);
  });
});

const vehicle = { slug: "lexus-lc-500", name: "Lexus LC 500", bookable: true, displayRate: { amountCents: 37500, currency: "EUR" } } as unknown as PublicVehicle;
const extra = (code: string, amountCents: number, unit: "per_day" | "per_rental", included = false, maxQuantity = 2) =>
  ({ code, title: code, charge: { amountCents, currency: "EUR", unit }, included, maxQuantity }) as unknown as PublicExtra;
const extras = [extra("waiver", 4500, "per_day", false, 1), extra("childseat", 2000, "per_day"), extra("delivery", 12000, "per_rental", false, 1), extra("winter", 0, "per_rental", true, 1)];
const start = new Date("2030-06-10T08:00:00Z");
const end = new Date("2030-06-13T07:00:00Z"); // 71 h → 3 days
const price = (selected: Record<string, number>, over: Partial<{ return: string; policy: ReturnType<typeof bookingPolicy> }> = {}) =>
  priceBooking({ vehicle, extras, selected, start, end, pickup: "muc", return: over.return ?? "muc" }, over.policy ?? bookingPolicy({}));

describe("pricing", () => {
  it("rental + per-day and per-rental extras + included extras + 19 % VAT, in cents", () => {
    const p = price({ waiver: 1, childseat: 2, delivery: 1 });
    expect(p.rentalCents).toBe(112500);
    expect(p.extras.map((e) => [e.code, e.quantity, e.amountCents])).toEqual([
      ["waiver", 1, 13500],
      ["childseat", 2, 12000],
      ["delivery", 1, 12000],
      ["winter", 1, 0],
    ]);
    expect(p.subtotalCents).toBe(150000);
    expect(p.vatCents).toBe(28500);
    expect(p.totalCents).toBe(178500);
  });

  it("rounds VAT half-up to the cent and is deterministic", () => {
    const odd = priceBooking({ vehicle: { ...vehicle, displayRate: { amountCents: 333, currency: "EUR" } } as PublicVehicle, extras: [], selected: {}, start, end: new Date(start.getTime() + 3600_000), pickup: "muc", return: "muc" }, bookingPolicy({}));
    expect(odd.vatCents).toBe(63); // 333 × 0.19 = 63.27
    expect(price({ waiver: 1 })).toEqual(price({ waiver: 1 }));
  });

  it("refuses unknown extras, too many items and unbookable cars", () => {
    expect(() => price({ jetpack: 1 })).toThrow();
    expect(() => price({ childseat: 3 })).toThrow();
    expect(() => priceBooking({ vehicle: { ...vehicle, bookable: false } as PublicVehicle, extras, selected: {}, start, end, pickup: "muc", return: "muc" }, bookingPolicy({}))).toThrow(/cannot be booked/);
  });

  it("adds a one-way fee only when configured and only for one-way trips", () => {
    expect(price({}, { return: "zrh" }).fees).toEqual([]);
    const policy = bookingPolicy({ ONE_WAY_FEE_EUR: "150" });
    expect(price({}, { return: "zrh", policy }).fees).toEqual([{ code: "one_way", label: "One-way return fee", amountCents: 15000 }]);
    expect(price({}, { policy }).fees).toEqual([]);
    expect(() => bookingPolicy({ ONE_WAY_FEE_EUR: "12.5" })).toThrow();
    expect(() => bookingPolicy({ ONE_WAY_FEE_EUR: "-1" })).toThrow();
  });
});

describe("booking lifecycle", () => {
  it("defines transitions for every status; terminal statuses go nowhere", () => {
    expect(Object.keys(BOOKING_TRANSITIONS).sort()).toEqual([...BOOKING_STATUSES].sort());
    for (const s of ["completed", "cancelled", "expired"] as const) expect(BOOKING_TRANSITIONS[s]).toEqual([]);
  });
  it.each([
    ["held", "confirmed", true],
    ["held", "expired", true],
    ["held", "checked_out", false],
    ["confirmed", "checked_out", true],
    ["confirmed", "expired", false],
    ["checked_out", "cancelled", false],
    ["checked_out", "completed", true],
    ["cancelled", "confirmed", false],
  ] as const)("%s → %s: %s", (from, to, ok) => expect(canMove(from, to)).toBe(ok));
});

describe("booking input", () => {
  const driver = { firstName: "Clara", lastName: "Bergmann", email: "c@example.com", phone: "+41 79 123 4567", dob: "14/08/1980", licenceCountry: "CHE", licenceNumber: "B-84920419" };
  it("requires hub-local times, known shapes and a reviewed total; drops zero-quantity extras", () => {
    expect(tripInput.parse({ model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00", to: "2030-06-12T10:00", extras: { waiver: 1, childseat: 0 } }).extras).toEqual({ waiver: 1 });
    expect(tripInput.safeParse({ model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00:00Z", to: "2030-06-12T10:00" }).success).toBe(false);
    const ok = { model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00", to: "2030-06-12T10:00", driver, idempotencyKey: "0b8f3c1e-5d2a-4c3b-9f1e-1a2b3c4d5e6f", expectedTotalCents: 100 };
    expect(createBookingInput.safeParse(ok).success).toBe(true);
    expect(createBookingInput.safeParse({ ...ok, price: 1 }).success).toBe(false); // the client cannot send a price
    expect(createBookingInput.safeParse({ ...ok, status: "confirmed" }).success).toBe(false);
    expect(createBookingInput.safeParse({ ...ok, idempotencyKey: "x" }).success).toBe(false);
    expect(createBookingInput.safeParse({ ...ok, driver: { ...driver, dob: "01/01/2010" } }).success).toBe(false); // under 28
  });

  it("generates references in the HLD-MMDD-XXXX format", () => {
    expect(newReference(new Date("2030-06-01T08:00:00Z"))).toMatch(/^HLD-0601-[A-HJ-NP-Z2-9]{4}$/);
  });
});

describe("availability rules added for bookings", () => {
  const unit = { id: "u1", modelSlug: "x", locationCode: "muc", status: "available" as const };
  const at = (iso: string) => new Date(iso);
  const res = (over: Partial<Reservation>): Reservation => ({ id: "r1", unitId: "u1", start: at("2030-06-10T08:00:00Z"), end: at("2030-06-12T08:00:00Z"), pickupLocationCode: "muc", returnLocationCode: "muc", ...over });
  const req = (from: string, to: string, ret = "muc") => ({ start: at(from), end: at(to), pickupLocationCode: "muc", returnLocationCode: ret });

  it("a rented car is busy only through its active rental", () => {
    const rented = { ...unit, status: "rented" as const };
    expect(unitAvailability(rented, req("2030-06-20T08:00:00Z", "2030-06-21T08:00:00Z"), [], []).reasons).toEqual([{ code: "status", status: "rented" }]);
    expect(unitAvailability(rented, req("2030-06-20T08:00:00Z", "2030-06-21T08:00:00Z"), [], [res({ active: true })]).available).toBe(true);
    expect(unitAvailability(rented, req("2030-06-11T08:00:00Z", "2030-06-13T08:00:00Z"), [], [res({ active: true })]).available).toBe(false);
  });

  it("a one-way trip may not strand the car before its next booking", () => {
    const next = res({ start: at("2030-06-20T08:00:00Z"), end: at("2030-06-22T08:00:00Z"), pickupLocationCode: "muc" });
    expect(unitAvailability(unit, req("2030-06-15T08:00:00Z", "2030-06-16T08:00:00Z", "zrh"), [], [next]).reasons).toEqual([{ code: "strands_next", reservationId: "r1", needs: "muc" }]);
    expect(unitAvailability(unit, req("2030-06-15T08:00:00Z", "2030-06-16T08:00:00Z", "muc"), [], [next]).available).toBe(true);
  });
});

describe("booking emails", () => {
  it("never claim a payment was taken", () => {
    const summary = { reference: "HLD-0601-ABCD", vehicleName: "Lexus LC 500", driverFirstName: "Clara", email: "c@example.com", pickup: "Munich", returnTo: "Zurich", pickupLocal: "2030-06-10T10:00", returnLocal: "2030-06-12T10:00", price: { totalCents: 178500 } as never };
    const confirmed = bookingEmailText("confirmed", summary);
    expect(confirmed.subject).toContain("HLD-0601-ABCD");
    expect(confirmed.text).toContain("€1,785.00");
    expect(confirmed.text).toContain("nothing has been charged");
    expect(bookingEmailText("cancelled", summary).text).toContain("No payment was taken");
  });
});
