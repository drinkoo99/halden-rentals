import "server-only";
import { errorSummary, log } from "../log";
import { toErrorResponse } from "./errors";
import { REQUEST_ID_HEADER, resolveRequestId } from "./requestId";

export type RouteContext<P> = { requestId: string; params: P };
type NextRouteContext<P> = { params: Promise<P> };

/**
 * Wrap a Route Handler with the API conventions:
 * - a request ID (echoed as `x-request-id` on every response, success or error);
 * - thrown `AppError` / `ZodError` / unknown errors mapped to the standard JSON error body
 *   (no stack traces or internal messages reach the client);
 * - one structured log line per request (method, path without query string, status, duration).
 */
export function route<P = Record<string, never>>(
  name: string,
  fn: (request: Request, ctx: RouteContext<P>) => Promise<Response>,
): (request: Request, context?: NextRouteContext<P>) => Promise<Response> {
  return async (request, context) => {
    const started = performance.now();
    const requestId = resolveRequestId(request.headers);
    const path = new URL(request.url).pathname;
    let response: Response;
    let failure: unknown;
    try {
      const params = context ? await context.params : ({} as P);
      response = await fn(request, { requestId, params });
    } catch (err) {
      failure = err;
      const { status, body } = toErrorResponse(err, requestId);
      response = Response.json(body, { status, headers: { "cache-control": "no-store" } });
    }
    response = withHeader(response, REQUEST_ID_HEADER, requestId);
    const fields = { route: name, requestId, method: request.method, path, status: response.status, durationMs: Math.round(performance.now() - started) };
    if (failure !== undefined && response.status >= 500) log("error", "request failed", { ...fields, ...errorSummary(failure) });
    else if (response.status >= 500) log("warn", "request degraded", fields); // e.g. health reporting a down dependency
    else log("info", "request", fields);
    return response;
  };
}

/** JSON success response; API responses are never cached by default. */
export function json(data: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  if (!headers.has("cache-control")) headers.set("cache-control", "no-store");
  return Response.json(data, { ...init, headers });
}

function withHeader(res: Response, name: string, value: string): Response {
  try {
    res.headers.set(name, value);
    return res;
  } catch {
    // immutable headers (e.g. a fetched Response): copy it
    const copy = new Response(res.body, res);
    copy.headers.set(name, value);
    return copy;
  }
}
