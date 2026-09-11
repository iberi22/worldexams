import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  isSpeechSynthesisSupported,
  pickSpanishVoice,
  getVoicesAsync,
  speak,
  stop,
  pause,
  resume,
  isSpeaking,
  isPaused,
  getReadAloudFallbackInfo
} from './read-aloud';

/**
 * Absolute path reference:
 * saberparatodos/src/components/cuentos/lector/read-aloud.test.ts
 */

describe('read-aloud Web Speech API wrapper', () => {
  let originalSpeechSynthesis: any;
  let originalUtterance: any;
  let mockSynthesis: any;
  let mockUtterances: any[];

  beforeEach(() => {
    originalSpeechSynthesis = (window as any).speechSynthesis;
    originalUtterance = (window as any).SpeechSynthesisUtterance;
    mockUtterances = [];

    // Mock SpeechSynthesisUtterance constructor
    class MockUtterance {
      text: string;
      lang = '';
      rate = 1;
      pitch = 1;
      voice: any = null;
      onboundary: any = null;
      onstart: any = null;
      onend: any = null;
      onerror: any = null;

      constructor(text: string) {
        this.text = text;
        mockUtterances.push(this);
      }
    }

    (window as any).SpeechSynthesisUtterance = MockUtterance as any;

    // Mock speechSynthesis instance
    mockSynthesis = {
      speaking: false,
      paused: false,
      pending: false,
      getVoices: vi.fn().mockReturnValue([]),
      speak: vi.fn().mockImplementation((utt: any) => {
        mockSynthesis.speaking = true;
      }),
      cancel: vi.fn().mockImplementation(() => {
        mockSynthesis.speaking = false;
        mockSynthesis.paused = false;
      }),
      pause: vi.fn().mockImplementation(() => {
        mockSynthesis.paused = true;
      }),
      resume: vi.fn().mockImplementation(() => {
        mockSynthesis.paused = false;
      }),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    };

    Object.defineProperty(window, 'speechSynthesis', {
      value: mockSynthesis,
      writable: true,
      configurable: true
    });
  });

  afterEach(() => {
    if (originalSpeechSynthesis !== undefined) {
      Object.defineProperty(window, 'speechSynthesis', {
        value: originalSpeechSynthesis,
        writable: true,
        configurable: true
      });
    } else {
      delete (window as any).speechSynthesis;
    }

    if (originalUtterance !== undefined) {
      (window as any).SpeechSynthesisUtterance = originalUtterance;
    } else {
      delete (window as any).SpeechSynthesisUtterance;
    }

    vi.restoreAllMocks();
  });

  describe('isSpeechSynthesisSupported', () => {
    it('returns true when window.speechSynthesis and SpeechSynthesisUtterance exist', () => {
      expect(isSpeechSynthesisSupported()).toBe(true);
    });

    it('returns false when speechSynthesis is missing or undefined', () => {
      delete (window as any).speechSynthesis;
      expect(isSpeechSynthesisSupported()).toBe(false);
    });
  });

  describe('pickSpanishVoice', () => {
    it('returns preferred es-* voice when present', () => {
      const mockVoices = [
        { name: 'Alex', lang: 'en-US', default: false, localService: true },
        { name: 'Jorge', lang: 'es-MX', default: false, localService: true },
        { name: 'Monica', lang: 'es-ES', default: false, localService: true }
      ] as SpeechSynthesisVoice[];

      const selected = pickSpanishVoice(mockVoices);
      expect(selected).not.toBeNull();
      expect(selected?.lang.toLowerCase().startsWith('es')).toBe(true);
      expect(selected?.name).toBe('Jorge');
    });

    it('returns es-419 matching voice over generic es voice if available', () => {
      const mockVoices = [
        { name: 'Lucia', lang: 'es-ES', default: false, localService: true },
        { name: 'Carlos', lang: 'es-419', default: false, localService: true }
      ] as SpeechSynthesisVoice[];

      const selected = pickSpanishVoice(mockVoices);
      expect(selected?.name).toBe('Carlos');
    });

    it('falls back deterministically when no es voice is present', () => {
      const mockVoices = [
        { name: 'Samantha', lang: 'en-US', default: true, localService: true },
        { name: 'Thomas', lang: 'fr-FR', default: false, localService: true }
      ] as SpeechSynthesisVoice[];

      const selected = pickSpanishVoice(mockVoices);
      expect(selected).not.toBeNull();
      expect(selected?.name).toBe('Samantha');
    });

    it('returns null when voice list is empty', () => {
      expect(pickSpanishVoice([])).toBeNull();
    });
  });

  describe('getVoicesAsync', () => {
    it('resolves immediately if voices are already loaded', async () => {
      const mockVoices = [{ name: 'Jorge', lang: 'es-MX' }] as SpeechSynthesisVoice[];
      mockSynthesis.getVoices.mockReturnValue(mockVoices);

      const voices = await getVoicesAsync(500);
      expect(voices).toEqual(mockVoices);
    });

    it('listens for voiceschanged event if initial voices list is empty', async () => {
      mockSynthesis.getVoices.mockReturnValueOnce([]).mockReturnValue([{ name: 'Carlos', lang: 'es-419' }]);

      mockSynthesis.addEventListener.mockImplementation((event: string, cb: any) => {
        if (event === 'voiceschanged') {
          setTimeout(cb, 20);
        }
      });

      const voicesPromise = getVoicesAsync(500);
      const voices = await voicesPromise;
      expect(voices).toHaveLength(1);
      expect(voices[0].name).toBe('Carlos');
    });
  });

  describe('speak, stop, pause, resume', () => {
    it('configures utterance and calls speechSynthesis.speak with lang starting es', () => {
      const mockVoice = { name: 'Jorge', lang: 'es-MX' } as SpeechSynthesisVoice;
      mockSynthesis.getVoices.mockReturnValue([mockVoice]);

      const onStart = vi.fn();
      const onEnd = vi.fn();

      const utterance = speak('Tana encuentra un árbol de mangos.', {
        rate: 0.8,
        onStart,
        onEnd
      });

      expect(utterance).not.toBeNull();
      expect(mockSynthesis.speak).toHaveBeenCalledTimes(1);
      expect(utterance?.lang.toLowerCase().startsWith('es')).toBe(true);
      expect(utterance?.rate).toBe(0.8);

      utterance?.onstart?.({ type: 'start' } as SpeechSynthesisEvent);
      expect(onStart).toHaveBeenCalled();

      utterance?.onend?.({ type: 'end' } as SpeechSynthesisEvent);
      expect(onEnd).toHaveBeenCalled();
    });

    it('cancels previous speech on stop() and before speak()', () => {
      speak('Página uno');
      expect(mockSynthesis.cancel).toHaveBeenCalledTimes(1);
      expect(mockSynthesis.speak).toHaveBeenCalledTimes(1);

      speak('Página dos');
      expect(mockSynthesis.cancel).toHaveBeenCalledTimes(2);
      expect(mockSynthesis.speak).toHaveBeenCalledTimes(2);

      stop();
      expect(mockSynthesis.cancel).toHaveBeenCalledTimes(3);
    });

    it('delegates pause() and resume() to speechSynthesis', () => {
      pause();
      expect(mockSynthesis.pause).toHaveBeenCalledTimes(1);

      resume();
      expect(mockSynthesis.resume).toHaveBeenCalledTimes(1);
    });

    it('tracks isSpeaking and isPaused state', () => {
      expect(isSpeaking()).toBe(false);
      speak('Hola mundo');
      expect(isSpeaking()).toBe(true);

      pause();
      expect(isPaused()).toBe(true);
    });
  });

  describe('onboundary karaoke callback', () => {
    it('fires onBoundary callback with charIndex and charLength', () => {
      const onBoundary = vi.fn();
      const text = 'Tana ve cinco mangos en el árbol.';

      const utterance = speak(text, { onBoundary });
      expect(utterance).not.toBeNull();

      // Explicit charLength provided by browser
      utterance?.onboundary?.({ name: 'word', charIndex: 8, charLength: 5 } as any);
      expect(onBoundary).toHaveBeenLastCalledWith(8, 5);

      // Omitted charLength fallback calculation (computing word length starting at charIndex 14: "mangos")
      utterance?.onboundary?.({ name: 'word', charIndex: 14 } as any);
      expect(onBoundary).toHaveBeenLastCalledWith(14, 6);
    });
  });

  describe('no-API graceful fallback', () => {
    it('reports supported: false and returns null without throwing when API is unavailable', () => {
      delete (window as any).speechSynthesis;

      const fallbackInfo = getReadAloudFallbackInfo();
      expect(fallbackInfo.supported).toBe(false);
      expect(fallbackInfo.tip).toContain('no está disponible');

      const onError = vi.fn();
      const result = speak('Texto de prueba', { onError });

      expect(result).toBeNull();
      expect(onError).toHaveBeenCalled();
      expect(() => stop()).not.toThrow();
      expect(() => pause()).not.toThrow();
      expect(() => resume()).not.toThrow();
      expect(isSpeaking()).toBe(false);
      expect(isPaused()).toBe(false);
    });
  });
});
