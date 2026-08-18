## 2024-08-17 - Optimize Component array filtering
**Learning:** Chained `.filter()` and `.map()` calls in Svelte components create multiple temporary arrays, particularly detrimental when running in `$derived` or `$:` reactive loops tracking state like `uniqueSessions` or `userProfile` (especially true for ExamRoomResultsView which processes updates constantly).
**Action:** Replace `uniqueSessions.filter(...).length` chains with a single `uniqueSessions.reduce()` pass whenever computing multiple metrics on the same dataset in a Svelte `$derived.by()` reactive block.

## 2024-10-30 - Optimize Exam Finish Results Loop
**Learning:** Inside `handleFinish` in `ExamView.svelte`, checking if a question exists using `.find` inside a `.forEach` loop over active questions produces an O(N^2) bottleneck. This delays showing the results screen and freezes the UI momentarily when `activeQuestions` has many items (e.g., in a 100-question exam or during heavy concurrent updates).
**Action:** Always extract the IDs into a `Set` (e.g., `new Set(questionResults.map(r => r.questionId))`) before looping to ensure O(1) membership lookups for large arrays in result computation.
