/**
 * WX-206 — VotingManager
 * Consejo de nodos: cada nodo = 1 voto (peso igual).
 * Quorum = 2/3 de nodos activos conocidos.
 * Tally: votes_for >= ceil(2/3*total) AND votes_against < ceil(1/3*total) → approved.
 */

import type { Rule, Vote, TallyResult } from './types';
import { RuleEngine, InMemoryRuleStorage } from './RuleEngine';
import { OpLog } from './OpLog';
import { signPlaceholder, sha256Sync } from './hash';

function compareSemver(a: string, b: string): number {
  const pa = a.split('.').map((n) => parseInt(n, 10));
  const pb = b.split('.').map((n) => parseInt(n, 10));
  for (let i = 0; i < 3; i++) {
    const da = pa[i] ?? 0;
    const dbv = pb[i] ?? 0;
    if (da !== dbv) return da - dbv;
  }
  return 0;
}

function nextVersion(current: string | null): string {
  if (!current) return '1.0.0';
  const parts = current.split('.').map((n) => parseInt(n, 10));
  const patch = (parts[2] ?? 0) + 1;
  return `${parts[0]}.${parts[1]}.${patch}`;
}

export interface SignedProposal {
  id: string;
  op: string;
  payload: unknown;
  signer: string;
  signature: string;
  created_at: string;
}

export interface VotingManagerOptions {
  ruleEngine?: RuleEngine;
  oplog?: OpLog;
  activeNodes?: string[]; // lista de node_ids activos
  totalActiveNodes?: number; // alternativa a lista
}

export class VotingManager {
  private ruleEngine: RuleEngine;
  private oplog: OpLog;
  private activeNodes: Set<string>;
  private votes: Map<string, Map<string, Vote>> = new Map(); // rule_version / proposalId -> voter_node -> Vote
  private pendingRules: Map<string, Rule> = new Map(); // version -> Rule (proposed but not yet applied)
  private proposals: Map<string, SignedProposal> = new Map(); // proposalId -> SignedProposal

  constructor(opts?: VotingManagerOptions) {
    this.oplog = opts?.oplog ?? new OpLog();
    this.ruleEngine =
      opts?.ruleEngine ??
      new RuleEngine({ storage: new InMemoryRuleStorage(), oplog: this.oplog });

    if (opts?.activeNodes?.length) {
      this.activeNodes = new Set(opts.activeNodes);
    } else if (opts?.totalActiveNodes !== undefined) {
      // generate synthetic node ids for counting only
      const set = new Set<string>();
      for (let i = 0; i < opts.totalActiveNodes; i++) set.add(`node-${i}`);
      this.activeNodes = set;
    } else {
      this.activeNodes = new Set<string>();
    }
  }

  /** Define o reemplaza conjunto de nodos activos conocidos. */
  setActiveNodes(nodes: string[] | number): void {
    if (typeof nodes === 'number') {
      const set = new Set<string>();
      for (let i = 0; i < nodes; i++) set.add(`node-${i}`);
      this.activeNodes = set;
    } else {
      this.activeNodes = new Set(nodes);
    }
  }

  getActiveNodes(): string[] {
    return Array.from(this.activeNodes);
  }

  getTotalActiveNodes(): number {
    return this.activeNodes.size;
  }

  /**
   * Propone cambio de regla.
   * @param newRuleContent TEXT JSON plano (string o objeto serializable)
   * @param signerNode nodo proponente (default 'founder')
   * @param privateKey clave placeholder para firmar
   * @returns Rule creada y persistida como pendiente
   */
  async proposeChange(
    newRuleContent: string | object,
    signerNode: string = 'founder',
    privateKey: string = 'founder-private-key'
  ): Promise<Rule> {
    const content_json =
      typeof newRuleContent === 'string' ? newRuleContent : JSON.stringify(newRuleContent);

    // validar JSON plano
    try {
      JSON.parse(content_json);
    } catch {
      throw new Error('newRuleContent must be valid JSON TEXT');
    }

    const latest = this.ruleEngine.getLatestVersion() ?? this.getLatestPendingVersion();
    const version = nextVersion(latest);

    const rule = this.ruleEngine.createRule(content_json, version, signerNode, privateKey);
    // persist via engine (also appends to oplog as rule_proposed)
    await this.ruleEngine.persistRule(rule);
    this.pendingRules.set(version, rule);

    // ensure oplog has entry even if engine didn't (fallback)
    // Engine already appended; if no oplog on engine, we append here
    // Do double-check: if last oplog entry not already rule_proposed for this version, append
    const last = this.oplog.getLog()[this.oplog.size() - 1];
    if (!last || last.entry_type !== 'rule_proposed' || (last.data as any)?.version !== version) {
      this.oplog.append('rule_proposed', { rule_hash: rule.hash, version, content_json }, signerNode, rule.signature);
    }

    return rule;
  }

  private getLatestPendingVersion(): string | null {
    if (this.pendingRules.size === 0) return null;
    let latest: string | null = null;
    for (const v of Array.from(this.pendingRules.keys())) {
      if (!latest || compareSemver(v, latest) > 0) latest = v;
    }
    return latest;
  }

  /**
   * Emite voto para una versión de regla.
   * Cada nodo = 1 voto; sobrescribe voto previo del mismo nodo (último vale).
   */
  castVote(
    ruleVersion: string,
    vote: 'approve' | 'reject',
    voterNode: string = 'node-0',
    privateKey: string = 'test-private-key'
  ): Vote {
    // validar que regla existe (en engine o pendiente)
    const rule =
      this.ruleEngine.getRuleByVersion(ruleVersion) ?? this.pendingRules.get(ruleVersion);
    if (!rule) {
      throw new Error(`Rule version ${ruleVersion} not found — proposeChange first`);
    }

    // validar voter es nodo activo conocido si hay lista; si no, permitir pero contar como activo eventual
    // no bloquea; solo registra

    const timestamp = new Date().toISOString();
    const voteContent = `${ruleVersion}:${voterNode}:${vote}:${timestamp}`;
    const signature = signPlaceholder(voteContent, privateKey, voterNode);

    const v: Vote = {
      rule_version: ruleVersion,
      voter_node: voterNode,
      vote,
      signature,
      timestamp,
    };

    if (!this.votes.has(ruleVersion)) this.votes.set(ruleVersion, new Map());
    this.votes.get(ruleVersion)!.set(voterNode, v);

    // oplog append
    this.oplog.append('vote_cast', { rule_version: ruleVersion, voter_node: voterNode, vote }, voterNode, signature);

    // auto-apply if quorum now met? No auto, caller must check tally then apply.
    return { ...v };
  }

  /**
   * Tally votes para una versión.
   * Quorum: votes_for >= ceil(2/3 * total_active_nodes) AND votes_against < ceil(1/3 * total_active_nodes)
   */
  tallyVotes(ruleVersion: string): TallyResult {
    const total_active_nodes = this.getTotalActiveNodes();
    // Edge: sin nodos conocidos, quorum imposible
    const quorum_threshold = total_active_nodes === 0 ? 0 : Math.ceil((2 / 3) * total_active_nodes);
    const reject_threshold = total_active_nodes === 0 ? 0 : Math.ceil((1 / 3) * total_active_nodes);

    const bucket = this.votes.get(ruleVersion);
    let votes_for = 0;
    let votes_against = 0;
    if (bucket) {
      for (const v of Array.from(bucket.values())) {
        if (v.vote === 'approve') votes_for++;
        else votes_against++;
      }
    }

    const total_votes = votes_for + votes_against;
    const quorum_reached = total_active_nodes > 0 && total_votes >= quorum_threshold;

    // Approved requires supermajority for + minority constraint
    const approved =
      total_active_nodes > 0 &&
      votes_for >= quorum_threshold &&
      votes_against < reject_threshold;

    // Si se aprueba, auto-activar regla en engine si existe pendiente
    if (approved) {
      const rule = this.pendingRules.get(ruleVersion) ?? this.ruleEngine.getRuleByVersion(ruleVersion);
      if (rule) {
        const alreadyActive = this.ruleEngine.getRuleByHash(rule.hash);
        if (alreadyActive) {
          // mark active via engine
          this.ruleEngine.applyRule(rule.hash);
        }
      }
    }

    return {
      approved,
      quorum_reached,
      votes_for,
      votes_against,
      total_active_nodes,
      quorum_threshold,
      reject_threshold,
    };
  }

  /** Lista votos para una versión. */
  getVotes(ruleVersion: string): Vote[] {
    const bucket = this.votes.get(ruleVersion);
    if (!bucket) return [];
    return Array.from(bucket.values()).map((v) => ({ ...v }));
  }

  /** Todas las versiones con votos. */
  getAllVotes(): Map<string, Vote[]> {
    const out = new Map<string, Vote[]>();
    for (const [ver, map] of Array.from(this.votes.entries())) {
      out.set(ver, Array.from(map.values()).map((v) => ({ ...v })));
    }
    return out;
  }

  getOpLog(): OpLog {
    return this.oplog;
  }
  getRuleEngine(): RuleEngine {
    return this.ruleEngine;
  }

  /**
   * Stub signature verification for Ed25519 (hex string check).
   * TODO ML-DSA-65: Implement full ML-DSA-65 / Ed25519 cryptographic signature verification.
   */
  private verifyEd25519Stub(signature: string): boolean {
    return OpLog.verifySignature(signature);
  }

  /**
   * Proposes a signed rule change operation.
   * @param op tipo de operación de regla
   * @param payload datos de la regla
   * @param signer identificador del nodo firmante
   * @param signature firma Ed25519 (hex string check stub)
   * TODO ML-DSA-65: Replace Ed25519 signature stub check with ML-DSA-65 verification.
   */
  async proposeRuleChange(
    op: string,
    payload: unknown,
    signer: string,
    signature?: string
  ): Promise<SignedProposal> {
    const sig = signature ?? signPlaceholder(JSON.stringify({ op, payload }), 'founder-key', signer);
    if (!this.verifyEd25519Stub(sig)) {
      throw new Error(`Invalid signature for rule change proposal ${op}`);
    }

    const proposalId = `prop-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const proposal: SignedProposal = {
      id: proposalId,
      op,
      payload,
      signer,
      signature: sig,
      created_at: new Date().toISOString(),
    };

    this.proposals.set(proposalId, proposal);
    this.oplog.appendSigned('rule_proposed', sig, { op, payload, proposalId }, signer);

    // Also propose rule in RuleEngine if payload represents rule content
    try {
      const contentStr = typeof payload === 'string' ? payload : JSON.stringify(payload);
      const latest = this.ruleEngine.getLatestVersion() ?? this.getLatestPendingVersion();
      const version = nextVersion(latest);
      const rule = this.ruleEngine.createRule(contentStr, version, signer, 'founder-key');
      this.pendingRules.set(version, rule);
      this.pendingRules.set(proposalId, rule);
    } catch {
      // payload may not be valid rule content, proposal still recorded
    }

    return proposal;
  }

  /**
   * Casts a signed vote for a proposal or rule version.
   * Quorum requirement = 2/3 of active council nodes.
   * TODO ML-DSA-65: Ed25519 signature stub.
   */
  vote(
    proposalId: string,
    signer: string,
    signature: string,
    voteChoice: 'approve' | 'reject' = 'approve'
  ): Vote {
    if (!this.verifyEd25519Stub(signature)) {
      throw new Error(`Invalid signature for vote on proposal ${proposalId}`);
    }

    const timestamp = new Date().toISOString();
    const v: Vote = {
      rule_version: proposalId,
      voter_node: signer,
      vote: voteChoice,
      signature,
      timestamp,
    };

    if (!this.votes.has(proposalId)) this.votes.set(proposalId, new Map());
    this.votes.get(proposalId)!.set(signer, v);

    this.oplog.appendSigned('vote_cast', signature, { proposalId, signer, voteChoice }, signer);
    return { ...v };
  }

  /**
   * Checks if quorum (2/3 supermajority of active nodes) has been reached for a proposal.
   * Quorum = ceil(2/3 * totalActiveNodes).
   */
  quorumReached(proposalId: string): boolean {
    const total = this.getTotalActiveNodes();
    if (total === 0) return false;
    const requiredQuorum = Math.ceil((2 / 3) * total);

    const bucket = this.votes.get(proposalId);
    if (!bucket) return false;

    let approveCount = 0;
    for (const v of Array.from(bucket.values())) {
      if (v.vote === 'approve') approveCount++;
    }

    return approveCount >= requiredQuorum;
  }

  /** Para tests: limpia estado votos/pending sin borrar engine. */
  clearVotes(): void {
    this.votes.clear();
    this.proposals.clear();
  }
  clearAll(): void {
    this.votes.clear();
    this.pendingRules.clear();
    this.proposals.clear();
    this.oplog.clear();
    this.ruleEngine.clear();
  }
}
