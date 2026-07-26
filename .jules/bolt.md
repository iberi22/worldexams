## 2024-07-26 - KaTeX Synchronous Rendering Bottlenecks
**Learning:** Synchronous rendering in Svelte components (like MathRenderer.svelte for KaTeX expressions) can become computationally expensive, particularly when rendering many instances simultaneously.
**Action:** Utilize module-level caching (`<script context="module">` with a bounded Map) in Svelte components to share memoized text-to-HTML rendering results across all component instances.
