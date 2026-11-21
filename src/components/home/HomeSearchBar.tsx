"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { locations } from "@/data/locations";
import { defaultItinerary, formatDayTime, itineraryQuery } from "@/lib/itinerary";
import { useMounted } from "@/lib/useMounted";

/**
 * Homepage search bar (Stitch screen 04, section 3).
 * Native selects/date pickers sit invisibly over the designed text so the visual stays exact
 * while the controls remain keyboard- and screen-reader-accessible.
 */
export function HomeSearchBar() {
  const router = useRouter();
  const mounted = useMounted();
  const id = useId();
  const [loc, setLoc] = useState("zrh");
  const [dates, setDates] = useState<{ from: string; to: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = dates ?? (mounted ? defaultItinerary() : null);
  const location = locations.find((l) => l.id === loc) ?? locations[0];

  function update(key: "from" | "to", value: string) {
    if (!value) return;
    const base = current ?? defaultItinerary();
    setDates({ ...base, [key]: value });
    setError(null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const it = current ?? defaultItinerary();
    if (new Date(it.to) <= new Date(it.from)) {
      setError("Return must be after pick-up.");
      return;
    }
    router.push(`/fleet?${itineraryQuery({ location: loc, from: it.from, to: it.to })}`);
  }

  const fieldLabel = "font-mono text-[11px] text-text-muted uppercase tracking-wider mb-1";
  const overlay =
    "absolute inset-0 w-full h-full opacity-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer";

  return (
    <section id="booking" className="w-full bg-ivory border-b border-border-stone relative z-30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <form
          onSubmit={submit}
          noValidate
          aria-describedby={error ? `${id}-err` : undefined}
          className="grid grid-cols-1 md:grid-cols-4 gap-0 items-center bg-ivory border border-border-stone rounded-[2px] divide-y md:divide-y-0 md:divide-x divide-border-stone min-h-[90px]"
        >
          {/* Pick-up Location */}
          <div className="relative px-6 py-4 flex flex-col justify-center focus-within:bg-stone-bg/40 transition-colors">
            <label htmlFor={`${id}-loc`} className={fieldLabel}>
              Pick-up location
            </label>
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm font-medium text-ink truncate">{location.label}</span>
              <span className="text-text-muted text-xs" aria-hidden>
                ▼
              </span>
            </div>
            <select
              id={`${id}-loc`}
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className={overlay}
            >
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pick-up Date & Time */}
          <div className="relative px-6 py-4 flex flex-col justify-center focus-within:bg-stone-bg/40 transition-colors">
            <label htmlFor={`${id}-from`} className={fieldLabel}>
              Pick-up date and time
            </label>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-ink">{current ? formatDayTime(current.from) : "—"}</span>
              <span className="font-mono text-[11px] text-sage">{location.timezone}</span>
            </div>
            <input
              id={`${id}-from`}
              type="datetime-local"
              step={1800}
              value={current?.from ?? ""}
              onChange={(e) => update("from", e.target.value)}
              className={overlay}
            />
          </div>

          {/* Return Date & Time */}
          <div className="relative px-6 py-4 flex flex-col justify-center focus-within:bg-stone-bg/40 transition-colors">
            <label htmlFor={`${id}-to`} className={fieldLabel}>
              Return date and time
            </label>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-ink">{current ? formatDayTime(current.to) : "—"}</span>
              <span className="font-mono text-[11px] text-sage">{location.timezone}</span>
            </div>
            <input
              id={`${id}-to`}
              type="datetime-local"
              step={1800}
              min={current?.from}
              value={current?.to ?? ""}
              onChange={(e) => update("to", e.target.value)}
              aria-invalid={!!error}
              className={overlay}
            />
          </div>

          {/* CTA Action */}
          <div className="p-3 flex items-center justify-center">
            <button
              type="submit"
              className="w-full h-full min-h-[58px] bg-forest text-ivory font-sans text-sm font-medium uppercase tracking-wider hover:bg-forest-hover transition-colors rounded-[2px] flex items-center justify-center"
            >
              Find a car
            </button>
          </div>
        </form>
        {error && (
          <p id={`${id}-err`} role="alert" className="mt-2 font-mono text-[11px] text-error">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
