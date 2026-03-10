import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * API Gateway - Secure Question API
 *
 * Security features:
 * 1. API Key validation with hash
 * 2. Rate limiting per key
 * 3. Quota management
 * 4. Request logging
 * 5. Tier-based access control
 */

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')

    // 1. Check if API key is provided
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({
          error: "Payment Required",
          message: "API key required. Get one at https://saberparatodos.pages.dev/developers/api-questions",
          code: "MISSING_API_KEY"
        }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 2. Initialize Supabase with service role (for full database access)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Extract and validate API key
    const rawToken = authHeader.replace('Bearer ', '')

    // Hash the token to compare with stored hash
    const encoder = new TextEncoder()
    const data = encoder.encode(rawToken)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const tokenHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // 3. Lookup API key in database
    const { data: apiKey, error: keyError } = await supabase
      .from('api_keys')
      .select(`
        *,
        organizations!inner(name, is_active)
      `)
      .eq('key_hash', tokenHash)
      .single()

    // 4. Validate key exists
    if (keyError || !apiKey) {
      // Log failed attempt (in production, use a separate logging system)
      console.log(`[SECURITY] Invalid API key attempt from ${req.headers.get('cf-connecting-ip') || 'unknown'}`)

      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "Invalid API key",
          code: "INVALID_KEY"
        }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 5. Check if key is active
    if (!apiKey.is_active) {
      return new Response(
        JSON.stringify({
          error: "Payment Required",
          message: "API key is inactive. Please renew your subscription.",
          code: "INACTIVE_KEY"
        }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 6. Check if organization is active
    if (!apiKey.organizations?.is_active) {
      return new Response(
        JSON.stringify({
          error: "Payment Required",
          message: "Organization subscription is inactive.",
          code: "ORG_INACTIVE"
        }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 7. Rate Limiting - Check requests in last minute
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString()
    const { count: recentRequests } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('api_key_id', apiKey.id)
      .gte('created_at', oneMinuteAgo)

    const rateLimit = apiKey.tier === 'free' ? 10 : apiKey.tier === 'starter' ? 50 : 200
    if ((recentRequests || 0) >= rateLimit) {
      return new Response(
        JSON.stringify({
          error: "Rate Limit Exceeded",
          message: `Too many requests. Limit: ${rateLimit}/minute. Upgrade at /developers/api-questions`,
          code: "RATE_LIMIT",
          retry_after: 60
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': String(rateLimit),
            'X-RateLimit-Remaining': '0'
          },
        }
      )
    }

    // 8. Check monthly quota
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    const { count: monthRequests } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('api_key_id', apiKey.id)
      .gte('created_at', monthStart.toISOString())

    if ((monthRequests || 0) >= apiKey.monthly_limit) {
      return new Response(
        JSON.stringify({
          error: "Quota Exceeded",
          message: `Monthly quota exceeded (${apiKey.monthly_limit} requests). Upgrade at /developers/api-questions`,
          code: "QUOTA_EXCEEDED"
        }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // 9. Log this request
    await supabase.from('usage_logs').insert({
      api_key_id: apiKey.id,
      endpoint: '/api/questions',
      status_code: 200,
      ip_address: req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
      user_agent: req.headers.get('user-agent') || 'unknown'
    })

    // 10. Update usage stats
    await supabase
      .from('api_keys')
      .update({ current_usage: (apiKey.current_usage || 0) + 1 })
      .eq('id', apiKey.id)

    // 11. Get query parameters for questions
    const url = new URL(req.url)
    const country = url.searchParams.get('country') || 'co'
    const grade = url.searchParams.get('grade') || '11'
    const subject = url.searchParams.get('subject') || 'matematicas'
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 100)

    // 12. Fetch questions from static API (with tier-based access)
    // Free tier: only legacy (v1) questions
    // Paid tiers: access to v1-v7
    const tier = apiKey.tier
    const useLegacyOnly = tier === 'free'

    // Fetch from Cloudflare Pages static API
    const baseUrl = 'https://worldexams-api.pages.dev/v1'
    const apiPath = `${country}/icfes/${grade}/${subject}/1.json`
    const fetchUrl = `${baseUrl}/${apiPath}`

    let questions: any[] = []
    let fetchSuccess = false

    try {
      const response = await fetch(fetchUrl)
      if (response.ok) {
        const data = await response.json()
        questions = data.questions || []

        // Filter based on tier
        if (useLegacyOnly) {
          // Free tier: only v1 questions
          questions = questions.filter((q: any) => q.id?.endsWith('-v1'))
        }

        // Limit results
        questions = questions.slice(0, limit)
        fetchSuccess = true
      }
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
    }

    // Return response
    return new Response(
      JSON.stringify({
        success: fetchSuccess,
        data: questions,
        meta: {
          total: questions.length,
          tier: tier,
          country,
          grade: parseInt(grade),
          subject,
          rate_limit: rateLimit,
          quota_remaining: apiKey.monthly_limit - (monthRequests || 0) - 1,
          powered_by: 'WorldExams API'
        }
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Cache-Control': 'private, no-cache',
          'X-RateLimit-Limit': String(rateLimit),
          'X-RateLimit-Remaining': String(rateLimit - (recentRequests || 0) - 1)
        },
        status: 200,
      }
    )

  } catch (error: any) {
    console.error('API Gateway Error:', error)
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
      code: "SERVER_ERROR"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
