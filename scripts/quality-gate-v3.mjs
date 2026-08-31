import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const ROOT = resolve(process.cwd())
const failures = []
const passes = []
const read = (file) => readFileSync(resolve(ROOT, file), 'utf8')
const present = (file) => existsSync(resolve(ROOT, file))
const check = (condition, label, detail = '') => condition ? passes.push(label) : failures.push(detail ? `${label}: ${detail}` : label)

for (const file of [
  'ARCHIC_QUALITY_STANDARD_2026.md',
  'ARCHIC_PUBLIC_QUALITY_STANDARD_2026.2.md',
  'ARCHIC_DESIGN_SYSTEM_IMPLEMENTATION.md',
  'AAA_VISUAL_DIRECTION.md',
  'AGENTS.md',
  '.cursor/rules/aaa-design.mdc',
  'project.config.json',
  'docs/asset-provenance.md',
  'src/pages/ArchicHomeAAA.tsx',
  'public/archic-aaa.css',
]) check(present(file), `Required production contract exists: ${file}`)

const config = JSON.parse(read('project.config.json'))
check(config.project?.mode === 'production', 'Project remains in production mode')
check(config.foundation?.version === '1.0.0', 'Foundation remains pinned to 1.0.0')
check(config.direction?.leadMedium === 'Image', 'V3 direction is image-led')
check(config.direction?.primaryArchetype === 'Cinematic Sequence', 'V3 primary archetype is Cinematic Sequence')
check(config.direction?.secondaryArchetype === 'Editorial Spread', 'V3 secondary archetype is Editorial Spread')
check(config.assets?.verified === true, 'Production asset graph is marked verified')

const homeEntry = read('src/pages/ArchicHome.tsx')
const home = read('src/pages/ArchicHomeAAA.tsx')
const css = read('public/archic-aaa.css')
const header = read('src/components/StudioHeader.tsx')
const provenance = read('docs/asset-provenance.md')
const direction = read('AAA_VISUAL_DIRECTION.md')

check(homeEntry.includes("export { default } from './ArchicHomeAAA'"), 'Home entry resolves to AAA implementation')
check(home.includes('data-quality-standard="aaa-design-art-direction-v3"'), 'Home declares AAA Design Art Direction v3')
check(home.includes('Construimos sistemas digitales que') && home.includes('transforman') && home.includes('negocios.'), 'Home carries approved transformation platform')
check(home.includes('HeroShowcase') && home.includes('ProjectStrip') && home.includes('PillarGrid') && home.includes('ProcessRail'), 'V3 authored visual chapters are present')
check(home.includes("@fontsource/instrument-serif/latin-400.css") && home.includes("@fontsource/instrument-serif/latin-400-italic.css"), 'Editorial serif is explicitly route-scoped')
check(home.includes('images.unsplash.com') && provenance.includes('Unsplash License'), 'Photography has documented production provenance')
check(home.includes('Fotografía representativa') && provenance.includes('must never be presented as actual fleet inventory'), 'Representative yacht imagery carries an honesty boundary')
check(!/trusted by|real results|premios|awards|testimonials/i.test(home), 'Home contains no invented social proof or outcome claims')
check(!home.includes("from '../assets/concept/") && !home.includes("from '../assets/work-"), 'Home imports no unverified archived photography')
check(!home.includes('ProjectMonolith') && !home.includes('SupervisedSystemField'), 'Superseded technical hero signatures are absent')

check(css.includes("'Instrument Serif'"), 'Editorial typography is implemented in CSS')
check(css.includes('.aaa-showcase') && css.includes('.aaa-project-strip') && css.includes('.aaa-pillars') && css.includes('.aaa-work-grid') && css.includes('.aaa-process-rail'), 'All v3 visual resource families are styled')
check(css.includes('@media(prefers-reduced-motion:reduce)'), 'Reduced-motion behaviour is defined')
check(!/glassmorphism|webgl|particle|magnetic/i.test(css), 'Generic effect fingerprints are absent')
check(header.includes('className="as-desktop-nav"') && header.includes('tabIndex={open ? 0 : -1}'), 'Desktop navigation and accessible mobile menu coexist')
check(direction.includes('Image creates desire. Typography gives it authority. Product proof makes it credible.'), 'Active direction records the v3 art-direction principle')

check(present('public/brand/archic-symbol-2026.svg'), 'Canonical Archic symbol exists')
check(!present('public/favicon.ico'), 'Legacy favicon is absent')
check(!present('public/img'), 'Archived public image folder is absent')
for (const preview of ['hospitality-preview.svg', 'mobility-preview.svg', 'real-estate-preview.svg']) {
  check(present(`public/software/${preview}`), `White-label demo exists: ${preview}`)
}

const robots = read('public/robots.txt')
check(/User-agent: OAI-SearchBot\s+Allow: \//m.test(robots), 'OAI-SearchBot remains allowed')
check(/User-agent: GPTBot\s+Disallow: \//m.test(robots), 'GPTBot training crawl remains separated')

check(present('dist/index.html'), 'Production build exists')
for (const entry of ['dist/index.html', 'dist/en/index.html', 'dist/control/index.html', 'dist/en/control/index.html']) {
  check(present(entry), `Generated route ships: ${entry.replace('dist/', '/')}`)
  if (!present(entry)) continue
  const html = read(entry)
  check(/<meta[^>]+name="viewport"/i.test(html), `${entry} has viewport metadata`)
  check(/<link[^>]+rel="canonical"/i.test(html), `${entry} has canonical metadata`)
  check(html.includes('/brand/archic-symbol-2026.svg'), `${entry} exposes canonical favicon`)
}
check(present('dist/archic-aaa.css'), 'V3 art-direction stylesheet ships')

const assetDir = resolve(ROOT, 'dist', 'assets')
if (existsSync(assetDir)) {
  const files = readdirSync(assetDir)
  const mainCss = files.find((name) => /^main-.*\.css$/.test(name))
  const mainJs = files.find((name) => /^main-.*\.js$/.test(name))
  check(Boolean(mainCss), 'Main CSS bundle exists')
  check(Boolean(mainJs), 'Main JS bundle exists')
  if (mainCss) {
    const size = gzipSync(readFileSync(resolve(assetDir, mainCss))).length
    check(size <= 55 * 1024, 'Main CSS stays under 55 KiB gzip', `${Math.round(size / 1024)} KiB gzip`)
  }
  if (mainJs) {
    const size = gzipSync(readFileSync(resolve(assetDir, mainJs))).length
    check(size <= 155 * 1024, 'Main JS stays under 155 KiB gzip', `${Math.round(size / 1024)} KiB gzip`)
  }
}

console.log(`\nArchic Quality Gate · AAA Design v3 — ${passes.length} checks passed`)
for (const label of passes) console.log(`  ✓ ${label}`)
if (failures.length) {
  console.error(`\n${failures.length} blocking quality check${failures.length === 1 ? '' : 's'} failed:`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
  process.exit(1)
}
console.log('\nQuality gate passed. The build is eligible to deploy.\n')
