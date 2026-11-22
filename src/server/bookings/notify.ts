import type { Mailer } from "../auth/store";
import { errorSummary, log } from "../log";
import type { PriceSnapshot } from "./pricing";

/**
 * Booking emails (M7). Sent through the M5 mailer (Resend) when it is configured; otherwise nothing is
 * sent and the outcome says so. Email never decides whether a booking succeeds.
 */
export type EmailOutcome = "sent" | "not_configured" | "failed" | "skipped";
export type BookingEmail = "confirmed" | "cancelled";

type Summary = { reference: string; vehicleName: string; driverFirstName: string; email: string; pickup: string; returnTo: string; pickupLocal: string; returnLocal: string; price: PriceSnapshot };

const eur = (cents: number) => `€${(cents / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function bookingEmailText(kind: BookingEmail, b: Summary): { subject: string; text: string } {
  const trip = `${b.vehicleName}\nPick-up: ${b.pickup}, ${b.pickupLocal.replace("T", " ")} (local time)\nReturn: ${b.returnTo}, ${b.returnLocal.replace("T", " ")} (local time)`;
  if (kind === "confirmed")
    return {
      subject: `Your HALDEN reservation ${b.reference} is confirmed`,
      text: `Dear ${b.driverFirstName},\n\nyour reservation ${b.reference} is confirmed.\n\n${trip}\nTotal ${eur(b.price.totalCents)} incl. VAT — payable at handover; nothing has been charged.\n\nYou can view or cancel it in your HALDEN account.`,
    };
  return {
    subject: `Your HALDEN reservation ${b.reference} was cancelled`,
    text: `Dear ${b.driverFirstName},\n\nyour reservation ${b.reference} has been cancelled.\n\n${trip}\n\nNo payment was taken for this reservation.`,
  };
}

export async function sendBookingEmail(mailer: Mailer | null | undefined, kind: BookingEmail, b: Summary): Promise<EmailOutcome> {
  if (!mailer) return "not_configured";
  try {
    await mailer.send({ to: b.email, ...bookingEmailText(kind, b) });
    return "sent";
  } catch (err) {
    log("warn", "booking email not sent", { kind, reference: b.reference, ...errorSummary(err) });
    return "failed";
  }
}
