# Archic website

Marketing site for [archic.es](https://archic.es). Archic designs, develops and
maintains professional websites, internal tools and custom software for
businesses in Spain.

The site is available in Spanish at `/` and in English at `/en/`, with separate
canonical URLs, `hreflang` annotations and localized metadata.

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
