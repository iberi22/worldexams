# Social Orchestrator Agent Delta

This file is a local delta for `services/social-orchestrator/`.
Root governance still lives in `/AGENTS.md`.

## Scope

Edit this package for:

- Rust service code
- social automation flows
- service-local environment handling

Do not implement here:

- Cloudflare Worker routing
- product UI
- root site marketing pages

If the task is not service-local orchestration, route it to the owning package first.
