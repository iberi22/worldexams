# Testing Guide - Training Room Feature

## Prerequisites

1. **Supabase Secrets Configured:**
   - ✅ GEMINI_API_KEY (configured)
   - ⚠️ REPLICATE_API_KEY (pending - see docs/SUPABASE_SECRETS_SETUP.md)
   - ⚠️ CRON_SECRET (pending)

2. **User Account:**
   - Create test account via Supabase Auth
   - Ensure profile exists in `profiles` table
   - Verify initial credits (50 for free tier)

3. **Development Server:**
   ```bash
   cd saberparatodos
   npm run dev
   ```

## Test Flow: Training Room

### Step 1: Navigate to Training Page
```
http://localhost:4321/training
```

**Expected:**
- Credit widget visible in header
- Topic selector with 4 options (Álgebra highlighted)
- Visual style selector (4 styles)
- "Comenzar Entrenamiento" button

### Step 2: Select Topic & Style
1. Click different topics → Border should change to yellow (#fcd116)
2. Click different styles → Border should highlight
3. Verify selections are stored (check console if needed)

### Step 3: Start Training Session

**Click "Comenzar Entrenamiento"**

**Expected Backend Call:**
```
POST https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/start-training-session
Body: { "subject": "matematicas", "topic": "algebra" }
```

**Expected Response:**
```json
{
  "success": true,
  "session_id": "uuid",
  "starting_difficulty": 3,
  "recommended_topic": "algebra",
  "performance_analysis": {
    "avg_percentage": 50,
    "exams_analyzed": 0
  },
  "initial_questions": []
}
```

**Expected UI:**
- Button text changes: "⏳ Iniciando..." → "✅ Sesión Iniciada"
- Training feed appears below
- System message: "¡Sesión iniciada! 📊 Nivel de dificultad: 3/5..."
- Initial questions listed (if any exist)

### Step 4: Request Infographic

**Type in chat:** "Genera una infografía visual"

**Expected Backend Call:**
```
POST https://tzmrgvtptdtsjcugwqyq.supabase.co/functions/v1/generate-infographic
Body: {
  "topic": "algebra",
  "visual_style": "minimalist",
  "training_session_id": "session_uuid"
}
```

**Expected Flow:**
1. User message appears (blue bubble, right-aligned)
2. System message: "🎨 Generando infografía... (esto puede tomar 20-30 segundos)"
3. Send button disabled, shows "⏳"
4. After ~25 seconds:
   - System message: "✅ ¡Infografía generada!"
   - Image appears in feed (centered)
5. Send button re-enabled

**If fails (no REPLICATE_API_KEY):**
- Error message in red: "Error al generar infografía. Verifica que tengas suficientes créditos."

### Step 5: Verify Credit Deduction

**Check Credit Widget:**
- Initial credits: 50
- After infographic: 45 (deducted 5)
- Countdown timer updates

**Database Verification:**
```sql
-- Check transactions
SELECT * FROM transactions
WHERE user_id = 'your_user_id'
ORDER BY created_at DESC
LIMIT 5;

-- Check generated content
SELECT * FROM generated_content
WHERE user_id = 'your_user_id'
ORDER BY created_at DESC
LIMIT 5;

-- Check profile credits
SELECT credits FROM profiles
WHERE id = 'your_user_id';
```

### Step 6: End Session

**Click "Finalizar" button**

**Expected:**
- Training feed disappears
- Messages cleared
- Start button re-enabled
- Can start new session

## Error Scenarios to Test

### 1. Insufficient Credits
**Setup:** Manually set credits to 0 in database
```sql
UPDATE profiles SET credits = 0 WHERE id = 'your_user_id';
```

**Expected:** HTTP 402 error, message "Insufficient credits"

### 2. Not Authenticated
**Setup:** Logout user or clear auth token

**Expected:** Error alert "No authenticated session"

### 3. Network Error
**Setup:** Disconnect internet or block Supabase URL

**Expected:** Error message with retry option

## Performance Benchmarks

| Action | Expected Time | Notes |
|--------|---------------|-------|
| Start session | <2s | Database query + analysis |
| Generate infographic | 20-30s | Replicate API (Flux-schnell) |
| Display image | <1s | CDN-hosted image |
| Credit deduction | <500ms | Atomic transaction |

## Debug Commands

```bash
# Watch Edge Function logs
supabase functions logs start-training-session --tail

# Check Supabase database
psql $DATABASE_URL -c "SELECT * FROM profiles LIMIT 5;"

# Test Edge Function locally
curl -X POST http://localhost:54321/functions/v1/start-training-session \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject":"matematicas","topic":"algebra"}'
```

## Known Issues

1. **REPLICATE_API_KEY not configured:** Infographic generation will fail with 401
2. **No exam history:** Starting difficulty defaults to 3 (medium)
3. **No questions in database:** `initial_questions` array will be empty

## Next Steps After Testing

1. Configure REPLICATE_API_KEY (see docs/SUPABASE_SECRETS_SETUP.md)
2. Populate questions database for better testing
3. Add more sophisticated chat interactions (integrate Gemini for Q&A)
4. Implement progress tracking and difficulty adjustment
5. Add analytics dashboard
