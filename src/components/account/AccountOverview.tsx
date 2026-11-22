import { AccountOverviewEmptyDesktop } from "@/components/account/AccountOverviewEmptyDesktop";
import { AccountOverviewMobile } from "@/components/account/AccountOverviewMobile";

/**
 * Patron overview for the signed-in patron. Reservations are not stored yet (a later milestone), so a
 * real account has nothing upcoming: desktop shows the Stitch empty state ("Account Overview (Empty
 * State)") and mobile the same message in its upcoming-allocation card. The demo reservation dossier
 * (AccountOverviewDesktop, /account/reservations/hld-0612-4821) is no longer linked from here.
 */
export function AccountOverview({ firstName }: { firstName: string }) {
  return (
    <>
      <AccountOverviewMobile empty firstName={firstName} />
      <AccountOverviewEmptyDesktop firstName={firstName} />
    </>
  );
}
