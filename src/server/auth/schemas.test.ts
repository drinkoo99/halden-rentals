import { describe, expect, it } from "vitest";
import { emailSchema, loginInput, newPasswordSchema, registerInput } from "./schemas";

describe("auth input validation", () => {
  it("normalises email addresses (trimmed, lower-case)", () => {
    expect(emailSchema.parse("  Clara.Bergmann@Example.COM ")).toBe("clara.bergmann@example.com");
    expect(emailSchema.safeParse("not-an-email").success).toBe(false);
    expect(emailSchema.safeParse(`${"a".repeat(250)}@x.ch`).success).toBe(false);
  });

  it("applies the passcode policy (12–128 chars, a letter, a number or symbol)", () => {
    expect(newPasswordSchema.safeParse("short1").success).toBe(false);
    expect(newPasswordSchema.safeParse("onlylettersherexx").success).toBe(false);
    expect(newPasswordSchema.safeParse("123456789012345").success).toBe(false);
    expect(newPasswordSchema.safeParse("a".repeat(129) + "1").success).toBe(false);
    expect(newPasswordSchema.safeParse("gallery-pass-1").success).toBe(true);
    expect(newPasswordSchema.safeParse("gallery pass!x").success).toBe(true);
  });

  it("strips any role or status a client tries to send with a registration", () => {
    const parsed = registerInput.parse({ name: "Clara Bergmann", email: "c@example.com", password: "gallery-pass-1", role: "admin", status: "active" });
    expect(parsed).toEqual({ name: "Clara Bergmann", email: "c@example.com", password: "gallery-pass-1" });
  });

  it("rejects names with markup or control characters", () => {
    expect(registerInput.safeParse({ name: "<script>", email: "c@example.com", password: "gallery-pass-1" }).success).toBe(false);
    expect(registerInput.safeParse({ name: "A", email: "c@example.com", password: "gallery-pass-1" }).success).toBe(false);
  });

  it("bounds login input without re-applying the new-passcode policy", () => {
    expect(loginInput.safeParse({ email: "c@example.com", password: "old", remember: true }).success).toBe(true);
    expect(loginInput.safeParse({ email: "c@example.com", password: "x".repeat(129), remember: true }).success).toBe(false);
  });
});
