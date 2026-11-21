"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { newReference, useBooking } from "@/components/booking/BookingProvider";
import { MobileBookingBar, MobileBookingHeader } from "@/components/booking/mobile/MobileBookingChrome";
import { Photo } from "@/components/ui/Photo";
import { extraCost, extras } from "@/data/extras";
import { driverSchema, licenceCountries } from "@/lib/booking/driverSchema";
import { formatEuroCents } from "@/lib/pricing";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const when = (v: string, tz: string) => {
  const d = new Date(v);
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} · ${v.slice(11, 16)} ${tz}`;
};

/**
 * Mobile booking step 05 · Review — Stitch "Mobile Booking: Review (Step 4 - Disabled)" until the terms
 * box is ticked, then "Mobile Booking: Review (Step 4 - Active)".
 */
export function MobileReviewStep() {
  const router = useRouter();
  const { vehicle: v, state, update, pickup, dropoff, days, quote } = useBooking();
  const [agreed, setAgreed] = useState(state.agreed);
  const [error, setError] = useState<string | null>(null);
  const d = state.driver;
  const driverValid = d ? driverSchema.safeParse(d).success : false;
  const chosen = extras.filter((e) => e.included || (state.extras[e.id] ?? 0) > 0);
  const country = licenceCountries.find((c) => c.code === d?.licenceCountry);
  const spec = (label: string) => v.specs.find((s) => s.label.toLowerCase().startsWith(label))?.value ?? "—";

  function confirm() {
    if (!driverValid) return setError("Complete the principal driver details before confirming.");
    if (!agreed) return setError("Tick the terms box to confirm your reservation.");
    update({
      agreed: true,
      confirmation: { ref: newReference(), issuedAt: new Date().toISOString(), total: quote.total, extrasCount: quote.extras.length },
    });
    router.push(`/book/${v.slug}/confirmed`);
  }

  const edit = (step: string, label: string) => (
    <Link
      className="font-action text-action text-primary underline underline-offset-4 decoration-outline-variant hover:text-on-surface transition-colors"
      href={`/book/${v.slug}/${step}`}
      aria-label={`Edit ${label}`}
    >
      Edit
    </Link>
  );
  const head = (n: string, label: string, step: string) => (
    <div className="flex items-center justify-between pb-space-sm">
      <div className="flex items-center gap-space-xs">
        <span className="font-label-mono text-label-mono uppercase text-primary font-bold">{n} {"//"}</span>
        <h2 className="font-label-mono text-label-mono uppercase text-on-surface tracking-wider">{label}</h2>
      </div>
      {edit(step, label.toLowerCase())}
    </div>
  );

  return (
    <div className="md:hidden bg-background text-on-surface antialiased flex flex-col min-h-screen">
      <MobileBookingHeader step={5} subtitle="Final Dossier" />
      <main className="flex flex-col relative w-full pt-28 bg-surface min-h-screen">
        <div className="flex flex-col px-gutter-mobile pt-space-md pb-36">
          <div className="flex flex-col pb-space-md">
            <span className="font-label-mono text-label-mono uppercase tracking-[0.14em] text-on-surface-variant mb-1">{"STEP 05 // FINAL DOSSIER VERIFICATION"}</span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal tracking-tight">Review Itinerary</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Check the manifest and the terms before you confirm.</p>
          </div>
          <div className="flex flex-col gap-space-sm">
            <section className="bg-surface-container-low p-space-md flex flex-col">
              {head("01", "VEHICLE ASSIGNMENT", "trip")}
              <div className="flex gap-space-md pt-space-xs items-start">
                <div className="w-24 h-20 bg-surface-container shrink-0 overflow-hidden">
                  <Photo src={v.image} alt={v.imageAlt} className="w-full h-full object-cover" sizes="96px" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-headline-sm text-[17px] leading-snug text-on-surface truncate">{v.name}</span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                    <div className="flex flex-col">
                      <span className="font-label-mono text-[9px] uppercase text-on-surface-variant">Power</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">{v.powerHp} HP</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-mono text-[9px] uppercase text-on-surface-variant">Drivetrain</span>
                      <span className="font-body-sm text-[11px] text-on-surface">{spec("drive")}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-space-md bg-surface-container-high/40 p-space-sm flex justify-between items-baseline gap-2">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">
                  Daily Rate ({formatEuroCents(quote.dailyRate)} × {days} {days === 1 ? "Day" : "Days"})
                </span>
                <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface">{formatEuroCents(quote.rental)}</span>
              </div>
            </section>
            <section className="bg-surface-container-low p-space-md flex flex-col">
              {head("02", "TRANSIT ITINERARY", "trip")}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                {[
                  { icon: "flight_land", label: "Pick-Up", at: state.from, hub: pickup },
                  { icon: "flight_takeoff", label: "Return", at: state.to, hub: dropoff },
                ].map((r) => (
                  <div key={r.label} className="flex gap-space-sm items-start">
                    <div className="w-6 h-6 bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden>
                        {r.icon}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">{r.label}</span>
                        <span className="font-spec-numeral text-[11px] text-primary bg-secondary-container px-1 py-0.5">{when(r.at, r.hub.timezone)}</span>
                      </div>
                      <span className="font-body-md text-on-surface font-medium mt-0.5">{r.hub.label}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{r.hub.terminalPoint}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-surface-container-high/40 p-space-sm mt-1 flex justify-between items-center">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Reserved Scope</span>
                  <span className="font-label-mono text-label-mono text-primary font-medium">
                    {days * 24} HRS / {days} {days === 1 ? "DAY" : "DAYS"}
                  </span>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-low p-space-md flex flex-col">
              {head("03", "CURATED PROVISIONS", "extras")}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                {chosen.map((e) => (
                  <div key={e.id} className="flex justify-between items-start gap-3 py-1">
                    <div className="flex flex-col">
                      <span className="font-body-md text-on-surface">
                        {e.title}
                        {(state.extras[e.id] ?? 0) > 1 ? ` × ${state.extras[e.id]}` : ""}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{e.reviewDetail.charAt(0) + e.reviewDetail.slice(1).toLowerCase()}</span>
                    </div>
                    {e.included ? (
                      <span className="font-label-mono text-label-mono uppercase text-primary font-bold shrink-0">INCLUDED</span>
                    ) : (
                      <span className="font-spec-numeral text-spec-numeral text-on-surface shrink-0">{formatEuroCents(extraCost(e, state.extras[e.id] ?? 0, days))}</span>
                    )}
                  </div>
                ))}
                <div className="mt-2 bg-surface-container-high/40 p-space-sm flex justify-between items-baseline">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">Provisions Subtotal</span>
                  <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface">{formatEuroCents(quote.extrasTotal)}</span>
                </div>
                <div className="bg-surface-container-high/40 p-space-sm flex justify-between items-baseline">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">VAT (19 %)</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface">{formatEuroCents(quote.vat)}</span>
                </div>
              </div>
            </section>
            <section className="bg-surface-container-low p-space-md flex flex-col">
              {head("04", "PRINCIPAL PATRON & DRIVER", "details")}
              {d ? (
                <div className="flex flex-col gap-1 pt-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant" aria-hidden>
                      badge
                    </span>
                    <span className="font-headline-sm text-[16px] text-on-surface">
                      {d.firstName} {d.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1 pl-6 pt-1 text-on-surface-variant">
                    <span className="font-body-sm text-body-sm">{d.phone}</span>
                    <span className="font-body-sm text-body-sm break-all">{d.email}</span>
                    <div className="flex items-center gap-space-xs mt-1 flex-wrap">
                      <span className="font-label-mono text-[10px] uppercase bg-surface-container px-1 py-0.5 text-on-surface">{country?.label}</span>
                      <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Licence {d.licenceNumber}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="font-body-sm text-body-sm text-error pt-space-xs">
                  Driver details are missing.{" "}
                  <Link className="underline underline-offset-2" href={`/book/${v.slug}/details`}>
                    Add them
                  </Link>
                  .
                </p>
              )}
            </section>
            <div className="bg-secondary-container/80 p-space-md mt-2 flex items-start gap-space-sm text-on-secondary-container">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5" aria-hidden>
                info
              </span>
              <div className="flex flex-col">
                <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary font-bold">CUSTODIAL PROTOCOL</span>
                <p className="font-body-sm text-body-sm text-on-secondary-container mt-1 leading-relaxed">
                  Concept Prototype — No payment is processed. A {formatEuroCents(2500)} pre-authorisation would be taken at the curbside handover.
                </p>
              </div>
            </div>
            <div className="pt-space-md pb-space-sm">
              <label className="flex items-start gap-space-sm select-none cursor-pointer" htmlFor="m-terms">
                <input
                  className="peer sr-only"
                  checked={agreed}
                  id="m-terms"
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setError(null);
                  }}
                  type="checkbox"
                />
                <span
                  aria-hidden
                  className={`w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary ${
                    agreed ? "bg-primary" : "bg-surface-container-highest"
                  }`}
                >
                  {agreed && <span className="material-symbols-outlined text-on-primary text-[16px] font-bold">check</span>}
                </span>
                <span className="font-body-sm text-[12px] leading-relaxed text-on-surface">
                  I agree to the <span className="underline underline-offset-2 text-primary font-medium">HALDEN Custodial Charter</span>, Curatorial Driving Terms, and
                  the 48-Hour Zero-Excess Cancellation Protocol.
                </span>
              </label>
              {error && (
                <p role="alert" className="mt-3 font-body-sm text-[12px] text-error">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <MobileBookingBar
        caption={agreed ? "Total Commitment" : "Total Due at Handover"}
        label="Confirm reservation"
        onAction={confirm}
        disabled={!agreed || !driverValid}
        helper={agreed ? undefined : "Tick terms to confirm"}
      />
    </div>
  );
}
