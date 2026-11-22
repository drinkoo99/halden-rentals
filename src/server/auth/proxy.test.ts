import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { config, proxy } from "@/proxy";
import { SESSION_COOKIE } from "./cookie";

describe("proxy (optimistic redirect for protected areas)", () => {
  it("covers the account and staff areas", () => {
    expect(config.matcher).toEqual(["/account/:path*", "/staff/:path*"]);
  });

  it("sends visitors without a session cookie to sign-in, keeping the requested page", () => {
    const res = proxy(new NextRequest("http://localhost/account/settings?tab=2"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("http://localhost/sign-in?next=%2Faccount%2Fsettings%3Ftab%3D2");
  });

  it("lets a request with a session cookie through (the server-side gate then validates it)", () => {
    const res = proxy(new NextRequest("http://localhost/staff/fleet", { headers: { cookie: `${SESSION_COOKIE}=abc` } }));
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-middleware-request-x-halden-path")).toBe("/staff/fleet");
  });
});
