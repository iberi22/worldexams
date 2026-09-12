import { describe, it, expect, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import type { Chunk } from './pdf/chunker';
import { ChromeNanoProvider } from './chrome-nano-provider';
import {
  getExpectedQuestionCount,
  buildPdfStudioPrompt,
  generateQuestionsFromChunks,
} from './pdf-studio-generator';

const sampleChunks: Chunk[] = [
  {
    id: 'c1',
    text: 'La fotosíntesis es el proceso químico mediante el cual las plantas convierten dióxido de carbono y agua en glucosa y oxígeno utilizando la luz solar.',
    page: 1,
    offset: 0,
    tokenCount: 25,
  },
  {
    id: 'c2',
    text: 'La clorofila es el pigmento verde dentro de los cloroplastos responsable de absorber la radiación luminosa durante la fase lumínica.',
    page: 1,
    offset: 151,
    tokenCount: 22,
  },
];

describe('pdf-studio-generator', () => {
  describe('getExpectedQuestionCount', () => {
    it('returns expected question counts per grade according to protocol v5.2', () => {
      expect(getExpectedQuestionCount(3)).toBe(8);
      expect(getExpectedQuestionCount(5)).toBe(8);
      expect(getExpectedQuestionCount(6)).toBe(10);
      expect(getExpectedQuestionCount(7)).toBe(10);
      expect(getExpectedQuestionCount(8)).toBe(12);
      expect(getExpectedQuestionCount(10)).toBe(12);
      expect(getExpectedQuestionCount(11)).toBe(20);
    });
  });

  describe('buildPdfStudioPrompt', () => {
    it('includes chunks content, subject, grade, and protocol v5.2 rules', () => {
      const prompt = buildPdfStudioPrompt('Texto del chunk de fotosíntesis', {
        subject: 'Ciencias Naturales',
        grade: 9,
        count: 12,
        topic: 'Fotosíntesis y Cloroplastos',
        countryCode: 'CO',
      });

      expect(prompt).toContain('Genera exactamente 12 preguntas');
      expect(prompt).toContain('Ciencias Naturales');
      expect(prompt).toContain('grado 9°');
      expect(prompt).toContain('Fotosíntesis y Cloroplastos');
      expect(prompt).toContain('Texto del chunk de fotosíntesis');
      expect(prompt).toContain('Reglas v5.2 obligatorias');
    });
  });

  describe('generateQuestionsFromChunks', () => {
    it('generates llm-validated bundle when Chrome Nano provider is available', async () => {
      const mockQuestionsJson = JSON.stringify([
        {
          statement: '¿Cuál es el pigmento primario involucrado en la fotosíntesis?',
          context: 'La fotosíntesis convierte CO2 y H2O en glucosa.',
          options: [
            { letter: 'A', text: 'Caroteno', is_correct: false, feedback: 'El caroteno es un pigmento accesorio.' },
            { letter: 'B', text: 'Clorofila', is_correct: true, feedback: 'Correcto, la clorofila absorbe la radiación luminosa.' },
            { letter: 'C', text: 'Xantofila', is_correct: false, feedback: 'La xantofila es amarilla/parda.' },
            { letter: 'D', text: 'Antocianina', is_correct: false, feedback: 'Es responsable de tonos rojizos/morados.' },
          ],
          correct_answer: 'B',
          explanation: 'La clorofila es el pigmento principal de la fase lumínica.',
          difficulty: 'D5',
          bloom: 'Comprender',
        },
      ]);

      const provider = new ChromeNanoProvider();
      vi.spyOn(provider, 'isAvailable').mockResolvedValue(true);
      vi.spyOn(provider, 'generateResponse').mockResolvedValue(mockQuestionsJson);

      const result = await generateQuestionsFromChunks(
        sampleChunks,
        { subject: 'Ciencias Naturales', grade: 5, count: 1 },
        provider
      );

      expect(result.mode).toBe('llm-validated');
      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].statement).toContain('pigmento primario');
      expect(result.metadata.creador).toBe('local-llm');
      expect(result.metadata.protocol_hint).toBe('5.2');
    });

    it('returns honest warning and pool-assembled template when Chrome Nano is unavailable', async () => {
      const provider = new ChromeNanoProvider();
      vi.spyOn(provider, 'isAvailable').mockResolvedValue(false);

      const result = await generateQuestionsFromChunks(
        sampleChunks,
        { subject: 'Matemáticas', grade: 11, count: 20 },
        provider
      );

      expect(result.mode).toBe('pool-assembled');
      expect(result.warning).toContain(
        'Tu navegador no tiene IA local disponible (Gemini Nano); el borrador fue generado mediante la plantilla editable.'
      );
      expect(result.metadata.creador).toBe('local-llm');
      expect(result.questions.length).toBeGreaterThan(0);
    });
  });

  describe('Security & Invariants', () => {
    it('contains zero API keys, tokens or bearer headers in pdf-studio-generator.ts source', () => {
      const filePath = path.join(__dirname, 'pdf-studio-generator.ts');
      const content = fs.readFileSync(filePath, 'utf-8');
      const bannedRegex = /api[_-]?key|sk-|bearer/i;
      expect(bannedRegex.test(content)).toBe(false);
    });
  });
});
