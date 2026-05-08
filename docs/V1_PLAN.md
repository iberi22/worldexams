# WorldExams v1.0 — Plan de Ejecución

## Scope v1.0
Bundle generation pipeline funcionando, validado, sin CVEs críticas, P2P migrated, E2E coverage completa, docs al día.

---

## PHASE 1 — Security & CVEs (bloqueante para v1.0)

### 1.1 CVE Fix: @astrojs/language-server downgrade
- **Archivo**: saberparatodos/package.json
- **Acción**: `npm install @astrojs/language-server@2.13.4 --save-dev`
- **Razón**: 5 CVEs moderadas en yaml via volar-service-yaml
- **Riesgo**: bajo — solo afecta IDE/language server, no runtime

### 1.2 CVE Fix: Remotion/postcss decision
- **Acción**: INVESTIGAR si @remotion/cli se usa en producción
- Si NO → `npm audit fix --force` (resuelve 5 CVEs postcss)
- Si SÍ → Documentar en REMAINING_CVES.md como "blocked by production dependency"
- Buscar en: src/, scripts/, package.json keywords

### 1.3 P2P: Migrar trystero/supabase → @trystero-p2p/supabase
- **Archivo**: saberparatodos/src/lib/p2p-service.ts línea 1
- **Acción**: `npm install @trystero-p2p/supabase`
- Cambiar import de `trystero/supabase` → `@trystero-p2p/supabase`
- Test: `npm run test:unit -- --run`

---

## PHASE 2 — Pipeline Bugs (bloqueante para v1.0)

### 2.1 Fix check_queue.py x86/x64 crash
- **Archivo**: check_queue.py
- **Issue**: `except PermissionError: pass` capturando Access is denied (no PermissionError)
- **Fix**: Cambiar a `except OSError as e: if e.winerror == 5: pass` o mejor: eliminar lock file check broken
- Alternativa: reescribir para no depender de lock files en Windows

### 2.2 Delete malformed job.json files
- **Archivos**:
  - jobs/CO/matematicas/algebra/CO-algebra-001.job.json ("(D7)")
  - jobs/CO/sociales-ciudadanas/conceptos-economicos/CO-conceptos-economicos-001.job.json ("— D10")
  - jobs/CO/matematicas/ecuaciones-lineales/CO-ecuaciones-lineales-001.job.json ("Question 1")
  - jobs/CO/preicfes/prueba-generica/CO-question-001.job.json (HTML comments en options)
- **Acción**: Eliminar los 4 archivos

### 2.3 Re-enable cronjob after pipeline validated
- **Job ID**: b9930a4f-1f19-42b6-952d-c969070d8e5e
- **Acción**: Habilitar SOLO después de que 2.1 y 2.2 estén completos

---

## PHASE 3 — Bundle Regeneration

### 3.1 Regenerate P2 continuidad bundles (002 y 003)
- **Paths**:
  - questions_data/colombia/matematicas/grado-11/periodo-2/continuidad/CO-MAT-11-P2-continuidad-002-MASTERY-bundle.md
  - questions_data/colombia/matematicas/grado-11/periodo-2/continuidad/CO-MAT-11-P2-continuidad-003-MASTERY-bundle.md
- **Acción**: Lanzar direct-generate.py para estos topics
- **Bloqueado por**: Phase 2 completa

### 3.2 Regenerate empty topics
Prioridad:
1. ciencias-naturales (grado 11)
2. ingles (grado 11)
3. sociales-ciudadanas (grado 11)
4. filosofia (grado 11)
5. razonamiento-cuantitativo (grado 11)

---

## PHASE 4 — Test Coverage

### 4.1 api-service.ts unit tests
- **Archivo**: saberparatotos/src/lib/api-service.test.ts (0% coverage)
- **Acción**: Crear tests para:
  - fetchQuestionsFromPacks (cache hit/miss)
  - transformQuestion (option normalization)
  - deduplication logic
  - quarantine flow
- **Framework**: vitest (ya configurado en proyecto)

### 4.2 Landing page Astro upgrade
- **Workspace**: E:\scripts-python\worldexams\landing
- **Acción**: npm install astro@latest en landing (actualmente 5.18.1)
- **Test**: verificar que landing拼 build correctamente

---

## PHASE 5 — Documentation v1.0

### 5.1 Docs README audit
- Leer docs/README.md
- Verificar que todos los documentos listados existan
- Agregar docs faltantes (IMPLEMENTATION_PLAN_2025-12.md ya archivado)
- Crear docs/PROJECT_STATE.md con estado actual del proyecto

### 5.2 Skills minimal expand
- math_short_remotion_architect (<2000 bytes)
- social_distribution_manager (<2000 bytes)
- local_voice_and_timing_orchestrator (<2000 bytes)
- Agregar: description, trigger conditions, version

---

## Dependencies entre fases

```
Phase 1 (seguridad)
├── 1.1 @astrojs/language-server downgrade ──┐
├── 1.2 Remotion decision ─────────────────┤
└── 1.3 P2P migration ─────────────────────┤

Phase 2 (pipeline)
├── 2.1 check_queue.py fix ────────────────┼──→ Phase 3 (desbloqueada)
├── 2.2 Delete malformed jobs ─────────────┤
└── 2.3 Re-enable cronjob ────────────────┘

Phase 3 (bundles)
├── 3.1 P2 continuidad bundles
└── 3.2 Empty topics

Phase 4 (tests)
├── 4.1 api-service tests
└── 4.2 Landing Astro upgrade

Phase 5 (docs)
├── 5.1 Docs README audit
└── 5.2 Skills expand
```

---

## Agent assignments (paralelo)

| Agent | Tasks |
|-------|-------|
| A | 1.1 + 1.2 + 1.3 (security) |
| B | 2.1 + 2.2 (pipeline bugs) |
| C | 4.1 + 4.2 (tests + landing) |
| D | 5.1 + 5.2 (docs + skills) |
| E | 3.1 + 3.2 (bundle regeneration) |

Cronjob: habilitar DESPUÉS de que Agent B confirme 2.1 y 2.2 completos.
