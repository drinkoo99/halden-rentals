import { errorSummary, log } from "../log";
import { AppError } from "../http/errors";
import type { Mailer } from "./store";

/**
 * Transactional email through Resend's HTTP API (no SDK). Configured only when BOTH `RESEND_API_KEY` and
 * `EMAIL_FROM` are set; otherwise `null`, and the password-reset / verification flows say that email is
 * not available instead of pretending to send anything.
 */
export function createMailer(env: { RESEND_API_KEY?: string; EMAIL_FROM?: string }, fetchImpl: typeof fetch = fetch): Mailer | null {
  const { RESEND_API_KEY: key, EMAIL_FROM: from } = env;
  if (!key || !from) return null;
  return {
    async send({ to, subject, text }) {
      let res: Response;
      try {
        res = await fetchImpl("https://api.resend.com/emails", {
          method: "POST",
          headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
          body: JSON.stringify({ from, to: [to], subject, text }),
          signal: AbortSignal.timeout(10_000),
        });
      } catch (err) {
        log("error", "email send failed", errorSummary(err));
        throw new AppError("SERVICE_UNAVAILABLE", "Email delivery failed", { cause: err });
      }
      if (!res.ok) {
        log("error", "email send rejected", { status: res.status }); // never the key, recipient or body
        throw new AppError("SERVICE_UNAVAILABLE", "Email delivery failed");
      }
    },
  };
}
