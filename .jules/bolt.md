## 2024-08-17 - Optimize Component array filtering
**Learning:** Chained `.filter()` and `.map()` calls in Svelte components create multiple temporary arrays, particularly detrimental when running in `$derived` or `$:` reactive loops tracking state like `uniqueSessions` or `userProfile` (especially true for ExamRoomResultsView which processes updates constantly).
**Action:** Replace `uniqueSessions.filter(...).length` chains with a single `uniqueSessions.reduce()` pass whenever computing multiple metrics on the same dataset in a Svelte `$derived.by()` reactive block.
