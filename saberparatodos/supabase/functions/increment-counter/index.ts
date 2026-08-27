import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Rate limiting: strict proxy header cf-connecting-ip
    const clientIp = req.headers.get('cf-connecting-ip') || '127.0.0.1'

    // Rate limiting check via api_rate_limits table
    const now = new Date()
    const { data: limitData } = await supabase
      .from('api_rate_limits')
      .select('*')
      .eq('ip_address', clientIp)
      .single()

    if (limitData) {
      const lastReset = new Date(limitData.last_reset)
      const diffHours = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60)

      if (diffHours < 1) {
        if (limitData.request_count >= 300) {
          return new Response(
            JSON.stringify({ success: false, error: 'Rate limit exceeded for counter increment' }),
            { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }
        await supabase
          .from('api_rate_limits')
          .update({ request_count: limitData.request_count + 1, updated_at: now.toISOString() })
          .eq('ip_address', clientIp)
      } else {
        await supabase
          .from('api_rate_limits')
          .update({ request_count: 1, last_reset: now.toISOString(), updated_at: now.toISOString() })
          .eq('ip_address', clientIp)
      }
    } else {
      await supabase
        .from('api_rate_limits')
        .insert({ ip_address: clientIp, request_count: 1, last_reset: now.toISOString() })
    }

    const { questionId, isCorrect } = await req.json()

    if (!questionId || typeof questionId !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing or invalid questionId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch current counter
    const { data: existing } = await supabase
      .from('question_counters')
      .select('*')
      .eq('question_id', questionId)
      .single()

    let newTimesAnswered = 1
    let newTimesCorrect = isCorrect ? 1 : 0

    if (existing) {
      newTimesAnswered = (existing.times_answered || 0) + 1
      newTimesCorrect = (existing.times_correct || 0) + (isCorrect ? 1 : 0)

      const { error: updateError } = await supabase
        .from('question_counters')
        .update({
          times_answered: newTimesAnswered,
          times_correct: newTimesCorrect,
          last_incremented_at: now.toISOString(),
          updated_at: now.toISOString()
        })
        .eq('question_id', questionId)

      if (updateError) throw updateError
    } else {
      const { error: insertError } = await supabase
        .from('question_counters')
        .insert({
          question_id: questionId,
          times_answered: newTimesAnswered,
          times_correct: newTimesCorrect,
          last_incremented_at: now.toISOString()
        })

      if (insertError) throw insertError
    }

    return new Response(
      JSON.stringify({
        success: true,
        questionId,
        timesAnswered: newTimesAnswered,
        timesCorrect: newTimesCorrect
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
