import { test, expect, type Page, type Route } from '@playwright/test';

/**
 * Journey de ALUMNO sobre SaberParaTodos (QA).
 *
 *  1. Examen de práctica completo (ICFES Saber 11 · Matemáticas) contra prod.
 *     Responde todas las preguntas, valida contenido y revisa la vista de resultados.
 *  2. Ranking: la tabla oficial (RankedLeaderboard) carga sin error contra la API real.
 *     En el preview la app llama a la API preview de su rama (PUBLIC_RANKED_API_BASE_URL
 *     en deploy-preview.yml), que concede CORS a *.workers.dev.
 *  3. Ranked con API mockeada (no se crean sesiones reales en D1 de prod):
 *     payload de submit, puntaje en pantalla y variante status "flagged".
 *
 * Selectores: data-testid donde existen (onboarding-flow, modal-content, subject-select,
 * start-exam-btn, question-card, options-grid, exam-shell); el resto por rol/texto.
 * Ver src/components/ExamView.svelte, ExamConfigModal.svelte, ResultsView.svelte,
 * ranked/RankedExamView.svelte, leaderboard/RankedLeaderboard.svelte, LeaderboardView.svelte.
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'https://saberparatodos.space';
// Opcional: chromium del sistema (NixOS). No toca la config global.
const CHROMIUM_PATH = process.env.SABER_CHROMIUM_PATH;

test.use({
  launchOptions: CHROMIUM_PATH ? { executablePath: CHROMIUM_PATH } : {},
});

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
const LETTERS = ['A', 'B', 'C', 'D'] as const;
// Texto que nunca debe llegar a un alumno.
const CONTENT_BAD = /\bundefined\b|\bnull\b|\[object Object\]|\bTODO\b|lorem|placeholder/i;

type Anomaly = { indice: number; id: string; problema: string; extracto: string };

async function dismissOnboarding(page: Page) {
  // OnboardingFlow aparece 500 ms después de cargar y bloquea los clics hasta que se cierra.
  const ob = page.getByTestId('onboarding-flow');
  const visible = await ob.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (visible) {
    await ob.getByRole('button', { name: /saltar/i }).click();
    await expect(ob).toBeHidden();
  }
}

/** Entra al hub ICFES (Colombia, grado 11), elige materia y cantidad, y arranca el examen. */
/** Devuelve los ms desde "COMENZAR" hasta que aparecen las opciones (incluye overlay de integridad). */
async function startPracticeExam(page: Page, questionsRequested: number): Promise<number> {
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60_000 });
  await dismissOnboarding(page);

  const card = page.locator('button').filter({ hasText: 'INICIAR EXAMEN' }).first();
  await expect(card).toContainText('Colombia');
  await card.click();

  await page.locator('button').filter({ hasText: 'Matemáticas' }).first().click();

  const modal = page.getByTestId('modal-content');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Grado 11°');
  await expect(page.getByTestId('subject-select')).toHaveValue('Matemáticas');
  await modal.getByRole('button', { name: String(questionsRequested), exact: true }).click();

  const t0 = Date.now();
  await page.getByTestId('start-exam-btn').click();
  await expect(page.getByTestId('options-grid')).toBeVisible({ timeout: 60_000 });
  return Date.now() - t0;
}

/**
 * Contador del pie del examen (ExamView.svelte:726). No tiene data-testid; la palabra
 * "Pregunta" va en un span `hidden xs:inline` (oculto), así que se lee el textContent.
 */
const footerCounter = (page: Page) => page.locator('div.font-mono.shrink-0.text-center').first();

/** Lee "X / N" del pie del examen. */
async function readFooter(page: Page): Promise<{ current: number; total: number }> {
  const txt = norm(await footerCounter(page).textContent({ timeout: 30_000 }) ?? '');
  const m = txt.match(/(\d+)\s*\/\s*(\d+)/);
  if (!m) throw new Error(`Contador del examen no reconocido: "${txt}"`);
  return { current: Number(m[1]), total: Number(m[2]) };
}

async function readCurrentQuestion(page: Page) {
  const statement = norm(await page.getByTestId('question-card').innerText());
  const options = (await page.getByTestId('options-grid').locator('button').allInnerTexts()).map(norm);
  return { statement, options };
}

/** Obtiene el id real de la pregunta con el inspector QA (Alt+Q). Solo se usa ante anomalías. */
async function currentQuestionId(page: Page): Promise<string> {
  await page.keyboard.press('Alt+q');
  const id = await page
    .locator('[aria-label="QA metadata overlay"] .text-emerald-300')
    .first()
    .innerText({ timeout: 3000 })
    .catch(() => 'no-disponible');
  await page.keyboard.press('Alt+q');
  return norm(id);
}

/** Responde todas las preguntas de un examen de práctica (sin validar contenido). */
async function answerAllPractice(page: Page): Promise<number> {
  const { total } = await readFooter(page);
  for (let i = 0; i < total; i++) {
    await expect(footerCounter(page)).toContainText(`${i + 1} / ${total}`);
    await page.getByTestId('options-grid').locator('button').nth(i % 4).click();
    await page.getByRole('button', { name: i === total - 1 ? 'Finalizar' : 'Siguiente', exact: true }).click();
  }
  return total;
}

// ═════════════════════════════════════════════════════════════════════════
// 1. Examen de práctica completo como alumno
// ═════════════════════════════════════════════════════════════════════════

test('1. Examen de práctica completo: responder todo, validar contenido y revisar resultados', async ({ page }) => {
  test.setTimeout(300_000);

  const consoleIssues = new Set<string>();
  page.on('console', (m) => {
    if (m.type() === 'error') consoleIssues.add(norm(m.text()).slice(0, 200));
  });
  page.on('pageerror', (e) => consoleIssues.add(`pageerror: ${e.message.slice(0, 200)}`));

  const arranqueMs = await startPracticeExam(page, 30);
  test.info().annotations.push({ type: 'arranque-examen-ms', description: String(arranqueMs) });
  const { total } = await readFooter(page);
  if (total < 30) {
    test.info().annotations.push({
      type: 'anomalia-cantidad',
      description: `Se pidieron 30 preguntas y la sesión trajo ${total}. Sin aviso al alumno.`,
    });
  }

  const choices: { indice: number; letra: string; texto: string }[] = [];
  const capturadas: {
    indice: number;
    id: string;
    enunciado: string;
    opciones: string[];
    errorUI: boolean;
    pantalla: string; // texto completo de la pantalla (incluye contexto compartido)
  }[] = [];

  for (let i = 0; i < total; i++) {
    await expect(footerCounter(page)).toContainText(`${i + 1} / ${total}`);
    const q = await readCurrentQuestion(page);
    capturadas.push({
      indice: i + 1,
      id: await currentQuestionId(page),
      enunciado: q.statement.slice(0, 500),
      opciones: q.options,
      errorUI: await page.getByText('Error cargando pregunta').isVisible().catch(() => false),
      pantalla: norm(await page.getByTestId('exam-shell').innerText()).slice(0, 700),
    });

    // Elección rotativa A-D; se registra qué se eligió para el informe.
    const n = q.options.length;
    if (n > 0) {
      const idx = i % n;
      await page.getByTestId('options-grid').locator('button').nth(idx).click();
      choices.push({ indice: i + 1, letra: LETTERS[idx], texto: (q.options[idx] || '').slice(0, 120) });
    }

    await page.getByRole('button', { name: i === total - 1 ? 'Finalizar' : 'Siguiente', exact: true }).click();
  }

  // ── Detección de anomalías sobre lo capturado ──────────────────────────
  const anomalies: Anomaly[] = [];
  const plantilla = (s: string) => norm(s).replace(/^\d{1,3}\s+/, '').replace(/\d+/g, '#');
  const grupos = new Map<string, typeof capturadas>();
  for (const q of capturadas) {
    const problems: string[] = [];
    if (!q.enunciado) problems.push('enunciado vacío');
    if (q.opciones.length !== 4) problems.push(`${q.opciones.length} opciones (se esperan 4)`);
    if (q.opciones.some((o) => !o.replace(/^[A-D]\s*/, '').trim())) problems.push('opción sin texto');
    const bad = [q.enunciado, ...q.opciones].join(' | ').match(CONTENT_BAD);
    if (bad) problems.push(`texto sospechoso: "${bad[0]}"`);
    if (q.errorUI) problems.push('la UI muestra "Error cargando pregunta"');
    if (/\bfunci[oó]n\b/i.test(q.enunciado) && q.opciones.every((o) => /^[A-D]\s*-?\d+([.,]\d+)?$/.test(o))) {
      problems.push('pide "la función" pero todas las opciones son valores numéricos');
    }
    if (problems.length > 0) {
      anomalies.push({ indice: q.indice, id: q.id, problema: problems.join('; '), extracto: q.enunciado.slice(0, 160) });
    }
    const key = plantilla(q.enunciado);
    grupos.set(key, [...(grupos.get(key) || []), q]);
  }
  for (const [, grupo] of grupos) {
    if (grupo.length >= 3) {
      for (const q of grupo) {
        anomalies.push({
          indice: q.indice,
          id: q.id,
          problema: `plantilla repetida ${grupo.length} veces en la misma sesión (mismo enunciado, solo cambia el número)`,
          extracto: q.enunciado.slice(0, 160),
        });
      }
    }
  }

  await test.info().attach('anomalias-contenido.json', {
    body: JSON.stringify(anomalies, null, 2),
    contentType: 'application/json',
  });
  await test.info().attach('preguntas-capturadas.json', {
    body: JSON.stringify(capturadas, null, 2),
    contentType: 'application/json',
  });
  await test.info().attach('elecciones-alumno.json', {
    body: JSON.stringify(choices, null, 2),
    contentType: 'application/json',
  });
  await test.info().attach('consola-errores.txt', {
    body: [...consoleIssues].join('\n') || '(sin errores de consola)',
    contentType: 'text/plain',
  });
  test.info().annotations.push({ type: 'anomalias-contenido', description: String(anomalies.length) });

  // ── Vista de resultados ──────────────────────────────────────────────
  await expect(page.getByText(/de \d+ correctas/i).first()).toBeVisible({ timeout: 30_000 });
  const body = norm(await page.locator('body').innerText());

  expect(choices.length, 'todas las preguntas tuvieron opción elegida').toBe(total);

  const aciertos = body.match(/(\d+)\s+DE\s+(\d+)\s+CORRECTAS/i);
  expect(aciertos, 'texto "X de Y correctas" en resultados').not.toBeNull();
  const correctas = Number(aciertos![1]);
  const respondidas = Number(aciertos![2]);
  expect(respondidas, 'nº de respuestas = nº de preguntas').toBe(total);
  expect(correctas).toBeGreaterThanOrEqual(0);
  expect(correctas).toBeLessThanOrEqual(respondidas);

  const puntaje = body.match(/(\d{1,3})\s*\/\s*500/);
  expect(puntaje, 'puntaje estimado ICFES visible').not.toBeNull();
  expect(Number(puntaje![1])).toBeGreaterThanOrEqual(0);
  expect(Number(puntaje![1])).toBeLessThanOrEqual(500);

  // Revisión / explicación por pregunta
  await expect(page.getByText(/explicaci[oó]n/i).first()).toBeAttached();
});

// ═════════════════════════════════════════════════════════════════════════
// 2. Vista de ranking
// ═════════════════════════════════════════════════════════════════════════

test('2. Ranking: la tabla oficial carga y no muestra error (regresión semanal)', async ({ page }) => {
  test.setTimeout(240_000);

  const leaderboardResponses: string[] = [];
  page.on('response', (r) => {
    if (r.url().includes('leaderboard')) leaderboardResponses.push(`${r.status()} ${r.url()}`);
  });

  // Camino real del alumno: práctica corta → Resultados → "Ranking".
  await startPracticeExam(page, 5);
  await answerAllPractice(page);
  await expect(page.getByText(/de \d+ correctas/i).first()).toBeVisible({ timeout: 30_000 });
  await page.getByRole('button', { name: 'Ranking', exact: true }).click();

  // Tabla oficial (RankedLeaderboard): debe cargar.
  await expect(page.getByRole('heading', { name: 'Ranking Oficial (Ranked)' })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText('Cargando ranking oficial...')).toBeHidden({ timeout: 30_000 });
  await expect(page.getByText('El ranking se está activando')).toHaveCount(0);

  await test.info().attach('respuestas-leaderboard.txt', {
    body: leaderboardResponses.join('\n') || '(sin llamadas a leaderboard)',
    contentType: 'text/plain',
  });

  await expect(page.getByTestId('ranked-leaderboard-error')).toHaveCount(0);
  expect(
    leaderboardResponses.some((r) => /^200 \S*\/v1\/leaderboard\?/.test(r)),
    'GET /v1/leaderboard respondió 200'
  ).toBe(true);
});

// ═════════════════════════════════════════════════════════════════════════
// 3. Ranked con API mockeada
// ═════════════════════════════════════════════════════════════════════════

const AREAS = ['matematicas', 'lectura_critica', 'sociales_ciudadanas', 'ciencias_naturales', 'ingles'] as const;

type RankedFixture = {
  sessionId: string;
  questions: {
    id: string;
    subject: string;
    statement: string;
    context?: string;
    options: { letter: string; text: string }[];
  }[];
  key: Record<string, { letter: string; feedback: string; explanation: string }>;
  review: { questionId: string; correctLetter: string; feedback: string; explanation: string }[];
};

/** 40 preguntas, 8 por área. La respuesta correcta rota entre A-D. */
function buildRankedFixture(): RankedFixture {
  const questions: RankedFixture['questions'] = [];
  const key: RankedFixture['key'] = {};
  let n = 0;
  for (const area of AREAS) {
    for (let k = 0; k < 8; k++) {
      n++;
      const id = `qa-${area}-${String(k + 1).padStart(2, '0')}`;
      const a = 10 + n;
      const b = 3 + n;
      const correct = a + b;
      const correctIdx = (n * 3) % 4;
      const distractors = [correct + 1, correct - 2, correct + 5];
      let d = 0;
      const vals = [0, 1, 2, 3].map((j) => (j === correctIdx ? correct : distractors[d++]));
      questions.push({
        id,
        subject: area,
        statement: `Pregunta QA ${n} (${area}): ¿cuánto es ${a} + ${b}?`,
        context: area === 'lectura_critica' ? `Texto de contexto de prueba número ${n}.` : undefined,
        options: LETTERS.map((letter, j) => ({ letter, text: String(vals[j]) })),
      });
      key[id] = { letter: LETTERS[correctIdx], feedback: 'Retroalimentación de prueba', explanation: `Explicación de prueba ${n}` };
    }
  }
  const review = questions.map((q) => ({
    questionId: q.id,
    correctLetter: key[q.id].letter,
    feedback: key[q.id].feedback,
    explanation: key[q.id].explanation,
  }));
  return { sessionId: 'qa-session-0001', questions, key, review };
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

async function fulfillJson(route: Route, body: unknown, status = 200) {
  if (route.request().method() === 'OPTIONS') {
    return route.fulfill({ status: 204, headers: CORS });
  }
  return route.fulfill({ status, headers: CORS, contentType: 'application/json', body: JSON.stringify(body) });
}

/** Recorre el examen ranked completo (40 preguntas) con 5 s simulados por pregunta. */
async function playRankedExam(page: Page, fx: RankedFixture, submitStatus: 'valid' | 'flagged') {
  let submitBody: any = null;

  await page.route('**/v1/ranked/start', (r) =>
    fulfillJson(r, {
      sessionId: fx.sessionId,
      seed: 42,
      expiresAt: new Date(Date.now() + 90 * 60_000).toISOString(),
      questions: fx.questions,
    })
  );
  await page.route('**/v1/ranked/submit', async (r) => {
    if (r.request().method() === 'OPTIONS') return fulfillJson(r, {});
    submitBody = r.request().postDataJSON();
    const answers: { questionId: string; letter: string }[] = submitBody.answers;
    const correct = answers.filter((a) => fx.key[a.questionId]?.letter === a.letter).length;
    await fulfillJson(r, {
      status: submitStatus,
      score: Math.round((1000 * correct) / 40),
      correct,
      answered: answers.length,
      total: 40,
      review: fx.review,
    });
  });
  await page.route('**/v1/leaderboard*', (r) => fulfillJson(r, { season: '2026-10', average: 0, entries: [] }));

  // Reloj falso: el tiempo fluye; fastForward simula 5 s de lectura por pregunta.
  await page.clock.install({ time: new Date() });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await dismissOnboarding(page);

  await page.locator('button').filter({ hasText: 'RANKED ICFES' }).first().click();
  await page.getByPlaceholder('Tu apodo...').fill('QA_Alumno');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.getByRole('button', { name: 'Comenzar ranked', exact: true }).click();

  // Esperar a que el examen esté en pantalla ANTES de adelantar el reloj. RankedExamView
  // abre la medición de la pregunta 1 (dwellTracker.enter) justo antes de pasar a la fase
  // 'exam'. Antes se esperaba `button:has(.flashlight-effect)`, que también encuentra las
  // tarjetas FlashlightCard de la vista anterior: si /v1/ranked/start tardaba, el primer
  // fastForward caía antes de enter() y la pregunta 1 quedaba con ~700 ms (flaky en CI).
  const option = (letter: string) => page.getByTestId(`ranked-option-${letter}`);
  await expect(page.locator('body')).toContainText(fx.questions[0].statement, { timeout: 30_000 });
  await expect(option('A')).toBeVisible();

  for (let i = 0; i < 40; i++) {
    await page.clock.fastForward(5_000);
    await expect(page.locator('body')).toContainText(fx.questions[i].statement);
    // Pares: opción correcta. Impares: una incorrecta. Resultado esperado: 20/40.
    const correctIdx = LETTERS.indexOf(fx.key[fx.questions[i].id].letter);
    await option(LETTERS[i % 2 === 0 ? correctIdx : (correctIdx + 1) % 4]).click();
    await page.getByRole('button', { name: i === 39 ? 'Terminar' : 'Siguiente', exact: true }).click();
  }

  await expect(page.getByRole('heading', { name: 'Resultado', exact: true })).toBeVisible({ timeout: 30_000 });
  expect(submitBody, 'se envió /v1/ranked/submit').not.toBeNull();
  return submitBody;
}

test.describe('3. Ranked con API mockeada', () => {
  test('3a. Ranked válido: payload de submit y puntaje en resultados', async ({ page }) => {
    test.setTimeout(300_000);
    const fx = buildRankedFixture();
    const submit = await playRankedExam(page, fx, 'valid');

    // Payload
    expect(submit.sessionId).toBe(fx.sessionId);
    expect(submit.answers).toHaveLength(40);
    expect(new Set(submit.answers.map((a: any) => a.questionId)).size).toBe(40);
    for (const a of submit.answers) {
      expect(typeof a.ms, `ms en ${a.questionId}`).toBe('number');
      expect(a.ms, `ms en ${a.questionId} (tiempo simulado 5 s)`).toBeGreaterThanOrEqual(4000);
      expect(LETTERS as readonly string[]).toContain(a.letter);
    }
    expect(submit.integrity).toEqual(
      expect.objectContaining({
        tabSwitches: expect.any(Number),
        focusLoss: expect.any(Number),
        fullscreenExits: expect.any(Number),
        copyPaste: expect.any(Number),
        rightClick: expect.any(Number),
        devtools: expect.any(Number),
      })
    );

    // Pantalla de resultado
    const expectedCorrect = submit.answers.filter((a: any) => fx.key[a.questionId].letter === a.letter).length;
    expect(expectedCorrect, 'la secuencia del test acierta 20 de 40').toBe(20);
    const body = norm(await page.locator('body').innerText());
    const score = body.match(/(\d+)\s*\/\s*1000/);
    expect(score, 'puntaje /1000 visible').not.toBeNull();
    expect(Number(score![1])).toBe(Math.round((1000 * expectedCorrect) / 40));
    const correctas = body.match(/(\d+)\s*\/\s*40\b/);
    expect(Number(correctas![1])).toBe(expectedCorrect);
    await expect(page.getByText('Publicado si estás sobre el promedio')).toBeVisible();
    await expect(page.getByText('Respuesta correcta:')).toHaveCount(40);

    // Ruta al leaderboard desde el resultado (la sección oficial usa el mock vacío)
    await page.getByRole('button', { name: 'Ver leaderboard', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Ranking Oficial (Ranked)' })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByText('¡sé el primero!')).toBeVisible({ timeout: 30_000 });
    // Observación (no falla): la vista LEADERBOARD también muestra el error de la sección semanal.
    await page.waitForTimeout(1500);
    const errorSemanal = await page.getByText('No se pudo cargar el ranking').count();
    test.info().annotations.push({ type: 'ver-leaderboard-error-semanal', description: String(errorSemanal) });
  });

  test('3b. Ranked flagged: qué ve el alumno', async ({ page }) => {
    test.setTimeout(300_000);
    const fx = buildRankedFixture();
    await playRankedExam(page, fx, 'flagged');

    // Se valida por data-status y no por la frase exacta: el texto cambió en 40b2208
    // ("Intento marcado por integridad" → explicación de que no entra al ranking).
    const status = page.getByTestId('ranked-result-status');
    await expect(status).toHaveAttribute('data-status', 'flagged');
    await expect(status).toContainText('marcado por integridad');
    await expect(status).toContainText('no entra al ranking');
    const body = norm(await page.locator('body').innerText());
    expect(body, 'el puntaje sigue visible con status flagged').toMatch(/\/\s*1000/);

    // Documentar (no falla): ¿la UI explica que el intento no entra al ranking?
    // Solo frases de exclusión: el botón "Ranking" del pie de resultados NO cuenta como explicación.
    const explicaExclusion = /no (cuenta|entra|ser[aá]|se publica|aparece)|no elegible|no (participa|se (publicar|incluye))|fuera del ranking/i.test(body);
    const hallazgo = {
      estado_mostrado: norm(await status.innerText()),
      puntaje_visible: true,
      explica_que_no_entra_al_ranking: explicaExclusion,
      nota: 'RankedExamView: con status flagged el resultado explica que el intento no entra al ranking público del mes.',
    };
    await test.info().attach('flagged-hallazgo.json', {
      body: JSON.stringify(hallazgo, null, 2),
      contentType: 'application/json',
    });
    test.info().annotations.push({
      type: 'flagged-explica-exclusion',
      description: String(explicaExclusion),
    });
  });
});
