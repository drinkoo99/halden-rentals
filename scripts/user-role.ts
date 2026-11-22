/**
 * Grant or change an account's role from the command line — the safe way to create the FIRST admin
 * (there is deliberately no web endpoint for that) and an operator fallback afterwards.
 *
 *   npm run user:role -- --email=<address> --role=<customer|staff|admin>                  dry run: shows the change
 *   npm run user:role -- --email=… --role=… --reason=… --apply --confirm-db=<database>    apply (exact database)
 *   ... --allow-production                                                               also needed for production targets
 *
 * Same target guards as db:setup (checked before connecting; halden_test* refused). The change goes through
 * the same service as the admin UI: it is audited (actor "operator (db CLI)"), the account must be active,
 * and the last active admin cannot be demoted. The account must already exist (register it first).
 */
import { MongoClient, ObjectId } from "mongodb";
import { AUTH_COLLECTIONS } from "../src/server/auth/collections";
import { emailSchema, ROLES, type Role } from "../src/server/auth/schemas";
import type { UserDoc } from "../src/server/auth/store";
import { describeMongoTarget, parseServerEnv } from "../src/server/config/env";
import { assertScriptTarget, looksLikeProduction, parseTargetArgs } from "../src/server/db/targets";
import { setRole } from "../src/server/staff/people";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const OPERATOR = { id: new ObjectId("000000000000000000000000"), role: "admin" as const, name: "operator (db CLI)" };

async function main() {
  let args;
  let env;
  try {
    args = parseTargetArgs(process.argv.slice(2), ["email", "role", "reason"]);
    env = parseServerEnv(process.env);
  } catch (e) {
    fail((e as Error).message);
  }
  const email = emailSchema.safeParse(args.options?.email ?? "");
  if (!email.success) fail("--email=<address> is required.");
  const role = args.options?.role as Role;
  if (!ROLES.includes(role)) fail(`--role must be one of: ${ROLES.join(", ")}.`);
  if (!env.MONGODB_URI) fail("MONGODB_URI is not set (see .env.example). Nothing to do.");

  const dbName = env.MONGODB_DB;
  console.log(`Target: ${describeMongoTarget(env.MONGODB_URI)} / database "${dbName}"${looksLikeProduction(dbName, process.env.VERCEL_ENV) ? "  [PRODUCTION]" : ""}`);
  console.log(`Mode:   ${args.apply ? "APPLY" : "dry run (read-only; add --apply --confirm-db=<database> to change)"}`);
  try {
    assertScriptTarget(dbName, args, process.env.VERCEL_ENV);
  } catch (e) {
    fail((e as Error).message);
  }

  const client = new MongoClient(env.MONGODB_URI, { appName: "halden-user-role", serverSelectionTimeoutMS: 20_000 });
  try {
    await client.connect();
    const db = client.db(dbName);
    const user = await db.collection<UserDoc>(AUTH_COLLECTIONS.users).findOne({ email: email.data }, { projection: { passwordHash: 0 } });
    if (!user) return fail("No account with this email address. It must register first.");
    console.log(`Account: ${user.email} — role ${user.role}, ${user.status}`);
    if (user.role === role) return console.log(`Already ${role}. Nothing to do.`);
    if (!args.apply) return console.log(`Would change the role to ${role}. Nothing was changed (dry run).`);
    const updated = await setRole({ db, startSession: () => client.startSession() }, OPERATOR, user._id, role, args.options?.reason ?? "set from the command line");
    console.log(`Done: ${updated.email} is now ${updated.role} (audited). It applies on the account's next request.`);
  } catch (err) {
    const e = err as { name?: string; codeName?: string; message?: string; code?: string };
    console.error(e.name === "AppError" ? `Refused: ${e.message}` : `Failed: ${e.name ?? "Error"}${e.codeName ? ` (${e.codeName})` : ""}`);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

void main();
