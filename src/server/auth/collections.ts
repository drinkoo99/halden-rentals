import type { Document } from "mongodb";
import type { CollectionSpec } from "../db/collections";
import { ROLES, USER_STATUSES } from "./schemas";

/**
 * Authentication collections (M5), applied by `db:setup` like the catalogue:
 * - users:      one document per account; unique normalised email.
 * - sessions:   `_id` = SHA-256 of the session token (the token itself only lives in the cookie);
 *               a TTL index removes expired sessions.
 * - authTokens: single-use password-reset / email-verification tokens, stored hashed, TTL-expired.
 * - rateLimits: one document per counted attempt (failed login, registration, reset request), TTL-expired.
 */
export const AUTH_COLLECTIONS = { users: "users", sessions: "sessions", authTokens: "authTokens", rateLimits: "rateLimits" } as const;
export type AuthCollectionNames = Record<keyof typeof AUTH_COLLECTIONS, string>;

const str = (extra: Document = {}): Document => ({ bsonType: "string", minLength: 1, ...extra });
const date = (): Document => ({ bsonType: "date" });
const validator = (required: string[], properties: Document): Document => ({
  $jsonSchema: { bsonType: "object", required, additionalProperties: false, properties: { _id: {}, ...properties } },
});

export const AUTH_COLLECTION_SPECS: CollectionSpec[] = [
  {
    name: AUTH_COLLECTIONS.users,
    validator: validator(["_id", "email", "name", "passwordHash", "role", "status", "emailVerifiedAt", "createdAt", "updatedAt"], {
      _id: { bsonType: "objectId" },
      email: str({ maxLength: 254, pattern: "^[^A-Z\\s]+@[^A-Z\\s]+$" }),
      name: str({ maxLength: 80 }),
      passwordHash: str({ pattern: "^scrypt\\$" }),
      role: { enum: [...ROLES] },
      status: { enum: [...USER_STATUSES] },
      emailVerifiedAt: { bsonType: ["date", "null"] },
      createdAt: date(),
      updatedAt: date(),
    }),
    indexes: [{ name: "users_email_unique", key: { email: 1 }, unique: true }],
  },
  {
    name: AUTH_COLLECTIONS.sessions,
    validator: validator(["_id", "userId", "createdAt", "expiresAt"], {
      _id: str(),
      userId: { bsonType: "objectId" },
      createdAt: date(),
      expiresAt: date(),
    }),
    indexes: [
      { name: "sessions_user", key: { userId: 1 } },
      { name: "sessions_expiry_ttl", key: { expiresAt: 1 }, expireAfterSeconds: 0 },
    ],
  },
  {
    name: AUTH_COLLECTIONS.authTokens,
    validator: validator(["_id", "userId", "purpose", "createdAt", "expiresAt"], {
      _id: str(),
      userId: { bsonType: "objectId" },
      purpose: { enum: ["password_reset", "email_verification"] },
      createdAt: date(),
      expiresAt: date(),
    }),
    indexes: [
      { name: "authTokens_user_purpose", key: { userId: 1, purpose: 1 } },
      { name: "authTokens_expiry_ttl", key: { expiresAt: 1 }, expireAfterSeconds: 0 },
    ],
  },
  {
    name: AUTH_COLLECTIONS.rateLimits,
    validator: validator(["_id", "key", "at", "expiresAt"], { _id: { bsonType: "objectId" }, key: str({ maxLength: 200 }), at: date(), expiresAt: date() }),
    indexes: [
      { name: "rateLimits_key_at", key: { key: 1, at: 1 } },
      { name: "rateLimits_expiry_ttl", key: { expiresAt: 1 }, expireAfterSeconds: 0 },
    ],
  },
];
