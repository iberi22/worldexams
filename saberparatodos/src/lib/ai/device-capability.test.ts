import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  checkWebGPU,
  checkChromeNano,
  checkOllama,
  checkCloudCredits,
  determineRecommendedTier,
  detectDeviceCapabilities,
} from './device-capability';

describe('device-capability', () => {
  const originalNavigator = globalThis.navigator;
  const originalWindow = globalThis.window;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      writable: true,
      configurable: true,
    });
  });

  describe('checkWebGPU', () => {
    it('returns false when navigator.gpu is undefined or missing', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {},
        writable: true,
        configurable: true,
      });
      expect(await checkWebGPU()).toBe(false);
    });

    it('returns true when navigator.gpu.requestAdapter returns an adapter', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockResolvedValue({ name: 'Mock GPU' }),
          },
        },
        writable: true,
        configurable: true,
      });
      expect(await checkWebGPU()).toBe(true);
    });

    it('returns false when navigator.gpu.requestAdapter returns null or throws', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockResolvedValue(null),
          },
        },
        writable: true,
        configurable: true,
      });
      expect(await checkWebGPU()).toBe(false);

      Object.defineProperty(globalThis, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockRejectedValue(new Error('GPU Disabled')),
          },
        },
        writable: true,
        configurable: true,
      });
      expect(await checkWebGPU()).toBe(false);
    });
  });

  describe('checkChromeNano', () => {
    it('returns false when navigator.ai and window.ai are missing', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {},
        writable: true,
        configurable: true,
      });
      Object.defineProperty(globalThis, 'window', {
        value: {},
        writable: true,
        configurable: true,
      });
      expect(await checkChromeNano()).toBe(false);
    });

    it('returns true when navigator.ai.languageModel is available', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          ai: {
            languageModel: {
              capabilities: vi.fn().mockResolvedValue({ available: 'readily' }),
            },
          },
        },
        writable: true,
        configurable: true,
      });
      expect(await checkChromeNano()).toBe(true);
    });

    it('returns false when languageModel capabilities returns available: "no"', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          ai: {
            languageModel: {
              capabilities: vi.fn().mockResolvedValue({ available: 'no' }),
            },
          },
        },
        writable: true,
        configurable: true,
      });
      expect(await checkChromeNano()).toBe(false);
    });
  });

  describe('checkOllama', () => {
    it('returns true when localhost:11434 responds OK', async () => {
      const mockFetch = vi.fn().mockResolvedValue({ ok: true });
      const result = await checkOllama(mockFetch as any);
      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/tags',
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('returns false when localhost:11434 fails or returns non-ok status', async () => {
      const mockFetchBad = vi.fn().mockResolvedValue({ ok: false, status: 500 });
      expect(await checkOllama(mockFetchBad as any)).toBe(false);

      const mockFetchErr = vi.fn().mockRejectedValue(new Error('Connection refused'));
      expect(await checkOllama(mockFetchErr as any)).toBe(false);
    });
  });

  describe('checkCloudCredits', () => {
    it('returns hasCloudCredits true when credits > 0', async () => {
      const mockGetProfile = vi.fn().mockResolvedValue({ credits: 25, subscription_tier: 'free' });
      const res = await checkCloudCredits(mockGetProfile as any);
      expect(res).toEqual({ hasCloudCredits: true, credits: 25 });
    });

    it('returns hasCloudCredits false when credits <= 0 or user is not logged in', async () => {
      const mockGetProfileZero = vi.fn().mockResolvedValue({ credits: 0, subscription_tier: 'free' });
      expect(await checkCloudCredits(mockGetProfileZero as any)).toEqual({
        hasCloudCredits: false,
        credits: 0,
      });

      const mockGetProfileNull = vi.fn().mockResolvedValue(null);
      expect(await checkCloudCredits(mockGetProfileNull as any)).toEqual({
        hasCloudCredits: false,
        credits: 0,
      });
    });
  });

  describe('determineRecommendedTier', () => {
    it('prioritizes chrome-nano over all other tiers', () => {
      const tier = determineRecommendedTier({
        hasChromeNano: true,
        hasWebGPU: true,
        hasOllama: true,
        hasCloudCredits: true,
      });
      expect(tier).toBe('chrome-nano');
    });

    it('recommends webgpu when chrome-nano is unavailable', () => {
      const tier = determineRecommendedTier({
        hasChromeNano: false,
        hasWebGPU: true,
        hasOllama: true,
        hasCloudCredits: true,
      });
      expect(tier).toBe('webgpu');
    });

    it('recommends ollama when chrome-nano and webgpu are unavailable', () => {
      const tier = determineRecommendedTier({
        hasChromeNano: false,
        hasWebGPU: false,
        hasOllama: true,
        hasCloudCredits: true,
      });
      expect(tier).toBe('ollama');
    });

    it('recommends cloud when only cloud credits are available', () => {
      const tier = determineRecommendedTier({
        hasChromeNano: false,
        hasWebGPU: false,
        hasOllama: false,
        hasCloudCredits: true,
      });
      expect(tier).toBe('cloud');
    });

    it('returns none when no capabilities are available', () => {
      const tier = determineRecommendedTier({
        hasChromeNano: false,
        hasWebGPU: false,
        hasOllama: false,
        hasCloudCredits: false,
      });
      expect(tier).toBe('none');
    });
  });

  describe('detectDeviceCapabilities', () => {
    it('returns full capabilities object correctly', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {
          gpu: {
            requestAdapter: vi.fn().mockResolvedValue({ name: 'WebGPU Adapter' }),
          },
        },
        writable: true,
        configurable: true,
      });

      const mockFetch = vi.fn().mockResolvedValue({ ok: true });
      const mockGetProfile = vi.fn().mockResolvedValue({ credits: 100 });

      const result = await detectDeviceCapabilities({
        fetchFn: mockFetch as any,
        getProfileFn: mockGetProfile as any,
      });

      expect(result).toEqual({
        hasWebGPU: true,
        hasChromeNano: false,
        hasOllama: true,
        hasCloudCredits: true,
        cloudCredits: 100,
        recommendedTier: 'webgpu',
      });
    });
  });
});
