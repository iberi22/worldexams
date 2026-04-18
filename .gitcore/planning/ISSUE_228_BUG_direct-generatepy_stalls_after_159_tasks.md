# Issue Local Mirror: #228 - [BUG] direct-generate.py stalls after ~159 tasks

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/228
**Status:** Open
**Labels:** bug, jules
**Synced:** 2026-04-18 14:58

## Descripcion Original (GitHub)

## Context
WorldExams Grade 11 generation (272 tasks) stalled after ~159 completed tasks.

## Process Info
- PID: 21276 (killed)
- Started: 2026-04-15 11:23
- Status: STALLED (process killed)

## Metrics
- Total Tasks: 272
- Completed: 159
- Failed (API timeouts): 33
- Pending: 80
- Last completed: #136 (4h ago)

## Root Cause
Process hangs on API call that never returned. Evidence:
- 50+ TCP sockets in CloseWait to MiniMax API (47.253.x.x:443)
- 1 socket Established but no activity for ~4 hours
- Runner log hasn't been updated since 11:23 AM

## Tasks
1. Investigate why direct-generate.py hangs on API calls
2. Add proper timeout handling for all API calls
3. Add reconnection logic with exponential backoff
4. Add process health monitoring (auto-restart if no progress for X minutes)
5. Test with remaining 80 pending tasks

## Files
- E:\scripts-python\worldexams\src\direct-generate.py


---
*Espejo local generado por scripts/sync-issues.ps1. Re-ejecutar para actualizar.*
