import { readJson, requireApiRole } from "@/server/auth/api";
import { json, route } from "@/server/http/handler";
import { auditActor, parseObjectId, peopleContext } from "@/server/staff/context";
import { setRole } from "@/server/staff/people";
import { roleInput } from "@/server/staff/schemas";

/**
 * POST /api/v1/admin/accounts/:id/role { role, reason? } — admins only. Not for your own account; the last
 * active admin cannot be demoted. Audited; applies on the account's next request.
 */
export const POST = route<{ id: string }>("admin-account-role", async (request, { params }) => {
  const user = await requireApiRole(request, ["admin"]);
  const { role, reason } = await readJson(request, roleInput);
  return json({ data: await setRole(await peopleContext(), auditActor(user), parseObjectId(params.id), role, reason) });
});
