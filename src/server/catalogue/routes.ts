import "server-only";
import { connection } from "next/server";
import { AppError } from "../http/errors";
import { json, route } from "../http/handler";

/**
 * The three public catalogue list endpoints share one contract:
 *   200 { "data": [ …items in catalogue order ] }
 * They take no query parameters (the catalogue is small; the frontend filters and sorts it itself), so any
 * parameter is rejected with 400 VALIDATION_FAILED instead of being silently ignored. Errors use the
 * standard error body (503 when the database is unavailable). Responses may be cached briefly by a CDN; the
 * data itself is cached on the server (service.ts).
 */
export const CATALOGUE_CACHE_CONTROL = "public, max-age=60, s-maxage=300, stale-while-revalidate=3600";

export function catalogueListRoute<T>(name: string, load: () => Promise<T[]>) {
  return route(name, async (request) => {
    await connection(); // evaluated per request (query validation); the data comes from the server cache
    const params = [...new URL(request.url).searchParams.keys()];
    if (params.length)
      throw new AppError("VALIDATION_FAILED", "This endpoint does not accept query parameters.", {
        details: [...new Set(params)].map((p) => ({ path: p, message: "unknown query parameter" })),
      });
    let data: T[];
    try {
      data = await load();
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("SERVICE_UNAVAILABLE", "Catalogue unavailable", { cause: err });
    }
    return json({ data }, { headers: { "cache-control": CATALOGUE_CACHE_CONTROL } });
  });
}
