Tarea WX-206 — Gobernanza versionada + votación consejo de nodos

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola2-206)
LEE: AGENTS.md + docs/SWAL/* + docs/DECISIONS_2026-08-25-REDES-XAVIER-Y-ETICA.md

ISLA (SOLO): saberparatodos/src/lib/governance/**

CONTEXTO (D5/BR-05): reglas creadas por fundadores, modificables por el consejo de nodos. Las reglas son versionadas (semver), firmadas (ML-DSA-65 o equivalente placeholder), y registradas en un append-only op-log (operation log). Votación del consejo: cada nodo = 1 voto (peso igual). Quorum = 2/3 de nodos activos conocidos. Las reglas son TEXT (JSON plano) almacenado en Supabase o IndexedDB local.

PASOS:
1. src/lib/governance/types.ts: Rule {id, version, content_json, hash, signer_node, signature, created_at}, Vote {rule_version, voter_node, vote: "approve"|"reject", signature, timestamp}, GovernanceState {rules: Rule[], latest_version, oplog: OpEntry[]}
2. src/lib/governance/RuleEngine.ts: loadRules() (lee de Supabase o IndexedDB), applyRule(rule_hash), sign(rule, privateKey) — placeholder signature: sha256(rule+key).verifiable. getCurrentRules().
3. src/lib/governance/VotingManager.ts: proposeChange(newRuleContent), castVote(ruleVersion, vote), tallyVotes(ruleVersion) → {approved: boolean, quorum_reached: bool, votes_for, votes_against, total_active_nodes}. Quorum: votes_for >= ceil(2/3 * total_active_nodes) AND votes_against < ceil(1/3 * total_active_nodes).
4. src/lib/governance/OpLog.ts: append(entry_type, data, node_hash, signature) → OpEntry. getLog() → lista append-only. Verifica integridad (cada entry referencia hash del anterior — cadena simple).
5. Tests: tests/governance/*.test.ts: proposeChange + castVote + tallyVotes con quorum. OpLog integrity check. Firma placeholder. Vitest.
6. NO tocar componentes UI (WX-304 hace eso).

CIERRE:
- git add saberparatodos/src/lib/governance tests/governance && npm run test -- --run
- git commit -m "feat(governance): rule engine, votación consejo con quorum 2/3, op-log append-only, tests (#206)"
