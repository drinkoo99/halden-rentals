import { describe, expect, it } from "vitest";
import { ageOn, driverSchema, parseDob } from "@/lib/booking/driverSchema";

const valid = {
  firstName: "Clara",
  lastName: "Von Bergmann",
  email: "clara@example.com",
  phone: "+41 79 482 1904",
  dob: "14 / 08 / 1988",
  licenceCountry: "CHE",
  licenceNumber: "ch-8492041-b",
  notes: "",
};

describe("driverSchema", () => {
  it("accepts a valid principal driver and normalises the licence", () => {
    const r = driverSchema.safeParse(valid);
    expect(r.success).toBe(true);
    expect(r.success && r.data.licenceNumber).toBe("CH-8492041-B");
  });

  it("rejects the incomplete phone number shown in the Stitch error state", () => {
    expect(driverSchema.safeParse({ ...valid, phone: "+49 170 55" }).success).toBe(false);
  });

  it("enforces the 28+ age rule", () => {
    const now = new Date();
    const dob = `01 / 01 / ${now.getFullYear() - 25}`;
    const r = driverSchema.safeParse({ ...valid, dob });
    expect(r.success).toBe(false);
  });

  it("rejects impossible dates", () => {
    expect(parseDob("31 / 02 / 1990")).toBeNull();
    expect(parseDob("14.08.1988")).not.toBeNull();
  });

  it("computes age around the birthday", () => {
    expect(ageOn(new Date(1990, 5, 15), new Date(2020, 5, 14))).toBe(29);
    expect(ageOn(new Date(1990, 5, 15), new Date(2020, 5, 15))).toBe(30);
  });

  it("rejects unknown licence countries", () => {
    expect(driverSchema.safeParse({ ...valid, licenceCountry: "XYZ" }).success).toBe(false);
  });
});
