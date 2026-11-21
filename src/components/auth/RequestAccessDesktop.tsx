"use client";

import { strengthLabel, useRequestAccess } from "@/components/auth/useRequestAccess";
import Link from "next/link";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_request_access_desktop/code.html */
export function RequestAccessDesktop() {
  const f = useRequestAccess();
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full min-h-screen bg-surface flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen bg-surface">
            {/* LEFT COLUMN: Architectural Photography Stage & Archival Placard (6 Cols) */}
            <div className="lg:col-span-6 relative w-full h-[640px] lg:h-auto min-h-full overflow-hidden bg-inverse-surface flex flex-col justify-between p-6 sm:p-10 lg:p-14">
              {/* Stage Background Image */}
              <div className="absolute inset-0 bg-cover bg-center mix-blend-normal opacity-90 scale-100 transition-transform duration-1000 ease-out" style={{ backgroundImage: `url(${media.porscheGalleryPortrait})` }}></div>
              {/* Subtle Architectural Tonal Scrim for Text Legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-inverse-surface/90 via-inverse-surface/20 to-inverse-surface/40 pointer-events-none" />
              {/* Stage Top Header Overlay: Brand Identity & Vault Security Status */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="font-headline-sm text-surface tracking-tight font-light uppercase text-base lg:text-lg">HALDEN</span>
                  <span className="text-outline-variant font-label-mono text-[10px] tracking-widest">/ ARCHIVE</span>
                </div>
                <div className="flex items-center space-x-2 bg-inverse-surface/85 px-3 py-1.5 rounded-[2px] text-surface-variant backdrop-blur-md">
                  <span className="material-symbols-outlined text-[14px] text-primary-fixed">lock</span>
                  <span className="font-label-mono text-label-mono text-surface tracking-widest uppercase">SECURE VAULT</span>
                </div>
              </div>
              {/* Stage Bottom: Curatorial Archival Placard */}
              <div className="relative z-10 w-full max-w-xl bg-inverse-surface/90 backdrop-blur-md p-6 lg:p-8 rounded-[2px] text-surface">
                {/* Placard Category Header */}
                <div className="flex items-center space-x-2.5 pb-4 mb-4 text-primary-fixed">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-fixed" />
                  <p className="font-label-mono text-label-mono tracking-widest uppercase">{"HALDEN AUTOMOTIVE ARCHIVE // EXHIBIT 01"}</p>
                </div>
                {/* Curatorial Spec Headline */}
                <h2 className="font-headline-md text-surface text-2xl lg:text-[28px] tracking-tight mb-3">Porsche 911 2.0 Coupé (1965)</h2>
                {/* Archival Narrative */}
                <p className="font-body-sm text-surface-variant leading-relaxed text-sm mb-6 font-light">Chassis No. 300 248. Preserved in its original stone concrete staging pavilion with low raking natural daylight. Unrestored matching-numbers mechanical core maintained under archival climate control.</p>
                {/* Spec Matrix Footer */}
                <div className="grid grid-cols-2 gap-4 pt-4 text-surface-dim font-label-mono text-label-mono tracking-wider uppercase">
                  <div className="flex flex-col space-y-1">
                    <span className="text-outline-variant text-[10px]">FACILITY LOCALE</span>
                    <span className="text-surface font-spec-numeral text-xs">{"BERLIN DEPOT // ROOM IV"}</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-right">
                    <span className="text-outline-variant text-[10px]">AUTHENTICATION</span>
                    <span className="text-primary-fixed font-spec-numeral text-xs">CURATED VAULT ENTRY</span>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT COLUMN: Patron Registration Interface (6 Cols) */}
            <div className="lg:col-span-6 w-full flex flex-col justify-between bg-surface p-6 sm:p-10 lg:p-14 selection:bg-primary-container selection:text-on-primary-container">
              {/* Top Navigation & Breadcrumb Protocol */}
              <div>
                <div className="flex items-center justify-between pb-8 text-on-surface">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">{"PATRON TERMINAL / REGISTRATION // 0.82"}</span>
                  </div>
                  <Link className="group flex items-center space-x-1.5 font-label-mono text-label-mono text-secondary hover:text-primary transition-colors tracking-widest" href="/fleet">
                    <span>EXIT TO FLEET</span>
                    {" "}
                    <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
                {/* Section Title & Narrative */}
                <div className="mt-4 mb-8">
                  <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase block mb-2">PRIVATE CIRCLE ACCESS PROTOCOL</span>
                  <h1 className="font-headline-lg text-on-surface text-4xl lg:text-[42px] tracking-tight mb-3">Request Access.</h1>
                  <p className="font-body-md text-on-surface-variant max-w-lg leading-relaxed">Apply for patron credentials to access archival vehicle reservations, private concierge transit, and curatorial exhibitions.</p>
                </div>
                {/* Segmented Mode Control */}
                <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-[2px] mb-8 max-w-md">
                  <Link className="py-2.5 font-action text-action text-secondary text-center hover:text-on-surface transition-colors" href="/sign-in">Sign In</Link>
                  <button className="py-2.5 font-action text-action bg-primary text-on-primary text-center rounded-[2px]" type="button">Request Access</button>
                </div>
                {/* Credential Intake Form */}
                <form className="space-y-6 max-w-xl" noValidate onSubmit={f.submit}>
                  {/* Field 1: Full Legal Name */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label className="font-label-mono text-label-mono text-on-surface tracking-wider uppercase" htmlFor="fullName">LEGAL FULL NAME</label>
                      <span className="font-label-mono text-[10px] tracking-widest text-secondary uppercase bg-surface-container px-2 py-0.5 rounded-[2px]">PASSPORT MATCH</span>
                    </div>
                    <div className="relative"><input autoComplete="name" className="w-full h-[52px] bg-surface-container-lowest px-4 text-on-surface font-body-md rounded-[2px] focus:outline-hidden focus:bg-surface-container-low transition-colors" id="fullName" type="text" value={f.name} onChange={(e) => f.setName(e.target.value)} /></div>
                  </div>
                  {/* Field 2: Patron Identifier / Email */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label className="font-label-mono text-label-mono text-on-surface tracking-wider uppercase" htmlFor="email">PATRON IDENTIFIER / EMAIL</label>
                      <span className="font-label-mono text-[10px] tracking-widest text-primary font-medium uppercase bg-primary-fixed/50 px-2 py-0.5 rounded-[2px]">ARCHIVE-VERIFIED</span>
                    </div>
                    <div className="relative"><input autoComplete="email" className="w-full h-[52px] bg-surface-container-lowest px-4 text-on-surface font-body-md rounded-[2px] focus:outline-hidden focus:bg-surface-container-low transition-colors" id="email" type="email" value={f.email} onChange={(e) => f.setEmail(e.target.value)} /></div>
                  </div>
                  {/* Field 3: Security Passcode */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label className="font-label-mono text-label-mono text-on-surface tracking-wider uppercase" htmlFor="passcode">SECURITY PASSCODE</label>
                      <span className="font-label-mono text-[10px] tracking-widest text-secondary uppercase bg-surface-container px-2 py-0.5 rounded-[2px]">MIN 12 CHARACTERS</span>
                    </div>
                    <div className="relative"><input className="w-full h-[52px] bg-surface-container-lowest px-4 text-on-surface font-spec-numeral text-lg tracking-widest rounded-[2px] focus:outline-hidden focus:bg-surface-container-low transition-colors" id="passcode" type="password" autoComplete="new-password" value={f.pass} onChange={(e) => f.setPass(e.target.value)} /></div>
                    {/* 4-Segment Architectural Passcode Strength Meter */}
                    <div className="pt-1.5 space-y-2">
                      <div className="grid grid-cols-4 gap-1.5" aria-hidden>
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className={`h-1 rounded-[1px] ${i < f.strength ? (i === 3 ? "bg-primary-container" : "bg-primary") : "bg-surface-container-high"}`} />
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-label-mono tracking-widest uppercase" aria-live="polite">
                        <span className="text-primary font-semibold">{strengthLabel[f.strength] || "ENTER A PASSCODE"}</span>
                        <span className="text-secondary">{f.pass.length} CHARACTERS</span>
                      </div>
                    </div>
                    {/* Passcode Rules Verification Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs font-body-sm text-secondary">
                      {(
                        [
                          ["length", "12+ characters"],
                          ["letter", "One letter"],
                          ["digit", "Number or symbol"],
                        ] as const
                      ).map(([k, label]) => (
                        <div key={k} className={`flex items-center space-x-1.5 ${f.rules[k] ? "text-primary" : "text-outline"}`}>
                          <span className="material-symbols-outlined text-[15px]" aria-hidden>
                            {f.rules[k] ? "check" : "radio_button_unchecked"}
                          </span>
                          <span className="font-label-mono text-[11px]">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Field 4: Confirm Passcode */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-baseline">
                      <label className="font-label-mono text-label-mono text-on-surface tracking-wider uppercase" htmlFor="confirmPasscode">CONFIRM PASSCODE</label>
                      <span className="font-label-mono text-[10px] tracking-widest text-primary uppercase bg-primary-fixed/50 px-2 py-0.5 rounded-[2px]">{f.matches ? "MATCH VERIFIED" : "REPEAT PASSCODE"}</span>
                    </div>
                    <div className="relative flex items-center">
                      <input className="w-full h-[52px] bg-surface-container-lowest px-4 pr-12 text-on-surface font-spec-numeral text-lg tracking-widest rounded-[2px] focus:outline-hidden focus:bg-surface-container-low transition-colors" id="confirmPasscode" type="password" autoComplete="new-password" value={f.confirm} onChange={(e) => f.setConfirm(e.target.value)} />
                      {f.matches && <span className="absolute right-4 text-primary material-symbols-outlined text-[20px]">check_circle</span>}
                    </div>
                  </div>
                  {/* Curatorial Charter Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input checked={f.agree} onChange={(e) => f.setAgree(e.target.checked)} className="peer appearance-none w-4 h-4 bg-surface-container-lowest rounded-none checked:bg-primary transition-colors cursor-pointer" type="checkbox" />
                        <span className="material-symbols-outlined absolute text-[13px] text-on-primary pointer-events-none opacity-0 peer-checked:opacity-100">check</span>
                      </div>
                      {" "}
                      <span className="font-body-sm text-xs text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed select-none">
                        I agree to the{" "}
                        <Link className="underline hover:text-primary" href="/terms">HALDEN Custodial Charter</Link>
                        ,{" "}
                        <Link className="underline hover:text-primary" href="/terms#drivers">Curatorial Driving Terms</Link>
                        , and{" "}
                        <Link className="underline hover:text-primary" href="/privacy">Patron Data Protocols</Link>
                        .
                      </span>
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
                  {/* Primary Call to Action */}
                  <div className="pt-3">
                    <button className="w-full h-[54px] bg-primary text-on-primary font-action text-action uppercase tracking-widest rounded-[2px] hover:bg-primary-container transition-colors flex items-center justify-center space-x-2" type="submit">
                      <span>REQUEST PATRON ACCESS</span>
                      {" "}
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                  {/* Alternative Auth Provider: Google Single-Sign */}
                  <div className="space-y-4 pt-2">
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-px bg-surface-container-high" />
                      <span className="absolute px-3 bg-surface font-label-mono text-[10px] text-secondary tracking-widest uppercase">OR AUTHENTICATE VIA</span>
                    </div>
                    <button className="w-full h-[48px] bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-[2px] flex items-center justify-center space-x-3 font-body-sm text-sm" disabled title="Google sign-in arrives with patron accounts" type="button">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                      </svg>
                      {" "}
                      <span className="font-action tracking-wider text-xs uppercase">Continue with Google Workspace</span>
                    </button>
                  </div>
                  {/* Existing Member Redirect */}
                  <div className="pt-2 text-center">
                    <p className="font-body-sm text-xs text-secondary">
                      Already an authenticated patron?{" "}
                      <Link className="font-semibold text-primary hover:underline ml-1" href="/sign-in">Sign in to Patron Circle →</Link>
                    </p>
                  </div>
                </form>
              </div>
              {/* Institutional Footer */}
              <div className="pt-12 mt-8 text-on-surface">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-secondary gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                    <span className="font-label-mono text-[10px] tracking-widest uppercase">256-BIT ENCRYPTED PATRON ARCHIVE</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-label-mono text-[10px] tracking-widest uppercase">
                    <span>HALDEN AG</span>
                    <span>·</span>
                    <Link className="hover:text-primary transition-colors" href="/terms">CHAMBER CHARTER</Link>
                    <span>·</span>
                    <Link className="hover:text-primary transition-colors" href="/privacy">DATA PROTOCOL</Link>
                    <span>·</span>
                    <Link className="hover:text-primary transition-colors" href="/about#contact">PRIVATE CONCIERGE</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
