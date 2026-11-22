import { z } from "zod";
import { ROLES, USER_STATUSES } from "../auth/schemas";
import { AUDIT_ENTITIES } from "../audit/audit";

/** Staff/admin request inputs (M8). Strict objects: unknown fields (e.g. a smuggled role) are rejected. */
const search = z.string().trim().min(2, "search for at least 2 characters").max(80);
const reason = z.string().trim().max(500).optional();

export const peopleQuery = z.strictObject({ q: search.optional(), status: z.enum(USER_STATUSES).optional() });
export const teamQuery = z.strictObject({ q: search.optional(), email: z.string().trim().toLowerCase().pipe(z.email()).optional() });
export const accountStatusAction = z.enum(["suspend", "reactivate"]);
export const reasonInput = z.strictObject({ reason });
export const roleInput = z.strictObject({ role: z.enum(ROLES), reason });
export const auditQuery = z.strictObject({ entity: z.enum(AUDIT_ENTITIES).optional(), id: z.string().trim().max(64).optional() });
export const operationsQuery = z.strictObject({ hub: z.string().regex(/^[a-z]{3}$/).optional() });
