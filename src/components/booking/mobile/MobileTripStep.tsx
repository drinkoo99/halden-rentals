"use client";

import { useCatalogue } from "@/components/catalogue/CatalogueProvider";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { MobileBookingBar, MobileBookingHeader, MobileSheet, Switch } from "@/components/booking/mobile/MobileBookingChrome";
import { rentalDays } from "@/lib/itinerary";
import { formatEuroCents } from "@/lib/pricing";

/**
 * Mobile booking step 02 · Trip — Stitch "Mobile Booking: Trip (Step 1)", with the
 * "Mobile Booking: Hub Selector (Sheet)" and "Mobile Booking: Calendar (Sheet)" screens as the two
 * bottom sheets it opens.
 */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const SLOTS = Array.from({ length: 36 }, (_, i) => `${pad(6 + Math.floor(i / 2))}:${i % 2 ? "30" : "00"}`);
function dayLabel(v: string) {
  const d = new Date(`${v.slice(0, 10)}T00:00`);
  return { short: `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`, year: d.getFullYear() };
}

export function MobileTripStep() {
  const router = useRouter();
  const { vehicle: v, state, update, pickup, dropoff, days, quote } = useBooking();
  const [sheet, setSheet] = useState<null | "pickup" | "return" | "dates">(null);
  const [error, setError] = useState<string | null>(null);
  const fromTime = state.from.slice(11, 16);
  const toTime = state.to.slice(11, 16);
  const start = dayLabel(state.from);
  const end = dayLabel(state.to);

  function next() {
    if (new Date(state.to) <= new Date(state.from)) return setError("The return must be after the pick-up.");
    router.push(`/book/${v.slug}/extras`);
  }

  return (
    <div className="md:hidden bg-background text-on-surface antialiased flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <MobileBookingHeader step={2} subtitle="Transit & Allocation" />
      <div className="flex flex-col relative w-full max-w-[430px] mx-auto pt-28 pb-28 bg-surface min-h-screen px-margin-mobile">
        <div className="flex flex-col w-full pb-8">
          <div className="pt-4 pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-mono text-label-mono uppercase tracking-[0.16em] text-primary">{"Step 02 // Transit & Allocation"}</span>
              <span className="font-label-mono text-[10px] tracking-widest text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-[2px]">
                EXHIBIT {v.exhibit}
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Trip Itinerary</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">Choose your handover hub, dates and curbside times.</p>
          </div>
          <div className="w-full bg-secondary-container/60 p-3.5 mb-5 flex items-start gap-3 rounded-[2px]" role="status">
            <div className="relative flex items-center justify-center shrink-0 w-3 h-3 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary font-bold">Allocation Confirmed</span>
              <span className="font-body-sm text-[12px] text-on-secondary-fixed leading-tight mt-0.5">
                {v.name} is staged and available at {pickup.city} for the selected schedule.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <HubButton label="Pick-up Hub" icon="location_on" name={pickup.label} detail={pickup.terminalPoint} onClick={() => setSheet("pickup")} />
            <div className="w-full bg-surface-container-low p-4 rounded-[2px] flex items-center justify-between gap-4">
              <div className="flex flex-col pr-2">
                <span className="font-body-md text-body-md font-medium text-on-surface" id="return-same-label">
                  Return to same location
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Complimentary same-hub return</span>
              </div>
              <Switch
                checked={state.returnSame}
                labelledBy="return-same-label"
                onChange={(on) => update(on ? { returnSame: true, returnLoc: state.loc } : { returnSame: false })}
              />
            </div>
            {!state.returnSame && (
              <HubButton label="Return Hub" icon="storefront" name={dropoff.label} detail={dropoff.terminalPoint} onClick={() => setSheet("return")} />
            )}
            <button
              className="w-full text-left bg-surface-container-lowest p-4 rounded-[2px] active:bg-surface-container transition-colors group"
              onClick={() => setSheet("dates")}
              type="button"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-mono text-[10px] uppercase tracking-[0.14em] text-outline font-medium">Reservation Dates</span>
                <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary flex items-center gap-0.5">
                  Calendar{" "}
                  <span className="material-symbols-outlined text-[12px]" aria-hidden>
                    calendar_today
                  </span>
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-spec-numeral text-[16px] font-semibold text-on-surface">{start.short}</span>
                    <span className="font-label-mono text-outline text-[12px]">→</span>
                    <span className="font-spec-numeral text-[16px] font-semibold text-on-surface">
                      {end.short} {end.year}
                    </span>
                  </div>
                  <span className="font-label-mono text-[11px] text-secondary tracking-wider mt-0.5">
                    {days} {days === 1 ? "DAY" : "DAYS"} ({days * 24} HOURS)
                  </span>
                </div>
                <div className="w-8 h-8 rounded-[2px] bg-surface-container-low flex items-center justify-center shrink-0 text-on-surface">
                  <span className="material-symbols-outlined text-[18px]" aria-hidden>
                    edit_calendar
                  </span>
                </div>
              </div>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <TimeSelect label="Pick-up Time" value={fromTime} tz={pickup.timezone} onChange={(t) => update({ from: `${state.from.slice(0, 10)}T${t}` })} />
              <TimeSelect label="Return Time" value={toTime} tz={dropoff.timezone} onChange={(t) => update({ to: `${state.to.slice(0, 10)}T${t}` })} />
            </div>
            {error && (
              <p role="alert" className="font-body-sm text-[12px] text-error flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]" aria-hidden>
                  error
                </span>
                {error}
              </p>
            )}
          </div>
          <div className="mt-6 pt-5 pb-2 bg-surface-container-low/50 px-4 rounded-[2px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary text-[16px]" aria-hidden>
                concierge
              </span>
              <span className="font-label-mono text-[10px] uppercase tracking-[0.16em] text-on-surface font-semibold">HALDEN Concierge Protocol</span>
            </div>
            <ul className="flex flex-col gap-2 font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-label-mono text-primary text-[10px] mt-0.5">01</span>{" "}
                <span>A HALDEN custodian will await your arrival at {pickup.terminalPoint} with the keys in hand.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-label-mono text-primary text-[10px] mt-0.5">02</span>{" "}
                <span>Cabin climate and your route are prepared 30 minutes before the handover window.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MobileBookingBar label="Continue" onAction={next} />

      {(sheet === "pickup" || sheet === "return") && (
        <HubSheet
          current={sheet === "pickup" ? state.loc : state.returnLoc}
          onClose={() => setSheet(null)}
          onConfirm={(id) => {
            update(sheet === "pickup" ? { loc: id, ...(state.returnSame ? { returnLoc: id } : {}) } : { returnLoc: id });
            setSheet(null);
          }}
        />
      )}
      {sheet === "dates" && (
        <CalendarSheet
          from={state.from}
          to={state.to}
          dailyRate={quote.dailyRate}
          vehicleName={v.name}
          onClose={() => setSheet(null)}
          onApply={(f, t) => {
            update({ from: `${f}T${fromTime}`, to: `${t}T${toTime}` });
            setError(null);
            setSheet(null);
          }}
        />
      )}
    </div>
  );
}

function HubButton({ label, icon, name, detail, onClick }: { label: string; icon: string; name: string; detail: string; onClick: () => void }) {
  return (
    <button className="w-full text-left bg-surface-container-lowest p-4 rounded-[2px] active:bg-surface-container transition-colors group" onClick={onClick} type="button">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-label-mono text-[10px] uppercase tracking-[0.14em] text-outline font-medium">{label}</span>
        <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
          Change{" "}
          <span className="material-symbols-outlined text-[12px]" aria-hidden>
            chevron_right
          </span>
        </span>
      </div>
      <div className="flex items-start gap-3 mt-1">
        <div className="w-8 h-8 rounded-[2px] bg-surface-container flex items-center justify-center shrink-0 text-primary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden>
            {icon}
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-body-md text-body-md font-semibold text-on-surface truncate">{name}</span>
          <span className="font-body-sm text-[12px] text-on-surface-variant truncate">{detail}</span>
        </div>
      </div>
    </button>
  );
}

function TimeSelect({ label, value, tz, onChange }: { label: string; value: string; tz: string; onChange: (v: string) => void }) {
  const id = `mobile-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className="bg-surface-container-lowest p-3.5 rounded-[2px] flex flex-col justify-between">
      <label className="font-label-mono text-[10px] uppercase tracking-[0.12em] text-outline" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 relative flex items-center justify-between group">
        <div className="flex flex-col">
          <span className="font-spec-numeral text-[15px] font-medium text-on-surface">{value}</span>
          <span className="font-label-mono text-[10px] text-on-surface-variant">{tz} · Curbside</span>
        </div>
        <span className="material-symbols-outlined text-outline text-[16px] group-hover:text-primary transition-colors" aria-hidden>
          schedule
        </span>
        {/* Native picker over the Stitch layout: the phone's own time wheel, and accessible to screen readers */}
        <select id={id} className="absolute inset-0 opacity-0 cursor-pointer" value={value} onChange={(e) => onChange(e.target.value)}>
          {SLOTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function HubSheet({ current, onClose, onConfirm }: { current: string; onClose: () => void; onConfirm: (id: string) => void }) {
  const [picked, setPicked] = useState(current);
  const { locations } = useCatalogue();
  return (
    <MobileSheet title="Pavilion & Handover Stations" kicker="Select Hub" onClose={onClose} labelledBy="hub-sheet-title">
      <div className="px-5 py-2 bg-surface-container-low flex items-center justify-between">
        <span className="font-label-mono text-[10px] uppercase tracking-wider text-outline">Central European Circuit</span>
        <span className="font-spec-numeral text-[11px] text-primary font-medium">{String(locations.length).padStart(2, "0")} Hubs Open</span>
      </div>
      <div className="overflow-y-auto overscroll-contain px-5 py-2 flex flex-col divide-y divide-outline-variant/30" role="radiogroup" aria-labelledby="hub-sheet-title">
        {locations.map((l) => {
          const on = l.id === picked;
          return (
            <button key={l.id} aria-checked={on} className="py-3.5 flex flex-col gap-2 min-h-[56px] text-left" onClick={() => setPicked(l.id)} role="radio" type="button">
              <div className="flex items-start justify-between gap-3 w-full">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-sm text-[18px] leading-tight text-on-surface">{l.label}</span>
                    {l.id === current && <span className="font-label-mono text-[10px] text-primary tracking-widest uppercase font-semibold">Current</span>}
                  </div>
                  <span className="font-label-mono text-[10px] text-outline tracking-wider uppercase mt-0.5">{l.coordinates}</span>
                </div>
                <div className={`w-5 h-5 shrink-0 flex items-center justify-center rounded-[2px] transition-all ${on ? "bg-primary" : "bg-surface-container-high"}`}>
                  <span className={`material-symbols-outlined text-[15px] font-bold ${on ? "text-on-primary" : "text-transparent"}`} aria-hidden>
                    check
                  </span>
                </div>
              </div>
              <div className={`${on ? "bg-surface-container" : "bg-surface-container-low"} p-2.5 rounded-[2px] flex items-center gap-2 w-full`}>
                <span className={`material-symbols-outlined text-[16px] shrink-0 ${on ? "text-primary" : "text-outline"}`} aria-hidden>
                  {on ? "near_me" : "schedule"}
                </span>
                <p className="font-body-sm text-[12px] leading-tight text-on-surface-variant">
                  {l.terminalPoint} · Handover {l.handoverWindow}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <div className="px-5 pt-3 pb-6 bg-surface flex flex-col gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between text-outline text-[11px] font-label-mono uppercase tracking-wider px-1">
          <span>Handover Protocol</span>
          <span className="text-primary font-medium">Bespoke Concierge</span>
        </div>
        <button
          className="w-full h-12 bg-primary text-on-primary font-action text-action flex items-center justify-center gap-2 rounded-[2px] hover:bg-primary-container active:scale-[0.99] transition-all"
          onClick={() => onConfirm(picked)}
          type="button"
        >
          <span>Confirm Selection</span> <span className="font-label-mono text-xs">→</span>
        </button>
      </div>
    </MobileSheet>
  );
}

function monthCells(y: number, m: number) {
  const lead = (new Date(y, m, 1).getDay() + 6) % 7; // Monday-first weeks
  const count = new Date(y, m + 1, 0).getDate();
  return { lead, days: Array.from({ length: count }, (_, i) => new Date(y, m, i + 1)) };
}

function CalendarSheet({
  from,
  to,
  dailyRate,
  vehicleName,
  onClose,
  onApply,
}: {
  from: string;
  to: string;
  dailyRate: number;
  vehicleName: string;
  onClose: () => void;
  onApply: (from: string, to: string) => void;
}) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [start, setStart] = useState(from.slice(0, 10));
  const [end, setEnd] = useState<string | null>(to.slice(0, 10));
  const [anchor] = useState(() => {
    const s = new Date(`${from.slice(0, 10)}T00:00`);
    return new Date(s.getFullYear(), s.getMonth(), 1);
  });
  const months = [0, 1, 2].map((i) => new Date(anchor.getFullYear(), anchor.getMonth() + i, 1));
  const n = end ? rentalDays(`${start}T00:00`, `${end}T00:00`) : 0;

  function pick(d: Date) {
    const day = ymd(d);
    if (end || day <= start) {
      setStart(day);
      setEnd(null);
    } else setEnd(day);
  }
  const fmt = (v: string) => {
    const d = new Date(`${v}T00:00`);
    return `${pad(d.getDate())} ${SHORT[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <MobileSheet title="Select Itinerary Dates" kicker="Archival Window" onClose={onClose} labelledBy="calendar-sheet-title">
      <div className="overflow-y-auto overscroll-contain px-margin-mobile">
        <div className="w-full bg-surface-container-low p-4 rounded mb-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">Archival Window</span>
            <span className="font-spec-numeral text-spec-numeral font-bold text-primary">
              €{dailyRate} <span className="font-normal text-[11px] text-on-surface-variant">/ day</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2" aria-live="polite">
            <span className="font-spec-numeral text-[18px] font-bold tracking-tight text-on-surface">{fmt(start)}</span>
            <span className="font-label-mono text-[13px] text-outline">→</span>
            <span className="font-spec-numeral text-[18px] font-bold tracking-tight text-on-surface">{end ? fmt(end) : "—"}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="font-label-mono text-[11px] uppercase tracking-wider text-secondary">
              {end ? `${n} ${n === 1 ? "Day" : "Days"} (${n * 24} Hours)` : "Now tap the return date"}
            </span>
          </div>
        </div>
        <div className="sticky top-0 bg-surface z-10 grid grid-cols-7 gap-1 pb-3 text-center" aria-hidden>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="font-label-mono text-[11px] text-outline font-semibold">
              {d}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-8 w-full pb-4">
          {months.map((mo) => {
            const { lead, days } = monthCells(mo.getFullYear(), mo.getMonth());
            return (
              <div key={mo.getTime()} className="flex flex-col w-full">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">
                  {MONTHS[mo.getMonth()]} {mo.getFullYear()}
                </h3>
                <div className="grid grid-cols-7 gap-y-1 gap-x-0 w-full text-center">
                  {Array.from({ length: lead }, (_, i) => (
                    <div key={`b${i}`} className="h-10" />
                  ))}
                  {days.map((d) => {
                    const day = ymd(d);
                    const past = d < today;
                    const isStart = day === start;
                    const isEnd = day === end;
                    const inRange = !!end && day > start && day < end;
                    const name = `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
                    if (isStart || isEnd) {
                      const band = !end
                        ? ""
                        : isStart
                          ? "bg-linear-to-r from-transparent via-secondary-container to-secondary-container"
                          : "bg-linear-to-l from-transparent via-secondary-container to-secondary-container";
                      return (
                        <div key={day} className={`h-10 w-full flex items-center justify-center relative ${band}`}>
                          <button
                            aria-label={`${name}, ${isStart ? "pick-up" : "return"}`}
                            aria-pressed="true"
                            className="w-9 h-9 rounded-full bg-primary text-on-primary font-spec-numeral text-spec-numeral font-bold flex items-center justify-center z-10 shadow-sm"
                            onClick={() => pick(d)}
                            type="button"
                          >
                            {d.getDate()}
                          </button>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={day}
                        aria-label={name}
                        className={
                          inRange
                            ? "h-10 w-full flex items-center justify-center bg-secondary-container font-spec-numeral text-spec-numeral text-on-secondary-fixed font-semibold"
                            : `h-10 w-full flex items-center justify-center font-spec-numeral text-spec-numeral transition-colors rounded-sm ${
                                past ? "text-outline-variant cursor-not-allowed" : "text-on-surface hover:bg-surface-container-high"
                              }`
                        }
                        disabled={past}
                        onClick={() => pick(d)}
                        type="button"
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-surface-container-low p-4 rounded mb-5 flex flex-col gap-3">
          <div className="flex items-center justify-between text-on-surface">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-primary rounded-full" />
              <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface">Selected Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-secondary-container rounded-sm" />
              <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface">Journey</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-surface-container-high rounded-sm" />
              <span className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant">Available</span>
            </div>
          </div>
          <div className="flex items-start gap-2 pt-2 bg-surface-container-lowest/50 p-2.5 rounded">
            <span className="material-symbols-outlined text-[15px] text-primary shrink-0 mt-0.5" aria-hidden>
              info
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
              The {vehicleName} is rented in full days, from your pick-up time to your return time.
            </span>
          </div>
        </div>
        <div className="w-full pt-1 pb-4">
          <button
            className="w-full py-3.5 px-5 bg-primary text-on-primary font-action text-action flex items-center justify-between rounded-[2px] active:scale-[0.99] transition-transform disabled:opacity-50"
            disabled={!end}
            onClick={() => end && onApply(start, end)}
            type="button"
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]" aria-hidden>
                calendar_today
              </span>
              <span>Confirm Dates</span>
            </span>
            <span className="font-spec-numeral text-[13px] font-semibold tracking-wide text-primary-fixed">
              {end ? `${n} ${n === 1 ? "Day" : "Days"} · ${formatEuroCents(n * dailyRate)}` : "—"}
            </span>
          </button>
        </div>
      </div>
    </MobileSheet>
  );
}
