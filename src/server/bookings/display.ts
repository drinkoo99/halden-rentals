import "server-only";
import { hubDateTime, type BookingRow } from "@/lib/bookingDisplay";
import { getPublicLocations, getSiteCatalogue } from "../catalogue/service";
import type { BookingDoc } from "./store";

/** Bookings as display rows: hub names and hub-local times resolved on the server (account and staff pages). */
export async function bookingRows(docs: BookingDoc[]): Promise<BookingRow[]> {
  if (!docs.length) return [];
  const [hubs, site] = await Promise.all([getPublicLocations(), getSiteCatalogue()]);
  const hub = (code: string) => hubs.find((h) => h.code === code);
  return docs.map((b) => {
    const p = hub(b.pickupLocationCode);
    const r = hub(b.returnLocationCode);
    return {
      reference: b.reference,
      status: b.status,
      vehicleName: b.vehicle.name,
      image: site.vehicles.find((v) => v.slug === b.modelSlug)?.image,
      pickupHub: p?.name ?? b.pickupLocationCode.toUpperCase(),
      returnHub: r?.name ?? b.returnLocationCode.toUpperCase(),
      pickupLocal: hubDateTime(b.pickupAt.toISOString(), p?.timezone ?? "UTC"),
      returnLocal: hubDateTime(b.returnAt.toISOString(), r?.timezone ?? "UTC"),
      totalCents: b.price.totalCents,
      days: b.price.days,
    };
  });
}

export const isUpcoming = (b: BookingDoc) => b.status === "held" || b.status === "confirmed" || b.status === "checked_out";
