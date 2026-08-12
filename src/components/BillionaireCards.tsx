import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { billionaires, type Billionaire } from "@/data/gameData";

interface BillionaireCardsProps {
  onContinue: () => void;
}

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
        <Link
          to="/richest-person-in-florida"
          className="text-gold underline underline-offset-4 text-lg"
        >
          See the full ranking of the richest people in Florida →
        </Link>
      </motion.div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {billionaires.map((b, i) => (
          <BillionaireCard key={b.name} b={b} index={i} />
        ))}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="gradient-gold text-primary-foreground font-display text-2xl px-10 py-4 rounded-sm tracking-wider hover:brightness-110 transition-all"
        >
          NOW LET'S TAX THEM →
        </motion.button>
      </div>
    </section>
  );
};
