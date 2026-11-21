"use client";

import { useState } from "react";
import { isEmail, maskEmail, useCountdown } from "@/lib/useCountdown";
import Link from "next/link";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_forgot_passcode_recovery_desktop/code.html */
export function ForgotPasscodeDesktop() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"idle" | "sending" | "sent">("idle");
  const timer = useCountdown(45);
  /** Accounts are not live yet: the request is validated and acknowledged, but no email is sent. */
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError("Enter the email address linked to your patron account.");
    setError(null);
    setPhase("sending");
    window.setTimeout(() => {
      setPhase("sent");
      timer.start();
    }, 800);
  }
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full min-h-screen bg-surface flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen">
            {/* LEFT 50% COLUMN: Architectural Gallery Photographic Stage */}
            <div className="lg:col-span-6 relative w-full h-[640px] lg:h-auto min-h-full overflow-hidden bg-primary">
              <div className="absolute inset-0 bg-cover bg-center w-full h-full transform scale-[1.01] transition-transform duration-1000" style={{ backgroundImage: `url(${media.porscheGalleryPortrait})` }}></div>
              {/* Architectural scrim overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
              {/* Top Left: Institutional Badge */}
              <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
                <div className="bg-surface/90 backdrop-blur-md px-3.5 py-1.5 flex items-center gap-2.5">
                  <span className="inline-block w-1.5 h-1.5 bg-primary animate-pulse" />
                  <span className="font-label-mono text-label-mono text-primary tracking-widest uppercase">{"SECURE VAULT // ARCHIVE ACCESS"}</span>
                </div>
                <div className="bg-primary/80 backdrop-blur-md px-3 py-1.5 hidden sm:block"><span className="font-label-mono text-label-mono text-inverse-primary tracking-widest uppercase">{"NODE // ZRH-01"}</span></div>
              </div>
              {/* Bottom Left: Exhibit Placard (Signature Component) */}
              <div className="absolute bottom-8 left-8 right-8 z-10 max-w-md">
                <div className="bg-primary/85 backdrop-blur-md p-6 text-on-primary">
                  {/* Placard Catalogue Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 bg-primary-container/40 p-2">
                    <span className="font-label-mono text-label-mono text-on-primary-container tracking-wider uppercase">{"CATALOGUE № 04 // STUTTGART ARCHIVE"}</span>
                    <span className="font-label-mono text-label-mono text-on-primary/70">ACQUISITION 1965</span>
                  </div>
                  {/* Exhibit Title */}
                  <div className="space-y-1 mb-4">
                    <h2 className="font-headline-md text-headline-md text-on-primary tracking-tight">Porsche 911 2.0 Coupé</h2>
                    <p className="font-body-sm text-body-sm text-on-primary-container">Chassis № 300 241 · Slate Grey · Air-cooled flat-six</p>
                  </div>
                  {/* Spec Matrix */}
                  <div className="grid grid-cols-3 gap-2 pt-3 bg-primary-container/30 p-2.5">
                    <div>
                      <span className="block font-label-mono text-label-mono text-on-primary-container text-[10px]">POWER</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-primary">130 PS</span>
                    </div>
                    <div>
                      <span className="block font-label-mono text-label-mono text-on-primary-container text-[10px]">DISPLACEMENT</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-primary">1,991 CM³</span>
                    </div>
                    <div>
                      <span className="block font-label-mono text-label-mono text-on-primary-container text-[10px]">STATUS</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-primary-container">CURATED</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Accent vertical catalog marker */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block [writing-mode:vertical-rl] select-none pointer-events-none opacity-40"><span className="font-label-mono text-label-mono text-surface tracking-[0.3em] uppercase">{"HALDEN PRIVATE EXHIBIT // SECTOR B-04"}</span></div>
            </div>
            {/* RIGHT 50% COLUMN: Ivory Background & Protocol Recovery Terminal */}
            <div className="lg:col-span-6 bg-surface flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-screen">
              {/* Top Navigation & Terminal Bar */}
              <div className="w-full flex items-center justify-between pb-8">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-primary" />
                  <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">{"PATRON TERMINAL / RECOVERY // 0.83"}</span>
                </div>
                <Link className="font-label-mono text-label-mono text-primary hover:text-primary-container transition-colors duration-150 flex items-center gap-1.5 uppercase group" href="/fleet">
                  <span>EXIT TO FLEET</span>
                  {" "}
                  <span className="transition-transform group-hover:translate-x-1 duration-150">→</span>
                </Link>
              </div>
              {/* Central Content Arena */}
              <div className="w-full max-w-xl mx-auto py-6 flex flex-col gap-10">
                {/* Header Grouping */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2"><span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase bg-surface-container-high px-2.5 py-1">CREDENTIAL RECOVERY PROTOCOL</span></div>
                  <h1 className="font-headline-lg text-headline-lg text-on-background tracking-tight">Forgot passcode?</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">Enter your registered patron identifier to receive an encrypted authentication recovery dispatch.</p>
                </div>
                {/* Interactive Protocol Container: Form & Confirmation */}
                <div className="space-y-6 w-full">
                  {/* STATE 1: Request Module */}
                  <div className="bg-surface-container-lowest p-6 transition-all duration-300" id="request-panel">
                    <form className="space-y-5" id="recovery-form" noValidate onSubmit={submit}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="font-label-mono text-label-mono text-on-background uppercase tracking-wider" htmlFor="identifier">PATRON IDENTIFIER / EMAIL</label>
                          <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase bg-surface-container px-2 py-0.5">ARCHIVE-REGISTERED</span>
                        </div>
                        <div className="relative">
                          <input className="w-full h-[52px] px-4 bg-surface text-on-background font-body-md focus:bg-surface-container-lowest outline-hidden transition-colors duration-150 text-body-md placeholder:text-outline" id="identifier" placeholder="name@domain.com" required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? "identifier-error" : undefined} />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none flex items-center"><span className="material-symbols-outlined text-[18px]">lock_reset</span></div>
                        </div>
                      </div>
                      {/* Primary CTA */}
                      <button className="w-full h-[52px] bg-primary hover:bg-primary-container text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-200" disabled={phase === "sending"} id="submit-btn" type="submit">
                        <span id="btn-text">{phase === "sending" ? "AUTHENTICATING..." : "SEND RESET LINK →"}</span>
                        {" "}
                        <span className={`material-symbols-outlined text-[18px] animate-spin ${phase === "sending" ? "" : "hidden"}`} id="btn-spinner">progress_activity</span>
                      </button>
                      {error && (
                        <p className="font-label-mono text-label-mono text-error uppercase tracking-normal" id="identifier-error" role="alert">
                          {error}
                        </p>
                      )}
                    </form>
                  </div>
                  {/* STATE 2: Prominent Archival Dossier Notice (Success Confirmation Panel) */}
                  <div className="bg-surface-container p-6 sm:p-7 relative transition-all duration-500" hidden={phase !== "sent"} id="success-panel" role="status">
                    <div className="flex flex-col gap-4">
                      {/* Transmitted Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-primary-container flex items-center justify-center text-on-primary shrink-0"><span className="material-symbols-outlined text-[16px]">check</span></div>
                        <div className="flex flex-col">
                          <span className="font-label-mono text-label-mono text-primary font-semibold tracking-widest uppercase">RECOVERY DISPATCH TRANSMITTED</span>
                          <span className="font-label-mono text-[10px] text-secondary tracking-wide">DISPATCH HASH: 911-CR-7904-B</span>
                        </div>
                      </div>
                      {/* Archival Document Text */}
                      <div className="space-y-2 pt-2">
                        <h3 className="font-headline-md text-headline-md text-on-background">Check your inbox.</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          An authenticated recovery dispatch has been transmitted to{" "}
                          <span className="font-spec-numeral text-spec-numeral font-medium text-on-background px-1 py-0.5 bg-surface-container-high">{maskEmail(email)}</span>
                          {" "}with a cryptographic single-use session token.
                        </p>
                      </div>
                      {/* Countdown / Resend Block */}
                      <div className="pt-4 mt-2 bg-surface-container-lowest/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {/* Circular Progress Beacon SVG */}
                          <div className="relative w-6 h-6 shrink-0">
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                              <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                              <path className="text-primary transition-all duration-1000 ease-linear" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" id="beacon-ring" stroke="currentColor" strokeDasharray="100, 100" strokeDashoffset={100 - timer.progress * 100} strokeLinecap="square" strokeWidth="3.2" />
                            </svg>
                          </div>
                          <span className="font-label-mono text-label-mono text-on-surface tracking-wider" id="countdown-text">
                            {timer.left > 0 ? (
                              <>
                                Resend link available in <span className="font-spec-numeral text-spec-numeral font-bold">{timer.label}</span>
                              </>
                            ) : (
                              <span className="font-label-mono text-label-mono text-primary font-medium tracking-wider">Ready for a new request</span>
                            )}
                          </span>
                        </div>
                        {/* Resend Action Trigger */}
                        <button className={timer.left > 0 ? "font-label-mono text-label-mono text-outline cursor-not-allowed uppercase tracking-widest transition-colors duration-150 py-1 text-left sm:text-right" : "font-label-mono text-label-mono text-primary hover:text-primary-container cursor-pointer uppercase tracking-widest transition-colors duration-150 py-1 text-left sm:text-right underline"} disabled={timer.left > 0} id="resend-action" onClick={timer.start} type="button">Resend link</button>
                      </div>
                      {/* Navigation Back */}
                      <div className="pt-2 flex items-center justify-between">
                        <Link className="font-label-mono text-label-mono text-primary hover:text-primary-container transition-colors duration-150 uppercase tracking-wider flex items-center gap-1.5 group" href="/sign-in">
                          <span className="transition-transform group-hover:-translate-x-1 duration-150">←</span>
                          {" "}
                          <span>Return to Patron Sign In</span>
                        </Link>
                        <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest hidden sm:inline-block">TTL: 15 MINUTES</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Bottom Institutional Security Footer */}
              <div className="w-full pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">{"HALDEN SWITZERLAND ARCHIVE ENCRYPTION // SHA-256 IDENT"}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">SESSION: 0x88F7B</span>
                  <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">PATRON PROTOCOL V4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
