# Colombia Question Bank

This directory is the curated Colombia content bank for `worldexams`.
Its purpose is to keep runtime-ready content, historical material, and protocol migrations separated so the application can evolve without leaking legacy bundles into live exam flows.

## Authority

- Global repo authority lives at the root: `AGENTS.md`, `README.md`, and `.gitcore/ARCHITECTURE.md`.
- The default active generation protocol is still `docs/QUESTION_GENERATION_PROTOCOL_V3.md`, as declared by `docs/specs/ACTIVE_PROTOCOLS.md`.
- This file defines the local organization rules for `questions_data/colombia/`.
- Protocol 5 is the next implementation target for period-based generation, but Grade 11 must be stabilized first.

## Canonical Layout

Each subject owns one top-level folder:

```text
questions_data/colombia/
  matematicas/
  lectura-critica/
  ciencias-naturales/
  sociales/
  sociales-ciudadanas/
  ingles/
  filosofia/
  tecnologia-informatica/
  preuniversitario/
```

Each subject should follow this structure:

```text
[subject]/
  grado-[N]/
    [topic]/                 <- active topic-based content
    periodo-[1-4]/           <- active period-based content
    legacy/                  <- historical or runtime-excluded content
```

## Organization Rules

- Never mix active bundles and legacy bundles in the same runtime-visible path.
- `legacy` must live inside the affected grade directory, not at the subject root.
- Folder names must stay lowercase, ASCII-friendly, and hyphenated.
- File names must preserve the canonical bundle ID.
- If a topic mixes protocols, only the historical bundle moves to `grado-[N]/legacy/[topic]/`.
- If an entire topic is historical, the full topic may be reconstructed under `grado-[N]/legacy/[topic]/`.
- Do not create country forks or duplicate parallel trees for the same academic domain.

## Active Grade 11 Rule

Grade 11 is the current operational priority.

- **Storage Rule**: All Grade 11 questions MUST be stored inside `periodo-[1-4]` folders within their respective subject and grade directories.
- Example: `questions_data/colombia/matematicas/grado-11/periodo-1/`
- Every bundle with protocol `< 3.0` must leave the active tree.
- Those bundles must live under `grado-11/legacy/`.
- The simulator must never read from `legacy/`.
- Grade 11 PREICFES and simulator flows must only show questions with difficulty `> 5` (as per recent policy update).
- Any active bundle that cannot support difficulty `> 5` must stay out of the Grade 11 simulator flow.
- The long-term target for Grade 11 is high-complexity, period-based content aligned with protocol 5.

## Protocol Classification

- `< 3.0`: legacy. Not valid for active Grade 11 simulator selection.
- `3.x`: modern transitional content. Can remain active for study or migration, but not all of it is fit for high-stakes simulator use.
- `4.x`: preferred simulator-ready content when difficulty can be filtered to `> 4`.
- `5.x`: next-generation operational target for period-based generation and rollout.

## Current Distribution

- `grado-3` to `grado-10`: historical and modern content may coexist during migration.
- `grado-11`: must stay clearly separated between active and `legacy`.
- `periodo-[1-4]`: reserved for integrated period bundles.
- `[topic]/`: reserved for curricular topic content, reinforcement, and transitional assets.
- `legacy/`: reserved for historical bundles, deprecated formats, or anything explicitly excluded from runtime.

## Runtime Usage Rules

- Simulator: active content only, never `legacy`, and for Grade 11 only difficulty `> 4`.
- Topic practice: may use active topic-based content.
- Internal migration: may inspect `legacy`, but must not publish it back into runtime unchanged.
- New generation work: must respect naming, metadata, and the separation between topic, period, and legacy responsibilities.

## Current Grade 11 Cleanup Status

- Protocol `< 3` bundles are being consolidated under `grado-11/legacy/` in the affected subjects.
- The first cleanup wave focused on `matematicas`, `lectura-critica`, `sociales-ciudadanas`, and `ciencias-naturales`.
- The next implementation step is to keep the exam-generation path aligned with the Grade 11 PREICFES gate: no old protocols and no questions with difficulty `<= 4`.
- Once Grade 11 is stable, protocol 5 period-based rollout can expand to the remaining grades.

## Immediate Roadmap

1. Finish the Grade 11 structural cleanup.
2. Keep simulator and PREICFES generation away from `legacy/`.
3. Enforce Grade 11 runtime selection at difficulty `> 4`.
4. Standardize period-based templates for protocol 5.
5. Roll the same organization model down to the remaining grades without breaking historical traceability.

## Practical Rule for New Work

Before adding, moving, or generating Colombia content:

1. Validate protocol and difficulty in frontmatter.
2. Decide whether the bundle is active, transitional, or legacy.
3. Place it in `topic/`, `periodo-/`, or `legacy/` according to its actual runtime role.
4. Avoid leaving loose files directly in `grado-[N]/` unless the move is explicitly temporary.
5. If the content is meant for Grade 11 simulator or PREICFES use, require difficulty `> 4`.
