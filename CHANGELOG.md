# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.3.0] - 2026-02-18

### 🚀 Beta Abierta Launch

#### Added
- **Edge Function Guest Access:** Unauthenticated users can now access Edge Functions with 10 questions/request limit.
- **Bulk Endpoint:** New `/get-questions-bulk` endpoint reduces Blog View from 50+ requests to 1 request.
- **Diagnostic Mode:** Ability to inject lower-grade questions into high-grade exams to detect foundational gaps.
- **Integrity Intro:** Loading animation with motivational messages about academic honesty to mask data fetching time.
- **Input Validation:** Server-side validation for all Edge Function parameters (grade, subject, country).
- **Security Documentation:** Added `SECURITY_IMPLEMENTATION_REPORT.md`, `DEPLOYMENT_GUIDE_SECURITY.md`, and `SECURITY_QUICK_SUMMARY.md`.

#### Changed
- **UI Update:** Changed status from "Sistema Listo" to "Beta Abierta".
- **Edge Function Response:** Removed hard authentication requirement, added guest mode support.
- **Blog View Loading:** Optimized to use bulk endpoint (98% reduction in HTTP requests).
- **Static API:** Deprecated in favor of Edge Functions (can be disabled via `DISABLE_STATIC_API` flag).
- **Smart Fetching:** Deduplication logic to prevent repeating questions seen in the last 7 days.

#### Performance
- **Optimization:** Blog View requests reduced from 50+ to 1 request (-98%).
- **Bandwidth:** 15 MB → 300 KB (-98%).
- **Load Time:** 2.5s → 200ms (-92%).
- **Caching:** Cloudflare edge caching enabled (1 hour TTL for guests).

#### Security
- **Rate Limiting:** IP-based rate limiting (100 requests/hour) for guest users.
- **CSP Headers:** Content Security Policy headers for XSS and tampering protection.
- **Authentication:** Server-side validation for all requests.
- **Database:** Optimized RLS policies and migrations for rate limiting.

## [0.1.0] - 2025-12-05

### Added
- Cloudflare Pages configuration.
- SEO improvements (sitemap, robots.txt, meta tags).
- Git-Core Protocol directory structure (`docs/specs`, `docs/reports`).

### Changed
- Reorganized `docs/` directory.
