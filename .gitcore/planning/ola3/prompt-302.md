Tarea WX-302 — Social hilos por explicación (capa 3 D3)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola3-302)
LEE: AGENTS.md + src/pages/api/explanations.ts (WX-203 crea la API base).

ISLA (SOLO): src/components/social/**

CONTEXTO (D3 capa 3): hilos POR EXPLICACIÓN (responder/citar/ampliar), y la mejor explicación calificada emerge como "Explicación de la comunidad". Usa la API de explanations (WX-203) como backend.

PASOS:
1. src/components/social/ExplanationThread.astro: Muestra una explicación + sus hilos de respuesta anidados. Cada hilo = { content, node_hash, vote_count, replies: ThreadNode[] }. Botón "Citar" (inserta referencia a explicación padre), "Ampliar" (añade contexto).
2. src/components/social/ThreadReplyForm.astro: Formulario inline para responder a una explicación existente (content textarea + enviar). POST al endpoint /api/replies o extiende explanations.ts con sub-endpoint.
3. src/components/social/BestExplanationBanner.astro: Muestra la explicación con más votos positivos por question_id como "Explicación destacada de la comunidad". Badge + voto.
4. src/components/social/CommentSection.astro: Wrapper que integra ExplanationThread + botón "Añadir explicación" + BestExplanationBanner. Se monta en las páginas de detalles de pregunta (si existen) o como componente reutilizable.
5. Data: Explicaciones vienen de GET /api/explanations?question_id=X. Replies de GET /api/replies?explanation_id=X. POST /api/replies { explanation_id, content, node_hash } para crear reply.
6. Tests: tests/social/ExplanationThread.test.ts (renderiza thread con respuestas mock), tests/social/BestExplanationBanner.test.ts (selecciona mayor voto).

CIERRE:
- git add src/components/social tests/social
- git commit -m "feat(social): hilos por explicación, citar/ampliar, banner destacada, tests (#302)"
