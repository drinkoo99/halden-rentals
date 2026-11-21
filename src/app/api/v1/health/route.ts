import { connection } from "next/server";
import { checkDatabase } from "@/server/db/client";
import { json, route } from "@/server/http/handler";

/**
 * GET /api/v1/health — liveness plus database connectivity.
 * 200 `ok` when the database answers a ping; 503 `degraded` when it is not configured, unreachable,
 * too slow, or rejects the credentials. Only a coarse reason is returned (no hosts or driver messages).
 */
export const GET = route("health", async () => {
  await connection(); // always evaluated per request, never prerendered at build time
  const database = await checkDatabase();
  const healthy = database.status === "up";
  return json(
    { status: healthy ? "ok" : "degraded", time: new Date().toISOString(), checks: { database } },
    { status: healthy ? 200 : 503 },
  );
});
