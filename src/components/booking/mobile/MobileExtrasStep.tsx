"use client";

import { useRouter } from "next/navigation";
import { useBooking } from "@/components/booking/BookingProvider";
import { MobileBookingBar, MobileBookingHeader, Switch } from "@/components/booking/mobile/MobileBookingChrome";
import { Photo } from "@/components/ui/Photo";
import { extraCost, extras, type Extra } from "@/data/extras";
import { formatEuroCents } from "@/lib/pricing";

/** Mobile booking step 03 · Extras — Stitch "Mobile Booking: Extras (Step 2)". */
export function MobileExtrasStep() {
  const router = useRouter();
  const { vehicle: v, state, update, days, quote } = useBooking();
  const setQty = (e: Extra, qty: number) => update({ extras: { ...state.extras, [e.id]: Math.max(0, Math.min(e.max, qty)) } });

  return (
    <div className="md:hidden bg-background text-on-surface antialiased flex flex-col min-h-screen">
      <MobileBookingHeader step={3} subtitle="Curated Provisions" />
      <main className="flex flex-col relative w-full max-w-[430px] mx-auto pt-28 pb-28 bg-surface min-h-screen px-margin-mobile">
        <div className="flex flex-col w-full">
          <div className="relative w-full aspect-[16/10] bg-surface-container-high overflow-hidden mt-2 mb-6">
            <Photo src={v.mobileImage ?? v.image} alt={v.imageAlt} className="w-full h-full object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-t from-inverse-surface/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex flex-col">
                <span className="font-label-mono text-[10px] tracking-[0.16em] uppercase text-surface-bright">Exhibit № {v.exhibit}</span>
                <span className="font-headline-sm text-[16px] text-surface-bright">{v.name}</span>
              </div>
              <span className="font-spec-numeral text-[11px] text-surface-bright bg-inverse-surface/80 px-2 py-0.5 backdrop-blur-sm">Archival Standard</span>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 bg-primary" />
              <span className="font-label-mono text-label-mono text-secondary tracking-[0.18em] uppercase">{"Step 03 // Curated Specifications"}</span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">{"Extras & Provisions"}</h1>
            <div className="mt-2.5 flex items-center justify-between py-2 px-3 bg-surface-container-low">
              <span className="font-label-mono text-[11px] uppercase tracking-wider text-on-surface-variant">Accrued Provisions</span>
              <span className="font-spec-numeral text-spec-numeral font-bold text-primary" aria-live="polite">
                {formatEuroCents(quote.extrasTotal)}
              </span>
            </div>
          </div>
          <div className="flex flex-col divide-y divide-outline-variant/40">
            {extras.map((e, i) => {
              const qty = e.included ? 1 : (state.extras[e.id] ?? 0);
              const total = extraCost(e, Math.max(1, qty), days);
              const titleId = `extra-${e.id}`;
              return (
                <article key={e.id} className="py-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[10px] text-secondary tracking-widest">
                          {String(i + 1).padStart(2, "0")} {"//"} {e.tier.replace(/^·\s*/, "")}
                        </span>
                        {e.included && (
                          <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-label-mono text-[9px] uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1 h-1 bg-primary" /> Included
                          </span>
                        )}
                      </div>
                      <h2 id={titleId} className="font-headline-sm text-[18px] text-on-surface leading-snug mt-0.5">
                        {e.title}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">{e.description}</p>
                    </div>
                    {e.included ? (
                      <div className="w-11 h-11 flex items-center justify-center text-primary bg-surface-container-low shrink-0">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-label="Included">
                          verified
                        </span>
                      </div>
                    ) : e.max > 1 ? (
                      <div className="shrink-0 flex items-center bg-surface-container-low select-none" role="group" aria-labelledby={titleId}>
                        <button
                          aria-label={`Fewer ${e.title}`}
                          className="w-11 h-11 flex items-center justify-center text-on-surface active:bg-surface-container-highest transition-colors font-spec-numeral text-[18px] disabled:text-outline-variant"
                          disabled={qty === 0}
                          onClick={() => setQty(e, qty - 1)}
                          type="button"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-spec-numeral text-spec-numeral font-bold text-on-surface" aria-live="polite">
                          {qty}
                        </span>
                        <button
                          aria-label={`More ${e.title}`}
                          className="w-11 h-11 flex items-center justify-center text-on-surface active:bg-surface-container-highest transition-colors font-spec-numeral text-[18px] disabled:text-outline-variant"
                          disabled={qty >= e.max}
                          onClick={() => setQty(e, qty + 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <div className="min-h-[44px] flex items-center">
                        <Switch checked={qty > 0} labelledBy={titleId} onChange={(on) => setQty(e, on ? 1 : 0)} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-label-mono text-[10px] text-outline uppercase tracking-wider">{e.item}</span>
                    {e.included ? (
                      <span className="font-spec-numeral text-spec-numeral font-semibold text-primary">
                        €0.00 <span className="text-[11px] font-normal text-outline">(Complimentary)</span>
                      </span>
                    ) : (
                      <span className={`font-spec-numeral text-spec-numeral font-semibold ${qty > 0 ? "text-primary" : "text-on-surface"}`}>
                        {formatEuroCents(e.price)} <span className="text-[11px] font-normal text-on-surface-variant">{e.unit === "day" ? "/ day" : "flat"}</span>
                        {e.unit === "day" && <span className="text-outline font-normal text-[11px] ml-1">({formatEuroCents(total)} total)</span>}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-8 mb-6 p-4 bg-surface-container-low flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[16px]" aria-hidden>
                info
              </span>
              <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary font-bold">Custodial Manifest Notice</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              All provisions are prepared by the HALDEN atelier before dispatch. Changes made within 24 hours of the handover depend on availability.
            </p>
          </div>
        </div>
      </main>
      <MobileBookingBar label="Continue" onAction={() => router.push(`/book/${v.slug}/details`)} />
    </div>
  );
}
