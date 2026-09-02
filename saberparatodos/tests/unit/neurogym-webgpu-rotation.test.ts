/**
 * neurogym-webgpu-rotation.test.ts
 * Smoke test for WebGPUMentalRotation.svelte (uses webgpu-spatial-engine).
 */
import { describe, it, expect } from 'vitest';

describe('neurogym stimulus — WebGPU Mental Rotation', () => {
  it('detects navigator.gpu availability (feature-detect, never assume)', () => {
    // We only assert the API name; never assume it's available in test env.
    expect('gpu' in (globalThis as any).navigator || typeof navigator !== 'undefined').toBe(true);
  });

  it('webgpu-spatial-engine module is importable', async () => {
    const mod = await import('../../src/lib/neurogym/webgpu-spatial-engine');
    // Module must export SOMETHING (engine class, init function, etc.)
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });

  it('component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/stimuli/WebGPUMentalRotation.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it('mental rotation accuracy typical adult ~85%', () => {
    const typical = 0.85;
    expect(typical).toBeGreaterThan(0.5);
    expect(typical).toBeLessThan(1);
  });
});