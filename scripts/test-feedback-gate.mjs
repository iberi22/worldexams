#!/usr/bin/env node
/**
 * Gate proof for the v5.3 feedback-quality rule.
 *
 * A test that cannot fail is worse than no test, so each case asserts the real
 * validator's verdict by running it against a real bundle inside the repo.
 * GREEN  = validator rejects (bad feedback caught)
 * PASS   = validator accepts (good feedback not caught)
 *
 * The fixture writes into the repo's own questions_data path because the
 * validator requires every file to live under questions_data/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Resolved from this file's location so the test runs in any checkout and the
// repository path never has to be hardcoded (the public-repo leak gate rejects
// personal filesystem paths).
const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = path.join(REPO, 'scripts/validate-bundles-v52.mjs');
const DIR = path.join(REPO, 'questions_data/colombia/matematicas/grado-6/2026/weekly');
const ID = 'CO-MAT-6-2026-W01-potenciacion-numeros-001-MASTERY-bundle';
const FILE = path.join(DIR, `${ID}.md`);

const GOOD_CORRECT = 'Correcto. "accommodation" matches the definition of a place where you stay.';
const GOOD_WRONG = 'Incorrect. "transportation" refers to means of moving people or goods, not a place to stay.';
const FORMULA_OK = 'Correcto. vf = v0 + a*t = 6 + 2*5 = 16 m/s.';
const DEAD_WRONG = 'Incorrecto.';
const DEAD_CORRECT = 'Correcto.';
const DEAD_TRY = 'Incorrect. Try again.';
const VAGUE_REVISA = 'Incorrecto. Revisa el concepto.';
const JUNK_PRAISE = 'Correct! Well done.';
// Real feedback taken from the merged corpus. Each of these explains the reason
// in its own words and MUST be accepted: an earlier version of the gate rejected
// them because it expected a fixed vocabulary (olvido, confunde, porque...).
const REAL_GOOD = [
  ['physics: rest weight', 'Correcto. Es el peso normal en reposo.'],
  ['math: log of zero', 'Incorrecto. El logaritmo de cero no existe en los reales.'],
  ['reading: absent detail', 'Incorrecto. El zorro no se menciona en la historia.'],
  ['math: slope reciprocal', 'Incorrecto. Esa es la pendiente reciproca de la dada.'],
  ['english: plural be', 'Incorrecto. "Are" is used with you, we, or they.'],
  ['math: negative root', 'Incorrecto. Olvidó la raíz negativa al despejar la ecuación.'],
  // Short calculations. These are real explanations and are under the character
  // floor, which is why the floor must not apply when a formula is present.
  ['chem: arithmetic', 'Incorrecto. 2 + 1 = 3'],
  ['chem: pOH', 'Correcto. pOH es 11'],
  ['chem: Kc relation', 'Incorrecto. $Q_c\\neq K_c$'],
  // Category labels. The length floor accepted "Past continuous." (16) and
  // rejected "Present tense." (14) - the same answer either side of an
  // arbitrary number. Taken from CL-ING-11-2026-W08, which CI rejected.
  ['eng: present tense', 'Incorrect. Present tense.'],
  ['eng: past simple', 'Incorrect. Past simple.'],
  ['eng: past continuous', 'Incorrect. Past continuous.'],
  ['eng: second conditional', 'Incorrect. Second conditional.'],
  ['eng: relative pronoun', "Incorrect. 'Who' is a relative pronoun, but we need possession."],
  ['eng: gerund', 'Incorrect. Gerund.'],
  // Short but specific. The length floor rejected all of these; every one names
  // the thing that is wrong. "Well done" x400 was the only real junk it caught.
  ['eng: missing to', "Incorrect. Missing 'to'"],
  ['eng: word order', 'Incorrect. word order'],
  ['math: power', 'Incorrect. 2⁴ é 16'],
  ['math: square', 'Incorrect. 49² não é 49'],
  ['math: sign', 'Incorrect. Error de signo'],
  ['eng: not mentioned', 'Incorrect. Not mentioned'],
  ['eng: too broad', 'Incorrect. Too broad'],
  ['math: p90', 'Incorrect. Ese es el P90'],
  ['math: not null', 'Incorrect. Z no es nulo'],
  ['eng: present perfect continuous', 'Incorrect. Present perfect continuous.'],
];


const cases = [
  { name: 'good feedback (correct option)', fb: GOOD_CORRECT, correct: true, expect: 'pass' },
  { name: 'good feedback (wrong option)', fb: GOOD_WRONG, correct: false, expect: 'pass' },
  { name: 'formula-only feedback is real pedagogy', fb: FORMULA_OK, correct: true, expect: 'pass' },
  { name: 'DEAD: wrong option, verdict only', fb: DEAD_WRONG, correct: false, expect: 'fail' },
  { name: 'DEAD: correct option, verdict only', fb: DEAD_CORRECT, correct: true, expect: 'fail' },
  { name: 'DEAD: "try again"', fb: DEAD_TRY, correct: false, expect: 'fail' },
  { name: 'VAGUE: "revisa el concepto"', fb: VAGUE_REVISA, correct: false, expect: 'fail' },
  // The three rules the Fable audit forced in. Every one of these strings exists
  // in the merged corpus in the hundreds, and the gate passed all of them: the
  // Spanish-only list let the English and Portuguese copies through, and nothing
  // looked for an unfilled template token.
  { name: 'EN vague: "Review the concept"', fb: 'Incorrect. Review the concept.', correct: false, expect: 'fail' },
  { name: 'EN vague: "Please review the topic"', fb: 'Incorrect. Please review the topic.', correct: false, expect: 'fail' },
  { name: 'PT vague: "Revise o conceito"', fb: 'Incorrecto. Revise o conceito.', correct: false, expect: 'fail' },
  { name: 'unfilled template token {grammar}', fb: 'Incorrect. The use of {grammar} adds complexity.', correct: false, expect: 'fail' },
  { name: 'praise alone: "Well done"', fb: 'Well done', correct: false, expect: 'fail' },
  ...REAL_GOOD.map(([name, fb]) => ({
    name: `real corpus, must be accepted: ${name}`,
    fb,
    correct: false,
    expect: 'pass',
  })),
];

// Filler options that must themselves be valid, so a failing case fails on the
// option under test and not on collateral damage.
const FILLER = {
  A: 'Correcto. La potencia es el resultado de multiplicar la base.',
  B: 'Incorrecto. "nunca" negates the verb, it does not indicate frequency.',
  C: 'Incorrecto. "siempre" means every time, not never.',
  D: 'Incorrecto. Exponentes distintos producen potencias de base distinta.',
};

// The validator rejects the literal text "Opcion B/C/D" as a placeholder, so
// the fixture uses real-looking answer texts instead of a label.
const opt = (letter, isCorrect, fb, n = 1) =>
  `- [${isCorrect ? 'x' : ' '}] ${letter}) Valor numerico ${letter} de la serie ${n}.\n  <!-- feedback: ${fb} -->`;

const fillerQuestion = (n) => `## Question ${n} [D3-D4]
**ID:** ${ID}-v${n}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Enunciado de prueba numero ${n}.

### Opciones
${opt('A', true, FILLER.A, n)}
${opt('B', false, FILLER.B, n)}
${opt('C', false, FILLER.C, n)}
${opt('D', false, FILLER.D, n)}

### Explicacion Pedagogica
Explicacion pedagogica distinta para esta pregunta ${n}, con suficiente longitud
para superar el umbral de detalle exigido por el validador de calidad.`;

const build = (c) => `---
id: "${ID}"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "potencias-numericas"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

## Question 1 [D3-D4]
**ID:** ${ID}-v1
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Enunciado de prueba.

### Opciones
${opt('A', c.correct, c.feedbacks ? c.feedbacks.A : c.fb)}
${opt('B', !c.correct, c.feedbacks ? c.feedbacks.B : (c.correct ? FILLER.B : FILLER.A))}
${opt('C', false, c.feedbacks ? c.feedbacks.C : FILLER.C)}
${opt('D', false, c.feedbacks ? c.feedbacks.D : FILLER.D)}

### Explicacion Pedagogica
La potenciacion eleva una base a un exponente natural, y el resultado indica
cuantas veces se multiplica la base por si misma.

${[2, 3, 4, 5, 6, 7, 8, 9, 10].map(fillerQuestion).join('\n\n')}
`;

let pass = 0;
let fail = 0;

// Runs the validator on the fixture built from `c` and grades it. `expect` is
// 'accept' or 'reject'; `hit` names the error the case must actually trigger,
// because a fixture that fails on collateral damage proves nothing.
function grade(c, hitPattern) {
  fs.writeFileSync(FILE, build(c), 'utf8');
  let verdict = 'accept';
  let msg = '';
  try {
    execFileSync('node', [VALIDATOR, FILE], { cwd: REPO, stdio: 'pipe' });
  } catch (e) {
    verdict = 'reject';
    msg = String(e.stderr || '');
  }
  const hit = hitPattern ? hitPattern.test(msg) : null;
  // the older cases spell it pass/fail, the newer ones accept/reject
  const want = c.expect === 'fail' || c.expect === 'reject' ? 'reject' : 'accept';
  const ok = verdict === want && (want === 'accept' || hit);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(52)} validator=${verdict} (want ${want})`);
  if (ok) pass += 1;
  else {
    fail += 1;
    if (hitPattern) console.log(`      feedback-specific error: ${hit}`);
    console.log(`      msg: ${msg.slice(0, 400).replace(/\n/g, ' | ')}`);
  }
}

try {
  for (const c of cases) grade(c, /option [A-D]: (feedback|missing feedback)/i);
} finally {
  fs.rmSync(FILE, { force: true });
}

// ---------------------------------------------------------------------------
// Duplicate-feedback rule: two wrong options that share a feedback string teach
// the student one thing about two options. CO-ING-4 W04 shipped "Blue is not a
// color of apples" on the option Purple, so the letter was explained and the
// content was not. feedbackProblem cannot see this: each string is a perfectly
// good explanation on its own. It takes two options to see the defect.
// ---------------------------------------------------------------------------
const dupCases = [
  {
    name: 'two wrong options sharing one feedback is rejected',
    expect: 'reject',
    correct: true,
    feedbacks: { A: FILLER.A, B: FILLER.B, C: FILLER.B, D: FILLER.D },
  },
  {
    // Only capitalisation differs. A different capitalisation is not a different
    // explanation, so it must still be one shared string.
    name: 'sharing is case-insensitive, only capitalisation differs',
    expect: 'reject',
    correct: true,
    feedbacks: { A: FILLER.A, B: FILLER.D, C: FILLER.D.toUpperCase(), D: FILLER.C },
  },
  {
    name: 'three wrong options sharing one feedback is rejected',
    expect: 'reject',
    correct: true,
    feedbacks: { A: FILLER.A, B: FILLER.B, C: FILLER.B, D: FILLER.B },
  },
  {
    name: 'all four wrong feedbacks distinct is accepted',
    expect: 'accept',
    correct: true,
    feedbacks: { A: FILLER.A, B: FILLER.B, C: FILLER.C, D: FILLER.D },
  },
  {
    name: 'a wrong option repeating the CORRECT one is accepted',
    // The student may legitimately be told that a distractor matches the right
    // answer. Only two wrong ones sharing a string leaves an option unexplained.
    expect: 'accept',
    correct: true,
    feedbacks: { A: FILLER.A, B: FILLER.A, C: FILLER.C, D: FILLER.D },
  },
];

for (const c of dupCases) grade(c, /share the same feedback/i);
// ---------------------------------------------------------------------------
// checkExplanation had kept a bare character floor after v5.3 taught feedbackProblem
// to judge by meaning. "F = ma = 2×3 = 6 N" is a complete derivation in sixteen
// characters and 164 El Salvador questions were rejected for exactly that.
// The cases below include the ones that must STILL fail, because widening the
// rule is how an empty section comes back through the front door.
// ---------------------------------------------------------------------------
{
  const { checkExplanation } = await import(path.join(REPO, 'scripts/validate-bundles-v52.mjs'));
  const explCases = [
    ['F = ma = 2×3 = 6 N.', null, 'a complete derivation is the explanation'],
    ['pOH es 11', null, 'a short numeric answer carries its own reasoning'],
    ['v = 6 + 2×5 = 16 m/s', null, 'substituted then evaluated'],
    ['Q_c ≠ K_c', null, 'an inequality is a complete answer'],
    ['', 'explanation-empty', 'a genuinely empty section still fails'],
    ['   ', 'explanation-empty', 'whitespace only is empty'],
    ['Correcto.', 'explanation-empty', 'a bare verdict is not an explanation'],
    ['Revisa el concepto.', 'explanation-empty', 'an instruction to look again is not one'],
  ];
  for (const [body, want, why] of explCases) {
    const got = checkExplanation(body);
    const kind = got ? (got.error || got.warning) : null;
    const ok = kind === want;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${why.padEnd(52)} got=${kind} (want ${want})`);
    if (ok) pass += 1;
    else {
      fail += 1;
      console.log(`      body: ${JSON.stringify(body)}`);
    }
  }
}

const LABEL_FM = `---
id: "${ID}"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "potencias-numericas"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---`;

// buildLabel reuses the fixture's frontmatter verbatim and only swaps the four
// option lines, so a rejection can only come from the option text itself.
const buildLabel = (opts, malform) => {
  const lines = opts
    .map((o, i) => {
      const mark = /\(Correct\)/.test(o) ? 'x' : ' ';
      const text = o.replace(/\s*\(Correct\)\s*$/, '').trim();
      // `malform` names the LETTER whose closing marker must be written wrong
      // -- pass 'B', and the row renders `- [ ] B]`, the shape the gate used to
      // skip. Compare against the letter, not against the already-bracketed
      // form, or the condition is never true and the fixture stays well-formed.
      const close = malform === 'ABCD'[i] ? ']' : ')';
      return `- [${mark}] ${'ABCD'[i]}${close} ${text} <!-- feedback: ${
        mark === 'x'
          ? 'Correcto. La clave selecciona esta opcion del grupo.'
          : `Incorrecto. La clave no selecciona ${text}, que nombra una ranura y no un valor.`
      } -->`;
    })
    .join('\n');
  return `${LABEL_FM}

## Question 1 [D3-D4]
**ID:** ${ID}-v1
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Elija la opcion correcta.

### Opciones
${lines}

### Explicacion Pedagogica
(1) Se aplica potenciacion. (2) El resultado correcta se verifica sustituyendo.

### Evidencia
Fuente: prueba unitaria del gate.
${Array.from({ length: 9 }, (_, k) => fillerQuestion(k + 2)).join('\n')}`;
};

const labelCases = [
  { name: 'labels: Option A / Option C', opts: ['Option A (Correct)', 'Option C', 'Option B', 'Option D'], expect: 'reject' },
  { name: 'labels: Word N', opts: ['Word 2', 'Word 3', 'Word 4', 'Word 1 (Correct)'], expect: 'reject' },
  { name: 'labels: error pointers', opts: ['Different error', 'Wrong error', 'Word 1 (Correct)', 'The error is here'], expect: 'reject' },
  { name: 'labels: Structure N', opts: ['Structure 1 (Correct)', 'Structure 2', 'Structure 3', 'Structure 4'], expect: 'reject' },
  { name: 'real: grammatical categories', opts: ['Noun (Correct)', 'Verb', 'Adjective', 'Adverb'], expect: 'accept' },
  { name: 'real: verb forms', opts: ['Past participle (Correct)', 'Gerund', 'Infinitive', 'Present simple'], expect: 'accept' },
  { name: 'real: bare numbers are values, not slots', opts: ['2 (Correct)', '4', '6', '8'], expect: 'accept' },
  // A row whose marker never closes -- `- [ ] B]` instead of `- [ ] B)` -- was
  // skipped by every parser in the gate, so the bundle reported "expected 4
  // options, found 2" for a question whose four rows were all present. The
  // wrong-delimiter row must be reported as itself.
  { name: 'malformed: unclosed option row B]', opts: ['First', 'Second', 'Third', 'Fourth'], malform: 'B', rule: 'malformed-option-row', expect: 'reject' },
  { name: 'malformed: unclosed option row C]', opts: ['First', 'Second', 'Third', 'Fourth'], malform: 'C', rule: 'malformed-option-row', expect: 'reject' },
];

try {
  for (const c of labelCases) {
    fs.writeFileSync(FILE, buildLabel(c.opts, c.malform), 'utf8');
    let verdict = 'accept';
    let msg = '';
    try {
      execFileSync('node', [VALIDATOR, FILE], { cwd: REPO, stdio: 'pipe' });
    } catch (e) {
      verdict = 'reject';
      msg = String(e.stderr || '');
    }
    // The first block of these can pass for other reasons (filler questions),
    // so require the EXPECTED rule to be the one that fired. Asserting
    // `placeholder` for every case would let a malformed-row rejection pass as
    // a placeholder rejection, which is how a wrong fix looks like a right one.
    const want = c.rule || 'placeholder';
    const hit = new RegExp(want, 'i').test(msg);
    const ok = verdict === c.expect && (c.expect === 'accept' || hit);
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(52)} validator=${verdict} (want ${c.expect})`);
    if (ok) pass += 1;
    else {
      fail += 1;
      console.log(`      msg: ${msg.slice(0, 300).replace(/\n/g, ' | ')}`);
    }
  }
} finally {
  fs.rmSync(FILE, { force: true });
}

// ---------------------------------------------------------------------------
// Duplicate Question Collision Gate: intra-bundle and cross-bundle duplicates.
// ---------------------------------------------------------------------------
const dupQuestionCases = [
  {
    name: 'intra-bundle duplicate question is rejected',
    expect: 'reject',
    hit: /duplicate-question/i,
    buildContent: () => {
      const q1 = fillerQuestion(1);
      const rest = [3, 4, 5, 6, 7, 8, 9, 10].map(fillerQuestion).join('\n\n');
      const q2Dup = q1.replace('## Question 1', '## Question 2').replace(`ID: ${ID}-v1`, `ID: ${ID}-v2`);
      return `${LABEL_FM}\n\n${q1}\n\n${q2Dup}\n\n${rest}`;
    },
  },
  {
    name: 'cross-bundle PR-vs-main duplicate question is rejected',
    expect: 'reject',
    hit: /duplicate-question/i,
    buildContent: () => {
      const q1Copy = `## Question 1 [D3-D4]
**ID:** ${ID}-v1
**Bloom:** Remember
**ICFES:** Lexico
**Expected_Success:** 0.80
**Contexto:** Choose the correct English word for the given definition.

### Enunciado
What is the English word for: "A place where you live or stay on holiday."

### Opciones
- [x] D) accommodation
  <!-- feedback: Correct! 'accommodation' is the word for a place where you live or stay on holiday. -->
- [ ] A) transportation
  <!-- feedback: 'transportation' is the system of moving people or goods between places, not the place you sleep in itself. -->
- [ ] B) entertainment
  <!-- feedback: 'entertainment' is whatever amuses you, such as a show or a game, and not somewhere to live. -->
- [ ] C) currency
  <!-- feedback: 'currency' is the money a country uses, such as pesos or dollars, and not a building you can stay in. -->

### Explicacion Pedagogica
The word 'accommodation' is used to describe a place where you live or stay on holiday. This is an important vocabulary word in English.`;
      const rest = [2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `## Question ${n} [D3-D4]
**ID:** ${ID}-v${n}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Unique question stem number ${n} for testing non duplication.

### Opciones
- [x] A) Unique option A for Q${n}
  <!-- feedback: Correcto. Opcion A es la correcta para Q${n}. -->
- [ ] B) Unique option B for Q${n}
  <!-- feedback: Incorrecto. Opcion B no es correcta para Q${n}. -->
- [ ] C) Unique option C for Q${n}
  <!-- feedback: Incorrecto. Opcion C no es correcta para Q${n}. -->
- [ ] D) Unique option D for Q${n}
  <!-- feedback: Incorrecto. Opcion D no es correcta para Q${n}. -->

### Explicacion Pedagogica
Explicacion pedagogica con suficiente detalle para superar las validaciones de calidad.`);
      return `${LABEL_FM}\n\n${q1Copy}\n\n${rest.join('\n\n')}`;
    },
  },
  {
    name: 'non-duplicate bundle with unique questions is accepted',
    expect: 'accept',
    hit: null,
    buildContent: () => {
      const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `## Question ${n} [D3-D4]
**ID:** ${ID}-v${n}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Unique question stem number ${n} for testing non duplication.

### Opciones
- [x] A) Unique option A for Q${n}
  <!-- feedback: Correcto. Opcion A es la correcta para Q${n}. -->
- [ ] B) Unique option B for Q${n}
  <!-- feedback: Incorrecto. Opcion B no es correcta para Q${n}. -->
- [ ] C) Unique option C for Q${n}
  <!-- feedback: Incorrecto. Opcion C no es correcta para Q${n}. -->
- [ ] D) Unique option D for Q${n}
  <!-- feedback: Incorrecto. Opcion D no es correcta para Q${n}. -->

### Explicacion Pedagogica
Explicacion pedagogica con suficiente detalle para superar las validaciones de calidad.`);
      return `${LABEL_FM}\n\n${questions.join('\n\n')}`;
    },
  },
];

try {
  for (const c of dupQuestionCases) {
    fs.writeFileSync(FILE, c.buildContent(), 'utf8');
    let verdict = 'accept';
    let msg = '';
    try {
      execFileSync('node', [VALIDATOR, FILE], { cwd: REPO, stdio: 'pipe' });
    } catch (e) {
      verdict = 'reject';
      msg = String(e.stderr || '');
    }
    const hit = c.hit ? c.hit.test(msg) : true;
    const ok = verdict === c.expect && hit;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(52)} validator=${verdict} (want ${c.expect})`);
    if (ok) pass += 1;
    else {
      fail += 1;
      console.log(`      msg: ${msg.slice(0, 300).replace(/\n/g, ' | ')}`);
    }
  }
} finally {
  fs.rmSync(FILE, { force: true });
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
