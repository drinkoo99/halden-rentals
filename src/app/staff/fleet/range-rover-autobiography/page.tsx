import type { Metadata } from "next";
import { StaffVehicleEditor } from "@/components/staff/StaffVehicleEditor";

export const metadata: Metadata = { title: "Edit vehicle — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Vehicle Editor". Staff console with demo data until the backend phase. */
export default function Page() {
  return <StaffVehicleEditor />;
}
