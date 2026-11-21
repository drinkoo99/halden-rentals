"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_curbside_staff_handover_checklist/code.html */
export function CurbsideHandover() {
  const [phase, setPhase] = useState<"ready" | "dispatching" | "done">("ready");
  function dispatch() {
    setPhase("dispatching");
    window.setTimeout(() => setPhase("done"), 900);
  }
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
            <button aria-label="Sync Status" className="w-11 h-11 flex items-center justify-center text-surface-container-highest active:bg-white/5 transition-colors"><span className="material-symbols-outlined text-[20px]">sync</span></button>
            <button aria-label="Notifications" className="relative w-11 h-11 flex items-center justify-center text-surface-container-highest active:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface">
        <div className="flex flex-col w-full text-on-surface">
          {/* TOP DOSSIER BANNER */}
          <section className="bg-surface-container-high px-4 py-4 mb-2">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-label-mono text-label-mono tracking-widest text-on-surface-variant uppercase">{"PROTOCOL // HLD-0612-4821"}</span>
              <span className="font-label-mono text-[10px] tracking-widest px-2 py-0.5 bg-secondary-container text-on-secondary-container uppercase">CURBSIDE T2</span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface leading-tight mb-0.5">Range Rover Autobiography</h1>
            <div className="flex items-center justify-between text-body-sm text-on-surface-variant mb-3">
              <span className="font-spec-numeral text-spec-numeral tracking-tight text-on-surface">M-HL 4821</span>
              <span className="font-body-sm text-on-surface">
                Clara von Bergmann{" "}
                <span className="font-label-mono text-[10px] text-on-surface-variant">(TIER II)</span>
              </span>
            </div>
            {/* Progress Meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-label-mono">
                <span className="font-label-mono text-[10px] tracking-wider uppercase text-on-surface-variant">Step 4 of 6 Completed</span>
                <span className="font-spec-numeral text-[11px] text-primary-container font-semibold">67% PROTOCOL READINESS</span>
              </div>
              <div className="grid grid-cols-6 gap-1 w-full h-1.5">
                <div className="h-full bg-primary-container" />
                <div className="h-full bg-primary-container" />
                <div className="h-full bg-primary-container" />
                <div className="h-full bg-primary-container" />
                <div className="h-full bg-surface-container-highest" />
                <div className="h-full bg-surface-container-highest" />
              </div>
            </div>
          </section>
          {/* SEQUENTIAL CURBSIDE AUDIT STEPS */}
          <div className="px-4 space-y-3 pb-8">
            {/* STEP 1: LICENCE ACCREDITATION [COMPLETED] */}
            <article className="bg-surface-container-lowest p-4 transition-all">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary-container text-on-primary flex items-center justify-center rounded-none text-[15px]"><span className="material-symbols-outlined text-[16px]">check</span></span>
                  <div>
                    <p className="font-action text-action text-on-surface">Step 1 · Licence Accreditation</p>
                    <p className="font-label-mono text-[10px] tracking-wider text-on-surface-variant uppercase">DE KBA Verified · B074R881920</p>
                  </div>
                </div>
                <button className="font-label-mono text-[10px] tracking-wider text-on-surface-variant hover:text-on-surface uppercase py-1 px-2 bg-surface-container-low min-h-[32px] flex items-center">RE-SCAN</button>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low p-2">
                <Photo src={media.handoverLicenceScan} alt="Driver Licence Scan" className="w-16 h-10 object-cover bg-surface-dim" data-alt="Macro official EU European Union driving licence plastic smart card resting flat on neutral warm sand stone background, holograms and watermark micro-etching visible, authentic German driver credentials issued to Clara von Bergmann, studio lighting." sizes="64px" />
                <div className="flex-1 min-w-0">
                  <p className="font-spec-numeral text-[11px] text-on-surface truncate">VON BERGMANN, CLARA</p>
                  <p className="font-label-mono text-[10px] text-on-surface-variant">EXP: 05.07.2032 · CAT B/BE</p>
                </div>
                <span className="material-symbols-outlined text-primary-container text-[18px]">verified_user</span>
              </div>
            </article>
            {/* STEP 2: FUEL & FLUID INTEGRITY [COMPLETED] */}
            <article className="bg-surface-container-lowest p-4">
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary-container text-on-primary flex items-center justify-center rounded-none text-[15px]"><span className="material-symbols-outlined text-[16px]">check</span></span>
                  <div>
                    <p className="font-action text-action text-on-surface">{"Step 2 · Fuel & Fluid Integrity"}</p>
                    <p className="font-label-mono text-[10px] tracking-wider text-on-surface-variant uppercase">CAN-BUS TANK TRANSLATION</p>
                  </div>
                </div>
                <span className="font-spec-numeral text-spec-numeral text-primary-container font-semibold">100%</span>
              </div>
              <div className="bg-surface-container-low p-3 space-y-2">
                <div className="w-full bg-surface-container-highest h-2 relative"><div className="bg-primary-container h-full w-full" /></div>
                <div className="flex justify-between items-center text-label-mono text-[10px] text-on-surface-variant">
                  <span>98-RON SUPER PLUS (89.4 L)</span>
                  <span className="text-primary-container flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary-container inline-block" />
                    {" "}TANK LEVEL CALIBRATED
                  </span>
                </div>
              </div>
            </article>
            {/* STEP 3: ODOMETER & TELEMETRY [COMPLETED] */}
            <article className="bg-surface-container-lowest p-4">
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary-container text-on-primary flex items-center justify-center rounded-none text-[15px]"><span className="material-symbols-outlined text-[16px]">check</span></span>
                  <div>
                    <p className="font-action text-action text-on-surface">{"Step 3 · Odometer & Telemetry"}</p>
                    <p className="font-label-mono text-[10px] tracking-wider text-on-surface-variant uppercase">ECU RECONCILED TIMESTAMP</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary-container text-[18px]">satellite_alt</span>
              </div>
              <div className="flex items-center justify-between bg-surface-container-low px-3 py-2.5">
                <div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant block uppercase tracking-wider">Baseline Handover Reading</span>
                  <span className="font-spec-numeral text-[16px] text-on-surface font-semibold tracking-wide">14,820 KM</span>
                </div>
                <span className="font-label-mono text-[9px] bg-primary-fixed text-on-primary-fixed px-2 py-1 tracking-wider uppercase">TELEMETRY ACTIVE</span>
              </div>
            </article>
            {/* STEP 4: WALK-AROUND INSPECTION [ACTIVE / IN PROGRESS] */}
            <article className="bg-surface-container-lowest p-4 bg-linear-to-r from-surface-container-lowest via-surface-bright to-surface-container-low">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-on-surface text-surface flex items-center justify-center rounded-none text-spec-numeral font-bold">4</span>
                  <div>
                    <p className="font-action text-action text-on-surface font-bold">Step 4 · Exterior Walk-Around Photos</p>
                    <p className="font-label-mono text-[10px] tracking-wider text-on-surface-variant uppercase">Quadrant Visual Audit (3 of 4 Recorded)</p>
                  </div>
                </div>
                <span className="font-label-mono text-[9px] bg-secondary-container text-on-secondary-container px-2 py-0.5 tracking-wider uppercase font-semibold">IN PROGRESS</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">Capture all quadrant perspectives and macro detail framing prior to physical key hand-off.</p>
              {/* Inspection Photo Grid */}
              <div className="grid grid-cols-3 gap-2">
                {/* Photo 1 */}
                <div className="flex flex-col bg-surface-container-low p-1.5">
                  <Photo src={media.handoverFrontLeft} alt="Front Left Quadrant" className="w-full aspect-square object-cover mb-1.5 bg-surface-dim" data-alt="Macro razor-sharp high luxury photograph of modern Range Rover Autobiography matrix LED headlight signature daytime running light cluster, brushed metallic silver chassis, immaculate showroom condition, architectural natural soft lighting." sizes="105px" />
                  <span className="font-label-mono text-[8px] uppercase tracking-wider text-on-surface truncate">FL · PRISTINE</span>
                  <span className="font-spec-numeral text-[8px] text-on-surface-variant">09:41:12</span>
                </div>
                {/* Photo 2 */}
                <div className="flex flex-col bg-surface-container-low p-1.5">
                  <Photo src={media.handoverWheel} alt="Wheel Alloy Macro" className="w-full aspect-square object-cover mb-1.5 bg-surface-dim" data-alt="Architectural macro close up of satin dark grey 23-inch forged alloy multi-spoke wheel on Michelin Pilot Sport tire, Brembo brake caliper, pristine clean curb condition, subtle asphalt reflections." sizes="105px" />
                  <span className="font-label-mono text-[8px] uppercase tracking-wider text-on-surface truncate">ALLOY · 0 DEFECT</span>
                  <span className="font-spec-numeral text-[8px] text-on-surface-variant">09:42:04</span>
                </div>
                {/* Add Slot */}
                <button className="flex flex-col items-center justify-center bg-surface-container-high hover:bg-surface-container-highest transition-colors min-h-[90px] p-2 text-center group">
                  <span className="material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-on-surface mb-1">add_a_photo</span>
                  {" "}
                  <span className="font-label-mono text-[8px] uppercase tracking-wider text-on-surface leading-tight">REAR / RIGHT QUADRANT</span>
                </button>
              </div>
            </article>
            {/* STEP 5: CUSTOMER SIGNATURE PAD [ACTION REQUIRED] */}
            <article className="bg-surface-container-lowest p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-surface-container-highest text-on-surface-variant flex items-center justify-center rounded-none text-spec-numeral">5</span>
                  <div>
                    <p className="font-action text-action text-on-surface">Step 5 · Patron Digital Signature</p>
                    <p className="font-label-mono text-[10px] tracking-wider text-on-surface-variant uppercase">VIP Curbside Attestation</p>
                  </div>
                </div>
                <span className="font-label-mono text-[9px] bg-surface-container-highest text-on-surface-variant px-1.5 py-0.5 tracking-wider uppercase">QUEUED</span>
              </div>
              <div className="bg-surface-container-low p-3 mb-2.5">
                <div className="flex justify-between items-center text-label-mono text-[10px] text-on-surface-variant mb-2">
                  <span>SIGNATURE CANVAS</span>
                  <button className="underline hover:text-on-surface uppercase">Clear</button>
                </div>
                {/* Stylized Signature Pad with simulated signature trace */}
                <div className="bg-surface-container-lowest h-20 w-full flex items-center justify-center relative overflow-hidden px-4">
                  <svg className="w-full h-12 text-primary stroke-current fill-none stroke-[1.5]" viewBox="0 0 240 60"><path d="M10,42 C30,38 45,15 55,20 C65,26 60,48 70,45 C80,42 95,28 110,32 C125,35 120,44 140,40 C155,36 170,22 185,25 C195,27 205,38 230,34" /></svg>
                  <span className="absolute bottom-1 right-2 font-label-mono text-[8px] text-on-surface-variant uppercase">Clara von Bergmann · 09:44 CET</span>
                </div>
              </div>
              {/* Agreement Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <div className="w-4 h-4 bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5"><span className="material-symbols-outlined text-[13px]">check</span></div>
                {" "}
                <span className="font-body-sm text-[12px] leading-snug text-on-surface">Patron acknowledged Zero-Excess Alpine Tier Protocol and curbside vehicle release conditions.</span>
              </label>
            </article>
            {/* STEP 6: KEY RELEASE & CUSTODY HANDOVER [PENDING] */}
            <article className="bg-surface-container-lowest p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-surface-container-highest text-on-surface-variant flex items-center justify-center rounded-none text-spec-numeral">6</span>
                  <div>
                    <p className="font-action text-action text-on-surface">{"Step 6 · Key Release & Custody"}</p>
                    <p className="font-label-mono text-[10px] tracking-wider text-on-surface-variant uppercase">PHYSICAL FOB DISPATCH</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">key</span>
              </div>
              <div className="space-y-2 bg-surface-container-low p-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div className="w-4 h-4 bg-surface-container-highest flex items-center justify-center shrink-0">{/* Unchecked initial state */}</div>
                  {" "}
                  <span className="font-body-sm text-body-sm text-on-surface">2× Master smart fobs handed directly to patron</span>
                </label>
                <div className="flex items-center justify-between text-label-mono text-[10px] text-on-surface-variant pt-1">
                  <span>RFID TAG: #HLD-FOB-9921A</span>
                  <span>SLOT T2-BAY-04</span>
                </div>
              </div>
            </article>
          </div>
          {/* STICKY ACTION TRAY */}
          <section className="sticky bottom-0 z-20 bg-[#171B19] text-surface-bright px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between mb-2 font-label-mono text-[10px] uppercase tracking-wider text-tertiary-fixed-dim">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container" />
                {" "}FINAL CONFIRMATION PENDING
              </span>
              <span>STEP 4 OF 6 COMPLETED</span>
            </div>
            <button className={`w-full h-12 ${phase === "done" ? "bg-secondary" : "bg-primary-container hover:bg-primary"} active:bg-primary-container text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50`} disabled={phase !== "ready"} id="completeHandoverBtn" onClick={dispatch} type="button">
              <span className={`material-symbols-outlined text-[18px] ${phase === "dispatching" ? "animate-spin" : ""}`} aria-hidden>
                {phase === "dispatching" ? "refresh" : phase === "done" ? "check_circle" : "verified"}
              </span>{" "}
              {phase === "dispatching" ? "DISPATCHING PROTOCOL..." : phase === "done" ? "HANDOVER COMPLETE · MUC T2" : "EXECUTE HANDOVER & DISPATCH"}
            </button>
          </section>
        </div>
      </main>
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#171B19]/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.18)]">
        <div className="flex justify-between items-stretch h-16 px-2">
          <Link className="flex-1 flex flex-col items-center justify-center gap-1 text-tertiary-fixed-dim hover:text-surface-bright transition-colors px-1" href="/staff/curbside">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest text-center">TODAY</span>
          </Link>
          <Link aria-current="page" className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors px-1 text-surface-bright bg-white/10" href="/staff/curbside/handover">
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
