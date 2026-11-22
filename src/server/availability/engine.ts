/**
 * Availability engine (M6) — pure, no I/O, so every rule is unit-tested in isolation.
 *
 * Time model: every period is HALF-OPEN, [start, end). A rental ending at 10:00 and another starting at
 * 10:00 do not overlap; a block ending at 10:00 does not prevent a 10:00 pick-up. Instants are absolute
 * (Date), so time zones and DST never enter the comparison.
 *
 * A unit is available for a request when ALL hold:
 * 1. its operational status is `available` (rented: return time unknown until M7 stores reservations;
 *    maintenance / inactive: out of service until a staff member changes the status);
 * 2. it is at the pick-up hub at the start of the rental — its own hub, or, once reservations exist, the
 *    return hub of its last reservation ending before the start (there are no inter-hub transfers);
 * 3. no maintenance/unavailability block overlaps the rental;
 * 4. no reservation overlaps the rental once each reservation is widened by the turnaround time
 *    (cleaning and preparation between two rentals).
 * Reservations are supplied by a ReservationSource. Until the booking engine (M7) exists the only source
 * is NO_RESERVATIONS: the engine does not invent bookings and cannot yet prevent double-booking.
 */

export type Interval = { start: Date; end: Date };

/** Half-open overlap: [a.start, a.end) ∩ [b.start, b.end) ≠ ∅. */
export function overlaps(a: Interval, b: Interval): boolean {
  return a.start.getTime() < b.end.getTime() && b.start.getTime() < a.end.getTime();
}

export type Block = Interval & { id: string; unitId: string; kind: "maintenance" | "unavailable" };
export type Reservation = Interval & { id: string; unitId: string; pickupLocationCode: string; returnLocationCode: string };

/** Where reservations come from. M7 implements this over its bookings collection. */
export interface ReservationSource {
  /**
   * Every reservation of these units that can affect `window`: those overlapping it once widened by the
   * turnaround time, plus — per unit — the latest one ending before it (it decides where the car is).
   */
  forUnits(unitIds: string[], window: Interval, policy: AvailabilityPolicy): Promise<Reservation[]>;
}
export const NO_RESERVATIONS: ReservationSource = { forUnits: async () => [] };

export type AvailabilityPolicy = {
  turnaroundMs: number;
  minRentalMs: number;
  maxRentalMs: number;
};
export const DEFAULT_POLICY: AvailabilityPolicy = {
  turnaroundMs: 2 * 3600_000, // cleaning and handover preparation between two rentals of the same car
  minRentalMs: 3600_000,
  maxRentalMs: 90 * 24 * 3600_000,
};

export type RentalRequest = Interval & { pickupLocationCode: string; returnLocationCode: string };
export type UnitSnapshot = { id: string; modelSlug: string; locationCode: string; status: "available" | "rented" | "maintenance" | "inactive" };

export type RequestProblem = "ends_before_start" | "too_short" | "too_long" | "starts_in_past";
export function requestProblems(req: Interval, now: Date, policy: AvailabilityPolicy = DEFAULT_POLICY): RequestProblem[] {
  const out: RequestProblem[] = [];
  const ms = req.end.getTime() - req.start.getTime();
  if (ms <= 0) out.push("ends_before_start");
  else if (ms < policy.minRentalMs) out.push("too_short");
  if (ms > policy.maxRentalMs) out.push("too_long");
  if (req.start.getTime() < now.getTime()) out.push("starts_in_past");
  return out;
}

/** The hub a unit is at when the rental starts: the return hub of its latest reservation ending by then. */
export function locationAt(unit: UnitSnapshot, reservations: Reservation[], at: Date): string {
  let latest: Reservation | undefined;
  for (const r of reservations) if (r.unitId === unit.id && r.end.getTime() <= at.getTime() && (!latest || r.end > latest.end)) latest = r;
  return latest ? latest.returnLocationCode : unit.locationCode;
}

export type UnavailableReason =
  | { code: "status"; status: UnitSnapshot["status"] }
  | { code: "location"; at: string }
  | { code: "blocked"; blockId: string; kind: Block["kind"] }
  | { code: "reserved"; reservationId: string };

export type UnitAvailability = { unitId: string; available: boolean; reasons: UnavailableReason[] };

export function unitAvailability(
  unit: UnitSnapshot,
  req: RentalRequest,
  blocks: Block[],
  reservations: Reservation[],
  policy: AvailabilityPolicy = DEFAULT_POLICY,
): UnitAvailability {
  const reasons: UnavailableReason[] = [];
  if (unit.status !== "available") reasons.push({ code: "status", status: unit.status });
  const at = locationAt(unit, reservations, req.start);
  if (at !== req.pickupLocationCode) reasons.push({ code: "location", at });
  for (const b of blocks) if (b.unitId === unit.id && overlaps(b, req)) reasons.push({ code: "blocked", blockId: b.id, kind: b.kind });
  for (const r of reservations) {
    if (r.unitId !== unit.id) continue;
    const padded = { start: new Date(r.start.getTime() - policy.turnaroundMs), end: new Date(r.end.getTime() + policy.turnaroundMs) };
    if (overlaps(padded, req)) reasons.push({ code: "reserved", reservationId: r.id });
  }
  return { unitId: unit.id, available: reasons.length === 0, reasons };
}

export type ModelAvailability = { available: boolean; availableUnits: number; units: UnitAvailability[] };

export function modelAvailability(
  units: UnitSnapshot[],
  req: RentalRequest,
  blocks: Block[],
  reservations: Reservation[],
  policy: AvailabilityPolicy = DEFAULT_POLICY,
): ModelAvailability {
  const results = units.map((u) => unitAvailability(u, req, blocks, reservations, policy));
  const availableUnits = results.filter((r) => r.available).length;
  return { available: availableUnits > 0, availableUnits, units: results };
}
