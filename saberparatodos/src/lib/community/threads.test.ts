import { describe, it, expect, vi } from 'vitest';
import { getThread, addReply } from './threads';

// Mock supabase
function mockSupa(rows: any[] = []) {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          eq: () => ({
            order: () => ({
              order: () => ({
                limit: async () => ({ data: rows, error: null }),
              }),
            }),
          }),
          single: async () => ({ data: { depth: 0 }, error: null }),
        }),
        order: () => ({ limit: async () => ({ data: rows, error: null }) }),
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ data: { id: 'new-id', ...rows[0] }, error: null }),
        }),
      }),
    }),
  } as any;
}

describe('WX-302 threads', () => {
  it('getThread builds tree from flat rows', async () => {
    const rows = [
      { id: '1', question_id: 'Q1', author_hash: 'a', body_md: 'root', parent_id: null, depth: 0, votes: 2, is_approved: true, created_at: '2026-01-01' },
      { id: '2', question_id: 'Q1', author_hash: 'b', body_md: 'reply', parent_id: '1', depth: 1, votes: 0, is_approved: true, created_at: '2026-01-02' },
    ];
    const mock = {
      from: () => ({
        select: () => ({
          eq: () => ({
            eq: () => ({
              order: () => ({
                limit: async () => ({ data: rows, error: null }),
              }),
            }),
          }),
        }),
      }),
    } as any;
    const { data } = await getThread(mock, 'Q1');
    expect(data).toHaveLength(1);
    expect(data![0].replies).toHaveLength(1);
    expect(data![0].replies![0].id).toBe('2');
  });

  it('addReply sanitizes <script> and validates PII', async () => {
    const mock = {
      from: (table: string) => {
        if (table === 'community_explanations') {
          return {
            select: () => ({ eq: () => ({ single: async () => ({ data: { depth: 0 }, error: null }) }) }),
            insert: (rows: any[]) => ({
              select: () => ({
                single: async () => ({ data: { id: 'new', ...rows[0] }, error: null }),
              }),
            }),
          } as any;
        }
        return {} as any;
      },
    } as any;
    const { data, error } = await addReply(mock, { question_id: 'Q1', parent_id: '1', author_hash: 'a', body_md: 'Hola <script>alert(1)</script> '.repeat(10) });
    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data!.body_md).not.toContain('<script');
  });

  it('addReply rejects PII email', async () => {
    const mock = mockSupa();
    const { error } = await addReply(mock as any, { question_id: 'Q1', parent_id: '1', author_hash: 'a', body_md: 'mi email es test@example.com '.repeat(10) });
    expect(error).toBeTruthy();
  });
});
