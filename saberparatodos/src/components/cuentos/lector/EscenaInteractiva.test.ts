/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('EscenaInteractiva.svelte Component Suite (Wave C2.04)', () => {
  const componentPath = path.resolve(__dirname, 'EscenaInteractiva.svelte');

  it('existe y contiene el encabezado legal de copyright en la primera línea', () => {
    expect(fs.existsSync(componentPath)).toBe(true);
    const content = fs.readFileSync(componentPath, 'utf8');
    const firstLine = content.trim().split('\n')[0];

    expect(firstLine).toContain('© 2026 SaberParaTodos');
  });

  it('utiliza runes de Svelte 5 ($props, $state) y evita sintaxis reactiva obsoleta ($:)', () => {
    const content = fs.readFileSync(componentPath, 'utf8');

    expect(content).toContain('$props()');
    expect(content).toContain('$state');
    expect(content).not.toMatch(/\$:\s+/);
    expect(content).not.toMatch(/export\s+let\s+/);
  });

  it('no contiene coordenadas hardcodeadas y maneja hotspots de forma 100% data-driven', () => {
    const content = fs.readFileSync(componentPath, 'utf8');

    // Mapea sobre la prop `hotspots`
    expect(content).toContain('{#each hotspots as hs');
    expect(content).toContain('transform={`translate(${hs.x}, ${hs.y})`}');
    expect(content).toContain('aria-label={hs.etiqueta}');

    // Verifica que no haya coordenadas fijas hardcodeadas en los elementos de hotspot
    expect(content).not.toMatch(/cx="100"\s+cy="100"/);
  });

  it('cumple con las reglas de accesibilidad WCAG: role="button", tabindex="0", área táctil >= 48px', () => {
    const content = fs.readFileSync(componentPath, 'utf8');

    expect(content).toContain('role="button"');
    expect(content).toContain('tabindex="0"');
    expect(content).toContain('aria-label={hs.etiqueta}');

    // Hitbox circle r=50 (100px diameter en SVG, >= 48px en dispositivos móviles)
    expect(content).toContain('r="50"');
    expect(content).toContain('cuento-hitbox');
  });

  it('implementa reacciones mediante CSS (salto/giro) y WebAudio OscillatorNode sin archivos de audio externos', () => {
    const content = fs.readFileSync(componentPath, 'utf8');

    // WebAudio sintetizado
    expect(content).toContain('createOscillator()');
    expect(content).toContain('createGain()');

    // Clases CSS de reacción
    expect(content).toContain('cuento-hotspot-jump');
    expect(content).toContain('cuento-hotspot-spin');

    // Cero peticiones externas o archivos de audio (.mp3, .wav, .ogg, http/https)
    expect(content).not.toMatch(/\.mp3|\.wav|\.ogg|\.aac/i);
    expect(content).not.toMatch(/fetch\(|XMLHttpRequest|http:\/\/|https:\/\//);
  });

  it('respeta la preferencia de movimiento reducido (prefers-reduced-motion: reduce)', () => {
    const content = fs.readFileSync(componentPath, 'utf8');

    expect(content).toContain('@media (prefers-reduced-motion: reduce)');
    expect(content).toContain('animation: none !important');
    expect(content).toContain('window.matchMedia(\'(prefers-reduced-motion: reduce)\')');
  });
});
