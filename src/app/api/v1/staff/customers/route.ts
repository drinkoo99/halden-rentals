import { queryOf, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { peopleContext } from "@/server/staff/context";
import { listPeople } from "@/server/staff/people";
import { peopleQuery } from "@/server/staff/schemas";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/staff/customers?q=&status= — customer accounts with booking counts (staff/admin). */
export const GET = route("staff-customers", async (request) => {
  await requireApiRole(request, STAFF_ROLES);
  const q = peopleQuery.parse(queryOf(request));
  return json({ data: await listPeople(await peopleContext(), { roles: ["customer"], ...q }) });
});
