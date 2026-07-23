## 2024-07-23 - MathRenderer KaTeX Bottleneck
**Learning:** KaTeX rendering is a synchronous, CPU-heavy operation. In an app rendering hundreds of equations, this severely blocks the main thread.
**Action:** Use a module-level Svelte cache (`<script context="module">`) with a bounded `Map` to share memoized results across all component instances to significantly reduce duplicate rendering overhead safely.
