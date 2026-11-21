import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { AppError, toErrorResponse } from "./errors";
import { json, route } from "./handler";
import { resolveRequestId } from "./requestId";

const req = (headers: Record<string, string> = {}) => new Request("http://localhost/api/v1/thing?secret=1", { headers });

afterEach(() => vi.restoreAllMocks());

describe("request IDs", () => {
  it("keeps a safe incoming x-request-id", () => {
    expect(resolveRequestId(new Headers({ "x-request-id": "abc-123_DEF.456" }))).toBe("abc-123_DEF.456");
  });
  it("falls back to x-vercel-id, then a UUID", () => {
    expect(resolveRequestId(new Headers({ "x-vercel-id": "fra1::abcd1234" }))).toBe("fra1::abcd1234");
    expect(resolveRequestId(new Headers())).toMatch(/^[0-9a-f-]{36}$/);
  });
  it("ignores unsafe or oversized incoming values", () => {
    expect(resolveRequestId(new Headers({ "x-request-id": "<script>alert(1)</script>" }))).toMatch(/^[0-9a-f-]{36}$/);
    expect(resolveRequestId(new Headers({ "x-request-id": "a".repeat(200) }))).toMatch(/^[0-9a-f-]{36}$/);
  });
});

describe("error mapping", () => {
  it("passes through client errors with their message and details", () => {
    const { status, body } = toErrorResponse(new AppError("CONFLICT", "Vehicle unavailable", { details: { slug: "x" } }), "r1");
    expect(status).toBe(409);
    expect(body).toEqual({ error: { code: "CONFLICT", message: "Vehicle unavailable", details: { slug: "x" }, requestId: "r1" } });
  });
  it("turns Zod errors into 400 VALIDATION_FAILED with field paths", () => {
    const parsed = z.object({ email: z.email() }).safeParse({ email: "nope" });
    const { status, body } = toErrorResponse(parsed.error, "r2");
    expect(status).toBe(400);
    expect(body.error.code).toBe("VALIDATION_FAILED");
    expect(body.error.details).toEqual([{ path: "email", message: expect.any(String) }]);
  });
  it("hides the message and details of server errors", () => {
    const internal = toErrorResponse(new Error("ECONNREFUSED 10.0.0.5:27017"), "r3");
    expect(internal.status).toBe(500);
    expect(internal.body.error).toEqual({ code: "INTERNAL", message: "Something went wrong on our side.", requestId: "r3" });
    const unavailable = toErrorResponse(new AppError("SERVICE_UNAVAILABLE", "MONGODB_URI is not set", { details: { x: 1 } }), "r4");
    expect(unavailable.body.error).toEqual({ code: "SERVICE_UNAVAILABLE", message: "The service is temporarily unavailable.", requestId: "r4" });
  });
});

describe("route wrapper", () => {
  it("echoes the request ID on success and sets no-store", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const handler = route("t", async (_r, { requestId }) => json({ requestId }));
    const res = await handler(req({ "x-request-id": "req-12345678" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-request-id")).toBe("req-12345678");
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ requestId: "req-12345678" });
  });

  it("maps thrown errors to the standard body and logs 5xx without the message or query string", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const handler = route("t", async () => {
      throw new Error("password=hunter2 leaked");
    });
    const res = await handler(req());
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error.code).toBe("INTERNAL");
    expect(body.error.requestId).toBe(res.headers.get("x-request-id"));
    const line = JSON.parse(errorLog.mock.calls[0][0] as string);
    expect(line).toMatchObject({ level: "error", route: "t", status: 500, path: "/api/v1/thing", errorName: "Error" });
    expect(JSON.stringify(line)).not.toContain("hunter2");
    expect(JSON.stringify(line)).not.toContain("secret=1");
  });

  it("logs a deliberate 5xx response (e.g. degraded health) as a warning, not an error", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const handler = route("t", async () => json({ status: "degraded" }, { status: 503 }));
    const res = await handler(req());
    expect(res.status).toBe(503);
    const line = JSON.parse(errorLog.mock.calls[0][0] as string);
    expect(line).toMatchObject({ level: "warn", msg: "request degraded", status: 503 });
    expect(line.errorName).toBeUndefined();
  });

  it("resolves Next.js dynamic params", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    const handler = route<{ ref: string }>("t", async (_r, { params }) => json(params));
    const res = await handler(req(), { params: Promise.resolve({ ref: "HLD-0612-4821" }) });
    expect(await res.json()).toEqual({ ref: "HLD-0612-4821" });
  });
});
