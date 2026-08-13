# Candidate Endorsement Graphics

Generate shareable 1080x1350 endorsement graphics, one per endorsed candidate, in the style of the Angie Nixon sample. Build and review Oliver Larkin first, then produce the rest after approval.

## Card design

Same layout language as the sample:

- Dark navy/black background with the subtle wavy line texture.
- Candidate first name huge in white, last name below in a lighter weight.
- Gold "ENDORSED BY" over "TAX FLORIDA BILLIONAIRES" (gold "FLORIDA" line).
- "as Florida's Next ____" with the office in gold, underlined.
- Headshot cut out and placed on a white starburst badge (white background behind the photo only).
- Gold hand-drawn stars scattered around.
- `WWW.TAXFLORIDABILLIONAIRES.COM` across the bottom.
- Boxed disclaimer: "PAID FOR BY TAX FLORIDA BILLIONAIRES, NOT AUTHORIZED BY ANY CANDIDATE OR CANDIDATE'S COMMITTEE".

## Office / district line

For each candidate, use whichever label fits the space best, chosen per candidate:

- Federal: district form when short — "Florida's Next Congresswoman" for FL-25 style seats, or "FL-25's Next Representative".
- State House: "Florida's Next State Representative" (district number in a smaller line if it fits).
- Local: the actual office — "Orlando's Next Mayor", "Hollywood's Next Commissioner".

Oliver Larkin is FL-25 (Broward / Palm Beach), so the test card reads "as Florida's Next Congressman" with FL-25 as the supporting line.

## Photos

Scrape each candidate's official campaign site for the headshot (Oliver Larkin: oliverforcongress.com). Cut the subject out onto a transparent background, then composite onto the white starburst. If a site blocks scraping or has no usable headshot, that candidate is flagged and skipped rather than given a wrong or low-res photo.

## Process

1. Scrape Oliver Larkin's site, pull the best headshot, cut it out.
2. Render the card and inspect the rendered image for clipping, overflow, bad cutout edges, and correct text.
3. Deliver the Oliver Larkin card for your review.
4. On approval, batch-generate the remaining candidates from `src/data/candidates.ts` and deliver all files, with a list of any candidates whose photo could not be sourced.

## Technical notes

- Graphics are generated in the sandbox (headless render of an HTML/CSS template at 1080x1350, exported to PNG) and written to `/mnt/documents/endorsement-cards/`.
- No changes to the site itself — this is an artifact deliverable, not an app change.
- Fonts approximate the sample: heavy geometric sans for names, condensed bold for the endorsement block, serif italic-free display for the "Florida's Next" line.
- Candidate names, offices and areas come from `src/data/candidates.ts` so the copy stays in sync with the endorsements page.
