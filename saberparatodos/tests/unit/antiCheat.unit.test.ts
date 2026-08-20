import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { antiCheatService } from '../../src/modules/exam-room/services/antiCheat';
import type { SuspiciousEvent } from '../../src/modules/exam-room/types';

describe('AntiCheatService Lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Stop monitoring to start with a clean state
    antiCheatService.stopMonitoring();
  });

  afterEach(() => {
    antiCheatService.stopMonitoring();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should start and stop monitoring correctly', () => {
    const addDocEventSpy = vi.spyOn(document, 'addEventListener');
    const removeDocEventSpy = vi.spyOn(document, 'removeEventListener');
    const addWinEventSpy = vi.spyOn(window, 'addEventListener');
    const removeWinEventSpy = vi.spyOn(window, 'removeEventListener');
    const callback = vi.fn();

    antiCheatService.startMonitoring(callback);
    expect(addDocEventSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(addDocEventSpy).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));
    expect(addWinEventSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
    expect(addWinEventSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    antiCheatService.stopMonitoring();
    expect(removeDocEventSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
    expect(removeDocEventSpy).toHaveBeenCalledWith('fullscreenchange', expect.any(Function));
    expect(removeWinEventSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
    expect(removeWinEventSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should ignore multiple start monitoring requests', () => {
    const addEventSpy = vi.spyOn(document, 'addEventListener');
    const callback = vi.fn();

    antiCheatService.startMonitoring(callback);
    const firstCallCount = addEventSpy.mock.calls.length;

    antiCheatService.startMonitoring(callback);
    expect(addEventSpy.mock.calls.length).toBe(firstCallCount);
  });
});

describe('AntiCheatService Activity Monitoring', () => {
  let detectedEvents: SuspiciousEvent[];
  const callback = (e: SuspiciousEvent) => {
    detectedEvents.push(e);
  };

  beforeEach(() => {
    vi.useFakeTimers();
    detectedEvents = [];
    antiCheatService.stopMonitoring();
    antiCheatService.startMonitoring(callback);
  });

  afterEach(() => {
    antiCheatService.stopMonitoring();
    vi.useRealTimers();
  });

  it('should detect window blur', () => {
    window.dispatchEvent(new Event('blur'));

    expect(detectedEvents).toHaveLength(1);
    expect(detectedEvents[0].type).toBe('window_blur');
    expect(detectedEvents[0].timestamp).toBeInstanceOf(Date);
  });

  it('should record activity and reset window focus', () => {
    const recordSpy = vi.spyOn(antiCheatService, 'recordActivity');
    window.dispatchEvent(new Event('focus'));
    expect(recordSpy).toHaveBeenCalled();
  });

  it('should detect page hidden and page returned', () => {
    let hidden = true;
    Object.defineProperty(document, 'hidden', {
      get: () => hidden,
      configurable: true,
    });

    // Simulate switching away (page hidden)
    document.dispatchEvent(new Event('visibilitychange'));
    expect(detectedEvents).toHaveLength(1);
    expect(detectedEvents[0].type).toBe('page_hidden');
    expect(detectedEvents[0].duration).toBeUndefined();

    // Advance time by 5000ms
    vi.advanceTimersByTime(5000);

    // Simulate returning (page visible)
    hidden = false;
    document.dispatchEvent(new Event('visibilitychange'));

    expect(detectedEvents).toHaveLength(2);
    expect(detectedEvents[1].type).toBe('page_hidden');
    expect(detectedEvents[1].duration).toBe(5000);
  });

  it('should detect long inactivity', () => {
    // Threshold is 30 seconds, checked every 10 seconds.
    // Advance timers by 40 seconds to trigger checks and exceed threshold.
    vi.advanceTimersByTime(40000);

    expect(detectedEvents).toHaveLength(1);
    expect(detectedEvents[0].type).toBe('long_inactivity');
    expect(detectedEvents[0].duration).toBeGreaterThanOrEqual(30000);

    // Reset list and check that recordActivity avoids the inactivity alert
    detectedEvents = [];
    antiCheatService.recordActivity();

    vi.advanceTimersByTime(20000);
    antiCheatService.recordActivity(); // activity resets timer
    vi.advanceTimersByTime(20000);

    expect(detectedEvents).toHaveLength(0);
  });

  it('should detect fullscreen exit', () => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true,
    });

    document.dispatchEvent(new Event('fullscreenchange'));

    expect(detectedEvents).toHaveLength(1);
    expect(detectedEvents[0].type).toBe('fullscreen_exit');
    expect(detectedEvents[0].timestamp).toBeInstanceOf(Date);

    // Should not emit if entering fullscreen
    detectedEvents = [];
    document.fullscreenElement = document.createElement('div');
    document.dispatchEvent(new Event('fullscreenchange'));

    expect(detectedEvents).toHaveLength(0);
  });

  it('should detect orientation change', () => {
    window.dispatchEvent(new Event('orientationchange'));

    expect(detectedEvents).toHaveLength(1);
    expect(detectedEvents[0].type).toBe('orientation_change');
    expect(detectedEvents[0].timestamp).toBeInstanceOf(Date);
  });

  it('should detect suspicious resize (>50% change) and ignore small resizes', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true, configurable: true });
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true, configurable: true });

    // Restart monitoring so initial dimensions are 1000 x 1000
    antiCheatService.stopMonitoring();
    antiCheatService.startMonitoring(callback);

    // Small resize (10% change) - 1000 -> 900
    window.innerWidth = 900;
    window.dispatchEvent(new Event('resize'));

    expect(detectedEvents).toHaveLength(0);

    // Large resize (>50% change relative to 900) - 900 -> 400 (55.5% change)
    window.innerWidth = 400;
    window.dispatchEvent(new Event('resize'));

    expect(detectedEvents).toHaveLength(1);
    expect(detectedEvents[0].type).toBe('resize_suspicious');
    expect(detectedEvents[0].timestamp).toBeInstanceOf(Date);
  });
});
