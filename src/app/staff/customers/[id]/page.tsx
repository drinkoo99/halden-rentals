import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffCustomerDetail } from "@/components/staff/StaffCustomerDetail";
import { requireRole } from "@/server/auth/session";
import { bookingRows } from "@/server/bookings/display";
import { AppError } from "@/server/http/errors";
import { parseObjectId, peopleContext } from "@/server/staff/context";
import { getPerson } from "@/server/staff/people";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Customer — HALDEN Operations" }, robots: { index: false } };

/** Staff Console: one customer with their booking history (M8). Staff/admin accounts are not shown here. */
export default async function Page({ params }: PageProps<"/staff/customers/[id]">) {
  const { id } = await params;
  const user = await requireRole(["staff", "admin"], `/staff/customers/${encodeURIComponent(id)}`);
  let person;
  try {
    person = await getPerson(await peopleContext(), parseObjectId(id));
  } catch (err) {
    if (err instanceof AppError && err.code === "NOT_FOUND") notFound();
    throw err;
  }
  if (person.user.role !== "customer") notFound();
  const byStatus = (statuses: string[]) => person.bookings.filter((b) => statuses.includes(b.status));
  const [upcoming, active, past] = await Promise.all([
    bookingRows(byStatus(["held", "confirmed"]).sort((a, b) => a.pickupAt.getTime() - b.pickupAt.getTime())),
    bookingRows(byStatus(["checked_out"])),
    bookingRows(byStatus(["completed", "cancelled", "expired"])),
  ]);
  return (
    <StaffConsoleFrame>
      <StaffCustomerDetail
        user={person.user}
        groups={[
          { title: "Upcoming", rows: upcoming },
          { title: "On rent", rows: active },
          { title: "Completed, cancelled & expired", rows: past },
        ]}
        staffName={user.name}
        today={staffToday()}
      />
    </StaffConsoleFrame>
  );
}
