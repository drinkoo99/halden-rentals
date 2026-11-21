import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffAvailability } from "@/components/staff/StaffAvailability";

export const metadata: Metadata = { title: { absolute: "Availability — HALDEN Operations" }, robots: { index: false } };

/** Stitch "Staff Console: Availability Planner". Staff console with demo data until the backend phase. */
export default function Page() {
  return (
    <StaffConsoleFrame>
      <StaffAvailability />
    </StaffConsoleFrame>
  );
}
