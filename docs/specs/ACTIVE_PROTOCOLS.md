# Active Protocols

Last updated: 2026-03-10

## Purpose

This file defines which product and operational protocols are active by default.
If another protocol document conflicts with this file, validate against the root governance layer before acting.

## Active Defaults

| Area | Default authority | Notes |
|---|---|---|
| Question generation | `docs/QUESTION_GENERATION_PROTOCOL_V3.md` | Default for new bundle generation |
| Country onboarding | `docs/specs/REPLICACION.md` | New countries should reuse shared logic/UI |
| Product deploy | `saberparatodos/PROTOCOLO_DEPLOY_CLI.md` | Manual CLI deploy path |
| Repo governance | `README.md`, `AGENTS.md`, `.gitcore/ARCHITECTURE.md` | Root layer wins |

## Historical Or Specialized References

| File | Current role | Rule |
|---|---|---|
| `docs/QUESTION_GENERATION_PROTOCOL_V2.md` | historical migration reference for v2.x bundles | Do not use as the default for new generation work |
| `docs/MODERN_QUESTIONS_PROTOCOL.md` | specialized style overlay | Use only if explicitly requested and reconcile with v3 first |
| `docs/API_REAL_SETUP.md` | historical API setup snapshot | Validate runtime/package paths before using it |

## Monorepo Rule

Protocols must support:

- shared application logic
- shared UI foundation
- country variation through configuration, content, branding, localization, and SEO
- manual/private operational flows unless root governance says otherwise
