/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { splitWords, validatePageTimings } from '../../../lib/cuentos/audio-timings';

const PACKS_DIR = path.resolve(__dirname, '../../../../public/v1/cuentos');
const COMPONENT_PATH = path.resolve(__dirname, 'AudioCuento.svelte');
const PACKAGE_JSON = path.resolve(__dirname, '../../../../../package.json');

function packSlugs(): string[] {
  return fs
    .readdirSync(PACKS_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'index.json')
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
}

describe('AudioCuento C7.07 — invariantes de pack (timings + audio)', () => {
  it('los 10 cuentos tienen pack con timings 1:1 y audio MP3 por página', () => {
    const slugs = packSlugs();
    expect(slugs).toHaveLength(10);
    let pages = 0;
    for (const slug of slugs) {
      const pack = JSON.parse(fs.readFileSync(path.join(PACKS_DIR, `${slug}.json`), 'utf8'));
      const packPages = pack.paginas || pack.pages;
      expect(packPages.length).toBeGreaterThanOrEqual(8);
      for (const p of packPages) {
        pages++;
        // timings 1:1 con palabras renderizadas
        expect(
          validatePageTimings(p.texto, p.timings),
          `${slug} p${p.n}: ${validatePageTimings(p.texto, p.timings)}`
        ).toBeNull();
        // audio MP3 existe en disco cuando el pack lo declara
        expect(typeof p.audio).toBe('string');
        const abs = path.resolve(PACKS_DIR, '../../audio/cuentos', slug, `p${p.n}.mp3`);
        expect(fs.existsSync(abs), `${slug} p${p.n}: falta ${abs}`).toBe(true);
      }
    }
    expect(pages).toBe(80);
  });

  it('timings usan offsets reales (último offset > 0 en páginas con texto)', () => {
    for (const slug of packSlugs()) {
      const pack = JSON.parse(fs.readFileSync(path.join(PACKS_DIR, `${slug}.json`), 'utf8'));
      for (const p of pack.paginas || pack.pages) {
        const words = splitWords(p.texto);
        if (words.length > 1) {
          expect(p.timings[p.timings.length - 1]).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe('cuentos-catalog — dato runtime para AudioCuento', () => {
  it('parseCuentoMarkdown separa hint/words del texto narrable (no leak crudo)', async () => {
    const { parseCuentoMarkdown } = await import('../../../lib/cuentos/cuentos-catalog');
    const md = fs.readFileSync(
      path.resolve(__dirname, '../../../../../questions_data/cuentos/tana-tucan-comparte/cuento.md'),
      'utf8'
    );
    const detail = parseCuentoMarkdown(md);
    expect(detail.paginasList.length).toBeGreaterThanOrEqual(8);
    for (const p of detail.paginasList) {
      expect(p.texto).not.toContain('Para conversar en familia:');
      expect(p.texto).not.toContain('Palabras nuevas:');
    }
    expect(detail.paginasList[0].hint).toBeTruthy();
    expect(detail.paginasList[0].words!.length).toBeGreaterThan(0);
  });

  it('getCuentoBySlug normaliza el pack a CuentoDetail (paginasList + quiz)', async () => {
    const { getCuentoBySlug } = await import('../../../lib/cuentos/cuentos-catalog');
    const cuento: any = await getCuentoBySlug('tana-tucan-comparte');
    expect(cuento).not.toBeNull();
    // UNA sola forma para todos los consumidores: paginasList + quiz.preguntas
    expect(cuento.paginasList.length).toBe(8);
    expect(cuento.quiz.preguntas.length).toBe(3);
    expect(cuento.quiz.preguntas[0].opciones[0].esCorrecta).toBe(true);
    // Narración C7.07 preservada en la normalización
    expect(cuento.paginasList[0].audio).toBe('/audio/cuentos/tana-tucan-comparte/p1.mp3');
    expect(validatePageTimings(cuento.paginasList[0].texto, cuento.paginasList[0].timings)).toBeNull();
    // Escenas con prefijo público + hint/words v2
    expect(cuento.paginasList[0].escena.startsWith('/v1/cuentos/')).toBe(true);
    expect(cuento.paginasList[0].hint).toBeTruthy();
  });
});

describe('AudioCuento.svelte — contrato estático (estilo QuizCuento.test.ts)', () => {
  const src = () => fs.readFileSync(COMPONENT_PATH, 'utf8');

  it('existe y usa Svelte 5 runes ($props, $state, $derived)', () => {
    expect(fs.existsSync(COMPONENT_PATH)).toBe(true);
    const s = src();
    expect(s).toContain('$props()');
    expect(s).toContain('$state');
    expect(s).toContain('$derived');
  });

  it('reutiliza read-aloud.ts (speak/stop/pause/resume) sin speechSynthesis inline', () => {
    const s = src();
    expect(s).toContain("from './read-aloud'");
    expect(s).toContain('pauseSpeech');
    expect(s).toContain('resumeSpeech');
    expect(s).not.toContain('new SpeechSynthesisUtterance');
    expect(s).not.toContain('window.speechSynthesis.speak');
  });

  it('resuelve modo por página: MP3 -> <audio> + timings, ausente -> fallback voz', () => {
    const s = src();
    expect(s).toContain('<audio');
    expect(s).toContain('ontimeupdate');
    expect(s).toContain('onended');
    expect(s).toContain('onerror');
    expect(s).toContain('highlightIndexAt');
    expect(s).toContain('charRangeForWord');
  });

  it('controles play/pausa, replay, rate 0.8-1.0 default 0.9 + copy neutro', () => {
    const s = src();
    expect(s).toContain('aria-label="Repetir narración"');
    expect(s).toContain('Velocidad de narración');
    expect(s).toContain('DEFAULT_NARRATION_RATE');
    expect(s).toContain('Toca para escuchar');
    expect(s).toContain('Narrando…');
  });

  it('sin llaves cloud ni telemetría; respeta reduced-motion', () => {
    const s = src();
    expect(s).not.toMatch(/api[_-]?key|azure|elevenlabs|edge-tts/i);
    expect(s).toContain('prefers-reduced-motion');
  });

  it('no añade dependencias npm', () => {
    const before = fs.readFileSync(PACKAGE_JSON, 'utf8');
    expect(before).not.toContain('howler');
    expect(before).not.toContain('tone');
  });

  it('LectorInmersivo integra AudioCuento remontado por página (sin speak directo)', () => {
    const lector = fs.readFileSync(path.resolve(__dirname, 'LectorInmersivo.svelte'), 'utf8');
    expect(lector).toContain("import AudioCuento from './AudioCuento.svelte'");
    expect(lector).toContain('<AudioCuento');
    expect(lector).toContain('{#key');
    expect(lector).not.toContain("from './read-aloud'");
  });
});
