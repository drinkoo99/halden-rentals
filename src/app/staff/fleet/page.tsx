import type { Metadata } from "next";
import { StaffFleet } from "@/components/staff/StaffFleet";

export const metadata: Metadata = { title: "Fleet — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Fleet Management". Staff console with demo data until the backend phase. */
export default function Page() {
  return <StaffFleet />;
}
