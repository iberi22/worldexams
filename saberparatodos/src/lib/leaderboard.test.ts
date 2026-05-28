import { describe, it, expect } from 'vitest';
import { getSemesterInfo } from './leaderboard';

describe('leaderboard semester logic', () => {
  it('should return correct semester info for Calendar A', () => {
    // Feb - Sem 1
    const feb = new Date(2025, 1, 15);
    const infoA1 = getSemesterInfo(feb, 'A');
    expect(infoA1.semester).toBe(1);
    expect(infoA1.start.getMonth()).toBe(1); // Feb

    // Aug - Sem 2
    const aug = new Date(2025, 7, 15);
    const infoA2 = getSemesterInfo(aug, 'A');
    expect(infoA2.semester).toBe(2);
    expect(infoA2.start.getMonth()).toBe(6); // Jul
  });

  it('should return correct semester info for Calendar B', () => {
    // Oct - Sem 1
    const oct = new Date(2025, 9, 15);
    const infoB1 = getSemesterInfo(oct, 'B');
    expect(infoB1.semester).toBe(1);
    expect(infoB1.start.getMonth()).toBe(8); // Sep

    // Mar - Sem 2
    const mar = new Date(2025, 2, 15);
    const infoB2 = getSemesterInfo(mar, 'B');
    expect(infoB2.semester).toBe(2);
    expect(infoB2.start.getMonth()).toBe(0); // Jan
  });

  it('should return correct semester info for standard calendar', () => {
    // Mar - Sem 1
    const mar = new Date(2025, 2, 15);
    const infoS1 = getSemesterInfo(mar, 'standard');
    expect(infoS1.semester).toBe(1);
    expect(infoS1.start.getMonth()).toBe(0); // Jan
    expect(infoS1.end.getMonth()).toBe(5); // Jun

    // Sep - Sem 2
    const sep = new Date(2025, 8, 15);
    const infoS2 = getSemesterInfo(sep, 'standard');
    expect(infoS2.semester).toBe(2);
    expect(infoS2.start.getMonth()).toBe(6); // Jul
    expect(infoS2.end.getMonth()).toBe(11); // Dec
  });
});
