# Archic Website — Agent Contract

AAA Design is mandatory for every visual/UI change in this repository, including small changes.

## Authority

1. Verified business truth, legal/SEO/i18n/accessibility and production behavior.
2. Canonical Archic brand assets and colors documented in `README.md` / `project.config.json`.
3. Active project art direction in `AAA_VISUAL_DIRECTION.md`.
4. Central AAA Design process in `vornicx/archic-design-system`.
5. Framework/component libraries are implementation sources only.

## Small visual changes

Do **not** restart art direction. Read `AAA_VISUAL_DIRECTION.md`, preserve its creative platform and visual world, then run an authorship/slop sweep on every affected viewport.

A small change must not introduce generic cards, pills, gradients, icon tiles, blanket reveal animations, library-demo styling or another AI-default cluster.

## Substantial redesign / new visual chapter

Use this order before full production UI:

```text
truth → exactly 3 territories → creative platform → visual world → rendered signature prototype → storyboard → asset production matrix → system extraction → implementation → rendered critique → subtraction
```

Hard rules:
- exactly three materially different territories before replacing the active direction;
- materialize the signature before extracting a design system;
- critical assets cannot remain hypothetical while the whole page is built;
- use real Archic/project material before generic illustration;
- mobile retains/recomposes art direction;
- no invented proof;
- component libraries never become identity;
- build success does not replace rendered visual QA.

## Active Archic visual world

Read `AAA_VISUAL_DIRECTION.md` before touching the homepage.

Current platform: **Every digital layer, visibly under direction.**

Current signature: **Supervised System Field** built from real concept-build previews, Presence/Control/Business layers and QA/construction marks.

Do not silently replace this with dark-tech, editorial-cream, glass, random 3D, generic dashboard or Awwwards-style effects.

## Required completion checks

Run the repository's applicable commands:

```bash
npm run build
npm run quality:gate
```

Also inspect rendered desktop + mobile, reduced motion, contact/critical paths, and compare against the active Visual Direction Bible. If the site feels more complex but not more authored, subtract and revise.
