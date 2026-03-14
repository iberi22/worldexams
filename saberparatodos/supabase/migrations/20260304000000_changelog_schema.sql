-- Migration para Changelog (Novedades)
-- 1. Tabla para reacciones a posts
CREATE TABLE public.changelog_reactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_slug TEXT NOT NULL,
    reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'love', 'celebrate')),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- Unique constraint para que un usuario solo tenga 1 reacción de cada tipo por post
    UNIQUE(post_slug, user_id, reaction_type)
);

-- Habilitar RLS
ALTER TABLE public.changelog_reactions ENABLE ROW LEVEL SECURITY;

-- Políticas para reacciones
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.changelog_reactions FOR SELECT
    USING ( true );

CREATE POLICY "Users can insert their own reaction."
    ON public.changelog_reactions FOR INSERT
    WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own reaction."
    ON public.changelog_reactions FOR DELETE
    USING ( auth.uid() = user_id );

-- 2. Tabla para comentarios a posts
CREATE TABLE public.changelog_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_slug TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.changelog_comments ENABLE ROW LEVEL SECURITY;

-- Políticas para comentarios
CREATE POLICY "Comments are viewable by everyone."
    ON public.changelog_comments FOR SELECT
    USING ( true );

CREATE POLICY "Users can insert their own comments."
    ON public.changelog_comments FOR INSERT
    WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update their own comments."
    ON public.changelog_comments FOR UPDATE
    USING ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own comments."
    ON public.changelog_comments FOR DELETE
    USING ( auth.uid() = user_id );

-- Trigger para updated_at en comentarios
CREATE OR REPLACE FUNCTION update_changelog_comment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_changelog_comment_modtime
BEFORE UPDATE ON public.changelog_comments
FOR EACH ROW EXECUTE FUNCTION update_changelog_comment_updated_at();
