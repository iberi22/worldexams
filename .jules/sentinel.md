## 2025-02-27 - KaTeX XSS Vulnerability Fix
**Vulnerability:** XSS via KaTeX rendering with `trust: true`.
**Learning:** Setting KaTeX `trust` to `true` allows rendering malicious content. Furthermore, using `isomorphic-dompurify` to sanitize its output requires preserving SVG elements (`svg: true` in `USE_PROFILES`), otherwise stretchy mathematical symbols like square roots will break.
**Prevention:** Always default to `trust: false` for KaTeX rendering and verify `isomorphic-dompurify` configuration profiles when dealing with specialized DOM nodes.
