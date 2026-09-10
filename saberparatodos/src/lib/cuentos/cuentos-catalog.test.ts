import { describe, it, expect } from 'vitest';
import { getAllCuentosCatalog, getCuentoBySlug, parseCuentoMarkdown } from './cuentos-catalog';

describe('cuentos-catalog', () => {
  it('parses cuento.md markdown string with frontmatter and HTML comments', () => {
    const rawMd = `<!-- © 2026 Test Copyright -->
---
slug: "test-cuento"
titulo: "Cuento de Prueba"
edad: "3-4"
idioma: "es-neutro"
eje: "valores"
habitat: "bosque"
valor: "amistad"
personajes: ["bruno", "mía"]
paginas: 2
license: "PROPRIETARY-FREE-READ"
version: 1
---

## Pagina 1
![alt: Bruno en el bosque](escenas/p1.svg)
Había una vez un zorro llamado Bruno.

## Pagina 2
![alt: Bruno juega con Mía](escenas/p2.svg)
Bruno jugó todo el día con Mía.

## Quiz
### Pregunta 1
¿Quién es el personaje principal?
- [x] A) Bruno
  <!-- feedback: ¡Correcto! -->
- [ ] B) Tito
  <!-- feedback: Incorrecto -->

### Explicacion
La amistad es un gran tesoro.
`;

    const detail = parseCuentoMarkdown(rawMd);
    expect(detail.slug).toBe('test-cuento');
    expect(detail.titulo).toBe('Cuento de Prueba');
    expect(detail.edad).toBe('3-4');
    expect(detail.valor).toBe('amistad');
    expect(detail.paginasList.length).toBe(2);
    expect(detail.paginasList[0].alt).toBe('Bruno en el bosque');
    expect(detail.paginasList[0].texto).toContain('Había una vez un zorro');
    expect(detail.quiz.preguntas.length).toBe(1);
    expect(detail.quiz.preguntas[0].pregunta).toBe('¿Quién es el personaje principal?');
    expect(detail.quiz.preguntas[0].opciones[0].esCorrecta).toBe(true);
    expect(detail.quiz.explicacion).toContain('La amistad es un gran tesoro');
  });

  it('loads real catalog from repository data', async () => {
    const catalog = await getAllCuentosCatalog();
    expect(catalog.length).toBeGreaterThanOrEqual(1);

    const first = catalog[0];
    expect(first.slug).toBe('tana-tucan-comparte');
    expect(first.titulo).toContain('Tana la tucán');
  });

  it('loads detail for tana-tucan-comparte', async () => {
    const detail = await getCuentoBySlug('tana-tucan-comparte');
    expect(detail).not.toBeNull();
    expect(detail?.slug).toBe('tana-tucan-comparte');
    expect(detail?.paginasList.length).toBe(8);
    expect(detail?.quiz.preguntas.length).toBe(3);
  });
});
