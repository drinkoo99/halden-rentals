import type { Metadata } from "next";
import { AccountOverview } from "@/components/account/AccountOverview";

export const metadata: Metadata = { title: "Patron Circle — Overview", description: "Your HALDEN reservations, past journeys and saved exhibits.", robots: { index: false } };

/** Stitch "Patron Circle: Account Overview" (desktop, incl. empty state) and "Mobile: Patron Account Overview". */
export default function Page() {
  return <AccountOverview />;
}
