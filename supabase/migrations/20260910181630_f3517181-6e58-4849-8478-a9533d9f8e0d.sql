CREATE TABLE public.page_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.page_content TO anon, authenticated;
GRANT ALL ON public.page_content TO service_role;

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public page content is readable"
ON public.page_content
FOR SELECT
TO anon, authenticated
USING (id = 'main');

CREATE POLICY "Page editor can update main content"
ON public.page_content
FOR UPDATE
TO anon, authenticated
USING (id = 'main')
WITH CHECK (id = 'main');

INSERT INTO public.page_content (id, content)
VALUES ('main', '{}'::jsonb);