"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPasswordAction } from "@/app/actions/auth";
import { passcodeRules, passcodeStrength, strengthLabel } from "@/components/auth/useRequestAccess";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/**
 * Stitch "Reset Passcode & Verification (Desktop)". Section C sets a new passcode with the single-use link
 * from the reset email (?token=…); the server checks the token and signs the account out everywhere.
 * Section D (email verification) works through the link in the welcome email; it is described honestly
 * here instead of showing a code that was never sent.
 */
export function ResetPasscodeScreen() {
  const token = useSearchParams().get("token") ?? "";
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "done" | "expired">(token ? "idle" : "expired");
  const rules = passcodeRules(pass);
  const strength = passcodeStrength(pass);
  const matches = confirm.length > 0 && confirm === pass;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rules.length || !rules.letter || !rules.digit) return setError("Your passcode needs 12+ characters, a letter and a number or symbol.");
    if (!matches) return setError("The two passcodes do not match.");
    setError(null);
    setState("saving");
    const res = await resetPasswordAction({ token, password: pass });
    if (res.ok) return setState("done");
    if (res.code === "invalid" && res.error.includes("expired")) return setState("expired");
    setState("idle");
    setError(res.error);
  }

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full min-h-screen bg-surface flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            {/* LEFT STAGE: 50% Exhibition Pedestal with Architectural Gallery Photo */}
            <aside className="lg:col-span-6 relative bg-surface-container-low flex flex-col justify-between h-[200px] lg:h-auto p-6 lg:p-16 overflow-hidden">
              {/* Ambient Image Canvas */}
              <div className="absolute inset-0 z-0">
                <Photo src={media.porscheGalleryPortrait} priority alt="Architectural gallery exhibition" className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-[1.03]" sizes="(max-width: 767px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-linear-to-t from-inverse-surface/85 via-inverse-surface/25 to-surface-container-low/40 mix-blend-multiply" />
              </div>
              {/* Top Exhibition Registry Marker */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 bg-surface-container-lowest/90 px-3 py-1.5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span className="font-label-mono text-label-mono uppercase text-on-surface tracking-widest">{"ARCHIVE // ZURICH WERKSTATT"}</span>
                </div>
                <span className="font-label-mono text-label-mono text-surface-container-lowest tracking-widest opacity-80">EXHIBIT № 09-K</span>
              </div>
              {/* Center Space intentionally preserved for composition & shadow lines */}
              <div className="hidden lg:block relative z-10 my-auto py-16">
                <span className="inline-block font-label-mono text-label-mono text-surface-container-lowest/70 tracking-widest uppercase mb-2">CURATED FLEET ASSET</span>
                <h2 className="font-headline-lg text-headline-lg text-surface-container-lowest max-w-md italic font-light">Sculpted endurance, mechanical silence.</h2>
              </div>
              {/* Museum Placard (Signature Component) */}
              <div className="hidden lg:block relative z-10 bg-surface-container-lowest text-on-surface p-6 sm:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
                  <div>
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block">{"CATALOGUE № 49 // PERMANENT COLLECTION"}</span>
                    <h3 className="font-headline-md text-headline-md tracking-tight text-on-surface mt-1">Typ 992 Carrera Heritage</h3>
                  </div>
                  <div className="text-right">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant block">CALIBRE</span>
                    <span className="font-spec-numeral text-spec-numeral font-bold text-primary">3.75 L-BOXER</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 pb-4">
                  <div>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block">CHASSIS SPEC</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">ST-044-88</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block">OUTPUT</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">478 kW / 650 PS</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase block">DAILY PRIVILEGE</span>
                    <span className="font-spec-numeral text-spec-numeral text-primary font-medium">€340 / DAY</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-surface-container-highest flex items-center justify-between">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Archived in limestone chamber II · Temperature calibrated 18.5°C</p>
                  <span className="font-label-mono text-label-mono text-primary flex items-center gap-1 font-semibold tracking-wider">VERIFIED DEPOSIT</span>
                </div>
              </div>
            </aside>
            {/* RIGHT STAGE: 50% Ivory Credential Terminal */}
            <section aria-label="Reset passcode" className="lg:col-span-6 bg-surface flex flex-col justify-between p-6 sm:p-10 lg:p-16">
              {/* Top Action & Navigation Header */}
              <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 gap-4">
                <div className="flex items-center gap-2"><span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">{"PATRON TERMINAL / CREDENTIAL VERIFICATION // 0.84"}</span></div>
                <a className="inline-flex items-center gap-2 font-label-mono text-label-mono text-primary hover:text-primary-container uppercase transition-colors" href="#fleet">
                  <span>EXIT TO FLEET</span>
                  {" "}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </header>
              {/* Main Interactive Columns: Sections C & D */}
              <div className="flex flex-col gap-14 my-auto">
                {/* SECTION C: RESET PASSCODE */}
                <section className="bg-surface-container-lowest p-8 sm:p-10 shadow-sm relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-mono text-label-mono text-primary tracking-widest uppercase">{"SECTION C // SECURE KEY ROTATION"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">SINGLE-USE LINK</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6">Establish new passcode.</h1>
                  {state === "done" ? (
                    <div className="bg-surface-container-high p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" role="status">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        <span className="font-body-sm text-body-sm text-on-surface">Passcode updated · You were signed out on every device</span>
                      </div>
                      <button className="bg-primary text-on-primary font-action text-action px-5 py-2.5 hover:bg-primary-container transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap" type="button" onClick={() => router.push("/sign-in")}>
                        <span>SIGN IN TO PATRON CIRCLE</span>
                        {" "}
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </button>
                    </div>
                  ) : state === "expired" ? (
                    <div className="bg-surface-container p-4 flex items-start gap-3" role="alert">
                      <span className="material-symbols-outlined text-secondary shrink-0 text-lg mt-0.5">warning</span>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <p className="font-body-sm text-body-sm text-on-surface">
                          <span className="font-medium">Security link invalid or expired</span>
                          {" "}— Reset links work once, for 60 minutes.
                        </p>
                        <Link className="font-label-mono text-label-mono text-primary font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap" href="/forgot-passcode">
                          <span>Request a new link</span>
                          {" "}
                          <span className="text-xs">→</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-6" noValidate onSubmit={submit}>
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <label className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider" htmlFor="new-pass">NEW SECURITY PASSCODE</label>
                          <span className="font-label-mono text-label-mono text-primary font-semibold tracking-wider" aria-live="polite">{strengthLabel[strength]}</span>
                        </div>
                        <div className="relative bg-surface"><input className="w-full bg-surface-container-low px-4 py-3 font-spec-numeral text-spec-numeral text-on-surface focus:outline-hidden focus:bg-surface-container-lowest transition-colors" id="new-pass" type="password" autoComplete="new-password" value={pass} onChange={(e) => setPass(e.target.value)} aria-invalid={!!error} /></div>
                        <div className="grid grid-cols-4 gap-2 mt-2" aria-hidden>
                          {[1, 2, 3, 4].map((n) => (
                            <div key={n} className={`h-1 ${n <= strength ? "bg-primary" : "bg-surface-container-highest"}`} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider block mb-2" htmlFor="confirm-pass">CONFIRM NEW PASSCODE</label>
                        <div className="relative flex items-center bg-surface-container-low">
                          <input className="w-full bg-transparent px-4 py-3 font-spec-numeral text-spec-numeral text-on-surface focus:outline-hidden" id="confirm-pass" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                          {matches && (
                            <div className="pr-4 flex items-center text-primary"><span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }} aria-label="Passcodes match">check_circle</span></div>
                          )}
                        </div>
                      </div>
                      {error && (
                        <p className="font-body-sm text-body-sm text-error" role="alert">
                          {error}
                        </p>
                      )}
                      <button className="w-full bg-primary text-on-primary font-action text-action py-4 hover:bg-primary-container transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait" type="submit" disabled={state === "saving"} aria-busy={state === "saving"}>
                        <span>{state === "saving" ? "UPDATING…" : "SET NEW PASSCODE"}</span>
                        {" "}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </form>
                  )}
                </section>
                {/* SECTION D: EMAIL VERIFICATION */}
                <section className="bg-surface-container-lowest p-8 sm:p-10 shadow-sm relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-mono text-label-mono text-primary tracking-widest uppercase">{"SECTION D // DISPATCH AUTHENTICATION"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">LINK EXPIRY 48:00</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Verify your email.</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                    Once email delivery is enabled, new patron accounts receive a single-use confirmation link (valid for 48 hours). Open it on any device to confirm your address; there is no code to type here.
                  </p>
                </section>
              </div>
              {/* Bottom Institutional Security Footer */}
              <footer className="pt-8 border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono text-on-surface-variant">HALDEN SCHWEIZ AG</span>
                  <span className="text-on-surface-variant/40">/</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant">REG. CH-020.3.041.982</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
                    {" "}
                    <span>HARDWARE SECURED (HSM-FIPS 140-3)</span>
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant">ST. GALLEN</span>
                </div>
              </footer>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
