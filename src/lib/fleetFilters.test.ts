import { describe, expect, it } from "vitest";
import { vehicles } from "@/data/vehicles";
import { applyFilters, countActive, emptyFilters, readFilters, writeFilters } from "@/lib/fleetFilters";

describe("fleet filters", () => {
  it("returns the full fleet in catalogue order by default", () => {
    expect(applyFilters(vehicles, emptyFilters()).map((v) => v.slug)).toEqual(vehicles.map((v) => v.slug));
  });

  it("filters by brand and minimum seats", () => {
    const f = { ...emptyFilters(), brands: ["Porsche"], seats: 4 };
    expect(applyFilters(vehicles, f).map((v) => v.model)).toEqual(["911 Carrera", "911 Carrera 4S"]);
  });

  it("requires every selected feature", () => {
    const f = { ...emptyFilters(), features: ["awd" as const, "ski" as const] };
    expect(applyFilters(vehicles, f).every((v) => v.features.includes("awd") && v.features.includes("ski"))).toBe(true);
  });

  it("applies the price window inclusively", () => {
    const f = { ...emptyFilters(), minPrice: 300, maxPrice: 390 };
    const prices = applyFilters(vehicles, f).map((v) => v.pricePerDay);
    expect(prices.length).toBeGreaterThan(0);
    expect(Math.min(...prices)).toBeGreaterThanOrEqual(300);
    expect(Math.max(...prices)).toBeLessThanOrEqual(390);
  });

  it("sorts by price and power", () => {
    const asc = applyFilters(vehicles, { ...emptyFilters(), sort: "price-asc" }).map((v) => v.pricePerDay);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const power = applyFilters(vehicles, { ...emptyFilters(), sort: "power" }).map((v) => v.powerHp);
    expect(power).toEqual([...power].sort((a, b) => b - a));
  });

  it("round-trips through the URL and keeps itinerary params", () => {
    const base = new URLSearchParams("loc=muc&from=2030-06-12T10:00&to=2030-06-15T10:00&page=3");
    const f = { ...emptyFilters(), categories: ["suv" as const], brands: ["Volvo"], transmission: "automatic" as const, sort: "power" as const };
    const p = writeFilters(base, f);
    expect(p.get("loc")).toBe("muc");
    expect(p.get("page")).toBeNull();
    expect(readFilters(p)).toEqual(f);
    expect(countActive(f)).toBe(3);
  });

  it("ignores unknown brands and sort keys from the URL", () => {
    const f = readFilters(new URLSearchParams("brand=Ferrari,BMW&sort=cheapest"));
    expect(f.brands).toEqual(["BMW"]);
    expect(f.sort).toBe("recommended");
  });
});
