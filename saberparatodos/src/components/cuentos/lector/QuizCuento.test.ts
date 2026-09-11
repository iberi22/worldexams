/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { parseCuentoMd } from '../../../lib/cuentos/cuento-schema';

describe('QuizCuento Component & Data Flow Verification', () => {
  const sampleCuentoPath = path.resolve(
    __dirname,
    '../../../../../questions_data/cuentos/tana-tucan-comparte/cuento.md'
  );
  const quizComponentPath = path.resolve(__dirname, 'QuizCuento.svelte');

  it('verifica que el cuento semilla tenga un quiz válido de 3 preguntas con feedback y explicación', () => {
    const rawMd = fs.readFileSync(sampleCuentoPath, 'utf8');
    const cuento = parseCuentoMd(rawMd, sampleCuentoPath);

    expect(cuento.quiz).toHaveLength(3);
    expect(cuento.explicacion.length).toBeGreaterThan(10);

    cuento.quiz.forEach((q, qIdx) => {
      expect(q.n).toBe(qIdx + 1);
      expect(q.texto.length).toBeGreaterThan(5);
      expect(q.opciones).toHaveLength(3);

      const correctOptions = q.opciones.filter((o) => o.correcta);
      expect(correctOptions).toHaveLength(1);

      q.opciones.forEach((opt) => {
        expect(opt.letra).toMatch(/^[A-C]$/);
        expect(opt.texto.length).toBeGreaterThan(0);
        expect(opt.feedback.length).toBeGreaterThan(0);
      });
    });
  });

  it('verifica que QuizCuento.svelte use únicamente Svelte 5 runes ($state, $props, $derived, $effect)', () => {
    const svelteContent = fs.readFileSync(quizComponentPath, 'utf8');

    // Must use Svelte 5 runes
    expect(svelteContent).toContain('$props()');
    expect(svelteContent).toContain('$state(');
    expect(svelteContent).toContain('$derived(');

    // Forbidden legacy reactive syntax in new Svelte 5 code
    expect(svelteContent).not.toMatch(/^\s*\$:\s+/m);
    expect(svelteContent).not.toMatch(/export\s+let\s+/);
  });

  it('Satisface las reglas BR-03 y BR-07: CERO llamadas a red, telemetría, analytics o almacenamiento de respuestas', () => {
    const svelteContent = fs.readFileSync(quizComponentPath, 'utf8');

    // Zero telemetry / network / storage leakage
    expect(svelteContent).not.toMatch(/\bfetch\s*\(/);
    expect(svelteContent).not.toMatch(/\bXMLHttpRequest\b/);
    expect(svelteContent).not.toMatch(/\blocalservice\b/i);
    expect(svelteContent).not.toMatch(/\banalytics\b/i);
    expect(svelteContent).not.toMatch(/\btelemetry\b/i);
    expect(svelteContent).not.toMatch(/localStorage\.setItem/);
  });

  it('Incluye elementos de accesibilidad (aria-label, aria-pressed, role="status") y dimensiones mínimas táctiles', () => {
    const svelteContent = fs.readFileSync(quizComponentPath, 'utf8');

    expect(svelteContent).toContain('aria-label="Quiz del cuento"');
    expect(svelteContent).toContain('aria-pressed={isSelected}');
    expect(svelteContent).toContain('role="radiogroup"');
    expect(svelteContent).toContain('role="status"');
    expect(svelteContent).toContain('aria-live="polite"');

    // Minimum target size requirement (min-height >= 48px/50px/54px)
    expect(svelteContent).toContain('min-height: 54px');
    expect(svelteContent).toContain('min-height: 50px');
    expect(svelteContent).toContain('min-height: 48px');
  });

  it('Soporta prefers-reduced-motion para congelar animaciones de celebración', () => {
    const svelteContent = fs.readFileSync(quizComponentPath, 'utf8');

    expect(svelteContent).toContain('@media (prefers-reduced-motion: reduce)');
    expect(svelteContent).toContain('animation: none !important;');
  });

  it('Incrusta botones caritas con SVG puro y paleta de tokens del arte de cuentos', () => {
    const svelteContent = fs.readFileSync(quizComponentPath, 'utf8');

    // Inline SVGs for Happy, Thinking, and Neutral faces
    expect(svelteContent).toContain('fill="#FF9F43"'); // Mango / Joy
    expect(svelteContent).toContain('fill="#4FB6A3"'); // Water Green / Calm
    expect(svelteContent).toContain('fill="#5B6FD6"'); // Comet / Magic
    expect(svelteContent).toContain('<circle cx="24" cy="24" r="21"');
  });
});
