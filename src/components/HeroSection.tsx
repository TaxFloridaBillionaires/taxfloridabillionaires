import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { totalBillionaireWealth, breakingHeadlines, billionaires } from "@/data/gameData";

interface HeroSectionProps {
  onStart: () => void;
}

const TickerBar = () => {
  const combinedText = breakingHeadlines.join("   ●   ");
  // Duplicate for seamless loop
  const tickerContent = `${combinedText}   ●   ${combinedText}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="inline-flex items-center gap-2 bg-crimson px-4 py-2 rounded-sm mb-3 sm:mb-8 max-w-full overflow-hidden"
    >
      <span className="animate-pulse-gold text-foreground font-bold text-xs tracking-widest uppercase shrink-0">
        ⚡ Breaking
      </span>
      <div className="overflow-hidden whitespace-nowrap">
        <motion.span
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="inline-block text-foreground text-xs sm:text-sm font-medium"
        >
          {tickerContent}
        </motion.span>
      </div>
    </motion.div>
  );
};

export const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
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
        {/* Breaking news ticker */}
        <TickerBar />

        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-4 text-foreground">
          TAX THE
          <br />
          <span className="text-gold ticker-glow">FLORIDA</span>
          <br />
          BILLIONAIRES
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 mb-6"
        >
          <p className="text-muted-foreground text-base sm:text-lg mb-2">
            More than a dozen moved to Florida in recent years.
          </p>
          <p className="text-muted-foreground text-lg mb-2">
            Their combined wealth:
          </p>
          <div className="font-mono text-5xl md:text-7xl text-gold font-bold ticker-glow">
            <AnimatedCounter end={716} prefix="$" suffix="B" decimals={0} />
          </div>
          <a href="https://archive.ph/vElAc" target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-muted-foreground hover:text-gold text-xs mt-2 transition-colors">
            🔗 <span className="underline">Source</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 text-sm sm:text-lg px-2 leading-relaxed"
        >
          How could a tax on 100 billionaires fund Florida's future?
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
          LEARN MORE →
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
