import { describe, expect, it } from "vitest";
import { extraCost, extras } from "@/data/extras";
import { formatEuroCents, quote } from "@/lib/pricing";

const byId = (id: string) => extras.find((e) => e.id === id)!;

describe("quote", () => {
  it("matches the Stitch detail/trip screens: €390 × 3 days", () => {
    const q = quote(390, 3);
    expect(q.rental).toBe(1170);
    expect(q.vat).toBe(222.3);
    expect(q.total).toBe(1392.3);
    expect(formatEuroCents(q.total)).toBe("€1,392.30");
  });

  it("matches the Stitch review screen with waiver, second driver and one child seat", () => {
    const days = 3;
    const lines = ["waiver", "driver", "childseat"].map((id) => ({ label: id, amount: extraCost(byId(id), 1, days) }));
    const q = quote(390, days, lines);
    expect(q.extrasTotal).toBe(285);
    expect(q.vat).toBe(276.45);
    expect(q.total).toBe(1731.45);
  });
});

describe("extraCost", () => {
  it("charges per-day extras per day and per unit", () => {
    expect(extraCost(byId("childseat"), 2, 4)).toBe(160);
  });
  it("charges flat extras once", () => {
    expect(extraCost(byId("delivery"), 1, 10)).toBe(120);
  });
  it("never charges included extras or zero quantities", () => {
    expect(extraCost(byId("winter"), 1, 5)).toBe(0);
    expect(extraCost(byId("waiver"), 0, 5)).toBe(0);
  });
});
