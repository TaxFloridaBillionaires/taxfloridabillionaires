import { useState, useEffect, useMemo } from "react";
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
};

const TIME_RANGES = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "All", days: 0 },
];

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [rangeDays, setRangeDays] = useState(7);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
    fetchData();
  }, [authed]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-events", {
      body: { password: ADMIN_PASSWORD },
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

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card border border-border rounded-sm p-8 w-full max-w-sm">
          <h1 className="font-display text-3xl text-foreground mb-6 text-center">ADMIN</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (password === ADMIN_PASSWORD) setAuthed(true);
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
