import type { Metadata } from "next";
import { AccountOverview } from "@/components/account/AccountOverview";
import { firstName } from "@/lib/names";
import { requireUser } from "@/server/auth/session";

export const metadata: Metadata = { title: "Patron Circle — Overview", description: "Your HALDEN reservations, past journeys and saved exhibits.", robots: { index: false } };

/** Stitch "Patron Circle: Account Overview" (desktop, incl. empty state) and "Mobile: Patron Account Overview". */
export default async function Page() {
  const user = await requireUser("/account"); // already verified by the layout's gate; cached per request
  return <AccountOverview firstName={firstName(user.name)} />;
}
