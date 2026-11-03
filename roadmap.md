# Deployment repair

- [x] Correct Google Analytics command format; Google accepted initial and navigated page views with HTTP 204 in browser verification, and three regression tests passed.
- [ ] Verify the corrected tracking reaches the GitHub-hosted site — awaiting automatic code sync and GitHub deployment after this edit.

- [x] Validate the locked dependency installation used by GitHub Pages.
- [x] Verify the corrected workflow reaches GitHub and completes successfully.
- [x] Provide Namecheap website record changes while preserving existing email and verification records.
- [x] Confirm taxfloridabillionaires.com as GitHub Pages custom domain; HTTP serves the built app from GitHub.
- [x] Enable HTTPS when available — certificate issued Nov 2 2026; Enforce HTTPS on; http redirects to https://www.
- [x] Add the www CNAME at Namecheap — user added www → taxfloridabillionaires.github.io; apex and www both resolve to GitHub Pages.