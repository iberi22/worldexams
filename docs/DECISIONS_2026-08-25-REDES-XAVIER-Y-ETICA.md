# DECISIONES 2026-08-25 — Redes Xavier y Ética WorldExams

**Autor:** BELAL (dictado) · **Registro:** Hermes ox-alpha · **Estado:** ACEPTADA
**Protocolo:** GitCore 3.8 — decisión arquitectónica vinculante para worldexams,
xavier y edge-mesh.

---

## Contexto

Aclaración canónica del modelo de red SWAL (BELAL, 2026-08-25):

1. **SWAL (la red de datos)** es la red de uso de las apps: telemetría, datos
   anonimizados, reputación y karma. Usa los nodos Xavier para almacenarse a sí
   misma. Es UNA red-grupo más dentro de Xavier.
2. **Xavier puede crear infinitud de redes de nodos** (como grupos):
   - **Jerárquicas**: con una cabeza/CEO — para empresas u organizaciones.
   - **Planas/comunitarias**: sin líder — como la red SWAL.
3. **WorldExams es OTRO nodo/red, separada de SWAL**, con reglas propias:
   - Las reglas las crean los **fundadores**.
   - Pueden ser cambiadas después por el **consejo de nodos** (governance).

## D-101 — Multi-red nativa de Xavier

Xavier hospeda N redes simultáneas como entidades de primera clase
(`MeshNetwork{id, members, acl, rules}`). Un nodo puede pertenecer a varias
redes con identidad y permisos separados. Base existente: `src/mesh/private_mesh.rs`,
`f12/groups`, `acl.rs`→`enterprise/rbac.rs`. Gaps a cerrar: networks de primera
clase + grants cruzados granulares (WX-205).

## D-102 — Topología: dos redes separadas

- **Red SWAL**: plano-comunitaria; telemetría/anonimizada/karma de las apps.
- **Red WorldExams**: independiente, reglas propias educativas. NO aporta
  telemetría a SWAL ni consume su economía.

## D-103 — Ética: protección del menor (NO negociable)

El leaderboard de WorldExams es una **red privada de notas estudiantiles**:

- **EXCLUIDA de ganar tokens $SWAL o karma** por el uso. Sin gamificación
  económica hacia menores.
- **Sin telemetría**: no se usan datos de telemetría ni nada similar.
- Al instalar la PWA y hacer opt-in, **solo se comparten notas y promedios de
  forma ANÓNIMA** con la red (leaderboard).
- **Solo el propio usuario ve su nombre, puesto y métricas** versus los demás
  nodos (visibilidad local en su dispositivo).
- Fundamento: responsabilidad humana y respeto a menores de edad.

## D-104 — Implicaciones técnicas

| Decisión | Implementación |
|----------|----------------|
| Sync de notas | `/v1/f12/private-mesh/sync` cifrado por wallet; payload SOLO `{node_hash, subject, week, score, avg}` — cero PII |
| Leaderboard global | Ancla Supabase con AGREGADOS anónimos únicamente; jamás identidad |
| Grants granulares | Compartir recursos entre redes vía Permission{Read,Write,Share} con expiry/revocación (WX-205) |
| Karma bridge | PROHIBIDO en worldexams: ninguna llamada a maloca-karma/swal-credits desde flujos de examen (BR-03) |
| Telemetría | PROHIBIDA: sin `telemetry_collector` en esta app |
| Gobernanza | Reglas como documento versionado firmado; cambio solo por votación del consejo de nodos registrada en op-log |

## D-105 — Economía de infraestructura (storage rent)

La persistencia de datos de las apps (incluyendo worldexams) corre sobre nodos
Xavier. El **operador nodal** recibe tokens $SWAL como retribución por el
servicio de almacenamiento — esto es la capa infraestructura, completamente
independiente de la capa de la app.

Mecanismos implementados (ver `apps/xavier/src/`):
- `data_commons/mesh_bridge.rs::reward_storage_rent_provider(accounting, node_id, bytes)`
- `mesh/tokenomics/accounting.rs::ResourceAccounting.record_contribution()`
- `mesh/tokenomics/rewards.rs::RewardEngine.calculate_reward(StorageProvided{bytes,duration}, tier)`
- También: `BandwidthProvided`, `ComputeProvided`, `PeerDiscovery`, `DataValidated`.

Consecuencia: "worldexams recibe tokens" es correcto en el sentido de que **los
nodos que almacenan la red worldexams sí cobran retribución**. La exclusión
(BR-03) aplica SOLO al usuario final (estudiante): el dinero/tokens no fluyen
hacia el menor. La distinción clave:
- Capa infraestructura: operador nodal → tokens por servicio.
- Capa aplicación: estudiante → sin tokens, sin karma, sin telemetría.

F9 de Xavier (`docs/design/F9-MESH-SWAL-PUBLICO-PRIVADO.md`) documenta las
redes pública/privada pero no detallaba la economía de storage rent; este
documento la complementa con el modelo bifurcado.

## Consecuencias y riesgos

- Moderación anti-abuso sin karma: usar reputación LOCAL de la red worldexams
  (validadores de contenido), nunca la economía SWAL.
- Verificación de edad: fuera de alcance v1; el diseño asume público escolar y
  aplica el estándar más restrictivo por defecto.
- Revocación: la participación es opt-in y revocable; los agregados históricos
  no deben ser atribuibles a un nodo tras revocar.
- El score GitCore de worldexams baja al añadir features planned (honestidad >
  inflar %).

## Evolución de gobernanza

Fase 1: reglas fijadas por fundadores (este documento + rules de la red).
Fase 2: consejo de nodos con quorum definido en reglas v2 (votación firmada
ML-DSA-65/Ed25519, ponderación por antigüedad o contribución validada).
Fase 3: transición completa fundadores→consejo.
