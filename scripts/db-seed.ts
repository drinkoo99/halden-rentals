/**
 * Seed the demo catalogue (5 locations, 10 vehicle models, 5 extras) from the P1 static mapping.
 *
 *   npm run db:seed                                    dry run: read-only, prints the plan per collection
 *   npm run db:seed -- --apply --confirm-db=<db>       apply to MONGODB_DB (must match exactly)
 *   ... --allow-production                             also required when the target looks like production
 *
 * Every guard runs before connecting (same rules as db:setup; halden_test* is refused — tests use the
 * library directly). The seed and every stored document are validated before any write; any validation
 * error or conflict in ANY collection aborts the run with nothing written. Only `dataOrigin: "demo"`
 * documents are inserted or updated; nothing is ever deleted. Writes are not transactional — the report
 * says exactly what was written; re-running converges.
 */
import { MongoClient } from "mongodb";
import { catalogueSeedFromStatic } from "../src/server/catalogue/seed/fromStatic";
import { seedCatalogue } from "../src/server/catalogue/seed/apply";
import { describeMongoTarget, parseServerEnv } from "../src/server/config/env";
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
    fail((e as Error).message);
  }
  if (!env.MONGODB_URI) fail("MONGODB_URI is not set (see .env.example). Nothing to do.");

  const dbName = env.MONGODB_DB;
  console.log(`Target: ${describeMongoTarget(env.MONGODB_URI)} / database "${dbName}"${looksLikeProduction(dbName, process.env.VERCEL_ENV) ? "  [PRODUCTION]" : ""}`);
  console.log(`Mode:   ${args.apply ? "APPLY" : "dry run (read-only; add --apply --confirm-db=<database> to write)"}`);
  try {
    assertScriptTarget(dbName, args, process.env.VERCEL_ENV);
  } catch (e) {
    fail((e as Error).message);
  }

  const client = new MongoClient(env.MONGODB_URI, { appName: "halden-db-seed", serverSelectionTimeoutMS: 10_000 });
  try {
    await client.connect();
    const { plan, report } = await seedCatalogue(client.db(dbName), catalogueSeedFromStatic(), { apply: args.apply });

    for (const c of plan.collections) {
      console.log(
        `\n${c.collection}: ${c.seedCount} seed docs | insert ${c.inserts.length} | update ${c.updates.length} | unchanged ${c.unchanged.length} | unmanaged skipped ${c.unmanagedSkipped.length} | orphaned demo (kept) ${c.orphanedDemo.length} | conflicts ${c.conflicts.length}`,
      );
      for (const i of c.inserts) console.log(`  ${report ? "planned" : "would"} insert ${i.key}`);
      for (const u of c.updates) console.log(`  ${report ? "planned" : "would"} update ${u.key}: ${[...Object.keys(u.set), ...u.unset.map((f) => `-${f}`)].join(", ")}`);
      for (const k of c.unmanagedSkipped) console.log(`  skip (not demo-owned) ${k}`);
      for (const k of c.orphanedDemo) console.log(`  keep (demo, no longer seeded) ${k}`);
      for (const x of c.conflicts) console.error(`  CONFLICT ${x.key}: ${x.problem}`);
    }
    for (const v of plan.validationErrors) console.error(`INVALID ${v.source} ${v.collection} "${v.key}": ${v.problem}`);

    if (!plan.safe) {
      console.error("\nUnsafe plan (validation errors or conflicts) — nothing was written.");
      process.exitCode = 1;
    } else if (plan.writes === 0) console.log("\nAlready up to date (0 changes).");
    else if (!report) console.log(`\n${plan.writes} write(s) planned. Nothing was written (dry run).`);
    else {
      for (const o of report.outcomes.filter((x) => x.result !== "done")) console.error(`  ${o.result.toUpperCase()} ${o.op} ${o.collection} ${o.key}: ${o.reason}`);
      console.log(`\nApplied: ${report.inserted} inserted, ${report.updated} updated, ${report.skipped} skipped, ${report.failed} failed.`);
      if (!report.complete) {
        console.error("Not all planned writes were applied (see above). Fix the cause and run again; the seed re-plans from the stored state.");
        process.exitCode = 1;
      }
    }
  } catch (err) {
    const e = err as { name?: string; codeName?: string; message?: string };
    console.error(e.name === "SeedSetupError" ? e.message : `Seed failed: ${e.name ?? "Error"}${e.codeName ? ` (${e.codeName})` : ""}`);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

void main();
