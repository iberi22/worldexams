import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  createBehaviorTracker,
  analyzeAnswerPatterns,
  formatIntegrityEvent,
  calculateIntegrityReport,
} from '../../src/lib/anti-cheat/behavior-analysis';
import type { SuspiciousEvent, PlayerAnswer } from '../../src/modules/exam-room/types';

describe('Behavior Tracker', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should capture copy and paste events', () => {
    const onEvent = vi.fn();
    const tracker = createBehaviorTracker({ onEvent });

    tracker.start();

    const copyEvent = new Event('copy');
    document.dispatchEvent(copyEvent);

    const pasteEvent = new Event('paste');
    document.dispatchEvent(pasteEvent);

    tracker.stop();

    expect(onEvent).toHaveBeenCalledTimes(2);
    expect(tracker.getEvents()).toHaveLength(2);
    expect(tracker.getEvents()[0].type).toBe('copy_paste');
    expect(tracker.getEvents()[0].details?.action).toBe('copy');
    expect(tracker.getEvents()[1].details?.action).toBe('paste');
  });

  it('should detect right click and prevent default if configured', () => {
    const onEvent = vi.fn();
    const tracker = createBehaviorTracker({ onEvent, disableRightClick: true });

    tracker.start();

    const mouseEvent = new MouseEvent('contextmenu', {
      clientX: 100,
      clientY: 200,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(mouseEvent, 'preventDefault');

    document.dispatchEvent(mouseEvent);

    tracker.stop();

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(onEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'right_click',
        details: { x: 100, y: 200 },
      })
    );
  });

  it('should detect DevTools shortcut keys (F12, Ctrl+Shift+I)', () => {
    const onEvent = vi.fn();
    const tracker = createBehaviorTracker({ onEvent, detectDevTools: true });

    tracker.start();

    const f12Event = new KeyboardEvent('keydown', { key: 'F12', cancelable: true });
    window.dispatchEvent(f12Event);

    const ctrlShiftI = new KeyboardEvent('keydown', {
      key: 'I',
      ctrlKey: true,
      shiftKey: true,
      cancelable: true,
    });
    window.dispatchEvent(ctrlShiftI);

    tracker.stop();

    expect(onEvent).toHaveBeenCalledTimes(2);
    expect(tracker.getEvents()[0].type).toBe('devtools_open');
    expect(tracker.getEvents()[1].type).toBe('devtools_open');
  });
});

describe('Answer Pattern Analysis', () => {
  it('should detect fast answers under threshold', () => {
    const answers: PlayerAnswer[] = [
      { playerId: 'p1', questionId: 'q1', answer: 'A', isCorrect: true, timeSpent: 800, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q2', answer: 'B', isCorrect: false, timeSpent: 900, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q3', answer: 'A', isCorrect: true, timeSpent: 1100, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q4', answer: 'C', isCorrect: false, timeSpent: 5000, timestamp: new Date() },
    ];

    const events = analyzeAnswerPatterns(answers);
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('fast_answers');
    expect(events[0].details?.count).toBe(3);
  });

  it('should detect uniform answer selection (all same choice)', () => {
    const answers: PlayerAnswer[] = [
      { playerId: 'p1', questionId: 'q1', answer: 'B', isCorrect: true, timeSpent: 5000, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q2', answer: 'B', isCorrect: false, timeSpent: 5000, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q3', answer: 'B', isCorrect: true, timeSpent: 5000, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q4', answer: 'B', isCorrect: false, timeSpent: 5000, timestamp: new Date() },
      { playerId: 'p1', questionId: 'q5', answer: 'B', isCorrect: true, timeSpent: 5000, timestamp: new Date() },
    ];

    const events = analyzeAnswerPatterns(answers);
    expect(events.some(e => e.type === 'uniform_pattern')).toBe(true);
  });
});

describe('Integrity Score & Report Calculation', () => {
  it('should calculate perfect integrity score (100) for clean behavior', () => {
    const report = calculateIntegrityReport([], [], 'p1', 'Juan');

    expect(report.score).toBe(100);
    expect(report.status).toBe('clean');
    expect(report.totalEvents).toBe(0);
    expect(report.summary.copyPasteCount).toBe(0);
    expect(report.summary.rightClickCount).toBe(0);
  });

  it('should deduct points and categorize status as suspicious or flagged based on penalties', () => {
    const rawEvents: SuspiciousEvent[] = [
      { type: 'copy_paste', timestamp: new Date(), details: { action: 'copy' } }, // -10
      { type: 'copy_paste', timestamp: new Date(), details: { action: 'paste' } }, // -10
      { type: 'right_click', timestamp: new Date() }, // -5
      { type: 'devtools_open', timestamp: new Date() }, // -25
    ];

    const report = calculateIntegrityReport(rawEvents, [], 'p2', 'María');

    // 100 - (10 + 10 + 5 + 25) = 50
    expect(report.score).toBe(50);
    expect(report.status).toBe('flagged');
    expect(report.summary.copyPasteCount).toBe(2);
    expect(report.summary.rightClickCount).toBe(1);
    expect(report.summary.devtoolsCount).toBe(1);
    expect(report.timeline).toHaveLength(4);
  });

  it('should correctly format integrity events with Spanish descriptions and penalties', () => {
    const event: SuspiciousEvent = {
      type: 'devtools_open',
      timestamp: new Date(),
    };

    const formatted = formatIntegrityEvent(event);
    expect(formatted.type).toBe('devtools_open');
    expect(formatted.severity).toBe('high');
    expect(formatted.penalty).toBe(25);
    expect(formatted.description).toContain('DevTools');
  });
});
