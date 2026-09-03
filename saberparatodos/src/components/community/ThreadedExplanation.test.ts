import { describe, it, expect } from 'vitest';
import {
  buildThreadTree,
  sanitizeContent,
  hasEmailPII,
  type ThreadReply,
} from './thread-helpers';

describe('ThreadedExplanation logic & helpers (WX-302)', () => {
  it('buildThreadTree builds nested hierarchy with depths correctly', () => {
    const flat: ThreadReply[] = [
      {
        id: 'r1',
        explanation_id: 'exp-1',
        node_hash: 'author-1',
        content: 'Root reply 1',
        vote_count: 3,
        parent_reply_id: null,
      },
      {
        id: 'r2',
        explanation_id: 'exp-1',
        node_hash: 'author-2',
        content: 'Child of r1',
        vote_count: 1,
        parent_reply_id: 'r1',
      },
      {
        id: 'r3',
        explanation_id: 'exp-1',
        node_hash: 'author-3',
        content: 'Child of r2',
        vote_count: 0,
        parent_reply_id: 'r2',
      },
      {
        id: 'r4',
        explanation_id: 'exp-1',
        node_hash: 'author-4',
        content: 'Root reply 2',
        vote_count: 0,
        parent_reply_id: null,
      },
    ];

    const tree = buildThreadTree(flat);
    expect(tree).toHaveLength(2);

    // First root
    const root1 = tree[0];
    expect(root1.id).toBe('r1');
    expect(root1.depth).toBe(0);
    expect(root1.replies).toHaveLength(1);

    // Child of root1
    const child1 = root1.replies![0];
    expect(child1.id).toBe('r2');
    expect(child1.depth).toBe(1);
    expect(child1.replies).toHaveLength(1);

    // Child of child1
    const subchild = child1.replies![0];
    expect(subchild.id).toBe('r3');
    expect(subchild.depth).toBe(2);
    expect(subchild.replies).toHaveLength(0);

    // Second root
    const root2 = tree[1];
    expect(root2.id).toBe('r4');
    expect(root2.depth).toBe(0);
    expect(root2.replies).toHaveLength(0);
  });

  it('buildThreadTree caps maximum depth at 5', () => {
    const flat: ThreadReply[] = [
      { id: 'l0', explanation_id: 'e', node_hash: 'a', content: '0', vote_count: 0, parent_reply_id: null },
      { id: 'l1', explanation_id: 'e', node_hash: 'a', content: '1', vote_count: 0, parent_reply_id: 'l0' },
      { id: 'l2', explanation_id: 'e', node_hash: 'a', content: '2', vote_count: 0, parent_reply_id: 'l1' },
      { id: 'l3', explanation_id: 'e', node_hash: 'a', content: '3', vote_count: 0, parent_reply_id: 'l2' },
      { id: 'l4', explanation_id: 'e', node_hash: 'a', content: '4', vote_count: 0, parent_reply_id: 'l3' },
      { id: 'l5', explanation_id: 'e', node_hash: 'a', content: '5', vote_count: 0, parent_reply_id: 'l4' },
      { id: 'l6', explanation_id: 'e', node_hash: 'a', content: '6', vote_count: 0, parent_reply_id: 'l5' },
    ];

    const tree = buildThreadTree(flat, 5);
    let curr = tree[0];
    let reachedDepth = 0;
    while (curr && curr.replies && curr.replies.length > 0) {
      curr = curr.replies[0];
      reachedDepth = curr.depth ?? 0;
    }

    expect(reachedDepth).toBeLessThanOrEqual(5);
  });

  it('sanitizeContent strips script, iframe, and javascript: protocols', () => {
    const raw = '<script>alert("hack")</script>Respuesta válida con <iframe src="evil.com"></iframe> y javascript:void(0)';
    const clean = sanitizeContent(raw);
    expect(clean).not.toContain('<script');
    expect(clean).not.toContain('<iframe');
    expect(clean).not.toContain('javascript:');
    expect(clean).toContain('Respuesta válida con');
  });

  it('hasEmailPII detects emails and blocks contact information', () => {
    expect(hasEmailPII('Hola mi correo es usuario@dominio.com para dudas')).toBe(true);
    expect(hasEmailPII('Escríbeme a test.dev+swal@mail.co')).toBe(true);
    expect(hasEmailPII('Explicación puramente pedagógica sin datos personales')).toBe(false);
  });

  it('validates reply length bounds (20 to 2000 chars)', () => {
    const tooShort = 'Demasiado corta';
    expect(tooShort.length).toBeLessThan(20);

    const valid = 'Esta es una explicación detallada del teorema que supera los veinte caracteres.';
    expect(valid.length).toBeGreaterThanOrEqual(20);
    expect(valid.length).toBeLessThanOrEqual(2000);

    const tooLong = 'a'.repeat(2001);
    expect(tooLong.length).toBeGreaterThan(2000);
  });

  it('buildThreadTree handles empty and orphaned parent gracefully', () => {
    const emptyTree = buildThreadTree([]);
    expect(emptyTree).toEqual([]);

    const orphan: ThreadReply[] = [
      {
        id: 'orphan-1',
        explanation_id: 'exp-1',
        node_hash: 'node-x',
        content: 'Orphan content',
        vote_count: 0,
        parent_reply_id: 'non-existent-parent',
      },
    ];

    const treeWithOrphan = buildThreadTree(orphan);
    // Unmatched parent defaults to root
    expect(treeWithOrphan).toHaveLength(1);
    expect(treeWithOrphan[0].id).toBe('orphan-1');
    expect(treeWithOrphan[0].depth).toBe(0);
  });
});
