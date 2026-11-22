import { queryOf, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { checkAvailability } from "@/server/availability/service";
import { bookingContext } from "@/server/bookings/context";
import { bookingReservations } from "@/server/bookings/store";
import { availabilityQuery } from "@/server/fleet/schemas";
import { json, route } from "@/server/http/handler";

/**
 * GET /api/v1/staff/availability?model=&pickup=&return=&from=&to= — availability with the per-unit reasons
 * (status, location, block, reservation, stranded next booking). `from`/`to` are ISO 8601 instants with a time zone.
 */
export const GET = route("staff-availability", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const query = availabilityQuery.parse(queryOf(request));
  const ctx = await bookingContext();
  return json({ data: await checkAvailability(ctx, query, { reservations: bookingReservations(ctx) }) });
});
