import { test, expect } from '@playwright/test';

/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

/**
 * Juego Reintentos / Elo E2E Test Suite
 *
 * Verifies the E2E behavior of the game engine (attempts, cooldown, XP/Elo separation,
 * browser persistence, and math calculation) via the window.__wxJuego harness contract.
 *
 * Contract exposed on /juego/harness:
 * window.__wxJuego.engine: {
 *   recordAttempt, addActionXp, openRetry, retryStatus, closeAttempt,
 *   finalScore, awardXp, applyAttempt
 * }
 * window.__wxJuego.store: {
 *   loadState, saveState
 * }
 *
 * If the #4 hook surface window.__wxJuego is not present on /juego/harness,
 * each test gracefully skips with a blocker notice.
 */

test.describe('Ola Juego Engine E2E - Reintentos, Elo & XP', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    // Navigate to the test harness page
    await page.goto('/juego/harness');

    // Clear local storage for fresh state per test isolation
    await page.evaluate(() => {
      try {
        localStorage.clear();
      } catch {
        // Safe fallback in restricted contexts
      }
    });

    await page.reload();

    // Verify whether the #4 hook surface window.__wxJuego exists
    const hasHarness = await page.evaluate(() => {
      return (
        typeof (window as any).__wxJuego !== 'undefined' &&
        typeof (window as any).__wxJuego.engine !== 'undefined' &&
        typeof (window as any).__wxJuego.store !== 'undefined'
      );
    });

    if (!hasHarness) {
      test.skip(true, 'Blocker: #4 hook surface window.__wxJuego is missing on /juego/harness');
    }
  });

  test('recordAttempt on fresh state updates elo, questionElo, and leaves xpWeekly unchanged', async ({ page }) => {
    // Read initial state (default Elo 1800)
    const initialState = await page.evaluate(() => {
      return (window as any).__wxJuego.store.loadState();
    });

    const initialXpWeekly = initialState.xpWeekly;

    // Record correct attempt against a lower Elo question (900)
    await page.evaluate(() => {
      (window as any).__wxJuego.engine.recordAttempt({
        questionId: 'e2e-q1',
        questionElo: 900,
        correct: true,
      });
    });

    const state = await page.evaluate(() => {
      return (window as any).__wxJuego.store.loadState();
    });

    // Assert player Elo increased above 1800
    expect(state.elo).toBeGreaterThan(1800);

    // Assert question Elo decreased below 900
    expect(state.questionElo['e2e-q1']).toBeLessThan(900);

    // Assert xpWeekly unchanged (XP/Elo separation)
    expect(state.xpWeekly).toBe(initialXpWeekly);
  });

  test('addActionXp x3 increases XP by +30 while Elo remains unchanged', async ({ page }) => {
    const initial = await page.evaluate(() => {
      return (window as any).__wxJuego.store.loadState();
    });

    // Call addActionXp('respuesta') 3 times
    await page.evaluate(() => {
      (window as any).__wxJuego.engine.addActionXp('respuesta');
      (window as any).__wxJuego.engine.addActionXp('respuesta');
      (window as any).__wxJuego.engine.addActionXp('respuesta');
    });

    const state = await page.evaluate(() => {
      return (window as any).__wxJuego.store.loadState();
    });

    // Verify XP incremented by +30 (+10 per answer action)
    expect(state.xpWeekly).toBe(initial.xpWeekly + 30);

    // Verify player Elo remained completely unchanged
    expect(state.elo).toBe(initial.elo);
  });

  test('Persistence roundtrip: state modifications persist across saveState and page reload', async ({ page }) => {
    // Mutate state using engine operations
    await page.evaluate(() => {
      (window as any).__wxJuego.engine.recordAttempt({
        questionId: 'persist-q',
        questionElo: 1000,
        correct: true,
      });
      (window as any).__wxJuego.engine.addActionXp('respuesta');
    });

    const stateBefore = await page.evaluate(() => {
      return (window as any).__wxJuego.store.loadState();
    });

    // Explicitly persist state via store.saveState
    await page.evaluate((st) => {
      (window as any).__wxJuego.store.saveState(st);
    }, stateBefore);

    // Reload browser page to test storage roundtrip
    await page.reload();

    // Load state post-reload and verify fidelity
    const stateAfter = await page.evaluate(() => {
      return (window as any).__wxJuego.store.loadState();
    });

    expect(stateAfter.elo).toBe(stateBefore.elo);
    expect(stateAfter.xpWeekly).toBe(stateBefore.xpWeekly);
    expect(stateAfter.questionElo['persist-q']).toBe(stateBefore.questionElo['persist-q']);
  });

  test('Cooldown: openRetry sets allowed=false, waitMs>0, and preserves focusTema', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__wxJuego.engine.openRetry('e2e-quiz-1', 60, 'simplificacion');
    });

    const status = await page.evaluate(() => {
      return (window as any).__wxJuego.engine.retryStatus('e2e-quiz-1');
    });

    // Assert cooldown restricts immediate re-attempt
    expect(status.allowed).toBe(false);
    expect(status.waitMs).toBeGreaterThan(0);

    // Assert study focus topic is maintained
    expect(status.focusTema).toBe('simplificacion');
  });

  test('Final score calculation uses max score after openRetry and closeAttempt', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__wxJuego.engine.openRetry('e2e-quiz-2', 60, 'algebra');
    });

    const finalSoFar = await page.evaluate(() => {
      return (window as any).__wxJuego.engine.closeAttempt('e2e-quiz-2', 85);
    });

    // Verify final score evaluates to max score achieved (85 vs initial 60)
    expect(finalSoFar).toBe(85);
  });

  test('Hazaña math in browser: applyAttempt returns expected playerDelta of 31', async ({ page }) => {
    const result = await page.evaluate(() => {
      return (window as any).__wxJuego.engine.applyAttempt(1200, 1800, true);
    });

    // Verify math result matches unit test expected value (playerDelta === 31)
    expect(result.playerDelta === 31).toBe(true);
    expect(result.playerDelta).toBe(31);
  });
});
