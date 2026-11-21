"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_about_the_standard_desktop/code.html */
export function AboutDesktop() {
  // Demo enquiry: validated by the browser, acknowledged on screen, not sent anywhere (no backend yet)
  const [sent, setSent] = useState(false);
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <Photo src={media.aboutCuratorPortrait} alt="HALDEN Atelier Concierge Curatorial Directorate Portrait" className="h-8 w-auto object-contain" sizes="(max-width: 767px) 100vw, 30vw" />
            <Link className="font-headline-sm text-headline-sm tracking-[0.2em] text-on-surface uppercase select-none" href="/fleet">HALDEN</Link>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.2em] hidden lg:inline-block pl-space-xs">ATELIER № 01</span>
          </div>
          <nav className="flex items-center gap-space-lg">
            <Link className="font-action text-action uppercase tracking-[0.16em] text-on-surface-variant hover:text-on-surface transition-colors" href="/fleet">FLEET</Link>
            <Link className="font-action text-action uppercase tracking-[0.16em] text-on-surface-variant hover:text-on-surface transition-colors" href="/journeys">JOURNEYS</Link>
            <Link aria-current="page" className="bg-primary-container text-on-primary-container font-action text-action uppercase tracking-[0.16em] px-space-md py-space-sm rounded-[2px] transition-all" href="/about">ABOUT</Link>
          </nav>
          <div className="flex items-center gap-space-md">
            <Link className="font-label-mono text-label-mono uppercase tracking-[0.14em] text-on-surface-variant hover:text-on-surface transition-colors hidden sm:inline-block" href="/sign-in">PATRON LOGIN</Link>
            <div className="flex items-center gap-space-sm pl-space-xs">
              <span className="font-body-sm text-body-sm text-secondary hidden xl:inline-block">Clara V.</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          {/* SECTION 1: MANIFESTO HERO */}
          <section className="w-full px-margin pt-space-md pb-space-xl">
            <div className="flex flex-col space-y-space-md mb-space-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm border-b border-[#D8D6CE] pb-space-sm">
                <span className="font-label-mono text-label-mono tracking-[0.2em] text-secondary uppercase">{"HALDEN STANDARD // CURATORIAL CHARTER — EST. 1928"}</span>
                <span className="font-label-mono text-label-mono tracking-[0.15em] text-on-surface-variant uppercase">DOSSIER ARCHIVE № AT-01 · GENEVA · ZURICH · MUNICH · MILAN · ST. MORITZ</span>
              </div>
              <div className="grid grid-cols-12 gap-gutter items-end pt-space-xs">
                <div className="col-span-12 lg:col-span-8"><h1 className="font-display text-display text-on-surface leading-[1.08] tracking-[-0.02em]">A rental house built like a gallery.</h1></div>
                <div className="col-span-12 lg:col-span-4 lg:pb-space-xs"><p className="font-body-md text-body-md text-on-surface-variant leading-relaxed font-light">{"We acquire, preserve, and dispatch Europe's most significant automotive machinery not as depreciating fleet stock, but as mechanical sculpture calibrated for transcontinental passage."}</p></div>
              </div>
            </div>
            {/* Quiet Architectural Photograph Container (16:9) */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-container-high border border-[#D8D6CE]">
              <Photo src={media.aboutAtelierInterior} alt="HALDEN Curatorial Atelier Interior Gallery" className="w-full h-full object-cover grayscale-[15%] contrast-[105%]" sizes="100vw" />
              <div className="absolute bottom-0 left-0 right-0 p-space-md bg-linear-to-t from-[#171B19]/80 via-[#171B19]/30 to-transparent flex justify-between items-end text-surface">
                <div className="space-y-space-xs">
                  <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-[#EAE8E1]/70 block">{"EXHIBIT ARCHIVE // ROTUNDA A"}</span>
                  <span className="font-body-sm text-body-sm tracking-wide text-[#EAE8E1]">Atelier № 01 · Primary Climate Vault · 20.5°C Stabilized</span>
                </div>
                <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-[#EAE8E1]/80 hidden md:block">LAT 47.3769° N · LON 8.5417° E</div>
              </div>
            </div>
          </section>
          {/* SECTION 2: THREE PRINCIPLES */}
          <section className="w-full px-margin pb-space-xl">
            <div className="border-t border-[#D8D6CE] pt-space-lg">
              <div className="flex items-center justify-between mb-space-lg">
                <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">THE STANDARD OPERATING CANON</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"03 PILLARS // LEDGER REF. HLD-CANON"}</span>
              </div>
              <div className="grid grid-cols-12 gap-gutter">
                {/* Principle 01 */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-between p-space-lg bg-surface-container-low border border-[#D8D6CE] min-h-[380px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-space-sm mb-space-md">
                      <span className="font-label-mono text-label-mono tracking-[0.18em] text-primary font-medium">{"01 // SELECTION PROTOCOL"}</span>
                      <span className="font-label-mono text-label-mono text-secondary">CANON A</span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">Chosen, not stocked.</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">HALDEN maintains zero commuter appliances or volume-production placeholders. Every chassis in the ledger is hand-commissioned with specific engineering provenance, naturally aspirated or twin-turbocharged mechanical architectures, and bespoke interior specifications.</p>
                  </div>
                  <div className="pt-space-md mt-space-md border-t border-[#D8D6CE]/60 flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.12em]">CURATORIAL RATIO</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">1:28 CANDIDATE RIGOR</span>
                  </div>
                </div>
                {/* Principle 02 */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-between p-space-lg bg-surface-container-low border border-[#D8D6CE] min-h-[380px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-space-sm mb-space-md">
                      <span className="font-label-mono text-label-mono tracking-[0.18em] text-primary font-medium">{"02 // CURBSIDE LOGISTICS"}</span>
                      <span className="font-label-mono text-label-mono text-secondary">CANON B</span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">Ready where you land.</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Vehicles are pre-positioned, climate-stabilized at 20.5°C, and inspected 30 minutes prior to arrival at private aviation FBOs and VIP airport pavilions. No rental counters, no queues, no paperwork at the gate.</p>
                  </div>
                  <div className="pt-space-md mt-space-md border-t border-[#D8D6CE]/60 flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.12em]">TOUCHDOWN DISPATCH</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">T - 30 MIN APEX AUDIT</span>
                  </div>
                </div>
                {/* Principle 03 */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-between p-space-lg bg-surface-container-low border border-[#D8D6CE] min-h-[380px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-space-sm mb-space-md">
                      <span className="font-label-mono text-label-mono tracking-[0.18em] text-primary font-medium">{"03 // FISCAL CLARITY"}</span>
                      <span className="font-label-mono text-label-mono text-secondary">CANON C</span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md">One clear price.</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">The daily archival privilege includes comprehensive custodial zero-excess indemnity, cross-border Alpine vignettes, telemetry transponders, and seasonal tyre allocations. Zero hidden counter fees, zero surcharge traps.</p>
                  </div>
                  <div className="pt-space-md mt-space-md border-t border-[#D8D6CE]/60 flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.12em]">DEDUCTIBLE LIABILITY</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">CHF 0.00 ZERO-EXCESS</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 3: THE 48-POINT INSPECTION (Dark Room #171B19) */}
          <section className="w-full bg-[#171B19] text-[#f8faf6] py-space-xl">
            <div className="w-full px-margin">
              {/* Header */}
              <div className="grid grid-cols-12 gap-gutter mb-space-xl border-b border-[#2D3330] pb-space-lg">
                <div className="col-span-12 lg:col-span-7">
                  <span className="font-label-mono text-label-mono uppercase tracking-[0.22em] text-[#9EAAA0] block mb-space-xs">{"PROTOCOL 48 // MECHANICAL AUDIT & PROTOCOL"}</span>
                  <h2 className="font-headline-lg text-headline-lg text-[#f8faf6] tracking-[-0.015em]">The 48-Point Archival Inspection</h2>
                </div>
                <div className="col-span-12 lg:col-span-5 flex flex-col justify-end"><p className="font-body-md text-body-md text-[#9EAAA0] font-light leading-relaxed">Between every patron stewardship, each machine undergoes an exhaustive 4-tier diagnostic ledger performed by our factory-credentialed master custodians.</p></div>
              </div>
              {/* 4x4 Grid of Representative Checks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-lg">
                {/* Pillar 1: Acoustic & Engine */}
                <div className="flex flex-col space-y-space-sm">
                  <div className="bg-[#252A27] p-space-sm border border-[#2D3330] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono tracking-[0.16em] text-[#EAE8E1] uppercase">{"01 / ACOUSTIC & ENGINE"}</span>
                    <span className="w-1.5 h-1.5 bg-[#4d6355]" />
                  </div>
                  <div className="space-y-[1px] bg-[#2D3330]">
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[ACO-01]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">{"Valve Timing & Harmonic Resonance Verified"}</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[ACO-02]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Exhaust Actuation Decibel Calibrated</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[ENG-03]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Fluid Thermal Equilibrium Checked</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[ENG-04]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Turbo Wastegate Boost Metric Nominal</p>
                    </div>
                  </div>
                </div>
                {/* Pillar 2: Mechanical & Chassis */}
                <div className="flex flex-col space-y-space-sm">
                  <div className="bg-[#252A27] p-space-sm border border-[#2D3330] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono tracking-[0.16em] text-[#EAE8E1] uppercase">{"02 / MECHANICAL & CHASSIS"}</span>
                    <span className="w-1.5 h-1.5 bg-[#4d6355]" />
                  </div>
                  <div className="space-y-[1px] bg-[#2D3330]">
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[MEC-01]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Air Suspension Articulation Audited</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[MEC-02]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">{"Brake Pad Friction Depth >8.5mm"}</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[MEC-03]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Differential Lock Engagement Tested</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[MEC-04]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Dynamic Wheel Geometry Aligned</p>
                    </div>
                  </div>
                </div>
                {/* Pillar 3: Detailing & Surfaces */}
                <div className="flex flex-col space-y-space-sm">
                  <div className="bg-[#252A27] p-space-sm border border-[#2D3330] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono tracking-[0.16em] text-[#EAE8E1] uppercase">{"03 / DETAILING & SURFACES"}</span>
                    <span className="w-1.5 h-1.5 bg-[#4d6355]" />
                  </div>
                  <div className="space-y-[1px] bg-[#2D3330]">
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DET-01]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Full Leather Conditioned (Matte Tactile)</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DET-02]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Paintwork Micro-Decontaminated</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DET-03]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Glazing Acoustic Seal De-smudged</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DET-04]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Underbody Aerodynamic Tray Inspected</p>
                    </div>
                  </div>
                </div>
                {/* Pillar 4: Telematics & Documentation */}
                <div className="flex flex-col space-y-space-sm">
                  <div className="bg-[#252A27] p-space-sm border border-[#2D3330] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono tracking-[0.16em] text-[#EAE8E1] uppercase">{"04 / TELEMATICS & LOGS"}</span>
                    <span className="w-1.5 h-1.5 bg-[#4d6355]" />
                  </div>
                  <div className="space-y-[1px] bg-[#2D3330]">
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DOC-01]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">{"Swiss & EU Vignettes Validated"}</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DOC-02]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Satellite GPS Waypoints Pre-cached</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DOC-03]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Electronic Key Fob Crypt-Rotated</p>
                    </div>
                    <div className="bg-[#1C211F] p-space-sm flex flex-col justify-between h-24 hover:bg-[#252A27] transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono text-[#9EAAA0]">[DOC-04]</span>
                        <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">PASSED</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#f8faf6] font-light leading-snug">Physical Transit Log Stamp Issued</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Inspection Seal Footing */}
              <div className="border-t border-[#2D3330] pt-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 bg-[#4d6355] inline-block" />
                  <span className="font-label-mono text-label-mono tracking-[0.18em] text-[#EAE8E1] uppercase">AUDIT STANDARD: DIN EN ISO 9001 COMPLIANT · CUSTODIAL LEDGER SIGNED</span>
                </div>
                <span className="font-label-mono text-label-mono text-[#9EAAA0] uppercase tracking-[0.14em]">{"SIGNATURE AUTHORITY // M. OBERHOLZER, CHIEF CUSTODIAN"}</span>
              </div>
            </div>
          </section>
          {/* SECTION 4: HUBS LEDGER & CARTOGRAPHY */}
          <section className="w-full px-margin py-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D6CE] pb-space-sm mb-space-lg gap-space-xs">
              <div>
                <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary block mb-space-xs">{"ARCHIVAL STATIONS // CONTINENTAL REACH"}</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">{"Five Alpine & Gateway Hubs"}</h2>
              </div>
              <div className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.14em]">CORRIDOR PROTOCOL: CENTRAL EUROPEAN ARCH</div>
            </div>
            <div className="grid grid-cols-12 gap-gutter items-start">
              {/* Hairline Table */}
              <div className="col-span-12 xl:col-span-8 overflow-x-auto">
                <table className="w-full border-collapse border border-[#D8D6CE] text-left">
                  <thead>
                    <tr className="bg-surface-container-high border-b border-[#D8D6CE]">
                      <th className="p-space-sm font-label-mono text-label-mono text-secondary uppercase tracking-[0.15em] w-16">HUB</th>
                      <th className="p-space-sm font-label-mono text-label-mono text-secondary uppercase tracking-[0.15em]">{"CITY & NATION"}</th>
                      <th className="p-space-sm font-label-mono text-label-mono text-secondary uppercase tracking-[0.15em]">STAGING BAY</th>
                      <th className="p-space-sm font-label-mono text-label-mono text-secondary uppercase tracking-[0.15em]">WINDOW</th>
                      <th className="p-space-sm font-label-mono text-label-mono text-secondary uppercase tracking-[0.15em]">DESK</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8D6CE] font-body-sm text-body-sm text-on-surface">
                    {/* Row 1: ZRH */}
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-sm font-label-mono text-label-mono font-bold text-primary">ZRH</td>
                      <td className="p-space-sm font-medium">Zurich, Switzerland</td>
                      <td className="p-space-sm text-on-surface-variant font-light">Kloten VIP Private Aviation Terminal · Bay 02</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">
                        24/7{" "}
                        <span className="text-secondary font-light text-[11px]">(30m notice)</span>
                      </td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">+41 44 800 2401</td>
                    </tr>
                    {/* Row 2: MUC */}
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-sm font-label-mono text-label-mono font-bold text-primary">MUC</td>
                      <td className="p-space-sm font-medium">Munich, Germany</td>
                      <td className="p-space-sm text-on-surface-variant font-light">Terminal 2 VIP Curbside Pavilion · Bay 04</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">06:00 – 23:00 CEST</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">+49 89 975 8200</td>
                    </tr>
                    {/* Row 3: MXP */}
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-sm font-label-mono text-label-mono font-bold text-primary">MXP</td>
                      <td className="p-space-sm font-medium">Milan, Italy</td>
                      <td className="p-space-sm text-on-surface-variant font-light">Malpensa Executive Staging Vault · Bay 01</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">07:00 – 22:00 CEST</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">+39 02 748 6200</td>
                    </tr>
                    {/* Row 4: SMV */}
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-sm font-label-mono text-label-mono font-bold text-primary">SMV</td>
                      <td className="p-space-sm font-medium">St. Moritz, Switzerland</td>
                      <td className="p-space-sm text-on-surface-variant font-light">Samedan Alpine Hangar · Seasonal Hub</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">08:00 – 20:00 CEST</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">+41 81 851 0200</td>
                    </tr>
                    {/* Row 5: CPH */}
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-sm font-label-mono text-label-mono font-bold text-primary">CPH</td>
                      <td className="p-space-sm font-medium">Copenhagen, Denmark</td>
                      <td className="p-space-sm text-on-surface-variant font-light">Kastrup VIP Curbside Terminal 3 · Bay 07</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">06:00 – 23:00 CEST</td>
                      <td className="p-space-sm font-spec-numeral text-spec-numeral">+45 32 31 3200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Minimalist Monochrome Vector Cartography */}
              <div className="col-span-12 xl:col-span-4 bg-surface-container-low p-space-md border border-[#D8D6CE] flex flex-col justify-between h-full min-h-[295px]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#D8D6CE] pb-space-xs mb-space-sm">
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.16em]">CARTOGRAPHIC TOPOLOGY</span>
                    <span className="font-label-mono text-label-mono text-primary font-medium">PASS 47° N</span>
                  </div>
                  {/* Network Diagram SVG */}
                  <div className="w-full flex items-center justify-center py-space-xs">
                    <svg className="w-full h-auto text-primary" viewBox="0 0 340 200">
                      {/* Route hairpins */}
                      <path d="M 170 30 L 170 85 L 150 135 L 185 140 L 140 180" fill="none" stroke="#737973" strokeDasharray="3 3" strokeWidth="1" />
                      <path d="M 170 85 L 185 140" fill="none" stroke="#1e3327" strokeWidth="1.5" />
                      <path d="M 150 135 L 140 180" fill="none" stroke="#1e3327" strokeWidth="1.5" />
                      <path d="M 150 135 L 185 140" fill="none" stroke="#1e3327" strokeWidth="1.5" />
                      {/* CPH Hub (North) */}
                      <rect fill="#1e3327" height="8" width="8" x="166" y="26" />
                      <text fill="#191c1a" fontFamily="Space Mono" fontSize="9" letterSpacing="0.1em" x="180" y="33">{"CPH // COPENHAGEN"}</text>
                      {/* MUC Hub */}
                      <rect fill="#1e3327" height="8" width="8" x="166" y="81" />
                      <text fill="#191c1a" fontFamily="Space Mono" fontSize="9" letterSpacing="0.1em" x="180" y="88">{"MUC // MUNICH"}</text>
                      {/* ZRH Hub (West Alpine) */}
                      <rect fill="#1e3327" height="8" width="8" x="146" y="131" />
                      <text fill="#191c1a" fontFamily="Space Mono" fontSize="9" letterSpacing="0.1em" x="70" y="138">{"ZRH // ZURICH"}</text>
                      {/* SMV Hub (Alpine Pass) */}
                      <rect fill="#344a3d" height="8" width="8" x="181" y="136" />
                      <text fill="#191c1a" fontFamily="Space Mono" fontSize="9" letterSpacing="0.1em" x="195" y="143">{"SMV // ST. MORITZ"}</text>
                      {/* MXP Hub (South) */}
                      <rect fill="#1e3327" height="8" width="8" x="136" y="176" />
                      <text fill="#191c1a" fontFamily="Space Mono" fontSize="9" letterSpacing="0.1em" x="150" y="183">{"MXP // MILAN"}</text>
                    </svg>
                  </div>
                </div>
                <div className="border-t border-[#D8D6CE] pt-space-xs flex justify-between items-center text-[#737973]">
                  <span className="font-label-mono text-label-mono tracking-[0.1em]">EN ROUTE TIME: ZRH ⇄ SMV: 2H 14M</span>
                  <span className="font-label-mono text-label-mono">TRANSIT ACTIVE</span>
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 5: CONCIERGE TEAM */}
          <section className="w-full px-margin pb-space-xl">
            <div className="border-t border-[#D8D6CE] pt-space-lg mb-space-lg">
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary">CUSTODIAL STEWARDSHIP</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">PERMANENT ATELIER COUNCIL</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">The Atelier Concierge Desk</h2>
            </div>
            <div className="grid grid-cols-12 gap-gutter">
              {/* Curator 1: Julian von Berg */}
              <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-[#D8D6CE] flex flex-col">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high">
                  <Photo src={media.aboutCuratorPortrait} alt="Julian von Berg, Director of Curatorial Logistics" className="w-full h-full object-cover filter contrast-[104%]" sizes="(max-width: 767px) 100vw, 30vw" />
                  <div className="absolute top-space-sm left-space-sm bg-surface/90 px-space-xs py-[2px] border border-[#D8D6CE]"><span className="font-label-mono text-[10px] text-on-surface uppercase tracking-[0.15em]">STATION: ZURICH</span></div>
                </div>
                <div className="p-space-md flex flex-col justify-between grow">
                  <div>
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.16em] block mb-space-xs">{"DIRECTOR // LOGISTICS & PROVENANCE"}</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Julian von Berg</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed mb-space-sm">Former FIA historic preservation registrar with fifteen years calibrating rare GT lineages across Swiss mountain corridors.</p>
                  </div>
                  <div className="pt-space-xs border-t border-[#D8D6CE] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-primary font-medium tracking-wide">DIRECT DESK: EXT 01</span>
                    <span className="font-label-mono text-[10px] text-secondary uppercase">TRANSMISSION READY</span>
                  </div>
                </div>
              </div>
              {/* Curator 2: Elena Rostova */}
              <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-[#D8D6CE] flex flex-col">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high">
                  <Photo src={media.aboutLiaisonPortrait} alt="Elena Rostova, Transcontinental Fleet Liaison" className="w-full h-full object-cover filter contrast-[104%]" sizes="(max-width: 767px) 100vw, 30vw" />
                  <div className="absolute top-space-sm left-space-sm bg-surface/90 px-space-xs py-[2px] border border-[#D8D6CE]"><span className="font-label-mono text-[10px] text-on-surface uppercase tracking-[0.15em]">STATION: MILAN / GENEVA</span></div>
                </div>
                <div className="p-space-md flex flex-col justify-between grow">
                  <div>
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.16em] block mb-space-xs">{"FLEET LIAISON // CLIENT PROTOCOL"}</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Elena Rostova</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed mb-space-sm">Coordinates private aviation staging and cross-border customs exemptions for patron transits between Munich and Como.</p>
                  </div>
                  <div className="pt-space-xs border-t border-[#D8D6CE] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-primary font-medium tracking-wide">DIRECT DESK: EXT 04</span>
                    <span className="font-label-mono text-[10px] text-secondary uppercase">TRANSMISSION READY</span>
                  </div>
                </div>
              </div>
              {/* Curator 3: Marc Oberholzer */}
              <div className="col-span-12 md:col-span-4 bg-surface-container-low border border-[#D8D6CE] flex flex-col">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container-high">
                  <Photo src={media.aboutCustodianPortrait} alt="Marc Oberholzer, Master Technical Custodian" className="w-full h-full object-cover filter contrast-[104%]" sizes="(max-width: 767px) 100vw, 30vw" />
                  <div className="absolute top-space-sm left-space-sm bg-surface/90 px-space-xs py-[2px] border border-[#D8D6CE]"><span className="font-label-mono text-[10px] text-on-surface uppercase tracking-[0.15em]">STATION: MUNICH WORKSHOP</span></div>
                </div>
                <div className="p-space-md flex flex-col justify-between grow">
                  <div>
                    <span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.16em] block mb-space-xs">{"MASTER CUSTODIAN // MECHANICAL ENGR"}</span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Marc Oberholzer</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed mb-space-sm">Factory-credentialed powertrain specialist directing the 48-point diagnostic ledger and telemetry calibration for all chassis.</p>
                  </div>
                  <div className="pt-space-xs border-t border-[#D8D6CE] flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-primary font-medium tracking-wide">DIRECT DESK: EXT 09</span>
                    <span className="font-label-mono text-[10px] text-secondary uppercase">INSPECTION ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 6: CONTACT BAND & ENQUIRY FORM */}
          <section className="w-full px-margin pb-space-xl">
            <div className="bg-surface-container-low border border-[#D8D6CE] p-space-lg lg:p-space-xl">
              <div className="grid grid-cols-12 gap-gutter">
                {/* Direct Telephony & Encrypted Dispatch Details */}
                <div className="col-span-12 lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-space-md">
                  <div className="space-y-space-md">
                    <div>
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-secondary block mb-space-xs">PATRON TRANSMISSION CHANNEL</span>
                      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">Initiate Archival Access.</h2>
                      <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">Direct dialogue with an assigned custodian. Handover details, bespoke route planning through alpine passes, or chassis reservation specifications are confirmed securely.</p>
                    </div>
                    <div className="space-y-space-sm pt-space-sm border-t border-[#D8D6CE]">
                      <div>
                        <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary block">SWISS ARCHIVE TELEPHONY</span>
                        <a className="font-spec-numeral text-headline-sm text-primary font-medium hover:text-on-surface transition-colors" href="tel:+41448002400">+41 44 800 2400</a>
                      </div>
                      <div>
                        <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary block">ENCRYPTED ATELIER DISPATCH</span>
                        <a className="font-label-mono text-body-md text-primary font-medium underline underline-offset-4 hover:text-on-surface transition-colors" href="mailto:concierge@halden-archive.ch">concierge@halden-archive.ch</a>
                      </div>
                      <div>
                        <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-secondary block">SECURE TELEMETRY NETWORK</span>
                        <span className="font-label-mono text-body-sm text-on-surface-variant font-light">PGP KEY: 0x9B84E3F78D32C012 · 4096R</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-space-md mt-space-md border-t border-[#D8D6CE] hidden lg:block"><span className="font-label-mono text-label-mono text-secondary uppercase tracking-[0.16em] block">RESPONSE TIME COMMITMENT: ≤ 30 MINUTES</span></div>
                </div>
                {/* Interactive Enquiry Form & Confirmation State */}
                <div className="col-span-12 lg:col-span-7">
                  <div className="bg-surface border border-[#D8D6CE] p-space-md lg:p-space-lg relative" id="contact">
                    <form className="space-y-space-md" hidden={sent} id="halden-form" onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        <div className="space-y-space-xs">
                          <label className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface block" htmlFor="patron-name">PATRON FULL NAME *</label>
                          <input className="w-full bg-surface px-space-sm py-space-sm border border-[#D8D6CE] font-body-md text-body-md text-on-surface focus:outline-hidden focus:border-primary-container rounded-[2px]" id="patron-name" placeholder="e.g. Baron C. von Bern" required type="text" />
                        </div>
                        <div className="space-y-space-xs">
                          <label className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface block" htmlFor="patron-email">PATRON EMAIL / DISPATCH *</label>
                          <input className="w-full bg-surface px-space-sm py-space-sm border border-[#D8D6CE] font-body-md text-body-md text-on-surface focus:outline-hidden focus:border-primary-container rounded-[2px]" id="patron-email" placeholder="patron@domain.ch" required type="email" />
                        </div>
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface block" htmlFor="chassis-interest">MACHINE OR EXPEDITION OF INTEREST</label>
                        <select className="w-full bg-surface px-space-sm py-space-sm border border-[#D8D6CE] font-body-md text-body-md text-on-surface focus:outline-hidden focus:border-primary-container rounded-[2px]" id="chassis-interest">
                          <option value="chassis-general">General Archival Custodianship Inquiries</option>
                          <option value="alpine-gt">{"Alpine Grand Tour // St. Gotthard & Bernina Passage"}</option>
                          <option value="chassis-gt3">{"Chassis Ref. 992 GT3 Touring // Munich Archive"}</option>
                          <option value="chassis-dbs">{"Chassis Ref. Aston Martin DBS Superleggera // Zurich Vault"}</option>
                          <option value="chassis-roma">{"Chassis Ref. Ferrari Roma // Milan Staging Bay"}</option>
                          <option value="curbside-fbo">Direct FBO Jet Runway Staging Protocol</option>
                        </select>
                      </div>
                      <div className="space-y-space-xs">
                        <label className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface block" htmlFor="curatorial-message">{"CURATORIAL MESSAGE & PREFERRED ITINERARY"}</label>
                        <textarea className="w-full bg-surface px-space-sm py-space-sm border border-[#D8D6CE] font-body-md text-body-md text-on-surface focus:outline-hidden focus:border-primary-container rounded-[2px] resize-none" id="curatorial-message" placeholder="Specify desired staging bay, landing times, or trans-Alpine routing parameters..." rows={3} />
                      </div>
                      <div className="pt-space-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
                        <div className="flex items-center gap-space-xs">
                          <input className="w-4 h-4 rounded-none accent-primary border border-on-surface" id="nda-agree" required type="checkbox" />
                          <label className="font-body-sm text-body-sm text-secondary select-none" htmlFor="nda-agree">Under Swiss Archival Discretion Protocol.</label>
                        </div>
                        <button className="bg-primary-container hover:bg-primary text-on-primary font-action text-action uppercase tracking-[0.16em] px-space-lg py-space-sm rounded-[2px] transition-colors flex items-center gap-space-xs self-stretch sm:self-auto justify-center" type="submit">
                          <span>Transmit Enquiry</span>
                          {" "}
                          <span className="font-spec-numeral">→</span>
                        </button>
                      </div>
                    </form>
                    {/* Inline Success Confirmation State (Hidden initially, triggered on submit or previewable) */}
                    <div className={`${sent ? "flex" : "hidden"} p-space-md border border-primary bg-secondary-container/20 flex-col justify-between space-y-space-md`} id="confirmation-box" role="status">
                      <div className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                        <div>
                          <span className="font-label-mono text-label-mono tracking-[0.18em] text-primary uppercase block">{"LEDGER CONFIRMATION // ENTRY RECORDED"}</span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface mt-space-xs">Enquiry Transmitted to Atelier Ledger</h4>
                          <p className="font-body-md text-body-md text-on-surface-variant font-light mt-space-xs">
                            Reference{" "}
                            <strong className="font-spec-numeral text-on-surface">HLD-ENQ-9042</strong>
                            . A concierge custodian from Zurich will contact your secure channel within 30 minutes.
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-[#D8D6CE] pt-space-sm flex justify-between items-center">
                        <span className="font-label-mono text-label-mono text-secondary uppercase">DISPATCH TIME: IMMEDIATE</span>
                        <button className="font-label-mono text-label-mono text-primary underline uppercase tracking-wider hover:text-on-surface" onClick={() => setSent(false)} type="button">TRANSMIT ADDITIONAL DOSSIER</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-[#171B19] text-[#EAE8E1] pt-space-xl pb-space-lg">
        <div className="w-full px-margin">
          <div className="grid grid-cols-12 gap-gutter mb-space-xl">
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between pr-space-lg">
              <div className="space-y-space-md">
                <span className="font-headline-md text-headline-md tracking-[0.15em] text-[#EAE8E1] uppercase block">HALDEN</span>
                <p className="font-body-md text-body-md text-[#B4B2AC] max-w-md font-light">An architectural archive of rare vehicular kinetic sculpture. Halden curates peerless performance machinery preserved in pristine mechanical provenance for deliberated road journeys.</p>
              </div>
              <div className="pt-space-lg"><span className="font-label-mono text-label-mono text-[#8C908A] uppercase tracking-[0.18em] block">EXHIBITION ARCHIVE • GENEVA • MUNICH • ZURICH</span></div>
            </div>
            <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-space-md">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-[#8C908A] block">EXHIBITION</span>
              <ul className="space-y-space-sm font-body-sm text-body-sm text-[#B4B2AC]">
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/fleet">Permanent Collection</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/journeys">Archival Monographs</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/journeys">Curatorial Notes</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/about">Provenance Registries</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/about">Atelier Transport</Link></li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-space-md">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-[#8C908A] block">REGISTRY</span>
              <ul className="space-y-space-sm font-body-sm text-body-sm text-[#B4B2AC]">
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/account">Patron Chambers</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/journeys">Alpine Expeditions</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/about#contact">Atelier Consignment</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/sign-in">Custodianship Charter</Link></li>
                <li><Link className="hover:text-[#EAE8E1] transition-colors" href="/reset-passcode">Chassis Verification</Link></li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-space-md">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-[#8C908A] block">ARCHIVAL DISCLAIMER</span>
              <p className="font-body-sm text-body-sm text-[#8C908A] leading-relaxed font-light">Exhibition vehicles are maintained within museum conservation parameters. Reservation entails private custodianship transfer subject to atelier verification, bespoke mechanical briefing, and Swiss road preservation protocols.</p>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
            <span className="font-label-mono text-label-mono text-[#8C908A] uppercase tracking-[0.16em]">© 2025 HALDEN ARCHIVES AG. ALL PROVENANCES RESERVED.</span>
            <div className="flex items-center gap-space-lg">
              <Link className="font-label-mono text-label-mono text-[#8C908A] hover:text-[#EAE8E1] uppercase tracking-[0.14em] transition-colors" href="/about">LEGAL CHARTER</Link>
              <Link className="font-label-mono text-label-mono text-[#8C908A] hover:text-[#EAE8E1] uppercase tracking-[0.14em] transition-colors" href="/about">CONSERVATION PROTOCOLS</Link>
              <Link className="font-label-mono text-label-mono text-[#8C908A] hover:text-[#EAE8E1] uppercase tracking-[0.14em] transition-colors" href="/about">CURATORIAL BOARD</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
