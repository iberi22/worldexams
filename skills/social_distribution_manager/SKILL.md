---
name: social-distribution-manager
description: Use when publishing generated short videos with platform-aware policy, manifest updates, and backend-only credentials.
version: "1.0"
triggers:
  - "publish video to social platforms"
  - "distribute short video to YouTube Instagram TikTok"
  - "update distribution manifest after publishing"
  - "queue video for TikTok manual approval"
  - "sync video publication status to manifest"
example_usage: |
  ```
  Input: question_id, video_path, caption_text, hashtags[], publish_targets[]
  Output: distribution_manifest.json entry with youtube_id, instagram_media_id,
          tiktok_publish_id, status_by_platform, published_at
  Policy: YouTube Shorts auto, Instagram Reels auto, TikTok manual queue
  ```
---

# Social Distribution Manager

**Skill:** `social_distribution_manager`
**Version:** 1.0
**Pipeline role:** Publishes rendered short videos to social platforms and updates the distribution manifest
**Monorepo path:** `skills/social_distribution_manager/`
**Credential storage:** Backend-only; platform tokens must never reach frontend or logs

---

## Overview

This skill handles the publication of `video_vertical.mp4` shorts (produced by `math_short_remotion_architect`) to social platforms. It applies platform-specific policies, manages idempotent retries, and writes a `distribution_manifest.json` entry for each publish operation.

The skill does **not** own the rendering pipeline — it only acts on pre-rendered video assets that have passed validation.

Publication is **partial-success capable**: one platform can fail without blocking others. Each platform's result is recorded independently in `status_by_platform`.

---

## Trigger Conditions

Invoke this skill when:

1. A `video_vertical.mp4` + `captions.srt` pair is ready in the bundle output directory
2. The `render_manifest.json` confirms a successful render
3. A bundle's `social_status` in the manifest is `pending` or `partial`
4. A retry is needed after a transient platform failure

**Do NOT invoke this skill when:**
- The video is not rendered yet (validate `render_manifest.json` first)
- The bundle is flagged `do_not_distribute` in its metadata
- The platform target is not in the supported list (YouTube Shorts, Instagram Reels, TikTok)
- Platform API credentials are not available in the backend secrets store

---

## Input Contract

```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "video_path": "output/bundles/CO-MAT-11-quadratic-eq-001/video_vertical.mp4",
  "caption_text": "Resuelve conmigo esta ecuación cuadrática 🎯 #matemáticas #icfes",
  "hashtags": ["matemáticas", "icfes", "preuniversitario", "worldexams"],
  "publish_targets": ["youtube_shorts", "instagram_reels", "tiktok"]
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---|---|
| `question_id` | string | ✅ | Unique bundle ID — also used as idempotency key base |
| `video_path` | string | ✅ | Absolute or repo-relative path to the rendered MP4 |
| `caption_text` | string | ✅ | Primary caption (without hashtags — those go in `hashtags`) |
| `hashtags[]` | string[] | ✅ | Hashtags to append to caption |
| `publish_targets[]` | string[] | ✅ | One or more of: `youtube_shorts`, `instagram_reels`, `tiktok` |

---

## Output Contract

A `distribution_manifest.json` entry is written/updated in the bundle directory:

```json
{
  "question_id": "CO-MAT-11-quadratic-eq-001",
  "distribution_id": "dist-20260426-174500-co-mat-11-quadratic-eq-001",
  "published_at": "2026-04-26T17:45:00Z",
  "idempotency_key_base": "CO-MAT-11-quadratic-eq-001",
  "status_by_platform": {
    "youtube_shorts": {
      "status": "published",
      "youtube_id": "xyz_abc123",
      "published_at": "2026-04-26T17:45:12Z",
      "url": "https://youtube.com/shorts/xyz_abc123",
      "retries": 0
    },
    "instagram_reels": {
      "status": "published",
      "instagram_media_id": "17841400012345678",
      "published_at": "2026-04-26T17:45:30Z",
      "url": "https://instagram.com/reel/CLzXqABcdef/",
      "retries": 0
    },
    "tiktok": {
      "status": "manual_queue",
      "tiktok_publish_id": null,
      "queue_position": 42,
      "queued_at": "2026-04-26T17:45:35Z",
      "requires": "full_api_approval_pending",
      "retries": 0
    }
  },
  "overall_status": "partial_success",
  "video_asset": "output/bundles/CO-MAT-11-quadratic-eq-001/video_vertical.mp4",
  "caption_with_hashtags": "Resuelve conmigo esta ecuación cuadrática 🎯 #matemáticas #icfes #preuniversitario #worldexams"
}
```

### Overall Status Values

| Value | Meaning |
|---|---|
| `published` | All platforms succeeded |
| `partial_success` | One or more succeeded, one or more failed/queued |
| `failed` | All platforms failed |
| `skipped` | No publish targets requested |

---

## Platform Policies

### YouTube Shorts — `youtube_shorts`
- **Policy:** Auto publish (no manual gate)
- **API:** YouTube Data API v3 — `videos.insert`
- **Visibility:** Public (or unlisted, configurable per campaign)
- **Caption:** Upload `captions.srt` as a caption track
- **Thumbnail:** Auto-generated by YouTube (no custom thumbnail)
- **Retry:** Exponential backoff, max 3 retries

### Instagram Reels — `instagram_reels`
- **Policy:** Auto publish (no manual gate)
- **API:** Instagram Graph API — ` MEDIA_CONTAINER_CREATE` → `MEDIA_PUBLISH`
- **Visibility:** Public
- **Caption:** Full `caption_text + hashtags` string
- **Retry:** Exponential backoff, max 3 retries

### TikTok — `tiktok`
- **Policy:** Manual queue until full API approval / audit
- **API:** TikTok API v2 — Content Posting API
- **Status:** Records to queue; `tiktok_publish_id` is null until manual publish
- **Queue:** Maintained in `distribution_manifest.json` and optionally in Supabase
- **No auto-retry:** TikTok manual queue is reviewed by a human operator
- **Retry (pre-queue only):** Max 2 retries before sending to manual queue

---

## Security Rules

These rules are **mandatory** and must not be bypassed:

1. **Platform tokens are backend-only.** Never log tokens or include them in responses that reach frontend.
2. **Use backend-only secrets.** All platform credentials come from the secrets store, never from request headers or environment that could leak to client.
3. **Mask credentials in error logs.** If a platform API call fails, log the error with all credentials masked (e.g., `token: "tok***3f1a"`).
4. **Rotate tokens proactively.** If a token rotation is detected or flagged, log the event and alert the on-call team.
5. **Never expose `distribution_manifest.json` to unauthenticated clients.** The manifest contains platform IDs that could be used for enumeration.

---

## Reliability Rules

### Idempotency
- **Idempotency key:** `question_id + platform` (e.g., `CO-MAT-11-quadratic-eq-001-youtube_shorts`)
- Use the idempotency key in all platform API calls to prevent duplicate posts
- If a platform returns "already published" for the idempotency key, treat it as success and record the existing ID

### Retries with Exponential Backoff
```
Attempt 1: immediate
Attempt 2: wait 2 seconds
Attempt 3: wait 4 seconds
Attempt 4: wait 8 seconds (YouTube/Instagram only — TikTok maxes at 2 retries)
```

### Partial Success
- If `youtube_shorts` fails but `instagram_reels` succeeds, mark overall status as `partial_success`
- Do not block other platforms if one fails
- Each platform's failure is recorded with `error_code` and `error_message` (masked)

---

## Failure Handling

| Failure mode | Action |
|---|---|
| Video file not found | Set `status: "failed"`, `error: "video_not_found"`. Do not attempt publish. |
| Platform API returns 401/403 | Set `status: "auth_failed"`. Alert immediately. Do not retry — credential rotation needed. |
| Platform API rate limited (429) | Back off for `Retry-After` seconds if present, otherwise 60s. Max 3 retries. |
| Network timeout | Retry immediately once, then exponential backoff. |
| Idempotency conflict (already published) | Record existing platform ID as success. |
| TikTok not yet approved | Set `status: "manual_queue"`. Record in queue. Do not retry automatically. |

---

## Memory Synchronization

After each publish operation (full or partial):

1. Write/update `distribution_manifest.json` in the bundle directory
2. Update Cortex at `path: social/publish/{question_id}`:
   - content: summary (overall_status, published platforms, failed platforms, timestamp)
3. If all platforms failed: write to `errors/social/{question_id}` in Cortex with `status: "all_platforms_failed"`

---

## Dependencies

- **Upstream:** `math_short_remotion_architect` must have produced `video_vertical.mp4`
- **Upstream:** `local_voice_and_timing_orchestrator` must have produced `captions.srt`
- **Credentials:** Platform tokens registered in the secrets store under `secrets/{platform}_access_token`
- **Manifest:** `render_manifest.json` must be present and valid

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-04-26 | Initial version — YouTube Shorts, Instagram Reels, TikTok manual queue; idempotency keys; exponential backoff; partial success; backend-only secrets |
