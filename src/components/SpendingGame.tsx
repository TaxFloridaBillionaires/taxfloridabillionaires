import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spendingItems, categoryLabels, totalBillionaireWealth, type SpendingItem } from "@/data/gameData";

interface SpendingGameProps {
  taxRate: number;
}

interface Purchase {
  itemId: string;
  quantity: number;
}

const formatMoney = (millions: number): string => {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`;
  if (millions >= 1) return `$${millions.toFixed(0)}M`;
  return `$${(millions * 1000).toFixed(0)}K`;
};

export const SpendingGame = ({ taxRate }: SpendingGameProps) => {
  const totalBudgetMillions = (totalBillionaireWealth * taxRate / 100) * 1000;
  const [purchases, setPurchases] = useState<Record<string, number>>({});

  const spent = useMemo(() => {
    return Object.entries(purchases).reduce((sum, [id, qty]) => {
      const item = spendingItems.find(i => i.id === id);
      return sum + (item ? item.costPerUnit * qty : 0);
    }, 0);
  }, [purchases]);

  const remaining = totalBudgetMillions - spent;
  const percentSpent = (spent / totalBudgetMillions) * 100;

  const addItem = (item: SpendingItem, amount: number) => {
    const maxAffordable = Math.floor(remaining / item.costPerUnit);
    const toAdd = Math.min(amount, maxAffordable);
    if (toAdd <= 0) return;
    setPurchases(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + toAdd,
    }));
  };

  const removeItem = (item: SpendingItem, amount: number) => {
    setPurchases(prev => {
      const current = prev[item.id] || 0;
      const newQty = Math.max(0, current - amount);
      if (newQty === 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [item.id]: newQty };
    });
  };

  const categories = ["education", "healthcare", "jobs", "infrastructure", "housing"] as const;

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="text-center mb-8">
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
            SPEND THE <span className="text-gold">MONEY</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            You have <span className="text-gold font-bold">{formatMoney(totalBudgetMillions)}</span> from a {taxRate}% wealth tax. 
            How would you invest it in Florida?
          </p>
        </div>

        {/* Budget bar - sticky */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border py-4 mb-8 -mx-4 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-sm text-muted-foreground">
                SPENT: <span className="text-crimson font-bold">{formatMoney(spent)}</span>
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                REMAINING: <span className="text-emerald font-bold">{formatMoney(remaining)}</span>
              </span>
            </div>
            <div className="h-4 bg-muted rounded-sm overflow-hidden">
              <motion.div
                className="h-full gradient-gold rounded-sm"
                animate={{ width: `${Math.min(percentSpent, 100)}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
            <div className="text-center mt-1">
              <span className="font-mono text-xs text-muted-foreground">
                {percentSpent.toFixed(1)}% allocated
              </span>
            </div>
          </div>
        </div>

        {/* Shopping items by category */}
        {categories.map(cat => {
          const items = spendingItems.filter(i => i.category === cat);
          const catInfo = categoryLabels[cat];
          return (
            <div key={cat} className="mb-10">
              <h3 className="font-display text-3xl text-foreground mb-4 flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full bg-${catInfo.color}`} />
                {catInfo.label}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => {
                  const qty = purchases[item.id] || 0;
                  const totalCost = item.costPerUnit * qty;
                  const canAfford = remaining >= item.costPerUnit;

                  // Calculate meaningful step
                  const bigStep = item.costPerUnit < 0.1 ? 100 : item.costPerUnit < 1 ? 10 : 1;

                  return (
                    <div key={item.id} className="bg-card border border-border rounded-sm p-4 hover:border-gold/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            <h4 className="text-foreground font-semibold">{item.name}</h4>
                          </div>
                          <p className="text-muted-foreground text-xs mt-1">{item.description}</p>
                          <p className="font-mono text-xs text-gold mt-1">
                            {formatMoney(item.costPerUnit)} per {item.unit}
                          </p>
                          {item.realWorldContext && (
                            <p className="text-crimson text-xs mt-1 italic">📌 {item.realWorldContext}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeItem(item, 1)}
                            disabled={qty === 0}
                            className="w-8 h-8 rounded-sm bg-muted text-foreground font-bold disabled:opacity-30 hover:bg-crimson/20 transition-colors"
                          >−</button>
                          {bigStep > 1 && (
                            <button
                              onClick={() => removeItem(item, bigStep)}
                              disabled={qty < bigStep}
                              className="px-2 h-8 rounded-sm bg-muted text-foreground text-xs disabled:opacity-30 hover:bg-crimson/20 transition-colors"
                            >−{bigStep}</button>
                          )}
                          <span className="font-mono text-foreground font-bold min-w-[60px] text-center">
                            {qty.toLocaleString()}
                          </span>
                          {bigStep > 1 && (
                            <button
                              onClick={() => addItem(item, bigStep)}
                              disabled={!canAfford}
                              className="px-2 h-8 rounded-sm bg-muted text-foreground text-xs disabled:opacity-30 hover:bg-emerald/20 transition-colors"
                            >+{bigStep}</button>
                          )}
                          <button
                            onClick={() => addItem(item, 1)}
                            disabled={!canAfford}
                            className="w-8 h-8 rounded-sm bg-muted text-foreground font-bold disabled:opacity-30 hover:bg-emerald/20 transition-colors"
                          >+</button>
                        </div>
                        {qty > 0 && (
                          <span className="font-mono text-sm text-gold">{formatMoney(totalCost)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Impact Summary */}
        {spent > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 bg-card border border-gold/30 rounded-sm p-8 text-center"
          >
            <h3 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              YOUR <span className="text-gold">IMPACT</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {Object.entries(purchases).map(([id, qty]) => {
                const item = spendingItems.find(i => i.id === id)!;
                return (
                  <div key={id} className="bg-muted p-3 rounded-sm">
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="font-mono text-gold text-lg font-bold">{qty.toLocaleString()}</p>
                    <p className="text-muted-foreground text-xs">{item.unit}{qty !== 1 ? "s" : ""}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              All of this funded by a <span className="text-gold font-bold">{taxRate}% annual wealth tax</span> on
              Florida's billionaires — who moved there specifically to <em>avoid</em> paying taxes like these.
            </p>
            <p className="text-muted-foreground text-xs mt-4 italic">
              For educational purposes. Data sourced from Forbes, Billionaire Reporter, Stacker, and the Commonwealth Fund/WUSF.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
