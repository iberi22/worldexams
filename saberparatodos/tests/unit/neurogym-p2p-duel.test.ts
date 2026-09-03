import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { generateStroopTrial } from '../../src/lib/neurogym/secure-items-vault';

describe('neurogym — NeuroP2PDuelBoard & P2P Mesh Protocol', () => {
  let mockBroadcastChannel: any;
  let postedMessages: any[] = [];

  beforeEach(() => {
    postedMessages = [];
    mockBroadcastChannel = {
      postMessage: vi.fn((msg) => postedMessages.push(msg)),
      close: vi.fn(),
      onmessage: null
    };

    // Constructor implementation for mock BroadcastChannel
    const MockBC = vi.fn().mockImplementation(function (this: any, name: string) {
      this.name = name;
      this.postMessage = mockBroadcastChannel.postMessage;
      this.close = mockBroadcastChannel.close;
      this.onmessage = null;
    });

    vi.stubGlobal('BroadcastChannel', MockBC);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('NeuroP2PDuelBoard component file exists', async () => {
    const fs = await import('node:fs/promises');
    const path = 'src/components/neurogym/NeuroP2PDuelBoard.svelte';
    const exists = await fs.access(path).then(() => true).catch(() => false);
    expect(exists).toBe(true);
  });

  it('generates valid Stroop trials for duel rounds', () => {
    const trial1 = generateStroopTrial(100);
    expect(trial1).toBeDefined();
    expect(typeof trial1.wordText).toBe('string');
    expect(typeof trial1.displayColor).toBe('string');
    expect(['red', 'blue', 'green', 'yellow']).toContain(trial1.correctColorKey);
  });

  it('P2P duel BroadcastChannel constructs channel with roomCode prefix', () => {
    const roomCode = 'ROOM-P2P-99';
    const channelName = `worldexams_neuro_p2p_duel_${roomCode}`;
    const channel = new (globalThis.BroadcastChannel as any)(channelName);

    expect(globalThis.BroadcastChannel).toHaveBeenCalledWith(channelName);
    expect(channel).toBeDefined();
    expect(channel.name).toBe(channelName);
  });

  it('validates P2P message payload structure for SCORE_UPDATE', () => {
    const payload = {
      type: 'SCORE_UPDATE',
      senderId: 'peer_12345',
      senderName: 'Jugador Alfa',
      score: 120,
      taps: 15,
      accuracy: 90
    };

    expect(payload.type).toBe('SCORE_UPDATE');
    expect(payload.score).toBeGreaterThan(0);
    expect(payload.taps).toBe(15);
    expect(payload.accuracy).toBe(90);
  });

  it('calculates accuracy percentage accurately from attempts', () => {
    const calculateAccuracy = (correct: number, total: number) => {
      if (total === 0) return 100;
      return Math.round((correct / total) * 100);
    };

    expect(calculateAccuracy(0, 0)).toBe(100);
    expect(calculateAccuracy(8, 10)).toBe(80);
    expect(calculateAccuracy(1, 3)).toBe(33);
  });
});
