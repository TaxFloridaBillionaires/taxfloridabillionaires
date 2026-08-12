# Update Richest People page copy: tie tax-free status to underfunded schools

## Goal
Revise the "WHY FLORIDA COLLECTS NOTHING FROM THIS WEALTH" section on `/richest-person-in-florida` so it connects Florida's lack of personal income/estate/inheritance taxes to the state's low teacher-pay ranking and school-closure context, strengthening the pro-worker, pro-education argument.

## Current text (src/pages/RichestPeople.tsx lines 172-177)
> Florida has no personal income tax, no estate tax and no inheritance tax. That's the common thread in the relocation stories above: hedge fund and tech fortunes built in California, New York, Illinois and Connecticut, then re-domiciled to Miami and Palm Beach once the tax bill came due.

## Proposed change
Replace that paragraph with copy that keeps the original relocation point and adds the teacher-pay / schools comparison:

> Florida has no personal income tax, no estate tax and no inheritance tax. That's the common thread in the relocation stories above: hedge fund and tech fortunes built in California, New York, Illinois and Connecticut, then re-domiciled to Miami and Palm Beach once the tax bill came due.
>
> The result is a state that courts billionaires while its public schools rank near the bottom nationally in teacher pay — 47th out of 50 — and districts continue to close schools and cut classroom funding. A small annual levy on the wealth listed here could help reverse that underinvestment.

## Scope
- Single-file edit: `src/pages/RichestPeople.tsx`.
- No new dependencies, routes, or backend changes.
- Preserve existing formatting, links, and the second paragraph about Medicaid cuts.

## Open question
Do you want a source link/citation for the "47th out of 50" teacher-pay claim, or any specific wording around school closures (e.g., "districts from Miami-Dade to Duval" or a particular recent closure count)?
