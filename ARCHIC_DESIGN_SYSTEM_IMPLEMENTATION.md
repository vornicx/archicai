# Archic Website — Design System 1.0 implementation

Date: 2026-08-28
Mode: `production`
Foundation: `1.0.0`

This repository implements the new Archic standard as an explicit project contract, not as a visual preset. Quality is shared; appearance is decided from Archic's own content, brand truth and product evidence.

## Binding files

- [`project.config.json`](project.config.json) — project mode, Direction Vector, archetypes, asset policy and exceptions.
- [`docs/brand-brief.md`](docs/brand-brief.md) — audience, promise, voice and identity invariants.
- [`docs/direction-vector.md`](docs/direction-vector.md) — scored visual decision and anti-slop register.
- [`docs/art-direction.md`](docs/art-direction.md) — asset audit, gap decision, ratios and crop rules.
- [`docs/asset-provenance.md`](docs/asset-provenance.md) — source, rights status and production eligibility for visual assets.
- [`docs/qa-signoff.md`](docs/qa-signoff.md) — blocking quality-gate evidence and unresolved findings.

## Reference implementation decisions

1. The canonical Archic identity remains `/brand/archic-symbol-2026.svg` and the dark/light lockups in `/brand/`.
2. Canonical identity colours remain `#0A0A0B` and `#C9A56A`. Paper surfaces may vary; the mark and its relationship do not. Small gold text uses an accessible dark functional derivative while identity assets and filled brand controls retain canonical gold.
3. The home uses Type + Data as the lead medium. Product proof appears in the first viewport and is visibly marked as fictional/demo data.
4. Presence, Control and Business form one interactive system switcher instead of three isolated marketing cards.
5. The primary composition is Editorial Spread; Dossier is used for system layers, method, prices and QA.
6. The previous black + decorative serif + gold luxury shorthand is rejected. Archic branding is preserved through canonical assets, colour and precision, while typography and composition remain technical and contemporary.
7. Unknown-provenance photography is excluded from the active production graph. Archic-authored white-label SVG interfaces are used instead across home, product and exploration proof.

## Release rule

The change is eligible to ship only after `docs/qa-signoff.md` has no blocking findings and the production commands complete:

```bash
npm run gen:pages
npm run build
npm run quality:gate
```

Manual render checks are required at 320, 375, 768, 1024, 1440 and 2560 px, with keyboard, reduced motion and 200% zoom checks.
