import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_reservation_detail_hld_0612_4821_cancelled/code.html */
export function ReservationCancelledDesktop() {
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 min-h-screen bg-surface">
        <div className="flex flex-col w-full">
          {/* Top Archival Navigation & Breadcrumb Band */}
          <div className="w-full px-margin-mobile lg:px-margin pt-space-lg pb-space-sm bg-surface">
            <div className="flex items-center justify-between pb-space-sm">
              <div className="flex items-center gap-space-xs font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">
                <Link className="hover:text-on-surface transition-colors" href="/account">ACCOUNT</Link>
                <span>/</span>
                <Link className="hover:text-on-surface transition-colors" href="/account#reservations">RESERVATIONS</Link>
                <span>/</span>
                <span className="text-on-surface font-medium">HLD-0612-4821</span>
              </div>
              <div className="hidden sm:flex items-center gap-space-md font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
                <span>STATUS: DECOMMISSIONED</span>
                <span>•</span>
                <span>VAULT ARCHIVE ID: 4821-MUC</span>
              </div>
            </div>
          </div>
          {/* Title & Primary Disposition Block */}
          <div className="w-full px-margin-mobile lg:px-margin pb-space-lg bg-surface">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pt-space-xs pb-space-lg">
              <div className="space-y-space-xs max-w-3xl">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant">{"HLD-0612-4821 // ARCHIVE RECORD"}</span>
                  <span className="inline-flex items-center px-2 py-0.5 bg-surface-container text-error text-[10px] font-label-mono tracking-widest uppercase">✕ CANCELLED</span>
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant/70">REFUND ISSUED</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg lg:text-display text-on-surface tracking-[-0.02em]">Range Rover Autobiography</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Archive dossier for the voided reservation series originating from Munich Airport Terminal 2. All custodial holds have been released.</p>
              </div>
              {/* Header CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-space-sm shrink-0">
                <Link className="bg-primary hover:bg-primary-container text-on-primary font-action text-action uppercase tracking-[0.12em] px-7 py-3 rounded-[2px] transition-colors cursor-pointer w-full sm:w-auto text-center" href="/book/range-rover-autobiography/trip">Book again</Link>
                <span className="font-label-mono text-label-mono uppercase tracking-[0.12em] text-on-surface-variant hover:text-on-surface underline decoration-outline-variant underline-offset-4 transition-colors flex items-center gap-1.5 pt-1" data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  {" "}Download cancellation receipt (PDF)
                </span>
              </div>
            </div>
            {/* Formal Cancellation Notice Panel */}
            <div className="w-full bg-surface-container p-space-md lg:p-space-lg relative overflow-hidden">
              {/* 2px left visual accent demarcating void status */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-on-surface-variant" />
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pl-space-xs">
                <div className="space-y-space-xs max-w-2xl">
                  <div className="flex items-center gap-space-xs text-on-surface font-label-mono text-label-mono uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[16px] text-error">event_busy</span>
                    <span>{"RESERVATION CANCELLED & DISCHARGED"}</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Reservation Cancelled</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Cancelled on 2 June 2025 · Nothing was charged online: the{" "}<strong className="text-on-surface font-semibold">€1,731.45</strong> total was due at the curbside handover, so no refund is needed and no cancellation fee applies.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col md:items-end justify-between self-stretch pt-1">
                  <div className="bg-surface-container-high px-3 py-1.5 font-label-mono text-label-mono tracking-widest text-on-surface uppercase">REF-CNL-882190</div>
                  <span className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mt-4 md:mt-0">AUDIT TIME: 02 JUN 2025 14:22:09 CEST</span>
                </div>
              </div>
            </div>
          </div>
          {/* Primary 12-Column Two-Column Split */}
          <div className="w-full px-margin-mobile lg:px-margin pb-space-xl bg-surface">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-space-lg items-start">
              {/* LEFT COLUMN: 8 of 12 columns */}
              <div className="lg:col-span-8 flex flex-col gap-space-lg">
                {/* 01 VEHICLE SPEC & ARCHIVE PHOTOGRAPH */}
                <section className="bg-surface-container-lowest p-space-md lg:p-space-lg space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant font-bold">{"01 //"}</span>
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface">VEHICLE ASSIGNMENT</span>
                    </div>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">CHASSIS NO. RR-AUT-5309</span>
                  </div>
                  {/* Studio Photograph with Void Treatment */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
                    <Photo src={media.reservationCancelledRangeRover} className="w-full h-full object-cover grayscale-[40%] opacity-[85%] transition duration-700 ease-out hover:grayscale-0 hover:opacity-100" data-alt="Studio photograph of a modern luxury Land Rover Range Rover Autobiography SUV in sleek silver champagne metallic paint, framed at three-quarters front angle against an architectural concrete and limestone gallery wall with warm soft shadows, exhibition pedestal style with crisp reflection, automotive design archival shot" sizes="(max-width: 767px) 100vw, 58vw" alt="" />
                    <div className="absolute bottom-3 left-3 bg-inverse-surface/85 text-inverse-on-surface px-2.5 py-1 font-label-mono text-label-mono uppercase tracking-widest backdrop-blur-sm">EXHIBIT ARCHIVED • RELEASED FROM HOLD</div>
                  </div>
                  {/* Specifications Matrix */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-xs">
                    <div className="bg-surface-container-low p-space-sm space-y-space-xs">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">POWERTRAIN</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">530 HP Twin-Turbo V8</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">4.4L Direct Injection</div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm space-y-space-xs">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">CAPACITY</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">7 Executive Seats</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">Semi-Aniline Leather</div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm space-y-space-xs">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">DRIVETRAIN</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">All-Wheel Drive</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">Dynamic Air Suspension</div>
                    </div>
                    <div className="bg-surface-container-low p-space-sm space-y-space-xs">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant">FINISH</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface font-semibold">Charente Grey</div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">Satin Protective Wrap</div>
                    </div>
                  </div>
                </section>
                {/* 02 CANCELLED ITINERARY */}
                <section className="bg-surface-container-lowest p-space-md lg:p-space-lg space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant font-bold">{"02 //"}</span>
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface">CANCELLED ITINERARY</span>
                    </div>
                    <span className="font-label-mono text-label-mono uppercase tracking-wider text-error">VOICE OF SERVICE: TERMINATED</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {/* Pickup point */}
                    <div className="p-space-md bg-surface-container-low relative">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-1">ORIGINAL PICKUP (VOID)</div>
                      <div className="line-through text-on-surface-variant/80 font-display text-headline-sm">Munich Airport T2</div>
                      <div className="mt-space-xs font-spec-numeral text-spec-numeral text-on-surface-variant line-through">12 June 2025 • 10:00 CEST</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant/70 mt-1">VIP Curbside Pavilion, Level 04, Berth 12</div>
                      <div className="mt-space-sm pt-space-xs font-label-mono text-[10px] uppercase text-error tracking-wider">BAY ALLOCATION RESCINDED</div>
                    </div>
                    {/* Return point */}
                    <div className="p-space-md bg-surface-container-low relative">
                      <div className="font-label-mono text-label-mono uppercase text-on-surface-variant mb-1">ORIGINAL RETURN (VOID)</div>
                      <div className="line-through text-on-surface-variant/80 font-display text-headline-sm">Munich Airport T2</div>
                      <div className="mt-space-xs font-spec-numeral text-spec-numeral text-on-surface-variant line-through">15 June 2025 • 10:00 CEST</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant/70 mt-1">VIP Curbside Pavilion, Level 04, Berth 12</div>
                      <div className="mt-space-sm pt-space-xs font-label-mono text-[10px] uppercase text-error tracking-wider">RETURN INSPECTION DE-SCHEDULED</div>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">TOTAL DURATION PLANNED</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface line-through">3 Days • 72 Hours</span>
                  </div>
                </section>
                {/* 03 CANCELLED PROVISIONS */}
                <section className="bg-surface-container-lowest p-space-md lg:p-space-lg space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant font-bold">{"03 //"}</span>
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface">{"CANCELLED PROVISIONS & ADDITIONS"}</span>
                    </div>
                    <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant">3 ITEMS DE-ALLOCATED</span>
                  </div>
                  <div className="space-y-space-xs">
                    {/* Provision Row 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-sm bg-surface-container-low gap-space-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">verified_user</span>
                          <span className="font-body-md text-body-md text-on-surface line-through">Comprehensive Custody Waiver</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant pl-7">{"Zero deductible insurance coverage & glass/tire protection"}</p>
                      </div>
                      <div className="text-right pl-7 sm:pl-0">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface-variant line-through">€210.00</div>
                        <div className="font-label-mono text-[10px] uppercase text-secondary tracking-widest">RELEASED</div>
                      </div>
                    </div>
                    {/* Provision Row 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-sm bg-surface-container-low gap-space-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">badge</span>
                          <span className="font-body-md text-body-md text-on-surface line-through">Secondary Driver Endorsement</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant pl-7">Credentialed operator permit registered under Julian V.</p>
                      </div>
                      <div className="text-right pl-7 sm:pl-0">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface-variant line-through">€75.00</div>
                        <div className="font-label-mono text-[10px] uppercase text-secondary tracking-widest">RELEASED</div>
                      </div>
                    </div>
                    {/* Provision Row 3 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-sm bg-surface-container-low gap-space-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">child_friendly</span>
                          <span className="font-body-md text-body-md text-on-surface line-through">ISOFIX Child Restraint Integration</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant pl-7">Cybex Sirona T Group 0+/1 with climate liner installed in row 2</p>
                      </div>
                      <div className="text-right pl-7 sm:pl-0">
                        <div className="font-spec-numeral text-spec-numeral text-on-surface-variant line-through">€45.00</div>
                        <div className="font-label-mono text-[10px] uppercase text-secondary tracking-widest">RELEASED</div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* 04 REFUND AUDIT TRAIL */}
                <section className="bg-surface-container-lowest p-space-md lg:p-space-lg space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant font-bold">{"04 //"}</span>
                      <span className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface">REFUND AUDIT TRAIL</span>
                    </div>
                    <span className="font-label-mono text-label-mono uppercase tracking-wider text-secondary">LEDGER BALANCED</span>
                  </div>
                  {/* Structured Audit Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-label-mono text-body-sm">
                      <thead>
                        <tr className="bg-surface-container text-on-surface-variant text-[10px] uppercase tracking-widest">
                          <th className="py-2.5 px-3">Transaction Date</th>
                          <th className="py-2.5 px-3">Description</th>
                          <th className="py-2.5 px-3">Instrument</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container">
                        <tr className="text-on-surface">
                          <td className="py-3 px-3 whitespace-nowrap font-spec-numeral text-[13px]">12 May 2025</td>
                          <td className="py-3 px-3">
                            <div className="font-body-md text-[13px] text-on-surface">Reservation confirmed</div>
                            <div className="text-[10px] text-on-surface-variant">TX-AUTH-9941028-MUC</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-on-surface-variant">Pay at handover</td>
                          <td className="py-3 px-3 whitespace-nowrap"><span className="inline-block px-2 py-0.5 bg-surface-container text-on-surface text-[10px] tracking-widest uppercase">RESERVED</span></td>
                          <td className="py-3 px-3 text-right font-spec-numeral text-spec-numeral font-semibold whitespace-nowrap">€1,731.45</td>
                        </tr>
                        <tr className="text-on-surface bg-surface-container-low/50">
                          <td className="py-3 px-3 whitespace-nowrap font-spec-numeral text-[13px] text-error">02 Jun 2025</td>
                          <td className="py-3 px-3">
                            <div className="font-body-md text-[13px] text-on-surface">Reservation cancelled</div>
                            <div className="text-[10px] text-on-surface-variant">ARN-749204819028401</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-on-surface-variant">—</td>
                          <td className="py-3 px-3 whitespace-nowrap"><span className="inline-block px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] tracking-widest uppercase font-medium">RELEASED</span></td>
                          <td className="py-3 px-3 text-right font-spec-numeral text-spec-numeral font-semibold text-error whitespace-nowrap">−€1,731.45</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Net Summary Row */}
                  <div className="p-space-sm bg-surface-container flex items-center justify-between font-label-mono text-label-mono">
                    <span className="uppercase tracking-widest text-on-surface font-semibold">NET RESERVATION BALANCE</span>
                    <span className="font-spec-numeral text-[15px] font-bold text-on-surface">€0.00</span>
                  </div>
                </section>
              </div>
              {/* RIGHT COLUMN: 4 of 12 columns (Sticky Financial Record) */}
              <div className="lg:col-span-4 sticky top-24 space-y-space-md">
                {/* Financial Summary Card */}
                <div className="bg-surface-container p-space-md lg:p-space-lg space-y-space-md relative">
                  <div>
                    <div className="font-label-mono text-label-mono uppercase tracking-[0.18em] text-on-surface-variant mb-1">FINANCIAL STATEMENT</div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Financial Summary</h3>
                  </div>
                  {/* Breakdown Ledger */}
                  <div className="space-y-space-xs font-label-mono text-body-sm pt-space-xs">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">Original Total</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface">€1,731.45</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">3-Day Custodial Base</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface-variant">€1,401.45</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">Ancillary Provisions</span>
                      <span className="font-spec-numeral text-spec-numeral text-on-surface-variant">€330.00</span>
                    </div>
                    <div className="flex justify-between items-center py-1 text-error font-medium">
                      <span>Released on cancellation</span>
                      <span className="font-spec-numeral text-spec-numeral">−€1,731.45</span>
                    </div>
                    {/* Total Bar */}
                    <div className="pt-space-sm mt-space-sm bg-surface-container-high p-space-sm flex justify-between items-center">
                      <div className="space-y-0.5">
                        <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">AMOUNT DUE</span>
                        <div className="font-display text-headline-sm text-on-surface">€0.00</div>
                      </div>
                      <span className="px-2 py-1 bg-surface-container-lowest font-label-mono text-[10px] text-secondary tracking-widest uppercase">RECONCILED</span>
                    </div>
                  </div>
                  {/* Refund Details Box */}
                  <div className="space-y-space-xs pt-space-xs font-label-mono text-[11px] text-on-surface-variant">
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider">Cancellation Reference:</span>
                      <span className="font-spec-numeral text-on-surface select-all">RFND-MUC-94021</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider">Method:</span>
                      <span className="text-on-surface">No charge taken</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-wider">Ledger Auth:</span>
                      <span className="text-on-surface font-spec-numeral">882190-DE-1</span>
                    </div>
                  </div>
                  {/* Applied Policy Callout */}
                  <div className="p-space-sm bg-surface-container-low space-y-space-xs">
                    <div className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px]">verified</span>
                      {" "}CANCELLATION POLICY APPLIED
                    </div>
                    <p className="font-body-sm text-[12px] leading-relaxed text-on-surface-variant">Standard Patron 72-Hour Free Cancellation — 100% Reimbursement with zero retention fees.</p>
                  </div>
                  {/* Re-engagement Primary Button */}
                  <div className="space-y-space-sm pt-space-xs">
                    <Link className="w-full bg-primary hover:bg-primary-container text-on-primary font-action text-action uppercase tracking-[0.14em] py-3.5 px-4 rounded-[2px] transition-colors cursor-pointer text-center flex items-center justify-center gap-2" href="/fleet">
                      <span>Explore fleet for new dates</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                    <p className="text-center font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest">MUNICH • ZURICH • GENEVA • MILAN • VIENNA</p>
                  </div>
                </div>
                {/* Concierge / Patron Support Slate */}
                <div className="bg-surface-container-low p-space-md space-y-space-xs">
                  <div className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-on-surface-variant">PATRON ASSISTANCE</div>
                  <div className="font-body-md text-body-md text-on-surface font-medium">Questions about your refund?</div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Our Private Client concierge handles prompt ledger adjustments and cross-border bank reconciliation queries.</p>
                  <div className="pt-space-xs">
                    <Link className="font-label-mono text-label-mono uppercase tracking-[0.14em] text-primary hover:underline inline-flex items-center gap-1" href="/about#contact">
                      <span>Contact Patron Concierge</span>
                      {" "}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Archival Verification Metadata Footnote */}
          <div className="w-full px-margin-mobile lg:px-margin py-space-md bg-surface-container-low">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs font-label-mono text-[10px] uppercase text-on-surface-variant tracking-widest">
              <div>{"HALDEN ARCHIVE • CUSTODY LEDGER HLD-0612-4821 • STATUS RECORD: CLOSED & DISCHARGED"}</div>
              <div>ENCRYPTED AUDIT STAMP: SHA-256: 8c9d20...1a4f</div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
