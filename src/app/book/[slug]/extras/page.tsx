import type { Metadata } from "next";
import { ExtrasStep } from "@/components/booking/ExtrasStep";

export const metadata: Metadata = { title: "Reservation · Extras", robots: { index: false } };

export default function Page() {
  return <ExtrasStep />;
}
