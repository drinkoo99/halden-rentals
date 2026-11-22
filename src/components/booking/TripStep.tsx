"use client";

import { useCatalogue } from "@/components/catalogue/CatalogueProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { checkTrip } from "@/components/booking/useReservation";
import { Icon } from "@/components/ui/Icon";

/** Booking step 02 · Trip — Stitch screen 20. */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/** 30-minute handover slots inside the 06:00–23:30 handover window (screen 30) */
const SLOTS = Array.from({ length: 36 }, (_, i) => `${pad(6 + Math.floor(i / 2))}:${i % 2 ? "30" : "00"}`);
const KM_PER_DAY = 250;

/** Time-zone name at the hubs (all Central European): "CEST"/"CET" or "GMT+2"/"GMT+1". */
function hubTz(d: Date, style: "short" | "shortOffset") {
  const part = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", timeZoneName: style })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName");
  return part?.value ?? "CET";
}

function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday-first
  const start = new Date(year, month, 1 - lead);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  // drop a trailing empty week
  return cells[35].getMonth() !== month ? cells.slice(0, 35) : cells;
}

export function TripStep() {
  const router = useRouter();
  const { vehicle: v, state, update, pickup, dropoff, days } = useBooking();
  const { locations } = useCatalogue();
  const fromDate = state.from.slice(0, 10);
  const toDate = state.to.slice(0, 10);
  const fromTime = state.from.slice(11, 16);
  const toTime = state.to.slice(11, 16);
  const [view, setView] = useState(() => {
    const d = new Date(state.from);
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const [picking, setPicking] = useState<"start" | "end">("start");
  const [error, setError] = useState<string | null>(null);
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const months = [view, view.m === 11 ? { y: view.y + 1, m: 0 } : { y: view.y, m: view.m + 1 }];
  const canGoBack = new Date(view.y, view.m, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  function pickDay(d: Date) {
    const day = ymd(d);
    setError(null);
    if (picking === "start" || day <= fromDate) {
      // New start; keep the rental length if possible
      const end = new Date(d);
      end.setDate(end.getDate() + Math.max(1, days));
      update({ from: `${day}T${fromTime}`, to: `${ymd(end)}T${toTime}` });
      setPicking("end");
    } else {
      update({ to: `${day}T${toTime}` });
      setPicking("start");
    }
  }

  function setTime(which: "from" | "to", t: string) {
    setError(null);
    update(which === "from" ? { from: `${fromDate}T${t}` } : { to: `${toDate}T${t}` });
  }

  const [checking, setChecking] = useState(false);
  async function next() {
    if (new Date(state.from) < new Date()) return setError("Pick-up must be in the future.");
    if (new Date(state.to) <= new Date(state.from)) return setError("Return must be after pick-up.");
    setChecking(true);
    const problem = await checkTrip(v.slug, state); // real availability: fleet, bookings, blocks, hubs
    setChecking(false);
    if (problem) return setError(problem);
    router.push(`/book/${v.slug}/extras`);
  }

  const hours = Math.round((new Date(state.to).getTime() - new Date(state.from).getTime()) / 3_600_000);
  const fromD = new Date(state.from);
  const toD = new Date(state.to);

  return (
    <div className="flex flex-col w-full">
      {/* Step indicator */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-outline-variant">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">
            DOSSIER REF {"//"} {fromD.getFullYear()}-{pad(fromD.getMonth() + 1)}-{pickup.code}
          </span>
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="font-label-mono text-label-mono text-primary font-bold uppercase tracking-wider">STEP 02 / 06 · ITINERARY</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Icon name="verified_user" className="text-[15px] text-secondary" />
          <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">GUARANTEED ALLOCATION</span>
        </div>
      </div>

      <header className="mb-10 max-w-2xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">When and where shall we prepare your {v.model}?</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Curbside white-glove handover at 18 European executive aviation terminals and curated architectural hotel partners.
        </p>
      </header>

      {/* Section 1: Location */}
      <section className="mb-12 bg-surface-container-low border border-outline-variant p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-outline-variant">
          <div>
            <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest block">01 / LOGISTICS HUB</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Handover &amp; Return Point</h2>
          </div>
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={state.returnSame}
              onChange={(e) => update({ returnSame: e.target.checked, returnLoc: state.loc })}
            />
            <div className="w-10 h-5 bg-outline-variant rounded-none peer-checked:bg-primary transition-colors relative peer-focus-visible:outline-2 peer-focus-visible:outline-primary peer-focus-visible:outline-offset-2">
              <div className={`w-4 h-4 bg-surface absolute top-0.5 left-0.5 transition-transform ${state.returnSame ? "translate-x-5" : ""}`} />
            </div>
            <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface">Return to same location</span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="pickup-loc" className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface">
                PICK-UP CURBSIDE
              </label>
              <span className="font-label-mono text-[10px] text-primary uppercase bg-primary-fixed px-1.5 py-0.5">ZONE CONCIERGE ASSIGNED</span>
            </div>
            <div className="relative group">
              <div className="w-full bg-surface-container-lowest border border-outline-variant p-3.5 flex items-center justify-between text-on-surface group-focus-within:border-primary transition-colors cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  <Icon name="flight_takeoff" className="text-[18px] text-primary shrink-0" />
                  <span className="font-spec-numeral text-spec-numeral truncate font-medium">{pickup.longLabel}</span>
                </div>
                <Icon name="expand_more" className="text-[18px] text-outline shrink-0" />
              </div>
              <select
                id="pickup-loc"
                value={state.loc}
                onChange={(e) => update({ loc: e.target.value, returnLoc: state.returnSame ? e.target.value : state.returnLoc })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.longLabel}
                  </option>
                ))}
              </select>
              <span className="font-label-mono text-[10px] text-outline mt-1.5 block">
                FLIGHT MONITORING ACTIVE · CHAUFFEUR DISPATCHED ON TOUCHDOWN
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-2">
              <label htmlFor="return-loc" className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant">
                RETURN CURBSIDE
              </label>
              <span className="font-label-mono text-[10px] text-outline uppercase tracking-wider">
                {state.returnSame ? "LOCKED TO ORIGIN" : "ALTERNATIVE PORT"}
              </span>
            </div>
            <div className="relative group">
              <div
                className={`w-full border p-3.5 flex items-center justify-between select-none transition-colors ${
                  state.returnSame
                    ? "bg-surface-container border-outline-variant/60 text-on-surface-variant"
                    : "bg-surface-container-lowest border-outline-variant text-on-surface group-focus-within:border-primary cursor-pointer"
                }`}
              >
                <div className={`flex items-center gap-3 min-w-0 ${state.returnSame ? "opacity-80" : ""}`}>
                  <Icon name="flight_land" className="text-[18px] text-secondary shrink-0" />
                  <span className="font-spec-numeral text-spec-numeral truncate">{dropoff.longLabel}</span>
                </div>
                <Icon name={state.returnSame ? "lock" : "expand_more"} className="text-[16px] text-outline shrink-0" />
              </div>
              {!state.returnSame && (
                <select
                  id="return-loc"
                  value={state.returnLoc}
                  onChange={(e) => update({ returnLoc: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.longLabel}
                    </option>
                  ))}
                </select>
              )}
              <span className="font-label-mono text-[10px] text-outline mt-1.5 block">
                {state.returnSame ? "UNCHECK TOGGLE ABOVE FOR ALTERNATIVE RETURN PORT" : "ONE-WAY RETURNS ARRANGED BY CONCIERGE"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Calendar */}
      <section className="mb-12 bg-surface-container-lowest border border-outline-variant p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 mb-6 border-b border-outline-variant gap-2">
          <div>
            <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest block">02 / CALENDAR ALLOCATION</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">Select Rental Window</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-primary" />
              <span className="font-label-mono text-label-mono text-on-surface uppercase">RESERVED RANGE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-surface-container-high border border-outline-variant" />
              <span className="font-label-mono text-label-mono text-outline uppercase">AVAILABLE</span>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {picking === "end" ? "Now choose the return date." : "Choose the pick-up date."}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {months.map(({ y, m }, idx) => (
            <div key={`${y}-${m}`} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
                <div className="flex items-center gap-2">
                  {idx === 0 && (
                    <button
                      type="button"
                      disabled={!canGoBack}
                      onClick={() => setView(m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 })}
                      aria-label="Previous month"
                      className="w-7 h-7 flex items-center justify-center text-outline hover:text-on-surface disabled:opacity-30"
                    >
                      <Icon name="chevron_left" className="text-[18px]" />
                    </button>
                  )}
                  <span className="font-headline-sm text-[18px] tracking-tight font-serif text-on-surface">
                    {MONTHS[m]} {y}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-mono text-[11px] text-outline uppercase">
                    {idx === 0 ? `${pickup.city.toUpperCase()} ${hubTz(new Date(y, m, 15), "shortOffset")}` : "AVAILABLE WINDOW"}
                  </span>
                  {idx === 1 && (
                    <button
                      type="button"
                      onClick={() => setView(view.m === 11 ? { y: view.y + 1, m: 0 } : { y: view.y, m: view.m + 1 })}
                      aria-label="Next month"
                      className="w-7 h-7 flex items-center justify-center text-outline hover:text-on-surface"
                    >
                      <Icon name="chevron_right" className="text-[18px]" />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-7 text-center font-label-mono text-[11px] text-outline uppercase tracking-wider py-1" aria-hidden>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>
              <div role="group" aria-label={`${MONTHS[m]} ${y}`} className="grid grid-cols-7 gap-y-1 font-spec-numeral text-spec-numeral text-center">
                {monthGrid(y, m).map((d) => {
                  const inMonth = d.getMonth() === m;
                  const day = ymd(d);
                  const past = d < today;
                  if (!inMonth) {
                    return (
                      <div key={day} className="py-2.5 text-outline-variant opacity-40" aria-hidden>
                        {pad(d.getDate())}
                      </div>
                    );
                  }
                  const isStart = day === fromDate;
                  const isEnd = day === toDate;
                  const inRange = day > fromDate && day < toDate;
                  const selected = isStart || isEnd || inRange;
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={past}
                      onClick={() => pickDay(d)}
                      aria-pressed={selected}
                      aria-label={`${d.getDate()} ${MONTHS[m]} ${y}${isStart ? ", pick-up" : isEnd ? ", return" : ""}`}
                      className={
                        selected
                          ? `py-2.5 bg-primary text-on-primary ${isStart || isEnd ? "font-bold" : "font-medium"} relative`
                          : past
                            ? "py-2.5 text-outline-variant opacity-50 cursor-not-allowed"
                            : "py-2.5 text-on-surface-variant hover:bg-surface-container transition-colors"
                      }
                    >
                      {pad(d.getDate())}
                      {(isStart || isEnd) && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-fixed" aria-hidden />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Handover Time Selectors */}
        <div className="mt-8 pt-6 border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 gap-6 bg-surface-container-low p-4 sm:p-6">
          {(
            [
              ["from", fromTime, fromD, "PICK-UP TIME", "FLIGHT MATCHED"],
              ["to", toTime, toD, "RETURN TIME", `EXACT ${hours}H CYCLE`],
            ] as const
          ).map(([which, time, date, label, tag]) => (
            <div key={which} className="space-y-1.5">
              <label htmlFor={`time-${which}`} className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface block">
                {label} ({pad(date.getDate())} {SHORT[date.getMonth()]})
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 bg-surface-container-lowest border border-outline-variant p-2.5 flex items-center justify-between focus-within:border-primary">
                  <span className="font-spec-numeral text-spec-numeral text-on-surface">{time} {hubTz(date, "short")}</span>
                  <Icon name="schedule" className="text-[18px] text-outline" />
                  <select
                    id={`time-${which}`}
                    value={time}
                    onChange={(e) => setTime(which, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  >
                    {SLOTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <span
                  className={`font-label-mono text-[10px] uppercase tracking-wider whitespace-nowrap ${which === "to" ? "text-primary font-bold" : "text-outline"}`}
                >
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <p role="alert" className="mt-4 flex items-center gap-2 font-body-sm text-body-sm text-error">
            <Icon name="error" className="text-[16px]" />
            {error}
          </p>
        )}
      </section>

      {/* Availability Banner */}
      {v.available ? (
        <div className="mb-12 bg-secondary-container/40 border border-primary/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-none bg-primary text-on-primary flex items-center justify-center shrink-0">
              <Icon name="done" className="text-[18px]" />
            </div>
            <div>
              <p className="font-body-md text-body-md font-semibold text-primary">
                {v.model} is available for these dates at {pickup.city}.
              </p>
              <p className="font-label-mono text-[11px] text-secondary mt-0.5">
                CHASSIS PREPARATION PROTOCOL COMMENCES 4 HOURS PRIOR TO TIMED APPOINTMENT.
              </p>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <span className="font-label-mono text-label-mono uppercase tracking-widest bg-primary-container text-on-primary px-3 py-1 block">
              EXHIBIT READY · {pickup.code}
            </span>
          </div>
        </div>
      ) : (
        <div role="alert" className="mb-12 bg-error-container/40 border border-error/30 p-5 flex items-center gap-3.5">
          <Icon name="event_busy" className="text-error" />
          <p className="font-body-md text-body-md font-semibold text-error">This exhibit is not available for the selected window.</p>
        </div>
      )}

      {/* Detail Bar */}
      <div className="mb-12 border border-outline-variant p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface">
        <div className="space-y-1">
          <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest block">WHITE-GLOVE SPECIFICATION</span>
          <p className="font-action text-action text-on-surface uppercase">Full Valet &amp; Key Exchange</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Dedicated concierge greets you immediately at curbside with vehicle pre-conditioned.
          </p>
        </div>
        <div className="space-y-1 md:border-l md:border-outline-variant md:pl-6">
          <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest block">CROSS-BORDER PERMIT</span>
          <p className="font-action text-action text-on-surface uppercase">Austria &amp; Switzerland Transit</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Includes digital motorway vignettes and pre-authorized Alpine pass access.</p>
        </div>
        <div className="space-y-1 md:border-l md:border-outline-variant md:pl-6">
          <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest block">MILEAGE ALLOWANCE</span>
          <p className="font-action text-action text-on-surface uppercase">
            {(days * KM_PER_DAY).toLocaleString("en-GB")} KM Allotted ({KM_PER_DAY} KM/Day)
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Over-allowance calibrated at €1.40/km upon final return inspection.</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 border-t border-outline-variant flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
        <Link
          className="font-action text-action uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
          href={`/fleet/${v.slug}?loc=${state.loc}&from=${state.from}&to=${state.to}`}
        >
          <Icon name="arrow_back" className="text-[16px]" />
          Back to car selection
        </Link>
        <button
          type="button"
          onClick={() => void next()}
          disabled={!v.available || checking}
          aria-busy={checking}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-on-primary py-3.5 px-8 rounded-none font-action text-action tracking-wider uppercase hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue to Extras</span>
          <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </div>
  );
}
