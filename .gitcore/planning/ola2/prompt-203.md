Tarea WX-203 — Backend social capa 2: community_explanations + votos firmados

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola2-203)
LEE: AGENTS.md + si existe src/pages/api/* para patrón de endpoints.

ISLA (SOLO): supabase/** (migraciones), src/pages/api/explanations.ts

CONTEXTO (Decisión D3): el social tiene 3 capas: (1) discusión por pregunta (Giscus, ya existe), (2) explicaciones comunitarias (NUEVO — esta task), (3) hilos por explicación (WX-302). Sin karma/tokens (BR-03): reputación local de la red.

PASOS:
1. Migración SQL (supabase/migrations/NNNN_create_community_explanations.sql):
   - tabla `community_explanations`: id uuid pk, question_id text not null, node_hash text not null (hash del nodo emisor), content text not null, vote_count integer default 0, status text check (draft/published/flagged), created_at timestamptz default now()
   - tabla `community_votes`: id uuid pk, explanation_id uuid fk→explanations, voter_node_hash text not null, signature text not null (ML-DSA-65 placeholder: text por ahora), vote integer in (-1,+1), created_at, unique(explanation_id, voter_node_hash)
   - RLS: select public para status=published; insert own node_hash only; update/delete own only
2. src/pages/api/explanations.ts (Astro SSR endpoint):
   - GET ?question_id=... → list explanations publicadas (orden vote_count desc, limit 10)
   - POST body { question_id, content, node_hash } → crea explanation draft (rate limit: 1/60s por node_hash)
   - POST /vote body { explanation_id, voter_node_hash, vote: +1|-1, signature } → registra voto único por voter+explanation
   - Filtros de contenido: eliminar HTML peligroso (sanitization básica con regex, no lib externa nueva).
3. Tests básicos en tests/api/explanations.test.ts:
   - GET retorna lista vacía al inicio
   - POST crea explanation
   - POST voto incrementa vote_count
   - Sin duplicados de voto por mismo voter_node_hash
4. SIN karma/telemetría/SWAL tokens — BR-03: los votos son reputación pura de la red. Sin Supabase para autenticación de wallet (el node_hash es el identificador).

CIERRE:
- git add supabase src/pages/api/explanations.ts tests/api
- git commit -m "feat(social-api): community_explanations + votos firmados, rate-limit, tests (#203)"
- Reporta: schema SQL, endpoints, tests.
