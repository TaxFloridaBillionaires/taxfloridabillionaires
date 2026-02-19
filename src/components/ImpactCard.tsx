import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { spendingItems, categoryLabels } from "@/data/gameData";

interface ImpactCardProps {
  purchases: Record<string, number>;
  taxRate: number;
  spent: number;
  totalBudget: number;
}

const formatMoney = (millions: number): string => {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  if (millions >= 1) return `$${millions.toFixed(0)}M`;
  return `$${(millions * 1000).toFixed(0)}K`;
};

const pluralize = (unit: string, qty: number): string => {
  if (qty === 1) return unit;
  // Handle special cases
  if (unit === "person") return "people";
  if (unit === "facility") return "facilities";
  if (unit === "full gap") return "full gaps";
  if (unit.endsWith("s")) return unit;
  return unit + "s";
};

export const ImpactCard = ({ purchases, taxRate, spent, totalBudget }: ImpactCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "hsl(220, 20%, 7%)",
      });
      const link = document.createElement("a");
      link.download = "florida-billionaire-tax-impact.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  }, []);

  const purchaseEntries = Object.entries(purchases).map(([id, qty]) => {
    const item = spendingItems.find(i => i.id === id)!;
    return { item, qty };
  });

  // Group by category for the wrapped layout
  const categories = ["education", "healthcare", "jobs", "infrastructure", "housing"] as const;
  const grouped = categories
    .map(cat => ({
      cat,
      label: categoryLabels[cat].label,
      items: purchaseEntries.filter(e => e.item.category === cat),
    }))
    .filter(g => g.items.length > 0);

  const percentUsed = ((spent / totalBudget) * 100).toFixed(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16"
    >
      {/* Download button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-sm bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors"
        >
          <Download className="w-4 h-4" />
          Save as Image
        </button>
      </div>

      {/* The card itself (captured for image export) */}
      <div
        ref={cardRef}
        className="bg-card border border-border rounded-sm overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <div className="gradient-gold px-6 py-5 text-center">
          <h3
            className="text-3xl sm:text-4xl tracking-wide text-background"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            YOUR FUNDED FLORIDA VISION
          </h3>
          <p className="text-background/70 text-sm mt-1 font-medium">
            What a {taxRate}% wealth tax on Florida billionaires could fund
          </p>
        </div>

        {/* Stats grid */}
        <div className="px-4 sm:px-6 py-6 space-y-5">
          {/* Top stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-sm p-3 text-center">
              <p className="text-gold text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {formatMoney(spent)}
              </p>
              <p className="text-muted-foreground text-sm mt-1">allocated</p>
            </div>
            <div className="bg-muted rounded-sm p-3 text-center">
              <p className="text-emerald text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {percentUsed}%
              </p>
              <p className="text-muted-foreground text-sm mt-1">of budget used</p>
            </div>
          </div>

          {/* Itemized by category */}
          {grouped.map(({ cat, label, items }) => (
            <div key={cat}>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2 font-semibold">
                {label}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {items.map(({ item, qty }) => (
                  <div key={item.id} className="flex flex-col items-center text-center bg-muted rounded-sm px-3 py-3 gap-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="text-gold text-lg font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {qty.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-sm leading-tight">
                      {pluralize(item.unit, qty)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="border-t border-border pt-4 text-center">
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
              Funded by a <span className="text-gold font-bold">{taxRate}% annual wealth tax</span> on
              Florida's billionaires — who moved there to <em>avoid</em> taxes.
            </p>
            <p className="text-muted-foreground/50 text-xs mt-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              taxfloridabillionaires.com
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
