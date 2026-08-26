Tarea WX-204 — Nodo worldexams en red Xavier propia (D-102)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola2-204)
LEE: AGENTS.md + docs/SWAL/* + si existe src/lib/mesh/**.

ISLA (SOLO): src/lib/mesh/**, docs/SWAL/ADR-worldexams-mesh.md

CONTEXTO (Decisión D-102): WorldExams tiene SU PROPIA red Xavier (no comparte con SWAL). Sync cifrado por wallet vía endpoint `/v1/f12/private-mesh/sync` del Xavier server. Payload de notas: SOLO `{node_hash, subject, week, score, avg}` (BR-04: protege datos personales; BR-06: opt-in revocable). cero PII. Persistencia en nodos Xavier genera storage rent al operador nodal (D-105/D6 — solo operador cobra, estudiante excluido).

PASOS:
1. src/lib/mesh/WorldExamsNode.ts: Clase que lee config de XavierURL + wallet private key desde localStorage/config. Implementa interfaces: subscribe(), publish(), getPeers().
2. src/lib/mesh/XavierSyncClient.ts: wrapper HTTP client para /v1/f12/private-mesh/sync — envía payload mínimo {node_hash, subject, week, score, avg} por materia/semana, recibe vectores agregados anónimos de otros nodos de worldexams.
3. src/lib/mesh/types.ts: interfaces TipData {node_hash, subject, week, score, avg}, SyncPayload, PeerStats.
4. docs/SWAL/ADR-worldexams-mesh.md: Architecture Decision Record explicando: por qué red propia, payloads, BR-03/BR-04/BR-06, storage rent (solo operador), zerop-PII guarantee, relación con red general SWAL.
5. Tests básicos mocks: tests/mesh/XavierSyncClient.test.ts (mock fetch, verifica POST correcto con payload mínimo, falla si PII detectado).
6. NO modificar src/lib/mesh/ existente si hay otro contenido; crear OVERWRITE no, añadir solo.

CIERRE:
- git add src/lib/mesh docs/SWAL tests/mesh && npm run test -- --run
- git commit -m "feat(mesh): nodo WorldExams en red Xavier propia, sync cifrado, ADR, tests mocks (#204)"
- Reporta: archivos, schema de sync, ADR link.
