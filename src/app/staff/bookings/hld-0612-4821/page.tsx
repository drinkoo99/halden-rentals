import type { Metadata } from "next";
import { StaffBookingDetail } from "@/components/staff/StaffBookingDetail";

export const metadata: Metadata = { title: "Booking HLD-0612-4821 — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Booking Detail". Staff console with demo data until the backend phase. */
export default function Page() {
  return <StaffBookingDetail />;
}
