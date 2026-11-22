import { AppError } from "../http/errors";
import type { PublicExtra, PublicVehicle } from "../catalogue/public";
import type { BookingPolicy } from "./policy";
import { billableDays } from "./time";

/**
 * Authoritative server-side pricing (M7) — integer cents only, deterministic, no I/O.
 *
 *   rental   = day rate × billable days (every started 24 h)
 *   extras   = per_day: price × days × quantity · per_rental: price × quantity · included: 0
 *   fees     = one-way fee when the return hub differs (BookingPolicy.oneWayFeeCents; 0 until defined)
 *   subtotal = rental + extras + fees
 *   VAT      = round(subtotal × vatRate)  (the booking screens' rule: 19 % on the whole subtotal)
 *   total    = subtotal + VAT
 * The result is stored on the booking as an immutable snapshot (labels included), so later catalogue
 * changes never alter an existing booking.
 */

export type PriceLine = { code: string; label: string; amountCents: number };
export type ExtraLine = PriceLine & { unit: "per_day" | "per_rental"; unitPriceCents: number; quantity: number; included: boolean };
export type PriceSnapshot = {
  currency: string;
  dailyRateCents: number;
  days: number;
  rentalCents: number;
  extras: ExtraLine[];
  fees: PriceLine[];
  subtotalCents: number;
  vatRate: number;
  vatCents: number;
  totalCents: number;
};

export function priceBooking(
  input: { vehicle: PublicVehicle; extras: PublicExtra[]; selected: Record<string, number>; start: Date; end: Date; pickup: string; return: string },
  policy: BookingPolicy,
): PriceSnapshot {
  const { vehicle, extras, selected } = input;
  if (!vehicle.bookable) throw new AppError("CONFLICT", "This vehicle cannot be booked at the moment.");
  if (vehicle.displayRate.currency !== policy.currency) throw new AppError("INTERNAL", "Catalogue currency mismatch");
  const days = billableDays(input.start, input.end);
  const rentalCents = vehicle.displayRate.amountCents * days;

  const unknown = Object.keys(selected).filter((code) => !extras.some((e) => e.code === code));
  if (unknown.length) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: unknown.map((c) => ({ path: `extras.${c}`, message: "no such extra" })) });

  const lines: ExtraLine[] = [];
  for (const e of extras) {
    const requested = selected[e.code] ?? 0;
    if (!e.included && requested === 0) continue;
    const quantity = e.included ? 1 : requested;
    if (quantity > e.maxQuantity) throw new AppError("VALIDATION_FAILED", "The request is invalid.", { details: [{ path: `extras.${e.code}`, message: `at most ${e.maxQuantity}` }] });
    if (e.charge.currency !== policy.currency) throw new AppError("INTERNAL", "Catalogue currency mismatch");
    const unitPriceCents = e.included ? 0 : e.charge.amountCents;
    const amountCents = e.included ? 0 : e.charge.unit === "per_day" ? unitPriceCents * days * quantity : unitPriceCents * quantity;
    lines.push({ code: e.code, label: e.title, unit: e.charge.unit, unitPriceCents, quantity, included: e.included, amountCents });
  }

  const fees: PriceLine[] = [];
  if (input.return !== input.pickup && policy.oneWayFeeCents > 0) fees.push({ code: "one_way", label: "One-way return fee", amountCents: policy.oneWayFeeCents });

  const subtotalCents = rentalCents + lines.reduce((s, l) => s + l.amountCents, 0) + fees.reduce((s, f) => s + f.amountCents, 0);
  const vatCents = Math.round(subtotalCents * policy.vatRate);
  return {
    currency: policy.currency,
    dailyRateCents: vehicle.displayRate.amountCents,
    days,
    rentalCents,
    extras: lines,
    fees,
    subtotalCents,
    vatRate: policy.vatRate,
    vatCents,
    totalCents: subtotalCents + vatCents,
  };
}
