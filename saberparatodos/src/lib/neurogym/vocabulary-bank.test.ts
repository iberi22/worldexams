import { describe, it, expect } from 'vitest';
import {
  VOCABULARY_BANK,
  getVocabItem,
  getVocabSession,
  type VocabItem,
  type VocabDifficulty
} from './vocabulary-bank';

describe('vocabulary-bank (Gc Verbal Comprehension)', () => {
  it('has ≥50 items across 5 difficulty levels', () => {
    expect(VOCABULARY_BANK.length).toBeGreaterThanOrEqual(50);
    for (let d = 1; d <= 5; d++) {
      const count = VOCABULARY_BANK.filter((i) => i.difficulty === d).length;
      expect(count, `difficulty ${d}`).toBeGreaterThanOrEqual(5);
    }
  });

  it('every item has exactly 4 options and correctIndex in [0,3]', () => {
    const validPos = new Set(['noun', 'verb', 'adjective', 'adverb']);
    for (const item of VOCABULARY_BANK) {
      expect(item.options.length).toBe(4);
      expect(item.correctIndex).toBeGreaterThanOrEqual(0);
      expect(item.correctIndex).toBeLessThanOrEqual(3);
      expect(item.options[item.correctIndex]).toBeTruthy();
      expect(item.word.length).toBeGreaterThan(0);
      expect(validPos.has(item.partOfSpeech)).toBe(true);
      // distractores no duplicados entre sí
      const unique = new Set(item.options);
      expect(unique.size).toBe(4);
    }
  });

  it('getVocabItem is deterministic per seed', () => {
    const difficulties: VocabDifficulty[] = [1, 2, 3, 4, 5];
    for (const d of difficulties) {
      const a: VocabItem = getVocabItem(12345, d);
      const b: VocabItem = getVocabItem(12345, d);
      expect(a).toBe(b);
      expect(a.difficulty).toBe(d);
      // otras semillas siguen siendo deterministas y del nivel pedido
      expect(getVocabItem(999, d)).toBe(getVocabItem(999, d));
      expect(getVocabItem(999, d).difficulty).toBe(d);
    }
  });

  it('getVocabSession returns the requested count', () => {
    const s10 = getVocabSession(7, 10);
    expect(s10.length).toBe(10);
    const s5 = getVocabSession(7, 5);
    expect(s5.length).toBe(5);
    // reproducibilidad: misma semilla → misma secuencia
    expect(getVocabSession(7, 10).map((i) => i.word)).toEqual(s10.map((i) => i.word));
    // default count = 10
    expect(getVocabSession(42).length).toBe(10);
    // progresión de dificultad no decreciente
    for (let i = 1; i < s10.length; i++) {
      expect(s10[i].difficulty).toBeGreaterThanOrEqual(s10[i - 1].difficulty);
    }
  });
});
