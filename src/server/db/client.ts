import "server-only";
import type { Db, MongoClient } from "mongodb";
import { serverEnv } from "../env";
import { AppError } from "../http/errors";
import { errorSummary, log } from "../log";
import { createMongoClient, pingDatabase, type DatabaseCheck } from "./mongo";

/**
 * The one shared MongoClient for this server process. Created lazily on first use (importing this
 * module never connects), cached on `globalThis` so dev hot-reloads and warm serverless invocations
 * reuse the same connection pool. Server-only: importing it from a Client Component fails the build.
 */
type Cache = { promise?: Promise<MongoClient> };
const globalCache = globalThis as typeof globalThis & { __haldenMongo?: Cache };
const cache: Cache = (globalCache.__haldenMongo ??= {});

export function isDatabaseConfigured(): boolean {
  return Boolean(serverEnv().MONGODB_URI);
}

export function getMongoClient(): Promise<MongoClient> {
  const { MONGODB_URI } = serverEnv();
  if (!MONGODB_URI) throw new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set");
  cache.promise ??= createMongoClient(MONGODB_URI)
    .connect()
    .catch((err: unknown) => {
      cache.promise = undefined; // let the next request retry instead of caching the failure
      log("error", "mongodb connect failed", errorSummary(err));
      throw err;
    });
  return cache.promise;
}

/** The application database (`MONGODB_DB`). */
export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(serverEnv().MONGODB_DB);
}

export async function checkDatabase(timeoutMs?: number): Promise<DatabaseCheck> {
  if (!isDatabaseConfigured()) return { status: "not_configured" };
  return pingDatabase(getMongoClient, serverEnv().MONGODB_DB, timeoutMs);
}
