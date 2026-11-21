import { getLocation, type Location } from "@/data/locations";

/**
 * The rental itinerary (pick-up hub + dates) travels between pages in the URL:
 *   ?loc=muc&from=2025-06-12T10:00&to=2025-06-15T10:00
 * so the fleet, detail and booking screens all show the same trip.
 */
export type Itinerary = {
  location: Location;
  /** Local date-time string "YYYY-MM-DDTHH:mm" */
  from: string;
  to: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function toLocalInput(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Default trip: pick-up in 7 days at 10:00, three-day rental. Computed on the client. */
export function defaultItinerary(now: Date = new Date()): { from: string; to: string } {
  const from = new Date(now);
  from.setDate(from.getDate() + 7);
  from.setHours(10, 0, 0, 0);
  const to = new Date(from);
  to.setDate(to.getDate() + 3);
  return { from: toLocalInput(from), to: toLocalInput(to) };
}

const isValidLocal = (v: string | null | undefined): v is string =>
  !!v && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v) && !Number.isNaN(new Date(v).getTime());

export function readItinerary(params: URLSearchParams | null): Itinerary {
  const fallback = defaultItinerary();
  const from = params?.get("from");
  const to = params?.get("to");
  const validFrom = isValidLocal(from) ? from : fallback.from;
  let validTo = isValidLocal(to) ? to : fallback.to;
  if (new Date(validTo) <= new Date(validFrom)) {
    const t = new Date(validFrom);
    t.setDate(t.getDate() + 3);
    validTo = toLocalInput(t);
  }
  return { location: getLocation(params?.get("loc")), from: validFrom, to: validTo };
}

export function itineraryQuery(it: { location: Location | string; from: string; to: string }): string {
  const loc = typeof it.location === "string" ? it.location : it.location.id;
  return new URLSearchParams({ loc, from: it.from, to: it.to }).toString();
}

/** Rental days, rounded up to whole days (minimum 1). */
export function rentalDays(from: string, to: string): number {
  const ms = new Date(to).getTime() - new Date(from).getTime();
  return Math.max(1, Math.ceil(ms / 86_400_000));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "14 Oct, 09:30" — homepage search bar format */
export function formatDayTime(v: string): string {
  const d = new Date(v);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "12 Jun 10:00" — fleet strip format */
export function formatDayTimeCompact(v: string): string {
  const d = new Date(v);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "12 Jun 2025, 10:00" — booking panel format */
export function formatDayTimeYear(v: string): string {
  const d = new Date(v);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** "12 Jun" */
export function formatDay(v: string): string {
  const d = new Date(v);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function formatEuro(n: number): string {
  return `€${Math.round(n).toLocaleString("en-GB")}`;
}
