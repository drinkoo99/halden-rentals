import type { Metadata } from "next";
import { ReservationModifyScreen } from "@/components/account/ReservationModifyScreen";

export const metadata: Metadata = { title: "Modify itinerary — HLD-0612-4821", robots: { index: false } };

/** Stitch "Reservation: Modify Itinerary (Overlay)". */
export default function Page() {
  return <ReservationModifyScreen />;
}
