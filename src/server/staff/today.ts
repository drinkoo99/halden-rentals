/** The console header date, e.g. "SUN, 22 NOV 2026". */
export const staffToday = (now: Date = new Date()) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(now).toUpperCase();
