import { describe, expect, it } from "vitest";
import { extras } from "@/data/extras";
import { locations } from "@/data/locations";
import { vehicles } from "@/data/vehicles";
import { toPublic } from "@/server/catalogue/public";
import { extraFromStatic, locationFromStatic, vehicleModelFromStatic } from "@/server/catalogue/seed/fromStatic";
import { findLocation, findVehicle, formatCoordinates, similarVehicles, toExtra, toLocation, toSiteCatalogue, toVehicle, zoneLabel } from "./catalogue";

// The pages now render the database catalogue. These tests pin that the round trip
// static data → seed document → public API item → view model reproduces exactly what the pages rendered before.
const summer = new Date("2026-07-01T12:00:00Z");
const winter = new Date("2026-11-22T12:00:00Z");

describe("catalogue view mapping", () => {
  it("reproduces every static vehicle exactly", () => {
    vehicles.forEach((v, i) => expect(toVehicle(toPublic(vehicleModelFromStatic(v, i)))).toEqual(v));
  });

  it("reproduces every static extra exactly", () => {
    extras.forEach((e, i) => expect(toExtra(toPublic(extraFromStatic(e, i)))).toEqual(e));
  });

  it("reproduces every static hub, with the time-zone label derived from the IANA zone", () => {
    locations.forEach((l, i) => {
      const doc = toPublic(locationFromStatic(l, i));
      expect(toLocation(doc, summer)).toEqual(l); // the static data said "CEST"
      expect(toLocation(doc, winter)).toEqual({ ...l, timezone: "CET" });
    });
  });

  it("formats coordinates like the static data (four decimals, hemispheres)", () => {
    expect(formatCoordinates({ lat: 48.3537, lng: 11.775 })).toBe("48.3537° N, 11.7750° E");
    expect(formatCoordinates({ lat: -33.9, lng: -70.7853 })).toBe("33.9000° S, 70.7853° W");
  });

  it("labels zones by date", () => {
    expect(zoneLabel("Europe/Zurich", summer)).toBe("CEST");
    expect(zoneLabel("Europe/Zurich", winter)).toBe("CET");
  });

  it("handles an empty catalogue", () => {
    expect(toSiteCatalogue({ locations: [], vehicles: [], extras: [] }, winter)).toEqual({ locations: [], vehicles: [], extras: [] });
  });
});

describe("catalogue lookups", () => {
  it("finds vehicles by slug", () => {
    expect(findVehicle(vehicles, "lexus-lc-500")?.slug).toBe("lexus-lc-500");
    expect(findVehicle(vehicles, "nope")).toBeUndefined();
  });

  it("falls back to the first hub for an unknown or missing id", () => {
    expect(findLocation(locations, "muc").code).toBe("MUC");
    expect(findLocation(locations, "xxx").id).toBe("zrh");
    expect(findLocation(locations, null).id).toBe("zrh");
  });

  it("orders similar vehicles by category, then closest rate", () => {
    const rr = findVehicle(vehicles, "range-rover-autobiography")!;
    const similar = similarVehicles(vehicles, rr);
    expect(similar).toHaveLength(3);
    expect(similar.map((v) => v.slug)).not.toContain(rr.slug);
    expect(similar[0].category).toBe("suv");
  });
});
