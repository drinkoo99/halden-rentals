import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_journey_detail_the_high_alpine_transversal_mobile/code.html */
export function JourneyDetailMobile() {
  return (
    <div className="md:hidden bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
        <div className="h-16 px-margin-mobile flex items-center justify-between">
          <Link aria-label="Back to journeys" className="w-11 h-11 flex items-center justify-start text-on-surface hover:text-primary transition-colors" href="/journeys"><span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span></Link>
          <div className="flex flex-col items-center justify-center">
            <span className="font-display-mobile text-[19px] leading-tight tracking-[0.24em] font-normal uppercase text-on-surface">HALDEN</span>
            <span className="font-label-mono text-[9px] leading-none tracking-[0.18em] text-on-surface-variant uppercase mt-0.5">Catalogue Placard Detail</span>
          </div>
          <Link aria-label="Patron sign in" className="w-11 h-11 flex items-center justify-end shrink-0" href="/sign-in"><span className="w-8 h-8 rounded-full border border-outline-variant text-on-surface flex items-center justify-center"><span className="material-symbols-outlined text-[18px]" aria-hidden>person</span></span></Link>
        </div>
      </header>
      <main className="flex flex-col relative w-full pt-16 bg-surface min-h-screen pb-safe">
        <div className="flex flex-col w-full pb-12">
          {/* Sub-Navigation Bar */}
          <div className="px-margin-mobile pt-3 pb-4 flex items-center justify-between">
            <Link className="inline-flex items-center gap-1.5 font-label-mono text-label-mono text-on-surface hover:text-primary tracking-widest uppercase transition-colors min-h-[44px]" href="/journeys">
              <span className="material-symbols-outlined text-[16px]">west</span>
              {" "}
              <span>Curated Routes</span>
            </Link>
            <span className="font-label-mono text-label-mono text-secondary tracking-widest uppercase">{"ITIN // 04"}</span>
          </div>
          {/* Hero Exhibition Stage */}
          <div className="px-margin-mobile">
            <div className="relative w-full aspect-[16/10] bg-surface-container overflow-hidden">
              <Photo src={media.journeyHighAlpineHero} priority alt="The High Alpine Transversal winding through Swiss mountain passes" className="w-full h-full object-cover" sizes="100vw" />
              <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1"><p className="font-label-mono text-[10px] tracking-widest uppercase text-on-surface">{"Route Plate 46°33'N 8°25'E"}</p></div>
            </div>
            {/* Title & Premise */}
            <div className="pt-5 pb-6">
              <p className="font-label-mono text-label-mono tracking-widest uppercase text-secondary mb-1.5">Grand Tour Series</p>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight">The High Alpine Transversal</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Four legendary Swiss passes in three days.</p>
            </div>
          </div>
          {/* Key Facts Grid (2x2 Stone Grid) */}
          <div className="px-margin-mobile mb-10">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-container p-4">
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary block mb-1">Total Distance</span>
                <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold text-lg">640 KM</span>
              </div>
              <div className="bg-surface-container p-4">
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary block mb-1">Pass Duration</span>
                <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold text-lg">3 Days</span>
              </div>
              <div className="bg-surface-container p-4">
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary block mb-1">Peak Elevation</span>
                <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold text-lg">2,436 M</span>
              </div>
              <div className="bg-surface-container p-4">
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary block mb-1">Pass Window</span>
                <span className="font-spec-numeral text-spec-numeral text-on-surface font-bold text-lg">Jun – Oct</span>
              </div>
            </div>
          </div>
          {/* Minimal Route Overview Diagram */}
          <div className="px-margin-mobile mb-12">
            <div className="bg-surface-container-low p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary">Waypoints Matrix</span>
                <span className="font-label-mono text-label-mono text-primary font-medium tracking-widest uppercase">Elevation Delta +1,980m</span>
              </div>
              {/* Minimalist Metro/Topological Spine */}
              <div className="relative py-2">
                {/* Connecting Line Bar */}
                <div className="absolute left-2.5 right-2.5 top-[15px] h-0.5 bg-surface-container-highest" />
                <div className="relative flex justify-between items-start text-center">
                  {/* Station 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-none bg-primary flex items-center justify-center text-on-primary z-10"><span className="w-2 h-2 bg-surface" /></div>
                    <span className="font-spec-numeral text-[11px] mt-2 text-on-surface font-bold">ZRH</span>
                    <span className="font-label-mono text-[9px] text-secondary">408m</span>
                  </div>
                  {/* Station 2 */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-none bg-surface-container-highest flex items-center justify-center z-10"><span className="w-1.5 h-1.5 bg-secondary" /></div>
                    <span className="font-spec-numeral text-[11px] mt-2 text-on-surface">AND</span>
                    <span className="font-label-mono text-[9px] text-secondary">1,444m</span>
                  </div>
                  {/* Station 3 (Peak) */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-none bg-primary-container flex items-center justify-center text-on-primary-container z-10"><span className="w-1.5 h-1.5 bg-primary-fixed" /></div>
                    <span className="font-spec-numeral text-[11px] mt-2 text-on-surface font-semibold">FUR</span>
                    <span className="font-label-mono text-[9px] text-primary font-bold">2,429m</span>
                  </div>
                  {/* Station 4 */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-none bg-surface-container-highest flex items-center justify-center z-10"><span className="w-1.5 h-1.5 bg-secondary" /></div>
                    <span className="font-spec-numeral text-[11px] mt-2 text-on-surface">SUS</span>
                    <span className="font-label-mono text-[9px] text-secondary">2,260m</span>
                  </div>
                  {/* Station 5 */}
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-none bg-surface-container-highest flex items-center justify-center z-10"><span className="w-2 h-2 bg-on-surface" /></div>
                    <span className="font-spec-numeral text-[11px] mt-2 text-on-surface font-bold">LUC</span>
                    <span className="font-label-mono text-[9px] text-secondary">436m</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 flex items-center justify-between text-secondary">
                <span className="font-label-mono text-[10px] tracking-widest uppercase">Start: Zurich Dolder</span>
                <span className="font-label-mono text-[10px] tracking-widest uppercase">Finish: Lake Lucerne</span>
              </div>
            </div>
          </div>
          {/* Day-by-Day Accordion / Stack */}
          <div className="px-margin-mobile mb-14">
            <div className="mb-4">
              <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary">Catalogue Sections</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Sequential Itinerary</h2>
            </div>
            <div className="space-y-4">
              {/* Day 01 */}
              <article className="bg-surface-container-low overflow-hidden">
                <div className="relative aspect-[16/9] w-full bg-surface-container overflow-hidden">
                  <Photo src={media.journeyHighAlpineCard} alt="Day 01 Zurich to Andermatt via Schöllenen Gorge" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 52vw" />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-[10px] tracking-widest text-on-surface uppercase font-bold">Stage 01</span></div>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Zurich → Andermatt</h3>
                    <span className="font-spec-numeral text-spec-numeral text-secondary">01 / 03</span>
                  </div>
                  <div className="flex items-center gap-3 my-2 text-on-surface-variant">
                    <span className="font-spec-numeral text-spec-numeral">3h 45m</span>
                    <span className="w-1 h-1 bg-secondary rounded-full" />
                    <span className="font-spec-numeral text-spec-numeral">185 km</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant my-3">Depart the urban lakeside toward the foot of the Gotthard massif. As the grade climbs steeply through the Schöllenen Gorge, dense pine gives way to raw granite cliff walls and alpine acoustics.</p>
                  <div className="bg-surface-container p-3 flex items-center justify-between">
                    <div>
                      <span className="font-label-mono text-[10px] tracking-widest uppercase text-secondary block">Residency</span>
                      <span className="font-body-md text-body-md text-on-surface font-medium">The Chedi Andermatt</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-[20px]">apartment</span>
                  </div>
                </div>
              </article>
              {/* Day 02 */}
              <article className="bg-surface-container-low overflow-hidden">
                <div className="relative aspect-[16/9] w-full bg-surface-container overflow-hidden">
                  <Photo src={media.alpinePass} alt="Day 02 Furka and Grimsel Mountain Pass hairpin roads" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 52vw" />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-[10px] tracking-widest text-on-surface uppercase font-bold">Stage 02</span></div>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{"Furka & Grimsel Passes"}</h3>
                    <span className="font-spec-numeral text-spec-numeral text-secondary">02 / 03</span>
                  </div>
                  <div className="flex items-center gap-3 my-2 text-on-surface-variant">
                    <span className="font-spec-numeral text-spec-numeral">4h 15m</span>
                    <span className="w-1 h-1 bg-secondary rounded-full" />
                    <span className="font-spec-numeral text-spec-numeral">210 km</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant my-3">The heart of the journey. Sweeping switchbacks ascending past the Rhone Glacier, leading directly onto Grimsel’s austere stone dam structures and turquoise glacial reservoirs.</p>
                  <div className="bg-surface-container p-3 flex items-center justify-between">
                    <div>
                      <span className="font-label-mono text-[10px] tracking-widest uppercase text-secondary block">Residency</span>
                      <span className="font-body-md text-body-md text-on-surface font-medium">Grimsel Hospiz</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-[20px]">hotel</span>
                  </div>
                </div>
              </article>
              {/* Day 03 */}
              <article className="bg-surface-container-low overflow-hidden">
                <div className="relative aspect-[16/9] w-full bg-surface-container overflow-hidden">
                  <Photo src={media.rangeRoverAlpineLake} alt="Day 03 Sustenpass to Lake Lucerne Bürgenstock" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 52vw" />
                  <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-[10px] tracking-widest text-on-surface uppercase font-bold">Stage 03</span></div>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Sustenpass → Lucerne</h3>
                    <span className="font-spec-numeral text-spec-numeral text-secondary">03 / 03</span>
                  </div>
                  <div className="flex items-center gap-3 my-2 text-on-surface-variant">
                    <span className="font-spec-numeral text-spec-numeral">3h 30m</span>
                    <span className="w-1 h-1 bg-secondary rounded-full" />
                    <span className="font-spec-numeral text-spec-numeral">245 km</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant my-3">Considered the crowning architectural drive of Europe. Smooth wide-radius curves engineered into the Gadmen valley, tapering down to the tranquil shoreline of Lake Lucerne.</p>
                  <div className="bg-surface-container p-3 flex items-center justify-between">
                    <div>
                      <span className="font-label-mono text-[10px] tracking-widest uppercase text-secondary block">Residency</span>
                      <span className="font-body-md text-body-md text-on-surface font-medium">Bürgenstock Resort</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-[20px]">spa</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
          {/* Recommended Chassis */}
          <div className="px-margin-mobile mb-14">
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary">Curated Fleet</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Recommended Chassis</h2>
              </div>
              <span className="font-label-mono text-[10px] text-secondary tracking-widest uppercase">3 Options</span>
            </div>
            {/* Vehicle Stack */}
            <div className="space-y-4">
              {/* Chassis 1: GT3 Touring */}
              <div className="bg-surface-container-low p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-mono text-[10px] tracking-widest uppercase text-secondary">{"CHASSIS 01 // PURIST"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-bold">€440 / DAY</span>
                </div>
                <div className="w-full aspect-[16/10] bg-surface-container overflow-hidden mb-3"><Photo src={media.porscheGt3Studio} alt="Porsche 911 GT3 Touring in obsidian black" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Porsche 911 GT3 Touring</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-4">Naturally aspirated flat-six. Uncompromising feedback calibrated for high-altitude hairpins.</p>
                <div className="grid grid-cols-3 gap-2 bg-surface-container p-2.5 mb-4 text-center">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Power</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">502 HP</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">0-100</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">3.4 S</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Gearbox</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">6-SPD MAN</span>
                  </div>
                </div>
                <Link className="w-full min-h-[44px] bg-primary text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center transition-colors hover:bg-primary-container" href="/book/porsche-911-gt3-touring/trip">Reserve for this route</Link>
              </div>
              {/* Chassis 2: Range Rover Autobiography */}
              <div className="bg-surface-container-low p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-mono text-[10px] tracking-widest uppercase text-secondary">{"CHASSIS 02 // SANCTUARY"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-bold">€390 / DAY</span>
                </div>
                <div className="w-full aspect-[16/10] bg-surface-container overflow-hidden mb-3"><Photo src={media.rangeRoverStudio} alt="Range Rover Autobiography in silver stone" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Range Rover Autobiography</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-4">Active noise cancellation and adaptive twin-valve suspension. Effortless grand touring elevation.</p>
                <div className="grid grid-cols-3 gap-2 bg-surface-container p-2.5 mb-4 text-center">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Power</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">523 HP</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Torque</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">750 NM</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Drive</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">AWD STEER</span>
                  </div>
                </div>
                <Link className="w-full min-h-[44px] bg-primary text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center transition-colors hover:bg-primary-container" href="/book/range-rover-autobiography/trip">Reserve for this route</Link>
              </div>
              {/* Chassis 3: Lexus LC 500 */}
              <div className="bg-surface-container-low p-4 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-mono text-[10px] tracking-widest uppercase text-secondary">{"CHASSIS 03 // SCULPTURAL"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-bold">€375 / DAY</span>
                </div>
                <div className="w-full aspect-[16/10] bg-surface-container overflow-hidden mb-3"><Photo src={media.lexusLakeComo} alt="Lexus LC 500 in champagne metallic" className="w-full h-full object-cover" sizes="(max-width: 767px) 100vw, 29vw" /></div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Lexus LC 500 Coupe</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-4">Atmospheric 5.0L V8 soundtrack echoing through granite gorges with bespoke Takumi craftsmanship.</p>
                <div className="grid grid-cols-3 gap-2 bg-surface-container p-2.5 mb-4 text-center">
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Power</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">471 HP</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">V-Engine</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">5.0L V8</span>
                  </div>
                  <div>
                    <span className="font-label-mono text-[9px] uppercase text-secondary block">Acoustics</span>
                    <span className="font-spec-numeral text-[12px] font-bold text-on-surface">VALVED</span>
                  </div>
                </div>
                <Link className="w-full min-h-[44px] bg-primary text-on-primary font-action text-action uppercase tracking-widest flex items-center justify-center transition-colors hover:bg-primary-container" href="/book/lexus-lc-500/trip">Reserve for this route</Link>
              </div>
            </div>
          </div>
          {/* Closing Dark Feature Room (Obsidian #171B19 CTA Panel) */}
          <div className="px-margin-mobile">
            <div className="bg-tertiary text-on-tertiary p-6 flex flex-col items-center text-center">
              <span className="font-label-mono text-[10px] tracking-widest uppercase text-tertiary-fixed-dim mb-2">Expedition Concierge</span>
              <h2 className="font-headline-sm text-headline-sm text-on-tertiary max-w-[280px]">Begin Your Transversal</h2>
              <p className="font-body-sm text-body-sm text-on-tertiary-container mt-2 mb-6 max-w-[300px]">Our dispatch curates accommodation access, road pass weather alerts, and door-to-door vehicle delivery.</p>
              {/* Primary Action */}
              <Link className="w-full min-h-[48px] bg-primary-fixed text-on-primary-fixed font-action text-action uppercase tracking-widest flex items-center justify-center hover:bg-surface-tint hover:text-on-primary transition-colors mb-4" href="/about#contact">Plan this journey</Link>
              {/* Secondary GPX Download Action */}
              <span className="min-h-[44px] inline-flex items-center gap-2 text-tertiary-fixed font-label-mono text-label-mono uppercase tracking-widest hover:text-on-tertiary transition-colors" data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                {" "}
                <span>{"Download Telemetry & GPX Track"}</span>
              </span>
              <div className="mt-6 pt-5 w-full flex items-center justify-between text-on-tertiary-container">
                <span className="font-label-mono text-[9px] tracking-widest uppercase">PASS STATUS: OPEN</span>
                <span className="font-label-mono text-[9px] tracking-widest uppercase">{"HALDEN ARCHIVE // 2025"}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
