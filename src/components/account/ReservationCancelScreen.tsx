"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { markCancelled } from "@/lib/reservations";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_reservation_cancel_confirmation_overlay/code.html */
export function ReservationCancelScreen() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  function confirmCancel() {
    markCancelled();
    setDone(true);
    // let the patron read the confirmation toast, then show the cancelled dossier
    window.setTimeout(() => router.push("/account/reservations/hld-0612-4821"), 1800);
  }
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased">
      <SiteHeader patron />
      <main className="w-full pt-20 min-h-screen bg-surface">
        <div className="flex flex-col w-full relative">
          {/* DIMMED BACKGROUND: FULL RESERVATION DETAIL DOSSIER (HLD-0612-4821) */}
          <div className="w-full min-h-screen px-margin-mobile lg:px-margin py-space-lg select-none opacity-40 pointer-events-none filter blur-[0.6px]">
            {/* Dossier Overline Meta */}
            <div className="flex flex-wrap items-baseline justify-between border-b border-outline-variant pb-space-sm mb-space-lg">
              <div className="flex items-center gap-space-md">
                <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-primary">{"DOSSIER // HLD-0612-4821"}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">MUNICH ARCHIVE · FLUGHAFEN T2</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-label-mono text-label-mono uppercase text-on-surface-variant">ALLOCATION STATUS:</span>
                <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-mono text-label-mono uppercase font-semibold">{"CONFIRMED // PAY AT HANDOVER"}</span>
              </div>
            </div>
            {/* Background Dossier Split Screen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
              {/* Left Column: Visual Stage & Custodial Spec (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="relative w-full aspect-[16/10] bg-surface-container overflow-hidden">
                  <Photo src={media.reservationCancelRangeRover} className="w-full h-full object-cover" data-alt="Photorealistic studio capture of a sleek contemporary silver Range Rover Autobiography SUV resting in an architectural stone pavilion with muted warm limestone walls, soft overhead skylight illumination, and subtle floor reflections, evoking high luxury car curation." sizes="(max-width: 767px) 100vw, 54vw" alt="" />
                  <div className="absolute top-4 left-4 bg-inverse-surface/85 text-inverse-on-surface px-3 py-1 font-label-mono text-label-mono uppercase tracking-widest">PLATE: M-HL 4821</div>
                </div>
                {/* Vehicle Index Placard */}
                <div className="p-space-md bg-surface-container-low border border-outline-variant flex flex-col gap-space-sm">
                  <div className="flex items-baseline justify-between">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Range Rover Autobiography</h1>
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">D350 LWB · 2024</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Finished in Carpathian Satin Stone with Perlino semi-aniline interior. Configured with Executive Class Rear Seating, active electronic air suspension, and meridian signature acoustic sound staging.</p>
                  <div className="grid grid-cols-4 gap-space-xs pt-space-xs border-t border-outline-variant">
                    <div>
                      <div className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant">POWERTRAIN</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface">3.0L MHEV</div>
                    </div>
                    <div>
                      <div className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant">OUTPUT</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface">350 PS / 700 NM</div>
                    </div>
                    <div>
                      <div className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant">TRANSMISSION</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface">8-SPD AUTO AWD</div>
                    </div>
                    <div>
                      <div className="font-label-mono text-[9px] uppercase tracking-wider text-on-surface-variant">HANDOVER ODO</div>
                      <div className="font-spec-numeral text-spec-numeral text-on-surface">4,120 KM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Column: Itinerary Protocol & Financial Summary (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-space-md">
                {/* Itinerary Block */}
                <div className="p-space-md bg-surface-container-lowest border border-outline-variant flex flex-col gap-space-md">
                  <div className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface-variant border-b border-outline-variant pb-2">JOURNEY SPECIFICATION</div>
                  <div className="space-y-space-sm">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">flight_land</span>
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-on-surface-variant">{"COLLECTION // 12 JUNE 2025 · 10:00 CEST"}</div>
                        <div className="font-action text-action text-on-surface">Munich Airport (MUC) Terminal 2 VIP Atelier</div>
                        <div className="font-body-sm text-[12px] text-on-surface-variant">{"Patron Concierge Meet & Key Exchange"}</div>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-outline-variant ml-2.5" />
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">flight_takeoff</span>
                      <div>
                        <div className="font-label-mono text-[10px] uppercase text-on-surface-variant">{"RETURN // 15 JUNE 2025 · 18:00 CEST"}</div>
                        <div className="font-action text-action text-on-surface">Munich Airport (MUC) Terminal 2 VIP Atelier</div>
                        <div className="font-body-sm text-[12px] text-on-surface-variant">Total Duration: 3 Days, 8 Hours</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Financial Summary */}
                <div className="p-space-md bg-surface-container border border-outline-variant flex flex-col gap-space-sm">
                  <div className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface-variant border-b border-outline-variant pb-2">ACCOUNTING SUMMARY</div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Daily Archival Rate (3 Days × €480)</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">€1,440.00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">VIP Terminal Curatorial Handover</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">€150.00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant">VAT / State Concession (19%)</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">€141.45</span>
                  </div>
                  <div className="pt-2 border-t border-outline flex justify-between items-baseline">
                    <span className="font-action text-action uppercase tracking-widest text-on-surface">Total due at handover</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">€1,731.45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MODAL OVERLAY BACKDROP */}
          <div className="fixed inset-0 z-50 bg-[#171A18]/50 backdrop-blur-[2px] flex items-center justify-center p-4 sm:p-6 overflow-y-auto" id="cancel-modal-overlay">
            {/* 520px CENTERED MODAL DIALOG */}
            <div aria-labelledby="modal-headline" aria-modal="true" className="relative w-full max-w-[520px] bg-[#F5F3EE] border border-[#D8D6CE] shadow-2xl p-6 sm:p-8 rounded-[2px] my-auto animate-in fade-in zoom-in-95 duration-200" role="dialog">
              {/* Top Archival Reference & Close Button */}
              <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                <div className="font-label-mono text-[10px] sm:text-label-mono uppercase tracking-[0.14em] text-[#546254]">{"HLD-0612-4821 // EXHIBIT RELEASE PROTOCOL"}</div>
                <Link aria-label="Dismiss cancellation modal" className="text-[#171A18] hover:text-[#B94A48] transition-colors p-1 -mr-2 -mt-2 cursor-pointer" href="/account/reservations/hld-0612-4821"><span className="material-symbols-outlined text-[20px]">close</span></Link>
              </div>
              {/* Modal Title */}
              <h2 className="font-headline-md text-headline-md text-[#171A18] mb-space-xs tracking-tight" id="modal-headline">Cancel this reservation?</h2>
              {/* Explanatory Copy */}
              <p className="font-body-sm text-body-sm text-[#424844] mb-space-md leading-relaxed">
                Are you sure you wish to release your custodial allocation for the{" "}
                <span className="font-semibold text-[#171A18]">Range Rover Autobiography</span>
                ? This action voids itinerary{" "}
                <span className="font-label-mono text-[11px] text-[#171A18]">HLD-0612-4821</span>
                .
              </p>
              {/* SECTION 01: CANCELLATION TIMELINE & REFUND POLICY */}
              <div className="border-t border-[#D8D6CE] pt-space-sm mb-space-md">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-label-mono text-[10px] uppercase tracking-[0.16em] text-[#171A18] font-bold">{"01 // CANCELLATION TIMELINE"}</span>
                  <span className="font-label-mono text-[10px] uppercase text-[#344A3D] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#344A3D] animate-pulse" />
                    {" "}8 DAYS PRIOR TO HANDOVER
                  </span>
                </div>
                {/* 3-Segment Policy Visual Bar */}
                <div className="space-y-1.5 mb-3">
                  <div className="grid grid-cols-12 h-2 w-full gap-0.5 bg-[#EAE8E1]">
                    {/* Segment 1: 100% Refundable (Up to 48h before handover) */}
                    <div className="col-span-8 bg-[#344A3D] relative group">
                      {/* Current Position Beacon Marker */}
                      <div className="absolute -top-1 left-[25%] -translate-x-1/2 flex flex-col items-center"><span className="w-2.5 h-2.5 bg-[#F5F3EE] border-2 border-[#344A3D] shadow-sm" /></div>
                    </div>
                    {/* Segment 2: 50% Refundable (48h - 24h) */}
                    <div className="col-span-2 bg-[#BBCEBE]" />
                    {/* Segment 3: 0% Non-refundable (<24h) */}
                    <div className="col-span-2 bg-[#D8D6CE]" />
                  </div>
                  {/* Timeline Scale Labels */}
                  <div className="flex justify-between font-label-mono text-[9px] uppercase text-[#737973] pt-0.5">
                    <span className="text-[#344A3D] font-bold">TODAY (JUNE 04)</span>
                    <span>JUNE 10 (48H LIMIT)</span>
                    <span>HANDOVER (JUNE 12)</span>
                  </div>
                </div>
                {/* Active Patron Status Notification Pill */}
                <div className="bg-[#D7E7D5]/40 border-l-2 border-[#344A3D] px-3 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#344A3D] text-[18px]">verified</span>
                  <span className="font-body-sm text-[12px] text-[#1E3327] leading-tight">
                    <strong>Tier I Patron Policy Applied:</strong>
                    {" "}100% full reimbursement with zero processing or restocking fee.
                  </span>
                </div>
              </div>
              {/* SECTION 02: REFUND CALCULATION LEDGER */}
              <div className="bg-[#EAE8E1] border border-[#D8D6CE] p-3.5 mb-space-md">
                <div className="font-label-mono text-[10px] uppercase tracking-wider text-[#546254] pb-2 border-b border-[#D8D6CE] mb-2 flex justify-between items-center">
                  <span>STATEMENT LEDGER</span>
                  <span>CURRENCY: EUR</span>
                </div>
                <div className="space-y-1.5 text-[12px] font-spec-numeral text-[#424844]">
                  <div className="flex justify-between">
                    <span className="font-body-sm">Total due at handover (Invoice #802-98)</span>
                    <span className="text-[#171A18]">€1,731.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body-sm">Custodial Release Fee</span>
                    <span className="text-[#344A3D]">-€0.00</span>
                  </div>
                  <div className="pt-2 border-t border-[#D8D6CE] flex justify-between text-[#171A18] font-bold text-spec-numeral">
                    <span className="font-action text-[12px] uppercase tracking-wider">Net Refund Payable</span>
                    <span className="text-[15px] text-[#1E3327]">€1,731.45</span>
                  </div>
                </div>
                <p className="font-label-mono text-[10px] text-[#546254] mt-2.5 pt-2 border-t border-[#D8D6CE]/60 leading-normal">
                  Nothing has been charged online — the total is due at the curbside handover — so there is nothing to refund and no fee applies.
                </p>
              </div>
              {/* SECTION 03: FEEDBACK SELECTION & MEMO */}
              <form className="space-y-space-sm mb-space-md" id="cancel-reservation-form">
                {/* Reason Dropdown */}
                <div>
                  <label className="block font-label-mono text-[10px] uppercase tracking-[0.14em] text-[#171A18] mb-1" htmlFor="cancel-reason">
                    {"02 // REASON FOR CANCELLATION"}{" "}
                    <span className="text-[#B94A48]">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full bg-[#F5F3EE] border border-[#D8D6CE] text-[#171A18] font-body-sm text-[13px] px-3 py-2 pr-8 rounded-[2px] focus:outline-hidden focus:border-[#344A3D] appearance-none cursor-pointer" id="cancel-reason" required defaultValue="">
                      <option disabled value="">Select archival release reason...</option>
                      <option value="schedule_change">Change of travel itinerary / dates</option>
                      <option value="alternative_curation">Selecting alternative Halden exhibit</option>
                      <option value="travel_cancelled">Travel journey postponed or cancelled</option>
                      <option value="curatorial_inquiry">Other curatorial requirement</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#546254] text-[18px]">expand_more</span>
                  </div>
                </div>
                {/* Optional Note Textarea */}
                <div>
                  <label className="block font-label-mono text-[10px] uppercase tracking-[0.14em] text-[#546254] mb-1" htmlFor="cancel-note">OPTIONAL NOTE FOR PATRON CONCIERGE</label>
                  <textarea className="w-full bg-[#F5F3EE] border border-[#D8D6CE] text-[#171A18] font-body-sm text-[13px] p-2.5 rounded-[2px] focus:outline-hidden focus:border-[#344A3D] placeholder-[#737973] resize-none" id="cancel-note" placeholder="Provide additional context for our logistics atelier (optional)..." rows={2} />
                </div>
              </form>
              {/* MODAL ACTIONS */}
              <div className="flex flex-col sm:flex-row gap-space-xs pt-space-xs border-t border-[#D8D6CE]">
                <Link className="order-2 sm:order-1 flex-1 py-3 px-4 bg-transparent border border-[#171A18] text-[#171A18] font-action text-action uppercase tracking-[0.08em] hover:bg-[#EAE8E1] transition-colors rounded-[2px] cursor-pointer text-center" id="btn-keep-res" href="/account/reservations/hld-0612-4821">Keep Reservation</Link>
                <button className="order-1 sm:order-2 flex-1 py-3 px-4 bg-[#B94A48] hover:bg-[#9E3E3C] text-[#F5F3EE] font-action text-action uppercase tracking-[0.08em] transition-colors rounded-[2px] cursor-pointer flex items-center justify-center gap-1.5 shadow-sm" disabled={done} id="btn-confirm-cancel" onClick={confirmCancel} type="button">
                  <span>Cancel Reservation</span>
                  {" "}
                  <span className="font-spec-numeral text-[11px] opacity-90">(€1,731.45)</span>
                </button>
              </div>
            </div>
          </div>
          {/* SUCCESS TOAST NOTIFICATION (Fixed Bottom-Right Architectural Notification Bar) */}
          <aside aria-live="polite" hidden={!done} className="fixed bottom-6 right-6 z-50 max-w-[440px] bg-[#171A18] text-[#F5F3EE] border border-[#344A3D] p-4 rounded-[2px] shadow-2xl flex items-start gap-3.5 transition-all duration-300" id="success-toast" role="status">
            {/* Forest Green Architectural Status Beacon */}
            <div className="w-8 h-8 rounded-[1px] bg-[#344A3D] flex items-center justify-center shrink-0 mt-0.5"><span className="material-symbols-outlined text-[#D7E7D5] text-[18px]">check</span></div>
            {/* Notification Content */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <span className="font-action text-[13px] uppercase tracking-wider text-[#F5F3EE] font-semibold">Reservation cancelled</span>
                <span className="w-1 h-1 rounded-full bg-[#738273]" />
                <span className="font-label-mono text-[10px] text-[#A0B9A8] uppercase tracking-wider">NO CHARGE</span>
              </div>
              <p className="font-label-mono text-[11px] text-[#BBCEBE] mt-1 leading-snug">
                No charge was taken. Dossier{" "}
                <span className="text-[#F5F3EE]">HLD-0612-4821</span>
                {" "}is now archived.
              </p>
            </div>
            {/* Close Toast Trigger */}
            <button onClick={() => router.push("/account/reservations/hld-0612-4821")} aria-label="Dismiss toast" className="text-[#738273] hover:text-[#F5F3EE] transition-colors -mt-1 -mr-1 p-1 cursor-pointer" id="btn-close-toast"><span className="material-symbols-outlined text-[16px]">close</span></button>
          </aside>
          {/* INTERACTIVITY CONTROLLER SCRIPT */}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
