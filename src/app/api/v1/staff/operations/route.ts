import { queryOf, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { json, route } from "@/server/http/handler";
import { loadOperations } from "@/server/staff/loadOperations";
import { operationsQuery } from "@/server/staff/schemas";

/** GET /api/v1/staff/operations?hub= — today's pick-ups/returns, exceptions and fleet counts (staff/admin). */
export const GET = route("staff-operations", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const { hub } = operationsQuery.parse(queryOf(request));
  const { snapshot, now } = await loadOperations(hub);
  return json({ data: { at: now.toISOString(), ...snapshot } });
});
