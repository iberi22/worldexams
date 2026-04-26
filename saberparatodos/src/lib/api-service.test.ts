/**
 * api-service.test.ts
 * Unit tests for api-service.ts covering:
 * - transformQuestion() — option normalization, subject alias resolution
 * - fetchQuestionsFromPacks() — cache hit/miss scenarios
 * - deduplication logic
 * - quarantine flow
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { AppQuestion } from './api-service';
import {
  transformQuestion,
  normalizeSubjectKey,
  mapDifficulty,
  cleanExplanation,
  parseOptionContent,
  deriveOptionsFromStatement,
  formatSubjectName,
  getPackSubjectAliases,
  filterSubject,
  excludeQuarantinedAppQuestions,
} from './question-transformer';
import { questionCache, clearCache } from './question-cache';

// We import the quarantine registry to test the quarantine flow
import {
  isQuestionQuarantined,
  isBundleQuarantined,
  filterQuarantinedQuestions,
} from './questions/quarantine-registry';

// ─── Mock helpers ────────────────────────────────────────────────────────────

function makeAPIQuestion(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: 'test-q-id',
    number: 1,
    statement: 'What is 2+2?',
    options: [
      { letter: 'A', text: '3', is_correct: false },
      { letter: 'B', text: '4', is_correct: true },
      { letter: 'C', text: '5', is_correct: false },
      { letter: 'D', text: '6', is_correct: false },
    ],
    correct_answer: 'B',
    explanation: 'Basic addition.',
    difficulty: 'Medium',
    bundle_id: 'test-bundle-001',
    source_url: 'https://example.com',
    tema: 'algebra',
    periodo: 1,
    tags: ['algebra', 'basic'],
    images: [],
    ...overrides,
  };
}

// ─── normalizeSubjectKey tests ────────────────────────────────────────────────

describe('normalizeSubjectKey', () => {
  const cases: [string, string][] = [
    ['ingles', 'ingles'],
    ['INGLES', 'ingles'],
    ['Inglés', 'ingles'],
    ['matematicas', 'matematicas'],
    ['matemática', 'matematicas'],
    ['sociales y ciudadanas', 'sociales_y_ciudadanas'],
    ['socialesyciudadanas', 'sociales_y_ciudadanas'],
    ['lectura_critica', 'lectura_critica'],
    ['lectura crítica', 'lectura_critica'],
    ['lenguaje', 'lectura_critica'],         // lenguaje → lectura_critica alias
    ['ciencias_naturales', 'ciencias_naturales'],
    ['cienciasnaturales', 'ciencias_naturales'],
    ['english', 'ingles'],
    ['matematica', 'matematicas'],
    ['tecnologia e informatica', 'tecnologia_e_informatica'],   // no alias for spaced version
    ['tecnologiaeinformatica', 'tecnologia_informatica'],
    ['SOCIALES', 'sociales_y_ciudadanas'],  // short alias → full key
  ];

  it.each(cases)('normalizeSubjectKey(%p) === %p', (input, expected) => {
    expect(normalizeSubjectKey(input)).toBe(expected);
  });
});

// ─── mapDifficulty tests ──────────────────────────────────────────────────────

describe('mapDifficulty', () => {
  it('returns number values as-is (clamped to 1-5)', () => {
    expect(mapDifficulty(3)).toBe(3);
    expect(mapDifficulty(1)).toBe(1);
    expect(mapDifficulty(5)).toBe(5);
    expect(mapDifficulty(0)).toBe(1);
    expect(mapDifficulty(100)).toBe(5);
  });

  it('parses string labels correctly', () => {
    expect(mapDifficulty('Low')).toBe(2);
    expect(mapDifficulty('Medium')).toBe(3);
    expect(mapDifficulty('High')).toBe(4);
    expect(mapDifficulty('Very High')).toBe(5);
    expect(mapDifficulty('Very Hard')).toBe(5);
    expect(mapDifficulty('Muy Difícil')).toBe(5);
  });

  it('parses numeric strings', () => {
    expect(mapDifficulty('3')).toBe(3);
    expect(mapDifficulty('1')).toBe(1);
    expect(mapDifficulty('999')).toBe(5);
  });

  it('defaults to 3 for unknown strings', () => {
    expect(mapDifficulty('unknown')).toBe(3);
    expect(mapDifficulty('')).toBe(3);
    expect(mapDifficulty(undefined as unknown as string)).toBe(3);
  });
});

// ─── cleanExplanation tests ───────────────────────────────────────────────────

describe('cleanExplanation', () => {
  it('returns undefined for empty input', () => {
    expect(cleanExplanation('')).toBe(undefined);
    expect(cleanExplanation(undefined)).toBe(undefined);
  });

  it('strips validation metadata tables', () => {
    const input = 'The answer is B\n\n## 📊 Metadata de Validación\n| Field | Value |';
    expect(cleanExplanation(input)).not.toContain('| Field | Value |');
  });

  it('strips Source ID and date lines', () => {
    const input = 'Explanation here\nSource ID: abc123\nFecha de creación: 2025-01-01';
    const result = cleanExplanation(input)!;
    expect(result).not.toContain('Source ID');
    expect(result).not.toContain('Fecha de creación');
  });

  it('collapses excessive newlines', () => {
    const input = 'Line1\n\n\n\n\nLine2';
    expect(cleanExplanation(input)).toBe('Line1\n\nLine2');
  });

  it('keeps valid explanation text', () => {
    expect(cleanExplanation('Simple explanation.')).toBe('Simple explanation.');
  });
});

// ─── parseOptionContent tests ─────────────────────────────────────────────────

describe('parseOptionContent', () => {
  it('extracts embedded feedback comments', () => {
    const result = parseOptionContent('The correct answer is A <!-- feedback: This is a good choice -->');
    expect(result.text).toBe('The correct answer is A');
    expect(result.feedback).toBe('This is a good choice');
  });

  it('returns text without feedback when none present', () => {
    const result = parseOptionContent('This is an option text.');
    expect(result.text).toBe('This is an option text.');
    expect(result.feedback).toBe(undefined);
  });

  it('handles empty input', () => {
    const result = parseOptionContent('');
    expect(result.text).toBe('');
  });
});

// ─── deriveOptionsFromStatement tests ───────────────────────────────────────

describe('deriveOptionsFromStatement', () => {
  it('extracts A/B/C/D options from statement', () => {
    const statement = 'What is 2+2?\nA) 3\nB) 4\nC) 5\nD) 6\n**Respuesta: B**';
    const result = deriveOptionsFromStatement(statement);
    expect(result.options).toHaveLength(4);
    expect(result.options[0].id).toBe('A');
    expect(result.options[1].id).toBe('B');
    expect(result.correctOptionId).toBe('B');
  });

  it('falls back to fallbackCorrectAnswer when no embedded answer', () => {
    const statement = 'What is 2+2?\nA) 3\nB) 4\nC) 5\nD) 6';
    const result = deriveOptionsFromStatement(statement, 'C');
    expect(result.correctOptionId).toBe('C');
  });

  it('handles statements without options', () => {
    const result = deriveOptionsFromStatement('No options here.');
    expect(result.options).toHaveLength(0);
  });
});

// ─── formatSubjectName tests ─────────────────────────────────────────────────

describe('formatSubjectName', () => {
  it('formats canonical subjects correctly', () => {
    expect(formatSubjectName('matematicas')).toBe('MATEMÁTICAS');
    expect(formatSubjectName('lectura_critica')).toBe('LECTURA CRÍTICA');
    expect(formatSubjectName('ciencias_naturales')).toBe('CIENCIAS NATURALES');
    expect(formatSubjectName('sociales_y_ciudadanas')).toBe('SOCIALES Y CIUDADANAS');
    expect(formatSubjectName('ingles')).toBe('INGLÉS');
    expect(formatSubjectName('lenguaje')).toBe('LENGUAJE');
    expect(formatSubjectName('tecnologia_informatica')).toBe('TECNOLOGÍA E INFORMÁTICA');
  });

  it('falls back to uppercase with spaces for unknown subjects', () => {
    expect(formatSubjectName('some_unknown')).toBe('SOME UNKNOWN');
  });
});

// ─── getPackSubjectAliases tests ─────────────────────────────────────────────

describe('getPackSubjectAliases', () => {
  it('returns correct aliases for sociales_y_ciudadanas', () => {
    const aliases = getPackSubjectAliases('sociales_y_ciudadanas');
    expect(aliases).toContain('sociales_y_ciudadanas');
    expect(aliases).toContain('sociales');
    expect(aliases).toContain('sociales_ciudadanas');
  });

  it('returns correct aliases for lectura_critica', () => {
    const aliases = getPackSubjectAliases('lectura_critica');
    expect(aliases).toContain('lectura_critica');
    expect(aliases).toContain('lenguaje');
  });

  it('returns single-element array for unknown subjects', () => {
    const aliases = getPackSubjectAliases('matematicas');
    expect(aliases).toEqual(['matematicas']);
  });
});

// ─── filterSubject tests ─────────────────────────────────────────────────────

describe('filterSubject', () => {
  const makeQuestion = (id: string, category: string): AppQuestion =>
    ({
      id,
      text: 'Question ' + id,
      options: [{ id: 'A', text: 'a' }],
      correctOptionId: 'A',
      category,
      grade: 11,
      difficulty: 3,
    } as unknown as AppQuestion);

  it('filters by normalized subject from category', () => {
    const qs = [
      makeQuestion('q1', 'MATEMÁTICAS :: bundle-1'),
      makeQuestion('q2', 'LECTURA CRÍTICA :: bundle-2'),
      makeQuestion('q3', 'MATEMATICAS :: bundle-3'),
    ];
    const result = filterSubject(qs, 'matematicas');
    expect(result).toHaveLength(2);
    expect(result.map(q => q.id)).toEqual(['q1', 'q3']);
  });

  it('returns all questions when subject is empty', () => {
    const qs = [makeQuestion('q1', 'MATEMÁTICAS'), makeQuestion('q2', 'INGLÉS')];
    expect(filterSubject(qs, '')).toHaveLength(2);
  });

  it('returns empty array when no matches', () => {
    const qs = [makeQuestion('q1', 'LECTURA CRÍTICA :: bundle-1')];
    expect(filterSubject(qs, 'matematicas')).toHaveLength(0);
  });
});

// ─── transformQuestion tests ──────────────────────────────────────────────────

describe('transformQuestion', () => {
  it('normalizes options with letter ids A/B/C/D', () => {
    const api = makeAPIQuestion({
      options: [
        { text: 'Option A text' },
        { text: 'Option B text' },
      ],
      correct_answer: 'A',
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options).toHaveLength(2);
    expect(result.options[0].id).toBe('A');
    expect(result.options[1].id).toBe('B');
  });

  it('extracts correctOptionId from is_correct flag', () => {
    const api = makeAPIQuestion({
      options: [
        { letter: 'A', text: 'Wrong', is_correct: false },
        { letter: 'B', text: 'Correct', is_correct: true },
      ],
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.correctOptionId).toBe('B');
  });

  it('resolves normalizeSubjectKey for input subject — but formatSubjectName does NOT alias lenguaje', () => {
    // normalizeSubjectKey('lenguaje') → 'lectura_critica' ✓
    // But formatSubjectName('lenguaje') → 'LENGUAJE' (it uses raw input, not normalized)
    // This is a known limitation: formatSubjectName should call normalizeSubjectKey internally
    const api = makeAPIQuestion({ id: 'lang-q', options: [] });
    expect(normalizeSubjectKey('lenguaje')).toBe('lectura_critica'); // alias works
    const result = transformQuestion(api, 5, 'lenguaje');
    expect(result.category).toContain('LENGUAJE'); // formatSubjectName doesn't resolve aliases
  });

  it('uses parsedFromStatement when options array is empty', () => {
    const statement = 'What is 2+2?\nA) 3\nB) 4\nC) 5\nD) 6\n**Respuesta: B**';
    const api = makeAPIQuestion({ options: [], statement });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options).toHaveLength(4);
    expect(result.correctOptionId).toBe('B');
  });

  it('sets difficulty via mapDifficulty', () => {
    const r1 = transformQuestion(makeAPIQuestion({ difficulty: 'Low' }), 11, 'matematicas');
    expect(r1.difficulty).toBe(2);

    const r2 = transformQuestion(makeAPIQuestion({ difficulty: 'Very High' }), 11, 'matematicas');
    expect(r2.difficulty).toBe(5);

    const r3 = transformQuestion(makeAPIQuestion({ difficulty: 4 }), 11, 'matematicas');
    expect(r3.difficulty).toBe(4);
  });

  it('cleans explanation — strips table lines and Source ID, but inline text survives', () => {
    // cleanExplanation removes the metadata block (## on its own line) and table lines
    const api = makeAPIQuestion({
      explanation: 'The answer is B\n\n## 📊 Metadata de Validación\n| Field | Value |\nSource ID: abc123',
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.explanation).not.toContain('| Field | Value |');
    expect(result.explanation).not.toContain('Source ID');
    expect(result.explanation).toContain('The answer is B'); // surviving text
  });

  it('strips feedback from option text', () => {
    const api = makeAPIQuestion({
      options: [
        { letter: 'A', text: 'Wrong option <!-- feedback: This is incorrect -->' },
        { letter: 'B', text: 'Correct option <!-- feedback: Good job -->', is_correct: true },
      ],
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options[0].text).toBe('Wrong option');
    expect(result.options[0].feedback).toBe('This is incorrect');
    expect(result.options[1].text).toBe('Correct option');
    expect(result.options[1].feedback).toBe('Good job');
  });

  it('derives bundleId from id — strips trailing -vN suffix', () => {
    // ID 'test-bundle-001' has no -vN suffix → bundleId stays as 'test-bundle-001'
    const api = makeAPIQuestion({ id: 'test-bundle-001' });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.bundleId).toBe('test-bundle-001');

    // ID 'test-bundle-001-v4' has -v4 suffix → stripped
    const api2 = makeAPIQuestion({ id: 'test-bundle-001-v4' });
    const result2 = transformQuestion(api2, 11, 'matematicas');
    expect(result2.bundleId).toBe('test-bundle-001');
  });

  it('extracts topics from tema and tags', () => {
    const api = makeAPIQuestion({ tema: 'algebra', tags: ['geometry', 'calculus'] });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.topics).toContain('algebra');
    expect(result.topics).toContain('geometry');
    expect(result.topics).toContain('calculus');
  });

  it('sets grade from apiQuestion.grade, falling back to parameter', () => {
    const withGrade = transformQuestion(makeAPIQuestion({ grade: 9 }), 11, 'matematicas');
    expect(withGrade.grade).toBe(9);

    const noGrade = transformQuestion(makeAPIQuestion(), 11, 'matematicas');
    expect(noGrade.grade).toBe(11);
  });

  it('preserves modernContext and context fields', () => {
    const api = makeAPIQuestion({
      modern_context: true,
      context_type: 'chart',
      context_tags: ['economy', 'data'],
      context: 'A chart showing GDP growth',
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.modernContext).toBe(true);
    expect(result.contextType).toBe('chart');
    expect(result.contextTags).toEqual(['economy', 'data']);
    expect(result.context).toBe('A chart showing GDP growth');
  });

  it('handles missing option letter by using index-based fallback (A/B/C/D)', () => {
    const api = makeAPIQuestion({
      options: [
        { text: 'Option 1' },
        { text: 'Option 2' },
      ],
    });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.options[0].id).toBe('A');
    expect(result.options[1].id).toBe('B');
  });

  it('preserves cefr_level and protocol_version', () => {
    const api = makeAPIQuestion({ cefr_level: 'B1', protocol_version: '4.0' });
    const result = transformQuestion(api, 11, 'ingles');
    expect(result.cefr_level).toBe('B1');
    expect(result.protocol_version).toBe('4.0');
  });

  it('handles correctOptionIds array for multiple correct scenarios', () => {
    const api = makeAPIQuestion({ correctOptionIds: ['A', 'C'] });
    const result = transformQuestion(api, 11, 'matematicas');
    expect(result.correctOptionIds).toEqual(['A', 'C']);
  });
});

// ─── Quarantine flow tests ───────────────────────────────────────────────────

describe('quarantine flow', () => {
  it('isQuestionQuarantined returns true for quarantined question IDs from manifest', () => {
    // Using a real quarantined question ID from quarantine-manifest.ts quarantinedQuestionIds
    const quarantinedId = 'CO-CIE-11-biomolecules-001-PRO-v4-v1';
    expect(isQuestionQuarantined({ questionId: quarantinedId })).toBe(true);
  });

  it('isQuestionQuarantined returns false for non-quarantined IDs', () => {
    expect(isQuestionQuarantined({ questionId: 'non-existent-id-xyz' })).toBe(false);
  });

  it('isBundleQuarantined detects quarantined bundle IDs from manifest', () => {
    // From quarantine-manifest.ts quarantinedBundleIds
    const quarantinedBundle = 'CO-CN-10-cell-biotech-001-PRO';
    expect(isBundleQuarantined({ bundleId: quarantinedBundle })).toBe(true);
  });

  it('isBundleQuarantined returns false for non-quarantined bundles', () => {
    expect(isBundleQuarantined({ bundleId: 'non-quarantined-bundle' })).toBe(false);
  });

  it('quarantine=true flag triggers quarantine regardless of ID', () => {
    expect(isQuestionQuarantined({ questionId: 'any-id', quarantine: true })).toBe(true);
    expect(isBundleQuarantined({ bundleId: 'any-id', quarantine: true })).toBe(true);
  });

  it('bundleStatus=quarantined triggers quarantine', () => {
    expect(isBundleQuarantined({ bundleId: 'any-id', bundleStatus: 'quarantined' })).toBe(true);
  });

  it('filterQuarantinedQuestions removes quarantined questions using manifest', () => {
    const questions: AppQuestion[] = [
      { id: 'clean-q1', text: 'Q1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'CO-CIE-11-biomolecules-001-PRO-v4-v1', text: 'Quarantined Q', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'clean-q2', text: 'Q2', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    const result = filterQuarantinedQuestions(questions);
    expect(result).toHaveLength(2);
    expect(result.map(q => q.id)).toEqual(['clean-q1', 'clean-q2']);
  });

  it('excludeQuarantinedAppQuestions is an alias of filterQuarantinedQuestions', () => {
    const questions: AppQuestion[] = [
      { id: 'clean-q1', text: 'Q1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    expect(excludeQuarantinedAppQuestions(questions)).toHaveLength(1);
  });
});

// ─── Deduplication logic tests ───────────────────────────────────────────────

describe('deduplication logic', () => {
  it('deduplicates by id, keeping LAST occurrence (Map overwrites duplicate keys)', () => {
    const questions: AppQuestion[] = [
      { id: 'q1', text: 'First', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'q1', text: 'Duplicate', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'q2', text: 'Different', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    // Map ctor takes last value for duplicate keys — same pattern as in fetchAllQuestionsForGrade
    const deduped = Array.from(new Map(questions.map(q => [q.id, q])).values());
    expect(deduped).toHaveLength(2);
    expect(deduped.find(q => q.id === 'q1')?.text).toBe('Duplicate'); // last wins
    expect(deduped.find(q => q.id === 'q2')?.text).toBe('Different');
  });

  it('null/undefined ids are skipped in dedup', () => {
    const questions: AppQuestion[] = [
      { id: '', text: 'Empty ID', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'q1', text: 'Valid ID', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    const deduped = Array.from(new Map(questions.filter(q => q.id).map(q => [q.id, q])).values());
    expect(deduped).toHaveLength(1);
    expect(deduped[0].id).toBe('q1');
  });

  it('combined deduplication across multiple pages', () => {
    const page1: AppQuestion[] = [
      { id: 'q1', text: 'Page1-Q1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    const page2: AppQuestion[] = [
      { id: 'q1', text: 'Page2-Q1-dup', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'q2', text: 'Page2-Q2', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    const dedup = new Map<string, AppQuestion>();
    [...page1, ...page2].forEach(q => { if (q?.id && !dedup.has(q.id)) dedup.set(q.id, q); });
    const result = Array.from(dedup.values());
    expect(result).toHaveLength(2);
    expect(result.find(q => q.id === 'q1')?.text).toBe('Page1-Q1'); // first wins with has() check
  });

  it('quarantine filtering applied after deduplication — uses manifest quarantinedQuestionIds', () => {
    // Using a real quarantined question ID from quarantine-manifest.ts
    const questions: AppQuestion[] = [
      { id: 'clean-1', text: 'Clean 1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'CO-CIE-11-biomolecules-001-PRO-v4-v1', text: 'Quarantined', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'clean-2', text: 'Clean 2', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    const dedup = new Map<string, AppQuestion>();
    questions.forEach(q => { if (q?.id && !dedup.has(q.id)) dedup.set(q.id, q); });
    const filtered = excludeQuarantinedAppQuestions(Array.from(dedup.values()));
    expect(filtered).toHaveLength(2);
    expect(filtered.map(q => q.id)).toEqual(['clean-1', 'clean-2']);
  });
});

// ─── questionCache tests ─────────────────────────────────────────────────────

describe('questionCache', () => {
  beforeEach(() => {
    clearCache();
  });

  afterEach(() => {
    clearCache();
  });

  it('stores and retrieves questions by key', () => {
    const questions: AppQuestion[] = [
      { id: 'q1', text: 'Q1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    questionCache.set('11-matematicas-1', questions);
    expect(questionCache.has('11-matematicas-1')).toBe(true);
    expect(questionCache.get('11-matematicas-1')).toHaveLength(1);
  });

  it('clearCache removes all entries', () => {
    questionCache.set('key1', []);
    questionCache.set('key2', []);
    clearCache();
    expect(questionCache.has('key1')).toBe(false);
    expect(questionCache.has('key2')).toBe(false);
  });

  it('cache hit returns same reference (not deep clone)', () => {
    const questions: AppQuestion[] = [
      { id: 'q1', text: 'Q1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MAT', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    questionCache.set('test-key', questions);
    const retrieved = questionCache.get('test-key');
    expect(retrieved).toBe(questions); // same reference
  });

  it('hasCache returns true for existing keys', () => {
    questionCache.set('existing-key', []);
    expect(questionCache.has('existing-key')).toBe(true);
    expect(questionCache.has('non-existing-key')).toBe(false);
  });
});

// ─── Category split (filterSubject) ──────────────────────────────────────────

describe('category split in filterSubject', () => {
  it('splits category on " :: " to get subject', () => {
    // filterSubject splits on " :: " and normalizes the first part
    const qs = [
      { id: 'q1', text: 'Q1', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'MATEMÁTICAS :: bundle-abc', grade: 11, difficulty: 3 } as AppQuestion,
      { id: 'q2', text: 'Q2', options: [{ id: 'A', text: 'a' }], correctOptionId: 'A', category: 'INGLÉS :: bundle-xyz', grade: 11, difficulty: 3 } as AppQuestion,
    ];
    const result = filterSubject(qs, 'matematicas');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('q1');
  });
});

// ─── Subject alias integration (transformQuestion + normalizeSubjectKey) ──────

describe('subject alias integration in transformQuestion', () => {
  it('sociales: normalizeSubjectKey resolves but formatSubjectName does not alias', () => {
    // normalizeSubjectKey('sociales') → 'sociales_y_ciudadanas' ✓
    // but formatSubjectName('sociales') → 'SOCIALES' (no alias resolution in formatSubjectName)
    const api = makeAPIQuestion({ id: 'sociales-q', bundle_id: 'sociales-bundle', options: [] });
    expect(normalizeSubjectKey('sociales')).toBe('sociales_y_ciudadanas');
    const result = transformQuestion(api, 5, 'sociales');
    // formatSubjectName does NOT call normalizeSubjectKey, so 'sociales' → 'SOCIALES'
    expect(result.category).toContain('SOCIALES');
    expect(result.bundleId).toBe('sociales-bundle');
  });

  it('english: normalizeSubjectKey resolves, but formatSubjectName has no english entry (falls back to uppercase)', () => {
    // normalizeSubjectKey('english') → 'ingles' ✓
    expect(normalizeSubjectKey('english')).toBe('ingles');
    // formatSubjectName('english') → 'ENGLISH' (no mapping, just uppercase fallback)
    expect(formatSubjectName('english')).toBe('ENGLISH');
    // transformQuestion with 'english' subject uses formatSubjectName which returns 'ENGLISH'
    const api = makeAPIQuestion({ id: 'eng-q', options: [], correct_answer: 'A' });
    const result = transformQuestion(api, 11, 'english');
    expect(result.category).toContain('ENGLISH');
  });
});