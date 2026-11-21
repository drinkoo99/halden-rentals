import type { MongoClient } from "mongodb";
import { describe, expect, it } from "vitest";
import { createMongoClient, pingDatabase } from "./mongo";

/** A fake client whose ping resolves/rejects as told — for the paths a local test can't reach for real. */
const fakeClient = (ping: () => Promise<unknown>) => ({ db: () => ({ command: ping }) }) as unknown as MongoClient;

describe("pingDatabase", () => {
  it("reports up with latency when ping succeeds", async () => {
    const r = await pingDatabase(async () => fakeClient(async () => ({ ok: 1 })), "halden_test");
    expect(r).toMatchObject({ status: "up" });
    expect((r as { latencyMs: number }).latencyMs).toBeGreaterThanOrEqual(0);
  });

  it("reports a timeout without waiting for the driver", async () => {
    const started = Date.now();
    const r = await pingDatabase(async () => fakeClient(() => new Promise(() => {})), "halden_test", 50);
    expect(r).toMatchObject({ status: "down", reason: "timeout" });
    expect(Date.now() - started).toBeLessThan(1000);
  });

  it("classifies authentication failures", async () => {
    const authError = Object.assign(new Error("bad auth"), { name: "MongoServerError", code: 18, codeName: "AuthenticationFailed" });
    const r = await pingDatabase(async () => fakeClient(() => Promise.reject(authError)), "halden_test");
    expect(r).toMatchObject({ status: "down", reason: "auth_failed" });
  });

  it("does not throw when connecting throws synchronously", async () => {
    const r = await pingDatabase(() => {
      throw new Error("boom");
    }, "halden_test");
    expect(r).toMatchObject({ status: "down", reason: "error" });
  });

  // Real driver, no database needed: nothing listens on port 1, so server selection fails fast.
  it("reports unreachable with the real driver when no server answers", async () => {
    const client = createMongoClient("mongodb://127.0.0.1:1/?directConnection=true", { serverSelectionTimeoutMS: 300, connectTimeoutMS: 300 });
    try {
      const r = await pingDatabase(() => client.connect(), "halden_test", 2_000);
      expect(r).toMatchObject({ status: "down", reason: "unreachable" });
    } finally {
      await client.close();
    }
  });
});
