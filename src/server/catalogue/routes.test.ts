import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "../http/errors";

// The catalogue Route Handlers with the cached service and Next's `connection()` replaced.
const service = { getPublicLocations: vi.fn(), getPublicVehicles: vi.fn(), getPublicExtras: vi.fn() };
vi.mock("@/server/catalogue/service", () => service);
vi.mock("next/server", () => ({ connection: async () => {} }));

const { CATALOGUE_CACHE_CONTROL } = await import("./routes");
const routes = {
  locations: (await import("@/app/api/v1/locations/route")).GET,
  vehicles: (await import("@/app/api/v1/vehicles/route")).GET,
  extras: (await import("@/app/api/v1/extras/route")).GET,
};
const loaders = { locations: service.getPublicLocations, vehicles: service.getPublicVehicles, extras: service.getPublicExtras };
const call = (name: keyof typeof routes, query = "") => routes[name](new Request(`http://localhost/api/v1/${name}${query}`));

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  for (const fn of Object.values(loaders)) fn.mockReset();
});
afterEach(() => vi.restoreAllMocks());

describe.each(["locations", "vehicles", "extras"] as const)("GET /api/v1/%s", (name) => {
  it("200 with { data } from its own loader, cacheable, with a request ID", async () => {
    loaders[name].mockResolvedValue([{ code: "a" }, { code: "b" }]);
    const res = await call(name);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: [{ code: "a" }, { code: "b" }] });
    expect(res.headers.get("cache-control")).toBe(CATALOGUE_CACHE_CONTROL);
    expect(res.headers.get("x-request-id")).toBeTruthy();
    for (const [other, fn] of Object.entries(loaders)) expect(fn).toHaveBeenCalledTimes(other === name ? 1 : 0);
  });

  it("200 with an empty list when the catalogue is empty", async () => {
    loaders[name].mockResolvedValue([]);
    const res = await call(name);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: [] });
  });

  it("400 VALIDATION_FAILED for any query parameter, without reading the catalogue", async () => {
    const res = await call(name, "?page=2&page=3&category=suv");
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatchObject({ code: "VALIDATION_FAILED", details: [{ path: "page" }, { path: "category" }] });
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(loaders[name]).not.toHaveBeenCalled();
  });

  it("503 when the database is unavailable or not configured", async () => {
    loaders[name].mockRejectedValue(new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set"));
    const res = await call(name);
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toMatchObject({ code: "SERVICE_UNAVAILABLE", message: "The service is temporarily unavailable." });
    expect(JSON.stringify(body)).not.toContain("MONGODB_URI");
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("503 (not a raw 500) for an unexpected loader failure, with no internal message", async () => {
    loaders[name].mockRejectedValue(new Error("socket hang up at 10.0.0.1"));
    const res = await call(name);
    expect(res.status).toBe(503);
    expect(JSON.stringify(await res.json())).not.toContain("10.0.0.1");
  });

  it("500 for an invalid catalogue document", async () => {
    loaders[name].mockRejectedValue(new AppError("INTERNAL", "Invalid catalogue document"));
    const res = await call(name);
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatchObject({ code: "INTERNAL", message: "Something went wrong on our side." });
  });
});
