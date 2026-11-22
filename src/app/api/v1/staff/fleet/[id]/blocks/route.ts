import { ObjectId } from "mongodb";
import { recordAudit } from "@/server/audit/audit";
import { auditActor } from "@/server/staff/context";
import { readJson, requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { fleetContext } from "@/server/fleet/context";
import { blockInput } from "@/server/fleet/schemas";
import { createBlock, getUnit, listBlocks, parseId, toStaffBlock } from "@/server/fleet/store";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/staff/fleet/:id/blocks — current and upcoming maintenance/unavailability blocks. */
export const GET = route<{ id: string }>("staff-fleet-blocks", async (request, { params }) => {
  await requireApiRole(request, STAFF_ROLES);
  const ctx = await fleetContext();
  const id = parseId(params.id);
  await getUnit(ctx, id);
  return json({ data: (await listBlocks(ctx, id)).map(toStaffBlock) });
});

/** POST /api/v1/staff/fleet/:id/blocks { kind, startsAt, endsAt, reason? } — block a period [startsAt, endsAt). */
export const POST = route<{ id: string }>("staff-fleet-block-create", async (request, { params }) => {
  const user = await requireApiRole(request, STAFF_ROLES);
  const id = parseId(params.id);
  const input = await readJson(request, blockInput);
  const ctx = await fleetContext();
  const block = await createBlock(ctx, id, input, new ObjectId(user.id));
  await recordAudit(ctx, { actor: auditActor(user), action: "block_created", entity: { type: "block", id: block._id.toHexString(), label: `${block.kind} · unit ${id.toHexString()}` }, after: { unitId: id.toHexString(), kind: block.kind, startsAt: block.startsAt.toISOString(), endsAt: block.endsAt.toISOString() }, reason: block.reason });
  return json({ data: toStaffBlock(block) }, { status: 201 });
});
