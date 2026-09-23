import { test, expect } from '@playwright/test';

/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

/**
 * [Ola Juego.07] juego-reintentos-elo — E2E motor (intentos, cooldown, XP separado)
 *
 * Validates browser runtime persistence, cooldown behavior, XP/Elo separation,
 * and mathematical parity of the game engine harness contract:
 * window.__wxJuego.engine.{recordAttempt, addActionXp, openRetry, retryStatus, closeAttempt, applyAttempt}
 * window.__wxJuego.store.{loadState, saveState}
 */

test.describe.serial('Engine E2E - Reintentos, Cooldown y Elo (#7)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to game harness page
    await page.goto('/juego/harness');
    await page.waitForLoadState('domcontentloaded');

    // Check if #4 hook surface window.__wxJuego.engine exists
    const hasHookSurface = await page.evaluate(() => {
      const w = window as any;
      return typeof w.__wxJuego?.engine?.recordAttempt === 'function';
    });

    if (!hasHookSurface) {
      test.skip(true, 'Blocker: Depends on #4 hook surface window.__wxJuego');
      return;
    }

    // Fresh state per test for test isolation
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
  });

  test('recordAttempt updates Elo and question Elo while leaving xpWeekly unchanged', async ({ page }) => {
    const result = await page.evaluate(() => {
      const w = window as any;
      // Load fresh state (Grade 11 default elo is 1800)
      const initialState = w.__wxJuego.store.loadState(11);
      const initialXp = initialState.xpWeekly;

      // Perform recordAttempt for correct answer on question with elo 900
      const attemptRes = w.__wxJuego.engine.recordAttempt(initialState, {
        questionId: 'e2e-q1',
        questionElo: 900,
        correct: true,
      });

      // Save mutated state to browser storage
      w.__wxJuego.store.saveState(initialState);

      // Load persisted state back from storage
      const reloadedState = w.__wxJuego.store.loadState(11);

      return {
        initialXp,
        playerDelta: attemptRes.playerDelta,
        newElo: attemptRes.newElo,
        reloadedElo: reloadedState.elo,
        questionElo: reloadedState.questionElo['e2e-q1'],
        reloadedXp: reloadedState.xpWeekly,
      };
    });

    // Player elo should be greater than initial 1800
    expect(result.reloadedElo).toBeGreaterThan(1800);
    // Question elo should decrease from initial 900 (as player beat it)
    expect(result.questionElo).toBeLessThan(900);
    // XP Weekly remains unchanged (XP/Elo separation rule)
    expect(result.reloadedXp).toBe(result.initialXp);
    // Assert xpWeekly is unchanged
    const xpWeeklyUnchanged = result.reloadedXp === result.initialXp;
    expect(xpWeeklyUnchanged).toBe(true);
  });

  test('addActionXp increases weekly XP without modifying player Elo', async ({ page }) => {
    const result = await page.evaluate(() => {
      const w = window as any;
      const state = w.__wxJuego.store.loadState(11);
      const startingElo = state.elo;
      const startingXp = state.xpWeekly;

      // Perform addActionXp('respuesta') 3 times (+10 XP per 'respuesta' action)
      const xpGain1 = w.__wxJuego.engine.addActionXp(state, 'respuesta');
      const xpGain2 = w.__wxJuego.engine.addActionXp(state, 'respuesta');
      const xpGain3 = w.__wxJuego.engine.addActionXp(state, 'respuesta');

      w.__wxJuego.store.saveState(state);
      const updatedState = w.__wxJuego.store.loadState(11);

      return {
        startingElo,
        startingXp,
        totalGain: xpGain1 + xpGain2 + xpGain3,
        updatedElo: updatedState.elo,
        updatedXp: updatedState.xpWeekly,
      };
    });

    // 3 x 10 XP = 30 total XP gained
    expect(result.totalGain).toBe(30);
    expect(result.updatedXp).toBe(result.startingXp + 30);
    // Player Elo must remain strictly unchanged
    expect(result.updatedElo).toBe(result.startingElo);
  });

  test('Persistence roundtrip: saveState preserves Elo and XP across page reload', async ({ page }) => {
    // 1. Mutate state and save to localStorage
    const mutated = await page.evaluate(() => {
      const w = window as any;
      const state = w.__wxJuego.store.loadState(11);
      state.elo = 1950;
      state.xpWeekly = 450;
      w.__wxJuego.store.saveState(state);
      return { elo: state.elo, xpWeekly: state.xpWeekly };
    });

    // 2. Perform page reload (location.reload)
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // 3. Load state after browser page refresh
    const loadedAfterReload = await page.evaluate(() => {
      const w = window as any;
      const state = w.__wxJuego.store.loadState(11);
      return { elo: state.elo, xpWeekly: state.xpWeekly };
    });

    // Assert same elo and xp retrieved after reload
    expect(loadedAfterReload.elo).toBe(mutated.elo);
    expect(loadedAfterReload.xpWeekly).toBe(mutated.xpWeekly);
  });

  test('Cooldown logic: openRetry locks quiz and retryStatus returns waitMs > 0 and focusTema', async ({ page }) => {
    const status = await page.evaluate(() => {
      const w = window as any;
      const quizId = 'e2e-quiz-1';
      const focusTema = 'simplificacion';

      // Open retry cooldown for quiz
      const cooldownMs = w.__wxJuego.engine.openRetry(quizId, 60, focusTema);

      // Immediately query retryStatus
      const st = w.__wxJuego.engine.retryStatus(quizId);

      return {
        cooldownMs,
        allowed: st.allowed,
        waitMs: st.waitMs,
        focusTema: st.focusTema,
        attemptsUsed: st.attemptsUsed,
        finalSoFar: st.finalSoFar,
      };
    });

    expect(status.allowed).toBe(false);
    expect(status.waitMs).toBeGreaterThan(0);
    expect(status.focusTema).toBe('simplificacion');
    expect(status.attemptsUsed).toBe(1);
    expect(status.finalSoFar).toBe(60);
  });

  test('closeAttempt updates final score to maximum score achieved across attempts', async ({ page }) => {
    const finalStatus = await page.evaluate(() => {
      const w = window as any;
      const quizId = 'e2e-quiz-1';
      const focusTema = 'simplificacion';

      // First attempt recorded via openRetry with score 60
      w.__wxJuego.engine.openRetry(quizId, 60, focusTema);

      // Second attempt closed with improved score 85
      const st = w.__wxJuego.engine.closeAttempt(quizId, 85);

      return {
        allowed: st.allowed,
        attemptsUsed: st.attemptsUsed,
        focusTema: st.focusTema,
        finalSoFar: st.finalSoFar,
      };
    });

    // finalSoFar === 85 (max(60, 85))
    expect(finalStatus.finalSoFar).toBe(85);
    expect(finalStatus.attemptsUsed).toBe(2);
    expect(finalStatus.focusTema).toBe('simplificacion');
  });

  test('Hazaña math in browser: applyAttempt matches expected playerDelta === 31', async ({ page }) => {
    const result = await page.evaluate(() => {
      const w = window as any;
      // Evaluate applyAttempt(playerElo: 1200, questionElo: 1800, correct: true)
      const res = w.__wxJuego.engine.applyAttempt(1200, 1800, true);
      return {
        playerDelta: res.playerDelta,
        newPlayerElo: res.newPlayerElo,
        newQuestionElo: res.newQuestionElo,
        expected: res.expected,
      };
    });

    // Guard against bundling/transform drift (must match unit test expected math playerDelta === 31)
    expect(result.playerDelta === 31).toBe(true);
    expect(result.playerDelta).toBe(31);
    expect(result.newPlayerElo).toBe(1231);
  });
});
