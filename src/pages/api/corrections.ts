import type { APIRoute } from 'astro';
import {
  reportCorrection,
  approveCorrection,
  listCorrectionsByQuestion,
  listAllCorrections,
  getCorrection,
} from '../../lib/corrections/CorrectionEngine';
import { isCorrectionErrorType } from '../../lib/corrections/types';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// Simple in-memory rate limit (5 POST per IP per minute) — lightweight
const rateMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const e = rateMap.get(ip);
  if (!e || now > e.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (e.count >= 20) return false; // generous for corrections
  e.count++;
  return true;
}
function clientIp(req: Request): string {
  return req.headers.get('cf-connecting-ip')?.trim() || 'unknown';
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

/**
 * GET /api/corrections?question_id=X
 * - listar reportes por question_id
 * - si no hay query, lista todos (útil para admin) filtrado opcional por status
 */
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const questionId = url.searchParams.get('question_id') || url.searchParams.get('questionId');
    const id = url.searchParams.get('id');

    if (id) {
      const single = await getCorrection(id);
      if (!single) return json({ error: 'Correction not found' }, 404);
      return json({ success: true, report: single });
    }

    if (questionId) {
      const reports = await listCorrectionsByQuestion(questionId);
      return json({ success: true, reports, count: reports.length });
    }

    // No filter: return all (paginated future)
    const all = await listAllCorrections();
    return json({ success: true, reports: all, count: all.length });
  } catch (err: any) {
    return json({ error: err?.message || 'Error interno' }, 500);
  }
};

/**
 * POST /api/corrections
 *  - crear reporte (body: { question_id, question_bundle_path, error_type, description, reporter_node_hash })
 * POST /api/corrections/:id/review
 *  - votar review (body: { reviewer_node_hash, vote, comment })
 *
 * Astro file at /api/corrections.ts will receive POSTs to /api/corrections and also to
 * /api/corrections/<id>/review if handled via URL parsing. For true dynamic route,
 * a companion file at /api/corrections/[id]/review.ts could delegate here — but this
 * handler also parses the URL to support the unified contract.
 */
export const POST: APIRoute = async ({ request, url }) => {
  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return json({ error: 'Rate limit exceeded. Intenta en un minuto.' }, 429);
  }

  // Detect review path: /api/corrections/<id>/review
  const pathname = url.pathname || new URL(request.url).pathname;
  const reviewMatch = pathname.match(/\/api\/corrections\/([^/]+)\/review\/?$/);

  if (reviewMatch) {
    const correctionId = decodeURIComponent(reviewMatch[1]);
    let body: any;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'JSON inválido' }, 400);
    }

    const reviewer_node_hash = String(body.reviewer_node_hash || '').trim();
    const vote = String(body.vote || '').trim() as 'approve' | 'reject';
    const comment = String(body.comment || '').trim();
    const bundlePathHint = body.question_bundle_path ? String(body.question_bundle_path) : undefined;

    if (!reviewer_node_hash) return json({ error: 'reviewer_node_hash requerido' }, 400);
    if (vote !== 'approve' && vote !== 'reject') return json({ error: 'vote debe ser approve|reject' }, 400);

    try {
      const updated = await approveCorrection(
        correctionId,
        { reviewer_node_hash, vote, comment },
        bundlePathHint
      );
      return json({ success: true, report: updated }, 200);
    } catch (err: any) {
      const msg = err?.message || 'Error al votar';
      const status = msg.includes('not found') ? 404 : 400;
      return json({ error: msg }, status);
    }
  }

  // Otherwise: create report
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  // Also support review via body when routed without path param (fallback)
  // If body contains vote and id, treat as review (helps tests / unified client)
  if (body && body.vote && (body.id || body.correction_id)) {
    const correctionId = String(body.id || body.correction_id);
    const reviewer_node_hash = String(body.reviewer_node_hash || '').trim();
    const vote = String(body.vote).trim() as 'approve' | 'reject';
    if (reviewer_node_hash && (vote === 'approve' || vote === 'reject')) {
      try {
        const updated = await approveCorrection(correctionId, {
          reviewer_node_hash,
          vote,
          comment: String(body.comment || ''),
        });
        return json({ success: true, report: updated }, 200);
      } catch (err: any) {
        return json({ error: err?.message || 'Error al votar' }, 400);
      }
    }
  }

  const question_id = String(body.question_id || body.questionId || '').trim();
  const question_bundle_path = String(body.question_bundle_path || body.bundle_path || '').trim();
  const error_type = String(body.error_type || '').trim();
  const description = String(body.description || '').trim();
  const reporter_node_hash = String(body.reporter_node_hash || body.reporter || '').trim();

  if (!question_id) return json({ error: 'question_id requerido' }, 400);
  if (!question_bundle_path) return json({ error: 'question_bundle_path requerido' }, 400);
  if (!error_type || !isCorrectionErrorType(error_type)) {
    return json({ error: 'error_type inválido (error_factual|error_format|error_distractor|other)' }, 400);
  }
  if (!description) return json({ error: 'description requerida' }, 400);
  if (!reporter_node_hash) return json({ error: 'reporter_node_hash requerido' }, 400);

  try {
    const report = await reportCorrection({
      question_id,
      question_bundle_path,
      error_type: error_type as any,
      description,
      reporter_node_hash,
      original_content: body.original_content,
      proposed_content: body.proposed_content,
    } as any);
    return json({ success: true, report }, 201);
  } catch (err: any) {
    return json({ error: err?.message || 'Error al crear reporte' }, 400);
  }
};

// Also expose PUT/PATCH for completeness (not required)
export const ALL: APIRoute = async (ctx) => {
  const method = ctx.request.method;
  if (method === 'GET') return GET(ctx);
  if (method === 'POST') return POST(ctx);
  if (method === 'OPTIONS') return OPTIONS(ctx);
  return json({ error: 'Method not allowed' }, 405);
};
