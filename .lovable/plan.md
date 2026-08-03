# Scroll-Driven 3D Florida Map for /endorsements

Build the endorsements page around a stylized Florida map that tilts, rotates, and pans as you scroll the candidate list, lighting the active candidate's region in gold.

## Experience

- Desktop: map pinned sticky on the left half, candidate cards scroll on the right.
- Mobile: map sticky at the top (about 45vh), cards scroll beneath it.
- Scroll progress drives a faux-3D transform (perspective + rotateX/rotateZ + scale + pan) so the state tilts and swings toward the active region. Motion eases with a spring so it feels weighted, not twitchy.
- The active region fills gold with a soft glow and a pulsing marker at the district center; all other regions dim to a muted navy.
- Regions are stylized zones (northeast, north, central, southeast, southwest) — not exact district boundaries, per your call.
- Respects reduced-motion: transforms drop to simple fades/highlights.

## Candidate cards

Each card, as it scrolls into view, becomes the active one and shows:
- Name, office/district, region label
- Short blurb (optional, when present)
- Website button
- Social icons (X/Twitter, Instagram, Facebook, TikTok, YouTube, LinkedIn) — only the ones a candidate actually has

Clicks on website and social links keep the existing `trackEvent` analytics.

## What I need from you

I don't have social handles for the five candidates (Oliver Larkin, Angie Nixon, Elijah Manley, Ben Braver, Britt Robinson). Options:
- You send the links and I fill them in, or
- I ship with website-only and you add socials later, or
- I research each campaign site and pull whatever public profiles are linked.

Tell me which and I'll proceed accordingly.

## Technical notes

- New `src/components/FloridaMap.tsx`: inline SVG of Florida split into five region paths (single `<svg>`, semantic color tokens only — gold for active, muted for inactive).
- Scroll driving via framer-motion `useScroll` + `useSpring` on the cards container; an IntersectionObserver (or scroll-index math) sets the active candidate index.
- `src/data/candidates.ts` gains optional `socials?: { platform: string; url: string }[]` and keeps existing `region` / `center` fields, which the map already expects.
- `src/pages/Endorsements.tsx` restructured into the sticky-map + scrolling-list layout; existing `Head` SEO tags retained, canonical unchanged.
- Social icons come from `lucide-react`; no new dependencies.
- Sitemap gets `/endorsements` added.
