import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const url = new URL(req.url)
    let limit = parseInt(url.searchParams.get('limit') || '50', 10)
    if (isNaN(limit) || limit <= 0) limit = 50
    if (limit > 100) limit = 100

    let body: Record<string, any> = {}
    if (req.method === 'POST') {
      try {
        body = await req.json()
      } catch (_err) {
        // payload may be empty
      }
    }

    const country = url.searchParams.get('country') || body.country || null
    const grade = url.searchParams.get('grade') || body.grade || null

    // Query leaderboard_submissions or user_profiles
    let query = supabase
      .from('leaderboard_submissions')
      .select('id, anonymous_id, display_name, score, questions_answered, correct_answers, country, grade, created_at')
      .order('score', { ascending: false })
      .limit(limit)

    if (country) {
      query = query.eq('country', country)
    }
    if (grade) {
      query = query.eq('grade', grade)
    }

    let { data, error } = await query

    // Fallback to user_profiles if leaderboard_submissions has no records or error occurs
    if (error || !data || data.length === 0) {
      let profileQuery = supabase
        .from('user_profiles')
        .select('id, username, avatar_style, credits, role, created_at')
        .eq('public_ranking_enabled', true)
        .order('credits', { ascending: false })
        .limit(limit)

      const profileRes = await profileQuery
      if (!profileRes.error && profileRes.data) {
        data = profileRes.data.map((p: any, idx: number) => ({
          rank: idx + 1,
          id: p.id,
          display_name: p.username || `Student_${p.id.substring(0, 5)}`,
          avatar_style: p.avatar_style || 'bottts',
          score: p.credits * 10,
          role: p.role,
          created_at: p.created_at
        }))
      } else {
        data = data || []
      }
    } else {
      data = data.map((item: any, idx: number) => ({
        rank: idx + 1,
        ...item
      }))
    }

    return new Response(
      JSON.stringify({
        success: true,
        count: data.length,
        leaderboard: data
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
