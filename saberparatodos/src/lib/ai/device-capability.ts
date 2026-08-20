/**
 * Device capability detection for Hybrid Tutor in SaberParaTodos / WorldExams.
 * Detects: WebGPU, Chrome Built-in AI (Gemini Nano), Ollama local, and SWAL cloud credits.
 */

import { getUserProfile } from '../supabase';

export type AiTier = 'chrome-nano' | 'webgpu' | 'ollama' | 'cloud' | 'none';

export interface DeviceCapabilityResult {
  hasWebGPU: boolean;
  hasChromeNano: boolean;
  hasOllama: boolean;
  hasCloudCredits: boolean;
  cloudCredits: number;
  recommendedTier: AiTier;
}

export interface DetectCapabilitiesOptions {
  fetchFn?: typeof fetch;
  ollamaUrl?: string;
  getProfileFn?: typeof getUserProfile;
  timeoutMs?: number;
}

/**
 * Checks if WebGPU is available in the current browser environment.
 */
export async function checkWebGPU(): Promise<boolean> {
  if (typeof navigator === 'undefined' || !('gpu' in navigator) || !navigator.gpu) {
    return false;
  }
  try {
    const adapter = await navigator.gpu.requestAdapter();
    return adapter !== null && adapter !== undefined;
  } catch {
    return false;
  }
}

/**
 * Checks if Chrome Built-in AI (Gemini Nano) is available via navigator.ai.languageModel
 * or window.ai.languageModel.
 */
export async function checkChromeNano(): Promise<boolean> {
  try {
    const navAi = typeof navigator !== 'undefined' ? (navigator as any).ai : undefined;
    const winAi = typeof window !== 'undefined' ? (window as any).ai : undefined;
    const aiObj = navAi || winAi;

    if (!aiObj || !aiObj.languageModel) {
      return false;
    }

    if (typeof aiObj.languageModel.capabilities === 'function') {
      const caps = await aiObj.languageModel.capabilities();
      if (caps && caps.available === 'no') {
        return false;
      }
    } else if (typeof aiObj.languageModel.availability === 'function') {
      const availability = await aiObj.languageModel.availability();
      if (availability === 'no' || availability === 'unavailable') {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if an Ollama instance is running locally on http://localhost:11434 (or custom URL).
 */
export async function checkOllama(
  fetchFn: typeof fetch = fetch,
  ollamaUrl: string = 'http://localhost:11434/api/tags',
  timeoutMs: number = 1000
): Promise<boolean> {
  if (typeof fetchFn !== 'function') {
    return false;
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetchFn(ollamaUrl, {
      method: 'GET',
      signal: controller ? controller.signal : undefined,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * Queries SWAL user profile to check if cloud credits are available.
 */
export async function checkCloudCredits(
  getProfileFn: typeof getUserProfile = getUserProfile
): Promise<{ hasCloudCredits: boolean; credits: number }> {
  try {
    const profile = await getProfileFn();
    if (profile && typeof profile.credits === 'number' && profile.credits > 0) {
      return { hasCloudCredits: true, credits: profile.credits };
    }
    return { hasCloudCredits: false, credits: profile?.credits ?? 0 };
  } catch {
    return { hasCloudCredits: false, credits: 0 };
  }
}

/**
 * Determines recommended AI tier based on detected capabilities in priority order:
 * 1. Chrome Gemini Nano
 * 2. WebGPU
 * 3. Ollama local
 * 4. Cloud credits
 * 5. None
 */
export function determineRecommendedTier(caps: {
  hasChromeNano: boolean;
  hasWebGPU: boolean;
  hasOllama: boolean;
  hasCloudCredits: boolean;
}): AiTier {
  if (caps.hasChromeNano) return 'chrome-nano';
  if (caps.hasWebGPU) return 'webgpu';
  if (caps.hasOllama) return 'ollama';
  if (caps.hasCloudCredits) return 'cloud';
  return 'none';
}

/**
 * Runs all 4 capability checks in parallel and returns full DeviceCapabilityResult.
 */
export async function detectDeviceCapabilities(
  options: DetectCapabilitiesOptions = {}
): Promise<DeviceCapabilityResult> {
  const fetchFn = options.fetchFn ?? (typeof fetch !== 'undefined' ? fetch : undefined);
  const getProfileFn = options.getProfileFn ?? getUserProfile;
  const ollamaUrl = options.ollamaUrl ?? 'http://localhost:11434/api/tags';
  const timeoutMs = options.timeoutMs ?? 1000;

  const [hasWebGPU, hasChromeNano, hasOllama, cloudResult] = await Promise.all([
    checkWebGPU(),
    checkChromeNano(),
    fetchFn ? checkOllama(fetchFn, ollamaUrl, timeoutMs) : Promise.resolve(false),
    checkCloudCredits(getProfileFn),
  ]);

  const recommendedTier = determineRecommendedTier({
    hasChromeNano,
    hasWebGPU,
    hasOllama,
    hasCloudCredits: cloudResult.hasCloudCredits,
  });

  return {
    hasWebGPU,
    hasChromeNano,
    hasOllama,
    hasCloudCredits: cloudResult.hasCloudCredits,
    cloudCredits: cloudResult.credits,
    recommendedTier,
  };
}
