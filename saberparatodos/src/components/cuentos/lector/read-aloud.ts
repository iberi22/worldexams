/**
 * Module for framework-free Web Speech API text-to-speech with Spanish voice selection,
 * word boundary highlighting (karaoke callback), and graceful unsupported fallback.
 *
 * Absolute path reference:
 * saberparatodos/src/components/cuentos/lector/read-aloud.ts
 *
 * Constraints:
 * - Free speech only (window.speechSynthesis, no cloud TTS keys / no paid APIs).
 * - Zero tokens / zero telemetry (BR-03 / BR-07).
 * - Neutral Spanish strings for fallbacks.
 */

export interface SpeakOptions {
  /** Target language code, e.g. 'es-419', 'es-MX', 'es-ES' (defaults to voice lang or 'es-419') */
  lang?: string;
  /** Speech rate between 0.5 and 2.0 (recommended for children: 0.8 to 1.0; defaults to 0.8) */
  rate?: number;
  /** Speech pitch between 0.0 and 2.0 (defaults to 1.0) */
  pitch?: number;
  /** Optional specific SpeechSynthesisVoice object to use */
  voice?: SpeechSynthesisVoice | null;
  /** Callback fired on word boundaries for karaoke-style word highlighting */
  onBoundary?: (charIndex: number, charLength: number) => void;
  /** Callback fired when speech starts */
  onStart?: () => void;
  /** Callback fired when speech finishes naturally */
  onEnd?: () => void;
  /** Callback fired when an error occurs during synthesis */
  onError?: (error: any) => void;
}

export interface ReadAloudFallbackInfo {
  supported: boolean;
  tip: string;
}

/**
 * Checks if the Web Speech API (SpeechSynthesis) is supported in the current environment.
 */
export function isSpeechSynthesisSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window &&
    window.speechSynthesis !== undefined
  );
}

/**
 * Selects the best Spanish voice from a list or from window.speechSynthesis.getVoices().
 * Preference order:
 * 1. Voices with lang matching 'es-419', 'es-MX', 'es-CO', 'es-ES', 'es-US', 'es-AR', 'es-CL', 'es-PE'
 * 2. Any voice starting with 'es'
 * 3. Fallback to default voice or first available voice if no Spanish voice exists
 */
export function pickSpanishVoice(providedVoices?: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!isSpeechSynthesisSupported() && !providedVoices) {
    return null;
  }

  const voices = providedVoices ?? window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return null;
  }

  const esVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('es'));

  if (esVoices.length > 0) {
    // Preferred Spanish locales in order
    const preferredLocales = ['es-419', 'es-mx', 'es-co', 'es-es', 'es-us', 'es-ar', 'es-cl', 'es-pe'];
    for (const locale of preferredLocales) {
      const match = esVoices.find((v) => v.lang.toLowerCase() === locale);
      if (match) return match;
    }

    // Try local service voice if available
    const localMatch = esVoices.find((v) => v.localService);
    if (localMatch) return localMatch;

    // Return first Spanish voice
    return esVoices[0];
  }

  // Fallback if no Spanish voice available
  const defaultVoice = voices.find((v) => v.default);
  return defaultVoice || voices[0] || null;
}

/**
 * Asynchronously retrieves available speechSynthesis voices.
 * Handles Chrome / Android async voice loading via 'voiceschanged' event.
 */
export function getVoicesAsync(timeoutMs = 1000): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([]);
      return;
    }

    const immediateVoices = window.speechSynthesis.getVoices();
    if (immediateVoices && immediateVoices.length > 0) {
      resolve(immediateVoices);
      return;
    }

    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
      }
    }, timeoutMs);

    const onVoicesChanged = () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        if (window.speechSynthesis.removeEventListener) {
          window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
        }
        resolve(window.speechSynthesis.getVoices());
      }
    };

    if (window.speechSynthesis.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    } else {
      (window.speechSynthesis as any).onvoiceschanged = onVoicesChanged;
    }
  });
}

/**
 * Calculates word length starting at charIndex if event.charLength is undefined or zero.
 */
function computeWordLength(text: string, charIndex: number): number {
  if (charIndex >= text.length) return 0;
  const slice = text.slice(charIndex);
  const match = slice.match(/^[\p{L}\p{N}\p{M}]+/u) || slice.match(/^\S+/);
  return match ? match[0].length : 1;
}

/**
 * Speaks text using Web Speech API with Spanish voice preference and word highlighting callback.
 *
 * @param text Content to be read aloud
 * @param options Configuration options for rate, pitch, callbacks, etc.
 * @returns SpeechSynthesisUtterance instance or null if synthesis is unsupported or failed
 */
export function speak(text: string, options: SpeakOptions = {}): SpeechSynthesisUtterance | null {
  if (!isSpeechSynthesisSupported()) {
    const err = new Error('La síntesis de voz no está soportada en este navegador.');
    if (options.onError) {
      options.onError(err);
    }
    return null;
  }

  if (!text || text.trim().length === 0) {
    return null;
  }

  // Stop any active utterance before starting a new one
  stop();

  const UtteranceClass =
    typeof SpeechSynthesisUtterance !== 'undefined'
      ? SpeechSynthesisUtterance
      : (window as any).SpeechSynthesisUtterance;

  if (!UtteranceClass) {
    if (options.onError) {
      options.onError(new Error('SpeechSynthesisUtterance no disponible.'));
    }
    return null;
  }

  const utterance = new UtteranceClass(text);
  const selectedVoice = options.voice !== undefined ? options.voice : pickSpanishVoice();

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = options.lang || selectedVoice.lang || 'es-419';
  } else {
    utterance.lang = options.lang || 'es-419';
  }

  utterance.rate = options.rate ?? 0.8;
  utterance.pitch = options.pitch ?? 1.0;

  if (options.onBoundary) {
    utterance.onboundary = (event: SpeechSynthesisEvent) => {
      // Chrome/Edge provide charLength on SpeechSynthesisEvent; safari/firefox may omit it
      const charIndex = event.charIndex ?? 0;
      const charLength =
        typeof event.charLength === 'number' && event.charLength > 0
          ? event.charLength
          : computeWordLength(text, charIndex);

      options.onBoundary?.(charIndex, charLength);
    };
  }

  if (options.onStart) {
    utterance.onstart = () => {
      options.onStart?.();
    };
  }

  if (options.onEnd) {
    utterance.onend = () => {
      options.onEnd?.();
    };
  }

  if (options.onError) {
    utterance.onerror = (event: any) => {
      options.onError?.(event);
    };
  }

  try {
    window.speechSynthesis.speak(utterance);
    return utterance;
  } catch (err) {
    if (options.onError) {
      options.onError(err);
    }
    return null;
  }
}

/**
 * Stops ongoing speech synthesis.
 */
export function stop(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cleanup errors
    }
  }
}

/**
 * Pauses active speech synthesis.
 */
export function pause(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.pause();
    } catch {
      // Ignore pause errors
    }
  }
}

/**
 * Resumes paused speech synthesis.
 */
export function resume(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.resume();
    } catch {
      // Ignore resume errors
    }
  }
}

/**
 * Returns whether speech synthesis is currently speaking.
 */
export function isSpeaking(): boolean {
  if (!isSpeechSynthesisSupported()) return false;
  return window.speechSynthesis.speaking ?? false;
}

/**
 * Returns whether speech synthesis is currently paused.
 */
export function isPaused(): boolean {
  if (!isSpeechSynthesisSupported()) return false;
  return window.speechSynthesis.paused ?? false;
}

/**
 * Returns user fallback state and neutral Spanish tip for manual fallback display.
 */
export function getReadAloudFallbackInfo(): ReadAloudFallbackInfo {
  const supported = isSpeechSynthesisSupported();
  return {
    supported,
    tip: supported
      ? 'La lectura en voz alta está disponible.'
      : 'La lectura en voz alta no está disponible en este navegador. Puedes leer el texto directamente.'
  };
}
