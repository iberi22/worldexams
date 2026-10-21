import { describe, expect, it } from 'vitest';
import { cleanExplanation, parseMarkdownQuestions } from './bundle-fetcher';
import { buildPreguntasSitemap } from './sitemap';
import { practiceUrlFor, subjectDisplayName } from './links';

const md = `---
id: "X"
---

## Question 1 [D3-D4]
**ID:** X-v1
**Bloom:** Remember
**EJE:** Seres vivos
**Contexto:** Martina observa una gota de agua.
### Enunciado
¿Cuál es la unidad básica de los seres vivos?

### Opciones
- [x] A) La célula
  <!-- feedback: Correcto. La célula es la unidad estructural y funcional. -->
- [ ] B) El tejido
  <!-- feedback: Un tejido es un conjunto de células. -->
- [ ] C) El órgano
  <!-- feedback: Un órgano agrupa tejidos. -->
- [ ] D) El sistema
  <!-- feedback: Un sistema agrupa órganos. -->

### Explicación Pedagógica
La célula es la unidad mínima de vida.

---
`;

describe('parseMarkdownQuestions', () => {
  it('extracts context, statement, options with feedback and explanation', () => {
    const [q] = parseMarkdownQuestions(md);
    expect(q).toMatchObject({
      id: 'X-v1',
      number: 1,
      difficulty: 'D3-D4',
      bloom: 'Remember',
      context: 'Martina observa una gota de agua.',
      statement: '¿Cuál es la unidad básica de los seres vivos?',
      explanation: 'La célula es la unidad mínima de vida.',
    });
    expect(q.options).toHaveLength(4);
    expect(q.options.filter((o) => o.correct).map((o) => o.letter)).toEqual(['A']);
    expect(q.options[1].feedback).toBe('Un tejido es un conjunto de células.');
  });
});

describe('cleanExplanation', () => {
  it('drops internal review notes and the trailing rule', () => {
    expect(cleanExplanation('Texto útil.\n\n[//]: # (QUALITY_REVIEW)\n| Criterio | Puntuación |\n| Total | 100 |')).toBe('Texto útil.');
    expect(cleanExplanation('Texto.\n\n---')).toBe('Texto.');
  });
});

describe('preguntas links and sitemap', () => {
  it('links practice into the app with country, subject and grade', () => {
    expect(practiceUrlFor({ code: 'AR', grade: 6 }, 'Ciencias Naturales')).toBe(
      '/?country=AR&subject=Ciencias+Naturales&grade=6'
    );
    expect(practiceUrlFor({ code: 'BR', grade: null }, 'Matemática')).toContain('grade=11');
  });

  it('falls back to a title-cased subject slug', () => {
    expect(subjectDisplayName({ country: 'nowhere', subject: 'ciencias-naturales' })).toBe('Ciencias Naturales');
  });

  it('lists listing pages and every bundle page', () => {
    const entry = {
      id: 'AR-1',
      countryDir: 'argentina',
      country: 'argentina',
      code: 'AR',
      subject: 'ciencias-naturales',
      grade: 6,
      gradeSlug: 'grado-6',
      week: 'W01',
      tema: '',
      total: 10,
      alignment: '',
    };
    const xml = buildPreguntasSitemap('https://s.dev/', [entry], (e) => `/preguntas/x/${e.id}/`);
    expect(xml).toContain('<loc>https://s.dev/preguntas/</loc>');
    expect(xml).toContain('<loc>https://s.dev/preguntas/argentina/grado-6/ciencias-naturales/</loc>');
    expect(xml).toContain('<loc>https://s.dev/preguntas/x/AR-1/</loc>');
  });
});
