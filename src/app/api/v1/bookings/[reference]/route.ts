import { requireApiRole } from "@/server/auth/api";
import { actorOf, bookingContext } from "@/server/bookings/context";
import { referenceSchema } from "@/server/bookings/schemas";
import { customerBooking } from "@/server/bookings/store";
import { toCustomerBooking } from "@/server/bookings/views";
import { AppError } from "@/server/http/errors";
import { json, route } from "@/server/http/handler";

/** GET /api/v1/bookings/:reference — one of the signed-in user's own bookings (404 for anyone else's). */
export const GET = route<{ reference: string }>("bookings-get", async (request, { params }) => {
  const user = await requireApiRole(request, ["customer", "staff", "admin"]);
  const ref = referenceSchema.safeParse(params.reference);
  if (!ref.success) throw new AppError("NOT_FOUND", "No such booking.");
  return json({ data: toCustomerBooking(await customerBooking(await bookingContext(), ref.data, actorOf(user).id)) });
});
