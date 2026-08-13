# Endorsement Slate Cards (1080 x 1350)

A remix of the Angie Nixon card style — black background with the wavy line texture, gold hand-drawn stars, condensed white/gold type — rendered as social-ready 1080 x 1350 PNGs. No photos: names and offices carry the design.

## What gets produced

1. **Master slate card** — all 19 endorsed candidates on one card.
   - Header: ENDORSED BY / TAX (white) FLORIDA (gold) BILLIONAIRES (cream)
   - Body: candidates grouped by level (Federal, State Legislature, Local), each as NAME in condensed bold with the office in small gold caps underneath, arranged in a two-column grid sized so nothing clips.
   - Footer: `WWW.TAXFLORIDABILLIONAIRES.COM` plus the boxed disclaimer "PAID FOR BY TAX FLORIDA BILLIONAIRES, NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATE'S COMMITTEE".
   - Gold star accents and the background wave texture, kept sparse so the 19 names stay legible.

2. **19 per-candidate cards** — one per candidate, closely following the Angie layout minus the portrait:
   - Big first name (white), last name below, `ENDORSED BY / TAX FLORIDA BILLIONAIRES` stack, then `as Florida's Next <Office>` with the office word in gold and underlined.
   - Same footer URL and disclaimer band.
   - Filenames by slug, e.g. `angie-nixon.png`.

## Technical notes

- Generation script in Python with Pillow, reading candidate name/role/level straight from `src/data/candidates.ts` (parsed once into a JSON list inside the script) so the slate always matches the site.
- Fonts from the bundled canvas font set: a condensed/bold display face for names, a clean sans for offices and the disclaimer.
- Palette pulled from the site tokens: near-black background, gold accent, cream text.
- Stars and wave texture drawn programmatically (vector paths, slight rotation jitter) rather than sourced images, so they scale cleanly.
- Output: `/mnt/documents/endorsement-cards/slate-2026.png` plus `/mnt/documents/endorsement-cards/<slug>.png`, and the editable script saved alongside as `generate_cards.py`.
- QA: every generated PNG is inspected for clipped text, overlap, and margin violations before delivery; the script is re-run until clean.

## Not included

- No changes to the site itself — this is artwork output only.
