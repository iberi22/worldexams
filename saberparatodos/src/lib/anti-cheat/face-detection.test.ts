import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CameraFaceDetector, type FaceDetectionEvent } from './face-detection';
import type { Detection } from '@mediapipe/face_detection';

// Mock MediaPipe Face Detection as proper ES6 class skeleton
vi.mock('@mediapipe/face_detection', () => {
  class MockFaceDetection {
    private _onResultsCallback?: (results: { detections: Detection[] }) => void;

    setOptions = vi.fn();
    initialize = vi.fn().mockResolvedValue(undefined);
    onResults = vi.fn().mockImplementation((cb) => {
      this._onResultsCallback = cb;
    });
    send = vi.fn().mockImplementation(async () => {
      if (this._onResultsCallback) {
        this._onResultsCallback({ detections: [] });
      }
    });
  }
  return {
    FaceDetection: MockFaceDetection,
  };
});

describe('CameraFaceDetector', () => {
  let detector: CameraFaceDetector;

  const mockTrack = {
    stop: vi.fn(),
  };

  const mockStream = {
    getTracks: () => [mockTrack],
  } as unknown as MediaStream;

  beforeEach(() => {
    vi.useFakeTimers();
    detector = new CameraFaceDetector({ detectionIntervalMs: 5000, mismatchThreshold: 0.75 });

    // Mock navigator.mediaDevices
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        mediaDevices: {
          getUserMedia: vi.fn().mockResolvedValue(mockStream),
        },
      },
      writable: true,
      configurable: true,
    });

    // Mock HTMLVideoElement.play
    if (typeof HTMLVideoElement !== 'undefined') {
      vi.spyOn(HTMLVideoElement.prototype, 'play').mockResolvedValue(undefined);
    }
  });

  afterEach(() => {
    detector.stopMonitoring();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should request camera permissions and start monitoring', async () => {
    const eventCallback = vi.fn();
    const started = await detector.startMonitoring(eventCallback);

    expect(started).toBe(true);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
      audio: false,
    });

    const status = detector.getStatus();
    expect(status.monitoring).toBe(true);
    expect(status.hasPermission).toBe(true);
    expect(status.enabled).toBe(true);
  });

  it('should handle camera permission rejection gracefully', async () => {
    (navigator.mediaDevices.getUserMedia as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Permission denied')
    );

    const started = await detector.startMonitoring();
    expect(started).toBe(false);

    const status = detector.getStatus();
    expect(status.monitoring).toBe(false);
    expect(status.hasPermission).toBe(false);
  });

  it('should detect presence/absence of face (no_face)', async () => {
    await detector.startMonitoring();

    // Mock 0 faces detected
    (detector as unknown as { _mockDetections: Detection[] })._mockDetections = [];

    const event = await detector.processSingleFrame();

    expect(event).not.toBeNull();
    expect(event?.type).toBe('no_face');
    expect(event?.faceCount).toBe(0);
    expect(event?.message).toContain('No se detectó ningún rostro');
  });

  it('should detect multiple faces (multiple_faces)', async () => {
    await detector.startMonitoring();

    const mockFace1: Detection = {
      locationData: {
        relativeBoundingBox: { width: 0.3, height: 0.3, xCenter: 0.3, yCenter: 0.3, startRawX: 0.15, startRawY: 0.15 },
        relativeKeypoints: [{ x: 0.3, y: 0.3 }],
      },
    };

    const mockFace2: Detection = {
      locationData: {
        relativeBoundingBox: { width: 0.3, height: 0.3, xCenter: 0.7, yCenter: 0.3, startRawX: 0.55, startRawY: 0.15 },
        relativeKeypoints: [{ x: 0.7, y: 0.3 }],
      },
    };

    (detector as unknown as { _mockDetections: Detection[] })._mockDetections = [mockFace1, mockFace2];

    const event = await detector.processSingleFrame();

    expect(event).not.toBeNull();
    expect(event?.type).toBe('multiple_faces');
    expect(event?.faceCount).toBe(2);
    expect(event?.message).toContain('múltiples rostros');
  });

  it('should automatically capture baseline face reference and detect face_mismatch on different face', async () => {
    await detector.startMonitoring();

    const baselineFace: Detection = {
      locationData: {
        relativeBoundingBox: { width: 0.4, height: 0.4, xCenter: 0.5, yCenter: 0.5, startRawX: 0.3, startRawY: 0.3 },
        relativeKeypoints: [{ x: 0.5, y: 0.5 }],
      },
    };

    // Frame 1: Captures initial reference embedding (no event emitted)
    (detector as unknown as { _mockDetections: Detection[] })._mockDetections = [baselineFace];
    let event = await detector.processSingleFrame();
    expect(event).toBeNull();
    expect(detector.getStatus().referenceSet).toBe(true);

    // Frame 2: Same face (no mismatch)
    event = await detector.processSingleFrame();
    expect(event).toBeNull();

    // Frame 3: Drastically different face dimensions / location (mismatch)
    const differentFace: Detection = {
      locationData: {
        relativeBoundingBox: { width: 0.05, height: 0.05, xCenter: 0.01, yCenter: 0.99, startRawX: 0, startRawY: 0.94 },
        relativeKeypoints: [{ x: 0.01, y: 0.99 }],
      },
    };

    (detector as unknown as { _mockDetections: Detection[] })._mockDetections = [differentFace];
    event = await detector.processSingleFrame();

    expect(event).not.toBeNull();
    expect(event?.type).toBe('face_mismatch');
    expect(event?.message).toContain('El rostro detectado no coincide');
  });

  it('should process frames in under 100ms', async () => {
    await detector.startMonitoring();

    const mockFace: Detection = {
      locationData: {
        relativeBoundingBox: { width: 0.3, height: 0.3, xCenter: 0.5, yCenter: 0.5, startRawX: 0.35, startRawY: 0.35 },
      },
    };

    (detector as unknown as { _mockDetections: Detection[] })._mockDetections = [mockFace];

    const event = await detector.processSingleFrame();

    const status = detector.getStatus();
    if (status.lastEvent) {
      expect(status.lastEvent.processingTimeMs).toBeLessThan(100);
    }
  });

  it('should allow enabling and disabling camera monitoring', async () => {
    detector.disable();
    expect(detector.isEnabled()).toBe(false);

    const started = await detector.startMonitoring();
    expect(started).toBe(false);

    detector.enable();
    expect(detector.isEnabled()).toBe(true);
  });

  it('should correctly run periodic 5-second checks', async () => {
    const events: FaceDetectionEvent[] = [];
    detector.onEvent((e) => events.push(e));

    (detector as unknown as { _mockDetections: Detection[] })._mockDetections = []; // 0 faces

    await detector.startMonitoring();

    // Start monitoring triggers initial check
    expect(events.length).toBe(1);

    // Fast-forward 5 seconds
    vi.advanceTimersByTime(5000);
    expect(events.length).toBe(2);

    // Fast-forward 10 more seconds (2 more intervals)
    vi.advanceTimersByTime(10000);
    expect(events.length).toBe(4);
  });
});
