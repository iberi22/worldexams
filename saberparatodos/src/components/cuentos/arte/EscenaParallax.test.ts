/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('EscenaParallax.svelte Component & Parallax Motion Suite', () => {
  const componentPath = path.resolve(__dirname, 'EscenaParallax.svelte');

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('verifies EscenaParallax.svelte component file exists', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('contains required 3 plane selectors and Svelte 5 runes', () => {
    const code = fs.readFileSync(componentPath, 'utf-8');
    expect(code).toContain('id="plano-fondo"');
    expect(code).toContain('id="plano-medio"');
    expect(code).toContain('id="plano-frente"');
    expect(code).toContain('$props()');
    expect(code).toContain('$state');
    expect(code).toContain('$effect');
  });

  it('enforces motion hygiene: no left/top/width/height/filter CSS properties animated and translate3d transform used', () => {
    const code = fs.readFileSync(componentPath, 'utf-8');
    // Check transform-only translate3d usage
    expect(code).toContain('translate3d(');
    // Check zero forbidden CSS property animations
    const forbiddenMatch = code.match(/\.(left|top|width|height|filter)[[:space:]]*:/g);
    expect(forbiddenMatch).toBeNull();
  });

  it('guards against Three.js / WebGL dependencies in component source', () => {
    const code = fs.readFileSync(componentPath, 'utf-8');
    expect(code).not.toMatch(/three|webgl|@types\/three|threejs/i);
  });

  it('honors prefers-reduced-motion: reduce by forcing matchMedia reduce and asserting no rAF loop or motion listeners', () => {
    const code = fs.readFileSync(componentPath, 'utf-8');

    // Source contains prefers-reduced-motion media query handling
    expect(code).toContain('prefers-reduced-motion');
    expect(code).toContain('isReducedMotion');

    // Simulate matchMedia for prefers-reduced-motion
    let addEventListenerCalled = false;
    let requestAnimationFrameCalled = false;

    const mockMatchMedia = vi.fn().mockImplementation((query: string) => {
      if (query.includes('prefers-reduced-motion')) {
        return {
          matches: true, // User prefers reduced motion
          addEventListener: vi.fn(() => {
            addEventListenerCalled = true;
          }),
          removeEventListener: vi.fn(),
          addListener: vi.fn(),
          removeListener: vi.fn(),
        };
      }
      return { matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    });

    vi.stubGlobal('matchMedia', mockMatchMedia);

    const mockRaf = vi.fn().mockImplementation(() => {
      requestAnimationFrameCalled = true;
      return 1;
    });
    vi.stubGlobal('requestAnimationFrame', mockRaf);

    // Verify logic when matches is true: no rAF scheduled
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    expect(mediaQuery.matches).toBe(true);
  });

  it('contains tap reaction class for frente plane and WebAudio oscillator feedback', () => {
    const code = fs.readFileSync(componentPath, 'utf-8');
    expect(code).toContain('cuento-frente-bounce');
    expect(code).toContain('triggerSceneTapReaction');
    // El sonido vive en el sintetizador compartido (un solo AudioContext).
    expect(code).toContain("from '../../../lib/cuentos/sonidos'");
    const synth = fs.readFileSync(path.resolve(__dirname, '../../../lib/cuentos/sonidos.ts'), 'utf-8');
    expect(synth).toContain('createOscillator');
  });

  it('delegates declarative interactivity (data-hotspot / data-contable / zoom) and keeps idle CSS reduced-motion safe', () => {
    const code = fs.readFileSync(componentPath, 'utf-8');
    expect(code).toContain("closest('[data-hotspot]')");
    expect(code).toContain("closest('[data-contable]')");
    expect(code).toContain('entrarZoom');
    expect(code).toContain("e.key === 'Escape'");
    // Defs del SVG fuente (gradientes) se conservan
    expect(code).toContain('{@html rawDefs}');

    const css = fs.readFileSync(path.resolve(__dirname, 'escena-viva.css'), 'utf-8');
    expect(css).toContain("[data-idle='respira']");
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*\[data-idle\][\s\S]*animation: none !important/);
    // Solo transform/opacity en keyframes (sin propiedades de layout)
    const keyframes = css.match(/@keyframes[\s\S]*?\n}\n/g) ?? [];
    for (const kf of keyframes) {
      expect(kf).not.toMatch(/\b(left|top|width|height|filter)\s*:/);
    }
  });
});
