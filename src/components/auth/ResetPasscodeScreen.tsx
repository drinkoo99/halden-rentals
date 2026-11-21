import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_reset_passcode_verification_desktop/code.html */
export function ResetPasscodeScreen() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <main className="w-full min-h-screen bg-surface flex flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            {/* LEFT STAGE: 50% Exhibition Pedestal with Architectural Gallery Photo */}
            <aside className="lg:col-span-6 relative bg-surface-container-low flex flex-col justify-between p-8 lg:p-16 overflow-hidden">
              {/* Ambient Image Canvas */}
              <div className="absolute inset-0 z-0">
                <Photo src={media.porscheGalleryPortrait} alt="Architectural gallery exhibition" className="w-full h-full object-cover object-center filter grayscale-[15%] contrast-[1.03]" sizes="(max-width: 767px) 100vw, 50vw" />
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
              <div className="relative z-10 my-auto py-16">
                <span className="inline-block font-label-mono text-label-mono text-surface-container-lowest/70 tracking-widest uppercase mb-2">CURATED FLEET ASSET</span>
                <h2 className="font-headline-lg text-headline-lg text-surface-container-lowest max-w-md italic font-light">Sculpted endurance, mechanical silence.</h2>
              </div>
              {/* Museum Placard (Signature Component) */}
              <div className="relative z-10 bg-surface-container-lowest text-on-surface p-6 sm:p-8">
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
                    <span className="font-spec-numeral text-spec-numeral text-primary font-medium">CHF 1,840</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-surface-container-highest flex items-center justify-between">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Archived in limestone chamber II · Temperature calibrated 18.5°C</p>
                  <span className="font-label-mono text-label-mono text-primary flex items-center gap-1 font-semibold tracking-wider">VERIFIED DEPOSIT</span>
                </div>
              </div>
            </aside>
            {/* RIGHT STAGE: 50% Ivory Credential Terminal */}
            <main className="lg:col-span-6 bg-surface flex flex-col justify-between p-6 sm:p-10 lg:p-16">
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
                    <span className="font-label-mono text-label-mono text-on-surface-variant">TLS 1.3 / E2EE</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface mb-6">Establish new passcode.</h1>
                  <div className="space-y-6">
                    {/* Input 1: New Security Passcode */}
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider" htmlFor="new-pass">NEW SECURITY PASSCODE</label>
                        <span className="font-label-mono text-label-mono text-primary font-semibold tracking-wider">STRONG</span>
                      </div>
                      <div className="relative bg-surface"><input className="w-full bg-surface-container-low px-4 py-3 font-spec-numeral text-spec-numeral text-on-surface focus:outline-hidden focus:bg-surface-container-lowest transition-colors" id="new-pass" type="password" defaultValue="••••••••••••••••" /></div>
                      {/* 4-segment strength meter (segments in forest green) */}
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        <div className="h-1 bg-primary" />
                        <div className="h-1 bg-primary" />
                        <div className="h-1 bg-primary" />
                        <div className="h-1 bg-primary" />
                      </div>
                    </div>
                    {/* Input 2: Confirm New Passcode */}
                    <div>
                      <label className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider block mb-2" htmlFor="confirm-pass">CONFIRM NEW PASSCODE</label>
                      <div className="relative flex items-center bg-surface-container-low">
                        <input className="w-full bg-transparent px-4 py-3 font-spec-numeral text-spec-numeral text-on-surface focus:outline-hidden" id="confirm-pass" type="password" defaultValue="••••••••••••••••" />
                        <div className="pr-4 flex items-center text-primary"><span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></div>
                      </div>
                    </div>
                    {/* Success State Chip / Callout */}
                    <div className="bg-surface-container-high p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                        <span className="font-body-sm text-body-sm text-on-surface">Passcode updated successfully · Ready for authentication</span>
                      </div>
                      <Link className="bg-primary text-on-primary font-action text-action px-5 py-2.5 hover:bg-primary-container transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap" href="/sign-in">
                        <span>SIGN IN TO PATRON CIRCLE</span>
                        {" "}
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </section>
                {/* SECTION D: EMAIL VERIFICATION & CODE ENTRY */}
                <section className="bg-surface-container-lowest p-8 sm:p-10 shadow-sm relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-mono text-label-mono text-primary tracking-widest uppercase">{"SECTION D // DISPATCH AUTHENTICATION"}</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">CODE EXPIRY 15:00</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Verify your email.</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl">
                    Enter the 6-digit cryptographic security code dispatched to{" "}
                    <span className="font-spec-numeral text-on-surface font-semibold">clara.bergmann@atelier-v.ch</span>
                    .
                  </p>
                  {/* Six discrete 2px-radius Space Mono input boxes [8][0][2][9][1][4] */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-6 overflow-x-auto py-1">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface-container-low flex items-center justify-center rounded-sm"><span className="font-spec-numeral text-xl font-bold text-on-surface">8</span></div>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface-container-low flex items-center justify-center rounded-sm"><span className="font-spec-numeral text-xl font-bold text-on-surface">0</span></div>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface-container-low flex items-center justify-center rounded-sm"><span className="font-spec-numeral text-xl font-bold text-on-surface">2</span></div>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface-container-low flex items-center justify-center rounded-sm"><span className="font-spec-numeral text-xl font-bold text-on-surface">9</span></div>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface-container-low flex items-center justify-center rounded-sm"><span className="font-spec-numeral text-xl font-bold text-on-surface">1</span></div>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 bg-surface-container-low flex items-center justify-center rounded-sm"><span className="font-spec-numeral text-xl font-bold text-on-surface">4</span></div>
                  </div>
                  {/* Action row: Resend timer */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-surface-container-highest">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Did not receive code?</span>
                    <button className="font-label-mono text-label-mono text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {" "}
                      <span>RESEND DISPATCH (0:30)</span>
                    </button>
                  </div>
                  {/* Callout for link expired state (Refined stone warning notice) */}
                  <div className="bg-surface-container p-4 flex items-start gap-3 mb-6">
                    <span className="material-symbols-outlined text-secondary shrink-0 text-lg mt-0.5">warning</span>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="font-body-sm text-body-sm text-on-surface">
                        <span className="font-medium">Security link expired</span>
                        {" "}— This session token has expired after 15 minutes.
                      </p>
                      <a className="font-label-mono text-label-mono text-primary font-semibold hover:underline inline-flex items-center gap-1 whitespace-nowrap" href="#renew">
                        <span>Send a new link</span>
                        {" "}
                        <span className="text-xs">→</span>
                      </a>
                    </div>
                  </div>
                  {/* Primary CTA Button */}
                  <button className="w-full bg-primary text-on-primary font-action text-action py-4 hover:bg-primary-container transition-colors flex items-center justify-center gap-3">
                    <span>{"VERIFY & ENTER PATRON VAULT"}</span>
                    {" "}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
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
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
