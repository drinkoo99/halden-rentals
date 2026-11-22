import { ObjectId } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PublicUser } from "../auth/schemas";
import type { UnitDoc } from "./store";

// The fleet and availability Route Handlers with the session, database context and store replaced.
const state = { user: null as PublicUser | null };
vi.mock("@/server/auth/session", () => ({ currentUser: async () => state.user }));
vi.mock("@/server/fleet/context", () => ({ fleetContext: async () => ({ db: {} }) }));
vi.mock("next/server", () => ({ connection: async () => {} }));
const unit: UnitDoc = {
  _id: new ObjectId(),
  unitCode: "FU-ABC234",
  modelSlug: "lexus-lc-500",
  registration: "M-HL 4821",
  vin: "WP0ZZZ99ZTS392124",
  locationCode: "muc",
  status: "available",
  mileageKm: 1200,
  year: 2025,
  createdAt: new Date("2026-11-01T00:00:00Z"),
  updatedAt: new Date("2026-11-01T00:00:00Z"),
};
const store = vi.hoisted(() => ({
  listUnits: vi.fn(),
  createUnit: vi.fn(),
  getUnit: vi.fn(),
  listBlocks: vi.fn(),
  updateUnit: vi.fn(),
  changeStatus: vi.fn(),
  createBlock: vi.fn(),
  deleteBlock: vi.fn(),
}));
vi.mock("@/server/fleet/store", async (orig) => ({ ...(await orig<typeof import("./store")>()), ...store }));
const availability = vi.hoisted(() => ({ checkAvailability: vi.fn() }));
vi.mock("@/server/availability/service", () => availability);

const fleet = await import("@/app/api/v1/staff/fleet/route");
const one = await import("@/app/api/v1/staff/fleet/[id]/route");
const status = await import("@/app/api/v1/staff/fleet/[id]/status/route");
const blocks = await import("@/app/api/v1/staff/fleet/[id]/blocks/route");
const block = await import("@/app/api/v1/staff/fleet/[id]/blocks/[blockId]/route");
const staffAvail = await import("@/app/api/v1/staff/availability/route");
const publicAvail = await import("@/app/api/v1/availability/route");

const id = unit._id.toHexString();
const params = <P,>(p: P) => ({ params: Promise.resolve(p) });
const get = (path: string) => new Request(`http://localhost${path}`, { headers: { host: "localhost" } });
const send = (method: string, path: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`http://localhost${path}`, { method, body: JSON.stringify(body), headers: { host: "localhost", "content-type": "application/json", origin: "http://localhost", ...headers } });
const as = (role: PublicUser["role"] | null) => (state.user = role ? { id: new ObjectId().toHexString(), name: "A B", email: "a@b.ch", role, emailVerified: true } : null);
const codeOf = async (res: Response) => ((await res.json()) as { error?: { code: string } }).error?.code;

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  for (const fn of Object.values(store)) fn.mockReset();
  store.listUnits.mockResolvedValue([unit]);
  store.createUnit.mockResolvedValue(unit);
  store.getUnit.mockResolvedValue(unit);
  store.listBlocks.mockResolvedValue([]);
  store.updateUnit.mockResolvedValue(unit);
  store.changeStatus.mockResolvedValue({ ...unit, status: "maintenance" });
  store.createBlock.mockResolvedValue({ _id: new ObjectId(), unitId: unit._id, kind: "maintenance", startsAt: new Date("2030-06-10T10:00:00Z"), endsAt: new Date("2030-06-11T10:00:00Z"), createdBy: new ObjectId(), createdAt: new Date() });
  availability.checkAvailability.mockResolvedValue({ modelSlug: "lexus-lc-500", bookable: true, available: true, availableUnits: 3, units: [{ unitId: id, available: true, reasons: [] }] });
});
afterEach(() => {
  vi.restoreAllMocks();
  state.user = null;
});

const mutations = () => [
  () => fleet.POST(send("POST", "/api/v1/staff/fleet", { modelSlug: "lexus-lc-500", registration: "X 1", locationCode: "muc", mileageKm: 0, year: 2025 })),
  () => one.PATCH(send("PATCH", `/api/v1/staff/fleet/${id}`, { mileageKm: 1300 }), params({ id })),
  () => status.POST(send("POST", `/api/v1/staff/fleet/${id}/status`, { status: "maintenance" }), params({ id })),
  () => blocks.POST(send("POST", `/api/v1/staff/fleet/${id}/blocks`, { kind: "maintenance", startsAt: "2030-06-10T10:00:00Z", endsAt: "2030-06-11T10:00:00Z" }), params({ id })),
  () => block.DELETE(send("DELETE", `/api/v1/staff/fleet/${id}/blocks/${id}`, {}), params({ id, blockId: id })),
];

describe("fleet API authorization", () => {
  it("401 for signed-out visitors on every staff endpoint", async () => {
    for (const call of [() => fleet.GET(get("/api/v1/staff/fleet")), () => one.GET(get(`/api/v1/staff/fleet/${id}`), params({ id })), ...mutations()]) {
      const res = await call();
      expect(res.status).toBe(401);
      expect(await codeOf(res)).toBe("UNAUTHENTICATED");
    }
    expect(Object.values(store).every((fn) => fn.mock.calls.length === 0)).toBe(true);
  });

  it("403 for customers: they can neither read nor modify the inventory", async () => {
    as("customer");
    for (const call of [() => fleet.GET(get("/api/v1/staff/fleet")), () => staffAvail.GET(get("/api/v1/staff/availability?model=lexus-lc-500&pickup=muc&from=2030-06-10T10:00:00Z&to=2030-06-11T10:00:00Z")), ...mutations()]) {
      const res = await call();
      expect(res.status).toBe(403);
      expect(await codeOf(res)).toBe("FORBIDDEN");
    }
    expect(Object.values(store).every((fn) => fn.mock.calls.length === 0)).toBe(true);
  });

  it.each(["staff", "admin"] as const)("%s can manage the fleet", async (role) => {
    as(role);
    const statuses = [];
    for (const call of mutations()) statuses.push((await call()).status);
    expect(statuses).toEqual([201, 200, 200, 201, 204]);
    expect(store.createUnit).toHaveBeenCalledTimes(1);
  });

  it("refuses cross-origin and non-JSON writes even for staff", async () => {
    as("staff");
    const cross = await status.POST(send("POST", `/api/v1/staff/fleet/${id}/status`, { status: "maintenance" }, { origin: "https://evil.example" }), params({ id }));
    expect(cross.status).toBe(403);
    const form = await status.POST(new Request(`http://localhost/api/v1/staff/fleet/${id}/status`, { method: "POST", body: "status=maintenance", headers: { host: "localhost", "content-type": "application/x-www-form-urlencoded" } }), params({ id }));
    expect(form.status).toBe(400);
    expect(store.changeStatus).not.toHaveBeenCalled();
  });
});

describe("fleet API behaviour", () => {
  beforeEach(() => as("staff"));

  it("lists with validated filters", async () => {
    const res = await fleet.GET(get("/api/v1/staff/fleet?model=lexus-lc-500&location=muc&status=available"));
    expect(res.status).toBe(200);
    expect(store.listUnits).toHaveBeenCalledWith(expect.anything(), { model: "lexus-lc-500", location: "muc", status: "available" });
    const body = await res.json();
    expect(body.data[0]).toMatchObject({ id, unitCode: "FU-ABC234", registration: "M-HL 4821", locationCode: "muc" });
    expect(body.data[0]).not.toHaveProperty("_id");
    expect((await fleet.GET(get("/api/v1/staff/fleet?status=stolen"))).status).toBe(400);
    expect((await fleet.GET(get("/api/v1/staff/fleet?colour=red"))).status).toBe(400);
  });

  it("validates bodies before touching the store", async () => {
    const bad = await fleet.POST(send("POST", "/api/v1/staff/fleet", { modelSlug: "lexus-lc-500", registration: "X 1", locationCode: "muc", mileageKm: -5, year: 2025, role: "admin" }));
    expect(bad.status).toBe(400);
    expect(await codeOf(bad)).toBe("VALIDATION_FAILED");
    expect(store.createUnit).not.toHaveBeenCalled();
  });

  it("answers 404 for a malformed unit id", async () => {
    const res = await one.GET(get("/api/v1/staff/fleet/not-an-id"), params({ id: "not-an-id" }));
    expect(res.status).toBe(404);
  });
});

describe("availability API", () => {
  const q = "?model=lexus-lc-500&pickup=muc&return=zrh&from=2030-06-10T10:00:00Z&to=2030-06-12T10:00:00Z";

  it("is public but only says yes or no — no units, plates, counts or reasons", async () => {
    const res = await publicAvail.GET(get(`/api/v1/availability${q}`));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ data: { model: "lexus-lc-500", pickup: "muc", return: "zrh", from: "2030-06-10T10:00:00.000Z", to: "2030-06-12T10:00:00.000Z", available: true } });
    expect(availability.checkAvailability).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ pickupLocationCode: "muc", returnLocationCode: "zrh" }));
  });

  it("rejects ambiguous or missing parameters", async () => {
    expect((await publicAvail.GET(get("/api/v1/availability?model=lexus-lc-500&pickup=muc&from=2030-06-10T10:00:00&to=2030-06-12T10:00:00"))).status).toBe(400);
    expect((await publicAvail.GET(get("/api/v1/availability?pickup=muc"))).status).toBe(400);
  });

  it("gives staff the per-unit detail", async () => {
    as("staff");
    const body = await (await staffAvail.GET(get(`/api/v1/staff/availability${q}`))).json();
    expect(body.data).toMatchObject({ availableUnits: 3, units: [{ unitId: id, available: true }] });
  });
});
