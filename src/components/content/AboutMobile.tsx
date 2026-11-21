"use client";

import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/site/MobileMenu";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_about_the_standard_mobile/code.html */
export function AboutMobile() {
  const [sent, setSent] = useState(false);
  // #contact belongs to the desktop layout; on phones send that link to this enquiry section instead
  useEffect(() => {
    const go = () => {
      if (window.location.hash === "#contact" && window.matchMedia("(max-width: 767px)").matches) {
        document.getElementById("enquiry-section")?.scrollIntoView();
      }
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);
  return (
    <div className="md:hidden bg-surface text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-margin-mobile flex items-center justify-between">
          <MobileMenu variant="icon" triggerClassName="-ml-2" />
          <div className="flex items-center gap-space-sm">
            <Photo src={media.aboutCuratorPortrait} alt="HALDEN Atelier Concierge Curator" className="h-8 w-auto object-contain" sizes="(max-width: 767px) 100vw, 30vw" />
            <div className="flex flex-col items-center">
              <span className="font-headline-sm text-headline-sm uppercase tracking-[0.2em] text-on-surface leading-none">HALDEN</span>
              <span className="font-label-mono text-[9px] uppercase tracking-[0.25em] text-on-surface-variant/80 mt-1">ARCHIVE</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full text-on-surface">
          {/* 1) MANIFESTO HERO */}
          <section className="flex flex-col px-margin-mobile pt-space-md pb-space-lg">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">{"HALDEN STANDARD // EST. 1928"}</span>
              <span className="font-label-mono text-[10px] tracking-[0.16em] bg-surface-container px-2 py-0.5 text-on-surface-variant">ARCHIVAL REF. 01</span>
            </div>
            {/* Architectural Photograph (16:9) */}
            <div className="w-full aspect-[16/9] overflow-hidden bg-surface-container-high mb-space-md relative">
              <Photo src={media.aboutAtelierInterior} alt="Architectural gallery at Halden Atelier" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" sizes="100vw" />
              <div className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-sm px-2 py-0.5 text-on-primary font-label-mono text-[9px] tracking-[0.15em] uppercase">ZURICH APERTURE 01</div>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight mb-space-sm leading-[1.15]">A rental house built like a gallery.</h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">We reject the utilitarian convention of automobile hire. Halden curates mechanical sculpture: each chassis acquired for historical pedigree, tactile chassis feedback, and architectural presence. You do not collect a car from a queue; you take custody of an exhibit.</p>
            {/* Stat Strip / Micro Placard */}
            <div className="grid grid-cols-3 gap-2 mt-space-md pt-space-sm bg-surface-container-low p-3">
              <div>
                <p className="font-label-mono text-[9px] text-secondary tracking-widest uppercase">PERMANENT FLEET</p>
                <p className="font-spec-numeral text-spec-numeral text-primary font-medium mt-0.5">34 PIECES</p>
              </div>
              <div>
                <p className="font-label-mono text-[9px] text-secondary tracking-widest uppercase">ACQUISITION CAP</p>
                <p className="font-spec-numeral text-spec-numeral text-primary font-medium mt-0.5">99 UNITS</p>
              </div>
              <div>
                <p className="font-label-mono text-[9px] text-secondary tracking-widest uppercase">ALPINE LOGISTICS</p>
                <p className="font-spec-numeral text-spec-numeral text-primary font-medium mt-0.5">100% DIRECT</p>
              </div>
            </div>
          </section>
          {/* 2) THREE PRINCIPLES */}
          <section className="flex flex-col px-margin-mobile py-space-md bg-surface-container-lowest">
            <div className="flex items-center gap-2 mb-space-md">
              <span className="w-2 h-2 bg-primary" />
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">CANONICAL PROTOCOLS</span>
            </div>
            <div className="flex flex-col gap-space-md">
              {/* Principle 01 */}
              <article className="flex flex-col bg-surface-container-low p-5 transition-colors">
                <span className="font-label-mono text-[11px] text-secondary tracking-widest mb-1">{"01 // PROVENANCE"}</span>
                <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Chosen, not stocked</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Zero commuter appliances. Zero plastic switchgear. Every vehicle in the Halden repository is vetted by our curatorial council for uncompromised steering feel, analog weight distribution, and historical relevance.</p>
              </article>
              {/* Principle 02 */}
              <article className="flex flex-col bg-surface-container-low p-5 transition-colors">
                <span className="font-label-mono text-[11px] text-secondary tracking-widest mb-1">{"02 // DISPATCH"}</span>
                <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Ready where you land</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">No shuttle buses, no rental counter queues, no synthetic pleasantries. Your car stands staged at private aviation gates or VIP curbside bays, conditioned to temperature, fueled with high-octane distillates, key handed by your dedicated liaison.</p>
              </article>
              {/* Principle 03 */}
              <article className="flex flex-col bg-surface-container-low p-5 transition-colors">
                <span className="font-label-mono text-[11px] text-secondary tracking-widest mb-1">{"03 // TRANSPARENCY"}</span>
                <h2 className="font-headline-sm text-headline-sm text-primary mb-2">One clear price</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Transparent indemnity, cross-border Alpine passes, curated route cartography, and direct atelier concierge access are integrated into a single daily custodial rate. No line-item surprise.</p>
              </article>
            </div>
          </section>
          {/* 3) THE 48-POINT INSPECTION (Dark Room section #171B19) */}
          <section className="flex flex-col px-margin-mobile py-space-xl bg-[#171B19] text-[#F5F3EE]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-mono text-[10px] tracking-[0.22em] uppercase text-[#bbcbba]">TECHNICAL CUSTODY</span>
              <span className="font-label-mono text-[10px] tracking-[0.15em] bg-[#252A27] px-2 py-0.5 text-[#F5F3EE]">PASSED 48/48</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-[#F5F3EE] mb-2">The 48-Point Archival Inspection</h2>
            <p className="font-label-mono text-label-mono text-[#bbcbba] mb-space-md tracking-wider leading-relaxed">Exhaustive diagnostic protocol signed prior to key handover.</p>
            {/* Hairline 2x2 Grid of Inspection Diagnostic Cells */}
            <div className="grid grid-cols-2 gap-2 mb-space-md">
              <div className="bg-[#252A27] p-3 flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="font-label-mono text-spec-numeral text-[#bbcbba]">[ACO-01]</span>
                  <span className="w-1.5 h-1.5 bg-[#b4cdbb]" />
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-[#F5F3EE] font-medium leading-snug">{"Acoustic Harmonics & Exhaust Valves"}</p>
                  <p className="font-label-mono text-[10px] text-[#bbcbba]/70 mt-1">TOLERANCE ±0.2dB</p>
                </div>
              </div>
              <div className="bg-[#252A27] p-3 flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="font-label-mono text-spec-numeral text-[#bbcbba]">[ENG-03]</span>
                  <span className="w-1.5 h-1.5 bg-[#b4cdbb]" />
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-[#F5F3EE] font-medium leading-snug">{"Thermodynamics & Oil Viscosity"}</p>
                  <p className="font-label-mono text-[10px] text-[#bbcbba]/70 mt-1">SPECTROMETRY AUDIT</p>
                </div>
              </div>
              <div className="bg-[#252A27] p-3 flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="font-label-mono text-spec-numeral text-[#bbcbba]">[MEC-01]</span>
                  <span className="w-1.5 h-1.5 bg-[#b4cdbb]" />
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-[#F5F3EE] font-medium leading-snug">{"Kinematic Damping & Bushes"}</p>
                  <p className="font-label-mono text-[10px] text-[#bbcbba]/70 mt-1">LASER ALIGNED 0.05°</p>
                </div>
              </div>
              <div className="bg-[#252A27] p-3 flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="font-label-mono text-spec-numeral text-[#bbcbba]">[DET-01]</span>
                  <span className="w-1.5 h-1.5 bg-[#b4cdbb]" />
                </div>
                <div>
                  <p className="font-body-sm text-[12px] text-[#F5F3EE] font-medium leading-snug">{"Hydropathic Paint & Interior Tannery"}</p>
                  <p className="font-label-mono text-[10px] text-[#bbcbba]/70 mt-1">PH 5.5 CONDITIONED</p>
                </div>
              </div>
            </div>
            {/* Additional Micro Specs */}
            <div className="flex items-center justify-between p-3 bg-[#252A27] mb-space-md">
              <div className="flex items-center gap-2">
                <span className="font-label-mono text-[11px] text-[#bbcbba]">[DOC-01]</span>
                <span className="font-body-sm text-[13px] text-[#F5F3EE]">{"Physical Pass & Telemetry Seal"}</span>
              </div>
              <span className="font-label-mono text-[10px] text-[#b4cdbb] tracking-widest">VERIFIED</span>
            </div>
            {/* Compliance Stamp */}
            <div className="bg-primary/40 p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-mono text-[10px] tracking-[0.2em] text-[#b4cdbb] uppercase font-bold">ISO 9001 COMPLIANT · CUSTODIAL AUDIT</span>
                <span className="font-label-mono text-[9px] text-[#F5F3EE]/80 mt-0.5">GENEVA REGISTRY № CH-660.1.284.02</span>
              </div>
              <span className="material-symbols-outlined text-[#b4cdbb] text-[20px]">verified</span>
            </div>
          </section>
          {/* 4) CONTINENTAL HUBS */}
          <section className="flex flex-col px-margin-mobile py-space-xl bg-surface">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">{"CONTINENTAL HUBS // 05 STATIONS"}</span>
              <span className="font-label-mono text-[10px] text-primary bg-primary-fixed px-2 py-0.5">ACTIVE</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-space-sm">Curated Transit Corridors</h2>
            {/* Minimalist Monochrome Transit Corridor Vector Map */}
            <div className="w-full bg-surface-container p-4 mb-space-md relative overflow-hidden">
              <svg className="w-full h-36" fill="none" viewBox="0 0 340 140" xmlns="http://www.w3.org/2000/svg">
                {/* Connecting Corridors */}
                <path d="M170 30 L90 85 L140 115 L250 85 L280 20 L170 30" stroke="#737973" strokeDasharray="3 3" strokeWidth="1" />
                <path d="M170 30 L140 115" stroke="#1e3327" strokeWidth="1.5" />
                <path d="M90 85 L250 85" stroke="#1e3327" strokeWidth="1.5" />
                {/* Station Points */}
                {/* ZRH */}
                <circle cx="170" cy="30" fill="#1e3327" r="4" />
                <text fill="#191c1a" fontFamily="Space Mono" fontSize="9" letterSpacing="0.1em" x="178" y="33">ZRH [CENTRAL]</text>
                {/* MUC */}
                <circle cx="280" cy="20" fill="#546254" r="3.5" />
                <text fill="#424844" fontFamily="Space Mono" fontSize="8" x="235" y="16">MUC</text>
                {/* MXP */}
                <circle cx="140" cy="115" fill="#546254" r="3.5" />
                <text fill="#424844" fontFamily="Space Mono" fontSize="8" x="148" y="125">MXP</text>
                {/* SMV */}
                <circle cx="250" cy="85" fill="#546254" r="3.5" />
                <text fill="#424844" fontFamily="Space Mono" fontSize="8" x="258" y="90">SMV [ENGADIN]</text>
                {/* CPH */}
                <circle cx="90" cy="85" fill="#546254" r="3.5" />
                <text fill="#424844" fontFamily="Space Mono" fontSize="8" x="55" y="88">CPH</text>
              </svg>
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-mono text-[9px] text-secondary tracking-widest">ALPINE-NORDIC VECTOR GRID</span>
                <span className="font-label-mono text-[9px] text-primary">{"TRANSIT LAG < 45M"}</span>
              </div>
            </div>
            {/* Station Compact Cards Ledger */}
            <div className="flex flex-col gap-2">
              {/* ZRH */}
              <div className="p-3 bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-spec-numeral text-primary font-bold">ZRH</span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">Zurich</span>
                    <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1 font-label-mono">HEAD</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">Kloten Bay 02 · 24/7 Operations</span>
                </div>
                <a aria-label="Call Zurich Hub" className="h-11 px-3 bg-surface-container flex items-center justify-center text-primary active:bg-primary active:text-on-primary transition-colors text-action font-action" href="tel:+41448002401"><span className="material-symbols-outlined text-[18px]">call</span></a>
              </div>
              {/* MUC */}
              <div className="p-3 bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-spec-numeral text-primary font-bold">MUC</span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">Munich</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">VIP Curbside Bay 04 · 06:00–23:00</span>
                </div>
                <a aria-label="Call Munich Hub" className="h-11 px-3 bg-surface-container flex items-center justify-center text-primary active:bg-primary active:text-on-primary transition-colors text-action font-action" href="tel:+49899758200"><span className="material-symbols-outlined text-[18px]">call</span></a>
              </div>
              {/* MXP */}
              <div className="p-3 bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-spec-numeral text-primary font-bold">MXP</span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">Milan</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">Malpensa Bay 01 · 07:00–22:00</span>
                </div>
                <a aria-label="Call Milan Hub" className="h-11 px-3 bg-surface-container flex items-center justify-center text-primary active:bg-primary active:text-on-primary transition-colors text-action font-action" href="tel:+39027486200"><span className="material-symbols-outlined text-[18px]">call</span></a>
              </div>
              {/* SMV */}
              <div className="p-3 bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-spec-numeral text-primary font-bold">SMV</span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">St. Moritz</span>
                    <span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-1 font-label-mono">SEASON</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">Samedan Hangar · Private Ramp Delivery</span>
                </div>
                <a aria-label="Call St Moritz Hub" className="h-11 px-3 bg-surface-container flex items-center justify-center text-primary active:bg-primary active:text-on-primary transition-colors text-action font-action" href="tel:+41818510200"><span className="material-symbols-outlined text-[18px]">call</span></a>
              </div>
              {/* CPH */}
              <div className="p-3 bg-surface-container-low flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-spec-numeral text-primary font-bold">CPH</span>
                    <span className="font-body-md text-body-md font-medium text-on-surface">Copenhagen</span>
                  </div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">Kastrup Bay 07 · 06:00–23:00</span>
                </div>
                <a aria-label="Call Copenhagen Hub" className="h-11 px-3 bg-surface-container flex items-center justify-center text-primary active:bg-primary active:text-on-primary transition-colors text-action font-action" href="tel:+4532313200"><span className="material-symbols-outlined text-[18px]">call</span></a>
              </div>
            </div>
          </section>
          {/* 5) CONCIERGE TEAM */}
          <section className="flex flex-col px-margin-mobile py-space-xl bg-surface-container-low">
            <div className="flex items-center gap-2 mb-2"><span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">CURATORIAL BOARD</span></div>
            <h2 className="font-headline-md text-headline-md text-primary mb-1">The Atelier Concierge Desk</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">Personal custodians assigned to oversee provenance, flight rendezvous, and mountain clearance.</p>
            <div className="flex flex-col gap-space-md">
              {/* Profile 1 */}
              <div className="bg-surface p-4 flex flex-col">
                <div className="w-full aspect-[4/5] bg-surface-container overflow-hidden mb-3"><Photo src={media.aboutCuratorPortrait} alt="Julian von Berg" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">DIRECTOR OF CURATORIAL LOGISTICS</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-1">Julian von Berg</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Previously with the St. Moritz Concours d’Elegance. Oversees fleet acquisition, chassis allocation, and cross-border transport.</p>
                <button className="h-11 w-full bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 text-action font-action text-primary">
                  <span className="font-label-mono text-label-mono uppercase tracking-wider">Direct Transmission</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
              {/* Profile 2 */}
              <div className="bg-surface p-4 flex flex-col">
                <div className="w-full aspect-[4/5] bg-surface-container overflow-hidden mb-3"><Photo src={media.aboutLiaisonPortrait} alt="Elena Rostova" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">TRANSCONTINENTAL FLEET LIAISON</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-1">Elena Rostova</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Specializing in Alpine route preparation, helicopter-to-cockpit staging, and private hangar handover at Zurich and Malpensa.</p>
                <button className="h-11 w-full bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 text-action font-action text-primary">
                  <span className="font-label-mono text-label-mono uppercase tracking-wider">Direct Transmission</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
              {/* Profile 3 */}
              <div className="bg-surface p-4 flex flex-col">
                <div className="w-full aspect-[4/5] bg-surface-container overflow-hidden mb-3"><Photo src={media.aboutCustodianPortrait} alt="Marc Oberholzer" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">MASTER TECHNICAL CUSTODIAN</span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-1 mb-1">Marc Oberholzer</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Thirty years tuning competition machinery in Winterthur. Responsible for the 48-point telemetry and diagnostic sign-off.</p>
                <button className="h-11 w-full bg-surface-container-high hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 text-action font-action text-primary">
                  <span className="font-label-mono text-label-mono uppercase tracking-wider">Direct Transmission</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
          {/* 6) CONTACT BAND & ENQUIRY FORM */}
          <section className="flex flex-col px-margin-mobile py-space-xl bg-surface" id="enquiry-section">
            {/* Immediate Atelier Contact Band */}
            <div className="bg-primary text-on-primary p-5 mb-space-lg flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-[10px] text-[#bbcbba] tracking-widest uppercase">IMMEDIATE DISPATCH DESK</span>
                <span className="w-2 h-2 rounded-full bg-[#b4cdbb] animate-pulse" />
              </div>
              <a className="font-headline-sm text-headline-sm text-on-primary hover:text-[#b4cdbb] transition-colors flex items-center gap-2" href="tel:+41448002400">
                <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
                {" "}+41 44 800 2400
              </a>
              <div className="flex items-center justify-between pt-2 text-[12px] font-label-mono text-[#bbcbba]">
                <span>concierge@halden-archive.ch</span>
                <span>ENCRYPTED V3</span>
              </div>
            </div>
            {/* Mobile Single-Column Enquiry Form */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2"><span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">CUSTODIAL REQUISITION</span></div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-2">Transmit Curatorial Request</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Inquiries receive an individual curatorial itinerary and chassis status response within 30 minutes.</p>
              <form className="flex flex-col gap-4" hidden={sent} id="enquiry-form" onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}>
                {/* Target Custodian (Prefilled or General) */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" htmlFor="concierge-recipient">Recipient Liaison</label>
                  <input className="h-[52px] px-3 bg-surface-container text-body-md font-body-md text-on-surface focus:outline-hidden" id="concierge-recipient" readOnly type="text" defaultValue="Atelier General Concierge Desk" />
                </div>
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" htmlFor="full-name">Full Patron Name *</label>
                  <input className="h-[52px] px-3 bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-outline focus:bg-surface focus:outline-hidden transition-colors" id="full-name" placeholder="e.g. Henrik Lindqvist" required type="text" />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" htmlFor="email">Transmission Email *</label>
                  <input className="h-[52px] px-3 bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-outline focus:bg-surface focus:outline-hidden transition-colors" id="email" placeholder="patron@domain.com" required type="email" />
                </div>
                {/* Machine / Route */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" htmlFor="machine-route">Machine / Route Corridor</label>
                  <input className="h-[52px] px-3 bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-outline focus:bg-surface focus:outline-hidden transition-colors" id="machine-route" placeholder="e.g. 1974 Carrera 2.7 RS · Zurich to Engadin" type="text" />
                </div>
                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" htmlFor="message">Curatorial Notes or Date Windows</label>
                  <textarea className="p-3 bg-surface-container-low text-body-md font-body-md text-on-surface placeholder:text-outline focus:bg-surface focus:outline-hidden transition-colors" id="message" placeholder="Specify flight tail number, transit stops, or bespoke staging details..." rows={3} />
                </div>
                {/* Submit CTA Button (>= 48px height) */}
                <button className="h-14 mt-2 w-full bg-primary text-on-primary font-action text-action tracking-[0.1em] uppercase flex items-center justify-center gap-3 transition-colors active:bg-primary-container" type="submit">
                  <span>Transmit Enquiry</span>
                  {" "}
                  <span className="font-label-mono text-spec-numeral">→</span>
                </button>
              </form>
              {/* Feedback Confirmation Card Preview */}
              <div className="mt-2 p-5 bg-surface-container-high transition-all" hidden={!sent} id="confirmation-card" role="status">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="material-symbols-outlined text-[24px]">task_alt</span>
                  <span className="font-headline-sm text-headline-sm">Transmission Logged</span>
                </div>
                <p className="font-label-mono text-[11px] text-secondary tracking-widest mb-2">{"REF // HLD-ENQ-9042"}</p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Your requisition has been dispatched to the Duty Liaison at Zurich Kloten. A member of the curatorial team will present route availability and chassis conditioning status within 30 minutes.</p>
                <div className="mt-4 pt-3 flex items-center justify-between text-secondary">
                  <span className="font-label-mono text-[10px]">TIME LOGGED: 09:42 CEST</span>
                  <button className="font-label-mono text-[10px] text-primary underline underline-offset-4 tracking-wider uppercase" onClick={() => setSent(false)} type="button">New Enquiry</button>
                </div>
              </div>
            </div>
          </section>
          {/* Architectural Footer Signoff */}
          <footer className="px-margin-mobile py-space-lg bg-surface-container-lowest flex flex-col items-center justify-center text-center">
            <span className="font-label-mono text-[9px] uppercase tracking-[0.25em] text-secondary">HALDEN ATELIER STANDARD</span>
            <p className="font-headline-sm text-headline-sm text-primary mt-1">Quiet luxury. Uncompromised mechanical truth.</p>
            <div className="mt-space-md flex gap-4 text-on-surface-variant font-label-mono text-[10px]">
              <span>ZURICH</span>
              <span>·</span>
              <span>MUNICH</span>
              <span>·</span>
              <span>MILAN</span>
              <span>·</span>
              <span>ST. MORITZ</span>
            </div>
          </footer>
        </div>
      </main>
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 px-space-xs flex items-center justify-around">
          <Link className="flex flex-col items-center justify-center w-16 h-14 text-on-surface-variant hover:text-on-surface transition-colors" href="/fleet">
            <span className="material-symbols-outlined text-[20px] mb-1">grid_view</span>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.14em]">GALLERY</span>
          </Link>
          <Link className="flex flex-col items-center justify-center w-16 h-14 text-on-surface-variant hover:text-on-surface transition-colors" href="/journeys">
            <span className="material-symbols-outlined text-[20px] mb-1">explore</span>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.14em]">JOURNEYS</span>
          </Link>
          <Link aria-current="page" className="flex flex-col items-center justify-center w-16 h-14 transition-colors text-primary font-semibold" href="/about">
            <span className="material-symbols-outlined text-[20px] mb-1">history_edu</span>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.14em]">ABOUT</span>
          </Link>
          <Link className="flex flex-col items-center justify-center w-16 h-14 text-on-surface-variant hover:text-on-surface transition-colors" href="/account">
            <span className="material-symbols-outlined text-[20px] mb-1">shield_person</span>
            <span className="font-label-mono text-label-mono uppercase tracking-[0.14em]">PATRON</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
