import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

const QUESTIONS_BASE_URL = Deno.env.get('QUESTIONS_API_BASE_URL') || 'https://saberparatodos.pages.dev/api';
const ANCHOR_DATE_MS = Date.parse('2025-01-01T00:00:00Z');
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function getCurrentWeek(): number {
  const elapsed = Math.max(0, Date.now() - ANCHOR_DATE_MS);
  const week = Math.ceil(elapsed / ONE_WEEK_MS);
  return ((week - 1) % 52) + 1;
}

function normalizeSubjectKey(subject: string): string {
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

async function fetchPack(grade: string, subject: string) {
  const subjectKey = normalizeSubjectKey(subject);
  const currentWeek = getCurrentWeek();
  const candidates = [
    `week-${currentWeek}-grade-${grade}-subject-${subjectKey}.json`,
    `week-1-grade-${grade}-subject-${subjectKey}.json`,
  ];

  for (const candidate of candidates) {
    const response = await fetch(`${QUESTIONS_BASE_URL}/packs/${candidate}`);
    if (response.ok) {
      return response.json();
    }
  }

  return null;
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const grade = url.searchParams.get('grade') || '11';
    const subject = url.searchParams.get('subject') || 'matematicas';
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
    const country = (url.searchParams.get('country') || 'co').toLowerCase();
    const examType = (url.searchParams.get('exam') || 'icfes').toLowerCase();

    const validGrades = ['3', '5', '7', '9', '11'];
    const validCountries = ['co', 'mx', 'ar', 'cl', 'pe', 'br', 'us', 'cn', 'in'];

    if (!validGrades.includes(grade)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid parameter',
          message: `Invalid grade: ${grade}. Must be one of: ${validGrades.join(', ')}`,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!validCountries.includes(country)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid parameter',
          message: `Invalid country: ${country}. Must be one of: ${validCountries.join(', ')}`,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authHeader = req.headers.get('Authorization');
    let user = null;
    let isGuest = true;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      authHeader ? {
        global: {
          headers: { Authorization: authHeader },
        },
      } : {}
    );

    if (authHeader) {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authUser && !authError) {
        user = authUser;
        isGuest = false;
      }
    }

    const securityHeaders = {
      ...corsHeaders,
      'content-type': 'application/json',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'x-xss-protection': '1; mode=block',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'content-security-policy': "default-src 'none'; frame-ancestors 'none'; sandbox",
      'cache-control': isGuest ? 'public, max-age=3600, s-maxage=3600' : 'private, no-cache',
    };

    if (isGuest) {
      const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] ||
                       req.headers.get('cf-connecting-ip') ||
                       'unknown';

      const { data: rateLimitData, error: rateLimitError } = await supabase
        .from('api_rate_limits')
        .select('request_count, last_reset')
        .eq('ip_address', clientIP)
        .gte('last_reset', new Date(Date.now() - 3600000).toISOString())
        .maybeSingle();

      if (!rateLimitError && rateLimitData) {
        if (rateLimitData.request_count >= 100) {
          return new Response(
            JSON.stringify({
              error: 'Rate limit exceeded',
              message: 'Has excedido el límite de 100 preguntas por hora. Regístrate para acceso ilimitado.',
              retry_after: 3600,
            }),
            {
              status: 429,
              headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
                'Retry-After': '3600',
                'X-RateLimit-Limit': '100',
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(Date.now() + 3600000).toISOString(),
              }
            }
          );
        }

        await supabase
          .from('api_rate_limits')
          .update({ request_count: rateLimitData.request_count + 1 })
          .eq('ip_address', clientIP);
      } else {
        await supabase
          .from('api_rate_limits')
          .insert({
            ip_address: clientIP,
            request_count: 1,
            last_reset: new Date().toISOString(),
          });
      }
    }

    const pack = await fetchPack(grade, subject);
    if (!pack || !Array.isArray(pack.questions)) {
      return new Response(
        JSON.stringify({
          error: 'Questions not found',
          message: `No se encontraron preguntas para: ${subject} grado ${grade}`,
        }),
        { status: 404, headers: securityHeaders }
      );
    }

    let filteredQuestions = pack.questions;
    let answeredCount = 0;

    if (!isGuest && user) {
      try {
        const { data: answeredData, error: dbError } = await supabase
          .from('user_answered_questions')
          .select('question_id')
          .eq('user_id', user.id)
          .gte('answered_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        if (!dbError && answeredData && answeredData.length > 0) {
          const answeredIds = new Set(answeredData.map((r) => r.question_id));
          filteredQuestions = pack.questions.filter((q: any) => !answeredIds.has(q.id));
          answeredCount = pack.questions.length - filteredQuestions.length;
        }
      } catch (_dbError) {
        // Best effort only.
      }
    }

    const pageSize = isGuest ? 10 : 50;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);

    return new Response(
      JSON.stringify({
        success: true,
        questions: paginatedQuestions.map((q: any) => ({ ...q, grade: parseInt(grade, 10) })),
        total_questions: paginatedQuestions.length,
        is_guest: isGuest,
        country,
        exam_type: examType,
        grade: parseInt(grade, 10),
        subject: normalizeSubjectKey(subject),
        page,
        meta: {
          available_questions: filteredQuestions.length,
          filtered_out: answeredCount,
        },
      }),
      {
        status: 200,
        headers: {
          ...securityHeaders,
          'X-Guest-Mode': isGuest ? 'true' : 'false',
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error.message || 'Error desconocido',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
