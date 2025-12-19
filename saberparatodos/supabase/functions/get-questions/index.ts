// Edge Function: get-questions
// Fetches questions from the question bank (Markdown bundles)
// Supports JWT authentication and guest mode

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface QuestionOption {
  letter: string
  text: string
  is_correct: boolean
}

interface ParsedQuestion {
  id: string
  number: number
  statement: string
  options: QuestionOption[]
  correct_answer: string
  explanation: string
  difficulty: string
  bundle_id: string
  source_url: string
  tags: string[]
  images: string[]
  modern_context: boolean
  context_type: string | null
  context_tags: string[]
  grade: number
}

// GitHub API URL for the question bank (use API for private repo access, not raw.githubusercontent)
const GITHUB_API_BASE = 'https://api.github.com/repos/world-exams/saberparatodos/contents/src/content/questions'

// GitHub token for private repo access (required since repo is private)
const GITHUB_TOKEN = Deno.env.get('GITHUB_PERSONAL_ACCESS_TOKEN') || ''

// Log token status for debugging (don't log the actual token, just prefix)
const tokenPrefix = GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 10) + '...' : 'EMPTY'
console.log(`[get-questions] GitHub token status: ${GITHUB_TOKEN ? 'CONFIGURED' : 'MISSING'}, prefix: ${tokenPrefix}`)

// Helper to get GitHub headers with optional auth
function getGitHubHeaders(forRawContent = false): HeadersInit {
  const headers: HeadersInit = {
    'Accept': forRawContent ? 'application/vnd.github.raw+json' : 'application/vnd.github.v3+json',
    'User-Agent': 'SaberParaTodos-EdgeFunction'
  }
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
  }
  return headers
}

// Parse markdown options - FIXED to capture ALL options
function parseOptions(content: string): QuestionOption[] {
  const options: QuestionOption[] = []

  // Match all option lines: - [x] A) text or - [ ] B) text
  const optionRegex = /^-\s*\[(x| )\]\s*([A-D])\)\s*(.+)$/gm
  let match

  while ((match = optionRegex.exec(content)) !== null) {
    const isCorrect = match[1] === 'x'
    const letter = match[2]
    const text = match[3].trim()

    options.push({
      letter,
      text,
      is_correct: isCorrect
    })
  }

  return options
}

// Parse a single question from markdown section
function parseQuestion(section: string, bundleId: string, metadata: any): ParsedQuestion | null {
  // Extract question ID - supports both backticks and quotes: `ID` or "ID"
  let questionId = ''
  const idMatch = section.match(/\*\*ID:\*\*\s*[`"]([^`"]+)[`"]/)
  if (idMatch) {
    questionId = idMatch[1]
  } else {
    // Try without quotes/backticks as fallback
    const altMatch = section.match(/\*\*ID:\*\*\s*(\S+)/)
    if (!altMatch) return null
    questionId = altMatch[1]
  }

  // Extract question number from ID (e.g., CO-MAT-3-geometria-001-v1 -> 1)
  const versionMatch = questionId.match(/-v(\d+)$/)
  const number = versionMatch ? parseInt(versionMatch[1]) : 1

  // Extract statement (text after ### Enunciado)
  const statementMatch = section.match(/###\s*Enunciado\s*\n\n([\s\S]*?)(?=\n###|\n---)/i)
  if (!statementMatch) return null
  const statement = statementMatch[1].trim()

  // Extract options section
  const optionsMatch = section.match(/###\s*Opciones\s*\n\n([\s\S]*?)(?=\n###|\n---)/i)
  if (!optionsMatch) return null

  const options = parseOptions(optionsMatch[1])
  if (options.length === 0) return null

  // Find correct answer
  const correctOption = options.find(o => o.is_correct)
  const correctAnswer = correctOption?.letter || 'A'

  // Extract explanation
  const explanationMatch = section.match(/###\s*Explicación\s*(?:Pedagógica)?\s*\n\n([\s\S]*?)(?=\n---|\n##\s*Pregunta|\n##\s*📊|$)/i)
  const explanation = explanationMatch ? explanationMatch[1].trim() : ''

  // Extract difficulty from header (e.g., "## Pregunta 1 (Original - Dificultad 3)")
  const difficultyMatch = section.match(/Dificultad\s*(\d+)/i)
  const difficultyLevel = difficultyMatch ? parseInt(difficultyMatch[1]) : 3
  const difficulty = difficultyLevel <= 2 ? 'Easy' : difficultyLevel >= 4 ? 'Hard' : 'Medium'

  return {
    id: questionId,
    number,
    statement,
    options,
    correct_answer: correctAnswer,
    explanation,
    difficulty,
    bundle_id: bundleId,
    source_url: metadata.source_url || 'https://www.icfes.gov.co',
    tags: [metadata.tema || '', metadata.asignatura || ''].filter(Boolean),
    images: [],
    modern_context: false,
    context_type: null,
    context_tags: [],
    grade: metadata.grado || 11
  }
}

// Parse bundle metadata from YAML frontmatter
function parseMetadata(content: string): Record<string, any> {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return {}

  const metadata: Record<string, any> = {}
  const lines = frontmatterMatch[1].split('\n')

  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.*)$/)
    if (match) {
      const key = match[1]
      let value: any = match[2].replace(/^["']|["']$/g, '')

      // Parse numbers
      if (/^\d+$/.test(value)) {
        value = parseInt(value)
      }

      metadata[key] = value
    }
  }

  return metadata
}

// Parse all questions from a bundle
function parseBundle(content: string, bundleId: string): ParsedQuestion[] {
  const metadata = parseMetadata(content)
  const questions: ParsedQuestion[] = []

  // Split by question headers (## Pregunta N)
  const questionSections = content.split(/(?=##\s*Pregunta\s+\d+)/g)

  for (const section of questionSections) {
    if (!section.includes('### Enunciado')) continue

    const question = parseQuestion(section, bundleId, metadata)
    if (question) {
      questions.push(question)
    }
  }

  return questions
}

// Fetch bundle list from GitHub API
async function fetchBundleList(country: string, exam: string, grade: number, subject: string): Promise<string[]> {
  const subjectVariants = [
    subject.toLowerCase().replace(/_/g, '-'),
    subject.toLowerCase().replace(/-/g, '_'),
  ]

  console.log(`[fetchBundleList] Looking for bundles: grade=${grade}, subject=${subject}, variants=${subjectVariants.join(',')}`)

  for (const subjectPath of subjectVariants) {
    const path = `colombia/${subjectPath}/grado-${grade}`
    const apiUrl = `https://api.github.com/repos/world-exams/saberparatodos/contents/src/content/questions/${path}`

    console.log(`[fetchBundleList] Trying URL: ${apiUrl}`)

    try {
      const headers = getGitHubHeaders()
      console.log(`[fetchBundleList] Using auth: ${headers['Authorization'] ? 'YES (Bearer)' : 'NO'}`)

      const response = await fetch(apiUrl, { headers })

      console.log(`[fetchBundleList] Response: ${response.status} ${response.statusText}`)

      if (response.ok) {
        const files = await response.json()
        const bundles = files
          .filter((f: any) => f.name.endsWith('-bundle.md'))
          .map((f: any) => f.name)
        console.log(`[fetchBundleList] Found ${bundles.length} bundles in ${subjectPath}`)
        return bundles
      } else {
        const errorText = await response.text()
        console.error(`[fetchBundleList] GitHub API error: ${errorText.substring(0, 200)}`)
      }
    } catch (e) {
      console.error(`[fetchBundleList] Exception for ${subjectPath}:`, e)
    }
  }

  console.log(`[fetchBundleList] No bundles found after trying all variants`)
  return []
}

// Fetch and parse a single bundle using GitHub API (supports private repos)
async function fetchBundle(country: string, exam: string, grade: number, subject: string, bundleName: string): Promise<ParsedQuestion[]> {
  const subjectPath = subject.toLowerCase().replace(/_/g, '-')
  const url = `${GITHUB_API_BASE}/colombia/${subjectPath}/grado-${grade}/${bundleName}`

  console.log(`[fetchBundle] Fetching: ${url}`)

  try {
    // Use GitHub API with raw content Accept header
    const response = await fetch(url, { headers: getGitHubHeaders(true) })
    console.log(`[fetchBundle] Response: ${response.status} ${response.statusText}`)

    if (!response.ok) {
      // Try with underscores
      const altPath = subject.toLowerCase().replace(/-/g, '_')
      const altUrl = `${GITHUB_API_BASE}/colombia/${altPath}/grado-${grade}/${bundleName}`
      console.log(`[fetchBundle] Trying alt URL: ${altUrl}`)
      const altResponse = await fetch(altUrl, { headers: getGitHubHeaders(true) })
      if (!altResponse.ok) {
        console.error(`[fetchBundle] Failed: ${altResponse.status} ${altResponse.statusText}`)
        return []
      }
      const content = await altResponse.text()
      console.log(`[fetchBundle] Alt content length: ${content.length}`)
      const bundleId = bundleName.replace('-bundle.md', '')
      const questions = parseBundle(content, bundleId)
      console.log(`[fetchBundle] Parsed ${questions.length} questions from alt`)
      return questions
    }

    const content = await response.text()
    console.log(`[fetchBundle] Content length: ${content.length}, first 100 chars: ${content.substring(0, 100)}`)
    const bundleId = bundleName.replace('-bundle.md', '')
    const questions = parseBundle(content, bundleId)
    console.log(`[fetchBundle] Parsed ${questions.length} questions`)
    return questions
  } catch (e) {
    console.error(`[fetchBundle] Exception:`, e)
    return []
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const grade = parseInt(url.searchParams.get('grade') || '11')
    const subject = url.searchParams.get('subject') || 'matematicas'
    const page = parseInt(url.searchParams.get('page') || '1')
    const country = url.searchParams.get('country') || 'co'
    const exam = url.searchParams.get('exam') || 'icfes'

    // Check authentication
    let isGuest = true
    let userId: string | null = null

    const authHeader = req.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? ''
      )

      const { data: { user }, error } = await supabase.auth.getUser(token)
      if (!error && user) {
        isGuest = false
        userId = user.id
      }
    }

    // Guest limit
    const GUEST_LIMIT = isGuest ? 10 : 50

    // Fetch bundles for this subject/grade
    const bundleNames = await fetchBundleList(country, exam, grade, subject)

    if (bundleNames.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        questions: [],
        total_questions: 0,
        is_guest: isGuest,
        country,
        exam_type: exam,
        grade,
        subject,
        page,
        meta: {
          filtered_out: 0,
          user_id: userId,
          cached_until: new Date(Date.now() + 300000).toISOString()
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Calculate pagination
    const questionsPerPage = GUEST_LIMIT
    const startBundle = (page - 1) * 2  // ~2 bundles per page (7 questions each)
    const endBundle = startBundle + 3
    const bundlesToFetch = bundleNames.slice(startBundle, endBundle)

    console.log(`[main] Fetching ${bundlesToFetch.length} bundles: ${bundlesToFetch.join(', ')}`)

    // Fetch and parse questions
    let allQuestions: ParsedQuestion[] = []

    for (const bundleName of bundlesToFetch) {
      console.log(`[main] Fetching bundle: ${bundleName}`)
      const questions = await fetchBundle(country, exam, grade, subject, bundleName)
      console.log(`[main] Bundle ${bundleName} returned ${questions.length} questions`)
      allQuestions = allQuestions.concat(questions)

      if (allQuestions.length >= questionsPerPage) break
    }

    console.log(`[main] Total questions fetched: ${allQuestions.length}`)

    // Apply limit
    const limitedQuestions = allQuestions.slice(0, questionsPerPage)

    return new Response(JSON.stringify({
      success: true,
      questions: limitedQuestions,
      total_questions: limitedQuestions.length,
      is_guest: isGuest,
      country,
      exam_type: exam,
      grade,
      subject,
      page,
      meta: {
        filtered_out: allQuestions.length - limitedQuestions.length,
        user_id: userId,
        cached_until: new Date(Date.now() + 300000).toISOString()
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Edge Function error:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
