import type { Metadata } from "next";
import { Curbside } from "@/components/staff/Curbside";
import { toOpsView, type OpsView } from "@/lib/staffViews";
import { requireRole } from "@/server/auth/session";
import { getSiteCatalogue } from "@/server/catalogue/service";
import { AppError } from "@/server/http/errors";
import { loadOperations } from "@/server/staff/loadOperations";
import { operationsQuery } from "@/server/staff/schemas";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Curbside — Today — HALDEN Operations" }, robots: { index: false } };

/** Curbside console (handheld) over live pick-ups and returns (M8). ?hub= narrows to one hub. */
export default async function Page({ searchParams }: PageProps<"/staff/curbside">) {
  const user = await requireRole(["staff", "admin"], "/staff/curbside");
  const raw = await searchParams;
  const parsed = operationsQuery.safeParse(typeof raw.hub === "string" && raw.hub ? { hub: raw.hub } : {});
  const hub = parsed.success ? parsed.data.hub : undefined;
  const catalogue = await getSiteCatalogue();
  let pickups: OpsView[] = [];
  let returns: OpsView[] = [];
  let overdue: OpsView[] = [];
  let setupError: string | undefined;
  try {
    const { snapshot, hubs } = await loadOperations(hub);
    pickups = snapshot.pickupsToday.map((r) => toOpsView(r, hubs));
    returns = snapshot.returnsToday.map((r) => toOpsView(r, hubs));
    overdue = snapshot.overdue.map((r) => toOpsView(r, hubs));
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "Fleet and bookings are not set up on this database yet (run db:setup).";
  }
  return (
    <Curbside pickups={pickups} returns={returns} overdue={overdue} hubs={catalogue.locations.map((l) => ({ code: l.id, iata: l.code, city: l.city }))} hub={hub} staffName={user.name} today={staffToday()} setupError={setupError} />
  );
}
