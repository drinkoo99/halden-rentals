import type { UnitDoc } from "../fleet/store";
import type { PriceSnapshot } from "./pricing";
import type { BookingStatus } from "./statuses";
import type { BookingDoc } from "./store";

/**
 * What the API returns for a booking (M7). Customers get their trip, price snapshot, driver details and
 * status — never the internal car assignment, staff notes, history actors or idempotency key. Staff get the
 * operational view including the assigned car and the audit trail.
 */
export type CustomerBooking = {
  reference: string;
  status: BookingStatus;
  model: string;
  vehicleName: string;
  pickup: string;
  return: string;
  pickupAt: string;
  returnAt: string;
  holdExpiresAt: string | null;
  price: PriceSnapshot;
  driver: { firstName: string; lastName: string; email: string; phone: string };
  confirmedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  checkedOutAt?: string;
  returnedAt?: string;
  createdAt: string;
};

const iso = (d?: Date | null) => (d ? d.toISOString() : undefined);

export function toCustomerBooking(b: BookingDoc): CustomerBooking {
  return {
    reference: b.reference,
    status: b.status,
    model: b.modelSlug,
    vehicleName: b.vehicle.name,
    pickup: b.pickupLocationCode,
    return: b.returnLocationCode,
    pickupAt: b.pickupAt.toISOString(),
    returnAt: b.returnAt.toISOString(),
    holdExpiresAt: b.holdExpiresAt ? b.holdExpiresAt.toISOString() : null,
    price: b.price,
    driver: { firstName: b.driver.firstName, lastName: b.driver.lastName, email: b.driver.email, phone: b.driver.phone },
    ...(b.confirmedAt ? { confirmedAt: iso(b.confirmedAt) } : {}),
    ...(b.cancelledAt ? { cancelledAt: iso(b.cancelledAt) } : {}),
    ...(b.cancellation?.reason ? { cancellationReason: b.cancellation.reason } : {}),
    ...(b.checkedOutAt ? { checkedOutAt: iso(b.checkedOutAt) } : {}),
    ...(b.returnedAt ? { returnedAt: iso(b.returnedAt) } : {}),
    createdAt: b.createdAt.toISOString(),
  };
}

export type StaffBooking = CustomerBooking & {
  customerId: string;
  driver: BookingDoc["driver"];
  unit: { id: string; unitCode: string; registration: string; status: string; locationCode: string } | null;
  mileageOutKm?: number;
  mileageInKm?: number;
  cancelledBy?: string;
  staffNotes: { at: string; by: string; note: string }[];
  history: { at: string; action: string; byRole: string; note?: string }[];
};

export function toStaffBooking(b: BookingDoc, unit?: UnitDoc | null): StaffBooking {
  return {
    ...toCustomerBooking(b),
    customerId: b.customerId.toHexString(),
    driver: b.driver,
    unit: unit ? { id: unit._id.toHexString(), unitCode: unit.unitCode, registration: unit.registration, status: unit.status, locationCode: unit.locationCode } : null,
    ...(b.mileageOutKm !== undefined ? { mileageOutKm: b.mileageOutKm } : {}),
    ...(b.mileageInKm !== undefined ? { mileageInKm: b.mileageInKm } : {}),
    ...(b.cancellation ? { cancelledBy: b.cancellation.byRole } : {}),
    staffNotes: (b.staffNotes ?? []).map((n) => ({ at: n.at.toISOString(), by: n.by.toHexString(), note: n.note })),
    history: b.history.map((h) => ({ at: h.at.toISOString(), action: h.action, byRole: h.byRole, ...(h.note ? { note: h.note } : {}) })),
  };
}
