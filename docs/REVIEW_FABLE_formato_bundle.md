# Audit: feedback repair plan and bundle format

**Limits.** The sandbox blocked `node`, `rg` and `curl`, so I executed nothing: gate and renderer behaviour comes from reading the code, cross-checked with `grep` counts. I did not read the `skills/` templates, the video pipeline, `apps/landing-worldexams`, the root README or Xavier.

## Verdict on the repair plan

**Wrong for most of the debt. Regenerate the English bundles; repair in place only what survives a triage.**

The claim in `docs/PLAN_DEUDA_FEEDBACK.md:9-17` (every flagged option has a usable explanation) is the wrong test. The stems and options are the defect.

- **The author is a Python script, not Jules.** `creador: "Jules-Agent"` is forced by `scripts/validate-bundles-v52.mjs:321`, so it proves nothing. `scripts/gen_ca_caribbean_generator.py:240-281` holds five hard-coded English stems, picks one with `templates[q_num % len(templates)]` (:272) and hard-codes the feedback (:275). The same pattern is at :66, :115, :177, :226, and in `gen_cl_pe_ec_weekly.py:83`, `gen_es_pr_gq_weekly.py:170`, `gen_uy_py_bo_weekly.py:176`, `generate_za_bundles.py:563`.
- **The plan's own example is template filler.** "What does 'benevolent' mean?" (`PLAN:64-76`) is generator line 255. Each SV bundle is five questions cloned four times, identical in all 40 weeks whatever the topic.
- **The largest family is about 20 vocabulary items.** `Incorrect. Try again.` appears 15,240 times in exactly 278 bundles (CO G3 40, CR 39, EC 40, HN 39, PE 40, PR 40, ES 40). `Correct! 'sightseeing' matches the definition.` appears exactly 278 times, as do seven other words; twelve more appear 238 times. I inferred this from counts and did not open one of these files.
- **Some bundles are pure placeholders.** `questions_data/colombia/ingles/grado-6/2026/weekly/CO-ING-6-2026-W39-final-review-1-001-MASTERY-bundle.md:36-45` has the stem "This is a review question about final-review-1." and options "Option C / Option A (Correct) / Option B / Option D". Its feedback pair occurs 400 and 1,200 times corpus-wide, so roughly 400 questions.
- **The "source of truth" is sometimes wrong.** `questions_data/paraguay/lengua/grado-11/2026/weekly/PY-LEN-11-2026-W09-tema-w09-001-MASTERY-bundle.md:97-106`: all four sentences are correctly written, the key is C, and the explanation says "La opcion A".

So "12.440 preguntas ya escritas" is a few dozen distinct questions. Repair in place would write feedback thousands of times for clones that the API collapses anyway (`apps/worldexams-api/src/index.ts:323-368`).

**The gate under-counts, so "0 failures" is not the finish line.** `VAGUE_ONLY` (`validate-bundles-v52.mjs:92-93`) lists Spanish verbs plus "try again" only. By my reading these pass:

| String | Occurrences |
|---|---|
| `Incorrect. Review the concept.` | 2,400 |
| `Incorrect. Please review the topic.` | 1,200 |
| `Incorrecto. Por favor, revisa el procedimiento paso a paso.` | 600 |

The arithmetic agrees: the strings the gate does catch sum to 22,508 of your 22,848. Your fact 5 is therefore false for the string you quoted. In SV English only the `Correct!` option is flagged per question.

**Boilerplate also passes.** PY-LEN W09 :37-40 reads "La opción 'X' no es la adecuada en este contexto ya que no cumple con el criterio solicitado…". There are families repeated exactly 200 times ("Es un distractor conceptual incorrecto para este caso", "Correcto. ¡Excelente análisis!"), and an unfilled `{grammar}` placeholder 240 times. Someone already did a mechanical in-place repair, and it produced junk that passes the gate.

What to do instead:
1. Fix the gate: add English vague verbs and a duplicate-feedback rule (any feedback string shared by three or more distinct questions fails).
2. Add clone and placeholder detectors (same stem in more than one bundle; `Option [A-D]`, `(Correct)`, `{...}`).
3. Quarantine and regenerate what they catch — most of the 486.
4. Repair in place only the remainder (roughly the 93 non-English bundles, which I did not sample).

## Format recommendation

**Move to JSON as the source, but as a separate project after triage, never in the same campaign as content repair.**

**What already depends on a JSON shape.** Only the pack question emitted by `saberparatodos/scripts/generate-static-packs.js:277-291` and :511-521. It is consumed by `index.ts:251-299`, `ranked.ts:285-344`, `saberparatodos/src/lib/question-transformer.ts:306-371` and the studio components. The SV shape (`stem`, `correct`, `id_suffix`) is read by nothing, so do not adopt it. Migration unifies on the pack shape.

**The real argument for JSON.** Three regex parsers of the Markdown exist and disagree:
- `generate-static-packs.js:119-295`
- `scripts/build-full-grade-packs.mjs:143-282` (a copy)
- `validate-bundles-v52.mjs:220-241`

The validator requires `[A-D]\)`; the builder accepts any letter with an optional separator (:253-254). You validate one parse and publish another.

**Schema.** No letters stored:

```json
{ "schema": "worldexams.bundle/1", "id": "…-001-MASTERY-bundle",
  "country": "sv", "grade": 11, "subject": "ingles", "topic": "…", "week": 1,
  "alignment": "…", "provenance": {"generator": "…", "model": "…"},
  "questions": [{ "id": "…-q01", "difficulty_band": "D3-D4", "bloom": "Apply",
    "axis": "…", "expected_success": 0.8, "context": "md", "stem": "md",
    "options": [{"key": "o1", "text": "md", "correct": true, "feedback": "md"}],
    "explanation": "md" }] }
```

- Exactly four options, exactly one `correct: true`, feedback on the option object so it survives any permutation.
- Letters are assigned at pack build, seeded by question id. `rebalance_answer_letter.py` then becomes unnecessary.
- Lint rejects letter references in feedback and explanation.
- `provenance` replaces the fake `creador`.

Letters in the source are already fiction: the main exam path reshuffles and re-letters (`saberparatodos/src/lib/questions/selection.ts:22-57`, :138), and so does ranked (`ranked.ts:330-344`).

**Migration order.**
1. Fix the gate and triage.
2. Build one shared loader that returns the canonical object from `.md` or `.json`; validator and both builders use it.
3. Golden test: every existing `.md` produces a byte-identical pack through the loader.
4. Convert mechanically per country. A bundle id exists in exactly one format, and the gate rejects twins.
5. Switch the hard-coded `.md` filters: `generate-static-packs.js:306`, :321; `validate-bundles-v52.mjs:201`, :285, :448-453; `build-full-grade-packs.mjs:293`; `rebalance_corpus.py:42`.
6. Update `AGENTS.md:318` and the Jules instructions in the same change.

The API and client do not change if the builder keeps emitting `letter`, `is_correct` and `correct_answer`. The dual-format period lives only in the loader.

**What breaks.**
- Review diffs get worse.
- CI changed-file validation and `--changed-only` need the new extension.
- LaTeX in JSON needs double backslashes. `"\times"` parses as TAB + "imes", and `detectControlChars` (`validate-bundles-v52.mjs:42`) excludes tab, LF and CR, so `\t`, `\n` and `\r` corruptions pass silently. Add a lint for this before any model writes JSON.

## Renderer and template defects

**Pack builder and publication**
- **Alias packs are stale copies.** `sv-week-1-grade-11-subject-ciencias.json` has 20 of 20 answers on "A"; the canonical `…ciencias_naturales.json` has 4/6/4/6. The builder writes only the canonical key (`generate-static-packs.js:488`, :535-548). The comment at `index.ts:423` ("identical copies") is false. `/v1/questions` resolves canonical first (:230-236), but aliases are served directly (:588-614) and probed by the client (`saberparatodos/src/lib/pack-fetcher.ts:115-121`). Repaired feedback will not reach them.
- **There is a second pack root**, `saberparatodos/public/api/packs` (`generate-static-packs.js:27-30`). The plan's `--api-only` command (`PLAN:153`) skips it, and the client reads it (`pack-fetcher.ts:100-121`, :224-247). I could not check whether it is populated.
- **`--changed-only` can silently do nothing.** It diffs `origin/main...HEAD` (:316), which is empty after a push or with uncommitted edits. Deleted bundles are never removed (:362-366), contradicting `AGENTS.md:174-181`.
- **`generated_at` is frozen at first creation** (:538-543), so it says nothing about content age.
- **Nothing gates publication.** The builder never calls the validator; `AGENTS.md:173` ("NO se publica") is unenforced.
- **The placeholder skip is a substring test.** `content.includes("Opcion B")` (:376-383; `build-full-grade-packs.mjs:323-329`) drops any valid bundle that says "Opcion B" in prose, while "Option A (Correct)" passes both it and `validate-bundles-v52.mjs:49-52`.
- **Regex parsing errors:**
  - A prose "Nivel 3" beats the header band for difficulty (:169-174).
  - The explanation ends at the first `##` anywhere (:272-274).
  - Feedback is extracted case-insensitively but removed case-sensitively (:262-265).
  - `**EJE:**` is never extracted, only ICFES (:220, :289), so the axis is lost for 19 countries.

**Silent defaults**
- A missing answer key becomes "A" or the first option at four layers: `generate-static-packs.js:256`, `index.ts:291`, `question-transformer.ts:340`, `saberparatodos/src/components/ExamView.svelte:172` and :548.

**What the student sees**
- **Ranked drops three of four feedbacks.** `ranked.ts:335-343` keeps only the correct option's. `saberparatodos/src/components/ranked/RankedExamView.svelte:552-554` prints it as raw text, with no stem and no student choice.
- **MathRenderer eats multiplication asterisks.** The italic regex at `saberparatodos/src/components/MathRenderer.svelte:132` turns the example blessed in `AGENTS.md:163`, `a*t = 6 + 2*5`, into "at = 6 + 25" (static reading).
- **Tables vanish from explanations.** `question-transformer.ts:110` strips every table row.
- **The client fabricates junk feedback.** `saberparatodos/src/components/studio/ExportButton.astro:125` writes 'Opción correcta.' / 'Distractor.'; `saberparatodos/src/lib/ai/exam-generator.ts:96`, :104, :165, :175 do the same.

**Templates and docs**
- The Python generators cannot meet the four-option standard; the strings are literals, and the generator awards itself 100/100 (`gen_ca_caribbean_generator.py:376-383`).
- The `AGENTS.md:107-129` template can meet it for an LLM, but it shows `[D3]` (:108) while :94 demands ranges.
- `AGENTS.md:165-171` documents an 18-character and causal-vocabulary criterion the gate no longer implements (`validate-bundles-v52.mjs:126-160`).
- `AGENTS.md:395-439` is duplicated.
- `checkExplanation` is length-only (`validate-bundles-v52.mjs:63-68`), which is why the CO-ING meta-description passes.

## The El Salvador JSON mystery

**No code path reads the JSON, and none ever did in this repo.** A `git grep` for its field names (`id_suffix`, `week_label`, `country_name`) hits only generator scripts.

What happened:
1. **2026-06-09 20:06**, commit `6feb6a76b4` adds `gen_ca_caribbean_generator.py`. It writes `.md` (:414-424).
2. **20:11**, commit `1e19dbe454` adds the 200 JSON files and no script. The content is that generator's templates, including the "conviierte" typo (generator :141), so an uncommitted variant dumped JSON.
3. **2026-07-28 17:53 -0500**, commit `dc38b57037` ("restore rescued weekly mastery from local cleanup") adds 95 `.md` under `questions_data/el-salvador/` (hyphenated): 15 CIE, 40 ING, 40 SOC. It touches no script. The files are a field-for-field conversion of the JSON; the converter was never committed.
4. The pack's `generated_at` (22:52:17Z) is 54 seconds before that commit. `bundle_id` ends in `-bundle` because it is `path.basename(file, ".md")` (`generate-static-packs.js:505`); the JSON ids have no `-bundle`.

So the path was JSON → untracked converter → `el-salvador/*.md` → the normal builder.

Two of your facts are off:
- **"Zero `.md` twins" is false.** 95 twins live in the sibling folder. SV pack counts (15 ciencias, 40 ingles, 40 sociales) match the Markdown, not the JSON (40 each).
- **Packs hold 20 entries, not 4:** five templates cloned four times.

The "4000 questions" are 483 unique stems; 18 stems appear 160 times each; 3,840 answers are "A".

**What it implies.** The JSON folder is a dead orphan. 105 files (25 CIE, 40 LEN, 40 MAT) have no twin and never shipped; delete them rather than migrate them. This is not prior art for a JSON pipeline. It shows an untracked one-off script could publish filler, and that two folders for one country can coexist unnoticed.

## Risks I have not considered

1. **The unit of debt is what you are most likely wrong about.** It is a few dozen template questions cloned across weeks and countries, plus placeholders, not 22,848 options. Measure distinct stems before choosing repair or regenerate.
2. **A regex gate cannot judge pedagogy.** A weak model optimising against it produces boilerplate that passes, as already happened. The free models are fine for mechanical conversion, not for writing feedback unsupervised. Use the duplicate-string rule plus a judge that sees stem, options and feedback, on a sample every wave.
3. **The rebalance did less than claimed and broke text.** It permutes labels, not positions (`scripts/rebalance_answer_letter.py:129-142`); the Markdown now lists options as D, A, B, C (`questions_data/el-salvador/ciencias-naturales/grado-11/2026/weekly/SV-CIE-11-2026-W01-investigacion-cientifica-001-MASTERY-bundle.md:37-44`). Wherever the client shuffle does not run, `ExamView.svelte:673-686` renders that order with the correct option still first. About 65 bundles (roughly 260 mentions) cite options by letter, and those citations are now wrong, at runtime as well.
4. **Your production check only tests the canonical path** (`PLAN:156-161`). Stale copies survive in:
   - alias packs,
   - the Astro pack root,
   - `/v1/grades/*-full.json`,
   - IndexedDB offline bundles (`pack-fetcher.ts:288`),
   - saved packs (:252),
   - the one-hour cache (`index.ts:513`).
5. **The same agent writes and validates.** The plan has me rewriting and running the gate, and the gate is the weak instrument. The independent check needs to be stronger than the writer.
6. **Unverified.** I did not run the validator or its test, so the gate findings need one confirming run. `lengua` is aliased into `lectura_critica` (`index.ts:78`, `question-transformer.ts:65-66`) while Colombia has both folders; I did not check whether one pack shadows the other.