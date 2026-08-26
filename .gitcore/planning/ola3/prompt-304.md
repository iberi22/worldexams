Tarea WX-304 — Governance UI: reglas fundadoras + votación consejo + op-log visible

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola3-304, rama wx/ola3-304)
LEE: AGENTS.md + saberparatodos/src/lib/governance/** (WX-206 crea el engine).

ISLA (SOLO): src/pages/governance.astro, src/components/governance/** (NO tocar src/lib/governance/** que ya hizo WX-206).

CONTEXTO: WX-206 creó RuleEngine, VotingManager, OpLog. Esta task crea la UI que consume esas clases. D5: reglas creadas por fundadores, modificadas por consejo de nodos con quorum.

PASOS:
1. src/pages/governance.astro: Página principal de gobernanza. Muestra: lista de reglas actuales (RuleEngine.getCurrentRules()), última versión, link a op-log. Botón "Proponer cambio" (abre modal).
2. src/components/governance/RuleList.astro: Lista de reglas versionadas con hash, versión, fecha, contenido expandible. Destaca la latest.
3. src/components/governance/ProposeChangeForm.astro: Formulario para proponer cambio (textarea con contenido JSON de la nueva regla). llama VotingManager.proposeChange(). Muestra preview del diff de hash.
4. src/components/governance/VotePanel.astro: Muestra regla propuesta pendiente, botones Approve/Reject, tally en vivo (votes_for/against, quorum status). llama VotingManager.castVote() + tallyVotes().
5. src/components/governance/OpLogViewer.astro: Lista cronológica del op-log (OpLog.getLog()) con entries tipo {timestamp, type, node_hash, hash_short}. Scroll paginado, 20 entries por página.
6. NO tocar src/lib/governance/** — solo consumir importaciones de WX-206.

CIERRE:
- git add src/pages/governance.astro src/components/governance
- git commit -m "feat(governance-ui): página reglas, proponer cambio, votar, op-log viewer (#304)"
