import type { Metadata } from "next";
import { Suspense } from "react";
import { FleetDesktop } from "@/components/fleet/FleetDesktop";
import { FleetMobile } from "@/components/fleet/FleetMobile";

export const metadata: Metadata = {
  title: "The Collection — Fleet Discovery",
  description: "Browse HALDEN’s curated fleet of premium cars by category, brand, price, seats and powertrain.",
};

/**
 * Fleet discovery. Desktop = Stitch screen 12, mobile = screen 26 (+ filter sheet 29).
 * Filters and itinerary live in the URL; the client components read them via useSearchParams,
 * so they render inside a Suspense boundary (required with Cache Components).
 */
export default function FleetPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" aria-busy="true" />}>
      <FleetMobile />
      <FleetDesktop />
    </Suspense>
  );
}
