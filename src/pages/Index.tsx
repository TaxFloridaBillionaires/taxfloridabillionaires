import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { BillionaireCards } from "@/components/BillionaireCards";
import { TaxSlider } from "@/components/TaxSlider";
import { SpendingGame } from "@/components/SpendingGame";

const Index = () => {
  const [taxRate, setTaxRate] = useState<number | null>(null);
  const billionaireRef = useRef<HTMLDivElement>(null);
  const taxRef = useRef<HTMLDivElement>(null);
  const spendRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStart={() => scrollTo(billionaireRef)} />

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
          <strong className="text-foreground">For educational purposes only.</strong> Data sourced from{" "}
          <a href="https://billionairereporter.com/list-floridas-billionaires/" className="text-gold underline" target="_blank" rel="noopener">Billionaire Reporter</a>,{" "}
          <a href="https://stacker.com/stories/florida/richest-billionaires-florida" className="text-gold underline" target="_blank" rel="noopener">Stacker/Forbes</a>, and{" "}
          <a href="https://www.wusf.org/health-news-florida/2025-04-08/medicaid-cuts-could-put-3-billion-hole-florida-economy-study" className="text-gold underline" target="_blank" rel="noopener">WUSF/Commonwealth Fund</a>.
          Net worth figures from Forbes as of January 2026.
        </p>
      </footer>
    </div>
  );
};

export default Index;
