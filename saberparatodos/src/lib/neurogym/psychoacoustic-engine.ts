/**
 * psychoacoustic-engine.ts
 * Generador de Ondas Binaurales y Pulsos Isocrónicos en Tiempo Real con Web Audio API.
 * Diseñado para inducir estados de concentración y rendimiento neurocognitivo óptimo.
 */

export type BrainwaveTarget = 'alpha_focus' | 'beta_speed' | 'gamma_memory' | 'theta_creativity';

export interface BrainwaveConfig {
  name: string;
  carrierHz: number;
  beatHz: number;
  description: string;
}

export const BRAINWAVE_PRESETS: Record<BrainwaveTarget, BrainwaveConfig> = {
  alpha_focus: {
    name: 'Enfoque Profundo (Alpha 10Hz)',
    carrierHz: 216,
    beatHz: 10,
    description: 'Reduce el ruido mental y optimiza la lectura comprensiva y resolución analítica.'
  },
  beta_speed: {
    name: 'Agilidad & Procesamiento (Beta 18Hz)',
    carrierHz: 250,
    beatHz: 18,
    description: 'Aumenta la velocidad de procesamiento perceptivo y respuesta motora rápida.'
  },
  gamma_memory: {
    name: 'Consolidación & Memoria (Gamma 40Hz)',
    carrierHz: 300,
    beatHz: 40,
    description: 'Estimula la vinculación de información multidimensional en memoria de trabajo.'
  },
  theta_creativity: {
    name: 'Pensamiento Lateral & Creatividad (Theta 6Hz)',
    carrierHz: 180,
    beatHz: 6,
    description: 'Favorece la intuición lógica y enfoques no lineales ante problemas complejos.'
  }
};

class PsychoacousticEngine {
  private ctx: AudioContext | null = null;
  private leftOsc: OscillatorNode | null = null;
  private rightOsc: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private activePreset: BrainwaveTarget | null = null;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Inicia la reproducción de ondas binaurales estéreo
   */
  startBinaural(target: BrainwaveTarget, volume = 0.15): boolean {
    this.stop();
    const ctx = this.initContext();
    if (!ctx) return false;

    try {
      const config = BRAINWAVE_PRESETS[target];
      this.activePreset = target;

      const merger = ctx.createChannelMerger(2);
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1.5);

      // Canal Izquierdo: carrierHz
      this.leftOsc = ctx.createOscillator();
      this.leftOsc.type = 'sine';
      this.leftOsc.frequency.setValueAtTime(config.carrierHz, ctx.currentTime);
      this.leftOsc.connect(merger, 0, 0);

      // Canal Derecho: carrierHz + beatHz
      this.rightOsc = ctx.createOscillator();
      this.rightOsc.type = 'sine';
      this.rightOsc.frequency.setValueAtTime(config.carrierHz + config.beatHz, ctx.currentTime);
      this.rightOsc.connect(merger, 0, 1);

      merger.connect(this.masterGain);
      this.masterGain.connect(ctx.destination);

      this.leftOsc.start();
      this.rightOsc.start();
      return true;
    } catch (e) {
      console.warn('[PsychoacousticEngine] Error al iniciar audio:', e);
      return false;
    }
  }

  /**
   * Detiene suavemente la reproducción
   */
  stop(): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        if (this.leftOsc) { this.leftOsc.stop(); this.leftOsc.disconnect(); this.leftOsc = null; }
        if (this.rightOsc) { this.rightOsc.stop(); this.rightOsc.disconnect(); this.rightOsc = null; }
        this.activePreset = null;
      }, 550);
    } catch {}
  }

  getActiveTarget(): BrainwaveTarget | null {
    return this.activePreset;
  }
}

export const psychoacoustics = new PsychoacousticEngine();
