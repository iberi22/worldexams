import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';

// Regex for detecting email addresses (PII rejection)
export const EMAIL_PII_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/**
 * Validates that string does not contain PII like email addresses.
 */
export function hasNoEmailPII(text: string): boolean {
  return !EMAIL_PII_REGEX.test(text);
}

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

export const GetExplanationsQuerySchema = z.object({
  question_id: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_\-]+$/),
});

export const CreateExplanationSchema = z.object({
  question_id: z.string().min(1).max(200).regex(/^[a-zA-Z0-9_\-]+$/),
  content: z
    .string()
    .min(200, 'Content must be at least 200 characters long')
    .max(2000, 'Content cannot exceed 2000 characters')
    .refine(hasNoEmailPII, {
      message: 'Content contains personal email address (PII forbidden)',
    }),
  author_hash: z.string().min(1).max(256),
});

export const VoteExplanationSchema = z.object({
  explanation_id: z.string().min(1).max(256),
  author_hash: z.string().min(1).max(256),
  vote: z.union([z.literal(1), z.literal(-1)]),
  signature: z.string().optional(),
});

export type CreateExplanationInput = z.infer<typeof CreateExplanationSchema>;
export type VoteExplanationInput = z.infer<typeof VoteExplanationSchema>;

// ---------------------------------------------------------------------------
// Supabase Service Queries
// ---------------------------------------------------------------------------

export interface ExplanationRecord {
  id: string;
  question_id: string;
  author_hash: string;
  node_hash?: string;
  content: string;
  vote_count: number;
  status: 'published' | 'draft' | 'flagged';
  created_at: string;
}

/**
 * Fetch list of published community explanations for a question.
 */
export async function getApprovedExplanations(
  supabase: SupabaseClient,
  questionId: string
): Promise<{ data: ExplanationRecord[] | null; error: unknown }> {
  const parsed = GetExplanationsQuerySchema.safeParse({ question_id: questionId });
  if (!parsed.success) {
    return { data: null, error: parsed.error };
  }

  const { data, error } = await supabase
    .from('community_explanations')
    .select('id, question_id, author_hash, node_hash, content, vote_count, status, created_at')
    .eq('question_id', parsed.data.question_id)
    .eq('status', 'published')
    .order('vote_count', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(10);

  return { data: data as ExplanationRecord[] | null, error };
}

/**
 * Create a new community explanation.
 */
export async function createExplanation(
  supabase: SupabaseClient,
  input: unknown
): Promise<{ data: ExplanationRecord | null; error: unknown }> {
  const parsed = CreateExplanationSchema.safeParse(input);
  if (!parsed.success) {
    return { data: null, error: parsed.error };
  }

  const { question_id, content, author_hash } = parsed.data;

  const { data, error } = await supabase
    .from('community_explanations')
    .insert([
      {
        question_id,
        author_hash,
        node_hash: author_hash,
        content,
        status: 'published',
        vote_count: 0,
      },
    ])
    .select()
    .single();

  return { data: data as ExplanationRecord | null, error };
}

/**
 * Vote on a community explanation (+1 or -1).
 */
export async function voteExplanation(
  supabase: SupabaseClient,
  input: unknown
): Promise<{ data: unknown | null; error: unknown }> {
  const parsed = VoteExplanationSchema.safeParse(input);
  if (!parsed.success) {
    return { data: null, error: parsed.error };
  }

  const { explanation_id, author_hash, vote, signature } = parsed.data;

  // Check if target explanation exists
  const { data: explanation, error: fetchErr } = await supabase
    .from('community_explanations')
    .select('id, vote_count')
    .eq('id', explanation_id)
    .single();

  if (fetchErr || !explanation) {
    return { data: null, error: fetchErr ?? new Error('Explanation not found') };
  }

  // Insert vote into community_votes table
  const { data: voteRecord, error: insertErr } = await supabase
    .from('community_votes')
    .insert([
      {
        explanation_id,
        voter_node_hash: author_hash,
        author_hash,
        vote,
        signature: signature ?? 'unsigned',
      },
    ])
    .select()
    .single();

  if (insertErr) {
    return { data: null, error: insertErr };
  }

  return { data: voteRecord, error: null };
}
