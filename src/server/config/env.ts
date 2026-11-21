import { z } from "zod";

/**
 * Server environment schema. Pure (no Next.js imports) so the scripts (`scripts/db-setup.ts`) can reuse it.
 * Values are never echoed in errors — only the variable names and what is wrong with them.
 *
 * M1: the database is optional so the frontend keeps working without one; the health endpoint
 * reports `not_configured`. It becomes required once pages read from the database (M2).
 */

/** Unset and empty-string variables are both treated as "not provided". */
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), schema.optional());

export const serverEnvSchema = z.object({
  MONGODB_URI: optional(
    z
      .string()
      .trim()
      .regex(/^mongodb(\+srv)?:\/\/\S+$/, "must be a MongoDB connection string (mongodb:// or mongodb+srv://)"),
  ),
  MONGODB_DB: optional(
    z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9_-]{1,38}$/, "must be 1–38 letters, digits, '_' or '-'"),
  ).transform((v) => v ?? "halden_dev"),
  LOG_LEVEL: optional(z.enum(["debug", "info", "warn", "error"])).transform((v) => v ?? "info"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Raised when the environment is invalid. The message lists variable names and problems, never values. */
export class EnvValidationError extends Error {
  readonly issues: { variable: string; problem: string }[];
  constructor(issues: { variable: string; problem: string }[]) {
    super(`Invalid server environment: ${issues.map((i) => `${i.variable} ${i.problem}`).join("; ")}`);
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const result = serverEnvSchema.safeParse(source);
  if (result.success) return result.data;
  throw new EnvValidationError(
    result.error.issues.map((i) => ({ variable: String(i.path[0] ?? "environment"), problem: i.message })),
  );
}

/**
 * "mongodb+srv://user:pass@cluster0.x.mongodb.net/db?…" → "mongodb+srv://cluster0.x.mongodb.net" (for logs and CLI output).
 *
 * Never returns any part of the credentials, even for malformed URIs: the userinfo always ends at
 * the LAST "@", so only text after it is considered (a password with an unencoded "/", "?" or "@"
 * cannot leak). The result must also look like a plain host list, otherwise a placeholder is returned.
 */
export function describeMongoTarget(uri: string): string {
  const scheme = uri.match(/^mongodb(?:\+srv)?:\/\//)?.[0];
  if (!scheme) return "mongodb://(unparseable)";
  const rest = uri.slice(scheme.length);
  const afterCredentials = rest.slice(rest.lastIndexOf("@") + 1);
  const hosts = afterCredentials.split(/[/?#]/, 1)[0];
  return /^[A-Za-z0-9._~%:,[\]-]+$/.test(hosts) ? `${scheme}${hosts}` : `${scheme}(unparseable host)`;
}
