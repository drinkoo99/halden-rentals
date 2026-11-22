import type { Document } from "mongodb";
import type { CollectionSpec } from "../db/collections";
import { BOOKING_STATUSES } from "./statuses";

/**
 * Booking collections (M7), applied by `db:setup`:
 * - bookings: one document per reservation, with its immutable price snapshot, driver snapshot and an
 *   append-only history. Indexes: unique reference; a customer's bookings; the overlap lookup per car;
 *   status/pick-up for staff lists and hold expiry; unique (customer, idempotency key) when a key is set.
 * - bookingLocks: one tiny document per fleet unit, written inside every booking transaction that touches
 *   the unit. Two transactions reserving the same car therefore write the same document and MongoDB lets
 *   only one commit; the other retries, re-reads the bookings and sees the car is taken.
 */
export const BOOKING_COLLECTIONS = { bookings: "bookings", bookingLocks: "bookingLocks" } as const;
export type BookingCollectionNames = Record<keyof typeof BOOKING_COLLECTIONS, string>;

const str = (extra: Document = {}): Document => ({ bsonType: "string", minLength: 1, ...extra });
const int = (extra: Document = {}): Document => ({ bsonType: ["int", "long"], ...extra });
const date = (): Document => ({ bsonType: "date" });
const nullableDate = (): Document => ({ bsonType: ["date", "null"] });
const obj = (required: string[], properties: Document = {}): Document => ({ bsonType: "object", required, properties });

export const BOOKING_COLLECTION_SPECS: CollectionSpec[] = [
  {
    name: BOOKING_COLLECTIONS.bookings,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        additionalProperties: false,
        required: ["_id", "reference", "customerId", "status", "modelSlug", "unitId", "pickupLocationCode", "returnLocationCode", "pickupAt", "returnAt", "price", "driver", "vehicle", "holdExpiresAt", "history", "createdAt", "updatedAt"],
        properties: {
          _id: { bsonType: "objectId" },
          reference: str({ pattern: "^HLD-[0-9]{4}-[A-Z0-9]{4}$" }),
          customerId: { bsonType: "objectId" },
          status: { enum: [...BOOKING_STATUSES] },
          modelSlug: str({ maxLength: 80 }),
          unitId: { bsonType: ["objectId", "null"] },
          pickupLocationCode: str({ pattern: "^[a-z]{3}$" }),
          returnLocationCode: str({ pattern: "^[a-z]{3}$" }),
          pickupAt: date(),
          returnAt: date(),
          price: obj(["currency", "dailyRateCents", "days", "rentalCents", "extras", "fees", "subtotalCents", "vatRate", "vatCents", "totalCents"], {
            currency: str({ maxLength: 3 }),
            dailyRateCents: int({ minimum: 0 }),
            days: int({ minimum: 1 }),
            rentalCents: int({ minimum: 0 }),
            extras: { bsonType: "array" },
            fees: { bsonType: "array" },
            subtotalCents: int({ minimum: 0 }),
            vatRate: { bsonType: ["double", "int", "decimal"] },
            vatCents: int({ minimum: 0 }),
            totalCents: int({ minimum: 0 }),
          }),
          driver: obj(["firstName", "lastName", "email", "phone", "dob", "licenceCountry", "licenceNumber"]),
          vehicle: obj(["name"], { name: str() }),
          idempotencyKey: str({ maxLength: 64 }),
          holdExpiresAt: nullableDate(),
          confirmedAt: date(),
          cancelledAt: date(),
          cancellation: obj(["byRole"]),
          expiredAt: date(),
          checkedOutAt: date(),
          returnedAt: date(),
          mileageOutKm: int({ minimum: 0 }),
          mileageInKm: int({ minimum: 0 }),
          staffNotes: { bsonType: "array" },
          history: { bsonType: "array", minItems: 1 },
          createdAt: date(),
          updatedAt: date(),
        },
      },
    },
    indexes: [
      { name: "bookings_reference_unique", key: { reference: 1 }, unique: true },
      { name: "bookings_customer_created", key: { customerId: 1, createdAt: -1 } },
      { name: "bookings_unit_status_return", key: { unitId: 1, status: 1, returnAt: 1 } },
      { name: "bookings_status_pickup", key: { status: 1, pickupAt: 1 } },
      { name: "bookings_idempotency_unique", key: { customerId: 1, idempotencyKey: 1 }, unique: true, partialFilterExpression: { idempotencyKey: { $type: "string" } } },
    ],
  },
  {
    name: BOOKING_COLLECTIONS.bookingLocks,
    validator: { $jsonSchema: { bsonType: "object", required: ["_id", "seq", "at"], additionalProperties: false, properties: { _id: { bsonType: "objectId" }, seq: int({ minimum: 1 }), at: date() } } },
    indexes: [],
  },
];
