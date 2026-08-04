# Archic website

Marketing site for [archic.es](https://archic.es). Archic designs, develops and
maintains professional websites, internal tools and custom software for
businesses in Spain.

The site is available in Spanish at `/` and in English at `/en/`, with separate
canonical URLs, `hreflang` annotations and localized metadata.

## Legal pages

| Document | Spanish | English |
| --- | --- | --- |
| Legal notice (LSSI-CE art. 10) | `/aviso-legal/` | `/en/legal-notice/` |
| Privacy policy (GDPR arts. 13-14) | `/privacidad/` | `/en/privacy/` |
| Cookie policy (LSSI-CE art. 22.2) | `/cookies/` | `/en/cookies/` |

The texts live in `src/legal/documents.ts` and are rendered by
`src/pages/LegalPage.tsx`. Each URL has a real HTML entry point (registered in
`vite.config.ts`) because GitHub Pages has no SPA fallback.

> **Before going live:** `src/legal/company.ts` still has mandatory
> identification fields set to `null` — legal name, tax ID, registered address,
> phone and Mercantile Registry entry. Until they are filled in, the legal pages
> display a visible "pending" marker instead of the data, and the site does not
> meet article 10 LSSI-CE.

The site sets **no cookies** and makes **no third-party requests**: fonts are
self-hosted via `@fontsource`, and there is no analytics or tracking. That is
why no consent banner is shown. Adding analytics, embedded media or any external
resource means updating the cookie and privacy policies and adding a prior,
granular, revocable consent mechanism.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

GitHub Actions publishes `dist/` to GitHub Pages on push to `main`. Configure the custom domain `archic.es` in the repository Pages settings if needed.
