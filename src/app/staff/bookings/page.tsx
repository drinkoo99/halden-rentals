import type { Metadata } from "next";
import { StaffDemoBanner } from "@/components/staff/StaffDemoBanner";
import { StaffBookings } from "@/components/staff/StaffBookings";

export const metadata: Metadata = { title: "Bookings — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Bookings". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <>
      <StaffBookings />
      <StaffDemoBanner />
    </>
  );
}
