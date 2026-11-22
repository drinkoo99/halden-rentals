import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PublicUser } from "./schemas";

const state = { user: null as PublicUser | null };
vi.mock("@/server/auth/session", () => ({ currentUser: async () => state.user }));
const { GET } = await import("@/app/api/v1/me/route");

beforeEach(() => vi.spyOn(console, "log").mockImplementation(() => {}));
afterEach(() => {
  vi.restoreAllMocks();
  state.user = null;
});

describe("GET /api/v1/me", () => {
  it("401 UNAUTHENTICATED without a valid session", async () => {
    const res = await GET(new Request("http://localhost/api/v1/me"));
    expect(res.status).toBe(401);
    expect((await res.json()).error).toMatchObject({ code: "UNAUTHENTICATED" });
  });

  it("returns only the public profile, never cached", async () => {
    state.user = { id: "u1", name: "Clara Bergmann", email: "c@example.com", role: "customer", emailVerified: false };
    const res = await GET(new Request("http://localhost/api/v1/me"));
    expect(res.status).toBe(200);
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(await res.json()).toEqual({ data: state.user });
  });
});
