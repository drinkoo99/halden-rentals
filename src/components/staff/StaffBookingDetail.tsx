"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_booking_detail/code.html */
const ACTIONS = ["Mark Documents Verified & Ready for Staging", "Hand Over Vehicle to Patron", "Complete Return & Release Escrow"];

export function StaffBookingDetail() {
  const [action, setAction] = useState(0);
  const [draft, setDraft] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <aside aria-label="Console navigation" className="fixed left-0 top-0 h-full w-60 bg-on-tertiary-fixed text-inverse-on-surface z-50 flex flex-col border-r border-tertiary">
        <div className="h-14 px-6 flex items-center border-b border-tertiary"><span className="font-headline-sm text-headline-sm tracking-widest uppercase text-inverse-on-surface">HALDEN</span></div>
        <div className="px-4 py-4 border-b border-tertiary">
          <label className="block font-label-mono text-label-mono uppercase text-on-tertiary-container mb-2">ACTIVE HUB</label>
          <select aria-label="Active hub" className="w-full bg-tertiary text-on-tertiary font-label-mono text-label-mono uppercase px-3 py-2 rounded-none border border-tertiary-container focus:outline-hidden focus:border-primary-fixed">
            <option value="all">ALL HUBS</option>
            <option value="muc">MUC — MUNICH</option>
            <option value="zrh">ZRH — ZURICH</option>
            <option value="gva">GVA — GENEVA</option>
            <option value="mxp">MXP — MILAN</option>
            <option value="vie">VIE — VIENNA</option>
          </select>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1">
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff">OVERVIEW</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase bg-primary text-on-primary font-bold transition-colors" href="/staff/bookings">BOOKINGS</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/fleet">FLEET</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/availability">AVAILABILITY</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/customers">CUSTOMERS</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff/fleet">PRICING</Link>
          <Link className="px-6 py-2.5 font-label-mono text-label-mono uppercase text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary transition-colors" href="/staff">SETTINGS</Link>
        </nav>
        <div className="px-6 py-4 border-t border-tertiary"><span className="font-label-mono text-label-mono uppercase text-on-tertiary-container">CONSOLE V2.4</span></div>
      </aside>
      <div className="pl-60">
        <header className="fixed top-0 left-60 right-0 h-14 bg-surface border-b border-outline-variant z-40 px-8 flex items-center justify-between">
          <div className="flex items-center w-96">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input className="w-full bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-9 pr-3 py-1.5 rounded-none border border-outline-variant focus:outline-hidden focus:border-primary placeholder:text-on-surface-variant" placeholder="Search booking ref, plate, customer..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">THU 24 OCT 2024</span>
            <button aria-label="Notifications" className="relative flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <span className="font-body-sm text-body-sm text-on-surface">M. Weber</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
          </div>
        </header>
        <main className="relative pt-14 w-full px-8 bg-surface">
          <div className="flex flex-col w-full pb-16">
            {/* Top Navigation & Dossier Command Header */}
            <header className="w-full border-b border-outline-variant pb-6 mb-8 pt-4">
              {/* Breadcrumb & System Timestamp */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant tracking-wider">
                  <Link className="hover:text-primary transition-colors" href="/staff">CONSOLE</Link>
                  <span>{"//"}</span>
                  <Link className="hover:text-primary transition-colors" href="/staff/bookings">BOOKINGS</Link>
                  <span>{"//"}</span>
                  <span className="text-on-surface font-bold">DOSSIER HLD-0612-4821</span>
                </div>
                <div className="flex items-center gap-3 font-label-mono text-label-mono uppercase text-on-surface-variant">
                  <span>SECURITY PROTOCOL: ISO-27001 VAULTED</span>
                  <span>·</span>
                  <span className="text-primary font-bold">{"MUC HUBS // GATE 4"}</span>
                </div>
              </div>
              {/* Main Dossier Title Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Dossier: HLD-0612-4821</h1>
                  {/* Status Indicator Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-outline-variant">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    <span className="font-label-mono text-label-mono uppercase text-primary font-bold tracking-widest">CONFIRMED</span>
                  </div>
                  {/* Escrow Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-outline-variant">
                    <span className="material-symbols-outlined text-[15px] text-on-surface-variant">lock</span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface tracking-wider">PRE-AUTH OK: €3,500 ESCROW SECURED</span>
                  </div>
                </div>
                {/* Action Suite */}
                <div className="flex items-center flex-wrap gap-2.5">
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-on-surface text-on-surface hover:bg-surface-container transition-colors font-action text-action uppercase tracking-wider" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    {" "}
                    <span>Manifest PDF</span>
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-on-surface text-on-surface hover:bg-surface-container transition-colors font-action text-action uppercase tracking-wider" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[16px]">print</span>
                    {" "}
                    <span>Handover Dossier</span>
                  </button>
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary hover:bg-primary-container transition-colors font-action text-action uppercase tracking-wider" id="btnNextAction" onClick={() => setAction((a) => (a + 1) % ACTIONS.length)} type="button">
                    <span>{ACTIONS[action]}</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </header>
            {/* Two-Column Asymmetric Architectural Work Desk */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ======================================================== */}
              {/* LEFT COLUMN: Primary Manifest, Vehicle & Financial Specs (58%) */}
              {/* ======================================================== */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Customer Card */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"CLIENT RECORD // ARCHIVE"}</span>
                      <span className="font-label-mono text-label-mono text-on-surface font-bold">#PT-88402</span>
                    </div>
                    <span className="font-label-mono text-label-mono uppercase px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-bold tracking-wider">Patron Circle — Tier II</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-1">Patron Designation</div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">Clara von Bergmann</h2>
                      <div className="mt-2 space-y-1">
                        <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">mail</span>
                          <span className="text-on-surface select-all">c.vonbergmann@munich-atelier.de</span>
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">call</span>
                          <span className="text-on-surface font-spec-numeral text-spec-numeral">+49 89 2109 4432</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l border-outline-variant md:pl-6 flex flex-col justify-between">
                      <div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-1">Licence Accreditation</div>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-bold">Germany (DE) · № B074R881920</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-surface-container-high border border-outline-variant font-label-mono text-label-mono text-primary font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                            {" "}{"VALIDATED // KBA CONFIRMED"}
                          </span>
                          <button className="font-label-mono text-label-mono uppercase text-on-surface-variant underline hover:text-primary" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">[ Re-verify ]</button>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-outline-variant font-body-sm text-body-sm text-on-surface-variant">
                        <span className="text-on-surface font-medium">4 prior completed expeditions</span>
                        {" "}· 0 damage incidents · Preferred hub:{" "}
                        <span className="font-spec-numeral text-on-surface">MUC</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Itinerary & Staging Section */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"ALLOCATED CHASSIS // FLEET EXHIBIT"}</span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface tracking-wider">{"CHASSIS REF 088 // MUNICH"}</span>
                  </div>
                  {/* Vehicle Placard */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-6 overflow-hidden border border-outline-variant bg-surface-container"><Photo src={media.rangeRoverStudio} alt="Range Rover Autobiography" className="w-full aspect-[3/2] object-cover transition-transform duration-500 hover:scale-105" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                    <div className="md:col-span-6 flex flex-col justify-between h-full py-1">
                      <div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant tracking-wider">SPECIFICATION № 4821</div>
                        <h3 className="font-headline-md text-headline-md text-on-surface leading-tight mt-1">Range Rover Autobiography</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Exterior Finish: Meteorite Silver · Ebony Semi-Aniline</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-outline-variant mt-4 font-label-mono text-label-mono">
                        <div>
                          <span className="text-on-surface-variant block uppercase">Official Plate</span>
                          <span className="text-on-surface font-bold text-spec-numeral font-spec-numeral">M-HL 4821</span>
                        </div>
                        <div>
                          <span className="text-on-surface-variant block uppercase">Chassis VIN</span>
                          <span className="text-on-surface font-spec-numeral text-spec-numeral uppercase truncate block" title="SALWR2V47PA109283">...109283</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Itinerary Schedule Table */}
                  <div className="border border-outline-variant bg-surface-container p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1 border-b md:border-b-0 md:border-r border-outline-variant pb-3 md:pb-0 md:pr-4">
                        <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-primary font-bold">
                          <span className="material-symbols-outlined text-[16px]">flight_land</span>
                          <span>DEPARTURE PROTOCOL</span>
                        </div>
                        <div className="font-body-md text-body-md text-on-surface font-medium">Munich Franz Josef Strauss (MUC VIP T2)</div>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface-variant">12 Jun 2025 · 10:00 CEST</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Curbside FBO Tarmac Escrow · Gate 14-B</div>
                      </div>
                      <div className="flex flex-col gap-1 md:pl-2">
                        <div className="flex items-center gap-2 font-label-mono text-label-mono uppercase text-on-surface-variant font-bold">
                          <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
                          <span>RETURN PROTOCOL</span>
                        </div>
                        <div className="font-body-md text-body-md text-on-surface font-medium">Munich Franz Josef Strauss (MUC VIP T2)</div>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface-variant">15 Jun 2025 · 10:00 CEST</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">{"Mechanical Inspection & Custody Reception"}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between font-label-mono text-label-mono uppercase text-on-surface-variant">
                      <span>
                        DURATION:{" "}
                        <strong className="text-on-surface">3 DIURNAL CYCLES (72 HOURS)</strong>
                      </span>
                      <span>
                        DISTANCE ALLOWANCE:{" "}
                        <strong className="text-on-surface">750 KM (250 KM/DAY)</strong>
                      </span>
                    </div>
                  </div>
                </div>
                {/* Curated Provisions & Staging Extras */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"CURATED PROVISIONS & VEHICLE ATELIER EXTRAS"}</span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">4 ITEMS CERTIFIED</span>
                  </div>
                  <ul className="space-y-3 font-body-sm text-body-sm">
                    <li className="flex items-start justify-between border-b border-outline-variant pb-2.5">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">verified_user</span>
                        <div>
                          <span className="font-medium text-on-surface block">Zero-Excess Comprehensive Indemnity</span>
                          <span className="text-on-surface-variant text-[12px]">{"€0.00 deductible waiver · Glass & Underbody Alpine coverage"}</span>
                        </div>
                      </div>
                      {" "}
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">INCLUDED</span>
                    </li>
                    <li className="flex items-start justify-between border-b border-outline-variant pb-2.5">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">confirmation_number</span>
                        <div>
                          <span className="font-medium text-on-surface block">{"Swiss & Austrian Alpine Toll Vignettes Pre-affixed"}</span>
                          <span className="text-on-surface-variant text-[12px]">Dual confederation digital transponder validation 2025</span>
                        </div>
                      </div>
                      {" "}
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€45.00</span>
                    </li>
                    <li className="flex items-start justify-between border-b border-outline-variant pb-2.5">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">restaurant</span>
                        <div>
                          <span className="font-medium text-on-surface block">{"Michelin Star Hamper & Curated Mineral Water Staging"}</span>
                          <span className="text-on-surface-variant text-[12px]">Käfer Munich artisan provision, San Pellegrino Riserva, chilled trunk cellar</span>
                        </div>
                      </div>
                      {" "}
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€240.00</span>
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px] text-primary mt-0.5">ac_unit</span>
                        <div>
                          <span className="font-medium text-on-surface block">Integrated Alpine Tire Chains (K-Summit Pro)</span>
                          <span className="text-on-surface-variant text-[12px]">High-altitude pass compliant · Fitted in boot storage recess</span>
                        </div>
                      </div>
                      {" "}
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">INCLUDED</span>
                    </li>
                  </ul>
                </div>
                {/* Price Breakdown & Fiscal Matrix */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"FISCAL BREAKDOWN // CLEARING MATRIX"}</span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">CURRENCY: EUR (€)</span>
                  </div>
                  <div className="space-y-2.5 font-body-sm text-body-sm">
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>Base Diurnal Tariff (3 Diurnal Cycles × €390.00)</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€1,170.00</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>Peak Weekend Allocation Surcharge</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€120.00</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>{"Curated Provisions & Staging Extra Services"}</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€285.00</span>
                    </div>
                    <div className="border-t border-outline-variant pt-2 flex justify-between items-center text-on-surface-variant">
                      <span>Subtotal (Net Excl. VAT)</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">€1,575.00</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>VAT / MwSt (Applicable 7.7% CH / 19% DE cross-border allocation)</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€156.45</span>
                    </div>
                    <div className="border-t-2 border-on-surface pt-3 flex justify-between items-baseline">
                      <div>
                        <span className="font-headline-sm text-headline-sm text-on-surface block leading-none">Total Tariff Cleared</span>
                        <span className="font-label-mono text-label-mono uppercase text-primary font-bold">PAID / SETTLED VIA PAY AT HANDOVER</span>
                      </div>
                      <span className="font-spec-numeral text-[24px] text-on-surface font-bold">€1,731.45</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-surface-container border border-outline-variant flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-primary">account_balance</span>
                      <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">Security Escrow Deposit</span>
                    </div>
                    <div className="text-right">
                      <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold block">€3,500.00</span>
                      <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">HELD IN SWISS CANTONAL ESCROW</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================================================== */}
              {/* RIGHT COLUMN: Workflow Timeline, Checklists, Notes & Audit (42%) */}
              {/* ======================================================== */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                {/* Status Timeline */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">OPERATIONAL LIFECYCLE</span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface font-bold">STEP 3 OF 6 COMPLETE</span>
                  </div>
                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-outline-variant">
                    {/* Step 1 */}
                    <div className="relative flex items-start justify-between">
                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary border-2 border-surface-container-low" />
                      <div>
                        <div className="font-body-sm text-body-sm font-semibold text-on-surface">1. Dossier Requested</div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">Patron Portal Submission</div>
                      </div>
                      <span className="font-spec-numeral text-label-mono text-on-surface-variant">20 May 09:14</span>
                    </div>
                    {/* Step 2 */}
                    <div className="relative flex items-start justify-between">
                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary border-2 border-surface-container-low" />
                      <div>
                        <div className="font-body-sm text-body-sm font-semibold text-on-surface">2. Patron Identity Verified</div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"Biometric Passport & KBA Validated"}</div>
                      </div>
                      <span className="font-spec-numeral text-label-mono text-on-surface-variant">20 May 10:30</span>
                    </div>
                    {/* Step 3 */}
                    <div className="relative flex items-start justify-between">
                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-primary border-2 border-surface-container-low" />
                      <div>
                        <div className="font-body-sm text-body-sm font-semibold text-on-surface">{"3. Confirmed & Pre-Auth Captured"}</div>
                        <div className="font-label-mono text-label-mono uppercase text-primary font-bold">Escrow €3,500.00 Active</div>
                      </div>
                      <span className="font-spec-numeral text-label-mono text-on-surface-variant">20 May 10:32</span>
                    </div>
                    {/* Step 4 (Current) */}
                    <div className="relative flex items-start justify-between">
                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full border-2 border-amber-600 bg-surface-container-low" />
                      <div>
                        <div className="font-body-sm text-body-sm font-bold text-on-surface">{"4. Chassis Staging & Pre-Check"}</div>
                        <div className="font-label-mono text-label-mono uppercase text-amber-700 font-semibold">{"Active Milestone // Pending Verification"}</div>
                      </div>
                      <span className="font-spec-numeral text-label-mono text-on-surface-variant">11 Jun 16:00</span>
                    </div>
                    {/* Step 5 */}
                    <div className="relative flex items-start justify-between opacity-50">
                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full border border-outline bg-surface-container-low" />
                      <div>
                        <div className="font-body-sm text-body-sm font-medium text-on-surface">5. VIP Curbside Handover</div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">MUC T2 Private Apron</div>
                      </div>
                      <span className="font-spec-numeral text-label-mono text-on-surface-variant">12 Jun 10:00</span>
                    </div>
                    {/* Step 6 */}
                    <div className="relative flex items-start justify-between opacity-50">
                      <span className="absolute -left-6 top-1 w-3 h-3 rounded-full border border-outline bg-surface-container-low" />
                      <div>
                        <div className="font-body-sm text-body-sm font-medium text-on-surface">{"6. Return & Mechanical Custody"}</div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"De-staging & Escrow Release"}</div>
                      </div>
                      <span className="font-spec-numeral text-label-mono text-on-surface-variant">15 Jun 10:00</span>
                    </div>
                  </div>
                </div>
                {/* Handover Staging Checklist Panel */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"HANDOVER PROTOCOL // STAGING CHECKLIST"}</span>
                    <span className="font-label-mono text-label-mono uppercase text-primary font-bold">2/4 TASKS</span>
                  </div>
                  <div className="space-y-4">
                    {/* Item 1 */}
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary border border-on-surface" type="checkbox" />
                      {" "}
                      <div className="flex-1">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium block">Fuel level verified (100% 98-RON Super Plus)</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Tank pressure sealed · Calibrated sensor OK</span>
                      </div>
                    </label>
                    {/* Item 2 */}
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary border border-on-surface" type="checkbox" />
                      {" "}
                      <div className="flex-1">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium block">Odometer reading confirmed (14,820 km)</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Telematics telemetry synchronised</span>
                      </div>
                    </label>
                    {/* Item 3: Inspection Photos */}
                    <div className="pt-2 border-t border-outline-variant">
                      <label className="flex items-start gap-3 cursor-pointer select-none mb-3">
                        <input className="mt-1 w-4 h-4 rounded-none accent-primary border border-on-surface" type="checkbox" />
                        {" "}
                        <div className="flex-1">
                          <span className="font-body-sm text-body-sm text-on-surface font-medium block">Pre-handover exterior inspection (2/4 photos uploaded)</span>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Macro scan: 2 angles pending technician upload</span>
                        </div>
                      </label>
                      {/* 2 Uploaded Inspection Photos Gallery */}
                      <div className="grid grid-cols-2 gap-3 pl-7">
                        <div className="border border-outline-variant bg-surface p-2">
                          <Photo src={media.rangeRoverHeadlight} alt="Front Left Quarter Headlight Macro" className="w-full aspect-square object-cover" sizes="(max-width: 767px) 100vw, 14vw" />
                          <div className="mt-2 font-label-mono text-[10px] uppercase text-on-surface font-bold leading-tight">Front Left Quarter</div>
                          <div className="font-label-mono text-[9px] text-primary uppercase">Status: Pristine</div>
                        </div>
                        <div className="border border-outline-variant bg-surface p-2">
                          <Photo src={media.rangeRoverWheel} alt="Alloy 23-inch Wheel Macro" className="w-full aspect-square object-cover" sizes="(max-width: 767px) 100vw, 14vw" />
                          <div className="mt-2 font-label-mono text-[10px] uppercase text-on-surface font-bold leading-tight">Alloy 23-inch</div>
                          <div className="font-label-mono text-[9px] text-primary uppercase">Status: 0 Scratches</div>
                        </div>
                      </div>
                    </div>
                    {/* Item 4 */}
                    <label className="flex items-start gap-3 cursor-pointer select-none pt-2 border-t border-outline-variant">
                      <input className="mt-1 w-4 h-4 rounded-none accent-primary border border-on-surface" type="checkbox" />
                      {" "}
                      <div className="flex-1">
                        <span className="font-body-sm text-body-sm text-on-surface font-medium block">Patron digital signature captured</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Handover terminal pad ready for tarmac sync</span>
                      </div>
                    </label>
                  </div>
                </div>
                {/* Internal Staff Directives & Notes */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">{"CONCIERGE DIRECTIVES & NOTES"}</span>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">INTERNAL USE ONLY</span>
                  </div>
                  {/* Add note input */}
                  <div className="flex flex-col gap-2">
                    <textarea className="w-full bg-surface border border-outline-variant p-3 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-hidden focus:border-primary resize-none rounded-none" id="staffNoteInput" placeholder="Add internal staff directive or client preference note..." rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} />
                    <div className="flex justify-end"><button className="px-3 py-1.5 bg-tertiary text-on-tertiary hover:bg-on-tertiary-fixed font-action text-action uppercase tracking-wider" id="postNoteBtn" onClick={() => {
                      if (!draft.trim()) return;
                      setNotes((n) => [draft.trim(), ...n]);
                      setDraft("");
                    }} type="button">+ Post Note</button></div>
                  </div>
                  {/* Prior Notes List */}
                  <div className="space-y-3 pt-2" id="notesContainer">
                    {notes.map((n, i) => (
                      <div key={notes.length - i} className="border-l-2 border-primary bg-surface p-3 font-body-sm text-body-sm">
                        <p className="text-on-surface italic">“{n}”</p>
                        <div className="mt-1.5 font-label-mono text-[10px] text-on-surface-variant uppercase flex justify-between">
                          <span>M. Weber · Operations Staff</span>
                          <span>Just now</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-l-2 border-primary bg-surface p-3 font-body-sm text-body-sm">
                      <p className="text-on-surface italic">{"\"Client requested child booster seat removed prior to 10:00 arrival. Vehicle conditioned to 20.5°C.\""}</p>
                      <div className="mt-1.5 font-label-mono text-[10px] text-on-surface-variant uppercase flex justify-between">
                        <span>M. Weber · Concierge Operations</span>
                        <span>22 May 11:15 CEST</span>
                      </div>
                    </div>
                    <div className="border-l-2 border-outline bg-surface p-3 font-body-sm text-body-sm">
                      <p className="text-on-surface italic">{"\"VIP FBO arrival via NetJets flight NJE-401. Liaison Julian von Berg handling tarmac escort.\""}</p>
                      <div className="mt-1.5 font-label-mono text-[10px] text-on-surface-variant uppercase flex justify-between">
                        <span>E. Rostova · Airfield Diplomatic Hub</span>
                        <span>21 May 16:40 CEST</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Immutable Archival Audit Log */}
                <div className="bg-surface-container-low border border-outline-variant p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">history</span>
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">IMMUTABLE ARCHIVAL AUDIT LOG</span>
                    </div>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">SHA-256 LEDGER</span>
                  </div>
                  <div className="space-y-2.5 font-spec-numeral text-[12px] leading-snug">
                    <div className="text-on-surface-variant hover:text-on-surface transition-colors pb-2 border-b border-outline-variant">
                      <span className="text-on-surface font-semibold">20 May 10:32:04 CEST</span>
                      {" "}·{" "}
                      <span className="text-primary font-bold">SYSTEM</span>
                      {" "}· Pre-authorisation of €3,500.00 successful (Txn #TX-90142981)
                    </div>
                    <div className="text-on-surface-variant hover:text-on-surface transition-colors pb-2 border-b border-outline-variant">
                      <span className="text-on-surface font-semibold">20 May 10:30:12 CEST</span>
                      {" "}·{" "}
                      <span className="font-medium text-on-surface">E. Rostova</span>
                      {" "}· Driving licence verification confirmed via KBA API
                    </div>
                    <div className="text-on-surface-variant hover:text-on-surface transition-colors">
                      <span className="text-on-surface font-semibold">20 May 09:14:48 CEST</span>
                      {" "}·{" "}
                      <span className="font-medium text-on-surface">Clara von Bergmann</span>
                      {" "}· Dossier created via HALDEN Patron Portal
                    </div>
                  </div>
                </div>
                {/* Destructive Danger Zone */}
                <div className="border border-[#B94A48] bg-surface-container-low p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#B94A48]/30 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#B94A48]">warning</span>
                      <span className="font-label-mono text-label-mono uppercase text-[#B94A48] font-bold">DESTRUCTIVE TERMINATION PROTOCOL</span>
                    </div>
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">SUPERVISOR OVERRIDE</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Cancelling this confirmed reservation dossier triggers immediate escrow release and notifies the Munich VIP FBO operations team. Full refund policy adheres to Tier II status.</p>
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block font-label-mono text-label-mono uppercase text-on-surface-variant mb-1">Termination Cause Mandatory Justification</label>
                      <select aria-label="Cancellation cause" className="w-full bg-surface text-on-surface font-label-mono text-label-mono uppercase p-2 border border-outline-variant focus:outline-hidden focus:border-[#B94A48] rounded-none">
                        <option value="patron">Patron request (Within cancellation window — 100% refund)</option>
                        <option value="operational">Operational chassis conflict / Hub maintenance</option>
                        <option value="force_majeure">Alpine meteorological alert / Force majeure</option>
                      </select>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-label-mono text-label-mono text-[#B94A48] uppercase font-bold">{"100% ESCROW & TARIFF REFUND APPLIES"}</span>
                      <button className="px-4 py-2 border border-[#B94A48] text-[#B94A48] hover:bg-[#B94A48] hover:text-white transition-colors font-action text-action uppercase tracking-wider" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Cancel Booking Dossier</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
