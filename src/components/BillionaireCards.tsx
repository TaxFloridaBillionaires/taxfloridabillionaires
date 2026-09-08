import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { billionaires, type Billionaire } from "@/data/gameData";

interface BillionaireCardsProps {
  onContinue: () => void;
}

const useColumns = () => {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w >= 1024 ? 4 : w >= 768 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
};


const BillionaireCard = ({ b, index }: { b: Billionaire; index: number }) => {
  const isLocalBorn = b.movedFrom === "Born in FL (rare!)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      tabIndex={0}
      className="bg-card border border-border rounded-sm p-4 md:p-5 hover:border-gold/50 focus:border-gold/50 transition-colors group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <span className="text-4xl md:text-5xl">{b.emoji}</span>
        <span className="font-mono text-gold text-2xl md:text-2xl font-bold">${b.netWorth}B</span>
      </div>
      <h3 className="font-display text-3xl md:text-3xl text-foreground mb-1">{b.name}</h3>
      <p className="text-muted-foreground text-base md:text-base mb-2 md:mb-3">{b.source} · {b.industry}</p>
      <div className="text-base md:text-base space-y-1 md:space-y-1.5">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">📍</span>
          <span className="text-foreground">{b.city}, FL</span>
        </div>
        {!isLocalBorn ? (
          <div className="flex items-center gap-1">
            <span className="text-crimson">✈️</span>
            <span className="text-crimson">From {b.movedFrom} ({b.movedYear})</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="text-emerald">🌴</span>
            <span className="text-emerald">Actually from Florida!</span>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-base md:text-base mt-2 md:mt-3 italic opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
        "{b.whyMoved}"
      </p>
    </motion.div>
  );
};

export const BillionaireCards = ({ onContinue }: BillionaireCardsProps) => {
  const cols = useColumns();
  const [rows, setRows] = useState(2);

  const capacity = cols * rows;
  const hasMore = billionaires.length > capacity;
  // Reserve the last cell for the "see more" tile when there are more to show
  const shown = hasMore ? billionaires.slice(0, capacity - 1) : billionaires;
  const hiddenCount = billionaires.length - shown.length;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
          MEET THE <span className="text-gold">TAX AVOIDERS</span>
        </h2>
      </motion.div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {shown.map((b, i) => (
          <div key={b.name}>
            <BillionaireCard b={b} index={i % cols} />
          </div>
        ))}

        {hasMore && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setRows(r => r + 2)}
            aria-label={`Show ${Math.min(hiddenCount, cols * 2)} more billionaires`}
            className="min-h-[160px] rounded-sm border border-gold/60 bg-gold/5 text-gold hover:bg-gold hover:text-primary-foreground transition-colors flex flex-col items-center justify-center gap-2 p-4"
          >
            <span className="font-mono text-4xl leading-none">＋</span>
            <span className="font-display text-2xl tracking-wider">SEE MORE</span>
            <span className="text-sm opacity-80">{hiddenCount} more</span>
          </motion.button>
        )}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="gradient-gold text-primary-foreground font-display text-xl sm:text-2xl px-8 sm:px-10 py-4 rounded-sm tracking-wider hover:brightness-110 transition-all"
        >
          NOW LET'S TAX THEM →
        </motion.button>
      </div>

    </section>
  );
};
