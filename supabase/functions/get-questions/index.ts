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
    const country = url.searchParams.get('country') || 'co';
    const examType = url.searchParams.get('exam') || 'icfes';

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

    // 4. Parse query parameters
    const url = new URL(req.url);
    const grade = url.searchParams.get('grade') || '11';
    const subject = url.searchParams.get('subject') || 'matematicas';
    const page = url.searchParams.get('page') || '1';
    const country = url.searchParams.get('country') || 'co';
    const examType = url.searchParams.get('exam') || 'icfes';

    // 3. Construct Storage path
    const storagePath = `${country}/${examType}/${grade}/${subject}/page-${page}.json`;

    console.log(`📥 Fetching: ${storagePath} for user ${user.id}`);

    // 4. Download from Supabase Storage
    const { data: fileData, error: storageError } = await supabase.storage
      .from('questions')
      .download(storagePath);

    if (storageError) {
      console.error('Storage error:', storageError);
      return new Response(
        JSON.stringify({
          error: 'Questions not found',
          message: `No se encontraron preguntas para: ${subject} grado ${grade}, página ${page}`,
          details: storageError.message,
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Parse JSON
    const jsonText = await fileData.text();
    const questions = JSON.parse(jsonText);

    // 6. Filter already answered questions (for registered users)
    let filteredQuestions = questions;
    let answeredCount = 0;

    try {
      // Get user's answered questions from last 30 days
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
      // Continue without filtering if DB fails
    }

    // 7. Return response with cache headers
    return new Response(
      JSON.stringify({
        success: true,
        data: filteredQuestions,
        meta: {
          country,
          exam_type: examType,
          grade: parseInt(grade),
          subject,
          page: parseInt(page),
          total_questions: filteredQuestions.length,
          filtered_out: answeredCount,
          user_id: user.id,
          cached_until: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        },
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          // Cache for 1 hour in browser and CDN
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
          'CDN-Cache-Control': 'public, max-age=3600',
          'Surrogate-Control': 'max-age=3600',
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
