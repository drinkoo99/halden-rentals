import { queryOf, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { bookingContext } from "@/server/bookings/context";
import { staffBookingQuery } from "@/server/bookings/schemas";
import { staffBookings } from "@/server/bookings/store";
import { toStaffBooking } from "@/server/bookings/views";
import { unitsOf } from "@/server/fleet/store";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/staff/bookings?status=&location=&from=&to=&q= — bookings for operations (staff/admin). */
export const GET = route("staff-bookings-list", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const query = staffBookingQuery.parse(queryOf(request));
  const ctx = await bookingContext();
  const docs = await staffBookings(ctx, query);
  const ids = docs.flatMap((d) => (d.unitId ? [d.unitId] : []));
  const units = ids.length ? await unitsOf(ctx).find({ _id: { $in: ids } }).toArray() : [];
  return json({ data: docs.map((d) => toStaffBooking(d, units.find((u) => d.unitId && u._id.equals(d.unitId)))) });
});
