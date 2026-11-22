import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffDashboard } from "@/components/staff/StaffDashboard";
import { toDashboardView, type DashboardView } from "@/lib/staffViews";
import { requireRole } from "@/server/auth/session";
import { getSiteCatalogue } from "@/server/catalogue/service";
import { AppError } from "@/server/http/errors";
import { loadOperations } from "@/server/staff/loadOperations";
import { operationsQuery } from "@/server/staff/schemas";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Operations overview — HALDEN Operations" }, robots: { index: false } };

/** Staff Console: Operations Overview over live bookings and fleet (M8). ?hub= narrows to one hub. */
export default async function Page({ searchParams }: PageProps<"/staff">) {
  const user = await requireRole(["staff", "admin"], "/staff");
  const raw = await searchParams;
  const parsed = operationsQuery.safeParse(typeof raw.hub === "string" && raw.hub ? { hub: raw.hub } : {});
  const hub = parsed.success ? parsed.data.hub : undefined;
  const catalogue = await getSiteCatalogue();
  let view: DashboardView | null = null;
  let setupError: string | undefined;
  try {
    const { snapshot, hubs, modelNames } = await loadOperations(hub);
    view = toDashboardView(snapshot, hubs, modelNames);
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "Fleet and bookings are not set up on this database yet (run db:setup).";
  }
  return (
    <StaffConsoleFrame>
      <StaffDashboard view={view} hubs={catalogue.locations.map((l) => ({ code: l.id, iata: l.code, city: l.city }))} hub={hub} staffName={user.name} today={staffToday()} setupError={setupError} />
    </StaffConsoleFrame>
  );
}
