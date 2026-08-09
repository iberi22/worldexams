## 2026-08-09 - Optimize Multiple Derived Sorting Passes
**Learning:** Svelte 5 `$derived` blocks that map or sort the exact same underlying arrays can lead to duplicate, redundant reactive cycles and N log N execution overhead in performance-critical views.
**Action:** Use `$derived.by()` to combine multiple interdependent metrics into a single reactive calculation, calculating intermediate arrays and sorting them only once, then slicing out the specific reactive views (like strengths and weaknesses).
