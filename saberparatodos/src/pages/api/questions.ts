import type { APIRoute } from 'astro';
import { getLocalGrade11Questions } from '../../lib/questions/grade11-local-bank';

type RuntimeLocals = {
  runtime?: {
    env?: Record<string, string | undefined>;
  };
};

function getEnv(locals?: RuntimeLocals) {
  const runtimeEnv = locals?.runtime?.env ?? {};
  const defaultUpstreamBaseUrl = 'https://api.saberparatodos.space';

  const publicApiBaseUrl =
    runtimeEnv.PUBLIC_API_BASE_URL ||
    import.meta.env.PUBLIC_API_BASE_URL ||
    '/api';

  const internalApiBaseUrl =
    runtimeEnv.INTERNAL_API_BASE_URL ||
    runtimeEnv.API_INTERNAL_BASE_URL ||
    import.meta.env.INTERNAL_API_BASE_URL ||
    import.meta.env.API_INTERNAL_BASE_URL ||
    defaultUpstreamBaseUrl;

  return {
    publicApiBaseUrl: String(publicApiBaseUrl || ''),
    internalApiBaseUrl: internalApiBaseUrl.replace(/\/+$/, ''),
  };
}

async function fetchUpstreamJson(url: URL, headers: Headers): Promise<Response> {
  return fetch(url.toString(), {
    method: 'GET',
    headers,
  });
}

function buildJsonResponse(payload: unknown, upstreamResponse?: Response) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': upstreamResponse?.headers.get('cache-control') || 'public, max-age=60',
    },
  });
}

export const GET: APIRoute = async ({ request, locals }) => {
  const { internalApiBaseUrl } = getEnv(locals as RuntimeLocals);
  const requestUrl = new URL(request.url);
  const upstreamPath = '/v1/questions';
  const upstreamUrl = new URL(`${internalApiBaseUrl}${upstreamPath}`);
  const grade = Number(requestUrl.searchParams.get('grade') || 0);

  requestUrl.searchParams.forEach((value, key) => upstreamUrl.searchParams.set(key, value));

  const headers = new Headers({
    Accept: 'application/json',
  });

  try {
    if (grade === 11) {
      const country = String(requestUrl.searchParams.get('country') || 'co').toLowerCase();
      const exam = String(requestUrl.searchParams.get('exam') || 'icfes').toLowerCase();
      const subject = String(requestUrl.searchParams.get('subject') || '').trim().toLowerCase();

      if (country === 'co' && exam === 'icfes') {
        const localQuestions = getLocalGrade11Questions(subject);
        if (localQuestions.length > 0) {
          return buildJsonResponse({
            success: true,
            questions: localQuestions,
            total_questions: localQuestions.length,
            grade: 11,
            subject: subject || null,
            country: 'co',
            exam_type: 'icfes',
            page: 'all',
            meta: {
              aggregated_pages: 1,
              source: 'local-grade11-bank',
            },
          });
        }
      }

      const aggregatedQuestions: any[] = [];
      let firstResponse: Response | null = null;
      const maxPages = 24;

      for (let page = 1; page <= maxPages; page++) {
        upstreamUrl.searchParams.set('page', String(page));
        const pageResponse = await fetchUpstreamJson(upstreamUrl, headers);

        if (!pageResponse.ok) {
          if (page === 1) {
            return new Response(pageResponse.body, {
              status: pageResponse.status,
              statusText: pageResponse.statusText,
              headers: {
                'Content-Type': pageResponse.headers.get('content-type') || 'application/json',
                'Cache-Control': pageResponse.headers.get('cache-control') || 'public, max-age=60',
              },
            });
          }
          break;
        }

        const pagePayload = await pageResponse.json();
        const pageQuestions = Array.isArray(pagePayload?.questions) ? pagePayload.questions : [];
        if (!firstResponse) firstResponse = pageResponse;
        if (pageQuestions.length === 0) break;

        aggregatedQuestions.push(...pageQuestions);

        if (pageQuestions.length < 10) break;
      }

      const uniqueQuestions = Array.from(
        new Map(aggregatedQuestions.map((question) => [String(question?.id || ''), question])).values()
      ).filter((question) => Boolean(question?.id));

      return buildJsonResponse({
        success: true,
        questions: uniqueQuestions,
        total_questions: uniqueQuestions.length,
        grade: 11,
        subject: requestUrl.searchParams.get('subject') || null,
        country: requestUrl.searchParams.get('country') || 'co',
        exam_type: requestUrl.searchParams.get('exam') || 'icfes',
        page: 'all',
        meta: {
          aggregated_pages: Math.ceil(uniqueQuestions.length / 10),
          source: 'free-api-grade11-expanded',
        },
      }, firstResponse || undefined);
    }

    const upstreamResponse = await fetchUpstreamJson(upstreamUrl, headers);

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: {
        'Content-Type': upstreamResponse.headers.get('content-type') || 'application/json',
        'Cache-Control': upstreamResponse.headers.get('cache-control') || 'public, max-age=60',
      },
    });
  } catch (error) {
    console.error('[api/questions] upstream error', error);
    return new Response(
      JSON.stringify({
        error: 'UPSTREAM_UNAVAILABLE',
        message: 'No fue posible consultar el servicio de preguntas.',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
