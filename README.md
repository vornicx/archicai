# Archic website

Marketing site for [archic.es](https://archic.es). Archic designs, develops and
maintains professional websites, internal tools and custom software for
businesses in Spain.

The site is available in Spanish at `/` and in English at `/en/`, with separate
canonical URLs, `hreflang` annotations and localized metadata.

## Generated files — do not edit by hand

Every HTML entry point, the sitemap and the plain-text summaries for AI
assistants are produced by `scripts/generate-static-pages.ts` from the sources
in `src/`. GitHub Pages has no SPA fallback, and most social and AI crawlers do
not run JavaScript, so the full `<head>` (title, description, canonical, Open
Graph, JSON-LD) has to be in the served HTML rather than only in react-helmet.

```bash
npm run gen:pages   # requires bun
```

| Output | Source of truth |
| --- | --- |
| `index.html`, `en/index.html` | `src/i18n/content.ts` + `src/seo/homeSchema.ts` |
| `<landing>/index.html` | `src/seo/servicePages.ts`, `src/seo/localPages.ts` |
| `aviso-legal/`, `privacidad/`, `cookies/` (+ `en/`) | `src/legal/documents.ts` |
| `public/sitemap.xml` | all of the above; `lastmod` comes from the last git commit that touched each source file |
| `public/llms.txt`, `public/llms-full.txt` | `src/i18n/content.ts` + landing data |

CI runs `gen:pages` before `build`, so the served head can never drift from the
copy in `src/`. That step needs the full git history — the deploy workflow
checks out with `fetch-depth: 0` for the sitemap dates.

## Artwork

All imagery is vector and self-made, in `src/art/`: the round-arch motif that
gives the brand its name, the service glyphs, the project mockups and the
process diagram. No stock photography, no icon fonts, no third-party requests,
nothing to attribute. The only raster asset is the hero photograph.

## Legal pages

| Document | Spanish | English |
| --- | --- | --- |
| Legal notice (LSSI-CE art. 10) | `/aviso-legal/` | `/en/legal-notice/` |
| Privacy policy (GDPR arts. 13-14) | `/privacidad/` | `/en/privacy/` |
| Cookie policy (LSSI-CE art. 22.2) | `/cookies/` | `/en/cookies/` |

The texts live in `src/legal/documents.ts` and are rendered by
`src/pages/LegalPage.tsx`.

> **Before going live:** `src/legal/company.ts` still has mandatory
> identification fields set to `null` — legal name, tax ID, registered address,
> phone and Mercantile Registry entry. Until they are filled in, the legal pages
> display a visible "pending" marker instead of the data, and the site does not
> meet article 10 LSSI-CE. See [`docs/LANZAMIENTO.md`](docs/LANZAMIENTO.md) for
> the full pre-launch checklist, including Search Console and Google Business
> Profile.

The site sets **no cookies** and makes **no third-party requests**: fonts are
self-hosted via `@fontsource`, and there is no analytics or tracking. That is
why no consent banner is shown. Adding analytics, embedded media or any external
resource means updating the cookie and privacy policies and adding a prior,
granular, revocable consent mechanism.

`public/robots.txt` deliberately allows AI crawlers (GPTBot, ClaudeBot,
PerplexityBot, Google-Extended and others) so that assistants can cite the site.

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
