# Expand Endorsements: Florida Pro-Worker Candidates

Research found 9 additional Florida candidates (federal, state legislative, local) with documented pro-worker or tax-the-wealthy platforms. Below is the ranked list, then what gets built.

## Most pro-worker (ranked)

**Tier 1 — explicit "tax billionaires / tax the rich" language**

1. **Nicole Locklin** — US House FL-26, Miami-Dade. Runs on "Tax billionaires. No corporate PAC $." Site: "working people aren't told to accept poverty while corporations and billionaires keep raking it in." Strongest direct match to this site's message.
2. **Brandt Robinson** — US House FL-13, Pinellas (St. Pete/Clearwater). 29-year public school teacher; wrote "It's not radical to say that billionaires MUST pay their fair share."
3. **Mike Sell** — US House FL-4, Jacksonville. Platform literally lists "Tax the rich," higher wages, end price gouging, UBI. Donation link unverified (see below).

**Tier 2 — deepest actual worker record / union rights**

4. **Anna V. Eskamani** — Mayor of Orlando. Sitting state rep with a real delivery record: Medicaid expansion push, unemployment reform, anti-eviction work, earned sick time, paid parental leave, pro-union. No billionaire-tax slogan, but the strongest track record of the group.
5. **Jayden D'Onofrio** — FL House 102, Broward. Best union language found: repeal anti-union legislation, defend the voter-approved $15 minimum wage, paid family and medical leave, Medicaid expansion.
6. **Antione Fields** — FL House 21, Alachua/Marion. "Good Jobs and Worker Power" platform: raise wages, universal healthcare, expand Medicaid, no corporate PAC or lobbyist money.

**Tier 3 — affordability-focused, weaker tax framing**

7. **Rey Sordo** — FL House 119, South Miami-Dade. Service worker; wage transparency, workforce housing, renter protections.
8. **Jon Harris** — US House FL-16, Tampa Bay/Manatee. Affordability, child tax credits, paid leave — centrist tone, no wealth-tax language.
9. **Todd Schaefer** — US House FL-4, Nassau/Duval. No Party Affiliation; pro-union issue page but otherwise off-message. Recommend excluding.

## What I'd build

Add Tiers 1 and 2 (six candidates: Locklin, Brandt Robinson, Sell, Eskamani, D'Onofrio, Fields) to the endorsements page in the same format as the existing five: name, office, area, region, blurb, website button, Donate button, social icons. Tier 3 held back unless you want breadth over message fit.

Grouping: the page currently lists candidates in one flat scroll. With 11 candidates I'd add section headings — **Federal**, **State Legislature**, **Local** — so the list stays readable, with the map behavior unchanged.

Map: each new candidate gets a region and approximate center so the Florida map highlights correctly (Miami-Dade → southeast, Pinellas/Tampa → central, Jacksonville → northeast, Orlando → central, Broward → southeast, Alachua/Marion → central/north).

## Verification before publishing

- **Mike Sell's donation link is unconfirmed** — ActBlue searches for FL-4 progressives returned pages branded for Britt Robinson (already on the site). I'll confirm from his own site or omit the Donate button for him rather than link the wrong page.
- **Social handles are unconfirmed** for Sell, Fields, D'Onofrio, and partially Sordo/Harris. I'll include only handles I can verify; the card layout already handles candidates with website-only.
- District centers are metro-center approximations, consistent with how the existing five are placed.

## Technical notes

- `src/data/candidates.ts`: append the new entries; add an optional `level: "federal" | "state" | "local"` field for section grouping.
- `src/pages/Endorsements.tsx`: group the card list by `level` with headings; `cardRefs` indexing and the IntersectionObserver active-index logic stay keyed to the flat `candidates` array so the map still tracks scroll.
- `src/components/FloridaMap.tsx`: unchanged. With multiple candidates per region, region click targets currently pick the first candidate in that region — that behavior stays.
- No new dependencies.

## Question

Include Tier 3 (Sordo, Harris) as well, or keep it to the six strongest?
