import { ObjectId } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { extras as staticExtras } from "@/data/extras";
import { vehicles as staticVehicles } from "@/data/vehicles";
import { catalogueSeedFromStatic } from "./seed/fromStatic";

// The service with the database client and Next's cache helpers replaced ("use cache" is a no-op here).
const db = { configured: true, docs: {} as Record<string, unknown[]> };
vi.mock("next/cache", () => ({ cacheLife: () => {}, cacheTag: () => {} }));
vi.mock("../db/client", () => ({
  isDatabaseConfigured: () => db.configured,
  getDb: async () => ({
    collection: (name: string) => ({ find: () => ({ sort: () => ({ toArray: async () => db.docs[name] ?? [] }) }) }),
  }),
}));
const service = await import("./service");

const seed = catalogueSeedFromStatic();
const stored = (doc: object) => ({ _id: new ObjectId(), ...structuredClone(doc), createdAt: new Date(), updatedAt: new Date() });

let warnings: string[];
beforeEach(() => {
  warnings = [];
  vi.spyOn(console, "error").mockImplementation((line: string) => void warnings.push(line));
  db.configured = true;
  db.docs = { locations: seed.locations.map(stored), vehicleModels: seed.vehicleModels.map(stored), extras: seed.extras.map(stored) };
});
afterEach(() => vi.restoreAllMocks());

describe("catalogue service", () => {
  it("serves the pages from the database when it is configured", async () => {
    db.docs.vehicleModels = db.docs.vehicleModels.slice(0, 2);
    const site = await service.getSiteCatalogue();
    expect(site.vehicles.map((v) => v.slug)).toEqual(staticVehicles.slice(0, 2).map((v) => v.slug));
    expect(site.locations).toHaveLength(5);
    expect(site.extras).toEqual(staticExtras);
    expect(warnings).toEqual([]);
  });

  it("renders the static demo catalogue (logged) only when no database is configured", async () => {
    db.configured = false;
    const site = await service.getSiteCatalogue();
    expect(site.vehicles).toEqual(staticVehicles);
    expect(warnings.join("\n")).toContain("MONGODB_URI is not set");
  });

  it("the API getters never fall back: 503 without a database", async () => {
    db.configured = false;
    await expect(service.getPublicVehicles()).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    await expect(service.getPublicLocations()).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    await expect(service.getPublicExtras()).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
  });

  it("refuses to render pages without any active hub (the booking flow needs one)", async () => {
    db.docs.locations = [];
    await expect(service.getSiteCatalogue()).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
  });

  it("renders an empty fleet when there are no published vehicles", async () => {
    db.docs.vehicleModels = [];
    expect((await service.getSiteCatalogue()).vehicles).toEqual([]);
  });

  it("the static fallback has the same public shape as the database", async () => {
    const fallback = service.staticPublicCatalogue();
    expect(fallback.vehicles).toEqual(await service.getPublicVehicles());
    expect(fallback.locations).toEqual(await service.getPublicLocations());
    expect(fallback.extras).toEqual(await service.getPublicExtras());
  });
});
