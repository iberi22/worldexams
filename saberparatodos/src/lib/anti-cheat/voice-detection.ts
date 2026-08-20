/**
 * Voice Detection Anti-Cheat Service
 * Uses Web Audio API to detect voice activity and multiple simultaneous voices during exams.
 *
 * Privacy Guarantees:
 * - Audio processing occurs strictly locally in browser memory.
 * - Raw audio streams are NEVER recorded, stored, or transmitted over the network.
 * - Only structured, lightweight event metrics are kept locally.
 * - Users can disable microphone monitoring at any time.
 */

export interface VoiceEvent {
  timestamp: number;
  type: 'voice_detected' | 'multiple_voices' | 'silence' | 'permission_denied' | 'error' | 'disabled';
  speechDetected: boolean;
  multipleVoicesDetected: boolean;
  audioLevel: number; // Normalized RMS audio level (0.0 - 1.0)
  peakCount: number; // Number of distinct prominent spectral peaks
  details?: string;
}

export interface VoiceAnalysisResult {
  timestamp: number;
  speechDetected: boolean;
  multipleVoicesDetected: boolean;
  audioLevel: number;
  peakCount: number;
}

export interface VoiceDetectorConfig {
  sessionId?: string;
  sampleIntervalMs?: number; // Interval between audio analysis runs (default: 2000ms = 2s)
  vadThreshold?: number; // RMS/Energy threshold for Voice Activity Detection (default: 0.04)
  multiVoicePeakThreshold?: number; // Prominent peak threshold for multiple voices (default: 3)
  enabled?: boolean; // User control setting (default: true)
  onEvent?: (event: VoiceEvent) => void;
  onVoiceDetected?: (event: VoiceEvent) => void;
  onMultipleVoicesDetected?: (event: VoiceEvent) => void;
}

export interface VoiceDetector {
  start: () => Promise<boolean>;
  stop: () => void;
  enable: () => void;
  disable: () => void;
  isEnabled: () => boolean;
  isMonitoring: () => boolean;
  getEvents: () => VoiceEvent[];
  getViolationCount: () => number;
  getLatestAnalysis: () => VoiceAnalysisResult | null;
  destroy: () => void;
}

const DEFAULT_SAMPLE_INTERVAL_MS = 2000;
const DEFAULT_VAD_THRESHOLD = 0.04;
const DEFAULT_MULTI_VOICE_PEAK_THRESHOLD = 3;
const FFT_SIZE = 1024;

/**
 * Creates a VoiceDetector instance for monitoring voice activity during exams.
 */
export function createVoiceDetector(config: VoiceDetectorConfig = {}): VoiceDetector {
  const sessionId = config.sessionId || 'default-session';
  const sampleIntervalMs = config.sampleIntervalMs ?? DEFAULT_SAMPLE_INTERVAL_MS;
  const vadThreshold = config.vadThreshold ?? DEFAULT_VAD_THRESHOLD;
  const multiVoicePeakThreshold = config.multiVoicePeakThreshold ?? DEFAULT_MULTI_VOICE_PEAK_THRESHOLD;

  let enabled = config.enabled ?? true;
  let isMonitoring = false;
  let analysisIntervalId: ReturnType<typeof setInterval> | null = null;

  let audioContext: AudioContext | null = null;
  let mediaStream: MediaStream | null = null;
  let analyserNode: AnalyserNode | null = null;
  let sourceNode: MediaStreamAudioSourceNode | null = null;

  const events: VoiceEvent[] = [];
  let latestAnalysis: VoiceAnalysisResult | null = null;

  const addEvent = (event: VoiceEvent) => {
    events.push(event);
    if (config.onEvent) {
      config.onEvent(event);
    }
    if (event.type === 'voice_detected' && config.onVoiceDetected) {
      config.onVoiceDetected(event);
    }
    if (event.type === 'multiple_voices' && config.onMultipleVoicesDetected) {
      config.onMultipleVoicesDetected(event);
    }
  };

  /**
   * Performs spectral and amplitude analysis on audio buffer.
   * Runs locally every `sampleIntervalMs` (2000ms by default) to keep CPU usage low (<5%).
   */
  const analyzeAudio = () => {
    if (!analyserNode || !isMonitoring || !enabled) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const frequencyData = new Uint8Array(bufferLength);
    const timeDomainData = new Uint8Array(analyserNode.fftSize);

    analyserNode.getByteFrequencyData(frequencyData);
    analyserNode.getByteTimeDomainData(timeDomainData);

    // 1. Calculate RMS audio level from time-domain signal
    let sumSquares = 0;
    for (let i = 0; i < timeDomainData.length; i++) {
      const normalizedSample = (timeDomainData[i] - 128) / 128;
      sumSquares += normalizedSample * normalizedSample;
    }
    const audioLevel = Math.sqrt(sumSquares / timeDomainData.length);

    // 2. Voice Activity Detection (VAD) in human voice frequency range (85 Hz - 3500 Hz)
    const sampleRate = audioContext?.sampleRate || 44100;
    const binHz = sampleRate / analyserNode.fftSize;
    const speechStartBin = Math.max(1, Math.floor(85 / binHz));
    const speechEndBin = Math.min(Math.ceil(3500 / binHz), bufferLength - 1);

    let speechEnergySum = 0;
    let speechBinCount = 0;
    for (let bin = speechStartBin; bin <= speechEndBin; bin++) {
      speechEnergySum += frequencyData[bin] / 255.0;
      speechBinCount++;
    }
    const speechEnergy = speechBinCount > 0 ? speechEnergySum / speechBinCount : 0;

    // Speech detected if RMS or speech band energy exceeds threshold
    const speechDetected = audioLevel >= vadThreshold || speechEnergy >= vadThreshold;

    // 3. Multiple voices detection via spectral peak counting in fundamental & formant region (85Hz - 2000Hz)
    let peakCount = 0;
    if (speechDetected) {
      const pitchEndBin = Math.min(Math.ceil(2000 / binHz), bufferLength - 1);
      const minPeakDelta = 12; // Minimum amplitude difference for a local peak (out of 255)
      const minBinDistance = Math.max(2, Math.floor(80 / binHz)); // Minimum separation between fundamental peaks (~80Hz)

      let lastPeakBin = -minBinDistance;
      for (let bin = speechStartBin + 1; bin < pitchEndBin - 1; bin++) {
        const currentVal = frequencyData[bin];
        const prevVal = frequencyData[bin - 1];
        const nextVal = frequencyData[bin + 1];

        // Check if bin is a prominent local maximum above background noise threshold
        if (
          currentVal > prevVal + minPeakDelta &&
          currentVal > nextVal + minPeakDelta &&
          currentVal / 255.0 > vadThreshold * 1.5 &&
          bin - lastPeakBin >= minBinDistance
        ) {
          peakCount++;
          lastPeakBin = bin;
        }
      }
    }

    const multipleVoicesDetected = speechDetected && peakCount >= multiVoicePeakThreshold;

    const timestamp = Date.now();
    latestAnalysis = {
      timestamp,
      speechDetected,
      multipleVoicesDetected,
      audioLevel,
      peakCount,
    };

    if (multipleVoicesDetected) {
      addEvent({
        timestamp,
        type: 'multiple_voices',
        speechDetected: true,
        multipleVoicesDetected: true,
        audioLevel,
        peakCount,
        details: `Multiple simultaneous voices detected (${peakCount} distinct spectral peaks)`,
      });
    } else if (speechDetected) {
      addEvent({
        timestamp,
        type: 'voice_detected',
        speechDetected: true,
        multipleVoicesDetected: false,
        audioLevel,
        peakCount,
        details: 'Voice activity detected during exam session',
      });
    } else {
      // Record silence periodically for telemetry/debug
      addEvent({
        timestamp,
        type: 'silence',
        speechDetected: false,
        multipleVoicesDetected: false,
        audioLevel,
        peakCount: 0,
      });
    }
  };

  /**
   * Teardown audio nodes and media stream tracks.
   */
  const cleanupAudioNodes = () => {
    if (analysisIntervalId) {
      clearInterval(analysisIntervalId);
      analysisIntervalId = null;
    }

    if (sourceNode) {
      try {
        sourceNode.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      sourceNode = null;
    }

    if (analyserNode) {
      try {
        analyserNode.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      analyserNode = null;
    }

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Ignore track stop errors
        }
      });
      mediaStream = null;
    }

    if (audioContext && audioContext.state !== 'closed') {
      try {
        audioContext.close();
      } catch {
        // Ignore close errors
      }
      audioContext = null;
    }

    isMonitoring = false;
  };

  return {
    start: async () => {
      if (isMonitoring) return true;
      if (!enabled) {
        addEvent({
          timestamp: Date.now(),
          type: 'disabled',
          speechDetected: false,
          multipleVoicesDetected: false,
          audioLevel: 0,
          peakCount: 0,
          details: 'Voice monitoring is disabled by user',
        });
        return false;
      }

      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        addEvent({
          timestamp: Date.now(),
          type: 'error',
          speechDetected: false,
          multipleVoicesDetected: false,
          audioLevel: 0,
          peakCount: 0,
          details: 'Web Audio API / getUserMedia not supported in environment',
        });
        return false;
      }

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          throw new Error('AudioContext not supported');
        }

        audioContext = new AudioContextClass();
        analyserNode = audioContext.createAnalyser();
        analyserNode.fftSize = FFT_SIZE;
        analyserNode.smoothingTimeConstant = 0.8;

        sourceNode = audioContext.createMediaStreamSource(mediaStream);
        sourceNode.connect(analyserNode);
        // Note: Do NOT connect analyserNode to audioContext.destination to prevent local feedback/playback

        isMonitoring = true;

        // Start periodic analysis (default every 2000ms)
        analysisIntervalId = setInterval(analyzeAudio, sampleIntervalMs);

        console.log(`[VoiceDetector:${sessionId}] Voice monitoring initialized`);
        return true;
      } catch (err: any) {
        cleanupAudioNodes();
        const isPermissionError = err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError';
        const eventType = isPermissionError ? 'permission_denied' : 'error';

        addEvent({
          timestamp: Date.now(),
          type: eventType,
          speechDetected: false,
          multipleVoicesDetected: false,
          audioLevel: 0,
          peakCount: 0,
          details: err?.message || 'Failed to acquire microphone access',
        });

        return false;
      }
    },

    stop: () => {
      cleanupAudioNodes();
      console.log(`[VoiceDetector:${sessionId}] Voice monitoring stopped`);
    },

    enable: () => {
      enabled = true;
    },

    disable: () => {
      enabled = false;
      cleanupAudioNodes();
      addEvent({
        timestamp: Date.now(),
        type: 'disabled',
        speechDetected: false,
        multipleVoicesDetected: false,
        audioLevel: 0,
        peakCount: 0,
        details: 'Microphone monitoring disabled by user',
      });
    },

    isEnabled: () => enabled,

    isMonitoring: () => isMonitoring,

    getEvents: () => [...events],

    getViolationCount: () => {
      return events.filter((e) => e.type === 'voice_detected' || e.type === 'multiple_voices').length;
    },

    getLatestAnalysis: () => (latestAnalysis ? { ...latestAnalysis } : null),

    destroy: () => {
      cleanupAudioNodes();
      events.length = 0;
      latestAnalysis = null;
      console.log(`[VoiceDetector:${sessionId}] Destroyed`);
    },
  };
}
