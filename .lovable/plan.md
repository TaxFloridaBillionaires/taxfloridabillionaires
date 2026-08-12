# Endorsement Press Release + Panhandle Addition

## Panhandle research result

Five Panhandle/North Florida progressives surfaced. Applying your filter — only candidates with explicit "tax the billionaires / not billionaires" language on their own campaign material — exactly one qualifies:

**Amanda Marie Green** — U.S. House, FL-2, Tallahassee / North Florida
- Own site (Top Priorities): "making the economy work for everyday folks, not billionaires, is why she wants to represent us."
- Endorsed by the Florida AFL-CIO via the Northwest Florida Federation of Labor.
- Site: amgforcongress.com. Instagram: @amgforcongress. Donation: ActBlue listing for FL-02 (will link her site's donate page if the direct ActBlue slug can't be confirmed).

Not added (no billionaire/wealth-tax language on their own sites): Brice Barnes (FL-2), Gay Valimont (FL-1), Johnny Austin Thompson (FL House 2), Jasmine Brown (Pensacola mayor — anti-developer framing, not tax language). No qualifying candidates found in FL-3 or the rural Panhandle state seats.

## What gets built

**1. Add Amanda Marie Green to the endorsements page**
Appended to the federal group in the candidate data, region `north`, center near Tallahassee (-84.28, 30.44), area "Tallahassee / North Florida", with her billionaire-tax blurb and Instagram. This is the first `north` region candidate, so the map's Panhandle zone will now light up on scroll.

**2. Press release document**
A single combined slate announcement in standard endorsement/press-release form, delivered as a downloadable DOCX (US Letter, Arial), covering all 13 candidates.

Structure:
- FOR IMMEDIATE RELEASE + date, contact line placeholder
- Headline: Tax Florida Billionaires Endorses 13-Candidate 2026 Slate
- Dateline and lede: the endorsement, the number, the through-line ($1.4T in Florida billionaire wealth in a state ranked 47th in teacher pay)
- Supporting paragraph on the wealth-migration trend and what a modest levy would fund
- Quote block attributed to Tax Florida Billionaires (placeholder spokesperson name for you to fill)
- Slate list grouped Federal / State Legislature / Local: name, office, area, one line on why
- Boilerplate "About Tax Florida Billionaires" paragraph
- Required disclaimer: "Paid for by Tax Florida Billionaires, not authorized by any candidate or candidate's committee."
- Closing ### mark

## Technical notes

- `src/data/candidates.ts`: one new entry; no schema change needed (`north` region already exists in the union type).
- Press release generated with the `docx` library via a throwaway script, written to `/mnt/documents/tax-florida-billionaires-endorsement-release.docx`, then rendered to images and visually checked page by page before delivery.
- Any name, phone or email the release needs from you is left as a clearly bracketed placeholder rather than invented.
- No press-release page is added to the site (document only, per your choice).
