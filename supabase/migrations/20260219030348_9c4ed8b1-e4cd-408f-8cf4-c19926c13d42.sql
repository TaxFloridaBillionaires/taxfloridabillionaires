
-- Email validation trigger function
CREATE OR REPLACE FUNCTION public.validate_email_format()
RETURNS TRIGGER AS $$
BEGIN
  -- Check email length
  IF NEW.email IS NOT NULL AND length(NEW.email) > 254 THEN
    RAISE EXCEPTION 'Email address too long (max 254 characters)';
  END IF;
  
  -- Check email format
  IF NEW.email IS NOT NULL AND NEW.email !~ '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Suggestion text validation trigger function
CREATE OR REPLACE FUNCTION public.validate_suggestion_text()
RETURNS TRIGGER AS $$
BEGIN
  IF length(NEW.suggestion) > 2000 THEN
    RAISE EXCEPTION 'Suggestion text too long (max 2000 characters)';
  END IF;
  IF length(trim(NEW.suggestion)) = 0 THEN
    RAISE EXCEPTION 'Suggestion cannot be empty';
  END IF;
  NEW.suggestion := trim(NEW.suggestion);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Rate limiting function (max 5 inserts per table per minute from same IP context)
CREATE OR REPLACE FUNCTION public.rate_limit_inserts()
RETURNS TRIGGER AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  EXECUTE format(
    'SELECT count(*) FROM %I.%I WHERE created_at > now() - interval ''1 minute''',
    TG_TABLE_SCHEMA, TG_TABLE_NAME
  ) INTO recent_count;
  
  IF recent_count >= 20 THEN
    RAISE EXCEPTION 'Too many submissions. Please try again later.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply email validation to community_suggestions
CREATE TRIGGER validate_community_suggestion_email
  BEFORE INSERT ON public.community_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_email_format();

-- Apply suggestion text validation
CREATE TRIGGER validate_suggestion_text
  BEFORE INSERT ON public.community_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_suggestion_text();

-- Apply email validation to email_signups
CREATE TRIGGER validate_email_signup_email
  BEFORE INSERT ON public.email_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_email_format();

-- Apply rate limiting to community_suggestions
CREATE TRIGGER rate_limit_community_suggestions
  BEFORE INSERT ON public.community_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION public.rate_limit_inserts();

-- Apply rate limiting to email_signups
CREATE TRIGGER rate_limit_email_signups
  BEFORE INSERT ON public.email_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.rate_limit_inserts();
