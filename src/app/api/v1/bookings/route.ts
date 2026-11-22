import { readJson, requireApiRole } from "@/server/auth/api";
import { actorOf, bookingContext } from "@/server/bookings/context";
import { createBookingInput } from "@/server/bookings/schemas";
import { createHold, customerBookings } from "@/server/bookings/store";
import { toCustomerBooking } from "@/server/bookings/views";
import { json, route } from "@/server/http/handler";

const SIGNED_IN = ["customer", "staff", "admin"] as const;

/** GET /api/v1/bookings — the signed-in user's own bookings. */
export const GET = route("bookings-mine", async (request) => {
  const user = await requireApiRole(request, SIGNED_IN);
  const docs = await customerBookings(await bookingContext(), actorOf(user).id);
  return json({ data: docs.map(toCustomerBooking) });
});

/**
 * POST /api/v1/bookings — reserve a car: a 15-minute hold with a server-calculated, fixed price.
 * 201 for a new hold, 200 when the same idempotency key was already used (the existing booking),
 * 409 when the car is gone or the price changed since the customer reviewed it.
 */
export const POST = route("bookings-create", async (request) => {
  const user = await requireApiRole(request, SIGNED_IN);
  const input = await readJson(request, createBookingInput);
  const { booking, replayed } = await createHold(await bookingContext(), actorOf(user), input);
  return json({ data: toCustomerBooking(booking) }, { status: replayed ? 200 : 201 });
});
