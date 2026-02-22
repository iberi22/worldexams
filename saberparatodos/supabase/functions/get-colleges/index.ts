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
    
    const query = searchParams.get('q') || ''
    const department = searchParams.get('department')
    const municipality = searchParams.get('municipality')
    const limit = parseInt(searchParams.get('limit') || '20')

    let dbQuery = supabase
      .from('colleges')
      .select('*')
      .limit(limit)

    if (query) {
      dbQuery = dbQuery.ilike('name', `%${query}%`)
    }
    if (department) {
      dbQuery = dbQuery.eq('department', department)
    }
    if (municipality) {
      dbQuery = dbQuery.eq('municipality', municipality)
    }

    const { data, error } = await dbQuery

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, colleges: data }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
