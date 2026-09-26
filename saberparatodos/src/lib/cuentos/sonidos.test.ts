/* © 2026 SaberParaTodos / WorldExams. Todos los derechos reservados. */

import { describe, it, expect, vi, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('sonidos.ts (sintetizador WebAudio de cuentos)', () => {
  const src = fs.readFileSync(path.resolve(__dirname, 'sonidos.ts'), 'utf8');

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('100% osciladores: sin archivos de audio ni requests de red', () => {
    expect(src).toContain('createOscillator');
    expect(src).not.toMatch(/\.mp3|\.wav|\.ogg|\.aac|fetch\(|XMLHttpRequest|https?:\/\//i);
  });

  it('reutiliza UN solo AudioContext entre toques (los navegadores limitan contextos por página)', async () => {
    const ctor = vi.fn();
    class FakeCtx {
      state = 'running';
      currentTime = 0;
      destination = {};
      constructor() {
        ctor();
      }
      createOscillator() {
        return { type: '', frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, start() {}, stop() {} };
      }
      createGain() {
        return { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {} };
      }
      resume() {
        return Promise.resolve();
      }
    }
    vi.stubGlobal('window', { AudioContext: FakeCtx });
    const mod = await import('./sonidos');
    mod.blip();
    mod.sonido('tucan');
    mod.nota(3);
    mod.celebracion();
    expect(ctor).toHaveBeenCalledTimes(1);
  });

  it('no lanza sin WebAudio (SSR / navegadores restringidos)', async () => {
    vi.stubGlobal('window', {});
    const mod = await import('./sonidos');
    expect(() => {
      mod.blip();
      mod.sonido('mono');
      mod.nota(0);
      mod.celebracion();
    }).not.toThrow();
  });
});
