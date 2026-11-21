"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_curbside_staff_booking_lookup/code.html */
export function CurbsideLookup() {
  const router = useRouter();
  const [query, setQuery] = useState("HLD-0612");
  const [scanning, setScanning] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-[#171B19]/95 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex flex-col justify-center gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm tracking-tight text-white uppercase">HALDEN</span>
              <span className="font-label-mono text-label-mono text-surface-dim tracking-widest">{"OPS // CURBSIDE"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-primary-container">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-label-mono text-[10px] uppercase tracking-wider text-surface-container-highest">M. WEBER · MUC T2</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Sync Status" className="w-11 h-11 flex items-center justify-center text-surface-container-highest active:bg-white/5 transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true"><span className="material-symbols-outlined text-[20px]">sync</span></button>
            <button aria-label="Notifications" className="relative w-11 h-11 flex items-center justify-center text-surface-container-highest active:bg-white/5 transition-colors" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <h1 className="sr-only">Curbside — reservation lookup</h1>
        <div className="flex flex-col w-full">
          {/* Staff Operational Header / Mode Pill */}
          <section className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-[#D8D6CE]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-none bg-primary-container inline-block" />
              <span className="font-label-mono text-[10px] tracking-widest uppercase text-tertiary">{"DISPATCH REGISTER // ARCHIVE SEARCH"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-mono text-[10px] text-tertiary-container bg-surface-container-high px-2 py-0.5 uppercase tracking-wider">LIVE MUC-T2</span>
              <span className="font-spec-numeral text-spec-numeral text-primary font-bold">08:54:19</span>
            </div>
          </section>
          {/* Query & Optical Input Unit */}
          <section className="p-4 bg-surface-container-low flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="flex-1 relative flex items-center bg-surface-container-lowest border border-[#D8D6CE] focus-within:border-primary-container transition-colors">
                <span className="material-symbols-outlined text-outline ml-3 text-[19px]">search</span>
                <input className="w-full bg-transparent py-3 pl-2.5 pr-8 font-label-mono text-spec-numeral text-on-surface focus:outline-hidden placeholder:text-outline-variant placeholder:font-body-sm" id="search-input" placeholder="Search booking ref (e.g. HLD-0612) or plate..." ref={input} type="text" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search booking reference or plate" />
                <button aria-label="Clear Query" className="absolute right-2.5 w-6 h-6 flex items-center justify-center text-outline hover:text-on-surface" id="clear-search-btn" onClick={() => {
                  setQuery("");
                  input.current?.focus();
                }} type="button"><span className="material-symbols-outlined text-[16px]">close</span></button>
              </div>
              {/* Plate Scanner Trigger */}
              <button aria-label="Scan Plate or QR Code" className="h-12 px-3.5 bg-primary-container text-on-primary font-label-mono text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 active:bg-primary transition-colors shrink-0" id="camera-scan-trigger" onClick={() => setScanning(true)} type="button">
                <span className="material-symbols-outlined text-[18px]">document_scanner</span>
                {" "}
                <span className="hidden sm:inline">SCAN</span>
              </button>
            </div>
            {/* Quick Queries Row */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">RECENT DISPATCH QUERIES</span>
                <button className="font-label-mono text-[10px] tracking-wider text-outline hover:text-on-surface uppercase underline" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">PURGE</button>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button className="query-chip shrink-0 px-2.5 py-1.5 bg-surface-container-high border border-[#D8D6CE] font-label-mono text-[11px] text-on-surface hover:bg-surface-container-highest transition-colors active:scale-[0.98]" onClick={() => setQuery("HLD-0612-4821")} type="button">HLD-0612-4821</button>
                <button className="query-chip shrink-0 px-2.5 py-1.5 bg-surface-container border border-[#D8D6CE] font-label-mono text-[11px] text-tertiary-container hover:bg-surface-container-highest transition-colors" onClick={() => setQuery("ZH-91104")} type="button">ZH-91104</button>
                <button className="query-chip shrink-0 px-2.5 py-1.5 bg-surface-container border border-[#D8D6CE] font-label-mono text-[11px] text-tertiary-container hover:bg-surface-container-highest transition-colors" onClick={() => setQuery("Clara von Bergmann")} type="button">Clara von Bergmann</button>
                <button className="query-chip shrink-0 px-2.5 py-1.5 bg-surface-container border border-[#D8D6CE] font-label-mono text-[11px] text-tertiary-container hover:bg-surface-container-highest transition-colors" onClick={() => setQuery("W-8821H")} type="button">W-8821H</button>
                <button className="query-chip shrink-0 px-2.5 py-1.5 bg-surface-container border border-[#D8D6CE] font-label-mono text-[11px] text-tertiary-container hover:bg-surface-container-highest transition-colors" onClick={() => setQuery("HLD-0841")} type="button">HLD-0841</button>
              </div>
            </div>
          </section>
          {/* Notification Banner for Match */}
          <div className="px-4 py-2 bg-surface-container-high border-y border-[#D8D6CE] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary-container rounded-none" />
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-primary-container font-semibold">{"EXACT RECORD MATCH // ACTIVE CURBSIDE DOSSIER"}</span>
            </div>
            <span className="font-label-mono text-[10px] text-outline">INDEX 01/01</span>
          </div>
          {/* Primary Exhibit Dossier Record */}
          <section className="p-4 flex flex-col gap-4 bg-surface">
            <div className="bg-surface-container border border-[#D8D6CE] p-4 flex flex-col gap-3">
              {/* Card Head: Dossier Reference & Telemetry Status */}
              <div className="flex items-start justify-between border-b border-[#D8D6CE] pb-3">
                <div>
                  <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary block">PRIMARY RECORD INDEX</span>
                  <h2 className="font-spec-numeral text-[17px] font-bold tracking-tight text-on-surface">HLD-0612-4821</h2>
                </div>
                <div className="flex items-center gap-1.5 bg-primary-container text-on-primary px-2.5 py-1">
                  <span className="w-1.5 h-1.5 bg-[#84E1A7] inline-block animate-pulse" />
                  <span className="font-label-mono text-[9px] uppercase tracking-widest font-semibold">ARRIVING NOW</span>
                </div>
              </div>
              {/* Vehicle Stage Portrait */}
              <div className="relative w-full aspect-[16/10] bg-[#171B19] overflow-hidden border border-[#D8D6CE]">
                <Photo src={media.curbsideRangeRoverLookup} priority className="w-full h-full object-cover object-center" data-alt="Editorial gallery photograph of a Range Rover Autobiography parked in a sculptural warm stone architectural atrium. Architectural museum lighting illuminates the sleek silver metallic paint and crisp character lines. The backdrop is muted warm beige plaster, high-end catalog aesthetic." sizes="363px" alt="" />
                <div className="absolute bottom-0 left-0 right-0 bg-[#171B19]/85 backdrop-blur-sm px-3 py-2 flex items-center justify-between text-on-primary border-t border-[#323834]">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-[10px] tracking-wider text-surface-container-highest uppercase">CURBSIDE STAGING</span>
                    <span className="font-spec-numeral text-spec-numeral font-bold text-white">BAY 04</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-[10px] text-surface-container-highest tracking-widest uppercase">REG</span>
                    <span className="bg-[#121E14] px-2 py-0.5 font-label-mono text-[11px] font-bold text-white border border-[#344A3D]">M-HL 4821</span>
                  </div>
                </div>
              </div>
              {/* Exhibition Vehicle Metadata Specs */}
              <div className="flex flex-col gap-1 pt-1">
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">SCULPTURAL ASSET</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Range Rover Autobiography (2024)</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">4.4L V8 Twin-Turbocharged · Charente Grey Metallic · Perlino Semi-Aniline Leather</p>
              </div>
              {/* Grid Meta Matrix */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#D8D6CE] bg-surface-container-lowest/60 p-3">
                {/* Patron Profile Column */}
                <div className="flex flex-col gap-1 border-r border-[#D8D6CE] pr-2">
                  <span className="font-label-mono text-[9px] uppercase tracking-widest text-secondary">PATRON DOSSIER</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">Clara von Bergmann</span>
                  <span className="font-label-mono text-[10px] text-primary-container font-medium tracking-wide">PATRON TIER II · 4 PRIOR JOURNEYS</span>
                  <a className="font-spec-numeral text-[12px] text-on-surface flex items-center gap-1 mt-1 text-primary" href="tel:+498921094432">
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    {" "}+49 89 2109 4432
                  </a>
                </div>
                {/* Curbside Schedule Column */}
                <div className="flex flex-col gap-1 pl-1">
                  <span className="font-label-mono text-[9px] uppercase tracking-widest text-secondary">DIURNAL WINDOW</span>
                  <span className="font-spec-numeral text-[13px] font-semibold text-on-surface">TODAY 09:00 CEST</span>
                  <span className="font-label-mono text-[10px] text-secondary">UNTIL 15 JUN 10:00 CEST</span>
                  <span className="font-label-mono text-[9px] text-outline uppercase tracking-wider mt-1">3 DIURNAL CYCLES</span>
                </div>
              </div>
              {/* Bespoke Provisions Block */}
              <div className="flex flex-col gap-1.5 bg-surface-container-low p-2.5 border border-[#D8D6CE]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-primary-container">inventory_2</span>
                  <span className="font-label-mono text-[10px] uppercase tracking-widest font-semibold text-on-surface">CURATED ON-BOARD PROVISIONS</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  <span className="bg-surface-container-highest px-2 py-0.5 font-label-mono text-[10px] text-on-surface border border-[#D8D6CE]">Michelin Star Hamper (Dallmayr)</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 font-label-mono text-[10px] text-on-surface border border-[#D8D6CE]">Pre-affixed AT/CH Toll Vignettes</span>
                  <span className="bg-surface-container-highest px-2 py-0.5 font-label-mono text-[10px] text-on-surface border border-[#D8D6CE]">Acqua di Parma Interior Scent 02</span>
                </div>
              </div>
              {/* Action Floor: Launch Protocol & Direct Curbside Ops */}
              <div className="flex flex-col gap-2 pt-2">
                <button className="w-full h-12 bg-primary-container text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary active:scale-[0.99] transition-all" id="launch-handover-btn" onClick={() => router.push("/staff/curbside/handover")} type="button">
                  <span>LAUNCH HANDOVER PROTOCOL</span>
                  {" "}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <a className="h-11 bg-transparent border border-[#171A18] text-on-surface font-label-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors active:bg-surface-dim" href="tel:+498921094432">
                    <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
                    {" "}
                    <span>CALL PATRON</span>
                  </a>
                  <button className="h-11 bg-transparent border border-[#171A18] text-on-surface font-label-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-colors active:bg-surface-dim" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    {" "}
                    <span>FULL DOSSIER</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Secondary Asset Telemetry Diagnostic Module */}
          <section className="px-4 pb-6 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{"TELEMETRY DIAGNOSTIC // M-HL 4821"}</span>
              <span className="font-label-mono text-[10px] text-emerald-800 font-semibold tracking-wider">STATUS: VERIFIED READY</span>
            </div>
            <div className="bg-surface-container-low border border-[#D8D6CE] p-3 grid grid-cols-3 gap-2">
              <div className="flex flex-col border-r border-[#D8D6CE] pr-2">
                <span className="font-label-mono text-[9px] uppercase tracking-wider text-secondary">FUEL TANK</span>
                <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface mt-0.5">100%</span>
                <span className="font-label-mono text-[9px] text-outline">820 KM RNG</span>
              </div>
              <div className="flex flex-col border-r border-[#D8D6CE] pr-2">
                <span className="font-label-mono text-[9px] uppercase tracking-wider text-secondary">12V AUX / SYS</span>
                <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface mt-0.5">99.4%</span>
                <span className="font-label-mono text-[9px] text-outline">OPTIMAL</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-mono text-[9px] uppercase tracking-wider text-secondary">TIRES (COLD)</span>
                <span className="font-spec-numeral text-spec-numeral font-bold text-on-surface mt-0.5">2.6 BAR</span>
                <span className="font-label-mono text-[9px] text-outline">ALL EQUAL</span>
              </div>
            </div>
            {/* Secondary Vehicle Stored in Same Bay */}
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-[10px] uppercase tracking-widest text-secondary">{"STANDBY EXHIBIT // ADJACENT BAY 05"}</span>
                <span className="font-label-mono text-[10px] text-outline uppercase">AVAILABLE POOL</span>
              </div>
              <div className="bg-surface-container border border-[#D8D6CE] p-3 flex items-center justify-between gap-3">
                <div className="w-20 h-14 bg-[#171B19] shrink-0 border border-[#D8D6CE] overflow-hidden"><Photo src={media.curbsideGt3Lookup} className="w-full h-full object-cover" data-alt="Monochromatic architectural profile photograph of a gloss black Porsche 911 GT3 Touring against a smooth pale limestone gallery wall. Soft museum spotlights create crisp reflections along the sculpted fender. High-end catalog composition." sizes="78px" alt="" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-mono text-[9px] text-secondary uppercase">CAT. № 07</span>
                    <span className="w-1 h-1 bg-outline rounded-none" />
                    <span className="font-label-mono text-[9px] text-tertiary uppercase">PLATE: M-GT 9920</span>
                  </div>
                  <h4 className="font-body-md text-body-md font-semibold text-on-surface truncate">911 GT3 Touring Package</h4>
                  <span className="font-label-mono text-[10px] text-outline block">Pre-flight Cleansed · Ready for Rapid Reallocation</span>
                </div>
                <button className="px-2.5 py-1.5 bg-surface-container-highest border border-[#D8D6CE] font-label-mono text-[10px] text-on-surface uppercase tracking-wider hover:bg-surface-dim transition-colors shrink-0" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">SWAP</button>
              </div>
            </div>
          </section>
          {/* Interactive Optical Scan Modal Drawer (Simulated) */}
          <div className={`${scanning ? "flex" : "hidden"} fixed inset-0 z-50 bg-[#171B19]/80 backdrop-blur-sm p-4 flex-col justify-end`} id="scan-modal" role="dialog" aria-modal="true" aria-label="Scan plate or QR code">
            <div className="bg-surface border border-[#D8D6CE] p-4 flex flex-col gap-4 max-w-md mx-auto w-full mb-8">
              <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">qr_code_scanner</span>
                  <span className="font-label-mono text-[11px] uppercase tracking-widest font-semibold text-on-surface">OPTICAL RECOGNITION ACTIVE</span>
                </div>
                <button className="w-8 h-8 flex items-center justify-center text-outline hover:text-on-surface" id="close-scan-btn" aria-label="Close scanner" onClick={() => setScanning(false)} type="button"><span className="material-symbols-outlined text-[20px]">close</span></button>
              </div>
              <div className="relative w-full aspect-video bg-[#171B19] flex items-center justify-center border border-[#323834] overflow-hidden">
                <div className="w-48 h-24 border-2 border-primary-container relative flex items-center justify-center">
                  <div className="w-full h-0.5 bg-[#84E1A7] animate-pulse" />
                  <span className="absolute -top-3 bg-[#171B19] px-2 font-label-mono text-[9px] text-[#84E1A7] tracking-widest uppercase">ALIGN EU PLATE / QR</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-mono text-[10px] text-secondary uppercase">SENSOR: HIGH ACCURACY OCR</span>
                <button className="bg-primary-container text-on-primary font-action text-action px-3 py-1.5 uppercase tracking-wider" id="simulate-scan-btn" onClick={() => {
                  setQuery("M-HL 4821");
                  setScanning(false);
                }} type="button">SIMULATE CAPTURE</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#171B19]/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.18)]">
        <div className="flex justify-between items-stretch h-16 px-2">
          <Link className="flex-1 flex flex-col items-center justify-center gap-1 text-tertiary-fixed-dim hover:text-surface-bright transition-colors px-1" href="/staff/curbside">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">TODAY</span>
          </Link>
          <Link className="flex-1 flex flex-col items-center justify-center gap-1 text-tertiary-fixed-dim hover:text-surface-bright transition-colors px-1" href="/staff/curbside/handover">
            <span className="material-symbols-outlined text-[20px]">checklist</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">HANDOVER</span>
          </Link>
          <Link aria-current="page" className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors px-1 text-surface-bright bg-white/10" href="/staff/curbside/lookup">
            <span className="material-symbols-outlined text-[20px]">barcode_scanner</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">LOOKUP</span>
          </Link>
          <Link className="flex-1 flex flex-col items-center justify-center gap-1 text-tertiary-fixed-dim hover:text-surface-bright transition-colors px-1" href="/staff/fleet">
            <span className="material-symbols-outlined text-[20px]">directions_car</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">FLEET</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
