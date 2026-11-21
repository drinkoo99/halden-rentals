import type { Metadata } from "next";
import { ReservationDetail } from "@/components/account/ReservationDetail";

export const metadata: Metadata = { title: "Reservation HLD-0612-4821", robots: { index: false } };

/** Stitch "Reservation Detail: HLD-0612-4821" (confirmed / cancelled) and "Mobile: Reservation Detail". */
export default function Page() {
  return <ReservationDetail />;
}
