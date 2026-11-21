import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ICON_NAMES } from "@/lib/icons";

const SRC = join(__dirname, "..");
const files = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : /\.tsx?$/.test(e.name) && !e.name.endsWith(".test.ts") ? [join(dir, e.name)] : [],
  );

/** String literals in an expression, skipping comparison operands (`phase === "done"`). */
const literals = (expr: string) => [...expr.matchAll(/(?<![=!]==\s*)"([a-z0-9_]+)"/g)].map((l) => l[1]);

/** Icon names written in the source: icon spans, <Icon name>, `icon:` data fields and string literals inside icon spans. */
function usedIcons(): Set<string> {
  const used = new Set<string>();
  for (const f of files(SRC)) {
    const s = readFileSync(f, "utf8");
    for (const m of s.matchAll(/material-symbols-outlined[^>]*>\s*([a-z0-9_]+)\s*</g)) used.add(m[1]);
    for (const m of s.matchAll(/material-symbols-outlined[^>]*>\s*\{([^}]*)\}/g)) for (const l of literals(m[1])) used.add(l);
    for (const m of s.matchAll(/<Icon\b[^>]*\bname=(?:"([a-z0-9_]+)"|\{([^}]*)\})/g)) {
      if (m[1]) used.add(m[1]);
      else for (const l of literals(m[2] ?? "")) used.add(l);
    }
    for (const m of s.matchAll(/\b(?:icon|validIcon)\s*[:=]\s*\{?\s*"([a-z0-9_]+)"/g)) used.add(m[1]);
  }
  return used;
}

describe("Material Symbols subset", () => {
  it("includes every icon the source uses", () => {
    const list = new Set<string>(ICON_NAMES);
    const missing = [...usedIcons()].filter((n) => !list.has(n));
    expect(missing).toEqual([]);
  });
  it("has no duplicates", () => {
    expect(new Set(ICON_NAMES).size).toBe(ICON_NAMES.length);
  });
});
