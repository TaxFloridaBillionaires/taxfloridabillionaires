## Goal

Update the candidate URLs in the voter side panel to match the links provided.

## Changes

In `src/components/VoterPanel.tsx`, update the `candidates` array:

- **Angie Nixon**: keep `https://angienixon.com` (already correct).
- **Oliver Larkin**: change from `https://oliverforcongress.com` to `http://oliverforcongress.com`.

## Verification

- Read back `src/components/VoterPanel.tsx` after the edit to confirm both URLs match.
- No other files touched.
