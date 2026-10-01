#!/usr/bin/env node
// Refuse to run a bundle generator that cannot pass the quality gate.
//
// 23 scripts under scripts/ write MASTERY bundles. 16 of them write them for
// real, and not one of them validates its own output. Three of them hard-code
// the feedback straight into the source next to a hard-coded stem, so the same
// five questions get copied into every week of every country: that is the 278x
// duplication the triage found, and it is still one `python3 gen_*.py` away from
// coming back.
//
// One of them, gen_ca_caribbean_generator.py, appends a Quality Review table
// that scores itself 100/100 without measuring anything.
//
// This script is the interlock. It does not rewrite the generators, because 23
// rewrites is a project. It refuses the ones that are unsafe to run, so the
// defect cannot be regenerated while the repair is still in progress.
//
//   node scripts/check-generators.mjs            report
//   node scripts/check-generators.mjs --json     machine readable
//
// Exit 0 when every generator is safe to run, 1 when any is not.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const asJson = process.argv.includes('--json');
// A directory can be passed so the tests can point the check at a fixture.
const positional = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const SCRIPTS = positional[0] ? path.resolve(ROOT, positional[0]) : path.join(ROOT, 'scripts');

// Feedback the quality gate rejects, verbatim in the generator source. A
// generator that ships any of these cannot produce a passing bundle.
const REJECTED_FEEDBACK =
  /\b(Correct!|Correcto!|¡Correcto!|Incorrect\.|Incorrecto\.|Review the concept|Revisa el concepto|Well done|¡Muy bien!|Excelente!)/;

// No trailing word boundary: these strings end in punctuation, and a \b after
// "Correct!" can never match because ! is not a word character, so the boundary
// silently dropped two of the four most common ones.
// The generator that grades itself. Any literal score table is a self-assessment
// with no measurement behind it.
const SELF_SCORING = /(Technical|Curricular)\s*\|\s*\d+\/\d+/;

const findings = [];

for (const name of fs.readdirSync(SCRIPTS).sort()) {
  if (!name.startsWith('gen') || !name.endsWith('.py')) continue;
  const abs = path.join(SCRIPTS, name);
  const text = fs.readFileSync(abs, 'utf8');

  const rejected = [...new Set((text.match(new RegExp(REJECTED_FEEDBACK.source, 'g')) || [])
    .map((s) => s.trim()))];
  const writesBundles = /\.md["']/.test(text) || /MASTERY-bundle/.test(text);
  const validates = /validate-bundles|validate_content|validate-bundles-v52/.test(text);
  const selfScores = SELF_SCORING.test(text);

  const problems = [];
  if (writesBundles && rejected.length) {
    problems.push(`ships rejected feedback: ${rejected.slice(0, 4).join(', ')}`);
  }
  if (writesBundles && !validates) {
    problems.push('writes bundles and never runs the validator');
  }
  if (selfScores) {
    problems.push('contains a self-assigned quality score table');
  }
  if (problems.length) {
    findings.push({ script: `scripts/${name}`, writesBundles, problems });
  }
}

if (asJson) {
  const scanned = fs.readdirSync(SCRIPTS).filter((n) => n.startsWith('gen') && n.endsWith('.py')).length;
  console.log(JSON.stringify({ scanned, findings }, null, 2));
} else if (!findings.length) {
  console.log('OK  every generator either does not write bundles or can pass the gate');
} else {
  console.log(`${findings.length} generator(s) that must not be run while the repair is in progress:\n`);
  for (const f of findings) {
    console.log(`  ${f.script}`);
    for (const p of f.problems) console.log(`      - ${p}`);
  }
  console.log('\nthese are historical one-off generators. their output is in the repo already.');
  console.log('re-running one of them re-creates the clone pattern the repair is removing.');
}
process.exit(findings.length ? 1 : 0);
