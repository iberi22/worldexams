import { describe, it, expect } from 'vitest';
import { BRAINWAVE_PRESETS, type BrainwaveTarget } from './psychoacoustic-engine';

describe('NeuroGym Psychoacoustic Engine & Brainwave Presets', () => {
  it('defines correct target frequencies for cognitive states', () => {
    expect(BRAINWAVE_PRESETS.alpha_focus.beatHz).toBe(10);
    expect(BRAINWAVE_PRESETS.beta_speed.beatHz).toBe(18);
    expect(BRAINWAVE_PRESETS.gamma_memory.beatHz).toBe(40);
    expect(BRAINWAVE_PRESETS.theta_creativity.beatHz).toBe(6);
  });

  it('keeps carrier frequencies in comfortable audible range (100-400Hz)', () => {
    const targets: BrainwaveTarget[] = ['alpha_focus', 'beta_speed', 'gamma_memory', 'theta_creativity'];
    for (const t of targets) {
      const cfg = BRAINWAVE_PRESETS[t];
      expect(cfg.carrierHz).toBeGreaterThanOrEqual(100);
      expect(cfg.carrierHz).toBeLessThanOrEqual(400);
    }
  });
});
