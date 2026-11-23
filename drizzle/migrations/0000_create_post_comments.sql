CREATE TABLE public.post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text NOT NULL CHECK (post_slug ~ '^[a-z0-9-]{1,120}$'),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 40),
  body text NOT NULL CHECK (char_length(btrim(body)) BETWEEN 1 AND 600),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX post_comments_slug_created_idx ON public.post_comments (post_slug, created_at DESC);

GRANT SELECT, INSERT ON public.post_comments TO anon, authenticated;
GRANT ALL ON public.post_comments TO service_role;

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read post comments"
ON public.post_comments FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can add a post comment"
ON public.post_comments FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(btrim(name)) BETWEEN 1 AND 40
  AND char_length(btrim(body)) BETWEEN 1 AND 600
);