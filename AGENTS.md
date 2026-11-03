# Architecture rules

- GitHub Pages deploys the Vite `dist` artifact using Bun and the checked-in text `bun.lock`, with frozen dependency installation; the npm lockfile is not the deployment source of truth because it can lag project dependency changes.
- Preserve the custom-domain CNAME and the SPA 404 fallback in the Pages artifact so the custom domain and client-side deep links remain usable.
- Queue Google Analytics commands as Arguments objects, not arrays, and disable automatic initial page views because the router sends page views explicitly.