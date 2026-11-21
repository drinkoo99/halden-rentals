"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { vehicles } from "@/data/vehicles";
import { applyFilters, readFilters, writeFilters, type FleetFilters } from "@/lib/fleetFilters";
import { readItinerary, itineraryQuery } from "@/lib/itinerary";

/** Shared fleet state for the desktop (12) and mobile (26/29) fleet screens, backed by the URL. */
export function useFleetState() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(() => readFilters(params), [params]);
  const itinerary = useMemo(() => readItinerary(params), [params]);
  const results = useMemo(() => applyFilters(vehicles, filters), [filters]);
  const page = Math.max(1, Number(params.get("page")) || 1);

  const setFilters = useCallback(
    (next: FleetFilters) => {
      const q = writeFilters(params, next).toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const setPage = useCallback(
    (n: number) => {
      const p = new URLSearchParams(params);
      if (n <= 1) p.delete("page");
      else p.set("page", String(n));
      router.push(`${pathname}?${p.toString()}`);
    },
    [params, pathname, router],
  );

  const setItinerary = useCallback(
    (it: { loc: string; from: string; to: string }) => {
      const p = new URLSearchParams(params);
      const iq = new URLSearchParams(itineraryQuery({ location: it.loc, from: it.from, to: it.to }));
      iq.forEach((v, k) => p.set(k, v));
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  /** Query string for links into detail/booking pages, carrying the itinerary only. */
  const tripQuery = itineraryQuery(itinerary);

  return { filters, setFilters, itinerary, setItinerary, results, page, setPage, tripQuery };
}


export function countWithout(filters: FleetFilters, key: keyof FleetFilters, pred: (v: (typeof vehicles)[number]) => boolean) {
  return applyFilters(vehicles, filters, key).filter(pred).length;
}
