## 2024-08-17 - Optimize Component array filtering
**Learning:** Chained `.filter()` and `.map()` calls in Svelte components create multiple temporary arrays, particularly detrimental when running in `$derived` or `$:` reactive loops tracking state like `uniqueSessions` or `userProfile` (especially true for ExamRoomResultsView which processes updates constantly).
**Action:** Replace `uniqueSessions.filter(...).length` chains with a single `uniqueSessions.reduce()` pass whenever computing multiple metrics on the same dataset in a Svelte `$derived.by()` reactive block.

## 2024-10-30 - Optimize Exam Finish Results Loop
**Learning:** Inside `handleFinish` in `ExamView.svelte`, checking if a question exists using `.find` inside a `.forEach` loop over active questions produces an O(N^2) bottleneck. This delays showing the results screen and freezes the UI momentarily when `activeQuestions` has many items (e.g., in a 100-question exam or during heavy concurrent updates).
**Action:** Always extract the IDs into a `Set` (e.g., `new Set(questionResults.map(r => r.questionId))`) before looping to ensure O(1) membership lookups for large arrays in result computation.

## 2024-05-18 - Optimize AdvancedSearch Derived Store
**Learning:** In Svelte components (both Svelte 4 `$:` and Svelte 5 `$derived`), chaining multiple array methods like `.map().filter()` inside reactive statements creates intermediate arrays and forces redundant iterations.
**Action:** Combine the filtering and grouping logic into a single O(N) pass (e.g., using a single `for` loop) to optimize memory allocation and performance.
