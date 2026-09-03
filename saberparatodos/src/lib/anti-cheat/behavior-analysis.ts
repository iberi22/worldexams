/**
 * Behavior Analysis & Integrity Report for WorldExams Anti-Cheat System
 * Tracks suspicious events during exam sessions and generates integrity scores.
 *
 * Privacy & Resource Guarantees:
 * - All tracking is client-side only (browser)
 * - No data is transmitted to any server
 * - Events are stored in memory during the session only
 * - Users can disable monitoring at any time
 */

export type IntegrityEventType =
  | 'copy_paste'
  | 'right_click'
  | 'devtools_open'
  | 'suspicious_pattern'
  | 'tab_switch'
  | 'focus_loss';

export interface IntegrityEvent {
  timestamp: number;
  type: IntegrityEventType;
  severity: 'low' | 'medium' | 'high';
  details?: string;
}

export interface IntegrityScore {
  overall: number; // 0-100
  copyPasteEvents: number;
  rightClickEvents: number;
  devtoolsEvents: number;
  tabSwitchEvents: number;
  suspiciousPatterns: number;
  focusLossEvents: number;
  timeline: IntegrityEvent[];
}

export interface IntegrityReport extends IntegrityScore {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  flaggedAt: number;
  summary: string;
}

function computeGrade(score: number): IntegrityReport['grade'] {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 45) return 'D';
  return 'F';
}

function generateSummary(events: IntegrityEvent[], score: number): string {
  const counts = { copy_paste: 0, right_click: 0, devtools_open: 0, tab_switch: 0, suspicious_pattern: 0, focus_loss: 0 };
  for (const e of events) counts[e.type]++;
  const parts: string[] = [];
  if (counts.copy_paste) parts.push(`${counts.copy_paste} copy/paste attempt(s)`);
  if (counts.right_click) parts.push(`${counts.right_click} right-click attempt(s)`);
  if (counts.devtools_open) parts.push(`${counts.devtools_open} devtools open event(s)`);
  if (counts.tab_switch) parts.push(`${counts.tab_switch} tab switch(es)`);
  if (counts.suspicious_pattern) parts.push(`${counts.suspicious_pattern} suspicious pattern(s)`);
  if (counts.focus_loss) parts.push(`${counts.focus_loss} focus loss event(s)`);
  if (parts.length === 0) return `Integrity score ${score}/100. No suspicious activity detected.`;
  return `Integrity score ${score}/100. Detected: ${parts.join(', ')}.`;
}

export class BehaviorAnalyzer {
  private events: IntegrityEvent[] = [];
  private answerTimestamps: number[] = [];
  private answerValues: (string | number)[] = [];
  private boundHandlers: {
    copy: (e: ClipboardEvent) => void;
    paste: (e: ClipboardEvent) => void;
    contextmenu: (e: Event) => void;
    keydown: (e: KeyboardEvent) => void;
    visibilitychange: () => void;
    blur: () => void;
  } | null = null;
  private devToolsOpen = false;
  private _enabled = true;

  constructor(private sessionId?: string) {}

  /** Start tracking all events. Call once when exam starts. */
  start(): void {
    if (this.boundHandlers) return; // already started

    const self = this;

    this.boundHandlers = {
      copy: (e: ClipboardEvent) => {
        if (!self._enabled) return;
        self.addEvent('copy_paste', 'medium', 'Copy intercepted');
      },
      paste: (e: ClipboardEvent) => {
        if (!self._enabled) return;
        self.addEvent('copy_paste', 'medium', 'Paste intercepted');
      },
      contextmenu: (e: Event) => {
        if (!self._enabled) return;
        e.preventDefault();
        self.addEvent('right_click', 'low', 'Right-click prevented');
      },
      keydown: (e: KeyboardEvent) => {
        if (!self._enabled) return;
        // F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
        ) {
          e.preventDefault();
          self.addEvent('devtools_open', 'high', 'Developer tools shortcut intercepted');
        }
        // Ctrl+S (save page)
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          self.addEvent('right_click', 'low', 'Save shortcut prevented');
        }
      },
      visibilitychange: () => {
        if (!self._enabled) return;
        if (document.hidden) {
          self.addEvent('tab_switch', 'medium', 'Tab switched away from exam');
        }
      },
      blur: () => {
        if (!self._enabled) return;
        self.addEvent('focus_loss', 'low', 'Window lost focus');
      },
    };

    document.addEventListener('copy', this.boundHandlers.copy);
    document.addEventListener('paste', this.boundHandlers.paste);
    document.addEventListener('contextmenu', this.boundHandlers.contextmenu);
    document.addEventListener('keydown', this.boundHandlers.keydown);
    document.addEventListener('visibilitychange', this.boundHandlers.visibilitychange);
    window.addEventListener('blur', this.boundHandlers.blur);
  }

  /** Stop tracking and clean up listeners. Call when exam ends. */
  stop(): void {
    if (!this.boundHandlers) return;

    document.removeEventListener('copy', this.boundHandlers.copy);
    document.removeEventListener('paste', this.boundHandlers.paste);
    document.removeEventListener('contextmenu', this.boundHandlers.contextmenu);
    document.removeEventListener('keydown', this.boundHandlers.keydown);
    document.removeEventListener('visibilitychange', this.boundHandlers.visibilitychange);
    window.removeEventListener('blur', this.boundHandlers.blur);
    this.boundHandlers = null;
  }

  /** Record that the student submitted an answer. Used for suspicious pattern detection. */
  recordAnswer(value: string | number, timestamp = Date.now()): void {
    this.answerTimestamps.push(timestamp);
    this.answerValues.push(value);
  }

  /** Manually flag a suspicious pattern (e.g., all answers identical). */
  flagSuspiciousPattern(reason: string): void {
    this.addEvent('suspicious_pattern', 'high', reason);
  }

  /** Get the current integrity score without stopping tracking. */
  getIntegrityScore(): IntegrityScore {
    const counts = {
      copyPasteEvents: 0,
      rightClickEvents: 0,
      devtoolsEvents: 0,
      tabSwitchEvents: 0,
      suspiciousPatterns: 0,
      focusLossEvents: 0,
    };

    for (const event of this.events) {
      switch (event.type) {
        case 'copy_paste': counts.copyPasteEvents++; break;
        case 'right_click': counts.rightClickEvents++; break;
        case 'devtools_open': counts.devtoolsEvents++; break;
        case 'tab_switch': counts.tabSwitchEvents++; break;
        case 'suspicious_pattern': counts.suspiciousPatterns++; break;
        case 'focus_loss': counts.focusLossEvents++; break;
      }
    }

    // Suspicious pattern: check if all answers are the same (e.g., all "A")
    if (this.answerValues.length >= 5) {
      const first = this.answerValues[0];
      const allSame = this.answerValues.every(v => v === first);
      if (allSame) {
        counts.suspiciousPatterns++;
        // Only add if not already flagged
        const alreadyFlagged = this.events.some(e => e.type === 'suspicious_pattern' && e.details?.includes('all answers identical'));
        if (!alreadyFlagged) {
          this.addEvent('suspicious_pattern', 'high', `All ${this.answerValues.length} answers identical`);
        }
      }
    }

    // Suspicious pattern: check if answers are too fast (< 2s per question on average)
    if (this.answerTimestamps.length >= 3) {
      const totalTime = this.answerTimestamps[this.answerTimestamps.length - 1] - this.answerTimestamps[0];
      const avgTimePerQuestion = totalTime / (this.answerTimestamps.length - 1);
      if (avgTimePerQuestion < 2000 && avgTimePerQuestion > 0) {
        const alreadyFlagged = this.events.some(e => e.type === 'suspicious_pattern' && e.details?.includes('average answer time'));
        if (!alreadyFlagged) {
          this.addEvent('suspicious_pattern', 'high', `Average answer time ${Math.round(avgTimePerQuestion / 1000)}s — unusually fast`);
        }
        counts.suspiciousPatterns++;
      }
    }

    // Recalculate after auto-detection
    const copyPaste = this.events.filter(e => e.type === 'copy_paste').length;
    const rightClick = this.events.filter(e => e.type === 'right_click').length;
    const devtools = this.events.filter(e => e.type === 'devtools_open').length;
    const tabSwitch = this.events.filter(e => e.type === 'tab_switch').length;
    const suspicious = this.events.filter(e => e.type === 'suspicious_pattern').length;
    const focusLoss = this.events.filter(e => e.type === 'focus_loss').length;

    const overall = Math.max(0, Math.min(100,
      100
      - (copyPaste * 10)
      - (rightClick * 5)
      - (devtools * 20)
      - (tabSwitch * 5)
      - (suspicious * 15)
      - (focusLoss * 2)
    ));

    return {
      overall,
      copyPasteEvents: copyPaste,
      rightClickEvents: rightClick,
      devtoolsEvents: devtools,
      tabSwitchEvents: tabSwitch,
      suspiciousPatterns: suspicious,
      focusLossEvents: focusLoss,
      timeline: [...this.events],
    };
  }

  /** Get a full integrity report with grade and summary. */
  getIntegrityReport(): IntegrityReport {
    const score = this.getIntegrityScore();
    return {
      ...score,
      grade: computeGrade(score.overall),
      flaggedAt: Date.now(),
      summary: generateSummary(this.events, score.overall),
    };
  }

  /** Reset all tracked data. */
  reset(): void {
    this.events = [];
    this.answerTimestamps = [];
    this.answerValues = [];
  }

  /** Enable or disable tracking. */
  setEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  private addEvent(type: IntegrityEventType, severity: IntegrityEvent['severity'], details?: string): void {
    this.events.push({ timestamp: Date.now(), type, severity, details });
  }
}
