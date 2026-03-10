# Changelog

All notable changes to this workspace are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows a pragmatic release flow while repository boundaries are still being finalized.

## [0.3.1] - 2026-03-09

### Added

- Public launch audit documented in `TASK.md` and `PLANNING.md`
- Platform user manual page for SaberParaTodos
- Quickstart header for the developer API docs page
- Clear changelog discovery entry points from `/novedades`
- Email magic-link option in the developer dashboard

### Changed

- Main practice route moved to `/`, leaving `/practica` as a redirect
- Navbar simplified to reduce overlap and remove redundant entry points
- Developer dashboard now bootstraps a personal organization automatically when creating the first API key
- `openapi.yaml` now reflects the real bearer-token API gateway contract
- Root README rewritten to match the current workspace reality and public-repo direction
- Launch planning and task tracking updated in English

### Fixed

- English diagnostic fallback now works even when local pack storage is empty
- English subject normalization no longer breaks filtering on accented inputs
- News page now exposes the changelog instead of hiding it behind a separate route
- `api-gateway` logging and rate-limiting logic aligned with `usage_logs`

### Operations

- `api-gateway` deployed to Supabase and confirmed active
- Build validated successfully in `saberparatodos`

## [0.3.0] - 2026-02-18

### Added

- Guest access path for question Edge Functions with request limits
- Bulk endpoint for question fetching
- Diagnostic mode with lower-grade injection for gap detection
- Integrity intro/loading flow
- Server-side validation for Edge Function parameters

### Changed

- Product status messaging updated to open beta
- Blog view optimized to use bulk fetching
- Static API flow reduced in importance in favor of Edge Functions
- Smart fetching improved to avoid recently seen questions

### Performance

- Blog view request count reduced dramatically through bulk fetching
- Edge caching introduced for guest traffic

### Security

- Guest rate limiting
- CSP hardening
- RLS and backend validation improvements

## [0.1.0] - 2025-12-05

### Added

- Cloudflare Pages configuration
- SEO improvements
- Initial docs/specs/report structure
