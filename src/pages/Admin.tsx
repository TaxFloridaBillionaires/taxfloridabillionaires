import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const ADMIN_PASSWORD = "dreamdefenders2026";

interface EventRow {
  event_name: string;
  created_at: string;
  properties: Record<string, unknown> | null;
}

const EVENT_LABELS: Record<string, { label: string; color: string }> = {
  scroll_billionaire_cards: { label: "Saw Billionaires", color: "hsl(220, 10%, 55%)" },
  scroll_tax_slider: { label: "Saw Tax Slider", color: "hsl(220, 10%, 55%)" },
  scroll_spending_game: { label: "Saw Spending Game", color: "hsl(220, 10%, 55%)" },
  spend_button_clicked: { label: "Clicked SPEND", color: "hsl(45, 100%, 51%)" },
  save_image_clicked: { label: "Saved Image", color: "hsl(160, 60%, 45%)" },
  tell_a_friend_clicked: { label: "Told a Friend", color: "hsl(0, 72%, 51%)" },
};

const TIME_RANGES = [
  { label: "Last 24h", days: 1 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "All time", days: 0 },
];

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [rangeDays, setRangeDays] = useState(7);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
    fetchEvents();
  }, [authed]);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-events", {
      body: { password: ADMIN_PASSWORD },
    });
    if (!error && data?.events) {
      setEvents(data.events);
    }
    setLoading(false);
  };

  const filteredEvents = useMemo(() => {
    if (rangeDays === 0) return events;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - rangeDays);
    return events.filter((e) => new Date(e.created_at) >= cutoff);
  }, [events, rangeDays]);

  // Aggregate counts per event
  const totals = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of filteredEvents) {
      counts[e.event_name] = (counts[e.event_name] || 0) + 1;
    }
    return counts;
  }, [filteredEvents]);

  // Time series for chart
  const chartData = useMemo(() => {
    const metric = selectedMetric;
    const relevant = metric
      ? filteredEvents.filter((e) => e.event_name === metric)
      : filteredEvents;

    const byDate: Record<string, number> = {};
    for (const e of relevant) {
      const day = new Date(e.created_at).toISOString().slice(0, 10);
      byDate[day] = (byDate[day] || 0) + 1;
    }

    const sorted = Object.entries(byDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count,
      }));
    return sorted;
  }, [filteredEvents, selectedMetric]);

  // Funnel data
  const funnel = useMemo(() => {
    const order = [
      "scroll_billionaire_cards",
      "scroll_tax_slider",
      "scroll_spending_game",
      "spend_button_clicked",
      "save_image_clicked",
      "tell_a_friend_clicked",
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
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="font-display text-4xl md:text-5xl">
            EVENT <span className="text-gold">ANALYTICS</span>
          </h1>
          <div className="flex gap-1 bg-muted rounded-sm p-1">
            {TIME_RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setRangeDays(r.days)}
                className={`px-3 py-1.5 text-sm rounded-sm font-medium transition-colors ${
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {funnel.map((f) => (
                <button
                  key={f.name}
                  onClick={() =>
                    setSelectedMetric(selectedMetric === f.name ? null : f.name)
                  }
                  className={`bg-card border rounded-sm p-4 text-left transition-colors ${
                    selectedMetric === f.name
                      ? "border-gold"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                    {f.label}
                  </p>
                  <p
                    className="text-2xl md:text-3xl font-bold font-mono"
                    style={{ color: f.color }}
                  >
                    {f.count}
                  </p>
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-sm p-4 md:p-6 mb-8">
              <p className="text-muted-foreground text-sm mb-4">
                {selectedMetric
                  ? EVENT_LABELS[selectedMetric]?.label || selectedMetric
                  : "All Events"}{" "}
                over time
              </p>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(45, 100%, 51%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(220, 15%, 20%)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 18%, 11%)",
                        border: "1px solid hsl(220, 15%, 20%)",
                        borderRadius: 4,
                        color: "hsl(45, 100%, 96%)",
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Funnel */}
              <div className="bg-card border border-border rounded-sm p-4 md:p-6">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                  Conversion Funnel
                </h3>
                <div className="space-y-3">
                  {funnel.map((f, i) => {
                    const maxCount = Math.max(...funnel.map((x) => x.count), 1);
                    const pct = (f.count / maxCount) * 100;
                    return (
                      <div key={f.name}>
                        <div className="flex justify-between text-sm mb-1">
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
              <div className="bg-card border border-border rounded-sm p-4 md:p-6">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider mb-4 font-semibold">
                  Tax Rate Choices
                </h3>
                {taxRateBreakdown.length > 0 ? (
                  <div className="space-y-2">
                    {taxRateBreakdown.map(({ rate, count }) => (
                      <div key={rate} className="flex justify-between items-center">
                        <span className="text-foreground font-mono">{rate}</span>
                        <span className="font-mono text-gold">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No spend events yet</p>
                )}
              </div>
            </div>

            {/* Total events */}
            <p className="text-muted-foreground text-xs text-center mt-8">
              {filteredEvents.length} total events in selected period
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
