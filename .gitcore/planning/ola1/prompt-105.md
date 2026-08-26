Tarea WX-105 — features.json v2 honesto + implementation-score + guías SWAL (issue #993)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola1-105, rama wx/ola1-105)
LEE PRIMERO: AGENTS.md raíz + docs/SWAL/ si existe.

ISLA (SOLO): .gitcore/** y docs/SWAL/**

CONTEXTO: el implementation-score 82.2% data del 28-jul y está desactualizado. El features.json actual (51% honesto, commit 601eb828d) ya incorporó D-101..D-105.

PASOS:
1. Audita .gitcore/features.json actual: cada feature debe tener progress_pct justificable con evidencia (archivo/ruta existente o test). Corrige inflados.
2. Recalcula implementation-score global con la fórmula de GitCore (promedio ponderado por prioridad) y actualiza metadata {score, calculated_at}.
3. Sincroniza con código real: verifica que implemented_in apunte a rutas que existen (ls). Marca caveats donde haya MVP parcial.
4. En docs/SWAL/: añade/actualiza guía corta "estado del proyecto y cómo auditarlo" (cómo correr validate, audit:country-readiness, cómo leer features.json).
5. git add .gitcore docs/SWAL && git commit -m "chore(gitcore): features.json v2 honesto sincronizado + implementation-score recalculado + guías SWAL (#993)"

NO toques código de app ni questions_data.
