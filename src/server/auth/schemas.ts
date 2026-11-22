import { z } from "zod";

/**
 * Authentication inputs and the user model (M5). Pure: shared by server actions, the store and tests.
 * Input schemas are plain objects, so unknown fields (e.g. a smuggled `role`) are stripped.
 */

export const ROLES = ["customer", "staff", "admin"] as const;
export type Role = (typeof ROLES)[number];
export const USER_STATUSES = ["active", "disabled"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

/** Trimmed and lower-cased: one account per address regardless of how it is typed. */
export const emailSchema = z
  .string()
  .trim()
  .max(254, "Email address is too long.")
  .pipe(z.email("Enter a valid email address."))
  .transform((e) => e.toLowerCase());

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter your full name.")
  .max(80, "Use at most 80 characters.")
  .refine((n) => !/[\u0000-\u001f<>]/.test(n), "The name contains characters that are not allowed.");

/** Same rules the Stitch request-access screens show: 12+ characters, a letter, a number or symbol. */
export const newPasswordSchema = z
  .string()
  .min(12, "Use at least 12 characters.")
  .max(128, "Use at most 128 characters.")
  .regex(/[A-Za-z]/, "Include at least one letter.")
  .regex(/[\d\W_]/, "Include at least one number or symbol.");

export const registerInput = z.object({ name: nameSchema, email: emailSchema, password: newPasswordSchema });
export type RegisterInput = z.infer<typeof registerInput>;

/** Login does not re-apply the password policy (older passwords stay valid); it only bounds the input. */
export const loginInput = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your passcode.").max(128, "Enter your passcode."),
  remember: z.boolean().default(true),
});
export type LoginInput = z.infer<typeof loginInput>;

export const resetPasswordInput = z.object({ token: z.string().min(20).max(100), password: newPasswordSchema });

/** The user as the client may see it — never the password hash, status internals or timestamps. */
export type PublicUser = { id: string; name: string; email: string; role: Role; emailVerified: boolean };
