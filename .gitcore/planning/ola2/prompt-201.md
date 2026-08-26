Tarea WX-201 — Ingesta PDF 100% local (web-llm / WebGPU)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola2-201)
LEE: AGENTS.md raíz.

ISLA (SOLO): src/lib/ai/pdf/** (y any dependencia ya existente en package.json: web-llm, pdfjs-dist, pdf.js, transformers.js).

CONTEXTO: Objeto es que el PDF nunca salga del dispositivo. Extracción texto + chunking + embeddings WebGPU (web-llm) + persistencia IndexedDB (idb lib). Las dependencias pdf.js y web-llm ya están (vía web-llm ecosystem: @huggingface/transformers).

PASOS:
1. Estructura: src/lib/ai/pdf/index.ts (export functions), extractor.ts (pdf.js extraction), chunker.ts (semantic chunking 512 tokens, overlap 50), embedder.ts (web-llm embeddings, model por defecto "Xenova/all-MiniLM-L6-v2" via @huggingface/transformers), storage.ts (IndexedDB via idb).
2. Interface pública: parsePDF(file: File): Promise<PDFDoc> { chunks: Chunk[], metadata }. Chunk = { id, text, embedding (Float32Array), page, offset }. Persiste en IndexedDB con namespace `wx-pdf-{hash}`.
3. tests/: src/lib/ai/pdf/__tests__/extractor.test.ts y chunker.test.ts usando un fixture .pdf minimal (genera uno con pdf-lib en test setup). Tests unitarios puros, sin browser. vitest.
4. NO incluir UI — solo lib/ai/pdf/**/*. La UI (estudio.astro) es WX-202.
5. vite.config vitest setup correcto (si no existe, añadirlo a la configuración existente).

CIERRE:
- git add src/lib/ai/pdf && npm run test -- --run (vitest)
- git commit -m "feat(ai-pdf): ingestión PDF 100% local — extractor+chunker+embedder WebGPU+IndexedDB, tests unitarios"
- Reporta: archivos creados, tests pasando, dependencias usadas.
