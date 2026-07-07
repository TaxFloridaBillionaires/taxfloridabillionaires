import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const SuggestionSchema = z.object({
  type: z.literal("suggestion"),
  suggestion: z.string().trim().min(1).max(2000),
  email: z.string().trim().email().max(254).nullish(),
});

const EmailSignupSchema = z.object({
  type: z.literal("email_signup"),
  email: z.string().trim().email().max(254),
});

const EventSchema = z.object({
  type: z.literal("event"),
  event_name: z.string().trim().min(1).max(100),
  properties: z.record(z.unknown()).optional(),
});

const BodySchema = z.discriminatedUnion("type", [
  SuggestionSchema,
  EmailSignupSchema,
  EventSchema,
]);

const RATE_LIMITS: Record<string, { windowSec: number; max: number }> = {
  suggestion: { windowSec: 60, max: 5 },
  email_signup: { windowSec: 60, max: 5 },
  event: { windowSec: 60, max: 60 },
};

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") ?? "";
  const first = xff.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip") || "unknown";
}

async function isRateLimited(ip: string, action: string): Promise<boolean> {
  const cfg = RATE_LIMITS[action];
  const since = new Date(Date.now() - cfg.windowSec * 1000).toISOString();
  const { count, error } = await admin
    .from("rate_limit_hits")
    .select("*", { count: "exact", head: true })
    .eq("ip", ip)
    .eq("action", action)
    .gte("created_at", since);
  if (error) {
    console.error("rate limit query failed", error.message);
    return false;
  }
  return (count ?? 0) >= cfg.max;
}

async function recordHit(ip: string, action: string) {
  await admin.from("rate_limit_hits").insert({ ip, action });
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return json({ error: "invalid input" }, 400);
  }
  const data = parsed.data;
  const ip = getIp(req);

  if (await isRateLimited(ip, data.type)) {
    return json({ error: "Too many requests. Please wait a moment." }, 429);
  }
  await recordHit(ip, data.type);

  try {
    if (data.type === "suggestion") {
      const { error } = await admin.from("community_suggestions").insert({
        suggestion: data.suggestion,
        email: data.email ?? null,
      });
      if (error) throw error;
      return json({ ok: true });
    }
    if (data.type === "email_signup") {
      const { error } = await admin.from("email_signups").insert({ email: data.email });
      if (error) {
        if ((error as { code?: string }).code === "23505") {
          return json({ ok: true, duplicate: true });
        }
        throw error;
      }
      return json({ ok: true });
    }
    if (data.type === "event") {
      const { error } = await admin.from("events").insert({
        event_name: data.event_name,
        properties: data.properties ?? null,
      });
      if (error) throw error;
      return json({ ok: true });
    }
    return json({ error: "unsupported" }, 400);
  } catch (err) {
    console.error("submit failed", (err as Error).message);
    return json({ error: "submission failed" }, 500);
  }
});
