import { readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";
import { auditActor, parseObjectId, peopleContext } from "@/server/staff/context";
import { setAccountStatus } from "@/server/staff/people";
import { accountStatusAction, reasonInput } from "@/server/staff/schemas";

/**
 * POST /api/v1/staff/accounts/:id/{suspend|reactivate} { reason? } — staff for customer accounts, admins
 * for staff/admin accounts (enforced in the service). Nobody can change their own status; the last active
 * admin cannot be suspended. Suspension signs the account out everywhere.
 */
export const POST = route<{ id: string; action: string }>("staff-account-status", async (request, { params }) => {
  const user = await requireApiRole(request, STAFF_ROLES);
  const action = accountStatusAction.safeParse(params.action);
  if (!action.success) throw new AppError("NOT_FOUND", "No such account action.");
  const { reason } = await readJson(request, reasonInput);
  return json({ data: await setAccountStatus(await peopleContext(), auditActor(user), parseObjectId(params.id), action.data, reason) });
});
