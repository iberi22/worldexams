/**
 * Audio + timings helpers for Cuento narration (C7.07).
 *
 * Absolute path reference:
 * saberparatodos/src/lib/cuentos/audio-timings.ts
 *
 * Pure, framework-free functions so they are unit-testable without
 * DOM/audio hardware. The single source of truth for word tokenization:
 * blank-split (`/[^\s]+/g`). The pack generator
 * (`scripts/generate-cuento-packs.js`) MUST use the identical rule so
 * `timings.length === rendered word count` holds for every page
 * (enforced by AudioCuento.test.ts pack-invariant assertions).
 *
 * Constraints:
 * - No new npm deps; no cloud TTS keys; no telemetry (BR-03/BR-07).
 * - Neutral Spanish status copy lives in AudioCuento.svelte, not here.
 */

/** Base URL for pre-generated narration MP3s (edge-tts, es-MX-DaliaNeural). */
export const CUENTOS_AUDIO_BASE = '/audio/cuentos';

/** Child listening rate estimate: seconds per word at edge-tts -5% rate. */
export const SECS_PER_WORD_ESTIMATE = 0.45;

/** Player rates (0.8-1.0, default 0.9) per C7.07 spec. */
export const NARRATION_RATES = [0.8, 0.9, 1.0] as const;
export const DEFAULT_NARRATION_RATE = 0.9;

/**
 * Splits rendered page text into words. MUST stay identical to the
 * generator's tokenization (`texto.split(/\s+/).filter(Boolean)`).
 */
export function splitWords(texto: string): string[] {
  if (!texto) return [];
  return texto.split(/\s+/).filter(Boolean);
}

/**
 * Resolves the narration MP3 URL for a page, or null when there is none
 * (player then uses the Web Speech fallback path).
 */
export function resolveAudioUrl(slug: string, pageN: number): string {
  return `${CUENTOS_AUDIO_BASE}/${slug}/p${pageN}.mp3`;
}

/**
 * Estimates total narration seconds for a word list at child listening rate.
 */
export function estimateDuration(words: readonly string[], secsPerWord = SECS_PER_WORD_ESTIMATE): number {
  if (words.length === 0) return 0;
  return Math.round(words.length * secsPerWord * 1000) / 1000;
}

/**
 * Computes per-word START offsets (seconds) distributing `totalSeconds`
 * by character-weight share. Guarantees:
 * - `result.length === words.length` (pad/trim never needed downstream)
 * - `result[0] === 0`, strictly increasing for non-empty input
 * - offsets rounded to milliseconds (compact packs)
 */
export function computeTimings(words: readonly string[], totalSeconds: number): number[] {
  if (words.length === 0) return [];
  const total = Math.max(totalSeconds, 0.001);
  const weights = words.map((w) => Math.max(w.length, 1));
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const timings: number[] = [];
  let acc = 0;
  for (let i = 0; i < words.length; i++) {
    timings.push(Math.round(acc * 1000) / 1000);
    acc += (total * weights[i]) / weightSum;
  }
  // Guard against float rounding producing a non-increasing tail
  for (let i = 1; i < timings.length; i++) {
    if (timings[i] <= timings[i - 1]) {
      timings[i] = Math.round((timings[i - 1] + 0.001) * 1000) / 1000;
    }
  }
  return timings;
}

/**
 * Returns the active word index for playback time `t` (last start <= t).
 * Pure highlight-index math used by the MP3 path (no audio hardware needed).
 */
export function highlightIndexAt(timings: readonly number[], t: number): number {
  if (timings.length === 0) return -1;
  let idx = 0;
  for (let i = 0; i < timings.length; i++) {
    if (timings[i] <= t) idx = i;
    else break;
  }
  return idx;
}

export interface CharRange {
  start: number;
  length: number;
}

/**
 * Maps a word index to the {start, length} char range in the original text,
 * using the same blank-split tokenization. Used to feed the reader's
 * existing karaoke `<mark>` slot from MP3-path highlight indexes.
 * Returns null when the index is out of range.
 */
export function charRangeForWord(texto: string, wordIndex: number): CharRange | null {
  if (!texto || wordIndex < 0) return null;
  const re = /[^\s]+/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(texto)) !== null) {
    if (i === wordIndex) {
      return { start: m.index, length: m[0].length };
    }
    i++;
  }
  return null;
}

/**
 * Validates a stored pack page: timings present, 1:1 with rendered words,
 * monotonic with first offset 0. Returns an error string or null when OK.
 */
export function validatePageTimings(texto: string, timings: unknown): string | null {
  if (!Array.isArray(timings)) return 'timings ausente o no es arreglo';
  const words = splitWords(texto);
  if (timings.length !== words.length) {
    return `timings.length ${timings.length} != palabras ${words.length}`;
  }
  if (words.length === 0) return null;
  if (typeof timings[0] !== 'number' || timings[0] !== 0) {
    return 'timings[0] debe ser 0';
  }
  for (let i = 1; i < timings.length; i++) {
    if (typeof timings[i] !== 'number' || timings[i] < (timings[i - 1] as number)) {
      return `timings no monotónico en índice ${i}`;
    }
  }
  return null;
}
