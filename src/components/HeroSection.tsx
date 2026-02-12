import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { totalBillionaireWealth, zuckerbergContext, billionaires } from "@/data/gameData";

interface HeroSectionProps {
  onStart: () => void;
}

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  const movedCount = billionaires.filter(b => b.movedFrom !== "Born in FL (rare!)").length;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl relative z-10"
      >
        {/* Breaking news bar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-crimson px-4 py-2 rounded-sm mb-8"
        >
          <span className="animate-pulse-gold text-foreground font-bold text-xs tracking-widest uppercase">
            ⚡ Breaking
          </span>
          <span className="text-foreground text-xs sm:text-sm font-medium">
            {zuckerbergContext.headline}
          </span>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-none mb-4 text-foreground">
          SPENDING THE
          <br />
          <span className="text-gold ticker-glow">FLORIDA BILLIONAIRE</span>
          <br />
          TAX
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 mb-6"
        >
          <p className="text-muted-foreground text-lg mb-2">
            {movedCount} of Florida's 20 richest residents moved there from other states. Combined wealth:
          </p>
          <div className="font-mono text-5xl md:text-7xl text-gold font-bold ticker-glow">
            <AnimatedCounter end={totalBillionaireWealth} prefix="$" suffix="B" decimals={1} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-4 text-base"
        >
          Florida has <strong className="text-foreground">no income tax, no estate tax, no inheritance tax</strong>.
          Meanwhile, proposed federal Medicaid cuts threaten to blow a{" "}
          <strong className="text-crimson">$3 billion hole</strong> in Florida's economy and{" "}
          <strong className="text-crimson">33,000 jobs</strong>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-muted-foreground text-sm max-w-xl mx-auto mb-10 italic"
        >
          {zuckerbergContext.detail}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="gradient-gold text-primary-foreground font-display text-3xl px-12 py-5 rounded-sm tracking-wider hover:brightness-110 transition-all shadow-lg shadow-gold/20"
        >
          START THE GAME →
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-muted-foreground text-sm flex flex-col items-center gap-2"
      >
        <span>or scroll to explore</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
};
