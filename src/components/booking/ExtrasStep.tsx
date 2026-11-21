"use client";

import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/components/booking/BookingProvider";
import { Icon } from "@/components/ui/Icon";
import { extraCost, extras, type Extra } from "@/data/extras";
import { formatEuroCents } from "@/lib/pricing";

/** Booking step 03 · Extras — Stitch screen 21. Paid extras start switched off (opt-in). */
export function ExtrasStep() {
  const { vehicle: v, state, update, pickup, days } = useBooking();

  const setQty = (e: Extra, qty: number) =>
    update({ extras: { ...state.extras, [e.id]: Math.max(0, Math.min(e.max, qty)) } });

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-3 pb-8">
        <div className="flex items-center gap-3">
          <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-outline">STEP 03 / 06 · CURATION</span>
          <span className="w-8 h-px bg-outline-variant" />
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-semibold">BESPOKE AMENITIES</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight max-w-2xl">Tailor your journey with bespoke amenities.</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
          All mechanical preparation, seasonal cold-weather calibration, and regional toll transit credentials are integrated as standard.
          Select additional tailored provisions for your expedition.
        </p>
      </div>

      {/* Featured Exhibit Context Card */}
      <div className="mb-10 bg-surface-container-low p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-2 border-primary">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-14 bg-surface-container-high overflow-hidden shrink-0">
            <Image alt="" src={v.image} fill sizes="80px" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-label-mono text-label-mono text-outline uppercase tracking-wider block">ALLOCATED CHASSIS</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">{v.name}</span>
            <span className="font-label-mono text-label-mono text-on-surface-variant block mt-0.5 uppercase">
              {pickup.city} CORRIDOR · {days} CALENDAR {days === 1 ? "DAY" : "DAYS"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 self-start md:self-auto">
          <span className="material-symbols-outlined text-[18px] text-primary" aria-hidden style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="font-label-mono text-label-mono text-on-surface uppercase tracking-widest">CONCIERGE VERIFIED FLEET</span>
        </div>
      </div>

      {/* Curated Provisions List */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between pb-3">
          <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-outline">
            CURATED PROVISIONS ({extras.length} ITEMS)
          </span>
          <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">{pickup.city} → ALPS ARCHIVE</span>
        </div>
        {extras.map((e, i) => {
          const qty = e.included ? 1 : (state.extras[e.id] ?? 0);
          const on = qty > 0;
          const cost = extraCost(e, Math.max(qty, 1), days);
          return (
            <div key={e.id}>
              {i > 0 && <div className="w-full h-px bg-surface-container-highest" />}
              <div
                className={`group transition-colors p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6 ${
                  on ? "bg-surface-container-low border-l-4 border-primary" : "bg-surface hover:bg-surface-container-lowest"
                }`}
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`font-label-mono text-label-mono font-bold ${on ? "text-primary" : "text-outline"}`}>{e.item}</span>
                    <span className={`font-label-mono text-label-mono ${e.included ? "text-primary uppercase font-semibold" : "text-outline"}`}>{e.tier}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 id={`extra-${e.id}`} className="font-headline-sm text-headline-sm text-on-surface">
                      {e.title}
                    </h3>
                    {e.included && (
                      <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono uppercase tracking-wider font-semibold">
                        INCLUDED
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">{e.description}</p>
                  {e.id === "childseat" ? (
                    <div className="flex items-center gap-3 pt-3">
                      <span className="font-label-mono text-label-mono uppercase tracking-wider text-outline">SEAT QUANTITY:</span>
                      <div className="inline-flex items-center bg-surface-container-highest">
                        <button
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center font-action text-action text-on-surface hover:bg-surface-variant active:bg-outline-variant transition-colors disabled:opacity-40"
                          onClick={() => setQty(e, qty - 1)}
                          disabled={qty === 0}
                          type="button"
                        >
                          −
                        </button>
                        <span className="font-spec-numeral text-spec-numeral w-8 text-center font-bold text-on-surface" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center font-action text-action text-on-surface hover:bg-surface-variant active:bg-outline-variant transition-colors disabled:opacity-40"
                          onClick={() => setQty(e, qty + 1)}
                          disabled={qty >= e.max}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-label-mono text-label-mono text-outline">MAX {e.max} UNITS</span>
                    </div>
                  ) : (
                    e.tags.length > 0 && (
                      <div className="flex items-center gap-4 pt-1 font-label-mono text-label-mono text-outline flex-wrap">
                        {e.tags.map((t, ti) => (
                          <span key={t} className="flex items-center gap-4">
                            {ti > 0 && <span aria-hidden>·</span>}
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    )
                  )}
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0 sm:min-w-[140px]">
                  <div className="text-right">
                    {e.included ? (
                      <>
                        <div className="font-spec-numeral text-spec-numeral text-primary font-bold">€0.00</div>
                        <div className="font-label-mono text-label-mono text-primary">DEFAULT INCLUSION</div>
                      </>
                    ) : (
                      <>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-bold">
                          €{e.price} <span className="text-on-surface-variant font-normal">{e.unit === "day" ? "/ day" : "flat"}</span>
                        </div>
                        <div className={`font-label-mono text-label-mono ${on ? "text-primary" : "text-outline"}`}>
                          {on ? `${formatEuroCents(extraCost(e, qty, days))} TOTAL` : e.unit === "day" ? `${formatEuroCents(cost)} FOR ${days} DAYS` : "OPTIONAL ADD-ON"}
                        </div>
                      </>
                    )}
                  </div>
                  {e.included ? (
                    <div className="w-12 h-6 bg-primary-container p-0.5 flex items-center justify-end opacity-80 cursor-not-allowed" title="Mandatory safety standard for season" aria-hidden>
                      <span className="w-5 h-5 bg-on-primary inline-block" />
                    </div>
                  ) : (
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-labelledby={`extra-${e.id}`}
                      onClick={() => setQty(e, on ? 0 : 1)}
                      className={`w-12 h-6 p-0.5 flex items-center transition-colors ${on ? "bg-primary-container justify-end" : "bg-surface-container-highest justify-start"}`}
                    >
                      <span className={`w-5 h-5 inline-block ${on ? "bg-on-primary" : "bg-on-surface-variant"}`} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Note */}
      <div className="mt-8 p-6 bg-surface-container-highest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Icon name="inventory_2" className="text-[24px] text-primary" />
          <div>
            <span className="font-action text-action uppercase tracking-widest text-on-surface block">WHITE-GLOVE VEHICLE STAGING</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              All selected amenities will be pre-installed and inspected by Master Technicians prior to airport tarmac handover.
            </span>
          </div>
        </div>
        <span className="font-label-mono text-label-mono uppercase text-outline shrink-0">PROTOCOL REF: HAL-EQ-094</span>
      </div>

      {/* Navigation */}
      <div className="mt-12 pt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 bg-surface">
        <Link
          className="inline-flex items-center gap-2 font-action text-action uppercase tracking-widest text-on-surface hover:text-primary transition-colors py-3"
          href={`/book/${v.slug}/trip`}
        >
          <Icon name="arrow_back" className="text-[16px]" />
          Back to Trip Parameters
        </Link>
        <Link
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-on-primary font-action text-action uppercase tracking-widest px-8 py-3.5 hover:bg-primary-container transition-colors"
          href={`/book/${v.slug}/details`}
        >
          Continue to Patron Details
          <Icon name="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
    </div>
  );
}
