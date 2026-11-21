/**
 * Structured JSON logging (one line per event) for server code. Vercel collects stdout/stderr.
 * Fields whose names look sensitive are redacted; callers still must not log personal data.
 */
type Level = "debug" | "info" | "warn" | "error";
const ORDER: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const SENSITIVE = /pass|secret|token|cookie|authorization|uri|connection|email|phone|licen/i;

function threshold(): number {
  const v = process.env.LOG_LEVEL as Level | undefined;
  return ORDER[v && v in ORDER ? v : "info"];
}

export function redact(fields: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = SENSITIVE.test(k) ? "[redacted]" : v;
  return out;
}

/** Name and code of an error, without its message (driver messages can contain host names). */
export function errorSummary(err: unknown): { errorName: string; errorCode?: string | number } {
  if (err && typeof err === "object") {
    const e = err as { name?: unknown; code?: unknown; codeName?: unknown };
    const code = typeof e.codeName === "string" ? e.codeName : typeof e.code === "string" || typeof e.code === "number" ? e.code : undefined;
    return { errorName: typeof e.name === "string" ? e.name : "Error", ...(code !== undefined ? { errorCode: code } : {}) };
  }
  return { errorName: typeof err };
}

export function log(level: Level, msg: string, fields: Record<string, unknown> = {}): void {
  if (ORDER[level] < threshold()) return;
  const line = JSON.stringify({ ts: new Date().toISOString(), level, msg, ...redact(fields) });
  if (level === "error" || level === "warn") console.error(line);
  else console.log(line);
}
