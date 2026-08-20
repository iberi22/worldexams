
## 2026-08-09 - Ensure cf-connecting-ip is used before x-forwarded-for
**Vulnerability:** Found IP extraction logic that trusted `x-forwarded-for` (which can be spoofed by clients) before the trusted Cloudflare `cf-connecting-ip` header.
**Learning:** Rate limiting and security middleware can be bypassed via IP spoofing if client-provided headers are evaluated before reverse-proxy verified headers.
**Prevention:** Always extract the client IP using `cf-connecting-ip` before falling back to `x-forwarded-for`.


## 2026-03-10 - MathRenderer.svelte XSS Vulnerability
**Vulnerability:** The MathRenderer component injected raw `content` directly into the DOM using `{@html renderedHTML}`. While KaTeX handled math blocks, regular text containing `<script>` or `<img src=x onerror=...>` was not escaped, allowing stored XSS from user comments and generated questions.
**Learning:** Svelte's `{@html}` bypasses all sanitization. Memory dictated NOT to use `DOMPurify` as it can break KaTeX/SVG rendering. We must be very careful when rendering rich text with custom parsers.
**Prevention:** Always manually escape HTML tags like `result.replace(/<\s*([a-zA-Z\/!?][^>]*?)>/gi, "&lt;$1&gt;")` when custom rendering blocks without an established library like DOMPurify or marked.

## 2025-07-27 - [Fix KaTeX XSS Vulnerability]
**Vulnerability:** KaTeX configuration was set to `trust: true`, allowing potentially malicious LaTeX commands to render raw HTML/execute JS (XSS vulnerability).
**Learning:** In Svelte components rendering LaTeX via KaTeX, using `trust: true` alongside `{@html ...}` bindings opens a direct XSS vector because KaTeX will trust arbitrary user-provided HTML commands in the LaTeX string, and Svelte will render it unescaped.
**Prevention:** Always set `trust: false` (the default) in KaTeX configurations when dealing with user-generated or external content. Avoid DOM sanitization libraries (like `isomorphic-dompurify`) to clean KaTeX output unless absolutely necessary, as it can break complex SVG/MathML outputs and add bundle bloat; KaTeX is designed to be secure with `trust: false`.

## 2026-08-02 - [Fix Hardcoded CAPTCHA_SECRET Vulnerability]
**Vulnerability:** A hardcoded secret ('spt-captcha-2026-worldexams-secret-key') was used as a fallback for the CAPTCHA verification token signing in `verify-captcha.ts`.
**Learning:** Hardcoded fallback values for secrets undermine security since any attacker with access to the source code can use them to bypass protections (e.g. generating valid verification tokens).
**Prevention:** Fail securely if a secret is missing from environment configuration instead of falling back to a hardcoded string. Check for configuration at runtime and return an appropriate error code if missing.

## 2026-08-05 - [Fix Supabase SSR Client State Leakage]
**Vulnerability:** A global singleton Supabase client (`import { supabase } from '../../../lib/supabase'`) was being imported and used to check auth and insert rows within a server-side route (`generate-link-token.ts`).
**Learning:** In Astro or other SSR environments, global singleton database clients can leak state across concurrent user requests, potentially allowing one request to execute queries using the authenticated session of another request.
**Prevention:** Always create a request-scoped Supabase client per API invocation (e.g. `createServerSupabaseClient` utilizing the user's specific access token or using an admin client exclusively for server-to-server operations).
## 2024-05-18 - Insecure HTML Escaping Regex in MathRenderer
**Vulnerability:** The application used an insecure regular expression `result.replace(/<\s*([a-zA-Z\/!?][^>]*?)>/gi, "&lt;$1&gt;");` to escape HTML tags in `MathRenderer.svelte`. This regex failed to escape attributes correctly and did not encode elements like `&`, `"`, and `'`. This allowed injection via vectors like `{{audio:https://x.com/a" onerror="alert(1)}}` inserting quotes inside `src="..."` due to missing `"` encoding, which led to a Cross-Site Scripting (XSS) vulnerability.
**Learning:** Regular expressions are notoriously bad at parsing and sanitizing HTML. To preserve complex structures like LaTeX mathematical blocks (`$$...$$` and `$...$`) while ensuring safe HTML text escaping without using libraries like DOMPurify (which cause KaTeX issues), one should extract the math expressions to temporary placeholders, run a global HTML entity replacement for all 5 characters (`&`, `<`, `>`, `"`, `'`), and then restore the placeholders.
**Prevention:** Avoid custom regex-based HTML tag detection for sanitization. Use full entity escape replacements: `.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")`, combined with `trust: false` on render libraries, and strict validation of parsed data like multimedia URLs.
## 2026-08-09 - [Prevent Rate Limit Bypass via IP Spoofing]
**Vulnerability:** Rate limiting in `/api/comments` relied on `X-Forwarded-For` as the primary source for the client IP. An attacker could spoof this header to bypass the 5 requests/minute limit, allowing them to flood the database and the Telegram moderation bot.
**Learning:** When deployed behind Cloudflare (or similar reverse proxies), `X-Forwarded-For` can be manipulated by the client (the spoofed IP is prepended). Always prioritize the platform-specific trusted IP header (e.g., `CF-Connecting-IP`).
**Prevention:** Prioritize `CF-Connecting-IP` over `X-Forwarded-For` when determining the client IP for rate limiting or security purposes.
## 2024-05-18 - PostgREST Filter Injection via OR clauses
**Vulnerability:** The application was vulnerable to PostgREST filter injection in `src/components/CollegeSelect.svelte`. Unsanitized user input from the college search bar was directly concatenated into an `.or()` query filter: `.or(\`name.ilike.%${query}%,cod_dane.ilike.%${query}%\`)`. Because PostgREST uses commas (`,`) to separate conditions within `.or()` clauses, an attacker could input a comma to alter the query logic and bypass intended filtering.
**Learning:** When using the Supabase JS client's string-based `.or()` filters, standard string concatenation is highly dangerous if the input contains PostgREST reserved characters like commas (`,`) or unescaped wildcard percent signs (`%`). It effectively leads to NoSQL/Filter injection.
**Prevention:** Always explicitly sanitize or strip commas and other filter control characters when building string-based PostgREST filter clauses. Alternatively, use safer, parameterized matching methods if supported by the client library, but if concatenation is necessary, use `query.replace(/[,%]/g, ' ')` or similar robust stripping.


## 2026-08-13 - [Fix Rate Limit Bypass via IP Spoofing]
**Vulnerability:** IP extraction logic in `api/comments.ts`, `api/developers/auth/magic-link.ts`, `api-gateway/index.ts`, and `get-questions/index.ts` was falling back to extracting the `x-forwarded-for` header and using it for rate limiting and logging if `cf-connecting-ip` was not present or spoofed. This is dangerous because `x-forwarded-for` is easily spoofed by the client, allowing attackers to bypass rate limits or spoof IP logs.
**Learning:** Never trust `x-forwarded-for` as a fallback unless its origin is strictly verified as a trusted proxy. If `cf-connecting-ip` (or the specific proxy header) is not present or reliable, the application should fall back to a safe default like `'unknown'` rather than trusting client-provided headers that bypass security mechanisms.
**Prevention:** Remove `x-forwarded-for` from `getClientIp` helpers or explicitly ensure it is only used when validated. Provide a safe fallback (e.g. `'unknown'`) if no trusted IP header can be found to avoid spoofing vulnerabilities.
## 2024-08-14 - SSRF and Path Traversal in proxy route
**Vulnerability:** The API route `saberparatodos/src/pages/api/packs/[...slug].ts` proxied requests to a backend URL using user-supplied path components (`slug`) without validating them against path traversal (`..` or `%2e%2e`). This could allow an attacker to bypass the intended `/v1/packs/` directory and issue requests to other endpoints on the target origin (e.g. `../../admin`).
**Learning:** Whenever proxying requests by concatenating user inputs into a backend URL, it's essential to validate the input to ensure it doesn't navigate upwards in the directory tree using URL decoding.
**Prevention:** Added a check to URL-decode the `slug` and reject it if it contains `..`. This is a defensive-in-depth measure.
## 2026-08-17 - Rate Limit Bypass due to missing IP-based restrictions
**Vulnerability:** The API route \`/api/report_problem.ts\` was directly forwarding arbitrary POST bodies to a backend Edge Function without checking payload sizes or applying rate limits.
**Learning:** Endpoints that proxy requests to cloud functions or third-party services can become vectors for Denial of Service (DoS) attacks or result in uncontrollable resource consumption if not adequately rate-limited based on the user's IP.
**Prevention:** Implement standard in-memory rate limiting (using `cf-connecting-ip` to securely identify clients) across all public-facing endpoints, especially those that trigger downstream functions or external notifications (like Telegram bots).
## 2026-08-18 - [Fix IP Spoofing Risk by removing x-forwarded-for fallback]
**Vulnerability:** The application was extracting client IPs using `x-forwarded-for` as a fallback in multiple locations (`apps/worldexams-api/src/index.ts`, `src/app.ts`, `saberparatodos/src/middleware.ts`). This header can easily be spoofed by attackers.
**Learning:** Never trust `x-forwarded-for` as a fallback when identifying client IP. If a trusted proxy header like `cf-connecting-ip` is not available, default to a safe value (e.g. `'127.0.0.1'` or `'unknown'`) rather than an insecure user-controlled header.
**Prevention:** Strictly rely on `cf-connecting-ip` and completely remove `x-forwarded-for` fallback logic across the codebase to ensure robust rate limiting, geolocation detection, and API logging.

## 2026-08-18 - [Fix Hardcoded OPENCODE_API_KEY]
**Vulnerability:** A hardcoded production `API_KEY` (sk-wMepzFhQrFxfq0RsKIM7fp3gPWftUL18E71lAq6rrqRDoFXLsHOI2HGxWINiaUmi) was exposed directly in multiple python script source files (`fix_empty_bundle.py`, `regenerate_bad_bundles.py`, `direct-generate-gateway.py`, `regen_mexico.py`).
**Learning:** Hardcoding API keys directly into scripts instead of fetching them securely from environment variables leaves the application vulnerable to credential theft and exploitation. Even auxiliary or generation scripts can leak critical access tokens if pushed to remote repositories.
**Prevention:** Always retrieve secrets securely via environment variables (e.g., `os.environ.get("OPENCODE_API_KEY")`). Any newly created scripts that handle external APIs must use environment variables or encrypted secrets managers, and never embed literal strings starting with standard secret prefixes (e.g., `sk-`).
## 2026-08-18 - [Fix IP Spoofing Risk in Supabase Edge Functions]
**Vulnerability:** The Edge Functions (`get-questions-bulk/index.ts` and `get-questions/index.ts`) were falling back to extracting the `x-forwarded-for` header for IP-based rate limiting if `cf-connecting-ip` was missing. `x-forwarded-for` can be easily spoofed by clients, allowing them to evade the 100 requests/hour limit for guests.
**Learning:** In serverless Edge Functions acting as APIs (e.g. Supabase, Cloudflare Workers), using user-controllable headers like `x-forwarded-for` for security logic such as rate limits provides a false sense of security and opens the application to Distributed Denial of Service (DDoS) or brute force attacks.
**Prevention:** Strictly rely on trusted proxy headers (e.g. `cf-connecting-ip`) injected by infrastructure that cannot be modified by the client. If none is available, fall back to a safe default like `'unknown'`, avoiding any client-provided fallback mechanism entirely.
