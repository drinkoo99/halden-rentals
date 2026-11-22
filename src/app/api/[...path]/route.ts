import { AppError } from "@/server/http/errors";
import { route } from "@/server/http/handler";

/**
 * Unknown API paths answer with the standard JSON error body and a request ID (404 NOT_FOUND) instead of
 * the HTML not-found page. Known routes (e.g. /api/v1/health) take precedence over this catch-all.
 */
const notFound = route<{ path: string[] }>("api-not-found", async () => {
  throw new AppError("NOT_FOUND", "No API endpoint at this path.");
});

export const GET = notFound;
export const HEAD = notFound;
export const POST = notFound;
export const PUT = notFound;
export const PATCH = notFound;
export const DELETE = notFound;
