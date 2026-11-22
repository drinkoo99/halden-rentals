import { DEFAULT_POLICY } from "../availability/engine";
import type { PublicLocation } from "../catalogue/public";
import { bookingPolicy } from "../bookings/policy";

/**
 * The operational configuration in effect (M8), for the staff settings page. READ-ONLY by design:
 * - VAT and the booking rules decide prices and availability of every booking; changing them at runtime
 *   from a web form would silently change quotes between review and confirmation, so they change with a
 *   reviewed release (code) or a deployment variable, never from the UI;
 * - the one-way fee is a deployment variable (ONE_WAY_FEE_EUR) until the business defines it;
 * - hubs come from the catalogue (db:seed); secrets (API keys, connection strings) are never shown —
 *   only whether a service is configured.
 */
export type SettingRow = { group: string; label: string; value: string; source: "code" | "environment" | "catalogue"; note?: string };

const hours = (ms: number) => `${ms / 3600_000} h`;

export function effectiveSettings(env: Record<string, string | undefined>, hubs: PublicLocation[]): SettingRow[] {
  const p = bookingPolicy(env);
  const a = DEFAULT_POLICY;
  return [
    { group: "Pricing", label: "VAT rate", value: `${Math.round(p.vatRate * 100)} %`, source: "code", note: "Applied to the whole rental subtotal; changes need a reviewed release." },
    { group: "Pricing", label: "Currency", value: p.currency, source: "code" },
    { group: "Pricing", label: "One-way return fee", value: p.oneWayFeeCents ? `€${p.oneWayFeeCents / 100}` : "none", source: "environment", note: "ONE_WAY_FEE_EUR — not yet defined by the business." },
    { group: "Bookings", label: "Hold before confirmation", value: `${p.holdMs / 60_000} min`, source: "code" },
    { group: "Bookings", label: "Minimum rental", value: hours(a.minRentalMs), source: "code" },
    { group: "Bookings", label: "Maximum rental", value: `${a.maxRentalMs / 86_400_000} days`, source: "code" },
    { group: "Bookings", label: "Turnaround between rentals", value: hours(a.turnaroundMs), source: "code" },
    { group: "Bookings", label: "Check-out opens before pick-up", value: hours(p.checkoutEarlyMs), source: "code" },
    { group: "Bookings", label: "Customer cancellation", value: "until pick-up", source: "code", note: "Staff can cancel until check-out. No refunds: nothing is charged before online payments (M10)." },
    { group: "Services", label: "Transactional email", value: env.RESEND_API_KEY && env.EMAIL_FROM ? "configured" : "not configured", source: "environment", note: "RESEND_API_KEY and EMAIL_FROM; the key itself is never shown." },
    { group: "Services", label: "Online payments", value: "not available", source: "code", note: "Arrives with M10; totals are due at handover." },
    ...hubs.map((h) => ({ group: "Hubs", label: `${h.iataCode} — ${h.city}`, value: h.handover.window, source: "catalogue" as const, note: h.timezone })),
  ];
}
