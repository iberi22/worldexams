import { describe, expect, it } from 'vitest';
import type { AppQuestion } from '../api-service';
import { filterGrade11PreicfesReady, inferProtocolVersion, passesGrade11PreicfesPolicy } from './policy';

const question = (overrides: Partial<AppQuestion>): AppQuestion => ({
  id: 'CO-MAT-11-sample-v1',
  text: 'Sample',
  options: [
    { id: 'A', text: 'A' },
    { id: 'B', text: 'B' }
  ],
  correctOptionId: 'A',
  category: 'MATEMATICAS :: SAMPLE',
  grade: 11,
  difficulty: 5,
  ...overrides
});

describe('grade 11 preicfes policy', () => {
  it('infers protocol from bundle fingerprints when frontmatter is absent', () => {
    expect(inferProtocolVersion(question({ bundleId: 'CO-MAT-11-functions-001-PRO-v4' }))).toBe(4);
    expect(inferProtocolVersion(question({ bundleId: 'CO-MAT-11-algebra-001-v3-bundle' }))).toBe(3);
    expect(inferProtocolVersion(question({ bundleId: 'CO-MAT-11-old-001-bundle' }))).toBe(2);
  });

  it('rejects old protocols and accepts protocol 4+ for grade 11', () => {
    expect(passesGrade11PreicfesPolicy(question({ protocol_version: '2.1', difficulty: 5 }))).toBe(false);
    expect(passesGrade11PreicfesPolicy(question({ protocol_version: '3.0', difficulty: 5 }))).toBe(false);
    expect(passesGrade11PreicfesPolicy(question({ protocol_version: '4.1', difficulty: 2 }))).toBe(true);
    expect(passesGrade11PreicfesPolicy(question({ protocol_version: '4.1', difficulty: 4 }))).toBe(true);
    expect(passesGrade11PreicfesPolicy(question({ protocol_version: '4.1', difficulty: 5 }))).toBe(true);
  });

  it('filters grade 11 questions based on protocol version', () => {
    const results = filterGrade11PreicfesReady([
      question({ id: 'old-g11', protocol_version: '2.1', difficulty: 5 }),
      question({ id: 'v3-g11', protocol_version: '3.0', difficulty: 5 }),
      question({ id: 'low-g11', protocol_version: '4.1', difficulty: 2 }),
      question({ id: 'good-g11', protocol_version: '4.1', difficulty: 5 }),
      question({ id: 'grade10-ok', grade: 10, protocol_version: '2.1', difficulty: 2 })
    ]);

    expect(results.map((item) => item.id)).toEqual(['low-g11', 'good-g11', 'grade10-ok']);
  });
});
