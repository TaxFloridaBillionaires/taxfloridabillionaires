
-- Community spending suggestions
CREATE TABLE public.community_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  suggestion TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.community_suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a suggestion (public form)
CREATE POLICY "Anyone can insert suggestions"
ON public.community_suggestions
FOR INSERT
WITH CHECK (true);

-- Only admins would read suggestions (no public SELECT)
CREATE POLICY "No public read access"
ON public.community_suggestions
FOR SELECT
USING (false);

-- Email signups for the fight
CREATE TABLE public.email_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_email UNIQUE (email)
);

ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up
CREATE POLICY "Anyone can insert email signups"
ON public.email_signups
FOR INSERT
WITH CHECK (true);

-- No public read
CREATE POLICY "No public read access"
ON public.email_signups
FOR SELECT
USING (false);
