import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffSettings } from "@/components/staff/StaffSettings";
import { requireRole } from "@/server/auth/session";
import { getPublicLocations } from "@/server/catalogue/service";
import { effectiveSettings } from "@/server/staff/settings";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Settings — HALDEN Operations" }, robots: { index: false } };

/** Staff: the operational configuration in force, read-only (M8). */
export default async function Page() {
  const user = await requireRole(["staff", "admin"], "/staff/settings");
  return (
    <StaffConsoleFrame>
      <StaffSettings rows={effectiveSettings(process.env, await getPublicLocations())} staffName={user.name} today={staffToday()} />
    </StaffConsoleFrame>
  );
}
