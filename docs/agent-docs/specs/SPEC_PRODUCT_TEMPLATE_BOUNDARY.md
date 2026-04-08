---
title: "WorldExams Product Template Boundary"
type: SPEC
id: "spec-worldexams-product-template-boundary"
created: 2026-03-30
updated: 2026-03-30
agent: codex
model: gpt-5
requested_by: user
summary: |
  Defines the canonical boundary between the global landing site and the
  shared exam-product runtime template, including tenanting rules.
keywords: [template, tenanting, runtime, landing-site, boundary]
tags: ["#spec", "#tenanting", "#monorepo"]
project: worldexams
status: active
---

# WorldExams Product Template Boundary

## Objective

Keep `saberparatodos/` as the canonical shared exam-product runtime while preserving `apps/landing-worldexams/` as the global organization site.

## Canonical Ownership

### `saberparatodos/`

Owns:

- tenant-aware product runtime
- exam UX and scoring flows
- product auth and product-local APIs
- shared runtime layout, theming hooks, SEO shell, and widgets
- product-side Supabase Functions and product-side deployment scripts

### `apps/landing-worldexams/`

Owns:

- WorldExams organization pages
- country discovery and global routing
- institutional messaging
- ecosystem-level SEO and brand surface

## Tenanting Rule

- Shared country metadata lives in `config/countries.config.ts`.
- `saberparatodos/src/config/` may adapt that catalog for runtime use, but it must not create a second source of truth for country definitions.
- New countries should be added by extending shared config plus localized content, not by cloning the runtime.

## Content Boundary

- Shared runtime behavior belongs in `saberparatodos/src/`.
- Country-specific editorial material should live in explicit tenant content modules or localized content paths.
- The landing site must not absorb product-only logic just because it is simpler to edit.

## Operational Rule

When a task touches both the landing site and the product runtime:

1. decide ownership first
2. keep the changes separated by surface
3. avoid duplicating theme, locale, or tenant data across both surfaces
