import { requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { toStaffBooking } from "@/server/bookings/views";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";
import { parseObjectId, peopleContext } from "@/server/staff/context";
import { getPerson } from "@/server/staff/people";

/** GET /api/v1/staff/customers/:id — one customer with their bookings (staff/admin). Staff accounts are not customers: 404. */
export const GET = route<{ id: string }>("staff-customer", async (request, { params }) => {
  await requireApiRole(request, STAFF_ROLES);
  const { user, bookings } = await getPerson(await peopleContext(), parseObjectId(params.id));
  if (user.role !== "customer") throw new AppError("NOT_FOUND", "No such account.");
  return json({ data: { user, bookings: bookings.map((b) => toStaffBooking(b)) } });
});
