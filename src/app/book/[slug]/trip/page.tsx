import type { Metadata } from "next";
import { TripStep } from "@/components/booking/TripStep";

export const metadata: Metadata = { title: "Reservation · Trip", robots: { index: false } };

export default function TripPage() {
  return <TripStep />;
}
