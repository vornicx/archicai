# Asset Provenance — Archic Website

Project mode: `production`

| Asset | Source / owner | Licence / permission | Represents actual client reality? | Production status | Replacement required? |
|---|---|---|---|---|---|
| `/brand/archic-symbol-2026.svg` | Archic | Canonical identity asset | yes | approved | no |
| `/brand/archic-lockup-dark.svg` | Archic | Canonical identity asset | yes | approved | no |
| `/brand/archic-lockup-light.svg` | Archic | Canonical identity asset | yes | approved | no |
| Favicons and install icons in `public/` | Archic | Raster derivatives of the canonical symbol | yes | approved | no |
| `/og-image.png`, `/og-image-en.png` | Archic | Repository-owned social identity cards | yes | approved | no |
| `/software/hospitality-preview.svg` | Archic | Repository-authored white-label derivative | no; fictional product demonstration | approved with visible demo label | no |
| `/software/mobility-preview.svg` | Archic | Repository-authored white-label derivative | no; fictional product demonstration | approved with visible demo label | no |
| `/software/real-estate-preview.svg` | Archic | Repository-authored white-label derivative | no; fictional product demonstration | approved with visible demo label | no |
| Unsplash photo `1RDclPFRD2w` / `photo-1763238273638-3264cf27298a` | Liana S / Unsplash | Unsplash License | no; architectural art-direction material | approved for Archic brand atmosphere only | no |
| Unsplash photo `klzoYhlqIds` / `photo-1776514222617-cd3d0139c926` | Jonas Gerlach / Unsplash | Unsplash License | no; architectural art-direction material | approved for service/editorial imagery | no |
| Unsplash photo `-OTmtUunRlo` / `photo-1778880983920-734f2958475e` | Edgar / Unsplash | Unsplash License | no; architectural art-direction material | approved for service/editorial imagery | no |
| Unsplash photo `WDKmqJZDSvc` / `photo-1770929356223-639d10f7feee` | ionut dobre / Unsplash | Unsplash License | no; representative Puerto Banús yacht/marina photography | approved only when clearly presented as representative/concept imagery | replace with authorised client fleet photography if used as inventory proof |
| `https://www.mafesur.es/wp-content/uploads/2025/09/20200923_132714-1024x498.jpg` | Mafesur public website | public project source used in Archic Mafesur build | yes; Mafesur premises/project context | approved as portfolio context while public source remains valid | archive locally once client master is available |
| `src/assets/concept/work-realestate.jpg` | Unknown from repository evidence | Not documented | no; representative concept only | archived; excluded from production imports | no; do not ship |
| `src/assets/concept/work-bocana.jpg` | Unknown from repository evidence | Not documented | no; representative concept only | archived; excluded from production imports | no; do not ship |
| `src/assets/concept/work-automotive.jpg` | Unknown from repository evidence | Not documented | no; representative concept only | archived; excluded from production imports | no; do not ship |
| `src/assets/concept/archic-*-system.webp` | Unknown from repository evidence | Not documented | no; visual direction only | archived; excluded from current production imports | no; do not ship |
| User-approved generated art-direction reference, 2026-08-31 | OpenAI image generation | reference supplied/approved in conversation | no | reference-only; not shipped as page imagery | no |

## Rules

- Stock/reference photography is art direction, never proof of a client's actual people, premises, products, inventory, fleet, food or outcomes unless the table explicitly says otherwise.
- Marbella Boat Charter representative photography must be labelled so it cannot be read as actual fleet inventory.
- White-label product derivatives retain useful workflow logic while removing identity, credentials, contacts and private operational data.
- Every public demo surface remains labelled as demo/concept where relevant.
- Generated direction imagery remains reference-only unless a future production decision documents source, rights and intended representation.
- `assets.verified: true` applies only to the active production graph. Archived concept files remain deliberately outside that graph.
