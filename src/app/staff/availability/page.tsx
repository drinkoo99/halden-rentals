import type { Metadata } from "next";
import { StaffAvailability, type PlannerCell, type PlannerRow } from "@/components/staff/StaffAvailability";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { requireRole } from "@/server/auth/session";
import { overlaps } from "@/server/availability/engine";
import { bookingContext } from "@/server/bookings/context";
import { bookingsOf } from "@/server/bookings/store";
import { getSiteCatalogue } from "@/server/catalogue/service";
import { fleetQuery } from "@/server/fleet/schemas";
import { blocksOf, listUnits } from "@/server/fleet/store";
import { AppError } from "@/server/http/errors";

export const metadata: Metadata = { title: { absolute: "Availability — HALDEN Operations" }, robots: { index: false } };

const DAY = 86_400_000;
const RANK: Record<PlannerCell["kind"], number> = { free: 0, out: 1, blocked: 2, held: 3, booked: 4, rented: 5 };

/** Stitch "Staff Console: Availability Planner" over the real fleet, bookings and blocks (M7). Days are UTC. */
export default async function Page({ searchParams }: PageProps<"/staff/availability">) {
  const user = await requireRole(["staff", "admin"], "/staff/availability");
  const raw = await searchParams;
  const loc = fleetQuery.safeParse(typeof raw.location === "string" && raw.location ? { location: raw.location } : {});
  const location = loc.success ? loc.data.location : undefined;
  const catalogue = await getSiteCatalogue();
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const days = Array.from({ length: 14 }, (_, i) => new Date(start.getTime() + i * DAY));
  const end = new Date(start.getTime() + 14 * DAY);

  let rows: PlannerRow[] = [];
  let setupError: string | undefined;
  try {
    const ctx = await bookingContext();
    const units = await listUnits(ctx, location ? { location } : {});
    const ids = units.map((u) => u._id);
    const [bookings, blocks] = ids.length
      ? await Promise.all([
          bookingsOf(ctx).find({ unitId: { $in: ids }, status: { $in: ["held", "confirmed", "checked_out"] }, pickupAt: { $lt: end } }).toArray(),
          blocksOf(ctx).find({ unitId: { $in: ids }, startsAt: { $lt: end }, endsAt: { $gt: start } }).toArray(),
        ])
      : [[], []];
    const model = (slug: string) => catalogue.vehicles.find((v) => v.slug === slug)?.name ?? slug;
    rows = units.map((u) => ({
      unitId: u._id.toHexString(),
      unitCode: u.unitCode,
      registration: u.registration,
      model: model(u.modelSlug),
      hub: u.locationCode.toUpperCase(),
      cells: days.map((d) => {
        const day = { start: d, end: new Date(d.getTime() + DAY) };
        let cell: PlannerCell = u.status === "maintenance" || u.status === "inactive" ? { kind: "out", title: u.status } : { kind: "free" };
        const consider = (c: PlannerCell) => (RANK[c.kind] > RANK[cell.kind] ? (cell = c) : cell);
        for (const b of blocks) if (b.unitId.equals(u._id) && overlaps({ start: b.startsAt, end: b.endsAt }, day)) consider({ kind: "blocked", title: `${b.kind}${b.reason ? `: ${b.reason}` : ""}` });
        for (const b of bookings) {
          if (!b.unitId?.equals(u._id)) continue;
          if (b.status === "held" && !(b.holdExpiresAt && b.holdExpiresAt > now)) continue;
          const until = b.status === "checked_out" && b.returnAt < now ? now : b.returnAt;
          if (!overlaps({ start: b.pickupAt, end: until }, day)) continue;
          consider({ kind: b.status === "checked_out" ? "rented" : b.status === "held" ? "held" : "booked", reference: b.reference, title: `${b.reference} · ${b.driver.lastName}` });
        }
        return cell;
      }),
    }));
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "Fleet and bookings are not set up on this database yet (run db:setup).";
  }

  return (
    <StaffConsoleFrame>
      <StaffAvailability
        rows={rows}
        days={days.map((d) => new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", weekday: "short", day: "2-digit" }).format(d))}
        hubs={catalogue.locations.map((l) => ({ code: l.id, iata: l.code, city: l.city }))}
        location={location}
        staffName={user.name}
        today={new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(now).toUpperCase()}
        setupError={setupError}
      />
    </StaffConsoleFrame>
  );
}
