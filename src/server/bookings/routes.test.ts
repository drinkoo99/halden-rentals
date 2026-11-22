import { ObjectId } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PublicUser } from "../auth/schemas";
import type { BookingDoc } from "./store";

// The booking Route Handlers with the session, database context and booking store replaced.
const state = { user: null as PublicUser | null };
vi.mock("@/server/auth/session", () => ({ currentUser: async () => state.user }));
vi.mock("@/server/bookings/context", async (orig) => ({ ...(await orig<typeof import("./context")>()), bookingContext: async () => ({ db: {} }), limitByIp: async () => {} }));
vi.mock("@/server/fleet/store", async (orig) => ({ ...(await orig<typeof import("../fleet/store")>()), unitsOf: () => ({ findOne: async () => null, find: () => ({ toArray: async () => [] }) }) }));
const store = vi.hoisted(() => ({ createHold: vi.fn(), customerBookings: vi.fn(), customerBooking: vi.fn(), confirmBooking: vi.fn(), cancelBooking: vi.fn(), quoteTrip: vi.fn(), staffBookings: vi.fn(), staffBooking: vi.fn(), checkOut: vi.fn(), checkIn: vi.fn(), assignUnit: vi.fn(), addStaffNote: vi.fn() }));
vi.mock("@/server/bookings/store", async (orig) => ({ ...(await orig<typeof import("./store")>()), ...store }));

const mine = await import("@/app/api/v1/bookings/route");
const one = await import("@/app/api/v1/bookings/[reference]/route");
const confirm = await import("@/app/api/v1/bookings/[reference]/confirm/route");
const cancel = await import("@/app/api/v1/bookings/[reference]/cancel/route");
const quote = await import("@/app/api/v1/quote/route");
const staffList = await import("@/app/api/v1/staff/bookings/route");
const staffAction = await import("@/app/api/v1/staff/bookings/[reference]/[action]/route");

const REF = "HLD-0601-ABCD";
const booking: BookingDoc = {
  _id: new ObjectId(),
  reference: REF,
  customerId: new ObjectId(),
  status: "held",
  modelSlug: "lexus-lc-500",
  unitId: new ObjectId(),
  pickupLocationCode: "muc",
  returnLocationCode: "muc",
  pickupAt: new Date("2030-06-10T08:00:00Z"),
  returnAt: new Date("2030-06-12T08:00:00Z"),
  price: { currency: "EUR", dailyRateCents: 37500, days: 2, rentalCents: 75000, extras: [], fees: [], subtotalCents: 75000, vatRate: 0.19, vatCents: 14250, totalCents: 89250 },
  driver: { firstName: "Clara", lastName: "Bergmann", email: "c@example.com", phone: "+41791234567", dob: "14/08/1980", licenceCountry: "CHE", licenceNumber: "B-84920419" },
  vehicle: { name: "Lexus LC 500" },
  idempotencyKey: "0b8f3c1e-5d2a-4c3b-9f1e-1a2b3c4d5e6f",
  holdExpiresAt: new Date("2030-06-01T08:15:00Z"),
  staffNotes: [{ at: new Date(), by: new ObjectId(), note: "VIP" }],
  history: [{ at: new Date(), action: "held", byRole: "customer", by: new ObjectId() }],
  createdAt: new Date("2030-06-01T08:00:00Z"),
  updatedAt: new Date("2030-06-01T08:00:00Z"),
};
const params = <P,>(p: P) => ({ params: Promise.resolve(p) });
const get = (path: string) => new Request(`http://localhost${path}`, { headers: { host: "localhost" } });
const post = (path: string, body: unknown, headers: Record<string, string> = {}) =>
  new Request(`http://localhost${path}`, { method: "POST", body: JSON.stringify(body), headers: { host: "localhost", origin: "http://localhost", "content-type": "application/json", ...headers } });
const as = (role: PublicUser["role"] | null) => (state.user = role ? { id: new ObjectId().toHexString(), name: "A B", email: "a@b.ch", role, emailVerified: true } : null);
const body = { model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00", to: "2030-06-12T10:00", extras: {}, driver: { ...booking.driver, notes: "" }, idempotencyKey: booking.idempotencyKey, expectedTotalCents: 89250 };

beforeEach(() => {
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  for (const fn of Object.values(store)) fn.mockReset();
  store.createHold.mockResolvedValue({ booking, replayed: false });
  store.customerBookings.mockResolvedValue([booking]);
  store.customerBooking.mockResolvedValue(booking);
  store.confirmBooking.mockResolvedValue({ booking: { ...booking, status: "confirmed" }, email: "not_configured" });
  store.cancelBooking.mockResolvedValue({ booking: { ...booking, status: "cancelled" }, email: "skipped" });
  store.staffBookings.mockResolvedValue([booking]);
  store.checkOut.mockResolvedValue({ ...booking, status: "checked_out" });
});
afterEach(() => {
  vi.restoreAllMocks();
  state.user = null;
});

describe("customer booking API", () => {
  it("requires sign-in for every booking endpoint", async () => {
    for (const res of [await mine.GET(get("/api/v1/bookings")), await mine.POST(post("/api/v1/bookings", body)), await one.GET(get(`/api/v1/bookings/${REF}`), params({ reference: REF })), await confirm.POST(post(`/api/v1/bookings/${REF}/confirm`, {}), params({ reference: REF }))])
      expect(res.status).toBe(401);
    expect(store.createHold).not.toHaveBeenCalled();
  });

  it("creates a hold (201), replays an idempotent retry (200), and never leaks internals", async () => {
    as("customer");
    const res = await mine.POST(post("/api/v1/bookings", body));
    expect(res.status).toBe(201);
    const data = (await res.json()).data;
    expect(data).toMatchObject({ reference: REF, status: "held", price: { totalCents: 89250 } });
    for (const field of ["unitId", "customerId", "history", "staffNotes", "idempotencyKey", "_id"]) expect(data).not.toHaveProperty(field);
    expect(data.driver).toEqual({ firstName: "Clara", lastName: "Bergmann", email: "c@example.com", phone: "+41791234567" }); // no licence or birth date echoed
    store.createHold.mockResolvedValue({ booking, replayed: true });
    expect((await mine.POST(post("/api/v1/bookings", body))).status).toBe(200);
  });

  it("rejects client-supplied prices or statuses and cross-origin posts", async () => {
    as("customer");
    expect((await mine.POST(post("/api/v1/bookings", { ...body, price: { totalCents: 1 } }))).status).toBe(400);
    expect((await mine.POST(post("/api/v1/bookings", { ...body, status: "confirmed" }))).status).toBe(400);
    expect((await mine.POST(post("/api/v1/bookings", body, { origin: "https://evil.example" }))).status).toBe(403);
    expect(store.createHold).not.toHaveBeenCalled();
  });

  it("acts only on the signed-in user's own bookings, under customer rules even for staff", async () => {
    as("staff");
    await confirm.POST(post(`/api/v1/bookings/${REF}/confirm`, {}), params({ reference: REF }));
    await cancel.POST(post(`/api/v1/bookings/${REF}/cancel`, { reason: "x" }), params({ reference: REF }));
    expect(store.confirmBooking.mock.calls[0][2]).toMatchObject({ role: "customer", id: new ObjectId(state.user!.id) });
    expect(store.cancelBooking.mock.calls[0][2]).toMatchObject({ role: "customer" });
  });

  it("404 for malformed references without touching the store", async () => {
    as("customer");
    expect((await one.GET(get("/api/v1/bookings/../../etc"), params({ reference: "../../etc" }))).status).toBe(404);
    expect(store.customerBooking).not.toHaveBeenCalled();
  });

  it("quotes are public and validated", async () => {
    store.quoteTrip.mockResolvedValue({ available: true, start: booking.pickupAt, end: booking.returnAt, price: booking.price });
    const ok = await quote.POST(post("/api/v1/quote", { model: "lexus-lc-500", pickup: "muc", from: "2030-06-10T10:00", to: "2030-06-12T10:00" }));
    expect(ok.status).toBe(200);
    expect((await ok.json()).data).toMatchObject({ available: true, price: { totalCents: 89250 } });
    expect((await quote.POST(post("/api/v1/quote", { model: "lexus-lc-500", pickup: "muc", from: "tomorrow", to: "later" }))).status).toBe(400);
  });
});

describe("staff booking API", () => {
  it("is closed to customers (403) and signed-out visitors (401)", async () => {
    expect((await staffList.GET(get("/api/v1/staff/bookings"))).status).toBe(401);
    as("customer");
    expect((await staffList.GET(get("/api/v1/staff/bookings"))).status).toBe(403);
    expect((await staffAction.POST(post(`/api/v1/staff/bookings/${REF}/check-out`, {}), params({ reference: REF, action: "check-out" }))).status).toBe(403);
    expect(store.checkOut).not.toHaveBeenCalled();
  });

  it("runs named lifecycle actions only — there is no generic status update", async () => {
    as("staff");
    const res = await staffAction.POST(post(`/api/v1/staff/bookings/${REF}/check-out`, { mileageKm: 1200 }), params({ reference: REF, action: "check-out" }));
    expect(res.status).toBe(200);
    expect(store.checkOut).toHaveBeenCalledWith(expect.anything(), REF, expect.objectContaining({ role: "staff" }), 1200);
    expect((await staffAction.POST(post(`/api/v1/staff/bookings/${REF}/status`, { status: "completed" }), params({ reference: REF, action: "status" }))).status).toBe(404);
  });

  it("shows staff the operational view with notes and history", async () => {
    as("admin");
    const data = (await (await staffList.GET(get("/api/v1/staff/bookings?status=held&q=bergmann"))).json()).data;
    expect(data[0]).toMatchObject({ reference: REF, staffNotes: [{ note: "VIP" }], history: [{ action: "held" }], driver: { licenceNumber: "B-84920419" } });
    expect(store.staffBookings).toHaveBeenCalledWith(expect.anything(), { status: "held", q: "bergmann" });
    expect((await staffList.GET(get("/api/v1/staff/bookings?status=teleported"))).status).toBe(400);
  });
});
