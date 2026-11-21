import { z } from "zod";

/** Principal-driver rules from Stitch screens 19 ("Patron criteria") and 22 (details form). */
export const MIN_DRIVER_AGE = 28;

export const licenceCountries = [
  { code: "CHE", label: "Switzerland (CH)" },
  { code: "DEU", label: "Germany (DE)" },
  { code: "AUT", label: "Austria (AT)" },
  { code: "ITA", label: "Italy (IT)" },
  { code: "FRA", label: "France (FR)" },
  { code: "GBR", label: "United Kingdom (UK)" },
  { code: "NLD", label: "Netherlands (NL)" },
  { code: "USA", label: "United States (US)" },
  { code: "OTHER", label: "Other — International Driving Permit" },
] as const;

/** Parses "DD / MM / YYYY" (spaces optional, "." or "-" also accepted). Returns null when invalid. */
export function parseDob(v: string): Date | null {
  const m = v.trim().match(/^(\d{1,2})\s*[/.-]\s*(\d{1,2})\s*[/.-]\s*(\d{4})$/);
  if (!m) return null;
  const [, d, mo, y] = m.map(Number);
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
}

export function ageOn(dob: Date, on: Date = new Date()): number {
  let age = on.getFullYear() - dob.getFullYear();
  const m = on.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && on.getDate() < dob.getDate())) age--;
  return age;
}

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Enter your ${label}.`)
    .max(60, `${label[0].toUpperCase() + label.slice(1)} is too long.`)
    .regex(/^[\p{L}][\p{L}' .-]*$/u, `Use letters only for your ${label}.`);

export const driverSchema = z.object({
  firstName: name("first name"),
  lastName: name("last name"),
  email: z.email("Enter a valid email address for your confirmation."),
  phone: z
    .string()
    .trim()
    .refine((v) => /^\+[1-9]\d{7,14}$/.test(v.replace(/[\s()-]/g, "")), {
      message:
        "Please enter a valid international mobile phone number including country code (e.g. +41 79 123 4567) for curbside SMS coordination.",
    }),
  dob: z
    .string()
    .trim()
    .refine((v) => parseDob(v) !== null, { message: "Enter your date of birth as DD / MM / YYYY." })
    .refine((v) => {
      const d = parseDob(v);
      return !d || ageOn(d) >= MIN_DRIVER_AGE;
    }, { message: `HALDEN patrons must be ${MIN_DRIVER_AGE} or older.` })
    .refine((v) => {
      const d = parseDob(v);
      return !d || ageOn(d) <= 100;
    }, { message: "Check the year of birth." }),
  licenceCountry: z.enum(licenceCountries.map((c) => c.code) as [string, ...string[]], {
    message: "Choose the country that issued your licence.",
  }),
  licenceNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9][A-Z0-9 -]{3,23}$/, "Enter your licence number as printed on the card."),
  notes: z.string().trim().max(500, "Keep notes under 500 characters.").optional().or(z.literal("")),
});

export type DriverDetails = z.infer<typeof driverSchema>;
