/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

/**
 * Sintetizador WebAudio de los cuentos.
 *
 * 100% osciladores: cero archivos de audio, cero requests de red.
 * Usa UN solo AudioContext compartido y perezoso (los navegadores limitan
 * cuántos contextos puede abrir una página; crear uno por toque terminaba
 * silenciando la escena tras varios toques).
 *
 * Timbres por personaje/objeto (`data-sonido` en los SVG de escenas-capas):
 *   tucan · mono · perezosa · agua · fruta · brillo · blip (defecto)
 */

export type SonidoCuento = 'tucan' | 'mono' | 'perezosa' | 'agua' | 'fruta' | 'brillo' | 'blip';

/** Escala pentatónica de Do mayor (nunca suena "mal" al combinarse). */
export const PENTATONICA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx() as AudioContext;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

interface Tono {
  f0: number;
  f1?: number;
  dur: number;
  tipo?: OscillatorType;
  vol?: number;
  retraso?: number;
}

function tono(ac: AudioContext, { f0, f1, dur, tipo = 'sine', vol = 0.14, retraso = 0 }: Tono) {
  const t = ac.currentTime + retraso;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(f0, t);
  if (f1) osc.frequency.exponentialRampToValueAtTime(f1, t + dur);
  // Ataque corto (sin "clic") + caída exponencial suave.
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Blip simple (compatibilidad con la reacción de toque de escena). */
export function blip(frecuencia = 659.25, tipo: OscillatorType = 'triangle'): void {
  const ac = getCtx();
  if (!ac) return;
  try {
    tono(ac, { f0: frecuencia, f1: frecuencia * 1.4, dur: 0.15, tipo, vol: 0.18 });
  } catch {
    /* WebAudio restringido: la reacción visual basta */
  }
}

/** Nota i-ésima de la pentatónica (para contar: 1, 2, 3… sube de tono). */
export function nota(i: number): void {
  const ac = getCtx();
  if (!ac) return;
  const f = PENTATONICA[Math.max(0, i) % PENTATONICA.length];
  try {
    tono(ac, { f0: f, dur: 0.22, tipo: 'triangle', vol: 0.16 });
    tono(ac, { f0: f * 2, dur: 0.12, tipo: 'sine', vol: 0.04 });
  } catch {
    /* noop */
  }
}

/** Arpegio de celebración (al completar un conteo o un mini-juego). */
export function celebracion(): void {
  const ac = getCtx();
  if (!ac) return;
  try {
    [0, 2, 4, 5].forEach((idx, k) =>
      tono(ac, { f0: PENTATONICA[idx], dur: 0.3, tipo: 'triangle', vol: 0.13, retraso: k * 0.09 })
    );
  } catch {
    /* noop */
  }
}

/** Timbre característico por personaje/objeto. */
export function sonido(tipo: SonidoCuento | string | undefined): void {
  const ac = getCtx();
  if (!ac) return;
  try {
    switch (tipo) {
      case 'tucan': // dos píos agudos
        tono(ac, { f0: 1200, f1: 1750, dur: 0.09, tipo: 'sine', vol: 0.12 });
        tono(ac, { f0: 1300, f1: 1900, dur: 0.1, tipo: 'sine', vol: 0.12, retraso: 0.12 });
        break;
      case 'mono': // "uh-uh" juguetón
        tono(ac, { f0: 300, f1: 460, dur: 0.12, tipo: 'triangle', vol: 0.16 });
        tono(ac, { f0: 340, f1: 520, dur: 0.14, tipo: 'triangle', vol: 0.16, retraso: 0.15 });
        break;
      case 'perezosa': // bostezo lento que baja
        tono(ac, { f0: 520, f1: 260, dur: 0.6, tipo: 'sine', vol: 0.12 });
        break;
      case 'agua': // burbujas
        [0, 0.07, 0.15].forEach((r, k) =>
          tono(ac, { f0: 420 + k * 140, f1: 900 + k * 200, dur: 0.07, tipo: 'sine', vol: 0.1, retraso: r })
        );
        break;
      case 'fruta': // "pop"
        tono(ac, { f0: 880, f1: 330, dur: 0.1, tipo: 'sine', vol: 0.18 });
        break;
      case 'brillo': // campanitas
        [5, 6, 7].forEach((idx, k) =>
          tono(ac, { f0: PENTATONICA[idx], dur: 0.25, tipo: 'sine', vol: 0.08, retraso: k * 0.06 })
        );
        break;
      default:
        tono(ac, { f0: 659.25, f1: 922.95, dur: 0.15, tipo: 'triangle', vol: 0.18 });
    }
  } catch {
    /* noop */
  }
}
