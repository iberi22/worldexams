# WorldExams — Plan de Refinamiento Multiphase

## Contexto del Code Review
5 agentes de code review completados (2026-04-25):
- Docs Review
- Tests Review
- Dependencies Review
- Security Review
- Architecture & Code Quality Review

---

## DIAGNOSTICO: El normalizador de bundles

### Lo que hace `normalize_gen.py`
1. Convierte headers de pregunta (`Pregunta N`, `Question N`, `P1.`) → `## Question N`
2. Normaliza formato de opciones (`A) texto`, `- A) texto`) → `- [ ] A) texto`
3. Busca markers `**Respuesta: B**` en el texto y marca la opción correcta
4. Elimina negritas `**texto**` → `texto`
5. Salta bloques `REVIEW METADATA`

### RIESGO CRÍTICO encontrado
`mark_correct_answer()` busca `**Respuesta: X**` en el texto. Si el LLM produce un formato diferente (ej: `Respuesta correcta: C`, o simplemente marca con `[x]` en la opción correcta), el normalizador **no encuentra** el marker y deja TODAS las opciones como `[ ]` — la respuesta correcta se pierde silenciosamente.

### Decision
- El normalizador HACE modificacion de contenido (no solo formateo)
- No debe tomar decisiones sobre qué opción es correcta
- Debe limitarse a: formatear headers, normalizar sintaxis de opciones, limpiar negritas

---

## FASE 1 — Seguridad urgente (hoy)
**Owner:** opencode x2 agents paralelos

### F1.1: Remover secreto de .env
- File: `E:\scripts-python\worldexams\.env`
- Action: Remover `CORTEX_API_KEY=dev-token` del archivo .env tracked
- Git: Commit con mensaje "security: remove hardcoded CORTEX_API_KEY from .env"

### F1.2: Fix Turnstile fallback hardcodeado
- File: `saberparatodos\src\pages\api\verify-captcha.ts`
- Action: Eliminar fallback `|| '1x0000000000000000000000000000000AA'`
- Si env var no existe → responder 403, no bypass
- Agregar warning en logs si TURNSTILE_SECRET_KEY no está configurado

### F1.3: Rate limiting en POST /api/comments
- File: `saberparatodos\src\pages\api\comments.ts`
- Action: Agregar rate limit simple (ej: 5 posts/IP/minuto)
- Usar header existente o crear func helper

### F1.4: Moderación GET → POST con CSRF
- File: `saberparatodos\src\pages\api\moderate.ts`
- Action: Convertir de GET con secret en URL → POST con secret en body
- Agregar CSRF token

---

## FASE 2 — Bugs críticos del pipeline (esta semana)

### F2.1: Fix bare except en direct-generate.py
- Files: `scripts/direct-generate.py:90, 102`
- Problem: bare `except: pass` hace leak del lock file
- Fix: exception específica + logging + fallback cleanup

### F2.2: Remover logic de "marcar respuesta correcta" del normalizador
- File: `scripts/normalize_gen.py`
- Problem: `mark_correct_answer()` modifica contenido basándose en texto del LLM
- Fix: Eliminar `mark_correct_answer()` y la búsqueda de `**Respuesta:**`
- El LLM debe producir la respuesta correcta marcada con `[x]` desde el inicio
- El normalizador solo formatea, no toma decisiones

### F2.3: Protocol version 5.2 en generate_prompt
- File: `scripts/direct-generate.py` → `generate_prompt()`
- Fix: Cambiar `protocol_version: "5.1"` → `protocol_version: "5.2"`
- Update: CHANGELOG.md

### F2.4: Fix validate_questions.py path hardcodeado
- File: `scripts/direct-generate.py`
- Problem: Importa desde `C:\Users\belal\clawd\skills\worldexams-validator` (absoluto)
- Fix: Copiar validate_questions.py local como primary, skill como override opcional

---

## FASE 3 — Deps y infrastructure (esta semana)

### F3.1: npm audit fix --force (saberparatodos)
- Workspace: `saberparatodos`
- Fix: `npm audit fix --force` para fixa uuid CVE (trystero → 0.23.1)
- Importante: Test P2P después del upgrade (breaking change en trystero)

### F3.2: Upgrade Astro (saberparatodos + landing)
- saberparatodos: `6.0.6 → 6.1.9` (patch XSS + SSRF)
- landing: `5.18.1 → 5.x latest`
- Test post-deploy: pages cargan, E2E pasan

### F3.3: Align TypeScript versions
- tests workspace: `5.3.0 → 5.9.3` (match con resto)

---

## FASE 4 — Tests (próxima semana)

### F4.1: E2E matrix en CI
- File: `.github/workflows/e2e-tests.yml`
- Problem: solo corre `party-smoke.spec.ts` de 25 specs
- Fix: Crear matrix strategy para correr specs críticos en paralelo

### F4.2: Tests para api-service.ts
- File: `saberparatodos/src/lib/api-service.test.ts`
- Cover: fetch, cache, transform, quarantine, deduplication
- Mock: usar MSW o vitest built-in setupFiles

### F4.3: Fix playwright/vitest isolation
- Problem: Symbol conflict cuando se corren juntos
- Fix: Scripts separados `test:unit` vs `test:e2e`, incluir distintos

---

## FASE 5 — Arquitectura (próxima semana)

### F5.1: CEFR_LEVEL_NUM index signature
- Files: `src/lib/english-proficiency.ts`, `src/lib/adaptive-engine.ts`, `src/lib/orchestrator.ts`
- Problem: `as any` casts en 12+ lugares para acceder CEFR
- Fix: Agregar index signature a `CEFR_LEVEL_NUM` y `CEFR_ORDER`

### F5.2: AppQuestion interface con meta field
- File: `src/lib/questions/types.ts`
- Problem: runtime tiene `.meta.cefr_level` pero interface no lo declara
- Fix: Extender `AppQuestion` con `meta?: { cefr_level?: string; cefrLevel?: string; difficulty?: number }`

### F5.3: Split api-service.ts God Object
- File: `src/lib/api-service.ts` (460 líneas)
- Split: `pack-fetcher.ts`, `question-transformer.ts`, `question-cache.ts`
- Extraer `ensureOptionIds()` helper

### F5.4: Deduplicate applyFilters en orchestrator.ts
- File: `src/lib/questions/orchestrator.ts`
- Problem: filter chain duplicado (líneas 87-96 y 107-118)
- Fix: Extraer `applyFilters(questions, request)` helper

---

## FASE 6 — Documentation (próxima semana)

### F6.1: Archive IMPLEMENTATION_PLAN.md
- File: `docs/IMPLEMENTATION_PLAN.md`
- Action: Mover a `docs/ARCHIVED/IMPLEMENTATION_PLAN_2025-12.md` con banner ARCHIVED

### F6.2: Fix PROJECT_README.md
- File: `PROJECT_README.md`
- Action: Regenerar desde `ls` real del root

### F6.3: Expand minimal skills
- Skills: `math_short_remotion_architect`, `social_distribution_manager`, `local_voice_and_timing_orchestrator`
- Action: Agregar description, trigger conditions, version field

### F6.4: Verify/create scripts/API_GENERATION.md
- File: `docs/API_GENERATION.md`
- Problem: referencia script `scripts/generate-questions-api.ps1` inexistente
- Action: Crear el script o archivar/eliminar el doc

---

## Estado de cada fase
- [ ] FASE 1 — Seguridad urgente
- [ ] FASE 2 — Bugs críticos del pipeline
- [ ] FASE 3 — Deps e infrastructure
- [ ] FASE 4 — Tests
- [ ] FASE 5 — Arquitectura
- [ ] FASE 6 — Documentation
