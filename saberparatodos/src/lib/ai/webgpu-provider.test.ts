import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isWebGPUSupported,
  WebGPUModelProvider,
  getWebGPUProvider,
  DEFAULT_WEBGPU_MODEL,
  FALLBACK_WEBGPU_MODEL,
  type WebGPUProgressReport,
} from './webgpu-provider';

vi.mock('@mlc-ai/web-llm', () => {
  return {
    CreateMLCEngine: vi.fn(async (modelId: string, options?: any) => {
      if (modelId === 'fail-model') {
        throw new Error('Failed to load model in WebGPU');
      }
      // Trigger progress callback if present
      options?.initProgressCallback?.({
        progress: 0.5,
        text: 'Loading weights...',
        step: 1,
        totalSteps: 2,
      });

      return {
        chat: {
          completions: {
            create: vi.fn(async (params: any) => {
              return {
                choices: [
                  {
                    message: {
                      content: `Respuesta local generada para: ${params.messages[params.messages.length - 1].content}`,
                    },
                  },
                ],
              };
            }),
          },
        },
        unload: vi.fn(async () => {}),
      };
    }),
  };
});

describe('WebGPU / WebLLM Provider', () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  describe('isWebGPUSupported', () => {
    it('returns false if navigator or gpu is undefined', async () => {
      Object.defineProperty(global, 'navigator', {
        value: {},
        writable: true,
        configurable: true,
      });
      const supported = await isWebGPUSupported();
      expect(supported).toBe(false);
    });

    it('returns false if requestAdapter returns null', async () => {
      Object.defineProperty(global, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockResolvedValue(null),
          },
        },
        writable: true,
        configurable: true,
      });
      const supported = await isWebGPUSupported();
      expect(supported).toBe(false);
    });

    it('returns true if requestAdapter returns a valid adapter', async () => {
      Object.defineProperty(global, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockResolvedValue({}),
          },
        },
        writable: true,
        configurable: true,
      });
      const supported = await isWebGPUSupported();
      expect(supported).toBe(true);
    });
  });

  describe('WebGPUModelProvider', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockResolvedValue({}),
          },
        },
        writable: true,
        configurable: true,
      });
    });

    it('initializes with idle status and default Llama 3.2 3B model ID', () => {
      const provider = new WebGPUModelProvider();
      expect(provider.getStatus()).toBe('idle');
      expect(provider.getCurrentModelId()).toBe(DEFAULT_WEBGPU_MODEL);
      expect(provider.isReady()).toBe(false);
    });

    it('loads model progressively and updates progress report', async () => {
      const provider = new WebGPUModelProvider();
      const progressReports: WebGPUProgressReport[] = [];

      const success = await provider.loadModel(DEFAULT_WEBGPU_MODEL, (report) => {
        progressReports.push({ ...report });
      });

      expect(success).toBe(true);
      expect(provider.getStatus()).toBe('ready');
      expect(provider.isReady()).toBe(true);
      expect(progressReports.length).toBeGreaterThan(0);
      expect(provider.getProgress().progress).toBe(1);
    });

    it('handles model load failure and attempts fallback model', async () => {
      const provider = new WebGPUModelProvider();

      const success = await provider.loadModel('fail-model');

      // 'fail-model' fails, so provider falls back to FALLBACK_WEBGPU_MODEL which succeeds
      expect(success).toBe(true);
      expect(provider.getCurrentModelId()).toBe(FALLBACK_WEBGPU_MODEL);
      expect(provider.getStatus()).toBe('ready');
    });

    it('generates tutor response locally with pedagogo prompt', async () => {
      const provider = new WebGPUModelProvider();
      await provider.loadModel(DEFAULT_WEBGPU_MODEL);

      const response = await provider.generateTutorResponse('¿Cómo resuelvo esta ecuación?');

      expect(response).toContain('Respuesta local generada para: ¿Cómo resuelvo esta ecuación?');
    });

    it('unloads engine resources correctly', async () => {
      const provider = new WebGPUModelProvider();
      await provider.loadModel(DEFAULT_WEBGPU_MODEL);
      expect(provider.isReady()).toBe(true);

      await provider.unload();

      expect(provider.getStatus()).toBe('idle');
      expect(provider.isReady()).toBe(false);
    });

    it('provides a singleton instance via getWebGPUProvider', () => {
      const p1 = getWebGPUProvider();
      const p2 = getWebGPUProvider();
      expect(p1).toBe(p2);
    });
  });
});
