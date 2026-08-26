Tarea WX-303 — Corrección colaborativa: reporte → draft → revisión → patch exportable

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola3-303)
LEE: AGENTS.md + src/pages/api/explanations.ts (patrón de endpoints).

ISLA (SOLO): src/lib/corrections/**, src/pages/api/corrections.ts

CONTEXTO: Corrección colaborativa: un usuario reporta error en un bundle → se crea un draft → otros nodos revisan → si se aprueba → se genera un patch .md exportable listo para PR al pipeline de contenido.

PASOS:
1. src/lib/corrections/types.ts: CorrectionReport { id, question_id, question_bundle_path, error_type: enum(error_factual|error_format|error_distractor|other), description, reporter_node_hash, created_at, status: draft|reviewing|approved|rejected, patches: Patch[], reviewers: Review[] }. Patch { file_path, diff_unified: string }. Review { reviewer_node_hash, vote: approve|reject, comment, timestamp }.
2. src/lib/corrections/CorrectionEngine.ts: reportCorrection(report) → creates draft (persist in IndexedDB 'wx-corrections-{bundle_hash}'). approveCorrection(id, reviewer) → tally: approved if >= 2 reviewers approve. generatePatch(correction) → produce unified diff por cada question afectada (formato unido simple, NO lib externa: diff manual de líneas con +/~ prefix). exportPatch(correction) → genera .md file content listo para commit al pipeline.
3. src/pages/api/corrections.ts (Astro SSR endpoint):
   - POST /api/corrections → crear reporte
   - GET /api/corrections?question_id=X → listar reportes
   - POST /api/corrections/:id/review → votar review
4. Tests: tests/corrections/CorrectionEngine.test.ts (report → approve flow, generatePatch output format, export produce .md válido).

CIERRE:
- git add src/lib/corrections src/pages/api/corrections.ts tests/corrections
- git commit -m "feat(corrections): corrección colaborativa report→draft→review→patch exportable, tests (#303)"
