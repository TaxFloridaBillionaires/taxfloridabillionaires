import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Head } from "@/components/Head";
import { candidates } from "@/data/candidates";
import { trackEvent } from "@/lib/publicSubmit";

const Endorsements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Head
        title="Endorsements — Tax Florida Billionaires"
        description="Florida candidates fighting for working-class people and taxing extreme wealth. See every endorsement across the state."
        canonical="https://taxfloridabillionaires.com/endorsements"
      />

      <header className="px-6 pt-10 pb-6 max-w-5xl mx-auto">
        <Link to="/" className="text-muted-foreground hover:text-gold text-xs uppercase tracking-widest">
          ← Back to the game
        </Link>
        <h1 className="font-display text-6xl md:text-8xl text-foreground leading-none mt-4">
          ENDORSE<span className="text-gold">MENTS</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mt-4">
          Florida candidates fighting for working-class people and taxing extreme wealth.
        </p>
      </header>

      <main className="px-6 pb-24 max-w-5xl mx-auto grid gap-4 sm:grid-cols-2">
        {candidates.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => trackEvent("endorsements_candidate_click", { name: c.name })}
            className="block bg-card border border-border hover:border-gold rounded-sm p-6 transition-colors"
          >
            <div className="font-display text-3xl text-foreground tracking-wide leading-none">
              {c.name}
            </div>
            <div className="text-gold text-sm mt-2 font-mono uppercase tracking-widest">
              {c.role}
            </div>
            <div className="text-muted-foreground text-xs mt-3 capitalize">
              {c.region.replace("east", " east").replace("west", " west")} Florida
            </div>
          </motion.a>
        ))}
      </main>
    </div>
  );
};

export default Endorsements;
