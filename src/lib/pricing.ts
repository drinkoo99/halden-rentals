/**
 * Pricing rules shared by the vehicle detail panel and the booking flow.
 * Derived from the Stitch vehicle-detail screen (19): €390 × 3 days = €1,170, "VAT & environmental
 * surcharge" €222 → 19 % on the rental subtotal. Insurance, handover and cross-border passes are included.
 * Demo pricing only — not connected to any payment provider.
 */
export const VAT_RATE = 0.19;

/** Pre-authorisation deposit held on the card at handover (screen 19 "Patron criteria"). */
export const SECURITY_DEPOSIT = 2500;

export type PriceLine = { label: string; amount: number };

export type Quote = {
  days: number;
  dailyRate: number;
  rental: number;
  extras: PriceLine[];
  extrasTotal: number;
  subtotal: number;
  vat: number;
  total: number;
};

/** Round to cents (the booking screens show €222.30 for 19 % of €1,170). */
export const cents = (n: number) => Math.round(n * 100) / 100;

export function quote(dailyRate: number, days: number, extras: PriceLine[] = []): Quote {
  const rental = dailyRate * days;
  const extrasTotal = extras.reduce((s, e) => s + e.amount, 0);
  const subtotal = rental + extrasTotal;
  const vat = cents(subtotal * VAT_RATE);
  return { days, dailyRate, rental, extras, extrasTotal, subtotal, vat, total: cents(subtotal + vat) };
}

/** "€1,392.30" — booking screens (20–24) show cents. */
export function formatEuroCents(n: number): string {
  return `€${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
