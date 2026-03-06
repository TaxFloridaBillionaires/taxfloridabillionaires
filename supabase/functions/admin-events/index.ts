import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_PASSWORD = "dreamdefenders2026";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const [eventsRes, emailsRes, suggestionsRes] = await Promise.all([
      supabase.from("events").select("event_name, created_at, properties").order("created_at", { ascending: true }),
      supabase.from("email_signups").select("email, created_at").order("created_at", { ascending: false }),
      supabase.from("community_suggestions").select("suggestion, email, created_at").order("created_at", { ascending: false }),
    ]);

    if (eventsRes.error) throw eventsRes.error;

    return new Response(JSON.stringify({
      events: eventsRes.data,
      emails: emailsRes.data || [],
      suggestions: suggestionsRes.data || [],
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
