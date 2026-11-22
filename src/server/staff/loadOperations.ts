import "server-only";
import { bookingContext } from "../bookings/context";
import { bookingsOf, expireHolds } from "../bookings/store";
import { getPublicLocations, getSiteCatalogue } from "../catalogue/service";
import { unitsOf } from "../fleet/store";
import { operationsSnapshot, type OperationsSnapshot, type OpsBooking, type OpsHub, type OpsUnit } from "./operations";

const DAY = 86_400_000;

/**
 * Load what the dashboard and curbside console need in three queries: the bookings around today (two
 * days back to three days ahead, plus every car still out and recent creations), all fleet units, hubs.
 */
export async function loadOperations(hub?: string): Promise<{ snapshot: OperationsSnapshot; hubs: OpsHub[]; now: Date; modelNames: Record<string, string> }> {
  const ctx = await bookingContext();
  const now = new Date();
  await expireHolds(ctx);
  const from = new Date(now.getTime() - 2 * DAY);
  const to = new Date(now.getTime() + 3 * DAY);
  const [docs, unitDocs, publicHubs, site] = await Promise.all([
    bookingsOf(ctx)
      .find({ $or: [{ pickupAt: { $gte: from, $lt: to } }, { returnAt: { $gte: from, $lt: to } }, { status: "checked_out" }, { createdAt: { $gte: from } }] })
      .limit(2000)
      .toArray(),
    unitsOf(ctx).find({}).limit(5000).toArray(),
    getPublicLocations(),
    getSiteCatalogue(),
  ]);
  const hubs: OpsHub[] = publicHubs.map((h) => ({ code: h.code, name: h.name, timezone: h.timezone }));
  const bookings: OpsBooking[] = docs.map((d) => ({
    reference: d.reference,
    status: d.status,
    customer: `${d.driver.firstName} ${d.driver.lastName}`,
    vehicleName: d.vehicle.name,
    unitId: d.unitId ? d.unitId.toHexString() : null,
    pickup: d.pickupLocationCode,
    return: d.returnLocationCode,
    pickupAt: d.pickupAt,
    returnAt: d.returnAt,
    createdAt: d.createdAt,
    holdExpiresAt: d.holdExpiresAt,
  }));
  const units: OpsUnit[] = unitDocs.map((u) => ({ id: u._id.toHexString(), unitCode: u.unitCode, registration: u.registration, modelSlug: u.modelSlug, locationCode: u.locationCode, status: u.status }));
  return { snapshot: operationsSnapshot(bookings, units, hubs, now, hub), hubs, now, modelNames: Object.fromEntries(site.vehicles.map((v) => [v.slug, v.name])) };
}
