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
  {
    // Regression: the hash used to ignore the contexto, so two questions whose
    // data lived only in the contexto were rejected as duplicates of each other.
    name: 'same stem+options but different contexto is accepted',
    expect: 'accept',
    hit: null,
    buildContent: () => {
      const build = (n, contexto) => `## Question ${n} [D5-D6]
**ID:** ${ID}-v${n}
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.80
**Contexto:** ${contexto}

### Enunciado
%Cuantos animales tiene el granjero en total?

### Opciones
- [x] A) 5
  <!-- feedback: Correcto. La suma de los animales del contexto da 5. -->
- [ ] B) 4
  <!-- feedback: Incorrecto.olvidaste sumar una de las dos cantidades del contexto. -->
- [ ] C) 6
  <!-- feedback: Incorrecto. agregaste un animal de mas al total del contexto. -->
- [ ] D) 1
  <!-- feedback: Incorrecto. restaste en lugar de sumar los animales del contexto. -->

### Explicacion Pedagogica
La suma de los animales del contexto da el total que pide la pregunta.`;
      const fillers = [3, 4, 5, 6, 7, 8, 9, 10].map((n) => `## Question ${n} [D5-D6]
**ID:** ${ID}-v${n}
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.80
**Contexto:** Contexto de relleno numero ${n} para completar el bundle.

### Enunciado
Enunciado de relleno numero ${n} para completar el bundle.

### Opciones
- [x] A) Respuesta de relleno ${n}
  <!-- feedback: Correcto. La respuesta de relleno ${n} es la que corresponde a este enunciado. -->
- [ ] B) Distractor de relleno ${n} uno
  <!-- feedback: Incorrecto. este distractor no corresponde al enunciado de relleno ${n}. -->
- [ ] C) Distractor de relleno ${n} dos
  <!-- feedback: Incorrecto. esta opcion no responde a lo que pide el enunciado ${n}. -->
- [ ] D) Distractor de relleno ${n} tres
  <!-- feedback: Incorrecto. esta ultima opcion tampoco corresponde al enunciado ${n}. -->

### Explicacion Pedagogica
Explicacion pedagogica con suficiente detalle para superar las validaciones de calidad del gate.`);
      return `${LABEL_FM}\n\n${[build(1, 'El granjero tiene 3 vacas y 2 ovejas.'), build(2, 'El granjero tiene 3 vacas y 3 ovejas.'), ...fillers].join('\n\n')}`;
    },
  },
  {
    // Regression: join('|') was ambiguous, so a literal pipe inside a stem or an
    // option could be moved across the boundary and produce the same key.
    name: 'pipe inside a stem is not a duplicate of a moved pipe',
    expect: 'accept',
    hit: null,
    buildContent: () => {
      const opts = (a, b) => `- [x] A) ${a}
  <!-- feedback: Correcto. ${a} es la opcion correcta en este caso. -->
- [ ] B) ${b}
  <!-- feedback: Incorrecto. ${b} no corresponde a lo que pide la pregunta. -->
- [ ] C) otra opcion distinta para esta pregunta
  <!-- feedback: Incorrecto. esta opcion no responde a lo que pide el enunciado. -->
- [ ] D) una ultima opcion mas para cerrar las cuatro
  <!-- feedback: Incorrecto. esta opcion tampoco corresponde a la pregunta. -->`;
      const one = `## Question 1 [D5-D6]
**ID:** ${ID}-v1
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.80
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Calcula a|b para el caso uno.

### Opciones
${opts('valor inicial', 'valor final')}

### Explicacion Pedagogica
La operacion con el separador vertical se explica en detalle para superar la validacion de calidad.`;
      const two = `## Question 2 [D5-D6]
**ID:** ${ID}-v2
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.80
**Contexto:** Contexto de prueba en Bogota.

### Enunciado
Calcula a para el caso b.

### Opciones
${opts('valor inicial|b', 'valor final')}

### Explicacion Pedagogica
La operacion con el separador vertical se explica en detalle para superar la validacion de calidad.`;
      const fillers = [3, 4, 5, 6, 7, 8, 9, 10].map((n) => `## Question ${n} [D5-D6]
**ID:** ${ID}-v${n}
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.80
**Contexto:** Contexto de relleno numero ${n} para completar el bundle.

### Enunciado
Enunciado de relleno numero ${n} para completar el bundle.

### Opciones
- [x] A) Respuesta de relleno ${n}
  <!-- feedback: Correcto. La respuesta de relleno ${n} es la que corresponde a este enunciado. -->
- [ ] B) Distractor de relleno ${n} uno
  <!-- feedback: Incorrecto. este distractor no corresponde al enunciado de relleno ${n}. -->
- [ ] C) Distractor de relleno ${n} dos
  <!-- feedback: Incorrecto. esta opcion no responde a lo que pide el enunciado ${n}. -->
- [ ] D) Distractor de relleno ${n} tres
  <!-- feedback: Incorrecto. esta ultima opcion tampoco corresponde al enunciado ${n}. -->

### Explicacion Pedagogica
Explicacion pedagogica con suficiente detalle para superar las validaciones de calidad del gate.`);
      return `${LABEL_FM}\n\n${[one, two, ...fillers].join('\n\n')}`;
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

// duplicate-ignoring-context: two questions that differ ONLY in the Contexto
// line are the same question to a student. The Contexto names a school and a
// student's first name, and none of that changes what is being asked.
//
// This fixture is built from the defect rather than from a passing bundle: both
// questions carry the identical stem and the identical four options, and only
// the school, the city and the student name move. If the fixture were built
// from a real bundle instead, a change in the stem would make the two questions
// legitimately different and the case would pass for the wrong reason.
// `optionsB` defaults to `options`, so the rejecting case passes one set and the
// accepting case passes two distinct ones. Building the pair from the real
// defect shape, rather than copying a passing bundle, is what keeps the second
// case honest: if the options were identical the pair would be a duplicate and
// the case would pass for the wrong reason.
// The fixture has to carry the number of questions its frontmatter declares, or
// the expected-count check rejects the file before the duplicate rules are ever
// consulted -- and the case would pass or fail for a reason that has nothing to
// do with the rule under test. LABEL_FM declares 10, so eight unique fillers
// stand in for the questions that are not part of the pair.
const FILLERS = [1, 2, 3, 4, 5, 6, 7, 8].map(
  (n) => `## Question ${n + 2} [D5-D6]\n**ID:** ${ID}-v${n + 2}\n**Bloom:** Remember\n**ICFES:** Numerico\n**Expected_Success:** 0.90\n**Contexto:** Contexto de relleno numero ${n} para completar el bundle.\n\n### Enunciado\nEnunciado de relleno numero ${n} para completar el bundle.\n\n### Opciones\n- [x] A) Respuesta de relleno ${n}\n  <!-- feedback: Correcto. La respuesta de relleno ${n} es la que corresponde a este enunciado. -->\n- [ ] B) Distractor de relleno ${n} uno\n  <!-- feedback: Incorrecto. este distractor no corresponde al enunciado de relleno ${n}. -->\n- [ ] C) Distractor de relleno ${n} dos\n  <!-- feedback: Incorrecto. esta opcion no responde a lo que pide el enunciado ${n}. -->\n- [ ] D) Distractor de relleno ${n} tres\n  <!-- feedback: Incorrecto. esta ultima opcion tampoco corresponde al enunciado ${n}. -->\n\n### Explicacion Pedagogica\nExplicacion pedagogica con suficiente detalle para superar las validaciones de calidad del gate.`
);

const buildCtxPair = (ctxA, ctxB, stemLine, options, optionsB = options) => {
  const q = (n, ctx, opts) =>
    `## Question ${n} [D3-D4]\n` +
    `**ID:** ${ID}-v${n}\n` +
    `**Bloom:** Apply\n` +
    `**ICFES:** Numerico\n` +
    `**Expected_Success:** 0.80\n` +
    `**Contexto:** ${ctx}\n` +
    `### Enunciado\n${stemLine}\n\n` +
    `### Opciones\n` +
    opts
      .map((o, i) => {
        const mark = i === 0 ? 'x' : ' ';
        return `- [${mark}] ${'ABCD'[i]}) ${o.text} <!-- feedback: ${o.fb} -->`;
      })
      .join('\n') +
    `\n\n### Explicacion Pedagogica\nExplicacion pedagogica de la pregunta ${n}, con suficiente longitud para superar el umbral de detalle exigido por el validador de calidad.\n\n`;
  return `${LABEL_FM}\n\n${[q(1, ctxA, options), q(2, ctxB, optionsB), ...FILLERS].join('\n\n')}`;
};

const SAME_OPTIONS = [
  { text: '$x = 4$', fb: 'Correcto. Al restar 3 y dividir entre 2 se obtiene exactamente 4.' },
  { text: '$x = -2$', fb: 'Incorrecto. Produce argumentos negativos en el logaritmo original, asi que no es valida.' },
  { text: '$x = 2$', fb: 'Incorrecto. Si x = 2, el segundo logaritmo es log de cero, que no esta definido en reales.' },
  { text: '$x = 8$', fb: 'Incorrecto. No satisface la igualdad al sustituirla en los dos logaritmos a la vez.' },
];

const LOG_STEM = 'Resuelva la ecuacion logaritmica: log_2(x) + log_2(x - 2) = 3. Cual es la unica solucion real de x?';

const ctxCases = [
  {
    name: 'same stem and options, only the school in Contexto differs',
    expect: 'reject',
    hit: /duplicate-ignoring-context/,
    content: () =>
      buildCtxPair(
        'En la clase del Colegio Nacional Potosi de Oruro, el estudiante Ramiro investiga.',
        'En la clase del Colegio Nacional Trinidad de Cobija, el estudiante Jaime investiga.',
        LOG_STEM,
        SAME_OPTIONS
      ),
  },
  {
    name: 'same stem, DIFFERENT options, only Contexto differs: legit',
    expect: 'accept',
    hit: /duplicate-ignoring-context/,
    content: () =>
      buildCtxPair(
        'En la clase del Colegio Nacional Potosi de Oruro, el estudiante Ramiro investiga.',
        'En la clase del Colegio Nacional Trinidad de Cobija, el estudiante Jaime investiga.',
        // Same generic stem for both, but each question gets its own arithmetic
        // in the options -- which is exactly how the twenty inequation questions
        // in PR-MAT-11-W07 are legitimately different despite one shared stem.
        'Resuelva la ecuacion de primer grado. Cual es el valor de x?',
        [
          { text: '$x = 4$', fb: 'Correcto. Al restar 3 y dividir entre 2 se obtiene exactamente 4.' },
          { text: '$x = -2$', fb: 'Incorrecto. Produce argumentos negativos en el logaritmo original, asi que no es valida.' },
          { text: '$x = 2$', fb: 'Incorrecto. Si x = 2, el segundo logaritmo es log de cero, que no esta definido en reales.' },
          { text: '$x = 8$', fb: 'Incorrecto. No satisface la igualdad al sustituirla en los dos logaritmos a la vez.' },
        ],
        // The second question's options differ; without this the pair would be a
        // duplicate and the case would pass for the wrong reason.
        [
          { text: '$x = 3$', fb: 'Correcto. Al restar 5 y dividir entre 3 se obtiene exactamente 3.' },
          { text: '$x = -1$', fb: 'Incorrecto. Produce argumentos negativos en el logaritmo original, asi que no es valida.' },
          { text: '$x = 5$', fb: 'Incorrecto. Si x = 5, el segundo logaritmo es log de cero, que no esta definido en reales.' },
          { text: '$x = 7$', fb: 'Incorrecto. No satisface la igualdad al sustituirla en los dos logaritmos a la vez.' },
        ]
      ),
  },
];

// The exclusion is the interesting half. When the Contexto carries the data the
// question needs, the same stem and the same options are two different questions
// and the rule must stay silent. Without this case, tightening the rule to "same
// stem and options is always a duplicate" would pass, and would be wrong: it
// would reject the granjero case an earlier regression test already protects.
ctxCases.push({
  name: 'same stem+options, Contexto carries different data: accepted',
  expect: 'accept',
  hit: /duplicate-ignoring-context/,
  content: () =>
    buildCtxPair(
      'El granjero tiene 3 vacas y 2 ovejas.',
      'El granjero tiene 3 vacas y 3 ovejas.',
      'Cuantos animales tiene el granjero en total?',
      [
        { text: '5', fb: 'Correcto. La suma de los animales del contexto da exactamente 5 en total.' },
        { text: '4', fb: 'Incorrecto. Olvidaste sumar una de las dos cantidades que da el contexto.' },
        { text: '6', fb: 'Incorrecto. Agregaste un animal de mas al total que reporta el contexto.' },
        { text: '1', fb: 'Incorrecto. Restaste en lugar de sumar los animales que menciona el contexto.' },
      ]
    ),
});

// foreign-script: a generator leaked its own alphabet into Spanish prose. The
// bundle keeps its four options, its feedback and its lengths, so every shape
// rule passes and it ships. The corruption is only visible to a reader.
//
// The cases use the exact shapes found in the corpus, not synthetic stand-ins:
// a Cyrillic verb sitting in a Spanish option, and a CJK token inside an
// otherwise Spanish Contexto. The literals below are the real corrupted
// strings rather than synthetic stand-ins, written directly instead of escaped
// so the next person to debug this can see what the defect actually looked like.
const foreignScriptCases = [
  {
    name: 'Cyrillic verb inside a Spanish option is rejected',
    expect: 'reject',
    rule: /foreign-script/,
    buildContent: () =>
      buildCtxPair(
        'El autor del texto argumenta sobre la posicion del gobierno en la ciudad.',
        'Otra aula analiza el mismo texto.',
        'Cual es la tesis del autor?',
        [
          { text: 'La autonomia regional se respeta', fb: 'Correcto. El texto defiende que la autonomia se respeta en la region.' },
          { text: 'многочисленный', fb: 'Incorrecto. Esta palabra esta en cirilico y no pertenece a ningun enunciado en espanol.' },
          { text: 'El centralismo se aplica', fb: 'Incorrecto. El texto se opone al centralismo, no lo defiende.' },
          { text: 'La constitution se ignora', fb: 'Incorrecto. La constitution es lo que el autor respaldo en su argumento.' },
        ]
      ),
  },
  {
    name: 'CJK token in the Contexto is rejected',
    expect: 'reject',
    rule: /foreign-script/,
    buildContent: () =>
      buildCtxPair(
        'La docente de espanol pregunta a sus estudiantes que espera del texto. 有效期 en la pizarra.',
        'Otra aula analiza el mismo texto.',
        'Que postura asume el autor?',
        [
          { text: 'A favor del cambio', fb: 'Correcto. El autor apoya el cambio y lo defiende con argumentos.' },
          { text: 'En contra del cambio', fb: 'Incorrecto. El autor no se opone, construye un argumento a favor.' },
          { text: 'Neutral', fb: 'Incorrecto. El autor toma partido, no se mantiene neutral ante el cambio.' },
          { text: 'Indiferente', fb: 'Incorrecto. El autor dedica todo el texto a defender una postura, no es indiferente.' },
        ]
      ),
  },
  {
    name: 'accented Spanish and curly quotes are NOT foreign script',
    expect: 'accept',
    rule: /foreign-script/,
    buildContent: () =>
      buildCtxPair(
        'La clase de matematicas de grado 6 en Bogota usa el metodo de casos: \u00bfque le Alvaro? \u00bfDe qu\u00e9\u00ad sirve?',
        'La clase de matematicas de grado 7 en Medellin usa el mismo metodo: \u00bfque le Sara? \u00bfPara qu\u00e9\u00e9 sirve?',
        'Cual es el resultado?',
        [
          { text: 'x = 4', fb: 'Correcto. Al restar 3 y dividir entre 2 se obtiene exactamente 4.' },
          { text: 'x = -2', fb: 'Incorrecto. Produce argumentos negativos en el logaritmo original, asi que no es valida.' },
          { text: 'x = 2', fb: 'Incorrecto. Si x = 2, el segundo logaritmo es log de cero, que no esta definido en reales.' },
          { text: 'x = 8', fb: 'Incorrecto. No satisface la igualdad al sustituirla en los dos logaritmos a la vez.' },
        ]
      ),
  },
];

// glued-token: a model that drifted mid-generation splices a fragment of
// another word into the prose. The bundle keeps its shape, so nothing else sees
// it. These are the exact strings found in the corpus, not invented ones.
const gluedTokenCases = [
  {
    name: 'glued capitals inside a Spanish option are rejected (real corpus string)',
    expect: 'reject',
    rule: /glued-token/,
    buildContent: () =>
      buildCtxPair(
        'Un grupo de estudiantes de grado 11 debate una tesis en el aula de Barranquilla.',
        'Otra aula analiza el mismo texto.',
        'Que rasgo tiene el argumento del autor?',
        [
          { text: 'Pondera un riesgo contra un costo', fb: 'Correcto. La comparacion de magnitudes es un argumento tipico de la deliberacion.' },
          { text: 'Una tesis general resulta m\u00e1sTZ inclusiva', fb: 'Incorrecto. La palabra tiene un fragmento en mayusculas pegado al final y no es espanol.' },
          { text: 'Afirma sin matizar', fb: 'Incorrecto. El texto matiza cada afirmacion, no las presenta como definitivas.' },
          { text: 'Recurre a la emotion', fb: 'Incorrecto. Apoyarse en la emocion es un recurso apelativo, no deliberativo.' },
        ]
      ),
  },
  {
    name: 'a real English acronym and a normal word are NOT glued tokens',
    expect: 'accept',
    rule: /glued-token/,
    buildContent: () =>
      buildCtxPair(
        'The ONG filed report 14 about the NASA launch scheduled for March from Bogota.',
        'The ONG filed report 27 about the NASA launch scheduled for August from Medellin.',
        'What does the report say?',
        [
          { text: 'The ONG deployed a new satellite', fb: 'Correct. The verb deployed describes putting the satellite in use, and the acronym ONG is a normal uppercase run at the start of a token.' },
          { text: 'The NGO studied a Star', fb: 'Incorrect. A star is a celestial body, which is not what the text says was launched.' },
          { text: 'The ONG built a bridge', fb: 'Incorrect. The report describes a satellite launch, not construction work of any kind.' },
          { text: 'The ONG found a fossil', fb: 'Incorrect. Fossils are not mentioned anywhere in the report at all.' },
        ]
      ),
  },
];

try {
  // A case may carry content as a string (already written out) or as
   // buildContent, a function that assembles it. Keep whichever it has.
   
// option-letters: four options must be A, B, C, D once each. A model that drifts
// mid-option writes two rows with the same letter, and every other rule passes:
// four rows, four feedbacks, one correct marker. The strings here are the exact
// shapes found in the corpus (CABC, BABC, ABDD).
const buildWithLetters = (letters) => {
  const ctx = 'Estudiantes de San Miguel discuten la constitucion de 1821.';
  const stemLine = 'Que principio inspira esa constitucion?';
  const options = [
    { text: 'La soberania popular', fb: 'Correcto. La soberania del pueblo ordena todo el documento.' },
    { text: 'La herededad del trono', fb: 'Incorrecto. La nobleza por nacimiento no es fuente de autoridad.' },
    { text: 'El comercio sin tasa', fb: 'Incorrecto. Esa exoneracion pertenece a otras leyes posteriores.' },
    { text: 'La union con Guatemala', fb: 'Incorrecto. La union con Guatemala es un episodio posterior.' },
  ];
  const q = (n, ctxLine, ls) =>
    `## Question ${n} [D3-D4]\n` +
    `**ID:** ${ID}-v${n}\n` +
    `**Bloom:** Apply\n` +
    `**ICFES:** Numerico\n` +
    `**Expected_Success:** 0.80\n` +
    `**Contexto:** ${ctxLine}\n` +
    `### Enunciado\n${stemLine}\n\n` +
    `### Opciones\n` +
    options
      .map((o, i) => {
        const mark = ls[i] === 'A' ? 'x' : ' ';
        return `- [${mark}] ${ls[i]}) ${o.text} <!-- feedback: ${o.fb} -->`;
      })
      .join('\n') +
    `\n\n### Explicacion Pedagogica\nExplicacion pedagogica de la pregunta ${n}, con suficiente longitud para superar el umbral de detalle exigido por el validador de calidad.\n\n`;
  return `${LABEL_FM}\n\n${[q(1, ctx, letters.slice(0, 4)), q(2, 'Otra aula trabaja la misma fecha.', 'ABCD'), ...FILLERS].join('\n\n')}`;
};

const optionLetterCases = [
  {
    name: 'two options sharing the letter C is rejected',
    expect: 'reject',
    rule: /option-letters/,
    buildContent: () => buildWithLetters('CABC'),
  },
  {
    name: 'two options sharing the letter D is rejected',
    expect: 'reject',
    rule: /option-letters/,
    buildContent: () => buildWithLetters('ABDD'),
  },
  {
    name: 'four options labelled A B C D are accepted',
    expect: 'accept',
    rule: /option-letters/,
    buildContent: () => buildWithLetters('ABCD'),
  },
  {
    // Regression guard. The first version of this rule tested "letters != ABCD",
    // which flagged every reordered question in the corpus -- 4160 hits in 334
    // files that had never been broken. A permutation still addresses each
    // option uniquely, so it must stay silent; only a repeated letter is a defect.
    name: 'options in a different order (D C B A) are accepted: permutation is not a defect',
    expect: 'accept',
    rule: /option-letters/,
    buildContent: () => buildWithLetters('DCBA'),
  },
  {
    name: 'options in a different order (B A C D) are accepted: permutation is not a defect',
    expect: 'accept',
    rule: /option-letters/,
    buildContent: () => buildWithLetters('BACD'),
  },
];


// tema-coherente: a bundle whose tema is not about vocabulary must not be filled
// with "What is the English word for: ..." questions. 187 bundles were named
// past-continuous or reported-speech while carrying a full travel-vocabulary
// set; nothing caught them because the twenty questions are distinct from each
// other, so every intra-file rule stayed silent.
const VOCAB_POOL = [
  ['accommodation', 'a place where you live or stay on holiday'],
  ['itinerary', 'a detailed plan or route of a journey'],
  ['destination', 'the place to which someone is going'],
  ['luggage', 'suitcases or other bags for personal belongings'],
  ['passenger', 'a traveller on a public or private conveyance'],
  ['boarding', 'the act of getting onto a ship or an aircraft'],
  ['excursion', 'a short journey made for pleasure or study'],
  ['voyage', 'a long journey made by sea or in space'],
];

// A vocabulary bundle whose tema IS about vocabulary must stay silent, and its
// twenty questions must be distinct so duplicate-question does not fire first.
const buildVocabBundle = (tema, count) => {
  const q = (n) => {
    const [w, d] = VOCAB_POOL[n % VOCAB_POOL.length];
    const others = VOCAB_POOL.filter((p) => p[0] !== w).slice(n % 3, n % 3 + 3).map((p) => p[0]);
    while (others.length < 3) others.push('currency');
    const opts = [w, ...others];
    const rows = opts
      .map((o, i) => `- [${i === 0 ? 'x' : ' '}] ${'ABCD'[i]}) ${o} <!-- feedback: ${i === 0
        ? `Correcto. '${w}' nombra exactamente ${d}, que es lo que pide la consigna de esta pregunta.`
        : `Incorrecto. '${o}' no corresponde a ${d}, asi que no encaja con la definicion que se da aqui.`} -->`)
      .join('\n');
    return `## Question ${n} [D3-D4]\n**ID:** VOC-${n}-v1\n**Bloom:** Remember\n**ICFES:** Literal\n**Expected_Success:** 0.80\n**Contexto:** English class in San Salvador, SV.\n\n### Enunciado\nWhat is the English word for: "${d}"?\n\n### Opciones\n${rows}\n\n### Explicacion Pedagogica\nLa palabra '${w}' designa ${d}, y esta consigna pide precisamente ese concepto y no otro.\n\n`;
  };
  const fm = LABEL_FM
    .replace('tema: "potencias-numericas"', `tema: "${tema}"`)
    .replace('total_questions: 10', `total_questions: ${count}`)
    .replace('bundle_size: 10', `bundle_size: ${count}`);
  const qs = [];
  for (let i = 1; i <= count; i++) qs.push(q(i));
  return `${fm}\n\n${qs.join('')}`;
};


// Ten non-vocabulary questions, so a mixed bundle can be built.
const buildNonVocabBundle = (count) => {
  const subjects = ['They ___ when the storm broke.', 'She was painting the wall when the phone rang.',
    'I had been waiting for an hour before the bus arrived.', 'We were walking home when it started to rain.',
    'He had finished the report before the meeting began.', 'The children were playing outside while it poured.',
    'She had been studying all morning before the exam started.'];
  const q = (n) => {
    const stem = subjects[n % subjects.length];
    const right = n % 2 ? 'were going' : 'had been going';
    const opts = [right, 'was going', 'have gone', 'would go'];
    const rows = opts.map((o, i) => `- [${i === 0 ? 'x' : ' '}] ${'ABCD'[i]}) ${o} <!-- feedback: ${i === 0
      ? `Correcto. '${o}' mantiene el pasado continuo que exige esta oracion con el marco temporal.`
      : `Incorrecto. '${o}' no encaja con la construccion de pasado continuo que pide esta consigna.`} -->`).join('\n');
    return `## Question ${n} [D3-D4]\n**ID:** PC-${n}-v1\n**Bloom:** Apply\n**ICFES:** Literal\n**Expected_Success:** 0.80\n**Contexto:** English class in ${['Santa Ana', 'Soyapango', 'Mejicanos', 'San Miguel'][n % 4]}, SV.\n\n### Enunciado\nChoose the option that completes correctly: '${stem}'\n\n### Opciones\n${rows}\n\n### Explicacion Pedagogica\nEn la consigna ${n} el marco temporal es el pasado continuo: 'was' o 'were' mas gerundio, con una accion en curso que otra la interrumpe.\n\n`;
  };
  const fm = LABEL_FM.replace('total_questions: 10', `total_questions: ${count}`).replace('bundle_size: 10', `bundle_size: ${count}`);
  const qs = [];
  for (let i = 1; i <= count; i++) qs.push(q(i));
  return `${fm}\n\n${qs.join('')}`;
};

const temaCoherentCases = [
  {
    name: 'a past-continuous bundle filled with vocabulary questions is rejected',
    expect: 'reject',
    rule: /tema-coherente/,
    buildContent: () => buildVocabBundle('past-continuous', 20),
  },
  {
    name: 'a reported-speech bundle filled with vocabulary questions is rejected',
    expect: 'reject',
    rule: /tema-coherente/,
    buildContent: () => buildVocabBundle('reported-speech-statements', 20),
  },
  {
    // Regression guard for the 31 bundles that are genuinely about vocabulary.
    // They carry the same twenty questions and must never be flagged.
    // total_questions is fixed at 10 by the validator, so this fixture carries
    // exactly ten vocabulary questions: at the threshold, and the declared tema
    // is about vocabulary, so the rule must stay silent.
    name: 'a vocabulary-travel bundle filled with the same questions is accepted',
    expect: 'accept',
    rule: /tema-coherente/,
    buildContent: () => buildVocabBundle('vocabulary-travel', 10),
  },
  {
    name: 'a bundle with only 3 vocabulary questions is accepted: the threshold is 10',
    expect: 'accept',
    rule: /tema-coherente/,
    // Ten questions, only three of them vocabulary: below the threshold, so the
    // rule stays silent even though the declared tema is past-continuous.
    buildContent: () => {
      const vocab = buildVocabBundle('past-continuous', 3);
      const nonVocab = buildNonVocabBundle(7);
      const fm = vocab.slice(0, vocab.indexOf('## Question'))
        .replace('total_questions: 3', 'total_questions: 10')
        .replace('bundle_size: 3', 'bundle_size: 10');
      const blocks = [...vocab.slice(vocab.indexOf('## Question')).split(/(?=## Question )/),
                     ...nonVocab.slice(nonVocab.indexOf('## Question')).split(/(?=## Question )/)];
      let i = 0;
      const renumbered = blocks
        .filter(Boolean)
        .map((b) => b.replace(/## Question \d+/, `## Question ${++i}`).replace(/ID:\s*\S+-(\d+)-v\d+/, `ID: X-${i}-v1`));
      return fm + renumbered.join('');
    },
  },
];

const allCases = [...ctxCases, ...foreignScriptCases, ...gluedTokenCases, ...optionLetterCases, ...temaCoherentCases].map((c) => ({
     ...c,
     // ctxCases carries its expectation in `rule` as a plain string; the newer
     // blocks carry it as a RegExp. Only fill `hit` when the case did not set
     // one, so an existing string is not overwritten with undefined.
     hit: c.hit ?? c.rule,
     content: c.content ?? c.buildContent,
   }));
   for (const c of allCases) {
    fs.writeFileSync(FILE, c.content(), 'utf8');
    let verdict = 'accept';
    let msg = '';
    try {
      execFileSync('node', [VALIDATOR, FILE], { cwd: REPO, stdio: 'pipe' });
    } catch (e) {
      verdict = 'reject';
      msg = String(e.stderr || '');
    }
    // A rejecting case must name the rule it is testing. An accepting case must
    // NOT mention it at all: the risk there is a rule that fires when it should
    // not, so the assertion is the absence of the rule, not its presence.
    // Asserting the presence on both sides is what made these two fail with
    // validator=accept -- the right verdict, the wrong assertion.
    const mentions = c.hit ? c.hit.test(msg) : false;
    const ok = c.expect === 'reject' ? verdict === 'reject' && mentions : verdict === 'accept' && !mentions;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.name.padEnd(52)} validator=${verdict} (want ${c.expect}) rule=${c.hit && mentions ? 'fired' : 'silent'}`);
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
