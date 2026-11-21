"use client";

import { strengthLabel, useRequestAccess } from "@/components/auth/useRequestAccess";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_mobile_request_access_a/code.html */
export function RequestAccessMobile() {
  const f = useRequestAccess();
  return (
    <div className="md:hidden bg-surface text-on-surface antialiased flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col relative w-full bg-surface pb-safe">
        <div className="flex flex-col w-full text-on-surface">
          {/* Architectural Hero Band (200px) */}
          <div className="relative w-full h-[200px] overflow-hidden bg-surface-container-highest">
            <Photo src={media.porscheVintageGallery} alt="Editorial architectural photograph of vintage silver Porsche 911 in gallery showroom" className="w-full h-full object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/30 to-black/50" />
            {/* Top Bar inside Hero */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-on-primary">
              <span className="font-headline-sm text-headline-sm tracking-wider uppercase">HALDEN</span>
              <div className="flex items-center space-x-1.5 bg-primary-container/80 px-2.5 py-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span className="font-label-mono text-label-mono tracking-widest text-[10px]">SECURE VAULT</span>
              </div>
            </div>
            {/* Bottom Exhibit Badge */}
            <div className="absolute bottom-3 left-4 right-4"><div className="inline-flex items-center bg-surface/90 text-on-surface px-2 py-0.5 shadow-sm"><span className="font-label-mono text-label-mono text-[10px] text-on-surface-variant uppercase">EXHIBIT 01 · 911 2.0 COUPÉ (1965)</span></div></div>
          </div>
          {/* Main Mobile Chamber Body */}
          <div className="flex flex-col w-full px-5 py-6 space-y-6">
            {/* Top Metadata Ribbon */}
            <div className="flex items-center justify-between text-secondary">
              <span className="font-label-mono text-label-mono tracking-widest text-[11px] uppercase">{"PATRON REGISTRATION // 0.82"}</span>
              <Link className="font-label-mono text-label-mono tracking-wider text-[11px] hover:text-primary transition-colors flex items-center space-x-1" href="/fleet">
                <span>EXIT</span>
                {" "}
                <span>→</span>
              </Link>
            </div>
            {/* Headline Module */}
            <div className="space-y-1.5">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Request Access.</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Apply for patron credentials to access archival vehicle reservations and curatorial exhibitions.</p>
            </div>
            {/* Segmented Control Switch */}
            <div className="grid grid-cols-2 p-1 bg-surface-container rounded-none text-center">
              <Link className="h-11 flex items-center justify-center font-action text-action text-on-surface-variant hover:text-on-surface transition-colors" id="btn-signin" href="/sign-in">Sign In</Link>
              <span className="h-11 flex items-center justify-center bg-primary text-on-primary font-action text-action shadow-sm" id="btn-register" aria-current="page">Request Access</span>
            </div>
            {/* Form Section */}
            <form className="space-y-4" noValidate onSubmit={f.submit}>
              {/* Field 1: Full Name */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-mono text-label-mono text-on-surface tracking-wider" htmlFor="m-ra-name">LEGAL FULL NAME</label>
                  <span className="font-label-mono text-[10px] text-outline tracking-wider">PASSPORT MATCH</span>
                </div>
                <div className="h-[52px] bg-surface-container-lowest px-4 flex items-center"><input className="w-full bg-transparent text-on-surface font-body-md text-body-md focus:outline-hidden placeholder-outline" placeholder="First and last name" type="text" id="m-ra-name" autoComplete="name" value={f.name} onChange={(e) => f.setName(e.target.value)} /></div>
              </div>
              {/* Field 2: Email */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-mono text-label-mono text-on-surface tracking-wider" htmlFor="m-ra-email">PATRON IDENTIFIER / EMAIL</label>
                  <span className="font-label-mono text-[10px] text-outline tracking-wider">ARCHIVE-VERIFIED</span>
                </div>
                <div className="h-[52px] bg-surface-container-lowest px-4 flex items-center"><input className="w-full bg-transparent text-on-surface font-body-md text-body-md focus:outline-hidden placeholder-outline" placeholder="patron@domain.ch" type="email" id="m-ra-email" autoComplete="email" value={f.email} onChange={(e) => f.setEmail(e.target.value)} /></div>
              </div>
              {/* Field 3: Security Passcode */}
              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-mono text-label-mono text-on-surface tracking-wider" htmlFor="m-ra-pass">SECURITY PASSCODE</label>
                  <span className="font-label-mono text-[10px] text-outline tracking-wider">MIN 12 CHARS</span>
                </div>
                <div className="h-[52px] bg-surface-container-lowest px-4 flex items-center justify-between">
                  <input className="w-full bg-transparent text-on-surface font-body-md text-body-md focus:outline-hidden" id="m-ra-pass" autoComplete="new-password" type="password" value={f.pass} onChange={(e) => f.setPass(e.target.value)} />
                  <span className="material-symbols-outlined text-outline text-[20px] select-none cursor-pointer">visibility_off</span>
                </div>
                {/* 4-Segment Strength Indicator */}
                <div className="pt-1.5 space-y-1.5">
                  <div className="flex items-center space-x-1.5" aria-live="polite">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 ${i < f.strength ? "bg-primary" : "bg-primary-fixed-dim"}`} />
                    ))}
                    <span className="font-label-mono text-[10px] text-primary tracking-widest pl-1 font-semibold">{strengthLabel[f.strength].replace(" STRENGTH", "") || "—"}</span>
                  </div>
                  {/* Rules Checklist */}
                  <div className="flex items-center space-x-3 text-secondary pt-0.5">
                    <span className={`font-label-mono text-[10px] flex items-center ${f.rules.length ? "text-primary" : "text-outline"}`}>{f.rules.length ? "✓" : "○"} 12+ chars</span>
                    <span className={`font-label-mono text-[10px] flex items-center ${f.rules.letter ? "text-primary" : "text-outline"}`}>{f.rules.letter ? "✓" : "○"} One letter</span>
                    <span className={`font-label-mono text-[10px] flex items-center ${f.rules.digit ? "text-primary" : "text-outline"}`}>{f.rules.digit ? "✓" : "○"} Number/symbol</span>
                  </div>
                </div>
              </div>
              {/* Field 4: Confirm Passcode */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label-mono text-label-mono text-on-surface tracking-wider" htmlFor="m-ra-confirm">CONFIRM PASSCODE</label>
                  <span className="font-label-mono text-[10px] text-primary tracking-wider font-semibold">{f.matches ? "MATCH VERIFIED" : ""}</span>
                </div>
                <div className="h-[52px] bg-surface-container-lowest px-4 flex items-center justify-between">
                  <input className="w-full bg-transparent text-on-surface font-body-md text-body-md focus:outline-hidden" id="m-ra-confirm" autoComplete="new-password" type="password" value={f.confirm} onChange={(e) => f.setConfirm(e.target.value)} />
                  {f.matches && <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>}
                </div>
              </div>
              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-3 cursor-pointer select-none">
                  <div className={`relative w-6 h-6 shrink-0 flex items-center justify-center ${f.agree ? "bg-primary" : "bg-surface-container-highest"}`}>
                    <input checked={f.agree} onChange={(e) => f.setAgree(e.target.checked)} className="opacity-0 absolute inset-0 cursor-pointer" type="checkbox" />
                    {f.agree && <span className="material-symbols-outlined text-on-primary text-[18px]">check</span>}
                  </div>
                  {" "}
                  <span className="font-body-sm text-[12px] leading-[18px] text-on-surface-variant pt-0.5">I agree to the HALDEN Custodial Charter, Curatorial Driving Terms, and Patron Data Protocols.</span>
                </label>
              </div>
              {f.error && (
                <p className="font-label-mono text-[11px] text-error uppercase tracking-normal" role="alert">
                  {f.error}
                </p>
              )}
              {f.notice && (
                <p className="font-body-sm text-body-sm text-on-secondary-container bg-secondary-container p-3" role="status">
                  {f.notice}
                </p>
              )}
              {/* Primary Action */}
              <div className="pt-3">
                <button className="w-full h-[52px] bg-primary text-on-primary font-action text-action flex items-center justify-center space-x-2 active:bg-primary-container transition-colors" type="submit">
                  <span>Request Patron Access</span>
                  {" "}
                  <span>→</span>
                </button>
              </div>
              {/* Alternative Auth Divider */}
              <div className="py-2 flex items-center justify-between">
                <div className="h-[1px] bg-surface-variant flex-1" />
                <span className="px-3 font-label-mono text-[10px] text-outline uppercase tracking-widest">OR</span>
                <div className="h-[1px] bg-surface-variant flex-1" />
              </div>
              {/* Google SSO Button */}
              <button className="w-full h-[52px] bg-surface-container-lowest text-on-surface font-action text-action flex items-center justify-center space-x-3 hover:bg-surface-container transition-colors" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                {" "}
                <span>Continue with Google</span>
              </button>
              {/* Alt Auth Text Switcher */}
              <div className="text-center pt-2">
                <a className="inline-flex items-center space-x-1 font-body-sm text-[13px] text-secondary hover:text-primary transition-colors" href="#signin">
                  <span>Already a patron?</span>
                  {" "}
                  <span className="font-semibold underline underline-offset-4 text-primary">Sign in →</span>
                </a>
              </div>
            </form>
            {/* Mobile Footer Info */}
            <div className="pt-6 pb-2 text-center"><p className="font-label-mono text-[10px] text-outline tracking-wider leading-relaxed uppercase">{"256-BIT ENCRYPTED PATRON ARCHIVE // HALDEN AG · PRIVACY & PROTOCOL"}</p></div>
          </div>
        </div>
      </main>
    </div>
  );
}
