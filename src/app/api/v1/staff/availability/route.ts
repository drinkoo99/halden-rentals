import { queryOf, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { checkAvailability } from "@/server/availability/service";
import { fleetContext } from "@/server/fleet/context";
import { availabilityQuery } from "@/server/fleet/schemas";
import { json, route } from "@/server/http/handler";

/**
 * GET /api/v1/staff/availability?model=&pickup=&return=&from=&to= — availability with the per-unit reasons
 * (status, location, block, reservation). `from`/`to` are ISO 8601 instants with a time zone.
 */
export const GET = route("staff-availability", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const query = availabilityQuery.parse(queryOf(request));
  return json({ data: await checkAvailability(await fleetContext(), query) });
});
