# Asset Provenance — Archic Website

Project mode: `production`

| Asset | Source / owner | Licence / permission | Represents actual client reality? | Production status | Replacement required? |
|---|---|---|---|---|---|
| `/brand/archic-symbol-2026.svg` | Archic | Canonical identity asset | yes | approved | no |
| `/brand/archic-lockup-dark.svg` | Archic | Canonical identity asset | yes | approved | no |
| `/brand/archic-lockup-light.svg` | Archic | Canonical identity asset | yes | approved | no |
| Favicons and install icons in `public/` | Archic | Raster derivatives of the canonical symbol; versioned with the 2026 identity | yes | approved | no |
| `/og-image.png`, `/og-image-en.png` | Archic | Repository-owned social identity cards | yes | approved | no |
| `/software/hospitality-preview.svg` | Archic | Repository-authored white-label derivative; embedded canonical Archic symbol | no; fictional product demonstration | approved with visible demo label | no |
| `/software/mobility-preview.svg` | Archic | Repository-authored white-label derivative; embedded canonical Archic symbol | no; fictional product demonstration | approved with visible demo label | no |
| `/software/real-estate-preview.svg` | Archic | Repository-authored white-label derivative; embedded canonical Archic symbol | no; fictional product demonstration | approved with visible demo label | no |
| `src/assets/concept/work-realestate.jpg` | Unknown from repository evidence | Not documented | no; representative concept only | archived; excluded from all production imports | no; do not ship |
| `src/assets/concept/work-bocana.jpg` | Unknown from repository evidence | Not documented | no; representative concept only | archived; excluded from all production imports | no; do not ship |
| `src/assets/concept/work-automotive.jpg` | Unknown from repository evidence | Not documented | no; representative concept only | archived; excluded from all production imports | no; do not ship |
| `src/assets/concept/archic-*-system.webp` | Unknown from repository evidence | Not documented | no; visual direction only | archived; removed from `public/`; excluded from current production imports | no; do not ship |
| Internal generated design concept | OpenAI image generation, 2026-08-28 | Internal direction reference only | no | concept-only; not shipped | no |

## Rules

- A concept asset never appears as proof of actual people, premises, products, inventory, fleet, food or completed work.
- Generated direction imagery remains outside the production bundle.
- White-label product derivatives retain useful workflow logic while removing identity, credentials, contacts and private operational data.
- Every public demo carries an adjacent `DATOS FICTICIOS / DEMO` or `FICTIONAL DATA / DEMO` label.
- `assets.verified: true` applies only to the active production graph. Archived concept files are deliberately outside that graph.
- Production photography requires a named source and written licence/permission before it can be imported by any public route or stylesheet.
