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
import { execFileSync, spawnSync } from 'node:child_process';
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
const EXPORTS = [
  'feedbackVerdict',
  'checkAnswerKeyVerdicts',
  'checkAnswerLetterBias',
  'detectRepeatedAnswerKeys',
  'repeatedKeyIsNew',
];
const missing = EXPORTS.filter((name) => typeof mod[name] !== 'function');
check('validator exports the answer-key predicates', missing.length === 0, missing.join(', '));
const feedbackVerdict = mod.feedbackVerdict;
const checkAnswerKeyVerdicts = mod.checkAnswerKeyVerdicts;
const checkAnswerLetterBias = mod.checkAnswerLetterBias;
const detectRepeatedAnswerKeys = mod.detectRepeatedAnswerKeys;
const repeatedKeyIsNew = mod.repeatedKeyIsNew;

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
    // PY-LEN-11-2026-W02 Q8: the stem asks which sentence CONTAINS a comma
    // error, so "Es correcta" on a distractor says the sentence is well-formed.
    // That is the right thing to tell a student about a distractor, and two of
    // them are the normal shape of the item. The marked option never claims to
    // be correct, so the question is answerable.
    name: '#1653 find-the-error stem with a key that is not positive is not ambiguous',
    q: question('Cual oracion contiene un error de uso de la coma?', [
      opt('A', false, 'Oracion A', 'Es correcta: las dos comas delimitan un inciso temporal.'),
      opt('B', true, 'Oracion B', 'La coma abre el inciso pero no hay otra que lo cierre.'),
      opt('C', false, 'Oracion C', 'La coma se coloca despues de correr, no donde corresponde.'),
      opt('D', false, 'Oracion D', 'Es correcta: la situacion temporal abre con coma y queda delimitada.'),
    ]),
    want: null,
  },
  {
    // Same stem, but the option carrying [x] says it is correct: that option
    // cannot be the error the stem asked for (PY-LEN-11-2026-W04 Q6). The
    // narrow exclusion must not swallow this.
    name: '#1653 find-the-error stem whose MARKED option claims to be correct is ambiguous',
    q: question('Cual oracion contiene un error de uso de la coma?', [
      opt('A', false, 'Oracion A', 'Es incorrecta porque la frase no contiene ningun inciso.'),
      opt('B', true, 'Oracion B', 'Es correcta: las dos comas delimitan un inciso temporal.'),
      opt('C', false, 'Oracion C', 'Es correcta: la situacion temporal abre con coma y queda delimitada.'),
      opt('D', false, 'Oracion D', 'Es incorrecta porque la coma cierra un inciso que no se abrio.'),
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

  // --- #1637: severity against the published baseline -----------------------
  // A stamp that is already on main stays a warning, so repairing one of the
  // 40 bundles of a published series is not blocked. A file that JOINS a
  // published stamp is the #1635/#1636 shape and stays an error. The baseline
  // is a fixture object here, never the committed 645-path JSON.
  const published = sameGroups[0];
  const fixtureBaseline = published ? { [`${published.group}|${published.sequence}`]: published.bundles } : {};
  const show = (g) => (typeof repeatedKeyIsNew === 'function' ? repeatedKeyIsNew(g, fixtureBaseline) : '<<not exported>>');
  check(
    `repeatedKeyIsNew: a stamp whose every path is published is not new (${show(published)})`,
    typeof repeatedKeyIsNew === 'function' && repeatedKeyIsNew(published, fixtureBaseline) === false,
    `${published ? `${published.group}|${published.sequence}` : 'no group'}`
  );
  const joining = detectRepeatedAnswerKeys
    ? detectRepeatedAnswerKeys([...same, tempBundle(tmp, 'CO-repeat-d', 6, 'matematicas', 'ABCDABCDAB')])[0]
    : null;
  check(
    `repeatedKeyIsNew: a file joining a published stamp is new (${show(joining)})`,
    typeof repeatedKeyIsNew === 'function' && repeatedKeyIsNew(joining, fixtureBaseline) === true,
    `${joining ? joining.bundles.length : 0} paths share "${joining ? joining.sequence : '?'}"`
  );
  check(
    'repeatedKeyIsNew: a sequence absent from the baseline is new',
    typeof repeatedKeyIsNew === 'function' &&
      repeatedKeyIsNew({ group: 'CO|6|matematicas', sequence: 'ACBDACBDAC', bundles: ['a.md'] }, fixtureBaseline) === true
  );

  // --- #1665: the published stamp must survive a run from saberparatodos/ ---
  // The validator is documented to run from the repository root AND from
  // `saberparatodos/`, where a real bundle path is `../questions_data/...`.
  // A repo-relative baseline path must still match it, or a published stamp is
  // read as new -- and with positionals that is ERROR and exit 1, which is
  // exactly what a scoped repair run of three CO-ING-4 W01-W03 bundles saw.
  {
    const script = [
      "import { pathToFileURL } from 'node:url';",
      `const mod = await import(pathToFileURL(${JSON.stringify(VALIDATOR)}).href);`,
      "const baseline = mod.loadRepeatedAnswerKeyBaseline();",
      "const key = 'CO|4|ingles|ABCDABCD';",
      "const known = baseline[key] || [];",
      "const group = { group: 'CO|4|ingles', sequence: 'ABCDABCD' };",
      "const published = { ...group, bundles: known.slice(0, 3).map((p) => '../' + p) };",
      "const extra = { ...group, bundles: [...published.bundles, '../questions_data/colombia/ingles/grado-4/2026/weekly/zz-not-baselined-001-MASTERY-bundle.md'] };",
      'console.log(JSON.stringify(mod.repeatedKeyIsNew(published, baseline)));',
      'console.log(JSON.stringify(mod.repeatedKeyIsNew(extra, baseline)));',
    ].join('\n');
    const run = spawnSync('node', ['--input-type=module', '-e', script], {
      cwd: path.join(REPO, 'saberparatodos'),
      encoding: 'utf8',
    });
    const lines = (run.stdout || '').trim().split('\n');
    check(
      `repeatedKeyIsNew from saberparatodos/: a published stamp is not new (${lines[0] || 'no output'})`,
      run.status === 0 && lines[0] === 'false',
      `status=${run.status}; out=${run.stdout}; err=${(run.stderr || '').slice(0, 300)}`
    );
    check(
      `repeatedKeyIsNew from saberparatodos/: an unlisted bundle is new (${lines[1] || 'no output'})`,
      run.status === 0 && lines[1] === 'true',
      `status=${run.status}; out=${run.stdout}; err=${(run.stderr || '').slice(0, 300)}`
    );
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// End to end: the validator on real fixture bundles. This is the part that
// fails if a rule exists but is never called from validateFile.
// ---------------------------------------------------------------------------
const buildBundle = (bundleName, sequence, firstRows, stem) => {
  const questions = sequence
    .split('')
    .map((letter, i) => {
      const rows =
        i === 0 && firstRows ? firstRows(letter, bundleName, i + 1) : defaultRows(letter, bundleName, i + 1);
      const enunciado = i === 0 && stem ? stem : `Enunciado de prueba numero ${i + 1} del fixture ${bundleName}.`;
      return `## Question ${i + 1} [D3-D4]
**ID:** ${bundleName}-v${i + 1}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Contexto de prueba ${bundleName} numero ${i + 1}.

### Enunciado
${enunciado}

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

  // 6. A find-the-error item whose key does not call itself correct:
  //    PY-LEN-11-2026-W02 Q8. Two well-formed distractors are legitimately
  //    told "Es correcta"; the exclusion must not swallow the generic case in 3.
  const findError = buildBundle(
    `${RUN}-find-error`,
    'ABCDABCDAB',
    (correct, name, n) =>
      customRows(
        'B',
        name,
        n,
        {
          A: 'Es correcta: las dos comas delimitan un inciso temporal en el medio de la oracion.',
          B: 'Es la respuesta: la coma abre el inciso pero no hay otra que lo cierre.',
          C: 'La coma se coloca despues de correr en lugar de cerrar el inciso, y eso no corresponde.',
          D: 'Es correcta: la situacion temporal abre con coma y el inciso queda bien delimitado.',
        },
        { A: 'Oracion A', B: 'Oracion B', C: 'Oracion C', D: 'Oracion D' }
      ),
    'Cual de las oraciones contiene un error de uso de la coma?'
  );
  e2eFiles.push(findError);
  const r6 = validate([findError]);
  check(
    `e2e: find-the-error item with two sound distractors is accepted (${r6.verdict})`,
    r6.verdict === 'accept' && !/ambiguous-correct-options/.test(r6.msg),
    r6.msg.slice(0, 400)
  );
} finally {
  for (const f of e2eFiles) fs.rmSync(f, { force: true });
}

// ---------------------------------------------------------------------------
// The corpus run: the published stamps must stay warnings there.
//
// `npm run validate` has no arguments, so `positionals.length === 0`. Before the
// baseline, that branch was the only thing keeping the 78 stamps shared by 645
// already-merged bundles out of the error list; after it, the same branch is
// taken for a stamp that IS published, and an error still fires for a new one.
// This is the one assertion that cannot be expressed with fixture files,
// because the baseline is keyed on paths that live in this repository.
// ---------------------------------------------------------------------------
try {
  // spawnSync reports the output whether the run passes or fails; execFileSync
  // throws and keeps it in e.stdout/e.stderr only on a non-zero exit.
  const run = spawnSync('node', [VALIDATOR], { cwd: REPO, encoding: 'utf8' });
  const msg = `${run.stdout || ''}\n${run.stderr || ''}`;
  const verdict = run.status === 0 ? 'accept' : `reject(status=${run.status})`;
  const warns = /WARNING \[repeated-answer-key\]/.test(msg);
  const errors = /ERROR \[repeated-answer-key\]/.test(msg);
  check(
    `e2e: no-arg corpus run reports published stamps as WARNING, not ERROR (${verdict}, warns=${warns})`,
    run.status === 0 && warns && !errors,
    `exit=${run.status}; WARNING=${warns}; ERROR=${errors}; ${msg.slice(-400)}`
  );
} catch (e) {
  check('e2e: no-arg corpus run reports published stamps as WARNING, not ERROR', false, String(e));
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) console.log(`failed: ${failures.join(' | ')}`);
process.exit(fail ? 1 : 0);
