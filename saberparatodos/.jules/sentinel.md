## 2026-08-13 - Prevent DoS via RateLimit Map Leak
**Vulnerability:** Unbounded memory growth in in-memory rate limiting Maps (DoS).
**Learning:** Naively storing rate limit IPs in a JS Map without eviction causes memory leaks, as entries never expire.
**Prevention:** Periodically sweep the Map (e.g., using a probability check like Math.random() < 0.05) to clear expired entries and cap memory consumption.
## 2023-10-24 - IDOR in Comment Submission Endpoint
**Vulnerability:** A malicious user could post a comment impersonating any other user or setting arbitrary \`user_id\` and \`user_name\` via the request body in \`src/pages/api/comments.ts\`.
**Learning:** Bypassing Row Level Security (RLS) by using the admin client (\`createAdminSupabaseClient\`) means we cannot blindly trust user identifiers from the request payload.
**Prevention:** Always extract the \`Authorization\` token directly from headers, retrieve the user securely via \`supabase.auth.getUser()\`, and use the server-validated user properties for database inserts instead of the client payload.
## 2024-10-25 - CSRF Bypass via Missing Headers
**Vulnerability:** The CSRF validation logic in `isValidOrigin` returned `true` when both `origin` and `referer` headers were missing, allowing an attacker to bypass protection.
**Learning:** Failing open on missing standard security headers enables attackers to bypass CSRF checks by using contexts that deliberately omit them (e.g., `<meta name="referrer" content="no-referrer">`).
**Prevention:** Always return `false` in CSRF validation if required headers like `origin` or `referer` are absent.
