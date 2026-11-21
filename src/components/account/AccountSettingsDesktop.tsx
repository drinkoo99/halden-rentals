"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_patron_circle_account_settings/code.html */
export function AccountSettingsDesktop() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="hidden md:block bg-surface font-body-md text-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <div className="max-w-7xl mx-auto w-full px-margin-mobile lg:px-margin py-space-lg lg:py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              {/* LEFT COLUMN: Sticky Navigation & Patron Metadata */}
              <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-space-lg">
                <nav aria-label="Account Settings Sections" className="bg-surface-container-low border border-outline-variant p-space-md">
                  <p className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest pb-space-sm border-b border-outline-variant">{"ARCHIVE // ACCOUNT"}</p>
                  <ul className="mt-space-sm space-y-space-xs font-label-mono text-label-mono uppercase">
                    <li><Link className="block py-space-sm px-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors" href="/account">01 OVERVIEW</Link></li>
                    <li><Link className="block py-space-sm px-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors" href="/account#reservations">02 RESERVATIONS</Link></li>
                    <li><Link className="block py-space-sm px-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors" href="/account#saved">03 SAVED CARS</Link></li>
                    <li><Link className="block py-space-sm px-space-xs text-on-surface bg-surface font-semibold border-l-2 border-primary-container pl-space-sm" href="/account/settings">04 SETTINGS</Link></li>
                  </ul>
                </nav>
                {/* Patron Placard */}
                <div className="bg-surface-container border border-outline-variant p-space-md">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block">Patron Identification</span>
                  <p className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">№ 802</p>
                  <div className="w-full h-px bg-outline-variant my-space-sm" />
                  <div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant">
                    <span>PATRON SINCE</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">2025</span>
                  </div>
                  <div className="flex items-center justify-between font-label-mono text-label-mono text-on-surface-variant mt-space-xs">
                    <span>JOURNEYS COMPLETED</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">03</span>
                  </div>
                  <div className="mt-space-md pt-space-sm border-t border-outline-variant flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-none bg-primary" />
                    <span className="font-label-mono text-label-mono text-primary uppercase font-bold tracking-wider">TIER-1 ARCHIVE CLEARANCE</span>
                  </div>
                </div>
              </aside>
              {/* MAIN COLUMN: Settings Spec Matrix */}
              <section className="lg:col-span-9 space-y-space-xl">
                {/* Header */}
                <header className="space-y-space-xs border-b border-outline-variant pb-space-lg">
                  <span className="font-label-mono text-label-mono uppercase text-on-surface-variant tracking-widest block">{"PATRON CIRCLE // PROFILE & CREDENTIAL SPECIFICATION"}</span>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">Account Settings</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl pt-space-xs">Manage your custodial credentials, driving privileges, bespoke communications, and authentication security.</p>
                </header>
                {/* Form Shell */}
                <form className="space-y-space-xl">
                  {/* 01 // Personal Details */}
                  <fieldset className="space-y-space-md pt-space-xs">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant pb-space-xs">
                      <legend className="font-headline-md text-headline-md text-on-surface">Personal Details</legend>
                      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-1 sm:mt-0">{"SECTION // 01"}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                      {/* First Name */}
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="first-name">Legal Forename</label>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">PASSPORT ID</span>
                        </div>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:border-primary-container focus:outline-hidden transition-colors rounded-[2px]" id="first-name" type="text" defaultValue="Clara" />
                      </div>
                      {/* Last Name */}
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="last-name">Legal Surname</label>
                          <span className="font-label-mono text-label-mono text-on-surface-variant">PASSPORT ID</span>
                        </div>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:border-primary-container focus:outline-hidden transition-colors rounded-[2px]" id="last-name" type="text" defaultValue="von Bergmann" />
                      </div>
                      {/* Email Field with Verified Badge */}
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="email">Custodial Email</label>
                          <span className="inline-flex items-center gap-1 font-label-mono text-label-mono text-primary bg-secondary-fixed px-1.5 py-0.5 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-primary" />
                            {" "}Verified
                          </span>
                        </div>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:border-primary-container focus:outline-hidden transition-colors rounded-[2px]" id="email" type="email" defaultValue="clara.bergmann@atelier-v.ch" />
                      </div>
                      {/* Mobile Phone */}
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="phone">Mobile Telephone</label>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">PRIMARY DISPATCH SMS</span>
                        </div>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:border-primary-container focus:outline-hidden transition-colors rounded-[2px]" id="phone" type="tel" defaultValue="+49 170 558 9124" />
                      </div>
                      {/* Date of Birth */}
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="dob">Date of Birth</label>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">REQUIRED FOR INSURANCE</span>
                        </div>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-numeral focus:border-primary-container focus:outline-hidden transition-colors rounded-[2px]" id="dob" type="text" defaultValue="14 / 08 / 1988" />
                      </div>
                      {/* Error State Demonstration: Emergency Dispatch Field */}
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-error font-semibold" htmlFor="emergency-contact">Secondary Hotline / Escort</label>
                          <span className="font-label-mono text-label-mono text-error uppercase">{"REQUIRED // INVALID FORMAT"}</span>
                        </div>
                        <input aria-describedby="emergency-error" aria-invalid="true" className="w-full h-12 px-space-sm bg-surface-container-lowest border border-error text-error font-body-md focus:border-error focus:outline-hidden rounded-[2px]" id="emergency-contact" type="text" defaultValue="089 / 41-T2" />
                        <p className="font-label-mono text-label-mono text-error uppercase tracking-normal" id="emergency-error">Please enter a valid Swiss or EU mobile telephone number (+41 / +49).</p>
                      </div>
                    </div>
                  </fieldset>
                  {/* 02 // Driving Licence & Qualifications */}
                  <fieldset className="space-y-space-md pt-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant pb-space-xs">
                      <legend className="font-headline-md text-headline-md text-on-surface">Driving Licence</legend>
                      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-1 sm:mt-0">{"SECTION // 02"}</span>
                    </div>
                    {/* Hint Box */}
                    <div className="bg-surface-container border border-outline-variant p-space-sm flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified_user</span>
                      <p className="font-label-mono text-label-mono text-on-surface-variant leading-relaxed">TIER-1 VERIFICATION PROTOCOL: Archival grand tourers and twin-turbocharged platforms require authenticated Swiss Category B or equivalent international reciprocal permits with active road verification.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                      <div className="space-y-space-xs md:col-span-2">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface block" htmlFor="licence-country">Issuing Authority / Category</label>
                        <select className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:border-primary-container focus:outline-hidden rounded-[2px]" id="licence-country" defaultValue="Switzerland (CH) — Category B / BE">
                          <option>Switzerland (CH) — Category B / BE</option>
                          <option>Germany (DE) — Klasse B / BE</option>
                          <option>Austria (AT) — Klasse B</option>
                          <option>Italy (IT) — Patente B</option>
                        </select>
                      </div>
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="licence-validity">Status</label>
                          <span className="font-label-mono text-label-mono text-primary font-semibold">VALID</span>
                        </div>
                        <div className="h-12 px-space-sm bg-secondary-fixed border border-secondary text-primary font-label-mono text-label-mono flex items-center justify-between">
                          <span className="tracking-widest">{"VERIFIED // TIER-1 ACCREDITED"}</span>
                          <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                        </div>
                      </div>
                      <div className="space-y-space-xs md:col-span-2">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface block" htmlFor="licence-number">Licence Identification Code</label>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-numeral focus:border-primary-container focus:outline-hidden rounded-[2px]" id="licence-number" type="text" defaultValue="B-84920419-ZH" />
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface block" htmlFor="licence-expiry">Expiration Spec</label>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-numeral focus:border-primary-container focus:outline-hidden rounded-[2px]" id="licence-expiry" type="text" defaultValue="12 / 2031" />
                      </div>
                    </div>
                    {/* Upload Zone */}
                    <div className="space-y-space-xs pt-space-xs">
                      <label className="font-label-mono text-label-mono uppercase text-on-surface block">{"Physical Document Scans (Front & Rear Dossier)"}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        {/* Front Scan: Uploaded */}
                        <div className="border border-outline-variant bg-surface-container-lowest p-space-md flex flex-col justify-between h-36">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-label-mono text-label-mono uppercase text-primary font-semibold block flex items-center gap-1">
                                <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                                {" "}FRONT SCAN ATTACHED
                              </span>
                              <p className="font-label-mono text-body-sm text-on-surface mt-1 truncate max-w-[200px]">CH_PERMIS_BERGMANN_FRONT.PDF</p>
                              <span className="font-spec-numeral text-body-sm text-on-surface-variant">2.4 MB · Cryptographic Hash OK</span>
                            </div>
                          </div>
                          <div className="flex justify-end pt-space-xs border-t border-outline-variant"><button className="font-action text-action uppercase text-on-surface hover:text-primary transition-colors" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Replace Document</button></div>
                        </div>
                        {/* Rear Scan: Dropzone */}
                        <div className="border border-dashed border-outline-variant bg-surface-container-low hover:bg-surface-container p-space-md flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-36">
                          <span className="material-symbols-outlined text-on-surface-variant text-[24px] mb-1">upload_file</span>
                          <p className="font-label-mono text-label-mono uppercase text-on-surface">DROP REAR SCAN OR BROWSE FILES</p>
                          <span className="font-label-mono text-label-mono text-on-surface-variant mt-1">PDF, TIFF, JPG UP TO 15MB</span>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/* 03 // Preferences & Logistics */}
                  <fieldset className="space-y-space-md pt-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant pb-space-xs">
                      <legend className="font-headline-md text-headline-md text-on-surface">Preferences</legend>
                      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-1 sm:mt-0">{"SECTION // 03"}</span>
                    </div>
                    {/* Pick-up Hub */}
                    <div className="space-y-space-xs max-w-xl">
                      <div className="flex justify-between items-center">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="primary-hub">Default Archival Pavilion (Pick-up Hub)</label>
                        <span className="font-label-mono text-label-mono text-on-surface-variant">PRIORITY TRANSIT</span>
                      </div>
                      <select className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-body-md focus:border-primary-container focus:outline-hidden rounded-[2px]" id="primary-hub" defaultValue="Munich Airport (MUC) — Terminal 2 VIP Pavilion">
                        <option>Munich Airport (MUC) — Terminal 2 VIP Pavilion</option>
                        <option>Zurich Kloten (ZRH) — Executive Aviation Center</option>
                        <option>Milan Linate (LIN) — Private Aviation Gallery</option>
                        <option>Geneva Cointrin (GVA) — Salon de Manutention</option>
                      </select>
                    </div>
                    {/* Communication Toggles */}
                    <div className="space-y-space-sm pt-space-xs">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface block">{"Dispatch & Curatorial Signals"}</span>
                      {/* Item 1 */}
                      <label className="flex items-start gap-space-sm p-space-sm bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
                        <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary border border-outline text-primary focus:ring-0 cursor-pointer" type="checkbox" />
                        {" "}
                        <div className="flex flex-col">
                          <span className="font-body-md text-body-md text-on-surface font-semibold">{"Booking & dossier updates by encrypted email"}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Receive cryptographically verified condition reports, invoice ledgers, and terminal access tokens.</span>
                        </div>
                      </label>
                      {/* Item 2 */}
                      <label className="flex items-start gap-space-sm p-space-sm bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
                        <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary border border-outline text-primary focus:ring-0 cursor-pointer" type="checkbox" />
                        {" "}
                        <div className="flex flex-col">
                          <span className="font-body-md text-body-md text-on-surface font-semibold">{"SMS handover concierge reminders & chauffeur coordinates"}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Direct mobile telemetry updates 60 minutes prior to pavilion arrivals or staging changes.</span>
                        </div>
                      </label>
                      {/* Item 3 */}
                      <label className="flex items-start gap-space-sm p-space-sm bg-surface-container-low border border-outline-variant cursor-pointer hover:bg-surface-container transition-colors">
                        <input defaultChecked className="mt-1 w-4 h-4 rounded-none accent-primary border border-outline text-primary focus:ring-0 cursor-pointer" type="checkbox" />
                        {" "}
                        <div className="flex flex-col">
                          <span className="font-body-md text-body-md text-on-surface font-semibold">{"\"The Dispatch\" — Halden quarterly automotive monograph & private salon invitations"}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Delivered physically to primary billing address and previewed via private digital archive view.</span>
                        </div>
                      </label>
                    </div>
                  </fieldset>
                  {/* 04 // Security & Authentication */}
                  <fieldset className="space-y-space-md pt-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant pb-space-xs">
                      <legend className="font-headline-md text-headline-md text-on-surface">Security</legend>
                      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-1 sm:mt-0">{"SECTION // 04"}</span>
                    </div>
                    {/* Passcode Update Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
                      <div className="space-y-space-xs">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface block" htmlFor="current-pass">Current Passcode</label>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-numeral focus:border-primary-container focus:outline-hidden rounded-[2px]" id="current-pass" type="password" defaultValue="••••••••••••" />
                      </div>
                      <div className="space-y-space-xs">
                        <div className="flex justify-between items-center">
                          <label className="font-label-mono text-label-mono uppercase text-on-surface" htmlFor="new-pass">New Passcode</label>
                          <span className="font-label-mono text-label-mono text-primary font-bold">STRONG</span>
                        </div>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-numeral focus:border-primary-container focus:outline-hidden rounded-[2px]" id="new-pass" type="password" defaultValue="vB-Munich_2025!" />
                        {/* Password Strength Meter: 4 Segments */}
                        <div aria-label="Passcode Strength: 4 out of 4" className="grid grid-cols-4 gap-1 pt-1">
                          <div className="h-1 bg-primary" />
                          <div className="h-1 bg-primary" />
                          <div className="h-1 bg-primary" />
                          <div className="h-1 bg-primary" />
                        </div>
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-mono text-label-mono uppercase text-on-surface block" htmlFor="confirm-pass">Confirm New Passcode</label>
                        <input className="w-full h-12 px-space-sm bg-surface-container-lowest border border-outline-variant text-on-surface font-spec-numeral focus:border-primary-container focus:outline-hidden rounded-[2px]" id="confirm-pass" type="password" defaultValue="vB-Munich_2025!" />
                      </div>
                    </div>
                    {/* Active Sessions List */}
                    <div className="space-y-space-xs pt-space-md">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface block">Authenticated Sessions</span>
                      <div className="border border-outline-variant bg-surface-container-lowest divide-y divide-outline-variant">
                        {/* Session 1: Current */}
                        <div className="p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                          <div className="flex items-center gap-space-sm">
                            <span className="w-2.5 h-2.5 bg-primary shrink-0" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-body-md text-body-md font-semibold text-on-surface">Munich, Germany · Safari on macOS</span>
                                <span className="font-label-mono text-[10px] tracking-wider uppercase bg-secondary-fixed text-primary px-1 py-0.5 font-bold">Active Now</span>
                              </div>
                              <p className="font-label-mono text-label-mono text-on-surface-variant mt-0.5">IP: 84.114.22.18 · SESSION ID: #HAL-MUC-991A</p>
                            </div>
                          </div>
                          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase self-start md:self-auto">Primary Terminal</span>
                        </div>
                        {/* Session 2 */}
                        <div className="p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                          <div className="flex items-center gap-space-sm">
                            <span className="w-2.5 h-2.5 bg-outline-variant shrink-0" />
                            <div>
                              <span className="font-body-md text-body-md font-medium text-on-surface">Zurich, Switzerland · Halden Mobile App (iOS 18)</span>
                              <p className="font-label-mono text-label-mono text-on-surface-variant mt-0.5">LAST ACTIVE: YESTERDAY 21:14 · IP: 178.197.230.12</p>
                            </div>
                          </div>
                          <button className="font-action text-action uppercase text-on-surface-variant hover:text-error transition-colors self-start md:self-auto" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Sign out</button>
                        </div>
                        {/* Session 3 */}
                        <div className="p-space-md flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
                          <div className="flex items-center gap-space-sm">
                            <span className="w-2.5 h-2.5 bg-outline-variant shrink-0" />
                            <div>
                              <span className="font-body-md text-body-md font-medium text-on-surface">Milan, Italy · Chrome on iPadOS</span>
                              <p className="font-label-mono text-label-mono text-on-surface-variant mt-0.5">LAST ACTIVE: 28 MAY 2025 · IP: 93.42.180.77</p>
                            </div>
                          </div>
                          <button className="font-action text-action uppercase text-on-surface-variant hover:text-error transition-colors self-start md:self-auto" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Sign out</button>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/* 05 // Danger Zone */}
                  <fieldset className="space-y-space-md pt-space-md">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-outline-variant pb-space-xs">
                      <legend className="font-headline-md text-headline-md text-error">Danger Zone</legend>
                      <span className="font-label-mono text-label-mono text-error uppercase tracking-widest mt-1 sm:mt-0">{"SECTION // 05"}</span>
                    </div>
                    <div className="bg-surface-container border border-outline-variant p-space-md flex flex-col sm:flex-row justify-between sm:items-center gap-space-md">
                      <div className="space-y-space-xs max-w-xl">
                        <span className="font-headline-sm text-headline-sm text-on-surface block">Decommission Patron Dossier</span>
                        <p className="font-body-md text-body-md text-on-surface-variant">Permanently purge your patron history, release verified driving credentials, and forfeit accrued Patron Circle reservation priority. This irreversible action revokes physical pavilion access tokens.</p>
                      </div>
                      <button className="font-action text-action uppercase text-error hover:bg-error-container hover:text-on-error-container px-space-md py-space-sm border border-error transition-colors shrink-0 rounded-[2px] text-center" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">Delete account / Void membership</button>
                    </div>
                  </fieldset>
                </form>
                {/* Sticky Save Bar */}
                <div className="sticky bottom-0 z-40 bg-surface-container-high border-t border-outline-variant p-space-md flex flex-col sm:flex-row justify-between items-center gap-space-sm mt-space-xl">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-none bg-amber-600 animate-pulse" />
                    <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface">{"UNSAVED CHANGES // EDITED 1 MIN AGO"}</span>
                  </div>
                  <div className="flex items-center gap-space-md w-full sm:w-auto justify-end">
                    <button className="font-action text-action uppercase text-on-surface hover:text-primary transition-colors px-space-sm py-space-xs" onClick={() => window.location.reload()} type="button">Discard changes</button>
                    <button className="bg-primary-container text-on-primary font-action text-action uppercase tracking-widest px-6 py-3 rounded-[2px] hover:bg-primary transition-colors" onClick={() => setSaved(true)} type="button">Save changes</button>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/* Confirmation Toast Notification (Bottom Right) */}
          <aside aria-live="polite" hidden={!saved} className="fixed bottom-6 right-6 z-50 bg-inverse-surface border border-outline text-inverse-on-surface p-space-md max-w-md shadow-none flex items-start gap-space-sm transition-all duration-300 translate-y-0 opacity-100" id="confirmation-toast" role="status">
            <div className="w-5 h-5 bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5"><span className="material-symbols-outlined text-[16px]">check</span></div>
            <div className="flex flex-col gap-0.5">
              <span className="font-label-mono text-label-mono text-primary-fixed uppercase tracking-wider font-bold">SETTINGS SAVED</span>
              <p className="font-body-sm text-body-sm text-inverse-on-surface">Patron credentials and notification dispatch preferences updated in the archival ledger.</p>
            </div>
            <button aria-label="Close notification" className="text-on-tertiary-container hover:text-inverse-on-surface ml-auto -mr-1 -mt-1 p-1" onClick={() => setSaved(false)} type="button"><span className="material-symbols-outlined text-[18px]">close</span></button>
          </aside>
          {/* Interactive script for toast demo */}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
