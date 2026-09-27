import { describe, it, expect, beforeEach } from 'vitest';
import { getActiveExam, setActiveExam, clearActiveExam } from '../../src/lib/active-exam';

describe('active-exam', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null if not set', () => {
    expect(getActiveExam()).toBeNull();
  });

  it('sets and gets valid active exam', () => {
    setActiveExam({ country: 'co', examType: 'icfes', grade: 11 });
    const exam = getActiveExam();
    expect(exam).not.toBeNull();
    expect(exam?.country).toBe('co');
    expect(exam?.examType).toBe('icfes');
    expect(exam?.grade).toBe(11);
    expect(typeof exam?.updatedAt).toBe('number');
  });

  it('clears active exam', () => {
    setActiveExam({ country: 'co', examType: 'icfes', grade: 11 });
    clearActiveExam();
    expect(getActiveExam()).toBeNull();
  });

  it('returns null for invalid examType', () => {
    localStorage.setItem('worldexams_active_exam', JSON.stringify({ country: 'co', examType: 'unknown', grade: 11, updatedAt: 123 }));
    expect(getActiveExam()).toBeNull();
  });

  it('returns null for invalid JSON', () => {
    localStorage.setItem('worldexams_active_exam', 'invalid json');
    expect(getActiveExam()).toBeNull();
  });
});
