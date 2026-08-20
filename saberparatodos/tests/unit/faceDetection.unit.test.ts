import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createFaceDetector } from '../../src/lib/anti-cheat/face-detection';

const { MockFaceDetection, getMockOnResultsCallback, resetMockOnResultsCallback } = vi.hoisted(() => {
  let cb: ((results: any) => void) | null = null;
  class MockFaceDetection {
    initialize = vi.fn().mockResolvedValue(undefined);
    setOptions = vi.fn();
    onResults = vi.fn((listener: (results: any) => void) => {
      cb = listener;
    });
    send = vi.fn().mockImplementation(async () => {
      if (cb) {
        cb({ detections: [] });
      }
    });
    close = vi.fn().mockResolvedValue(undefined);
  }
  return {
    MockFaceDetection,
    getMockOnResultsCallback: () => cb,
    resetMockOnResultsCallback: () => {
      cb = null;
    },
  };
});

vi.mock('@mediapipe/face_detection', () => {
  return {
    FaceDetection: MockFaceDetection,
  };
});

describe('FaceDetector Anti-Cheat Service', () => {
  let mockTrack: { stop: ReturnType<typeof vi.fn> };
  let mockMediaStream: { getTracks: () => any[] };
  let mockVideoElement: any;

  beforeEach(() => {
    vi.useFakeTimers();
    resetMockOnResultsCallback();

    mockTrack = { stop: vi.fn() };
    mockMediaStream = { getTracks: () => [mockTrack] };

    mockVideoElement = {
      autoplay: false,
      muted: false,
      playsInline: false,
      style: {},
      srcObject: null,
      readyState: 4, // HAVE_ENOUGH_DATA
      play: vi.fn().mockResolvedValue(undefined),
      parentNode: {
        removeChild: vi.fn(),
      },
    };

    (globalThis as any).window = globalThis;

    Object.defineProperty(document, 'body', {
      writable: true,
      value: {
        appendChild: vi.fn(),
        removeChild: vi.fn(),
      },
    });

    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'video') {
        return mockVideoElement as any;
      }
      return origCreateElement(tagName);
    });

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
    const detector = createFaceDetector({ sessionId: 'test-init' });
    expect(detector.isEnabled()).toBe(true);
    expect(detector.isMonitoring()).toBe(false);
    expect(detector.getEvents()).toEqual([]);
    expect(detector.getViolationCount()).toBe(0);
    expect(detector.getLatestAnalysis()).toBeNull();
  });

  it('should request camera permissions and start monitoring', async () => {
    const detector = createFaceDetector({ sessionId: 'test-start', sampleIntervalMs: 5000 });
    const started = await detector.start();

    expect(started).toBe(true);
    expect(detector.isMonitoring()).toBe(true);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user',
      },
    });

    detector.stop();
    expect(detector.isMonitoring()).toBe(false);
    expect(mockTrack.stop).toHaveBeenCalled();
  });

  it('should handle camera permission denial gracefully', async () => {
    const permissionError = new Error('Camera access denied');
    permissionError.name = 'NotAllowedError';
    (navigator.mediaDevices.getUserMedia as any).mockRejectedValueOnce(permissionError);

    const detector = createFaceDetector({ sessionId: 'test-denied' });
    const started = await detector.start();

    expect(started).toBe(false);
    expect(detector.isMonitoring()).toBe(false);

    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('permission_denied');
    expect(events[0].faceCount).toBe(0);
  });

  it('should detect no_face when no human face is found in frame', async () => {
    const onNoFace = vi.fn();
    const detector = createFaceDetector({
      sessionId: 'test-no-face',
      sampleIntervalMs: 5000,
      onNoFace,
    });

    await detector.start();

    // Fast-forward 5s to trigger frame analysis
    vi.advanceTimersByTime(5000);

    expect(onNoFace).toHaveBeenCalled();
    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('no_face');
    expect(events[0].faceCount).toBe(0);
    expect(detector.getViolationCount()).toBe(1);

    detector.stop();
  });

  it('should detect multiple_faces when more than 1 face is present', async () => {
    const onMultipleFaces = vi.fn();
    const detector = createFaceDetector({
      sessionId: 'test-multi-faces',
      sampleIntervalMs: 5000,
      onMultipleFaces,
    });

    await detector.start();

    // Simulate multiple face detections callback from MediaPipe
    const callback = getMockOnResultsCallback();
    if (callback) {
      callback({
        detections: [
          { score: [0.95], landmarks: [{ x: 0.2, y: 0.3 }] },
          { score: [0.88], landmarks: [{ x: 0.7, y: 0.4 }] },
        ],
      });
    }

    expect(onMultipleFaces).toHaveBeenCalled();
    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('multiple_faces');
    expect(events[0].faceCount).toBe(2);
    expect(detector.getViolationCount()).toBe(1);

    detector.stop();
  });

  it('should detect face_mismatch when candidate landmarks differ from reference face', async () => {
    const onFaceMismatch = vi.fn();
    const referenceLandmarks = [
      { x: 0.1, y: 0.1 },
      { x: 0.2, y: 0.2 },
    ];

    const detector = createFaceDetector({
      sessionId: 'test-mismatch',
      sampleIntervalMs: 5000,
      referenceLandmarks,
      mismatchThreshold: 0.2,
      onFaceMismatch,
    });

    await detector.start();

    // Simulate candidate landmarks with large position variance relative to reference
    const callback = getMockOnResultsCallback();
    if (callback) {
      callback({
        detections: [
          {
            score: [0.92],
            landmarks: [
              { x: 0.8, y: 0.8 },
              { x: 0.9, y: 0.9 },
            ],
          },
        ],
      });
    }

    expect(onFaceMismatch).toHaveBeenCalled();
    const events = detector.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('face_mismatch');
    expect(events[0].faceCount).toBe(1);
    expect(detector.getViolationCount()).toBe(1);

    detector.stop();
  });

  it('should allow setting and getting reference face landmarks', () => {
    const detector = createFaceDetector({ sessionId: 'test-ref' });
    expect(detector.getReferenceFace()).toBeNull();

    const landmarks = [
      { x: 0.3, y: 0.4, z: 0.1 },
      { x: 0.5, y: 0.6, z: 0.2 },
    ];
    detector.setReferenceFace(landmarks);

    expect(detector.getReferenceFace()).toEqual(landmarks);
  });

  it('should allow user to disable and enable monitoring', async () => {
    const detector = createFaceDetector({ sessionId: 'test-toggle' });
    await detector.start();
    expect(detector.isMonitoring()).toBe(true);

    detector.disable();
    expect(detector.isEnabled()).toBe(false);
    expect(detector.isMonitoring()).toBe(false);

    const events = detector.getEvents();
    expect(events.some((e) => e.type === 'disabled')).toBe(true);

    const restarted = await detector.start();
    expect(restarted).toBe(false);

    detector.enable();
    expect(detector.isEnabled()).toBe(true);
  });

  it('should clean up completely on destroy', async () => {
    const detector = createFaceDetector({ sessionId: 'test-destroy' });
    await detector.start();

    detector.destroy();
    expect(detector.isMonitoring()).toBe(false);
    expect(detector.getEvents()).toEqual([]);
    expect(detector.getLatestAnalysis()).toBeNull();
  });
});
