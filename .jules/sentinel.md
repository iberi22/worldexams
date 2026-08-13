## 2026-08-09 - Ensure cf-connecting-ip is used before x-forwarded-for
**Vulnerability:** Found IP extraction logic that trusted `x-forwarded-for` (which can be spoofed by clients) before the trusted Cloudflare `cf-connecting-ip` header.
**Learning:** Rate limiting and security middleware can be bypassed via IP spoofing if client-provided headers are evaluated before reverse-proxy verified headers.
**Prevention:** Always extract the client IP using `cf-connecting-ip` before falling back to `x-forwarded-for`.
