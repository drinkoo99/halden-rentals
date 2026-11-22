import { readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { fleetContext } from "@/server/fleet/context";
import { updateUnitInput } from "@/server/fleet/schemas";
import { getUnit, listBlocks, parseId, toStaffBlock, toStaffUnit, updateUnit } from "@/server/fleet/store";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/staff/fleet/:id — one unit with its current and upcoming blocks (staff/admin). */
export const GET = route<{ id: string }>("staff-fleet-get", async (request, { params }) => {
  await requireApiRole(request, STAFF_ROLES);
  const ctx = await fleetContext();
  const id = parseId(params.id);
  const [unit, blocks] = await Promise.all([getUnit(ctx, id), listBlocks(ctx, id)]);
  return json({ data: { ...toStaffUnit(unit), blocks: blocks.map(toStaffBlock) } });
});

/** PATCH /api/v1/staff/fleet/:id — update details or reassign the hub (staff/admin). */
export const PATCH = route<{ id: string }>("staff-fleet-update", async (request, { params }) => {
  await requireApiRole(request, STAFF_ROLES);
  const id = parseId(params.id);
  const patch = await readJson(request, updateUnitInput);
  const unit = await updateUnit(await fleetContext(), id, patch);
  return json({ data: toStaffUnit(unit) });
});
