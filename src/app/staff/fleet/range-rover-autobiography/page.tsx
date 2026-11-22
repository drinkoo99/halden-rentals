import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffDemoBanner } from "@/components/staff/StaffDemoBanner";
import { StaffVehicleEditor } from "@/components/staff/StaffVehicleEditor";

export const metadata: Metadata = { title: { absolute: "Edit vehicle — HALDEN Operations" }, robots: { index: false } };

/** Stitch "Staff Console: Vehicle Editor" — still a design preview with demo data (labelled); real cars are managed in the fleet register. */
export default function Page() {
  return (
    <StaffConsoleFrame>
      <StaffVehicleEditor />
      <StaffDemoBanner />
    </StaffConsoleFrame>
  );
}
