"use client";

import { useState } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_curated_journeys_index_desktop/code.html */
/** Route metadata for the six Stitch cards, in page order (regions, days, seasons from the card copy). */
const ROUTES = [
  { regions: ["Switzerland"], days: 3, seasons: ["summer"] },
  { regions: ["France"], days: 2, seasons: ["summer", "spring", "all"] },
  { regions: ["Italy"], days: 4, seasons: ["summer"] },
  { regions: ["Austria"], days: 3, seasons: ["summer"] },
  { regions: ["Switzerland", "Italy"], days: 3, seasons: ["summer", "spring"] },
  { regions: ["Italy", "Switzerland"], days: 2, seasons: ["summer", "spring"] },
];
const REGIONS = ["All", "Switzerland", "Italy", "France", "Austria"] as const;
const DURATIONS = [
  ["Any", () => true],
  ["1–2 Days", (d: number) => d <= 2],
  ["3–4 Days", (d: number) => d >= 3 && d <= 4],
  ["5+ Days", (d: number) => d >= 5],
] as const;
const SEASONS = [
  ["summer", "Summer / Autumn"],
  ["spring", "Spring"],
  ["all", "All-Season"],
] as const;

export function JourneysIndexDesktop() {
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");
  const [duration, setDuration] = useState(0);
  const [season, setSeason] = useState<string | null>(null);
  const show = (i: number) => {
    const r = ROUTES[i];
    return (region === "All" || r.regions.includes(region)) && DURATIONS[duration][1](r.days) && (!season || r.seasons.includes(season));
  };
  const chip = (active: boolean) => (active ? "px-space-sm py-1 bg-primary text-on-primary font-label-mono text-label-mono uppercase tracking-wider" : "px-space-sm py-1 bg-transparent hover:bg-surface-container text-on-surface-variant font-label-mono text-label-mono uppercase tracking-wider transition-colors");
  const count = ROUTES.filter((_, i) => show(i)).length;
  return (
    <div className="hidden md:block bg-surface font-body-md text-on-surface antialiased">
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 w-full px-gutter-mobile md:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <Link className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary font-normal" href="/fleet">HALDEN</Link>
            <span className="hidden lg:inline-block font-label-mono text-label-mono uppercase text-outline tracking-widest">{"ARCHIVE // EST. 1928"}</span>
          </div>
          <nav className="hidden md:flex items-center gap-space-md">
            <Link className="font-action text-action uppercase tracking-widest px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors" href="/fleet">Fleet</Link>
            <Link aria-current="page" className="uppercase tracking-widest px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-bold" href="/journeys">Journeys</Link>
            <Link className="font-action text-action uppercase tracking-widest px-space-md py-space-sm text-on-surface-variant hover:text-on-surface transition-colors" href="/about">About</Link>
          </nav>
          <div className="flex items-center gap-space-md">
            <div className="hidden sm:flex flex-col text-right">
              <span className="font-action text-action text-on-surface leading-tight">Clara V.</span>
              <span className="font-label-mono text-label-mono uppercase text-outline">Patron Member</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div>
          </div>
        </div>
      </header>
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-20rem)]">
        <div className="flex flex-col w-full">
          {/* SECTION 1: EDITORIAL HEADER */}
          <section className="w-full px-gutter-mobile md:px-margin pt-space-xl pb-space-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-8 flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold">{"03 // CURATED ROUTES"}</span>
                  <span className="w-1.5 h-1.5 bg-outline-variant inline-block" />
                  <div className="inline-flex items-center gap-1.5 px-space-xs py-0.5 bg-secondary-container text-on-secondary-container text-label-mono font-label-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {" "}6 Archival Itineraries Available
                  </div>
                </div>
                <h1 className="font-display text-display text-primary tracking-tight font-normal pt-space-xs">Designed for the open road.</h1>
              </div>
              <div className="md:col-span-4 flex flex-col justify-end pt-space-md md:pt-space-lg">
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Hand-surveyed alpine passes, precision coastal transversals, and verified asphalt stages strictly matched to HALDEN chassis specifications, aerodynamic balance, and thermal endurance.</p>
                <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-mono text-label-mono uppercase tracking-widest">
                  <span>{"SURVEY VERIFIED // 2024.Q3"}</span>
                  <span className="text-primary font-bold">100% PAVED AS数PHALT</span>
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 2: MINIMAL FILTER & AUDIT BAR */}
          <section className="w-full px-gutter-mobile md:px-margin pb-space-xl">
            <div className="bg-surface-container-low p-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
              <div className="flex flex-wrap items-center gap-y-space-sm gap-x-space-lg">
                {/* Region Filter */}
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline mr-space-xs">Region:</span>
                  {REGIONS.map((r) => (
                    <button key={r} aria-pressed={region === r} className={chip(region === r)} onClick={() => setRegion(r)} type="button">
                      {r}
                      {region === r ? " [●]" : ""}
                    </button>
                  ))}
                </div>
                <div className="hidden xl:block w-px h-6 bg-outline-variant" />
                {/* Duration Filter */}
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline mr-space-xs">Duration:</span>
                  {DURATIONS.map(([label], i) => (
                    <button key={label} aria-pressed={duration === i} className={chip(duration === i)} onClick={() => setDuration(i)} type="button">
                      {label}
                      {duration === i && i > 0 ? " [●]" : ""}
                    </button>
                  ))}
                </div>
                <div className="hidden xl:block w-px h-6 bg-outline-variant" />
                {/* Season Filter */}
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline mr-space-xs">Season:</span>
                  {SEASONS.map(([id, label]) => (
                    <button key={id} aria-pressed={season === id} className={chip(season === id)} onClick={() => setSeason(season === id ? null : id)} type="button">
                      {label}
                      {season === id ? " [●]" : ""}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-space-md pt-space-xs lg:pt-0">
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">
                  {"SORT //"}{" "}
                  <span className="text-primary font-bold">{"ELEVATION & ROAD QUALITY"}</span>
                </span>
                <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
              </div>
            </div>
          </section>
          {/* SECTION 3: FULL-WIDTH FEATURED ROUTE BAND */}
          <section className="w-full px-gutter-mobile md:px-margin pb-space-xl">
            <div className="relative w-full bg-surface-container-high overflow-hidden">
              {/* 21:9 Aspect Ratio Hero Banner */}
              <div className="w-full aspect-[21/9] min-h-[380px] relative bg-inverse-surface">
                <Photo src={media.journeyHighAlpineHero} alt="The High Alpine Transversal Switzerland mountain pass road" className="w-full h-full object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-inverse-surface/90 via-inverse-surface/60 to-transparent" />
                {/* Live Elevation Sparkline overlay inside image (archival aesthetic) */}
                <div className="absolute top-space-md right-space-md hidden sm:flex flex-col items-end gap-1 bg-inverse-surface/80 p-space-sm backdrop-blur-sm">
                  <span className="font-label-mono text-label-mono uppercase text-[#A0B9A8] tracking-widest">{"ELEVATION PROFILE // PEAK 2,436 M"}</span>
                  <svg className="w-48 h-8 text-[#A0B9A8]" fill="none" stroke="currentColor" viewBox="0 0 192 32">
                    <polyline points="0,28 32,24 64,12 96,2 128,16 160,8 192,26" strokeLinecap="square" strokeWidth="1.5" />
                    <circle className="fill-current text-primary-fixed" cx="96" cy="2" r="2.5" />
                  </svg>
                </div>
                {/* Hero Content Overlay */}
                <div className="absolute inset-0 p-space-md md:p-space-xl flex flex-col justify-end max-w-2xl text-[#F8FAF6]">
                  <div className="flex items-center gap-space-sm mb-space-xs">
                    <span className="px-space-xs py-0.5 bg-[#A0B9A8] text-inverse-surface font-label-mono text-label-mono uppercase font-bold tracking-widest">FEATURED ITINERARY</span>
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-[#A0B9A8]">{"SWITZERLAND // STAGE 01"}</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-[#F8FAF6] mb-space-xs">The High Alpine Transversal</h2>
                  <p className="font-label-mono text-label-mono uppercase tracking-wider text-[#A0B9A8] mb-space-sm">{"CHASSIS STAGE 01 · GOTTHARD, FURKA, GRIMSEL & SUSTEN"}</p>
                  <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-md mb-space-md font-spec-numeral text-spec-numeral text-[#F8FAF6]/90">
                    <span className="bg-surface-container-highest/20 px-space-sm py-1">3 DAYS</span>
                    <span className="bg-surface-container-highest/20 px-space-sm py-1">640 KM</span>
                    <span className="bg-surface-container-highest/20 px-space-sm py-1">4 HIGH PASSES</span>
                    <span className="bg-surface-container-highest/20 px-space-sm py-1">MAX 2,436 M</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pt-space-xs">
                    <div className="flex flex-col">
                      <span className="font-label-mono text-label-mono text-[#A0B9A8] uppercase tracking-widest">RECOMMENDED CHASSIS CLASS</span>
                      <span className="font-action text-action text-[#F8FAF6]">Archival Grand Tourer / Twin-Turbo V8</span>
                    </div>
                    <Link className="inline-flex items-center gap-space-sm bg-primary-container text-on-primary font-action text-action uppercase tracking-widest px-space-lg py-space-sm hover:bg-primary transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Explore itinerary</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 4: ASYMMETRIC EDITORIAL ARCHIVE GRID (6 ROUTES) */}
          <section className="w-full px-gutter-mobile md:px-margin pb-space-xl">
            <div className="flex items-baseline justify-between mb-space-md">
              <div>
                <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary font-bold block">COLLECTION INDEX</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Curated Road Transversals</h3>
              </div>
              <div className="hidden sm:flex items-center gap-space-sm text-outline font-label-mono text-label-mono uppercase"><span aria-live="polite">{count === ROUTES.length ? "ARCHIVAL PLACARDS 01 — 06" : `${String(count).padStart(2, "0")} OF 06 PLACARDS`}</span></div>
            </div>
            {count === 0 && (
              <p className="font-body-md text-body-md text-on-surface-variant py-space-lg">No curated route matches these filters yet — try another region or duration.</p>
            )}
            {/* 6 Placard Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {/* Route 01: The High Alpine Transversal */}
              <article hidden={!show(0)} className="bg-surface-container-lowest flex flex-col justify-between group">
                <div className="p-space-md pb-0">
                  <div className="flex items-center justify-between font-label-mono text-label-mono uppercase text-outline tracking-widest mb-space-sm">
                    <span>{"SWITZERLAND // STAGE 01"}</span>
                    <span className="text-primary font-bold">№ 01</span>
                  </div>
                  {/* 3:4 Aspect Portrait Image */}
                  <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container"><Photo src={media.journeyHighAlpineCard} alt="The High Alpine Transversal" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 767px) 100vw, 52vw" /></div>
                </div>
                <div className="p-space-md flex flex-col grow justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-normal">The High Alpine Transversal</h4>
                    <div className="font-spec-numeral text-spec-numeral text-secondary mb-space-sm">3 DAYS · 640 KM · 4 PASSES · 2,436 M</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">The quadruple alpine pass benchmark across Gotthard, Furka, Grimsel, and Susten, engineering pure suspension deflection.</p>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">CLASS: GRAND TOURER</span>
                    <Link className="inline-flex items-center gap-1 font-action text-action uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Particulars</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
              {/* Route 02: The Maritime Corniches */}
              <article hidden={!show(1)} className="bg-surface-container-lowest flex flex-col justify-between group">
                <div className="p-space-md pb-0">
                  <div className="flex items-center justify-between font-label-mono text-label-mono uppercase text-outline tracking-widest mb-space-sm">
                    <span>{"FRANCE & MONACO // STAGE 02"}</span>
                    <span className="text-primary font-bold">№ 02</span>
                  </div>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container"><Photo src={media.journeyMaritimeCorniches} alt="The Maritime Corniches" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 767px) 100vw, 29vw" /></div>
                </div>
                <div className="p-space-md flex flex-col grow justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-normal">The Maritime Corniches</h4>
                    <div className="font-spec-numeral text-spec-numeral text-secondary mb-space-sm">2 DAYS · 380 KM · 3 CORNICHES · 520 M</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">Bespoke coastal tiers carved between Nice and Menton, offering sheer limestone drop-offs against the Mediterranean floor.</p>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">CLASS: OPEN SPIDER / CABRIO</span>
                    <Link className="inline-flex items-center gap-1 font-action text-action uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Particulars</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
              {/* Route 03: Dolomiti Alta Via */}
              <article hidden={!show(2)} className="bg-surface-container-lowest flex flex-col justify-between group">
                <div className="p-space-md pb-0">
                  <div className="flex items-center justify-between font-label-mono text-label-mono uppercase text-outline tracking-widest mb-space-sm">
                    <span>{"NORTHERN ITALY // STAGE 03"}</span>
                    <span className="text-primary font-bold">№ 03</span>
                  </div>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container"><Photo src={media.journeyDolomiti} alt="Dolomiti Alta Via" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 767px) 100vw, 29vw" /></div>
                </div>
                <div className="p-space-md flex flex-col grow justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-normal">Dolomiti Alta Via</h4>
                    <div className="font-spec-numeral text-spec-numeral text-secondary mb-space-sm">4 DAYS · 720 KM · 6 PASSES · 2,239 M</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">Pordoi, Sella, and Giau transversals navigating vertical pale dolomite walls, hairpin switchbacks, and high alpine passes.</p>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">CLASS: MID-ENGINE SPORT</span>
                    <Link className="inline-flex items-center gap-1 font-action text-action uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Particulars</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
              {/* Route 04: Grossglockner High Alpine */}
              <article hidden={!show(3)} className="bg-surface-container-lowest flex flex-col justify-between group">
                <div className="p-space-md pb-0">
                  <div className="flex items-center justify-between font-label-mono text-label-mono uppercase text-outline tracking-widest mb-space-sm">
                    <span>{"AUSTRIA // STAGE 04"}</span>
                    <span className="text-primary font-bold">№ 04</span>
                  </div>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container"><Photo src={media.alpinePass} alt="Grossglockner High Alpine" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 767px) 100vw, 52vw" /></div>
                </div>
                <div className="p-space-md flex flex-col grow justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-normal">Grossglockner High Alpine</h4>
                    <div className="font-spec-numeral text-spec-numeral text-secondary mb-space-sm">3 DAYS · 510 KM · GLACIAL CREST · 2,571 M</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">{"Austria's engineered masterpiece climbing through Hohe Tauern National Park to the base of the Pasterze Glacier tongue."}</p>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">CLASS: CHASSIS ALL-WHEEL GT</span>
                    <Link className="inline-flex items-center gap-1 font-action text-action uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Particulars</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
              {/* Route 05: The Engadin & Bernina Traverse */}
              <article hidden={!show(4)} className="bg-surface-container-lowest flex flex-col justify-between group">
                <div className="p-space-md pb-0">
                  <div className="flex items-center justify-between font-label-mono text-label-mono uppercase text-outline tracking-widest mb-space-sm">
                    <span>{"SWITZERLAND & ITALY // STAGE 05"}</span>
                    <span className="text-primary font-bold">№ 05</span>
                  </div>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container"><Photo src={media.rangeRoverAlpineLake} alt="The Engadin and Bernina Traverse" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 767px) 100vw, 52vw" /></div>
                </div>
                <div className="p-space-md flex flex-col grow justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-normal">{"The Engadin & Bernina Traverse"}</h4>
                    <div className="font-spec-numeral text-spec-numeral text-secondary mb-space-sm">3 DAYS · 490 KM · 3 PASSES · 2,328 M</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">High-elevation Engadin plateaus past Saint Moritz, crossing the glaciers of Bernina into the sun-drenched vineyards of Valtellina.</p>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">CLASS: ARCHIVAL LUXURY SUV</span>
                    <Link className="inline-flex items-center gap-1 font-action text-action uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Particulars</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
              {/* Route 06: Lake Como & Splügen Pass */}
              <article hidden={!show(5)} className="bg-surface-container-lowest flex flex-col justify-between group">
                <div className="p-space-md pb-0">
                  <div className="flex items-center justify-between font-label-mono text-label-mono uppercase text-outline tracking-widest mb-space-sm">
                    <span>{"ITALY & SWITZERLAND // STAGE 06"}</span>
                    <span className="text-primary font-bold">№ 06</span>
                  </div>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-surface-container"><Photo src={media.lexusLakeComo} alt="Lake Como and Splügen Pass" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" sizes="(max-width: 767px) 100vw, 29vw" /></div>
                </div>
                <div className="p-space-md flex flex-col grow justify-between">
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-normal">{"Lake Como & Splügen Pass"}</h4>
                    <div className="font-spec-numeral text-spec-numeral text-secondary mb-space-sm">2 DAYS · 340 KM · 2 PASSES · 2,115 M</div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">From the neoclassical shoreline villas of Tremezzo to the vertigo-inducing narrow switchbacks of the Splügen crest into Graubünden.</p>
                  </div>
                  <div className="pt-space-sm flex items-center justify-between">
                    <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline">CLASS: GRAND TOURING COUPE</span>
                    <Link className="inline-flex items-center gap-1 font-action text-action uppercase tracking-widest text-primary hover:text-on-surface transition-colors" href="/journeys/high-alpine-transversal">
                      <span>Particulars</span>
                      {" "}
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </section>
          {/* SECTION 5: ARCHIVAL NOTE BANNER */}
          <section className="w-full px-gutter-mobile md:px-margin pb-space-xl">
            <div className="bg-surface-container-low p-space-lg md:p-space-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
                <div className="md:col-span-4">
                  <span className="font-label-mono text-label-mono uppercase tracking-widest text-outline block mb-space-xs">{"PROTOCOL // CURATORIAL ADVISORY"}</span>
                  <h3 className="font-headline-sm text-headline-sm text-primary">{"Pre-Dispatch Logistics & Waypoint Guidance"}</h3>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-gutter text-on-surface-variant">
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-2 text-primary font-action text-action uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[20px]">severe_cold</span>
                      <span>Pass Clearances</span>
                    </div>
                    <p className="font-body-sm text-body-sm leading-relaxed">Alpine passes operate on strict seasonal windows (June–October). Real-time telemetry notifies patrons of snow clearances or detour alternates.</p>
                  </div>
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-2 text-primary font-action text-action uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[20px]">alt_route</span>
                      <span>Encrypted Navigation</span>
                    </div>
                    <p className="font-body-sm text-body-sm leading-relaxed">Vehicles are pre-loaded with custom offline GPS itineraries with pre-scouted asphalt condition ratings and private fuel reserves.</p>
                  </div>
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-2 text-primary font-action text-action uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[20px]">concierge</span>
                      <span>Concierge Sanctions</span>
                    </div>
                    <p className="font-body-sm text-body-sm leading-relaxed">Direct integration with partnered private villas, high-pass lodges, and secured overnight covered garaging throughout Western Europe.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-[#171B19] text-[#F8FAF6] pt-space-xl pb-space-lg">
        <div className="w-full px-gutter-mobile md:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-space-xl">
            <div className="md:col-span-5 flex flex-col justify-between">
              <div className="space-y-space-sm">
                <span className="font-headline-md text-headline-md tracking-wider uppercase text-[#F8FAF6] block">HALDEN</span>
                <p className="font-body-sm text-body-sm text-[#A0B9A8] max-w-sm">An architectural catalogue of automotive craft, honoring rare provenance, mechanical sculpture, and grand touring heritage.</p>
              </div>
              <div className="pt-space-md"><span className="font-label-mono text-label-mono tracking-widest uppercase text-[#737973]">{"CATALOGUE DIVISION // GENEVA • MUNICH • COMO"}</span></div>
            </div>
            <div className="md:col-span-3 space-y-space-sm">
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-[#A0B9A8] block mb-space-sm">Exhibition</span>
              <ul className="space-y-space-xs font-action text-action">
                <li className="h-6"><Link className="text-[#F8FAF6]/80 hover:text-[#F8FAF6] transition-colors" href="/fleet">Fleet Archive</Link></li>
                <li className="h-6"><Link className="text-[#F8FAF6]/80 hover:text-[#F8FAF6] transition-colors" href="/journeys">Curated Journeys</Link></li>
                <li className="h-6"><Link className="text-[#F8FAF6]/80 hover:text-[#F8FAF6] transition-colors" href="/about">{"The Atelier & Provenance"}</Link></li>
                <li className="h-6"><Link className="text-[#F8FAF6]/80 hover:text-[#F8FAF6] transition-colors" href="/account">Private Patron Ledger</Link></li>
              </ul>
            </div>
            <div className="md:col-span-4 space-y-space-sm">
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-[#A0B9A8] block mb-space-sm">Archival Disclaimer</span>
              <p className="font-body-sm text-body-sm text-[#737973] leading-relaxed">Vehicles preserved within the HALDEN collection are accessioned under private curatorial charters. Access to select historical machinery is granted exclusively to credentialed patrons for sanctioned transcontinental itineraries and private concourse exhibitions.</p>
            </div>
          </div>
          <div className="pt-space-md flex flex-col md:flex-row items-baseline justify-between gap-space-sm">
            <span className="font-label-mono text-label-mono text-[#737973] uppercase">© 2024 HALDEN ARCHIVE. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-space-md font-label-mono text-label-mono text-[#737973] uppercase">
              <Link className="hover:text-[#F8FAF6] transition-colors" href="/about">Curatorial Registry</Link>
              <span>•</span>
              <Link className="hover:text-[#F8FAF6] transition-colors" href="/about">Terms of Custody</Link>
              <span>•</span>
              <Link className="hover:text-[#F8FAF6] transition-colors" href="/about">Conservation Protocol</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
