"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Vehicle } from "@/data/vehicles";
import { itineraryQuery, readItinerary, rentalDays } from "@/lib/itinerary";
import { quote } from "@/lib/pricing";

/** Itinerary + price for one vehicle. Falls back to the vehicle's home hub when no location is in the URL. */
export function useTrip(vehicle: Vehicle) {
  const params = useSearchParams();
  return useMemo(() => {
    const p = new URLSearchParams(params);
    if (!p.get("loc")) p.set("loc", vehicle.homeLocation);
    const itinerary = readItinerary(p);
    const days = rentalDays(itinerary.from, itinerary.to);
    return {
      itinerary,
      days,
      quote: quote(vehicle.pricePerDay, days),
      query: itineraryQuery(itinerary),
    };
  }, [params, vehicle]);
}
