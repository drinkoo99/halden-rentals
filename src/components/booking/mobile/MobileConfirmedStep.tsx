"use client";

import Link from "next/link";
import { useBooking } from "@/components/booking/BookingProvider";
import { MobileBookingHeader } from "@/components/booking/mobile/MobileBookingChrome";
import { Photo } from "@/components/ui/Photo";
import { extras } from "@/data/extras";
import { downloadIcs, reservationIcs } from "@/lib/ics";
import { formatEuroCents, SECURITY_DEPOSIT } from "@/lib/pricing";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const at = (v: string, tz: string) => {
  const d = new Date(v);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} · ${v.slice(11, 16)} ${tz}`;
};

/** Mobile booking step 06 · Confirmed — Stitch "Mobile Booking: Confirmed". Demo: nothing is reserved or charged. */
export function MobileConfirmedStep() {
  const { vehicle: v, state, pickup, dropoff } = useBooking();
  const c = state.confirmation;
  const d = state.driver;

  if (!c || !d) {
    return (
      <div className="md:hidden bg-background text-on-surface min-h-screen">
        <MobileBookingHeader step={6} subtitle="Confirmation" />
        <main className="pt-36 px-gutter-mobile flex flex-col gap-4">
          <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">STEP 06 / 06</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">No confirmed reservation yet.</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Review your dossier and confirm the reservation to receive your reference.</p>
          <Link className="h-12 bg-primary text-on-primary font-action text-action flex items-center justify-center tracking-wider" href={`/book/${v.slug}/review`}>
            GO TO REVIEW
          </Link>
        </main>
      </div>
    );
  }

  const provisions = extras.filter((e) => e.included || (state.extras[e.id] ?? 0) > 0);
  const addToCalendar = () =>
    downloadIcs(
      `${c.ref}.ics`,
      reservationIcs({
        ref: c.ref,
        title: `HALDEN handover — ${v.name}`,
        start: state.from,
        end: state.to,
        location: `${pickup.label}, ${pickup.terminalPoint}`,
        description: `Reservation ${c.ref}. Return: ${dropoff.label}, ${state.to.replace("T", " ")}.`,
      }),
    );

  return (
    <div className="md:hidden bg-background text-on-surface antialiased flex flex-col min-h-screen">
      <MobileBookingHeader step={6} subtitle="Confirmation Receipt" />
      <main className="flex flex-col relative w-full pt-28 bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-safe">
          <div className="px-gutter-mobile pt-space-lg flex flex-col items-center text-center">
            <div className="relative w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center mb-space-md">
              <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden>
                check
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
            </div>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant mb-space-xs">CONFIRMATION RECEIPT</span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mb-space-xs">You’re all set, {d.firstName}.</h1>
            <div className="inline-flex items-center gap-space-xs px-2.5 py-1 bg-surface-container mb-space-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-label-mono text-[10px] tracking-[0.14em] text-on-surface uppercase font-medium">
                {c.ref} {"//"} EXHIBIT ALLOCATED
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[320px] leading-relaxed">
              Your {v.name} reservation is confirmed for {pickup.city}. Demo confirmation — nothing has been charged.
            </p>
          </div>
          <div className="px-gutter-mobile mt-space-lg">
            <div className="bg-surface-container-low p-2">
              <div className="relative aspect-[4/3] w-full bg-surface-container overflow-hidden">
                <Photo src={v.mobileImage ?? v.image} alt={v.imageAlt} className="w-full h-full object-cover" sizes="100vw" />
                <div className="absolute bottom-2 left-2 bg-surface/90 px-2 py-1 backdrop-blur-sm">
                  <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface">EXHIBIT № {v.exhibit} · ARCHIVAL STANDARD</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 px-1 gap-2">
                <span className="font-headline-sm text-[16px] text-on-surface">{v.name}</span>
                <span className="font-spec-numeral text-spec-numeral text-primary font-medium">MY{v.year}</span>
              </div>
            </div>
          </div>
          <div className="px-gutter-mobile mt-space-lg">
            <div className="bg-surface-container p-space-md">
              <div className="flex items-center justify-between mb-space-sm bg-surface-container-high px-2 py-1.5">
                <span className="font-label-mono text-[10px] uppercase tracking-[0.12em] text-on-surface-variant font-medium">CUSTODIAL HANDOVER MANIFEST</span>
                <span className="font-label-mono text-[10px] text-primary">STATUS: CONFIRMED</span>
              </div>
              <div className="space-y-space-md">
                {[
                  { icon: "flight_takeoff", label: "COLLECTION POINT", hub: pickup, at: state.from },
                  { icon: "flight_land", label: "RETURN POINT", hub: dropoff, at: state.to },
                ].map((r) => (
                  <div key={r.label} className="flex items-start gap-space-sm">
                    <div className="w-6 h-6 bg-surface-container-high flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden>
                        {r.icon}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant">{r.label}</span>
                      <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                        {r.hub.label} · {r.hub.terminalPoint}
                      </span>
                      <span className="font-spec-numeral text-on-surface-variant text-[13px]">{at(r.at, r.hub.timezone)}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-surface-container-low p-space-sm">
                  <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1">SELECTED PROVISIONS</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {provisions.map((e) => (
                      <div key={e.id} className="flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                        <span className="font-body-sm text-[12px] text-on-surface truncate">{e.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex flex-col">
                    <span className="font-body-sm text-[12px] text-on-surface font-medium">Total due at handover</span>
                    <span className="font-label-mono text-[9px] text-on-surface-variant">+ {formatEuroCents(SECURITY_DEPOSIT)} refundable deposit</span>
                  </div>
                  <span className="font-spec-numeral text-[18px] text-primary font-bold">{formatEuroCents(c.total)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-gutter-mobile mt-space-lg">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.14em] text-on-surface-variant">WHAT HAPPENS NEXT</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant">03 STAGES</span>
            </div>
            <ol className="space-y-space-md relative">
              {[
                ["Digital Dossier Prepared", <>Your confirmation would be emailed to <span className="text-on-surface font-medium break-all">{d.email}</span> (not sent in this demo).</>],
                ["Atelier Staging", <>The {v.name} is cleaned, charged and climate-conditioned 30 minutes before your window.</>],
                ["Curbside Handover", <>Your custodian meets you at {pickup.terminalPoint} with the keys.</>],
              ].map(([t, body], i) => (
                <li key={i} className="flex gap-space-md relative">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-7 h-7 flex items-center justify-center ${i === 0 ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface"}`}>
                      <span className="font-label-mono text-[11px] font-bold">0{i + 1}</span>
                    </div>
                    {i < 2 && <div className="w-0.5 bg-surface-container-high h-full my-1" />}
                  </div>
                  <div className="flex flex-col pb-space-sm">
                    <span className="font-headline-sm text-[16px] text-on-surface leading-tight">{t}</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="px-gutter-mobile mt-space-lg flex flex-col items-center gap-space-md">
            <button className="flex items-center gap-space-xs text-primary hover:opacity-80 transition-opacity group" onClick={addToCalendar} type="button">
              <span className="material-symbols-outlined text-[18px]" aria-hidden>
                calendar_add_on
              </span>
              <span className="font-label-mono text-label-mono uppercase tracking-[0.12em] underline underline-offset-4 font-medium">Add to calendar (.ics)</span>
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5" aria-hidden>
                arrow_forward
              </span>
            </button>
            <div className="w-full flex flex-col gap-space-sm pt-space-xs">
              <Link className="w-full h-12 bg-primary text-on-primary font-action text-action flex items-center justify-center tracking-wider hover:bg-primary-container transition-colors" href="/account">
                VIEW MY RESERVATIONS
              </Link>
              <Link className="w-full h-12 bg-surface-container text-on-surface font-action text-action flex items-center justify-center tracking-wider hover:bg-surface-container-high transition-colors" href="/">
                BACK TO HOME
              </Link>
            </div>
          </div>
          <div className="px-gutter-mobile mt-space-lg mb-space-md text-center">
            <span className="font-label-mono text-[9px] uppercase tracking-[0.16em] text-on-surface-variant">HALDEN · {pickup.city.toUpperCase()} · CONCEPT PROTOTYPE</span>
          </div>
        </div>
      </main>
    </div>
  );
}
