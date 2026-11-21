import type { Metadata } from "next";
import { StaffDemoBanner } from "@/components/staff/StaffDemoBanner";
import { CurbsideLookup } from "@/components/staff/curbside/CurbsideLookup";

export const metadata: Metadata = { title: "Curbside — Lookup — HALDEN Operations", robots: { index: false } };

/** Stitch "Curbside Staff: Booking Lookup". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <>
      <CurbsideLookup />
      <StaffDemoBanner />
    </>
  );
}
