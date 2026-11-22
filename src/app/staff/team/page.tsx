import type { Metadata } from "next";
import { StaffConsoleFrame } from "@/components/staff/StaffConsoleFrame";
import { StaffTeam } from "@/components/staff/StaffTeam";
import { AUTH_COLLECTIONS } from "@/server/auth/collections";
import { requireRole } from "@/server/auth/session";
import type { UserDoc } from "@/server/auth/store";
import { AppError } from "@/server/http/errors";
import { peopleContext } from "@/server/staff/context";
import { listPeople, toStaffUserView, type StaffUserView } from "@/server/staff/people";
import { teamQuery } from "@/server/staff/schemas";
import { staffToday } from "@/server/staff/today";

export const metadata: Metadata = { title: { absolute: "Team — HALDEN Operations" }, robots: { index: false } };

/** Admin: staff and admin accounts, role changes and access (M8). Staff get 404 (enforced here, not just hidden). */
export default async function Page({ searchParams }: PageProps<"/staff/team">) {
  const user = await requireRole(["admin"], "/staff/team");
  const raw = await searchParams;
  const parsed = teamQuery.safeParse(typeof raw.email === "string" && raw.email ? { email: raw.email } : {});
  const email = parsed.success ? parsed.data.email : undefined;
  let team: StaffUserView[] = [];
  let lookup: StaffUserView | null | undefined;
  let setupError: string | undefined;
  try {
    const ctx = await peopleContext();
    team = (await listPeople(ctx, { roles: ["staff", "admin"] })).map((p) => p.user);
    if (email) {
      const found = await ctx.db.collection<UserDoc>(AUTH_COLLECTIONS.users).findOne({ email }, { projection: { passwordHash: 0 } });
      lookup = found ? toStaffUserView(found) : null;
    }
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    setupError = "Accounts are not available on this database yet (run db:setup).";
  }
  return (
    <StaffConsoleFrame>
      <StaffTeam team={team} lookup={lookup} lookupEmail={email} selfId={user.id} staffName={user.name} today={staffToday()} setupError={setupError} />
    </StaffConsoleFrame>
  );
}
