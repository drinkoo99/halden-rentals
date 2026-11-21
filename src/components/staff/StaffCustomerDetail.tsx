"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_staff_console_customer_detail/code.html */
export function StaffCustomerDetail() {
  const [clearance, setClearance] = useState(false);
  const [asked, setAsked] = useState(false);
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <aside className="fixed left-0 top-0 h-screen w-60 bg-tertiary z-50 flex flex-col justify-between select-none">
        <div className="flex flex-col">
          <div className="h-16 px-6 flex items-center justify-between">
            <Link className="font-headline-md text-headline-sm tracking-wider text-surface-container-lowest uppercase hover:opacity-90 transition-opacity" href="/staff">HALDEN</Link>
            <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 tracking-widest text-on-tertiary-container bg-tertiary-container">OPS</span>
          </div>
          <div className="px-4 py-3 mx-4 my-2 bg-inverse-surface">
            <label className="block font-label-mono text-[9px] uppercase tracking-widest text-on-tertiary-container mb-1">OPERATIONAL HUB</label>
            <div className="relative flex items-center justify-between cursor-pointer">
              <span className="font-label-mono text-label-mono text-surface-container-lowest tracking-wider uppercase truncate">ALL HUBS (5 REGIONS)</span>
              <span className="material-symbols-outlined text-on-tertiary-container text-[16px]">expand_more</span>
            </div>
          </div>
          <nav className="flex flex-col mt-4 px-2">
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff">OVERVIEW</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/bookings">BOOKINGS</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/fleet">FLEET</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/availability">AVAILABILITY</Link>
            <Link aria-current="page" className="flex items-center px-4 py-2.5 font-label-mono transition-colors bg-primary-container text-surface-container-lowest border-l-2 border-primary-fixed" href="/staff/customers">CUSTOMERS</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff/fleet">PRICING</Link>
            <Link className="flex items-center px-4 py-2.5 font-label-mono text-label-mono text-on-tertiary-container hover:bg-tertiary-container hover:text-surface-container-lowest transition-colors" href="/staff">SETTINGS</Link>
          </nav>
        </div>
        <div className="p-6 flex flex-col gap-1">
          <div className="font-label-mono text-[10px] text-on-tertiary-container tracking-widest uppercase">CONSOLE V2.4</div>
          <div className="font-label-mono text-[9px] text-outline tracking-wider uppercase">{"ARCHIVE RUNNER // SECURE"}</div>
        </div>
      </aside>
      <div className="pl-60">
        <header className="fixed top-0 left-60 right-0 h-16 bg-surface/90 backdrop-blur-md z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/2 max-w-lg bg-surface-container-low px-3 py-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">search</span>
            <input className="w-full bg-transparent border-0 focus:outline-hidden font-body-sm text-body-sm text-on-surface placeholder:text-outline placeholder:font-body-sm" placeholder="Search customer name, email, booking ref, licence..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-outline text-[16px]">calendar_today</span>
              <span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider">THU 24 OCT 2024</span>
            </div>
            <div className="h-4 w-px bg-outline-variant" />
            <button className="relative p-1.5 text-on-surface-variant hover:text-on-surface transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface" />
            </button>
            <div className="h-4 w-px bg-outline-variant" />
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <div className="font-action text-action text-on-surface leading-tight">M. Weber</div>
                <div className="font-label-mono text-[10px] text-outline uppercase tracking-wider">CONCIERGE LEAD</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
          </div>
        </header>
        <main className="w-full pt-16 bg-surface">
          <div className="flex flex-col w-full pb-16">
            {/* Architectural Sub-Navigation & Breadcrumbs */}
            <div className="w-full bg-surface-container-low px-8 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">CONSOLE</span>
                <span className="font-label-mono text-label-mono text-outline-variant">{"//"}</span>
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">CUSTOMERS</span>
                <span className="font-label-mono text-label-mono text-outline-variant">{"//"}</span>
                <span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider font-semibold">PATRON DOSSIER #PT-88402 (CLARA VON BERGMANN)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container text-primary font-label-mono text-[10px] tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {" "}DOSSIER SYNCHRONIZED
                </span>
                <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest">RECORD ID: 88402-MUC</span>
              </div>
            </div>
            {/* Primary Dossier Stage Header */}
            <div className="w-full px-8 py-8 bg-surface-container-lowest">
              <div className="grid grid-cols-12 gap-8 items-center">
                {/* Profile Identification Block */}
                <div className="col-span-12 xl:col-span-4 flex items-center gap-6">
                  <div className="w-24 h-24 bg-surface-container shrink-0 flex items-center justify-center text-primary font-headline-lg text-headline-lg select-none">CB</div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-3"><span className="font-label-mono text-[10px] tracking-widest uppercase px-2 py-0.5 bg-secondary-container text-on-secondary-fixed font-medium">{"PATRON CIRCLE // TIER II (VALID THRU 2026)"}</span></div>
                    <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight truncate mt-0.5">Clara von Bergmann</h1>
                    <div className="flex items-center gap-3">
                      <span className="font-spec-numeral text-spec-numeral text-outline">DOSSIER #PT-88402</span>
                      <span className="text-outline-variant">·</span>
                      <span className="font-label-mono text-[11px] text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        {" "}KBA FLENSBURG LINKED
                      </span>
                    </div>
                  </div>
                </div>
                {/* Telemetry & Contact Matrix */}
                <div className="col-span-12 md:col-span-8 xl:col-span-5 bg-surface-container-low p-4">
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    <div>
                      <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">ELECTRONIC CONTACT</div>
                      <div className="font-body-sm text-body-sm text-on-surface truncate font-medium mt-0.5">c.vonbergmann@munich-atelier.de</div>
                      <div className="font-label-mono text-[9px] text-primary uppercase tracking-wider flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {" "}VERIFIED PATRON EMAIL
                      </div>
                    </div>
                    <div>
                      <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">{"TELEMETRY & VOICE"}</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface font-medium mt-0.5">+49 89 2109 4432</div>
                      <div className="font-label-mono text-[9px] text-primary uppercase tracking-wider flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {" "}SMS TELEMETRY CONFIRMED
                      </div>
                    </div>
                    <div>
                      <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">PREFERRED HUB / CONCIERGE</div>
                      <div className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">Munich Franz Josef Strauss (MUC VIP T2)</div>
                    </div>
                    <div>
                      <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">{"TENURE & INTEGRITY"}</div>
                      <div className="font-body-sm text-body-sm text-on-surface font-medium mt-0.5">Since 14 May 2022 · 4 Expeditions</div>
                      <div className="font-label-mono text-[9px] text-secondary uppercase tracking-wider mt-0.5">0 INCIDENTS / 0 CLAIMS</div>
                    </div>
                  </div>
                </div>
                {/* Top Direct Actions */}
                <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col gap-2.5 justify-center">
                  <button className="w-full bg-primary text-on-primary font-action text-action py-3 px-4 flex items-center justify-between hover:bg-primary-container transition-colors shadow-sm" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span>BOOK EXPEDITION FOR PATRON</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <button className="w-full bg-surface text-on-surface font-action text-action py-2.5 px-4 hover:bg-surface-container transition-colors flex items-center justify-center gap-2" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[16px] text-outline">tune</span>
                    {" "}
                    <span>EDIT PROFILE</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Operational Core Workspace (Two Columns) */}
            <div className="w-full px-8 mt-6">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* ==================== LEFT COLUMN (~60% / 7 Cols) ==================== */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
                  {/* SECTION 01: Driving Licence Accreditation Panel */}
                  <div className="bg-surface-container-lowest p-6 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">CREDENTIAL DOSSIER</div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{"01 // LICENCE ACCREDITATION & VERIFICATION"}</h2>
                      </div>
                      <div className="flex items-center gap-2"><span className="px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-mono text-[10px] tracking-wider uppercase font-semibold">PENDING PERIODIC RE-AUDIT</span></div>
                    </div>
                    {/* Metadata Spec Bar */}
                    <div className="grid grid-cols-3 gap-4 bg-surface-container-low p-4 my-4">
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-wider">ISSUING AUTHORITY</div>
                        <div className="font-body-sm text-body-sm font-semibold text-on-surface mt-0.5">{"GERMANY (DE) // KBA"}</div>
                        <div className="font-label-mono text-[10px] text-outline">FLENSBURG VERIFIED</div>
                      </div>
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-wider">DOCUMENT REFERENCE</div>
                        <div className="font-spec-numeral text-spec-numeral font-bold text-on-surface mt-0.5">B074R881920</div>
                        <div className="font-label-mono text-[10px] text-outline">CLASS B, B1, AM, L</div>
                      </div>
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-wider">EXPIRY HORIZON</div>
                        <div className="font-spec-numeral text-spec-numeral font-bold text-primary mt-0.5">12 NOV 2028</div>
                        <div className="font-label-mono text-[10px] text-outline">1,480 DAYS REMAINING</div>
                      </div>
                    </div>
                    {/* Dual Side-by-Side Photographic Verification Plinth */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Front Scan Card */}
                      <div className="bg-surface-container p-3 flex flex-col gap-2.5 group">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-[10px] text-on-surface tracking-wider font-semibold">{"RECTO // SCAN REVISION 2.1"}</span>
                          <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                        </div>
                        <div className="relative overflow-hidden bg-surface-dim aspect-[1.79/1]">
                          <Photo src={media.licenceFront} alt="Photorealistic macro top-down detail of the front side of a European driver's license accreditation identity card" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 767px) 100vw, 21vw" />
                          <div className="absolute bottom-2 left-2 bg-inverse-surface/85 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-[9px] text-inverse-on-surface tracking-wider">GUILLOCHE SECURE</span></div>
                        </div>
                        <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">{"DOCUMENT FRONT // HOLOGRAPHIC GUILLOCHE VERIFIED"}</div>
                      </div>
                      {/* Back Scan Card */}
                      <div className="bg-surface-container p-3 flex flex-col gap-2.5 group">
                        <div className="flex items-center justify-between">
                          <span className="font-label-mono text-[10px] text-on-surface tracking-wider font-semibold">{"VERSO // SCAN REVISION 2.1"}</span>
                          <span className="material-symbols-outlined text-[16px] text-primary">task_alt</span>
                        </div>
                        <div className="relative overflow-hidden bg-surface-dim aspect-[1.79/1]">
                          <Photo src={media.licenceBack} alt="Photorealistic macro top-down detail of the reverse back side of a European driver's license identity card showing category vehicle pictograms" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 767px) 100vw, 21vw" />
                          <div className="absolute bottom-2 left-2 bg-inverse-surface/85 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-[9px] text-inverse-on-surface tracking-wider">CATEGORY B CLEAR</span></div>
                        </div>
                        <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">{"DOCUMENT REVERSE // CATEGORY B & B1 ACCREDITATION TABLE"}</div>
                      </div>
                    </div>
                    {/* Auditor Bar & Immediate Action Controls */}
                    <div className="mt-6 pt-5 bg-surface-container-low p-4 flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-secondary">security</span>
                          <span className="font-label-mono text-[10px] uppercase text-on-surface tracking-wider font-semibold">AUDITOR VERDICT WORKFLOW</span>
                        </div>
                        <span className="font-label-mono text-[10px] text-primary uppercase tracking-widest hover:underline flex items-center gap-1" data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                          <span>AUDIT KBA API HASH (SHA-256)</span>
                          {" "}
                          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button className="flex-1 bg-primary text-on-primary font-action text-action py-3 px-4 hover:bg-primary-container transition-colors flex items-center justify-center gap-2" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          {" "}
                          <span>{"APPROVE ACCREDITATION & CLEAR FOR EXPEDITIONS"}</span>
                        </button>
                        <div className="flex items-center gap-2">
                          <select aria-label="Rejection ground" className="bg-surface text-on-surface font-body-sm text-body-sm px-3 py-2.5 focus:outline-hidden focus:ring-0" defaultValue="">
                            <option disabled value="">Select rejection ground...</option>
                            <option value="blurry">Blurry Document</option>
                            <option value="expired">Expired Card</option>
                            <option value="mismatch">Name Mismatch</option>
                            <option value="catb">Category B Missing</option>
                            <option value="hologram">Suspicious Hologram</option>
                          </select>
                          <button className="bg-surface-variant text-error font-action text-action py-2.5 px-4 hover:bg-error-container hover:text-on-error-container transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">REJECT</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* SECTION 02: Expeditions & Active Dossiers Table */}
                  <div className="bg-surface-container-lowest p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">{"LOGS & CURATION"}</div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{"02 // EXPEDITIONS ARCHIVE & ACTIVE DOSSIERS"}</h2>
                      </div>
                      <span className="font-label-mono text-[10px] text-outline uppercase tracking-wider">TOTAL 4 EXPEDITIONS</span>
                    </div>
                    {/* Table Container */}
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-surface-container-low text-outline font-label-mono text-[10px] uppercase tracking-wider">
                            <th className="py-2.5 px-3">EXPEDITION REF</th>
                            <th className="py-2.5 px-3">VEHICLE ASSIGNMENT</th>
                            <th className="py-2.5 px-3">DIURNAL HORIZON</th>
                            <th className="py-2.5 px-3">HUB</th>
                            <th className="py-2.5 px-3 text-right">TOTAL ESCROW</th>
                            <th className="py-2.5 px-3">STATUS</th>
                            <th className="py-2.5 px-3 text-right">ACTION</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container">
                          {/* Row 1: Upcoming / Active */}
                          <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="py-3 px-3 font-spec-numeral text-[13px] font-semibold text-primary">HLD-0612-4821</td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface font-medium">
                              Range Rover Autobiography{" "}
                              <div className="font-label-mono text-[10px] text-outline">CHASSIS: M-HL 4821</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface-variant">
                              12 Jun – 15 Jun 2025{" "}
                              <div className="font-label-mono text-[10px] text-outline">3 Diurnal Cycles</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">Munich VIP T2</td>
                            <td className="py-3 px-3 font-spec-numeral text-spec-numeral font-bold text-on-surface text-right">€1,731.45</td>
                            <td className="py-3 px-3"><span className="px-2 py-0.5 bg-primary-container text-on-primary font-label-mono text-[10px] tracking-wider uppercase font-semibold">CONFIRMED</span></td>
                            <td className="py-3 px-3 text-right"><Link className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider hover:underline inline-flex items-center gap-0.5" href="/staff/bookings/hld-0612-4821">DOSSIER →</Link></td>
                          </tr>
                          {/* Row 2 */}
                          <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="py-3 px-3 font-spec-numeral text-[13px] text-outline">HLD-0402-9110</td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">
                              Porsche 911 GT3 Touring{" "}
                              <div className="font-label-mono text-[10px] text-outline">CHASSIS: ZH-91104</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface-variant">
                              18 Sep – 21 Sep 2024{" "}
                              <div className="font-label-mono text-[10px] text-outline">3 Diurnal Cycles</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">Zurich Kloten T1</td>
                            <td className="py-3 px-3 font-spec-numeral text-spec-numeral text-on-surface text-right">€2,160.00</td>
                            <td className="py-3 px-3"><span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant font-label-mono text-[10px] tracking-wider uppercase">COMPLETED</span></td>
                            <td className="py-3 px-3 text-right"><Link className="font-label-mono text-[10px] text-outline uppercase tracking-wider hover:text-on-surface inline-flex items-center gap-0.5" href="/staff/bookings/hld-0612-4821">DOSSIER →</Link></td>
                          </tr>
                          {/* Row 3 */}
                          <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="py-3 px-3 font-spec-numeral text-[13px] text-outline">HLD-0219-5800</td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">
                              Mercedes-Benz S 580 4MATIC{" "}
                              <div className="font-label-mono text-[10px] text-outline">CHASSIS: GE-40219</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface-variant">
                              04 May – 07 May 2023{" "}
                              <div className="font-label-mono text-[10px] text-outline">3 Diurnal Cycles</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">Geneva VIP</td>
                            <td className="py-3 px-3 font-spec-numeral text-spec-numeral text-on-surface text-right">€1,890.00</td>
                            <td className="py-3 px-3"><span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant font-label-mono text-[10px] tracking-wider uppercase">COMPLETED</span></td>
                            <td className="py-3 px-3 text-right"><Link className="font-label-mono text-[10px] text-outline uppercase tracking-wider hover:text-on-surface inline-flex items-center gap-0.5" href="/staff/bookings/hld-0612-4821">DOSSIER →</Link></td>
                          </tr>
                          {/* Row 4 */}
                          <tr className="hover:bg-surface-container-low transition-colors group">
                            <td className="py-3 px-3 font-spec-numeral text-[13px] text-outline">HLD-0104-3390</td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">
                              BMW 540i xDrive{" "}
                              <div className="font-label-mono text-[10px] text-outline">CHASSIS: M-HL 3390</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface-variant">
                              11 Nov – 13 Nov 2022{" "}
                              <div className="font-label-mono text-[10px] text-outline">2 Diurnal Cycles</div>
                            </td>
                            <td className="py-3 px-3 font-body-sm text-body-sm text-on-surface">Munich VIP T2</td>
                            <td className="py-3 px-3 font-spec-numeral text-spec-numeral text-on-surface text-right">€1,144.35</td>
                            <td className="py-3 px-3"><span className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant font-label-mono text-[10px] tracking-wider uppercase">COMPLETED</span></td>
                            <td className="py-3 px-3 text-right"><Link className="font-label-mono text-[10px] text-outline uppercase tracking-wider hover:text-on-surface inline-flex items-center gap-0.5" href="/staff/bookings/hld-0612-4821">DOSSIER →</Link></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Lifetime Value Summary Bar */}
                    <div className="mt-4 p-4 bg-surface-container-low flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="font-label-mono text-[10px] uppercase text-outline tracking-wider block">PATRON LIFETIME ESCROW</span>
                          <span className="font-spec-numeral text-headline-sm font-semibold text-primary">€6,925.80</span>
                        </div>
                        <div className="h-8 w-px bg-surface-variant" />
                        <div>
                          <span className="font-label-mono text-[10px] uppercase text-outline tracking-wider block">EXPEDITION TENURE</span>
                          <span className="font-spec-numeral text-headline-sm text-on-surface">
                            11{" "}
                            <span className="text-body-sm font-label-mono text-outline">CYCLES</span>
                          </span>
                        </div>
                        <div className="h-8 w-px bg-surface-variant" />
                        <div>
                          <span className="font-label-mono text-[10px] uppercase text-outline tracking-wider block">VEHICLE INTEGRITY RATING</span>
                          <span className="font-spec-numeral text-headline-sm text-on-surface flex items-center gap-1">
                            5.0
                            <span className="text-outline text-body-sm">/5.0</span>
                          </span>
                        </div>
                      </div>
                      <div className="font-label-mono text-[10px] text-outline uppercase tracking-wider">ACCOUNT STATUS: IN GOOD STANDING</div>
                    </div>
                  </div>
                </div>
                {/* ==================== RIGHT COLUMN (~40% / 5 Cols) ==================== */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
                  {/* SECTION 03: Concierge Directives & Staff Notes */}
                  <div className="bg-surface-container-lowest p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-3">
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">INTERNAL PROTOCOLS</div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{"03 // CONCIERGE DIRECTIVES & NOTES"}</h2>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
                    </div>
                    {/* Notes Stream */}
                    <div className="flex flex-col gap-3 mt-3">
                      {/* Note Item 1 */}
                      <div className="p-4 bg-surface-container-low flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-action text-[12px] text-primary font-bold">M. Weber (Concierge Lead, MUC)</span>
                          <span className="font-label-mono text-[10px] text-outline">22 MAY 2024 · 11:15 CEST</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">{"\"Patron prefers cabin climate pre-conditioned to 20.5°C with San Pellegrino Riserva in the rear refrigeration unit. Prefers Munich VIP tarmac gate 14-B.\""}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant">HVAC: 20.5°C</span>
                          <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant">PROVISIONS: RISERVA</span>
                        </div>
                      </div>
                      {/* Note Item 2 */}
                      <div className="p-4 bg-surface-container-low flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-action text-[12px] text-primary font-bold">E. Rostova (Fleet Operations, ZRH)</span>
                          <span className="font-label-mono text-[10px] text-outline">14 SEP 2024 · 09:30 CEST</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">{"\"Patron travels with 2 rimowa aluminum cabin cases. Child seat removed per prior protocol.\""}</p>
                        <div className="flex items-center gap-2 mt-1"><span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant">LUGGAGE PROTOCOL</span></div>
                      </div>
                    </div>
                    {/* New Note Input Block */}
                    <div className="mt-4 flex flex-col gap-2.5">
                      <label className="font-label-mono text-[10px] uppercase text-outline tracking-wider">RECORD CONFIDENTIAL STAFF DIRECTIVE</label>
                      <textarea className="w-full p-3 bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline placeholder:font-body-sm focus:outline-hidden focus:bg-surface resize-none" placeholder="Add confidential internal directive or patron preference..." rows={3} />
                      <div className="flex justify-end">
                        <button className="bg-primary text-on-primary font-action text-[12px] py-2 px-4 hover:bg-primary-container transition-colors flex items-center gap-1.5" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          {" "}
                          <span>POST INTERNAL NOTE</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* SECTION 04: Consent, Privacy & Marketing Directives */}
                  <div className="bg-surface-container-lowest p-6 shadow-sm">
                    <div className="flex items-center justify-between pb-3">
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">COMMUNICATION CODES</div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">{"04 // PRIVACY & DIRECTIVE PREFERENCES"}</h2>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[18px]">verified</span>
                    </div>
                    <div className="flex flex-col gap-2.5 mt-2">
                      {/* Item 1 (Checked) */}
                      <label className="flex items-start gap-3 p-3 bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                        <div className="w-4 h-4 bg-primary flex items-center justify-center mt-0.5 shrink-0"><span className="material-symbols-outlined text-on-primary text-[14px]">check</span></div>
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm text-on-surface font-semibold leading-tight">Seasonal Curated Transversals Catalogue</span>
                          <span className="font-label-mono text-[10px] text-outline mt-0.5">Physical Print Dispatch to Munich Atelier Address</span>
                        </div>
                      </label>
                      {/* Item 2 (Checked) */}
                      <label className="flex items-start gap-3 p-3 bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                        <div className="w-4 h-4 bg-primary flex items-center justify-center mt-0.5 shrink-0"><span className="material-symbols-outlined text-on-primary text-[14px]">check</span></div>
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm text-on-surface font-semibold leading-tight">{"Urgent Flight & Dispatch Telemetry SMS"}</span>
                          <span className="font-label-mono text-[10px] text-outline mt-0.5">{"Real-time gate changes & chauffeur meetups"}</span>
                        </div>
                      </label>
                      {/* Item 3 (Checked) */}
                      <label className="flex items-start gap-3 p-3 bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                        <div className="w-4 h-4 bg-primary flex items-center justify-center mt-0.5 shrink-0"><span className="material-symbols-outlined text-on-primary text-[14px]">check</span></div>
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm text-on-surface font-semibold leading-tight">Käfer Munich Atelier Provisions Notifications</span>
                          <span className="font-label-mono text-[10px] text-outline mt-0.5">Pre-departure bespoke pantry preferences</span>
                        </div>
                      </label>
                      {/* Item 4 (Unchecked) */}
                      <label className="flex items-start gap-3 p-3 bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                        <div className="w-4 h-4 bg-surface-variant flex items-center justify-center mt-0.5 shrink-0" />
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm text-outline font-semibold leading-tight">Third-party partner marketing</span>
                          <span className="font-label-mono text-[10px] text-secondary mt-0.5">Strictly prohibited per Swiss nFADP opt-in regulations</span>
                        </div>
                      </label>
                    </div>
                    <div className="mt-4 pt-3 flex items-center justify-between text-outline">
                      <span className="font-label-mono text-[9px] uppercase tracking-wider">UPDATED: 20 MAY 2024 10:14 CEST</span>
                      <span className="font-label-mono text-[9px] uppercase tracking-wider">VIA: PATRON WEB TERMINAL (ZRH-SSL)</span>
                    </div>
                  </div>
                  {/* SECTION 05: GDPR / Swiss nFADP Statutory Actions */}
                  <div className="bg-surface-container-lowest p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-2 pb-2">
                      <span className="material-symbols-outlined text-secondary text-[20px]">admin_panel_settings</span>
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-outline tracking-widest">LEGAL COMPLIANCE</div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">{"05 // STATUTORY DATA GOVERNANCE & PRIVACY"}</h2>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Regulated under Canton of Zurich Data Protection Act (DSG/IDG) and EU GDPR Art. 17/20. All ledger records remain cryptographically signed.</p>
                    <button className="w-full bg-surface-container text-on-surface font-action text-action py-3 px-4 hover:bg-surface-variant transition-colors flex items-center justify-center gap-2" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                      <span className="material-symbols-outlined text-[18px] text-outline">download</span>
                      {" "}
                      <span>EXPORT COMPLETE PATRON DOSSIER (JSON/PDF)</span>
                    </button>
                    {/* Destructive Safe Box */}
                    <div className="p-4 bg-error-container/40 flex flex-col gap-3 mt-2">
                      <div className="flex items-center gap-2 text-on-error-container">
                        <span className="material-symbols-outlined text-[18px]">warning</span>
                        <span className="font-label-mono text-[10px] uppercase font-bold tracking-widest">STATUTORY DELETION (RIGHT TO BE FORGOTTEN)</span>
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface leading-normal">Irreversible eradication of patron record, driving credentials, and telemetry history. Only permitted if no active or disputed financial escrows exist.</p>
                      <label className="flex items-center gap-2 cursor-pointer mt-1 select-none">
                        <input className="w-4 h-4 rounded-none accent-primary" id="supervisor-clearance" checked={clearance} onChange={(e) => setClearance(e.target.checked)} type="checkbox" />
                        {" "}
                        <span className="font-label-mono text-[10px] text-on-surface uppercase tracking-wide">I confirm supervisor clearance for patron removal</span>
                      </label>
                      <button className={`w-full bg-error text-on-error font-action text-action py-2.5 px-4 transition-opacity flex items-center justify-center gap-2 ${clearance ? "" : "opacity-50 cursor-not-allowed"}`} disabled={!clearance} id="eradicate-btn" onClick={() => setAsked(true)} type="button">
                        <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                        {" "}
                        <span>ERADICATE PATRON RECORD (DELETE CUSTOMER)</span>
                      </button>
                      {asked && (
                        <p className="font-body-sm text-body-sm text-error" role="alert">
                          Demo console: customer records are not stored yet, so nothing was deleted.
                        </p>
                      )}
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
