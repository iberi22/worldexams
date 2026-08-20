/**
 * WebGPU / WebLLM Provider for Local Inference in Browser.
 * Loads and runs local models (such as Llama 3.2 3B) using WebGPU compute shaders.
 */

import { CreateMLCEngine, type MLCEngineInterface, type InitProgressReport } from '@mlc-ai/web-llm';

export const DEFAULT_WEBGPU_MODEL = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';
export const FALLBACK_WEBGPU_MODEL = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';

export type WebGPUProviderStatus = 'idle' | 'checking' | 'loading' | 'ready' | 'error';

export interface WebGPUProgressReport {
  progress: number; // Value between 0 and 1
  text: string;
  step?: number;
  totalSteps?: number;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  topP?: number;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Check if WebGPU is supported in the current environment.
 */
export async function isWebGPUSupported(): Promise<boolean> {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const navGpu = (navigator as unknown as { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
  if (!navGpu) {
    return false;
  }
  try {
    const adapter = await navGpu.requestAdapter();
    return adapter !== null;
  } catch {
    return false;
  }
}

export class WebGPUModelProvider {
  private engine: MLCEngineInterface | null = null;
  private status: WebGPUProviderStatus = 'idle';
  private currentModelId: string = DEFAULT_WEBGPU_MODEL;
  private progressReport: WebGPUProgressReport = { progress: 0, text: 'Idle' };
  private lastError: string | null = null;

  public getStatus(): WebGPUProviderStatus {
    return this.status;
  }

  public getProgress(): WebGPUProgressReport {
    return { ...this.progressReport };
  }

  public getCurrentModelId(): string {
    return this.currentModelId;
  }

  public getLastError(): string | null {
    return this.lastError;
  }

  public isReady(): boolean {
    return this.status === 'ready' && this.engine !== null;
  }

  /**
   * Load model progressively via WebLLM with progress reporting.
   */
  public async loadModel(
    modelId: string = DEFAULT_WEBGPU_MODEL,
    onProgress?: (report: WebGPUProgressReport) => void
  ): Promise<boolean> {
    this.status = 'checking';
    this.lastError = null;

    const supported = await isWebGPUSupported();
    if (!supported) {
      this.status = 'error';
      this.lastError = 'WebGPU is not supported in this browser/device.';
      this.progressReport = { progress: 0, text: this.lastError };
      onProgress?.(this.progressReport);
      return false;
    }

    this.status = 'loading';
    this.currentModelId = modelId;
    this.progressReport = { progress: 0, text: `Iniciando carga de ${modelId}...` };
    onProgress?.(this.progressReport);

    try {
      const initProgressCallback = (report: InitProgressReport) => {
        const progressVal = typeof report.progress === 'number' ? Math.min(1, Math.max(0, report.progress)) : 0;
        const rep = report as unknown as { step?: number; totalSteps?: number };
        this.progressReport = {
          progress: progressVal,
          text: report.text || 'Cargando modelo...',
          step: rep.step,
          totalSteps: rep.totalSteps,
        };
        onProgress?.(this.progressReport);
      };

      this.engine = await CreateMLCEngine(modelId, {
        initProgressCallback,
      });

      this.status = 'ready';
      this.progressReport = { progress: 1, text: 'Modelo cargado exitosamente' };
      onProgress?.(this.progressReport);
      return true;
    } catch (err) {
      this.status = 'error';
      const errMsg = err instanceof Error ? err.message : String(err);
      this.lastError = `Error cargando modelo local: ${errMsg}`;
      this.progressReport = { progress: 0, text: this.lastError };
      onProgress?.(this.progressReport);

      // Attempt fallback model if 3B or custom failed and isn't already the 1B fallback
      if (modelId !== FALLBACK_WEBGPU_MODEL) {
        console.warn(`[WebGPUModelProvider] Fallback a ${FALLBACK_WEBGPU_MODEL} tras fallo de ${modelId}`);
        return this.loadModel(FALLBACK_WEBGPU_MODEL, onProgress);
      }

      return false;
    }
  }

  /**
   * Generate completion response locally using WebGPU compute shaders.
   */
  public async generateResponse(
    promptOrMessages: string | ChatMessage[],
    options: GenerateOptions = {}
  ): Promise<string> {
    if (!this.isReady() || !this.engine) {
      const loaded = await this.loadModel(this.currentModelId);
      if (!loaded || !this.engine) {
        throw new Error(this.lastError || 'Modelo no disponible para inferencia WebGPU');
      }
    }

    const messages: ChatMessage[] = [];

    if (options.systemPrompt) {
      messages.push({ role: 'system', content: options.systemPrompt });
    }

    if (typeof promptOrMessages === 'string') {
      messages.push({ role: 'user', content: promptOrMessages });
    } else {
      messages.push(...promptOrMessages);
    }

    try {
      const response = await this.engine.chat.completions.create({
        messages,
        temperature: options.temperature ?? 0.6,
        max_tokens: options.maxTokens ?? 256,
        top_p: options.topP ?? 0.95,
      });

      const choice = response.choices?.[0];
      const content = choice?.message?.content;
      if (typeof content === 'string') {
        return content;
      }
      return (choice as unknown as { delta?: { content?: string } })?.delta?.content || '';
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      throw new Error(`Error durante inferencia WebGPU: ${errMsg}`);
    }
  }

  /**
   * Generate tutor response specifically using pedagogo system prompt.
   */
  public async generateTutorResponse(
    userQuestion: string,
    contextInfo?: string
  ): Promise<string> {
    const defaultSystemPrompt = [
      'Eres un tutor pedagógico interactivo de SaberParaTodos / WorldExams ejecutándote 100% local en WebGPU.',
      'Responde en español claro, conciso y motivador (2-4 oraciones).',
      'No des la respuesta correcta de inmediato; da pistas y anima al estudiante a razonar.',
      contextInfo ? `Contexto académico: ${contextInfo}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return this.generateResponse(userQuestion, {
      systemPrompt: defaultSystemPrompt,
      temperature: 0.5,
      maxTokens: 256,
    });
  }

  /**
   * Unload WebGPU engine resources.
   */
  public async unload(): Promise<void> {
    if (this.engine) {
      try {
        if (typeof this.engine.unload === 'function') {
          await this.engine.unload();
        }
      } catch (e) {
        console.warn('[WebGPUModelProvider] Error liberando memoria WebGPU:', e);
      }
      this.engine = null;
    }
    this.status = 'idle';
    this.progressReport = { progress: 0, text: 'Idle' };
  }
}

// Singleton helper instance
let providerInstance: WebGPUModelProvider | null = null;

export function getWebGPUProvider(): WebGPUModelProvider {
  if (!providerInstance) {
    providerInstance = new WebGPUModelProvider();
  }
  return providerInstance;
}
