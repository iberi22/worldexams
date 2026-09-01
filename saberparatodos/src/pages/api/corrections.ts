import type { APIRoute } from 'astro';
import {
  createCorrection,
  reviewCorrection,
  getCorrection,
  listCorrectionsByQuestion,
  listAllCorrections,
  isCorrectionErrorType,
} from '../../lib/corrections';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// In-memory rate limiting (20 requests per minute per client IP)
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

function clientIp(req: Request): string {
  return req.headers.get('cf-connecting-ip')?.trim() || '127.0.0.1';
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

/**
 * GET /api/corrections
 * Query params:
 *  - id: specific correction report by ID
 *  - question_id / questionId: list reports for a question
 *  - status: optional status filter ('draft', 'reviewing', 'approved', 'rejected')
 */
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const questionId = url.searchParams.get('question_id') || url.searchParams.get('questionId');
    const id = url.searchParams.get('id');
    const statusFilter = url.searchParams.get('status');

    if (id) {
      const single = await getCorrection(id);
      if (!single) return json({ error: 'Correction not found' }, 404);
      return json({ success: true, report: single });
    }

    if (questionId) {
      let reports = await listCorrectionsByQuestion(questionId);
      if (statusFilter) {
        reports = reports.filter((r) => r.status === statusFilter);
      }
      return json({ success: true, reports, count: reports.length });
    }

    let all = await listAllCorrections();
    if (statusFilter) {
      all = all.filter((r) => r.status === statusFilter);
    }
    return json({ success: true, reports: all, count: all.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return json({ error: msg }, 500);
  }
};

/**
 * POST /api/corrections
 * Draft creation endpoint for question corrections.
 * Body requirements:
 *  - question_id (string, required FK)
 *  - question_bundle_path (string, required)
 *  - error_type ('error_factual' | 'error_format' | 'error_distractor' | 'other')
 *  - description (string, 100 to 1000 chars required)
 *  - reporter_node_hash (string, required)
 */
export const POST: APIRoute = async ({ request, url }) => {
  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return json({ error: 'Rate limit exceeded. Please wait a minute before sending more requests.' }, 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // Support path routing /api/corrections/<id>/review or body with vote
  const pathname = url.pathname || new URL(request.url).pathname;
  const reviewMatch = pathname.match(/\/api\/corrections\/([^/]+)\/review\/?$/);
  if (reviewMatch || (body && body.vote && (body.id || body.correction_id))) {
    const correctionId = reviewMatch
      ? decodeURIComponent(reviewMatch[1])
      : String(body.id || body.correction_id);
    return handleReviewRequest(correctionId, body);
  }

  const question_id = String(body.question_id || body.questionId || '').trim();
  const question_bundle_path = String(body.question_bundle_path || body.bundle_path || '').trim();
  const error_type = String(body.error_type || '').trim();
  const description = String(body.description || '').trim();
  const reporter_node_hash = String(body.reporter_node_hash || body.reporter || '').trim();

  if (!question_id) return json({ error: 'question_id is required' }, 400);
  if (!question_bundle_path) return json({ error: 'question_bundle_path is required' }, 400);
  if (!error_type || !isCorrectionErrorType(error_type)) {
    return json({ error: 'Invalid error_type (must be error_factual|error_format|error_distractor|other)' }, 400);
  }
  if (!description) return json({ error: 'description is required' }, 400);
  if (description.length < 100 || description.length > 1000) {
    return json({ error: `Description must be between 100 and 1000 characters (got ${description.length})` }, 400);
  }
  if (!reporter_node_hash) return json({ error: 'reporter_node_hash is required' }, 400);

  try {
    const report = await createCorrection({
      question_id,
      question_bundle_path,
      error_type: error_type as any,
      description,
      reporter_node_hash,
      original_content: body.original_content,
      proposed_content: body.proposed_content,
    });
    return json({ success: true, report }, 201);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error creating correction report';
    return json({ error: msg }, 400);
  }
};

/**
 * PATCH /api/corrections
 * Review endpoint for approving or rejecting correction proposals.
 * Body parameters:
 *  - id or correction_id (string, required)
 *  - reviewer_node_hash (string, required)
 *  - vote ('approve' | 'reject', required)
 *  - comment (string, optional)
 */
export const PATCH: APIRoute = async ({ request }) => {
  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return json({ error: 'Rate limit exceeded. Please wait a minute.' }, 429);
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const correctionId = String(body.id || body.correction_id || '').trim();
  if (!correctionId) {
    return json({ error: 'Correction id or correction_id is required' }, 400);
  }

  return handleReviewRequest(correctionId, body);
};

async function handleReviewRequest(correctionId: string, body: any) {
  const reviewer_node_hash = String(body.reviewer_node_hash || body.reviewer || '').trim();
  const vote = String(body.vote || '').trim() as 'approve' | 'reject';
  const comment = String(body.comment || '').trim();
  const bundlePathHint = body.question_bundle_path ? String(body.question_bundle_path) : undefined;

  if (!reviewer_node_hash) return json({ error: 'reviewer_node_hash is required' }, 400);
  if (vote !== 'approve' && vote !== 'reject') return json({ error: 'vote must be approve or reject' }, 400);

  try {
    const updated = await reviewCorrection(
      correctionId,
      { reviewer_node_hash, vote, comment },
      bundlePathHint
    );
    return json({ success: true, report: updated }, 200);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error reviewing correction';
    const status = msg.includes('not found') ? 404 : 400;
    return json({ error: msg }, status);
  }
}

export const ALL: APIRoute = async (ctx) => {
  const method = ctx.request.method;
  if (method === 'GET') return GET(ctx);
  if (method === 'POST') return POST(ctx);
  if (method === 'PATCH') return PATCH(ctx);
  if (method === 'OPTIONS') return OPTIONS(ctx);
  return json({ error: 'Method not allowed' }, 405);
};
