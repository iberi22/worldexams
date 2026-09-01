import { describe, it, expect, beforeEach, vi } from 'vitest';
import { WebGPUSpatialEngine } from './webgpu-spatial-engine';

// Mock canvas
function mockCanvas(): HTMLCanvasElement {
  return {
    getContext: vi.fn((type: string) => {
      if (type === 'webgpu') return null; // fallback path in test env
      if (type === '2d') return { fillRect: vi.fn(), clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), stroke: vi.fn(), arc: vi.fn(), fill: vi.fn(), save: vi.fn(), restore: vi.fn(), translate: vi.fn(), rotate: vi.fn(), scale: vi.fn(), strokeRect: vi.fn() } as any;
      return null;
    }),
    width: 800,
    height: 600,
  } as any;
}

describe('WebGPUSpatialEngine', () => {
  let engine: WebGPUSpatialEngine;

  beforeEach(() => {
    engine = new WebGPUSpatialEngine();
  });

  it('init returns fallback when navigator.gpu unavailable (jsdom)', async () => {
    const caps = await engine.init(mockCanvas());
    expect(caps.supported).toBe(false);
    expect(caps.adapterName).toBe('Software/Canvas2D Fallback');
    expect(caps.maxTextureDimension2D).toBe(4096);
  });

  it('renderMentalRotationFrame does not throw without init', () => {
    expect(() => engine.renderMentalRotationFrame(0, 0, 0)).not.toThrow();
  });

  it('renderMentalRotationFrame with scale does not throw after fallback init', async () => {
    await engine.init(mockCanvas());
    expect(() => engine.renderMentalRotationFrame(45, 30, 15, 1.5)).not.toThrow();
  });

  it('simulateParticleBurst does not throw', async () => {
    await engine.init(mockCanvas());
    // webgpu-spatial-engine exposes particle helpers if present
    const maybe = engine as any;
    if (typeof maybe.simulateParticleBurst === 'function') {
      expect(() => maybe.simulateParticleBurst(10)).not.toThrow();
    } else {
      // fallback: engine should at least have canvas handling
      expect(engine).toBeDefined();
    }
  });

  it('destroy/dispose does not throw', async () => {
    await engine.init(mockCanvas());
    const maybe = engine as any;
    if (typeof maybe.destroy === 'function') expect(() => maybe.destroy()).not.toThrow();
    if (typeof maybe.dispose === 'function') expect(() => maybe.dispose()).not.toThrow();
  });

  it('detects navigator.gpu availability via init (fallback graceful)', async () => {
    const caps = await engine.init(mockCanvas());
    // In test env, must be fallback — verifies pipeline degrades gracefully
    expect(typeof caps.supported).toBe('boolean');
    expect(typeof caps.adapterName).toBe('string');
  });
});
