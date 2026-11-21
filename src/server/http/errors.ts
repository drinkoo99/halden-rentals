import { ZodError } from "zod";
import { EnvValidationError } from "../config/env";

/**
 * API error codes and their HTTP status. Services throw `AppError` with one of these codes; the
 * route wrapper turns it into the standard error body:
 *   { "error": { "code", "message", "details"?, "requestId" } }
 */
export const ERROR_STATUS = {
  BAD_REQUEST: 400,
  VALIDATION_FAILED: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  POLICY_VIOLATION: 422,
  RATE_LIMITED: 429,
  INTERNAL: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type ErrorCode = keyof typeof ERROR_STATUS;

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly details?: unknown;
  /** Whether `message` is safe to show to the client. Messages of 5xx errors never are. */
  readonly expose: boolean;

  constructor(code: ErrorCode, message: string, options: { details?: unknown; cause?: unknown; expose?: boolean } = {}) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = code;
    this.details = options.details;
    this.expose = options.expose ?? ERROR_STATUS[code] < 500;
  }

  get status(): number {
    return ERROR_STATUS[this.code];
  }
}

export type ErrorBody = {
  error: { code: ErrorCode; message: string; details?: unknown; requestId: string };
};

const GENERIC_MESSAGE: Partial<Record<ErrorCode, string>> = {
  INTERNAL: "Something went wrong on our side.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable.",
};

/** Map any thrown value to an HTTP status and a client-safe body. Unknown errors become a generic 500. */
export function toErrorResponse(err: unknown, requestId: string): { status: number; body: ErrorBody } {
  let appError: AppError;
  if (err instanceof AppError) appError = err;
  else if (err instanceof ZodError)
    appError = new AppError("VALIDATION_FAILED", "The request is invalid.", {
      details: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  else if (err instanceof EnvValidationError) appError = new AppError("SERVICE_UNAVAILABLE", "Server misconfigured", { cause: err });
  else appError = new AppError("INTERNAL", "Unhandled error", { cause: err });

  const message = appError.expose ? appError.message : (GENERIC_MESSAGE[appError.code] ?? "Request failed.");
  const body: ErrorBody = { error: { code: appError.code, message, requestId } };
  if (appError.expose && appError.details !== undefined) body.error.details = appError.details;
  return { status: appError.status, body };
}
