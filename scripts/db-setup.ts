/**
 * Apply the registered collections, validators and indexes (src/server/db/collections.ts).
 *
 *   npm run db:setup                                   dry run: read-only, prints the planned changes
 *   npm run db:setup -- --apply --confirm-db=<db>      apply to MONGODB_DB (must match exactly)
 *   ... --allow-production                             also required when the target looks like production
 *
 * Every guard runs before connecting. A dry run only lists collections and indexes. With --apply,
 * nothing is changed if the plan has conflicts, and nothing is ever dropped. halden_test* databases
 * are reserved for the integration tests. Run with tsx (resolves the project's TypeScript imports);
 * .env.local is loaded by the npm script when present.
 */
import { MongoClient } from "mongodb";
import { describeMongoTarget, parseServerEnv } from "../src/server/config/env";
import { COLLECTIONS, ensureCollections } from "../src/server/db/collections";
import { assertScriptTarget, looksLikeProduction, parseTargetArgs } from "../src/server/db/targets";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

async function main() {
  let args;
  let env;
  try {
    args = parseTargetArgs(process.argv.slice(2));
    env = parseServerEnv(process.env);
  } catch (e) {
    fail((e as Error).message); // names and problems only — never values
  }
  if (!env.MONGODB_URI) fail("MONGODB_URI is not set (see .env.example). Nothing to do.");

  const db = env.MONGODB_DB;
  const prod = looksLikeProduction(db, process.env.VERCEL_ENV);
  console.log(`Target: ${describeMongoTarget(env.MONGODB_URI)} / database "${db}"${prod ? "  [PRODUCTION]" : ""}`);
  console.log(`Mode:   ${args.apply ? "APPLY" : "dry run (read-only; add --apply --confirm-db=<database> to make changes)"}`);
  try {
    assertScriptTarget(db, args, process.env.VERCEL_ENV);
  } catch (e) {
    fail((e as Error).message);
  }

  const client = new MongoClient(env.MONGODB_URI, { appName: "halden-db-setup", serverSelectionTimeoutMS: 10_000 });
  try {
    await client.connect();
    const report = await ensureCollections(client.db(db), COLLECTIONS, { apply: args.apply });

    for (const a of report.actions) {
      const verb = report.applied ? "done " : "would";
      console.log(`${verb} ${a.action} ${a.collection}${a.action === "create-index" ? ` [${a.index}]` : ""}`);
    }
    for (const c of report.conflicts) console.error(`CONFLICT ${c.collection} [${c.index}]: ${c.problem}`);
    for (const n of report.unmanaged.collections) console.log(`unmanaged collection (left alone): ${n}`);
    for (const i of report.unmanaged.indexes) console.log(`unmanaged index (left alone): ${i.collection} [${i.index}]`);

    if (report.conflicts.length) {
      console.error("Conflicts found — nothing was changed. Resolve them manually (setup never drops indexes).");
      process.exitCode = 1;
    } else if (!report.actions.length) console.log("Already up to date.");
    else if (!report.applied) console.log(`${report.actions.length} change(s) planned. Nothing was changed (dry run).`);
  } catch (err) {
    const e = err as { name?: string; codeName?: string };
    const hint = e.codeName === "Unauthorized" ? " — the database user lacks a required privilege (e.g. collMod needs elevated rights)." : "";
    console.error(`Setup failed: ${e.name ?? "Error"}${e.codeName ? ` (${e.codeName})` : ""}${hint}`);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

void main();
