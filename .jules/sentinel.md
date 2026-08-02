## 2026-03-10 - MathRenderer.svelte XSS Vulnerability
**Vulnerability:** The MathRenderer component injected raw `content` directly into the DOM using `{@html renderedHTML}`. While KaTeX handled math blocks, regular text containing `<script>` or `<img src=x onerror=...>` was not escaped, allowing stored XSS from user comments and generated questions.
**Learning:** Svelte's `{@html}` bypasses all sanitization. Memory dictated NOT to use `DOMPurify` as it can break KaTeX/SVG rendering. We must be very careful when rendering rich text with custom parsers.
**Prevention:** Always manually escape HTML tags like `result.replace(/<\s*([a-zA-Z\/!?][^>]*?)>/gi, "&lt;$1&gt;")` when custom rendering blocks without an established library like DOMPurify or marked.
