import type { Metadata } from "next";
import { StaffDemoBanner } from "@/components/staff/StaffDemoBanner";
import { StaffOverview } from "@/components/staff/StaffOverview";

export const metadata: Metadata = { title: "Operations overview — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Operations Overview". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <>
      <StaffOverview />
      <StaffDemoBanner />
    </>
  );
}
