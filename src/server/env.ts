import "server-only";
import { parseServerEnv, type ServerEnv } from "./config/env";

let cached: ServerEnv | undefined;

/**
 * The validated server environment, parsed once per process. Throws `EnvValidationError`
 * (names and problems only, no values) if a variable is malformed.
 */
export function serverEnv(): ServerEnv {
  cached ??= parseServerEnv(process.env);
  return cached;
}
