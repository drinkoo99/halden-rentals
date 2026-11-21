"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_curbside_staff_today/code.html */
const ON = "h-10 flex items-center justify-center gap-2 bg-[#171B19] text-surface-bright rounded-sm shadow-sm transition-all";
const OFF = "h-10 flex items-center justify-center gap-2 text-on-surface-variant hover:text-on-surface transition-all";

export function CurbsideToday() {
  const [tab, setTab] = useState<"handovers" | "returns">("handovers");
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
        <h1 className="sr-only">Curbside — today’s handovers</h1>
        <div className="flex flex-col w-full text-on-surface">
          {/* Operational Hub Context Strip */}
          <section className="bg-surface-container-low px-4 py-3 border-b border-[#D8D6CE]">
            <div className="flex items-center justify-between">
              <button aria-label="Switch Operations Hub" className="flex items-center gap-1.5 text-left group active:opacity-75 transition-opacity" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                <span className="font-label-mono text-label-mono text-primary font-bold uppercase tracking-wider">HUB: MUNICH (MUC VIP T2)</span>
                {" "}
                <span className="material-symbols-outlined text-[16px] text-primary transition-transform group-hover:translate-y-0.5">expand_more</span>
              </button>
              <div className="flex items-center gap-1.5 bg-surface-container-high px-2 py-0.5 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                <span className="font-label-mono text-[10px] text-on-surface uppercase tracking-widest font-medium">8 SCHEDULED TODAY</span>
              </div>
            </div>
          </section>
          {/* Segmented Protocol Toggle */}
          <section className="bg-surface px-4 pt-4 pb-2">
            <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-high rounded-sm">
              <button aria-pressed={tab === "handovers"} className={tab === "handovers" ? ON : OFF} id="toggle-handovers" onClick={() => setTab("handovers")} type="button">
                <span className="font-label-mono text-action uppercase tracking-widest font-semibold">HANDOVERS</span>
                {" "}
                <span className="font-spec-numeral text-[11px] px-1.5 py-0.2 bg-white/20 rounded-sm">05</span>
              </button>
              <button aria-pressed={tab === "returns"} className={tab === "returns" ? ON : OFF} id="toggle-returns" onClick={() => setTab("returns")} type="button">
                <span className="font-label-mono text-action uppercase tracking-widest">RETURNS</span>
                {" "}
                <span className="font-spec-numeral text-[11px] px-1.5 py-0.2 bg-surface-container text-on-surface-variant rounded-sm">03</span>
              </button>
            </div>
          </section>
          {/* Telemetry Micro-Strip */}
          <section className="px-4 py-3 grid grid-cols-2 gap-3">
            <div className="bg-surface-container-low p-2.5 rounded-sm border border-[#D8D6CE]/80 flex flex-col gap-0.5">
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">CURBSIDE CADENCE</span>
              <div className="flex items-baseline gap-1 text-primary"><span className="font-label-mono text-spec-numeral font-bold">NEXT IN 24 MIN</span></div>
            </div>
            <div className="bg-surface-container-low p-2.5 rounded-sm border border-[#D8D6CE]/80 flex flex-col gap-0.5">
              <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">CHASSIS STAGING</span>
              <div className="flex items-baseline justify-between text-on-surface">
                <span className="font-label-mono text-spec-numeral font-bold">4 / 5 SLOTS</span>
                <span className="font-label-mono text-[10px] text-primary-container font-semibold">80% READY</span>
              </div>
            </div>
          </section>
          {/* Curbside Schedule Deck */}
          <div className="px-4 pb-6 space-y-4">
            {/* Item 01: Next Immediate Handover Card (Prominent Active Variant) */}
            <article className="bg-surface-container-lowest border-2 border-primary-container rounded-sm overflow-hidden shadow-sm">
              {/* Time Ribbon & Beacon */}
              <div className="bg-[#171B19] text-surface-bright px-3.5 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    {" "}
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-label-mono text-[12px] tracking-wider uppercase font-bold text-surface-bright">{"09:00 CEST // IN 24 MIN"}</span>
                </div>
                <span className="font-label-mono text-[10px] bg-primary-container px-2 py-0.5 rounded-sm text-surface-bright uppercase tracking-widest font-semibold">IMMEDIATE</span>
              </div>
              {/* Studio Stage Vehicle Thumbnail */}
              <div className="relative w-full aspect-[16/10] bg-surface-container-high overflow-hidden border-b border-[#D8D6CE]">
                <Photo src={media.curbsideRangeRoverToday} priority className="w-full h-full object-cover object-center" data-alt="Editorial catalog photography of a silver Range Rover Autobiography in a warm architectural studio, warm plaster textured backdrop, monolithic soft museum gallery lighting, precision showroom perspective, neutral limestone tones." sizes="100vw" alt="" />
                <div className="absolute top-2.5 left-2.5 bg-[#171B19]/80 backdrop-blur-sm text-surface-bright font-label-mono text-[10px] px-2 py-0.5 rounded-sm tracking-widest uppercase">CURBSIDE DOCK · BAY 04</div>
              </div>
              {/* Manifest & Client Technical Matrix */}
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-mono text-[11px] uppercase tracking-widest text-on-surface-variant">CATALOGUE REF. HL-094</span>
                    <span className="font-label-mono text-spec-numeral font-bold px-1.5 py-0.5 bg-surface-container-high text-on-surface rounded-sm">M-HL 4821</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-normal">Range Rover Autobiography</h2>
                  <p className="font-label-mono text-[11px] text-on-surface-variant uppercase mt-0.5 tracking-wider">{"V8 TWIN-TURBO · CHARENTE GREY // EBONY SEMI-ANILINE"}</p>
                </div>
                <div className="h-px bg-[#D8D6CE] w-full" />
                {/* Dossier Row */}
                <div className="flex items-start justify-between pt-0.5">
                  <div className="space-y-0.5">
                    <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">PATRON DOSSIER</span>
                    <div className="font-body-md text-[14px] font-semibold text-on-surface">Clara von Bergmann</div>
                    <div className="font-label-mono text-[10px] text-primary font-medium tracking-wider uppercase">TIER II PATRON · 4 EXPEDITIONS</div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">TELEMETRY STATUS</span>
                    <span className="inline-flex items-center gap-1 bg-[#344A3D] text-[#F5F3EE] font-label-mono text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm tracking-wider">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      {" "}READY FOR STAGING
                    </span>
                  </div>
                </div>
                {/* Large Action Button */}
                <div className="pt-2">
                  <Link href="/staff/curbside/handover" className="w-full h-12 bg-primary-container text-surface-bright hover:bg-primary active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-action text-action uppercase tracking-widest rounded-sm font-semibold shadow-sm">
                    <span>START HANDOVER PROTOCOL</span>
                    {" "}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
            {/* Item 02: Second Handover Card (Upcoming / In Preparation) */}
            <article className="bg-surface-container-lowest border border-[#D8D6CE] rounded-sm overflow-hidden">
              {/* Time Sub-ribbon */}
              <div className="bg-surface-container-high text-on-surface px-3.5 py-2 flex items-center justify-between border-b border-[#D8D6CE]">
                <div className="flex items-center gap-2 font-label-mono text-spec-numeral font-bold">
                  <span className="w-1.5 h-1.5 bg-[#C98A2C] rounded-full" />
                  <span>{"10:30 CEST // IN 1H 14M"}</span>
                </div>
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">BAY 02</span>
              </div>
              <div className="p-3.5 flex gap-3">
                {/* 3:2 Car Thumbnail */}
                <div className="w-32 h-24 bg-surface-container-high rounded-sm overflow-hidden shrink-0 relative border border-[#D8D6CE]"><Photo src={media.curbsideGt3Today} className="w-full h-full object-cover object-center" data-alt="Monochrome studio portrait of a jet black Porsche 911 GT3 Touring on natural stone flooring, architectural warm interior studio wall, soft ceiling light reflections, luxury catalog styling." sizes="126px" alt="" /></div>
                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-spec-numeral font-bold text-on-surface">ZH-91104</span>
                      <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 rounded-sm bg-[#C98A2C]/15 text-[#8F5E16] font-semibold tracking-wider">PREPARATION</span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] text-on-surface leading-snug truncate mt-0.5 font-normal">Porsche 911 GT3 Touring</h3>
                    <p className="font-label-mono text-[10px] text-on-surface-variant truncate uppercase mt-0.5">Henrik Lindqvist · Tier I</p>
                  </div>
                  <button className="w-full mt-2 py-1.5 px-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-action text-[11px] uppercase tracking-wider rounded-sm text-center font-semibold transition-colors flex items-center justify-center gap-1" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[14px]">checklist</span>
                    {" "}
                    <span>VIEW STAGING CHECKLIST</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Item 03: Third Handover Card (Cleared & Valet Staged) */}
            <article className="bg-surface-container-lowest border border-[#D8D6CE] rounded-sm overflow-hidden">
              {/* Time Sub-ribbon */}
              <div className="bg-surface-container-high text-on-surface px-3.5 py-2 flex items-center justify-between border-b border-[#D8D6CE]">
                <div className="flex items-center gap-2 font-label-mono text-spec-numeral font-bold">
                  <span className="w-1.5 h-1.5 bg-[#344A3D] rounded-full" />
                  <span>11:15 CEST</span>
                </div>
                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">BAY 01</span>
              </div>
              <div className="p-3.5 flex gap-3">
                {/* 3:2 Car Thumbnail */}
                <div className="w-32 h-24 bg-surface-container-high rounded-sm overflow-hidden shrink-0 relative border border-[#D8D6CE]"><Photo src={media.curbsideSClassToday} className="w-full h-full object-cover object-center" data-alt="Studio exhibition photograph of a grey Mercedes-Benz S-Class sedan poised inside a serene minimalist concrete showroom, warm stone architectural surroundings, low angle clean reflections." sizes="126px" alt="" /></div>
                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-spec-numeral font-bold text-on-surface">GE-40219</span>
                      <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary font-semibold tracking-wider">CLEARED</span>
                    </div>
                    <h3 className="font-headline-sm text-[16px] text-on-surface leading-snug truncate mt-0.5 font-normal">Mercedes-Benz S 580</h3>
                    <p className="font-label-mono text-[10px] text-on-surface-variant truncate uppercase mt-0.5">Dr. Isabella Moreau · Founder</p>
                  </div>
                  <button className="w-full mt-2 py-1.5 px-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-action text-[11px] uppercase tracking-wider rounded-sm text-center font-medium transition-colors flex items-center justify-center gap-1" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    {" "}
                    <span>REVIEW DOSSIER</span>
                  </button>
                </div>
              </div>
            </article>
            {/* Item 04: Fourth Handover Card (Needs Attention / Conflict Warning) */}
            <article className="bg-surface-container-lowest border border-[#D8D6CE] rounded-sm overflow-hidden border-l-4 border-l-[#B94A48]">
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-spec-numeral font-bold text-on-surface">14:00 CEST</span>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">· BAY 05</span>
                  </div>
                  <span className="font-label-mono text-[9px] uppercase px-2 py-0.5 rounded-sm bg-[#B94A48]/15 text-[#A3403E] font-bold tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">warning</span>
                    {" "}PRE-AUTH PENDING
                  </span>
                </div>
                <div className="flex items-baseline justify-between pt-0.5">
                  <div>
                    <h3 className="font-body-md text-[15px] font-semibold text-on-surface">Marcus Sterling</h3>
                    <p className="font-label-mono text-[11px] text-on-surface-variant uppercase mt-0.5">
                      Lexus LC 500 ·{" "}
                      <span className="font-bold text-on-surface">MI-77210</span>
                    </p>
                  </div>
                  <button className="font-label-mono text-[11px] text-[#B94A48] font-bold underline underline-offset-2 hover:opacity-80 active:opacity-60 transition-opacity" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">RE-TRIGGER SMS →</button>
                </div>
              </div>
            </article>
          </div>
          {/* Operational Footer Link & Telemetry Refresh */}
          <div className="px-4 py-4 mt-auto mb-2 border-t border-[#D8D6CE] flex flex-col items-center gap-1.5 text-center">
            <button className="font-label-mono text-action text-primary flex items-center gap-1.5 hover:underline tracking-widest uppercase active:opacity-75 transition-opacity" type="button" disabled data-planned="quiet" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
              <span className="material-symbols-outlined text-[16px]">sync</span>
              {" "}
              <span>REFRESH DISPATCH TELEMETRY</span>
            </button>
            <span className="font-label-mono text-[10px] text-on-surface-variant tracking-wider">{"ENCRYPTED CURBSIDE LINK // LATENCY: 14MS"}</span>
          </div>
        </div>
      </main>
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#171B19]/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.18)]">
        <div className="flex justify-between items-stretch h-16 px-2">
          <Link aria-current="page" className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors px-1 text-surface-bright bg-white/10" href="/staff/curbside">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">TODAY</span>
          </Link>
          <Link className="flex-1 flex flex-col items-center justify-center gap-1 text-tertiary-fixed-dim hover:text-surface-bright transition-colors px-1" href="/staff/curbside/handover">
            <span className="material-symbols-outlined text-[20px]">checklist</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">HANDOVER</span>
          </Link>
          <Link className="flex-1 flex flex-col items-center justify-center gap-1 text-tertiary-fixed-dim hover:text-surface-bright transition-colors px-1" href="/staff/curbside/lookup">
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
