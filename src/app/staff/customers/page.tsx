import type { Metadata } from "next";
import { StaffDemoBanner } from "@/components/staff/StaffDemoBanner";
import { StaffCustomers } from "@/components/staff/StaffCustomers";

export const metadata: Metadata = { title: "Customers — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Customers". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <>
      <StaffCustomers />
      <StaffDemoBanner />
    </>
  );
}
