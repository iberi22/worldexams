# WorldExams Active Planning

Last updated: 2026-03-11

## Purpose

This is the canonical planning baseline for active work in the private `worldexams` monorepo.
Use this file instead of root-level legacy planning notes.

## Current Repo Shape

- `apps/worldexams-site/` is the organization/site layer.
- `saberparatodos/` is the reusable exam-product runtime and current Colombia implementation.
- `apps/worldexams-api/` is now the Cloudflare Worker package.
- `services/social-orchestrator/` is now the Rust service package.

## Active Architectural Direction

- Keep one private governed monorepo.
- Scale to new countries through shared logic, shared UI, and country-specific configuration/content.
- Keep deploys manual via CLI.
- Keep planning authority inside `.gitcore/planning/`.

## Migration Priorities

1. Finish authority cleanup so agents default to the new protocol.
2. Decide timing for moving `saberparatodos/` under `apps/` when path churn is acceptable.
3. Normalize workspace scripts and package-local docs after each move.
4. Remove or archive legacy root docs once their useful content is migrated.
5. Clarify root-vs-package Supabase ownership after the package layout settles.

## Constraints

- The repo is private/prelaunch.
- Do not assume public-repo publication flows.
- Do not create GitHub Actions for deploy.
- Do not duplicate country runtimes by default.
