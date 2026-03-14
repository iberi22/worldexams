import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

/**
 * Bulk/Sample Endpoint
 * Returns randomized questions from multiple subjects/grades in a single request
 * Reduces 50+ requests to 1 request for Blog View
 */
serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode') || 'single'; // 'single' or 'sample'
    const grades = url.searchParams.get('grades') || '11'; // Comma-separated: "3,5,7,9,11"
    const limit = parseInt(url.searchParams.get('limit') || '150');
    const country = (url.searchParams.get('country') || 'co').toLowerCase();
    const examType = (url.searchParams.get('exam') || 'icfes').toLowerCase();

    if (mode !== 'sample') {
      return new Response(
        JSON.stringify({
          error: 'Invalid mode',
          message: 'This endpoint only supports mode=sample. Use get-questions for single grade/subject.',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse grades
    const gradeList = grades.split(',').map(g => g.trim()).filter(g => ['3', '5', '7', '9', '11'].includes(g));

    if (gradeList.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Invalid parameter',
          message: 'No valid grades provided. Use grades=3,5,7,9,11',
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check authentication
    const authHeader = req.headers.get('Authorization');
    let isGuest = true;

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      authHeader ? { global: { headers: { Authorization: authHeader } } } : {}
    );

    if (authHeader) {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user && !error) {
        isGuest = false;
      }
    }

    // Security Headers
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

    // Rate limiting for guests
    if (isGuest) {
      const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] ||
                       req.headers.get('cf-connecting-ip') ||
                       'unknown';

      const { data: rateLimitData } = await supabase
        .from('api_rate_limits')
        .select('request_count, last_reset')
        .eq('ip_address', clientIP)
        .gte('last_reset', new Date(Date.now() - 3600000).toISOString())
        .maybeSingle();

      if (rateLimitData && rateLimitData.request_count >= 100) {
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
            }
          }
        );
      }

      // Update rate limit
      if (rateLimitData) {
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

    // Subject mapping for each grade (matching static API paths)
    const subjectsByGrade: Record<string, string[]> = {
      '3': ['matematicas', 'ingles', 'ciencias-naturales', 'sociales-ciudadanas'],
      '5': ['matematicas', 'lectura-critica', 'ciencias-naturales', 'sociales-ciudadanas'],
      '7': ['matematicas', 'lectura-critica', 'ingles', 'ciencias-naturales', 'sociales-ciudadanas'],
      '9': ['matematicas', 'lectura-critica', 'ingles', 'ciencias-naturales', 'sociales-ciudadanas'],
      '11': ['matematicas', 'lectura-critica', 'ciencias-naturales', 'sociales-ciudadanas', 'ingles'],
    };

    // Calculate questions per grade
    const questionsPerGrade = Math.floor(limit / gradeList.length);
    const allQuestions: any[] = [];

    console.log(`📚 Bulk sample: ${gradeList.length} grades, ${questionsPerGrade} questions each`);

    // Fetch questions for each grade
    for (const grade of gradeList) {
      const subjects = subjectsByGrade[grade] || [];
      const questionsPerSubject = Math.floor(questionsPerGrade / subjects.length);

      for (const subject of subjects) {
        try {
          const baseUrl = 'https://saberparatodos.pages.dev/api';
          const apiPath = `${country}/${examType}/${grade}/${subject}/1.json`;
          const fetchUrl = `${baseUrl}/${apiPath}`;

          console.log(`  📥 Fetching: ${fetchUrl}`);
          const response = await fetch(fetchUrl);

          if (response.ok) {
            const questionsData = await response.json();
            const questions = questionsData.questions || [];

            // Randomize and take sample
            const sample = questions
              .sort(() => Math.random() - 0.5)
              .slice(0, questionsPerSubject)
              .map((q: any) => ({ ...q, grade: parseInt(grade) }));

            allQuestions.push(...sample);
            console.log(`  ✅ ${grade}/${subject}: ${sample.length} questions`);
          } else {
            console.error(`  ⚠️ Failed to fetch ${fetchUrl}: ${response.status}`);
          }
        } catch (error) {
          console.error(`  ❌ Error loading ${grade}/${subject}:`, error);
        }
      }
    }

    // Final shuffle and limit
    const finalQuestions = allQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);

    console.log(`✅ Returning ${finalQuestions.length} total questions`);

    return new Response(
      JSON.stringify({
        success: true,
        questions: finalQuestions,
        total_questions: finalQuestions.length,
        is_guest: isGuest,
        mode: 'sample',
        country,
        exam_type: examType,
        grades: gradeList,
        limit,
        meta: {
          cached_until: new Date(Date.now() + 3600000).toISOString(),
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
    console.error('Unexpected error:', error);
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
