/** Minimal iCalendar (.ics) file for a HALDEN handover, generated in the browser. */
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");

export function reservationIcs({
  ref,
  title,
  start,
  end,
  location,
  description,
}: {
  ref: string;
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HALDEN//Reservations//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${ref}@halden.example`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(new Date(start))}`,
    `DTEND:${stamp(new Date(end))}`,
    `SUMMARY:${esc(title)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Triggers a download of the .ics in the browser (no server involved). */
export function downloadIcs(filename: string, ics: string) {
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
