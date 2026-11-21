"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_mobile_reservation_detail/code.html */
export function ReservationDetailMobile() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="md:hidden bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(23,26,24,0.02)]">
        <div className="h-16 px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <Link aria-label="Back to account" className="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface hover:text-primary transition-colors" href="/account"><span className="material-symbols-outlined text-[20px]">arrow_back</span></Link>
            <div className="flex flex-col">
              <span className="font-label-mono text-[9px] uppercase tracking-[0.16em] text-on-surface-variant font-medium">DOSSIER SPECIFICATION</span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Reservation Detail</h1>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <button onClick={() => setDrawer(true)} aria-expanded={drawer} type="button" aria-label="Protocol options" className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full pt-16 bg-surface flex flex-col">
        <div className="flex flex-col w-full pb-32">
          {/* Sub-Header Meta & Dossier Navigation Reference */}
          <div className="px-margin-mobile pt-3 pb-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant">
            <div className="flex items-center gap-2"><span className="font-label-mono text-label-mono tracking-[0.16em] uppercase text-on-surface-variant font-medium">DOSSIER · HLD-0612-4821</span></div>
            <div className="flex items-center gap-3"><button aria-label="Share reservation manifest" className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">share</span></button></div>
          </div>
          {/* Hero Exhibition Stage */}
          <div className="px-margin-mobile pt-6 pb-2">
            {/* Status Tag */}
            <div className="inline-flex items-center gap-2 bg-surface-container px-2.5 py-1 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                {" "}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-label-mono text-[10px] uppercase tracking-[0.14em] text-primary font-medium">{"CONFIRMED // VIP STAGING"}</span>
            </div>
            {/* Title Block */}
            <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-tight">Range Rover Autobiography</h2>
            <p className="font-label-mono text-label-mono text-on-surface-variant tracking-[0.08em] mt-0.5 uppercase">{"V8 TWIN-TURBOCHARGED // METEORITE SILVER"}</p>
          </div>
          {/* Sculptural Vehicle Placard */}
          <div className="px-margin-mobile mt-3">
            <div className="bg-surface-container-low border border-outline-variant p-0 relative">
              <div className="px-3 py-2 bg-surface-container border-b border-outline-variant flex items-center justify-between">
                <span className="font-label-mono text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">CHASSIS SPEC № 02 · ARCHIVAL STANDARD</span>
                <span className="font-label-mono text-[10px] text-on-surface-variant tracking-wider">HALDEN ATELIER</span>
              </div>
              {/* Studio Photograph */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container-highest">
                <Photo src={media.rangeRoverRearCourtyard} alt="Silver Range Rover Autobiography in an architectural concrete gallery hall" className="w-full h-full object-cover" sizes="100vw" />
                <div className="absolute bottom-2 right-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 border border-outline-variant"><span className="font-label-mono text-[9px] uppercase tracking-widest text-on-surface">PLATE · M-HL 4821</span></div>
              </div>
              {/* Quick Metrics Strip */}
              <div className="grid grid-cols-3 divide-x divide-outline-variant bg-surface-container-low border-t border-outline-variant">
                <div className="p-2.5 flex flex-col">
                  <span className="font-label-mono text-[9px] uppercase text-on-surface-variant">POWER</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">530 PS</span>
                </div>
                <div className="p-2.5 flex flex-col">
                  <span className="font-label-mono text-[9px] uppercase text-on-surface-variant">ODOMETER</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">4,120 KM</span>
                </div>
                <div className="p-2.5 flex flex-col">
                  <span className="font-label-mono text-[9px] uppercase text-on-surface-variant">VALUATION</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">TIER 01</span>
                </div>
              </div>
            </div>
          </div>
          {/* Section 1: Vertical Status Timeline */}
          <div className="px-margin-mobile mt-8">
            <div className="flex items-center justify-between border-b border-outline-variant pb-2 mb-4">
              <span className="font-label-mono text-label-mono tracking-[0.16em] uppercase text-on-surface font-medium">{"PROTOCOLS // ATELIER DISPATCH"}</span>
              <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">STATUS LOG</span>
            </div>
            <div className="relative pl-6 space-y-6">
              {/* Vertical Continuous Hairline */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-outline-variant" />
              {/* Step 01: Confirmed */}
              <div className="relative flex items-start group">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 bg-primary flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-[10px]">check</span></div>
                <div className="flex flex-col min-w-0 pl-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-[11px] text-primary font-bold uppercase tracking-wider">01 Allocation Confirmed</span>
                    <span className="font-label-mono text-[9px] text-on-surface-variant">08 JUN · 14:22</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">Custodial reservation registered in Munich Archival Ledger.</p>
                </div>
              </div>
              {/* Step 02: In Progress */}
              <div className="relative flex items-start group">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 bg-surface border border-primary flex items-center justify-center"><div className="w-1.5 h-1.5 bg-primary animate-pulse" /></div>
                <div className="flex flex-col min-w-0 pl-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-[11px] text-on-surface font-bold uppercase tracking-wider">02 Atelier Preparation</span>
                    <span className="font-label-mono text-[9px] text-primary uppercase font-medium">ACTIVE</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">Climate pre-conditioning and technical calibration 30m prior to handover.</p>
                </div>
              </div>
              {/* Step 03: Future */}
              <div className="relative flex items-start group opacity-75">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 bg-surface border border-outline-variant flex items-center justify-center"><div className="w-1 h-1 bg-outline-variant" /></div>
                <div className="flex flex-col min-w-0 pl-1">
                  <span className="font-label-mono text-[11px] text-on-surface font-medium uppercase tracking-wider">03 Curbside Handover</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">Scheduled: 12 Jun 2025 · 10:00 CEST at Munich VIP Pavilion Bay 04.</p>
                </div>
              </div>
              {/* Step 04: Future */}
              <div className="relative flex items-start group opacity-60">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 bg-surface border border-outline-variant flex items-center justify-center"><div className="w-1 h-1 bg-outline-variant" /></div>
                <div className="flex flex-col min-w-0 pl-1">
                  <span className="font-label-mono text-[11px] text-on-surface font-medium uppercase tracking-wider">04 Consignment Return</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">Scheduled: 15 Jun 2025 · 10:00 CEST.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Section 2: Collapsible Dossier Manifest Accordions */}
          <div className="px-margin-mobile mt-8 space-y-3">
            <div className="border-b border-outline-variant pb-2 mb-3"><span className="font-label-mono text-label-mono tracking-[0.16em] uppercase text-on-surface font-medium">{"DOSSIER MANIFEST // PARTICULARS"}</span></div>
            {/* Accordion 01: Expanded by default */}
            <details className="group bg-surface-container-low border border-outline-variant" open>
              <summary className="list-none cursor-pointer p-3.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[11px] font-bold text-primary">{"01 //"}</span>
                  <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-semibold">{"HANDOVER & RETURN MANIFEST"}</span>
                </div>
                {" "}
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-3.5 pb-4 pt-1 border-t border-outline-variant text-body-sm">
                <div className="space-y-3">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant block">CONCOURSE DESTINATION</span>
                    <p className="font-body-sm text-on-surface font-medium">Munich Airport (MUC) Terminal 2 VIP Pavilion</p>
                    <p className="font-body-sm text-on-surface-variant text-[12px]">Curbside Handover Bay 04</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant">
                    <div>
                      <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant block">{"START DATE & TIME"}</span>
                      <p className="font-spec-numeral text-[13px] text-on-surface">12.06.2025 · 10:00</p>
                    </div>
                    <div>
                      <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant block">CONSIGNMENT RETURN</span>
                      <p className="font-spec-numeral text-[13px] text-on-surface">15.06.2025 · 10:00</p>
                    </div>
                  </div>
                  <div className="bg-surface p-2.5 border border-outline-variant flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">support_agent</span>
                      <div className="flex flex-col">
                        <span className="font-label-mono text-[10px] text-on-surface uppercase font-medium">Concierge Hans R.</span>
                        <span className="font-spec-numeral text-[11px] text-on-surface-variant">+41 44 800 2400</span>
                      </div>
                    </div>
                    <a className="px-2 py-1 bg-surface-container border border-outline-variant font-label-mono text-[9px] uppercase text-primary font-medium hover:bg-surface-container-high transition-colors" href="tel:+41448002400">Call Direct</a>
                  </div>
                </div>
              </div>
            </details>
            {/* Accordion 02: Collapsed */}
            <details className="group bg-surface-container-low border border-outline-variant">
              <summary className="list-none cursor-pointer p-3.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[11px] font-bold text-on-surface-variant">{"02 //"}</span>
                  <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-semibold">CURATED PROVISIONS</span>
                </div>
                {" "}
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-3.5 pb-4 pt-1 border-t border-outline-variant text-body-sm space-y-2">
                <div className="flex items-center justify-between py-1 border-b border-outline-variant">
                  <span className="font-body-sm text-on-surface">Comprehensive Zero-Excess Waiver</span>
                  <span className="font-label-mono text-[11px] text-primary">INCLUDED</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-outline-variant">
                  <span className="font-body-sm text-on-surface">Designated Secondary Driver</span>
                  <span className="font-label-mono text-[11px] text-on-surface-variant">AUTHORIZED</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-outline-variant">
                  <span className="font-body-sm text-on-surface">Swiss Highway Vignette (Annual)</span>
                  <span className="font-spec-numeral text-[12px] text-on-surface">€45.00</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-body-sm text-on-surface">ISOFIX Child Restraint System</span>
                  <span className="font-spec-numeral text-[12px] text-on-surface">€240.00</span>
                </div>
              </div>
            </details>
            {/* Accordion 03: Collapsed */}
            <details className="group bg-surface-container-low border border-outline-variant">
              <summary className="list-none cursor-pointer p-3.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[11px] font-bold text-on-surface-variant">{"03 //"}</span>
                  <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-semibold">FINANCIAL SETTLEMENT</span>
                </div>
                {" "}
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-3.5 pb-4 pt-2 border-t border-outline-variant text-body-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-on-surface-variant">Base Archival Tariff (3 Days)</span>
                  <span className="font-spec-numeral text-on-surface">€1,446.45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body-sm text-on-surface-variant">Curated Provisions</span>
                  <span className="font-spec-numeral text-on-surface">€285.00</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant font-medium">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface">Total due at handover (VAT incl.)</span>
                  <span className="font-spec-numeral text-[16px] text-primary">€1,731.45</span>
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">DUE AT HANDOVER · NOTHING CHARGED ONLINE</span>
                  <button className="font-label-mono text-[10px] uppercase text-primary underline tracking-wider flex items-center gap-1 hover:text-on-surface">
                    <span>TAX INVOICE PDF</span>
                    {" "}
                    <span className="material-symbols-outlined text-[12px]">download</span>
                  </button>
                </div>
              </div>
            </details>
            {/* Accordion 04: Collapsed */}
            <details className="group bg-surface-container-low border border-outline-variant">
              <summary className="list-none cursor-pointer p-3.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[11px] font-bold text-on-surface-variant">{"04 //"}</span>
                  <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-semibold">PATRON IDENTITY</span>
                </div>
                {" "}
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 group-open:rotate-180">expand_more</span>
              </summary>
              <div className="px-3.5 pb-4 pt-1 border-t border-outline-variant text-body-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant block">PRIMARY OPERATOR</span>
                    <p className="font-body-sm text-on-surface font-medium">Clara von Bergmann</p>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant block">CREDENTIAL</span>
                    <p className="font-body-sm text-on-surface">Licence Cat. B/BE (CH)</p>
                  </div>
                </div>
                <div className="mt-2.5 py-1 px-2 bg-secondary-container/40 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
                  <span className="font-label-mono text-[10px] text-primary uppercase">{"Identity & Insurance Pre-Validated"}</span>
                </div>
              </div>
            </details>
          </div>
          {/* Cancellation Policy Footnote */}
          <div className="px-margin-mobile mt-8 mb-4 flex flex-col items-center text-center">
            <Link className="h-11 px-4 text-error font-body-sm font-medium hover:underline transition-all flex items-center justify-center" href="/account/reservations/hld-0612-4821/cancel">Cancel reservation</Link>
            <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider -mt-1">Free cancellation until 10 Jun 10:00 CEST</span>
          </div>
          {/* Sticky Bottom Action Bar with Architectural Framing */}
          <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant pb-safe">
            <div className="max-w-md mx-auto px-margin-mobile py-3 grid grid-cols-2 gap-3 items-center">
              <Link className="h-12 border border-on-surface bg-surface text-on-surface font-action text-action hover:bg-surface-container transition-colors flex items-center justify-center text-center tracking-[0.04em]" href="/account/reservations/hld-0612-4821/modify">Modify Itinerary</Link>
              <a className="h-12 bg-primary text-on-primary font-action text-action hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 tracking-[0.04em]" href="https://www.google.com/maps/search/?api=1&query=Munich+Airport+Terminal+2" rel="noopener noreferrer" target="_blank">
                <span>Directions</span>
                {" "}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
          {/* Micro-Drawer Modal for Modification */}
          <div className={`${drawer ? "flex" : "hidden"} fixed inset-0 z-50 bg-black/40 backdrop-blur-xs items-end justify-center`} id="itineraryDrawer" role="dialog" aria-modal="true" aria-label="Modification protocol">
            <div className="bg-surface w-full max-w-md p-6 border-t border-outline-variant shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">MODIFICATION PROTOCOL</span>
                <button aria-label="Close" className="text-on-surface-variant hover:text-on-surface" onClick={() => setDrawer(false)} type="button"><span className="material-symbols-outlined text-[20px]">close</span></button>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">Adjustments to collection schedule, ancillary waivers, or designated chauffeur require re-calibration of your archival slot.</p>
              <div className="space-y-2 pt-2">
                <Link className="w-full h-11 bg-surface-container-low border border-outline-variant font-label-mono text-[11px] uppercase tracking-wider text-left px-3 flex items-center justify-between hover:bg-surface-container" href="/account/reservations/hld-0612-4821/modify">
                  <span>Reschedule Handover Window</span>
                  {" "}
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                </Link>
                <Link className="w-full h-11 bg-surface-container-low border border-outline-variant font-label-mono text-[11px] uppercase tracking-wider text-left px-3 flex items-center justify-between hover:bg-surface-container" href="/account/reservations/hld-0612-4821/modify">
                  <span>Amend Curated Provisions</span>
                  {" "}
                  <span className="material-symbols-outlined text-[14px]">tune</span>
                </Link>
                <Link className="w-full h-11 bg-surface-container-low border border-outline-variant font-label-mono text-[11px] uppercase tracking-wider text-left px-3 flex items-center justify-between hover:bg-surface-container" href="/about#contact">
                  <span>Transfer Allocation to Associate</span>
                  {" "}
                  <span className="material-symbols-outlined text-[14px]">badge</span>
                </Link>
              </div>
              <button className="w-full mt-2 h-11 bg-primary text-on-primary font-action text-action" onClick={() => setDrawer(false)} type="button">Return to Dossier</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
