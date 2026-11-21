"use client";

import Link from "next/link";

import { useState } from "react";
/** Stitch screen "" — generated from design/stitch-export-round2/halden_mobile_patron_settings/code.html */
export function AccountSettingsMobile() {
  const [open, setOpen] = useState(1);
  const [saved, setSaved] = useState(false);
  const toggle = (n: number) => setOpen((o) => (o === n ? 0 : n));
  return (
    <div className="md:hidden bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(23,26,24,0.02)]">
        <div className="h-16 px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <Link aria-label="Navigate back" className="w-11 h-11 -ml-2 flex items-center justify-center text-on-surface hover:text-primary transition-colors" href="/account"><span className="material-symbols-outlined text-[20px]">arrow_back</span></Link>
            <div className="flex flex-col">
              <span className="font-label-mono text-[9px] uppercase tracking-[0.16em] text-on-surface-variant font-medium">DOSSIER SPECIFICATION</span>
              <h1 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Patron Settings</h1>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full pt-16 bg-surface flex flex-col">
        <div className="flex flex-col w-full pb-32">
          {/* Archival Dossier Identification Bar */}
          <div className="px-gutter-mobile py-space-md bg-surface-container-low flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-label-mono tracking-widest text-on-surface-variant uppercase">ARCHIVE DOSSIER RECORD</span>
              <span className="font-label-mono text-[10px] tracking-widest text-primary font-semibold uppercase bg-secondary-container px-2 py-0.5 rounded-[1px]">ACTIVE PATRON</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight mt-1">Account Settings</h2>
            <p className="font-label-mono text-[11px] text-on-surface-variant tracking-wider uppercase">№ 802 · CLARA VON BERGMANN · ATELIER-V.CH</p>
          </div>
          {/* Editorial Accordion Stack */}
          <div className="w-full flex flex-col">
            {/* SECTION 01: EXPANDED */}
            <div className="flex flex-col bg-surface">
              <button aria-controls="sec-1" aria-expanded={open === 1} className="w-full px-gutter-mobile py-4 flex items-center justify-between text-left bg-surface-container-low transition-colors" onClick={() => toggle(1)} type="button">
                <div className="flex items-baseline gap-2">
                  <span className="font-label-mono text-label-mono text-primary font-bold">{"01 //"}</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-normal">Personal Details</span>
                </div>
                {" "}
                <span className={`material-symbols-outlined text-primary text-[20px] transform transition-transform duration-200 ${open === 1 ? "rotate-180" : ""}`} id="sec-1-icon">expand_more</span>
              </button>
              <div className={`${open === 1 ? "flex" : "hidden"} flex-col px-gutter-mobile py-space-md gap-4 bg-surface`} id="sec-1">
                {/* Forename & Surname Pair */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="m-settings-1" className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-wider">Forename</label>
                      <span className="font-label-mono text-[9px] text-outline uppercase">PASSPORT ID</span>
                    </div>
                    <div className="h-[52px] bg-surface-container-lowest px-3 flex items-center rounded-[2px] shadow-sm"><input id="m-settings-1" className="w-full bg-transparent font-body-md text-on-surface focus:outline-hidden" type="text" defaultValue="Clara" /></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="m-settings-2" className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-wider">Surname</label>
                      <span className="font-label-mono text-[9px] text-outline uppercase">PASSPORT ID</span>
                    </div>
                    <div className="h-[52px] bg-surface-container-lowest px-3 flex items-center rounded-[2px] shadow-sm"><input id="m-settings-2" className="w-full bg-transparent font-body-md text-on-surface focus:outline-hidden" type="text" defaultValue="von Bergmann" /></div>
                  </div>
                </div>
                {/* Custodial Email */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="m-settings-3" className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-wider">Custodial Email</label>
                    <span className="font-label-mono text-[9px] text-primary flex items-center gap-1 font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-primary" />
                      {" "}VERIFIED
                    </span>
                  </div>
                  <div className="h-[52px] bg-surface-container-lowest px-3 flex items-center rounded-[2px] shadow-sm justify-between">
                    <input id="m-settings-3" className="w-full bg-transparent font-body-md text-on-surface focus:outline-hidden" type="email" defaultValue="clara.bergmann@atelier-v.ch" />
                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  </div>
                </div>
                {/* Mobile Phone Error State Demo */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="m-settings-4" className="font-label-mono text-[10px] uppercase text-error tracking-wider font-semibold">Mobile Telephone</label>
                    <span className="font-label-mono text-[9px] text-error font-bold uppercase tracking-wider">{"REQUIRED // INVALID FORMAT"}</span>
                  </div>
                  <div className="h-[52px] bg-error-container/20 px-3 flex items-center rounded-[2px] shadow-sm justify-between">
                    <input id="m-settings-4" className="w-full bg-transparent font-spec-numeral text-error font-medium focus:outline-hidden" type="tel" defaultValue="089 / 41-T2" />
                    <span className="material-symbols-outlined text-error text-[18px]">error</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-error leading-tight mt-0.5">Please enter a valid Swiss or EU mobile telephone number (+41 / +49).</p>
                </div>
                {/* Date of Birth */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-label-mono text-[10px] uppercase text-on-surface-variant tracking-wider">Date of Birth</label>
                    <span className="font-label-mono text-[9px] text-on-secondary-container bg-secondary-container px-1.5 py-0.5 uppercase tracking-wider font-medium">{"AGE: 36 // TIER-1 CLEARANCE"}</span>
                  </div>
                  <div className="h-[52px] bg-surface-container-lowest px-3 flex items-center rounded-[2px] shadow-sm justify-between">
                    <span className="font-spec-numeral text-body-md text-on-surface">14 / 08 / 1988</span>
                    <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-outline uppercase tracking-wider">Official archive verification locked by registry</span>
                </div>
              </div>
            </div>
            {/* SECTION 02: COLLAPSED */}
            <div className="flex flex-col bg-surface">
              <button aria-controls="sec-2" aria-expanded={open === 2} className="w-full px-gutter-mobile py-4 flex items-center justify-between text-left bg-surface-container-low transition-colors" onClick={() => toggle(2)} type="button">
                <div className="flex items-baseline gap-2">
                  <span className="font-label-mono text-label-mono text-outline font-bold">{"02 //"}</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-normal">Driving Licence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[10px] text-primary bg-secondary-container px-2 py-0.5 uppercase tracking-wider">VERIFIED</span>
                  <span className={`material-symbols-outlined text-on-surface-variant text-[20px] transform transition-transform duration-200 ${open === 2 ? "rotate-180" : ""}`} id="sec-2-icon">expand_more</span>
                </div>
              </button>
              <div className={`${open === 2 ? "flex" : "hidden"} flex-col px-gutter-mobile py-space-md gap-3 bg-surface`} id="sec-2">
                <div className="p-3 bg-surface-container flex flex-col gap-2 rounded-[2px]">
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Class Category</span>
                    <span className="font-spec-numeral text-body-sm text-on-surface font-semibold">Category B / BE (Switzerland)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Licence ID</span>
                    <span className="font-spec-numeral text-body-sm text-on-surface">B-84920419-ZH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Validity</span>
                    <span className="font-label-mono text-[11px] text-primary uppercase font-bold">PERPETUAL INDEFINITE</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SECTION 03: COLLAPSED */}
            <div className="flex flex-col bg-surface">
              <button aria-controls="sec-3" aria-expanded={open === 3} className="w-full px-gutter-mobile py-4 flex items-center justify-between text-left bg-surface-container-low transition-colors" onClick={() => toggle(3)} type="button">
                <div className="flex items-baseline gap-2">
                  <span className="font-label-mono text-label-mono text-outline font-bold">{"03 //"}</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-normal">Preferences</span>
                </div>
                {" "}
                <span className={`material-symbols-outlined text-on-surface-variant text-[20px] transform transition-transform duration-200 ${open === 3 ? "rotate-180" : ""}`} id="sec-3-icon">expand_more</span>
              </button>
              <div className={`${open === 3 ? "flex" : "hidden"} flex-col px-gutter-mobile py-space-md gap-3 bg-surface`} id="sec-3">
                <div className="p-3 bg-surface-container flex flex-col gap-2.5 rounded-[2px]">
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Primary Hub</span>
                    <span className="font-body-sm text-on-surface font-semibold">Munich MUC · Pavilion 4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Dispatch Protocol</span>
                    <span className="font-body-sm text-on-surface">Concierge Handover</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Telemetry Brief</span>
                    <span className="font-body-sm text-on-surface">SMS + Encrypted Email</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SECTION 04: COLLAPSED */}
            <div className="flex flex-col bg-surface">
              <button aria-controls="sec-4" aria-expanded={open === 4} className="w-full px-gutter-mobile py-4 flex items-center justify-between text-left bg-surface-container-low transition-colors" onClick={() => toggle(4)} type="button">
                <div className="flex items-baseline gap-2">
                  <span className="font-label-mono text-label-mono text-outline font-bold">{"04 //"}</span>
                  <span className="font-headline-sm text-[18px] text-on-surface font-normal">{"Security & Passcode"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[10px] text-on-surface-variant bg-surface-container-high px-2 py-0.5 uppercase tracking-wider">3 SESSIONS</span>
                  <span className={`material-symbols-outlined text-on-surface-variant text-[20px] transform transition-transform duration-200 ${open === 4 ? "rotate-180" : ""}`} id="sec-4-icon">expand_more</span>
                </div>
              </button>
              <div className={`${open === 4 ? "flex" : "hidden"} flex-col px-gutter-mobile py-space-md gap-3 bg-surface`} id="sec-4">
                <div className="p-3 bg-surface-container flex flex-col gap-2 rounded-[2px]">
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Keycard Passcode</span>
                    <span className="font-spec-numeral text-body-sm text-on-surface">•••••••• (Updated 12d ago)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Active Session</span>
                    <span className="font-spec-numeral text-body-sm text-primary font-medium">Munich Atelier iOS [Active]</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SECTION 05: COLLAPSED (DANGER ZONE) */}
            <div className="flex flex-col bg-surface">
              <button aria-controls="sec-5" aria-expanded={open === 5} className="w-full px-gutter-mobile py-4 flex items-center justify-between text-left bg-surface-container-low transition-colors" onClick={() => toggle(5)} type="button">
                <div className="flex items-baseline gap-2">
                  <span className="font-label-mono text-label-mono text-error font-bold">{"05 //"}</span>
                  <span className="font-headline-sm text-[18px] text-error font-normal">Danger Zone</span>
                </div>
                {" "}
                <span className={`material-symbols-outlined text-error text-[20px] transform transition-transform duration-200 ${open === 5 ? "rotate-180" : ""}`} id="sec-5-icon">expand_more</span>
              </button>
              <div className={`${open === 5 ? "flex" : "hidden"} flex-col px-gutter-mobile py-space-md gap-3 bg-surface-container-low`} id="sec-5">
                <div className="p-4 bg-surface flex flex-col gap-2 rounded-[2px] shadow-sm">
                  <h3 className="font-headline-sm text-[18px] text-on-surface font-normal">Decommission Dossier</h3>
                  <p className="font-body-sm text-on-surface-variant">Terminating this atelier profile revokes all bespoke driving privileges, archive vehicle allocations, and confidential concierge services across the European network.</p>
                  <div className="mt-2 pt-2 flex justify-start">
                    <button className="font-action text-action text-error uppercase tracking-wider flex items-center gap-1.5 py-2 hover:opacity-80 transition-opacity" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                      <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                      {" "}
                      <span>{"Delete Account & Archival Record"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Transient Floating Confirmation Pill / Notification */}
          <div hidden={!saved} role="status" className="fixed top-20 inset-x-4 z-40 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-[2px] shadow-md flex items-center justify-between transition-all duration-300 transform translate-y-0 opacity-100" id="statusToast">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-fixed rounded-full animate-pulse" />
              <span className="font-label-mono text-[11px] tracking-wide uppercase">Settings saved · Archival ledger updated</span>
            </div>
            <button aria-label="Dismiss toast" className="text-inverse-on-surface hover:opacity-75 flex items-center" onClick={() => setSaved(false)} type="button"><span className="material-symbols-outlined text-[16px]">close</span></button>
          </div>
          {/* Sticky Bottom Patron Bar */}
          <aside className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md px-gutter-mobile py-3 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between max-w-md mx-auto gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                <span className="font-label-mono text-[11px] font-bold text-on-surface tracking-wider uppercase">{saved ? "● ALL CHANGES SAVED" : "● UNSAVED CHANGES"}</span>
              </div>
              <button className="h-12 px-6 bg-primary text-on-primary font-action text-action uppercase tracking-widest rounded-[2px] flex items-center justify-center hover:opacity-95 active:scale-[0.99] transition-all" onClick={() => setSaved(true)} type="button">Save changes</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
