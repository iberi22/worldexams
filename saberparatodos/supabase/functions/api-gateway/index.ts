import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')

    if (!authHeader) {
      return new Response(
        JSON.stringify({
          error: "Payment Required",
          message: "Access to this API requires a valid API Key. Please visit https://iberi22.github.io/saberparatodos/developers/pricing to obtain one.",
          payment_url: "https://iberi22.github.io/saberparatodos/developers/pricing"
        }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // TODO: Validate the token against the database
    // const token = authHeader.replace('Bearer ', '')
    // const { data, error } = await supabase.from('api_keys').select('*').eq('key', token).single()

    // Mock response for valid token
    const mockQuestions = [
      {
        id: "mat-grado-11-algebra-001",
        subject: "Matemáticas",
        grade: 11,
        question: "Si x + 2 = 4, ¿cuánto vale x?",
        options: ["1", "2", "3", "4"],
        correct_answer: "2"
      }
    ]

    return new Response(
      JSON.stringify({
        data: mockQuestions,
        meta: {
          total: 1,
          page: 1
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
