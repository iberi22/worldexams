import { describe, it, expect, vi, beforeEach } from 'vitest';
import { neuroAudio } from './audio-synthesizer';

describe('neuroAudio (NeuroAudioSynthesizer)', () => {
  beforeEach(() => vi.useFakeTimers());

  it('playTone no throw sin AudioContext (jsdom)', () => {
    expect(() => neuroAudio.playTone(440, 0.1)).not.toThrow();
  });
  it('playSuccess no throw', () => {
    expect(() => neuroAudio.playSuccess()).not.toThrow();
    vi.runAllTimers();
  });
  it('playError no throw', () => {
    expect(() => neuroAudio.playError()).not.toThrow();
  });
  it('playNBackLetterTone cicla 0..7 + wrap', () => {
    for (let i = 0; i < 10; i++) expect(() => neuroAudio.playNBackLetterTone(i)).not.toThrow();
    expect(() => neuroAudio.playNBackLetterTone(-1)).not.toThrow();
  });
  it('playTone con tipos de oscilador', () => {
    expect(() => neuroAudio.playTone(523, 0.05, 'sine')).not.toThrow();
    expect(() => neuroAudio.playTone(523, 0.05, 'triangle')).not.toThrow();
    expect(() => neuroAudio.playTone(523, 0.05, 'sawtooth')).not.toThrow();
    expect(() => neuroAudio.playTone(523, 0.05, 'square')).not.toThrow();
  });
});
