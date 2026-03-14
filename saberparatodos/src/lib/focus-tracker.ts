/**
 * Focus Tracker - Detects when user minimizes/switches apps
 * Premium feature for Party Mode exam monitoring
 */

export interface FocusEvent {
  timestamp: number;
  type: 'blur' | 'focus' | 'hidden' | 'visible';
  duration?: number; // Duration of previous state in ms
}

export interface FocusTracker {
  getEvents: () => FocusEvent[];
  getViolationCount: () => number;
  getTotalBlurTime: () => number;
  destroy: () => void;
}

/**
 * Creates a focus tracker that monitors visibility/focus changes
 * @param sessionId - Unique session ID for this exam
 * @param onViolation - Optional callback when focus is lost
 * @returns FocusTracker instance
 */
export function createFocusTracker(sessionId: string, onViolation?: (event: FocusEvent) => void): FocusTracker {
  const events: FocusEvent[] = [];
  let lastEventTime = Date.now();

  const addEvent = (type: FocusEvent['type']) => {
    const now = Date.now();
    const duration = now - lastEventTime;
    const event = { timestamp: now, type, duration };
    events.push(event);
    lastEventTime = now;

    // Log for debugging
    console.log(`[FocusTracker:${sessionId}] ${type} event`, { duration });

    // Trigger callback on violation
    if ((type === 'blur' || type === 'hidden') && onViolation) {
        onViolation(event);
    }
  };

  const handleVisibility = () => {
    addEvent(document.hidden ? 'hidden' : 'visible');
  };

  const handleBlur = () => addEvent('blur');
  const handleFocus = () => addEvent('focus');

  // Attach listeners
  document.addEventListener('visibilitychange', handleVisibility);
  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);

  return {
    getEvents: () => [...events],

    getViolationCount: () =>
      events.filter(e => e.type === 'blur' || e.type === 'hidden').length,

    getTotalBlurTime: () => {
      let totalMs = 0;
      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        if ((event.type === 'focus' || event.type === 'visible') && event.duration) {
          totalMs += event.duration;
        }
      }
      return totalMs;
    },

    destroy: () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      console.log(`[FocusTracker:${sessionId}] Destroyed. Final events:`, events.length);
    }
  };
}

/**
 * Format blur time for display
 */
export function formatBlurTime(ms: number): string {
  if (ms < 1000) return 'menos de 1 segundo';
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds} segundos`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}
