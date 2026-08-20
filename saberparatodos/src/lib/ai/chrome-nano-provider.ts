/**
 * Chrome Built-in AI (Gemini Nano) LLM Provider for SaberParaTodos / WorldExams.
 * Uses Chrome Prompt API (navigator.ai.languageModel or window.ai.languageModel).
 */

import type { TutorContext } from './tutor-session';

/** Ambient types for Chrome Built-in AI Prompt API */
export interface AILanguageModelSession {
  prompt(input: string): Promise<string>;
  promptStreaming?(input: string): AsyncIterable<string>;
  destroy?(): void;
  close?(): void;
}

export interface ChromeNanoCreateOptions {
  systemPrompt?: string;
  temperature?: number;
  topK?: number;
  signal?: AbortSignal;
}

export interface ChromeNanoModelCapabilities {
  available: 'readily' | 'after-download' | 'no';
  defaultTemperature?: number;
  defaultTopK?: number;
  maxTopK?: number;
}

export interface ChromeLanguageModelAPI {
  capabilities?: () => Promise<ChromeNanoModelCapabilities>;
  availability?: () => Promise<'readily' | 'after-download' | 'no'>;
  create?: (options?: ChromeNanoCreateOptions) => Promise<AILanguageModelSession>;
}

declare global {
  interface Navigator {
    ai?: {
      languageModel?: ChromeLanguageModelAPI;
    };
  }
  interface Window {
    ai?: {
      languageModel?: ChromeLanguageModelAPI;
    };
  }
}

/**
 * Builds system prompt for Gemini Nano from tutor context.
 */
export function buildNanoSystemPrompt(context: TutorContext = {}): string {
  return [
    'Eres un tutor pedagógico on-device para SaberParaTodos / WorldExams.',
    'Habla en español claro y breve (2-5 oraciones).',
    'NO reveles la letra o texto exacto de la respuesta correcta.',
    'Da pistas, corrige conceptos y anima a razonar.',
    context.subject ? `Materia: ${context.subject}.` : '',
    context.grade ? `Grado: ${context.grade}.` : '',
    context.questionText ? `Pregunta activa: ${context.questionText}` : '',
    context.userAnswer ? `Respuesta del estudiante: ${context.userAnswer}` : '',
    context.explanation
      ? `Notas internas (no citar literalmente como clave): ${context.explanation.slice(0, 400)}`
      : '',
    context.sessionSummary ? `Informe reciente: ${context.sessionSummary.slice(0, 300)}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Retrieves Chrome AI languageModel interface from navigator or window.
 */
function getChromeLanguageModelAPI(): ChromeLanguageModelAPI | undefined {
  if (typeof navigator !== 'undefined' && navigator.ai?.languageModel) {
    return navigator.ai.languageModel;
  }
  if (typeof window !== 'undefined' && (window as any).ai?.languageModel) {
    return (window as any).ai.languageModel;
  }
  return undefined;
}

/**
 * Checks if Chrome Built-in AI (Gemini Nano) languageModel API is available in the current runtime environment.
 */
export async function isChromeNanoAvailable(): Promise<boolean> {
  const api = getChromeLanguageModelAPI();
  if (!api || typeof api.create !== 'function') {
    return false;
  }

  try {
    if (typeof api.capabilities === 'function') {
      const caps = await api.capabilities();
      if (caps && caps.available === 'no') {
        return false;
      }
    } else if (typeof api.availability === 'function') {
      const avail = await api.availability();
      if (avail === 'no') {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Creates a language model session using Chrome Prompt API: navigator.ai.languageModel.create()
 */
export async function createChromeNanoSession(
  options: ChromeNanoCreateOptions = {}
): Promise<AILanguageModelSession> {
  const api = getChromeLanguageModelAPI();
  if (!api || typeof api.create !== 'function') {
    throw new Error('Chrome Built-in AI (Gemini Nano) is not available in this environment');
  }

  const { systemPrompt, temperature = 0.5, topK, signal } = options;
  return await api.create({
    systemPrompt,
    temperature,
    topK,
    signal,
  });
}

/**
 * Generates a tutor response locally via Gemini Nano using prompt API.
 * Falls back gracefully to `fallbackFn` if unavailable or on error.
 */
export async function generateNanoTutorResponse(
  userText: string,
  context: TutorContext = {},
  fallbackFn?: () => Promise<string>
): Promise<string> {
  try {
    const available = await isChromeNanoAvailable();
    if (!available) {
      if (fallbackFn) {
        return await fallbackFn();
      }
      throw new Error('Chrome Nano is not available and no fallback function was provided');
    }

    const systemPrompt = buildNanoSystemPrompt(context);
    const session = await createChromeNanoSession({ systemPrompt, temperature: 0.5 });

    let response = '';
    try {
      response = await session.prompt(userText);
    } finally {
      if (typeof session.destroy === 'function') {
        session.destroy();
      } else if (typeof session.close === 'function') {
        session.close();
      }
    }

    if (!response || !response.trim()) {
      if (fallbackFn) {
        return await fallbackFn();
      }
    }

    return response;
  } catch (err) {
    console.warn('[ChromeNanoProvider] Failed to generate response via Chrome Nano, calling fallback:', err);
    if (fallbackFn) {
      return await fallbackFn();
    }
    throw err;
  }
}

/**
 * Stateful provider wrapper for Chrome Built-in AI (Gemini Nano).
 */
export class ChromeNanoProvider {
  private context: TutorContext;

  constructor(context: TutorContext = {}) {
    this.context = { ...context };
  }

  updateContext(partial: Partial<TutorContext>): void {
    this.context = { ...this.context, ...partial };
  }

  getContext(): TutorContext {
    return { ...this.context };
  }

  async isAvailable(): Promise<boolean> {
    return isChromeNanoAvailable();
  }

  async generateResponse(
    userText: string,
    fallbackFn?: () => Promise<string>
  ): Promise<string> {
    return generateNanoTutorResponse(userText, this.context, fallbackFn);
  }
}
