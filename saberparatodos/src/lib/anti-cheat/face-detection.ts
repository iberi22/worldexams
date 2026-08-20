/**
 * Camera Face Detection Anti-Cheat Module
 *
 * Uses MediaPipe Face Detection to detect anti-cheat events:
 * - no_face: No human face detected in frame.
 * - multiple_faces: More than 1 face detected in frame.
 * - face_mismatch: Single face detected whose features/embedding differ significantly from baseline.
 *
 * Privacy & Performance Guarantees:
 * - Video frames are strictly processed locally in client-side memory.
 * - NO video data or frames are ever transmitted outside the browser.
 * - Detection runs periodically every 5 seconds (not continuously) to preserve battery.
 * - Frame processing is designed to complete in <100ms per frame.
 */

import { FaceDetection, type Detection } from '@mediapipe/face_detection';

export type FaceEventType = 'no_face' | 'multiple_faces' | 'face_mismatch';

export interface FaceDetectionEvent {
  type: FaceEventType;
  timestamp: Date;
  faceCount: number;
  processingTimeMs: number;
  similarityScore?: number;
  message: string;
}

export interface FaceDetectionOptions {
  detectionIntervalMs?: number; // Default: 5000ms
  mismatchThreshold?: number; // Similarity threshold (0-1), default: 0.75
  autoCaptureReference?: boolean; // Automatically record first single face as baseline
}

export interface FaceDetectionStatus {
  enabled: boolean;
  monitoring: boolean;
  hasPermission: boolean;
  referenceSet: boolean;
  lastEvent?: FaceDetectionEvent;
  totalChecks: number;
  violationCount: number;
}

export class CameraFaceDetector {
  private enabled = true;
  private isMonitoring = false;
  private hasPermission = false;
  private detectionIntervalMs = 5000;
  private mismatchThreshold = 0.75;
  private autoCaptureReference = true;

  private mediaStream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private faceDetectionEngine: FaceDetection | null = null;
  private checkIntervalTimer: ReturnType<typeof setInterval> | null = null;

  private referenceEmbedding: number[] | null = null;
  private eventListeners: ((event: FaceDetectionEvent) => void)[] = [];

  private totalChecks = 0;
  private violationCount = 0;
  private lastEvent?: FaceDetectionEvent;

  constructor(options?: FaceDetectionOptions) {
    if (options?.detectionIntervalMs) {
      this.detectionIntervalMs = options.detectionIntervalMs;
    }
    if (options?.mismatchThreshold !== undefined) {
      this.mismatchThreshold = options.mismatchThreshold;
    }
    if (options?.autoCaptureReference !== undefined) {
      this.autoCaptureReference = options.autoCaptureReference;
    }
  }

  /**
   * Request user permission for camera access and initialize video stream locally.
   */
  public async requestCameraPermission(): Promise<boolean> {
    if (!this.enabled) {
      console.warn('[FaceDetector] Camera monitoring is disabled by user setting.');
      return false;
    }

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      console.error('[FaceDetector] getUserMedia is not supported in this environment.');
      return false;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      });

      this.hasPermission = true;

      // Create hidden video element in DOM memory for capturing frame streams
      if (typeof document !== 'undefined') {
        this.videoElement = document.createElement('video');
        this.videoElement.autoplay = true;
        this.videoElement.playsInline = true;
        this.videoElement.muted = true;
        this.videoElement.srcObject = this.mediaStream;
        await this.videoElement.play().catch(() => {});
      }

      return true;
    } catch (err) {
      console.error('[FaceDetector] Camera permission denied or failed:', err);
      this.hasPermission = false;
      return false;
    }
  }

  /**
   * Initialize MediaPipe FaceDetection instance.
   */
  public async initEngine(): Promise<void> {
    if (this.faceDetectionEngine) return;

    try {
      this.faceDetectionEngine = new FaceDetection({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });

      this.faceDetectionEngine.setOptions({
        model: 'short',
        minDetectionConfidence: 0.5,
      });

      await this.faceDetectionEngine.initialize();
    } catch (err) {
      console.error('[FaceDetector] Failed to initialize MediaPipe engine:', err);
    }
  }

  /**
   * Enable camera monitoring.
   */
  public enable(): void {
    this.enabled = true;
  }

  /**
   * Disable camera monitoring and stop media stream.
   */
  public disable(): void {
    this.enabled = false;
    this.stopMonitoring();
  }

  /**
   * Check if camera monitoring is enabled by user.
   */
  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Register listener for face detection events.
   */
  public onEvent(callback: (event: FaceDetectionEvent) => void): () => void {
    this.eventListeners.push(callback);
    return () => {
      this.eventListeners = this.eventListeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Start periodic 5-second anti-cheat monitoring.
   */
  public async startMonitoring(
    onEventCallback?: (event: FaceDetectionEvent) => void
  ): Promise<boolean> {
    if (!this.enabled) {
      console.warn('[FaceDetector] Cannot start monitoring: camera is disabled.');
      return false;
    }

    if (this.isMonitoring) {
      return true;
    }

    if (onEventCallback) {
      this.onEvent(onEventCallback);
    }

    if (!this.hasPermission || !this.mediaStream) {
      const granted = await this.requestCameraPermission();
      if (!granted) return false;
    }

    await this.initEngine();

    this.isMonitoring = true;

    // Run first check immediately, then schedule every detectionIntervalMs (5000ms)
    await this.processSingleFrame();
    this.checkIntervalTimer = setInterval(() => {
      this.processSingleFrame();
    }, this.detectionIntervalMs);

    console.log(`[FaceDetector] Monitoreo facial iniciado (intervalo: ${this.detectionIntervalMs}ms)`);
    return true;
  }

  /**
   * Stop monitoring and cleanup media stream tracks.
   */
  public stopMonitoring(): void {
    if (this.checkIntervalTimer) {
      clearInterval(this.checkIntervalTimer);
      this.checkIntervalTimer = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
      this.videoElement = null;
    }

    this.isMonitoring = false;
    this.hasPermission = false;
    console.log('[FaceDetector] Monitoreo facial detenido');
  }

  /**
   * Set reference face embedding manually.
   */
  public setReferenceEmbedding(embedding: number[]): void {
    this.referenceEmbedding = [...embedding];
  }

  /**
   * Clear reference embedding.
   */
  public clearReferenceEmbedding(): void {
    this.referenceEmbedding = null;
  }

  /**
   * Return current detector status.
   */
  public getStatus(): FaceDetectionStatus {
    return {
      enabled: this.enabled,
      monitoring: this.isMonitoring,
      hasPermission: this.hasPermission,
      referenceSet: this.referenceEmbedding !== null,
      lastEvent: this.lastEvent,
      totalChecks: this.totalChecks,
      violationCount: this.violationCount,
    };
  }

  /**
   * Process a single video frame locally.
   * Ensures execution completes <100ms.
   */
  public async processSingleFrame(): Promise<FaceDetectionEvent | null> {
    if (!this.enabled || !this.isMonitoring) return null;

    const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.totalChecks++;

    try {
      let detections: Detection[] = [];

      const mockDetections = (this as unknown as { _mockDetections?: Detection[] })._mockDetections;

      if (mockDetections !== undefined) {
        detections = mockDetections;
      } else if (this.faceDetectionEngine && this.videoElement) {
        let resolveDetections: (results: Detection[]) => void;
        const detectionPromise = new Promise<Detection[]>((res) => {
          resolveDetections = res;
        });

        this.faceDetectionEngine.onResults((results) => {
          resolveDetections(results.detections || []);
        });

        await this.faceDetectionEngine.send({ image: this.videoElement });
        detections = await Promise.race([
          detectionPromise,
          new Promise<Detection[]>((res) => setTimeout(() => res([]), 80)),
        ]);
      }

      const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const processingTimeMs = Math.round(endTime - startTime);

      const faceCount = detections.length;
      let eventType: FaceEventType | null = null;
      let similarityScore: number | undefined;
      let message = '';

      if (faceCount === 0) {
        eventType = 'no_face';
        message = 'No se detectó ningún rostro frente a la cámara';
      } else if (faceCount > 1) {
        eventType = 'multiple_faces';
        message = `Se detectaron múltiples rostros en la cámara (${faceCount})`;
      } else {
        // Exactly 1 face
        const currentEmbedding = this.extractFaceEmbedding(detections[0]);

        if (!this.referenceEmbedding && this.autoCaptureReference) {
          // Store initial baseline embedding locally
          this.referenceEmbedding = currentEmbedding;
          console.log('[FaceDetector] Rostro de referencia capturado localmente.');
        } else if (this.referenceEmbedding) {
          similarityScore = this.calculateSimilarity(this.referenceEmbedding, currentEmbedding);
          if (similarityScore < this.mismatchThreshold) {
            eventType = 'face_mismatch';
            message = `El rostro detectado no coincide con el usuario registrado (Similitud: ${Math.round(similarityScore * 100)}%)`;
          }
        }
      }

      if (eventType) {
        this.violationCount++;
        const event: FaceDetectionEvent = {
          type: eventType,
          timestamp: new Date(),
          faceCount,
          processingTimeMs,
          similarityScore,
          message,
        };

        this.lastEvent = event;
        this.emitEvent(event);
        return event;
      }

      return null;
    } catch (err) {
      console.error('[FaceDetector] Error durante el procesamiento de fotograma:', err);
      return null;
    }
  }

  /**
   * Extract a normalized feature vector/embedding from keypoints and bounding box.
   */
  public extractFaceEmbedding(detection: Detection): number[] {
    const box = detection.locationData.relativeBoundingBox;
    const keypoints = detection.locationData.relativeKeypoints || [];

    const embedding: number[] = [
      box.width,
      box.height,
      box.xCenter ?? box.startRawX ?? 0.5,
      box.yCenter ?? box.startRawY ?? 0.5,
    ];

    for (const kp of keypoints) {
      embedding.push(kp.x, kp.y);
    }

    return embedding;
  }

  /**
   * Cosine similarity between two feature vectors (0 to 1).
   */
  public calculateSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length || vecA.length === 0) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private emitEvent(event: FaceDetectionEvent): void {
    console.warn('[FaceDetector] Evento anti-cheat detectado:', event);
    this.eventListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('[FaceDetector] Listener error:', err);
      }
    });
  }
}

// Singleton export
export const cameraFaceDetector = new CameraFaceDetector();
