import { MobileMenu } from "@/components/site/MobileMenu";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_mobile_patron_account_overview/code.html */
export function AccountOverviewMobile({ empty = false, firstName }: { empty?: boolean; firstName: string }) {
  return (
    <div className="md:hidden bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe">
        <div className="h-16 px-gutter-mobile flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <MobileMenu variant="icon" triggerClassName="-ml-2" />
            <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-on-surface-variant font-medium">HALDEN</span>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface hidden">Overview</span>
            
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full pt-16 pb-20 bg-surface flex flex-col">
        <div className="flex flex-col w-full">
          {/* Status & Welcome Ledger Header */}
          <section className="px-gutter-mobile pt-space-md pb-space-lg bg-surface">
            <div className="flex items-center justify-between mb-space-sm">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-on-surface-variant">HALDEN ARCHIVE • DOSSIER № 802</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondary-container text-on-secondary-fixed text-[10px] font-label-mono tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {" "}ACTIVE PATRON
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight mb-2">Welcome back, {firstName}.</h1>
            <p className="font-label-mono text-[10px] uppercase tracking-[0.14em] text-on-surface-variant leading-relaxed">{"PATRON CIRCLE // TIER-1 ARCHIVE CLEARANCE • 03 JOURNEYS COMPLETED"}</p>
            {/* Space Mono Tab Strip */}
            <div className="flex items-center gap-6 mt-6 overflow-x-auto no-scrollbar">
              <Link className="relative pb-2 font-label-mono text-[11px] tracking-[0.18em] uppercase text-primary font-bold" aria-current="page" href="/account">
                OVERVIEW{" "}
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
              </Link>
              <a className="pb-2 font-label-mono text-[11px] tracking-[0.18em] uppercase text-on-surface-variant hover:text-on-surface transition-colors" href="#m-reservations">RESERVATIONS</a>
              <a className="pb-2 font-label-mono text-[11px] tracking-[0.18em] uppercase text-on-surface-variant hover:text-on-surface transition-colors" href="#m-saved">SAVED</a>
              <Link className="pb-2 font-label-mono text-[11px] tracking-[0.18em] uppercase text-on-surface-variant hover:text-on-surface transition-colors" href="/account/settings">SETTINGS</Link>
            </div>
          </section>
          {/* Section 1: Upcoming Allocation (Exhibit Placard Signature Component) */}
          <section className="px-gutter-mobile mb-space-lg">
            {empty ? (
              <div className="bg-surface-container-lowest">
                <div className="px-4 py-3 bg-surface-container-low flex items-center justify-between">
                  <span className="font-label-mono text-[11px] tracking-[0.15em] uppercase text-on-surface">UPCOMING ALLOCATION</span>
                  <span className="font-label-mono text-[10px] tracking-wider uppercase text-secondary font-medium">00 ACTIVE</span>
                </div>
                <div className="px-4 py-space-lg flex flex-col gap-space-sm">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">No journeys planned yet.</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Your confirmed itineraries and curbside handover dossiers will appear here.</p>
                  <Link className="mt-space-sm h-12 bg-primary text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center gap-2" href="/fleet">
                    Explore the collection
                    <span className="material-symbols-outlined text-[18px]" aria-hidden>
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
            <div className="bg-surface-container-lowest p-0">
              {/* Allocation Bar */}
              <div className="px-4 py-3 bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-label-mono text-[11px] tracking-[0.15em] uppercase text-on-surface">UPCOMING ALLOCATION • HLD-0612-4821</span>
                </div>
                <span className="font-label-mono text-[10px] tracking-wider uppercase text-secondary font-medium">{"CONFIRMED // STAGED"}</span>
              </div>
              {/* Vehicle Stage */}
              <div className="relative w-full aspect-[4/3] bg-surface-container">
                <Photo src={media.accountRangeRover} priority className="w-full h-full object-cover" data-alt="Editorial studio portrait of a silver Range Rover Autobiography parked in an architectural concrete pavilion with gentle overhead diffused softbox lighting and neutral stone flooring, catalog aesthetic" sizes="100vw" alt="" />
                <div className="absolute top-3 left-3 bg-surface/90 px-2 py-1 font-label-mono text-[9px] uppercase tracking-widest text-on-surface">STAGE 01 • MUNICH</div>
              </div>
              {/* Information & Specs Ledger */}
              <div className="p-space-md bg-surface-container-lowest">
                <div className="flex flex-col mb-4">
                  <span className="font-label-mono text-[10px] tracking-[0.16em] uppercase text-secondary mb-1">{"CATALOGUE № 14 // SOLIHULL ATELIER"}</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Range Rover Autobiography</h2>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface-variant mt-0.5">MY2024 • 4.4L V8 TWIN-TURBO • 530 PS</span>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-surface-container-low mb-4">
                  <div>
                    <span className="block font-label-mono text-[9px] tracking-widest text-on-surface-variant uppercase">DISPATCH SCHEDULE</span>
                    <span className="font-spec-numeral text-[13px] text-on-surface font-medium">12 JUN → 15 JUN 2025</span>
                    <span className="block font-label-mono text-[9px] text-secondary mt-0.5">3 DIURNAL CYCLES</span>
                  </div>
                  <div>
                    <span className="block font-label-mono text-[9px] tracking-widest text-on-surface-variant uppercase">STAGING SALON</span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Munich Airport (MUC)</span>
                    <span className="block font-label-mono text-[9px] text-secondary mt-0.5">TERMINAL 2 VIP PAVILION</span>
                  </div>
                </div>
                {/* Financial Ledger Row */}
                <div className="flex items-center justify-between py-2 px-1 mb-5 bg-surface-container-high/40 px-3">
                  <span className="font-label-mono text-label-mono uppercase tracking-[0.15em] text-on-surface-variant">TOTAL COMMITMENT</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-semibold tracking-wider">
                    €1,731.45{" "}
                    <span className="font-label-mono text-[9px] font-normal text-secondary">VAT INCL.</span>
                  </span>
                </div>
                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Link className="w-full py-3.5 px-3 bg-surface-container text-on-surface font-action text-action uppercase tracking-[0.06em] text-center hover:bg-surface-container-high transition-colors" href="/account/reservations/hld-0612-4821/modify">Modify Itinerary</Link>
                  <Link className="w-full py-3.5 px-3 bg-primary text-on-primary font-action text-action uppercase tracking-[0.06em] text-center flex items-center justify-center gap-1.5 hover:bg-primary-container transition-colors" href="/account/reservations/hld-0612-4821">
                    <span>View Dossier</span>
                    {" "}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
            )}
          </section>
          {/* Section 2: Past Journeys (Compact Archival Ledger Rows) */}
          <section id="m-reservations" className="px-gutter-mobile mb-space-lg">
            <div className="flex items-center justify-between pb-2 mb-3">
              <h3 className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-on-surface font-medium">{"PAST JOURNEYS // 02 ARCHIVED"}</h3>
              <span className="font-label-mono text-[10px] text-secondary tracking-widest">LOGS VERIFIED</span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Ledger Row 1 */}
              <Link className="block p-3.5 bg-surface-container-lowest hover:bg-surface-container transition-colors" href="/account#reservations">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-label-mono text-[10px] tracking-wider text-secondary">HLD-0419-8802</span>
                  <span className="font-label-mono text-[9px] uppercase tracking-widest bg-secondary-container px-2 py-0.5 text-on-secondary-fixed">COMPLETED</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-headline-sm text-[18px] text-on-surface">Porsche 911 GT3 Touring</h4>
                    <p className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">18 APR – 21 APR 2025 • ZURICH SALON • 642 KM</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
                </div>
              </Link>
              {/* Ledger Row 2 */}
              <Link className="block p-3.5 bg-surface-container-lowest hover:bg-surface-container transition-colors" href="/account#reservations">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-label-mono text-[10px] tracking-wider text-secondary">HLD-0108-3319</span>
                  <span className="font-label-mono text-[9px] uppercase tracking-widest bg-secondary-container px-2 py-0.5 text-on-secondary-fixed">COMPLETED</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-headline-sm text-[18px] text-on-surface">Audi RS6 Avant</h4>
                    <p className="font-label-mono text-[10px] text-on-surface-variant mt-0.5">10 JAN – 14 JAN 2025 • ENGADIN PAVILION • 810 KM</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
                </div>
              </Link>
            </div>
          </section>
          {/* Section 3: Saved Cars (Monitored Archive Strip) */}
          <section id="m-saved" className="pl-gutter-mobile mb-space-lg">
            <div className="flex items-center justify-between pr-gutter-mobile pb-2 mb-3">
              <h3 className="font-label-mono text-label-mono uppercase tracking-[0.2em] text-on-surface font-medium">{"SAVED CARS // 03 MONITORED"}</h3>
              <Link className="font-label-mono text-[10px] text-primary uppercase tracking-widest underline underline-offset-4" href="/account#reservations">VIEW ALL</Link>
            </div>
            {/* Horizontal Swipe Strip */}
            <div className="flex gap-3 overflow-x-auto pr-gutter-mobile pb-2 no-scrollbar">
              {/* Card 1: Lexus LC 500 Coupe */}
              <div className="shrink-0 w-[240px] bg-surface-container-lowest flex flex-col">
                <div className="relative w-full aspect-[3/2] bg-surface-container">
                  <Photo src={media.accountLexus} className="w-full h-full object-cover" data-alt="Sculptural metallic champagne gold Lexus LC 500 Coupe in an architectural studio setting with warm textured monolithic concrete walls and polished pale stone flooring" sizes="240px" alt="" />
                  <span className="absolute top-2 left-2 bg-surface/90 px-1.5 py-0.5 font-label-mono text-[8px] uppercase tracking-widest text-primary font-bold">AVAILABLE</span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase tracking-wider text-secondary">ARCHIVE № 28</span>
                    <h4 className="font-headline-sm text-[16px] text-on-surface leading-tight mt-0.5">Lexus LC 500</h4>
                    <p className="font-label-mono text-[10px] text-on-surface-variant mt-1">5.0L V8 • 477 PS</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 bg-surface-container-low px-2 py-1.5">
                    <span className="font-spec-numeral text-[13px] text-on-surface font-semibold">
                      €380{" "}
                      <span className="font-label-mono text-[8px] text-secondary font-normal">/ DAY</span>
                    </span>
                    <Link aria-label="View Lexus LC 500" className="text-primary hover:text-on-surface transition-colors" href="/fleet/lexus-lc-500"><span className="material-symbols-outlined text-[18px]">bookmark_added</span></Link>
                  </div>
                </div>
              </div>
              {/* Card 2: Porsche 911 GT3 Touring */}
              <div className="shrink-0 w-[240px] bg-surface-container-lowest flex flex-col">
                <div className="relative w-full aspect-[3/2] bg-surface-container">
                  <Photo src={media.accountGt3} className="w-full h-full object-cover" data-alt="Side profile shot of a jet black Porsche 911 GT3 Touring staged in a minimalist museum gallery hall with brutalist concrete textures and soft natural skylight" sizes="240px" alt="" />
                  <span className="absolute top-2 left-2 bg-surface/90 px-1.5 py-0.5 font-label-mono text-[8px] uppercase tracking-widest text-primary font-bold">AVAILABLE</span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase tracking-wider text-secondary">ARCHIVE № 09</span>
                    <h4 className="font-headline-sm text-[16px] text-on-surface leading-tight mt-0.5">911 GT3 Touring</h4>
                    <p className="font-label-mono text-[10px] text-on-surface-variant mt-1">4.0L FLAT-6 • 510 PS</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 bg-surface-container-low px-2 py-1.5">
                    <span className="font-spec-numeral text-[13px] text-on-surface font-semibold">
                      €540{" "}
                      <span className="font-label-mono text-[8px] text-secondary font-normal">/ DAY</span>
                    </span>
                    <Link aria-label="View Porsche 911 GT3 Touring" className="text-primary hover:text-on-surface transition-colors" href="/fleet/porsche-911-gt3-touring"><span className="material-symbols-outlined text-[18px]">bookmark_added</span></Link>
                  </div>
                </div>
              </div>
              {/* Card 3: Audi RS6 Avant */}
              <div className="shrink-0 w-[240px] bg-surface-container-lowest flex flex-col">
                <div className="relative w-full aspect-[3/2] bg-surface-container">
                  <Photo src={media.accountAudi} className="w-full h-full object-cover" data-alt="Deep metallic blue Audi RS6 Avant wagon positioned inside a sunlit architectural museum wing featuring tall travertine walls and muted neutral stone floors" sizes="240px" alt="" />
                  <span className="absolute top-2 left-2 bg-inverse-surface/90 text-inverse-on-surface px-1.5 py-0.5 font-label-mono text-[8px] uppercase tracking-widest">STAGED UNTIL 16 JUN</span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase tracking-wider text-secondary">ARCHIVE № 19</span>
                    <h4 className="font-headline-sm text-[16px] text-on-surface leading-tight mt-0.5">Audi RS6 Avant</h4>
                    <p className="font-label-mono text-[10px] text-on-surface-variant mt-1">4.0L TFSI V8 • 600 PS</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-3 bg-surface-container-low px-2 py-1.5">
                    <span className="font-spec-numeral text-[13px] text-on-surface font-semibold">
                      €410{" "}
                      <span className="font-label-mono text-[8px] text-secondary font-normal">/ DAY</span>
                    </span>
                    <Link aria-label="View Audi RS6 Avant Performance" className="text-on-surface-variant hover:text-on-surface transition-colors" href="/fleet/audi-rs6-avant-performance"><span className="material-symbols-outlined text-[18px]">notifications</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Patron Concierge Direct Line Capsule */}
          <section className="px-gutter-mobile mb-space-lg">
            <div className="p-space-md bg-surface-container flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-[20px]">concierge</span></div>
                <div>
                  <span className="font-label-mono text-[10px] uppercase tracking-[0.15em] text-on-surface-variant block">DIRECT CURATOR DESK</span>
                  <span className="font-action text-[13px] text-on-surface font-semibold">Julian von Berg • Liaison № 4</span>
                </div>
              </div>
              <Link className="px-3 py-1.5 bg-surface-container-lowest text-primary font-label-mono text-[10px] tracking-wider uppercase hover:bg-primary hover:text-on-primary transition-colors" href="/about#contact">TRANSMIT →</Link>
            </div>
          </section>
        </div>
      </main>
      <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(23,26,24,0.03)]">
        <div className="flex items-center justify-around h-16 px-space-xs">
          <Link aria-current="page" className="flex flex-col items-center justify-center min-w-[56px] h-11 px-2 transition-colors text-primary border-t-2 border-primary" href="/account">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest mt-0.5">Circle</span>
          </Link>
          <Link className="flex flex-col items-center justify-center min-w-[56px] h-11 px-2 text-on-surface-variant hover:text-on-surface transition-colors" href="/fleet">
            <span className="material-symbols-outlined text-[20px]">garage</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest mt-0.5">Fleet</span>
          </Link>
          <Link className="flex flex-col items-center justify-center min-w-[56px] h-11 px-2 text-on-surface-variant hover:text-on-surface transition-colors" href="/account">
            <span className="material-symbols-outlined text-[20px]">folder_special</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest mt-0.5">Dossier</span>
          </Link>
          <Link className="flex flex-col items-center justify-center min-w-[56px] h-11 px-2 text-on-surface-variant hover:text-on-surface transition-colors" href="/about#contact">
            <span className="material-symbols-outlined text-[20px]">room_service</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest mt-0.5">Liaison</span>
          </Link>
          <Link className="flex flex-col items-center justify-center min-w-[56px] h-11 px-2 text-on-surface-variant hover:text-on-surface transition-colors" href="/account/settings">
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="font-label-mono text-[9px] uppercase tracking-widest mt-0.5">Config</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
