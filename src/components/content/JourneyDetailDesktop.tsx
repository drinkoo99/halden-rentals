import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_journey_detail_the_high_alpine_transversal_desktop/code.html */
export function JourneyDetailDesktop() {
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased">
      <SiteHeader active="journeys" />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          {/* Hero Section (Bleeds subtly under fixed header) */}
          <section className="relative w-full overflow-hidden bg-inverse-surface -mt-20 pt-20">
            <div className="relative w-full h-[65vh] min-h-[520px] max-h-[720px] overflow-hidden">
              <Photo src={media.journeyHighAlpineHero} priority alt="The High Alpine Transversal mountain pass road in the Swiss Alps" className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out" sizes="100vw" />
              {/* Editorial subtle tonal gradient for contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-inverse-surface via-inverse-surface/40 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-inverse-surface/80 via-transparent to-transparent" />
              {/* Architectural Floating Placard Anchor */}
              <div className="absolute bottom-0 left-0 right-0 px-gutter-mobile md:px-margin pb-space-lg">
                <div className="max-w-4xl bg-surface-container-lowest/95 backdrop-blur-md p-space-md md:p-space-lg border border-outline-variant/60">
                  <div className="flex items-center gap-space-sm mb-space-xs text-outline font-label-mono text-label-mono uppercase tracking-widest">
                    <span className="inline-block w-2 h-2 bg-primary" />
                    <span>{"SWITZERLAND // ROUTE SPECIFICATION № 01"}</span>
                    <span className="text-outline-variant">|</span>
                    <span>ARCHIVE DOSSIER CH-ALP-04</span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg md:text-display text-primary tracking-tight mb-space-xs">The High Alpine Transversal</h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl font-light">A three-day masterclass through the heart of the Central Swiss Alps across four legendary passes.</p>
                </div>
              </div>
            </div>
          </section>
          {/* Key Facts Technical Strip */}
          <section className="w-full bg-surface-container border-y border-outline-variant">
            <div className="w-full px-gutter-mobile md:px-margin">
              <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
                {/* Metric 1 */}
                <div className="py-space-md md:px-space-md first:pl-0 flex flex-col justify-between">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">Total Distance</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium mt-1">640 KM</span>
                </div>
                {/* Metric 2 */}
                <div className="py-space-md px-space-md flex flex-col justify-between">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">Duration</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium mt-1">3 DIURNAL CYCLES</span>
                </div>
                {/* Metric 3 */}
                <div className="py-space-md md:px-space-md flex flex-col justify-between">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">Highest Point</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium mt-1">
                    2,436 M{" "}
                    <span className="text-xs text-outline">(FURKA)</span>
                  </span>
                </div>
                {/* Metric 4 */}
                <div className="py-space-md px-space-md flex flex-col justify-between">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">Best Season</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium mt-1">JUN — OCT</span>
                </div>
                {/* Metric 5 */}
                <div className="py-space-md md:px-space-md last:pr-0 col-span-2 md:col-span-1 flex flex-col justify-between border-t md:border-t-0 border-outline-variant">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">Recommended Chassis</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium mt-1">V8 GRAND TOURER</span>
                </div>
              </div>
            </div>
          </section>
          {/* Route Cartography & Elevation Profile Section */}
          <section className="w-full py-space-xl bg-surface">
            <div className="w-full px-gutter-mobile md:px-margin space-y-space-md">
              {/* Section Tag */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-space-sm border-b border-outline-variant pb-space-sm">
                <div>
                  <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest block">{"TELEMETRY & CARTOGRAPHY"}</span>
                  <h2 className="font-headline-md text-headline-md text-primary mt-1">Altimetric Elevation Vector</h2>
                </div>
                <div className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-space-md">
                  <span>{"SURFACE: REINFORCED MACADAM & HISTORIC PAVÉ"}</span>
                  <span className="text-outline">/</span>
                  <span>NET ASCENT: +7,890 M</span>
                </div>
              </div>
              {/* Altimetric Diagram Module */}
              <div className="bg-surface-container-low p-space-md md:p-space-lg border border-outline-variant relative">
                <div className="flex justify-between items-center mb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-2.5 h-2.5 bg-primary" />
                    <span className="font-label-mono text-label-mono uppercase text-primary font-semibold">{"STAGE TOPOGRAPHY // LAT 46.572° N — LON 8.361° E"}</span>
                  </div>
                  <span className="font-label-mono text-label-mono text-outline">SCALING RATIO: 1:25000</span>
                </div>
                {/* Technical SVG Chart */}
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[760px] relative py-4">
                    <svg className="w-full h-44 text-primary" fill="none" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg">
                      {/* Grid lines */}
                      <line stroke="currentColor" strokeDasharray="2 4" strokeOpacity="0.1" x1="0" x2="1000" y1="40" y2="40" />
                      <line stroke="currentColor" strokeDasharray="2 4" strokeOpacity="0.1" x1="0" x2="1000" y1="90" y2="90" />
                      <line stroke="currentColor" strokeDasharray="2 4" strokeOpacity="0.1" x1="0" x2="1000" y1="140" y2="140" />
                      {/* Elevation curve fill */}
                      <path d="M 60 160 L 220 120 L 320 60 L 460 25 L 560 40 L 720 32 L 860 130 L 940 155 L 940 190 L 60 190 Z" fill="currentColor" fillOpacity="0.05" />
                      {/* Ridge line */}
                      <path d="M 60 160 L 220 120 L 320 60 L 460 25 L 560 40 L 720 32 L 860 130 L 940 155" stroke="currentColor" strokeWidth="1.75" />
                      {/* Zurich 408m */}
                      <circle className="fill-surface stroke-primary" cx="60" cy="160" r="3.5" strokeWidth="2" />
                      <text className="fill-on-surface font-spec-numeral text-[11px] tracking-wider uppercase" textAnchor="start" x="60" y="180">ZURICH [408 M]</text>
                      <line stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" x1="60" x2="60" y1="160" y2="190" />
                      {/* Andermatt 1444m */}
                      <circle className="fill-surface stroke-primary" cx="320" cy="60" r="3.5" strokeWidth="2" />
                      <text className="fill-on-surface font-spec-numeral text-[11px] tracking-wider uppercase" textAnchor="middle" x="320" y="50">ANDERMATT [1,444 M]</text>
                      {/* Furka Pass 2436m */}
                      <circle className="fill-primary stroke-surface" cx="460" cy="25" r="4" strokeWidth="1.5" />
                      <text className="fill-primary font-spec-numeral text-[12px] font-bold tracking-wider uppercase" textAnchor="middle" x="460" y="15">FURKA PASS [2,436 M]</text>
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.25" x1="460" x2="460" y1="25" y2="190" />
                      {/* Grimsel Pass 2164m */}
                      <circle className="fill-surface stroke-primary" cx="560" cy="40" r="3.5" strokeWidth="2" />
                      <text className="fill-on-surface font-spec-numeral text-[11px] tracking-wider uppercase" textAnchor="middle" x="560" y="58">GRIMSEL [2,164 M]</text>
                      {/* Susten Pass 2224m */}
                      <circle className="fill-surface stroke-primary" cx="720" cy="32" r="3.5" strokeWidth="2" />
                      <text className="fill-on-surface font-spec-numeral text-[11px] tracking-wider uppercase" textAnchor="middle" x="720" y="20">SUSTENPASS [2,224 M]</text>
                      {/* Lucerne 436m */}
                      <circle className="fill-surface stroke-primary" cx="940" cy="155" r="3.5" strokeWidth="2" />
                      <text className="fill-on-surface font-spec-numeral text-[11px] tracking-wider uppercase" textAnchor="end" x="940" y="180">LUCERNE SALON [436 M]</text>
                      <line stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" x1="940" x2="940" y1="155" y2="190" />
                    </svg>
                  </div>
                </div>
                {/* Telemetry Data Nodes Footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm pt-space-sm border-t border-outline-variant text-body-sm">
                  <div>
                    <span className="font-label-mono text-label-mono text-outline uppercase block">STAGE 1 DEPARTURE</span>
                    <p className="font-action text-action text-primary mt-0.5">Zurich Limmatquai · 08:30</p>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono text-outline uppercase block">PEAK GRADIENT</span>
                    <p className="font-action text-action text-primary mt-0.5">11.8% · Gotthard Tremola Pavé</p>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono text-outline uppercase block">CORNER CADENCE</span>
                    <p className="font-action text-action text-primary mt-0.5">114 Alpine Hairpin Turn Radius</p>
                  </div>
                  <div>
                    <span className="font-label-mono text-label-mono text-outline uppercase block">CONCIERGE CHECKPOINT</span>
                    <p className="font-action text-action text-primary mt-0.5">{"Bürgenstock Terminus & Spa"}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Curated Day-by-Day Archival Itinerary */}
          <section className="w-full py-space-xl bg-surface-container-low border-y border-outline-variant">
            <div className="w-full px-gutter-mobile md:px-margin">
              {/* Section Header */}
              <div className="max-w-2xl mb-space-lg">
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">DIURNAL PROTOCOL</span>
                <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Stage Progression</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">Each day is calibrated around thermal tire windows, optimal light angles on granite faces, and reserved private staging.</p>
              </div>
              {/* Itinerary List: Day 01, 02, 03 */}
              <div className="space-y-space-xl">
                {/* DAY 01 */}
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-surface p-space-md md:p-space-lg border border-outline-variant">
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-outline-variant pb-space-sm mb-space-md">
                        <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"CYCLE 01 // ASCENT"}</span>
                        <span className="font-label-mono text-label-mono uppercase text-outline">STAGE IDENTIFIER: CH-GOT-01</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-space-xs">Zurich Salon to Andermatt via Gotthard Tremola</h3>
                      {/* Drive Metas */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-space-xs font-label-mono text-label-mono text-outline mb-space-md">
                        <span className="text-primary font-medium">3H 45M DRIVE</span>
                        <span>•</span>
                        <span>185 KM</span>
                        <span>•</span>
                        <span>37 HAIRPIN SWITCHBACKS</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">Depart the historic Zurich lakeside atelier heading south through Schwyz. The ascent culminates on the legendary cobbled switchbacks of the old Tremola road—a serpentine monument of 19th-century civil engineering leading over the Gotthard massif into the Urseren valley.</p>
                    </div>
                    {/* Accomodation Box */}
                    <div className="bg-surface-container p-space-md border border-outline-variant mt-space-md">
                      <span className="font-label-mono text-label-mono text-outline uppercase block mb-1">{"CURATED ACCOMMODATION // STAGE 01"}</span>
                      <p className="font-headline-sm text-headline-sm text-primary">The Chedi Andermatt</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{"Archival Valet & Indoor Heated Mechanical Staging. Subterranean private garage with dedicated chassis washing."}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="w-full h-full min-h-[320px] max-h-[460px] overflow-hidden bg-surface-container"><Photo src={media.journeyHighAlpineCard} alt="Dark metallic green luxury vehicle traversing dramatic Swiss alpine mountain pass" className="w-full h-full object-cover object-center" sizes="(max-width: 767px) 100vw, 52vw" /></div>
                    <div className="pt-space-xs flex justify-between font-label-mono text-label-mono text-outline">
                      <span>{"PLATEAU PASSAGE // TREMOLA SECTOR"}</span>
                      <span>ELEVATION: 2,091 M</span>
                    </div>
                  </div>
                </article>
                {/* DAY 02 */}
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-surface p-space-md md:p-space-lg border border-outline-variant">
                  <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col">
                    <div className="w-full h-full min-h-[320px] max-h-[460px] overflow-hidden bg-surface-container"><Photo src={media.alpinePass} alt="Winding scenic alpine mountain pass road curving through snow dusted granite peaks" className="w-full h-full object-cover object-center" sizes="(max-width: 767px) 100vw, 52vw" /></div>
                    <div className="pt-space-xs flex justify-between font-label-mono text-label-mono text-outline">
                      <span>{"RHONE GLACIER & BELVÉDÈRE TERMINUS"}</span>
                      <span>ELEVATION: 2,436 M</span>
                    </div>
                  </div>
                  <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-outline-variant pb-space-sm mb-space-md">
                        <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"CYCLE 02 // THE CREST"}</span>
                        <span className="font-label-mono text-label-mono uppercase text-outline">STAGE IDENTIFIER: CH-FUR-02</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-space-xs">{"The Colossus: Furka Pass & Grimsel Granite"}</h3>
                      {/* Drive Metas */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-space-xs font-label-mono text-label-mono text-outline mb-space-md">
                        <span className="text-primary font-medium">4H 15M DRIVE</span>
                        <span>•</span>
                        <span>210 KM</span>
                        <span>•</span>
                        <span>RHONE GLACIER ICE CHAMBER</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">A relentless ascent into high drama. Pass the iconic Hotel Belvédère hanging above the Rhone Glacier ice tongue, then sweep down into Gletsch before tackling the monolithic granite walls of the Grimsel Pass, skirting deep turquoise hydroelectric reservoirs.</p>
                    </div>
                    {/* Accomodation Box */}
                    <div className="bg-surface-container p-space-md border border-outline-variant mt-space-md">
                      <span className="font-label-mono text-label-mono text-outline uppercase block mb-1">{"CURATED ACCOMMODATION // STAGE 02"}</span>
                      <p className="font-headline-sm text-headline-sm text-primary">Grimsel Hospiz</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Historic granite mountain lodge perched above a sheer reservoir cliff. Features private subterranean vehicle vaults.</p>
                    </div>
                  </div>
                </article>
                {/* DAY 03 */}
                <article className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-surface p-space-md md:p-space-lg border border-outline-variant">
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-outline-variant pb-space-sm mb-space-md">
                        <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"CYCLE 03 // DESCENT & SALON"}</span>
                        <span className="font-label-mono text-label-mono uppercase text-outline">STAGE IDENTIFIER: CH-SUS-03</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-space-xs">{"Sustenpass Crest & Return to Lucerne Salon"}</h3>
                      {/* Drive Metas */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-space-xs font-label-mono text-label-mono text-outline mb-space-md">
                        <span className="text-primary font-medium">3H 30M DRIVE</span>
                        <span>•</span>
                        <span>245 KM</span>
                        <span>•</span>
                        <span>LAKE URI FJORD DESCENT</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">Engineered in 1945 explicitly for grand touring flow, Sustenpass balances rhythm, broad radius sweeps, and dramatic tunnels chiseled through sheer stone. The drive gently winds down to the deep waters of Lake Uri and onto Lucerne for formal catalog return.</p>
                    </div>
                    {/* Accomodation Box */}
                    <div className="bg-surface-container p-space-md border border-outline-variant mt-space-md">
                      <span className="font-label-mono text-label-mono text-outline uppercase block mb-1">{"CURATED ACCOMMODATION // STAGE 03"}</span>
                      <p className="font-headline-sm text-headline-sm text-primary">{"Bürgenstock Resort & Alpine Spa"}</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Private cliffside terminus. Valet mechanical inspection, luggage repatriation, and celebratory evening tasting.</p>
                    </div>
                  </div>
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="w-full h-full min-h-[320px] max-h-[460px] overflow-hidden bg-surface-container"><Photo src={media.rangeRoverAlpineLake} alt="Silver luxury GT vehicle parked peacefully beside a calm misty alpine lake in Switzerland" className="w-full h-full object-cover object-center" sizes="(max-width: 767px) 100vw, 52vw" /></div>
                    <div className="pt-space-xs flex justify-between font-label-mono text-label-mono text-outline">
                      <span>{"LAKESIDE FINALE // LAKE LUCERNE BASIN"}</span>
                      <span>ELEVATION: 436 M</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
          {/* Recommended Exhibits for this Route */}
          <section className="w-full py-space-xl bg-surface">
            <div className="w-full px-gutter-mobile md:px-margin">
              {/* Section Title */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-space-md mb-space-lg">
                <div>
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">MECHANICAL PAIRINGS</span>
                  <h2 className="font-headline-lg text-headline-lg text-primary mt-1">Recommended Exhibits for this Route</h2>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mt-space-xs md:mt-0">Chassis selected for their torque reserves, cooling endurance, and balance across severe altitudinal gradients.</p>
              </div>
              {/* Exhibits Grid (3 Placards) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {/* Placard 1: Porsche GT3 Touring */}
                <article className="flex flex-col bg-surface border border-outline-variant hover:border-primary transition-colors group">
                  <div className="p-space-md border-b border-outline-variant flex justify-between items-baseline bg-surface-container-low">
                    <span className="font-label-mono text-label-mono uppercase text-outline">CATALOGUE № 09</span>
                    <span className="font-spec-numeral text-spec-numeral text-primary font-semibold">
                      €440{" "}
                      <span className="text-xs text-outline font-normal">/ DAY</span>
                    </span>
                  </div>
                  <div className="w-full h-64 overflow-hidden bg-surface-container"><Photo src={media.porscheGt3Studio} alt="Obsidian black Porsche 911 GT3 Touring in architectural gallery lighting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-1">Porsche 911 GT3 Touring</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Chassis tuned for precise alpine switchbacks. Naturally aspirated flat-six paired with tactile manual gearbox.</p>
                    </div>
                    {/* Specs Matrix */}
                    <div className="border-t border-outline-variant pt-space-sm space-y-space-xs mb-space-md font-label-mono text-label-mono text-outline">
                      <div className="flex justify-between">
                        <span>ENGINE ARCHITECTURE</span>
                        <span className="text-primary font-medium">4.0L FLAT-SIX (502 HP)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DRIVE CONFIGURATION</span>
                        <span className="text-primary font-medium">REAR REAR-STEER</span>
                      </div>
                    </div>
                    <Link className="w-full py-3.5 px-4 bg-primary text-on-primary font-action text-action uppercase tracking-widest text-center hover:bg-primary-container transition-colors" href="/book/porsche-911-gt3-touring/trip">Reserve for this route →</Link>
                  </div>
                </article>
                {/* Placard 2: Range Rover Autobiography */}
                <article className="flex flex-col bg-surface border border-outline-variant hover:border-primary transition-colors group">
                  <div className="p-space-md border-b border-outline-variant flex justify-between items-baseline bg-surface-container-low">
                    <span className="font-label-mono text-label-mono uppercase text-outline">CATALOGUE № 08</span>
                    <span className="font-spec-numeral text-spec-numeral text-primary font-semibold">
                      €390{" "}
                      <span className="text-xs text-outline font-normal">/ DAY</span>
                    </span>
                  </div>
                  <div className="w-full h-64 overflow-hidden bg-surface-container"><Photo src={media.rangeRoverStudio} alt="Silver-grey Range Rover Autobiography in architectural studio backdrop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-1">Range Rover Autobiography</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Unmatched composure across high alpine passes. Air suspension isolates unpredictable high-elevation asphalt joints.</p>
                    </div>
                    {/* Specs Matrix */}
                    <div className="border-t border-outline-variant pt-space-sm space-y-space-xs mb-space-md font-label-mono text-label-mono text-outline">
                      <div className="flex justify-between">
                        <span>ENGINE ARCHITECTURE</span>
                        <span className="text-primary font-medium">4.4L TWIN-TURBO V8 (523 HP)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DRIVE CONFIGURATION</span>
                        <span className="text-primary font-medium">INTELLIGENT AWD</span>
                      </div>
                    </div>
                    <Link className="w-full py-3.5 px-4 bg-primary text-on-primary font-action text-action uppercase tracking-widest text-center hover:bg-primary-container transition-colors" href="/book/range-rover-autobiography/trip">Reserve for this route →</Link>
                  </div>
                </article>
                {/* Placard 3: Lexus LC 500 */}
                <article className="flex flex-col bg-surface border border-outline-variant hover:border-primary transition-colors group">
                  <div className="p-space-md border-b border-outline-variant flex justify-between items-baseline bg-surface-container-low">
                    <span className="font-label-mono text-label-mono uppercase text-outline">CATALOGUE № 05</span>
                    <span className="font-spec-numeral text-spec-numeral text-primary font-semibold">
                      €375{" "}
                      <span className="text-xs text-outline font-normal">/ DAY</span>
                    </span>
                  </div>
                  <div className="w-full h-64 overflow-hidden bg-surface-container"><Photo src={media.lexusLc500Editorial} alt="Metallic bronze Lexus LC 500 coupe parked in architectural studio environment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 767px) 100vw, 30vw" /></div>
                  <div className="p-space-md flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-primary mb-1">Lexus LC 500 Coupe</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Naturally aspirated V8 touring excellence. Acoustic brilliance reverberates perfectly off glacier canyon walls.</p>
                    </div>
                    {/* Specs Matrix */}
                    <div className="border-t border-outline-variant pt-space-sm space-y-space-xs mb-space-md font-label-mono text-label-mono text-outline">
                      <div className="flex justify-between">
                        <span>ENGINE ARCHITECTURE</span>
                        <span className="text-primary font-medium">5.0L ATMO V8 (471 HP)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DRIVE CONFIGURATION</span>
                        <span className="text-primary font-medium">REAR WHEEL DRIVE</span>
                      </div>
                    </div>
                    <Link className="w-full py-3.5 px-4 bg-primary text-on-primary font-action text-action uppercase tracking-widest text-center hover:bg-primary-container transition-colors" href="/book/lexus-lc-500/trip">Reserve for this route →</Link>
                  </div>
                </article>
              </div>
            </div>
          </section>
          {/* Closing Dark CTA Band (#171B19) */}
          <section className="w-full bg-[#171B19] text-[#F8FAF6] py-space-xl border-t border-[#323834]">
            <div className="w-full px-gutter-mobile md:px-margin">
              <div className="max-w-4xl mx-auto text-center space-y-space-md">
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-[#A0B9A8] block">{"CURATORIAL EMBARKATION // PRIVATE ACCESS"}</span>
                <h2 className="font-headline-lg text-headline-lg md:text-display tracking-tight text-[#F8FAF6]">Plan this journey with HALDEN.</h2>
                <p className="font-body-lg text-body-lg text-[#F8FAF6]/75 max-w-2xl mx-auto">Our concierge desk coordinates your vehicle allocation, pre-conditions satellite navigation waypoints, and books secure archival parking at partner hotels.</p>
                {/* CTA Trigger Cluster */}
                <div className="pt-space-md flex flex-col sm:flex-row items-center justify-center gap-space-md">
                  <Link className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary font-action text-action uppercase tracking-widest hover:bg-primary-container transition-colors border border-primary-container" href="/about#contact">Inquire with Curator Desk</Link>
                  <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#F8FAF6] border border-[#737973] hover:border-[#F8FAF6] hover:bg-[#F8FAF6]/5 font-action text-action uppercase tracking-widest transition-colors flex items-center justify-center gap-2" type="button" disabled data-planned="" title="Planned: available once the HALDEN backend is live" aria-disabled="true">
                    <span className="material-symbols-outlined text-[16px]">file_download</span>
                    {" "}Download Digital Route Dossier (PDF / GPX)
                  </button>
                </div>
                <div className="pt-space-md font-label-mono text-label-mono text-[#929692] uppercase tracking-widest">{"EXPEDITION CODE: 01-CH-ALP // DIRECT DESK DISPATCH AVAILABLE 08:00 - 20:00 CET"}</div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
