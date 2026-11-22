"use client";

import { useEffect, useRef, useState } from "react";
import { useCatalogue } from "@/components/catalogue/CatalogueProvider";
import { Icon } from "@/components/ui/Icon";
import { brandOptions, categoryOptions, type Feature, type Powertrain, type Vehicle } from "@/data/vehicles";
import { applyFilters, countActive, emptyFilters, seatOptions, toggle, type FleetFilters } from "@/lib/fleetFilters";
import { formatDay, type Itinerary } from "@/lib/itinerary";

/** Mobile filter sheet — Stitch screen 29. Edits a draft; "Show N cars" applies it. */

const categoryLabels: Record<string, string> = {
  sports: "Sports & Grand Tourer",
  sedan: "Executive Sedans",
  suv: "SUVs & Overlanding",
  wagon: "Performance Wagons",
};

const driveOptions: { label: string; icon: string; kind: "power" | "feature"; value: Powertrain | Feature }[] = [
  { label: "Petrol (V6 / V8 Twin-Turbo)", icon: "local_gas_station", kind: "power", value: "petrol" },
  { label: "Plug-in Hybrid (PHEV)", icon: "bolt", kind: "power", value: "hybrid" },
  { label: "Pure Electric (BEV)", icon: "electric_car", kind: "power", value: "electric" },
  { label: "All-Wheel Drive (AWD / 4WD)", icon: "all_inclusive", kind: "feature", value: "awd" },
  { label: "Ski rack & winterised", icon: "ac_unit", kind: "feature", value: "ski" },
];

/** Price slider bounds from the catalogue day rates (a 60 euro margin, rounded to tens). */
function priceRange(vehicles: Vehicle[]) {
  const prices = vehicles.length ? vehicles.map((v) => v.pricePerDay) : [0];
  return {
    SHEET_MIN: Math.floor(Math.min(...prices) / 10) * 10 - 60,
    SHEET_MAX: Math.ceil(Math.max(...prices) / 10) * 10 + 60,
    AVG: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length / 10) * 10,
  };
}

type SheetProps = {
  filters: FleetFilters;
  itinerary: Itinerary;
  onClose: () => void;
  onApply: (f: FleetFilters) => void;
};

export function FilterSheet({ open, ...props }: SheetProps & { open: boolean }) {
  // Mounted only while open, so the draft always starts from the applied filters
  return open ? <Sheet {...props} /> : null;
}

function Box({ on }: { on: boolean }) {
  return on ? (
    <div className="w-4 h-4 rounded-[2px] bg-primary-container text-on-primary flex items-center justify-center">
      <Icon name="check" className="text-[13px] font-bold" />
    </div>
  ) : (
    <div className="w-4 h-4 rounded-[2px] bg-surface-container-highest flex items-center justify-center group-hover:bg-outline-variant/60 transition-colors" />
  );
}

function Sheet({ filters, itinerary, onClose, onApply }: SheetProps) {
  const { vehicles } = useCatalogue();
  const [draft, setDraft] = useState(filters);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const resultCount = applyFilters(vehicles, draft).length;
  const { SHEET_MIN, SHEET_MAX, AVG } = priceRange(vehicles);
  const active = countActive(draft);
  const min = draft.minPrice ?? SHEET_MIN;
  const max = draft.maxPrice ?? SHEET_MAX;
  const pct = (n: number) => ((n - SHEET_MIN) / (SHEET_MAX - SHEET_MIN)) * 100;
  const count = (pred: (v: Vehicle) => boolean, skip: keyof FleetFilters) =>
    applyFilters(vehicles, draft, skip).filter(pred).length;


  return (
    <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-[80] overflow-y-auto bg-surface lg:hidden">
      <div className="flex flex-col w-full bg-surface-container-low min-w-0 pb-28 select-none min-h-full">
        {/* Sheet Top Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-surface-container-low/95 backdrop-blur-sm border-b border-outline-variant/40">
          <button
            className="h-11 px-2 flex items-center text-on-surface-variant font-label-mono text-label-mono uppercase tracking-widest hover:text-primary transition-colors"
            type="button"
            onClick={() => setDraft(emptyFilters(draft.sort))}
          >
            Reset all
          </button>
          <div className="flex items-center gap-1.5 font-action text-body-md font-semibold text-on-surface">
            <span>Filters</span>
            <span className="font-spec-numeral text-spec-numeral px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[11px] leading-none">
              ({active})
            </span>
          </div>
          <button
            ref={closeRef}
            aria-label="Close filters"
            className="w-12 h-12 flex items-center justify-center text-on-surface hover:text-primary transition-colors -mr-2"
            type="button"
            onClick={onClose}
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="flex flex-col w-full divide-y divide-outline-variant/30 px-6">
          {/* 1. Availability */}
          <section className="py-5 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span id="sheet-avail" className="font-action text-body-md font-medium text-on-surface">
                Only available for my dates
              </span>
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mt-0.5">
                {formatDay(itinerary.from)} — {formatDay(itinerary.to)} · {itinerary.location.city} Hub
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                className="sr-only peer"
                type="checkbox"
                aria-labelledby="sheet-avail"
                checked={draft.availableOnly}
                onChange={(e) => setDraft({ ...draft, availableOnly: e.target.checked })}
              />
              <div className="w-12 h-7 bg-surface-variant rounded-full peer peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2 peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary-container after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-surface-container-lowest after:rounded-full after:h-[22px] after:w-[22px] after:transition-all" />
            </label>
          </section>

          {/* 2. Category */}
          <section className="py-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">01 {"//"} Category</span>
              <span className="font-spec-numeral text-spec-numeral text-secondary text-[12px]">{draft.categories.length} selected</span>
            </div>
            <div className="flex flex-col space-y-3.5">
              {categoryOptions.map((c) => {
                const on = draft.categories.includes(c.value);
                return (
                  <label key={c.value} className="flex items-center justify-between group cursor-pointer py-1">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => setDraft({ ...draft, categories: toggle(draft.categories, c.value) })}
                    />
                    <div className="flex items-center gap-3">
                      <Box on={on} />
                      <span className="font-action text-body-md text-on-surface group-hover:text-primary">{categoryLabels[c.value]}</span>
                    </div>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface-variant text-[13px]">
                      ({count((v) => v.category === c.value, "categories")})
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 3. Daily Rate Range */}
          <section className="py-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">02 {"//"} Daily Rate</span>
              <span className="font-label-mono text-label-mono text-primary font-medium tracking-tight">EUR (€)</span>
            </div>
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-spec-numeral text-headline-sm text-on-surface tracking-tight">€{min}</span>
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">to</span>
              <span className="font-spec-numeral text-headline-sm text-on-surface tracking-tight">
                €{max}
                <span className="font-body-sm text-body-sm text-on-surface-variant font-normal"> / day</span>
              </span>
            </div>
            <div className="relative w-full py-4 flex items-center">
              <div className="w-full h-1 bg-surface-variant rounded-none relative">
                <div className="absolute h-full bg-primary-container" style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }} />
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-surface-container-lowest border-2 border-primary-container rounded-full shadow-sm flex items-center justify-center pointer-events-none"
                  style={{ left: `${pct(min)}%` }}
                >
                  <div className="w-1.5 h-1.5 bg-primary-container rounded-full" />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-primary-container rounded-full shadow-sm flex items-center justify-center pointer-events-none"
                  style={{ left: `${pct(max)}%` }}
                >
                  <div className="w-1.5 h-1.5 bg-surface-container-lowest rounded-full" />
                </div>
              </div>
              {/* Native range inputs layered on the designed track (keyboard + touch accessible) */}
              <input
                type="range"
                aria-label="Minimum daily rate"
                min={SHEET_MIN}
                max={SHEET_MAX}
                step={10}
                value={min}
                onChange={(e) => setDraft({ ...draft, minPrice: Math.min(Number(e.target.value), max - 10) })}
                className="range-thumb absolute inset-x-0 w-full h-8 opacity-0 cursor-pointer"
              />
              <input
                type="range"
                aria-label="Maximum daily rate"
                min={SHEET_MIN}
                max={SHEET_MAX}
                step={10}
                value={max}
                onChange={(e) => setDraft({ ...draft, maxPrice: Math.max(Number(e.target.value), min + 10) })}
                className="range-thumb absolute inset-x-0 w-full h-8 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-label-mono text-[10px] tracking-wider uppercase mt-1">
              <span>Min €{SHEET_MIN}</span>
              <span>Average €{AVG}</span>
              <span>Max €{SHEET_MAX}</span>
            </div>
          </section>

          {/* 4. Seats */}
          <section className="py-6 flex flex-col">
            <span id="sheet-seats" className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mb-3">
              03 {"//"} Seating Capacity
            </span>
            <div role="radiogroup" aria-labelledby="sheet-seats" className="grid grid-cols-4 gap-2.5">
              {seatOptions.map((n) => {
                const on = draft.seats === n;
                return (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setDraft({ ...draft, seats: on ? null : n })}
                    className={
                      on
                        ? "h-12 rounded-[2px] bg-primary-container text-on-primary flex items-center justify-center font-spec-numeral text-spec-numeral font-semibold shadow-sm"
                        : "h-12 rounded-[2px] bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center font-spec-numeral text-spec-numeral text-on-surface"
                    }
                  >
                    {n === 7 ? "7+" : n}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. Transmission */}
          <section className="py-6 flex flex-col">
            <span id="sheet-trans" className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mb-3">
              04 {"//"} Transmission
            </span>
            <div role="radiogroup" aria-labelledby="sheet-trans" className="grid grid-cols-3 p-1 bg-surface-container rounded-[2px]">
              {(
                [
                  ["any", "Any"],
                  ["automatic", "Automatic"],
                  ["manual", "Manual"],
                ] as const
              ).map(([value, label]) => {
                const on = draft.transmission === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setDraft({ ...draft, transmission: value })}
                    className={
                      on
                        ? "h-10 rounded-[2px] bg-surface-container-lowest text-on-surface shadow-xs font-action text-action flex items-center justify-center transition-all"
                        : "h-10 rounded-[2px] text-on-surface-variant hover:text-on-surface font-action text-action flex items-center justify-center transition-colors"
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 6. Brand */}
          <section className="py-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">05 {"//"} Marque &amp; House</span>
              <span className="font-spec-numeral text-spec-numeral text-secondary text-[12px]">{draft.brands.length} selected</span>
            </div>
            <div className="grid grid-cols-1 gap-3.5">
              {brandOptions.map((b) => {
                const on = draft.brands.includes(b);
                return (
                  <label key={b} className="flex items-center justify-between group cursor-pointer py-0.5">
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => setDraft({ ...draft, brands: toggle(draft.brands, b) })} />
                    <div className="flex items-center gap-3">
                      <Box on={on} />
                      <span className="font-action text-body-md text-on-surface group-hover:text-primary">{b}</span>
                    </div>
                    <span className="font-spec-numeral text-spec-numeral text-on-surface-variant text-[13px]">
                      ({count((v) => v.brand === b, "brands")})
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 7. Drive & Equipment */}
          <section className="py-6 flex flex-col">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider mb-4">06 {"//"} Drive &amp; Equipment</span>
            <div className="flex flex-col space-y-3.5">
              {driveOptions.map((o) => {
                const on =
                  o.kind === "power" ? draft.powertrains.includes(o.value as Powertrain) : draft.features.includes(o.value as Feature);
                const flip = () =>
                  o.kind === "power"
                    ? setDraft({ ...draft, powertrains: toggle(draft.powertrains, o.value as Powertrain) })
                    : setDraft({ ...draft, features: toggle(draft.features, o.value as Feature) });
                return (
                  <label key={o.value} className="flex items-center justify-between group cursor-pointer py-0.5">
                    <input type="checkbox" className="sr-only" checked={on} onChange={flip} />
                    <div className="flex items-center gap-3">
                      <Box on={on} />
                      <span className="font-action text-body-md text-on-surface group-hover:text-primary">{o.label}</span>
                    </div>
                    <Icon name={o.icon} className="text-secondary text-[18px]" />
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sticky Bottom Action Bar */}
        <aside className="fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant/40 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="w-full max-w-md mx-auto">
            <button
              className="w-full h-[52px] rounded-[2px] bg-primary-container active:bg-primary text-on-primary font-action text-[16px] tracking-wide font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-60"
              type="button"
              onClick={() => onApply(draft)}
            >
              <span>
                Show {resultCount} {resultCount === 1 ? "car" : "cars"}
              </span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
