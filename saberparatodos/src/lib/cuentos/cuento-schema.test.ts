import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseCuentoMd,
  CuentoParseError,
  type Cuento,
  type CuentoFrontmatter,
  type CuentoPagina,
  type QuizPregunta
} from './cuento-schema';

/**
 * Absolute path reference:
 * saberparatodos/src/lib/cuentos/cuento-schema.test.ts
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Root relative path to real seed file: questions_data/cuentos/tana-tucan-comparte/cuento.md
const SEED_PATH = path.resolve(__dirname, '../../../../questions_data/cuentos/tana-tucan-comparte/cuento.md');

describe('Cuento Schema & Parser (format v1)', () => {
  it('parses real seed file (tana-tucan-comparte/cuento.md) correctly', () => {
    const rawMd = fs.readFileSync(SEED_PATH, 'utf-8');
    const cuento: Cuento = parseCuentoMd(rawMd, SEED_PATH);

    // Frontmatter assertions
    const fm: CuentoFrontmatter = cuento.frontmatter;
    expect(fm.slug).toBe('tana-tucan-comparte');
    expect(fm.titulo).toBe('Tana la tucán que aprendió a compartir');
    expect(fm.edad).toBe('3-4');
    expect(fm.idioma).toBe('es-neutro');
    expect(fm.eje).toBe('animales');
    expect(fm.habitat).toBe('selva');
    expect(fm.valor).toBe('compartir');
    expect(fm.personajes).toEqual(['tana', 'tito', 'lila']);
    expect(fm.paginas).toBe(8);
    expect(fm.license).toBe('PROPRIETARY-FREE-READ');
    expect(fm.version).toBe(1);

    // Pages assertions
    expect(cuento.paginas).toHaveLength(8);
    const p1: CuentoPagina = cuento.paginas[0];
    expect(p1.n).toBe(1);
    expect(p1.alt).toBe('Tana la tucán ve un árbol lleno de mangos');
    expect(p1.imagen).toBe('escenas/p1-arbol.svg');
    expect(p1.wordCount).toBeGreaterThan(0);
    expect(p1.texto).toContain('En lo alto de la selva vivía Tana');

    // Quiz assertions
    expect(cuento.quiz).toHaveLength(3);
    const q1: QuizPregunta = cuento.quiz[0];
    expect(q1.n).toBe(1);
    expect(q1.texto).toBe('¿Cuántos mangos encontró Tana?');
    expect(q1.opciones).toHaveLength(3);
    expect(q1.opciones[0].correcta).toBe(true);
    expect(q1.opciones[0].letra).toBe('A');
    expect(q1.opciones[0].texto).toBe('Cinco');
    expect(q1.opciones[0].feedback).toBe('¡Sí! Uno, dos, tres, cuatro y cinco.');

    expect(q1.opciones[1].correcta).toBe(false);
    expect(q1.opciones[1].letra).toBe('B');
    expect(q1.opciones[1].texto).toBe('Tres');

    // Explicación moraleja assertion
    expect(cuento.explicacion).toContain('Tana quería todo para ella');
  });

  it('throws CuentoParseError when frontmatter is missing required fields', () => {
    const invalidMd = `---
slug: "test-invalido"
titulo: "Test"
---
## Pagina 1
![alt: Test](test.svg)
Texto.
`;
    expect(() => parseCuentoMd(invalidMd, 'invalido.md')).toThrow(CuentoParseError);
    try {
      parseCuentoMd(invalidMd, 'invalido.md');
    } catch (err: any) {
      expect(err).toBeInstanceOf(CuentoParseError);
      expect(err.message).toContain('Falta el campo obligatorio en frontmatter');
      expect(err.file).toBe('invalido.md');
    }
  });

  it('throws CuentoParseError when a page is missing valid image format', () => {
    const missingImgMd = `---
slug: "test-sin-img"
titulo: "Test Sin Imagen"
edad: "3-4"
idioma: "es-neutro"
eje: "animales"
habitat: "selva"
valor: "compartir"
personajes: ["tana"]
paginas: 1
license: "PROPRIETARY-FREE-READ"
version: 1
---

## Pagina 1
Texto de la página sin la imagen requerida.
`;
    expect(() => parseCuentoMd(missingImgMd, 'sin-img.md')).toThrow(CuentoParseError);
    try {
      parseCuentoMd(missingImgMd, 'sin-img.md');
    } catch (err: any) {
      expect(err).toBeInstanceOf(CuentoParseError);
      expect(err.message).toContain('no contiene una imagen válida');
    }
  });

  it('parses v1 page without v2 lines yielding default empty hint and words without throwing', () => {
    const v1Md = `---
slug: "test-v1"
titulo: "Test V1"
edad: "3-4"
idioma: "es-neutro"
eje: "animales"
habitat: "selva"
valor: "compartir"
personajes: ["tana"]
paginas: 1
license: "PROPRIETARY-FREE-READ"
version: 1
---

## Pagina 1
![alt: Escena 1](escenas/p1.svg)
En un bosque lejano vivía una pequeña ardilla llamada Nina.
`;
    const cuento = parseCuentoMd(v1Md, 'v1.md');
    expect(cuento.paginas).toHaveLength(1);
    expect(cuento.paginas[0].hint).toBe('');
    expect(cuento.paginas[0].words).toEqual([]);
    expect(cuento.paginas[0].texto).toContain('En un bosque lejano');
  });

  it('parses v2 page extracting caregiver hint and vocabulary words', () => {
    const v2Md = `---
slug: "test-v2"
titulo: "Test V2"
edad: "3-4"
idioma: "es-neutro"
eje: "animales"
habitat: "selva"
valor: "compartir"
personajes: ["tana"]
paginas: 1
license: "PROPRIETARY-FREE-READ"
version: 1
---

## Pagina 1
![alt: Escena 1](escenas/p1.svg)
En un bosque lejano vivía una pequeña ardilla llamada Nina.
> Para conversar en familia: Observa el bosque y cuenta los árboles con tu hija o hijo.
**Palabras nuevas:** bosque, ardilla, pequeña
`;
    const cuento = parseCuentoMd(v2Md, 'v2.md');
    expect(cuento.paginas).toHaveLength(1);
    expect(cuento.paginas[0].hint).toBe('Observa el bosque y cuenta los árboles con tu hija o hijo.');
    expect(cuento.paginas[0].words).toEqual(['bosque', 'ardilla', 'pequeña']);
    expect(cuento.paginas[0].texto).toBe('En un bosque lejano vivía una pequeña ardilla llamada Nina.');
  });
});
