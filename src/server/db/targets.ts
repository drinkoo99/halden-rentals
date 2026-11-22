/**
 * Guards that decide which database a script or test may touch. Pure: every input is passed in
 * (no environment or database access), so the rules are unit-tested exhaustively.
 *
 * Pure module (no Next.js / server-only imports) so scripts and tests can import it.
 */

/** Dedicated integration-test databases: "halden_test" or "halden_test_<suffix>". */
export const TEST_DB_PATTERN = /^halden_test(?:_[a-z0-9]+)?$/;
export const DEFAULT_TEST_DB = "halden_test";

export class TargetGuardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TargetGuardError";
  }
}

/** Heuristic only: a database name containing "prod", or a Vercel production deployment. */
export function looksLikeProduction(dbName: string, vercelEnv?: string): boolean {
  return vercelEnv === "production" || /prod/i.test(dbName);
}

export const isTestDatabase = (dbName: string) => TEST_DB_PATTERN.test(dbName);

// ---- Command-line flags ------------------------------------------------------------------------

export type TargetArgs = { apply: boolean; allowProduction: boolean; confirmDb?: string; /** values of the command's own --name=value options (only commands that declare some) */ options?: Record<string, string> };

/**
 * Parse the flags shared by db:setup and db:seed. Unknown arguments are rejected, so a typo such as
 * "--aply" or "--confirm-db halden" (space instead of "=") fails instead of silently doing something else.
 */
export function parseTargetArgs(argv: string[], optionNames: readonly string[] = []): TargetArgs {
  const args: TargetArgs = { apply: false, allowProduction: false };
  for (const arg of argv) {
    if (arg === "--apply") args.apply = true;
    else if (arg === "--allow-production") args.allowProduction = true;
    else if (arg.startsWith("--confirm-db=")) {
      const value = arg.slice("--confirm-db=".length);
      if (!value) throw new TargetGuardError("--confirm-db needs a database name, e.g. --confirm-db=halden");
      args.confirmDb = value;
    } else {
      const name = optionNames.find((n) => arg.startsWith(`--${n}=`));
      if (!name) throw new TargetGuardError(`Unknown argument "${arg}". Allowed: --apply, --confirm-db=<database>, --allow-production${optionNames.map((n) => `, --${n}=<value>`).join("")}`);
      (args.options ??= {})[name] = arg.slice(name.length + 3);
    }
  }
  if (args.confirmDb !== undefined && !args.apply) throw new TargetGuardError("--confirm-db is only used together with --apply");
  return args;
}

// ---- Script targets (db:setup, db:seed) --------------------------------------------------------

/**
 * Rules for a command-line run against `dbName`:
 * - a dry run (no --apply) is read-only and allowed against any non-test database;
 * - --apply requires --confirm-db to equal the target exactly (guards against the wrong env file);
 * - a production-looking target additionally requires --allow-production;
 * - halden_test* databases are reserved for the integration tests and refused here.
 */
export function assertScriptTarget(dbName: string, args: TargetArgs, vercelEnv?: string): void {
  if (isTestDatabase(dbName)) throw new TargetGuardError(`"${dbName}" is reserved for integration tests; the command line does not run against it.`);
  if (!args.apply) return;
  if (args.confirmDb !== dbName)
    throw new TargetGuardError(
      args.confirmDb === undefined
        ? `--apply requires --confirm-db=${dbName} to confirm the target database.`
        : `--confirm-db="${args.confirmDb}" does not match the configured database "${dbName}". Nothing was changed.`,
    );
  if (looksLikeProduction(dbName, vercelEnv) && !args.allowProduction)
    throw new TargetGuardError(`"${dbName}" looks like production; add --allow-production if that is really intended.`);
}

// ---- Integration-test database -----------------------------------------------------------------

/**
 * The only database integration tests may use. Fails loudly (D-P2-6) unless:
 * - a connection string is configured;
 * - the name follows the halden_test naming convention (so "halden" and any other database are refused);
 * - it differs from the application database (MONGODB_DB);
 * - neither the name nor the deployment looks like production.
 */
export function resolveTestDatabase(env: { MONGODB_URI?: string; MONGODB_DB?: string; MONGODB_TEST_DB?: string; VERCEL_ENV?: string }): string {
  if (!env.MONGODB_URI?.trim()) throw new TargetGuardError("Integration tests need MONGODB_URI (see .env.example). Refusing to run without a configured test database.");
  const name = env.MONGODB_TEST_DB?.trim() || DEFAULT_TEST_DB;
  if (name === "halden") throw new TargetGuardError('Integration tests must never use the "halden" application database.');
  if (!isTestDatabase(name)) throw new TargetGuardError(`Test database "${name}" is outside the permitted naming (halden_test or halden_test_<suffix>).`);
  const appDb = env.MONGODB_DB?.trim() || "halden_dev";
  if (name === appDb) throw new TargetGuardError(`Test database "${name}" must differ from the application database (MONGODB_DB).`);
  if (looksLikeProduction(name, env.VERCEL_ENV)) throw new TargetGuardError("Integration tests never run against production.");
  return name;
}
