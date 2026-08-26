# ADR-WX204 — WorldExams en red Xavier propia (D-102)

**Estado:** ACEPTADA  
**Fecha:** 2026-08-26  
**Decisión madre:** D-102 (docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md)  
**Isla:** `src/lib/mesh/**` · `tests/mesh/**`  
**Protocolo:** GitCore 3.8 · BR-03 / BR-04 / BR-06 / D-105  
**Autor:** WX-204 (Muse Spark — nodo WorldExams)

---

## 1. Contexto

SWAL es una **red de apps agentic (PWA)** con nodo propio, memoria Xavier y mesh `edge-mesh`. Xavier puede hospedar **N redes simultáneas** como entidades de primera clase (`MeshNetwork{id, members, acl, rules}`) — jerárquicas (con CEO) o planas/comunitarias (sin líder).

Hasta D-101, WorldExams usaba implícitamente la **red SWAL** para telemetría/karma. D-102 corrige eso:

> **WorldExams tiene SU PROPIA red Xavier, separada de la red SWAL.**

Razones canónicas (ver `docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md`):

- **D-101 — Multi-red nativa:** Xavier ya soporta `MeshNetwork` con ACL y grants cruzados (`private_mesh.rs`, `f12/groups`, `enterprise/rbac.rs`). Falta cerrar: *networks de primera clase* + *grants granulares* (WX-205).
- **D-102 — Topología:** dos redes separadas — **SWAL** (plana, telemetría/anonimizada/karma) y **WorldExams** (independiente, reglas educativas). WorldExams **no aporta telemetría a SWAL ni consume su economía**.
- **D-103 — Ética menor:** el leaderboard de notas es **red privada** excluida de tokens/karma/telemetría. Solo el propio usuario ve su nombre/puesto; el resto ve agregados anónimos.
- **D-104 — Implicaciones técnicas:** sync cifrado por wallet, grants granulares con expiry, karma bridge **prohibido**, telemetría **prohibida**, gobernanza por votación firmada.
- **D-105 — Economía bifurcada:** la persistencia en nodos Xavier genera **storage rent al operador nodal** (`StorageProvided → reward_storage_rent_provider()`), no al estudiante.

---

## 2. Decisión

Se crea el **nodo WorldExams** como miembro de una red Xavier dedicada `worldexams-private-mesh`, con:

### 2.1 Stack

| Capa | Artefacto | Ruta |
|------|-----------|------|
| Types & guards | `TipData`, `SyncPayload`, `PeerStats`, `assertNoPII()` | `src/lib/mesh/types.ts` |
| HTTP client | `XavierSyncClient` — `POST /v1/f12/private-mesh/sync` | `src/lib/mesh/XavierSyncClient.ts` |
| Node facade | `WorldExamsNode` — `subscribe/publish/getPeers` + `localStorage` config | `src/lib/mesh/WorldExamsNode.ts` |
| Tests | mocks fetch + PII rejection | `tests/mesh/XavierSyncClient.test.ts` |

### 2.2 Payload — principio de mínimo privilegio (BR-04)

**Solo** se envía:

```json
{
  "node_hash": "wx-a1b2c3d4e5...",
  "subject": "matematicas",
  "week": "W01",
  "score": 85,
  "avg": 78
}
```

- `node_hash` = hash opaco del wallet/node (nunca email/nombre/DNI).
- `subject`/`week` identifican el bundle semanal (W01..W40).
- `score`/`avg` son enteros 0..100.

Cero PII — validado **antes** de salir a la red por `assertNoPII()` (allow-list estricta). Cualquier clave extra (`email`, `name`, `phone`, `dni`, `student_id`, etc.) o valor con forma de email hace fallar la llamada localmente sin tocar la red. El servidor también rechaza vectores que contengan PII.

### 2.3 Sync cifrado por wallet

- Endpoint: `POST {xavierUrl}/v1/f12/private-mesh/sync` (ver `SYNC_PATH`).
- Header `X-Wallet-Hash` (o `Authorization` con firma Ed25519/ML-DSA-65 en prod) — el server deriva el nodo sin recibir la private key.
- Body JSON cifrado en tránsito (TLS); el nodo Xavier persiste cifrado at-rest.
- Respuesta: `SyncResponse{ ok, vectors: AggregatedVector[] }` — **vectores agregados anónimos** (`count`, `avg`, `p50/p90`) de otros nodos worldexams. Nunca identidades.

### 2.4 API del nodo

```ts
const node = new WorldExamsNode(); // lee XavierURL + walletPrivateKey de localStorage
node.setOptIn(true);               // BR-06: revocable, default false

// Envía nota mínima y actualiza cache de peers
await node.publish({ node_hash: node.config.nodeHash, subject: 'matematicas', week: 'W01', score: 85, avg: 78 });

// Lee agregados anónimos (count/avg por materia/semana)
const peers = await node.getPeers();

// Suscripción reactiva para UI (leaderboard)
const off = node.subscribe((vectors) => renderLeaderboard(vectors));
```

- `publish()` es **no-op** si `optIn === false` (BR-06).
- `getPeers()` retorna snapshot del cache (sin fetch extra).
- `subscribe()` emite inmediatamente el cache y luego cada `publish()`.

### 2.5 Config & persistencia

| Clave localStorage | Propósito |
|--------------------|-----------|
| `worldexams.xavierUrl` | URL base Xavier (default `http://127.0.0.1:8006`) |
| `worldexams.walletPrivateKey` | Seed/private key que cifra el sync |
| `worldexams.nodeHash` | Hash opaco derivado (o provisto) |
| `worldexams.mesh.optIn` | `1`/`0` — opt-in revocable (BR-06) |

Lectura tolerante a SSR (si `localStorage` no existe, usa defaults/overrides inyectados). `WorldExamsNode.setXavierUrl()` valida con `new URL()` y recrea el cliente.

---

## 3. Relación con la red general SWAL

```
Xavier server
├── Red SWAL (plana/comunitaria)         ← telemetría/karma de apps SWAL
│   namespace: swal/*, economic core $SWAL
│
└── Red WorldExams (privada, D-102)      ← ESTA ADR
    namespace: worldexams-private-mesh
    endpoint: /v1/f12/private-mesh/sync
    payload: {node_hash, subject, week, score, avg}
    economía: storage rent SOLO al operador (D-105)
    visibilidad: agregados anónimos; detalle personal solo local (BR-04)
```

- **Sin Grants cruzados por defecto.** Compartir recursos entre redes requiere `Permission{Read,Write,Share}` con expiry (WX-205).
- **Sin telemetría.** `WorldExamsNode` y `XavierSyncClient` **nunca** importan `swal-credits`, `maloca`, `telemetry_collector` (BR-03). Verificado por `grep -r "swal-credits\|telemetry" saberparatodos/src`.
- **Namespaces distintos.** `saberparatodos/src/lib/p2p-edge-mesh.ts` usa `swal/worldexams/{instanceId}` para salones; la mesh privada usa `worldexams-private-mesh` en Xavier — separación lógica y de ACL.

---

## 4. BR-03 / BR-04 / BR-06 — garantías

| Regla | Garantía | Implementación |
|-------|----------|----------------|
| **BR-03** | WorldExams excluida de tokens/karma/telemetría | Ningún import de `swal-credits`/`maloca`/`telemetry` en `src/lib/mesh/**`. `publish()` no genera tokens. |
| **BR-04** | Zero-PII — solo `{node_hash, subject, week, score, avg}` | `ALLOWED_PAYLOAD_KEYS` allow-list + `FORBIDDEN_PII_KEYS` deny-list + heurística email. `validateTipData()` + `assertNoPII()` en `XavierSyncClient.sync()` y `WorldExamsNode.publish()`. Tests con `expect(...).toThrow(/PII/)`. |
| **BR-06** | Opt-in revocable; agregados históricos no atribuibles | `WorldExamsNode.setOptIn(false)` limpia `peersCache` y hace `publish()` no-op. El server no retiene mapping `node_hash → identidad` (solo hash opaco). |
| **D-105/D6** | Storage rent solo al operador nodal | Documentado aquí y en `D-105`: `data_commons/mesh_bridge.rs::reward_storage_rent_provider()` → `ResourceAccounting.record_contribution(StorageProvided)` → `RewardEngine.calculate_reward()`. El estudiante no recibe $SWAL. |

**Zero-PII guarantee formal:** para todo `TipData t`, `keys(t) ⊆ {node_hash, subject, week, score, avg}` y `values(t)` no contienen patrones PII. Violación → `Error("[BR-04] ...")` lanzado localmente, sin network call.

---

## 5. Storage rent — economía bifurcada (D-105)

```
Capa infraestructura (Xavier)          Capa aplicación (WorldExams PWA)
─────────────────────────────          ────────────────────────────────
Nodo Xavier almacena el vector         Estudiante publica {score, avg}
  → StorageProvided{bytes, duration}     → ve su puesto localmente
  → ResourceAccounting                   → ve agregados anónimos globales
  → RewardEngine(tier)                   → NO recibe $SWAL
  → operador nodal cobra $SWAL           → BR-03: sin karma/tokens
```

Referencias Xavier (repo `apps/xavier/src/`):

- `data_commons/mesh_bridge.rs::reward_storage_rent_provider(accounting, node_id, bytes)`
- `mesh/tokenomics/accounting.rs::ResourceAccounting.record_contribution()`
- `mesh/tokenomics/rewards.rs::RewardEngine.calculate_reward(StorageProvided{...})`

Esta ADR no implementa la contabilidad on-chain; solo **documenta y respeta** el contrato: el mesh client no invoca economía hacia el estudiante.

---

## 6. Alternativas consideradas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Reusar la red SWAL con namespace `swal/worldexams` | Contamina la red comunitaria con datos de menores; acopla economías (riesgo BR-03). D-102 exige separación. |
| Sync via `edge-mesh` directo (sin Xavier HTTP) | `edge-mesh` es data plane P2P para CRDT/salones; Xavier es memoria duradera con ACL y storage rent. El sync privado requiere durabilidad + cifrado por wallet que solo Xavier HTTP provee hoy. |
| Payload rico (nombre, grado, colegio) para leaderboard | Viola BR-04 y la ética de protección del menor (D-103). El leaderboard es solo-agregados. |

---

## 7. Consecuencias

- **Positivas:** aislamiento regulatorio (menores), revocabilidad simple, sin fuga PII, operador incentivado vía storage rent.
- **Negativas:** dos redes que operar (doble ACL/quorum); latencia extra por hop Xavier HTTP vs P2P puro.
- **Riesgos:** abuso sin karma — se mitiga con reputación **local** de la red worldexams (validadores de contenido, no economía SWAL). Edad no verificada en v1 — se aplica estándar más restrictivo por defecto.

---

## 8. Validación

```bash
# Secrets (no PII en repo)
npm run test  # → validate-secrets.sh ✅

# Unit (mock fetch, PII rejection)
npx vitest run tests/mesh/XavierSyncClient.test.ts  # o npm run test -- --run si vitest es runner
# Checks: POST correcto con payload mínimo, header Content-Type, falla si campo email/name/phone/dni

# Manual smoke
# 1) Set localStorage worldexams.xavierUrl + worldexams.walletPrivateKey (dev)
# 2) new WorldExamsNode().setOptIn(true); await node.publish({node_hash, subject:'matematicas', week:'W01', score:80, avg:75})
# 3) Verificar en Xavier server: vector agregado sin PII, storage rent acreditado al operador
```

---

## 9. Referencias

- `docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md` (D-101..D-105)
- `docs/SRS/REQUIREMENTS.md` (REQ-008..013, BR-01..BR-06, UC-002)
- `docs/SWAL/GOAL.md` · `docs/SWAL/README.md`
- `.gitcore/features.json` (`feat-private-grade-network`, `feat-anonymous-leaderboard`)
- `apps/xavier/src/mesh/private_mesh.rs` · `apps/xavier/src/data_commons/mesh_bridge.rs`
- `saberparatodos/src/lib/mesh/question-counter.ts` (patrón mesh existente, no reutilizado para PII)

---

*ADR generada en WX-204 — isla `src/lib/mesh/**` · `docs/SWAL/ADR-worldexams-mesh.md` — no toca `questions_data/**` ni packs.*
