/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('EscenaSVG & Cuentos Art System', () => {
  const piezasDir = path.resolve(__dirname, 'piezas');
  const demoSelvaPath = path.resolve(__dirname, 'selva-demo.svg');

  it('declara y organiza los 3 planos de renderizado (fondo, medio, frente) en la plantilla', () => {
    const sveltePath = path.resolve(__dirname, 'EscenaSVG.svelte');
    const svelteContent = fs.readFileSync(sveltePath, 'utf8');

    expect(svelteContent).toContain('id="plano-fondo"');
    expect(svelteContent).toContain('id="plano-medio"');
    expect(svelteContent).toContain('id="plano-frente"');
    expect(svelteContent).toContain('viewBox="0 0 800 450"');
    expect(svelteContent).toContain('role="img"');
  });

  it('mantiene atributos de accesibilidad aria-label y title en la estructura SVG', () => {
    const sveltePath = path.resolve(__dirname, 'EscenaSVG.svelte');
    const svelteContent = fs.readFileSync(sveltePath, 'utf8');

    expect(svelteContent).toContain('aria-label={tituloAccesible}');
    expect(svelteContent).toContain('<title>{tituloAccesible}</title>');
    expect(svelteContent).toContain('descripcionAccesible');
  });

  it('garantiza la pureza vectorial y peso < 25 KB para cada pieza en piezas/', () => {
    const files = fs.readdirSync(piezasDir).filter((f) => f.endsWith('.svg'));
    expect(files.length).toBeGreaterThanOrEqual(7);

    for (const file of files) {
      const filePath = path.join(piezasDir, file);
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, 'utf8');

      // Regla de tamaño: < 25 KB (25600 bytes)
      expect(stats.size).toBeLessThan(25600);

      // Regla de pureza vectorial: sin imagenes ni base64
      expect(content).not.toMatch(/image|base64/i);

      // Header legal en la primera linea
      const lines = content.trim().split('\n');
      expect(lines[0]).toContain('© 2026 SaberParaTodos');

      // Sin etiquetas de texto dentro del SVG
      expect(content).not.toMatch(/<text/i);
    }
  });

  it('verifica que la escena de demostracion selva-demo.svg cumpla con los limites de tamaño (< 60 KB) y pureza', () => {
    expect(fs.existsSync(demoSelvaPath)).toBe(true);
    const stats = fs.statSync(demoSelvaPath);
    const content = fs.readFileSync(demoSelvaPath, 'utf8');

    // Límite de escena < 60 KB (61440 bytes)
    expect(stats.size).toBeLessThan(61440);

    // Sin incrustaciones raster
    expect(content).not.toMatch(/image|base64/i);

    // Header legal
    expect(content).toContain('© 2026 SaberParaTodos');

    // 3 planos representados
    expect(content).toContain('id="plano-fondo"');
    expect(content).toContain('id="plano-medio"');
    expect(content).toContain('id="plano-frente"');
  });
});
