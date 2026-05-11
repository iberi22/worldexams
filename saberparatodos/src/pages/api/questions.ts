import type { APIRoute } from 'astro';
import { getCountryExamSlug, resolveRuntimeCountryConfig } from '../../config';
import { getLocalGrade11Questions } from '../../lib/questions/grade11-local-bank';
import { filterQuarantinedQuestions } from '../../lib/questions/quarantine-registry';
import { getRuntimeEnvObject, type RuntimeLocals } from '../../lib/server-runtime';

const ANCHOR_DATE_MS = Date.parse('2025-01-01T00:00:00Z');
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getEnv(locals?: RuntimeLocals) {
  const runtimeEnv = getRuntimeEnvObject(locals);
  const publicWorkerBaseUrl = 'https://api.saberparatodos.space';

  const publicApiBaseUrl =
    runtimeEnv.PUBLIC_API_BASE_URL ||
    import.meta.env.PUBLIC_API_BASE_URL ||
    '/api';

  return {
    publicApiBaseUrl: String(publicApiBaseUrl || ''),
    publicWorkerBaseUrl,
  };
}

function normalizeSubjectKey(subject: string) {
  const normalized = String(subject || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s-]+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/^_+|_+$/g, '');

  const aliasMap: Record<string, string> = {
    socialesyciudadanas: 'sociales_y_ciudadanas',
    sociales_ciudadanas: 'sociales_y_ciudadanas',
    sociales_y_ciudadanas: 'sociales_y_ciudadanas',
    sociales: 'sociales',
    cienciasnaturales: 'ciencias_naturales',
    ciencias_naturales: 'ciencias_naturales',
    ciencias: 'ciencias_naturales',
    lectura_critica: 'lectura_critica',
    lecturacritica: 'lectura_critica',
    lenguaje: 'lectura_critica',
    tecnologiaeinformatica: 'tecnologia_informatica',
    tecnologiainformatica: 'tecnologia_informatica',
    english: 'ingles',
    matematica: 'matematicas',
  };

  return aliasMap[normalized] || normalized;
}

function getCurrentWeek() {
  const elapsed = Math.max(0, Date.now() - ANCHOR_DATE_MS);
  const week = Math.ceil(elapsed / ONE_WEEK_MS);
  return ((week - 1) % 52) + 1;
}

async function fetchUpstreamJson(url: URL, headers: Headers): Promise<Response> {
  return fetch(url.toString(), {
    method: 'GET',
    headers,
  });
}

async function fetchSameOriginPackJson(requestUrl: URL, grade: number, subject: string, country?: string): Promise<Response | null> {
  const subjectKey = normalizeSubjectKey(subject || 'matematicas');
  const countryPrefix = country ? `${country.toLowerCase()}-` : '';

  const candidates = [
    `/api/packs/${countryPrefix}week-${getCurrentWeek()}-grade-${grade}-subject-${subjectKey}.json`,
    `/api/packs/${countryPrefix}week-1-grade-${grade}-subject-${subjectKey}.json`,
    // Fallback to legacy non-prefixed paths (usually Colombia)
    `/api/packs/week-${getCurrentWeek()}-grade-${grade}-subject-${subjectKey}.json`,
    `/api/packs/week-1-grade-${grade}-subject-${subjectKey}.json`,
  ];

  for (const candidate of candidates) {
    const response = await fetch(new URL(candidate, requestUrl.origin), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) return response;
  }

  return null;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // Relaxed for API subdomain, can be restricted to https://saberparatodos.space
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
  'Access-Control-Max-Age': '86400',
};

function buildJsonResponse(payload: unknown, upstreamResponse?: Response) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': upstreamResponse?.headers.get('cache-control') || 'public, max-age=60',
      ...CORS_HEADERS,
    },
  });
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
};

export const GET: APIRoute = async ({ request, locals }) => {
  const { publicWorkerBaseUrl } = getEnv(locals as RuntimeLocals);
  const requestUrl = new URL(request.url);
  const upstreamPath = '/v1/questions';
  const upstreamUrl = new URL(`${publicWorkerBaseUrl}${upstreamPath}`);
  const grade = Number(requestUrl.searchParams.get('grade') || 0);
  const requestedSubject = String(requestUrl.searchParams.get('subject') || '').trim().toLowerCase();
  const runtimeCountry = locals.country ? resolveRuntimeCountryConfig(locals.country as any) : undefined;
  const defaultCountry = String(requestUrl.searchParams.get('country') || runtimeCountry?.code || locals.countryCode || '').toLowerCase();
  const defaultExam = String(requestUrl.searchParams.get('exam') || (runtimeCountry ? getCountryExamSlug(runtimeCountry) : '') || '').toLowerCase();

  requestUrl.searchParams.forEach((value, key) => upstreamUrl.searchParams.set(key, value));
  if (defaultCountry && !upstreamUrl.searchParams.has('country')) upstreamUrl.searchParams.set('country', defaultCountry);
  if (defaultExam && !upstreamUrl.searchParams.has('exam')) upstreamUrl.searchParams.set('exam', defaultExam);

  const headers = new Headers({
    Accept: 'application/json',
  });

  try {
    if (grade === 11) {
      const country = defaultCountry;
      const exam = defaultExam;
      const subject = requestedSubject;

      if (country === 'co' && exam === 'icfes') {
        const localQuestions = getLocalGrade11Questions(subject);
        if (localQuestions.length > 0) {
          const visibleLocalQuestions = filterQuarantinedQuestions(localQuestions);
          return buildJsonResponse({
            success: true,
            questions: visibleLocalQuestions,
            total_questions: visibleLocalQuestions.length,
            grade: 11,
            subject: subject || null,
            country,
            exam_type: exam,
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
                ...CORS_HEADERS,
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

      const uniqueQuestions = filterQuarantinedQuestions(Array.from(
        new Map(aggregatedQuestions.map((question) => [String(question?.id || ''), question])).values()
      )).filter((question) => Boolean(question?.id));

      return buildJsonResponse({
        success: true,
        questions: uniqueQuestions,
        total_questions: uniqueQuestions.length,
        grade: 11,
        subject: requestUrl.searchParams.get('subject') || null,
        country: defaultCountry || null,
        exam_type: defaultExam || null,
        page: 'all',
        meta: {
          aggregated_pages: Math.ceil(uniqueQuestions.length / 10),
          source: 'free-api-grade11-expanded',
        },
      }, firstResponse || undefined);
    }

    const packResponse = await fetchSameOriginPackJson(requestUrl, grade, requestedSubject, defaultCountry);
    if (packResponse?.ok) {
      const packPayload = await packResponse.json();
      const packQuestions = Array.isArray(packPayload?.questions) ? packPayload.questions : [];
      const page = Math.max(1, Number(requestUrl.searchParams.get('page') || '1') || 1);
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const visibleQuestions = filterQuarantinedQuestions(
        packQuestions.slice(startIndex, startIndex + pageSize)
      );

      return buildJsonResponse({
        success: true,
        questions: visibleQuestions,
        total_questions: visibleQuestions.length,
        is_guest: true,
        country: defaultCountry || null,
        exam_type: defaultExam || null,
        grade,
        subject: normalizeSubjectKey(requestedSubject || 'matematicas'),
        page,
        meta: {
          available_questions: packQuestions.length,
          source: 'same-origin-pack-proxy',
        },
      }, packResponse);
    }

    const upstreamResponse = await fetchUpstreamJson(upstreamUrl, headers);
    if (!upstreamResponse.ok) {
      return new Response(upstreamResponse.body, {
        status: upstreamResponse.status,
        statusText: upstreamResponse.statusText,
        headers: {
          'Content-Type': upstreamResponse.headers.get('content-type') || 'application/json',
          'Cache-Control': upstreamResponse.headers.get('cache-control') || 'public, max-age=60',
          ...CORS_HEADERS,
        },
      });
    }

    const upstreamPayload = await upstreamResponse.json();
    const upstreamQuestions = Array.isArray(upstreamPayload?.questions) ? upstreamPayload.questions : [];
    const visibleQuestions = filterQuarantinedQuestions(upstreamQuestions);

    return buildJsonResponse({
      ...upstreamPayload,
      questions: visibleQuestions,
      total_questions: visibleQuestions.length,
    }, upstreamResponse);
  } catch (error) {
    console.error('[api/questions] upstream error', error);
    return new Response(
      JSON.stringify({
        error: 'UPSTREAM_UNAVAILABLE',
        message: 'No fue posible consultar el servicio de preguntas.',
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS,
        },
      }
    );
  }
};
