import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createVoiceDetector, type VoiceDetector } from './voice-detection';

describe('VoiceDetector Anti-Cheat Service', () => {
  let mockTrack: { stop: ReturnType<typeof vi.fn> };
  let mockMediaStream: { getTracks: () => any[] };
  let mockAnalyser: any;
  let mockSource: any;
  let mockAudioContextInstance: any;

  beforeEach(() => {
    vi.useFakeTimers();

    mockTrack = { stop: vi.fn() };
    mockMediaStream = { getTracks: () => [mockTrack] };

    mockAnalyser = {
      fftSize: 1024,
      frequencyBinCount: 512,
      smoothingTimeConstant: 0.8,
      getByteFrequencyData: vi.fn((array: Uint8Array) => array.fill(0)),
      getByteTimeDomainData: vi.fn((array: Uint8Array) => array.fill(128)),
      disconnect: vi.fn(),
    };

    mockSource = {
      connect: vi.fn(),
      disconnect: vi.fn(),
    };

    mockAudioContextInstance = {
      sampleRate: 44100,
      state: 'running',
      createAnalyser: vi.fn(() => mockAnalyser),
      createMediaStreamSource: vi.fn(() => mockSource),
      close: vi.fn().mockResolvedValue(undefined),
    };

    // Use a real class constructor for AudioContext to satisfy Vitest/JS runtime constructor checks
    class MockAudioContext {
      sampleRate = mockAudioContextInstance.sampleRate;
      state = mockAudioContextInstance.state;
      createAnalyser = mockAudioContextInstance.createAnalyser;
      createMediaStreamSource = mockAudioContextInstance.createMediaStreamSource;
      close = mockAudioContextInstance.close;
    }

    (globalThis as any).window = globalThis;
    (globalThis as any).AudioContext = MockAudioContext;
    (globalThis as any).webkitAudioContext = MockAudioContext;

    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(mockMediaStream),
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should initialize with default options', () => {
    const detector = createVoiceDetector();
    expect(detector.isEnabled()).toBe(true);
    expect(detector.isMonitoring()).toBe(false);
    expect(detector.getEvents()).toEqual([]);
    expect(detector.getViolationCount()).toBe(0);
    expect(detector.getLatestAnalysis()).toBeNull();
  });

  it('should request microphone permissions and start monitoring', async () => {
    const detector = createVoiceDetector({ sampleIntervalMs: 2000 });
    const started = await detector.start();

    expect(started).toBe(true);
    expect(detector.isMonitoring()).toBe(true);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
    expect(mockAudioContextInstance.createMediaStreamSource).toHaveBeenCalledWith(mockMediaStream);
    expect(mockSource.connect).toHaveBeenCalledWith(mockAnalyser);

    detector.stop();
    expect(detector.isMonitoring()).toBe(false);
    expect(mockTrack.stop).toHaveBeenCalled();
    expect(mockAudioContextInstance.close).toHaveBeenCalled();
  });

  it('should handle microphone permission denial gracefully', async () => {
    const permissionError = new Error('Permission denied');
    permissionError.name = 'NotAllowedError';
    (navigator.mediaDevices.getUserMedia as any).mockRejectedValueOnce(permissionError);

    const detector = createVoiceDetector();
    const started = await detector.start();

    expect(started).toBe(false);
    expect(detector.isMonitoring()).toBe(false);

    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('permission_denied');
    expect(events[0].speechDetected).toBe(false);
  });

  it('should analyze audio periodically and detect silence', async () => {
    const detector = createVoiceDetector({ sampleIntervalMs: 2000 });
    await detector.start();

    // Fast-forward interval
    vi.advanceTimersByTime(2000);

    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('silence');
    expect(events[0].speechDetected).toBe(false);
    expect(events[0].multipleVoicesDetected).toBe(false);

    detector.stop();
  });

  it('should detect voice activity (VAD) when audio level/energy exceeds threshold', async () => {
    const onVoiceDetected = vi.fn();
    const detector = createVoiceDetector({
      sampleIntervalMs: 2000,
      vadThreshold: 0.04,
      onVoiceDetected,
    });

    await detector.start();

    // Mock high RMS in time-domain data (speech waveform)
    mockAnalyser.getByteTimeDomainData.mockImplementation((array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = i % 2 === 0 ? 180 : 76; // High amplitude variance around 128
      }
    });

    vi.advanceTimersByTime(2000);

    expect(onVoiceDetected).toHaveBeenCalled();
    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('voice_detected');
    expect(events[0].speechDetected).toBe(true);
    expect(events[0].multipleVoicesDetected).toBe(false);
    expect(detector.getViolationCount()).toBe(1);

    detector.stop();
  });

  it('should detect multiple simultaneous voices when multiple distinct spectral peaks exist', async () => {
    const onMultipleVoicesDetected = vi.fn();
    const detector = createVoiceDetector({
      sampleIntervalMs: 2000,
      vadThreshold: 0.04,
      multiVoicePeakThreshold: 3,
      onMultipleVoicesDetected,
    });

    await detector.start();

    // Mock speech frequency data with multiple distinct peaks in 85Hz - 2000Hz range
    mockAnalyser.getByteFrequencyData.mockImplementation((array: Uint8Array) => {
      array.fill(10);
      // Peak 1 around bin 5 (~215Hz)
      array[4] = 20; array[5] = 120; array[6] = 20;
      // Peak 2 around bin 12 (~516Hz)
      array[11] = 20; array[12] = 130; array[13] = 20;
      // Peak 3 around bin 20 (~860Hz)
      array[19] = 20; array[20] = 125; array[21] = 20;
      // Peak 4 around bin 28 (~1200Hz)
      array[27] = 20; array[28] = 110; array[29] = 20;
    });

    // Mock time domain speech level
    mockAnalyser.getByteTimeDomainData.mockImplementation((array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = i % 2 === 0 ? 170 : 86;
      }
    });

    vi.advanceTimersByTime(2000);

    expect(onMultipleVoicesDetected).toHaveBeenCalled();
    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('multiple_voices');
    expect(events[0].speechDetected).toBe(true);
    expect(events[0].multipleVoicesDetected).toBe(true);
    expect(events[0].peakCount).toBeGreaterThanOrEqual(3);
    expect(detector.getViolationCount()).toBe(1);

    detector.stop();
  });

  it('should allow user to disable and enable monitoring', async () => {
    const detector = createVoiceDetector();
    await detector.start();
    expect(detector.isMonitoring()).toBe(true);

    detector.disable();
    expect(detector.isEnabled()).toBe(false);
    expect(detector.isMonitoring()).toBe(false);

    const events = detector.getEvents();
    expect(events.some((e) => e.type === 'disabled')).toBe(true);

    // Attempting to start while disabled should fail
    const restarted = await detector.start();
    expect(restarted).toBe(false);

    detector.enable();
    expect(detector.isEnabled()).toBe(true);
  });

  it('should clean up completely on destroy', async () => {
    const detector = createVoiceDetector();
    await detector.start();

    detector.destroy();
    expect(detector.isMonitoring()).toBe(false);
    expect(detector.getEvents()).toEqual([]);
    expect(detector.getLatestAnalysis()).toBeNull();
  });
});
