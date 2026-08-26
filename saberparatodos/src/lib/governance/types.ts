/**
 * WX-206 — Gobernanza versionada + votación consejo de nodos
 * Tipos canónicos para reglas versionadas, votos y op-log.
 *
 * Reglas: TEXT JSON plano, versionadas semver, firmadas placeholder ML-DSA-65 (sha256).
 * Votación: cada nodo = 1 voto, quorum = 2/3 nodos activos.
 * OpLog: append-only encadenado por hash.
 */

export interface Rule {
  id: string;
  version: string; // semver e.g. "1.0.0" or "1.0.1"
  content_json: string; // JSON plano TEXT
  hash: string; // sha256(content_json)
  signer_node: string;
  signature: string; // placeholder sha256(rule+key).verifiable
  created_at: string; // ISO timestamp
}

export interface Vote {
  rule_version: string; // version being voted on
  voter_node: string;
  vote: 'approve' | 'reject';
  signature: string; // placeholder sha256(vote+key)
  timestamp: string; // ISO
}

export interface OpEntry {
  index: number;
  entry_type: string; // e.g. "rule_proposed" | "vote_cast" | "rule_applied" | "genesis"
  data: unknown;
  node_hash: string; // node identifier / hash
  signature: string;
  prev_hash: string | null; // hash del anterior, null para genesis
  hash: string; // hash de esta entrada (sha256 canonical)
  timestamp: string;
}

export interface GovernanceState {
  rules: Rule[];
  latest_version: string | null;
  oplog: OpEntry[];
}

export interface TallyResult {
  approved: boolean;
  quorum_reached: boolean;
  votes_for: number;
  votes_against: number;
  total_active_nodes: number;
  quorum_threshold: number;
  reject_threshold: number;
}

export type EntryType = 'genesis' | 'rule_proposed' | 'vote_cast' | 'rule_applied' | string;
