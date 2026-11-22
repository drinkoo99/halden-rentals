/**
 * Hub-local times (M7). The booking flow picks "2030-06-12T10:00" at a hub; that means 10:00 in the hub's
 * time zone (locations.timezone, IANA), whatever the visitor's own device clock says. These helpers turn
 * such a wall-clock time into an absolute instant and back, using only Intl (correct across DST changes).
 */

export const LOCAL_DATETIME = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

/** Offset of `timeZone` from UTC at instant `at`, in minutes (e.g. +120 for Europe/Zurich in summer). */
function offsetMinutes(at: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(at);
  const n = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asUtc = Date.UTC(n("year"), n("month") - 1, n("day"), n("hour"), n("minute"), n("second"));
  return Math.round((asUtc - Math.floor(at.getTime() / 1000) * 1000) / 60_000);
}

/**
 * "2030-06-12T10:00" at Europe/Zurich → the instant 2030-06-12T08:00:00Z. Returns null for malformed or
 * non-existent wall-clock times (e.g. 02:30 on the night clocks spring forward).
 */
export function zonedToInstant(local: string, timeZone: string): Date | null {
  const m = LOCAL_DATETIME.exec(local);
  if (!m) return null;
  const [y, mo, d, h, mi] = m.slice(1).map(Number);
  const wall = Date.UTC(y, mo - 1, d, h, mi);
  if (Number.isNaN(wall)) return null;
  // two passes converge for every real offset; the round trip rejects times skipped by DST
  let guess = wall - offsetMinutes(new Date(wall), timeZone) * 60_000;
  guess = wall - offsetMinutes(new Date(guess), timeZone) * 60_000;
  const instant = new Date(guess);
  return instantToZoned(instant, timeZone) === local ? instant : null;
}

/** The instant as "YYYY-MM-DDTHH:mm" wall-clock time in `timeZone`. */
export function instantToZoned(at: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(at);
  const v = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${v("year")}-${v("month")}-${v("day")}T${v("hour")}:${v("minute")}`;
}

/** Billable days: every started 24 hours counts (the booking screens' rule), at least one. */
export function billableDays(start: Date, end: Date): number {
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86_400_000));
}
