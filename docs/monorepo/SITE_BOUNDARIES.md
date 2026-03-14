# Site Boundaries

Last updated: 2026-03-11

## Goal

Prevent agents from mixing the root `worldexams` site with the shared exam-product runtime.

## Current Meaning Of Each Frontend Surface

| Path | Current meaning | Ownership |
|---|---|---|
| `apps/worldexams-site/` | `worldexams` organization/site layer | global brand, country discovery, institutional navigation |
| `saberparatodos/src/` | shared exam-product runtime and current Colombia implementation | reusable product logic, tenants, exam UX, auth, content runtime |

## Root Site Rules

The root site may own:

- organization homepage
- country cards and ecosystem navigation
- brand-level messaging
- links/routing toward products
- high-level informational pages

The root site must not become the default home for:

- question orchestration
- exam runtime logic
- tenant/product configuration
- product auth flows
- per-country exam features

## `saberparatodos` Rules

`saberparatodos/` is not just a Colombia folder anymore.
It is the current product runtime and the base template for future countries.

It should own:

- reusable exam flows
- tenant-aware configuration
- localized product rendering
- question/runtime logic
- product APIs and Supabase integrations

## Expansion Rule

When a new country is added:

- start from `saberparatodos/`
- add or extend tenant/config/content layers
- avoid cloning root-site code as a product base

## Current Physical Move

Target interpretation:

```text
worldexams/
├── apps/worldexams-site/
├── saberparatodos/
```

Agents must treat:

- `apps/worldexams-site/src/` as the site layer
- `saberparatodos/src/` as the product runtime layer
