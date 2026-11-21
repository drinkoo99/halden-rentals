import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffCustomers } from "@/components/staff/StaffCustomers";

export const metadata: Metadata = { title: { absolute: "Customers — HALDEN Operations" }, robots: { index: false } };

/** Stitch "Staff Console: Customers". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <StaffConsoleFrame>
      <StaffCustomers />
    </StaffConsoleFrame>
  );
}
