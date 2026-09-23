// ─── CONST OBJECT PATTERNS ────────────────────────────────────────────────
export const TIPO_MENSAJE = {
    SYNC: "sync",
    ACK: "ack",
    HEARTBEAT: "heartbeat",
    HALLazGO: "hallazgo",
    VOTACION: "votacion",
    SNAPSHOT: "snapshot",
    OP_LOG: "op_log",
    AUTHZ: "authz",
    NAMESPACE: "namespace",
    GOVERNANCE: "governance",
    IDENTITY: "identity",
    ERROR: "error",
    PQC_HANDSHAKE: "pqc_handshake",
    KEM_REPLY: "kem_reply",
    PQC_ACK: "pqc_ack",
    PEER_LIST_UPDATE: "peer_list_update",
    GOSSIP: "gossip",
};
export const ESTADO_NODO = {
    OFFLINE: "offline",
    CONECTANDO: "conectando",
    ONLINE: "online",
    SUSPENDIDO: "suspendido",
    RECONECTANDO: "reconectando",
    ELIMINADO: "eliminado",
};
export const ESTADO_SALUD = {
    SALUDABLE: "saludable",
    LENTO: "lento",
    FALLANDO: "fallando",
    DESCONOCIDO: "desconocido",
};
export const POLITICA_GOBERNANZA = {
    DEMOCRATICA: "democratica",
    AUTORITARIA: "autoritaria",
    CONSENSO: "consenso",
    PLURALIDAD: "pluralidad",
};
export const TIPO_TRANSPORTE = {
    PEERJS: "peerjs",
    WEBSOCKET: "websocket",
    MEMORIA: "memoria",
    TOR: "tor",
};
// ─── TYPE GUARDS ───────────────────────────────────────────────────────────
export function isTipoMensaje(valor) {
    return (typeof valor === "string" &&
        Object.values(TIPO_MENSAJE).includes(valor));
}
export function isEstadoNodo(valor) {
    return (typeof valor === "string" &&
        Object.values(ESTADO_NODO).includes(valor));
}
//# sourceMappingURL=index.js.map