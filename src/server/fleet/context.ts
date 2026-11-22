import "server-only";
import { getDb, isDatabaseConfigured } from "../db/client";
import { AppError } from "../http/errors";
import type { FleetContext } from "./store";

/** The fleet store on the application database (`MONGODB_DB`). */
export async function fleetContext(): Promise<FleetContext> {
  if (!isDatabaseConfigured()) throw new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set");
  return { db: await getDb() };
}
