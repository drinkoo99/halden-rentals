import type { Metadata } from "next";
import { StaffDemoBanner } from "@/components/staff/StaffDemoBanner";
import { StaffAvailability } from "@/components/staff/StaffAvailability";

export const metadata: Metadata = { title: "Availability — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Availability Planner". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <>
      <StaffAvailability />
      <StaffDemoBanner />
    </>
  );
}
