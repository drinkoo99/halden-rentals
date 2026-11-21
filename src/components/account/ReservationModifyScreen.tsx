"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_reservation_modify_itinerary_overlay/code.html */
export function ReservationModifyScreen() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  /** Demo: there is no booking backend yet, so the change is acknowledged and the patron returns to the dossier. */
  function confirmChanges() {
    setSaving(true);
    window.setTimeout(() => router.push("/account/reservations/hld-0612-4821"), 700);
  }
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 min-h-screen bg-surface">
        <div className="flex flex-col w-full relative">
          {/* ========================================================================= */}
          {/* BACKGROUND LAYER: Full Reservation Detail Page (Dimmed behind overlay) */}
          {/* ========================================================================= */}
          <div aria-hidden="true" className="w-full px-margin-mobile lg:px-margin py-space-lg select-none pointer-events-none">
            {/* Top Meta Hierarchy */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-space-md border-b border-outline-variant mb-space-lg gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-primary">DOSSIER № HLD-0612-4821</span>
                <span className="text-outline-variant font-label-mono text-label-mono">/</span>
                <span className="font-label-mono text-label-mono uppercase text-secondary">ARCHIVE CONFIRMED</span>
              </div>
              <div className="flex items-center gap-space-md"><span className="font-label-mono text-label-mono uppercase text-on-surface-variant">COMMITTED: 24 MAY 2025 · 14:18 CEST</span></div>
            </div>
            {/* Main Dossier Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-space-xl">
              {/* Primary Column: Image & Vehicle Spec (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-space-lg">
                {/* Exhibit Stage */}
                <div className="bg-surface-container-low border border-outline-variant p-space-sm">
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
                    <Photo src={media.reservationModifyRangeRover} className="w-full h-full object-cover" data-alt="Studio architectural photograph of a sleek silver Range Rover Autobiography luxury SUV on warm limestone surface in front of a minimalist brutalist concrete wall, soft ambient gallery lighting, 8k resolution, elegant catalogue aesthetic." sizes="(max-width: 767px) 100vw, 61vw" alt="" />
                    <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 border border-outline-variant"><span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">EXHIBIT № 08 · AUTOBIOGRAPHY</span></div>
                    <div className="absolute bottom-4 right-4 bg-primary text-on-primary px-3 py-1 font-label-mono text-label-mono uppercase">STATUS: CONFIRMED</div>
                  </div>
                  <div className="pt-space-md px-space-xs flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-space-sm">
                    <div>
                      <div className="font-label-mono text-label-mono uppercase text-secondary tracking-widest mb-1">{"STUTTGART & SOLIHULL ARCHIVE"}</div>
                      <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight">Range Rover Autobiography</h1>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <div className="font-spec-numeral text-spec-numeral text-secondary">V8 TWIN-TURBOCHARGED</div>
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">523 BHP · CHASSIS L460</div>
                    </div>
                  </div>
                  {/* Spec Matrix Bar */}
                  <div className="grid grid-cols-4 divide-x divide-outline-variant pt-space-sm font-label-mono text-label-mono text-on-surface-variant">
                    <div className="pr-space-xs">
                      <div className="text-[9px] uppercase tracking-wider text-outline">DAILY RATE</div>
                      <div className="font-spec-numeral text-on-surface">€480.00</div>
                    </div>
                    <div className="px-space-xs">
                      <div className="text-[9px] uppercase tracking-wider text-outline">DRIVE</div>
                      <div className="font-spec-numeral text-on-surface">INTELLIGENT AWD</div>
                    </div>
                    <div className="px-space-xs">
                      <div className="text-[9px] uppercase tracking-wider text-outline">SEATING</div>
                      <div className="font-spec-numeral text-on-surface">4+1 EXECUTIVE</div>
                    </div>
                    <div className="pl-space-xs">
                      <div className="text-[9px] uppercase tracking-wider text-outline">ODOMETER</div>
                      <div className="font-spec-numeral text-on-surface">4,120 KM</div>
                    </div>
                  </div>
                </div>
                {/* Custody Timeline */}
                <div className="bg-surface-container-low border border-outline-variant p-space-md">
                  <div className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-primary mb-space-md">{"ITINERARY TIMELINE & PROTOCOL"}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                    <div className="border-l-2 border-primary pl-space-md">
                      <span className="font-label-mono text-label-mono uppercase text-outline">HANDOVER CONSIGNMENT</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface mt-1">12 June 2025 · 10:00 CEST</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Munich Airport Terminal 2 (MUC)</p>
                      <span className="font-label-mono text-label-mono text-secondary">VIP Curbside Bay 04 · Concierge Hans R.</span>
                    </div>
                    <div className="border-l-2 border-outline-variant pl-space-md">
                      <span className="font-label-mono text-label-mono uppercase text-outline">DE-CONSIGNMENT REPATRIATION</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface mt-1">15 June 2025 · 14:00 CEST</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Munich Airport Terminal 2 (MUC)</p>
                      <span className="font-label-mono text-label-mono text-secondary">VIP Curbside Bay 04 · Return Inspection</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Secondary Column: Ledger & Custody Profile (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-space-lg">
                {/* Summary Ledger */}
                <div className="bg-surface-container border border-outline-variant p-space-md">
                  <div className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary mb-space-md">FINANCIAL AUDIT</div>
                  <div className="space-y-space-sm font-body-sm text-body-sm pb-space-md border-b border-outline-variant">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Exhibit 08 Custody (3 diurnal cycles)</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€1,440.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Zero-Excess Custodial Waiver</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€135.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Designated Secondary Driver</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€90.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Airport Curbside Surcharge</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€66.45</span>
                    </div>
                  </div>
                  <div className="pt-space-md flex justify-between items-baseline">
                    <span className="font-action text-action uppercase tracking-wider text-on-surface">Committed Total</span>
                    <span className="font-spec-numeral text-headline-sm text-primary font-bold">€1,731.45</span>
                  </div>
                  <div className="font-label-mono text-label-mono text-right text-outline mt-1">INCL. 19% VAT (€276.45)</div>
                </div>
                {/* Registered Custodian */}
                <div className="bg-surface-container-low border border-outline-variant p-space-md">
                  <div className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary mb-space-sm">REGISTERED CUSTODIAN</div>
                  <div className="font-action text-action text-on-surface uppercase">Clara Von Halden</div>
                  <div className="font-label-mono text-label-mono text-outline mt-1">PATRON NO. 802 · TIER II MONOLITH</div>
                  <div className="mt-space-md pt-space-sm border-t border-outline-variant text-body-sm text-on-surface-variant">Settlement: at the curbside handover</div>
                </div>
              </div>
            </div>
          </div>
          {/* ========================================================================= */}
          {/* MODAL / DRAWER SYSTEM: Scrim Overlay & 560px Architectural Slide-out */}
          {/* ========================================================================= */}
          {/* Dimmed Ink Backdrop (rgba(23, 26, 24, 0.45)) */}
          <div className="fixed inset-0 z-40 bg-[#171A18]/45 backdrop-blur-[2px] transition-opacity duration-300 opacity-100" id="drawer-backdrop" onClick={() => router.push("/account/reservations/hld-0612-4821")} aria-hidden />
          {/* Slide-out Drawer Panel (Fixed 560px wide, 100vh, z-50, Ivory BG) */}
          <div className="fixed top-0 right-0 h-screen w-full sm:w-[560px] z-50 bg-[#F5F3EE] border-l border-[#D8D6CE] flex flex-col shadow-2xl overflow-hidden transition-transform duration-300 ease-out" id="reservation-drawer" style={{ transform: "translateX(0%)" }}>
            {/* Drawer Header */}
            <div className="px-8 pt-7 pb-5 border-b border-[#D8D6CE] bg-[#F5F3EE] shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-[#344A3D]" />
                  <span className="font-label-mono text-[11px] uppercase tracking-[0.2em] text-[#171A18] font-semibold">MODIFY · HLD-0612-4821</span>
                </div>
                <Link aria-label="Close drawer" className="w-8 h-8 rounded-none border border-transparent hover:border-[#D8D6CE] hover:bg-[#EAE8E1] flex items-center justify-center transition-colors text-[#171A18]" href="/account/reservations/hld-0612-4821"><span className="material-symbols-outlined text-[18px]">close</span></Link>
              </div>
              <p className="font-body-sm text-[13px] text-[#424844] leading-relaxed">Adjust travel window, handover stations, or vehicle provisions for Exhibit 08.</p>
            </div>
            {/* Scrollable Drawer Interior */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-7 divide-y divide-[#D8D6CE]">
              {/* Section 01: Compact Itinerary Calendar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-[11px] uppercase tracking-[0.16em] text-[#344A3D] font-bold">{"01 // ITINERARY DATES"}</span>
                  <span className="font-label-mono text-[10px] uppercase text-[#737973] tracking-widest">2025 SUMMER ARCHIVE</span>
                </div>
                {/* 2-Month Dual Calendar Container */}
                <div className="bg-[#EAE8E1] border border-[#D8D6CE] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* JUNE 2025 */}
                    <div>
                      <div className="font-display text-[14px] text-[#171A18] text-center uppercase tracking-widest mb-3 font-semibold">JUNE 2025</div>
                      <div className="grid grid-cols-7 text-center font-label-mono text-[10px] text-[#737973] mb-1.5 pb-1 border-b border-[#D8D6CE]">
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                        <span>S</span>
                      </div>
                      <div className="grid grid-cols-7 text-center font-label-mono text-[11px] gap-y-1">
                        {/* Padding days for May wrap */}
                        <span className="text-[#b4b2ac] py-1">26</span>
                        <span className="text-[#b4b2ac] py-1">27</span>
                        <span className="text-[#b4b2ac] py-1">28</span>
                        <span className="text-[#b4b2ac] py-1">29</span>
                        <span className="text-[#b4b2ac] py-1">30</span>
                        <span className="text-[#b4b2ac] py-1">31</span>
                        <span className="text-[#171A18] py-1">1</span>
                        <span className="text-[#171A18] py-1">2</span>
                        <span className="text-[#171A18] py-1">3</span>
                        <span className="text-[#171A18] py-1">4</span>
                        <span className="text-[#171A18] py-1">5</span>
                        <span className="text-[#171A18] py-1">6</span>
                        <span className="text-[#171A18] py-1">7</span>
                        <span className="text-[#171A18] py-1">8</span>
                        <span className="text-[#171A18] py-1">9</span>
                        <span className="text-[#171A18] py-1">10</span>
                        <span className="text-[#171A18] py-1">11</span>
                        {/* RANGE SELECTION: 12 - 16 JUNE */}
                        {/* 12 (Start): Solid Forest Green */}
                        <span className="bg-[#344A3D] text-[#F5F3EE] py-1 font-semibold cursor-pointer">12</span>
                        {/* 13: Sage highlight bar */}
                        <span className="bg-[#bbcbba] text-[#171A18] py-1 font-semibold cursor-pointer">13</span>
                        {/* 14: Sage highlight bar */}
                        <span className="bg-[#bbcbba] text-[#171A18] py-1 font-semibold cursor-pointer">14</span>
                        {/* 15: (Old end, now connected) */}
                        <span className="bg-[#bbcbba] text-[#171A18] py-1 font-semibold cursor-pointer">15</span>
                        {/* 16 (Revised End): Solid Forest Green */}
                        <span className="bg-[#344A3D] text-[#F5F3EE] py-1 font-semibold cursor-pointer">16</span>
                        <span className="text-[#171A18] py-1 hover:bg-[#d9dad7] cursor-pointer">17</span>
                        <span className="text-[#171A18] py-1 hover:bg-[#d9dad7] cursor-pointer">18</span>
                        <span className="text-[#171A18] py-1 hover:bg-[#d9dad7] cursor-pointer">19</span>
                        <span className="text-[#171A18] py-1 hover:bg-[#d9dad7] cursor-pointer">20</span>
                        <span className="text-[#171A18] py-1 hover:bg-[#d9dad7] cursor-pointer">21</span>
                        <span className="text-[#171A18] py-1 hover:bg-[#d9dad7] cursor-pointer">22</span>
                        <span className="text-[#171A18] py-1">23</span>
                        <span className="text-[#171A18] py-1">24</span>
                        <span className="text-[#171A18] py-1">25</span>
                        <span className="text-[#171A18] py-1">26</span>
                        <span className="text-[#171A18] py-1">27</span>
                        <span className="text-[#171A18] py-1">28</span>
                        <span className="text-[#171A18] py-1">29</span>
                        <span className="text-[#171A18] py-1">30</span>
                      </div>
                    </div>
                    {/* JULY 2025 */}
                    <div>
                      <div className="font-display text-[14px] text-[#171A18] text-center uppercase tracking-widest mb-3 font-semibold">JULY 2025</div>
                      <div className="grid grid-cols-7 text-center font-label-mono text-[10px] text-[#737973] mb-1.5 pb-1 border-b border-[#D8D6CE]">
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span>S</span>
                        <span>S</span>
                      </div>
                      <div className="grid grid-cols-7 text-center font-label-mono text-[11px] gap-y-1">
                        <span className="text-[#b4b2ac] py-1">30</span>
                        <span className="text-[#171A18] py-1">1</span>
                        <span className="text-[#171A18] py-1">2</span>
                        <span className="text-[#171A18] py-1">3</span>
                        <span className="text-[#171A18] py-1">4</span>
                        <span className="text-[#171A18] py-1">5</span>
                        <span className="text-[#171A18] py-1">6</span>
                        <span className="text-[#171A18] py-1">7</span>
                        <span className="text-[#171A18] py-1">8</span>
                        <span className="text-[#171A18] py-1">9</span>
                        <span className="text-[#171A18] py-1">10</span>
                        <span className="text-[#171A18] py-1">11</span>
                        <span className="text-[#171A18] py-1">12</span>
                        <span className="text-[#171A18] py-1">13</span>
                        <span className="text-[#171A18] py-1">14</span>
                        <span className="text-[#171A18] py-1">15</span>
                        <span className="text-[#171A18] py-1">16</span>
                        <span className="text-[#171A18] py-1">17</span>
                        <span className="text-[#171A18] py-1">18</span>
                        <span className="text-[#171A18] py-1">19</span>
                        <span className="text-[#171A18] py-1">20</span>
                        <span className="text-[#171A18] py-1">21</span>
                        <span className="text-[#171A18] py-1">22</span>
                        <span className="text-[#171A18] py-1">23</span>
                        <span className="text-[#171A18] py-1">24</span>
                        <span className="text-[#171A18] py-1">25</span>
                        <span className="text-[#171A18] py-1">26</span>
                        <span className="text-[#171A18] py-1">27</span>
                        <span className="text-[#171A18] py-1">28</span>
                        <span className="text-[#171A18] py-1">29</span>
                        <span className="text-[#171A18] py-1">30</span>
                        <span className="text-[#171A18] py-1">31</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Date String Verification */}
                <div className="bg-[#F5F3EE] border-l-2 border-[#344A3D] px-3 py-2">
                  <div className="font-label-mono text-[11px] text-[#171A18] uppercase tracking-wide">
                    Selected:{" "}
                    <span className="font-bold">Thu 12 Jun 2025</span>
                    {" "}→{" "}
                    <span className="font-bold">Mon 16 Jun 2025</span>
                  </div>
                  <div className="font-label-mono text-[10px] text-[#344A3D] uppercase tracking-wider font-semibold">(4 diurnal cycles · +1 extended day)</div>
                </div>
              </div>
              {/* Section 02: Time Protocol */}
              <div className="pt-6 space-y-4">
                <span className="font-label-mono text-[11px] uppercase tracking-[0.16em] text-[#344A3D] font-bold block">{"02 // TIME PROTOCOL"}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-label-mono text-[10px] uppercase text-[#737973] block tracking-wider">HANDOVER TIME</label>
                    <div className="relative">
                      <select className="w-full bg-[#F5F3EE] border border-[#D8D6CE] text-[#171A18] font-spec-numeral text-[13px] py-2.5 px-3 pr-8 appearance-none focus:outline-hidden focus:border-[#344A3D] rounded-none" defaultValue="10:00 CEST (Curbside VIP Bay 04)">
                        <option>10:00 CEST (Curbside VIP Bay 04)</option>
                        <option>11:00 CEST (Curbside VIP Bay 04)</option>
                        <option>12:00 CEST (Curbside VIP Bay 04)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[18px] text-[#737973]">expand_more</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-mono text-[10px] uppercase text-[#737973] block tracking-wider">RETURN TIME</label>
                    <div className="relative">
                      <select className="w-full bg-[#F5F3EE] border border-[#D8D6CE] text-[#171A18] font-spec-numeral text-[13px] py-2.5 px-3 pr-8 appearance-none focus:outline-hidden focus:border-[#344A3D] rounded-none" defaultValue="14:00 CEST (Curbside VIP Bay 04)">
                        <option>14:00 CEST (Curbside VIP Bay 04)</option>
                        <option>15:00 CEST (Curbside VIP Bay 04)</option>
                        <option>16:00 CEST (Curbside VIP Bay 04)</option>
                        <option>18:00 CEST (Curbside VIP Bay 04)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[18px] text-[#737973]">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 03: Consignment Station */}
              <div className="pt-6 space-y-3">
                <span className="font-label-mono text-[11px] uppercase tracking-[0.16em] text-[#344A3D] font-bold block">{"03 // CONSIGNMENT STATION"}</span>
                <div className="flex items-start gap-3 p-3.5 bg-[#EAE8E1] border border-[#D8D6CE]">
                  <div className="relative flex items-center mt-0.5"><input defaultChecked className="w-4 h-4 rounded-none border border-[#171A18] text-[#344A3D] accent-[#344A3D] cursor-pointer" id="return-same-station" type="checkbox" /></div>
                  <div className="flex-1 text-[13px]">
                    <label className="font-action font-semibold text-[#171A18] cursor-pointer block" htmlFor="return-same-station">Return to primary handover station</label>
                    <span className="font-body-sm text-[12px] text-[#424844] block mt-0.5">Munich Airport Terminal 2 VIP Pavilion (MUC · Bay 04)</span>
                  </div>
                  <span className="font-label-mono text-[10px] uppercase text-[#344A3D] tracking-wider font-semibold border border-[#344A3D] px-1.5 py-0.5">NO FEE</span>
                </div>
              </div>
              {/* Section 04: Provisions & Waivers */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-[11px] uppercase tracking-[0.16em] text-[#344A3D] font-bold">{"04 // PROVISIONS & WAIVERS"}</span>
                  <span className="font-label-mono text-[10px] uppercase text-[#737973]">4 DIURNAL CYCLES</span>
                </div>
                <div className="divide-y divide-[#D8D6CE] border border-[#D8D6CE] bg-[#F5F3EE]">
                  {/* Provision 1 (Active) */}
                  <div className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#EAE8E1]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <input defaultChecked className="w-4 h-4 rounded-none border border-[#171A18] accent-[#344A3D] cursor-pointer" id="opt-waiver" type="checkbox" />
                      <div>
                        <label className="font-body-sm font-semibold text-[#171A18] text-[13px] block cursor-pointer" htmlFor="opt-waiver">Comprehensive Zero-Excess Waiver</label>
                        <div className="font-label-mono text-[11px] text-[#737973]">€45.00 / day · Complete loss and glass shield</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-spec-numeral text-[13px] font-semibold text-[#171A18]">€180.00</span>
                      <span className="block font-label-mono text-[9px] text-[#344A3D] uppercase font-bold">+€45 REVISED</span>
                    </div>
                  </div>
                  {/* Provision 2 (Active) */}
                  <div className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#EAE8E1]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <input defaultChecked className="w-4 h-4 rounded-none border border-[#171A18] accent-[#344A3D] cursor-pointer" id="opt-driver" type="checkbox" />
                      <div>
                        <label className="font-body-sm font-semibold text-[#171A18] text-[13px] block cursor-pointer" htmlFor="opt-driver">Designated Secondary Driver</label>
                        <div className="font-label-mono text-[11px] text-[#737973]">€30.00 / day · Endorsed driver license check</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-spec-numeral text-[13px] font-semibold text-[#171A18]">€120.00</span>
                      <span className="block font-label-mono text-[9px] text-[#344A3D] uppercase font-bold">+€30 REVISED</span>
                    </div>
                  </div>
                  {/* Provision 3 (Active) */}
                  <div className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#EAE8E1]/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <input defaultChecked className="w-4 h-4 rounded-none border border-[#171A18] accent-[#344A3D] cursor-pointer" id="opt-child-seat" type="checkbox" />
                      <div>
                        <label className="font-body-sm font-semibold text-[#171A18] text-[13px] block cursor-pointer" htmlFor="opt-child-seat">Bespoke ISOFIX Child Seat</label>
                        <div className="font-label-mono text-[11px] text-[#737973]">€20.00 / day · Bespoke tailored leatherette</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-spec-numeral text-[13px] font-semibold text-[#171A18]">€80.00</span>
                      <span className="block font-label-mono text-[9px] text-[#344A3D] uppercase font-bold">+€20 REVISED</span>
                    </div>
                  </div>
                  {/* Provision 4 (Inactive) */}
                  <div className="p-3.5 flex items-center justify-between gap-3 bg-[#EAE8E1]/20 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-3">
                      <input className="w-4 h-4 rounded-none border border-[#171A18] accent-[#344A3D] cursor-pointer" id="opt-luggage-box" type="checkbox" />
                      <div>
                        <label className="font-body-sm text-[#424844] text-[13px] block cursor-pointer" htmlFor="opt-luggage-box">Alpine Luggage Telemetry Box (Rimowa Edition)</label>
                        <div className="font-label-mono text-[11px] text-[#737973]">€35.00 / day · Aerodynamic roof fitment</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-spec-numeral text-[13px] text-[#737973]">€0.00</span>
                      <span className="block font-label-mono text-[9px] text-[#737973] uppercase">INACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 05: Live Availability Indicator */}
              <div className="pt-6">
                <div className="p-3.5 bg-[#EBF0EC] border border-[#344A3D] flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#344A3D] text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-label-mono text-[11px] text-[#1e3327] uppercase tracking-wide leading-snug font-medium">AVAILABLE FOR REVISED DATES · EXHIBIT 08 ALLOCATED (12 JUN – 16 JUN 2025)</span>
                </div>
              </div>
              {/* Section 06: Price Difference & Variance Ledger */}
              <div className="pt-6 pb-2">
                <div className="bg-[#EAE8E1] border border-[#D8D6CE] p-4 space-y-3">
                  <div className="font-label-mono text-[11px] uppercase tracking-[0.16em] text-[#737973] pb-2 border-b border-[#D8D6CE]">VARIANCE LEDGER · MODIFICATION BREAKDOWN</div>
                  <div className="space-y-1.5 font-label-mono text-[12px] text-[#424844]">
                    <div className="flex justify-between">
                      <span>ORIGINAL TOTAL (3 DAYS):</span>
                      <span className="text-[#171A18]">€1,731.45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>REVISED TOTAL (4 DAYS + PROVISIONS):</span>
                      <span className="text-[#171A18] font-bold">€2,121.45</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-[#D8D6CE]">
                      <span className="font-label-mono text-[11px] uppercase tracking-wider text-[#344A3D] font-bold">VARIANCE ADJUSTMENT:</span>
                      <span className="font-spec-numeral text-[16px] text-[#344A3D] font-bold">+€390.00 DUE</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D8D6CE]/60"><p className="font-body-sm text-[11px] text-[#59685a] leading-relaxed">Includes statutory 19% VAT (€338.72) and all custodial insurance. The difference is due at the curbside handover; nothing is charged online.</p></div>
                </div>
              </div>
            </div>
            {/* Sticky Drawer Footer */}
            <div className="p-6 border-t border-[#D8D6CE] bg-[#F5F3EE] shrink-0 flex items-center justify-between gap-4">
              <Link className="font-action text-[13px] uppercase tracking-[0.1em] text-[#424844] hover:text-[#171A18] transition-colors py-3 px-2" href="/account/reservations/hld-0612-4821">Discard changes</Link>
              <button className="h-[52px] px-7 bg-[#344A3D] hover:bg-[#1e3327] text-[#F5F3EE] font-action text-[13px] font-semibold uppercase tracking-[0.14em] rounded-[2px] transition-colors flex items-center gap-2 group shadow-none" disabled={saving} onClick={confirmChanges} type="button">
                <span>{saving ? "Confirming custody…" : "Confirm changes (+€390.00)"}</span>
                {" "}
                <span className="text-[16px] transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
          {/* Client-side micro-interaction behaviors */}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
