import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Candidate {
  name: string;
  role: string;
  url: string;
}

const candidates: Candidate[] = [
  {
    name: "Oliver Larkin",
    role: "U.S. Congress, FL",
    url: "https://oliverforcongress.com",
  },
  {
    name: "Angie Nixon",
    role: "FL State Representative, District 13",
    url: "https://angienixon.com",
  },
];

interface VoterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const PanelContent = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center text-center h-full overflow-y-auto px-5 py-8 sm:py-10">
    <button
      onClick={onClose}
      className="self-end text-background/70 hover:text-background text-2xl leading-none mb-2"
      aria-label="Close voter panel"
    >
      ✕
    </button>

    <div className="text-4xl mb-3">🗳️</div>
    <div className="mb-6 space-y-2">
      <div>
        <p className="text-background/70 text-[11px] uppercase tracking-widest font-bold">
          Primary Election Day
        </p>
        <p className="font-display text-2xl sm:text-3xl text-background tracking-wide leading-none">
          August 18, 2026
        </p>
      </div>
      <div>
        <p className="text-background/70 text-[11px] uppercase tracking-widest font-bold">
          Election Day
        </p>
        <p className="font-display text-2xl sm:text-3xl text-background tracking-wide leading-none">
          November 3, 2026
        </p>
      </div>
    </div>
    <p className="text-background/80 text-sm mb-6 max-w-xs">
      Florida candidates fighting for working-class people and taxing extreme wealth.
    </p>

    <a
      href="https://registertovoteflorida.gov/home"
      target="_blank"
      rel="noopener"
      onClick={() => {
        supabase.from("events").insert({ event_name: "voter_panel_register_click" }).then(() => {});
      }}
      className="w-full max-w-xs border-2 border-background text-background font-display text-lg tracking-wider px-5 py-3 rounded-sm hover:bg-background hover:text-gold transition-colors mb-8"
    >
      REGISTER / CHECK STATUS →
    </a>

    <div className="w-full max-w-xs space-y-3">
      <p className="text-background/70 text-xs uppercase tracking-widest font-bold mb-2">
        Candidates
      </p>
      {candidates.map((c) => (
        <a
          key={c.name}
          href={c.url}
          target="_blank"
          rel="noopener"
          onClick={() => {
            supabase
              .from("events")
              .insert({
                event_name: "voter_panel_candidate_click",
                properties: { name: c.name },
              })
              .then(() => {});
          }}
          className="block border-2 border-background/80 hover:border-background hover:bg-background/10 transition-colors rounded-sm px-4 py-3 text-background"
        >
          <div className="font-display text-xl tracking-wide leading-tight">
            {c.name}
          </div>
          <div className="text-background/80 text-xs mt-1">{c.role}</div>
        </a>
      ))}
    </div>

    <p className="text-background/60 text-[11px] mt-8 max-w-xs">
      More candidates coming soon.
    </p>
  </div>
);

export const VoterPanel = ({ isOpen, onClose }: VoterPanelProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Desktop: right-side drawer */}
          <motion.aside
            key="desktop-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block fixed top-0 right-0 h-full w-1/4 min-w-[320px] bg-gold z-50 shadow-2xl"
          >
            <PanelContent onClose={onClose} />
          </motion.aside>

          {/* Mobile: bottom sheet */}
          <motion.aside
            key="mobile-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-[85vh] bg-gold z-50 shadow-2xl rounded-t-2xl"
          >
            <PanelContent onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

interface VoterTriggerProps {
  onOpen: () => void;
}

export const VoterTrigger = ({ onOpen }: VoterTriggerProps) => {
  const [visible, setVisible] = useState(false);
  const [faded, setFaded] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      // Appear after hero is ~50% scrolled
      setVisible(y > vh * 0.5);
      // Fade to 50% after Learn More button area (~75% of hero)
      setFaded(y > vh * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (!tracked.current) {
      tracked.current = true;
      supabase.from("events").insert({ event_name: "voter_panel_open" }).then(() => {});
    }
    onOpen();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: faded ? 0.5 : 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          aria-label="Open voter panel"
          className="fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 bg-gold text-background w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-gold/30 hover:shadow-gold/50"
        >
          🗳️
        </motion.button>
      )}
    </AnimatePresence>
  );
};
