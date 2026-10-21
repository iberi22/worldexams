import { describe, expect, it } from 'vitest';
import { buildQuizSchema, serializeJsonLd } from './quiz-schema';

const input = {
  url: 'https://saberparatodos.space/preguntas/colombia/grado-11/matematicas/CO-MAT-11-X/',
  name: 'Funciones — Matemáticas Grado 11',
  description: 'Bundle W01',
  inLanguage: 'es-CO',
  educationalLevel: 'Grado 11',
  subject: 'Matemáticas',
  alignment: 'DBA MEN Colombia',
  publisherName: 'WorldExams',
  publisherUrl: 'https://saberparatodos.space/',
  questions: [
    {
      id: 'CO-MAT-11-X-v1',
      context: 'En Medellín',
      statement: '¿Cuánto es $2+2$?',
      explanation: 'Se suman **dos** y dos.',
      options: [
        { letter: 'A', text: '4', correct: true, feedback: 'Correcto. 2+2 = 4.' },
        { letter: 'B', text: '5', correct: false, feedback: 'Sumaste uno de más.' },
        { letter: 'C', text: '3', correct: false, feedback: 'Restaste uno.' },
        { letter: 'D', text: '22', correct: false, feedback: 'Concatenaste los dígitos.' },
      ],
    },
    {
      id: 'broken',
      statement: 'sin respuesta marcada',
      explanation: '',
      options: [{ letter: 'A', text: 'x', correct: false, feedback: '' }],
    },
  ],
};

describe('buildQuizSchema', () => {
  const schema = buildQuizSchema(input) as Record<string, any>;

  it('emits a schema.org Quiz with level, language and subject', () => {
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Quiz');
    expect(schema.url).toBe(input.url);
    expect(schema.inLanguage).toBe('es-CO');
    expect(schema.educationalLevel).toBe('Grado 11');
    expect(schema.about).toEqual({ '@type': 'Thing', name: 'Matemáticas' });
    expect(schema.educationalAlignment).toMatchObject({ '@type': 'AlignmentObject', targetName: 'DBA MEN Colombia' });
  });

  it('has one Question per answerable question, with accepted and suggested answers', () => {
    expect(schema.hasPart).toHaveLength(1);
    const q = schema.hasPart[0];
    expect(q['@type']).toBe('Question');
    expect(q.eduQuestionType).toBe('Multiple choice');
    expect(q.name).toBe('¿Cuánto es 2+2?');
    expect(q.text).toBe('En Medellín ¿Cuánto es 2+2?');
    expect(q.acceptedAnswer).toHaveLength(1);
    expect(q.acceptedAnswer[0]).toMatchObject({
      '@type': 'Answer',
      text: 'A) 4',
      comment: { '@type': 'Comment', text: 'Correcto. 2+2 = 4.' },
      answerExplanation: { '@type': 'Comment', text: 'Se suman dos y dos.' },
    });
    expect(q.suggestedAnswer.map((a: any) => a.text)).toEqual(['B) 5', 'C) 3', 'D) 22']);
    expect(q.suggestedAnswer.every((a: any) => a['@type'] === 'Answer' && a.comment?.text)).toBe(true);
  });

  it('serializes without a raw </script> sequence and round-trips', () => {
    const json = serializeJsonLd({ text: '</script><script>alert(1)</script> & co' });
    expect(json).not.toContain('</script>');
    expect(JSON.parse(json)).toEqual({ text: '</script><script>alert(1)</script> & co' });
  });
});
