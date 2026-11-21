"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "HALDEN — Operations Console" — generated from design/stitch-export-round2/halden_staff_console_availability_planner/code.html */
export function StaffAvailability() {
  const [blocking, setBlocking] = useState(true);
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <aside className="fixed left-0 top-0 h-full w-60 bg-on-tertiary-fixed text-inverse-on-surface z-50 flex flex-col border-r border-tertiary">
        <div className="h-14 px-6 flex items-center border-b border-tertiary"><span className="font-headline-sm text-headline-sm tracking-widest uppercase text-inverse-on-surface">HALDEN</span></div>
        <div className="px-4 py-4 border-b border-tertiary">
          <label className="block font-label-mono text-label-mono uppercase text-on-tertiary-container mb-2">ACTIVE HUB</label>
          <select className="w-full bg-tertiary text-on-tertiary font-label-mono text-label-mono uppercase px-3 py-2 rounded-none border border-tertiary-container focus:outline-hidden focus:border-primary-fixed">
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
            {/* Top Archival Navigation & Breadcrumbs */}
            <div className="pt-6 pb-4 border-b border-[#D8D6CE] flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-label-mono text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
                  <span>CONSOLE</span>
                  <span>{"//"}</span>
                  <span>{"LOGISTICS & DISPATCH"}</span>
                  <span>{"//"}</span>
                  <span className="text-primary font-bold">AVAILABILITY CALENDAR</span>
                </div>
                <div className="flex items-baseline gap-4 flex-wrap">
                  <h1 className="font-display text-headline-lg text-on-surface tracking-tight">Availability</h1>
                  <div className="font-label-mono text-label-mono text-on-surface-variant uppercase bg-surface-container-high px-2.5 py-0.5 tracking-wider border border-[#D8D6CE]">{"[34 ACTIVE CHASSIS // 28 DIURNAL TIMELINE]"}</div>
                </div>
              </div>
              {/* Quick KPIs & Legend in Archival Row */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-5 border-r border-[#D8D6CE] pr-6">
                  <div>
                    <span className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">ALLOCATION RATE</span>
                    <span className="font-spec-numeral text-headline-sm font-semibold text-primary">
                      82.4%{" "}
                      <span className="text-xs text-on-surface-variant font-normal">(28/34)</span>
                    </span>
                  </div>
                  <div>
                    <span className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">MAINTENANCE</span>
                    <span className="font-spec-numeral text-headline-sm font-semibold text-on-surface">
                      3{" "}
                      <span className="text-xs text-on-surface-variant font-normal">Units</span>
                    </span>
                  </div>
                  <div>
                    <span className="block font-label-mono text-[10px] text-error uppercase tracking-widest">CONFLICTS</span>
                    <span className="font-spec-numeral text-headline-sm font-bold text-error">
                      1{" "}
                      <span className="text-xs text-error font-normal">Active</span>
                    </span>
                  </div>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-3 font-label-mono text-[10px] uppercase text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 bg-primary-container inline-block" />
                    <span>Confirmed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border border-[#4d6355] inline-block bg-[repeating-linear-gradient(45deg,#cfe9d7,#cfe9d7_2px,#f3f4f0_2px,#f3f4f0_6px)]" />
                    <span>Maintenance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border border-on-surface inline-block bg-surface" />
                    <span>Tentative Hold</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border border-error bg-error-container/40 inline-flex items-center justify-center text-error font-bold leading-none">!</span>
                    <span className="text-error font-bold">Conflict</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Operational Control Toolbar */}
            <div className="py-3.5 bg-surface-container-low border-b border-[#D8D6CE] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Hub Selector Pill */}
                <div className="flex items-center bg-surface border border-[#D8D6CE] px-3 py-1.5">
                  <span className="font-label-mono text-[10px] uppercase text-on-surface-variant mr-2">HUB:</span>
                  <select className="bg-transparent font-action text-action text-on-surface uppercase focus:outline-hidden cursor-pointer" defaultValue="ALL HUBS (5 REGIONS)">
                    <option>ALL HUBS (5 REGIONS)</option>
                    <option>MUC — MUNICH AIRPORT / VIP</option>
                    <option>ZRH — ZURICH KLOTEN</option>
                    <option>GVA — GENEVA COINTRIN</option>
                    <option>MXP — MILAN MALPENSA</option>
                    <option>VIE — VIENNA SCHWECHAT</option>
                  </select>
                </div>
                {/* Category Selector */}
                <div className="flex items-center bg-surface border border-[#D8D6CE] px-3 py-1.5">
                  <span className="font-label-mono text-[10px] uppercase text-on-surface-variant mr-2">CLASS:</span>
                  <select className="bg-transparent font-action text-action text-on-surface uppercase focus:outline-hidden cursor-pointer" defaultValue="ALL CATEGORIES">
                    <option>ALL CATEGORIES</option>
                    <option>HERITAGE / CLASSIC</option>
                    <option>GRAND TOURING</option>
                    <option>EXECUTIVE SALOON</option>
                    <option>HIGH ALTITUDE SUV</option>
                    <option>MOTORSPORT TOURING</option>
                  </select>
                </div>
                {/* Date Span Controls */}
                <div className="flex items-center bg-surface border border-[#D8D6CE]">
                  <button className="px-2.5 py-1.5 border-r border-[#D8D6CE] hover:bg-surface-container transition-colors text-on-surface flex items-center justify-center" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                  <button className="px-3 py-1.5 font-label-mono text-[11px] uppercase tracking-wider text-primary border-r border-[#D8D6CE] hover:bg-surface-container transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">TODAY</button>
                  <div className="px-3.5 py-1.5 font-label-mono text-spec-numeral text-on-surface font-medium tracking-wide">
                    24 OCT 2024 — 20 NOV 2024{" "}
                    <span className="text-xs text-on-surface-variant uppercase font-normal">(4 WEEKS)</span>
                  </div>
                  <button className="px-2.5 py-1.5 border-l border-[#D8D6CE] hover:bg-surface-container transition-colors text-on-surface flex items-center justify-center" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
                </div>
              </div>
              {/* Zoom & Actions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#D8D6CE] bg-surface p-0.5">
                  <button className="px-2.5 py-1 font-label-mono text-[10px] uppercase bg-primary text-on-primary font-bold" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">4 WEEKS (DIURNAL)</button>
                  <button className="px-2.5 py-1 font-label-mono text-[10px] uppercase text-on-surface hover:bg-surface-container transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">8 WEEKS</button>
                  <button className="px-2.5 py-1 font-label-mono text-[10px] uppercase text-on-surface hover:bg-surface-container transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">QUARTER</button>
                </div>
                <button className="px-3 py-1.5 border border-[#171A18] bg-surface hover:bg-surface-container font-action text-action text-on-surface uppercase tracking-wider flex items-center gap-1.5 transition-colors" id="btn-open-block-modal" aria-expanded={blocking} onClick={() => setBlocking((b) => !b)} type="button">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  {" "}
                  <span>Block Dates</span>
                </button>
                <button className="px-3 py-1.5 border border-[#D8D6CE] bg-surface hover:bg-surface-container font-action text-action text-on-surface uppercase tracking-wider flex items-center gap-1.5 transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  {" "}
                  <span>Manifest</span>
                </button>
              </div>
            </div>
            {/* Interactive Timeline / Gantt Matrix Architecture */}
            <div className="relative w-full overflow-x-auto border border-[#D8D6CE] bg-surface mt-4 selection:bg-primary-fixed">
              <div className="min-w-[1340px] flex flex-col">
                {/* Week Header Band */}
                <div className="flex border-b border-[#D8D6CE] bg-surface-container sticky top-0 z-30">
                  {/* Chassis Header Anchor */}
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center justify-between bg-surface-container-high">
                    <span className="font-label-mono text-[10px] tracking-widest text-on-surface uppercase font-bold">{"CHASSIS & SPECIFICATION (34)"}</span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-pointer hover:text-on-surface">filter_list</span>
                  </div>
                  {/* 4 Calendar Weeks */}
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE]">
                    <div className="col-span-4 px-2 py-1 bg-surface-container font-label-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold border-b border-[#D8D6CE]/60">{"WEEK 43 // 24—27 OCT"}</div>
                    <div className="col-span-7 px-2 py-1 bg-surface-container font-label-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold border-b border-[#D8D6CE]/60">{"WEEK 44 // 28 OCT—03 NOV"}</div>
                    <div className="col-span-7 px-2 py-1 bg-surface-container font-label-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold border-b border-[#D8D6CE]/60">{"WEEK 45 // 04—10 NOV"}</div>
                    <div className="col-span-7 px-2 py-1 bg-surface-container font-label-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold border-b border-[#D8D6CE]/60">{"WEEK 46 // 11—17 NOV"}</div>
                    <div className="col-span-3 px-2 py-1 bg-surface-container font-label-mono text-[10px] tracking-widest uppercase text-on-surface-variant font-semibold border-b border-[#D8D6CE]/60">{"WEEK 47 // 18—20 NOV"}</div>
                  </div>
                </div>
                {/* Diurnal Days Header (28 Columns) */}
                <div className="flex border-b border-[#D8D6CE] bg-surface-container-low text-center sticky top-[29px] z-30">
                  {/* Search filter inside chassis fixed panel */}
                  <div className="w-[300px] shrink-0 px-2.5 py-1.5 border-r border-[#D8D6CE] flex items-center bg-surface">
                    <span className="material-symbols-outlined text-[14px] text-on-surface-variant mr-1.5">search</span>
                    <input className="w-full text-[11px] font-label-mono uppercase bg-transparent border-none focus:outline-hidden placeholder:text-outline text-on-surface" placeholder="Filter plate, ref, or vin..." type="text" />
                  </div>
                  {/* 28 Diurnal Column Labels */}
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] font-label-mono text-[10px]">
                    {/* Week 43 (Thu-Sun) */}
                    <div className="py-1 bg-primary/10 font-bold text-primary flex flex-col justify-center relative">
                      <span className="text-[9px] leading-tight">TH</span>
                      <span className="text-xs">24</span>
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">FR</span>
                      <span className="text-xs">25</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SA</span>
                      <span className="text-xs">26</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SU</span>
                      <span className="text-xs">27</span>
                    </div>
                    {/* Week 44 */}
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">MO</span>
                      <span className="text-xs">28</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TU</span>
                      <span className="text-xs">29</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">WE</span>
                      <span className="text-xs">30</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TH</span>
                      <span className="text-xs">31</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">FR</span>
                      <span className="text-xs">01</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SA</span>
                      <span className="text-xs">02</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SU</span>
                      <span className="text-xs">03</span>
                    </div>
                    {/* Week 45 */}
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">MO</span>
                      <span className="text-xs">04</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TU</span>
                      <span className="text-xs">05</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">WE</span>
                      <span className="text-xs">06</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TH</span>
                      <span className="text-xs">07</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">FR</span>
                      <span className="text-xs">08</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SA</span>
                      <span className="text-xs">09</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SU</span>
                      <span className="text-xs">10</span>
                    </div>
                    {/* Week 46 */}
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">MO</span>
                      <span className="text-xs">11</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TU</span>
                      <span className="text-xs">12</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">WE</span>
                      <span className="text-xs">13</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TH</span>
                      <span className="text-xs">14</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">FR</span>
                      <span className="text-xs">15</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SA</span>
                      <span className="text-xs">16</span>
                    </div>
                    <div className="py-1 bg-[#ECEAE4] flex flex-col justify-center text-on-surface-variant font-medium">
                      <span className="text-[9px] leading-tight">SU</span>
                      <span className="text-xs">17</span>
                    </div>
                    {/* Week 47 */}
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">MO</span>
                      <span className="text-xs">18</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">TU</span>
                      <span className="text-xs">19</span>
                    </div>
                    <div className="py-1 flex flex-col justify-center">
                      <span className="text-[9px] text-on-surface-variant leading-tight">WE</span>
                      <span className="text-xs">20</span>
                    </div>
                  </div>
                </div>
                {/* ROW 1: Range Rover Autobiography */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  {/* Chassis Spec Card (Sticky Left) */}
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.rangeRoverStudio} alt="Range Rover Autobiography" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">MUC</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">Range Rover Autobio.</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>M-HL 4821</span>
                        <span>•</span>
                        <span className="uppercase">V8 530PS</span>
                      </div>
                    </div>
                  </div>
                  {/* 28-Day Schedule Runway */}
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    {/* Base Day Cell Guides */}
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Absolute Timeline Blocks */}
                    {/* 1. Von Bergmann (Days 24-26 -> cols 1 to 3) */}
                    <div className="absolute top-2 bottom-2 left-[0%] w-[10.71%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10 hover:brightness-110 transition-all">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">VON BERGMANN</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">HLD-0612-4821</span>
                      </div>
                      <span className="material-symbols-outlined text-[13px] text-[#cfe9d7] shrink-0 ml-1">lock</span>
                    </div>
                    {/* Floating Hover Detail Popover (Visible State Demonstration anchored to Von Bergmann) */}
                    <div className="absolute -top-16 left-[5.5%] z-50 w-72 bg-surface-container-lowest border border-[#171A18] p-3 pointer-events-auto transition-all shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                      <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-1.5 mb-2">
                        <span className="font-label-mono text-[9px] tracking-widest uppercase text-on-surface-variant">{"DOSSIER REF // HLD-0612"}</span>
                        <span className="px-1 bg-primary text-on-primary font-label-mono text-[8px] uppercase tracking-wider">CONFIRMED</span>
                      </div>
                      <div className="space-y-1 text-on-surface">
                        <div className="font-headline-sm text-sm font-bold text-on-surface">
                          Clara von Bergmann{" "}
                          <span className="font-label-mono text-[10px] text-on-surface-variant font-normal">(Tier II)</span>
                        </div>
                        <div className="font-label-mono text-[10px] text-on-surface-variant">24 OCT 10:00 → 26 OCT 18:00 (3 DIURNAL)</div>
                        <div className="font-label-mono text-[10px] text-on-surface-variant">MUNICH T2 VIP ↔ RETURN SAME</div>
                        <div className="flex items-center justify-between pt-1 border-t border-[#D8D6CE] mt-2">
                          <span className="font-spec-numeral text-xs font-semibold text-primary">€1,731.45 SECURED</span>
                          <Link className="font-action text-[11px] text-primary underline uppercase tracking-wider hover:text-on-surface" href="/staff/bookings/hld-0612-4821">Open Dossier →</Link>
                        </div>
                      </div>
                    </div>
                    {/* 2. Hold: Sterling (Days 28-31 -> cols 5 to 8) */}
                    <div className="absolute top-2 bottom-2 left-[14.28%] w-[14.28%] border border-[#171A18] bg-surface-container px-2 py-1 flex items-center justify-between cursor-pointer z-10 hover:bg-surface-container-high transition-colors">
                      <div className="truncate">
                        <span className="font-action text-[10px] font-bold text-on-surface uppercase tracking-wider block truncate">HOLD: STERLING</span>
                        <span className="font-label-mono text-[9px] text-on-surface-variant block truncate">{"HLD-0922 // TENTATIVE"}</span>
                      </div>
                      <span className="font-label-mono text-[9px] text-on-surface-variant border border-[#D8D6CE] px-1 shrink-0">48H</span>
                    </div>
                    {/* 3. Maintenance (Days 04-06 Nov -> cols 12 to 14) */}
                    <div className="absolute top-2 bottom-2 left-[42.85%] w-[10.71%] border border-[#4d6355] bg-[repeating-linear-gradient(45deg,#cfe9d7,#cfe9d7_4px,#f3f4f0_4px,#f3f4f0_10px)] px-2 py-1 flex items-center z-10 cursor-pointer"><span className="font-label-mono text-[9px] font-bold text-on-secondary-fixed-variant truncate uppercase tracking-widest bg-surface/90 px-1 py-0.5 border border-[#D8D6CE]">48-PT ROUTINE SERVICE</span></div>
                    {/* 4. Kaufmann (Days 09-15 Nov -> cols 17 to 23) */}
                    <div className="absolute top-2 bottom-2 left-[60.71%] w-[25.00%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">{"KAUFMANN // EXECUTIVE LEASE"}</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">HLD-1044-8830 • SALZBURG TRANSIT</span>
                      </div>
                      <span className="font-spec-numeral text-[10px] text-primary-fixed shrink-0">7 DAYS</span>
                    </div>
                  </div>
                </div>
                {/* ROW 2: Porsche 911 GT3 Touring */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  {/* Chassis Left */}
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.porscheGt3Studio} alt="Porsche 911 GT3" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">ZRH</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">911 GT3 Touring</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>ZH-91104</span>
                        <span>•</span>
                        <span className="uppercase">4.0L FLAT-6 510PS</span>
                      </div>
                    </div>
                  </div>
                  {/* 28-Day Runway */}
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Lindqvist (Days 25-29 -> cols 2 to 6) */}
                    <div className="absolute top-2 bottom-2 left-[3.57%] w-[17.85%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">LINDQVIST</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">{"HLD-0841-3920 // ALP-PASS ROUTE"}</span>
                      </div>
                      <span className="material-symbols-outlined text-[13px] text-[#cfe9d7]">speed</span>
                    </div>
                    {/* Allocation Conflict Warning (Days 02-04 Nov -> cols 10 to 12) */}
                    <div className="absolute top-2 bottom-2 left-[32.14%] w-[10.71%] border-2 border-error bg-error-container/80 text-on-error-container px-2 py-1 flex items-center justify-between cursor-pointer z-10 animate-pulse">
                      <div className="truncate">
                        <span className="font-action text-[10px] font-bold uppercase tracking-wider block truncate text-error">! CONFLICT DETECTED</span>
                        <span className="font-label-mono text-[9px] text-error block truncate">{"2 PATRONS // ZRH HUB"}</span>
                      </div>
                      <span className="material-symbols-outlined text-[16px] text-error shrink-0">error</span>
                    </div>
                  </div>
                </div>
                {/* ROW 3: Audi RS6 Avant */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.audiRs6Studio} alt="Audi RS6 Avant" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 3vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">VIE</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">Audi RS6 Avant</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>W-8821H</span>
                        <span>•</span>
                        <span className="uppercase">V8 TWIN-TURBO 600PS</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Inspection Brake Recall (Days 24-27 -> cols 1 to 4) */}
                    <div className="absolute top-2 bottom-2 left-[0%] w-[14.28%] border border-[#4d6355] bg-[repeating-linear-gradient(45deg,#cfe9d7,#cfe9d7_4px,#f3f4f0_4px,#f3f4f0_10px)] px-2 py-1 flex items-center z-10 cursor-pointer"><span className="font-label-mono text-[9px] font-bold text-on-secondary-fixed-variant truncate uppercase tracking-widest bg-surface/90 px-1 border border-[#D8D6CE]">{"BRAKE PAD RECALL // VERIFIED"}</span></div>
                    {/* Moreau (Days 29-05 Nov -> cols 6 to 13) */}
                    <div className="absolute top-2 bottom-2 left-[17.85%] w-[25.00%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">{"MOREAU // AUTUMN DOLOMITES"}</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">HLD-0789-1142 • VIENNA DISPATCH</span>
                      </div>
                      <span className="font-label-mono text-[9px] text-primary-fixed shrink-0">€4,890</span>
                    </div>
                  </div>
                </div>
                {/* ROW 4: Lexus LC 500 Coupe */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.lexusLc500Editorial} alt="Lexus LC 500" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">MXP</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">Lexus LC 500 Coupe</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>MI-77210</span>
                        <span>•</span>
                        <span className="uppercase">5.0L V8 NA 477PS</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* De Vries (Days 26-01 Nov -> cols 3 to 9) */}
                    <div className="absolute top-2 bottom-2 left-[7.14%] w-[21.42%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">DE VRIES</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">{"HLD-0892-3100 // COMO RETREAT"}</span>
                      </div>
                      <span className="material-symbols-outlined text-[13px] text-[#cfe9d7]">key</span>
                    </div>
                    {/* Hold: Casiraghi (Days 06-09 Nov -> cols 14 to 17) */}
                    <div className="absolute top-2 bottom-2 left-[39.28%] w-[14.28%] border border-[#171A18] bg-surface-container px-2 py-1 flex items-center justify-between cursor-pointer z-10">
                      <div className="truncate">
                        <span className="font-action text-[10px] font-bold text-on-surface uppercase tracking-wider block truncate">HOLD: CASIRAGHI</span>
                        <span className="font-label-mono text-[9px] text-on-surface-variant block truncate">{"HLD-1102 // TENTATIVE"}</span>
                      </div>
                      <span className="font-label-mono text-[9px] text-on-surface-variant">REQ</span>
                    </div>
                  </div>
                </div>
                {/* ROW 5: Mercedes-Benz S 580 4MATIC */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.mercedesS500Studio} alt="Mercedes-Benz S 580" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 10vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">GVA</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">Mercedes-Benz S 580</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>GE-40219</span>
                        <span>•</span>
                        <span className="uppercase">V8 BI-TURBO 503PS</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Von Thurn (Days 24-28 -> cols 1 to 5) */}
                    <div className="absolute top-2 bottom-2 left-[0%] w-[17.85%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">VON THURN</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">{"HLD-0551-6029 // DIPLOMATIC"}</span>
                      </div>
                      <span className="material-symbols-outlined text-[13px] text-[#cfe9d7]">verified_user</span>
                    </div>
                    {/* Amann (Days 31-04 Nov -> cols 8 to 12) */}
                    <div className="absolute top-2 bottom-2 left-[25.00%] w-[17.85%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">AMANN</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">{"HLD-0988-4412 // GVA-ZRH"}</span>
                      </div>
                      <span className="font-label-mono text-[9px] text-primary-fixed">1-WAY</span>
                    </div>
                  </div>
                </div>
                {/* ROW 6: Land Cruiser 300 V8 */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.landCruiserStudio} alt="Land Cruiser 300" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 3vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">MUC</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">Land Cruiser 300 V8</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>M-HL 7740</span>
                        <span>•</span>
                        <span className="uppercase">3.3L TWIN-TURBO 309PS</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Schneider (Days 27-03 Nov -> cols 4 to 11) */}
                    <div className="absolute top-2 bottom-2 left-[10.71%] w-[25.00%] bg-primary-container text-on-primary px-2 py-1 flex items-center justify-between cursor-pointer border border-[#1e3327] z-10">
                      <div className="truncate">
                        <span className="font-action text-[11px] font-bold tracking-wider block truncate">{"SCHNEIDER // GARMISCH LODGE"}</span>
                        <span className="font-label-mono text-[9px] text-[#cfe9d7] block truncate">HLD-0711-9012</span>
                      </div>
                      <span className="material-symbols-outlined text-[13px] text-[#cfe9d7]">terrain</span>
                    </div>
                    {/* Maintenance: Pre-Winter (Days 10-14 Nov -> cols 18 to 22) */}
                    <div className="absolute top-2 bottom-2 left-[60.71%] w-[17.85%] border border-[#4d6355] bg-[repeating-linear-gradient(45deg,#cfe9d7,#cfe9d7_4px,#f3f4f0_4px,#f3f4f0_10px)] px-2 py-1 flex items-center z-10 cursor-pointer"><span className="font-label-mono text-[9px] font-bold text-on-secondary-fixed-variant truncate uppercase tracking-widest bg-surface/90 px-1 border border-[#D8D6CE]">PRE-WINTER CORROSION SEAL</span></div>
                  </div>
                </div>
                {/* ROW 7: BMW 540i xDrive (With Active Selection + "Block Dates" Popover) */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.bmw530eStudio} alt="BMW 540i xDrive" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 6vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">MUC</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">BMW 540i xDrive</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>M-HL 3390</span>
                        <span>•</span>
                        <span className="uppercase">3.0L TURBO 333PS</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Highlighted Drag Selection Box across 26-29 Oct (cols 3 to 6) */}
                    <div className="absolute inset-y-1 left-[7.14%] w-[14.28%] border-2 border-primary bg-primary-fixed/20 z-10 flex items-center justify-center pointer-events-none"><span className="font-label-mono text-[9px] uppercase tracking-wider text-primary font-bold bg-surface px-1 border border-primary">SELECTION (4 DAYS)</span></div>
                    {/* ANCHORED 'BLOCK DATES' FORM POPOVER */}
                    <div hidden={!blocking} role="dialog" aria-label="Block dates" className="absolute top-12 left-[10%] z-50 w-96 bg-surface-container-lowest border-2 border-primary p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)]" id="block-dates-modal">
                      <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-2 mb-3">
                        <div>
                          <span className="font-label-mono text-[9px] text-primary uppercase font-bold tracking-widest block">DISPATCH INTERVENTION</span>
                          <h4 className="font-action text-body-sm font-bold text-on-surface uppercase">{"Block Chassis // BMW 540i (M-HL 3390)"}</h4>
                        </div>
                        <button aria-label="Close" className="text-on-surface-variant hover:text-on-surface" onClick={() => setBlocking(false)} type="button"><span className="material-symbols-outlined text-[18px]">close</span></button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block font-label-mono text-[10px] text-on-surface-variant uppercase mb-1">REASON CLASSIFICATION</label>
                          <div className="grid grid-cols-3 gap-1.5 font-action text-[11px] uppercase">
                            <label className="border border-[#171A18] bg-primary text-on-primary p-1.5 text-center cursor-pointer flex items-center justify-center gap-1 font-semibold">
                              <input defaultChecked className="hidden" name="reason" type="radio" />
                              {" "}Maintenance
                            </label>
                            <label className="border border-[#D8D6CE] bg-surface p-1.5 text-center cursor-pointer hover:bg-surface-container text-on-surface flex items-center justify-center gap-1">
                              <input className="hidden" name="reason" type="radio" />
                              {" "}Transfer Hub
                            </label>
                            <label className="border border-[#D8D6CE] bg-surface p-1.5 text-center cursor-pointer hover:bg-surface-container text-on-surface flex items-center justify-center gap-1">
                              <input className="hidden" name="reason" type="radio" />
                              {" "}VIP Hold
                            </label>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 font-label-mono text-[10px]">
                          <div className="border border-[#D8D6CE] p-1.5 bg-surface-container-low">
                            <span className="block text-on-surface-variant text-[9px]">DIURNAL PERIOD:</span>
                            <span className="font-semibold text-on-surface">26 OCT → 29 OCT 2024</span>
                          </div>
                          <div className="border border-[#D8D6CE] p-1.5 bg-surface-container-low">
                            <span className="block text-on-surface-variant text-[9px]">STATIONED HUB:</span>
                            <span className="font-semibold text-on-surface">MUC — MUNICH</span>
                          </div>
                        </div>
                        <div>
                          <label className="block font-label-mono text-[10px] text-on-surface-variant uppercase mb-1">DISPATCH NOTES</label>
                          <textarea className="w-full p-2 border border-[#D8D6CE] font-body-sm text-xs text-on-surface bg-surface focus:outline-hidden focus:border-primary resize-none placeholder:text-outline" placeholder="Enter reason for block..." rows={2} defaultValue="Scheduled transmission diagnostic & sensor recalibration" />
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D8D6CE]">
                          <button className="px-3 py-1.5 font-action text-xs text-on-surface uppercase tracking-wider hover:bg-surface-container" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Cancel</button>
                          <button className="px-4 py-1.5 font-action text-xs font-semibold bg-primary text-on-primary uppercase tracking-wider hover:bg-primary-container transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Save Block</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ROW 8: Porsche 911 Carrera 2.7 RS (Heritage) */}
                <div className="flex border-b border-[#D8D6CE] relative group bg-surface hover:bg-[#FAF9F5] transition-colors">
                  <div className="w-[300px] shrink-0 p-2.5 border-r border-[#D8D6CE] flex items-center gap-3 bg-surface z-20">
                    <div className="w-14 h-10 border border-[#D8D6CE] shrink-0 overflow-hidden bg-surface-container"><Photo src={media.porscheVintageGallery} alt="Porsche 911 Carrera RS" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 24vw" /></div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-label-mono text-[9px] px-1 bg-surface-container-high text-on-surface font-semibold border border-[#D8D6CE]">ZRH</span>
                        <span className="font-action text-body-sm font-semibold text-on-surface truncate">911 Carrera 2.7 RS</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-mono text-[10px] text-on-surface-variant">
                        <span>ZH-1974</span>
                        <span>•</span>
                        <span className="uppercase">HERITAGE VAULT</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-28 divide-x divide-[#D8D6CE] relative min-h-[58px]">
                    <div className="bg-primary/5" />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div className="bg-[#ECEAE4]/60" />
                    <div className="bg-[#ECEAE4]/60" />
                    <div />
                    <div />
                    <div />
                    {/* Stored in Exhibition Vault (Span 24 Oct to 12 Nov) */}
                    <div className="absolute top-2 bottom-2 left-[0%] w-[67.85%] border border-[#737973] bg-surface-container-high/60 px-3 py-1 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px] text-on-surface-variant">museum</span>
                        <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface font-semibold">{"HALDEN PAVILION // STATIC EXHIBITION // NON-DISPATCH"}</span>
                      </div>
                      <span className="font-label-mono text-[9px] text-on-surface-variant uppercase bg-surface px-1.5 py-0.5 border border-[#D8D6CE]">SECURED ASSET</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Operational Diagnostics & Fallback States Tray */}
            <div className="mt-8 border border-[#D8D6CE] bg-surface-container-low p-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D6CE] mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface font-bold">{"STATE REFERENCE PANELS // SYSTEM PREVIEWS"}</span>
                </div>
                <span className="font-label-mono text-[10px] text-on-surface-variant">STAGING TELEMETRY V2.4</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* 1. Empty-Hub State Preview */}
                <div className="border border-[#D8D6CE] bg-surface p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-mono text-[9px] text-on-surface-variant uppercase tracking-widest">STATE: FILTER ZERO-MATCH</span>
                      <span className="font-label-mono text-[9px] px-1.5 py-0.5 bg-surface-container text-on-surface-variant">VIE HUB</span>
                    </div>
                    <h4 className="font-headline-sm text-base text-on-surface font-medium mb-1">No Chassis Stationed in Hub</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">No chassis currently stationed in Vienna (VIE) for this diurnal period. Transfer an unassigned unit from Munich (MUC) or adjust regional search criteria.</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D8D6CE] flex items-center justify-between">
                    <button className="font-action text-xs text-primary font-bold uppercase tracking-wider hover:underline flex items-center gap-1" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                      <span>Initiate Hub Relay Dispatch</span>
                      {" "}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                    <span className="font-label-mono text-[10px] text-outline">{"CODE // 0-VIE-NULL"}</span>
                  </div>
                </div>
                {/* 2. Loading State Shimmer Preview */}
                <div className="border border-[#D8D6CE] bg-surface p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-mono text-[9px] text-primary uppercase tracking-widest font-bold">STATE: NETWORK SYNCHRONIZATION</span>
                      <span className="font-label-mono text-[9px] text-primary font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                        {" "}SYNCING CANTONAL TELEMETRY...
                      </span>
                    </div>
                    {/* Shimmer Grid Mock */}
                    <div className="space-y-2 mt-3 animate-pulse">
                      <div className="h-3 bg-surface-container-highest w-full" />
                      <div className="h-3 bg-surface-container-high w-5/6" />
                      <div className="h-3 bg-surface-container w-4/6" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D8D6CE] flex items-center justify-between font-label-mono text-[10px] text-on-surface-variant">
                    <span>LATENCY: 14MS</span>
                    <span>GATEWAY: ZRH-CENTRAL-01</span>
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
