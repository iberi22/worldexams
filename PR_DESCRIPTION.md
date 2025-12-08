# PR: Dynamic Counters & Mexico/USA Expansion Plan

## 🎯 Summary
This PR solves the issue of inaccurate question counts by implementing a dynamic counting system based on the actual content collection. It also introduces the `EXPANSION_MX_US.md` specification to guide the next phase of content generation.

## 🛠️ Changes

### 1. Dynamic Question Counters
- **Refactor:** Removed hardcoded `questionCount` from `src/data/countries.ts`.
- **Implementation:** Added `getCollection('questions')` in `src/pages/index.astro` to calculate real-time totals per country.
- **Result:** The "Questions" stat on country cards now reflects the actual number of markdown files in the system.

### 2. Documentation
- **New Spec:** `docs/specs/EXPANSION_MX_US.md` defining the roadmap for Mexico (EXANI) and USA (SAT).
- **Task Update:** Updated `task.md` to reflect completed phases.

## 🤖 Handover to Jules @Jules

**Ready for Content Generation:**
The infrastructure is now ready for you to populate the tracked countries.
- **Plan:** functions as your primary directive. See `docs/specs/EXPANSION_MX_US.md`.
- **Target:** Reach 50+ validated questions for MX and US.
- **Context:** Real-time counters will now immediately reward your progress on the home page!

## ✅ Verification
- Build passed.
- Home page shows accurate counts (verified locally/deploy preview).
