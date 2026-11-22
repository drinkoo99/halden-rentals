import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { GET, POST } = await import("@/app/api/[...path]/route");

beforeEach(() => vi.spyOn(console, "log").mockImplementation(() => {}));
afterEach(() => vi.restoreAllMocks());

describe("unknown API paths", () => {
  it.each([
    ["GET", GET],
    ["POST", POST],
  ])("%s answers 404 with the standard JSON error body and a request ID", async (_m, handler) => {
    const res = await handler(new Request("http://localhost/api/v1/nope"));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toContain("application/json");
    const body = await res.json();
    expect(body.error).toMatchObject({ code: "NOT_FOUND", requestId: res.headers.get("x-request-id") });
  });
});
