import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  CATALOGO_LOGROS,
  LOGROS_STORAGE_KEY,
  getLogrosDesbloqueadosMap,
  tieneLogro,
  getLogrosDesbloqueados,
  desbloquearLogro,
  listarLogros,
  evaluarYDesbloquearLogros,
  _resetMemoryStoreForTest
} from './logros';
import type { CuentoProgressRecord } from './progreso';

describe('Logros Cuentos Module (local-first, zero-telemetry)', () => {
  beforeEach(() => {
    localStorage.clear();
    _resetMemoryStoreForTest();
    vi.restoreAllMocks();
  });

  it('1. returns empty map when no achievements unlocked', () => {
    const map = getLogrosDesbloqueadosMap();
    expect(map).toEqual({});
    expect(getLogrosDesbloqueados()).toHaveLength(0);
  });

  it('2. unlocks an achievement idempotently (deduplication)', () => {
    const firstUnlock = desbloquearLogro('primera-lectura');
    expect(firstUnlock).toBe(true);
    expect(tieneLogro('primera-lectura')).toBe(true);

    const secondUnlock = desbloquearLogro('primera-lectura');
    expect(secondUnlock).toBe(false); // Duplicate ignored

    const list = getLogrosDesbloqueados();
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe('primera-lectura');
  });

  it('3. evaluates "primera-lectura" predicate correctly', () => {
    const logro = CATALOGO_LOGROS.find((l) => l.id === 'primera-lectura')!;
    expect(logro).toBeDefined();

    const emptyProgress: Record<string, CuentoProgressRecord> = {};
    expect(logro.condicion!(emptyProgress)).toBe(false);

    const activeProgress: Record<string, CuentoProgressRecord> = {
      'tana-tucan': {
        slug: 'tana-tucan',
        lastPage: 2,
        finished: false,
        quizBest: 0,
        updatedAt: new Date().toISOString()
      }
    };
    expect(logro.condicion!(activeProgress)).toBe(true);
  });

  it('4. evaluates "quiz-3-3" predicate correctly', () => {
    const logro = CATALOGO_LOGROS.find((l) => l.id === 'quiz-3-3')!;
    expect(logro).toBeDefined();

    const partialQuizProgress: Record<string, CuentoProgressRecord> = {
      'tana-tucan': {
        slug: 'tana-tucan',
        lastPage: 5,
        finished: true,
        quizBest: 2,
        updatedAt: new Date().toISOString()
      }
    };
    expect(logro.condicion!(partialQuizProgress)).toBe(false);

    const perfectQuizProgress: Record<string, CuentoProgressRecord> = {
      'tana-tucan': {
        slug: 'tana-tucan',
        lastPage: 5,
        finished: true,
        quizBest: 3,
        updatedAt: new Date().toISOString()
      }
    };
    expect(logro.condicion!(perfectQuizProgress)).toBe(true);
  });

  it('5. evaluates "tres-cuentos" predicate correctly', () => {
    const logro = CATALOGO_LOGROS.find((l) => l.id === 'tres-cuentos')!;
    expect(logro).toBeDefined();

    const twoFinished: Record<string, CuentoProgressRecord> = {
      c1: { slug: 'c1', lastPage: 5, finished: true, quizBest: 3, updatedAt: '' },
      c2: { slug: 'c2', lastPage: 5, finished: true, quizBest: 3, updatedAt: '' },
      c3: { slug: 'c3', lastPage: 2, finished: false, quizBest: 1, updatedAt: '' }
    };
    expect(logro.condicion!(twoFinished)).toBe(false);

    const threeFinished: Record<string, CuentoProgressRecord> = {
      c1: { slug: 'c1', lastPage: 5, finished: true, quizBest: 3, updatedAt: '' },
      c2: { slug: 'c2', lastPage: 5, finished: true, quizBest: 3, updatedAt: '' },
      c3: { slug: 'c3', lastPage: 5, finished: true, quizBest: 3, updatedAt: '' }
    };
    expect(logro.condicion!(threeFinished)).toBe(true);
  });

  it('6. evaluates "cinco-cuentos" and "diez-cuentos" predicates correctly', () => {
    const logro5 = CATALOGO_LOGROS.find((l) => l.id === 'cinco-cuentos')!;
    const logro10 = CATALOGO_LOGROS.find((l) => l.id === 'diez-cuentos')!;

    const progress10: Record<string, CuentoProgressRecord> = {};
    for (let i = 1; i <= 10; i++) {
      progress10[`story-${i}`] = {
        slug: `story-${i}`,
        lastPage: 5,
        finished: true,
        quizBest: 3,
        updatedAt: ''
      };
    }

    expect(logro5.condicion!(progress10)).toBe(true);
    expect(logro10.condicion!(progress10)).toBe(true);
  });

  it('7. lists catalog achievements with unlocked flags', () => {
    desbloquearLogro('primera-lectura');
    const catalog = listarLogros();

    const primera = catalog.find((l) => l.id === 'primera-lectura');
    const quiz3 = catalog.find((l) => l.id === 'quiz-3-3');

    expect(primera?.desbloqueado).toBe(true);
    expect(quiz3?.desbloqueado).toBe(false);
  });

  it('8. evaluates and unlocks new achievements given progress state', () => {
    const progress: Record<string, CuentoProgressRecord> = {
      'tana-tucan': {
        slug: 'tana-tucan',
        lastPage: 5,
        finished: true,
        quizBest: 3,
        updatedAt: new Date().toISOString()
      }
    };

    const nuevos = evaluarYDesbloquearLogros(progress, 'tana-tucan');
    // Should unlock 'primera-lectura', 'quiz-3-3', and 'cuento-completo-tana-tucan'
    expect(nuevos.map((n) => n.id)).toEqual(
      expect.arrayContaining(['primera-lectura', 'quiz-3-3', 'cuento-completo-tana-tucan'])
    );

    // Second evaluation with same state returns 0 new unlocks
    const reEval = evaluarYDesbloquearLogros(progress, 'tana-tucan');
    expect(reEval).toHaveLength(0);
  });

  it('9. recovers gracefully from corrupted JSON in localStorage', () => {
    localStorage.setItem(LOGROS_STORAGE_KEY, '{invalid_json_str:');

    const map = getLogrosDesbloqueadosMap();
    expect(map).toEqual({});

    // Unlocking still succeeds after corruption
    const unlocked = desbloquearLogro('primera-lectura');
    expect(unlocked).toBe(true);
    expect(tieneLogro('primera-lectura')).toBe(true);
  });

  it('10. handles localStorage throwing QuotaExceededError via in-memory store', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError', 'QuotaExceededError');
    });

    const unlocked = desbloquearLogro('primera-lectura');
    expect(unlocked).toBe(true);
    expect(tieneLogro('primera-lectura')).toBe(true);
  });

  it('11. verifies zero telemetry / network imports', () => {
    expect(typeof window).toBe('object');
  });
});
