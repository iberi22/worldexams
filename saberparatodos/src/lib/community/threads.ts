/**
 * WX-302 — Community Threads: parent_id + depth, getThread, addReply
 * KISS: 1 lib, reuse community_explanations table + RLS + sanitize 20-2000 chars
 */
import { hasNoEmailPII } from './explanations';
import type { SupabaseClient } from '@supabase/supabase-js';

function sanitizeContent(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let out = input;
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '');
  out = out.replace(/javascript\s*:/gi, '');
  return out.trim();
}

export interface ThreadNode {
  id: string;
  question_id: string;
  author_hash: string;
  body_md: string;
  parent_id: string | null;
  depth: number;
  votes: number;
  is_approved: boolean;
  created_at: string;
  replies?: ThreadNode[];
}

export async function getThread(
  supabase: SupabaseClient,
  questionId: string
): Promise<{ data: ThreadNode[] | null; error: unknown }> {
  const { data, error } = await supabase
    .from('community_explanations')
    .select('id, question_id, author_hash, body_md, parent_id, depth, votes, is_approved, created_at')
    .eq('question_id', questionId)
    .eq('is_approved', true)
    .order('created_at', { ascending: true })
    .limit(50);
  if (error) return { data: null, error };
  // Build tree: parent_id null = root, else nested
  const map = new Map<string, ThreadNode>();
  const roots: ThreadNode[] = [];
  for (const r of (data as ThreadNode[])) {
    map.set(r.id, { ...r, replies: [] });
  }
  for (const n of map.values()) {
    if (n.parent_id && map.has(n.parent_id)) {
      map.get(n.parent_id)!.replies!.push(n);
    } else if (!n.parent_id) {
      roots.push(n);
    }
  }
  return { data: roots, error: null };
}

export async function addReply(
  supabase: SupabaseClient,
  input: { question_id: string; parent_id: string; author_hash: string; body_md: string }
): Promise<{ data: ThreadNode | null; error: unknown }> {
  if (!hasNoEmailPII(input.body_md)) return { data: null, error: new Error('PII forbidden') };
  const sanitized = sanitizeContent(input.body_md);
  if (sanitized.length < 20 || sanitized.length > 2000) return { data: null, error: new Error('body_md 20-2000 chars') };
  // Fetch parent to compute depth
  const { data: parent, error: pErr } = await supabase.from('community_explanations').select('depth').eq('id', input.parent_id).single();
  if (pErr || !parent) return { data: null, error: pErr ?? new Error('parent not found') };
  const depth = Math.min((parent as { depth: number }).depth + 1, 5);
  const { data, error } = await supabase
    .from('community_explanations')
    .insert([{ question_id: input.question_id, author_hash: input.author_hash, body_md: sanitized, parent_id: input.parent_id, depth, is_approved: false, votes: 0 }])
    .select()
    .single();
  return { data: data as ThreadNode | null, error };
}
