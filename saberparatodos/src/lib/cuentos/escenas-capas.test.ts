/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  extraerGrupo,
  extraerDefs,
  anotarAccesibilidad,
  listarHotspots,
  parseEscenaCapas,
  indexarEscenas,
} from './escenas-capas';
import { getEscenasCapas, hasEscenasCapas, slugsConEscenasCapas } from '../../components/cuentos/arte/escenas-capas';

const ARTE_DIR = path.resolve(__dirname, '../../components/cuentos/arte/escenas-capas');
const ACCIONES = new Set(['salto', 'giro', 'meneo', 'zoom']);
const SONIDOS = new Set(['tucan', 'mono', 'perezosa', 'agua', 'fruta', 'brillo', 'blip']);
const IDLES = new Set(['respira', 'balanceo', 'flota', 'mece', 'lento']);

describe('escenas-capas: parser genérico', () => {
  it('extrae grupos respetando <g> anidados (regresión: el regex no-greedy cortaba en el primer </g>)', () => {
    const svg = `<svg><g id="plano-fondo"><g id="a"><circle/></g><path d="nube"/></g><g id="plano-frente"><g><g/></g><path d="rama"/></g></svg>`;
    expect(extraerGrupo(svg, 'plano-fondo')).toBe('<g id="a"><circle/></g><path d="nube"/>');
    expect(extraerGrupo(svg, 'plano-frente')).toBe('<g><g/></g><path d="rama"/>');
    expect(extraerGrupo(svg, 'plano-medio')).toBe('');
  });

  it('conserva <defs> (gradientes referenciados por url(#…))', () => {
    expect(extraerDefs('<svg><defs><linearGradient id="bg1"/></defs></svg>')).toBe('<linearGradient id="bg1"/>');
  });

  it('inyecta role/tabindex/aria-label en data-hotspot y data-contable sin duplicar', () => {
    const out = anotarAccesibilidad(
      '<g data-hotspot="tana" data-etiqueta="Tana &amp; amigos"><g data-contable data-etiqueta="Un mango"/><g data-hotspot="x" role="img" tabindex="-1" aria-label="ya"></g></g>'
    );
    expect(out).toContain('<g data-hotspot="tana" data-etiqueta="Tana &amp; amigos" role="button" tabindex="0" aria-label="Tana &amp;amp; amigos">');
    expect(out).toContain('<g data-contable data-etiqueta="Un mango" role="button" tabindex="0" aria-label="Un mango"/>');
    expect(out).toContain('<g data-hotspot="x" role="img" tabindex="-1" aria-label="ya">');
  });

  it('indexa módulos por slug y número de página', () => {
    const svg = '<svg><g id="plano-fondo"><rect/></g><g id="plano-medio"/><g id="plano-frente"><circle/></g></svg>';
    const idx = indexarEscenas({ './mi-cuento/p1.svg': svg, './mi-cuento/p12.svg': svg, './otro/readme.txt': 'x' });
    expect(Object.keys(idx)).toEqual(['mi-cuento']);
    expect(Object.keys(idx['mi-cuento']).map(Number).sort((a, b) => a - b)).toEqual([1, 12]);
    expect(idx['mi-cuento'][1].fondo).toBe('<rect/>');
  });

  it('parseEscenaCapas devuelve null si no hay ningún plano', () => {
    expect(parseEscenaCapas('<svg><rect/></svg>')).toBeNull();
  });
});

describe('escenas-capas: registro (import.meta.glob)', () => {
  it('descubre tana-tucan-comparte por convención de carpeta, 8 páginas', () => {
    expect(slugsConEscenasCapas()).toContain('tana-tucan-comparte');
    const capas = getEscenasCapas('tana-tucan-comparte');
    expect(Object.keys(capas).map(Number).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(hasEscenasCapas('tana-tucan-comparte', 1)).toBe(true);
    expect(hasEscenasCapas('tana-tucan-comparte', 9)).toBe(false);
  });

  it('un cuento sin carpeta de capas cae al modo plano (objeto vacío)', () => {
    expect(getEscenasCapas('bruno-zorro-paciencia')).toEqual({});
    expect(hasEscenasCapas('bruno-zorro-paciencia')).toBe(false);
  });
});

describe('contrato de arte: todo SVG en escenas-capas/{slug}/pN.svg', () => {
  const archivos = fs
    .readdirSync(ARTE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) =>
      fs
        .readdirSync(path.join(ARTE_DIR, d.name))
        .filter((f) => /^p\d+\.svg$/.test(f))
        .map((f) => ({ slug: d.name, file: f, raw: fs.readFileSync(path.join(ARTE_DIR, d.name, f), 'utf8') }))
    );

  it('hay arte que validar', () => {
    expect(archivos.length).toBeGreaterThanOrEqual(8);
  });

  for (const { slug, file, raw } of archivos) {
    describe(`${slug}/${file}`, () => {
      it('lleva copyright y los 3 planos no vacíos', () => {
        expect(raw.trim().split('\n')[0]).toContain('© 2026 SaberParaTodos');
        const capas = parseEscenaCapas(raw)!;
        expect(capas.fondo.length).toBeGreaterThan(0);
        expect(capas.medio.length).toBeGreaterThan(0);
        expect(capas.frente.length).toBeGreaterThan(0);
      });

      it('todo url(#id) referencia un id definido en el SVG', () => {
        const refs = [...raw.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
        for (const id of refs) expect(raw).toContain(`id="${id}"`);
      });

      it('hotspots: etiqueta accesible, acción y sonido válidos', () => {
        for (const hs of listarHotspots(raw)) {
          expect(hs.etiqueta.length, `hotspot ${hs.id} sin data-etiqueta`).toBeGreaterThan(2);
          expect(ACCIONES.has(hs.accion), `acción desconocida ${hs.accion}`).toBe(true);
          if (hs.sonido) expect(SONIDOS.has(hs.sonido), `sonido desconocido ${hs.sonido}`).toBe(true);
        }
      });

      it('data-hotspot / data-idle / data-contable nunca llevan transform (la animación CSS lo pisaría)', () => {
        const tags = raw.match(/<[a-z]+\b[^>]*\s(?:data-hotspot|data-idle|data-contable)\b[^>]*>/gi) ?? [];
        for (const tag of tags) expect(tag, tag).not.toMatch(/\stransform=/);
        for (const m of raw.matchAll(/data-idle="([^"]+)"/g)) expect(IDLES.has(m[1]), m[1]).toBe(true);
      });

      it('cada data-contar tiene contables con etiqueta', () => {
        const capas = parseEscenaCapas(raw)!;
        const markup = capas.fondo + capas.medio + capas.frente;
        if (!markup.includes('data-contar')) return;
        const contables = markup.match(/<g\b[^>]*data-contable[^>]*>/g) ?? [];
        expect(contables.length).toBeGreaterThanOrEqual(2);
        for (const c of contables) expect(c).toContain('aria-label=');
      });
    });
  }

  it('tana-tucan-comparte (insignia): cada página tiene ≥1 hotspot e idle, y Tana es tocable en todas', () => {
    const tana = archivos.filter((a) => a.slug === 'tana-tucan-comparte');
    expect(tana).toHaveLength(8);
    for (const { file, raw } of tana) {
      const ids = listarHotspots(raw).map((h) => h.id);
      expect(ids, file).toContain('tana');
      expect(raw, file).toMatch(/data-idle="/);
    }
    // Al menos un "mirar de cerca" con mini-juego de conteo
    expect(tana.some(({ raw }) => raw.includes('data-accion="zoom"') && raw.includes('data-contar='))).toBe(true);
  });
});
