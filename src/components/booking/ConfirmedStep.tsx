"use client";

import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/components/booking/BookingProvider";
import { longDateTime } from "@/components/booking/ReviewStep";
import { Icon } from "@/components/ui/Icon";
import { extras } from "@/data/extras";
import { formatEuroCents } from "@/lib/pricing";

/** Booking step 06 · Confirmed — Stitch screen 23. A demo confirmation: nothing is reserved or charged. */
export function ConfirmedStep() {
  const { vehicle: v, state, pickup, dropoff, days } = useBooking();
  const c = state.confirmation;

  if (!c || !state.driver) {
    return (
      <div className="flex flex-col gap-6 py-10">
        <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-outline">STEP 06 / 06</span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">No confirmed reservation yet.</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          Review your dossier and confirm the reservation to receive your reference.
        </p>
        <Link href={`/book/${v.slug}/review`} className="self-start bg-primary text-on-primary font-action text-action uppercase tracking-widest px-8 py-3.5">
          Go to review
        </Link>
      </div>
    );
  }

  const issued = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(c.issuedAt)).toUpperCase();
  const provisions = extras.filter((e) => e.included || (state.extras[e.id] ?? 0) > 0);
  const transmission = v.specs.find((s) => s.label === "Transmission")?.value ?? v.gearbox;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]" aria-hidden style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-primary bg-secondary-container px-3 py-1 border border-outline-variant">
              CONFIRMATION ACTIVE · SYSTEM ARCHIVE
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-display-mobile md:text-display text-on-surface tracking-tight">
              You&apos;re all set, {state.driver.firstName}.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Your {v.model} reservation has been logged in the HALDEN fleet system. An official dossier packet is staged for physical
              handover.
            </p>
          </div>
          <div className="inline-flex flex-wrap items-center gap-4 bg-surface-container-lowest border border-primary px-4 py-2">
            <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">RESERVATION DOSSIER</span>
            <span className="font-spec-numeral text-spec-numeral text-primary font-bold tracking-wider">{c.ref} (demo)</span>
            <span className="h-3 w-px bg-outline-variant" />
            <span className="font-label-mono text-label-mono text-on-surface-variant">ISSUED {issued}</span>
          </div>
        </div>

        <div className="w-full bg-surface-container-low border border-outline-variant rounded-[2px] p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative w-full aspect-[16/11] bg-surface-container-high border border-outline-variant overflow-hidden">
                <Image
                  alt={v.imageAlt}
                  src={v.gallery[2]?.src ?? v.image}
                  fill
                  sizes="(min-width: 1024px) 340px, 100vw"
                  className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-3 left-3 bg-surface/95 px-2.5 py-1 border border-outline-variant">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">
                    {v.brand.toUpperCase()} · EXHIBIT {v.exhibit}
                  </span>
                </div>
              </div>
              <div>
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider block">ALLOCATED CHASSIS</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">{v.model}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {v.colour} · {v.seatsLabel}
                </p>
              </div>
              <div className="p-3 bg-surface border border-outline-variant grid grid-cols-2 gap-3 font-label-mono text-label-mono text-on-surface-variant">
                <div>
                  <span className="text-outline block">TRANSMISSION</span>
                  <span className="text-on-surface font-spec-numeral text-spec-numeral font-medium">{transmission}</span>
                </div>
                <div>
                  <span className="text-outline block">PROPULSION</span>
                  <span className="text-on-surface font-spec-numeral text-spec-numeral font-medium">{v.powerHp} HP</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">HANDOVER MANIFEST</span>
                  <span className="font-label-mono text-label-mono text-primary font-bold">STATUS: AUTHORIZED</span>
                </div>
                <dl className="space-y-3 font-spec-numeral text-spec-numeral divide-y divide-outline-variant">
                  <Row label="PICK-UP">
                    <p className="text-on-surface font-semibold">{pickup.longLabel}</p>
                    <p className="font-label-mono text-label-mono text-on-surface-variant">{longDateTime(state.from)}</p>
                  </Row>
                  <Row label="RETURN">
                    <p className="text-on-surface font-semibold">{dropoff.longLabel}</p>
                    <p className="font-label-mono text-label-mono text-on-surface-variant">
                      {longDateTime(state.to)} ({days}-Day Duration)
                    </p>
                  </Row>
                  <Row label="PROVISIONS">
                    <div className="text-on-surface-variant font-body-sm text-body-sm space-y-1">
                      {provisions.map((e) => (
                        <p key={e.id}>• {e.manifest}</p>
                      ))}
                    </div>
                  </Row>
                  <Row label="CONCIERGE">
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Direct liaison coordinates will be dispatched via SMS 24 hours prior to flight touchdown. Priority curbside access code
                      included.
                    </p>
                  </Row>
                  <Row label="TOTAL RESERVED">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">{formatEuroCents(c.total)}</span>
                      <span className="font-label-mono text-label-mono text-on-surface-variant">INCL. 19% VAT · DUE AT HANDOVER</span>
                    </div>
                    <p className="font-label-mono text-label-mono text-outline mt-1">
                      Demo confirmation — no email is sent and nothing is charged. Contact on file:{" "}
                      <span className="text-on-surface break-all">{state.driver.email}</span>
                    </p>
                  </Row>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container border border-outline-variant p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant">
            <div>
              <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">DISPATCH READINESS</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Execution &amp; Handover Protocol</h3>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36" aria-hidden>
                <path className="text-outline-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="2.5" />
              </svg>
              <div className="font-label-mono text-label-mono">
                <span className="font-bold text-primary block">STAGE 06/06</span>
                <span className="text-on-surface-variant">FLEET COMMITTED</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {[
              ["01 · CURBSIDE RECEPTION", "Curbside Meeting", `HALDEN fleet concierge awaits directly at the ${pickup.terminalPoint.toLowerCase()} with key dossier in hand. Zero terminal queues.`],
              ["02 · CURATION STANDARD", "48-Point Preparation", "Acoustic recalibration, ozone sanitation, cabin climate primed to 21.0°C, and Swiss motorway electronic toll tags pre-configured."],
              ["03 · ESCORT & ASSISTANCE", "24/7 Trans-Alpine Hotline", "Direct telemetry link and live emergency coordination desk available throughout Germany, Austria, and Switzerland."],
            ].map(([k, t, d]) => (
              <div key={k} className="space-y-2 border-l border-outline-variant pl-4">
                <span className="font-label-mono text-label-mono text-primary font-bold">{k}</span>
                <h4 className="font-action text-action font-semibold uppercase tracking-wider text-on-surface">{t}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 pb-6 border-t border-outline-variant print:hidden">
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link
              className="inline-flex items-center justify-center bg-primary text-on-primary font-action text-action uppercase tracking-widest px-8 py-3.5 hover:bg-primary-container transition-colors rounded-[2px]"
              href="/account"
            >
              View my reservations
            </Link>
            <Link
              className="inline-flex items-center justify-center bg-transparent border border-outline text-on-surface font-action text-action uppercase tracking-widest px-8 py-3.5 hover:bg-surface-container-high transition-colors rounded-[2px]"
              href="/"
            >
              Back to home
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="download" className="text-[18px] text-primary" />
            <button
              type="button"
              onClick={() => window.print()}
              className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface underline underline-offset-4 hover:text-primary transition-colors"
            >
              Download printable dossier PDF (demo) ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-3 first:pt-2 grid grid-cols-1 md:grid-cols-3 gap-2 items-baseline">
      <dt className="font-label-mono text-label-mono text-outline uppercase tracking-wider">{label}</dt>
      <dd className="md:col-span-2">{children}</dd>
    </div>
  );
}
