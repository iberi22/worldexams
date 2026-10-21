import { test, expect, type BrowserContext, type Page } from '@playwright/test';

/**
 * /party end-to-end: host + player in two isolated browser contexts.
 *
 * Isolated contexts do not share BroadcastChannel, so the spec installs
 * `window.__wxPartyBridge` (the transport hook read by
 * src/modules/exam-room/party/transport.ts) and relays envelopes between pages
 * from the test process. Real cross-device P2P is not available in CI.
 * Question packs are served from a fixture so the run is deterministic.
 */

test.describe.configure({ mode: 'serial' });

const QUESTIONS = [1, 2, 3].map((n) => ({
  id: `E2E-PARTY-Q${n}`,
  statement: `Pregunta E2E ${n}: ¿cuánto es ${n} + ${n}?`,
  context: `Contexto ${n}`,
  options: [
    { letter: 'A', text: String(n * 2), is_correct: true, feedback: `Correcto. ${n} + ${n} = ${n * 2}.` },
    { letter: 'B', text: String(n * 2 + 1), is_correct: false, feedback: 'Incorrecto. Sumaste uno de más al resultado.' },
    { letter: 'C', text: String(n * 3), is_correct: false, feedback: 'Incorrecto. Multiplicaste por tres en lugar de sumar.' },
    { letter: 'D', text: String(n), is_correct: false, feedback: 'Incorrecto. Olvidaste sumar el segundo sumando.' },
  ],
  correct_answer: 'A',
  explanation: 'Sumar un número consigo mismo es multiplicarlo por dos.',
  difficulty: 'D3-D4',
  subject: 'matematicas',
  grade: 7,
  country: 'co',
}));

const PACK = { metadata: { grade: 7, subject: 'matematicas', country: 'co' }, questions: QUESTIONS };

const pages = new Set<Page>();

async function preparePartyContext(context: BrowserContext): Promise<void> {
  await context.route(/\/packs\/.*\.json/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(PACK) }),
  );
  await context.exposeBinding('__wxPartyBridgeSend', async (source, envelope: unknown) => {
    for (const target of pages) {
      if (target === source.page || target.isClosed()) continue;
      await target
        .evaluate((env) => (window as any).__wxPartyBridge?.deliver(env), envelope)
        .catch(() => undefined);
    }
  });
  await context.addInitScript(() => {
    const listeners = new Set<(env: unknown) => void>();
    (window as any).__wxPartyBridge = {
      send: (env: unknown) => (window as any).__wxPartyBridgeSend(env),
      subscribe: (cb: (env: unknown) => void) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
      },
      deliver: (env: unknown) => listeners.forEach((cb) => cb(env)),
    };
  });
}

async function openPage(context: BrowserContext): Promise<Page> {
  const page = await context.newPage();
  pages.add(page);
  page.on('close', () => pages.delete(page));
  page.on('pageerror', (err) => console.error(`[pageerror] ${err.message}`));
  return page;
}

test('host creates a room, player joins by link, game runs in sync to the podium', async ({ browser }) => {
  test.setTimeout(180_000);
  const hostContext = await browser.newContext();
  const playerContext = await browser.newContext();
  await preparePartyContext(hostContext);
  await preparePartyContext(playerContext);

  const host = await openPage(hostContext);
  const player = await openPage(playerContext);

  // ── Host: configure and create the room ────────────────────────────────
  await host.goto('/party');
  await host.getByTestId('party-host-choice').click();
  await host.getByTestId('host-name').fill('Profe Ana');
  await host.getByTestId('host-country').selectOption('CO');
  await host.getByTestId('host-grade').selectOption('7');
  await host.getByTestId('host-subject').selectOption('matematicas');
  await host.getByTestId('host-count').selectOption('5');
  await host.getByTestId('host-seconds').selectOption('10');
  await host.getByTestId('host-create').click();

  const codeEl = host.getByTestId('room-code');
  await expect(codeEl).toHaveText(/^[A-Z2-9]{6}$/);
  const code = (await codeEl.textContent())!.trim();
  await expect(host.getByTestId('join-url')).toContainText(`/party?join=${code}`);
  await expect(host.getByTestId('host-reach')).toHaveAttribute('data-reach', 'devices');

  // ── Player: open the join link, pick a nickname ────────────────────────
  await player.goto(`/party?join=${code}`);
  await expect(player.getByTestId('player-code')).toHaveValue(code);
  await player.getByTestId('player-nickname').fill('Juli');
  await player.getByTestId('player-join').click();

  await expect(player.getByTestId('player-welcome')).toContainText('Juli');
  // Room config comes from the host (3 fixture questions, 10 s, grade 7) — not a mock.
  await expect(player.getByTestId('player-room-info')).toContainText(`Grado 7 · Sala ${code}`);
  await expect(player.getByText('Profe Ana va a empezar pronto: 3 preguntas de 10 segundos.')).toBeVisible();

  // ── Host sees the live player list and starts ──────────────────────────
  await expect(host.getByTestId('player-count')).toHaveText('1');
  await expect(host.getByTestId('host-player-list')).toContainText('Juli');
  await host.getByTestId('host-start').click();

  // ── Question 1: same question on both screens, correct answer ─────────
  const hostQ1 = host.getByTestId('host-question-text');
  await expect(hostQ1).toContainText('Pregunta E2E');
  const q1Text = (await hostQ1.textContent())!.trim();
  await expect(player.getByTestId('player-question-text')).toHaveText(q1Text);
  await expect(player.getByTestId('player-question-index')).toHaveText('Pregunta 1 de 3');
  await player.getByTestId('player-option-A').click();

  // Everyone answered → reveal with live scoreboard on both sides.
  await expect(player.getByTestId('player-reveal')).toContainText('¡Correcto!');
  await expect(host.getByTestId('host-correct')).toHaveText('A');
  await expect(host.getByTestId('party-scoreboard')).toContainText('Juli');
  const scoreAfterQ1 = Number((await player.getByTestId('player-score').textContent())!.replace(/\D/g, ''));
  expect(scoreAfterQ1).toBeGreaterThan(1000);

  // ── Player refreshes mid-game and reconnects to the same room ─────────
  await host.getByTestId('host-next').click();
  await expect(host.getByTestId('host-question-index')).toHaveText('Pregunta 2 de 3');
  await player.reload();
  await expect(player.getByTestId('player-question-index')).toHaveText('Pregunta 2 de 3');
  await expect(player.getByTestId('player-score')).toHaveText(`${scoreAfterQ1} pts`);
  await player.getByTestId('player-option-B').click();
  await expect(player.getByTestId('player-reveal')).toContainText('Incorrecto');
  await host.getByTestId('host-next').click();

  // ── Question 3 and podium ──────────────────────────────────────────────
  await expect(player.getByTestId('player-question-index')).toHaveText('Pregunta 3 de 3');
  await player.getByTestId('player-option-A').click();
  await expect(player.getByTestId('player-reveal')).toContainText('¡Correcto!');
  await host.getByTestId('host-next').click();

  await expect(host.getByTestId('party-podium')).toContainText('Juli');
  await expect(player.getByTestId('party-podium')).toContainText('Juli');
  await expect(player.getByTestId('party-podium')).toContainText('🥇');

  await hostContext.close();
  await playerContext.close();
});

test('player gets clear Spanish errors: room not found and host left', async ({ browser }) => {
  test.setTimeout(120_000);
  const hostContext = await browser.newContext();
  const playerContext = await browser.newContext();
  await preparePartyContext(hostContext);
  await preparePartyContext(playerContext);
  const player = await openPage(playerContext);

  // Nobody hosts this code → "room not found".
  await player.goto('/party?join=ZZZZZZ');
  await player.getByTestId('player-nickname').fill('Beto');
  await player.getByTestId('player-join').click();
  await expect(player.getByTestId('player-error')).toContainText('No encontramos esa sala', { timeout: 25_000 });
  await expect(player.getByTestId('player-error')).toContainText('Revisa el código');

  // Real room, then the host closes it → "host left".
  const host = await openPage(hostContext);
  await host.goto('/party');
  await host.getByTestId('party-host-choice').click();
  await host.getByTestId('host-grade').selectOption('7');
  await host.getByTestId('host-subject').selectOption('matematicas');
  await host.getByTestId('host-create').click();
  const code = (await host.getByTestId('room-code').textContent())!.trim();

  await player.getByTestId('player-retry').click();
  await player.getByTestId('player-code').fill(code);
  await player.getByTestId('player-join').click();
  await expect(player.getByTestId('player-welcome')).toContainText('Beto');

  await host.getByTestId('host-close').click();
  await expect(player.getByTestId('player-error')).toContainText('El docente salió de la sala');

  await hostContext.close();
  await playerContext.close();
});

test('without WebRTC: same-browser fallback with a visible warning', async ({ browser }) => {
  test.setTimeout(120_000);
  // No bridge here: this runs the production transport selection. Without
  // WebRTC there is no PeerJS, so the room falls back to this browser only.
  const context = await browser.newContext();
  await context.addInitScript(() => {
    delete (window as any).RTCPeerConnection;
  });
  await context.route(/\/packs\/.*\.json/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(PACK) }),
  );
  const host = await context.newPage();
  const player = await context.newPage();

  await host.goto('/party');
  await host.getByTestId('party-host-choice').click();
  await host.getByTestId('host-grade').selectOption('7');
  await host.getByTestId('host-subject').selectOption('matematicas');
  await host.getByTestId('host-create').click();
  const code = (await host.getByTestId('room-code').textContent())!.trim();
  const reach = host.getByTestId('host-reach');
  await expect(reach).toHaveAttribute('data-reach', 'local');
  await expect(reach).toContainText('Solo pueden unirse pestañas de este mismo navegador');

  await player.goto('/party');
  await player.getByTestId('party-join-choice').click();
  await player.getByTestId('player-code').fill(code.toLowerCase());
  await player.getByTestId('player-nickname').fill('Caro');
  await player.getByTestId('player-join').click();
  await expect(player.getByTestId('player-welcome')).toContainText('Caro');
  await expect(host.getByTestId('host-player-list')).toContainText('Caro');

  await host.getByTestId('host-start').click();
  await expect(player.getByTestId('player-question-index')).toHaveText('Pregunta 1 de 3');

  await context.close();
});
