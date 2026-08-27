/**
 * Camera Face Detection Anti-Cheat Service
 * Uses MediaPipe WASM Face Detection (@mediapipe/face_detection) to analyze camera frames locally.
 *
 * Privacy & Resource Guarantees:
 * - Video processing occurs strictly locally in browser memory using MediaPipe WebAssembly.
 * - Raw video streams and canvas frame data are NEVER recorded, saved, or transmitted outside the device.
 * - Face detection runs periodically (default every 5000ms = 5s) instead of continuously to save battery and CPU.
 * - Reference face landmarks are stored locally in IndexedDB / local memory for matching during exam sessions.
 * - Users can disable camera monitoring at any time.
 */

import { FaceDetection, type Detection, type Results } from '@mediapipe/face_detection';

export interface FaceLandmark {
  x: number;
  y: number;
  z?: number;
}

export interface FaceEvent {
  timestamp: number;
  type:
    | 'face_detected'
    | 'no_face'
    | 'multiple_faces'
    | 'face_mismatch'
    | 'permission_denied'
    | 'error'
    | 'disabled';
  faceCount: number;
  confidence: number;
  details?: string;
}

export interface FaceAnalysisResult {
  timestamp: number;
  faceCount: number;
  confidence: number;
  landmarksCount?: number;
  isMatch?: boolean;
}

export interface FaceDetectorConfig {
  sessionId?: string;
  sampleIntervalMs?: number; // Interval between video frame analyses (default: 5000ms = 5s)
  minConfidence?: number; // Minimum confidence threshold for face detection (default: 0.5)
  mismatchThreshold?: number; // Maximum feature distance variance before flagging mismatch (default: 0.25)
  enabled?: boolean; // User control setting (default: true)
  referenceLandmarks?: FaceLandmark[]; // Baseline face landmarks for matching
  onEvent?: (event: FaceEvent) => void;
  onFaceDetected?: (event: FaceEvent) => void;
  onNoFace?: (event: FaceEvent) => void;
  onMultipleFaces?: (event: FaceEvent) => void;
  onFaceMismatch?: (event: FaceEvent) => void;
}

export interface FaceDetector {
  start: () => Promise<boolean>;
  stop: () => void;
  enable: () => void;
  disable: () => void;
  isEnabled: () => boolean;
  isMonitoring: () => boolean;
  getEvents: () => FaceEvent[];
  getViolationCount: () => number;
  getLatestAnalysis: () => FaceAnalysisResult | null;
  setReferenceFace: (landmarks: FaceLandmark[]) => void;
  getReferenceFace: () => FaceLandmark[] | null;
  destroy: () => void;
}

const DEFAULT_SAMPLE_INTERVAL_MS = 5000;
const DEFAULT_MIN_CONFIDENCE = 0.5;
const DEFAULT_MISMATCH_THRESHOLD = 0.25;
const IDB_STORE_KEY = 'worldexams_face_reference';

/**
 * Saves reference face landmarks to local IndexedDB/localStorage for offline matching.
 */
function saveReferenceToLocal(sessionId: string, landmarks: FaceLandmark[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${IDB_STORE_KEY}_${sessionId}`, JSON.stringify(landmarks));
  } catch {
    // Ignore storage write errors
  }
}

/**
 * Retrieves reference face landmarks from local IndexedDB/localStorage.
 */
function getReferenceFromLocal(sessionId: string): FaceLandmark[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${IDB_STORE_KEY}_${sessionId}`);
    return raw ? (JSON.parse(raw) as FaceLandmark[]) : null;
  } catch {
    return null;
  }
}

/**
 * Calculates normalized distance vector variance between candidate face landmarks and reference baseline.
 */
function compareFaceLandmarks(
  candidate: FaceLandmark[],
  reference: FaceLandmark[],
  mismatchThreshold: number
): { isMatch: boolean; distanceVariance: number } {
  if (!candidate || !reference || candidate.length === 0 || reference.length === 0) {
    return { isMatch: true, distanceVariance: 0 };
  }

  const count = Math.min(candidate.length, reference.length);
  let totalDelta = 0;

  for (let i = 0; i < count; i++) {
    const dx = candidate[i].x - reference[i].x;
    const dy = candidate[i].y - reference[i].y;
    totalDelta += Math.sqrt(dx * dx + dy * dy);
  }

  const avgDelta = totalDelta / count;
  const isMatch = avgDelta <= mismatchThreshold;
  return { isMatch, distanceVariance: avgDelta };
}

/**
 * Creates a FaceDetector instance for camera face detection anti-cheat.
 */
export function createFaceDetector(config: FaceDetectorConfig = {}): FaceDetector {
  const sessionId = config.sessionId || 'default-session';
  const sampleIntervalMs = config.sampleIntervalMs ?? DEFAULT_SAMPLE_INTERVAL_MS;
  const minConfidence = config.minConfidence ?? DEFAULT_MIN_CONFIDENCE;
  const mismatchThreshold = config.mismatchThreshold ?? DEFAULT_MISMATCH_THRESHOLD;

  let enabled = config.enabled ?? true;
  let isMonitoring = false;
  let analysisIntervalId: ReturnType<typeof setInterval> | null = null;

  let mediaStream: MediaStream | null = null;
  let videoElement: HTMLVideoElement | null = null;
  let faceDetectionInstance: FaceDetection | null = null;

  let referenceLandmarks: FaceLandmark[] | null =
    config.referenceLandmarks || getReferenceFromLocal(sessionId);

  const events: FaceEvent[] = [];
  let latestAnalysis: FaceAnalysisResult | null = null;

  const addEvent = (event: FaceEvent) => {
    events.push(event);
    if (config.onEvent) {
      config.onEvent(event);
    }
    if (event.type === 'face_detected' && config.onFaceDetected) {
      config.onFaceDetected(event);
    }
    if (event.type === 'no_face' && config.onNoFace) {
      config.onNoFace(event);
    }
    if (event.type === 'multiple_faces' && config.onMultipleFaces) {
      config.onMultipleFaces(event);
    }
    if (event.type === 'face_mismatch' && config.onFaceMismatch) {
      config.onFaceMismatch(event);
    }
  };

  /**
   * Processes MediaPipe face detection results.
   */
  const handleResults = (results: Results) => {
    if (!isMonitoring || !enabled) return;

    const timestamp = Date.now();
    const detections: Detection[] = results.detections || [];
    const faceCount = detections.length;

    let maxConfidence = 0;
    for (const d of detections) {
      const score = Array.isArray((d as any).score) ? (d as any).score[0] : (d as any).score || 0;
      if (score > maxConfidence) {
        maxConfidence = score;
      }
    }

    if (faceCount === 0) {
      latestAnalysis = {
        timestamp,
        faceCount: 0,
        confidence: 0,
        landmarksCount: 0,
        isMatch: false,
      };
      addEvent({
        timestamp,
        type: 'no_face',
        faceCount: 0,
        confidence: 0,
        details: 'No human face detected in camera frame',
      });
      return;
    }

    if (faceCount > 1) {
      latestAnalysis = {
        timestamp,
        faceCount,
        confidence: maxConfidence,
        landmarksCount: 0,
        isMatch: false,
      };
      addEvent({
        timestamp,
        type: 'multiple_faces',
        faceCount,
        confidence: maxConfidence,
        details: `Multiple faces detected in frame (${faceCount} faces)`,
      });
      return;
    }

    // Exactly 1 face detected
    const primaryDetection = detections[0];
    const candidateLandmarks: FaceLandmark[] = (primaryDetection.landmarks || []).map((lm: any) => ({
      x: lm.x,
      y: lm.y,
      z: lm.z,
    }));

    // Check face mismatch against baseline reference if established
    if (referenceLandmarks && referenceLandmarks.length > 0) {
      const matchResult = compareFaceLandmarks(
        candidateLandmarks,
        referenceLandmarks,
        mismatchThreshold
      );

      latestAnalysis = {
        timestamp,
        faceCount: 1,
        confidence: maxConfidence,
        landmarksCount: candidateLandmarks.length,
        isMatch: matchResult.isMatch,
      };

      if (!matchResult.isMatch) {
        addEvent({
          timestamp,
          type: 'face_mismatch',
          faceCount: 1,
          confidence: maxConfidence,
          details: `Face landmark mismatch detected (variance: ${matchResult.distanceVariance.toFixed(3)})`,
        });
        return;
      }
    } else {
      // Set first detected face as baseline reference if none existed
      referenceLandmarks = candidateLandmarks;
      saveReferenceToLocal(sessionId, candidateLandmarks);
      latestAnalysis = {
        timestamp,
        faceCount: 1,
        confidence: maxConfidence,
        landmarksCount: candidateLandmarks.length,
        isMatch: true,
      };
    }

    addEvent({
      timestamp,
      type: 'face_detected',
      faceCount: 1,
      confidence: maxConfidence,
      details: 'Primary user face verified',
    });
  };

  /**
   * Captures current frame from video element and passes it to MediaPipe WASM face detection.
   * Runs every `sampleIntervalMs` (default 5000ms = 5s) to preserve battery & CPU.
   */
  const analyzeFrame = async () => {
    if (!faceDetectionInstance || !videoElement || !isMonitoring || !enabled) return;
    if (videoElement.readyState < 2) return; // HAVE_CURRENT_DATA or higher

    try {
      await faceDetectionInstance.send({ image: videoElement });
    } catch (err: any) {
      console.warn(`[FaceDetector:${sessionId}] Frame analysis error:`, err?.message);
    }
  };

  /**
   * Cleanup camera stream and DOM elements.
   */
  const cleanupResources = () => {
    if (analysisIntervalId) {
      clearInterval(analysisIntervalId);
      analysisIntervalId = null;
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

    if (videoElement) {
      try {
        videoElement.srcObject = null;
        if (videoElement.parentNode) {
          videoElement.parentNode.removeChild(videoElement);
        }
      } catch {
        // Ignore video remove errors
      }
      videoElement = null;
    }

    if (faceDetectionInstance) {
      try {
        faceDetectionInstance.close();
      } catch {
        // Ignore close errors
      }
      faceDetectionInstance = null;
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
          faceCount: 0,
          confidence: 0,
          details: 'Camera monitoring is disabled by user',
        });
        return false;
      }

      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        addEvent({
          timestamp: Date.now(),
          type: 'error',
          faceCount: 0,
          confidence: 0,
          details: 'MediaDevices / getUserMedia not supported in environment',
        });
        return false;
      }

      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
        });

        // Create off-screen video element for MediaPipe frame capturing
        videoElement = document.createElement('video');
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.style.display = 'none';
        videoElement.srcObject = mediaStream;
        document.body.appendChild(videoElement);

        await videoElement.play().catch(() => {});

        // Initialize MediaPipe Face Detection
        faceDetectionInstance = new FaceDetection({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        faceDetectionInstance.setOptions({
          model: 'short',
          minDetectionConfidence: minConfidence,
        });

        faceDetectionInstance.onResults(handleResults);
        await faceDetectionInstance.initialize();

        isMonitoring = true;

        // Periodic frame analysis every 5 seconds (5000ms)
        analysisIntervalId = setInterval(analyzeFrame, sampleIntervalMs);

        console.log(`[FaceDetector:${sessionId}] Camera face detection initialized`);
        return true;
      } catch (err: any) {
        cleanupResources();
        const isPermissionError =
          err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError';
        const eventType = isPermissionError ? 'permission_denied' : 'error';

        addEvent({
          timestamp: Date.now(),
          type: eventType,
          faceCount: 0,
          confidence: 0,
          details: err?.message || 'Failed to acquire camera access',
        });

        return false;
      }
    },

    stop: () => {
      cleanupResources();
      console.log(`[FaceDetector:${sessionId}] Face monitoring stopped`);
    },

    enable: () => {
      enabled = true;
    },

    disable: () => {
      enabled = false;
      cleanupResources();
      addEvent({
        timestamp: Date.now(),
        type: 'disabled',
        faceCount: 0,
        confidence: 0,
        details: 'Camera monitoring disabled by user',
      });
    },

    isEnabled: () => enabled,

    isMonitoring: () => isMonitoring,

    getEvents: () => [...events],

    getViolationCount: () => {
      return events.filter(
        (e) => e.type === 'no_face' || e.type === 'multiple_faces' || e.type === 'face_mismatch'
      ).length;
    },

    getLatestAnalysis: () => (latestAnalysis ? { ...latestAnalysis } : null),

    setReferenceFace: (landmarks: FaceLandmark[]) => {
      referenceLandmarks = landmarks;
      saveReferenceToLocal(sessionId, landmarks);
    },

    getReferenceFace: () => (referenceLandmarks ? [...referenceLandmarks] : null),

    destroy: () => {
      cleanupResources();
      events.length = 0;
      latestAnalysis = null;
      console.log(`[FaceDetector:${sessionId}] Destroyed`);
    },
  };
}
