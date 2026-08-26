/**
 * WX-206 — Tests gobernanza versionada + votación consejo
 * Covers: proposeChange + castVote + tallyVotes con quorum 2/3, OpLog integrity, firma placeholder
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { OpLog } from './OpLog';
import { RuleEngine, InMemoryRuleStorage } from './RuleEngine';
import { VotingManager } from './VotingManager';
import { signPlaceholder, verifyPlaceholder, sha256Sync } from './hash';

// ──────────────────────────────────────────────────────
// Firma placeholder
// ──────────────────────────────────────────────────────
describe('Firma placeholder (ML-DSA-65 placeholder sha256)', () => {
  it('sign produce formato sig:sha256:<hex>:by:<node>', () => {
    const sig = signPlaceholder('{"max":10}', 'private-key-123', 'node-A');
    expect(sig).toMatch(/^sig:sha256:[0-9a-f]{64}:by:node-A$/);
  });

  it('verifyPlaceholder true con misma clave y contenido', () => {
    const content = '{"rule":"no-telemetry"}';
    const key = 'my-private-key';
    const sig = signPlaceholder(content, key, 'node-1');
    expect(verifyPlaceholder(content, sig, key, 'node-1')).toBe(true);
  });

  it('verify falla si cambia contenido', () => {
    const sig = signPlaceholder('original', 'k1', 'n1');
    expect(verifyPlaceholder('tampered', sig, 'k1', 'n1')).toBe(false);
  });

  it('verify falla si cambia clave privada', () => {
    const sig = signPlaceholder('data', 'correct-key', 'n1');
    expect(verifyPlaceholder('data', sig, 'wrong-key', 'n1')).toBe(false);
  });

  it('sha256Sync determinístico y 64 hex', () => {
    const a = sha256Sync('hello');
    const b = sha256Sync('hello');
    const c = sha256Sync('world');
    expect(a).toBe(b);
    expect(a).not.toBe(c);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    // known vector: sha256('hello') = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
    expect(a).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });

  it('RuleEngine.sign verifiable', () => {
    const storage = new InMemoryRuleStorage();
    const engine = new RuleEngine({ storage });
    const rule = engine.createRule('{"a":1}', '1.0.0', 'founder', 'founder-key');
    const sig = engine.sign(rule, 'founder-key');
    expect(engine.verify(rule, sig, 'founder-key')).toBe(true);
    expect(engine.verify(rule, sig, 'other-key')).toBe(false);
  });
});

// ──────────────────────────────────────────────────────
// OpLog integrity
// ──────────────────────────────────────────────────────
describe('OpLog append-only + integrity', () => {
  it('append encadena prev_hash y verifica integridad', () => {
    const log = new OpLog();
    const e0 = log.append('genesis', { init: true }, 'node-0', 'sig0');
    const e1 = log.append('rule_proposed', { v: '1.0.0' }, 'node-1', 'sig1');
    const e2 = log.append('vote_cast', { vote: 'approve' }, 'node-2', 'sig2');

    expect(e0.prev_hash).toBeNull();
    expect(e1.prev_hash).toBe(e0.hash);
    expect(e2.prev_hash).toBe(e1.hash);
    expect(e0.index).toBe(0);
    expect(e1.index).toBe(1);
    expect(e2.index).toBe(2);

    const res = log.verifyIntegrity();
    expect(res.valid).toBe(true);
  });

  it('detecta tampering en hash', () => {
    const log = new OpLog();
    log.append('genesis', { a: 1 }, 'node-0', 'sig0');
    log.append('rule_proposed', { v: '1.0.0' }, 'node-1', 'sig1');
    // tamper second entry's data without updating hash
    const entries = log.getLog() as any[];
    // we mutate internal via casting — simulate storage corruption
    // Need to access private entries; we tamper by creating a log from JSON and modifying
    const corrupted: any[] = JSON.parse(JSON.stringify(log.toJSON()));
    corrupted[1].data = { v: '9.9.9' };
    const corruptedLog = OpLog.fromJSON(corrupted);
    const res = corruptedLog.verifyIntegrity();
    expect(res.valid).toBe(false);
    expect(res.failedIndex).toBe(1);
  });

  it('detecta tampering en prev_hash', () => {
    const log = new OpLog();
    log.append('genesis', {}, 'n0', 's0');
    log.append('rule_proposed', {}, 'n1', 's1');
    const corrupted: any[] = JSON.parse(JSON.stringify(log.toJSON()));
    corrupted[1].prev_hash = 'bad_prev';
    const cl = OpLog.fromJSON(corrupted);
    expect(cl.verifyIntegrity().valid).toBe(false);
  });

  it('getLog es copia defensiva (append-only no mutable externa)', () => {
    const log = new OpLog();
    log.append('genesis', { x: 1 }, 'n0', 's0');
    const copy = log.getLog() as any[];
    (copy as any).push({ fake: true });
    expect(log.size()).toBe(1);
  });

  it('cadena simple: cada entry referencia hash anterior', () => {
    const log = new OpLog();
    for (let i = 0; i < 5; i++) log.append(`event-${i}`, { i }, `node-${i}`, `sig-${i}`);
    const res = log.verifyIntegrity();
    expect(res.valid).toBe(true);
    const entries = log.getLog();
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i]!.prev_hash).toBe(entries[i - 1]!.hash);
    }
  });

  it('computeEntryHash determinístico independientemente de orden de keys', () => {
    const e: any = {
      index: 0,
      entry_type: 'test',
      data: { b: 2, a: 1 },
      node_hash: 'n0',
      signature: 's0',
      prev_hash: null,
      timestamp: '2026-01-01T00:00:00.000Z',
    };
    const h1 = OpLog.computeEntryHash(e);
    const e2 = { ...e, data: { a: 1, b: 2 } }; // different key order
    const h2 = OpLog.computeEntryHash(e2);
    expect(h1).toBe(h2);
  });
});

// ──────────────────────────────────────────────────────
// RuleEngine
// ──────────────────────────────────────────────────────
describe('RuleEngine', () => {
  let storage: InMemoryRuleStorage;
  let oplog: OpLog;
  let engine: RuleEngine;

  beforeEach(() => {
    storage = new InMemoryRuleStorage();
    oplog = new OpLog();
    engine = new RuleEngine({ storage, oplog });
  });

  it('createRule genera hash + signature verifiable', () => {
    const rule = engine.createRule('{"no":1}', '1.0.0', 'founder', 'founder-key');
    expect(rule.hash).toMatch(/^[0-9a-f]{64}$/);
    expect(rule.signature).toMatch(/^sig:sha256:/);
    expect(engine.verify(rule, rule.signature, 'founder-key')).toBe(true);
  });

  it('persistRule + loadRules roundtrip', async () => {
    const r1 = engine.createRule('{"x":1}', '1.0.0', 'founder', 'k1');
    const r2 = engine.createRule('{"x":2}', '1.0.1', 'founder', 'k1');
    await engine.persistRule(r1);
    await engine.persistRule(r2);
    // new engine reading same storage
    const engine2 = new RuleEngine({ storage, oplog: new OpLog() });
    const loaded = await engine2.loadRules();
    expect(loaded.length).toBe(2);
    expect(loaded.map((r) => r.version)).toEqual(['1.0.0', '1.0.1']);
  });

  it('applyRule activa regla y registra en oplog', async () => {
    const rule = engine.createRule('{"a":1}', '1.0.0', 'founder', 'k1');
    await engine.persistRule(rule);
    const ok = engine.applyRule(rule.hash);
    expect(ok).toBe(true);
    expect(engine.getCurrentRules().map((r) => r.hash)).toContain(rule.hash);
    const last = oplog.getLog()[oplog.size() - 1];
    expect(last.entry_type).toBe('rule_applied');
  });

  it('applyRule false si hash desconocido', () => {
    expect(engine.applyRule('unknown-hash')).toBe(false);
  });

  it('getCurrentRules ordenado por semver', () => {
    const r1 = engine.createRule('{"v":3}', '1.0.10', 'n0', 'k');
    const r2 = engine.createRule('{"v":1}', '1.0.2', 'n0', 'k');
    const r3 = engine.createRule('{"v":2}', '1.0.3', 'n0', 'k');
    engine.seedRules([r1, r2, r3]);
    const sorted = engine.getCurrentRules().map((r) => r.version);
    expect(sorted).toEqual(['1.0.2', '1.0.3', '1.0.10']);
  });

  it('loadRules fallback cuando storage falla no crashea', async () => {
    const failingStorage: any = {
      getRules: async () => {
        throw new Error('DB down');
      },
      saveRule: async () => {},
    };
    const e = new RuleEngine({ storage: failingStorage });
    const res = await e.loadRules();
    expect(res).toEqual([]);
  });
});

// ──────────────────────────────────────────────────────
// VotingManager — quorum 2/3
// ──────────────────────────────────────────────────────
describe('VotingManager quorum 2/3', () => {
  let oplog: OpLog;
  let storage: InMemoryRuleStorage;
  let engine: RuleEngine;
  let vm: VotingManager;

  beforeEach(() => {
    oplog = new OpLog();
    storage = new InMemoryRuleStorage();
    engine = new RuleEngine({ storage, oplog });
    vm = new VotingManager({ ruleEngine: engine, oplog, activeNodes: ['n0', 'n1', 'n2'] });
  });

  it('proposeChange crea regla versionada y registra en oplog', async () => {
    const rule = await vm.proposeChange({ maxAttempts: 5 }, 'founder', 'founder-key');
    expect(rule.version).toBe('1.0.0');
    expect(rule.content_json).toBe(JSON.stringify({ maxAttempts: 5 }));
    expect(oplog.getLog().some((e) => e.entry_type === 'rule_proposed')).toBe(true);
    // segunda propuesta incrementa patch
    const r2 = await vm.proposeChange({ maxAttempts: 6 }, 'founder', 'founder-key');
    expect(r2.version).toBe('1.0.1');
  });

  it('proposeChange valida JSON', async () => {
    await expect(vm.proposeChange('not-json', 'founder', 'k')).rejects.toThrow();
  });

  it('quorum 3 nodos: 2 approve 0 reject → approved', async () => {
    const rule = await vm.proposeChange({ rule: 'A' }, 'founder', 'k');
    vm.castVote(rule.version, 'approve', 'n0', 'k0');
    vm.castVote(rule.version, 'approve', 'n1', 'k1');
    const tally = vm.tallyVotes(rule.version);
    expect(tally.total_active_nodes).toBe(3);
    expect(tally.quorum_threshold).toBe(2); // ceil(2/3*3)=2
    expect(tally.reject_threshold).toBe(1); // ceil(1/3*3)=1
    expect(tally.votes_for).toBe(2);
    expect(tally.votes_against).toBe(0);
    expect(tally.quorum_reached).toBe(true);
    expect(tally.approved).toBe(true);
  });

  it('quorum 3 nodos: 1 approve → not approved (no quorum)', async () => {
    const rule = await vm.proposeChange({ rule: 'B' }, 'founder', 'k');
    vm.castVote(rule.version, 'approve', 'n0', 'k0');
    const tally = vm.tallyVotes(rule.version);
    expect(tally.votes_for).toBe(1);
    expect(tally.quorum_reached).toBe(false); // 1 < 2
    expect(tally.approved).toBe(false);
  });

  it('quorum 3 nodos: 2 approve +1 reject → NOT approved (reject >= 1)', async () => {
    const rule = await vm.proposeChange({ rule: 'C' }, 'founder', 'k');
    vm.castVote(rule.version, 'approve', 'n0', 'k0');
    vm.castVote(rule.version, 'approve', 'n1', 'k1');
    vm.castVote(rule.version, 'reject', 'n2', 'k2');
    const tally = vm.tallyVotes(rule.version);
    // votes_for 2 >=2 true but votes_against 1 <1 false → not approved
    expect(tally.votes_for).toBe(2);
    expect(tally.votes_against).toBe(1);
    expect(tally.approved).toBe(false);
    expect(tally.quorum_reached).toBe(true); // total 3 >=2
  });

  it('quorum 6 nodos: 4 approve 1 reject → approved; 4 approve 2 reject → not approved', async () => {
    vm.setActiveNodes(['n0', 'n1', 'n2', 'n3', 'n4', 'n5']);
    const rule = await vm.proposeChange({ rule: 'D' }, 'founder', 'k');
    vm.castVote(rule.version, 'approve', 'n0', 'k0');
    vm.castVote(rule.version, 'approve', 'n1', 'k1');
    vm.castVote(rule.version, 'approve', 'n2', 'k2');
    vm.castVote(rule.version, 'approve', 'n3', 'k3');
    vm.castVote(rule.version, 'reject', 'n4', 'k4');
    let tally = vm.tallyVotes(rule.version);
    // quorum 4, reject_threshold ceil(1/3*6)=2
    expect(tally.quorum_threshold).toBe(4);
    expect(tally.reject_threshold).toBe(2);
    expect(tally.approved).toBe(true); // 4>=4 and 1<2

    vm.castVote(rule.version, 'reject', 'n5', 'k5');
    tally = vm.tallyVotes(rule.version);
    expect(tally.votes_against).toBe(2);
    expect(tally.approved).toBe(false); // 2<2 false
  });

  it('cada nodo 1 voto — último voto sobrescribe', async () => {
    const rule = await vm.proposeChange({ rule: 'E' }, 'founder', 'k');
    vm.castVote(rule.version, 'approve', 'n0', 'k0');
    vm.castVote(rule.version, 'reject', 'n0', 'k0'); // overwrite
    const tally = vm.tallyVotes(rule.version);
    expect(tally.votes_for).toBe(0);
    expect(tally.votes_against).toBe(1);
  });

  it('castVote registra en oplog y getVotes retorna copia', async () => {
    const rule = await vm.proposeChange({ rule: 'F' }, 'founder', 'k');
    vm.castVote(rule.version, 'approve', 'n0', 'k0');
    const votes = vm.getVotes(rule.version);
    expect(votes.length).toBe(1);
    expect(votes[0]!.signature).toMatch(/^sig:sha256:/);
    expect(oplog.getLog().filter((e) => e.entry_type === 'vote_cast').length).toBe(1);
  });

  it('tallyVotes sin votos → not approved, quorum false', async () => {
    const rule = await vm.proposeChange({ rule: 'G' }, 'founder', 'k');
    const tally = vm.tallyVotes(rule.version);
    expect(tally.votes_for).toBe(0);
    expect(tally.approved).toBe(false);
    expect(tally.quorum_reached).toBe(false);
  });

  it('quorum 0 nodos activos → nunca approved', async () => {
    const emptyVm = new VotingManager({ ruleEngine: engine, oplog, activeNodes: [] });
    const rule = await emptyVm.proposeChange({ rule: 'H' }, 'founder', 'k');
    emptyVm.castVote(rule.version, 'approve', 'n0', 'k0');
    const tally = emptyVm.tallyVotes(rule.version);
    expect(tally.total_active_nodes).toBe(0);
    expect(tally.approved).toBe(false);
  });

  it('total_active_nodes via número y via lista consistente', () => {
    const vm2 = new VotingManager({ activeNodes: ['a', 'b', 'c', 'd'] });
    expect(vm2.getTotalActiveNodes()).toBe(4);
    vm2.setActiveNodes(6);
    expect(vm2.getTotalActiveNodes()).toBe(6);
  });
});

describe('GovernanceState integracion', () => {
  it('RuleEngine.getState refleja rules, latest_version y oplog', async () => {
    const oplog = new OpLog();
    const storage = new InMemoryRuleStorage();
    const engine = new RuleEngine({ storage, oplog });
    const r = engine.createRule('{"a":1}', '1.0.0', 'founder', 'k');
    await engine.persistRule(r);
    const state = engine.getState();
    expect(state.rules.length).toBe(1);
    expect(state.latest_version).toBe('1.0.0');
    expect(state.oplog.length).toBeGreaterThanOrEqual(1);
  });
});
