import { requireApiRole } from "@/server/auth/api";
import { actorOf, bookingContext } from "@/server/bookings/context";
import { referenceSchema } from "@/server/bookings/schemas";
import { confirmBooking } from "@/server/bookings/store";
import { toCustomerBooking } from "@/server/bookings/views";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";

/** POST /api/v1/bookings/:reference/confirm — confirm your own held booking before the hold lapses. */
export const POST = route<{ reference: string }>("bookings-confirm", async (request, { params }) => {
  const user = await requireApiRole(request, ["customer", "staff", "admin"]);
  const ref = referenceSchema.safeParse(params.reference);
  if (!ref.success) throw new AppError("NOT_FOUND", "No such booking.");
  // "customer" here means: only the signed-in user's own booking (staff confirm others via the staff API)
  const { booking, email } = await confirmBooking(await bookingContext(), ref.data, { ...actorOf(user), role: "customer" });
  return json({ data: toCustomerBooking(booking), meta: { email } });
});
