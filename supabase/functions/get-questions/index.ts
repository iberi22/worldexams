import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Parse query parameters first
    const url = new URL(req.url);
    const grade = url.searchParams.get('grade') || '11';
    const subject = url.searchParams.get('subject') || 'matematicas';
    const page = url.searchParams.get('page') || '1';
    const country = (url.searchParams.get('country') || 'co').toLowerCase();
    const examType = (url.searchParams.get('exam') || 'icfes').toLowerCase();

    // Validate inputs
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

    // 2. JWT Authentication (Optional - supports guests)
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
      // Validate user token
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authUser && !authError) {
        user = authUser;
        isGuest = false;
        console.log(`✅ Authenticated request from user ${user.id}`);
      } else {
        console.log(`⚠️ Invalid token, treating as guest`);
      }
    } else {
      console.log(`👤 Guest request (no auth header)`);
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

    // 3. Rate Limiting for Guests
    if (isGuest) {
      const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] ||
                       req.headers.get('cf-connecting-ip') ||
                       'unknown';

      // Check rate limit (100 requests per hour)
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

        // Increment counter
        await supabase
          .from('api_rate_limits')
          .update({ request_count: rateLimitData.request_count + 1 })
          .eq('ip_address', clientIP);
      } else {
        // Create new rate limit entry
        await supabase
          .from('api_rate_limits')
          .insert({
            ip_address: clientIP,
            request_count: 1,
            last_reset: new Date().toISOString(),
          });
      }
    }

    // 4. Fetch from Static API (Reliable source)
    const baseUrl = 'https://saberparatodos.pages.dev/api';
    const apiPath = `${country}/${examType}/${grade}/${subject}/${page}.json`;
    const fetchUrl = `${baseUrl}/${apiPath}`;

    console.log(`📥 Fetching from Static API: ${fetchUrl} for ${isGuest ? 'guest' : `user ${user.id}`}`);

    try {
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        console.error(`Error fetching from static API: ${response.status} ${response.statusText} for ${url}`);
        return new Response(
          JSON.stringify({
            error: 'Questions not found',
            message: `No se encontraron preguntas para: ${subject} grado ${grade}, página ${page}`,
            path: apiPath,
            status: response.status
          }),
          { status: 404, headers: securityHeaders }
        );
      }

      const questionsData = await response.json();
      const questions = questionsData.questions || [];

      // 7. Apply limits and filters
      let filteredQuestions = questions;
      let answeredCount = 0;

      // For authenticated users: filter already answered questions
      if (!isGuest && user) {
        try {
          const { data: answeredData, error: dbError } = await supabase
            .from('user_answered_questions')
            .select('question_id')
            .eq('user_id', user.id)
            .gte('answered_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

          if (!dbError && answeredData && answeredData.length > 0) {
            const answeredIds = new Set(answeredData.map((r) => r.question_id));
            filteredQuestions = questions.filter((q: any) => !answeredIds.has(q.id));
            answeredCount = questions.length - filteredQuestions.length;

            console.log(`🔍 Filtered ${answeredCount} already answered questions`);
          }
        } catch (dbError) {
          console.error('Error fetching answered questions:', dbError);
        }
      }

      // For guests: limit to 10 questions per request
      if (isGuest) {
        const GUEST_LIMIT = 10;
        if (filteredQuestions.length > GUEST_LIMIT) {
          // Randomize and limit
          filteredQuestions = filteredQuestions
            .sort(() => Math.random() - 0.5)
            .slice(0, GUEST_LIMIT);
          console.log(`🔒 Guest limit: reduced to ${GUEST_LIMIT} questions`);
        }
      }

      // 8. Return response with cache headers
      return new Response(
        JSON.stringify({
          success: true,
          questions: filteredQuestions.map(q => ({ ...q, grade: parseInt(grade) })),
          total_questions: filteredQuestions.length,
          is_guest: isGuest,
          country,
          exam_type: examType,
          grade: parseInt(grade),
          subject,
          page: parseInt(page),
          meta: {
            filtered_out: answeredCount,
            user_id: user?.id || null,
            cached_until: new Date(Date.now() + 3600000).toISOString(), // 1 hour
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
    } catch (fetchErr: any) {
      console.error('Fetch error:', fetchErr);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch from static API', details: fetchErr.message }),
        { status: 500, headers: securityHeaders }
      );
    }
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
