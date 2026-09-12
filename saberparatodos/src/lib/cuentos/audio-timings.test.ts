/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */
import { describe, it, expect } from 'vitest';
import {
  splitWords,
  resolveAudioUrl,
  estimateDuration,
  computeTimings,
  highlightIndexAt,
  charRangeForWord,
  validatePageTimings,
  SECS_PER_WORD_ESTIMATE,
  DEFAULT_NARRATION_RATE,
  NARRATION_RATES
} from './audio-timings';

describe('audio-timings (C7.07, puras sin DOM)', () => {
  it('splitWords usa blank-split identico al generador', () => {
    expect(splitWords('Tana  compartía\tsu\nmaíz')).toEqual(['Tana', 'compartía', 'su', 'maíz']);
    expect(splitWords('')).toEqual([]);
    expect(splitWords('   ')).toEqual([]);
  });

  it('resolveAudioUrl sigue el layout de gen-cuentos-audio.py', () => {
    expect(resolveAudioUrl('tana-tucan-comparte', 3)).toBe('/audio/cuentos/tana-tucan-comparte/p3.mp3');
  });

  it('estimateDuration = palabras x 0.45s', () => {
    expect(estimateDuration(['a', 'b', 'c', 'd'])).toBeCloseTo(4 * SECS_PER_WORD_ESTIMATE, 6);
    expect(estimateDuration([])).toBe(0);
  });

  it('computeTimings: longitud 1:1, inicia en 0, monotónico, peso por caracteres', () => {
    const words = ['Tana', 'compartía', 'su', 'maíz'];
    const t = computeTimings(words, 4);
    expect(t).toHaveLength(words.length);
    expect(t[0]).toBe(0);
    for (let i = 1; i < t.length; i++) expect(t[i]).toBeGreaterThan(t[i - 1]);
    // 'compartía' (9 chars) ocupa más que 'su' (2 chars)
    const spanLong = t[2] - t[1];
    const spanShort = t[3] - t[2];
    expect(spanLong).toBeGreaterThan(spanShort);
    expect([]).toEqual(computeTimings([], 5));
  });

  it('highlightIndexAt: último inicio <= t', () => {
    const t = [0, 0.5, 1.2, 2.0];
    expect(highlightIndexAt(t, 0)).toBe(0);
    expect(highlightIndexAt(t, 0.7)).toBe(1);
    expect(highlightIndexAt(t, 5)).toBe(3);
    expect(highlightIndexAt([], 1)).toBe(-1);
  });

  it('charRangeForWord mapea índice de palabra a rango de caracteres', () => {
    const texto = 'Tana compartía su maíz';
    // T=0..3, compartía=5..13, su=15..16, maíz=18..21
    expect(charRangeForWord(texto, 0)).toEqual({ start: 0, length: 4 });
    expect(charRangeForWord(texto, 1)).toEqual({ start: 5, length: 9 });
    expect(charRangeForWord(texto, 2)).toEqual({ start: 15, length: 2 });
    expect(charRangeForWord(texto, 3)).toEqual({ start: 18, length: 4 });
    expect(charRangeForWord(texto, 9)).toBeNull();
    expect(charRangeForWord('', 0)).toBeNull();
  });

  it('charRange coincide con splitWords en textos reales del pack', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const packPath = path.resolve(__dirname, '../../../public/v1/cuentos/tana-tucan-comparte.json');
    const pack = JSON.parse(fs.readFileSync(packPath, 'utf8'));
    const pages = pack.paginas || pack.pages;
    expect(pages.length).toBeGreaterThan(0);
    for (const p of pages) {
      const words = splitWords(p.texto);
      expect(words.length).toBeGreaterThan(0);
      const last = charRangeForWord(p.texto, words.length - 1);
      expect(last).not.toBeNull();
      // El resaltado de la última palabra cae dentro del texto
      expect(last!.start + last!.length).toBeLessThanOrEqual(p.texto.length);
    }
  });

  it('validatePageTimings acepta timings válidos y rechaza inválidos', () => {
    const texto = 'Tana compartía su maíz';
    const ok = computeTimings(splitWords(texto), 2);
    expect(validatePageTimings(texto, ok)).toBeNull();
    expect(validatePageTimings(texto, null)).toContain('ausente');
    expect(validatePageTimings(texto, [0, 0.5])).toContain('!=');
    expect(validatePageTimings(texto, [0.2, 0.5, 0.9, 1.5])).toContain('debe ser 0');
    expect(validatePageTimings(texto, [0, 0.9, 0.5, 1.5])).toContain('no monotónico');
  });

  it('constantes del player según spec (rates 0.8-1.0, default 0.9)', () => {
    expect([...NARRATION_RATES]).toEqual([0.8, 0.9, 1.0]);
    expect(DEFAULT_NARRATION_RATE).toBe(0.9);
  });
});
