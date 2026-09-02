# GitCore Issues Dependency Tree — WorldExams NeuroGym Wave 1

> Canonical specification for parallel autonomous agent execution.
> Protocol: GitCore 3.8.0 / SWAL Monorepo.
> Location: `.gitcore/issues/neurogym-wave1/`

---

## 🌳 Dependency Graph (Max Depth: 2)

```mermaid
graph TD
    classDef root fill:#003893,stroke:#fff,stroke-width:2px,color:#fff;
    classDef leaf fill:#002b11,stroke:#10b981,stroke-width:1.5px,color:#fff;
    classDef finish fill:#3b0764,stroke:#a855f7,stroke-width:1.5px,color:#fff;

    Root["NeuroGym Phase 1 & 2 Core (scoring + vault)"]:::root

    %% Level 1: Disjoint Parallel Implementation (Wave 1)
    Root --> I01["[Ola 1.01] feat-neurogym-corsi-3d\n(CorsiBlockBoard.svelte)"]:::leaf
    Root --> I02["[Ola 1.02] feat-neurogym-dual-nback\n(DualNBackStimulus.svelte)"]:::leaf
    Root --> I03["[Ola 1.03] feat-neurogym-storage\n(neuro-storage.ts)"]:::leaf
    Root --> I04["[Ola 1.04] feat-neurogym-workshops\n(NeuroWorkshopGenerator.svelte)"]:::leaf
    Root --> I05["[Ola 1.05] feat-neurogym-training-hub\n(NeuroDailyWorkoutHub.svelte)"]:::leaf
    Root --> I06["[Ola 1.06] feat-neurogym-radar-chart\n(CognitiveRadarChart.svelte)"]:::leaf
    Root --> I07["[Ola 1.07] feat-neurogym-card-sorting\n(CardSortingStimulus.svelte)"]:::leaf
    Root --> I08["[Ola 1.08] feat-neurogym-trail-making\n(TrailMakingBoard.svelte)"]:::leaf
    Root --> I09["[Ola 1.09] feat-neurogym-institution-agreement\n(NeuroInstitutionalShareModal.svelte)"]:::leaf

    %% Level 2: End-to-End Matrix (Requires L1 Components)
    I01 & I02 & I03 & I04 & I05 & I06 & I07 & I08 & I09 --> I10["[Ola 1.10] test-neurogym-exhaustive-e2e\n(neurogym-full-battery.spec.ts)"]:::finish
```

---

## 📋 File Islands Matrix (100% Disjoint)

| Issue ID | File Path | File Action | Parallel Execution Slot |
|---|---|---|---|
| `issue-01-corsi-3d.md` | `saberparatodos/src/components/neurogym/stimuli/CorsiBlockBoard.svelte` | `NEW` | Worker 1 |
| `issue-02-dual-nback.md` | `saberparatodos/src/components/neurogym/stimuli/DualNBackStimulus.svelte` | `NEW` | Worker 2 |
| `issue-03-indexeddb-vault.md` | `saberparatodos/src/lib/neurogym/neuro-storage.ts` | `NEW` | Worker 3 |
| `issue-04-workshop-generator.md` | `saberparatodos/src/components/neurogym/NeuroWorkshopGenerator.svelte` | `NEW` | Worker 4 |
| `issue-05-daily-training-hub.md` | `saberparatodos/src/components/neurogym/NeuroDailyWorkoutHub.svelte` | `NEW` | Worker 5 |
| `issue-06-radar-chart.md` | `saberparatodos/src/components/neurogym/CognitiveRadarChart.svelte` | `NEW` | Worker 6 |
| `issue-07-wisconsin-sorting.md` | `saberparatodos/src/components/neurogym/stimuli/CardSortingStimulus.svelte` | `NEW` | Worker 7 |
| `issue-08-trail-making.md` | `saberparatodos/src/components/neurogym/stimuli/TrailMakingBoard.svelte` | `NEW` | Worker 8 |
| `issue-09-institutional-export.md`| `saberparatodos/src/components/neurogym/NeuroInstitutionalShareModal.svelte`| `NEW` | Worker 9 |
| `issue-10-e2e-matrix.md` | `saberparatodos/tests/e2e/neurogym-full-battery.spec.ts` | `NEW` | Worker 10 (Post-merge L1) |
