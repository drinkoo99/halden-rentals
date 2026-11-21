"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FilterSheet } from "@/components/fleet/FilterSheet";
import { useFleetState } from "@/components/fleet/useFleetState";
import { ItineraryEditor } from "@/components/site/ItineraryEditor";
import { MobileMenu } from "@/components/site/MobileMenu";
import { Icon } from "@/components/ui/Icon";
import { getVehicle, type Vehicle } from "@/data/vehicles";
import { useFavourites } from "@/lib/favourites";
import { countActive, emptyFilters, sortOptions, toggle, type SortKey } from "@/lib/fleetFilters";
import { formatDay, rentalDays } from "@/lib/itinerary";

const STEP = 4;

/** Mobile fleet discovery — Stitch screen 26. Shown below lg. */
export function FleetMobile() {
  const { filters, setFilters, itinerary, setItinerary, results, tripQuery } = useFleetState();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(STEP);
  const days = rentalDays(itinerary.from, itinerary.to);
  const curator = getVehicle("lexus-lc-500")!;
  const active = countActive(filters);
  const shown = results.slice(0, visible);
  const sortLabel = sortOptions.find((o) => o.value === filters.sort)?.label ?? "Recommended";

  const chips: { label: string; remove: () => void }[] = [
    ...filters.brands.map((b) => ({ label: b, remove: () => setFilters({ ...filters, brands: toggle(filters.brands, b) }) })),
    ...filters.categories.map((c) => ({ label: c, remove: () => setFilters({ ...filters, categories: toggle(filters.categories, c) }) })),
    ...(filters.seats != null ? [{ label: `${filters.seats}+ Seats`, remove: () => setFilters({ ...filters, seats: null }) }] : []),
    ...(filters.transmission !== "any"
      ? [{ label: filters.transmission, remove: () => setFilters({ ...filters, transmission: "any" }) }]
      : []),
    ...(filters.minPrice != null || filters.maxPrice != null
      ? [
          {
            label: `€${filters.minPrice ?? "…"}–€${filters.maxPrice ?? "…"}`,
            remove: () => setFilters({ ...filters, minPrice: null, maxPrice: null }),
          },
        ]
      : []),
    ...filters.powertrains.map((p) => ({ label: p, remove: () => setFilters({ ...filters, powertrains: toggle(filters.powertrains, p) }) })),
    ...filters.features.map((f) => ({ label: f === "awd" ? "AWD" : f, remove: () => setFilters({ ...filters, features: toggle(filters.features, f) }) })),
  ];

  return (
    <div className="lg:hidden bg-surface font-body-md text-on-surface flex flex-col min-h-screen pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex flex-col w-full text-on-surface">
        {/* Top Navigation & Brand Header */}
        <header className="w-full bg-surface px-margin-mobile py-4 flex items-center justify-between">
          <Link className="font-headline-sm text-headline-sm tracking-tight text-primary" href="/">
            HALDEN
          </Link>
          <MobileMenu variant="icon" />
        </header>

        {/* Reservation Detail Strip */}
        <section aria-label="Your trip" className="w-full bg-surface-container-high px-margin-mobile py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="flight_land" className="text-[16px] text-secondary shrink-0" />
            <p className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant truncate">
              {itinerary.location.label.replace(/\s*\(.*\)$/, "")} · {formatDay(itinerary.from)} →{" "}
              {formatDay(itinerary.to)} · {days} {days === 1 ? "day" : "days"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="font-action text-action text-primary underline underline-offset-4 pl-3 shrink-0 min-h-[44px] inline-flex items-center active:opacity-70"
          >
            Edit
          </button>
        </section>

        {/* Title Section */}
        <section aria-label="Collection" className="px-margin-mobile pt-8 pb-6 flex flex-col gap-2 bg-surface">
          <span className="font-label-mono text-label-mono tracking-widest uppercase text-secondary">THE COLLECTION</span>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface leading-tight">
            {results.length} {results.length === 1 ? "car" : "cars"} for your dates.
          </h1>
        </section>

        {/* Sticky Filter & Sort Controller */}
        <div role="region" aria-label="Filter and sort" className="sticky top-0 z-20 w-full bg-surface">
          <div className="h-[52px] px-margin-mobile flex items-center justify-between bg-surface-container-lowest shadow-sm">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              aria-haspopup="dialog"
              className="h-10 px-4 bg-primary text-on-primary font-action text-action flex items-center gap-2 rounded active:bg-primary-container transition-colors"
            >
              <Icon name="tune" className="text-[18px]" />
              <span>Filters ({active})</span>
            </button>
            <div className="relative h-11 px-3 text-on-surface font-body-md text-body-sm flex items-center gap-1.5 active:bg-surface-container transition-colors">
              <span className="text-on-surface-variant">Sort:</span>
              <span className="font-semibold text-on-surface">{sortLabel.replace("Daily Rate: ", "")}</span>
              <Icon name="expand_more" className="text-[18px] text-secondary" />
              <select
                aria-label="Sort cars"
                value={filters.sort}
                onChange={(e) => setFilters({ ...filters, sort: e.target.value as SortKey })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {chips.length > 0 && (
            <div className="w-full px-margin-mobile py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar bg-surface-container-low">
              {chips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.remove}
                  aria-label={`Remove ${c.label} filter`}
                  className="h-8 px-3 bg-secondary-container text-on-secondary-container font-label-mono text-[10px] tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap rounded active:opacity-75"
                >
                  <span>{c.label}</span>
                  <Icon name="close" className="text-[14px]" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFilters(emptyFilters(filters.sort))}
                className="h-8 px-2 text-secondary font-label-mono text-[10px] tracking-wider uppercase underline underline-offset-4 whitespace-nowrap active:text-on-surface"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Main Exhibition Stream */}
        <main className="flex flex-col w-full py-6 space-y-12" aria-live="polite">
          {shown.length === 0 && (
            <div className="px-margin-mobile py-10 flex flex-col gap-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">No exhibits match these filters.</h2>
              <p className="font-body-md text-body-md text-secondary">Try widening the daily rate or removing a filter.</p>
              <button
                type="button"
                onClick={() => setFilters(emptyFilters(filters.sort))}
                className="h-11 px-5 self-start bg-primary text-on-primary font-action text-action rounded"
              >
                Clear all filters
              </button>
            </div>
          )}
          {shown.map((v, i) => (
            <Fragment key={v.slug}>
              <MobileCard v={v} tripQuery={tripQuery} eager={i === 0} />
              {i === 2 && (
                <section className="w-full bg-inverse-surface text-inverse-on-surface my-4 py-8">
                  <div className="px-margin-mobile flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-label-mono tracking-widest uppercase text-inverse-primary">
                        CURATOR’S PICK · EDITION 02
                      </span>
                      <span className="font-label-mono text-[10px] text-surface-variant uppercase tracking-wider">Lake Como</span>
                    </div>
                    <Link href={`/fleet/${curator.slug}?${tripQuery}`} className="relative block w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={curator.mobileImage ?? curator.image}
                        alt="Lexus LC 500 on a villa terrace at dusk"
                        fill
                        sizes="100vw"
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-col gap-2 pt-2">
                      <h3 className="font-headline-sm text-headline-sm text-inverse-on-surface">{curator.model}</h3>
                      <p className="font-body-md text-body-md text-surface-variant italic font-serif">
                        “Tailored for the twisting ribbons between St. Moritz and Bellagio.”
                      </p>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <span className="font-headline-sm text-headline-sm text-inverse-primary">€{curator.pricePerDay}</span>
                        <span className="font-body-sm text-body-sm text-surface-variant"> / day</span>
                      </div>
                      <Link
                        href={`/book/${curator.slug}/trip?${tripQuery}`}
                        className="h-11 px-5 bg-inverse-primary text-on-primary-fixed font-action text-action rounded flex items-center gap-2 active:opacity-90 transition-opacity"
                      >
                        <span>Curbside Reserve</span>
                        <Icon name="key" className="text-[16px]" />
                      </Link>
                    </div>
                  </div>
                </section>
              )}
            </Fragment>
          ))}
        </main>

        {/* Gallery Footer & Pagination */}
        <footer className="w-full px-margin-mobile pt-4 pb-12 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <p className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">
              Displaying {shown.length ? 1 : 0}–{shown.length} of {results.length} Exhibits
            </p>
          </div>
          {visible < results.length && (
            <button
              type="button"
              onClick={() => setVisible((n) => n + STEP)}
              className="w-full h-12 bg-primary text-on-primary font-action text-action flex items-center justify-center gap-2 rounded active:bg-primary-container transition-colors"
            >
              <span>Load More Exhibits</span>
              <Icon name="south" className="text-[18px]" />
            </button>
          )}
          <p className="font-label-mono text-[10px] tracking-widest uppercase text-secondary text-center pt-2">
            HALDEN AUTOMOTIVE ARCHIVE · {itinerary.location.city.toUpperCase()}
          </p>
        </footer>
      </div>

      <FilterSheet
        open={sheetOpen}
        filters={filters}
        itinerary={itinerary}
        onClose={() => setSheetOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setVisible(STEP);
          setSheetOpen(false);
        }}
      />
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

function MobileCard({ v, tripQuery, eager = false }: { v: Vehicle; tripQuery: string; eager?: boolean }) {
  const { isFavourite, toggle } = useFavourites();
  const saved = isFavourite(v.slug);
  return (
    <article className="flex flex-col w-full px-margin-mobile">
      <div className="relative w-full aspect-[3/2] bg-surface-container overflow-hidden">
        <Link href={`/fleet/${v.slug}?${tripQuery}`} aria-label={`${v.brand} ${v.model}`} className="absolute inset-0">
          <Image src={v.mobileImage ?? v.image} alt={v.imageAlt} fill sizes="100vw" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} className="w-full h-full object-cover" />
        </Link>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${v.model} from curated list` : `Save ${v.model} to curated list`}
          onClick={() => toggle(v.slug)}
          className={`absolute top-3 right-3 w-11 h-11 bg-surface/85 backdrop-blur-sm flex items-center justify-center transition-colors active:scale-95 ${saved ? "text-error" : "text-on-surface"}`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            aria-hidden
            style={saved ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined}
          >
            favorite
          </span>
        </button>
      </div>
      <div className="bg-surface-container-lowest p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">
            {v.brand.toUpperCase()} · EXHIBIT {v.exhibit}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${v.available ? "bg-primary" : "bg-outline-variant"}`} />
            <span className={`font-label-mono text-label-mono uppercase ${v.available ? "text-primary" : "text-outline"}`}>
              {v.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">{v.model}</h2>
          <p className="font-label-mono text-label-mono text-on-surface-variant">{v.specLine.toUpperCase()}</p>
        </div>
        <div className="pt-4 flex items-center justify-between">
          <div>
            <span className="font-headline-sm text-headline-sm text-primary">€{v.pricePerDay}</span>
            <span className="font-body-sm text-body-sm text-secondary"> / day</span>
          </div>
          <Link
            href={`/fleet/${v.slug}?${tripQuery}`}
            className="h-11 px-5 bg-primary text-on-primary font-action text-action flex items-center gap-2 rounded active:bg-primary-container transition-colors"
          >
            <span>View Exhibit</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </Link>
        </div>
      </div>
    </article>
  );
}
