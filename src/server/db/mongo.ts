import { MongoClient, type MongoClientOptions } from "mongodb";

/**
 * Driver-level helpers with no Next.js or environment coupling, so they can be tested directly and
 * reused by scripts. The app-wide shared client lives in `./client.ts`.
 */
export const DEFAULT_CLIENT_OPTIONS: MongoClientOptions = {
  appName: "halden",
  // Serverless functions run many small instances; keep each pool small (Atlas M0 allows 500 connections).
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 60_000,
  serverSelectionTimeoutMS: 5_000,
  connectTimeoutMS: 5_000,
  retryWrites: true,
};

export function createMongoClient(uri: string, options: MongoClientOptions = {}): MongoClient {
  return new MongoClient(uri, { ...DEFAULT_CLIENT_OPTIONS, ...options });
}

export type DatabaseCheck =
  | { status: "up"; latencyMs: number }
  | { status: "down"; reason: "timeout" | "unreachable" | "auth_failed" | "error"; latencyMs: number }
  | { status: "not_configured" };

/** Run `ping` against the database, bounded by `timeoutMs`. Never throws; never exposes driver messages. */
export async function pingDatabase(connect: () => Promise<MongoClient>, dbName: string, timeoutMs = 2_500): Promise<DatabaseCheck> {
  const started = performance.now();
  const elapsed = () => Math.round(performance.now() - started);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<"timeout">((resolve) => {
    timer = setTimeout(() => resolve("timeout"), timeoutMs);
  });
  try {
    const attempt = Promise.resolve().then(connect).then((client) => client.db(dbName).command({ ping: 1 }));
    // if the timeout wins, the attempt may still reject later: observe it so it is not an unhandled rejection
    attempt.catch(() => {});
    const result = await Promise.race([attempt, timeout]);
    if (result === "timeout") return { status: "down", reason: "timeout", latencyMs: elapsed() };
    return { status: "up", latencyMs: elapsed() };
  } catch (err) {
    return { status: "down", reason: classify(err), latencyMs: elapsed() };
  } finally {
    clearTimeout(timer);
  }
}

function classify(err: unknown): "unreachable" | "auth_failed" | "error" {
  const e = err as { name?: string; code?: number; codeName?: string };
  if (e?.code === 18 || e?.codeName === "AuthenticationFailed" || e?.name === "MongoAuthError") return "auth_failed";
  if (e?.name === "MongoServerSelectionError" || e?.name === "MongoNetworkError" || e?.name === "MongoNetworkTimeoutError") return "unreachable";
  return "error";
}
