import fs from "node:fs";
import path from "node:path";

import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PACKS_DIR = path.join(ROOT, "public", "v1", "packs");
const OUT_FILE = path.join(ROOT, "src", "ranked-exclusions.ts");

const AREAS = [
  "matematicas",
  "lectura_critica",
  "sociales_ciudadanas",
  "ciencias_naturales",
  "ingles",
];

const ENGLISH_B1_BLOCKERS = [
  "CO-ING-11-2026-W03-technological-breakthroughs-001-MASTERY-bundle-v16",
  "CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle-v11",
  "CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle-v14",
  "CO-ING-11-2026-W06-economic-trends-001-MASTERY-bundle-v15",
  "CO-ING-11-2026-W08-human-rights-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle-v11",
  "CO-ING-11-2026-W11-social-justice-001-MASTERY-bundle-v15",
  "CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle-v14",
  "CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle-v15",
  "CO-ING-11-2026-W12-philosophy-ethics-001-MASTERY-bundle-v16",
  "CO-ING-11-2026-W13-urban-development-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W13-urban-development-001-MASTERY-bundle-v14",
  "CO-ING-11-2026-W14-digital-citizenship-001-MASTERY-bundle-v15",
  "CO-ING-11-2026-W15-historical-turning-points-001-MASTERY-bundle-v12",
  "CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle-v12",
  "CO-ING-11-2026-W20-review-p2-001-MASTERY-bundle-v14",
  "CO-ING-11-2026-W24-tourism-heritage-001-MASTERY-bundle-v8",
  "CO-ING-11-2026-W25-health-bioethics-001-MASTERY-bundle-v16",
  "CO-ING-11-2026-W29-space-exploration-001-MASTERY-bundle-v12",
  "CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W30-review-p3-001-MASTERY-bundle-v16",
  "CO-ING-11-2026-W31-financial-literacy-001-MASTERY-bundle-v12",
  "CO-ING-11-2026-W32-youth-culture-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W33-conflict-resolution-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W35-governance-democracy-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W38-comprehensive-review-1-001-MASTERY-bundle-v15",
  "CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle-v12",
  "CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle-v13",
  "CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle-v15",
  "CO-ING-11-2026-W39-comprehensive-review-2-001-MASTERY-bundle-v16",
  "CO-ING-11-2026-W27-migration-diaspora-001-MASTERY-bundle-v13",
];

const LC_NO_STIMULUS = [];
for (let i = 1; i <= 20; i++) LC_NO_STIMULUS.push("CO-LC-11-2026-W30-repaso-p3-001-MASTERY-bundle-v" + i);
for (let i = 1; i <= 20; i++) LC_NO_STIMULUS.push("CO-LC-11-2026-W35-cronica-periodistica-001-MASTERY-bundle-v" + i);
for (let i = 1; i <= 20; i++) LC_NO_STIMULUS.push("CO-LC-11-2026-W40-repaso-final-p4-001-MASTERY-bundle-v" + i);
for (const v of [1, 3, 6, 8, 19]) LC_NO_STIMULUS.push("CO-LC-11-2026-W31-simulacro-saber11-lectura-001-MASTERY-bundle-v" + v);
LC_NO_STIMULUS.push("CO-LC-11-2026-W10-repaso-p1-001-MASTERY-bundle-v9");

function loadPacks(subject) {
  const files = fs.readdirSync(PACKS_DIR)
    .filter((f) => new RegExp("^co-week-\\d+-grade-11-subject-" + subject + "\\.json$").test(f));
  const out = [];
  for (const f of files) {
    const m = f.match(/co-week-(\d+)-/);
    const week = parseInt(m[1], 10);
    const data = JSON.parse(fs.readFileSync(path.join(PACKS_DIR, f), "utf8"));
    out.push({ file: f, week, questions: data.questions || [] });
  }
  out.sort((a, b) => a.week - b.week);
  return out;
}

function normMath(s) {
  return String(s || "")
    .replace(/\$[^$]*\$/g, " $X$ ")
    .replace(/\d+/g, "#")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

const excludedWeeks = Object.fromEntries(AREAS.map((a) => [a, []]));
const excludedIds = new Set();

// Math
{
  const packs = loadPacks("matematicas");
  for (const p of packs) {
    const distinct = new Set(p.questions.map((q) => normMath(q.statement)));
    if (distinct.size <= 5) {
      excludedWeeks.matematicas.push(p.week);
      for (const q of p.questions) excludedIds.add(q.id);
    }
  }
  excludedWeeks.matematicas.sort((a, b) => a - b);
}

// Ciencias W30
{
  const packs = loadPacks("ciencias_naturales");
  for (const p of packs) {
    if (p.week === 30) {
      excludedWeeks.ciencias_naturales.push(30);
      for (const q of p.questions) excludedIds.add(q.id);
    }
  }
}

// English
{
  const packs = loadPacks("ingles");
  const seenStatements = new Set();
  const refRe = /according to (a |the )?(recent )?(report|text|passage|article|author)|the (text|passage|article|author)\b/i;
  const placeholderRe = /\{[a-zA-Z_]+\}/;
  for (const p of packs) {
    for (const q of p.questions) {
      let ex = false;
      const ctx = String(q.context || "");
      const stmt = String(q.statement || "");
      if (refRe.test(stmt) && ctx.trim().length < 120) ex = true;
      if (placeholderRe.test(stmt) || (q.options || []).some((o) => placeholderRe.test(o.text || "")) || placeholderRe.test(q.explanation || "")) ex = true;
      if (seenStatements.has(stmt.trim())) ex = true;
      else seenStatements.add(stmt.trim());
      if (ENGLISH_B1_BLOCKERS.includes(q.id)) ex = true;
      if (ex) excludedIds.add(q.id);
    }
  }
}

// LC
{
  const packs = loadPacks("lectura_critica");
  const lcRe = /tesis|intenci[oó]n|idea (central|principal)|presupuesto|prop[oó]sito|postura del autor/i;
  const noStimSet = new Set(LC_NO_STIMULUS);
  for (const p of packs) {
    let allExcluded = true;
    for (const q of p.questions) {
      const ctx = String(q.context || "");
      const stmt = String(q.statement || "");
      let ex = noStimSet.has(q.id);
      if (!ex && lcRe.test(stmt) && ctx.trim().length < 120) ex = true;
      if (ex) excludedIds.add(q.id);
      else allExcluded = false;
    }
    if (allExcluded && p.questions.length > 0) {
      if (!excludedWeeks.lectura_critica.includes(p.week)) excludedWeeks.lectura_critica.push(p.week);
    }
  }
  excludedWeeks.lectura_critica.sort((a, b) => a - b);
}

// Week-level auto: if all questions in week excluded
for (const area of AREAS) {
  const packs = loadPacks(area);
  for (const p of packs) {
    if (p.questions.length > 0 && p.questions.every((q) => excludedIds.has(q.id))) {
      if (!excludedWeeks[area].includes(p.week)) excludedWeeks[area].push(p.week);
    }
  }
  excludedWeeks[area].sort((a, b) => a - b);
}

const date = new Date().toISOString().slice(0, 10);
const header = "// Generated by: node apps/worldexams-api/scripts/build-ranked-exclusions.mjs\n// Generated on: " + date + "\n// Do not edit by hand. Regenerate with the command above.\n";

const idsArray = Array.from(excludedIds).sort();
const weeksLiteral = AREAS.map((a) => "  " + JSON.stringify(a) + ": [" + excludedWeeks[a].join(", ") + "],").join("\n");

let content = header + "\n";
content += "export const RANKED_EXCLUDED_WEEKS: Record<string, number[]> = {\n" + weeksLiteral + "\n};\n\n";
content += "export const RANKED_EXCLUDED_QUESTION_IDS: ReadonlySet<string> = new Set([\n";
content += idsArray.map((id) => "  " + JSON.stringify(id) + ",").join("\n") + "\n]);\n\n";
content += "export function isRankedExcluded(area: string, week: number, questionId: string): boolean {\n";
content += "  const weeks = RANKED_EXCLUDED_WEEKS[area] || [];\n";
content += "  if (weeks.includes(week)) return true;\n";
content += "  return RANKED_EXCLUDED_QUESTION_IDS.has(questionId);\n";
content += "}\n";

fs.writeFileSync(OUT_FILE, content, "utf8");
console.log("Excluded weeks:", JSON.stringify(excludedWeeks));
console.log("Excluded ids:", excludedIds.size);
for (const area of AREAS) {
  const packs = loadPacks(area);
  let total = 0, excl = 0;
  for (const p of packs) for (const q of p.questions) { total++; if (excludedIds.has(q.id)) excl++; }
  console.log(area, "total", total, "excluded", excl, "remaining", total - excl);
}
