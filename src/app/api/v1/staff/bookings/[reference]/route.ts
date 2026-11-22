import { requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { bookingContext } from "@/server/bookings/context";
import { referenceSchema } from "@/server/bookings/schemas";
import { staffBooking } from "@/server/bookings/store";
import { toStaffBooking } from "@/server/bookings/views";
import { unitsOf } from "@/server/fleet/store";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/staff/bookings/:reference — full operational view (staff/admin). */
export const GET = route<{ reference: string }>("staff-bookings-get", async (request, { params }) => {
  await requireApiRole(request, STAFF_ROLES);
  const ref = referenceSchema.safeParse(params.reference);
  if (!ref.success) throw new AppError("NOT_FOUND", "No such booking.");
  const ctx = await bookingContext();
  const b = await staffBooking(ctx, ref.data);
  const unit = b.unitId ? await unitsOf(ctx).findOne({ _id: b.unitId }) : null;
  return json({ data: toStaffBooking(b, unit) });
});
