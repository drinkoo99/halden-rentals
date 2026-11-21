import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { DatabaseCheck } from "@/server/db/mongo";

// The route under test, with the database check and Next's `connection()` replaced.
const checkDatabase = vi.fn<() => Promise<DatabaseCheck>>();
vi.mock("@/server/db/client", () => ({ checkDatabase: () => checkDatabase() }));
vi.mock("next/server", () => ({ connection: async () => {} }));

const { GET } = await import("@/app/api/v1/health/route");
const call = () => GET(new Request("http://localhost/api/v1/health"));

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe("GET /api/v1/health", () => {
  it("200 ok when the database answers", async () => {
    checkDatabase.mockResolvedValue({ status: "up", latencyMs: 12 });
    const res = await call();
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(res.headers.get("x-request-id")).toBeTruthy();
    expect(await res.json()).toMatchObject({ status: "ok", checks: { database: { status: "up", latencyMs: 12 } } });
  });

  it("503 degraded when the database is not configured", async () => {
    checkDatabase.mockResolvedValue({ status: "not_configured" });
    const res = await call();
    expect(res.status).toBe(503);
    expect(await res.json()).toMatchObject({ status: "degraded", checks: { database: { status: "not_configured" } } });
  });

  it("503 degraded with a coarse reason when the database is down", async () => {
    checkDatabase.mockResolvedValue({ status: "down", reason: "unreachable", latencyMs: 300 });
    const res = await call();
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.checks.database).toEqual({ status: "down", reason: "unreachable", latencyMs: 300 });
  });

  it("returns the standard error body if the check itself throws", async () => {
    checkDatabase.mockRejectedValue(new Error("unexpected"));
    const res = await call();
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatchObject({ code: "INTERNAL", requestId: res.headers.get("x-request-id") });
  });
});
