import { describe, it, expect, beforeEach, vi } from 'vitest';
import { sanitizeContent, checkRateLimit, clearRateLimit, rateLimitMap } from '../../saberparatodos/src/pages/api/explanations';

// WX-203: tests capa 2 - espejo para isla `tests/api` (root)
// Mantener sincronizado con saberparatodos/tests/unit/community-explanations.spec.ts

describe('WX-203 community_explanations sanitization (root mirror)', () => {
  it('elimina HTML peligroso (script, iframe, on* handlers, javascript:)', () => {
    const dirty = `<p>Hola</p><script>alert('xss')</script><iframe src="evil.com"></iframe><div onclick="alert(1)">click</div><a href="javascript:alert(1)">link</a>`;
    const clean = sanitizeContent(dirty);
    expect(clean).not.toContain('<script');
    expect(clean).not.toContain('</script>');
    expect(clean).not.toContain('<iframe');
    expect(clean).not.toContain('onclick');
    expect(clean).not.toContain('javascript:');
    expect(clean).toContain('Hola');
  });

  it('elimina embed/object/style y data:text/html', () => {
    const dirty = `<object data="evil.swf"></object><embed src="x"><style>body{}</style> data:text/html base64`;
    const clean = sanitizeContent(dirty);
    expect(clean).not.toContain('<object');
    expect(clean).not.toContain('<embed');
    expect(clean).not.toContain('<style');
    expect(clean).not.toContain('data:text/html');
  });
});

describe('WX-203 rate-limit 1/60s por node_hash (root mirror)', () => {
  beforeEach(() => clearRateLimit());

  it('permite primera creación y bloquea segunda dentro de ventana', () => {
    const node = 'nodehash-test-123-root';
    expect(checkRateLimit(node)).toBe(true);
    expect(checkRateLimit(node)).toBe(false);
  });

  it('permite tras expirar ventana (simulado)', () => {
    const node = 'nodehash-window-root';
    expect(checkRateLimit(node)).toBe(true);
    const entry = rateLimitMap.get(node);
    if (entry) entry.lastAt = Date.now() - 61 * 1000;
    expect(checkRateLimit(node)).toBe(true);
  });
});

const mockExplanations: Array<{ id: string; question_id: string; node_hash: string; content: string; vote_count: number; status: string; created_at: string }> = [];
const mockVotes: Array<{ explanation_id: string; voter_node_hash: string; vote: number; signature: string }> = [];

function resetMocks() {
  mockExplanations.length = 0;
  mockVotes.length = 0;
}

function createMockSupabase() {
  return {
    from: (table: string) => {
      if (table === 'community_explanations') {
        return {
          select: (_cols?: string) => ({
            eq: (col: string, val: unknown) => ({
              eq: (col2: string, val2: unknown) => ({
                order: (_col: string, _opts: unknown) => ({
                  order: (_col2: string, _opts2: unknown) => ({
                    limit: async (_n: number) => {
                      const filtered = mockExplanations.filter(
                        (e) => e.question_id === val && e.status === val2
                      ).sort((a, b) => b.vote_count - a.vote_count).slice(0, 10);
                      return { data: filtered, error: null };
                    },
                  }),
                }),
              }),
              single: async () => {
                const found = mockExplanations.find((e) => e.id === val);
                if (!found) return { data: null, error: { message: 'not found' } };
                return { data: found, error: null };
              },
            }),
          }),
          insert: (rows: Array<Record<string, unknown>>) => ({
            select: () => ({
              single: async () => {
                const row = rows[0] as Record<string, unknown>;
                const id = crypto.randomUUID();
                const newExp = {
                  id,
                  question_id: String(row.question_id),
                  node_hash: String(row.node_hash),
                  content: String(row.content),
                  vote_count: Number(row.vote_count ?? 0),
                  status: String(row.status ?? 'draft'),
                  created_at: new Date().toISOString(),
                };
                mockExplanations.push(newExp);
                return { data: newExp, error: null };
              },
            }),
          }),
        } as unknown as ReturnType<typeof createMockSupabase>['from'];
      }
      if (table === 'community_votes') {
        return {
          insert: (rows: Array<Record<string, unknown>>) => ({
            select: () => ({
              single: async () => {
                const row = rows[0] as Record<string, unknown>;
                const exists = mockVotes.find(
                  (v) => v.explanation_id === row.explanation_id && v.voter_node_hash === row.voter_node_hash
                );
                if (exists) {
                  return { data: null, error: { message: 'duplicate key value violates unique constraint "community_votes_explanation_id_voter_node_hash_key"' } };
                }
                mockVotes.push({
                  explanation_id: String(row.explanation_id),
                  voter_node_hash: String(row.voter_node_hash),
                  vote: Number(row.vote),
                  signature: String(row.signature),
                });
                const exp = mockExplanations.find((e) => e.id === row.explanation_id);
                if (exp) exp.vote_count += Number(row.vote);
                return { data: rows[0], error: null };
              },
            }),
          }),
        } as unknown as ReturnType<typeof createMockSupabase>['from'];
      }
      return {
        select: () => ({ eq: () => ({ eq: () => ({ order: () => ({ order: () => ({ limit: async () => ({ data: [], error: null }) }) }) }), single: async () => ({ data: null, error: null }) }) }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }),
      } as unknown as ReturnType<typeof createMockSupabase>['from'];
    },
  };
}

vi.mock('../../saberparatodos/src/lib/server-runtime', async () => {
  const actual = await vi.importActual<typeof import('../../saberparatodos/src/lib/server-runtime')>('../../saberparatodos/src/lib/server-runtime');
  return {
    ...actual,
    getServerRuntimeEnv: () => ({ supabaseUrl: 'http://mock', anonKey: 'mock', serviceRoleKey: 'mock', siteUrl: '', telegramBotToken: '', telegramChatId: '', telegramModerationSecret: '' }),
    createServerSupabaseClient: () => createMockSupabase(),
    createAdminSupabaseClient: () => createMockSupabase(),
  };
});

describe('WX-203 endpoint explanations (mock supabase) root', () => {
  beforeEach(() => {
    resetMocks();
    clearRateLimit();
  });

  it('GET retorna lista vacía al inicio', async () => {
    const { GET } = await import('../../saberparatodos/src/pages/api/explanations');
    const url = new URL('http://localhost/api/explanations?question_id=CO-MAT-6-test');
    const res = await GET({ url, locals: {} } as unknown as Parameters<typeof GET>[0]);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.explanations).toEqual([]);
  });

  it('POST crea explanation', async () => {
    const { POST } = await import('../../saberparatodos/src/pages/api/explanations');
    const body = {
      question_id: 'CO-MAT-6-test',
      content: 'Explicación <script>alert(1)</script> válida de fracciones',
      node_hash: 'node-abc-123-root',
    };
    const request = new Request('http://localhost/api/explanations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const res = await POST({ request, locals: {}, url: new URL('http://localhost/api/explanations') } as unknown as Parameters<typeof POST>[0]);
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.explanation.question_id).toBe('CO-MAT-6-test');
    expect(json.explanation.content).not.toContain('<script');
    expect(json.explanation.status).toBe('draft');
    expect(mockExplanations.length).toBe(1);
  });

  it('POST voto incrementa vote_count', async () => {
    const { POST } = await import('../../saberparatodos/src/pages/api/explanations');
    const createReq = new Request('http://localhost/api/explanations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: 'CO-MAT-6-vote', content: 'contenido', node_hash: 'node-creator-root' }),
    });
    const createRes = await POST({ request: createReq, locals: {}, url: new URL('http://localhost/api/explanations') } as unknown as Parameters<typeof POST>[0]);
    const created = await createRes.json();
    const expId: string = created.explanation.id;
    const exp = mockExplanations.find((e) => e.id === expId);
    if (exp) exp.status = 'published';
    const voteBody = {
      explanation_id: expId,
      voter_node_hash: 'voter-xyz-root',
      vote: 1,
      signature: 'ML-DSA-65-placeholder-signature',
    };
    const voteReq = new Request('http://localhost/api/explanations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteBody),
    });
    const voteRes = await POST({ request: voteReq, locals: {}, url: new URL('http://localhost/api/explanations?action=vote') } as unknown as Parameters<typeof POST>[0]);
    expect(voteRes.status).toBe(201);
    const voteJson = await voteRes.json();
    expect(voteJson.success).toBe(true);
    expect(voteJson.vote_count).toBe(1);
    expect(exp?.vote_count).toBe(1);
  });

  it('Sin duplicados de voto por mismo voter_node_hash', async () => {
    const { POST } = await import('../../saberparatodos/src/pages/api/explanations');
    const createReq = new Request('http://localhost/api/explanations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: 'CO-MAT-6-dup', content: 'dup test', node_hash: 'node-dup-creator-root' }),
    });
    const createRes = await POST({ request: createReq, locals: {}, url: new URL('http://localhost/api/explanations') } as unknown as Parameters<typeof POST>[0]);
    const created = await createRes.json();
    const expId: string = created.explanation.id;
    const voteBody = {
      explanation_id: expId,
      voter_node_hash: 'voter-dup-root',
      vote: 1,
      signature: 'sig-dup',
    };
    const req1 = new Request('http://localhost/api/explanations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteBody),
    });
    const res1 = await POST({ request: req1, locals: {}, url: new URL('http://localhost/api/explanations') } as unknown as Parameters<typeof POST>[0]);
    expect(res1.status).toBe(201);
    const req2 = new Request('http://localhost/api/explanations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteBody),
    });
    const res2 = await POST({ request: req2, locals: {}, url: new URL('http://localhost/api/explanations') } as unknown as Parameters<typeof POST>[0]);
    expect(res2.status).toBe(409);
    const json2 = await res2.json();
    expect(json2.error).toMatch(/duplicado/i);
  });
});
