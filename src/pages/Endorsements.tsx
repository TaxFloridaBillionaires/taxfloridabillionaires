import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AtSign,
  Cloud,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import { Head } from "@/components/Head";
import { FloridaMap } from "@/components/FloridaMap";
import { candidates, regionLabels, type SocialPlatform } from "@/data/candidates";
import { trackEvent } from "@/lib/publicSubmit";

const SOCIAL_ICONS: Record<SocialPlatform, typeof Globe> = {
  website: Globe,
  x: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
  youtube: Youtube,
  linkedin: Linkedin,
  bluesky: Cloud,
  threads: AtSign,
};

const Endorsements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const i = Number((visible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(i)) setActiveIndex(i);
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.1, 0.5, 0.9] }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = candidates[activeIndex] ?? candidates[0];

  return (
    <div className="min-h-screen bg-background">
      <Head
        title="Endorsements — Tax Florida Billionaires"
        description="Florida candidates fighting for working-class people and taxing extreme wealth. Scroll the state and meet every endorsement."
        canonical="https://taxfloridabillionaires.com/endorsements"
      />

      <header className="px-6 pt-10 pb-6 max-w-6xl mx-auto">
        <Link to="/" className="text-muted-foreground hover:text-gold text-xs uppercase tracking-widest">
          ← Back to the game
        </Link>
        <h1 className="font-display text-6xl md:text-8xl text-foreground leading-none mt-4">
          ENDORSE<span className="text-gold">MENTS</span>
        </h1>
        <p className="text-muted-foreground max-w-xl mt-4">
          Florida candidates fighting for working-class people and taxing extreme wealth. Scroll —
          the map follows the fight.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-32 lg:flex lg:gap-12 lg:items-start">
        {/* Map: sticky top on mobile, sticky left on desktop */}
        <div className="sticky top-0 z-20 -mx-6 px-6 h-[42vh] lg:h-[80vh] lg:top-16 lg:mx-0 lg:px-0 lg:w-1/2 bg-background/90 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none border-b border-border lg:border-0">
          <FloridaMap active={active} />
          <div className="absolute bottom-2 left-6 lg:left-0 font-mono text-[10px] uppercase tracking-widest text-gold">
            {regionLabels[active.region]}
          </div>
        </div>

        {/* Candidate list */}
        <div className="lg:w-1/2 pt-10 lg:pt-0 space-y-10">
          {candidates.map((c, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.article
                key={c.name}
                data-index={i}
                ref={(el) => (cardRefs.current[i] = el)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className={`rounded-sm border p-6 bg-card transition-colors duration-300 ${
                  isActive ? "border-gold shadow-[0_0_40px_hsl(var(--gold)/0.12)]" : "border-border"
                }`}
              >
                <h2 className="font-display text-4xl text-foreground leading-none tracking-wide">
                  {c.name}
                </h2>
                <div className="text-gold text-sm mt-2 font-mono uppercase tracking-widest">
                  {c.role}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {c.area ? `${c.area} — ` : ""}
                  {regionLabels[c.region]}
                </div>
                {c.blurb && (
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{c.blurb}</p>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {c.donateUrl && (
                    <a
                      href={c.donateUrl}
                      target="_blank"
                      rel="noopener"
                      onClick={() => trackEvent("endorsements_donate_click", { name: c.name })}
                      className="inline-flex items-center gap-2 bg-crimson text-foreground font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" /> Donate
                    </a>
                  )}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackEvent("endorsements_candidate_click", { name: c.name })}
                    className="inline-flex items-center gap-2 bg-gold text-primary-foreground font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
                  >
                    Website <ExternalLink className="w-3 h-3" />
                  </a>



                  {c.socials?.map((s) => {
                    const Icon = SOCIAL_ICONS[s.platform];
                    return (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${c.name} on ${s.platform}`}
                        onClick={() =>
                          trackEvent("endorsements_social_click", {
                            name: c.name,
                            platform: s.platform,
                          })
                        }
                        className="w-9 h-9 grid place-items-center rounded-sm border border-border text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Endorsements;
