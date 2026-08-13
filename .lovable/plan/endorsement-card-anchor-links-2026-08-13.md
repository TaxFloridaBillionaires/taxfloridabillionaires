# Endorsement Card Anchor Links

## Goal
Give every candidate endorsement card a shareable URL anchor (e.g. `/endorsements#angie-nixon`) so users can link directly to a candidate, and search engines can crawl distinct anchor targets.

## What will change

### Candidate data
- Add a `slug` field to each candidate in `src/data/candidates.ts` derived from the candidate name (e.g. `angie-nixon`, `adam-roberti`).
- Keep the slug URL-safe: lowercase, hyphenated, no special characters.

### Endorsements page
- Set `id={c.slug}` on each `<motion.article>` so the card is a real HTML anchor target.
- Add a small permalink / copy-link button on each card that copies `https://taxfloridabillionaires.com/endorsements#{slug}` to the clipboard and tracks a `endorsements_share_link` event.
- Make the card's role/link interaction compatible with the anchor: clicking the card body still opens the candidate website, but the permalink button is a separate, accessible control.
- Update the scroll spy to also update the browser URL hash to the active candidate as the user scrolls (`history.replaceState` so it doesn't clutter the back button), and on page load jump to the hash target if present.
- Offset the scroll-to-hash so the sticky map doesn't cover the top of the card on mobile or desktop.

### Map interaction
- Keep the existing map click behavior (`selectCandidate`) but ensure it also updates the URL hash to the selected candidate.

### Metadata / social sharing
- Keep the base `canonical` and `og:url` for `/endorsements` when no hash is present. When a hash is active, the page will set `canonical` to the hashed URL via the `Head` component so shared links point to the candidate anchor.

### Sitemap
- No sitemap change needed; anchors are page-level, not separate URLs in the sitemap.

## Verification
- Build passes.
- Visit `/endorsements#angie-nixon` in preview; the page loads and the correct card is centered and active.
- Scroll through the list; the URL hash updates to match the active candidate.
- Click a permalink icon; clipboard receives the correct URL and a toast/copy feedback appears.
- Confirm the anchor `id` appears in the DOM for each card.
