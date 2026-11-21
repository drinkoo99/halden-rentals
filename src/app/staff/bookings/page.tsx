import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffBookings } from "@/components/staff/StaffBookings";

export const metadata: Metadata = { title: { absolute: "Bookings — HALDEN Operations" }, robots: { index: false } };

/** Stitch "Staff Console: Bookings". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <StaffConsoleFrame>
      <StaffBookings />
    </StaffConsoleFrame>
  );
}
