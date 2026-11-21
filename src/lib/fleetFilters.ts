import {
  brandOptions,
  type Category,
  type Feature,
  type Powertrain,
  type Transmission,
  type Vehicle,
} from "@/data/vehicles";

/** Fleet filter state. Serialised into the URL so filtered views are shareable and survive refresh. */
export type FleetFilters = {
  categories: Category[];
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  transmission: Transmission | "any";
  /** Minimum seat count (2, 4, 5 or 7) */
  seats: number | null;
  powertrains: Powertrain[];
  features: Feature[];
  availableOnly: boolean;
  sort: SortKey;
};

export type SortKey = "recommended" | "price-asc" | "price-desc" | "power";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Daily Rate: Low to High" },
  { value: "price-desc", label: "Daily Rate: High to Low" },
  { value: "power", label: "Power (Horsepower)" },
];

/** Daily-rate slider bounds shown on the desktop fleet screen (12). */
export const PRICE_MIN = 150;
export const PRICE_MAX = 800;

export const seatOptions = [2, 4, 5, 7] as const;

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const num = (v: string | null) => (v && !Number.isNaN(Number(v)) ? Number(v) : null);

export function readFilters(p: URLSearchParams): FleetFilters {
  const trans = p.get("trans");
  const sort = p.get("sort") as SortKey | null;
  return {
    categories: list(p.get("category")) as Category[],
    brands: list(p.get("brand")).filter((b) => (brandOptions as readonly string[]).includes(b)),
    minPrice: num(p.get("min")),
    maxPrice: num(p.get("max")),
    transmission: trans === "automatic" || trans === "manual" ? trans : "any",
    seats: num(p.get("seats")),
    powertrains: list(p.get("power")) as Powertrain[],
    features: list(p.get("feature")) as Feature[],
    availableOnly: p.get("avail") !== "0",
    sort: sort && ["recommended", "price-asc", "price-desc", "power"].includes(sort) ? sort : "recommended",
  };
}

/** Writes filter state into a copy of the current params, keeping itinerary params (loc/from/to). */
export function writeFilters(base: URLSearchParams, f: FleetFilters): URLSearchParams {
  const p = new URLSearchParams(base);
  const set = (k: string, v: string | null) => (v ? p.set(k, v) : p.delete(k));
  set("category", f.categories.join(",") || null);
  set("brand", f.brands.join(",") || null);
  set("min", f.minPrice != null ? String(f.minPrice) : null);
  set("max", f.maxPrice != null ? String(f.maxPrice) : null);
  set("trans", f.transmission === "any" ? null : f.transmission);
  set("seats", f.seats != null ? String(f.seats) : null);
  set("power", f.powertrains.join(",") || null);
  set("feature", f.features.join(",") || null);
  set("avail", f.availableOnly ? null : "0");
  set("sort", f.sort === "recommended" ? null : f.sort);
  p.delete("page");
  return p;
}

export const emptyFilters = (sort: SortKey = "recommended"): FleetFilters => ({
  categories: [],
  brands: [],
  minPrice: null,
  maxPrice: null,
  transmission: "any",
  seats: null,
  powertrains: [],
  features: [],
  availableOnly: true,
  sort,
});

/** Applies every filter except `skip` (used to compute live option counts). */
export function applyFilters(
  vehicles: Vehicle[],
  f: FleetFilters,
  skip?: keyof FleetFilters,
): Vehicle[] {
  const out = vehicles.filter((v) => {
    if (skip !== "categories" && f.categories.length && !f.categories.includes(v.category)) return false;
    if (skip !== "brands" && f.brands.length && !f.brands.includes(v.brand)) return false;
    if (skip !== "minPrice" && f.minPrice != null && v.pricePerDay < f.minPrice) return false;
    if (skip !== "maxPrice" && f.maxPrice != null && v.pricePerDay > f.maxPrice) return false;
    if (skip !== "transmission" && f.transmission !== "any" && v.transmission !== f.transmission) return false;
    if (skip !== "seats" && f.seats != null && v.seats < f.seats) return false;
    if (skip !== "powertrains" && f.powertrains.length && !f.powertrains.includes(v.powertrain)) return false;
    if (skip !== "features" && f.features.length && !f.features.every((x) => v.features.includes(x))) return false;
    if (skip !== "availableOnly" && f.availableOnly && !v.available) return false;
    return true;
  });
  const order = new Map(vehicles.map((v, i) => [v.slug, i]));
  switch (f.sort) {
    case "price-asc":
      return out.sort((a, b) => a.pricePerDay - b.pricePerDay);
    case "price-desc":
      return out.sort((a, b) => b.pricePerDay - a.pricePerDay);
    case "power":
      return out.sort((a, b) => b.powerHp - a.powerHp);
    default:
      return out.sort((a, b) => order.get(a.slug)! - order.get(b.slug)!);
  }
}

export function countActive(f: FleetFilters): number {
  return (
    f.categories.length +
    f.brands.length +
    (f.minPrice != null || f.maxPrice != null ? 1 : 0) +
    (f.transmission !== "any" ? 1 : 0) +
    (f.seats != null ? 1 : 0) +
    f.powertrains.length +
    f.features.length
  );
}

export function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}
