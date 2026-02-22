import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  // CORS headers
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
    const name = searchParams.get('name')
    const grade = searchParams.get('grade')
    const section = searchParams.get('section')

    if (!organization_id || !name) {
      return new Response(
        JSON.stringify({ error: 'organization_id and name are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { data, error } = await supabase
      .from('organization_groups')
      .insert({
        organization_id,
        name,
        grade,
        section
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, group: data }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
