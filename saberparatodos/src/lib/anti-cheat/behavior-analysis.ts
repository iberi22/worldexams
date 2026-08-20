/**
 * Behavior Analysis & Integrity Score Engine
 * Detects copy/paste, right-click, devtools usage, and unusual answer patterns.
 * Generates an IntegrityReport with a 0-100 score and timeline.
 */

import type {
  SuspiciousEvent,
  IntegrityEvent,
  IntegrityReport,
  PlayerAnswer,
} from '../../modules/exam-room/types';

export interface BehaviorTrackerOptions {
  onEvent?: (event: SuspiciousEvent) => void;
  disableRightClick?: boolean;
  detectDevTools?: boolean;
}

export interface BehaviorTracker {
  start: () => void;
  stop: () => void;
  getEvents: () => SuspiciousEvent[];
  clearEvents: () => void;
}

/**
 * Penalty weights for integrity scoring
 */
export const PENALTY_WEIGHTS: Record<SuspiciousEvent['type'], number> = {
  copy_paste: 10,
  right_click: 5,
  devtools_open: 25,
  tab_switch: 10,
  window_blur: 8,
  page_hidden: 10,
  long_inactivity: 5,
  fast_answers: 15,
  uniform_pattern: 20,
};

/**
 * Creates a behavior tracker to intercept copy/paste, right-click, devtools shortcuts
 */
export function createBehaviorTracker(
  options: BehaviorTrackerOptions = {}
): BehaviorTracker {
  const { onEvent, disableRightClick = true, detectDevTools = true } = options;
  const events: SuspiciousEvent[] = [];
  let isActive = false;
  let devToolsCheckInterval: any = null;

  const logEvent = (
    type: SuspiciousEvent['type'],
    details?: Record<string, any>
  ) => {
    if (!isActive) return;
    const event: SuspiciousEvent = {
      type,
      timestamp: new Date(),
      details,
    };
    events.push(event);
    if (onEvent) {
      onEvent(event);
    }
  };

  // Copy / Cut / Paste handler
  const handleCopyPaste = (e: Event) => {
    logEvent('copy_paste', { action: e.type });
  };

  // Right-click handler
  const handleContextMenu = (e: MouseEvent) => {
    if (disableRightClick) {
      e.preventDefault();
    }
    logEvent('right_click', { x: e.clientX, y: e.clientY });
  };

  // DevTools shortcut handler
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!detectDevTools) return;

    const isF12 = e.key === 'F12' || e.keyCode === 123;
    const isCtrlShiftI = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73);
    const isCtrlShiftJ = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74);
    const isCtrlShiftC = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67);
    const isCmdOptI = e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73);

    if (isF12 || isCtrlShiftI || isCtrlShiftJ || isCtrlShiftC || isCmdOptI) {
      e.preventDefault();
      logEvent('devtools_open', { shortcut: e.key || 'DevTools' });
    }
  };

  // DevTools dimension threshold detector
  const checkDevToolsDimensions = () => {
    if (typeof window === 'undefined') return;
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    if (widthThreshold || heightThreshold) {
      // Avoid spamming devtools_open events
      const lastDevToolsEvent = [...events].reverse().find(e => e.type === 'devtools_open');
      const now = Date.now();
      if (!lastDevToolsEvent || now - new Date(lastDevToolsEvent.timestamp).getTime() > 15000) {
        logEvent('devtools_open', { method: 'window_dimension_delta' });
      }
    }
  };

  return {
    start: () => {
      if (isActive || typeof window === 'undefined') return;
      isActive = true;

      document.addEventListener('copy', handleCopyPaste);
      document.addEventListener('cut', handleCopyPaste);
      document.addEventListener('paste', handleCopyPaste);
      document.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('keydown', handleKeyDown);

      if (detectDevTools) {
        devToolsCheckInterval = setInterval(checkDevToolsDimensions, 3000);
      }
    },

    stop: () => {
      if (!isActive || typeof window === 'undefined') return;
      isActive = false;

      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);

      if (devToolsCheckInterval) {
        clearInterval(devToolsCheckInterval);
        devToolsCheckInterval = null;
      }
    },

    getEvents: () => [...events],

    clearEvents: () => {
      events.length = 0;
    },
  };
}

/**
 * Detects unusual answer patterns (all same answer, extremely fast answers)
 */
export function analyzeAnswerPatterns(answers: PlayerAnswer[]): SuspiciousEvent[] {
  const patternEvents: SuspiciousEvent[] = [];
  if (!answers || answers.length === 0) return patternEvents;

  // 1. Detect very fast answers (< 1500ms)
  const FAST_ANSWER_THRESHOLD_MS = 1500;
  const fastAnswers = answers.filter(a => a.timeSpent > 0 && a.timeSpent < FAST_ANSWER_THRESHOLD_MS);

  if (fastAnswers.length >= 3 || (answers.length >= 3 && fastAnswers.length / answers.length >= 0.5)) {
    patternEvents.push({
      type: 'fast_answers',
      timestamp: new Date(),
      details: {
        count: fastAnswers.length,
        totalAnswers: answers.length,
        avgTimeSpentMs: answers.reduce((acc, a) => acc + a.timeSpent, 0) / answers.length,
      },
    });
  }

  // 2. Detect uniform answer pattern (e.g. all selected options are identical)
  if (answers.length >= 4) {
    const firstChoice = answers[0].answer;
    const isAllSame = answers.every(a => a.answer === firstChoice);

    if (isAllSame) {
      patternEvents.push({
        type: 'uniform_pattern',
        timestamp: new Date(),
        details: {
          choice: firstChoice,
          totalAnswers: answers.length,
        },
      });
    } else {
      // Check for 5+ consecutive identical choices
      let consecutiveCount = 1;
      let maxConsecutive = 1;
      let repeatedChoice = '';

      for (let i = 1; i < answers.length; i++) {
        if (answers[i].answer === answers[i - 1].answer) {
          consecutiveCount++;
          if (consecutiveCount > maxConsecutive) {
            maxConsecutive = consecutiveCount;
            repeatedChoice = answers[i].answer;
          }
        } else {
          consecutiveCount = 1;
        }
      }

      if (maxConsecutive >= 5) {
        patternEvents.push({
          type: 'uniform_pattern',
          timestamp: new Date(),
          details: {
            consecutiveCount: maxConsecutive,
            choice: repeatedChoice,
          },
        });
      }
    }
  }

  return patternEvents;
}

/**
 * Formats a raw SuspiciousEvent into a structured IntegrityEvent with description & severity
 */
export function formatIntegrityEvent(event: SuspiciousEvent): IntegrityEvent {
  const type = event.type;
  const penalty = PENALTY_WEIGHTS[type] || 5;

  let description = 'Actividad inusual registrada durante la prueba';
  let severity: IntegrityEvent['severity'] = 'low';

  switch (type) {
    case 'copy_paste':
      description = 'Intento de copiar o pegar contenido en la plataforma';
      severity = 'medium';
      break;
    case 'right_click':
      description = 'Intento de abrir menú contextual (clic derecho)';
      severity = 'low';
      break;
    case 'devtools_open':
      description = 'Uso o apertura de Herramientas de Desarrollador (DevTools / F12)';
      severity = 'high';
      break;
    case 'tab_switch':
    case 'page_hidden':
      description = 'Salida de la pestaña del examen';
      severity = 'medium';
      break;
    case 'window_blur':
      description = 'Pérdida de foco de la ventana del examen';
      severity = 'low';
      break;
    case 'long_inactivity':
      description = 'Inactividad prolongada sin interacciones';
      severity = 'low';
      break;
    case 'fast_answers':
      description = 'Respuestas registradas con velocidad inusualmente alta (< 1.5s)';
      severity = 'medium';
      break;
    case 'uniform_pattern':
      description = 'Patrón de respuestas uniforme o repetitivo detectado';
      severity = 'high';
      break;
  }

  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    type,
    timestamp: typeof event.timestamp === 'string' ? new Date(event.timestamp) : event.timestamp,
    description,
    severity,
    penalty,
    details: event.details,
  };
}

/**
 * Calculates a full IntegrityReport (Score 0-100, timeline, summary)
 */
export function calculateIntegrityReport(
  rawEvents: SuspiciousEvent[] = [],
  answers: PlayerAnswer[] = [],
  playerId?: string,
  playerName?: string
): IntegrityReport {
  // Analyze answer patterns
  const patternEvents = analyzeAnswerPatterns(answers);
  const allEvents = [...rawEvents, ...patternEvents];

  // Convert to IntegrityEvents
  const timeline = allEvents.map(formatIntegrityEvent);

  // Calculate score (starting from 100)
  const totalPenalties = timeline.reduce((acc, event) => acc + event.penalty, 0);
  const score = Math.max(0, Math.min(100, 100 - totalPenalties));

  // Determine status
  let status: IntegrityReport['status'] = 'clean';
  if (score < 60) {
    status = 'flagged';
  } else if (score < 90) {
    status = 'suspicious';
  }

  // Summary counts
  let copyPasteCount = 0;
  let rightClickCount = 0;
  let devtoolsCount = 0;
  let tabSwitchCount = 0;
  const patternFlags: string[] = [];

  for (const event of timeline) {
    switch (event.type) {
      case 'copy_paste':
        copyPasteCount++;
        break;
      case 'right_click':
        rightClickCount++;
        break;
      case 'devtools_open':
        devtoolsCount++;
        break;
      case 'tab_switch':
      case 'window_blur':
      case 'page_hidden':
        tabSwitchCount++;
        break;
      case 'fast_answers':
        patternFlags.push('Respuestas extremadamente rápidas');
        break;
      case 'uniform_pattern':
        patternFlags.push('Patrón de respuesta uniforme/repetitivo');
        break;
    }
  }

  return {
    playerId,
    playerName,
    score,
    status,
    totalEvents: timeline.length,
    timeline,
    summary: {
      copyPasteCount,
      rightClickCount,
      devtoolsCount,
      tabSwitchCount,
      patternFlags: Array.from(new Set(patternFlags)),
    },
  };
}
