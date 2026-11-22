import { readJson, requireApiRole } from "@/server/auth/api";
import { actorOf, bookingContext } from "@/server/bookings/context";
import { cancelInput, referenceSchema } from "@/server/bookings/schemas";
import { cancelBooking } from "@/server/bookings/store";
import { toCustomerBooking } from "@/server/bookings/views";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";

/** POST /api/v1/bookings/:reference/cancel { reason? } — cancel your own booking until pick-up. */
export const POST = route<{ reference: string }>("bookings-cancel", async (request, { params }) => {
  const user = await requireApiRole(request, ["customer", "staff", "admin"]);
  const ref = referenceSchema.safeParse(params.reference);
  if (!ref.success) throw new AppError("NOT_FOUND", "No such booking.");
  const { reason } = await readJson(request, cancelInput);
  // own bookings only, under the customer rules (staff cancel others via the staff API)
  const { booking, email } = await cancelBooking(await bookingContext(), ref.data, { ...actorOf(user), role: "customer" }, reason);
  return json({ data: toCustomerBooking(booking), meta: { email } });
});
