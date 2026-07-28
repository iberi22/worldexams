# Git sync status (2026-07-28)

Local root: `/home/belal/proyectosSWAL/worldexams` on `main`.
Remote `origin` (`iberi22/worldexams`): local was **1 commit behind** after `git fetch` during this program.

## Empareje pendiente (no auto-merge)

Working tree has large intentional multi-pista changes (protocol, social Revisar, informe, edge-mesh bridge, Jules wave0 issues).  
**Do not hard-reset or force-push.** Recommended next step (human/Guardian):

```bash
cd /home/belal/proyectosSWAL/worldexams
git status -sb
# After review/commit of this work:
git pull --rebase origin main   # or merge
git push origin HEAD
```

Secondary remote `org-origin` (world-exams.github.io) is deploy/pages — sync only if release pipeline requires it.

Jules wave0 issues created on GitHub: #808–#816 (see `.gitcore/planning/jules-wave0/`).
