import type { Metadata } from "next";
import { ConfirmedStep } from "@/components/booking/ConfirmedStep";

export const metadata: Metadata = { title: "Reservation · Confirmed", robots: { index: false } };

export default function Page() {
  return <ConfirmedStep />;
}
