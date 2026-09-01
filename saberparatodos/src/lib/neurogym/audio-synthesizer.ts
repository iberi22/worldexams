/**
 * audio-synthesizer.ts
 * Generador de Estímulos Auditivos en Tiempo Real mediante Web Audio API.
 * Diseñado para tareas Dual N-Back, estimulación rítmica y retroalimentación háptica/auditiva
 * con latencia ultra baja (0 dependencias externas).
 */

class NeuroAudioSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Emite un tono puro en Hz (ej: 440 Hz = A4, 523.25 Hz = C5, etc.)
   */
  playTone(freqHz: number, durationSeconds: number = 0.18, type: OscillatorType = 'sine'): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqHz, ctx.currentTime);

      // Envelope ADSR suave para evitar clics acústicos
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSeconds);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + durationSeconds);
    } catch (e) {
      console.warn('[NeuroAudio] Error emitiendo tono:', e);
    }
  }

  /**
   * Tono para acierto o coincidencia N-Back
   */
  playSuccess(): void {
    this.playTone(587.33, 0.12, 'triangle'); // D5
    setTimeout(() => this.playTone(880.00, 0.18, 'triangle'), 80); // A5
  }

  /**
   * Tono suave para fallo o error de inhibición
   */
  playError(): void {
    this.playTone(220.00, 0.2, 'sawtooth'); // A3
  }

  /**
   * Tono de aviso / estímulo auditivo N-Back (1 de 8 frecuencias características)
   */
  playNBackLetterTone(index: number): void {
    const scales = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]; // Escala C4-C5
    const freq = scales[Math.abs(index) % scales.length];
    this.playTone(freq, 0.22, 'sine');
  }
}

export const neuroAudio = new NeuroAudioSynthesizer();
