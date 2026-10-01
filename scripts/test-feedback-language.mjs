// Tests for the feedback language check.
//
// The quality gate asks whether feedback explains something. It never asks
// which language it is in, so an English bundle with Spanish feedback passes
// every rule and teaches nothing. 58 of the 604 English bundles are in that
// state, 1595 options of them.
//
// Plain node, like the other quality suites, because vitest does not reach
// scripts/.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.join(HERE, 'check-feedback-language.mjs');

let pass = 0;
let fail = 0;

function test(name, fn) {
  try {
    fn();
    pass += 1;
    console.log(`PASS  ${name}`);
  } catch (e) {
    fail += 1;
    console.log(`FAIL  ${name}`);
    console.log(`      ${e.message}`);
  }
}

// A real feedback from the corpus that the check has to flag.
const SPANISH_FEEDBACK = [
  'L va antes de M en el abecedario ingles, porque el orden va L, M y luego N.',
  'in significa dentro de algo y el gato no esta dentro del sofa.',
  'esa pregunta pide la edad, no la hora, y por eso no sirve para pedir la hora.',
  "Esta opcion usa el gerundio, que requiere un verbo auxiliar y no se usa para rutinas.",
];

const ENGLISH_FEEDBACK = [
  'L comes before M in the alphabet, because the order goes L, M, then N.',
  'in means inside something, and the cat is not inside the sofa.',
  'That question asks for an age, not for the time, so it cannot ask for the time.',
  'This option uses the gerund, which needs an auxiliary and is not used for routines.',
  // Short and real, the kind that a naive detector would call non-English:
  'Missing "to"',
  'Not mentioned',
  '2^4 = 16',
  'Gerund.',
];

function makeBundle(dir, stem, feedbacks, subject = 'ingles', option = 'The books are on the desk.') {
  // The script locates the language by the path shape
  // questions_data/<country>/<subject>/<grade>/..., so the fixture has to have
  // that shape or the subject is never recognised.
  const weekly = path.join(dir, 'questions_data', 'co', subject, 'grado-3', '2026', 'weekly');
  fs.mkdirSync(weekly, { recursive: true });
  const options = feedbacks
    .map((f, i) => `- [${i === 0 ? 'x' : ' '}] ${'ABCD'[i]}) ${option}\n  <!-- feedback: ${f} -->`)
    .join('\n');
  const file = path.join(weekly, `T-ING-3-2026-W01-${stem}-001-MASTERY-bundle.md`);
  fs.writeFileSync(
    file,
    `---\nid: "T-ING-3-2026-W01-${stem}-001-MASTERY-bundle"\ncountry: "co"\ngrado: 3\n---\n\n## Question 1 [D3-D4]\n**ID:** q1\n\n### Enunciado\nWhich sentence is correct?\n\n### Opciones\n${options}\n`,
    'utf8'
  );
}

function run(dir) {
  const r = spawnSync('node', [SCRIPT, '--json', dir], { encoding: 'utf8' });
  const out = r.stdout;
  return JSON.parse(out.slice(out.indexOf('{')));
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'we-lang-'));

try {
  test('flags an english bundle whose feedback is in spanish', () => {
    const d = path.join(tmp, 'a');
    makeBundle(d, 'alfa', SPANISH_FEEDBACK);
    const r = run(d);
    assert.equal(r.offenders.length, 1);
    assert.equal(r.offenders[0].spanish, SPANISH_FEEDBACK.length);
  });

  test('accepts an english bundle whose feedback is in english', () => {
    const d = path.join(tmp, 'b');
    makeBundle(d, 'beta', ENGLISH_FEEDBACK);
    const r = run(d);
    assert.equal(r.offenders.length, 0);
  });

  test('accepts short real feedback such as a grammar label or a formula', () => {
    // These are valid explanations that a stop-word ratio would misjudge, and
    // they are in the corpus, so the detector has to leave them alone.
    const d = path.join(tmp, 'c');
    makeBundle(d, 'gama', ['Gerund.', 'Missing "to"', '2^4 = 16', 'Not mentioned']);
    const r = run(d);
    assert.equal(r.offenders.length, 0);
  });

  test('ignores a spanish-language bundle, where spanish feedback is correct', () => {
    makeBundle(path.join(tmp, 'd'), 'x', SPANISH_FEEDBACK, 'matematicas', '3 + 4 = 7');
    const r = run(path.join(tmp, 'd'));
    assert.equal(r.checkedFiles, 0);
    assert.equal(r.offenders.length, 0);
  });

  test('only reports a bundle when the majority of its feedback is the wrong language', () => {
    // One Spanish feedback among three English ones is a slip, not a bundle
    // written in the wrong language, and flagging it would be noise.
    const d = path.join(tmp, 'e');
    makeBundle(d, 'delta', ['L comes before M in the alphabet, because the order goes L, M, then N.', 'in significa dentro de algo.', 'O comes two letters after M.', 'K is three places before M.']);
    const r = run(d);
    assert.equal(r.offenders.length, 0);
  });
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
