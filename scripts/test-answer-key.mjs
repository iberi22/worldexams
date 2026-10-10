#!/usr/bin/env node
/**
 * Gate proof for the answer-key rules (#1653, #1637, #1633).
 *
 * A test that cannot fail is worse than no test, so every case here names the
 * behaviour it pins and the cases that must stay silent are asserted as silence:
 * the risk in this rule is a gate that shouts at sound content, and asserting the
 * presence of an error on both sides cannot see that.
 *
 * Two levels, on purpose:
 *   - unit: the exported predicates, run against the exact strings that were
 *     measured against the corpus (real feedback, real self-limiting feedback,
 *     real error-hunting stems). Fast, and it fails if the rule is dropped.
 *   - end to end: four real runs of the validator over real fixture bundles, so
 *     a rule that exists but is never called cannot pass.
 *
 * Fixtures are written under questions_data/ because the validator requires
 * every file it reads to live there, under a per-run name, and are removed in
 * the finally block: nothing that ships is ever touched.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const VALIDATOR = path.join(REPO, 'scripts/validate-bundles-v52.mjs');
const DIR = path.join(REPO, 'questions_data/colombia/matematicas/grado-6/2026/weekly');
const RUN = `zz-answer-key-fixture-${process.pid}-${Date.now()}`;

let pass = 0;
let fail = 0;
const failures = [];

function check(name, ok, detail) {
  if (ok) {
    pass++;
    console.log(`PASS  ${name}`);
  } else {
    fail++;
    failures.push(name);
    console.log(`FAIL  ${name}${detail ? `\n      ${detail}` : ''}`);
  }
}

// ---------------------------------------------------------------------------
// Unit level: the predicates, imported from the validator itself.
// ---------------------------------------------------------------------------
const mod = await import(pathToFileURL(VALIDATOR).href);
const EXPORTS = ['feedbackVerdict', 'checkAnswerKeyVerdicts', 'checkAnswerLetterBias', 'detectRepeatedAnswerKeys'];
const missing = EXPORTS.filter((name) => typeof mod[name] !== 'function');
check('validator exports the answer-key predicates', missing.length === 0, missing.join(', '));
const feedbackVerdict = mod.feedbackVerdict;
const checkAnswerKeyVerdicts = mod.checkAnswerKeyVerdicts;
const checkAnswerLetterBias = mod.checkAnswerLetterBias;
const detectRepeatedAnswerKeys = mod.detectRepeatedAnswerKeys;

// --- #1653: does a feedback assert that its option is right or wrong? -------
const verdictCases = [
  // [feedback, expected verdict]
  ['Correcto. La conclusion cierra el razonamiento y deja fijada la tesis.', 'positive'],
  ['Correcto: presentar un alcance limitado como si fuera general debilita el texto.', 'positive'],
  ['Incorrecto. La conclusion no introduce contenido nuevo.', 'negative'],
  ['Incorrect. Present tense.', 'negative'],
  ['Correct! Finally is the adverb indicating that something happened.', 'positive'],
  ['Es correcta porque repite los dias y la hora que aparecen en el aviso.', 'positive'],
  ['Es incorrecta porque esos dos dias no aparecen escritos en el aviso.', 'negative'],
  // The verdict word closes the sentence: this IS an assertion, however it continues.
  ['Correcto. Como la corriente deposita los fragmentos segun su tamano.', 'positive'],
  ['Correcto. En una poblacion pequena el azar produce cambios grandes.', 'positive'],
  // Self-limiting feedback says nothing about which option answers the question.
  // UY-CIE-11-2026-W09/W10 carry ~20 of these and they must stay green.
  ['Correcto como efecto practico, pero no es la propiedad que explica por que es clinicamente util.', null],
  ['Correcto pero no basta por si solo, porque ademas hacen falta las senales de inicio.', null],
  ['Correcto en parte, pero el crecimiento tambien depende del numero de descendientes.', null],
  ['Correcto para el ARN messenger, pero la pregunta se refiere a ADN.', null],
  ['Correcto como fuerza distinta, porque el enunciado describe el intercambio entre poblaciones.', null],
  // No verdict at all: the option cannot be judged either way.
  ['Es la respuesta: la coma abre el inciso pero no hay otra que lo cierre.', null],
  ['La coma se coloca despues de correr en lugar de cerrar el inciso.', null],
  // A word that merely starts like one is not a verdict.
  ['Correctamente escrito, pero no es la propiedad que explica.', null],
];

for (const [fb, want] of verdictCases) {
  const got = feedbackVerdict ? feedbackVerdict(fb) : '<<not exported>>';
  check(`feedbackVerdict: ${JSON.stringify(fb.slice(0, 46))} -> ${want}`, got === want, `got ${got}`);
}

// --- #1653: the per-question rule -------------------------------------------
const opt = (letter, marked, text, fb) =>
  `- [${marked ? 'x' : ' '}] ${letter}) ${text}\n  <!-- feedback: ${fb} -->`;

const question = (stem, rows) =>
  `## Question 1 [D3-D4]\n**ID:** ${RUN}-unit-v1\n**Bloom:** Remember\n` +
  `**ICFES:** Numerico\n**Expected_Success:** 0.90\n**Contexto:** Contexto de prueba.\n\n` +
  `### Enunciado\n${stem}\n\n### Opciones\n${rows.join('\n')}\n\n` +
  `### Explicacion Pedagogica\nExplicacion pedagogica suficientemente larga para el umbral.`;

const SOUND = [
  opt('A', true, 'Valor A', 'Correcto. Es el unico valor que satisface la ecuacion planteada.'),
  opt('B', false, 'Valor B', 'Incorrecto. Ese valor no verifica la igualdad al sustituir la incognita.'),
  opt('C', false, 'Valor C', 'Incorrecto. Ese valor corresponde a otra ecuacion con signo cambiado.'),
  opt('D', false, 'Valor D', 'Incorrecto. Ese valor es el resultado de sumar en lugar de multiplicar.'),
];

const ruleCases = [
  {
    name: '#1653 sound question is not flagged',
    q: question('Cual es el valor de x en la ecuacion?', SOUND),
    want: null,
  },
  {
    name: '#1653 inverted key is flagged',
    q: question('Cual es la funcion de la conclusion?', [
      opt('A', true, 'Presentar informacion nueva', 'Incorrecto. La conclusion no introduce contenido nuevo.'),
      opt('B', false, 'Anticipar los temas', 'Incorrecto. Anticipar el desarrollo es tarea de la introduccion.'),
      opt('C', false, 'Recapitular la postura', 'Correcto: la conclusion cierra el razonamiento y fija la tesis.'),
      opt('D', false, 'Enumerar las fuentes', 'Incorrecto. La enumeracion de fuentes es la referencia.'),
    ]),
    want: 'answer-key-inverted',
  },
  {
    name: '#1653 two options declaring themselves correct is flagged',
    q: question('Cual oracion contiene un error de uso de la coma?', [
      opt('A', false, 'Oracion A', 'Es correcta: las dos comas delimitan un inciso temporal.'),
      opt('B', true, 'Oracion B', 'La coma abre el inciso pero no hay otra que lo cierre.'),
      opt('C', false, 'Oracion C', 'La coma se coloca despues de correr, no donde corresponde.'),
      opt('D', false, 'Oracion D', 'Es correcta: la situacion temporal abre con coma y queda delimitada.'),
    ]),
    want: 'ambiguous-correct-options',
  },
  {
    name: '#1653 error-hunting stem is excluded (option is the defect itself)',
    // CO-LEN-6-2026-W38-v4: the marked option is the misspelled word, so its
    // feedback says "Incorrecto." while the sound words are told "Correcto."
    // and neither verdict is about which option answers the question.
    q: question('Cual de las siguientes palabras esta escrita incorrectamente?', [
      opt('A', false, 'Hielo', 'Correcto. Se escribe con h inicial antes del diptongo ie.'),
      opt('B', false, 'Hueco', 'Correcto. Se escribe con h inicial antes del diptongo ue.'),
      opt('C', false, 'Zanahoria', 'Correcto. Lleva una h intermedia.'),
      opt('D', true, 'Erbol', 'Incorrecto. La palabra correcta es Arbol, con tilde y sin h.'),
    ]),
    want: null,
  },
  {
    name: '#1653 self-limiting feedback is excluded',
    q: question('Cual propiedad explica la utilidad clinica?', [
      opt('A', false, 'Propiedad A', 'Correcto como efecto practico, pero no es la propiedad que explica.'),
      opt('B', true, 'Propiedad B', 'Es correcta porque conserva la funcion en el cuerpo humano.'),
      opt('C', false, 'Propiedad C', 'Es incorrecta porque describe una consecuencia, no la funcion.'),
      opt('D', false, 'Propiedad D', 'Es incorrecta porque no explica por que la proteina funciona.'),
    ]),
    want: null,
  },
  {
    name: '#1653 feedback with no verdict is not flagged',
    q: question('Cual oracion contiene un error de uso de la coma?', [
      opt('A', false, 'Oracion A', 'La coma abre el inciso pero no hay otra que lo cierre.'),
      opt('B', true, 'Oracion B', 'La situacion temporal abre con coma y el inciso queda delimitado.'),
      opt('C', false, 'Oracion C', 'La coma se coloca despues de correr, no donde corresponde.'),
      opt('D', false, 'Oracion D', 'No hay inciso que delimitar en esta oracion sin comas.'),
    ]),
    want: null,
  },
  {
    name: '#1653 one option with no marked answer is not judged',
    q: question('Cual es la funcion de la conclusion?', [
      opt('A', true, 'Presentar informacion nueva', 'Incorrecto. La conclusion no introduce contenido nuevo.'),
      opt('B', false, 'Anticipar los temas', 'Incorrecto. Anticipar el desarrollo es tarea de la introduccion.'),
      opt('C', false, 'Recapitular la postura', 'Correcto: la conclusion cierra el razonamiento.'),
      opt('D', true, 'Enumerar las fuentes', 'Incorrecto. La enumeracion de fuentes es la referencia.'),
    ]),
    want: null,
  },
];

for (const c of ruleCases) {
  const got = checkAnswerKeyVerdicts ? checkAnswerKeyVerdicts(c.q) : '<<not exported>>';
  const rule = got && got.rule ? got.rule : null;
  check(`checkAnswerKeyVerdicts: ${c.name}`, rule === c.want, `got ${JSON.stringify(got)}`);
}

// --- #1633: bias-zero must be reachable in 8- and 10-question bundles --------
const biasCases = [
  { name: '8q with an unused letter is bias-zero', letters: ['A', 'A', 'A', 'B', 'B', 'C', 'C', 'C'], want: 'bias-zero' },
  { name: '10q with an unused letter is bias-zero', letters: ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C', 'A'], want: 'bias-zero' },
  { name: '8q using every letter is clean', letters: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'], want: null },
  { name: '10q using every letter is clean', letters: ['A', 'A', 'A', 'B', 'B', 'B', 'C', 'C', 'D', 'D'], want: null },
  { name: 'one letter over half is bias-over-50', letters: ['A', 'A', 'A', 'A', 'A', 'B', 'C', 'D'], want: 'bias-over-50' },
  { name: '7 questions are below the floor', letters: ['A', 'A', 'A', 'B', 'C', 'C', 'C'], want: null },
];
for (const c of biasCases) {
  const got = checkAnswerLetterBias ? checkAnswerLetterBias(c.letters, c.letters.length) : '<<not exported>>';
  check(`checkAnswerLetterBias: ${c.name}`, got === c.want, `got ${got}`);
}

// --- #1637: the same answer key repeated across bundles ----------------------
const CORRECT_FB = 'Correcto. La potencia es el resultado de multiplicar la base por si misma.';
const WRONG_FB = {
  A: 'Incorrecto. El exponente indica cuantas veces se multiplica la base.',
  B: 'Incorrecto. La base es el factor que se repite, no el conteo de veces.',
  C: 'Incorrecto. Multiplicar potencias de la misma base suma los exponentes.',
  D: 'Incorrecto. El resultado no es la suma de la base mas el exponente.',
};
const LETTERS = ['A', 'B', 'C', 'D'];

function tempBundle(dir, name, grade, subject, sequence) {
  const questions = sequence
    .split('')
    .map(
      (letter, i) => `## Question ${i + 1} [D3-D4]
**ID:** ${name}-v${i + 1}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba ${name}.

### Enunciado
Enunciado de prueba numero ${i + 1} del fixture ${name}.

### Opciones
- [${letter === 'A' ? 'x' : ' '}] A) Opcion A del fixture ${name}.
  <!-- feedback: ${letter === 'A' ? CORRECT_FB : WRONG_FB.A} -->
- [${letter === 'B' ? 'x' : ' '}] B) Opcion B del fixture ${name}.
  <!-- feedback: ${letter === 'B' ? CORRECT_FB : WRONG_FB.B} -->
- [${letter === 'C' ? 'x' : ' '}] C) Opcion C del fixture ${name}.
  <!-- feedback: ${letter === 'C' ? CORRECT_FB : WRONG_FB.C} -->
- [${letter === 'D' ? 'x' : ' '}] D) Opcion D del fixture ${name}.
  <!-- feedback: ${letter === 'D' ? CORRECT_FB : WRONG_FB.D} -->

### Explicacion Pedagogica
Explicacion pedagogica distinta para esta pregunta ${i + 1} del fixture ${name}, con
suficiente longitud para superar el umbral de detalle exigido por el validador.`
    )
    .join('\n\n');
  const file = path.join(dir, `${name}-001-MASTERY-bundle.md`);
  fs.writeFileSync(
    file,
    `---\nid: "${name}-001-MASTERY-bundle"\ncountry: "colombia"\ngrado: ${grade}\nasignatura: "${subject}"\ntema: "potencias-numericas"\nperiodo: "weekly"\nweek: "W01"\nyear: 2026\nbundle_type: "weekly"\nprotocol_version: "5.2"\ntotal_questions: ${sequence.length}\nbundle_size: ${sequence.length}\nalignment: "DBA MEN Colombia"\nlicense: "FREE"\ntier: "legacy"\ncreador: "Jules-Agent"\n---\n\n${questions}\n`,
    'utf8'
  );
  return file;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'answer-key-'));
try {
  const same = [
    tempBundle(tmp, 'CO-repeat-a', 6, 'matematicas', 'ABCDABCDAB'),
    tempBundle(tmp, 'CO-repeat-b', 6, 'matematicas', 'ABCDABCDAB'),
    tempBundle(tmp, 'CO-repeat-c', 6, 'matematicas', 'ABCDABCDAB'),
  ];
  const diff = [
    tempBundle(tmp, 'CO-distinct-a', 6, 'matematicas', 'ABCDABCDAB'),
    tempBundle(tmp, 'CO-distinct-b', 6, 'matematicas', 'BCDABCDABC'),
    tempBundle(tmp, 'CO-distinct-c', 6, 'matematicas', 'CDABCDABCD'),
  ];
  const other = [
    tempBundle(tmp, 'CO-repeat-a', 6, 'matematicas', 'ABCDABCDAB'),
    tempBundle(tmp, 'CO-repeat-b', 6, 'matematicas', 'ABCDABCDAB'),
    tempBundle(tmp, 'CO-other-subject', 6, 'sociales-ciudadanas', 'ABCDABCDAB'),
  ];

  const sameGroups = detectRepeatedAnswerKeys ? detectRepeatedAnswerKeys(same) : [];
  check(
    `detectRepeatedAnswerKeys: 3 bundles sharing the key are one group (${sameGroups.length})`,
    sameGroups.length === 1 && sameGroups[0].bundles.length === 3 && sameGroups[0].sequence === 'ABCDABCDAB',
    JSON.stringify(sameGroups)
  );
  const twoOnly = detectRepeatedAnswerKeys ? detectRepeatedAnswerKeys(same.slice(0, 2)) : [];
  check('detectRepeatedAnswerKeys: two bundles sharing the key are not reported', twoOnly.length === 0, JSON.stringify(twoOnly));
  check(
    `detectRepeatedAnswerKeys: distinct keys are not reported (${detectRepeatedAnswerKeys ? detectRepeatedAnswerKeys(diff).length : -1})`,
    detectRepeatedAnswerKeys ? detectRepeatedAnswerKeys(diff).length === 0 : false
  );
  check(
    `detectRepeatedAnswerKeys: same key in another subject is another group (${detectRepeatedAnswerKeys ? detectRepeatedAnswerKeys(other).length : -1})`,
    detectRepeatedAnswerKeys ? detectRepeatedAnswerKeys(other).length === 0 : false
  );
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// End to end: the validator on real fixture bundles. This is the part that
// fails if a rule exists but is never called from validateFile.
// ---------------------------------------------------------------------------
const buildBundle = (bundleName, sequence, firstRows) => {
  const questions = sequence
    .split('')
    .map((letter, i) => {
      const rows =
        i === 0 && firstRows ? firstRows(letter, bundleName, i + 1) : defaultRows(letter, bundleName, i + 1);
      return `## Question ${i + 1} [D3-D4]
**ID:** ${bundleName}-v${i + 1}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba ${bundleName} numero ${i + 1}.

### Enunciado
Enunciado de prueba numero ${i + 1} del fixture ${bundleName}.

### Opciones
${rows}

### Explicacion Pedagogica
Explicacion pedagogica distinta para esta pregunta ${i + 1} del fixture ${bundleName}, con
suficiente longitud para superar el umbral de detalle exigido por el validador.`;
    })
    .join('\n\n');
  const file = path.join(DIR, `${bundleName}-001-MASTERY-bundle.md`);
  fs.writeFileSync(
    file,
    `---\nid: "${bundleName}-001-MASTERY-bundle"\ncountry: "colombia"\ngrado: 6\nasignatura: "matematicas"\ntema: "potencias-numericas"\nperiodo: "weekly"\nweek: "W01"\nyear: 2026\nbundle_type: "weekly"\nprotocol_version: "5.2"\ntotal_questions: 10\nbundle_size: 10\nalignment: "DBA MEN Colombia"\nlicense: "FREE"\ntier: "legacy"\ncreador: "Jules-Agent"\n---\n\n${questions}\n`,
    'utf8'
  );
  return file;
};

const defaultRows = (correct, bundleName, n) =>
  LETTERS.map(
    (l) =>
      `- [${l === correct ? 'x' : ' '}] ${l}) Opcion ${l} del fixture ${bundleName} pregunta ${n}.\n  <!-- feedback: ${l === correct ? CORRECT_FB : WRONG_FB[l]} -->`
  ).join('\n');

const customRows = (correct, bundleName, n, feedbacks, texts) =>
  LETTERS.map(
    (l) =>
      `- [${l === correct ? 'x' : ' '}] ${l}) ${texts[l]} del fixture ${bundleName} pregunta ${n}.\n  <!-- feedback: ${feedbacks[l]} -->`
  ).join('\n');

// Runs the validator over the given files and returns { verdict, msg }.
function validate(files) {
  let verdict = 'accept';
  let msg = '';
  try {
    execFileSync('node', [VALIDATOR, ...files], { cwd: REPO, stdio: 'pipe' });
  } catch (e) {
    verdict = 'reject';
    msg = String(e.stderr || '');
  }
  return { verdict, msg };
}

const e2eFiles = [];
try {
  // 1. The inverted key CO-LEN-11-W33-v3 as it ships: the marked option is told
  //    it is wrong and another option is told it is right.
  const inverted = buildBundle(`${RUN}-inverted`, 'ABCDABCDAB', (correct, name, n) =>
    customRows(
      'A',
      name,
      n,
      {
        A: 'Incorrecto. La conclusion no introduce contenido nuevo, porque romperia la organizacion previa.',
        B: 'Incorrecto. Anticipar el desarrollo es tarea de la introduccion, y no de la conclusion.',
        C: 'Correcto: la conclusion cierra el razonamiento y deja fijada la tesis con las razones vistas.',
        D: 'Incorrecto. La enumeracion de fuentes corresponde a la referencia del trabajo.',
      },
      { A: 'Presentar informacion nueva', B: 'Anticipar los temas', C: 'Recapitular la postura', D: 'Enumerar las fuentes' }
    )
  );
  e2eFiles.push(inverted);
  const r1 = validate([inverted]);
  check(
    `e2e: inverted key is rejected with [answer-key-inverted] (${r1.verdict})`,
    r1.verdict === 'reject' && /answer-key-inverted/.test(r1.msg),
    r1.msg.slice(0, 400)
  );

  // 2. Every shape the calibration had to learn to accept, in one sound bundle:
  //    a self-limiting verdict on a distractor, a marked option with no verdict
  //    at all, and a distractor legitimately told "Es correcta" while another
  //    option is the answer.
  const sound = buildBundle(`${RUN}-sound`, 'ABCDABCDAB', (correct, name, n) =>
    customRows(
      'B',
      name,
      n,
      {
        A: 'Correcto como efecto practico, pero no es la propiedad que explica por que es clinicamente util.',
        B: 'Es la respuesta: la coma abre el inciso pero no hay otra que lo cierre.',
        C: 'La coma se coloca despues de correr en lugar de cerrar el inciso, y eso no corresponde.',
        D: 'Es correcta: la situacion temporal abre con coma y el inciso queda bien delimitado.',
      },
      {
        A: 'Propiedad A',
        B: 'Oracion B',
        C: 'Oracion C',
        D: 'Oracion D',
      }
    )
  );
  e2eFiles.push(sound);
  const r2 = validate([sound]);
  check(
    `e2e: sound bundle stays green (${r2.verdict})`,
    r2.verdict === 'accept' && !/answer-key-inverted|ambiguous-correct-options/.test(r2.msg),
    r2.msg.slice(0, 400)
  );

  // 3. Two options declaring themselves correct.
  const ambiguous = buildBundle(`${RUN}-ambiguous`, 'ABCDABCDAB', (correct, name, n) =>
    customRows(
      'C',
      name,
      n,
      {
        A: 'Es correcta: las dos comas delimitan un inciso temporal en el medio de la oracion.',
        B: 'Es incorrecta porque la frase no contiene ningun inciso que delimitar.',
        C: 'Es la respuesta: la coma abre el inciso pero no hay otra que lo cierre.',
        D: 'Es correcta: la situacion temporal abre con coma y el inciso queda delimitado.',
      },
      { A: 'Oracion A', B: 'Oracion B', C: 'Oracion C', D: 'Oracion D' }
    )
  );
  e2eFiles.push(ambiguous);
  const r3 = validate([ambiguous]);
  check(
    `e2e: ambiguous key is rejected with [ambiguous-correct-options] (${r3.verdict})`,
    r3.verdict === 'reject' && /ambiguous-correct-options/.test(r3.msg),
    r3.msg.slice(0, 400)
  );

  // 4. Three bundles of the same country/grade/subject sharing one key: the
  //    #1635/#1636 shape, where every bundle is internally uniform.
  const keyed = [];
  for (const suffix of ['k1', 'k2', 'k3']) {
    keyed.push(buildBundle(`${RUN}-${suffix}`, 'ABCDABCDAB'));
    e2eFiles.push(keyed[keyed.length - 1]);
  }
  const r4 = validate(keyed);
  check(
    `e2e: batch with a repeated answer key is rejected with [repeated-answer-key] (${r4.verdict})`,
    r4.verdict === 'reject' && /repeated-answer-key/.test(r4.msg),
    r4.msg.slice(0, 400)
  );

  // 5. Same size batch, different keys: not a defect.
  const varied = ['ABCDABCDAB', 'BCDABCDABC', 'CDABCDABCD'].map((seq, i) => {
    const f = buildBundle(`${RUN}-v${i + 1}`, seq);
    e2eFiles.push(f);
    return f;
  });
  const r5 = validate(varied);
  check(
    `e2e: batch with distinct answer keys is green (${r5.verdict})`,
    r5.verdict === 'accept' && !/repeated-answer-key/.test(r5.msg),
    r5.msg.slice(0, 400)
  );
} finally {
  for (const f of e2eFiles) fs.rmSync(f, { force: true });
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) console.log(`failed: ${failures.join(' | ')}`);
process.exit(fail ? 1 : 0);
