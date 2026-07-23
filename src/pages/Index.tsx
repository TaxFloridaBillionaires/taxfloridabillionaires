import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { BillionaireCards } from "@/components/BillionaireCards";
import { TaxSlider } from "@/components/TaxSlider";
import { SpendingGame } from "@/components/SpendingGame";
import { VoterPanel, VoterTrigger } from "@/components/VoterPanel";
import { trackEvent } from "@/lib/publicSubmit";

const useScrollTracker = (ref: React.RefObject<HTMLDivElement | null>, eventName: string) => {
  const tracked = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackEvent(eventName);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, eventName]);
};

const Index = () => {
  const [taxRate, setTaxRate] = useState<number | null>(null);
  const [voterOpen, setVoterOpen] = useState(false);
  const billionaireRef = useRef<HTMLDivElement>(null);
  const taxRef = useRef<HTMLDivElement>(null);
  const spendRef = useRef<HTMLDivElement>(null);

  useScrollTracker(billionaireRef, "scroll_billionaire_cards");
  useScrollTracker(taxRef, "scroll_tax_slider");
  useScrollTracker(spendRef, "scroll_spending_game");

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Shift page left by 25% on desktop when panel is open; no shift on mobile (bottom sheet)
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <motion.div
        animate={{ x: voterOpen && isDesktop ? "-25%" : "0%" }}
        transition={{ type: "tween", duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => voterOpen && setVoterOpen(false)}
      >
        <HeroSection onStart={() => scrollTo(billionaireRef)} onOpenVoter={() => setVoterOpen(true)} />

      <div ref={billionaireRef}>
        <BillionaireCards onContinue={() => scrollTo(taxRef)} />
      </div>

      <div ref={taxRef}>
        <TaxSlider onSetRate={(rate) => {
          setTaxRate(rate);
          setTimeout(() => scrollTo(spendRef), 100);
        }} />
      </div>

      {taxRate !== null && (
        <div ref={spendRef}>
          <SpendingGame taxRate={taxRate} />
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border text-center">
        <p className="text-muted-foreground text-xs max-w-lg mx-auto">
          <strong className="text-foreground">For entertainment and educational purposes only.</strong> Data sourced from{" "}
          <a href="https://billionairereporter.com/list-floridas-billionaires/" className="text-gold underline" target="_blank" rel="noopener">Billionaire Reporter</a>,{" "}
          <a href="https://stacker.com/stories/florida/richest-billionaires-florida" className="text-gold underline" target="_blank" rel="noopener">Stacker/Forbes</a>,{" "}
          <a href="https://www.wusf.org/health-news-florida/2025-04-08/medicaid-cuts-could-put-3-billion-hole-florida-economy-study" className="text-gold underline" target="_blank" rel="noopener">WUSF/Commonwealth Fund</a>,{" "}
          <a href="https://www.palmbeachpost.com/" className="text-gold underline" target="_blank" rel="noopener">Palm Beach Post</a>, and{" "}
          <a href="https://www.realtor.com/news/trends/larry-ellison-hawaii-manalapan-fl-estate-donald-trump/" className="text-gold underline" target="_blank" rel="noopener">Realtor.com</a>.
          Net worth figures from Forbes as of January 2026.
        </p>
        <p className="text-muted-foreground/50 text-xs mt-3">Made with ❤️ by a Floridian.</p>
        <a
          href="https://instagram.com/taxfloridabillionaires"
          target="_blank"
          rel="noopener"
          className="inline-block mt-3 px-4 py-1.5 bg-gold text-background text-xs font-bold rounded hover:opacity-90 transition-opacity"
        >
          @taxfloridabillionaires
        </a>
      </footer>
      </motion.div>

      <VoterTrigger onOpen={() => setVoterOpen(true)} />
      <VoterPanel isOpen={voterOpen} onClose={() => setVoterOpen(false)} />
    </div>
  );
};

export default Index;
