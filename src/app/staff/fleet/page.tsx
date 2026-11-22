import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffFleet, type FleetFilters, type FleetRow } from "@/components/staff/StaffFleet";
import { requireRole } from "@/server/auth/session";
import { getSiteCatalogue } from "@/server/catalogue/service";
import { fleetContext } from "@/server/fleet/context";
import { fleetQuery } from "@/server/fleet/schemas";
import { listUnits, toStaffUnit } from "@/server/fleet/store";
import { AppError } from "@/server/http/errors";

export const metadata: Metadata = { title: { absolute: "Fleet — HALDEN Operations" }, robots: { index: false } };

/**
 * Stitch "Staff Console: Fleet Management" over the real fleet register (M6). The staff layout's gate has
 * already checked the role; filters come from the URL (?location=&status=&model=).
 */
export default async function Page({ searchParams }: PageProps<"/staff/fleet">) {
  const user = await requireRole(["staff", "admin"], "/staff/fleet");
  const raw = await searchParams;
  const parsed = fleetQuery.safeParse(Object.fromEntries(Object.entries(raw).filter(([k, v]) => ["location", "status", "model"].includes(k) && typeof v === "string" && v)));
  const filters: FleetFilters = parsed.success ? parsed.data : {};
  const catalogue = await getSiteCatalogue();

  let units: FleetRow[] = [];
  let setupError: string | undefined;
  try {
    units = (await listUnits(await fleetContext(), filters)).map(toStaffUnit);
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "The fleet register is not set up on this database yet (run db:setup), so no units can be shown or added.";
  }

  return (
    <StaffConsoleFrame>
      <StaffFleet
        units={units}
        models={catalogue.vehicles.map((v) => ({ slug: v.slug, name: v.name, image: v.image, specLine: v.specLine, categoryLabel: v.categoryLabel, pricePerDay: v.pricePerDay }))}
        hubs={catalogue.locations.map((l) => ({ code: l.id, iata: l.code, city: l.city }))}
        filters={filters}
        staffName={user.name}
        today={new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date()).toUpperCase()}
        setupError={setupError}
      />
    </StaffConsoleFrame>
  );
}
