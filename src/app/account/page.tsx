import type { Metadata } from "next";
import { ObjectId } from "mongodb";
import { AccountOverview } from "@/components/account/AccountOverview";
import type { BookingRow } from "@/lib/bookingDisplay";
import { firstName } from "@/lib/names";
import { requireUser } from "@/server/auth/session";
import { bookingContext } from "@/server/bookings/context";
import { bookingRows, isUpcoming } from "@/server/bookings/display";
import { customerBookings } from "@/server/bookings/store";
import { AppError } from "@/server/http/errors";

export const metadata: Metadata = { title: "Patron Circle — Overview", description: "Your HALDEN reservations, past journeys and saved exhibits.", robots: { index: false } };

/** Stitch "Patron Circle: Account Overview" with the signed-in patron's real reservations. */
export default async function Page() {
  const user = await requireUser("/account"); // already verified by the layout's gate; cached per request
  let upcoming: BookingRow[] = [];
  let past: BookingRow[] = [];
  let unavailable = false;
  try {
    const docs = await customerBookings(await bookingContext(), new ObjectId(user.id));
    upcoming = await bookingRows(docs.filter(isUpcoming).sort((a, b) => a.pickupAt.getTime() - b.pickupAt.getTime()));
    past = await bookingRows(docs.filter((d) => !isUpcoming(d)));
  } catch (err) {
    if (!(err instanceof AppError) || err.code !== "SERVICE_UNAVAILABLE") throw err;
    unavailable = true;
  }
  return <AccountOverview firstName={firstName(user.name)} upcoming={upcoming} past={past} unavailable={unavailable} />;
}
