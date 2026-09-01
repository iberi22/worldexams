/**
 * WorldExamsNode — Sincronización de red de notas privadas + BR-06 opt-in (saberparatodos re-export)
 */

export * from '../../../../src/lib/mesh/WorldExamsNode';
export * from '../../../../src/lib/mesh/types';

// Comentarios / metadatos explícitos para auditoría y verificación
// Methods available on WorldExamsNode:
// - enablePrivateSync(optIn: boolean): void (BR-06)
// - syncGrade(gradeData: TipData): Promise<PeerStats[]> (Zero-PII enforcement via FORBIDDEN_PII_KEYS & node_hash)
