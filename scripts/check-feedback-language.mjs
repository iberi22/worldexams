#!/usr/bin/env node
// Language check for per-option feedback.
//
// The quality gate can tell whether feedback explains something. It cannot tell
// which language it is written in, so an English bundle whose feedback is in
// Spanish passes every rule and teaches the student nothing. It happened: six
// Colombia Grade 3 and Grade 6 English bundles had 199 of 201 feedbacks in
// Spanish while the stem and the options were correctly in English.
//
// What counts as an English bundle is the directory, not the content, because
// the content is what is being checked. Spanish-language feedback is correct
// and required everywhere else, including in Explicacion Pedagogica.
//
//   node scripts/check-feedback-language.mjs          report
//   node scripts/check-feedback-language.mjs --json   machine readable
//   node scripts/check-feedback-language.mjs questions_data/colombia/ingles

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const asJson = args.includes('--json');
const only = args.find((a) => !a.startsWith('--'));

// English-language subject directories. Anything else is Spanish or Portuguese,
// where Spanish feedback is the correct output.
const ENGLISH_DIRS = new Set(['ingles', 'english', 'eng', 'ing']);

const STOP_ES = /\b(el|la|los|las|un|una|debe|deben|porque|viene|despues|antes|esta|estan|son|es|mas|se|con|para|cuando|aqui|segun|no|si)\b/gi;
const STOP_EN = /\b(the|a|an|is|are|was|were|has|have|does|do|not|must|should|which|that|this|these|those|because|means|comes|after|before|instead|would|will|can|cannot)\b/gi;

function words(text, re) {
  return (String(text).match(re) || []).length;
}

/**
 * Decide whether a piece of feedback is in Spanish. A stop-word ratio is the
 * only signal available without shipping a language model, so it is set to
 * favour a false alarm over a false pass: a bundle is only reported when a
 * clear majority of its feedbacks look Spanish.
 */
function looksSpanish(text) {
  const es = words(text, STOP_ES);
  const en = words(text, STOP_EN);
  if (es === 0 && en === 0) return null; // a formula or a label, no verdict
  return es > en * 1.5;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const root = only ? path.resolve(ROOT, only) : path.join(ROOT, 'questions_data');
const offenders = [];
let checkedFiles = 0;
let checkedFeedbacks = 0;

for (const abs of walk(root)) {
  const rel = path.relative(ROOT, abs);
  // questions_data/<country>/<subject>/<grade>/<year>/<period>/<file>. The
  // subject is found by name, not by index, so the check also works when the
  // caller passes a directory other than questions_data.
  if (!rel.split('/').some((s) => ENGLISH_DIRS.has(s))) continue;
  const text = fs.readFileSync(abs, 'utf8');
  const feedbacks = [...text.matchAll(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/g)].map((m) => m[1]);
  if (!feedbacks.length) continue;
  checkedFiles += 1;
  checkedFeedbacks += feedbacks.length;
  const spanish = feedbacks.filter(looksSpanish);
  if (spanish.length > feedbacks.length * 0.5) {
    offenders.push({
      file: rel,
      total: feedbacks.length,
      spanish: spanish.length,
      example: spanish[0].slice(0, 100),
    });
  }
}

if (asJson) {
  console.log(JSON.stringify({ checkedFiles, checkedFeedbacks, offenders }, null, 2));
} else if (!offenders.length) {
  console.log(`OK  ${checkedFiles} english bundle(s), ${checkedFeedbacks} feedback(s), all in english`);
} else {
  console.log(`${offenders.length} english bundle(s) with feedback written in spanish:\n`);
  for (const o of offenders) {
    console.log(`  ${o.spanish}/${o.total}  ${o.file}`);
    console.log(`      "${o.example}"`);
  }
  console.log('\nthe stem and options are in english, so the explanation has to be too');
}
process.exit(offenders.length ? 1 : 0);
