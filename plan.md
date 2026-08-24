1. **Analyze `LocalReportsView.svelte` for `.map()` chaining**:
   - Look at lines 303-305: `historyResults.slice(0, 10).reverse().map(...)`
   - Look at lines 307-309: `historyResults.slice(0, 10).reverse().map(...)`
   - In Svelte 5 `$derived`, doing `slice().reverse().map()` is bad because it allocates multiple intermediate arrays.
   - We can combine these into a single O(N) backward `for` loop inside a `$derived.by()` block. We need up to 10 elements.

2. **Refactor `mmrHistory` and `accuracyHistory` in `LocalReportsView.svelte`**:
   - Combine the computation of `mmrHistory` and `accuracyHistory` into one `$derived.by()` block if possible, or rewrite them as a single pass loop.
   - Example implementation:
     ```typescript
     let { mmrHistory, accuracyHistory } = $derived.by(() => {
       if (historyResults.length < 2) return { mmrHistory: [], accuracyHistory: [] };

       const mmr = [];
       const acc = [];
       // Iterate backwards up to 10 items
       let count = 0;
       for (let i = historyResults.length - 1; i >= 0 && count < 10; i--) {
         const r = historyResults[i];
         acc.push(r.score);
         mmr.push(250 + (count * 5) + ((r.correctCount / r.totalQuestions) * 100 - 50) * 0.5);
         count++;
       }
       return { mmrHistory: mmr, accuracyHistory: acc };
     });
     ```
     *Wait, `historyResults` is already sorted by timestamp descending `historyResults = data.sort((a, b) => b.timestamp - a.timestamp);` (line 259).*
     *Ah! `historyResults[0]` is the NEWEST result.*
     *`slice(0, 10)` takes the 10 newest results.*
     *`reverse()` makes them oldest-first (for the chart).*
     *So we want to iterate from `Math.min(historyResults.length, 10) - 1` down to `0`.*

3. **Refactor line 925 in `LocalReportsView.svelte`**:
   - `data={competencyStats.slice(0, 6).map(c => ({...}))}` is inside the template (HTML). Wait, Svelte templates run in the render cycle. We shouldn't use mutable `map()` inline on `$derived` state arrays, especially chaining `.slice().map()`. But Svelte `.slice()` is non-mutating. Still, it allocates.
   - Better yet, move `competencyRadarData` to a `$derived` variable instead of calculating inline.
   ```typescript
   let competencyRadarData = $derived.by(() => {
     const data = [];
     const len = Math.min(competencyStats.length, 6);
     for (let i = 0; i < len; i++) {
       const c = competencyStats[i];
       data.push({
         label: c.name,
         value: (c.correct / c.seen) * 100,
         fullMark: 100
       });
     }
     return data;
   });
   ```

4. **Verify changes and write tests/pre-commit**.
