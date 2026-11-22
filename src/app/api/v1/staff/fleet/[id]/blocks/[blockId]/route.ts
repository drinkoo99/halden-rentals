import { recordAudit } from "@/server/audit/audit";
import { auditActor } from "@/server/staff/context";
import { requireApiRole, STAFF_ROLES } from "@/server/auth/api";
import { fleetContext } from "@/server/fleet/context";
import { deleteBlock, parseId } from "@/server/fleet/store";
import { route } from "@/server/http/handler";

/** DELETE /api/v1/staff/fleet/:id/blocks/:blockId — remove a block (staff/admin). 204 on success. */
export const DELETE = route<{ id: string; blockId: string }>("staff-fleet-block-delete", async (request, { params }) => {
  const user = await requireApiRole(request, STAFF_ROLES);
  const ctx = await fleetContext();
  await deleteBlock(ctx, parseId(params.id), parseId(params.blockId));
  await recordAudit(ctx, { actor: auditActor(user), action: "block_removed", entity: { type: "block", id: params.blockId, label: `unit ${params.id}` } });
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
});
