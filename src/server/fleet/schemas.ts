import { z } from "zod";
import { locationCodeSchema, slugSchema } from "../catalogue/schemas";

/**
 * Physical fleet inventory (M6). A fleet unit is one real car; it references a catalogue vehicle model
 * (`vehicleModels.slug`) and a hub (`locations.code`). Pure: shared by the store, the API and tests.
 */

export { canTransition, FLEET_STATUSES, STATUS_TRANSITIONS, type FleetStatus } from "./statuses";
import { FLEET_STATUSES } from "./statuses";

/** Plates are stored upper-case with single spaces: "zh  91104" and "ZH 91104" are the same plate. */
export const registrationSchema = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase().replace(/\s+/g, " "))
  .pipe(z.string().regex(/^[A-Z0-9](?:[A-Z0-9 -]{0,13}[A-Z0-9])?$/, "must be 1–15 letters, digits, spaces or '-'"));

/** ISO 3779 VIN: 17 characters, no I, O or Q. */
export const vinSchema = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase())
  .pipe(z.string().regex(/^[A-HJ-NPR-Z0-9]{17}$/, "must be a 17-character VIN (no I, O or Q)"));

export const MAX_MILEAGE_KM = 2_000_000;
export const mileageSchema = z.number().int("must be whole kilometres").min(0).max(MAX_MILEAGE_KM);
export const yearSchema = z.number().int().min(1950).max(2100);
export const notesSchema = z.string().trim().max(1000, "Use at most 1000 characters.");

export const createUnitInput = z.strictObject({
  modelSlug: slugSchema,
  registration: registrationSchema,
  vin: vinSchema.optional(),
  locationCode: locationCodeSchema,
  mileageKm: mileageSchema,
  year: yearSchema,
  notes: notesSchema.optional(),
  /** a new car starts available, in maintenance (preparation) or inactive; never "rented" */
  status: z.enum(["available", "maintenance", "inactive"]).default("available"),
});
export type CreateUnitInput = z.infer<typeof createUnitInput>;

/** Updatable details. The model is fixed for a physical car; status has its own endpoint (transitions). */
export const updateUnitInput = z
  .strictObject({
    registration: registrationSchema,
    vin: vinSchema.nullable(),
    locationCode: locationCodeSchema,
    mileageKm: mileageSchema,
    year: yearSchema,
    notes: notesSchema.nullable(),
  })
  .partial()
  .refine((v) => Object.keys(v).length > 0, "Send at least one field to update.");
export type UpdateUnitInput = z.infer<typeof updateUnitInput>;

export const statusInput = z.strictObject({ status: z.enum(FLEET_STATUSES) });

export const fleetQuery = z.strictObject({
  model: slugSchema.optional(),
  location: locationCodeSchema.optional(),
  status: z.enum(FLEET_STATUSES).optional(),
});

/** ISO 8601 date-time WITH seconds and a time zone (e.g. 2030-06-10T10:00:00Z or …+02:00), so a period is never ambiguous. */
export const instantSchema = z.iso.datetime({ offset: true }).transform((s) => new Date(s));

export const BLOCK_KINDS = ["maintenance", "unavailable"] as const;
export const MAX_BLOCK_MS = 365 * 24 * 3600_000;
export const blockInput = z
  .strictObject({ kind: z.enum(BLOCK_KINDS), startsAt: instantSchema, endsAt: instantSchema, reason: notesSchema.optional() })
  // (zod still runs object refinements when a field failed, so check the fields parsed to dates first)
  .refine((b) => !(b.startsAt instanceof Date && b.endsAt instanceof Date) || b.endsAt > b.startsAt, { message: "must end after it starts", path: ["endsAt"] })
  .refine((b) => !(b.startsAt instanceof Date && b.endsAt instanceof Date) || b.endsAt.getTime() - b.startsAt.getTime() <= MAX_BLOCK_MS, {
    message: "can last at most 365 days",
    path: ["endsAt"],
  });
export type BlockInput = z.infer<typeof blockInput>;

export const availabilityQuery = z
  .strictObject({ model: slugSchema, pickup: locationCodeSchema, return: locationCodeSchema.optional(), from: instantSchema, to: instantSchema })
  .transform((q) => ({ modelSlug: q.model, pickupLocationCode: q.pickup, returnLocationCode: q.return ?? q.pickup, start: q.from, end: q.to }));
