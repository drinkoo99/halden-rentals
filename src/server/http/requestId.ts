export const REQUEST_ID_HEADER = "x-request-id";

/** Accept only short, plain tokens from upstream so request IDs are safe to log and echo back. */
const SAFE_ID = /^[A-Za-z0-9._:-]{8,128}$/;

/**
 * Correlation ID for one request: an incoming `x-request-id` (e.g. from a proxy or the client),
 * else Vercel's `x-vercel-id`, else a fresh UUID. Untrusted values that are not plain tokens are ignored.
 */
export function resolveRequestId(headers: Headers): string {
  for (const name of [REQUEST_ID_HEADER, "x-vercel-id"]) {
    const v = headers.get(name)?.trim();
    if (v && SAFE_ID.test(v)) return v;
  }
  return crypto.randomUUID();
}
