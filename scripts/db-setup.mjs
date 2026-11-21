#!/usr/bin/env node
/**
 * Apply the registered collections, validators and indexes (src/server/db/collections.ts).
 *
 *   npm run db:setup                      dry run: print what would change, touch nothing
 *   npm run db:setup -- --apply           apply to the database in MONGODB_URI / MONGODB_DB
 *   npm run db:setup -- --apply --allow-production
 *                                         required when the target looks like production
 *
 * Reads .env.local when present (Node --env-file-if-exists). Imports the TypeScript modules directly
 * (Node 24 type stripping), so it shares one definition with the app.
 */
import { MongoClient } from "mongodb";
import { describeMongoTarget, parseServerEnv } from "../src/server/config/env.ts";
import { COLLECTIONS, ensureCollections } from "../src/server/db/collections.ts";

const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");
const allowProduction = args.has("--allow-production");

let env;
try {
  env = parseServerEnv(process.env);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
if (!env.MONGODB_URI) {
  console.error("MONGODB_URI is not set (see .env.example). Nothing to do.");
  process.exit(1);
}

const looksProduction = process.env.VERCEL_ENV === "production" || /prod/i.test(env.MONGODB_DB);
console.log(`Target: ${describeMongoTarget(env.MONGODB_URI)} / database "${env.MONGODB_DB}"${looksProduction ? "  [PRODUCTION]" : ""}`);
console.log(`Mode:   ${apply ? "APPLY" : "dry run (add --apply to make changes)"}`);
if (apply && looksProduction && !allowProduction) {
  console.error("Refusing to modify a production database without --allow-production.");
  process.exit(1);
}
if (COLLECTIONS.length === 0) {
  console.log("No collections are registered yet (they arrive with later milestones). Nothing to do.");
  process.exit(0);
}

const client = new MongoClient(env.MONGODB_URI, { appName: "halden-db-setup", serverSelectionTimeoutMS: 10_000 });
try {
  await client.connect();
  const actions = await ensureCollections(client.db(env.MONGODB_DB), COLLECTIONS, { apply });
  if (!actions.length) console.log("Already up to date.");
  for (const a of actions) console.log(`${apply ? "done " : "would"} ${a.action} ${a.collection}${a.indexes ? ` [${a.indexes.join(", ")}]` : ""}`);
} catch (err) {
  console.error(`Setup failed: ${err?.name ?? "Error"}${err?.codeName ? ` (${err.codeName})` : ""}`);
  process.exitCode = 1;
} finally {
  await client.close();
}
