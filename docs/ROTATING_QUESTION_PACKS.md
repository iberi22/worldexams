# 🔄 Weekly Rotating Question Packs

> **Protocol Version:** 1.0
> **Last Updated:** 2025-12-27
> **Status:** Live

## Overview

To allow users to access high-quality, curated practice material even without a constant internet connection, World Exams implements a **Weekly Rotating Pack** system.

Every week (starting Monday), a new "Pack" of questions is released for each grade.
- Users can download this pack.
- The PWA caches it permanently (accumulation).
- Over time, users build a massive offline library of questions.

## Architecture

### 1. Static Pack Generation
We do **not** generate packs on the fly (too expensive/slow).
Instead, we pre-generate packs for the entire year during build time.

- **Script:** `scripts/generate-weekly-packs.js`
- **Output:** `public/api/co/icfes/packs/PACK-{YEAR}-W{WEEK}-grade-{GRADE}.json`
- **Capacity:** Currently ~15-20 questions per pack.

### 2. Time-Based Microservice
A Cloudflare Worker serves the *current* pack ID based on the date.

- **Endpoint:** `/api/packs/current`
- **Logic:** Calculates `ISO Week` of the current date.
- **Response:**
  ```json
  {
    "pack_id": "PACK-2025-W52",
    "generated_at": "...",
    "next_rotation": "2026-01-05T00:00:00.000Z"
  }
  ```

### 3. Client-Side Accumulation
The frontend (`api-service.ts` + `pack-storage.ts`) checks the current ID.
- If `current_pack_id != last_stored_pack_id`:
  - Download the new JSON pack.
  - Add questions to `IndexedDB` / `localStorage`.
- Questions are never deleted, allowing offline accumulation.

## Future Expansion
We aim to increase the pack size to 150 questions/week (10 exams).
See `content_expansion_plan.md` for generation strategy.
