import type { Metadata } from "next";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { AccountBookingDetail } from "@/components/account/AccountBookingDetail";
import { requireUser } from "@/server/auth/session";
import { bookingContext } from "@/server/bookings/context";
import { bookingRows } from "@/server/bookings/display";
import { referenceSchema } from "@/server/bookings/schemas";
import { customerBooking } from "@/server/bookings/store";
import { toCustomerBooking } from "@/server/bookings/views";
import { AppError } from "@/server/http/errors";

export const metadata: Metadata = { title: "Patron Circle — Reservation", robots: { index: false } };

/** One of the signed-in patron's own reservations; anyone else's reference is "not found". */
export default async function Page({ params }: PageProps<"/account/reservations/[reference]">) {
  const { reference } = await params;
  const user = await requireUser(`/account/reservations/${encodeURIComponent(reference)}`);
  const ref = referenceSchema.safeParse(reference);
  if (!ref.success) notFound();
  let doc;
  try {
    doc = await customerBooking(await bookingContext(), ref.data, new ObjectId(user.id));
  } catch (err) {
    if (err instanceof AppError && err.code === "NOT_FOUND") notFound();
    throw err;
  }
  const [row] = await bookingRows([doc]);
  const now = new Date();
  const holdLive = doc.status === "held" && !!doc.holdExpiresAt && doc.holdExpiresAt > now;
  const canCancel = (doc.status === "held" || doc.status === "confirmed") && doc.pickupAt > now;
  return <AccountBookingDetail booking={toCustomerBooking(doc)} row={row} canCancel={canCancel} holdLive={holdLive} />;
}
