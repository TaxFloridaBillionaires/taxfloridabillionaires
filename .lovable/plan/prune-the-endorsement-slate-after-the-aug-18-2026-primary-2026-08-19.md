# Prune the Endorsement Slate After the Aug 18, 2026 Primary

Florida's primary was held August 18, 2026. Based on news reporting, most of the slate did not advance. Candidates who lost get removed entirely from the endorsements page, the map, and the press release. Winners keep their cards as-is (no new badges).

## Confirmed results

**Advancing to November — keep**

- Angie Nixon (U.S. Senate) — won the Democratic primary, faces Ashley Moody
- Amanda Marie Green (FL-02) — won a four-way field with ~33%
- Gay Valimont (FL-01) — unopposed nominee, faces Jimmy Patronis
- Nicole Locklin (FL-26) — sole Democrat on the ballot
- Johnny Austin Thompson (FL House 2) — unified Democratic nominee

**Race not on the Aug 18 ballot — keep**

- Anna V. Eskamani (Mayor of Orlando) — Orlando's mayoral election is Nov 2, 2027
- Adam Roberti (Hollywood City Commission D5) — Hollywood municipal election is Nov 3, 2026

**Lost — remove**

- Brandt Robinson (FL-13) — lost to Leela Gray
- Britt Robinson (FL-04) — lost to L.J. Holloway
- Jon Harris (FL-16) — lost to Kelly Kirschner
- Elijah Manley (FL-20) — lost to Debbie Wasserman Schultz
- Oliver Larkin (FL-25) — lost to Jared Moskowitz
- Bernard Taylor (FL-21) — lost narrowly to James Martin
- Brice Barnes (FL-02) — lost to Amanda Marie Green
- Jayden D'Onofrio (FL House 102) — lost to Mike Friend
- Antione Fields (FL House 21) — lost by 174 votes to Jackie Randall
- Jasmine Brown (Mayor of Pensacola) — D.C. Reeves won outright with 53.45%

**Unverified — resolve before removing**

- Ben Braver (FL House 65, Hillsborough) (keep on list)
- Rey Sordo (FL House 119, Miami-Dade) (keep on list)

Both were on the Aug 18 ballot but no result surfaced in news coverage. First step of the build is a targeted check of the county Supervisor of Elections results for these two races. If either lost, they are removed with the rest; if either won or the result still can't be confirmed, they stay and I'll flag it.

Result: the slate goes from 19 to 7 candidates (9 if Braver and Sordo stay).

## Changes

1. `src/data/candidates.ts` — delete the entries for every removed candidate.
2. `src/pages/Endorsements.tsx` — no structural change needed; the level grouping and map-scroll logic are driven off the `candidates` array. Verify the Federal / State Legislature / Local headings still render correctly when a level has only one entry, and that the sticky map tracking works with a much shorter list.
3. `src/components/FloridaMap.tsx` — remove or repoint any region highlight tied only to a removed candidate so no region highlights an empty slot.
4. `src/pages/Press.tsx` — rewrite the press release for the post-primary slate: new candidate count, drop the removed names from the list and from any quote or regional callout, and reframe the intro as a general-election slate rather than a primary endorsement slate.
5. Sanity check the endorsements page in the browser at mobile and desktop widths after the cut.

## Notes

- The generated social cards in the downloads folder are not regenerated as part of this change; say the word if you want a refreshed slate card for the 7-candidate lineup.
- No database or backend changes — candidate data is a static file.