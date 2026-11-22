import { ObjectId } from "mongodb";
import { readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { actorOf, bookingContext } from "@/server/bookings/context";
import { assignInput, cancelInput, checkInInput, checkOutInput, noteInput, referenceSchema } from "@/server/bookings/schemas";
import { addStaffNote, assignUnit, cancelBooking, checkIn, checkOut, confirmBooking, type BookingDoc } from "@/server/bookings/store";
import { toStaffBooking } from "@/server/bookings/views";
import { unitsOf } from "@/server/fleet/store";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";

/**
 * POST /api/v1/staff/bookings/:reference/:action — the only way staff change a booking; each action is a
 * named lifecycle step with its own rules (no generic status update):
 *   confirm · cancel { reason? } · assign { unitId } · check-out { mileageKm? } ·
 *   check-in { mileageKm, needsService?, note? } · notes { note }
 */
export const POST = route<{ reference: string; action: string }>("staff-bookings-action", async (request, { params }) => {
  const user = await requireApiRole(request, STAFF_ROLES);
  const ref = referenceSchema.safeParse(params.reference);
  if (!ref.success) throw new AppError("NOT_FOUND", "No such booking.");
  const ctx = await bookingContext();
  const staff = actorOf(user);
  let booking: BookingDoc;
  switch (params.action) {
    case "confirm":
      booking = (await confirmBooking(ctx, ref.data, staff)).booking;
      break;
    case "cancel":
      booking = (await cancelBooking(ctx, ref.data, staff, (await readJson(request, cancelInput)).reason)).booking;
      break;
    case "assign":
      booking = await assignUnit(ctx, ref.data, new ObjectId((await readJson(request, assignInput)).unitId), staff);
      break;
    case "check-out":
      booking = await checkOut(ctx, ref.data, staff, (await readJson(request, checkOutInput)).mileageKm);
      break;
    case "check-in":
      booking = await checkIn(ctx, ref.data, staff, await readJson(request, checkInInput));
      break;
    case "notes":
      booking = await addStaffNote(ctx, ref.data, staff, (await readJson(request, noteInput)).note);
      break;
    default:
      throw new AppError("NOT_FOUND", "No such booking action.");
  }
  const unit = booking.unitId ? await unitsOf(ctx).findOne({ _id: booking.unitId }) : null;
  return json({ data: toStaffBooking(booking, unit) });
});
