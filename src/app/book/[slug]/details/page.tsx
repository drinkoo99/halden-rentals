import type { Metadata } from "next";
import { DetailsStep } from "@/components/booking/DetailsStep";

export const metadata: Metadata = { title: "Reservation · Driver details", robots: { index: false } };

export default function Page() {
  return <DetailsStep />;
}
