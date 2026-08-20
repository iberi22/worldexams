import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  buildNanoSystemPrompt,
  createChromeNanoSession,
  generateNanoTutorResponse,
  isChromeNanoAvailable,
  ChromeNanoProvider,
} from './chrome-nano-provider';
import { TutorSession } from './tutor-session';

describe('chrome-nano-provider', () => {
  beforeEach(() => {
    // Reset window and navigator mocks before each test
    delete (globalThis as any).window;
    delete (globalThis as any).navigator;
  });

  describe('buildNanoSystemPrompt', () => {
    it('includes base tutor guidelines', () => {
      const prompt = buildNanoSystemPrompt();
      expect(prompt).toContain('Eres un tutor pedagógico on-device');
      expect(prompt).toContain('NO reveles la letra o texto exacto');
    });

    it('formats context metadata into system prompt', () => {
      const context = {
        subject: 'Matemáticas',
        grade: 11,
        questionText: '¿Cuál es la derivada de x^2?',
        userAnswer: '2x',
        explanation: 'Se aplica la regla de la potencia.',
        sessionSummary: 'El estudiante domina álgebra básica.',
      };
      const prompt = buildNanoSystemPrompt(context);
      expect(prompt).toContain('Materia: Matemáticas.');
      expect(prompt).toContain('Grado: 11.');
      expect(prompt).toContain('Pregunta activa: ¿Cuál es la derivada de x^2?');
      expect(prompt).toContain('Respuesta del estudiante: 2x');
      expect(prompt).toContain('Notas internas (no citar literalmente como clave): Se aplica la regla de la potencia.');
      expect(prompt).toContain('Informe reciente: El estudiante domina álgebra básica.');
    });
  });

  describe('isChromeNanoAvailable', () => {
    it('returns false if navigator and window ai are undefined', async () => {
      const available = await isChromeNanoAvailable();
      expect(available).toBe(false);
    });

    it('returns true if navigator.ai.languageModel.create exists and capabilities is readily available', async () => {
      (globalThis as any).navigator = {
        ai: {
          languageModel: {
            create: vi.fn(),
            capabilities: vi.fn().mockResolvedValue({ available: 'readily' }),
          },
        },
      };

      const available = await isChromeNanoAvailable();
      expect(available).toBe(true);
    });

    it('returns false if capabilities returns available: "no"', async () => {
      (globalThis as any).navigator = {
        ai: {
          languageModel: {
            create: vi.fn(),
            capabilities: vi.fn().mockResolvedValue({ available: 'no' }),
          },
        },
      };

      const available = await isChromeNanoAvailable();
      expect(available).toBe(false);
    });

    it('returns true if window.ai.languageModel is used', async () => {
      (globalThis as any).window = {
        ai: {
          languageModel: {
            create: vi.fn(),
            availability: vi.fn().mockResolvedValue('readily'),
          },
        },
      };

      const available = await isChromeNanoAvailable();
      expect(available).toBe(true);
    });
  });

  describe('createChromeNanoSession', () => {
    it('throws error if languageModel is not available', async () => {
      await expect(createChromeNanoSession()).rejects.toThrow(
        'Chrome Built-in AI (Gemini Nano) is not available'
      );
    });

    it('calls navigator.ai.languageModel.create with options and temperature 0.5 default', async () => {
      const mockCreate = vi.fn().mockResolvedValue({ prompt: vi.fn() });
      (globalThis as any).navigator = {
        ai: {
          languageModel: {
            create: mockCreate,
          },
        },
      };

      await createChromeNanoSession({ systemPrompt: 'Test Prompt', temperature: 0.5 });
      expect(mockCreate).toHaveBeenCalledWith({
        systemPrompt: 'Test Prompt',
        temperature: 0.5,
        topK: undefined,
        signal: undefined,
      });
    });
  });

  describe('generateNanoTutorResponse', () => {
    it('generates response via Gemini Nano session when available', async () => {
      const mockDestroy = vi.fn();
      const mockPrompt = vi.fn().mockResolvedValue('Recuerda aplicar la regla de exponentes.');
      const mockCreate = vi.fn().mockResolvedValue({
        prompt: mockPrompt,
        destroy: mockDestroy,
      });

      (globalThis as any).navigator = {
        ai: {
          languageModel: {
            create: mockCreate,
            capabilities: vi.fn().mockResolvedValue({ available: 'readily' }),
          },
        },
      };

      const context = { subject: 'Física', grade: 10 };
      const res = await generateNanoTutorResponse('¿Cómo calculo la velocidad?', context);

      expect(res).toBe('Recuerda aplicar la regla de exponentes.');
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          temperature: 0.5,
        })
      );
      expect(mockPrompt).toHaveBeenCalledWith('¿Cómo calculo la velocidad?');
      expect(mockDestroy).toHaveBeenCalled();
    });

    it('uses fallbackFn if Chrome Nano is unavailable', async () => {
      const fallbackFn = vi.fn().mockResolvedValue('Respuesta desde fallback tier.');
      const res = await generateNanoTutorResponse('Hola', {}, fallbackFn);

      expect(res).toBe('Respuesta desde fallback tier.');
      expect(fallbackFn).toHaveBeenCalled();
    });

    it('uses fallbackFn if session.prompt throws an error', async () => {
      const mockCreate = vi.fn().mockResolvedValue({
        prompt: vi.fn().mockRejectedValue(new Error('Prompt error')),
        destroy: vi.fn(),
      });

      (globalThis as any).navigator = {
        ai: {
          languageModel: {
            create: mockCreate,
            capabilities: vi.fn().mockResolvedValue({ available: 'readily' }),
          },
        },
      };

      const fallbackFn = vi.fn().mockResolvedValue('Respuesta fallback tras error Nano.');
      const res = await generateNanoTutorResponse('Ayuda', {}, fallbackFn);

      expect(res).toBe('Respuesta fallback tras error Nano.');
      expect(fallbackFn).toHaveBeenCalled();
    });
  });

  describe('ChromeNanoProvider class', () => {
    it('manages context and calls generateNanoTutorResponse', async () => {
      const provider = new ChromeNanoProvider({ subject: 'Química' });
      provider.updateContext({ grade: 11 });

      expect(provider.getContext()).toEqual({ subject: 'Química', grade: 11 });

      const fallbackFn = vi.fn().mockResolvedValue('Respuesta provista.');
      const response = await provider.generateResponse('Explicación', fallbackFn);

      expect(response).toBe('Respuesta provista.');
    });
  });

  describe('TutorSession integration', () => {
    it('uses Chrome Nano when available, otherwise falls back smoothly', async () => {
      const session = new TutorSession({ subject: 'Historia', grade: 11 });
      const turn = await session.respondText('¿Cuándo comenzó la Independencia?', { speak: false });

      expect(turn.userText).toBe('¿Cuándo comenzó la Independencia?');
      expect(turn.assistantText).toBeTruthy();
      expect(session.getHistory().length).toBe(1);
    });
  });
});
