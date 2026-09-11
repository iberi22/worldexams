/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import tanaPack from '../../public/v1/cuentos/tana-tucan-comparte.json';

describe('CuentoReader.svelte — Story Reader Component Suite (Ola C2.01)', () => {
  const componentPath = path.resolve(__dirname, '../../src/components/cuentos/lector/CuentoReader.svelte');

  it('verifica que el componente CuentoReader.svelte exista en la ruta requerida', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('utiliza exclusivamente Svelte 5 runes ($state, $props, $derived, $effect) sin sintaxis legada ($: o export let)', () => {
    const code = fs.readFileSync(componentPath, 'utf8');

    expect(code).toContain('$props()');
    expect(code).toContain('$state(');
    expect(code).toContain('$derived(');
    expect(code).toContain('$effect(');

    // No legacy syntax
    expect(code).not.toMatch(/^\s*\$:\s+/m);
    expect(code).not.toMatch(/^\s*export\s+let\s+/m);
  });

  it('valida la estructura del paquete semilla (tana-tucan-comparte) para renderizar la página 1 (30-80 palabras + SVG)', () => {
    expect(tanaPack.slug).toBe('tana-tucan-comparte');
    expect(tanaPack.paginas.length).toBe(8);

    const page1 = tanaPack.paginas[0];
    expect(page1.n).toBe(1);
    expect(page1.imagen).toContain('escenas/p1-arbol.svg');
    expect(page1.alt).toBeTruthy();

    const wordCount = page1.texto.trim().split(/\s+/).length;
    expect(wordCount).toBeGreaterThanOrEqual(30);
    expect(wordCount).toBeLessThanOrEqual(80);
  });

  it('garantiza que la velocidad de lectura lenta sea mayor a la velocidad normal (slow interval > normal interval)', () => {
    const code = fs.readFileSync(componentPath, 'utf8');

    expect(code).toContain('SPEED_INTERVALS');
    expect(code).toContain('normal: 6000');
    expect(code).toContain('lento: 10000');

    // Assertion on interval relationship
    const normalInterval = 6000;
    const slowInterval = 10000;
    expect(slowInterval).toBeGreaterThan(normalInterval);
  });

  it('contiene botones con etiquetas accesibles y targets táctiles de mínimo 48px', () => {
    const code = fs.readFileSync(componentPath, 'utf8');

    expect(code).toContain('aria-label="Página anterior"');
    expect(code).toContain('aria-label="Página siguiente"');
    expect(code).toContain('aria-label="Lector de cuentos"');
    expect(code).toContain('aria-live="polite"');

    // Min height / width 48px touch targets
    expect(code).toContain('min-height: 48px');
    expect(code).toContain('min-width: 48px');
  });

  it('soporta navegación por teclado (ArrowLeft, ArrowRight) y respeta prefers-reduced-motion', () => {
    const code = fs.readFileSync(componentPath, 'utf8');

    expect(code).toContain("event.key === 'ArrowRight'");
    expect(code).toContain("event.key === 'ArrowLeft'");
    expect(code).toContain("prefers-reduced-motion: reduce");
  });

  it('garantiza cero telemetría, cero tokens y cero modismos no neutros (BR-03/BR-07)', () => {
    const code = fs.readFileSync(componentPath, 'utf8');

    expect(code).not.toMatch(/fetch\(|analytics|telemetry|\$SWAL|karma/i);
    expect(code).not.toMatch(/\b(pesos|dólares|voseo|che|parce|pibe|chido)\b/i);
  });
});
