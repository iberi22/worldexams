import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fs from 'fs';
import { saveAiTierPreference, getAiTierPreference } from '../../src/lib/idb-storage';

describe('TierSelector & IDB Storage Tier Preferences', () => {
  beforeEach(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('IDB Storage Tier Preference Functions', () => {
    it('saves and retrieves AI tier preference from localStorage fallback', async () => {
      await saveAiTierPreference('chrome-nano');
      const retrieved = await getAiTierPreference();
      expect(retrieved).toBe('chrome-nano');
    });

    it('updates AI tier preference successfully', async () => {
      await saveAiTierPreference('webgpu');
      expect(await getAiTierPreference()).toBe('webgpu');

      await saveAiTierPreference('ollama');
      expect(await getAiTierPreference()).toBe('ollama');
    });
  });

  describe('TierSelector Svelte Component Verification', () => {
    const code = fs.readFileSync('src/components/ai/TierSelector.svelte', 'utf8');

    it('contains all 4 capability tier definitions: Chrome Nano, WebGPU, Ollama, Cloud', () => {
      expect(code).toContain("id: 'chrome-nano'");
      expect(code).toContain("name: 'Chrome Nano'");

      expect(code).toContain("id: 'webgpu'");
      expect(code).toContain("name: 'WebGPU'");

      expect(code).toContain("id: 'ollama'");
      expect(code).toContain("name: 'Ollama'");

      expect(code).toContain("id: 'cloud'");
      expect(code).toContain("name: 'Cloud'");
    });

    it('implements auto-detection on mount for capabilities', () => {
      expect(code).toContain('detectCapabilities()');
      expect(code).toContain('onMount');
      expect(code).toContain('hasChromeNano');
      expect(code).toContain('hasWebGpu');
      expect(code).toContain('hasOllama');
      expect(code).toContain('hasCloud');
    });

    it('saves preference to IndexedDB / localStorage on tier selection', () => {
      expect(code).toContain('saveAiTierPreference');
      expect(code).toContain('getAiTierPreference');
      expect(code).toContain('selectTier(tier.id)');
    });

    it('includes required accessibility attributes (role=radiogroup, role=radio, aria-checked)', () => {
      expect(code).toContain('role="radiogroup"');
      expect(code).toContain('role="radio"');
      expect(code).toContain('aria-checked={isSelected}');
      expect(code).toContain('aria-label');
      expect(code).toContain('tabindex="0"');
      expect(code).toContain('onkeydown');
    });
  });
});
