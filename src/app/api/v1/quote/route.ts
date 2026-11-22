import { readJson } from "@/server/auth/api";
import { bookingContext, limitByIp } from "@/server/bookings/context";
import { tripInput } from "@/server/bookings/schemas";
import { quoteTrip } from "@/server/bookings/store";
import { json, route } from "@/server/http/handler";

/**
 * POST /api/v1/quote — the authoritative price and availability for a trip (public, rate-limited per IP).
 * Body: { model, pickup, return?, from, to, extras } with hub-local times. Nothing is reserved.
 */
export const POST = route("quote", async (request) => {
  const input = await readJson(request, tripInput);
  const ctx = await bookingContext();
  await limitByIp(ctx, request, "quote");
  const q = await quoteTrip(ctx, input);
  return json({ data: { available: q.available, pickupAt: q.start.toISOString(), returnAt: q.end.toISOString(), price: q.price } });
});
