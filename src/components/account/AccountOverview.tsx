import { AccountOverviewEmptyDesktop } from "@/components/account/AccountOverviewEmptyDesktop";
import { AccountOverviewMobile } from "@/components/account/AccountOverviewMobile";
import type { BookingRow } from "@/lib/bookingDisplay";

/**
 * Patron overview for the signed-in patron, with their real reservations (M7): upcoming (held, confirmed,
 * on rent) and past (completed, cancelled, expired). Without any, the Stitch empty states show.
 */
export function AccountOverview({ firstName, upcoming, past, unavailable }: { firstName: string; upcoming: BookingRow[]; past: BookingRow[]; unavailable?: boolean }) {
  return (
    <>
      <AccountOverviewMobile firstName={firstName} upcoming={upcoming} past={past} />
      <AccountOverviewEmptyDesktop firstName={firstName} upcoming={upcoming} past={past} unavailable={unavailable} />
    </>
  );
}
