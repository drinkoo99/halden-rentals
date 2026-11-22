"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCountdown } from "@/lib/useCountdown";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/**
 * Stitch "Sign In: Error States & Security Lockout" — shown after too many failed sign-ins. The wait comes
 * from the server's rate limit (?retry=seconds); the limit itself is enforced on the server.
 */
export function SignInLockoutScreen() {
  const retry = Math.min(3600, Math.max(1, Math.round(Number(useSearchParams().get("retry")) || 900)));
  const lock = useCountdown(retry);
  const { start } = lock;
  useEffect(() => start(), [start]);
  const left = lock.left || retry; // server render shows the starting value
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full min-h-screen bg-surface flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-surface text-on-surface">
            {/* LEFT 50% COLUMN: GALLERY PHOTO STAGE & ARCHIVAL PLACARD */}
            <section className="lg:col-span-6 relative flex flex-col justify-between bg-surface-container-low h-[200px] lg:h-auto p-6 lg:p-14 border-b lg:border-b-0 lg:border-r border-outline-variant/40 overflow-hidden">
              {/* Background Ambient Photo */}
              <div className="absolute inset-0 z-0">
                <Photo src={media.porscheGalleryPortrait} priority alt="Architectural gallery with silver Porsche 911 in raking morning light" className="w-full h-full object-cover filter contrast-[1.03] saturate-[0.92]" sizes="(max-width: 767px) 100vw, 50vw" />
                {/* Editorial Vignette & Warm Tint Overlays */}
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-linear-to-t from-inverse-surface via-inverse-surface/40 to-transparent opacity-90" />
              </div>
              {/* Top Header Meta Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-label-mono text-label-mono text-surface-bright/80 uppercase tracking-widest bg-inverse-surface/60 backdrop-blur px-3 py-1.5 border border-outline-variant/20">{"ARCHIVE REF // STUTTGART 992-G3"}</span>
                <span className="font-label-mono text-label-mono text-surface-bright/60 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                  {" "}LEDGER SECURE
                </span>
              </div>
              {/* Bottom Museum Placard & Architectural Framing */}
              <div className="hidden lg:block relative z-10 mt-auto pt-24">
                {/* Placard Container */}
                <div className="bg-surface/95 backdrop-blur-md p-7 lg:p-9 text-on-surface border border-outline-variant/50 max-w-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40">
                    <span className="font-label-mono text-label-mono tracking-widest text-on-surface-variant uppercase">{"EXHIBIT NO. 04 // MUNICH • BASEL LEDGER"}</span>
                    <span className="font-label-mono text-label-mono text-secondary">RESTRICTED DISPOSITION</span>
                  </div>
                  <div className="py-5">
                    <p className="font-headline-md text-headline-md tracking-tight text-primary">The Carrara Minimalist Pavilion</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 max-w-md leading-relaxed">Curated architectural storage allocation for tier-one patrons. Monitored thermal equilibrium and biometric archival access protocol.</p>
                  </div>
                  {/* Spec Matrix */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/40 font-spec-numeral text-spec-numeral">
                    <div>
                      <span className="block font-label-mono text-[10px] tracking-wider text-outline uppercase mb-0.5">DISCIPLINE</span>
                      <span className="font-medium text-on-surface">AUTOMOTIVE</span>
                    </div>
                    <div>
                      <span className="block font-label-mono text-[10px] tracking-wider text-outline uppercase mb-0.5">VAULT SPEC</span>
                      <span className="font-medium text-on-surface">CLASS A-1</span>
                    </div>
                    <div>
                      <span className="block font-label-mono text-[10px] tracking-wider text-outline uppercase mb-0.5">CLEARANCE</span>
                      <span className="font-medium text-error flex items-center gap-1">
                        LOCKED{" "}
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* RIGHT 50% COLUMN: PATRON AUTHENTICATION TERMINAL */}
            <section className="lg:col-span-6 bg-surface px-6 sm:px-12 lg:px-16 py-10 lg:py-14 flex flex-col justify-between overflow-y-auto">
              {/* Terminal Header / App Top Nav */}
              <header className="w-full flex items-center justify-between pb-6 border-b border-outline-variant/40">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary" />
                  <span className="font-label-mono text-label-mono tracking-widest text-on-surface uppercase font-medium">{"PATRON TERMINAL / AUTH // 0.81"}</span>
                </div>
                <Link className="group font-label-mono text-label-mono uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-1.5" href="/fleet">
                  <span>EXIT TO FLEET</span>
                  {" "}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </header>
              {/* Central Authentication Workspace */}
              <div className="py-8 max-w-xl w-full mx-auto space-y-7">
                {/* Typography Introduction */}
                <div className="space-y-2">
                  <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">Welcome back.</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant">Access your patron reservations, bespoke itineraries, and curated vehicle preferences.</p>
                </div>
                {/* 1. ERROR BANNER AT TOP OF FORM */}
                <div className="relative bg-[#FDF2F2] border-l-[3px] border-[#B94A48] p-4 sm:p-5 flex items-start gap-3.5 transition-all">
                  <span className="material-symbols-outlined text-[#B94A48] text-xl shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  <div className="space-y-1">
                    <h2 className="font-label-mono text-label-mono text-[#B94A48] font-bold tracking-wider uppercase">{"AUTHENTICATION ERROR // INVALID CREDENTIALS"}</h2>
                    <p className="font-body-sm text-body-sm text-on-surface leading-snug">The patron identifier or security passcode provided does not match our archival ledger. Please verify your credentials or reset your passcode.</p>
                  </div>
                </div>
                {/* 3. ACCOUNT TEMPORARILY LOCKED NOTICE (HIGH-SECURITY WARNING CARD) */}
                <div className="bg-inverse-surface text-inverse-on-surface p-5 sm:p-6 border border-tertiary-container space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 text-rose-300">
                      <span className="w-2 h-2 rounded-full bg-error animate-ping" />
                      <span className="font-label-mono text-label-mono uppercase tracking-widest font-semibold">{"● TERMINAL SECURITY LOCKOUT // 5 FAILED ATTEMPTS"}</span>
                    </div>
                    <span className="font-label-mono text-[10px] uppercase text-surface-dim bg-white/10 px-2 py-0.5">PROTOCOL 403-B</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="font-body-sm text-body-sm text-inverse-on-surface/90 flex-1 leading-relaxed">Your terminal access has been temporarily suspended to preserve patron dossier integrity. Protective lockout duration remaining:</p>
                    {/* Active Circular Timer Beacon & Countdown */}
                    <div className="shrink-0 flex items-center gap-3 bg-[#252A27] px-4 py-2.5 border border-white/10 self-start sm:self-auto">
                      <div className="relative w-7 h-7 flex items-center justify-center">
                        {/* SVG Progress Ring */}
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                          <path className="text-error" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="68, 100" strokeLinecap="square" strokeWidth="3" />
                        </svg>
                        <span className="absolute material-symbols-outlined text-[13px] text-error">lock_clock</span>
                      </div>
                      <div className="text-right">
                        <span className="font-spec-numeral text-spec-numeral text-surface-bright font-bold tracking-widest block leading-none" id="countdown">{mm}:{ss}</span>
                        <span className="font-label-mono text-[9px] text-surface-dim uppercase tracking-wider block mt-0.5">MINUTES</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 4. RATE LIMIT / THROTTLING NOTICE */}
                <div className="bg-surface-container p-4 border-l-2 border-secondary flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg shrink-0 mt-0.5">schedule</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    <span className="font-medium text-on-surface">Too many attempts</span>
                    {" "}— security protocol requires a 15-minute cool-down window. Contact Patron Concierge (
                    <span className="font-spec-numeral font-medium text-on-surface">+41 44 800 2400</span>
                    ) for immediate manual unlocking.
                  </p>
                </div>
                {/* 2. FIELD ERROR STATE FORM CONTROLS */}
                <form className="space-y-5 pt-1">
                  {/* Patron Identifier Field (Filled) */}
                  <div className="space-y-1.5">
                    <label htmlFor="lockout-1" className="flex justify-between items-center font-label-mono text-label-mono text-on-surface-variant tracking-wider uppercase">
                      <span>PATRON IDENTIFIER</span>
                      {" "}
                      <span className="text-outline text-[10px]">VERIFIED FORMAT</span>
                    </label>
                    <div className="relative">
                      <input id="lockout-1" className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md px-3.5 py-3 border border-outline-variant/80 focus:outline-hidden cursor-not-allowed opacity-90 select-none" readOnly type="text" placeholder="Patron identifier locked" />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-lg">check</span>
                    </div>
                  </div>
                  {/* Security Passcode Field (Error State) */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label htmlFor="lockout-2" className="font-label-mono text-label-mono text-[#B94A48] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B94A48]" />
                        {" "}{"SECURITY PASSCODE • REQUIRED // FAILED ATTEMPT 4 OF 5"}
                      </label>
                      <Link className="font-label-mono text-[10px] text-secondary hover:text-primary uppercase tracking-wider underline" href="/forgot-passcode">Forgot passcode?</Link>
                    </div>
                    <div className="relative">
                      <input id="lockout-2" className="w-full bg-[#FDF2F2] text-on-surface font-spec-numeral text-spec-numeral px-3.5 py-3 border border-[#B94A48] focus:outline-hidden transition-colors" disabled type="password" defaultValue="••••••••••••••••" />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#B94A48] text-lg">error</span>
                    </div>
                    <p className="font-label-mono text-[10px] text-[#B94A48] uppercase tracking-wider">INCORRECT CRYPTOGRAPHIC KEY — 1 ATTEMPT REMAINING BEFORE CIPHER IS PURGED</p>
                  </div>
                  {/* Action Floor: Disabled Button With Lock Beacon */}
                  <div className="pt-2">
                    <button className="w-full bg-surface-container-highest text-outline cursor-not-allowed font-action text-action uppercase tracking-widest py-4 px-6 flex items-center justify-center gap-2 border border-outline-variant/60 transition-none" disabled type="button">
                      <span className="material-symbols-outlined text-base">lock</span>
                      {" "}
                      <span>SIGN IN TO PATRON CIRCLE</span>
                    </button>
                  </div>
                </form>
                {/* Secondary Support Links */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-secondary font-label-mono text-label-mono uppercase tracking-wider">
                  <Link className="hover:text-primary transition-colors flex items-center gap-1 underline underline-offset-4" href="/about#contact">Contact Archival Concierge →</Link>
                  <span className="text-outline-variant">|</span>
                  <Link className="hover:text-primary transition-colors underline underline-offset-4" href="/forgot-passcode">Request Ledger Reset</Link>
                  <span className="text-outline-variant">|</span>
                  <span className="text-outline">STATION ID: ZRH-09</span>
                </div>
              </div>
              {/* Institutional Security Footer */}
              <footer className="w-full pt-8 border-t border-outline-variant/40 mt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-label-mono text-[10px] tracking-wider text-outline uppercase">
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-2 h-2 bg-outline-variant" />
                    <span>HALDEN AUTOMOTIVE ARCHIVE • GENEVA • ZURICH • MUNICH</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>256-BIT ARCHIVAL CIPHER</span>
                    <span>ISO 27001 COMPLIANT</span>
                  </div>
                </div>
              </footer>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
