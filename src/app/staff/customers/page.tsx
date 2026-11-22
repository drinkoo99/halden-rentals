import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffCustomers } from "@/components/staff/StaffCustomers";
import { requireRole } from "@/server/auth/session";
import { AppError } from "@/server/http/errors";
import { peopleContext } from "@/server/staff/context";
import { listPeople, type BookingCounts, type StaffUserView } from "@/server/staff/people";
import { peopleQuery } from "@/server/staff/schemas";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Customers — HALDEN Operations" }, robots: { index: false } };

/** Staff Console: Customers over the real customer accounts (M8). ?q=&status= */
export default async function Page({ searchParams }: PageProps<"/staff/customers">) {
  const user = await requireRole(["staff", "admin"], "/staff/customers");
  const raw = await searchParams;
  const parsed = peopleQuery.safeParse(Object.fromEntries(Object.entries(raw).filter(([k, v]) => ["q", "status"].includes(k) && typeof v === "string" && v)));
  const filters = parsed.success ? parsed.data : {};
  let people: { user: StaffUserView; counts: BookingCounts }[] = [];
  let setupError: string | undefined;
  try {
    people = await listPeople(await peopleContext(), { roles: ["customer"], ...filters });
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "Accounts are not available on this database yet (run db:setup).";
  }
  return (
    <StaffConsoleFrame>
      <StaffCustomers people={people} filters={filters} staffName={user.name} today={staffToday()} setupError={setupError} />
    </StaffConsoleFrame>
  );
}
