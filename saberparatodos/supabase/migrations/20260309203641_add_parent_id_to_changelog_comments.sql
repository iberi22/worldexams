-- Add parent_id to changelog_comments for nested forum-style replies
ALTER TABLE public.changelog_comments
ADD COLUMN parent_id UUID REFERENCES public.changelog_comments(id) ON DELETE CASCADE;

-- Index for better performance when fetching nested threads
CREATE INDEX idx_changelog_comments_parent_id ON public.changelog_comments(parent_id);

-- Update RLS if needed (existing policies should cover this as they are auth-based)
-- But we ensure comments are still viewable by everyone
ALTER POLICY "Comments are viewable by everyone." ON public.changelog_comments
USING ( true );
