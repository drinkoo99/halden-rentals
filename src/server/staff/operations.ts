import type { BookingStatus } from "../bookings/statuses";
import { instantToZoned } from "../bookings/time";
import type { FleetStatus } from "../fleet/statuses";

/**
 * Operations view (M8): today's pick-ups and returns, exceptions and fleet counts for the staff dashboard
 * and the curbside console. Pure — the page loads bookings, cars and hubs once and this derives the rest.
 *
 * "Today" is the hub's calendar day: a pick-up counts as today when its local date at the pick-up hub is
 * today's local date there (likewise returns at the return hub), so Zurich and Milan are judged in their
 * own time zones. The curbside state is DERIVED from the M7 booking lifecycle and the car's status — it is
 * a reading aid, not a second state machine; every action still goes through the booking actions.
 */

export type OpsBooking = {
  reference: string;
  status: BookingStatus;
  customer: string;
  vehicleName: string;
  unitId: string | null;
  pickup: string;
  return: string;
  pickupAt: Date;
  returnAt: Date;
  createdAt: Date;
  holdExpiresAt: Date | null;
};
export type OpsUnit = { id: string; unitCode: string; registration: string; modelSlug: string; locationCode: string; status: FleetStatus };
export type OpsHub = { code: string; name: string; timezone: string };

export type CurbsideState = "upcoming" | "ready" | "needs_attention" | "return_expected" | "overdue" | "returned" | "closed";
export const CURBSIDE_LABELS: Record<CurbsideState, string> = {
  upcoming: "Upcoming",
  ready: "Ready for pick-up",
  needs_attention: "Needs attention",
  return_expected: "Return expected",
  overdue: "Overdue",
  returned: "Returned",
  closed: "Closed",
};

const HOUR = 3600_000;
export const CHECKOUT_EARLY_MS = 6 * HOUR; // the booking engine's check-out window (bookingPolicy)
export const LATE_PICKUP_MS = 2 * HOUR;

/** Readiness of one booking at `now`, with the reasons it needs attention. */
export function curbsideState(b: OpsBooking, unit: OpsUnit | undefined, now: Date): { state: CurbsideState; issues: string[] } {
  if (b.status === "completed") return { state: "returned", issues: [] };
  if (b.status === "cancelled" || b.status === "expired") return { state: "closed", issues: [] };
  if (b.status === "checked_out") return b.returnAt <= now ? { state: "overdue", issues: ["return time passed"] } : { state: "return_expected", issues: [] };
  const issues: string[] = [];
  if (b.status === "held") issues.push("awaiting confirmation (hold)");
  if (!b.unitId) issues.push("no car assigned");
  else if (!unit) issues.push("assigned car not found");
  else {
    if (unit.status !== "available") issues.push(`car is ${unit.status}`);
    if (unit.locationCode !== b.pickup) issues.push(`car is at ${unit.locationCode.toUpperCase()}`);
  }
  if (now.getTime() > b.pickupAt.getTime() + LATE_PICKUP_MS) issues.push("pick-up time passed");
  if (issues.length) return { state: "needs_attention", issues };
  return { state: now.getTime() >= b.pickupAt.getTime() - CHECKOUT_EARLY_MS ? "ready" : "upcoming", issues: [] };
}

export const localDay = (at: Date, timeZone: string) => instantToZoned(at, timeZone).slice(0, 10);

export type OpsRow = OpsBooking & { state: CurbsideState; issues: string[]; unit?: OpsUnit };
export type FleetCounts = Record<FleetStatus, number>;
const zero = (): FleetCounts => ({ available: 0, rented: 0, maintenance: 0, inactive: 0 });

export type OperationsSnapshot = {
  pickupsToday: OpsRow[];
  returnsToday: OpsRow[];
  overdue: OpsRow[];
  attention: OpsRow[];
  upcomingPickups: OpsRow[];
  upcomingReturns: OpsRow[];
  recent: OpsRow[];
  activeRentals: number;
  fleet: FleetCounts;
  fleetByHub: Record<string, FleetCounts>;
  maintenance: OpsUnit[];
};

export function operationsSnapshot(bookings: OpsBooking[], units: OpsUnit[], hubs: OpsHub[], now: Date, hub?: string): OperationsSnapshot {
  const tz = (code: string) => hubs.find((h) => h.code === code)?.timezone ?? "UTC";
  const unitOf = (id: string | null) => (id ? units.find((u) => u.id === id) : undefined);
  const rows: OpsRow[] = bookings.map((b) => {
    const unit = unitOf(b.unitId);
    return { ...b, ...curbsideState(b, unit, now), ...(unit ? { unit } : {}) };
  });
  const live = (r: OpsRow) => r.status !== "cancelled" && r.status !== "expired";
  const atPickup = (r: OpsRow) => !hub || r.pickup === hub;
  const atReturn = (r: OpsRow) => !hub || r.return === hub;
  const byTime = (key: "pickupAt" | "returnAt") => (a: OpsRow, b: OpsRow) => a[key].getTime() - b[key].getTime();
  const soon = now.getTime() + 48 * HOUR;

  const scopedUnits = units.filter((u) => !hub || u.locationCode === hub);
  const fleet = zero();
  const fleetByHub: Record<string, FleetCounts> = {};
  for (const u of scopedUnits) {
    fleet[u.status]++;
    (fleetByHub[u.locationCode] ??= zero())[u.status]++;
  }

  return {
    pickupsToday: rows.filter((r) => live(r) && atPickup(r) && localDay(r.pickupAt, tz(r.pickup)) === localDay(now, tz(r.pickup))).sort(byTime("pickupAt")),
    returnsToday: rows.filter((r) => (r.status === "checked_out" || r.status === "completed" || r.status === "confirmed") && atReturn(r) && localDay(r.returnAt, tz(r.return)) === localDay(now, tz(r.return))).sort(byTime("returnAt")),
    overdue: rows.filter((r) => r.state === "overdue" && atReturn(r)).sort(byTime("returnAt")),
    attention: rows.filter((r) => r.state === "needs_attention" && atPickup(r) && r.pickupAt.getTime() <= soon).sort(byTime("pickupAt")),
    upcomingPickups: rows.filter((r) => (r.status === "confirmed" || r.status === "held") && atPickup(r) && r.pickupAt >= now && r.pickupAt.getTime() <= soon).sort(byTime("pickupAt")),
    upcomingReturns: rows.filter((r) => r.status === "checked_out" && atReturn(r) && r.returnAt >= now && r.returnAt.getTime() <= soon).sort(byTime("returnAt")),
    recent: rows.filter((r) => now.getTime() - r.createdAt.getTime() <= 48 * HOUR && (atPickup(r) || atReturn(r))).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 8),
    activeRentals: rows.filter((r) => r.status === "checked_out" && (atPickup(r) || atReturn(r))).length,
    fleet,
    fleetByHub,
    maintenance: scopedUnits.filter((u) => u.status === "maintenance"),
  };
}
