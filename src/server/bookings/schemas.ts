import { z } from "zod";
import { driverSchema } from "@/lib/booking/driverSchema";
import { extraCodeSchema, locationCodeSchema, slugSchema } from "../catalogue/schemas";
import { BOOKING_STATUSES } from "./statuses";
import { LOCAL_DATETIME } from "./time";

/** Booking request inputs (M7). Times are hub-local wall-clock times ("YYYY-MM-DDTHH:mm"). */

const localDateTime = z.string().regex(LOCAL_DATETIME, "use YYYY-MM-DDTHH:mm (hub local time)");

/** Extras as { code: quantity }; zero quantities are dropped. */
const extrasSelection = z
  .record(extraCodeSchema, z.number().int().min(0).max(10))
  .default({})
  .transform((m) => Object.fromEntries(Object.entries(m).filter(([, q]) => q > 0)));

export const tripInput = z.strictObject({
  model: slugSchema,
  pickup: locationCodeSchema,
  return: locationCodeSchema.optional(),
  from: localDateTime,
  to: localDateTime,
  extras: extrasSelection,
});
export type TripInput = z.infer<typeof tripInput>;

/** POST /bookings — trip + principal driver; the reviewed total guards against a price change in between. */
export const createBookingInput = tripInput.extend({
  driver: driverSchema,
  idempotencyKey: z.uuid(),
  expectedTotalCents: z.number().int().min(0),
});
export type CreateBookingInput = z.infer<typeof createBookingInput>;

export const BOOKING_REFERENCE = /^HLD-\d{4}-[A-Z0-9]{4}$/;
export const referenceSchema = z.string().trim().toUpperCase().regex(BOOKING_REFERENCE, "not a booking reference");

export const cancelInput = z.strictObject({ reason: z.string().trim().max(500).optional() });
export const assignInput = z.strictObject({ unitId: z.string().regex(/^[0-9a-f]{24}$/i, "not a fleet unit id") });
export const checkOutInput = z.strictObject({ mileageKm: z.number().int().min(0).max(2_000_000).optional() });
export const checkInInput = z.strictObject({
  mileageKm: z.number().int().min(0).max(2_000_000),
  /** send the car to maintenance instead of back into service */
  needsService: z.boolean().default(false),
  note: z.string().trim().max(500).optional(),
});
export const noteInput = z.strictObject({ note: z.string().trim().min(1).max(1000) });

export const staffBookingQuery = z.strictObject({
  status: z.enum(BOOKING_STATUSES).optional(),
  location: locationCodeSchema.optional(),
  /** pick-ups on or after this day (YYYY-MM-DD, UTC) */
  from: z.iso.date().optional(),
  /** pick-ups before the end of this day (YYYY-MM-DD, UTC) */
  to: z.iso.date().optional(),
  /** reference, customer name or email (case-insensitive) */
  q: z.string().trim().min(2).max(80).optional(),
});
