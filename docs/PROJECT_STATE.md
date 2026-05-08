# Project State — WorldExams

**Last updated:** 2026-04-26 18:17 GMT-5
**Version:** v1.0 (in progress)
**Pipeline status:** ⏸️ PAUSED — cronjob disabled pending fixes
**Bundle count:** 791 bundles generated to date

---

## Version

| Version | Status | Notes |
|---|---|---|
| v1.0 | 🚧 In progress | Current active development cycle |
| v0.9 | ✅ Released | Previous stable |
| v0.8 | ✅ Released | Historical |

Current work is tracked in `.gitcore/planning/` and `.gitcore/features.json`.

---

## Pipeline Status

### Generation Pipeline

The bundle generation pipeline (`direct-generate.py`) is **PAUSED**.

**Reason:** Cronjob disabled pending resolution of critical and high-severity issues.

**Affected components:**
- Bundle generation worker (cron-scheduled)
- Social distribution (depends on generated bundles)
- Voice synthesis pipeline (depends on validated bundles)

**Restart condition:** Resume when all CRITICAL and HIGH issues listed below are resolved and verified.

### Known Issues (Blocking Pipeline Resume)

| # | Issue | Severity | Issue File |
|---|---|---|---|
| 1 | Live secrets exposed in saberparatodos | 🔴 CRITICAL | `ISSUE_196_*_Live_secrets_exposed_in_saberparatodos.md` |
| 2 | Exposed secrets detected in git history | 🔴 CRITICAL | `ISSUE_221_*_SECURITY_Exposed_secrets_detected_in_git_history.md` |
| 3 | `direct-generate.py` stalls after ~159 tasks | 🟠 HIGH | `ISSUE_228_*_BUG_direct-generatepy_stalls_after_159_tasks.md` |
| 4 | smol-toml DoS via thousands of comments (yaml CVE) | 🟡 MODERATE | `ISSUE_216_*_Security_smol-toml_DoS.md` |

**CVE status (as of last commit dcbf9af3):**
- `yaml` CVE: downgraded `@astrojs/language-server` to 2.13.4 ✅
- Other moderate CVEs: documented in `docs/REMAINING_CVES.md`

---

## Architecture

### Monorepo Structure

```
E:\scripts-python\worldexams\
├── AGENTS.md                    # Agent rules and memory system definitions
├── .gitcore/                    # Gitcore governance layer
│   ├── ARCHITECTURE.md          # System architecture
│   ├── AGENT_INDEX.md           # Agent routing
│   ├── features.json            # Feature flags
│   ├── planning/               # Active issue tracking and planning
│   │   ├── PLANNING.md         # Main planning doc
│   │   ├── ISSUE_228_*         # Bug: generator stall
│   │   ├── ISSUE_196_*         # Critical: live secrets
│   │   ├── ISSUE_221_*         # Critical: git history secrets
│   │   └── ISSUE_216_*         # Moderate: smol-toml DoS
│   └── ...
├── apps/
│   └── landing-worldexams/     # WorldExams organization/landing site
├── saberparatodos/
│   └── src/                    # Shared exam-product runtime
│                              #   (exam flows, tenant-aware behavior,
│                              #    question/runtime logic, product template)
├── skills/                     # Agent skills
│   ├── create_bundles_manually/ # Manual bundle creation
│   ├── gitcore-monorepo-governance/  # Gitcore governance
│   ├── local_voice_and_timing_orchestrator/  # Voice + timing pipeline
│   ├── math_short_remotion_architect/        # Remotion math video template
│   ├── social_distribution_manager/          # Social publishing
│   ├── video_generation/     # Video generation pipeline
│   └── worldexams-question-reviewer/         # Question review
├── docs/                      # Documentation (this repo)
│   ├── agent-docs/           # Agent protocol specs
│   ├── monorepo/             # Monorepo governance and migration
│   ├── specs/                # Product/domain specifications
│   ├── reports/              # Status reports and PR templates
│   ├── preuniversitario/     # Preuniversitario product
│   ├── ARCHITECTURE/         # Architecture docs + ADRs
│   ├── sources/              # Question source registries
│   └── [topic files]         # Top-level documentation
└── scripts/                  # Utility scripts
```

### Key Systems

| System | Purpose |
|---|---|
| **Bundle generation** | Generate ICFES question bundles (grades 6, 9, 11) |
| **Remotion video pipeline** | Render 15s vertical math explainer videos |
| **Voice synthesis** | XTTS-v2 + WhisperX local TTS pipeline |
| **Social distribution** | Auto-publish to YouTube Shorts, Instagram Reels; TikTok manual |
| **Cortex memory** | Enterprise memory (port 8003) — decisions, projects, state |
| **Xavier2 memory** | Open-source vector memory (port 8006) — fast queries |
| **Jules** | AI coding agent — picks up issues labeled `jules` |
| **Minimax MCP** | Primary generation model via MCP |

### Site Boundaries

- **`apps/landing-worldexams/`** → organization messaging, country directory, brand surface
- **`saberparatodos/src/`** → exam flows, tenant-aware product behavior, question/runtime logic

---

## Phase Status

| Phase | Status | Notes |
|---|---|---|
| Phase 1 | ✅ Complete | Repository setup, initial architecture |
| Phase 2 | ✅ Complete | Bundle generation pipeline |
| Phase 3 | ✅ Complete | Voice + Remotion pipeline |
| Phase 4 | ✅ Complete | Social distribution |
| Phase 5 | 🚧 In progress | Documentation audit + skills expansion |
| Phase 6 | ⏳ Not started | Pipeline resume after fixes |
| Phase 7 | ⏳ Not started | v1.0 release |

---

## Audit Findings (2026-04-26)

- **Bundle count:** 791 bundles generated to date (`questions_data/` recursive scan)
- **Skills:** 7 skills found, all with SKILL.md files. Largest: `create_bundles_manually/` (11.6 KB), `social_distribution_manager/` (9.2 KB)
- **Docs:** 45 documentation files in `docs/`. Notable large files: `PARTY_MODE.md` (20 KB), `SOCIAL_MEDIA_BOTS_ARCHITECTURE.md` (19.7 KB), `QUESTION_GENERATION_PROTOCOL_V2.md` (18.5 KB), `MONETIZATION_STRATEGY.md` (17 KB), `SYNC_QUESTIONS_ARCHITECTURE.md` (16.6 KB)
- **Planning issues:** 13 active issue files in `.gitcore/planning/`, including 5 new country curricula (MX, AR, CL, PE, EC, BR) and 1 Colombia refactor issue (ISSUE_236)
- **Phase 2.2:** No Phase 2.2 found in document — existing phases are 1–7; Phase 5 currently in progress

---

## Key Contacts / Agents

| Agent | Role |
|---|---|
| `worldexams` (main) | Bundle generation, validation, pipeline orchestration |
| `jules` | AI coding — picks up `jules`-labeled GitHub issues |
| Subagents | Spawned per-task (docs, skills, etc.) |
