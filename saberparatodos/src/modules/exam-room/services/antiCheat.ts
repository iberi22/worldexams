/**
 * Anti-Cheat Service
 * Detecta cuando un jugador sale de la pantalla del examen
 * Usa Page Visibility API y window.onblur
 */

import type { SuspiciousEvent } from '../types';

class AntiCheatService {
  private listeners: ((event: SuspiciousEvent) => void)[] = [];
  private isMonitoring = false;
  private lastActivityTime = Date.now();
  private inactivityCheckInterval?: number;
  private hiddenTime?: number;
  private lastWidth = 0;
  private lastHeight = 0;

  /**
   * Inicia el monitoreo anti-cheat
   */
  startMonitoring(onSuspiciousActivity: (event: SuspiciousEvent) => void) {
    if (this.isMonitoring) return;

    this.listeners.push(onSuspiciousActivity);
    this.isMonitoring = true;
    this.lastActivityTime = Date.now();
    this.lastWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    this.lastHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    // Page Visibility API - detecta cuando el tab está oculto
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Window blur - detecta cuando pierdes el foco de la ventana
    window.addEventListener('blur', this.handleWindowBlur);
    window.addEventListener('focus', this.handleWindowFocus);

    // Fullscreen exit detection
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);

    // Orientation change detection
    window.addEventListener('orientationchange', this.handleOrientationChange);

    // Window resize detection (large resize = split screen / suspicious)
    window.addEventListener('resize', this.handleResize);

    // Detectar inactividad prolongada (5 segundos sin interacción)
    this.startInactivityCheck();

    console.log('[AntiCheat] Monitoreo iniciado');
  }

  /**
   * Detiene el monitoreo
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;

    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    window.removeEventListener('orientationchange', this.handleOrientationChange);
    window.removeEventListener('resize', this.handleResize);

    if (this.inactivityCheckInterval) {
      clearInterval(this.inactivityCheckInterval);
    }

    this.isMonitoring = false;
    this.listeners = [];

    console.log('[AntiCheat] Monitoreo detenido');
  }

  /**
   * Registra actividad del usuario (click, tecla, etc.)
   */
  recordActivity() {
    this.lastActivityTime = Date.now();
  }

  private handleVisibilityChange = () => {
    if (document.hidden) {
      // Usuario cambió de tab o minimizó la ventana
      this.hiddenTime = Date.now();
      this.emitEvent({
        type: 'page_hidden',
        timestamp: new Date(),
      });
    } else if (this.hiddenTime) {
      // Usuario regresó
      const duration = Date.now() - this.hiddenTime;
      this.emitEvent({
        type: 'page_hidden',
        timestamp: new Date(),
        duration,
      });
      this.hiddenTime = undefined;
    }
  };

  private handleWindowBlur = () => {
    // Usuario hizo click fuera de la ventana
    this.emitEvent({
      type: 'window_blur',
      timestamp: new Date(),
    });
  };

  private handleWindowFocus = () => {
    // Usuario regresó a la ventana
    this.recordActivity();
  };

  private handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      this.emitEvent({
        type: 'fullscreen_exit',
        timestamp: new Date(),
      });
    }
  };

  private handleOrientationChange = () => {
    this.emitEvent({
      type: 'orientation_change',
      timestamp: new Date(),
    });
  };

  private handleResize = () => {
    if (typeof window === 'undefined') return;
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    if (this.lastWidth > 0 && this.lastHeight > 0) {
      const widthChange = Math.abs(currentWidth - this.lastWidth) / this.lastWidth;
      const heightChange = Math.abs(currentHeight - this.lastHeight) / this.lastHeight;

      if (widthChange > 0.5 || heightChange > 0.5) {
        this.emitEvent({
          type: 'resize_suspicious',
          timestamp: new Date(),
        });
      }
    }

    this.lastWidth = currentWidth;
    this.lastHeight = currentHeight;
  };

  private startInactivityCheck() {
    this.inactivityCheckInterval = window.setInterval(() => {
      const timeSinceActivity = Date.now() - this.lastActivityTime;
      const INACTIVITY_THRESHOLD = 30000; // 30 segundos

      if (timeSinceActivity > INACTIVITY_THRESHOLD) {
        this.emitEvent({
          type: 'long_inactivity',
          timestamp: new Date(),
          duration: timeSinceActivity,
        });
        // Reset para evitar spam
        this.lastActivityTime = Date.now();
      }
    }, 10000); // Check cada 10 segundos
  }

  private emitEvent(event: SuspiciousEvent) {
    console.warn('[AntiCheat] Actividad sospechosa detectada:', event);
    this.listeners.forEach((listener) => listener(event));
  }
}

// Singleton
export const antiCheatService = new AntiCheatService();
