import { ObjectId, type ClientSession, type Db } from "mongodb";
import type { CollectionSpec } from "../db/collections";
import type { Role } from "../auth/schemas";

/**
 * Operational audit log (M8): one append-only collection for every staff/admin action — booking
 * lifecycle actions taken by staff, fleet changes, blocks, account status and role changes. Bookings keep
 * their own per-booking `history` (M7) as well; this log is the cross-entity view for admins.
 *
 * Entries hold the actor, the action, the entity and the relevant before/after fields — never passwords,
 * hashes, tokens or full personal records. The application only inserts; there is no update or delete path.
 */
export const AUDIT_COLLECTIONS = { auditEvents: "auditEvents" } as const;
export const AUDIT_ENTITIES = ["booking", "fleet_unit", "block", "user"] as const;
export type AuditEntity = (typeof AUDIT_ENTITIES)[number];

export type AuditEvent = {
  _id: ObjectId;
  at: Date;
  actor: { id: ObjectId; role: Role; name: string };
  action: string;
  entity: { type: AuditEntity; id: string; label: string };
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  reason?: string;
};

export const AUDIT_COLLECTION_SPECS: CollectionSpec[] = [
  {
    name: AUDIT_COLLECTIONS.auditEvents,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["_id", "at", "actor", "action", "entity"],
        properties: {
          _id: { bsonType: "objectId" },
          at: { bsonType: "date" },
          actor: { bsonType: "object", required: ["id", "role", "name"], properties: { id: { bsonType: "objectId" }, role: { enum: ["customer", "staff", "admin"] }, name: { bsonType: "string" } } },
          action: { bsonType: "string", minLength: 1, maxLength: 60 },
          entity: { bsonType: "object", required: ["type", "id", "label"], properties: { type: { enum: [...AUDIT_ENTITIES] }, id: { bsonType: "string" }, label: { bsonType: "string" } } },
          before: { bsonType: "object" },
          after: { bsonType: "object" },
          reason: { bsonType: "string", maxLength: 500 },
        },
      },
    },
    indexes: [
      { name: "auditEvents_at", key: { at: -1 } },
      { name: "auditEvents_entity_at", key: { "entity.type": 1, "entity.id": 1, at: -1 } },
    ],
  },
];

export type AuditActor = { id: ObjectId; role: Role; name: string };
export type AuditContext = { db: Pick<Db, "collection">; auditNames?: { auditEvents: string }; now?: () => Date };
const events = (ctx: AuditContext) => ctx.db.collection<AuditEvent>((ctx.auditNames ?? AUDIT_COLLECTIONS).auditEvents);

/** Fields that must never reach the audit log, wherever they appear. */
const SECRET_KEYS = new Set(["passwordHash", "password", "token", "sessionToken", "idempotencyKey"]);
function scrub(v?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!v) return undefined;
  return Object.fromEntries(Object.entries(v).filter(([k, x]) => !SECRET_KEYS.has(k) && x !== undefined));
}

export async function recordAudit(
  ctx: AuditContext,
  e: { actor: AuditActor; action: string; entity: { type: AuditEntity; id: string; label: string }; before?: Record<string, unknown>; after?: Record<string, unknown>; reason?: string },
  session?: ClientSession,
): Promise<AuditEvent> {
  const doc: AuditEvent = {
    _id: new ObjectId(),
    at: ctx.now ? ctx.now() : new Date(),
    actor: e.actor,
    action: e.action,
    entity: e.entity,
    ...(scrub(e.before) ? { before: scrub(e.before) } : {}),
    ...(scrub(e.after) ? { after: scrub(e.after) } : {}),
    ...(e.reason ? { reason: e.reason.slice(0, 500) } : {}),
  };
  await events(ctx).insertOne(doc, { session });
  return doc;
}

export async function listAudit(ctx: AuditContext, q: { entity?: AuditEntity; id?: string; limit?: number } = {}): Promise<AuditEvent[]> {
  const filter: Record<string, unknown> = {};
  if (q.entity) filter["entity.type"] = q.entity;
  if (q.id) filter["entity.id"] = q.id;
  return events(ctx).find(filter).sort({ at: -1 }).limit(Math.min(q.limit ?? 200, 500)).toArray();
}
