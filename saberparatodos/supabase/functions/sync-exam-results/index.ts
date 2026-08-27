import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ExamSyncPayload {
  userId?: string
  subject: string
  score: number
  maxScore: number
  durationSeconds: number
  mode?: string
  examId?: string
  metadata?: Record<string, any>
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const authHeader = req.headers.get('Authorization')
    let authenticatedUserId: string | null = null

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      const { data: { user } } = await supabase.auth.getUser(token)
      if (user) {
        authenticatedUserId = user.id
      }
    }

    const payload: ExamSyncPayload = await req.json()

    if (!payload.subject || typeof payload.score !== 'number' || typeof payload.maxScore !== 'number') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid payload: subject, score, maxScore required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const finalUserId = authenticatedUserId || payload.userId || null

    // Record result into exam_results table
    const { data: insertedResult, error: insertError } = await supabase
      .from('exam_results')
      .insert({
        user_id: finalUserId,
        subject: payload.subject,
        score: payload.score,
        max_score: payload.maxScore,
        duration_seconds: payload.durationSeconds || 0,
        mode: payload.mode || 'practice',
        exam_id: payload.examId || null,
        metadata: payload.metadata || {}
      })
      .select()
      .single()

    if (insertError) {
      // If table missing or error, log but handle gracefully
      console.error('exam_results insert error:', insertError)
    }

    // Also update user_profiles if authenticated user
    if (finalUserId) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('credits')
        .eq('id', finalUserId)
        .single()

      if (profile) {
        // Award bonus credits for completing exams (1 credit per 10 points)
        const earnedCredits = Math.floor(payload.score / 10)
        if (earnedCredits > 0) {
          await supabase
            .from('user_profiles')
            .update({
              credits: (profile.credits || 0) + earnedCredits,
              updated_at: new Date().toISOString()
            })
            .eq('id', finalUserId)
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        resultId: insertedResult?.id || 'synced',
        userId: finalUserId,
        score: payload.score,
        maxScore: payload.maxScore
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
