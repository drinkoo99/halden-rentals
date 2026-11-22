"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Photo } from "@/components/ui/Photo";
import { euro, statusLabel, STATUS_BADGE, type BookingRow } from "@/lib/bookingDisplay";
import type { CustomerBooking } from "@/server/bookings/views";

/**
 * A patron's reservation (M7): the stored trip, price snapshot and status. A held booking can be confirmed
 * while its hold lasts; held or confirmed bookings can be cancelled until pick-up. Changing dates or extras
 * is done by cancelling and booking again (or through the concierge) — there is no in-place modification yet.
 */
export function AccountBookingDetail({ booking, row, canCancel, holdLive }: { booking: CustomerBooking; row: BookingRow; canCancel: boolean; holdLive: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"cancel" | "confirm" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [asking, setAsking] = useState(false);
  const p = booking.price;

  async function act(kind: "cancel" | "confirm") {
    setBusy(kind);
    setError(null);
    const res = await fetch(`/api/v1/bookings/${encodeURIComponent(booking.reference)}/${kind}`, { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: "{}" }).catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      const body = (await res?.json().catch(() => null)) as { error?: { message?: string } } | null;
      return setError(body?.error?.message ?? "The request failed. Please try again.");
    }
    setAsking(false);
    router.refresh();
  }

  const line = (label: string, cents: number, muted = false) => (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className={`font-body-sm text-body-sm ${muted ? "text-on-surface-variant" : "text-on-surface"}`}>{label}</dt>
      <dd className="font-spec-numeral text-spec-numeral text-on-surface">{euro(cents)}</dd>
    </div>
  );

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="pt-28 pb-space-xl max-w-5xl mx-auto px-margin-mobile lg:px-margin">
        <Link className="font-label-mono text-label-mono uppercase text-on-surface-variant hover:text-on-surface" href="/account">
          ← Patron Circle
        </Link>
        <header className="mt-space-md pb-space-lg border-b border-outline-variant flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <p className="font-label-mono text-label-mono uppercase text-outline">RESERVATION DOSSIER</p>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">{booking.reference}</h1>
          </div>
          <span className={`self-start md:self-auto inline-flex px-3 py-1.5 font-label-mono text-label-mono uppercase tracking-wider ${STATUS_BADGE[booking.status]}`}>{statusLabel(booking.status)}</span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-space-lg">
          <section className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="flex gap-space-md items-center">
              {row.image && (
                <div className="w-40 h-26 shrink-0 overflow-hidden bg-surface-container border border-outline-variant">
                  <Photo src={row.image} alt="" className="w-full h-full object-cover" sizes="160px" />
                </div>
              )}
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">{booking.vehicleName}</h2>
                <p className="font-label-mono text-label-mono uppercase text-on-surface-variant mt-1">
                  {p.days} {p.days === 1 ? "day" : "days"} · {booking.pickup === booking.return ? "return to the same hub" : "one-way"}
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-space-md border-y border-outline-variant py-space-md">
              <div>
                <dt className="font-label-mono text-label-mono uppercase text-outline">PICK-UP</dt>
                <dd className="font-body-md text-body-md text-on-surface mt-1">{row.pickupHub}</dd>
                <dd className="font-spec-numeral text-spec-numeral text-on-surface-variant">{row.pickupLocal} (local time)</dd>
              </div>
              <div>
                <dt className="font-label-mono text-label-mono uppercase text-outline">RETURN</dt>
                <dd className="font-body-md text-body-md text-on-surface mt-1">{row.returnHub}</dd>
                <dd className="font-spec-numeral text-spec-numeral text-on-surface-variant">{row.returnLocal} (local time)</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="font-label-mono text-label-mono uppercase text-outline">PRINCIPAL DRIVER</dt>
                <dd className="font-body-md text-body-md text-on-surface mt-1">
                  {booking.driver.firstName} {booking.driver.lastName} · <span className="break-all">{booking.driver.email}</span> · {booking.driver.phone}
                </dd>
              </div>
            </dl>
            {booking.status === "cancelled" && (
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Cancelled{booking.cancelledAt ? ` on ${new Date(booking.cancelledAt).toLocaleString("en-GB")}` : ""}
                {booking.cancellationReason ? ` — “${booking.cancellationReason}”` : ""}. Nothing was charged.
              </p>
            )}
            {booking.status === "expired" && <p className="font-body-sm text-body-sm text-on-surface-variant">The hold on this car lapsed before it was confirmed; the car was released. Nothing was charged.</p>}
          </section>

          <aside className="lg:col-span-5 bg-surface-container-low border border-outline-variant p-space-md self-start">
            <h2 className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-2">PRICE AT BOOKING</h2>
            <dl className="divide-y divide-outline-variant">
              {line(`Day rate ${euro(p.dailyRateCents)} × ${p.days}`, p.rentalCents)}
              {p.extras.filter((e) => !e.included).map((e) => (
                <div key={e.code}>{line(`${e.label}${e.quantity > 1 ? ` × ${e.quantity}` : ""}`, e.amountCents)}</div>
              ))}
              {p.extras.filter((e) => e.included).map((e) => (
                <div key={e.code}>{line(`${e.label} (included)`, 0, true)}</div>
              ))}
              {p.fees.map((f) => (
                <div key={f.code}>{line(f.label, f.amountCents)}</div>
              ))}
              {line("Subtotal", p.subtotalCents, true)}
              {line(`VAT ${Math.round(p.vatRate * 100)} %`, p.vatCents, true)}
              <div className="flex items-baseline justify-between gap-4 pt-3">
                <dt className="font-action text-action uppercase text-on-surface">Total</dt>
                <dd className="font-headline-sm text-headline-sm text-primary font-bold">{euro(p.totalCents)}</dd>
              </div>
            </dl>
            <p className="font-label-mono text-label-mono text-outline mt-space-sm">Nothing has been charged. Online payment is not available yet; the total is due at handover.</p>

            {error && (
              <p role="alert" className="font-body-sm text-body-sm text-error mt-space-md">
                {error}
              </p>
            )}
            {holdLive && (
              <button type="button" className="mt-space-md w-full h-12 bg-primary text-on-primary font-action text-action uppercase tracking-widest disabled:opacity-60" disabled={busy !== null} onClick={() => void act("confirm")}>
                {busy === "confirm" ? "Confirming…" : "Confirm reservation"}
              </button>
            )}
            {canCancel &&
              (asking ? (
                <div className="mt-space-md border border-outline-variant p-space-sm">
                  <p className="font-body-sm text-body-sm text-on-surface">Cancel {booking.reference}? The car is released immediately.</p>
                  <div className="flex gap-2 mt-space-sm">
                    <button type="button" className="flex-1 h-11 bg-error text-on-error font-action text-action uppercase disabled:opacity-60" disabled={busy !== null} onClick={() => void act("cancel")}>
                      {busy === "cancel" ? "Cancelling…" : "Yes, cancel"}
                    </button>
                    <button type="button" className="flex-1 h-11 border border-outline text-on-surface font-action text-action uppercase" onClick={() => setAsking(false)}>
                      Keep it
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="mt-space-md w-full h-11 border border-outline text-on-surface-variant hover:text-error hover:border-error font-action text-action uppercase transition-colors" onClick={() => setAsking(true)}>
                  Cancel reservation
                </button>
              ))}
            {canCancel && <p className="font-label-mono text-label-mono text-outline mt-space-sm">To change dates or extras, cancel and book again, or contact the concierge.</p>}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
