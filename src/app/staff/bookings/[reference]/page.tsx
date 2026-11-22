import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaffBookingDetail } from "@/components/staff/StaffBookingDetail";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { requireRole } from "@/server/auth/session";
import { bookingContext } from "@/server/bookings/context";
import { bookingRows } from "@/server/bookings/display";
import { referenceSchema } from "@/server/bookings/schemas";
import { assignmentCandidates, staffBooking } from "@/server/bookings/store";
import { toStaffBooking } from "@/server/bookings/views";
import { unitsOf } from "@/server/fleet/store";
import { AppError } from "@/server/http/errors";

export const metadata: Metadata = { title: { absolute: "Booking — HALDEN Operations" }, robots: { index: false } };

const REASON: Record<string, string> = { status: "out of service", location: "at another hub", blocked: "blocked", reserved: "booked", strands_next: "would strand its next booking" };

/** Stitch "Staff Console: Booking Detail" for a real reservation (M7). */
export default async function Page({ params }: PageProps<"/staff/bookings/[reference]">) {
  const { reference } = await params;
  const user = await requireRole(["staff", "admin"], `/staff/bookings/${encodeURIComponent(reference)}`);
  const ref = referenceSchema.safeParse(reference);
  if (!ref.success) notFound();
  const ctx = await bookingContext();
  let doc;
  try {
    doc = await staffBooking(ctx, ref.data);
  } catch (err) {
    if (err instanceof AppError && err.code === "NOT_FOUND") notFound();
    throw err;
  }
  const [unit, [row], candidates] = await Promise.all([
    doc.unitId ? unitsOf(ctx).findOne({ _id: doc.unitId }) : null,
    bookingRows([doc]),
    doc.status === "held" || doc.status === "confirmed" ? assignmentCandidates(ctx, doc) : Promise.resolve([]),
  ]);
  return (
    <StaffConsoleFrame>
      <StaffBookingDetail
        booking={toStaffBooking(doc, unit)}
        row={row}
        candidates={candidates.map(({ unit: u, reasons }) => ({
          id: u._id.toHexString(),
          label: `${u.unitCode} · ${u.registration} · ${u.locationCode.toUpperCase()}`,
          available: reasons.length === 0,
          ...(reasons.length ? { reason: [...new Set(reasons.map((r) => REASON[r.code] ?? r.code))].join(", ") } : {}),
        }))}
        staffName={user.name}
        today={new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date()).toUpperCase()}
      />
    </StaffConsoleFrame>
  );
}
