"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lightbox } from "@/components/vehicle/Lightbox";
import { useTrip } from "@/components/vehicle/useTrip";
import type { Vehicle } from "@/data/vehicles";
import { formatDay, formatDayTimeYear, formatEuro } from "@/lib/itinerary";
import { SECURITY_DEPOSIT } from "@/lib/pricing";

/** Desktop vehicle detail — Stitch screen 19 ("Range Rover Autobiography (S3)"). Shown from md up. */
export function VehicleDesktop({ vehicle: v, similar }: { vehicle: Vehicle; similar: Vehicle[] }) {
  const { itinerary, days, quote, query } = useTrip(v);
  const [viewer, setViewer] = useState<number | null>(null);
  const photos = v.gallery.length ? v.gallery : [{ src: v.image, alt: v.imageAlt }];
  const [main, side1, side2, ...details] = photos;
  const loc = itinerary.location;

  return (
    <div className="hidden md:block bg-[#F5F3EE] text-[#171A18] antialiased selection:bg-[#344A3D] selection:text-[#F5F3EE]">
      {/* MainHeader */}
      <header className="sticky top-0 z-50 bg-[#F5F3EE] border-b border-[#D8D6CE]">
        <div className="max-w-[1320px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Link className="font-sans font-semibold text-lg uppercase tracking-[0.25em] text-[#171A18]" href="/">
              HALDEN
            </Link>
          </div>
          <nav aria-label="Primary" className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-widest font-sans font-medium text-[#171A18]">
            <Link className="border-b border-[#171A18] pb-1" href={`/fleet?${query}`} aria-current="page">
              Fleet
            </Link>
            <Link className="text-[#666B65] hover:text-[#171A18] transition-colors duration-150 pb-1" href="/#journeys">
              Journeys
            </Link>
            <Link className="text-[#666B65] hover:text-[#171A18] transition-colors duration-150 pb-1" href="/#about">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-6">
            <Link className="text-xs uppercase tracking-wider font-sans text-[#666B65] hover:text-[#171A18] transition-colors" href="/sign-in">
              Sign in
            </Link>
            <Link
              className="border border-[#171A18] text-[#171A18] hover:bg-[#171A18] hover:text-[#F5F3EE] transition-colors duration-200 px-4 py-2 text-xs tracking-wider uppercase font-medium rounded-[2px]"
              href={`/book/${v.slug}/trip?${query}`}
            >
              Book a car
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1320px] mx-auto px-6 pt-8 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 font-mono text-xs text-[#666B65] uppercase tracking-wider">
            <li>
              <Link className="hover:text-[#171A18] transition-colors" href={`/fleet?${query}`}>
                Fleet
              </Link>
            </li>
            <li className="select-none" aria-hidden>
              /
            </li>
            <li>
              <Link className="hover:text-[#171A18] transition-colors" href={`/fleet?category=${v.category}&${query}`}>
                {v.categoryLabel}
              </Link>
            </li>
            <li className="select-none" aria-hidden>
              /
            </li>
            <li aria-current="page" className="text-[#171A18] font-medium">
              {v.model}
            </li>
          </ol>
        </nav>

        {/* TitleBlock */}
        <section className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D8D6CE] pb-8 mb-8">
          <div className="mb-6 md:mb-0">
            <div className="font-mono text-xs uppercase tracking-widest text-[#666B65] mb-2">
              {v.brand.toUpperCase()} · EXHIBIT {v.exhibit}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171A18] font-normal tracking-tight mb-2">{v.model}</h1>
            <p className="font-sans text-sm md:text-base text-[#666B65]">
              {v.subtitle ?? `${v.categoryLabel} · ${v.year} · ${v.seatsLabel} · Self-Drive`}
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="font-mono mb-1">
              <span className="text-4xl font-normal text-[#171A18]">€{v.pricePerDay}</span>
              <span className="text-sm text-[#666B65] tracking-normal"> / day</span>
            </div>
            <div className={`flex items-center gap-2 text-xs md:text-sm font-medium ${v.available ? "text-[#2d5a3f]" : "text-[#666B65]"}`}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  fillRule="evenodd"
                />
              </svg>
              <span>
                {v.available ? "Available" : "Unavailable"} for your dates ({formatDay(itinerary.from)} – {formatDay(itinerary.to)})
              </span>
            </div>
          </div>
        </section>

        {/* Exhibition Gallery Wall */}
        <section aria-label="Vehicle Exhibition Gallery" className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className={`${side1 ? "lg:col-span-2" : "lg:col-span-3"} relative group overflow-hidden bg-[#EAE8E1] h-[360px] sm:h-[460px] lg:h-[500px]`}>
              <button type="button" onClick={() => setViewer(0)} className="absolute inset-0 w-full h-full" aria-label={`Open photo: ${main.alt}`}>
                <Image
                  alt={main.alt}
                  src={main.src}
                  fill
                  preload
                  quality={90}
                  sizes={side1 ? "(min-width: 1320px) 860px, (min-width: 1024px) 66vw, 100vw" : "(min-width: 1320px) 1272px, 100vw"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </button>
              <button
                type="button"
                onClick={() => setViewer(0)}
                className="absolute bottom-4 right-4 bg-[#171A18]/80 hover:bg-[#171A18] text-white backdrop-blur-sm px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-[2px] transition duration-200"
              >
                View all {photos.length} {photos.length === 1 ? "photo" : "photos"}
              </button>
            </div>
            {side1 && (
              <div className="flex flex-col gap-4">
                {[side1, side2].filter(Boolean).map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setViewer(i + 1)}
                    aria-label={`Open photo: ${p.alt}`}
                    className="relative overflow-hidden bg-[#EAE8E1] h-[242px]"
                  >
                    <Image alt={p.alt} src={p.src} fill quality={90} sizes="(min-width: 1320px) 420px, 33vw" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  </button>
                ))}
              </div>
            )}
          </div>
          {v.provenance && <div className="font-mono text-xs text-[#666B65] mb-4">{v.provenance}</div>}
          {details.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {details.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setViewer(i + 3)}
                  aria-label={`Open photo: ${p.alt}`}
                  className="relative overflow-hidden bg-[#EAE8E1] h-[200px]"
                >
                  <Image alt={p.alt} src={p.src} fill sizes="(min-width: 1320px) 420px, 33vw" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </button>
              ))}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <section aria-label="About this car">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171A18] font-normal mb-4">{v.headline}</h2>
              <div className="font-sans text-[#4A4F49] text-base leading-relaxed space-y-4">
                {v.narrative.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            <div className="border-t border-[#D8D6CE] my-10" />

            <section aria-label="Vehicle Specifications">
              <div className="font-mono uppercase text-xs tracking-wider text-[#666B65] mb-2">01 / MECHANICAL SPECIFICATIONS</div>
              <h3 className="font-serif text-2xl text-[#171A18] mb-6">Technical dossier</h3>
              <dl className="divide-y divide-[#D8D6CE] border-t border-[#D8D6CE] border-b">
                {v.specs.map((s) => (
                  <div key={s.label} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <dt className="text-[#666B65] font-sans mb-1 sm:mb-0">{s.label}</dt>
                    <dd className="font-mono text-[#171A18]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="border-t border-[#D8D6CE] my-10" />

            <section aria-label="Features and Amenities">
              <div className="font-mono uppercase text-xs tracking-wider text-[#666B65] mb-2">02 / EXHIBITION CURATION</div>
              <h3 className="font-serif text-2xl text-[#171A18] mb-6">Standard amenities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {v.amenities.map((a) => (
                  <li key={a} className="flex items-start space-x-3">
                    <span className="text-[#344A3D] mt-0.5" aria-hidden>
                      ―
                    </span>
                    <span className="font-sans text-sm text-[#4A4F49]">{a}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-[#D8D6CE] my-10" />

            <section aria-label="Pick-up and Handover Logistics">
              <div className="font-mono uppercase text-xs tracking-wider text-[#666B65] mb-2">03 / PICK-UP &amp; RETURN</div>
              <h3 className="font-serif text-2xl text-[#171A18] mb-4">Curbside delivery at {loc.label}</h3>
              <div className="bg-[#EAE8E1] border border-[#D8D6CE] p-6 mb-6 rounded-[2px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-3 border-b border-[#D8D6CE]">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#171A18]">{loc.terminalPoint}</span>
                  <span className="font-mono text-xs text-[#666B65] mt-1 md:mt-0">Coordinates: {loc.coordinates}</span>
                </div>
                <div className="space-y-2 font-sans text-sm text-[#4A4F49]">
                  <p className="font-medium text-[#171A18]">{loc.handoverTitle}</p>
                  <p>{loc.handoverNote}</p>
                  <p className="text-xs text-[#666B65] italic">Complimentary return to any European hub by prior arrangement.</p>
                </div>
              </div>
            </section>

            <div className="border-t border-[#D8D6CE] my-10" />

            <section aria-label="Patron Criteria">
              <div className="font-mono uppercase text-xs tracking-wider text-[#666B65] mb-2">04 / TERMS</div>
              <h3 className="font-serif text-2xl text-[#171A18] mb-4">Patron criteria</h3>
              <ul className="font-sans text-sm text-[#4A4F49] space-y-2 list-none">
                <li className="flex items-start">
                  <span className="text-[#344A3D] mr-2">·</span>
                  Minimum driver age: 28 years with valid driver’s license held for at least 3 years.
                </li>
                <li className="flex items-start">
                  <span className="text-[#344A3D] mr-2">·</span>
                  Pre-authorisation security deposit: {formatEuro(SECURITY_DEPOSIT)} held on major credit card.
                </li>
                <li className="flex items-start">
                  <span className="text-[#344A3D] mr-2">·</span>
                  Comprehensive zero-excess European coverage included in quoted daily rate.
                </li>
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Booking Dossier */}
          <aside className="lg:col-span-4" aria-label="Reservation dossier">
            <div className="sticky top-28 bg-[#FFFFFF] border border-[#D8D6CE] p-8 shadow-none rounded-[2px]">
              <div className="font-mono uppercase text-xs tracking-wider text-[#666B65] mb-1">RESERVATION DOSSIER</div>
              <div className="font-mono text-3xl font-normal text-[#171A18] mb-6">
                €{v.pricePerDay} <span className="text-sm text-[#666B65]">/ day</span>
              </div>
              <div className="border border-[#EAE8E1] bg-[#F8FAF6] p-3.5 mb-3 rounded-[2px]">
                <div className="font-mono text-[11px] text-[#666B65] uppercase mb-1">Pick-up &amp; Handover</div>
                <div className="font-sans font-medium text-[#171A18] text-sm">{loc.longLabel}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 border border-[#EAE8E1] bg-[#F8FAF6] p-3.5 mb-6 rounded-[2px]">
                <div>
                  <div className="font-mono text-[10px] text-[#666B65] uppercase">Pick-up</div>
                  <div className="font-sans font-medium text-[#171A18] text-xs mt-0.5">{formatDayTimeYear(itinerary.from)}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-[#666B65] uppercase">Return</div>
                  <div className="font-sans font-medium text-[#171A18] text-xs mt-0.5">{formatDayTimeYear(itinerary.to)}</div>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#EAE8E1] mt-1 font-mono text-[11px] text-[#344A3D] font-medium">
                  {days} {days === 1 ? "day" : "days"} rental duration
                </div>
              </div>
              <div className="font-mono text-xs text-[#4A4F49] space-y-2.5 mb-6">
                <div className="flex justify-between items-center">
                  <span>
                    €{v.pricePerDay} × {days} {days === 1 ? "day" : "days"}
                  </span>
                  <span className="text-[#171A18]">{formatEuro(quote.rental)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Curbside concierge handover</span>
                  <span className="text-[#2d5a3f]">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Comprehensive Alpine insurance</span>
                  <span className="text-[#2d5a3f]">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cross-border passes (CH/AT/DE)</span>
                  <span className="text-[#2d5a3f]">Included</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>VAT &amp; environmental surcharge</span>
                  <span className="text-[#171A18]">{formatEuro(quote.vat)}</span>
                </div>
                <div className="border-t border-[#D8D6CE] pt-3 flex justify-between items-center text-sm font-semibold text-[#171A18]">
                  <span>Estimated total</span>
                  <span>{formatEuro(quote.total)}</span>
                </div>
              </div>
              <Link
                href={`/book/${v.slug}/trip?${query}`}
                className="block w-full bg-[#344A3D] text-[#F5F3EE] py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#28392f] transition duration-200 rounded-[2px] mb-3 text-center"
              >
                Reserve this car
              </Link>
              <div className="text-center font-mono text-[11px] text-[#666B65] leading-relaxed">
                Nothing is charged yet. Concierge confirmation within 2 hours.
              </div>
              <div className="text-center text-xs text-[#666B65] mt-4 pt-4 border-t border-[#EAE8E1]">
                Prefer personal booking?{" "}
                <a className="underline text-[#171A18] hover:text-[#344A3D] transition" href="tel:+41448002400">
                  Call Concierge Desk
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Similar Cars */}
      <section aria-label="Similar exhibition vehicles" className="bg-[#F5F3EE] border-t border-[#D8D6CE] pt-16 pb-24">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="font-mono uppercase text-xs tracking-wider text-[#666B65] mb-2">THE COLLECTION</div>
          <h2 className="font-serif text-3xl text-[#171A18] mb-8 font-normal">Similar exhibition vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similar.map((s) => (
              <Link key={s.slug} href={`/fleet/${s.slug}?${query}`} className="bg-[#F5F3EE] flex flex-col group">
                <div className="relative overflow-hidden bg-[#EAE8E1] h-[240px] mb-4">
                  <Image
                    alt={s.imageAlt}
                    src={s.image}
                    fill
                    sizes="(min-width: 1320px) 410px, 33vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#666B65] uppercase mb-1">
                  <span>
                    {s.brand.toUpperCase()} · EXHIBIT {s.exhibit}
                  </span>
                  <span className={s.available ? "text-emerald-700" : ""}>● {s.available ? "Available" : "Unavailable"}</span>
                </div>
                <h3 className="font-serif text-xl text-[#171A18] mb-2 font-normal">{s.model}</h3>
                <div className="border-t border-[#D8D6CE] pt-2 mt-auto flex items-center justify-between">
                  <span className="font-sans text-xs text-[#666B65]">{s.specLine}</span>
                  <span className="font-mono text-sm font-medium text-[#171A18]">
                    €{s.pricePerDay} <span className="text-xs text-[#666B65] font-normal">/ day</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#171B19] text-[#F5F3EE] py-16">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="font-sans font-bold text-lg tracking-[0.25em] text-[#F5F3EE]">HALDEN</div>
              <p className="font-sans text-sm text-[#8E948F] leading-relaxed max-w-sm">
                Curated grand touring vehicles and curbside concierge delivery across Munich, Zurich, Milan, and Geneva.
                Designed for patrons of architectural travel.
              </p>
            </div>
            <FooterCol
              title="Fleet"
              links={[
                ["All Exhibits", "/fleet"],
                ["Alpine SUVs", "/fleet?category=suv"],
                ["Grand Tourers", "/fleet?category=sports"],
                ["Executive Saloons", "/fleet?category=sedan"],
              ]}
            />
            <FooterCol
              title="Locations"
              links={[
                ["Munich (MUC)", "/fleet?loc=muc"],
                ["Zurich (ZRH)", "/fleet?loc=zrh"],
                ["Geneva (GVA)", "/fleet?loc=gva"],
                ["Milan Malpensa (MXP)", "/fleet?loc=mxp"],
              ]}
            />
            <FooterCol
              title="Support"
              links={[
                ["Concierge Desk", "tel:+41448002400"],
                ["Alpine Insurance Terms", "/#about"],
                ["Chauffeur Protocols", "/#standard"],
                ["Direct Dispatch", "tel:+41448002400"],
              ]}
            />
          </div>
          <div className="pt-8 border-t border-[#262C29] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#6B726C]">
            <div>© 2025 HALDEN MOBILITY GROUP AG. ALL RIGHTS RESERVED.</div>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link className="hover:text-white transition" href="/#about">
                Privacy Policy
              </Link>
              <Link className="hover:text-white transition" href="/#about">
                Terms of Exhibition
              </Link>
              <Link className="hover:text-white transition" href="/#about">
                Impressum
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {viewer != null && <Lightbox photos={photos} index={viewer} onIndex={setViewer} onClose={() => setViewer(null)} />}
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="space-y-3">
      <div className="font-mono text-xs uppercase tracking-wider text-[#A2A9A3]">{title}</div>
      <ul className="space-y-2 font-sans text-sm text-[#8E948F]">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link className="hover:text-white transition" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
