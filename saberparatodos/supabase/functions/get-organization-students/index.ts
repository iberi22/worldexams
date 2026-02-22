import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(req.url)
    
    const organization_id = searchParams.get('organization_id')
    const group_id = searchParams.get('group_id')

    if (!organization_id && !group_id) {
      return new Response(
        JSON.stringify({ error: 'organization_id or group_id is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    let query = supabase.from('organization_students').select('*')

    if (group_id) {
      // Get students in a specific group
      // Need to add group_id to organization_students first
    }
    
    if (organization_id) {
      query = query.eq('organization_id', organization_id)
    }

    const { data, error } = await query

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, students: data }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
