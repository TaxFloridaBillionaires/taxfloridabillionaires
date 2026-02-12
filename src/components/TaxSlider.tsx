import { useState } from "react";
import { motion } from "framer-motion";
import { totalBillionaireWealth } from "@/data/gameData";
import { AnimatedCounter } from "./AnimatedCounter";

interface TaxSliderProps {
  onSetRate: (rate: number) => void;
}

const presets = [
  { rate: 1, label: "Modest 1%" },
  { rate: 2, label: "Warren Buffett's suggestion: 2%" },
  { rate: 5, label: "Bold 5%" },
  { rate: 10, label: "Ambitious 10%" },
];

export const TaxSlider = ({ onSetRate }: TaxSliderProps) => {
  const [rate, setRate] = useState(2);
  const revenue = (totalBillionaireWealth * rate) / 100; // in billions
  const revenueMillions = revenue * 1000; // in millions

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
          SET THE <span className="text-gold">TAX RATE</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          If Florida imposed a modest annual wealth tax on its billionaires, how much revenue would it generate?
        </p>

        {/* Slider */}
        <div className="mb-8">
          <div className="flex justify-between text-muted-foreground text-sm mb-2">
            <span>0.5%</span>
            <span>15%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={15}
            step={0.5}
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full h-3 rounded-sm appearance-none cursor-pointer bg-muted accent-gold"
            style={{
              background: `linear-gradient(to right, hsl(var(--gold)) ${((rate - 0.5) / 14.5) * 100}%, hsl(var(--muted)) ${((rate - 0.5) / 14.5) * 100}%)`
            }}
          />
        </div>

        {/* Rate display */}
        <div className="font-mono text-8xl md:text-9xl text-gold font-bold ticker-glow mb-2">
          {rate}%
        </div>
        <p className="text-muted-foreground text-lg mb-6">annual wealth tax</p>

        {/* Revenue */}
        <div className="bg-card border border-gold/30 rounded-sm p-8 mb-8">
          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">Annual Revenue Generated</p>
          <div className="font-mono text-5xl md:text-6xl text-gold font-bold">
            ${revenue.toFixed(1)}B
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            That's <span className="text-foreground font-bold">${revenueMillions.toFixed(0)} million</span> per year
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {presets.map(p => (
            <button
              key={p.rate}
              onClick={() => setRate(p.rate)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                rate === p.rate
                  ? "bg-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Context comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
          <div className="bg-card border border-crimson/30 p-4 rounded-sm">
            <p className="text-crimson font-display text-2xl">$3B</p>
            <p className="text-muted-foreground text-xs">Medicaid cuts hole in FL economy</p>
            <p className="text-emerald text-xs mt-1">
              {revenue >= 3 ? "✅ Covered!" : `❌ Need ${((3 / revenue) * rate).toFixed(1)}% to cover`}
            </p>
          </div>
          <div className="bg-card border border-crimson/30 p-4 rounded-sm">
            <p className="text-crimson font-display text-2xl">33,000</p>
            <p className="text-muted-foreground text-xs">Jobs at risk from Medicaid cuts</p>
            <p className="text-emerald text-xs mt-1">
              Could save {Math.min(33000, Math.floor(revenueMillions / 0.055)).toLocaleString()} jobs
            </p>
          </div>
          <div className="bg-card border border-crimson/30 p-4 rounded-sm">
            <p className="text-crimson font-display text-2xl">$177M</p>
            <p className="text-muted-foreground text-xs">Local tax revenue at risk</p>
            <p className="text-emerald text-xs mt-1">
              {revenueMillions >= 177 ? "✅ Covered!" : `❌ Need more`}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSetRate(rate)}
          className="gradient-gold text-primary-foreground font-display text-2xl px-10 py-4 rounded-sm tracking-wider hover:brightness-110 transition-all"
        >
          SPEND ${revenue.toFixed(1)}B →
        </motion.button>
      </motion.div>
    </section>
  );
};
