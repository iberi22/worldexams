import { describe, it, expect } from 'vitest';
import { estimatePaesScore } from './mmr-system';

describe('PAES Scoring', () => {
  it('should map 0 MMR to 150 points (minimum)', () => {
    const result = estimatePaesScore({ mmr: 0, evidenceCount: 100, subjectCoverage: 5 });
    expect(result.score).toBe(150);
  });

  it('should map 500 MMR to approximately 800-850 points (maximum) with high evidence', () => {
    const result = estimatePaesScore({ mmr: 500, evidenceCount: 200, subjectCoverage: 5 });
    // 150 + (500 * 1.4) = 850. With evidence factor, it might be slightly less.
    expect(result.score).toBeGreaterThan(790);
    expect(result.score).toBeLessThanOrEqual(850);
  });

  it('should map 250 MMR to approximately 450-500 points with high evidence', () => {
    const result = estimatePaesScore({ mmr: 250, evidenceCount: 200, subjectCoverage: 5 });
    // 150 + (250 * 1.4) = 500.
    expect(result.score).toBeGreaterThan(450);
    expect(result.score).toBeLessThanOrEqual(500);
  });

  it('should have low confidence with low evidence', () => {
    const result = estimatePaesScore({ mmr: 250, evidenceCount: 5, subjectCoverage: 1 });
    expect(result.confidence).toBe('low');
  });

  it('should have high confidence with high evidence', () => {
    const result = estimatePaesScore({ mmr: 250, evidenceCount: 80, subjectCoverage: 3 });
    expect(result.confidence).toBe('high');
  });
});
