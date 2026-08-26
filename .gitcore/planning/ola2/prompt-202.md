Tarea WX-202 — Estudio de generación: subir PDF → RAG → preguntas → exportar

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola2-202)
LEE: AGENTS.md raíz + nodes_modules/@astrojs/* si miras estructura astro.

ISLA (SOLO): src/pages/estudio.astro, src/components/studio/**

CONTEXTO:
- El PDF parsing está en `src/lib/ai/pdf/` (WX-201 crea esto — importar de ahí como aliado externo).
- Generación de preguntas: reutilizar `src/lib/generators/exam-generator.ts` y `COUNTRY_RULE_HINTS` + `validateLocalQuestion` (si existen; search en src/ por exam-generator o generate-question).
- El usuario sube PDF, el sistema lo ingesta vía lib/ai/pdf, RAG select chunks + LLM local (web-llm) para generar preguntas v5.2, las muestra en UI editables, y al exportar crea un .md con naming canónico. Marca `creador: local-llm`.
- Nunca auto-publica: el archivo queda como draft descargable.

PASOS:
1. src/pages/estudio.astro: Página Astro con upload widget (input file .pdf), botón "Generar", área de resultados, botón "Exportar .md". TailwindCSS para styling, responsive.
2. src/components/studio/UploadWidget.astro: drop zone + preview del nombre del archivo.
3. src/components/studio/QuestionEditor.astro: lista editable de preguntas generadas (Bloom, dificultad, opciones con toggle correcta). Permite editar texto.
4. src/components/studio/ExportButton.astro: genera y descarga .md usando template frontmatter v5.2 + formateo de preguntas según AGENTS.md.
5. Integración: estudio.astro orquesta: upload → lib/ai/pdf.parsePDF → chunker → select top 5 chunks relevantes → llama a LLM web-llm local para generar 10 preguntas v5.2 → renderiza en QuestionEditor → exporta con ExportButton.
6. Tests: un test simple de ExportButton output format (genera fixture JSON → compara con .md esperado). Vitest.
7. NO tocar questions_data/ (el export va a descarga del usuario, no al filesystem).

CIERRE:
- git add src/pages/estudio.astro src/components/studio && npm run test -- --run
- git commit -m "feat(estudio): UI generación de preguntas desde PDF local → RAG → export .md v5.2"
- Reporta: componentes creados, flujo E2E documentado.
