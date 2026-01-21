# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🔒 Security & Performance Improvements (2025-12-18)

#### Added
- **Edge Function Guest Access:** Unauthenticated users can now access Edge Functions with 10 questions/request limit
- **Rate Limiting:** IP-based rate limiting (100 requests/hour) for guest users
- **Bulk Endpoint:** New `/get-questions-bulk` endpoint reduces Blog View from 50+ requests to 1 request
- **CSP Headers:** Content Security Policy headers for XSS and tampering protection
- **Caching Headers:** Cloudflare edge caching enabled (1 hour TTL for guests)
- **Input Validation:** Server-side validation for all Edge Function parameters (grade, subject, country)
- **Smart Fetching:** Deduplication logic to prevent repeating questions seen in the last 7 days
- **Diagnostic Mode:** Ability to inject lower-grade questions into high-grade exams to detect foundational gaps
- **Integrity Intro:** Loading animation with motivational messages about academic honesty to mask data fetching time

#### Changed
- **Edge Function Response:** Removed hard authentication requirement, added guest mode support
- **Blog View Loading:** Optimized to use bulk endpoint (98% reduction in HTTP requests)
- **Static API:** Deprecated in favor of Edge Functions (can be disabled via `DISABLE_STATIC_API` flag)
- **API Service:** Removed fallback to static API when JWT is missing

#### Performance
- **Blog View Requests:** 50+ → 1 request (-98%)
- **Blog View Bandwidth:** 15 MB → 300 KB (-98%)
- **Blog View Load Time:** 2.5s → 200ms (-92%)

#### Security
- **Authentication:** Client-side only → Server-side validation
- **Rate Limiting:** None → 100 requests/hour per IP
- **API Bypass:** Static API fallback → Edge Function only
- **XSS Protection:** None → Full CSP implementation

#### Documentation
- Added `SECURITY_IMPLEMENTATION_REPORT.md` - Detailed technical documentation
- Added `DEPLOYMENT_GUIDE_SECURITY.md` - Step-by-step deployment guide
- Added `SECURITY_QUICK_SUMMARY.md` - Executive summary
- Updated database migration: `supabase/migrations/20251218_create_rate_limiting.sql`



## [0.1.0] - 2025-12-05

### Added
- Cloudflare Pages configuration.
- SEO improvements (sitemap, robots.txt, meta tags).
- Git-Core Protocol directory structure (`docs/specs`, `docs/reports`).

### Changed
- Reorganized `docs/` directory.
