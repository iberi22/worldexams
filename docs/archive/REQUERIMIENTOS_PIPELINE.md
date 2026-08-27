# Requerimientos del Pipeline SWAL — WorldExams como Laboratorio

> **Versión:** 1.0  
> **Fecha:** 2026-07-26  
> **Basado en:** Análisis de sesión + docs SWAL + validación Kimi K3  
> **Objetivo:** Definir requerimientos reales (sin mocks) para que Kimi K3 verifique y priorice

---

## Contexto

WorldExams es el laboratorio vivo del ecosistema SWAL. Todo lo que se construye aquí es el pipeline que usará Maloca Support públicamente. El stack es:

- **edge-mesh** (blockchain P2P operacional) — el data plane
- **Xavier Core** (Rust, nodo especializado con LLM) — memoria + orquestación
- **GitCore 3.8** — protocolo de documentación y cumplimiento
- **OpenClaw Skills** — automatización ligera
- **Chain/Polygon** — settlement financiero (metadatos)

---

## Requerimientos por Feature (Features de Red primero)

### RF-001: Namespace de Perfiles de Usuario en la Mesh

**Descripción:** Todo usuario SWAL tiene un perfil como nodo en edge-mesh, peer-address = identidad. El perfil incluye: karma, rol (miembro/consejo/gerente), últimos eventos de reputación, wallet address (Polygon), lista de skills/capacidades, y subredes a las que pertenece.

**Dependencias:** F-004 (P2P Node Lifecycle), F-008 (Presence & Heartbeat)

**Contratos de datos:**
```
Tipo Profile {
  peerId: string (ML-DSA public key hash)
  displayName: string (opcional)
  karma: number
  role: "member" | "council" | "manager" | "validator"
  walletAddress: string (Polygon)
  skills: string[]
  subscribedNamespaces: string[]
  lastSeen: timestamp
  reputationEvents: EventRef[]
}
```

**Criterios de aceptación:**
1. Un nuevo peer se une a la mesh y su perfil se replica por gossip
2. ProfileManager puede leer/escribir el perfil de cualquier peer conocido
3. El perfil es firmado con ML-DSA del peer, cualquier modificación externa se rechaza
4. Los peers sin perfil no pueden participar en governance ni karma

**Escenarios de falla:**
- Peer malicioso intenta falsificar perfil ajeno → firma inválida → mensaje descartado
- Nodo se desconecta → su perfil permanece en caché local con timestamp
- Partición de red → cada partición opera con los peers que tiene

---

### RF-002: Sistema de Roles y Permisos en la Mesh

**Descripción:** Roles definidos en el protocolo mesh (no por app). GovernanceManager asigna roles vía propuestas. Cada rol tiene permisos específicos sobre acciones en la mesh (crear namespaces, votar proposals, ver metadata de subredes cifradas, etc.).

**Dependencias:** RF-001, F-009 (Decentralized Governance), F-014 (Namespace Authorization)

**Contratos de datos:**
```
Tipo Role {
  name: string
  permissions: Permission[]
}

Tipo Permission {
  action: string       // ej: "namespace.create", "governance.vote", "subnet.read_metadata"
  resource: string     // ej: "namespace:*", "governance:*", "subnet:empresarial"
}

Tipo RoleAssignment {
  peerId: string
  role: string
  grantedBy: string    // proposal ID que lo asignó
  expiresAt?: timestamp
}
```

**Criterios de aceptación:**
1. Solo un peer con permiso `governance.manage_roles` puede proponer asignación de roles
2. Un peer con rol "manager" no puede votar en governance
3. La asignación de roles queda notarizada en Evidentia
4. Los permisos se cachean localmente y se refrescan por heartbeat

---

### RF-003: Sistema de Suscripciones

**Descripción:** Las suscripciones no son fiat. Ser "Pro" = ser nodo activo en la mesh con requisitos de uptime, karma mínimo, y participación en gossip. No hay Stripe.

**Dependencias:** RF-001, F-008 (Presence & Heartbeat)

**Contratos de datos:**
```
Tipo Subscription {
  peerId: string
  tier: "free" | "pro" | "enterprise"
  status: "active" | "grace_period" | "expired"
  requirements: {
    minUptimeHours: number    // rolling 30 days
    minKarma: number
    minPeersConnected: number
    minStorageGB?: number
  }
  compliance: {
    uptimeOk: boolean
    karmaOk: boolean
    peersOk: boolean
    lastCheck: timestamp
  }
  subscribedAt: timestamp
}
```

**Criterios de aceptación:**
1. Un peer "free" puede operar normalmente pero no crear subredes ni votar
2. Un peer "pro" debe cumplir uptime ≥ 95%, karma ≥ 100, ≥3 peers connected
3. El estado se verifica cada heartbeat; si falla, entra en grace period de 7 días
4. La mesh puede revocar acceso Pro automáticamente si no cumple después del grace period

---

### RF-004: Subredes Cifradas (EncryptedNamespacePlugin)

**Descripción:** Namespaces dentro del mesh cuyo contenido es ilegible para peers sin la clave de grupo. Las claves se rotan por governance. Los metadatos (existencia del namespace, miembros count, tamaño aprox) son visibles al Consejo.

**Dependencias:** F-015 (Namespace Manager), F-014 (Namespace Authorization), PluginRegistry

**Contratos de datos:**
```
Tipo EncryptedNamespace {
  namespaceId: string
  name: string (cifrado)
  members: PeerRef[]
  keyRotationPeriod: number  // días
  policy: "group_key" | "per_peer_key" | "hierarchical"
  metadata: {                // visible al Consejo
    memberCount: number
    created: timestamp
    lastRotation: timestamp
  }
}
```

**Criterios de aceptación:**
1. Un peer sin clave ve el namespace como opaco en la lista de namespaces
2. La clave se negocia P2P al unirse al namespace (no pasa por un servidor)
3. Si un miembro es expulsado, la clave se rota y los peers restantes la reciben
4. El PluginRegistry carga el plugin solo si el peer tiene permiso `subnet.encrypted`

---

### RF-005: Verificación de Identidad sin Password (Challenge-Response P2P)

**Descripción:** Un peer nuevo demuestra que conoce el contenido de la mesh (perfiles conocidos, últimos proposals, hashes de eventos recientes) para que la mesh confíe en él. No es "sin verificación" — es verificación diferente al password, basada en conocimiento compartido.

**Dependencias:** F-004 (Post-Quantum Identity), RF-001

**Contratos de datos:**
```
// Challenge emited by a validator peer
Tipo Challenge {
  type: "mesh_knowledge" | "signed_nonce"
  questions: {
    recentProposalHash?: string
    knownPeerCount?: number
    lastEventId?: string
  }
  nonce: string
  validatorId: string
  timestamp: timestamp
  ttlMs: number
}

Tipo ChallengeResponse {
  challengeId: string
  answers: Record<string, string>
  signature: string (ML-DSA del peer que responde)
}
```

**Criterios de aceptación:**
1. Un peer nuevo debe responder correctamente ≥ 2/3 preguntas de peers validadores
2. Un peer existente se re-verifica cada 30 días o si cambia de IP/dispositivo
3. Si falla la verificación, el peer baja a rol "unverified" y no participa en governance
4. El challenge-response no depende de un servidor central — cualquier peer puede emitir un challenge

---

### RF-006: Sistema de Proveedores (Provider Scanner)

**Descripción:** Skill de OpenClaw (~200 líneas) que escanea CLIs instalados (aws, gh, docker, kubectl, etc.) y reporta versiones, credenciales presentes, quotas disponibles. Se ejecuta post-sesión. No es módulo Rust.

**Dependencias:** Ninguna del mesh. Es ortogonal.

**Contratos de datos:**
```json
// providers-report.json
{
  "schemaVersion": "1.0",
  "scannedAt": "ISO-8601",
  "providers": [
    {
      "name": "aws",
      "available": true,
      "version": "2.x",
      "credentialsPresent": true,
      "quota": {
        "ec2Instances": 5,
        "s3Buckets": 100
      }
    },
    {
      "name": "github",
      "available": true,
      "version": "2.x",
      "credentialsPresent": true,
      "rateLimit": {
        "remaining": 4500,
        "reset": "ISO-8601"
      }
    }
  ],
  "environment": {
    "os": "linux",
    "totalRam": "16GB",
    "availableDisk": "250GB",
    "hasDocker": true
  }
}
```

**Criterios de aceptación:**
1. El skill corre en < 30 segundos, no requiere permisos root
2. Reporta solo CLIs instalados; no falla si uno no está
3. El output es JSON con schema versionado
4. Xavier lo lee pasivamente, no lo invoca

---

### RF-007: Evaluación de Rigor (10 Criterios)

**Descripción:** Skill OpenClaw que evalúa documentación de una feature contra 10 criterios (score 0-2 cada uno, total 20). Mínimo 14/20 para implementar. Condiciones duras: ningún criterio en 0, "cobertura de permisos" y "modelo de amenaza" deben estar en 2.

**Dependencias:** GitCore 3.8, features.json

**Los 10 criterios (Kimi K3 validados):**

| # | Criterio | Score 0 | Score 1 | Score 2 |
|---|----------|---------|---------|---------|
| 1 | Completitud SRS | Ausente | Parcial | Secciones IEEE 830 llenas |
| 2 | Contrato de datos (UI/JSON) | No definido | Schema parcial | Types + endpoints documentados |
| 3 | Acceptance Criteria | Ausentes | Solo happy path | Happy + edge + error cases |
| 4 | Escenarios de falla | No existen | Parciales | Todos los modos de falla cubiertos |
| 5 | Trazabilidad (SRS ↔ SRC) | No hay correlación | Parcial | Cada REQ-ID tiene test/impl |
| 6 | Dependencias mesh | No declaradas | Lista incompleta | Todas las dependencias cross-feature |
| 7 | Cobertura de permisos | No considerados | Parcial | Roles + permisos exactos por acción |
| 8 | Modelo de amenaza | No existe | Superficial | Sybil, replay, gossip poisoning, nodos maliciosos |
| 9 | Comportamiento offline/partición | No considerado | Parcial | Estado en aislamiento + reconciliación |
| 10 | Cobertura de tests | No existen | Unitarios | Unit + integration + contract test |

**Condiciones duras:** Criterios #7 y #8 deben ser score 2. Ningún criterio en 0. Total ≥ 14/20.

---

### RF-008: Support Distribuido (Ticket → Mesh → Consejo → Asignación)

**Descripción:** Tickets de soporte fluyen como eventos en el EventBus de edge-mesh. El triaje es automático: tickets simples → fast track (asignación directa por KarmaManager), tickets complejos → GovernanceManager crea proposal → Consejo vota sinópticamente → nodo reclama on-demand → Evidentia notariza.

**Dependencias:** F-009 (Governance), F-007 (KarmaManager), EventBus, Evidentia

**Contratos de datos:**
```
Tipo SupportTicket {
  id: string
  category: "simple" | "config_change" | "security" | "feature_request"
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "triaging" | "in_progress" | "resolved" | "escalated"
  metadata: {              // ÚNICO que viaja por gossip
    category: string
    severity: string
    creatorKarma: number
    requiresVote: boolean
    created: timestamp
  }
  body: EncryptedPayload   // Cuerpo cifrado, no va por gossip
  assignedTo?: PeerRef
  resolution?: {
    summary: string
    evidentiaTxId: string
    resolvedAt: timestamp
  }
  proposalId?: string      // solo si requiere governance
}
```

**Criterios de aceptación:**
1. Tickets "simple" se asignan directo al peer con mejor karma disponible
2. Tickets que requieren cambios de permiso o multi-usuario → proposal
3. Tickets "security" o "critical" → fast track + proposal retroactivo
4. El cuerpo del ticket viaja cifrado, no por gossip; solo el nodo asignado lo descifra

---

### RF-009: Cifrado en Blockchain (Metadata en Polygon, Datos Regenerables)

**Descripción:** Datos sensibles no se almacenan en blockchain. Solo metadatos + hashes van a Polygon. Los datos completos se regeneran desde preguntas al usuario o desde la mesh. Los hashes de notarización (Evidentia) se anclan periódicamente a Polygon como prueba inmutable.

**Dependencias:** EvidentiaManager, Polygon settlement layer

**Contratos de datos:**
```
Tipo EvidentiaAnchor {
  meshId: string
  fromEventId: string
  toEventId: string
  merkleRoot: string
  previousAnchorHash: string
  polygonTxId: string
  anchoredAt: timestamp
  blockNumber: number
}
```

**Criterios de aceptación:**
1. Cada evento en la mesh tiene un hash calculado por el peer que lo origina
2. Periódicamente (cada N eventos o cada N horas) se genera un Merkle tree
3. El root del Merkle tree se envía a Polygon como tx de metadatos
4. Cualquier evento puede verificarse contra el anchor de Polygon en O(log N)

---

## Priorización Inicial (BELA + OpenClaw)

| Prioridad | Feature | RF | Depende de |
|-----------|---------|----|------------|
| 1 | Namespace de Perfiles | RF-001 | F-004, F-008 |
| 2 | Roles y Permisos | RF-002 | RF-001, F-009 |
| 3 | Sistema de Suscripciones | RF-003 | RF-001, F-008 |
| 4 | Evaluación de Rigor (skill) | RF-007 | GitCore |
| 5 | Support Distribuido | RF-008 | F-009, F-007, EventBus |
| 6 | Subredes Cifradas | RF-004 | RF-002, F-015 |
| 7 | Verificación sin Password | RF-005 | F-004, RF-001 |
| 8 | Provider Scanner (skill) | RF-006 | Ninguna |
| 9 | Cifrado en Blockchain | RF-009 | Evidentia, Polygon |

---

## Notas para Kimi K3

Este documento recoge TODO el análisis de la sesión:
- 18 features actuales de edge-mesh (todas "partial")
- Validación de Kimi K3 sobre el pipeline y criterios de rigor
- Alertas de Kimi K3 sobre escalabilidad de votos, privacidad en gossip, acoplamiento prematuro

Kimi, por favor:
1. Verifica que los 9 requerimientos (RF-001 a RF-009) cubren TODO lo necesario
2. Confirma o ajusta la priorización
3. Identifica qué requerimientos están incompletos o mal concebidos
4. Sugiere si falta algún RF crítico
5. Confirma que los criterios de rigor (RF-007) están correctos
