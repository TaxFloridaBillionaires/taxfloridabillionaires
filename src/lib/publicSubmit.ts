import { supabase } from "@/integrations/supabase/client";

export type PublicSubmitBody =
  | { type: "suggestion"; suggestion: string; email?: string | null }
  | { type: "email_signup"; email: string }
  | { type: "event"; event_name: string; properties?: Record<string, unknown> };

export type PublicSubmitResult = {
  ok: boolean;
  duplicate?: boolean;
  error?: string;
  status?: number;
};

export async function publicSubmit(body: PublicSubmitBody): Promise<PublicSubmitResult> {
  const { data, error } = await supabase.functions.invoke("public-submit", { body });
  if (error) {
    const status = (error as { context?: { status?: number } }).context?.status;
    return { ok: false, error: error.message, status };
  }
  return { ok: true, ...(data as object) };
}

// Fire-and-forget event tracking helper.
export function trackEvent(event_name: string, properties?: Record<string, unknown>) {
  publicSubmit({ type: "event", event_name, properties }).catch(() => {});
}
