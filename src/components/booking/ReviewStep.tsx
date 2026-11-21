"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { newReference, useBooking } from "@/components/booking/BookingProvider";
import { Icon } from "@/components/ui/Icon";
import { extraCost, extras } from "@/data/extras";
import { driverSchema, licenceCountries } from "@/lib/booking/driverSchema";
import { formatEuroCents } from "@/lib/pricing";

const zoned = (v: string, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", opts).format(new Date(v));

/** "Thursday, 12 June 2025 · 10:00 CEST" */
export function longDateTime(v: string) {
  const d = new Date(v);
  const tz = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", timeZoneName: "short" })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;
  return `${zoned(v, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${v.slice(11, 16)} ${tz ?? ""}`.trim();
}

/** Booking step 05 · Review — Stitch screen 24. */
export function ReviewStep() {
  const router = useRouter();
  const { vehicle: v, state, update, pickup, dropoff, days, quote } = useBooking();
  const [agreed, setAgreed] = useState(state.agreed);
  const [error, setError] = useState<string | null>(null);
  const driverValid = state.driver ? driverSchema.safeParse(state.driver).success : false;
  const chosen = extras.filter((e) => e.included || (state.extras[e.id] ?? 0) > 0);
  const country = licenceCountries.find((c) => c.code === state.driver?.licenceCountry);
  const hours = Math.round((new Date(state.to).getTime() - new Date(state.from).getTime()) / 3_600_000);

  function confirm() {
    if (!driverValid) return setError("Complete the principal driver details before confirming.");
    if (!agreed) return setError("Please confirm the driver criteria and accept the Exhibition Terms to continue.");
    update({
      agreed: true,
      confirmation: {
        ref: newReference(),
        issuedAt: new Date().toISOString(),
        total: quote.total,
        extrasCount: quote.extras.length,
      },
    });
    router.push(`/book/${v.slug}/confirmed`);
  }

  const specs = v.specs;
  const spec = (label: string) => specs.find((s) => s.label.toLowerCase().startsWith(label))?.value ?? "—";

  return (
    <div className="flex flex-col w-full">
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="font-label-mono text-label-mono tracking-widest text-primary uppercase font-bold">STEP 05 / 06 · FINAL DOSSIER</span>
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-label-mono text-label-mono tracking-widest text-outline uppercase">
            ARCHIVE REF: HL-{pickup.code}-{v.exhibit}
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-4 max-w-2xl">Review your trans-Alpine reservation dossier.</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          Verify all logistical parameters, itinerary dates, and tailored provisions prior to formal vehicle reservation.
        </p>
      </div>

      <div className="space-y-12">
        {/* 01 Vehicle */}
        <Section n="01" title="VEHICLE EXHIBIT" edit="Edit car" href={`/fleet/${v.slug}?loc=${state.loc}&from=${state.from}&to=${state.to}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 relative bg-surface-container-high overflow-hidden h-48 md:h-52">
              <Image alt={v.imageAlt} src={v.gallery[0]?.src ?? v.image} fill sizes="(min-width: 768px) 320px, 100vw" className="w-full h-full object-cover object-center" />
              <div className="absolute top-2 left-2 bg-surface/90 px-2 py-0.5 border border-outline-variant">
                <span className="font-label-mono text-label-mono uppercase text-on-surface text-[10px]">
                  {pickup.city.toUpperCase()} ARCHIVE · NO. {v.exhibit}
                </span>
              </div>
            </div>
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-mono text-label-mono uppercase text-primary tracking-widest bg-primary-fixed px-2 py-0.5 text-[10px]">
                    VERIFIED PEDESTAL
                  </span>
                  <span className="font-label-mono text-label-mono text-outline">MODEL YEAR {v.year}</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">{v.name}</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{v.subtitle ?? `${v.categoryLabel} · ${v.colour ?? ""}`}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant bg-surface-container-low p-3">
                <div>
                  <span className="font-label-mono text-label-mono text-outline block uppercase text-[10px]">PROPULSION</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">{v.powerHp} HP</span>
                </div>
                <div>
                  <span className="font-label-mono text-label-mono text-outline block uppercase text-[10px]">CAPACITY</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">{v.seatsLabel}</span>
                </div>
                <div>
                  <span className="font-label-mono text-label-mono text-outline block uppercase text-[10px]">DRIVETRAIN</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">{spec("drive")}</span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 02 Itinerary */}
        <Section n="02" title="ITINERARY SCHEDULE" edit="Edit trip" href={`/book/${v.slug}/trip`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="space-y-3 bg-surface-container-low p-6 border-l-2 border-primary">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-semibold">01 · CONCIERGE HANDOVER</span>
                <span className="font-label-mono text-label-mono text-outline">DEPARTURE</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{pickup.label}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{pickup.handoverTitle}</p>
              </div>
              <div className="space-y-1 pt-2 font-spec-numeral text-spec-numeral text-on-surface">
                <div className="flex items-center gap-2">
                  <Icon name="schedule" className="text-[16px] text-primary" />
                  <span>{longDateTime(state.from)}</span>
                </div>
                <div className="flex items-center gap-2 text-outline text-[12px]">
                  <Icon name="my_location" className="text-[14px]" />
                  <span className="font-label-mono">COORD: {pickup.coordinates}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 bg-surface-container-low p-6 border-l-2 border-outline">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface font-semibold">02 · RETURN PROTOCOL</span>
                <span className="font-label-mono text-label-mono text-outline">ARRIVAL</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{dropoff.label}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{dropoff.handoverTitle}</p>
              </div>
              <div className="space-y-1 pt-2 font-spec-numeral text-spec-numeral text-on-surface">
                <div className="flex items-center gap-2">
                  <Icon name="event_available" className="text-[16px] text-primary" />
                  <span>{longDateTime(state.to)}</span>
                </div>
                <div className="flex items-center gap-2 text-outline text-[12px]">
                  <Icon name="timelapse" className="text-[14px]" />
                  <span className="font-label-mono">
                    DURATION: {days} {days === 1 ? "DAY" : "DAYS"} ({hours} HOURS)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-surface-container flex items-start gap-4">
            <Icon name="room_service" className="text-primary text-[20px] mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-action text-action text-on-surface uppercase tracking-wide">Handover Concierge Assignment</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                A dedicated Halden liaison will contact you via SMS 2 hours prior to arrival with flight tracking verification and vehicle bay
                coordinates.
              </p>
            </div>
          </div>
        </Section>

        {/* 03 Extras */}
        <Section n="03" title="PROVISIONS & WAIVERS" edit="Edit extras" href={`/book/${v.slug}/extras`}>
          <div className="space-y-4">
            {chosen.map((e) => {
              const qty = state.extras[e.id] ?? 1;
              return (
                <div
                  key={e.id}
                  className={`flex items-center justify-between gap-4 p-4 ${e.included ? "bg-surface-container-high border-l-2 border-primary" : "bg-surface-container-low"}`}
                >
                  <div className="flex items-center gap-4">
                    <Icon name={e.icon} className="text-primary text-[20px]" />
                    <div>
                      <p className="font-action text-action text-on-surface">
                        {e.reviewTitle}
                        {e.id === "childseat" && qty > 1 ? ` × ${qty}` : ""}
                      </p>
                      <p className="font-label-mono text-label-mono text-outline">{e.reviewDetail}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {e.included ? (
                      <>
                        <span className="font-action text-action text-primary font-semibold uppercase tracking-wider">COMPLIMENTARY</span>
                        <span className="block font-label-mono text-label-mono text-outline">ARCHIVAL STANDARD</span>
                      </>
                    ) : (
                      <>
                        <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">
                          {formatEuroCents(extraCost(e, qty, days))}
                        </span>
                        <span className="block font-label-mono text-label-mono text-outline">
                          €{e.price} {e.unit === "day" ? "/ DAY" : "FLAT"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* 04 Driver */}
        <Section n="04" title="PATRON CREDENTIALS" edit="Edit details" href={`/book/${v.slug}/details`}>
          {state.driver && driverValid ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="font-label-mono text-label-mono text-outline uppercase block text-[10px]">FULL LEGAL NAME</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    {state.driver.firstName} {state.driver.lastName}
                  </p>
                </div>
                <div>
                  <span className="font-label-mono text-label-mono text-outline uppercase block text-[10px]">EMAIL</span>
                  <p className="font-spec-numeral text-spec-numeral text-on-surface break-all">{state.driver.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="font-label-mono text-label-mono text-outline uppercase block text-[10px]">TELEPHONE (CONCIERGE DISPATCH)</span>
                  <p className="font-spec-numeral text-spec-numeral text-on-surface">{state.driver.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-label-mono text-label-mono text-outline uppercase block text-[10px]">DRIVING PERMIT JURISDICTION</span>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{country?.label}</p>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono text-outline uppercase block text-[10px]">VALIDITY STATUS</span>
                    <p className="font-label-mono text-label-mono text-primary font-bold">CHECKED AT HANDOVER</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-error-container/30">
              <p className="font-body-sm text-body-sm text-error flex items-center gap-2">
                <Icon name="error" className="text-[16px]" />
                Principal driver details are missing.
              </p>
              <Link
                href={`/book/${v.slug}/details`}
                className="font-action text-action uppercase tracking-widest bg-primary text-on-primary px-5 py-2.5 self-start"
              >
                Add driver details
              </Link>
            </div>
          )}
        </Section>

        {/* 05 Payment (concept) */}
        <section className="bg-surface-container-low p-8 border border-outline-variant space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icon name="verified_user" className="text-primary text-[18px]" />
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">05 / PAYMENT &amp; RESERVATION PROTOCOL</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface">Payment Authorization</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-highest border border-outline-variant">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label-mono text-label-mono uppercase text-on-surface tracking-wider font-semibold">Concept — no payment is processed</span>
            </div>
          </div>
          <div className="p-4 bg-surface-container-highest border-l-4 border-primary flex items-start gap-4">
            <Icon name="info" className="text-primary text-[24px]" />
            <div className="space-y-1">
              <h3 className="font-action text-action uppercase tracking-wider text-on-surface">Concept Demonstration · No Immediate Charge</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                No card details are collected online. Your card is presented and the pre-authorization security hold is executed in presence
                of the patron at handover.
              </p>
            </div>
          </div>
          <div className="space-y-4 pt-2" aria-hidden>
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider">SECURE PRE-REGISTRATION (VISA / MASTERCARD / AMEX)</span>
              <span className="font-label-mono text-label-mono uppercase text-[10px] text-outline">PRESENTED AT HANDOVER</span>
            </div>
            <div aria-hidden className="grid grid-cols-1 md:grid-cols-12 gap-4 opacity-70">
              <div className="md:col-span-7 space-y-1">
                <span className="font-label-mono text-label-mono text-on-surface uppercase block text-[10px]">CARD NUMBER</span>
                <div className="w-full bg-surface-container-lowest border border-outline-variant px-4 py-3 font-spec-numeral text-spec-numeral text-outline">
                  •••• •••• •••• ••••
                </div>
              </div>
              <div className="md:col-span-3 space-y-1">
                <span className="font-label-mono text-label-mono text-on-surface uppercase block text-[10px]">EXPIRATION</span>
                <div className="w-full bg-surface-container-lowest border border-outline-variant px-4 py-3 font-spec-numeral text-spec-numeral text-outline text-center">
                  MM / YY
                </div>
              </div>
              <div className="md:col-span-2 space-y-1">
                <span className="font-label-mono text-label-mono text-on-surface uppercase block text-[10px]">CVC</span>
                <div className="w-full bg-surface-container-lowest border border-outline-variant px-4 py-3 font-spec-numeral text-spec-numeral text-outline text-center">
                  •••
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-outline-variant">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <input
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setError(null);
                }}
                className="mt-0.5 w-4 h-4 rounded-none border border-on-surface cursor-pointer accent-primary shrink-0"
                type="checkbox"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                I confirm that the principal driver is 28+ years of age, holds a valid Class B driving license for at least 3 years, and agree to
                the{" "}
                <Link className="text-primary underline underline-offset-4 hover:text-primary-container" href="/terms">
                  HALDEN Exhibition Terms &amp; Conditions
                </Link>
                .
              </span>
            </label>
          </div>
        </section>

        {error && (
          <p role="alert" className="flex items-center gap-2 p-3 bg-error-container/30 font-body-sm text-body-sm text-error">
            <Icon name="error" className="text-[16px]" />
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-outline-variant pb-8">
          <Link
            className="w-full sm:w-auto font-action text-action uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors py-4 px-6 flex items-center justify-center gap-2 group"
            href={`/book/${v.slug}/details`}
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Details</span>
          </Link>
          <button
            className={`w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-action text-action tracking-widest uppercase py-4 px-12 transition-all flex items-center justify-center gap-3 ${
              agreed && driverValid ? "" : "opacity-50"
            }`}
            type="button"
            onClick={confirm}
            aria-disabled={!(agreed && driverValid)}
          >
            <span>Confirm reservation</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ n, title, edit, href, children }: { n: string; title: string; edit: string; href: string; children: React.ReactNode }) {
  return (
    <section className="bg-surface-container-lowest p-8 shadow-sm">
      <div className="flex items-baseline justify-between pb-4 border-b border-outline-variant mb-6">
        <div className="flex items-center gap-3">
          <span className="font-label-mono text-label-mono text-outline">{n}</span>
          <h2 className="font-action text-action uppercase tracking-widest text-on-surface">{title}</h2>
        </div>
        <Link className="font-label-mono text-label-mono uppercase text-primary hover:text-primary-container tracking-wider flex items-center gap-1 group" href={href}>
          <span>{edit}</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
      {children}
    </section>
  );
}
