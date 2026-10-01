#!/usr/bin/env node
// Triage the feedback debt before any of it is repaired.
//
// The plan assumed 579 independent bundles needing the same mechanical fix.
// Claude Fable read the corpus and said that was wrong: 20 python generators
// under scripts/ hard-code a few stems and copy them into every week of every
// country, so most of the debt is a small number of questions repeated. This
// script measures that, because the answer decides whether a bundle is worth
// repairing in place or has to be regenerated.
//
//   node scripts/triage-feedback-debt.mjs            report
//   node scripts/triage-feedback-debt.mjs --json     machine readable
//   node scripts/triage-feedback-debt.mjs --country colombia
//
// A bundle lands in one of three buckets:
//   repair    content is distinct, only the feedback is weak
//   regenerate content is a clone or a placeholder; the text itself is the defect
//   keep      the flag is a gate false positive, do not touch the content

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  normaliseStem,
  normaliseFeedback,
  findStemClones,
  findReusedFeedback,
  summariseClones,
  summariseReuse,
  REASON_CLONE_MIN,
  FEEDBACK_REUSE_MIN,
} from './check-clones.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'questions_data');

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const cIdx = args.indexOf('--country');
const country = cIdx >= 0 ? args[cIdx + 1] : null;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const VERDICT_PREFIX =
  /^\s*[¡!¿]?\s*(incorrecto|correcto|incorrecta|correcta|wrong|right|correct|incorrect)\s*[¡!¿.!?]*\s*[:\-–—]?\s*/i;
const VAGUE =
  /^\s*(revisa|revisar|consulta|observa|lee|vuelve a leer|intenta de nuevo|try again|practica|repasa|estudia|review|revise|revisit|read again|go back|check|look again|practise|practice|see again|consult|estudie|leia|releia|consulte)\b[\s\S]{0,45}$/i;
const SHORT_PRAISE =
  /^\s*(well done|nice work|great job|good job|very good|excellent|perfect|great|nice|good|bravo|excelente|muy bien|perfecto|bien hecho|correct|right|wrong|ok|okay|yes|no|si|justo eso)\b[\s.!¡!]*$/i;
const PLACEHOLDER_OPT = /^\s*opci[oó]n\s+[A-D]\s*(\(correcto\)|\(correct\))?\s*$/i;
const PLACEHOLDER_STEM = /^\s*this is a (review )?question about\b/i;
const UNFILLED = /\{[a-z_]+\}/i;

function reasonOf(fb) {
  return String(fb || '')
    .replace(VERDICT_PREFIX, '')
    .trim()
    .replace(/[.¡!¿:;\-–—\s]+$/, '');
}

function weakReason(fb) {
  const raw = String(fb || '').trim();
  if (!raw) return 'missing';
  const r = reasonOf(raw);
  if (!r) return 'verdict only';
  if (!/\s/.test(r)) return 'unbroken string';
  if (/[=+\-*/×÷<>^]|\$[^$]+\$/.test(r)) return null;
  if (/\b\d/.test(r) && /\b(es|son|valen|equivale|significa|da)\b/i.test(r)) return null;
  if (VAGUE.test(r) || SHORT_PRAISE.test(r)) return 'says nothing';
  if (UNFILLED.test(raw)) return 'unfilled token';
  return null;
}

const files = walk(DATA)
  .map((p) => path.relative(ROOT, p))
  .filter((f) => !country || f.includes(`/${country}/`));

const stemToBundles = new Map();
const feedbackToStems = new Map();
const perBundle = new Map();

for (const rel of files) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const blocks = text.split(/\n## Question |\n### Pregunta \d+/).slice(1);
  const rec = { rel, weak: 0, placeholders: 0, stems: new Set() };
  for (const b of blocks) {
    const stemM = b.match(/### Enunciado\n([\s\S]*?)\n### Opciones/) ||
      b.match(/\*\*Enunciado:\*\*\s*([\s\S]*?)\n/);
    const stem = (stemM ? stemM[1] : '').replace(/\s+/g, ' ').trim();
    const stemKey = normaliseStem(stem);
    if (stemKey) {
      if (!stemToBundles.has(stemKey)) stemToBundles.set(stemKey, new Set());
      stemToBundles.get(stemKey).add(rel);
      rec.stems.add(stemKey);
    }
    if (PLACEHOLDER_STEM.test(stem)) rec.placeholders++;
    const opts = b.match(/^- \[[ x]\] [A-D]\).*$/gm) || [];
    for (const o of opts) {
      const om = o.match(/^- \[[ x]\] [A-D]\)\s*([^\n]*)/);
      if (om && PLACEHOLDER_OPT.test(om[1])) rec.placeholders++;
      const fm = b.match(new RegExp(`${o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]{0,120}?<!--\\s*feedback:\\s*([\\s\\S]*?)\\s*-->`));
      const fb = fm ? fm[1] : '';
      const why = weakReason(fb);
      if (why) {
        rec.weak++;
        const fk = normaliseFeedback(fb);
        if (!feedbackToStems.has(fk)) feedbackToStems.set(fk, new Set());
        if (stemKey) feedbackToStems.get(fk).add(stemKey);
      }
    }
  }
  if (rec.weak || rec.placeholders) perBundle.set(rel, rec);
}

const stemSets = new Map([...stemToBundles].map(([k, v]) => [k, [...v]]));
const clones = findStemClones(stemSets, REASON_CLONE_MIN);
const cloneBundles = new Set(clones.flatMap((c) => c.bundles));
const reused = findReusedFeedback(feedbackToStems, FEEDBACK_REUSE_MIN);

const buckets = { regenerate: [], repair: [], keep: [] };
for (const [rel, rec] of perBundle) {
  if (rec.placeholders > 0) buckets.regenerate.push({ rel, ...rec, why: `${rec.placeholders} placeholders` });
  else if (cloneBundles.has(rel)) buckets.regenerate.push({ rel, ...rec, why: 'cloned stem' });
  else buckets.repair.push({ rel, ...rec, why: `${rec.weak} weak feedback` });
}

const report = {
  generated_at: new Date().toISOString(),
  corpus: { files: files.length, bundlesWithDebt: perBundle.size },
  clones: { distinctStems: stemSets.size, cloneStems: clones.length, bundlesAffected: cloneBundles.size },
  reusedFeedback: { strings: reused.length },
  buckets: {
    regenerate: buckets.regenerate.length,
    repair: buckets.repair.length,
  },
  topClones: clones.slice(0, 12).map((c) => ({ count: c.count, stem: c.stem.slice(0, 90) })),
  topReused: reused.slice(0, 12).map((r) => ({ count: r.count, feedback: r.feedback.slice(0, 80) })),
};

// The file lists a campaign can be split from, so no agent has to re-measure.
const outDir = path.join(__dirname, '..', 'docs', 'triage');
if (asJson) {
  fs.mkdirSync(outDir, { recursive: true });
  const byCountry = {};
  for (const b of buckets.regenerate) {
    const c = b.rel.split('/')[1];
    (byCountry[c] = byCountry[c] || []).push(b.rel);
  }
  for (const [c, list] of Object.entries(byCountry)) {
    fs.writeFileSync(path.join(outDir, `regenerate-${c}.json`), JSON.stringify(list, null, 0));
  }
  const byRepair = {};
  for (const b of buckets.repair) {
    const c = b.rel.split('/')[1];
    (byRepair[c] = byRepair[c] || []).push(b.rel);
  }
  for (const [c, list] of Object.entries(byRepair)) {
    fs.writeFileSync(path.join(outDir, `repair-${c}.json`), JSON.stringify(list, null, 0));
  }
  report.lists = { regenerate: Object.keys(byCountry).length, repair: Object.keys(byRepair).length };
}

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log('WorldExams feedback triage\n');
  console.log(`bundles scanned        ${files.length}`);
  console.log(`bundles with debt      ${perBundle.size}`);
  console.log(`distinct stems         ${stemSets.size}`);
  console.log(`cloned stems (${REASON_CLONE_MIN}+ bundles)  ${clones.length}`);
  console.log(`bundles holding clones ${cloneBundles.size}`);
  console.log(`reused feedback (${FEEDBACK_REUSE_MIN}+ stems)  ${reused.length}`);
  console.log(`\nREGENERATE  ${buckets.regenerate.length}   content is a clone or a placeholder`);
  console.log(`REPAIR      ${buckets.repair.length}   distinct content, only the feedback is weak`);
  console.log(`\n${summariseClones(clones, 8)}\n`);
  console.log(summariseReuse(reused, 8));
  const byCountry = {};
  for (const b of buckets.regenerate) {
    const c = b.rel.split('/')[1];
    byCountry[c] = (byCountry[c] || 0) + 1;
  }
  console.log(`\nregenerate by country:`);
  for (const [c, n] of Object.entries(byCountry).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c.padEnd(22)} ${n}`);
  }
}
