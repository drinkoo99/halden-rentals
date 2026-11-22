import { readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { fleetContext } from "@/server/fleet/context";
import { statusInput } from "@/server/fleet/schemas";
import { changeStatus, parseId, toStaffUnit } from "@/server/fleet/store";
import { json, route } from "@/server/http/handler";

/** POST /api/v1/staff/fleet/:id/status { status } — operational status change, following the allowed transitions. */
export const POST = route<{ id: string }>("staff-fleet-status", async (request, { params }) => {
  await requireApiRole(request, STAFF_ROLES);
  const id = parseId(params.id);
  const { status } = await readJson(request, statusInput);
  const unit = await changeStatus(await fleetContext(), id, status);
  return json({ data: toStaffUnit(unit) });
});
