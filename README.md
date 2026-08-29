# Archic — Digital Systems

[Archic](https://archic.es) is a Spanish digital systems studio based in Écija, Sevilla. We design the digital presence customers see, build private systems teams use to run the business, and develop custom software, automations and integrations when standard tools are not enough.

Archic serves businesses across Spain. Geographic pages such as Sevilla or Marbella describe markets served; they do **not** represent additional offices or physical branches.

## What Archic does

### Archic Presence
Premium digital presence for businesses where perception, experience and conversion matter.

- Digital direction
- Premium web design and custom development
- Mobile and responsive experience
- Content architecture
- Technical SEO and GEO
- Booking, catalogue and enquiry integrations

### Archic Control
Private operating systems built around how each business actually works.

- Customers and profiles
- Bookings and enquiries
- Resources and availability
- Internal operations and statuses
- CRM and follow-up
- Management of properties, vehicles, tables or other sector-specific resources

### Archic Business
Custom software for processes, automation, integrations and data.

- Internal applications
- Custom business software
- Automations
- System integrations
- Private portals
- Data and reporting
- Replacement of manual processes, spreadsheets and poorly fitting off-the-shelf software

## Official identity

- **Name:** Archic
- **Alternate name:** Archic Digital Systems
- **Official website:** https://archic.es/
- **Operational base:** Écija, Sevilla, Andalucía, Spain
- **Service area:** Spain
- **Languages:** Spanish and English
- **Email:** vornic@archic.es
- **Phone:** +34 644 76 85 15

Archic is not positioned as a generic marketing agency or a website factory. The model connects three layers of a company’s digital system: what the customer sees, what the team uses internally, and the software that connects or improves both when there is a clear business reason.

Sector references in this repository describe target markets and solution types. They should not be interpreted automatically as published clients or case studies.

---

## Website repository

This repository contains the marketing site for [archic.es](https://archic.es).

The site is available in Spanish at `/` and in English at `/en/`, with separate canonical URLs, `hreflang` annotations and localized metadata.

## Archic Design System 1.0

Every production change is governed by [`project.config.json`](project.config.json) and the Markdown evidence linked from [`ARCHIC_DESIGN_SYSTEM_IMPLEMENTATION.md`](ARCHIC_DESIGN_SYSTEM_IMPLEMENTATION.md). The project contract fixes the Foundation version, Direction Vector, composition archetypes, asset policy and documented exceptions.

The current Archic identity is canonical: `/brand/archic-symbol-2026.svg`, the dark/light lockups in `/brand/`, Archic black `#0A0A0B` and Archic gold `#C9A56A`. New visual direction may change composition and art direction, but it must not invent a replacement brand.

## Generated files — do not edit by hand

Every HTML entry point and the sitemap are produced by the static-page generation pipeline from sources in `src/`. Public AI summaries (`public/llms.txt` and `public/llms-full.txt`) are maintained as the explicit current identity corpus for assistants and crawlers.

```bash
npm run gen:pages
```

| Output | Source of truth |
| --- | --- |
| `index.html`, `en/index.html` | `src/i18n/content.ts` + `src/seo/homeSchema.ts` |
| `<landing>/index.html` | `src/seo/servicePages.ts`, `src/seo/localPages.ts`, `src/seo/intentPages.ts` |
| `aviso-legal/`, `privacidad/`, `cookies/` (+ `en/`) | `src/legal/documents.ts` |
| `public/sitemap.xml` | indexed site routes |
| `public/llms.txt`, `public/llms-full.txt` | current Archic entity and product model |

## Legal pages

| Document | Spanish | English |
| --- | --- | --- |
| Legal notice | `/aviso-legal/` | `/en/legal-notice/` |
| Privacy policy | `/privacidad/` | `/en/privacy/` |
| Cookie policy | `/cookies/` | `/en/cookies/` |

`src/legal/company.ts` intentionally keeps unverified legal-registration fields empty until the corresponding legal identity exists. No legal name, tax ID, registered address or Mercantile Registry data is invented.

## AI and search discovery

`public/robots.txt` allows search and AI discovery crawlers, including OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot and Google-Extended. The site also exposes `llms.txt`, structured data, canonical URLs and a sitemap so that external systems receive the same identity consistently.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
npm run quality:gate
```
