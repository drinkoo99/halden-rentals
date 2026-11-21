import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffCustomerDetail } from "@/components/staff/StaffCustomerDetail";

export const metadata: Metadata = { title: "Clara von Bergmann — HALDEN Operations", robots: { index: false } };

/** Stitch "Staff Console: Customer Detail". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <StaffConsoleFrame>
      <StaffCustomerDetail />
    </StaffConsoleFrame>
  );
}
