"use client";

import { useState } from "react";
import { MobileMenu } from "@/components/site/MobileMenu";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { media } from "@/data/media";

/** Stitch screen "" — generated from design/stitch-export-round2/halden_curated_journeys_index_mobile/code.html */
const REGIONS = ["Switzerland", "Switzerland", "France", "Italy", "Austria"]; // card order on the Stitch screen
const CHIPS = ["All", "Switzerland", "Italy", "France", "Austria"];

export function JourneysIndexMobile() {
  const [region, setRegion] = useState("All");
  const show = (i: number) => region === "All" || REGIONS[i] === region;
  return (
    <div className="md:hidden bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
        <div className="h-16 px-margin-mobile flex items-center justify-between">
          <MobileMenu variant="icon" triggerClassName="-ml-2" />
          <div className="flex flex-col items-center justify-center">
            <span className="font-display-mobile text-[19px] leading-tight tracking-[0.24em] font-normal uppercase text-on-surface">HALDEN</span>
            <span className="font-label-mono text-[9px] leading-none tracking-[0.2em] text-on-surface-variant uppercase mt-0.5">ARCHIVE</span>
          </div>
          <Link aria-label="Patron sign in" className="w-11 h-11 flex items-center justify-end shrink-0" href="/sign-in"><span className="w-8 h-8 rounded-full border border-outline-variant text-on-surface flex items-center justify-center"><span className="material-symbols-outlined text-[18px]" aria-hidden>person</span></span></Link>
        </div>
      </header>
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          {/* Section Header & Kicker */}
          <section className="px-margin-mobile pt-6 pb-5 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-primary" />
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-[0.16em]">{"03 // CURATED ROUTES"}</span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">Designed for the open road.</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">Archival itineraries engineered for mechanical affinity, dramatic topography, and deliberate pacing across Europe’s most formidable passes.</p>
          </section>
          {/* Horizontally Scrollable Filter Chips */}
          <section className="w-full pb-4">
            <div className="flex items-center gap-2 overflow-x-auto px-margin-mobile no-scrollbar scroll-smooth" id="route-filters" role="tablist">
              {CHIPS.map((c) => {
                const n = REGIONS.filter((r) => r === c).length;
                return (
                  <button
                    key={c}
                    aria-selected={region === c}
                    className={`filter-chip px-4 py-2.5 font-label-mono text-label-mono uppercase tracking-wider shrink-0 transition-colors cursor-pointer select-none ${region === c ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface"}`}
                    onClick={() => setRegion(c)}
                    role="tab"
                    type="button"
                  >
                    {c === "All" ? c : `${c} (${n})`}
                  </button>
                );
              })}
            </div>
          </section>
          {/* Featured Route Card */}
          <section className="px-margin-mobile my-2">
            <article hidden={!show(0)} className="bg-surface-container-low flex flex-col group overflow-hidden">
              {/* 16:9 Architectural Stage Photo */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-dim">
                <Photo src={media.journeyHighAlpineHero} priority alt="High Alpine Transversal Pass at Dawn" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="100vw" />
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2.5 py-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  <span className="font-label-mono text-label-mono text-on-surface tracking-widest uppercase">FEATURED ITINERARY</span>
                </div>
              </div>
              {/* Information Placard Content */}
              <div className="p-5 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"REF. CH-01 // VALAIS & URI"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-on-surface font-medium">JUN – OCT</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1 leading-snug">The High Alpine Transversal</h2>
                {/* Spec Matrix Strip */}
                <div className="grid grid-cols-3 gap-2 bg-surface-container py-3 px-3.5 my-4">
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Duration</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface mt-0.5">3 DAYS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Telemetry</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface mt-0.5">640 KM</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Elevation</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface mt-0.5">4 PASSES</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-5 line-clamp-2">From the Furka ice wall to the sweeping cobblestone switchbacks of the Tremola, curated for grand touring chassis balance and cold-air intake density.</p>
                {/* CTA Touch Floor */}
                <a className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-on-primary font-action text-action uppercase tracking-widest active:bg-primary-container transition-colors" href="#route-transversal">
                  <span>View Route</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            </article>
          </section>
          {/* Editorial Section Divider / Catalogue Sequence Label */}
          <div className="px-margin-mobile pt-8 pb-3 flex items-center justify-between">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">{"ARCHIVAL INDEX // EUROPEAN CIRCUITS"}</span>
            <span className="font-spec-numeral text-spec-numeral text-on-surface-variant">04 EXPEDITIONS</span>
          </div>
          {/* Editorial Stream of Curated Routes */}
          <section className="px-margin-mobile flex flex-col gap-6">
            {/* Route 1: Switzerland */}
            <article hidden={!show(1)} className="bg-surface-container-low flex flex-col group overflow-hidden">
              <div className="relative w-full aspect-[4/3] bg-surface-dim overflow-hidden">
                <Photo src={media.journeyHighAlpineCard} alt="Dark metallic luxury GT on high Swiss mountain pass" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 767px) 100vw, 52vw" />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider">{"SWITZERLAND // PASSO DEL GOTTARDO"}</span></div>
              </div>
              <div className="p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"ROUTE 01 // CAT. ALPINE"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium">2,429 M MAX</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1.5">The High Alpine Transversal</h3>
                <div className="flex items-center gap-4 my-3 text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">distance</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">640 KM</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">3 DAYS</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">altitude</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">4 PASSES</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">A definitive crossing connecting Andermatt to St. Moritz via the historic Furka, Grimsel, and Susten arcs. Designed for high-torsion stability.</p>
                <a className="self-start inline-flex items-center gap-2 py-2 text-primary font-action text-action uppercase tracking-widest group-hover:text-primary-container transition-colors" href="#explore-transversal">
                  <span>Explore Dossier</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </article>
            {/* Route 2: France */}
            <article hidden={!show(2)} className="bg-surface-container-low flex flex-col group overflow-hidden">
              <div className="relative w-full aspect-[4/3] bg-surface-dim overflow-hidden">
                <Photo src={media.journeyMaritimeCorniches} alt="Champagne luxury coupe driving cliffside along the Mediterranean sea" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 767px) 100vw, 29vw" />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider">{"FRANCE // CÔTE D’AZUR"}</span></div>
              </div>
              <div className="p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"ROUTE 02 // CAT. LITTORAL"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium">550 M MAX</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1.5">The Maritime Corniches</h3>
                <div className="flex items-center gap-4 my-3 text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">distance</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">310 KM</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">2 DAYS</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">YEAR-ROUND</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">A dramatic tiered cliffside journey weaving through the Basse, Moyenne, and Grande Corniches above the Mediterranean, terminating at the Cap-Ferrat peninsula.</p>
                <a className="self-start inline-flex items-center gap-2 py-2 text-primary font-action text-action uppercase tracking-widest group-hover:text-primary-container transition-colors" href="#explore-corniches">
                  <span>Explore Dossier</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </article>
            {/* Route 3: Italy */}
            <article hidden={!show(3)} className="bg-surface-container-low flex flex-col group overflow-hidden">
              <div className="relative w-full aspect-[4/3] bg-surface-dim overflow-hidden">
                <Photo src={media.journeyDolomiti} alt="Black performance coupe on the dramatic gravel and asphalt curves of the Dolomites" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 767px) 100vw, 29vw" />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider">{"ITALY // SELLA & PORDOI"}</span></div>
              </div>
              <div className="p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"ROUTE 03 // CAT. STRATIFIED ROCK"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium">2,239 M MAX</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1.5">Dolomiti Alta Via</h3>
                <div className="flex items-center gap-4 my-3 text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">distance</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">480 KM</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">3 DAYS</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">landscape</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">6 PASSES</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Pale limestone pinnacles shadow tightly radiused switchbacks through Cortina d’Ampezzo and the Sella Ring. Curated for calibrated suspension articulation.</p>
                <a className="self-start inline-flex items-center gap-2 py-2 text-primary font-action text-action uppercase tracking-widest group-hover:text-primary-container transition-colors" href="#explore-dolomiti">
                  <span>Explore Dossier</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </article>
            {/* Route 4: Austria */}
            <article hidden={!show(4)} className="bg-surface-container-low flex flex-col group overflow-hidden">
              <div className="relative w-full aspect-[4/3] bg-surface-dim overflow-hidden">
                <Photo src={media.alpinePass} alt="Curving alpine mountain pass road in high peaks with morning mist" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(max-width: 767px) 100vw, 52vw" />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-0.5"><span className="font-label-mono text-label-mono text-on-surface uppercase tracking-wider">{"AUSTRIA // HOHE TAUERN"}</span></div>
              </div>
              <div className="p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">{"ROUTE 04 // CAT. GLACIAL"}</span>
                  <span className="font-spec-numeral text-spec-numeral text-primary font-medium">2,504 M MAX</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1.5">Grossglockner High Alpine</h3>
                <div className="flex items-center gap-4 my-3 text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">distance</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">395 KM</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">2 DAYS</span>
                  </div>
                  <span className="text-outline-variant font-mono">·</span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">snowing</span>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface">MAY – NOV</span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Thirty-six numbered hairpins ascending into the heart of the Hohe Tauern National Park toward the Pasterze Glacier tongue. Flawless tarmac camber throughout.</p>
                <a className="self-start inline-flex items-center gap-2 py-2 text-primary font-action text-action uppercase tracking-widest group-hover:text-primary-container transition-colors" href="#explore-grossglockner">
                  <span>Explore Dossier</span>
                  {" "}
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </article>
          </section>
          {/* Curatorial Footer Advisory */}
          <footer className="mt-10 mx-margin-mobile p-5 bg-surface-container text-on-surface flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
              <span className="font-label-mono text-label-mono tracking-widest uppercase text-on-surface">{"CURATORIAL ADVISORY // TELEMETRY & ACCESS"}</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Alpine itineraries are synchronized daily with cantonal road monitoring networks and meteorological stations. Seasonal pass closures typically engage between November and mid-May depending on snowpack equilibrium. Halden Archive onboard GPS modules receive automatic alternate waypoints upon departure from collection hubs.</p>
            <div className="pt-3 flex items-center justify-between text-on-surface-variant font-spec-numeral text-[11px] tracking-wide">
              <span>REF: REV-2025.04</span>
              <span className="text-primary font-medium">LIVE ARCHIVE STATUS: NOMINAL</span>
            </div>
          </footer>
        </div>
      </main>
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-center h-16 px-margin-mobile">
          <Link aria-current="page" className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] transition-colors text-primary font-action" href="/fleet">
            <span className="material-symbols-outlined text-[20px]">view_carousel</span>
            <span className="font-label-mono text-[10px] tracking-wider uppercase">Gallery</span>
          </Link>
          <Link className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] text-on-surface-variant hover:text-on-surface transition-colors" href="/journeys">
            <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            <span className="font-label-mono text-[10px] tracking-wider uppercase">Index</span>
          </Link>
          <Link className="flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] text-on-surface-variant hover:text-on-surface transition-colors" href="/account">
            <span className="material-symbols-outlined text-[20px]">shield</span>
            <span className="font-label-mono text-[10px] tracking-wider uppercase">Patron</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
