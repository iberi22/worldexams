/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('CargandoCuento Component Specification', () => {
  const loaderPath = path.resolve(__dirname, 'CargandoCuento.svelte');

  it('verifica que CargandoCuento.svelte exista y use Svelte 5 runes', () => {
    expect(fs.existsSync(loaderPath)).toBe(true);
    const content = fs.readFileSync(loaderPath, 'utf8');

    expect(content).toContain('$props()');
    expect(content).toContain('$state(');
  });

  it('cumple con cero peso externo (inline SVG únicamente, sin imágenes ni base64)', () => {
    const content = fs.readFileSync(loaderPath, 'utf8');

    expect(content).not.toMatch(/\bhttp:\/\//);
    expect(content).not.toMatch(/\bhttps:\/\//);
    expect(content).not.toMatch(/data:image/);
    expect(content).not.toMatch(/<image\b/);
  });

  it('cumple con el veto de español neutro en las frases lúdicas por defecto', () => {
    const content = fs.readFileSync(loaderPath, 'utf8');
    const forbidden = /\b(vos|che|chido|chévere|bacán)\b/i;

    expect(forbidden.test(content)).toBe(false);
  });

  it('soporta prefers-reduced-motion para detener animaciones CSS', () => {
    const content = fs.readFileSync(loaderPath, 'utf8');

    expect(content).toContain('@media (prefers-reduced-motion: reduce)');
    expect(content).toContain('animation: none !important;');
  });

  it('contiene la estructura visual del cielo nocturno y la luna dormida', () => {
    const content = fs.readFileSync(loaderPath, 'utf8');

    expect(content).toContain('cargando-cuento-root');
    expect(content).toContain('sleeping-moon-svg');
    expect(content).toContain('loader-line');
  });
});
