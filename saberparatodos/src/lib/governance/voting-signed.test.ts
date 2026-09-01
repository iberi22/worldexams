/**
 * WX-206 / WAVE-11.08 — Signed Governance Council Voting Tests
 * Tests proposeRuleChange, signed voting, 2/3 quorum reached, and rejection of unsigned/invalid operations.
 * TODO ML-DSA-65: Ed25519 signature stub.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { VotingManager } from './VotingManager';
import { OpLog } from './OpLog';

describe('Governance Council Signed Voting & OpLog', () => {
  let vm: VotingManager;
  let oplog: OpLog;

  beforeEach(() => {
    oplog = new OpLog();
    vm = new VotingManager({
      oplog,
      activeNodes: ['node-alpha', 'node-beta', 'node-gamma'],
    });
  });

  it('proposeRuleChange creates a signed proposal and logs it in OpLog', async () => {
    const validSignature = 'sig:sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff:by:node-alpha';
    const proposal = await vm.proposeRuleChange(
      'UPDATE_MUTABLE_FOUNDER_RULES',
      { mutableFoundersAllowed: true },
      'node-alpha',
      validSignature
    );

    expect(proposal.id).toBeDefined();
    expect(proposal.op).toBe('UPDATE_MUTABLE_FOUNDER_RULES');
    expect(proposal.signer).toBe('node-alpha');
    expect(proposal.signature).toBe(validSignature);

    const logEntries = oplog.getLog();
    expect(logEntries.length).toBeGreaterThanOrEqual(1);
    expect(logEntries[logEntries.length - 1]?.entry_type).toBe('rule_proposed');
  });

  it('vote records signed votes from council nodes', async () => {
    const validProposalSig = 'sig:sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff:by:node-alpha';
    const proposal = await vm.proposeRuleChange(
      'MODIFY_COUNCIL',
      { councilSize: 5 },
      'node-alpha',
      validProposalSig
    );

    const voteSigAlpha = 'sig:sha256:aaaaa11111222223333344444555556666677777888889999900000111112222:by:node-alpha';
    const voteAlpha = vm.vote(proposal.id, 'node-alpha', voteSigAlpha, 'approve');

    expect(voteAlpha.rule_version).toBe(proposal.id);
    expect(voteAlpha.voter_node).toBe('node-alpha');
    expect(voteAlpha.signature).toBe(voteSigAlpha);
  });

  it('quorumReached returns true when 2/3 council quorum is reached', async () => {
    const validProposalSig = 'sig:sha256:11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff:by:node-alpha';
    const proposal = await vm.proposeRuleChange(
      'RULE_CHANGE_QUORUM_TEST',
      { threshold: 80 },
      'node-alpha',
      validProposalSig
    );

    expect(vm.quorumReached(proposal.id)).toBe(false);

    const sig1 = 'sig:sha256:1111111111222222222233333333334444444444555555555566666666667777:by:node-alpha';
    const sig2 = 'sig:sha256:8888888888999999999900000000001111111111222222222233333333334444:by:node-beta';

    vm.vote(proposal.id, 'node-alpha', sig1, 'approve');
    expect(vm.quorumReached(proposal.id)).toBe(false); // 1/3 < 2/3

    vm.vote(proposal.id, 'node-beta', sig2, 'approve');
    expect(vm.quorumReached(proposal.id)).toBe(true); // 2/3 >= 2/3 quorum reached!
  });

  it('rejects unsigned or invalid signature operations', async () => {
    const invalidSignature = 'invalid-not-a-hex-signature!';

    await expect(
      vm.proposeRuleChange('BAD_OP', { test: true }, 'node-alpha', invalidSignature)
    ).rejects.toThrow(/Invalid signature/);

    expect(() => {
      vm.vote('prop-123', 'node-alpha', invalidSignature, 'approve');
    }).toThrow(/Invalid signature/);

    expect(() => {
      oplog.appendSigned('rule_proposed', invalidSignature, { test: true });
    }).toThrow(/Invalid signature/);
  });
});
