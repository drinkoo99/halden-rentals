"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ItineraryEditor } from "@/components/site/ItineraryEditor";
import { countWithout, useFleetState } from "@/components/fleet/useFleetState";
import { getVehicle, brandOptions, categoryOptions, featureOptions, powertrainOptions, vehicles, type Vehicle } from "@/data/vehicles";
import { useFavourites } from "@/lib/favourites";
import { emptyFilters, PRICE_MAX, PRICE_MIN, seatOptions, sortOptions, toggle, type SortKey } from "@/lib/fleetFilters";
import { formatDayTimeCompact, rentalDays } from "@/lib/itinerary";

const PER_PAGE = 6;

/** Desktop fleet discovery — Stitch screen 12 ("The Collection | Fleet Discovery"). Shown from lg up. */
export function FleetDesktop() {
  const { filters, setFilters, itinerary, setItinerary, results, page, setPage, tripQuery } = useFleetState();
  const [editing, setEditing] = useState(false);
  const days = rentalDays(itinerary.from, itinerary.to);
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = results.slice((current - 1) * PER_PAGE, current * PER_PAGE);
  const curator = getVehicle("lexus-lc-500")!;

  const chips: { label: string; remove: () => void }[] = [
    ...filters.categories.map((c) => ({
      label: categoryOptions.find((o) => o.value === c)?.label ?? c,
      remove: () => setFilters({ ...filters, categories: toggle(filters.categories, c) }),
    })),
    ...filters.brands.map((b) => ({ label: b, remove: () => setFilters({ ...filters, brands: toggle(filters.brands, b) }) })),
    ...(filters.seats != null
      ? [{ label: `${filters.seats}${filters.seats === 7 ? "+" : ""} Seats`, remove: () => setFilters({ ...filters, seats: null }) }]
      : []),
    ...(filters.transmission !== "any"
      ? [{ label: filters.transmission === "automatic" ? "Auto" : "Manual", remove: () => setFilters({ ...filters, transmission: "any" }) }]
      : []),
    ...(filters.maxPrice != null || filters.minPrice != null
      ? [
          {
            label: `${filters.minPrice != null ? `€${filters.minPrice}–` : "Up to "}€${filters.maxPrice ?? PRICE_MAX}/day`,
            remove: () => setFilters({ ...filters, minPrice: null, maxPrice: null }),
          },
        ]
      : []),
    ...filters.powertrains.map((p) => ({
      label: powertrainOptions.find((o) => o.value === p)?.label ?? p,
      remove: () => setFilters({ ...filters, powertrains: toggle(filters.powertrains, p) }),
    })),
    ...filters.features.map((x) => ({
      label: featureOptions.find((o) => o.value === x)?.label ?? x,
      remove: () => setFilters({ ...filters, features: toggle(filters.features, x) }),
    })),
  ];

  // No price filter = slider at the top of the range, so the label never claims a limit that isn't applied
  const maxPrice = filters.maxPrice ?? PRICE_MAX;
  const clearAll = () => setFilters(emptyFilters(filters.sort));

  return (
    <div className="hidden lg:flex min-h-screen bg-ivory text-ink flex-col selection:bg-forest selection:text-ivory">
      {/* 1. SOLID IVORY HEADER */}
      <header className="w-full bg-ivory border-b border-stone-dim sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-[0.28em] font-sans text-ink uppercase">
            HALDEN
          </Link>
          <nav aria-label="Primary" className="flex items-center space-x-10 text-sm font-medium">
            <Link href="/fleet" aria-current="page" className="text-forest font-semibold tracking-wide border-b-2 border-forest pb-1 -mb-[1px]">
              Fleet
            </Link>
            <Link href="/journeys" className="text-muted hover:text-ink transition-colors tracking-wide">
              Journeys
            </Link>
            <Link href="/about" className="text-muted hover:text-ink transition-colors tracking-wide">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/sign-in" className="text-muted hover:text-ink font-medium tracking-wide">
              Sign in
            </Link>
            <Link
              href={`/book/${results[0]?.slug ?? vehicles[0].slug}/trip?${tripQuery}`}
              className="px-5 py-2.5 border border-ink text-ink hover:bg-ink hover:text-ivory rounded-[2px] transition-all duration-200 text-xs font-semibold uppercase tracking-wider"
            >
              Book a car
            </Link>
          </div>
        </div>
        {/* Search Summary Strip */}
        <div className="w-full bg-stone border-b border-stone-dim">
          <div className="max-w-[1440px] mx-auto px-8 py-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-3 text-ink tracking-tight">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-forest" />
              <span className="font-medium text-ink">{itinerary.location.label}</span>
              <span className="text-stone-dim">·</span>
              <span className="text-muted">
                {formatDayTimeCompact(itinerary.from)} → {formatDayTimeCompact(itinerary.to)}
              </span>
              <span className="text-stone-dim">·</span>
              <span className="bg-ivory border border-stone-dim px-2 py-0.5 rounded-[2px] text-ink font-mono text-[11px]">
                {days} {days === 1 ? "day" : "days"} rental
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center space-x-1.5 text-xs text-forest hover:underline font-mono uppercase tracking-wider font-medium"
            >
              <span>Edit itinerary</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTAINER */}
      <main className="max-w-[1440px] mx-auto px-8 w-full grow pt-10 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-dim pb-8 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">01 / THE COLLECTION</p>
            <h1 className="font-serif text-5xl md:text-6xl text-ink font-normal tracking-tight">
              {results.length} {results.length === 1 ? "car" : "cars"} for your dates.
            </h1>
          </div>
          <div className="max-w-md mt-6 md:mt-0 text-sm text-muted leading-relaxed font-sans">
            Every vehicle is prepared in exhibition condition, delivered curbside with comprehensive European insurance,
            zero counter paperwork, and cross-border passes included.
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* LEFT SIDEBAR */}
          <aside aria-label="Filters" className="w-full lg:w-[310px] shrink-0 bg-stone p-6 rounded-[2px] border border-stone-dim space-y-7">
            <div className="flex items-center justify-between border-b border-stone-dim pb-4">
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-ink">Filters</span>
              <button type="button" onClick={clearAll} className="font-mono text-xs text-muted hover:text-forest underline transition-colors">
                Clear all
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label htmlFor="avail-toggle" className="text-xs font-medium text-ink cursor-pointer select-none">
                Only available for my dates
              </label>
              <div className="relative inline-block w-9 h-5 select-none">
                <input
                  type="checkbox"
                  id="avail-toggle"
                  checked={filters.availableOnly}
                  onChange={(e) => setFilters({ ...filters, availableOnly: e.target.checked })}
                  className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-9 h-5 bg-stone-dim peer-checked:bg-forest rounded-full transition-colors cursor-pointer peer-focus-visible:outline-2 peer-focus-visible:outline-forest peer-focus-visible:outline-offset-2" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-ivory rounded-full transition-transform peer-checked:translate-x-4 pointer-events-none" />
              </div>
            </div>

            <hr className="border-t border-stone-dim my-4" />

            {/* Category */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium mb-3">Category</legend>
              <div className="space-y-2 text-xs">
                <CheckRow
                  label="All categories"
                  checked={filters.categories.length === 0}
                  bold={filters.categories.length === 0}
                  count={countWithout(filters, "categories", () => true)}
                  onChange={() => setFilters({ ...filters, categories: [] })}
                />
                {categoryOptions.map((c) => (
                  <CheckRow
                    key={c.value}
                    label={c.label}
                    checked={filters.categories.includes(c.value)}
                    count={countWithout(filters, "categories", (v) => v.category === c.value)}
                    onChange={() => setFilters({ ...filters, categories: toggle(filters.categories, c.value) })}
                  />
                ))}
              </div>
            </fieldset>

            <hr className="border-t border-stone-dim my-4" />

            {/* Price Range Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="price-max" className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium">
                  Daily Rate
                </label>
                <span className="font-mono text-xs font-medium text-forest">Up to €{maxPrice}/day</span>
              </div>
              <input
                id="price-max"
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={10}
                value={maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full h-1 bg-stone-dim rounded cursor-pointer accent-forest"
              />
              <div className="flex justify-between text-[11px] font-mono text-muted">
                <span>€{PRICE_MIN}</span>
                <span>€{PRICE_MAX}</span>
              </div>
            </div>

            <hr className="border-t border-stone-dim my-4" />

            {/* Brand */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium mb-3">Brand</legend>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {brandOptions.map((b) => (
                  <CheckRow
                    key={b}
                    label={b}
                    checked={filters.brands.includes(b)}
                    bold={filters.brands.includes(b)}
                    count={countWithout(filters, "brands", (v) => v.brand === b)}
                    onChange={() => setFilters({ ...filters, brands: toggle(filters.brands, b) })}
                  />
                ))}
              </div>
            </fieldset>

            <hr className="border-t border-stone-dim my-4" />

            {/* Transmission Segmented Control */}
            <div className="space-y-2">
              <p id="trans-label" className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium">
                Transmission
              </p>
              <div role="radiogroup" aria-labelledby="trans-label" className="grid grid-cols-3 gap-1 bg-ivory p-1 border border-stone-dim rounded-[2px]">
                {(
                  [
                    ["any", "Any"],
                    ["automatic", "Auto"],
                    ["manual", "Manual"],
                  ] as const
                ).map(([value, label]) => {
                  const on = filters.transmission === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setFilters({ ...filters, transmission: value })}
                      className={`py-1.5 text-xs font-mono font-medium rounded-[2px] ${on ? "bg-forest text-ivory" : "text-ink hover:bg-stone transition-colors"}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-t border-stone-dim my-4" />

            {/* Seats */}
            <div className="space-y-2">
              <p id="seats-label" className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium">
                Seats
              </p>
              <div role="radiogroup" aria-labelledby="seats-label" className="grid grid-cols-4 gap-2">
                {seatOptions.map((n) => {
                  const on = filters.seats === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      aria-label={`${n}${n === 7 ? " or more" : ""} seats minimum`}
                      onClick={() => setFilters({ ...filters, seats: on ? null : n })}
                      className={
                        on
                          ? "h-9 border border-forest bg-forest text-ivory text-xs font-mono font-semibold rounded-[2px]"
                          : "h-9 border border-stone-dim bg-ivory text-ink hover:border-forest text-xs font-mono font-medium rounded-[2px]"
                      }
                    >
                      {n === 7 ? "7+" : n}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr className="border-t border-stone-dim my-4" />

            {/* Powertrain */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium mb-3">Powertrain</legend>
              <div className="space-y-2 text-xs">
                {powertrainOptions.map((p) => (
                  <SimpleCheck
                    key={p.value}
                    label={p.label}
                    checked={filters.powertrains.includes(p.value)}
                    onChange={() => setFilters({ ...filters, powertrains: toggle(filters.powertrains, p.value) })}
                  />
                ))}
              </div>
            </fieldset>

            <hr className="border-t border-stone-dim my-4" />

            {/* Features */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-[11px] uppercase tracking-wider text-muted font-medium mb-3">Features</legend>
              <div className="space-y-2 text-xs">
                {featureOptions.map((f) => (
                  <SimpleCheck
                    key={f.value}
                    label={f.label}
                    checked={filters.features.includes(f.value)}
                    onChange={() => setFilters({ ...filters, features: toggle(filters.features, f.value) })}
                  />
                ))}
              </div>
            </fieldset>
          </aside>

          {/* RIGHT RESULTS */}
          <section aria-label="Results" className="grow w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-dim pb-4 mb-8">
              <div className="flex flex-wrap items-center gap-2" aria-live="polite">
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-medium mr-2">
                  Showing {shown.length} of {results.length}
                  {chips.length ? ":" : ""}
                </span>
                {chips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center space-x-1.5 bg-forest text-ivory text-[11px] font-mono py-1 px-2.5 rounded-[2px]"
                  >
                    <span>{c.label}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${c.label}`}
                      onClick={c.remove}
                      className="hover:text-stone transition-colors font-mono leading-none"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono">
                <label htmlFor="sort" className="text-muted">
                  Sort:
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value as SortKey })}
                    className="bg-ivory border border-stone-dim px-3 py-1.5 rounded-[2px] text-ink font-mono text-xs focus:outline-none focus:border-forest cursor-pointer pr-7 appearance-none"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted text-[10px]">▼</div>
                </div>
              </div>
            </div>

            {shown.length === 0 ? (
              <div className="border-t border-b border-stone-dim py-16 text-center">
                <p className="font-serif text-3xl text-ink mb-2">No exhibits match these filters.</p>
                <p className="font-sans text-sm text-muted mb-6">Try widening the daily rate or removing a filter.</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-6 py-3 bg-forest hover:bg-forest-hover text-ivory text-xs font-mono uppercase tracking-wider rounded-[2px] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                  {shown.slice(0, 3).map((v) => (
                    <CatalogueCard key={v.slug} v={v} tripQuery={tripQuery} eager />
                  ))}
                </div>
                {shown.length > 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 mt-12 mb-16">
                    {shown.slice(3).map((v) => (
                      <CatalogueCard key={v.slug} v={v} tripQuery={tripQuery} />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* BREAK THE GRID: CURATOR'S PICK */}
            {current === 1 && (
              <div className="w-full my-16 bg-stone border-t border-b border-stone-dim py-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-dim pb-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-forest font-semibold">
                      CURATOR’S PICK · EXHIBITION HIGHLIGHT
                    </span>
                    <span className="font-mono text-xs text-muted">Lake Como &amp; Alpine Itinerary Match</span>
                  </div>
                  <Link
                    href={`/fleet/${curator.slug}?${tripQuery}`}
                    className="relative block w-full aspect-[21/9] md:aspect-[16/7] overflow-hidden bg-stone-surface"
                  >
                    <Image
                      src={curator.image}
                      alt="Champagne Lexus LC500 at Lake Como modernist villa"
                      fill
                      sizes="(min-width: 1440px) 1050px, 72vw"
                      quality={90}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-ivory/95 border border-stone-dim px-4 py-2 rounded-[2px] hidden sm:block">
                      <span className="font-mono text-[11px] text-ink uppercase tracking-wider">
                        Provenance: Villa Passalacqua, Moltrasio
                      </span>
                    </div>
                  </Link>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-3 items-center">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-4 mb-1">
                        <span className="font-mono text-xs tracking-wider uppercase text-muted">
                          {curator.brand.toUpperCase()} · EXHIBIT {curator.exhibit}
                        </span>
                        <span className="text-stone-dim">·</span>
                        <span className="font-mono text-xs text-emerald-800 font-medium">Curbside Reserve Available</span>
                      </div>
                      <h2 className="font-serif text-2xl text-ink font-normal">{curator.model}</h2>
                      <p className="font-sans text-xs text-muted mt-1 italic">
                        “A naturally aspirated 5.0L symphony with grand touring refinement tailored for the twisting ribbons
                        between St. Moritz and Bellagio.”
                      </p>
                    </div>
                    <div className="flex items-center lg:justify-end space-x-6 border-t lg:border-t-0 border-stone-dim pt-4 lg:pt-0">
                      <div className="text-right">
                        <div className="font-mono text-xl font-semibold text-ink">€{curator.pricePerDay}</div>
                        <div className="font-mono text-xs text-muted">daily rate · VAT incl.</div>
                      </div>
                      <Link
                        href={`/book/${curator.slug}/trip?${tripQuery}`}
                        className="px-6 py-3 bg-forest hover:bg-forest-hover text-ivory text-xs font-mono uppercase tracking-wider rounded-[2px] transition-colors"
                      >
                        Reserve Exhibit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAGINATION & FOOTNOTE */}
            <nav aria-label="Pagination" className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-stone-dim">
              <p className="font-mono text-xs text-muted">
                Displaying page {current} of {pages} · All {vehicles.length} catalogue vehicles maintained in exhibition condition
              </p>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0 font-mono text-xs">
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) =>
                  n === current ? (
                    <span key={n} aria-current="page" className="px-3 py-1.5 bg-forest text-ivory rounded-[2px]">
                      {n}
                    </span>
                  ) : (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className="px-3 py-1.5 border border-stone-dim hover:border-forest text-ink rounded-[2px] transition-colors"
                    >
                      {n}
                    </button>
                  ),
                )}
                {current < pages && (
                  <button
                    type="button"
                    onClick={() => setPage(current + 1)}
                    className="px-3 py-1.5 border border-stone-dim hover:border-forest text-ink rounded-[2px] transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </nav>
          </section>
        </div>
      </main>

      <FleetFooter />

      <ItineraryEditor
        open={editing}
        itinerary={itinerary}
        onClose={() => setEditing(false)}
        onApply={(it) => {
          setItinerary(it);
          setEditing(false);
        }}
      />
    </div>
  );
}

function CheckRow({
  label,
  checked,
  count,
  bold,
  onChange,
}: {
  label: string;
  checked: boolean;
  count: number;
  bold?: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between text-ink cursor-pointer group">
      <span className="flex items-center space-x-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-3.5 h-3.5 rounded-[2px] accent-forest border-stone-dim"
        />
        <span className={`${bold ? "font-medium " : ""}group-hover:text-forest transition-colors`}>{label}</span>
      </span>
      <span className="font-mono text-[11px] text-muted">{count}</span>
    </label>
  );
}

function SimpleCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center space-x-2.5 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-3.5 h-3.5 rounded-[2px] accent-forest border-stone-dim" />
      <span>{label}</span>
    </label>
  );
}

function CatalogueCard({ v, tripQuery, eager = false }: { v: Vehicle; tripQuery: string; eager?: boolean }) {
  const { isFavourite, toggle } = useFavourites();
  const saved = isFavourite(v.slug);
  return (
    <div className="group flex flex-col relative">
      <div className="relative aspect-[3/2] overflow-hidden bg-stone">
        <Link href={`/fleet/${v.slug}?${tripQuery}`} aria-label={`${v.brand} ${v.model}`} className="absolute inset-0">
          <Image
            src={v.image}
            alt={v.imageAlt}
            fill
            sizes="(min-width: 1440px) 340px, (min-width: 1280px) 26vw, 45vw"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggle(v.slug)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${v.model} from shortlist` : `Save ${v.model} to shortlist`}
          title="Save to shortlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-[2px] bg-ivory/80 backdrop-blur-sm flex items-center justify-center hover:text-red-700 transition-colors ${saved ? "text-red-700" : "text-ink"}`}
        >
          <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
      <Link href={`/fleet/${v.slug}?${tripQuery}`} className="pt-4 pb-2 block">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
            {v.brand.toUpperCase()} · EXHIBIT {v.exhibit}
          </span>
          <div className="flex items-center space-x-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${v.available ? "bg-emerald-600" : "bg-stone-dim"}`} />
            <span className={`font-mono text-[11px] font-medium ${v.available ? "text-emerald-800" : "text-muted"}`}>
              {v.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
        <h2 className="text-base font-semibold text-ink tracking-tight font-sans">{v.model}</h2>
        <div className="w-full h-[1px] bg-stone-dim my-2.5" />
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs text-muted">{v.specLine}</span>
          <div className="text-right">
            <span className="font-mono text-sm font-semibold text-ink">€{v.pricePerDay}</span>
            <span className="font-mono text-xs text-muted"> / day</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function FleetFooter() {
  const col = "space-y-2 text-xs text-[#8A9089]";
  const a = "hover:text-ivory transition-colors";
  return (
    <footer className="on-dark w-full bg-dark text-stone-dim border-t border-[#252A27] mt-auto">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#252A27]">
          <div className="md:col-span-4 space-y-4">
            <div className="text-xl font-semibold tracking-[0.28em] font-sans text-ivory uppercase">HALDEN</div>
            <p className="text-xs text-[#8A9089] leading-relaxed max-w-sm">
              European automobile atelier and rental gallery. Providing impeccably prepared vehicles for meaningful journeys
              across Switzerland, Germany, France, and Northern Italy.
            </p>
          </div>
          <div className="md:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ivory font-medium">Fleet</p>
            <ul className={col}>
              <li><Link href="/fleet?category=sports" className={a}>Sports Tier (911, M5)</Link></li>
              <li><Link href="/fleet?category=suv" className={a}>SUVs &amp; Overlanding</Link></li>
              <li><Link href="/fleet?category=sedan" className={a}>Executive Sedans</Link></li>
              <li><Link href="/fleet?power=electric" className={a}>Pure Electric</Link></li>
              <li><Link href="/fleet" className={a}>Heritage Reserve</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ivory font-medium">Curated Locations</p>
            <ul className={col}>
              <li><Link href="/fleet?loc=muc" className={a}>Munich Airport Terminal 2 (MUC)</Link></li>
              <li><Link href="/fleet?loc=zrh" className={a}>Zurich Flughafen Privatterminal (ZRH)</Link></li>
              <li><Link href="/fleet?loc=gva" className={a}>Geneva Cointrin Private Aviation (GVA)</Link></li>
              <li><Link href="/fleet?loc=mxp" className={a}>Milan Malpensa VIP Lounge (MXP)</Link></li>
              <li><Link href="/fleet?loc=vie" className={a}>Vienna Schwechat Executive (VIE)</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ivory font-medium">Support &amp; Delivery</p>
            <ul className={col}>
              <li><a href="tel:+41448002400" className={a}>Concierge Desk (24/7)</a></li>
              <li><Link href="/#standard" className={a}>Hotel &amp; Villa Curbside Delivery</Link></li>
              <li><Link href="/#standard" className={a}>Cross-border Protocols &amp; Vignettes</Link></li>
              <li><Link href="/terms#liability" className={a}>Insurance &amp; Excess Terms</Link></li>
              <li><Link href="/privacy" className={a}>Privacy Notice</Link></li>
              <li><a href="#cookie-preferences" className={a}>Cookie Preferences</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-mono">
          <p>© 2025 HALDEN AUTOMOBILE AG. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            
            
            
          </div>
        </div>
      </div>
    </footer>
  );
}
