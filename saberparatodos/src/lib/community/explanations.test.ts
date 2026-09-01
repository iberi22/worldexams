import { describe, expect, it, vi } from 'vitest';
import {
  CreateExplanationSchema,
  GetExplanationsQuerySchema,
  VoteExplanationSchema,
  createExplanation,
  getApprovedExplanations,
  hasNoEmailPII,
  voteExplanation,
} from './explanations';

// Mock Supabase Client helper
function createMockSupabaseClient(overrides: Record<string, unknown> = {}) {
  const mockSelect = vi.fn().mockReturnThis();
  const mockEq = vi.fn().mockReturnThis();
  const mockOrder = vi.fn().mockReturnThis();
  const mockLimit = vi.fn().mockResolvedValue({
    data: overrides.listData ?? [
      {
        id: 'exp-1',
        question_id: 'q123',
        author_hash: 'node-hash-abc',
        content: 'A'.repeat(250),
        vote_count: 5,
        status: 'published',
        created_at: new Date().toISOString(),
      },
    ],
    error: null,
  });

  const mockInsert = vi.fn().mockReturnThis();
  const mockSingle = vi.fn().mockImplementation(() => {
    if (overrides.singleError) {
      return Promise.resolve({ data: null, error: overrides.singleError });
    }
    return Promise.resolve({
      data: overrides.singleData ?? {
        id: 'exp-new-1',
        question_id: 'q123',
        author_hash: 'author-hash-1',
        content: 'B'.repeat(250),
        vote_count: 0,
        status: 'published',
      },
      error: null,
    });
  });

  return {
    from: vi.fn().mockReturnValue({
      select: mockSelect,
      eq: mockEq,
      order: mockOrder,
      limit: mockLimit,
      insert: mockInsert,
      single: mockSingle,
    }),
  } as unknown as Parameters<typeof getApprovedExplanations>[0];
}

describe('Community Explanations Lib', () => {
  it('case 1: validates and creates a valid explanation (200-2000 chars)', async () => {
    const validContent = 'Esta es una explicación detallada sobre el problema matemático ' + 'x'.repeat(200);
    const payload = {
      question_id: 'q123',
      content: validContent,
      author_hash: 'node_author_123',
    };

    const parsed = CreateExplanationSchema.safeParse(payload);
    expect(parsed.success).toBe(true);

    const mockSupabase = createMockSupabaseClient();
    const result = await createExplanation(mockSupabase, payload);

    expect(result.error).toBeNull();
    expect(result.data).toBeDefined();
    expect(result.data?.question_id).toBe('q123');
  });

  it('case 2: rejects explanations containing email PII or invalid length', async () => {
    const piiContent = 'Contactame en usuario@ejemplo.com para resolver este problema. ' + 'a'.repeat(200);
    expect(hasNoEmailPII(piiContent)).toBe(false);

    const piiParsed = CreateExplanationSchema.safeParse({
      question_id: 'q123',
      content: piiContent,
      author_hash: 'node_author_123',
    });
    expect(piiParsed.success).toBe(false);

    const shortContent = 'Demasiado corto';
    const shortParsed = CreateExplanationSchema.safeParse({
      question_id: 'q123',
      content: shortContent,
      author_hash: 'node_author_123',
    });
    expect(shortParsed.success).toBe(false);
  });

  it('case 3: lists approved/published explanations by question_id', async () => {
    const mockSupabase = createMockSupabaseClient();
    const result = await getApprovedExplanations(mockSupabase, 'q123');

    expect(result.error).toBeNull();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data?.length).toBeGreaterThan(0);
    expect(result.data?.[0].status).toBe('published');
  });

  it('case 4: votes (+1 / -1) and detects duplicate vote error', async () => {
    const votePayload = {
      explanation_id: 'exp-123',
      author_hash: 'voter-hash-456',
      vote: 1 as const,
      signature: 'sig-789',
    };

    const parsed = VoteExplanationSchema.safeParse(votePayload);
    expect(parsed.success).toBe(true);

    const mockSupabaseSuccess = createMockSupabaseClient({
      singleData: { id: 'vote-1', explanation_id: 'exp-123', vote: 1 },
    });
    const successResult = await voteExplanation(mockSupabaseSuccess, votePayload);
    expect(successResult.error).toBeNull();

    const mockSupabaseDuplicate = createMockSupabaseClient({
      singleError: { message: 'duplicate key value violates unique constraint' },
    });
    const duplicateResult = await voteExplanation(mockSupabaseDuplicate, votePayload);
    expect(duplicateResult.error).toBeDefined();
  });
});
