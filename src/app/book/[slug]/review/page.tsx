import type { Metadata } from "next";
import { ReviewStep } from "@/components/booking/ReviewStep";

export const metadata: Metadata = { title: "Reservation · Review", robots: { index: false } };

export default function Page() {
  return <ReviewStep />;
}
