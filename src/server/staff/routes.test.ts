import { ObjectId } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PublicUser } from "../auth/schemas";

// The M8 staff/admin Route Handlers with the session, database and services replaced.
const state = { user: null as PublicUser | null };
vi.mock("@/server/auth/session", () => ({ currentUser: async () => state.user }));
vi.mock("@/server/staff/context", async (orig) => ({ ...(await orig<typeof import("./context")>()), peopleContext: async () => ({ db: { collection: () => ({ findOne: async () => null }) } }) }));
const people = vi.hoisted(() => ({ listPeople: vi.fn(async () => []), getPerson: vi.fn(), setAccountStatus: vi.fn(async () => ({ id: "x", status: "disabled" })), setRole: vi.fn(async () => ({ id: "x", role: "staff" })) }));
vi.mock("@/server/staff/people", async (orig) => ({ ...(await orig<typeof import("./people")>()), ...people }));
const audit = vi.hoisted(() => ({ listAudit: vi.fn(async () => []) }));
vi.mock("@/server/audit/audit", async (orig) => ({ ...(await orig<typeof import("../audit/audit")>()), ...audit }));

const customers = await import("@/app/api/v1/staff/customers/route");
const accountAction = await import("@/app/api/v1/staff/accounts/[id]/[action]/route");
const team = await import("@/app/api/v1/admin/team/route");
const role = await import("@/app/api/v1/admin/accounts/[id]/role/route");
const auditRoute = await import("@/app/api/v1/admin/audit/route");

const ID = new ObjectId().toHexString();
const params = <P,>(p: P) => ({ params: Promise.resolve(p) });
const get = (path: string) => new Request(`http://localhost${path}`, { headers: { host: "localhost" } });
const post = (path: string, body: unknown, origin = "http://localhost") =>
  new Request(`http://localhost${path}`, { method: "POST", body: JSON.stringify(body), headers: { host: "localhost", origin, "content-type": "application/json" } });
const as = (r: PublicUser["role"] | null) => (state.user = r ? { id: new ObjectId().toHexString(), name: "A B", email: "a@b.ch", role: r, emailVerified: true } : null);

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  for (const fn of [...Object.values(people), ...Object.values(audit)]) fn.mockClear();
});
afterEach(() => {
  vi.restoreAllMocks();
  state.user = null;
});

const calls = {
  customers: () => customers.GET(get("/api/v1/staff/customers")),
  suspend: () => accountAction.POST(post(`/api/v1/staff/accounts/${ID}/suspend`, { reason: "x" }), params({ id: ID, action: "suspend" })),
  team: () => team.GET(get("/api/v1/admin/team")),
  role: () => role.POST(post(`/api/v1/admin/accounts/${ID}/role`, { role: "admin" }), params({ id: ID })),
  audit: () => auditRoute.GET(get("/api/v1/admin/audit")),
};

describe("staff and admin API authorization", () => {
  it("signed out: 401 everywhere", async () => {
    for (const call of Object.values(calls)) expect((await call()).status).toBe(401);
  });

  it("customers: 403 everywhere — no customer records, no team, no audit", async () => {
    as("customer");
    for (const call of Object.values(calls)) expect((await call()).status).toBe(403);
    expect(people.listPeople).not.toHaveBeenCalled();
  });

  it("staff: customer management yes, team/roles/audit no", async () => {
    as("staff");
    expect((await calls.customers()).status).toBe(200);
    expect((await calls.suspend()).status).toBe(200);
    for (const call of [calls.team, calls.role, calls.audit]) expect((await call()).status).toBe(403);
    expect(people.setRole).not.toHaveBeenCalled();
  });

  it("admins: everything; the acting user comes from the session, never the request", async () => {
    as("admin");
    for (const call of Object.values(calls)) expect((await call()).status).toBe(200);
    expect(people.setRole.mock.calls[0]).toEqual([expect.anything(), expect.objectContaining({ id: new ObjectId(state.user!.id), role: "admin" }), new ObjectId(ID), "admin", undefined]);
  });

  it("refuses cross-origin writes, unknown actions, smuggled fields and malformed ids", async () => {
    as("admin");
    expect((await role.POST(post(`/api/v1/admin/accounts/${ID}/role`, { role: "admin" }, "https://evil.example"), params({ id: ID }))).status).toBe(403);
    expect((await accountAction.POST(post(`/api/v1/staff/accounts/${ID}/delete`, {}), params({ id: ID, action: "delete" }))).status).toBe(404);
    expect((await role.POST(post(`/api/v1/admin/accounts/${ID}/role`, { role: "admin", actor: "someone" }), params({ id: ID }))).status).toBe(400);
    expect((await role.POST(post("/api/v1/admin/accounts/not-an-id/role", { role: "admin" }), params({ id: "not-an-id" }))).status).toBe(404);
    expect(people.setRole).not.toHaveBeenCalled();
  });
});
