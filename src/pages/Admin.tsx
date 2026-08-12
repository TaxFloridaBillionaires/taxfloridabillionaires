import { useState, useMemo } from "react";
import { Head } from "@/components/Head";
import { supabase } from "@/integrations/supabase/client";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Password is stored server-side only as a Supabase secret

interface EventRow {
  event_name: string;
  created_at: string;
  properties: Record<string, unknown> | null;
}

interface EmailRow {
  email: string;
  created_at: string;
}

interface SuggestionRow {
  suggestion: string;
  email: string | null;
  created_at: string;
}

const EVENT_LABELS: Record<string, { label: string; color: string }> = {
  scroll_billionaire_cards: { label: "Saw Billionaires", color: "hsl(220, 10%, 55%)" },
  scroll_tax_slider: { label: "Saw Tax Slider", color: "hsl(220, 10%, 55%)" },
  scroll_spending_game: { label: "Saw Spending Game", color: "hsl(220, 10%, 55%)" },
  spend_button_clicked: { label: "Clicked SPEND", color: "hsl(45, 100%, 51%)" },
  save_image_clicked: { label: "Saved Image", color: "hsl(160, 60%, 45%)" },
  tell_a_friend_clicked: { label: "Told a Friend", color: "hsl(0, 72%, 51%)" },
  email_signup: { label: "Email Signups", color: "hsl(200, 80%, 55%)" },
  community_suggestion: { label: "Suggestions", color: "hsl(280, 60%, 55%)" },
  voter_panel_open: { label: "Voter Panel Views", color: "hsl(190, 70%, 50%)" },
  voter_panel_candidate_click: { label: "Panel Candidate Clicks", color: "hsl(45, 100%, 51%)" },
  voter_panel_register_click: { label: "Register to Vote", color: "hsl(160, 60%, 45%)" },
  voter_panel_see_all_endorsements: { label: "See All Endorsements", color: "hsl(280, 60%, 55%)" },
  endorsements_page_view: { label: "Endorsements Views", color: "hsl(190, 70%, 50%)" },
  endorsements_map_select: { label: "Map Selections", color: "hsl(220, 10%, 55%)" },
  endorsements_candidate_click: { label: "Candidate Clicks", color: "hsl(45, 100%, 51%)" },
  endorsements_donate_click: { label: "Donate Clicks", color: "hsl(0, 72%, 51%)" },
  endorsements_social_click: { label: "Social Clicks", color: "hsl(200, 80%, 55%)" },
};

const CANDIDATE_EVENTS = [
  "voter_panel_open",
  "voter_panel_candidate_click",
  "voter_panel_register_click",
  "voter_panel_see_all_endorsements",
  "endorsements_page_view",
  "endorsements_map_select",
  "endorsements_candidate_click",
  "endorsements_donate_click",
  "endorsements_social_click",
];


const TIME_RANGES = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "All", days: 0 },
];

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [rangeDays, setRangeDays] = useState(7);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Don't auto-fetch; login handler calls fetchData directly

  const fetchData = async (pw?: string) => {
    const authPassword = pw || password;
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-events", {
      body: { password: authPassword },
    });
    if (!error && data) {
      setEvents(data.events || []);
      setEmails(data.emails || []);
      setSuggestions(data.suggestions || []);
    }
    setLoading(false);
  };

  const cutoff = useMemo(() => {
    if (rangeDays === 0) return null;
    const d = new Date();
    d.setDate(d.getDate() - rangeDays);
    return d;
  }, [rangeDays]);

  const filterByDate = <T extends { created_at: string }>(items: T[]) => {
    if (!cutoff) return items;
    return items.filter((e) => new Date(e.created_at) >= cutoff);
  };

  const filteredEvents = useMemo(() => filterByDate(events), [events, cutoff]);
  const filteredEmails = useMemo(() => filterByDate(emails), [emails, cutoff]);
  const filteredSuggestions = useMemo(() => filterByDate(suggestions), [suggestions, cutoff]);

  // Merge all into unified event list for charting
  const allUnified = useMemo(() => {
    const unified: EventRow[] = [
      ...filteredEvents,
      ...filteredEmails.map((e) => ({ event_name: "email_signup", created_at: e.created_at, properties: null })),
      ...filteredSuggestions.map((s) => ({ event_name: "community_suggestion", created_at: s.created_at, properties: null })),
    ];
    return unified;
  }, [filteredEvents, filteredEmails, filteredSuggestions]);

  // Aggregate counts per event
  const totals = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of allUnified) {
      counts[e.event_name] = (counts[e.event_name] || 0) + 1;
    }
    return counts;
  }, [allUnified]);

  // Time series for chart
  const chartData = useMemo(() => {
    const metric = selectedMetric;
    const relevant = metric
      ? allUnified.filter((e) => e.event_name === metric)
      : allUnified;

    const byDate: Record<string, number> = {};
    for (const e of relevant) {
      const day = new Date(e.created_at).toISOString().slice(0, 10);
      byDate[day] = (byDate[day] || 0) + 1;
    }

    return Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count,
      }));
  }, [allUnified, selectedMetric]);

  // Funnel data
  const funnel = useMemo(() => {
    const order = [
      "scroll_billionaire_cards",
      "scroll_tax_slider",
      "scroll_spending_game",
      "spend_button_clicked",
      "save_image_clicked",
      "tell_a_friend_clicked",
      "email_signup",
      "community_suggestion",
    ];
    return order.map((name) => ({
      name,
      label: EVENT_LABELS[name]?.label || name,
      count: totals[name] || 0,
      color: EVENT_LABELS[name]?.color || "hsl(220, 10%, 55%)",
    }));
  }, [totals]);

  // Top tax rates chosen
  const taxRateBreakdown = useMemo(() => {
    const rates: Record<string, number> = {};
    for (const e of filteredEvents) {
      if (e.event_name === "spend_button_clicked" && e.properties) {
        const rate = String((e.properties as Record<string, unknown>).tax_rate ?? "unknown");
        rates[rate] = (rates[rate] || 0) + 1;
      }
    }
    return Object.entries(rates)
      .sort(([, a], [, b]) => b - a)
      .map(([rate, count]) => ({ rate: `${rate}%`, count }));
  }, [filteredEvents]);

  // Candidate panel + endorsements page metrics
  const candidateMetrics = useMemo(
    () =>
      CANDIDATE_EVENTS.map((name) => ({
        name,
        label: EVENT_LABELS[name]?.label || name,
        count: totals[name] || 0,
        color: EVENT_LABELS[name]?.color || "hsl(220, 10%, 55%)",
      })),
    [totals]
  );

  // Per-candidate engagement (clicks, donates, socials, map selects)
  const candidateBreakdown = useMemo(() => {
    const rows: Record<
      string,
      { name: string; clicks: number; donates: number; socials: number; selects: number }
    > = {};
    const bump = (raw: unknown, key: "clicks" | "donates" | "socials" | "selects") => {
      const name = typeof raw === "string" && raw ? raw : null;
      if (!name) return;
      rows[name] = rows[name] || { name, clicks: 0, donates: 0, socials: 0, selects: 0 };
      rows[name][key] += 1;
    };
    for (const e of filteredEvents) {
      const p = (e.properties || {}) as Record<string, unknown>;
      if (e.event_name === "endorsements_candidate_click" || e.event_name === "voter_panel_candidate_click")
        bump(p.name, "clicks");
      else if (e.event_name === "endorsements_donate_click") bump(p.name, "donates");
      else if (e.event_name === "endorsements_social_click") bump(p.name, "socials");
      else if (e.event_name === "endorsements_map_select") bump(p.name, "selects");
    }
    return Object.values(rows).sort(
      (a, b) =>
        b.clicks + b.donates + b.socials + b.selects - (a.clicks + a.donates + a.socials + a.selects)
    );
  }, [filteredEvents]);

  // Outbound destinations
  const destinationBreakdown = useMemo(() => {
    const dest: Record<string, number> = {};
    for (const e of filteredEvents) {
      if (!e.event_name.startsWith("endorsements_")) continue;
      const d = (e.properties as Record<string, unknown> | null)?.destination;
      if (typeof d === "string" && d) dest[d] = (dest[d] || 0) + 1;
    }
    return Object.entries(dest)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 12)
      .map(([destination, count]) => ({ destination, count }));
  }, [filteredEvents]);



  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-sm p-8 w-full max-w-sm">
          <h1 className="font-display text-3xl text-foreground mb-6 text-center">ADMIN</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setAuthError(false);
              const { data, error } = await supabase.functions.invoke("admin-events", {
                body: { password },
              });
              if (error || !data?.events) {
                setAuthError(true);
                return;
              }
              setEvents(data.events || []);
              setEmails(data.emails || []);
              setSuggestions(data.suggestions || []);
              setAuthed(true);
            }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold mb-4"
              autoFocus
            />
            {authError && (
              <p className="text-crimson text-sm mb-3">Incorrect password</p>
            )}
            <button
              type="submit"
              className="w-full gradient-gold text-background font-bold py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 md:p-8">
      <Head
        title="Admin Dashboard — Tax Florida Billionaires"
        description="Private analytics dashboard for the Tax Florida Billionaires project. Authorized access only."
        robots="noindex, nofollow"
        canonical="https://taxfloridabillionaires.com/admin"
        ogTitle="Admin Analytics — Tax Florida Billionaires"
        ogDescription="Private analytics dashboard tracking simulator usage, spending choices, endorsement engagement and outbound candidate clicks. Authorized access only."
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl">
            EVENT <span className="text-gold">ANALYTICS</span>
          </h1>
          <div className="flex gap-0.5 bg-muted rounded-sm p-0.5 shrink-0">
            {TIME_RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setRangeDays(r.days)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm rounded-sm font-medium transition-colors ${
                  rangeDays === r.days
                    ? "bg-gold text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-20">Loading events…</p>
        ) : (
          <>
            {/* Metric cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 mb-6">
              {funnel.map((f) => (
                <button
                  key={f.name}
                  onClick={() =>
                    setSelectedMetric(selectedMetric === f.name ? null : f.name)
                  }
                  className={`bg-card border rounded-sm p-3 text-left transition-colors ${
                    selectedMetric === f.name
                      ? "border-gold"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-1 leading-tight">
                    {f.label}
                  </p>
                  <p
                    className="text-xl sm:text-2xl md:text-3xl font-bold font-mono"
                    style={{ color: f.color }}
                  >
                    {f.count}
                  </p>
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6 mb-6">
              <p className="text-muted-foreground text-sm mb-4">
                {selectedMetric
                  ? EVENT_LABELS[selectedMetric]?.label || selectedMetric
                  : "All Events"}{" "}
                over time
              </p>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }}
                      axisLine={{ stroke: "hsl(220, 15%, 20%)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 11%)",
                        border: "1px solid hsl(220, 15%, 20%)",
                        borderRadius: 4,
                        color: "hsl(45, 100%, 96%)",
                        fontSize: 13,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(45, 100%, 51%)"
                      strokeWidth={2}
                      fill="url(#colorCount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-12">No data for this period</p>
              )}
            </div>

            {/* Funnel + Tax rate breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Funnel */}
              <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                  Conversion Funnel
                </h3>
                <div className="space-y-3">
                  {funnel.map((f) => {
                    const maxCount = Math.max(...funnel.map((x) => x.count), 1);
                    const pct = (f.count / maxCount) * 100;
                    return (
                      <div key={f.name}>
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                          <span className="text-foreground">{f.label}</span>
                          <span className="font-mono text-muted-foreground">{f.count}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm transition-all"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: f.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tax rate breakdown */}
              <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                  Tax Rate Choices
                </h3>
                {taxRateBreakdown.length > 0 ? (
                  <div className="space-y-2">
                    {taxRateBreakdown.map(({ rate, count }) => (
                      <div key={rate} className="flex justify-between items-center">
                        <span className="text-foreground font-mono text-sm">{rate}</span>
                        <span className="font-mono text-gold text-sm">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No spend events yet</p>
                )}
              </div>
            </div>

            {/* Recent submissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              {/* Recent emails */}
              <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                  Recent Email Signups ({filteredEmails.length})
                </h3>
                {filteredEmails.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredEmails.slice(0, 20).map((e, i) => (
                      <div key={i} className="flex justify-between items-center text-sm gap-2">
                        <span className="text-foreground truncate">{e.email}</span>
                        <span className="text-muted-foreground text-xs shrink-0">
                          {new Date(e.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No signups yet</p>
                )}
              </div>

              {/* Recent suggestions */}
              <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                  Community Suggestions ({filteredSuggestions.length})
                </h3>
                {filteredSuggestions.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {filteredSuggestions.slice(0, 20).map((s, i) => (
                      <div key={i} className="border-b border-border pb-2 last:border-0">
                        <p className="text-foreground text-sm">{s.suggestion}</p>
                        <div className="flex justify-between items-center mt-1 gap-2">
                          <span className="text-muted-foreground text-xs truncate">
                            {s.email || "anonymous"}
                          </span>
                          <span className="text-muted-foreground text-xs shrink-0">
                            {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No suggestions yet</p>
                )}
              </div>
            </div>

            {/* Candidates & endorsements */}
            <div className="mt-8">
              <h2 className="font-display text-2xl sm:text-3xl mb-4">
                CANDIDATES <span className="text-gold">&amp; ENDORSEMENTS</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-6">
                {candidateMetrics.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMetric(selectedMetric === m.name ? null : m.name)}
                    className={`bg-card border rounded-sm p-3 text-left transition-colors ${
                      selectedMetric === m.name
                        ? "border-gold"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-1 leading-tight">
                      {m.label}
                    </p>
                    <p
                      className="text-xl sm:text-2xl font-bold font-mono"
                      style={{ color: m.color }}
                    >
                      {m.count}
                    </p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Per-candidate engagement */}
                <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6">
                  <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                    Engagement by Candidate
                  </h3>
                  {candidateBreakdown.length > 0 ? (
                    <div className="overflow-x-auto max-h-72 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-muted-foreground text-[10px] uppercase tracking-wider">
                            <th className="text-left font-medium pb-2">Candidate</th>
                            <th className="text-right font-medium pb-2">Clicks</th>
                            <th className="text-right font-medium pb-2">Donate</th>
                            <th className="text-right font-medium pb-2">Social</th>
                            <th className="text-right font-medium pb-2">Map</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidateBreakdown.map((r) => (
                            <tr key={r.name} className="border-t border-border">
                              <td className="py-1.5 pr-2 text-foreground">{r.name}</td>
                              <td className="py-1.5 text-right font-mono text-gold">{r.clicks}</td>
                              <td className="py-1.5 text-right font-mono text-crimson">{r.donates}</td>
                              <td className="py-1.5 text-right font-mono text-muted-foreground">{r.socials}</td>
                              <td className="py-1.5 text-right font-mono text-muted-foreground">{r.selects}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No candidate engagement yet</p>
                  )}
                </div>

                {/* Outbound destinations */}
                <div className="bg-card border border-border rounded-sm p-3 sm:p-4 md:p-6">
                  <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                    Top Outbound Destinations
                  </h3>
                  {destinationBreakdown.length > 0 ? (
                    <div className="space-y-2 max-h-72 overflow-y-auto">
                      {destinationBreakdown.map(({ destination, count }) => (
                        <div key={destination} className="flex justify-between items-center gap-2">
                          <span className="text-foreground text-sm truncate">{destination}</span>
                          <span className="font-mono text-gold text-sm shrink-0">{count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No outbound clicks yet</p>
                  )}
                </div>
              </div>
            </div>



            {/* Total events */}
            <p className="text-muted-foreground text-xs text-center mt-6">
              {allUnified.length} total events in selected period
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
