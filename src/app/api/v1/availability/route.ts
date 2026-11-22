import { connection } from "next/server";
import { checkAvailability } from "@/server/availability/service";
import { bookingContext, limitByIp } from "@/server/bookings/context";
import { bookingReservations } from "@/server/bookings/store";
import { availabilityQuery } from "@/server/fleet/schemas";
import { queryOf } from "@/server/auth/api";
import { json, route } from "@/server/http/handler";

/**
 * GET /api/v1/availability?model=&pickup=&return=&from=&to= — public: is this model free for the period?
 * Answers only yes/no; unit ids, plates, counts and reasons stay internal. Bookings (holds, confirmed and
 * active rentals), blocks, hubs and turnaround are all taken into account. Rate-limited per IP; never cached.
 */
export const GET = route("availability", async (request) => {
  await connection();
  const q = availabilityQuery.parse(queryOf(request));
  const ctx = await bookingContext();
  await limitByIp(ctx, request, "availability");
  const result = await checkAvailability(ctx, q, { reservations: bookingReservations(ctx) });
  return json({
    data: { model: q.modelSlug, pickup: q.pickupLocationCode, return: q.returnLocationCode, from: q.start.toISOString(), to: q.end.toISOString(), available: result.available },
  });
});
