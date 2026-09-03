/**
 * WX-302 Community Threading Helper functions
 */

export interface ThreadReply {
  id: string;
  explanation_id: string;
  node_hash: string;
  content: string;
  vote_count: number;
  parent_reply_id?: string | null;
  created_at?: string;
  depth?: number;
  replies?: ThreadReply[];
}

export function buildThreadTree(flatReplies: ThreadReply[], maxDepth = 5): ThreadReply[] {
  const map = new Map<string, ThreadReply>();
  const roots: ThreadReply[] = [];

  for (const r of flatReplies) {
    map.set(r.id, { ...r, depth: 0, replies: [] });
  }

  for (const item of map.values()) {
    if (item.parent_reply_id && map.has(item.parent_reply_id)) {
      const parent = map.get(item.parent_reply_id)!;
      const assignedDepth = Math.min((parent.depth ?? 0) + 1, maxDepth);
      item.depth = assignedDepth;
      if (!parent.replies) parent.replies = [];
      parent.replies.push(item);
    } else {
      item.depth = 0;
      roots.push(item);
    }
  }

  return roots;
}

export function sanitizeContent(input: string): string {
  if (!input || typeof input !== 'string') return '';
  let out = input;
  out = out.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe\s*>/gi, '');
  out = out.replace(/<object\b[^>]*>[\s\S]*?<\/object\s*>/gi, '');
  out = out.replace(/javascript\s*:/gi, '');
  return out.trim();
}

export function hasEmailPII(text: string): boolean {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  return emailRegex.test(text);
}
