"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { resolveSiteUrl } from "@/lib/siteUrl";
import { emailSchema, loginInput, nameSchema, newPasswordSchema, registerInput, resetPasswordInput } from "@/server/auth/schemas";
import {
  authContext,
  clearSessionCookie,
  currentUserDoc,
  mailer,
  readSessionCookie,
  safeNext,
  setSessionCookie,
} from "@/server/auth/session";
import {
  authenticate,
  changePassword,
  createSession,
  deleteSession,
  registerUser,
  requestPasswordReset,
  resetPassword,
  sendVerificationEmail,
  updateName,
} from "@/server/auth/store";
import { AppError } from "@/server/http/errors";
import { errorSummary, log } from "@/server/log";

/**
 * Authentication Server Actions (M5). Server Actions only accept POSTs from this origin (Next.js compares
 * Origin with Host), which together with the SameSite=Lax session cookie is the CSRF protection.
 * Results are plain objects: no stack traces, driver messages or account details ever reach the client,
 * and passwords are never logged.
 */

export type ActionResult =
  | { ok: true; redirectTo?: string }
  | { ok: false; error: string; code?: "rate_limited" | "email_unavailable" | "invalid"; retryAfterSeconds?: number; fieldErrors?: Record<string, string> };

const UNAVAILABLE = "Patron accounts are temporarily unavailable. Please try again shortly.";

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) out[String(issue.path[0] ?? "form")] ??= issue.message;
  return out;
}

function failure(err: unknown, action: string): ActionResult {
  if (err instanceof AppError) {
    if (err.code === "RATE_LIMITED")
      return { ok: false, code: "rate_limited", error: err.message, retryAfterSeconds: (err.details as { retryAfterSeconds?: number })?.retryAfterSeconds };
    if (err.expose) return { ok: false, error: err.message };
  }
  log("error", "auth action failed", { action, ...errorSummary(err) });
  return { ok: false, error: UNAVAILABLE };
}

export async function signInAction(input: { email: string; password: string; remember: boolean; next?: string }): Promise<ActionResult> {
  const parsed = loginInput.safeParse(input);
  if (!parsed.success) return { ok: false, code: "invalid", error: "The email or passcode is incorrect." };
  try {
    const ctx = await authContext();
    const user = await authenticate(ctx, parsed.data.email, parsed.data.password, await clientIp());
    const previous = await readSessionCookie();
    if (previous) await deleteSession(ctx, previous); // never carry a session id across a sign-in
    const { token, expiresAt } = await createSession(ctx, user._id, parsed.data.remember);
    await setSessionCookie(token, expiresAt, parsed.data.remember);
    return { ok: true, redirectTo: safeNext(input.next, user.role === "customer" ? "/account" : "/staff") };
  } catch (err) {
    return failure(err, "sign-in");
  }
}

export async function registerAction(input: { name: string; email: string; password: string }): Promise<ActionResult> {
  const parsed = registerInput.safeParse(input); // unknown fields such as `role` are stripped here
  if (!parsed.success) return { ok: false, code: "invalid", error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  try {
    const ctx = await authContext();
    const user = await registerUser(ctx, parsed.data, await clientIp());
    const { token, expiresAt } = await createSession(ctx, user._id, true);
    await setSessionCookie(token, expiresAt, true);
    const mail = mailer();
    if (mail) {
      const site = resolveSiteUrl();
      await sendVerificationEmail(ctx, user, mail, (t) => `${site}/api/v1/auth/verify-email?token=${encodeURIComponent(t)}`).catch((err) =>
        log("warn", "verification email not sent", errorSummary(err)),
      );
    }
    return { ok: true, redirectTo: "/account" };
  } catch (err) {
    return failure(err, "register");
  }
}

export async function signOutAction(): Promise<void> {
  const token = await readSessionCookie();
  if (token) {
    try {
      await deleteSession(await authContext(), token);
    } catch (err) {
      log("error", "sign-out could not delete the session", errorSummary(err));
    }
  }
  await clearSessionCookie();
  redirect("/");
}

export async function requestPasswordResetAction(input: { email: string }): Promise<ActionResult> {
  const parsed = emailSchema.safeParse(input.email);
  if (!parsed.success) return { ok: false, code: "invalid", error: "Enter the email address linked to your patron account." };
  const mail = mailer();
  if (!mail)
    return {
      ok: false,
      code: "email_unavailable",
      error: "Email delivery is not set up yet, so no reset link can be sent. Contact the concierge to restore access.",
    };
  try {
    const site = resolveSiteUrl();
    await requestPasswordReset(await authContext(), parsed.data, await clientIp(), mail, (t) => `${site}/reset-passcode?token=${encodeURIComponent(t)}`);
    return { ok: true };
  } catch (err) {
    return failure(err, "password-reset-request");
  }
}

export async function resetPasswordAction(input: { token: string; password: string }): Promise<ActionResult> {
  const parsed = resetPasswordInput.safeParse(input);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    return errors.token ? { ok: false, code: "invalid", error: "This link is invalid or has expired." } : { ok: false, code: "invalid", error: errors.password ?? "Check your new passcode." };
  }
  try {
    const done = await resetPassword(await authContext(), parsed.data.token, parsed.data.password);
    if (!done) return { ok: false, code: "invalid", error: "This link is invalid or has expired." };
    await clearSessionCookie(); // every session was revoked; sign in again with the new passcode
    return { ok: true, redirectTo: "/sign-in" };
  } catch (err) {
    return failure(err, "password-reset");
  }
}

export async function updateNameAction(input: { name: string }): Promise<ActionResult> {
  const parsed = nameSchema.safeParse(input.name);
  if (!parsed.success) return { ok: false, code: "invalid", error: parsed.error.issues[0].message, fieldErrors: { name: parsed.error.issues[0].message } };
  try {
    const user = await currentUserDoc();
    if (!user) return { ok: false, error: "Your session has ended. Sign in again." };
    await updateName(await authContext(), user._id, parsed.data);
    return { ok: true };
  } catch (err) {
    return failure(err, "update-name");
  }
}

export async function changePasswordAction(input: { current: string; next: string }): Promise<ActionResult> {
  const parsed = newPasswordSchema.safeParse(input.next);
  if (!parsed.success) return { ok: false, code: "invalid", error: parsed.error.issues[0].message, fieldErrors: { next: parsed.error.issues[0].message } };
  if (!input.current || input.current.length > 128) return { ok: false, code: "invalid", error: "Enter your current passcode.", fieldErrors: { current: "Enter your current passcode." } };
  try {
    const user = await currentUserDoc();
    const token = await readSessionCookie();
    if (!user || !token) return { ok: false, error: "Your session has ended. Sign in again." };
    await changePassword(await authContext(), user._id, input.current, parsed.data, token);
    return { ok: true };
  } catch (err) {
    return failure(err, "change-password");
  }
}
