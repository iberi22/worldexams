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
//   node scripts/check-feedback-language.mjs          report on questions_data
//   node scripts/check-feedback-language.mjs --json   machine readable
//   node scripts/check-feedback-language.mjs file1.md file2.md

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const asJson = args.includes('--json');
const targetArgs = args.filter((a) => !a.startsWith('--'));

// English-language subject directories. Anything else is Spanish or Portuguese,
// where Spanish content is required and English leakage words are forbidden.
const ENGLISH_DIRS = new Set(['ingles', 'english', 'eng', 'ing']);

// Unambiguous English leakage words forbidden in Spanish-language bundles.
const ENGLISH_BLACKLIST = [
  'recounts',
  'recount',
  'ancestor',
  'ancestors',
  'narrator',
  'narrators',
  'protagonist',
  'protagonists',
  'throughout',
  'narrative arc',
  'narrative arcs',
  'plot twist',
  'plot twists',
  'main character',
  'main characters',
];

// Matching boundary that respects Spanish accented letters (e.g. avoiding false positives on "protagonistía").
const BLACKLIST_RE = new RegExp(
  `(?<![a-záéíóúñA-ZÁÉÍÓÚÑ])(${ENGLISH_BLACKLIST.map((w) => w.replace(/ /g, '\\s+')).join('|')})(?![a-záéíóúñA-ZÁÉÍÓÚÑ])`,
  'i'
);

const STOP_ES = /\b(el|la|los|las|un|una|debe|deben|porque|viene|despues|antes|esta|estan|son|es|mas|se|con|para|cuando|aqui|segun|no|si)\b/gi;
const STOP_EN = /\b(the|a|an|is|are|was|were|has|have|does|do|not|must|should|which|that|this|these|those|because|means|comes|after|before|instead|would|will|can|cannot)\b/gi;

function words(text, re) {
  return (String(text).match(re) || []).length;
}

/**
 * Decide whether a piece of feedback is in Spanish.
 */
function looksSpanish(text) {
  const es = words(text, STOP_ES);
  const en = words(text, STOP_EN);
  if (es === 0 && en === 0) return null; // a formula or a label, no verdict
  return es > en * 1.5;
}

function collectFiles(targets) {
  const files = [];
  const pathsToCheck = targets.length > 0 ? targets : [path.join(ROOT, 'questions_data')];

  for (const t of pathsToCheck) {
    const abs = path.resolve(ROOT, t);
    if (!fs.existsSync(abs)) continue;
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      walk(abs, files);
    } else if (stat.isFile() && abs.endsWith('.md')) {
      files.push(abs);
    }
  }
  return files;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const files = collectFiles(targetArgs);
const offenders = [];
let checkedFiles = 0;
let checkedFeedbacks = 0;

for (const abs of files) {
  const rel = path.relative(ROOT, abs);
  const isEnglish = rel.split(path.sep).some((s) => ENGLISH_DIRS.has(s.toLowerCase()));
  const text = fs.readFileSync(abs, 'utf8');

  if (isEnglish) {
    const feedbacks = [...text.matchAll(/<!--\s*feedback:\s*([\s\S]*?)\s*-->/g)].map((m) => m[1]);
    if (!feedbacks.length) continue;
    checkedFiles += 1;
    checkedFeedbacks += feedbacks.length;
    const spanish = feedbacks.filter(looksSpanish);
    if (spanish.length > feedbacks.length * 0.5) {
      offenders.push({
        type: 'spanish-feedback',
        file: rel,
        total: feedbacks.length,
        spanish: spanish.length,
        example: spanish[0].slice(0, 100),
      });
    }
  } else {
    checkedFiles += 1;
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const matches = [...line.matchAll(new RegExp(BLACKLIST_RE.source, 'gi'))];
      for (const match of matches) {
        offenders.push({
          type: 'english-leakage',
          file: rel,
          line: i + 1,
          word: match[0],
          snippet: line.trim(),
        });
      }
    }
  }
}

if (asJson) {
  console.log(JSON.stringify({ checkedFiles, checkedFeedbacks, offenders }, null, 2));
} else if (!offenders.length) {
  console.log(`OK  ${checkedFiles} bundle(s) checked, zero language violations found.`);
} else {
  console.log(`ERROR: ${offenders.length} language violation(s) found:\n`);
  for (const o of offenders) {
    if (o.type === 'spanish-feedback') {
      console.log(`  [spanish-feedback] ${o.file} (${o.spanish}/${o.total} feedbacks in spanish)`);
      console.log(`      "${o.example}"`);
    } else if (o.type === 'english-leakage') {
      console.log(`  [english-leakage] ${o.file}:${o.line} found English word "${o.word}"`);
      console.log(`      "${o.snippet}"`);
    }
  }
}

process.exit(offenders.length ? 1 : 0);
