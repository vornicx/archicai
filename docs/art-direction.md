# Art Direction Brief — Archic Website

Date: 2026-08-28
Author: Archic / implementation pass

## 1. Asset audit

| Asset | Resolution | Rights evidence in repository | Verdict | Notes |
|---|---:|---|---|---|
| `/brand/archic-symbol-2026.svg` | Vector | Archic canonical identity manifest | identity | Canonical mark. |
| `/brand/archic-lockup-dark.svg` | Vector | Archic canonical identity manifest | identity | Used on mineral/light surfaces. |
| `/brand/archic-lockup-light.svg` | Vector | Archic canonical identity manifest | identity | Used on dark surfaces. |
| `/software/hospitality-preview.svg` | Vector | Authored in repository; commit history present | hero + supporting | White-label product proof; fictional data label required. |
| `/software/mobility-preview.svg` | Vector | Authored in repository; commit history present | supporting | White-label product proof; fictional data label required. |
| `/software/real-estate-preview.svg` | Vector | Authored in repository; commit history present | supporting | White-label product proof; fictional data label required. |
| `src/assets/concept/work-realestate.jpg` | 1600×1200 | Source/licence not documented | archived concept-only | Excluded from every production import. |
| `src/assets/concept/work-bocana.jpg` | 1600×1200 | Source/licence not documented | archived concept-only | Excluded from every production import. |
| `src/assets/concept/work-automotive.jpg` | 1600×1200 | Source/licence not documented | archived concept-only | Excluded from every production import. |
| `src/assets/concept/archic-*-system.webp` | Raster set | Source/licence not documented | archived concept-only | Removed from `public/`; excluded from the current production graph. |
| Generated direction concept | 1024×1536 | Generated for internal composition reference | unusable in production | Never shipped or presented as documentary evidence. |

Totals: hero-capable product UI 1 · supporting product UI 2 · canonical identity 3 · archived concept photography 7 · production-unusable generated concept 1.

## 2. Gap analysis

| Need | Have | Gap | Resolution |
|---|---|---|---|
| Hero | Archic-authored white-label interface | No documentary photography required | Lead with Type + Data. |
| Establishing | Product-system narrative | None for current direction | Use editorial composition. |
| Human | Founder contact details, no approved portrait set | Portrait evidence absent | Do not manufacture portraiture; keep direct named contact. |
| Product | Three white-label SVG interfaces | None | Mark data as fictional. |
| Texture | Mineral paper colour | None | No raster texture required. |

Decision: **design around the photography gap**. Product UI is more truthful to Archic's offer than representative lifestyle imagery.

## 3. Direction

Exact black/gold Archic identity on mineral paper, composed as an editorial technical dossier where operational interfaces are the primary evidence.

Explicitly not: generic luxury black, decorative serif, gradients, glow, glass, stock office imagery, floating 3D devices, feature-card grids or unlabeled metrics.

## 4. Ratio system

| Context | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero proof | flexible panel, minimum 540 px | 16:10 | cropped 1.35:1 viewport |
| Work interface | 3:2 | 3:2 | 4:3 |
| Product demo | 16:10 | 16:10 | horizontally simplified |

## 5. Crop plan

| Asset | 1440 | 1024 | 768 | 375 | Focal point |
|---|---|---|---|---|---|
| Hospitality preview | full interface | full interface | full interface | left navigation + primary table | booking state and metric |
| Mobility preview | full interface | full interface | full interface | left/top operational view | availability states |
| Real-estate preview | full interface | full interface | full interface | left/top operational view | portfolio + CRM relationship |

All product assets use `object-position: top left`; mobile deliberately crops secondary UI rather than scaling text below legibility.

## 6. Sign-off state

- [x] Canonical identity assets identified.
- [x] Product demos contain fictional white-label data.
- [x] No active production route depends on unknown-provenance photography.
- [x] Generated concept excluded from production assets.
- [x] Legacy JPG and WebP sets moved outside `public/` and active imports.
- [ ] Every product interface crop visually checked at all six quality-gate widths.
