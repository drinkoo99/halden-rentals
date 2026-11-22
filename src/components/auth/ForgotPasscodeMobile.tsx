"use client";

import { useState } from "react";
import { requestPasswordResetAction } from "@/app/actions/auth";
import { isEmail, maskEmail, useCountdown } from "@/lib/useCountdown";
import Link from "next/link";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_mobile_forgot_passcode_b/code.html */
export function ForgotPasscodeMobile() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const timer = useCountdown(45);
  /** Same flow as desktop: the confirmation only appears when the server really sent a link. */
  async function send() {
    if (!isEmail(email)) return setError("Enter the email address linked to your patron account.");
    setError(null);
    const res = await requestPasswordResetAction({ email });
    if (!res.ok) {
      setSent(false);
      return setError(res.error);
    }
    setSent(true);
    timer.start();
  }
  return (
    <div className="md:hidden bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col relative w-full bg-surface pb-safe">
        <div className="flex flex-col w-full">
          {/* Architectural Top Gallery Banner (200px) */}
          <section className="relative w-full h-[200px] overflow-hidden select-none bg-surface-container-highest">
            <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${media.porscheVintageGallery})` }} />
            {/* Layered Architectural Tonal Gradients for Depth & Legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-on-background/85 via-on-background/40 to-on-background/70" />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            <div className="relative z-10 flex flex-col justify-between h-full p-4 text-surface">
              {/* Top Badging Row */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <span className="font-headline-sm text-headline-sm tracking-tight text-surface">HALDEN</span>
                  <span className="text-surface/40 text-body-sm">/</span>
                  <span className="font-label-mono text-[10px] tracking-widest text-surface/75 uppercase">ARCHIVAL VAULT</span>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-surface-container-lowest/15 backdrop-blur-sm rounded">
                  <span className="material-symbols-outlined text-[14px] text-surface-variant">lock</span>
                  <span className="font-label-mono text-[10px] tracking-wider text-surface uppercase">SECURE VAULT</span>
                </div>
              </div>
              {/* Bottom Catalogue Badge */}
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center space-x-2 bg-on-background/60 backdrop-blur-md px-2.5 py-1 rounded">
                  <span className="w-1.5 h-1.5 bg-inverse-primary rounded-full animate-pulse" />
                  <span className="font-label-mono text-[10px] tracking-widest text-surface uppercase">EXHIBIT 01 · 911 2.0 COUPÉ (1965)</span>
                </div>
                <span className="font-label-mono text-[10px] tracking-widest text-surface/60">CAT. № 083</span>
              </div>
            </div>
          </section>
          {/* Architectural Primary Chamber */}
          <section className="w-full px-4 pt-5 pb-8 flex flex-col space-y-6">
            {/* Top Metadata Header Strip */}
            <div className="flex items-center justify-between py-1 bg-surface-container-low px-3 rounded">
              <div className="flex items-center space-x-2"><span className="font-label-mono text-label-mono uppercase text-secondary">{"PATRON RECOVERY // 0.83"}</span></div>
              <Link className="font-label-mono text-label-mono text-on-surface hover:text-primary transition-colors flex items-center space-x-1 py-1" href="/fleet">
                <span>EXIT</span>
                {" "}
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </Link>
            </div>
            {/* Editorial Typography Intro */}
            <div className="flex flex-col space-y-2">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Forgot passcode?</h1>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Enter your registered patron identifier to receive an encrypted authentication recovery dispatch.</p>
            </div>
            {/* Interactive Form Canvas */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface" htmlFor="m-patron-email">PATRON IDENTIFIER / EMAIL</label>
                  <span className="font-label-mono text-[9px] uppercase px-1.5 py-0.5 bg-secondary-container text-on-secondary-container rounded">ARCHIVE-REGISTERED</span>
                </div>
                <div className="relative w-full h-[52px] bg-surface-container-lowest rounded flex items-center px-4">
                  <span className="material-symbols-outlined text-[18px] text-outline mr-3 select-none">fingerprint</span>
                  <input className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-hidden placeholder:text-outline" id="m-patron-email" placeholder="patron@domain.com" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} aria-invalid={!!error} />
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                </div>
              </div>
              {error && (
                <p className="font-label-mono text-[10px] text-error uppercase" role="alert">
                  {error}
                </p>
              )}
              {/* Action Button */}
              <button className="w-full h-[52px] bg-primary hover:bg-primary-container text-on-primary font-action text-action uppercase tracking-widest rounded flex items-center justify-center space-x-2 transition-all active:scale-[0.99]" id="m-dispatch-btn" onClick={send} type="button">
                <span>Send Reset Link</span>
                {" "}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
            {/* Confirmation / Success Chamber Card */}
            <div className="bg-surface-container-low p-5 rounded flex flex-col space-y-4" hidden={!sent} role="status">
              {/* Status Protocol Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded bg-primary-fixed flex items-center justify-center"><span className="material-symbols-outlined text-[14px] text-on-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>check</span></div>
                  <span className="font-label-mono text-[10px] tracking-widest text-secondary uppercase font-semibold">RECOVERY DISPATCH TRANSMITTED</span>
                </div>
                <span className="font-label-mono text-[9px] text-outline uppercase">PROTOCOL 4.2</span>
              </div>
              {/* Editorial Notice */}
              <div className="flex flex-col space-y-1.5">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Check your inbox.</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  If{" "}
                  <span className="font-spec-numeral text-on-surface font-medium">{maskEmail(email)}</span>
                  {" "}belongs to a patron account, a single-use link is on its way.
                </p>
              </div>
              {/* Interactive Progress Indicator & Timer Row */}
              <div className="bg-surface-container p-3 rounded flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Circular Architectural Ring */}
                  <div className="relative w-7 h-7 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-surface-variant" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-primary transition-all duration-1000 ease-linear" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" id="m-countdown-ring" stroke="currentColor" strokeDasharray={`${Math.round(timer.progress * 100)}, 100`} strokeLinecap="square" strokeWidth="3" />
                    </svg>
                    <span className="material-symbols-outlined absolute text-[12px] text-primary">schedule</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">AUTH EXPIRATION</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold" id="m-countdown-text">{timer.left > 0 ? `Resend link in ${timer.label}` : "Ready to resend"}</span>
                  </div>
                </div>
                <button className={`font-action text-body-sm px-2 py-1 transition-opacity uppercase tracking-wider ${timer.left > 0 ? "text-outline opacity-50" : "text-primary"}`} disabled={timer.left > 0} id="m-resend-btn" onClick={() => void send()} type="button">Resend</button>
              </div>
              {/* Navigation Exit Touch Target (44px min-height) */}
              <div className="pt-2">
                <Link className="w-full min-h-[44px] flex items-center justify-center space-x-2 text-primary hover:bg-surface-container-high rounded transition-colors" href="/sign-in">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  {" "}
                  <span className="font-action text-body-sm tracking-wider uppercase font-semibold">Back to Patron Sign In</span>
                </Link>
              </div>
            </div>
            {/* Archival Metadata Signature Footer */}
            <div className="flex flex-col items-center justify-center text-center space-y-1.5 pt-4">
              <div className="w-8 h-1 bg-surface-container-highest rounded mb-2" />
              <p className="font-label-mono text-[10px] tracking-widest text-outline uppercase">256-BIT ENCRYPTED PATRON ARCHIVE</p>
              <div className="flex items-center space-x-2 text-[10px] font-label-mono text-outline uppercase tracking-wider">
                <span>HALDEN AG</span>
                <span>·</span>
                <Link className="underline hover:text-on-surface transition-colors" href="/privacy">{"PRIVACY & PROTOCOL"}</Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
