# Ten More Spending Options + Carl Icahn

## Carl Icahn: yes, add him

Carl Icahn is a Florida resident — he moved from New York and both he and Icahn Enterprises are based in Sunny Isles Beach, Florida. Forbes currently puts him at roughly $3.8B, which is above Howard Schultz ($3.5B), already the last entry on the list.

Card details to add:
- Name: Carl Icahn, $3.8B, Icahn Enterprises, Finance
- City: Sunny Isles Beach; moved from New York, NY in 2020
- Why moved: relocated himself and his firm from Manhattan to Florida, widely reported as a tax-driven move
- Total wealth pool updates from $1,399B to $1,403B

## Ten new "Spend the Money" options

Each uses a Florida-specific cost. Items flagged "verify" get one confirming source check before the numbers go live; anything that can't be confirmed gets dropped rather than guessed.

Education
1. Free school breakfast and lunch — $0.9M per 1,000 students for a full year (Florida meal costs, roughly $900/student/yr). Context: districts are raising lunch prices again in 2026.
2. Summer food benefits (SUN Bucks) — $1.2M per 10,000 children ($120 per child). Context: Florida opted out of the federal program.
3. Bright Futures-style full tuition scholarship — $0.0064M per student per year (~$6,400 average in-state tuition and fees). Verify.
4. After-school and summer program site — $0.25M per site per year. Verify.

Healthcare
5. Mobile mental health crisis response team — $1M per team per year. Verify.
6. School nurse — $0.06M per nurse per year (~$60K).

Housing and storm safety
7. Home hardening grants (My Safe Florida Home model) — $1M per 100 homes ($10,000 per home).
8. Hurricane shelter upgrade for a public school — $2M per school. Verify against the state's shelter-retrofit analysis.

Infrastructure and environment
9. Everglades and water quality restoration project — $50M per project. Verify.
10. Electric school bus replacement — $0.375M per bus. Verify.

## Technical notes

- `src/data/gameData.ts`: append one `Billionaire` entry for Icahn, bump `totalBillionaireWealth` to 1403, and append the ten `SpendingItem` entries using existing categories (education, healthcare, housing, infrastructure, jobs).
- No component changes needed — `SpendingGame.tsx` renders by category automatically, and the small per-unit costs already work with the existing step logic and money formatting.
