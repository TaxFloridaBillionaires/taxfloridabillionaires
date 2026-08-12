# Endorsement Press Release + Panhandle Addition

## Panhandle research result

Five Panhandle/North Florida progressives surfaced, and all five get added:

1. **Amanda Marie Green** — U.S. House, FL-2, Tallahassee. Own site: "making the economy work for everyday folks, not billionaires." Florida AFL-CIO endorsed via the Northwest Florida Federation of Labor. amgforcongress.com, Instagram @amgforcongress.
2. **Brice Barnes** — U.S. House, FL-2, Tallahassee. Union leaders and Democratic organizers behind her; platform framed on "life simply isn't working for people in North Florida." bricebarnes.com, Facebook + Instagram.
3. **Gay Valimont** — U.S. House, FL-1, Gulf Breeze / Pensacola. Affordability, insurance costs, healthcare access, full-service VA hospital. gayforcongress.com, ActBlue, Facebook + Instagram.
4. **Johnny Austin Thompson** — FL House District 2, Pensacola / Escambia. "Good jobs... a representative working for all of us — not just the well-connected." standwithjohnny.com, ActBlue.
5. **Jasmine Brown** — Mayor of Pensacola. "Pensacola for the people, not the developers" — working people struggling while landlords and developers get richer. jasminebrownformayor.com.

Only Green has explicit billionaire language; the other four are pro-worker/affordability candidates and their blurbs will say what they actually campaign on rather than implying a wealth-tax stance they haven't stated. No qualifying candidates were found in FL-3 or the rural Panhandle state seats.

Unverified items handled conservatively: Green's and Barnes's direct ActBlue slugs, Jasmine Brown's donation link and socials, and Thompson's socials aren't confirmed — those buttons are omitted rather than guessed. The card layout already supports website-only entries.

## What gets built

**1. Add all five to the endorsements page and map**
Green and Barnes (FL-2, Tallahassee, center -84.28/30.44) and Valimont (FL-1, Pensacola, center -87.22/30.44) join the Federal group; Thompson joins State Legislature (Pensacola center); Brown joins Local (Pensacola center). All five use region `north`, which is currently unused — so the Panhandle zone of the map will now highlight on scroll and become a clickable region.

**2. Press release document**
A single combined slate announcement in standard endorsement/press-release form, delivered as a downloadable DOCX (US Letter, Arial), covering all 17 candidates.

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
