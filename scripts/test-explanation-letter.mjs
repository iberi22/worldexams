#!/usr/bin/env node
/**
 * Gate proof for the explanation-letter rule.
 *
 * The rule exists because relabelling options leaves sentences such as "La
 * respuesta correcta es la B." pointing at the wrong option (CO-SOC-7 W10 Q10),
 * and because CO-LC-6 W24 Q5 shipped "La opción C es la correcta" with [x] on a
 * plagiarism distractor. Both passed every other rule.
 *
 * Every silent case is asserted as silence: Spanish uses "a" as a preposition
 * ("la respuesta a la pregunta"), explanations legitimately walk through the
 * distractors by letter, and stems name things A/B/C (dron A, Laptop C). A gate
 * that shouts at those would be switched off.
 *
 * Two levels:
 *   - unit: checkExplanationLetter on minimal question texts;
 *   - end to end: the validator run on a fixture copy of a real bundle, once
 *     with a stale letter and once with the right one, so a rule that exists
 *     but is never called cannot pass.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = path.join(REPO, 'scripts/validate-bundles-v52.mjs');

let pass = 0;
let fail = 0;
function check(name, ok, detail) {
  if (ok) {
    pass++;
    console.log(`PASS  ${name}`);
  } else {
    fail++;
    console.log(`FAIL  ${name}${detail ? `\n      ${detail}` : ''}`);
  }
}

const { checkExplanationLetter } = await import(pathToFileURL(VALIDATOR).href);
check('validator exports checkExplanationLetter', typeof checkExplanationLetter === 'function');

const question = (key, explanation) =>
  ['A', 'B', 'C', 'D']
    .map((l) => `- [${l === key ? 'x' : ' '}] ${l}) Opcion ${l}\n  <!-- feedback: Razon concreta de la opcion ${l}. -->`)
    .join('\n') + `\n\n### Explicacion Pedagogica\n${explanation}\n`;
const run = (key, explanation) => checkExplanationLetter(question(key, explanation));
const rule = (r) => (r ? `${r.level}:${r.rule}` : 'silent');

// Assertions of the answer that name another letter: errors.
const errors = [
  ['stale "es la B" after relabelling (CO-SOC-7 W10 Q10)', 'A', 'La participación incluye poder escoger. La respuesta correcta es la B.'],
  ['"La opción C es la correcta" with [x] on D (CO-LC-6 W24 Q5)', 'D', 'La opción C es la correcta porque reúne los tres requisitos.'],
  ['"La respuesta correcta es A)." with [x] on B (CO-LEN-4 W10 Q2)', 'B', 'La respuesta correcta es A). «Comparten la plaza» muestra una actividad común.'],
  ['English "The correct answer is C"', 'A', 'The correct answer is C because the verb agrees with the subject.'],
  ['"Respuesta: D"', 'B', 'Respuesta: D. Se suman los dos lados.'],
];
for (const [name, key, text] of errors) {
  check(`error: ${name}`, rule(run(key, text)) === 'error:explanation-letter-mismatch', rule(run(key, text)));
}

// The same sentences naming the marked option: silent.
const silent = [
  ['"es la B" when B is the key', 'B', 'La participación incluye poder escoger. La respuesta correcta es la B.'],
  ['"La opción C es la correcta" when C is the key', 'C', 'La opción C es la correcta porque reúne los tres requisitos.'],
  ['preposition "a" is not option A', 'C', 'La respuesta a la pregunta depende de la escala: 10 cm x 50 m/cm = 500 m.'],
  ['walk through all three distractors', 'B', 'La opción A conserva solo los datos. La opción C cambia el género. La opción D se ocupa de los libros.'],
  ['labels in the stem are not options', 'B', 'El dron A vuela 5 km y luego 12 km; el dron B recorre la hipotenusa de 13 km.'],
  ['no letter at all', 'A', 'Se aplica la regla del producto y se suman los exponentes: x^2 · x^3 = x^5.'],
];
for (const [name, key, text] of silent) {
  check(`silent: ${name}`, run(key, text) === null, rule(run(key, text)));
}

// A bare mention that never names the key: a warning, never an error.
check(
  'warning: "La opción A responde" with [x] on D',
  rule(run('D', 'La opción A responde directamente a los dos problemas del texto.')) === 'warning:explanation-letter-unverified',
  rule(run('D', 'La opción A responde directamente a los dos problemas del texto.')),
);

// ---------------------------------------------------------------------------
// End to end: a fixture copy of CO-SOC-7 W10, the bundle the defect shipped in.
// ---------------------------------------------------------------------------
const SOURCE = path.join(
  REPO,
  'questions_data/colombia/sociales-ciudadanas/grado-7/2026/weekly/CO-SOC-7-2026-W10-mi-ciudadania-y-los-deberes-civicos-001-MASTERY-bundle.md',
);
const DIR = path.dirname(SOURCE);
const RUN = `zz-letter-fixture-${process.pid}-${Date.now()}`;
const fixtureName = `CO-SOC-7-2026-W10-${RUN}-001-MASTERY-bundle.md`;
const FIXTURE = path.join(DIR, fixtureName);
const sourceText = fs.readFileSync(SOURCE, 'utf8');
const sourceId = sourceText.match(/^id: "([^"]+)"/m)[1];
const ANCHOR = 'deja al estudiante poco margen para elegir la suya.';

function validate(lastSentence) {
  const text = sourceText
    .replaceAll(sourceId, fixtureName.replace(/\.md$/, ''))
    .replace(ANCHOR, `${ANCHOR} ${lastSentence}`);
  fs.writeFileSync(FIXTURE, text);
  const out = spawnSync('node', [VALIDATOR, path.relative(REPO, FIXTURE)], { cwd: REPO, encoding: 'utf8' });
  return `${out.stdout}${out.stderr}`;
}

try {
  check('fixture source still carries the anchor sentence', sourceText.includes(ANCHOR));
  const stale = validate('La respuesta correcta es la B.');
  check('validator reports a stale letter in a real bundle', /ERROR \[explanation-letter-mismatch\] .*Question 10/.test(stale), stale.slice(0, 300));
  const right = validate('La respuesta correcta es la A.');
  check('validator is silent when the letter matches the key', !/explanation-letter/.test(right), right.slice(0, 300));
} finally {
  fs.rmSync(FIXTURE, { force: true });
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
