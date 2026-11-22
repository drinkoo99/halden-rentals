import { recordAudit } from "@/server/audit/audit";
import { auditActor } from "@/server/staff/context";
import { readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { fleetContext } from "@/server/fleet/context";
import { statusInput } from "@/server/fleet/schemas";
import { changeStatus, getUnit, parseId, toStaffUnit } from "@/server/fleet/store";
import { json, route } from "@/server/http/handler";

/** POST /api/v1/staff/fleet/:id/status { status } — operational status change, following the allowed transitions. */
export const POST = route<{ id: string }>("staff-fleet-status", async (request, { params }) => {
  const user = await requireApiRole(request, STAFF_ROLES);
  const id = parseId(params.id);
  const { status } = await readJson(request, statusInput);
  const ctx = await fleetContext();
  const before = await getUnit(ctx, id);
  const unit = await changeStatus(ctx, id, status);
  if (before.status !== unit.status)
    await recordAudit(ctx, { actor: auditActor(user), action: "fleet_status_changed", entity: { type: "fleet_unit", id: unit._id.toHexString(), label: `${unit.unitCode} · ${unit.registration}` }, before: { status: before.status }, after: { status: unit.status } });
  return json({ data: toStaffUnit(unit) });
});
