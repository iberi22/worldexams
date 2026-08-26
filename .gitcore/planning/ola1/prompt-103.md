Tarea WX-103 — Parchear contentErrors CHILE (10) + PERÚ (10)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola1-103, rama wx/ola1-103)
LEE PRIMERO: AGENTS.md raíz (protocolo v5.2).

ISLA (SOLO): questions_data/chile/** y questions_data/peru/**

PASOS:
1. npm run validate 2>&1 | tee /tmp/wx103-before.txt → errores de CL y PE.
2. Parchea según v5.2/D1: bundle_index, calibration {difficulty_band, expected_success}, rangos de dificultad, conteos por grado, feedbacks, única [x], sin "todas las anteriores".
3. CL: contexto PAES/chileno, CLP. PE: contexto CNEB/peruano, PEN. Entidad solo en frontmatter alignment; dentro de pregunta usar **EJE:**.
4. Re-valida: 0 contentErrors en ambas carpetas.
5. git add questions_data/chile questions_data/peru && git commit -m "fix(content-cl-pe): parcheo contentErrors v5.2 (10 CL + 10 PE)"

Reporta antes/después.
