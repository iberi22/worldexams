# question-generator — DECISIÓN (F5)

Este módulo (`QuestionGenerationService`, `QuestionEvaluationService`, agentes Gemini) es
**tooling offline de generación de contenido**, no superficie del Worker.

- No está montado en `src/index.ts` (`fetch`) y así se mantiene: el API público solo expone
  `/v1/packs/*`, `/v1/questions`, `/v1/premium/questions`, `/health`.
- Uso previsto: pipelines de generación asistida (Jules/Hermes) fuera del runtime del Worker.
- Requiere `GeminiEnv` (API key externa); por la era privada, la generación on-device vive en
  `edge-mesh/src/ai-core` y el generador local de `saberparatodos/src/lib/ai/exam-generator.ts`.
- Si en el futuro se publica como endpoint, debe ir detrás de auth de operador + rate limit,
  nunca como superficie pública.

Fecha de decisión: 2026-07-28.
