import type { OperationsSnapshot, OpsHub, OpsRow } from "@/server/staff/operations";
import { CURBSIDE_LABELS, type CurbsideState } from "@/server/staff/operations";
import type { BookingStatus } from "@/server/bookings/statuses";
import { hubDateTime } from "./bookingDisplay";

/** Operations rows as plain strings for the staff screens (dates resolved in each hub's time zone). */
export type OpsView = {
  reference: string;
  status: BookingStatus;
  state: CurbsideState;
  stateLabel: string;
  issues: string[];
  customer: string;
  vehicleName: string;
  unit: string | null;
  pickupHub: string;
  returnHub: string;
  pickupLocal: string;
  returnLocal: string;
};

export function toOpsView(r: OpsRow, hubs: OpsHub[]): OpsView {
  const hub = (code: string) => hubs.find((h) => h.code === code);
  return {
    reference: r.reference,
    status: r.status,
    state: r.state,
    stateLabel: CURBSIDE_LABELS[r.state],
    issues: r.issues,
    customer: r.customer,
    vehicleName: r.vehicleName,
    unit: r.unit ? `${r.unit.unitCode} · ${r.unit.registration}` : null,
    pickupHub: hub(r.pickup)?.name ?? r.pickup.toUpperCase(),
    returnHub: hub(r.return)?.name ?? r.return.toUpperCase(),
    pickupLocal: hubDateTime(r.pickupAt.toISOString(), hub(r.pickup)?.timezone ?? "UTC"),
    returnLocal: hubDateTime(r.returnAt.toISOString(), hub(r.return)?.timezone ?? "UTC"),
  };
}

export type DashboardView = {
  pickupsToday: OpsView[];
  returnsToday: OpsView[];
  overdue: OpsView[];
  attention: OpsView[];
  upcomingPickups: OpsView[];
  upcomingReturns: OpsView[];
  recent: OpsView[];
  activeRentals: number;
  fleet: OperationsSnapshot["fleet"];
  fleetByHub: OperationsSnapshot["fleetByHub"];
  maintenance: { id: string; label: string; hub: string }[];
};

export function toDashboardView(s: OperationsSnapshot, hubs: OpsHub[], modelNames: Record<string, string>): DashboardView {
  const v = (rows: OpsRow[]) => rows.map((r) => toOpsView(r, hubs));
  return {
    pickupsToday: v(s.pickupsToday),
    returnsToday: v(s.returnsToday),
    overdue: v(s.overdue),
    attention: v(s.attention),
    upcomingPickups: v(s.upcomingPickups),
    upcomingReturns: v(s.upcomingReturns),
    recent: v(s.recent),
    activeRentals: s.activeRentals,
    fleet: s.fleet,
    fleetByHub: s.fleetByHub,
    maintenance: s.maintenance.map((u) => ({ id: u.id, label: `${modelNames[u.modelSlug] ?? u.modelSlug} · ${u.unitCode} · ${u.registration}`, hub: u.locationCode.toUpperCase() })),
  };
}

export const STATE_TONE: Record<CurbsideState, string> = {
  upcoming: "text-on-surface-variant",
  ready: "text-primary font-semibold",
  needs_attention: "text-[#956621] font-semibold",
  return_expected: "text-on-surface",
  overdue: "text-error font-semibold",
  returned: "text-on-surface-variant",
  closed: "text-outline",
};
