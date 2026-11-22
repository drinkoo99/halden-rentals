import { ObjectId } from "mongodb";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UserDoc } from "./store";

// The server-side gates, with the request cookie, the session lookup and Next's interrupts replaced.
const state = { token: undefined as string | undefined, user: null as UserDoc | null };
vi.mock("next/navigation", () => ({
  redirect: (to: string) => {
    throw Object.assign(new Error("NEXT_REDIRECT"), { to });
  },
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
vi.mock("next/headers", () => ({ cookies: async () => ({ get: () => (state.token ? { value: state.token } : undefined) }) }));
vi.mock("react", async (orig) => ({ ...(await orig<typeof import("react")>()), cache: (fn: unknown) => fn }));
vi.mock("../db/client", () => ({ isDatabaseConfigured: () => true, getDb: async () => ({}) }));
vi.mock("./store", async (orig) => ({ ...(await orig<typeof import("./store")>()), sessionUser: async (_ctx: unknown, token: string) => (token === "valid" ? state.user : null) }));
const { currentUser, requireRole, requireUser, safeNext } = await import("./session");

const doc = (role: UserDoc["role"]): UserDoc => ({
  _id: new ObjectId(),
  email: "patron@example.com",
  name: "Clara Bergmann",
  passwordHash: "scrypt$1$8$1$salt$hash",
  role,
  status: "active",
  emailVerifiedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});
const thrown = async (p: Promise<unknown>) => p.then(() => null, (e: Error & { to?: string }) => e.to ?? e.message);

beforeEach(() => {
  state.token = "valid";
  state.user = doc("customer");
});

describe("server-side authorization", () => {
  it("redirects signed-out visitors to sign-in, returning to the requested page", async () => {
    state.token = undefined;
    expect(await thrown(requireUser("/account/settings"))).toBe("/sign-in?next=%2Faccount%2Fsettings");
  });

  it("treats an unknown or expired session like no session", async () => {
    state.token = "stale";
    expect(await currentUser()).toBeNull();
    expect(await thrown(requireUser("/account"))).toBe("/sign-in?next=%2Faccount");
  });

  it("never puts an off-site return target into the redirect", async () => {
    state.token = undefined;
    expect(await thrown(requireUser("https://evil.example/x"))).toBe("/sign-in?next=%2Faccount");
  });

  it("lets any signed-in user into the account area, exposing no password hash", async () => {
    const user = await requireUser("/account");
    expect(user).toEqual({ id: state.user!._id.toHexString(), name: "Clara Bergmann", email: "patron@example.com", role: "customer", emailVerified: false });
    expect(JSON.stringify(user)).not.toContain("scrypt");
  });

  it("answers 404 when a customer requests the staff console", async () => {
    expect(await thrown(requireRole(["staff", "admin"], "/staff"))).toBe("NEXT_NOT_FOUND");
  });

  it("admits staff and admins to the staff console, but only admins to admin-only areas", async () => {
    state.user = doc("staff");
    expect((await requireRole(["staff", "admin"], "/staff")).role).toBe("staff");
    expect(await thrown(requireRole(["admin"], "/admin"))).toBe("NEXT_NOT_FOUND");
    state.user = doc("admin");
    expect((await requireRole(["admin"], "/admin")).role).toBe("admin");
  });
});

describe("safeNext", () => {
  it("only accepts same-site paths", () => {
    expect(safeNext("/account/settings")).toBe("/account/settings");
    for (const bad of ["https://evil.example", "//evil.example", "/\\evil.example", "javascript:alert(1)", "", null, undefined]) expect(safeNext(bad)).toBe("/account");
  });
});
