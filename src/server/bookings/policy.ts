import { VAT_RATE } from "@/lib/pricing";
import { CATALOGUE_CURRENCY } from "../catalogue/taxonomy";

/**
 * Booking business rules (M7) in one place. Values that exist in the product today are reused (VAT 19 %
 * from the booking screens, the catalogue currency); values the business has not defined yet are
 * configurable and default to "no charge" rather than an invented price:
 * - ONE_WAY_FEE_EUR (environment, whole euros, default 0): flat fee when the car is returned to another
 *   hub. Not defined by the business yet — see docs/BACKEND.md.
 */
export type BookingPolicy = {
  currency: typeof CATALOGUE_CURRENCY;
  vatRate: number;
  oneWayFeeCents: number;
  /** how long a hold keeps the car before it must be confirmed */
  holdMs: number;
  /** a customer may cancel until pick-up; staff until check-out */
  customerCancelUntilPickup: true;
  /** check-out is possible from this long before the booked pick-up time */
  checkoutEarlyMs: number;
};

function oneWayFeeCents(env: Record<string, string | undefined>): number {
  const raw = env.ONE_WAY_FEE_EUR?.trim();
  if (!raw) return 0;
  const eur = Number(raw);
  if (!Number.isInteger(eur) || eur < 0 || eur > 10_000) throw new Error("ONE_WAY_FEE_EUR must be a whole number of euros between 0 and 10000");
  return eur * 100;
}

export function bookingPolicy(env: Record<string, string | undefined> = process.env): BookingPolicy {
  return {
    currency: CATALOGUE_CURRENCY,
    vatRate: VAT_RATE,
    oneWayFeeCents: oneWayFeeCents(env),
    holdMs: 15 * 60_000,
    customerCancelUntilPickup: true,
    checkoutEarlyMs: 6 * 3600_000,
  };
}
