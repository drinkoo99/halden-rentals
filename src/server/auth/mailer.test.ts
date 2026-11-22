import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMailer } from "./mailer";

let logged: string[];
beforeEach(() => {
  logged = [];
  vi.spyOn(console, "error").mockImplementation((l: string) => void logged.push(l));
});
afterEach(() => vi.restoreAllMocks());

describe("mailer", () => {
  it("is not configured unless both the API key and sender are set", () => {
    expect(createMailer({})).toBeNull();
    expect(createMailer({ RESEND_API_KEY: "re_abc" })).toBeNull();
    expect(createMailer({ EMAIL_FROM: "HALDEN <a@b.ch>" })).toBeNull();
  });

  it("sends through Resend's API with the key in the Authorization header only", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 200 }));
    await createMailer({ RESEND_API_KEY: "re_secret", EMAIL_FROM: "HALDEN <a@b.ch>" }, fetchImpl)!.send({ to: "c@example.com", subject: "S", text: "T" });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).authorization).toBe("Bearer re_secret");
    expect(JSON.parse(init.body as string)).toEqual({ from: "HALDEN <a@b.ch>", to: ["c@example.com"], subject: "S", text: "T" });
  });

  it("fails with SERVICE_UNAVAILABLE and logs neither the key nor the recipient", async () => {
    const mailer = createMailer({ RESEND_API_KEY: "re_secret", EMAIL_FROM: "a@b.ch" }, async () => new Response("bad", { status: 422 }))!;
    await expect(mailer.send({ to: "c@example.com", subject: "S", text: "T" })).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    expect(logged.join()).not.toContain("re_secret");
    expect(logged.join()).not.toContain("c@example.com");
  });
});
