import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  RANKED_EXCLUDED_WEEKS,
  RANKED_EXCLUDED_QUESTION_IDS,
  isRankedExcluded,
} from "../src/ranked-exclusions";

const AREAS = [
  "matematicas",
  "lectura_critica",
  "sociales_ciudadanas",
  "ciencias_naturales",
  "ingles",
];

function loadPacks(area: string) {
  const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "v1", "packs");
  const files = fs.readdirSync(dir).filter((f) => new RegExp(`^co-week-\\d+-grade-11-subject-${area}\\.json$`).test(f));
  return files.map((f) => {
    const week = parseInt(f.match(/co-week-(\d+)-/)![1], 10);
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    return { week, questions: data.questions || [] };
  });
}

describe("ranked exclusions", () => {
  it("set is not empty", () => {
    expect(RANKED_EXCLUDED_QUESTION_IDS.size).toBeGreaterThan(0);
  });

  it("math W01 excluded, W22 not", () => {
    expect(RANKED_EXCLUDED_WEEKS.matematicas).toContain(1);
    expect(RANKED_EXCLUDED_WEEKS.matematicas).not.toContain(22);
    const w1 = loadPacks("matematicas").find((p) => p.week === 1)!;
    expect(w1.questions.every((q: any) => isRankedExcluded("matematicas", 1, q.id))).toBe(true);
    const w22 = loadPacks("matematicas").find((p) => p.week === 22)!;
    expect(w22.questions.some((q: any) => isRankedExcluded("matematicas", 22, q.id))).toBe(false);
  });

  it("at least 200 valid questions per area", () => {
    for (const area of AREAS) {
      let valid = 0;
      for (const p of loadPacks(area)) {
        for (const q of p.questions) {
          if (!isRankedExcluded(area, p.week, q.id)) valid++;
        }
      }
      expect(valid).toBeGreaterThanOrEqual(200);
    }
  });
});
