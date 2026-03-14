-- Migration: Fix function search paths to prevent SQL injection
-- Date: 2026-01-01
-- Author: GitHub Copilot

-- Fix search_path for security (prevent search_path hijacking)

ALTER FUNCTION public.increment_api_usage(uuid) SET search_path = public, pg_catalog;
ALTER FUNCTION public.cleanup_old_submissions() SET search_path = public, pg_catalog;
ALTER FUNCTION public.cleanup_old_rate_limits() SET search_path = public, pg_catalog;
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_catalog;
ALTER FUNCTION public.get_bot_practice_report(text) SET search_path = public, pg_catalog;
ALTER FUNCTION public.spend_credits(uuid, int, text) SET search_path = public, pg_catalog;
ALTER FUNCTION public.cleanup_old_answered_questions() SET search_path = public, pg_catalog;
ALTER FUNCTION public.get_unanswered_question_ids(uuid, int) SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_user_stats() SET search_path = public, pg_catalog;
ALTER FUNCTION public.update_updated_at() SET search_path = public, pg_catalog;
ALTER FUNCTION public.create_sync_event(text, jsonb, text, text[]) SET search_path = public, pg_catalog;
ALTER FUNCTION public.on_question_created() SET search_path = public, pg_catalog;
ALTER FUNCTION public.on_translation_created() SET search_path = public, pg_catalog;
