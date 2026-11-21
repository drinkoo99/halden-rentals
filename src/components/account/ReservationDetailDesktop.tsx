import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_reservation_detail_hld_0612_4821_confirmed/code.html */
export function ReservationDetailDesktop() {
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 min-h-screen bg-surface">
        <div className="flex flex-col w-full">
          {/* Top Archival Bar & Breadcrumb */}
          <section className="w-full px-margin-mobile lg:px-margin pt-space-lg pb-space-sm border-b border-outline-variant bg-surface">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
              <nav className="flex items-center gap-space-xs font-label-mono text-label-mono uppercase tracking-[0.14em] text-on-surface-variant">
                <Link className="hover:text-primary transition-colors" href="/account">ACCOUNT</Link>
                <span className="text-outline-variant">/</span>
                <Link className="hover:text-primary transition-colors" href="/account#reservations">RESERVATIONS</Link>
                <span className="text-outline-variant">/</span>
                <span className="text-on-surface font-semibold">HLD-0612-4821</span>
              </nav>
              <div className="font-label-mono text-label-mono uppercase text-on-surface-variant flex items-center gap-space-sm">
                <span>ARCHIVAL RECORD: DE-MUC-882</span>
                <span className="w-1.5 h-1.5 rounded-none bg-outline" />
                <span>ISSUED: 28 MAY 2025</span>
              </div>
            </div>
          </section>
          {/* Title & Primary Control Block */}
          <section className="w-full px-margin-mobile lg:px-margin py-space-lg border-b border-outline-variant bg-surface">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
              <div className="space-y-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant">{"HLD-0612-4821 // EXHIBIT 08"}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary text-on-primary font-label-mono text-label-mono uppercase tracking-widest text-[10px]">
                    <span className="inline-block w-1.5 h-1.5 bg-surface-bright" />
                    {" "}CONFIRMED
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Range Rover Autobiography</h1>
              </div>
              {/* Action Group */}
              <div className="flex flex-wrap items-center gap-space-md">
                <Link className="border border-on-surface text-on-surface hover:bg-surface-container font-action text-action uppercase tracking-[0.08em] px-5 py-2.5 rounded-[2px] transition-colors" href="/account/reservations/hld-0612-4821/modify">Modify reservation</Link>
                <Link className="text-error hover:underline font-action text-action uppercase tracking-[0.08em] px-2 py-2.5 transition-colors" href="/account/reservations/hld-0612-4821/cancel">Cancel</Link>
                <a className="inline-flex items-center gap-1.5 text-on-surface hover:text-primary font-action text-action uppercase tracking-[0.08em] py-2.5 border-b border-on-surface/40 hover:border-primary transition-colors" href="#">
                  <span>Download dossier PDF</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </a>
              </div>
            </div>
            {/* Status Milestone Timeline */}
            <div className="mt-space-lg pt-space-md border-t border-outline-variant">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-space-md relative">
                {/* Milestone 01 */}
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-none bg-primary text-on-primary flex items-center justify-center"><span className="material-symbols-outlined text-[13px]">check</span></span>
                    <div className="hidden md:block flex-1 h-[1px] bg-primary" />
                  </div>
                  <div>
                    <div className="font-label-mono text-label-mono uppercase text-on-surface font-semibold tracking-wider">01 RESERVED</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant">28 May • 14:22 CEST</div>
                  </div>
                </div>
                {/* Milestone 02 */}
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-none bg-primary text-on-primary flex items-center justify-center"><span className="material-symbols-outlined text-[13px]">check</span></span>
                    <div className="hidden md:block flex-1 h-[1px] bg-primary" />
                  </div>
                  <div>
                    <div className="font-label-mono text-label-mono uppercase text-on-surface font-semibold tracking-wider">02 VERIFIED</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant">Tier I Approved</div>
                  </div>
                </div>
                {/* Milestone 03 (Active) */}
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-none border border-primary bg-surface flex items-center justify-center"><span className="w-2 h-2 bg-primary" /></span>
                    <div className="hidden md:block flex-1 h-[1px] bg-outline-variant" />
                  </div>
                  <div>
                    <div className="font-label-mono text-label-mono uppercase text-primary font-bold tracking-wider">03 PREPARED</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant">Pavilion Atelier MUC</div>
                  </div>
                </div>
                {/* Milestone 04 */}
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-none border border-outline-variant bg-surface flex items-center justify-center text-outline-variant"><span className="w-1.5 h-1.5 bg-outline-variant" /></span>
                    <div className="hidden md:block flex-1 h-[1px] bg-outline-variant" />
                  </div>
                  <div>
                    <div className="font-label-mono text-label-mono uppercase text-on-surface-variant/60 tracking-wider">04 HANDED OVER</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant/60">Expected 12 Jun</div>
                  </div>
                </div>
                {/* Milestone 05 */}
                <div className="relative flex flex-col gap-2">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 rounded-none border border-outline-variant bg-surface flex items-center justify-center text-outline-variant"><span className="w-1.5 h-1.5 bg-outline-variant" /></span></div>
                  <div>
                    <div className="font-label-mono text-label-mono uppercase text-on-surface-variant/60 tracking-wider">05 RETURNED</div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant/60">Scheduled 15 Jun</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Two Column Dossier Body (8 / 4 Split) */}
          <section className="w-full px-margin-mobile lg:px-margin py-space-xl bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              {/* LEFT COLUMN: Archival Records (8 Cols) */}
              <div className="lg:col-span-8 space-y-space-xl">
                {/* SECTION 01: VEHICLE */}
                <div className="space-y-space-md">
                  <div className="flex items-baseline justify-between border-b border-outline-variant pb-space-xs">
                    <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">{"DOSSIER SECTION // 01"}</div>
                    <div className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-semibold">EXHIBIT CATALOGUE RECORD</div>
                  </div>
                  {/* Exhibit Artwork Framing */}
                  <div className="relative bg-surface-container border border-outline-variant overflow-hidden">
                    <Photo src={media.reservationRangeRover} className="w-full aspect-[16/9] object-cover block" data-alt="Editorial studio portrait of a silver metallic Range Rover Autobiography parked in a brutalist warm concrete gallery pavilion, sharp directional sunlight casting architectural shadows, clean reflections, museum catalog framing, high-end automotive photography." sizes="(max-width: 767px) 100vw, 62vw" alt="" />
                    <div className="absolute bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-sm p-space-sm flex items-center justify-between border-t border-outline-variant">
                      <span className="font-label-mono text-label-mono uppercase text-on-surface">PLATE REGISTRATION: M-HA 8492</span>
                      <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">COLOR: CHARENTS GREY SATIN FINISH</span>
                    </div>
                  </div>
                  {/* Technical Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-outline-variant bg-surface-container-low divide-x divide-y sm:divide-y-0 divide-outline-variant">
                    <div className="p-space-sm">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">PROPULSION</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface mt-1 font-semibold">530 HP</div>
                      <div className="font-body-sm text-[12px] text-on-surface-variant">4.4L Twin-Turbo V8</div>
                    </div>
                    <div className="p-space-sm">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">CAPACITY</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface mt-1 font-semibold">7 SEATS</div>
                      <div className="font-body-sm text-[12px] text-on-surface-variant">4 Rimowa Trunks</div>
                    </div>
                    <div className="p-space-sm">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">DRIVETRAIN</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface mt-1 font-semibold">AWD • AIR</div>
                      <div className="font-body-sm text-[12px] text-on-surface-variant">Adaptive Dynamic</div>
                    </div>
                    <div className="p-space-sm">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">SPECIFICATION</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface mt-1 font-semibold">SERIES 2025</div>
                      <div className="font-body-sm text-[12px] text-on-surface-variant">Semi-Aniline Ebony</div>
                    </div>
                  </div>
                </div>
                {/* SECTION 02: ITINERARY */}
                <div className="space-y-space-md">
                  <div className="flex items-baseline justify-between border-b border-outline-variant pb-space-xs">
                    <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">{"DOSSIER SECTION // 02"}</div>
                    <div className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface">TRANSIT ITINERARY • 72 HOURS</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {/* Handover Card */}
                    <div className="p-space-md bg-surface-container border border-outline-variant space-y-space-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">DISPATCH / PICK-UP</span>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">BAY 04</span>
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-on-surface">Munich Airport (MUC)</div>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Terminal 2 VIP Curbside Pavilion</p>
                      </div>
                      <div className="pt-space-xs border-t border-outline-variant flex flex-col gap-1">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">Thursday, 12 June 2025 • 10:00 CEST</div>
                        <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider">COORDINATES: 48.3537° N, 11.7750° E</div>
                      </div>
                    </div>
                    {/* Return Card */}
                    <div className="p-space-md bg-surface-container border border-outline-variant space-y-space-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface font-bold">CONSIGNMENT / RETURN</span>
                        <span className="font-label-mono text-[11px] text-on-surface-variant">BAY 04</span>
                      </div>
                      <div>
                        <div className="font-headline-sm text-headline-sm text-on-surface">Munich Airport (MUC)</div>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">Terminal 2 VIP Curbside Pavilion</p>
                      </div>
                      <div className="pt-space-xs border-t border-outline-variant flex flex-col gap-1">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">Sunday, 15 June 2025 • 10:00 CEST</div>
                        <div className="font-label-mono text-[10px] text-on-surface-variant tracking-wider">COORDINATES: 48.3537° N, 11.7750° E • 3 FULL DAYS</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SECTION 03: PROVISIONS & EXTRAS */}
                <div className="space-y-space-md">
                  <div className="flex items-baseline justify-between border-b border-outline-variant pb-space-xs">
                    <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">{"DOSSIER SECTION // 03"}</div>
                    <div className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface">{"CURATED PROVISIONS & COVERAGE"}</div>
                  </div>
                  <div className="border border-outline-variant bg-surface divide-y divide-outline-variant">
                    {/* Row 1 */}
                    <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="font-body-md text-body-md font-semibold text-on-surface">Comprehensive Zero-Excess Waiver</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Tier-1 underwriting covering chassis, glazing, undercarriage, and wheel assemblies.</div>
                      </div>
                      <div className="text-right sm:min-w-[140px]">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">€135.00</div>
                        <div className="font-label-mono text-[11px] text-on-surface-variant">€45.00 / DAY</div>
                      </div>
                    </div>
                    {/* Row 2 */}
                    <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="font-body-md text-body-md font-semibold text-on-surface">Designated Secondary Driver</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Authorized signatory endorsement for Johannes Von Bergmann.</div>
                      </div>
                      <div className="text-right sm:min-w-[140px]">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">€90.00</div>
                        <div className="font-label-mono text-[11px] text-on-surface-variant">€30.00 / DAY</div>
                      </div>
                    </div>
                    {/* Row 3 */}
                    <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                      <div className="space-y-1">
                        <div className="font-body-md text-body-md font-semibold text-on-surface">Bespoke ISOFIX Child Seat</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Halden leather-trimmed child containment cradle (Group 1/2/3 installed).</div>
                      </div>
                      <div className="text-right sm:min-w-[140px]">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">€60.00</div>
                        <div className="font-label-mono text-[11px] text-on-surface-variant">€20.00 / DAY</div>
                      </div>
                    </div>
                    {/* Row 4 (Complimentary) */}
                    <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-low">
                      <div className="space-y-1">
                        <div className="font-body-md text-body-md font-semibold text-on-surface">{"Pirelli Sottozero Protocol & Swiss Highway Vignette"}</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Alpine-certified compound tyres, pre-affixed electronic tolls for DACH transit.</div>
                      </div>
                      <div className="text-right sm:min-w-[140px]">
                        <div className="font-spec-numeral text-spec-numeral text-primary font-semibold">COMPLIMENTARY</div>
                        <div className="font-label-mono text-[11px] text-on-surface-variant">ARCHIVAL STANDARD</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* SECTION 04: PRINCIPAL DRIVER */}
                <div className="space-y-space-md">
                  <div className="flex items-baseline justify-between border-b border-outline-variant pb-space-xs">
                    <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">{"DOSSIER SECTION // 04"}</div>
                    <div className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface">PRINCIPAL PATRON CREDENTIALS</div>
                  </div>
                  <div className="border border-outline-variant bg-surface p-space-md space-y-space-md">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                      <div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">PRIMARY OPERATOR</div>
                        <div className="font-body-lg text-body-lg text-on-surface font-semibold mt-1">Clara Von Bergmann</div>
                        <div className="font-label-mono text-[11px] text-on-surface-variant">PATRON ID: #802</div>
                      </div>
                      <div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">DIRECT CONTACT</div>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface mt-1">+49 170 558 9124</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">clara.bergmann@atelier-v.ch</div>
                      </div>
                      <div>
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">DRIVING CREDENTIAL</div>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface mt-1">Switzerland (CH)</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">Validity: Tier I Verified</div>
                      </div>
                    </div>
                    {/* Callout */}
                    <div className="p-space-sm bg-surface-container border border-outline-variant flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                      <p className="font-body-sm text-body-sm text-on-surface">
                        <span className="font-semibold">Licence verification notice:</span>
                        {" "}Digital record pre-approved. Physical inspection required at VIP Curbside Bay 04 prior to key handoff.
                      </p>
                    </div>
                  </div>
                </div>
                {/* SECTION 05: HANDOVER INSTRUCTIONS */}
                <div className="space-y-space-md">
                  <div className="flex items-baseline justify-between border-b border-outline-variant pb-space-xs">
                    <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">{"DOSSIER SECTION // 05"}</div>
                    <div className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-semibold">FIELD PROTOCOL</div>
                  </div>
                  <div className="bg-surface-container border border-outline-variant p-space-lg space-y-space-md">
                    <div className="flex items-start justify-between flex-wrap gap-space-sm">
                      <div>
                        <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">MEETING POINT</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">Curbside VIP Bay 04 • Terminal 2 Post-Customs</h3>
                      </div>
                      <div className="text-right">
                        <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">CONCIERGE LIAISON</div>
                        <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">+49 89 975 2200</div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-outline-variant" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="space-y-1">
                        <div className="font-label-mono text-label-mono uppercase text-on-surface font-bold">WHAT TO BRING</div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Physical national driving licence and a payment card for the handover pre-authorisation. Both must match Patron Clara von Bergmann.</p>
                      </div>
                      <div className="space-y-1">
                        <div className="font-label-mono text-label-mono uppercase text-on-surface font-bold">VALET SALUTATION</div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">A dedicated Halden concierge wearing charcoal tailoring will greet you at Munich Terminal 2 VIP exit with luggage assistance and vehicle telemetry handover.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* RIGHT COLUMN: Ledger & Concierge Sentry (4 Cols) */}
              <div className="lg:col-span-4 space-y-space-md sticky top-24">
                {/* Summary Panel */}
                <div className="bg-surface-container border border-outline-variant p-space-lg space-y-space-md">
                  <div className="flex items-center justify-between border-b border-outline-variant pb-space-sm">
                    <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface font-bold">PAYMENT SUMMARY</span>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">EUR • VAT INCL.</span>
                  </div>
                  {/* Line items */}
                  <div className="space-y-space-sm font-body-sm text-body-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant">Daily Rate (€390.00 × 3 Days)</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€1,170.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant">Tailored Extras (3 Provisions)</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€285.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant">{"Statutory VAT (19%) & Surcharges"}</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€276.45</span>
                    </div>
                    <div className="pt-space-sm border-t border-outline-variant flex items-baseline justify-between">
                      <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface font-bold">TOTAL RESERVATION</span>
                      <span className="font-spec-numeral text-[20px] font-bold text-on-surface">€1,731.45</span>
                    </div>
                  </div>
                  {/* Settlement Ledger Box */}
                  <div className="p-space-sm bg-surface border border-outline-variant space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-[11px] uppercase text-primary font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {" "}PRE-PAID RECORD
                      </span>
                      <span className="font-label-mono text-[11px] text-on-surface-variant uppercase">DUE AT HANDOVER</span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface">
                      Due at the curbside handover · nothing charged online
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant text-[12px]">
                      <span className="text-on-surface-variant uppercase font-label-mono">Due at handover</span>
                      <span className="font-spec-numeral font-bold text-primary">€0.00</span>
                    </div>
                  </div>
                  {/* Deposit Clause */}
                  <div className="space-y-1">
                    <div className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">SECURITY PROTOCOL</div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">* €2,500.00 pre-authorisation ringfenced on card upon curbside handover. Automatically released upon return inspection without deductions.</p>
                  </div>
                </div>
                {/* Concierge Sanctuary Box */}
                <div className="p-space-md border border-outline-variant bg-surface space-y-space-sm">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    <span className="font-label-mono text-label-mono uppercase tracking-wider font-bold">HALDEN PRIVATE CONCIERGE</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Need adjustments, route planning, or tarmac customs clearance assistance?</p>
                  <div className="pt-space-xs">
                    <a className="block font-spec-numeral text-spec-numeral font-bold text-on-surface hover:text-primary transition-colors" href="tel:+41448002400">+41 44 800 2400</a>
                    <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">DEDICATED DESK • 24 HOURS CONTINUOUS</span>
                  </div>
                </div>
                {/* Archival Code Stamp */}
                <div className="px-space-sm py-2 flex items-center justify-between text-on-surface-variant/50 font-label-mono text-[10px]">
                  <span>{"RECORD AUTH // 802-HLD-0612"}</span>
                  <span>SHA-256 VERIFIED</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
