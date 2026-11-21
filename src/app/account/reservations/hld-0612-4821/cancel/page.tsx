import type { Metadata } from "next";
import { ReservationCancelScreen } from "@/components/account/ReservationCancelScreen";

export const metadata: Metadata = { title: "Cancel reservation — HLD-0612-4821", robots: { index: false } };

/** Stitch "Reservation: Cancel Confirmation (Overlay)". */
export default function Page() {
  return <ReservationCancelScreen />;
}
