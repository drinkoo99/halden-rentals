import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffBookings, type StaffBookingFilters, type StaffBookingRow } from "@/components/staff/StaffBookings";
import { requireRole } from "@/server/auth/session";
import { bookingContext } from "@/server/bookings/context";
import { bookingRows } from "@/server/bookings/display";
import { staffBookingQuery } from "@/server/bookings/schemas";
import { staffBookings } from "@/server/bookings/store";
import { getSiteCatalogue } from "@/server/catalogue/service";
import { unitsOf } from "@/server/fleet/store";
import { AppError } from "@/server/http/errors";

export const metadata: Metadata = { title: { absolute: "Bookings — HALDEN Operations" }, robots: { index: false } };

/** Stitch "Staff Console: Bookings" over the real reservations (M7). Filters: ?q=&status=&location=&from=&to= */
export default async function Page({ searchParams }: PageProps<"/staff/bookings">) {
  const user = await requireRole(["staff", "admin"], "/staff/bookings");
  const raw = await searchParams;
  const keys = ["q", "status", "location", "from", "to"];
  const parsed = staffBookingQuery.safeParse(Object.fromEntries(Object.entries(raw).filter(([k, v]) => keys.includes(k) && typeof v === "string" && v)));
  const filters: StaffBookingFilters = parsed.success ? parsed.data : {};
  const catalogue = await getSiteCatalogue();

  let rows: StaffBookingRow[] = [];
  let setupError: string | undefined;
  try {
    const ctx = await bookingContext();
    const docs = await staffBookings(ctx, parsed.success ? parsed.data : {});
    const ids = docs.flatMap((d) => (d.unitId ? [d.unitId] : []));
    const units = ids.length ? await unitsOf(ctx).find({ _id: { $in: ids } }).toArray() : [];
    const display = await bookingRows(docs);
    rows = docs.map((d, i) => {
      const unit = units.find((u) => d.unitId && u._id.equals(d.unitId));
      return { ...display[i], customer: `${d.driver.firstName} ${d.driver.lastName}`, email: d.driver.email, unit: unit ? `${unit.unitCode} · ${unit.registration}` : null };
    });
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "Bookings are not set up on this database yet (run db:setup).";
  }

  return (
    <StaffConsoleFrame>
      <StaffBookings
        bookings={rows}
        hubs={catalogue.locations.map((l) => ({ code: l.id, iata: l.code, city: l.city }))}
        filters={filters}
        staffName={user.name}
        today={new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date()).toUpperCase()}
        setupError={setupError}
      />
    </StaffConsoleFrame>
  );
}
