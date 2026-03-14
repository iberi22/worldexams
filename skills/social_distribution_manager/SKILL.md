---
name: social-distribution-manager
description: Use when publishing generated short videos with platform-aware policy, manifest updates, and backend-only credentials.
---

# Social Distribution Manager

Use this skill when the task is:
- Publishing rendered videos to social platforms.
- Updating publication status in a manifest.
- Managing retries and platform-specific policies.

## Input contract

- `question_id`
- `video_path`
- `caption_text`
- `hashtags[]`
- `publish_targets[]`

## Output contract

- `distribution_manifest.json` entry:
  - `youtube_id`
  - `instagram_media_id`
  - `tiktok_publish_id`
  - `status_by_platform`
  - `published_at`

## Default policy

- YouTube Shorts: auto publish.
- Instagram Reels: auto publish.
- TikTok: manual queue until full API approval/audit.

## Security rules

- Use backend-only secrets.
- Never expose platform tokens to frontend.
- Rotate tokens and log platform errors with masked credentials.

## Reliability rules

- Idempotency key: `question_id + platform`.
- Retries with exponential backoff.
- Partial success is valid (one platform can fail without blocking others).
