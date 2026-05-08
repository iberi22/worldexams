# Legacy Bundle Migration Tracker

This document tracks bundles with protocol versions < 5.1 or metadata inconsistencies that require audit, refactor, or deletion.

## Current Queue

| Bundle ID | Path | Issue | Decision | Status |
|---|---|---|---|---|
| `CO-PREU-UIS-001` | `questions_data/colombia/preuniversitario/uis/...` | Non-standard protocol (v2.0), missing feedbacks, quarantined. | Update to 5.1 (High Performance Overlay). | `pending` |
| `CO-PREU-UNAL-001` | `questions_data/colombia/preuniversitario/unal/...` | Partial questions, v2.0 protocol. | Partially refactored to 5.1. Need 11+ more questions. | `in_progress` |
| `CO-CIE-11-P1-...-MASTERY` | `questions_data/colombia/LEGACY/...` | Moved to LEGACY directory. Metadata mismatch. | Audit for distractor feedback inclusion. | `pending` |

## Migration Criteria

1. **Keep & Update**: If content is pedagogically valid and fits a new blueprint.
2. **Merge**: If bundles can be combined into a single 20-question Mastery bundle.
3. **Delete**: If content contains flags (word salad, absurd distractors) or cannot reach 5.1 alignment without full regeneration.

## Roadmap

- [ ] Audit remaining pre-university folders (`ucaldas`, `udea`, `unicauca`, etc.).
- [ ] Move any non-5.1 content found in active paths to `LEGACY` or quarantine.
- [ ] Automate refactor using `Reviewer Agent`.
