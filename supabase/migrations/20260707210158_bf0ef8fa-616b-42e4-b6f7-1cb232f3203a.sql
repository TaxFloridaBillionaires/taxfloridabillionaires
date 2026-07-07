
-- Remove global SECURITY DEFINER rate limit function (fixes security_definer_rate)
DROP TRIGGER IF EXISTS rate_limit_community_suggestions ON public.community_suggestions;
DROP TRIGGER IF EXISTS rate_limit_email_signups ON public.email_signups;
DROP FUNCTION IF EXISTS public.rate_limit_inserts();

-- Remove permissive WITH CHECK (true) INSERT policies (fixes SUPA_rls_policy_always_true)
-- All public writes now go through the public-submit edge function using the service role.
DROP POLICY IF EXISTS "Anyone can insert suggestions" ON public.community_suggestions;
DROP POLICY IF EXISTS "Anyone can insert email signups" ON public.email_signups;
DROP POLICY IF EXISTS "Anyone can insert events" ON public.events;

-- Revoke anon/authenticated write privileges; service role (used by the edge function) still has ALL.
REVOKE INSERT, UPDATE, DELETE ON public.community_suggestions FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.email_signups FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.events FROM anon, authenticated;
GRANT ALL ON public.community_suggestions TO service_role;
GRANT ALL ON public.email_signups TO service_role;
GRANT ALL ON public.events TO service_role;

-- Per-IP rate limit tracking table used by the public-submit edge function
-- (enables per-IP limiting instead of global — addresses rate_limit_bypass).
CREATE TABLE IF NOT EXISTS public.rate_limit_hits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text NOT NULL,
  action text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rate_limit_hits_lookup_idx
  ON public.rate_limit_hits (ip, action, created_at DESC);

GRANT ALL ON public.rate_limit_hits TO service_role;
ALTER TABLE public.rate_limit_hits ENABLE ROW LEVEL SECURITY;
-- No public policies: only service_role (which bypasses RLS) can read/write.
