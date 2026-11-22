import { connection } from "next/server";
import { checkAvailability } from "@/server/availability/service";
import { fleetContext } from "@/server/fleet/context";
import { availabilityQuery } from "@/server/fleet/schemas";
import { queryOf } from "@/server/auth/api";
import { json, route } from "@/server/http/handler";

/**
 * GET /api/v1/availability?model=&pickup=&return=&from=&to= — public: is this model free for the period?
 * Answers only yes/no; unit ids, plates, counts and reasons stay internal. Reservations are taken into
 * account from M7 on (until then: cars in service at the hub, free of maintenance blocks). Never cached.
 */
export const GET = route("availability", async (request) => {
  await connection();
  const q = availabilityQuery.parse(queryOf(request));
  const result = await checkAvailability(await fleetContext(), q);
  return json({
    data: { model: q.modelSlug, pickup: q.pickupLocationCode, return: q.returnLocationCode, from: q.start.toISOString(), to: q.end.toISOString(), available: result.available },
  });
});
