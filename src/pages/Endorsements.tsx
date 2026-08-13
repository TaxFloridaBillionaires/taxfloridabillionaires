import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AtSign,
  Cloud,
  ExternalLink,
  Facebook,
  Globe,
  HeartHandshake,
  Instagram,
  Linkedin,
  Link2,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import { Head } from "@/components/Head";
import { FloridaMap } from "@/components/FloridaMap";
import {
  candidates,
  levelLabels,
  levelOrder,
  regionLabels,
  type SocialPlatform,
} from "@/data/candidates";
import { trackEvent } from "@/lib/publicSubmit";
import { toast } from "sonner";

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

const UTM = {
  utm_source: "taxfloridabillionaires",
  utm_medium: "referral",
  utm_campaign: "endorsements",
};

const BASE_URL = "https://taxfloridabillionaires.com";

/** Appends campaign tags at click time so the visible href stays clean. */
const withUtm = (raw: string) => {
  try {
    const u = new URL(raw);
    Object.entries(UTM).forEach(([k, v]) => {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    });
    return u.toString();
  } catch {
    return raw;
  }
};

const hostLabel = (raw: string) => {
  try {
    return new URL(raw).hostname.replace(/^www\./, "");
  } catch {
    return raw;
  }
};

/** Tracks the outbound click, then opens the tagged URL in a new tab. */
const openOutbound = (
  raw: string,
  event: string,
  payload: Record<string, unknown>
) => {
  trackEvent(event, { ...payload, destination: hostLabel(raw), ...UTM });
  window.open(withUtm(raw), "_blank", "noopener,noreferrer");
};

const Endorsements = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const lastHashRef = useRef<string>("");
  const suppressScrollSpy = useRef(false);

  useEffect(() => {
    trackEvent("endorsements_page_view");
  }, []);

  // Handle initial URL hash: jump to the candidate and make them active.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const i = candidates.findIndex((c) => c.slug === hash);
    if (i < 0) return;
    setActiveIndex(i);
    lastHashRef.current = hash;
    // Pause the scroll spy while the smooth scroll settles so it doesn't override the active card.
    suppressScrollSpy.current = true;
    // Wait a tick for layout, then scroll the card into the center of view.
    const t = setTimeout(() => {
      cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    const clear = setTimeout(() => {
      suppressScrollSpy.current = false;
    }, 550);
    return () => {
      clearTimeout(t);
      clearTimeout(clear);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (suppressScrollSpy.current) return;
      const els = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!els.length) return;

      // At the very bottom of the page the last card can never reach the
      // viewport centre — force it active.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const last = els[els.length - 1];
        const i = Number(last.dataset.index);
        if (!Number.isNaN(i)) {
          setActiveIndex(i);
          syncHash(candidates[i]?.slug);
        }
        return;
      }

      const center = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = Number(el.dataset.index);
        }
      });
      if (!Number.isNaN(best)) {
        setActiveIndex(best);
        syncHash(candidates[best]?.slug);
      }
    };

    const syncHash = (slug?: string) => {
      if (!slug) return;
      if (suppressScrollSpy.current) return;
      const next = `#${slug}`;
      if (lastHashRef.current !== slug && window.location.hash !== next) {
        lastHashRef.current = slug;
        window.history.replaceState(null, "", `${window.location.pathname}${next}`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = candidates[activeIndex] ?? candidates[0];

  const selectCandidate = (name: string) => {
    const i = candidates.findIndex((c) => c.name === name);
    if (i < 0) return;
    setActiveIndex(i);
    lastHashRef.current = candidates[i].slug;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}#${candidates[i].slug}`
    );
    suppressScrollSpy.current = true;
    trackEvent("endorsements_map_select", { name });
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      suppressScrollSpy.current = false;
    }, 500);
  };

  const copyLink = (slug: string) => {
    const url = `${BASE_URL}/endorsements#${slug}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied", {
          description: `Share ${candidates.find((c) => c.slug === slug)?.name}'s endorsement.`,
        });
        trackEvent("endorsements_share_link", { slug, url });
      })
      .catch(() => {
        toast.error("Could not copy link");
      });
  };

  const canonical = active.slug
    ? `${BASE_URL}/endorsements#${active.slug}`
    : `${BASE_URL}/endorsements`;

  return (
    <div className="min-h-screen bg-background">
      <Head
        title="Endorsements — Tax Florida Billionaires"
        description="Florida candidates fighting for working-class people and taxing extreme wealth. Scroll the state and meet every endorsement."
        canonical={canonical}
        ogTitle="Endorsements — Florida Candidates Who Back Taxing Extreme Wealth"
        ogDescription="Meet every endorsed Florida candidate fighting for workers and a billionaire wealth tax, mapped across the state with websites, platforms and donation links."
        ogType="article"
      />

      <header className="px-6 pt-10 pb-6 max-w-6xl mx-auto">
        <Link to="/" className="text-muted-foreground hover:text-gold text-xs uppercase tracking-widest">
          ← Back to the game
        </Link>
        <h1 className="font-display text-6xl md:text-8xl text-gold leading-none mt-4">
          ENDORSEMENTS
        </h1>
        <p className="text-muted-foreground max-w-xl mt-4">
          Florida candidates fighting for working-class people and taxing extreme wealth. Scroll —
          the map follows the fight.
        </p>
        <p className="text-muted-foreground/70 max-w-xl mt-3 text-xs uppercase tracking-wider">
          Paid for by Tax Florida Billionaires, not authorized by any candidate or candidate's
          committee.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-32 lg:flex lg:gap-12 lg:items-start">
        {/* Map: sticky top on mobile, sticky left on desktop */}
        <div className="sticky top-0 z-20 -mx-6 px-6 h-[42vh] lg:h-[80vh] lg:top-16 lg:mx-0 lg:px-0 lg:w-1/2 bg-background/90 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none border-b border-border lg:border-0">
          <FloridaMap
            active={active}
            candidates={candidates}
            onSelect={(c) => selectCandidate(c.name)}
          />

          <div className="absolute bottom-2 left-6 lg:left-0 font-mono text-[10px] uppercase tracking-widest text-gold">
            {regionLabels[active.region]}
          </div>
        </div>

        {/* Candidate list, grouped by office level */}
        <div className="lg:w-1/2 pt-10 lg:pt-0 space-y-12">
          {levelOrder.map((level) => {
            const group = candidates
              .map((c, i) => ({ c, i }))
              .filter(({ c }) => c.level === level);
            if (group.length === 0) return null;

            return (
              <section key={level} className="space-y-6">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold border-b border-border pb-2">
                  {levelLabels[level]}
                </h2>

                {group.map(({ c, i }) => {
                  const isActive = i === activeIndex;
                  return (
                    <motion.article
                      key={c.name}
                      id={c.slug}
                      data-index={i}
                      ref={(el) => (cardRefs.current[i] = el)}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4 }}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest("a,button")) return;
                        openOutbound(c.url, "endorsements_candidate_click", {
                          name: c.name,
                          source: "card",
                        });
                      }}
                      role="link"
                      tabIndex={0}
                      title={`Visit ${c.name} — ${hostLabel(c.url)}`}
                      aria-label={`Visit ${c.name}'s campaign site at ${hostLabel(c.url)}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openOutbound(c.url, "endorsements_candidate_click", {
                            name: c.name,
                            source: "card_keyboard",
                          });
                        }
                      }}
                      className={`group relative rounded-sm border p-5 sm:p-6 bg-card transition-colors duration-300 cursor-pointer hover:border-gold ${
                        isActive
                          ? "border-gold shadow-[0_0_40px_hsl(var(--gold)/0.12)]"
                          : "border-border"
                      }`}
                    >
                      <span className="pointer-events-none absolute top-3 right-3 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity max-w-[240px] truncate">
                        {hostLabel(c.url)} <ExternalLink className="w-3 h-3 shrink-0" />
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyLink(c.slug);
                        }}
                        aria-label={`Copy link to ${c.name}'s endorsement`}
                        title="Copy shareable link"
                        className="absolute bottom-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-sm border border-border text-muted-foreground hover:text-gold hover:border-gold transition-colors bg-card"
                      >
                        <Link2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-3xl sm:text-4xl text-foreground leading-none tracking-wide break-words pr-12 sm:pr-16">
                          {c.name}
                        </h3>
                      </div>

                      <div className="text-gold text-xs sm:text-sm mt-2 font-mono uppercase tracking-widest break-words pr-36 sm:pr-40">
                        {c.role}
                      </div>
                      <div className="text-muted-foreground text-xs mt-1 break-words pr-36 sm:pr-40">
                        {c.area ? `${c.area} — ` : ""}
                        {regionLabels[c.region]}
                      </div>
                      {c.blurb && (
                        <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                          {c.blurb}
                        </p>
                      )}

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        {c.donateUrl && (
                          <a
                            href={c.donateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Donate to ${c.name} — ${hostLabel(c.donateUrl)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              openOutbound(c.donateUrl!, "endorsements_donate_click", {
                                name: c.name,
                              });
                            }}
                            className="inline-flex items-center gap-2 bg-crimson text-foreground font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" /> Donate
                          </a>
                        )}
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open ${hostLabel(c.url)}`}
                          onClick={(e) => {
                            e.preventDefault();
                            openOutbound(c.url, "endorsements_candidate_click", {
                              name: c.name,
                              source: "website_button",
                            });
                          }}
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
                              rel="noopener noreferrer"
                              aria-label={`${c.name} on ${s.platform}`}
                              title={`${c.name} on ${s.platform} — ${hostLabel(s.url)}`}
                              onClick={(e) => {
                                e.preventDefault();
                                openOutbound(s.url, "endorsements_social_click", {
                                  name: c.name,
                                  platform: s.platform,
                                });
                              }}
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
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Endorsements;
