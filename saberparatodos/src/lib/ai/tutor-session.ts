/**
 * Conversational tutor: ASR → LLM → TTS (on-device via edge-mesh AI Core).
 * Does not reveal the correct answer directly; gives hints and explanations.
 */

import { getAiCore } from './ai-core-client';
import { generateNanoTutorResponse } from './chrome-nano-provider';
import { recordMejoraInterna } from '../mejora-interna-telemetry';

export interface TutorContext {
  questionText?: string;
  userAnswer?: string;
  explanation?: string;
  subject?: string;
  grade?: number;
  /** Soft report / session insights */
  sessionSummary?: string;
}

export interface TutorTurn {
  userText: string;
  assistantText: string;
  audioWav?: ArrayBuffer;
  at: number;
}

export class TutorSession {
  private readonly history: TutorTurn[] = [];
  private context: TutorContext;

  constructor(context: TutorContext = {}) {
    this.context = context;
  }

  updateContext(partial: TutorContext): void {
    this.context = { ...this.context, ...partial };
  }

  getHistory(): readonly TutorTurn[] {
    return this.history;
  }

  private buildSystemPrompt(): string {
    return [
      'Eres un tutor pedagógico on-device para SaberParaTodos / WorldExams.',
      'Habla en español claro y breve (2-5 oraciones).',
      'NO reveles la letra o texto exacto de la respuesta correcta.',
      'Da pistas, corrige conceptos y anima a razonar.',
      this.context.subject ? `Materia: ${this.context.subject}.` : '',
      this.context.grade ? `Grado: ${this.context.grade}.` : '',
      this.context.questionText ? `Pregunta activa: ${this.context.questionText}` : '',
      this.context.userAnswer ? `Respuesta del estudiante: ${this.context.userAnswer}` : '',
      this.context.explanation
        ? `Notas internas (no citar literalmente como clave): ${this.context.explanation.slice(0, 400)}`
        : '',
      this.context.sessionSummary ? `Informe reciente: ${this.context.sessionSummary.slice(0, 300)}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }

  async respondText(userText: string, opts?: { speak?: boolean }): Promise<TutorTurn> {
    const ai = getAiCore();
    let assistantText: string;
    try {
      assistantText = await generateNanoTutorResponse(userText, this.context, async () => {
        const prompt = `${this.buildSystemPrompt()}\n\nEstudiante: ${userText}\nTutor:`;
        return await ai.llm.generate(prompt, { maxNewTokens: 256, temperature: 0.5 });
      });
      // Provide default pedagogical guidance if response is empty or template stub
      if (!assistantText || !assistantText.trim() || assistantText.includes('Respuesta local (modo plantilla)')) {
        assistantText =
          'Vamos por partes: revisa el enunciado, descarta opciones imposibles y justifica tu elección con el concepto clave. Si quieres, dime qué opción te confunde.';
      }
    } catch {
      assistantText =
        'No pude cargar el modelo local. Revisa /ajustes/ia o reformula tu duda en una frase corta.';
    }

    let audioWav: ArrayBuffer | undefined;
    if (opts?.speak !== false) {
      try {
        audioWav = await ai.tts.speak(assistantText);
      } catch {
        audioWav = undefined;
      }
    }

    const turn: TutorTurn = {
      userText,
      assistantText,
      audioWav,
      at: Date.now(),
    };
    this.history.push(turn);
    recordMejoraInterna('ai.tutor.turn', {
      hasAudio: Boolean(audioWav),
      userChars: userText.length,
      assistantChars: assistantText.length,
    });
    return turn;
  }

  /** Voice pipeline: audio blob → ASR → LLM → TTS */
  async respondVoice(audio: ArrayBuffer, opts?: { speak?: boolean }): Promise<TutorTurn> {
    const ai = getAiCore();
    // Prefer mock-friendly ASR for smoke when empty runtime
    let userText = '';
    try {
      userText = await ai.asr.transcribe(audio);
    } catch {
      userText = '';
    }
    if (!userText.trim()) {
      userText = 'Explícame la pregunta sin darme la respuesta.';
    }
    return this.respondText(userText, opts);
  }
}

export function createTutorSession(context?: TutorContext): TutorSession {
  return new TutorSession(context);
}
