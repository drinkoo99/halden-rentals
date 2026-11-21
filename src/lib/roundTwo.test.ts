import { describe, expect, it } from "vitest";
import { passcodeRules, passcodeStrength } from "@/components/auth/useRequestAccess";
import { reservationIcs } from "@/lib/ics";
import { isEmail, maskEmail } from "@/lib/useCountdown";

describe("request-access passcode rules", () => {
  it("checks length, letter and number/symbol", () => {
    expect(passcodeRules("short1")).toEqual({ length: false, letter: true, digit: true });
    expect(passcodeRules("archivalporsche")).toEqual({ length: true, letter: true, digit: false });
    expect(passcodeRules("archival-porsche-1965")).toEqual({ length: true, letter: true, digit: true });
  });

  it("scores strength 0–4", () => {
    expect(passcodeStrength("")).toBe(0);
    expect(passcodeStrength("abc")).toBe(1);
    expect(passcodeStrength("archival-porsche-1965")).toBe(3);
    expect(passcodeStrength("Archival-Porsche-1965")).toBe(4);
  });
});

describe("email helpers", () => {
  it("validates addresses", () => {
    expect(isEmail("clara@example.com")).toBe(true);
    expect(isEmail("clara@example")).toBe(false);
    expect(isEmail("not an email")).toBe(false);
  });

  it("masks the local part", () => {
    expect(maskEmail("clara.bergmann@atelier-v.ch")).toBe("c••••••••••••n@atelier-v.ch");
    expect(maskEmail("ab@x.ch")).toBe("a•••b@x.ch");
  });
});

describe("reservation .ics", () => {
  it("produces a single VEVENT with escaped text", () => {
    const ics = reservationIcs({
      ref: "HLD-0612-4821",
      title: "HALDEN handover — Range Rover",
      start: "2025-06-12T10:00",
      end: "2025-06-15T10:00",
      location: "Munich Airport (MUC), Terminal 2",
      description: "Reservation HLD-0612-4821; return MUC",
    });
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(1);
    expect(ics).toContain("UID:HLD-0612-4821@halden.example");
    expect(ics).toContain("LOCATION:Munich Airport (MUC)\\, Terminal 2");
    expect(ics).toContain("DESCRIPTION:Reservation HLD-0612-4821\\; return MUC");
    expect(ics).toContain("\r\n");
  });
});
