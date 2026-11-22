import "server-only";
import { ObjectId } from "mongodb";
import type { AuditActor } from "../audit/audit";
import type { PublicUser } from "../auth/schemas";
import { getMongoClient, isDatabaseConfigured } from "../db/client";
import { serverEnv } from "../env";
import { AppError } from "../http/errors";
import type { PeopleContext } from "./people";

/** People management and audit on the application database (transactions for role changes). */
export async function peopleContext(): Promise<PeopleContext> {
  if (!isDatabaseConfigured()) throw new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set");
  const client = await getMongoClient();
  return { db: client.db(serverEnv().MONGODB_DB), startSession: () => client.startSession() };
}

export const auditActor = (user: PublicUser): AuditActor => ({ id: new ObjectId(user.id), role: user.role, name: user.name });

export function parseObjectId(id: string, what = "account"): ObjectId {
  if (!/^[0-9a-f]{24}$/i.test(id)) throw new AppError("NOT_FOUND", `No such ${what}.`);
  return new ObjectId(id);
}
