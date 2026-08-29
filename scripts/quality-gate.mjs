import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const ROOT = resolve(process.cwd())
const failures = []
const passes = []

function check(condition, label, detail = '') {
  if (condition) passes.push(label)
  else failures.push(detail ? `${label}: ${detail}` : label)
}

function read(relative) {
  return readFileSync(resolve(ROOT, relative), 'utf8')
}

function present(relative) {
  return existsSync(resolve(ROOT, relative))
}

function findAsset(pattern) {
  const dir = resolve(ROOT, 'dist', 'assets')
  if (!existsSync(dir)) return null
  return readdirSync(dir).find((name) => pattern.test(name)) ?? null
}

// Standard and canonical identity.
check(present('ARCHIC_QUALITY_STANDARD_2026.md'), 'Internal quality standard is versioned in the repository')
check(present('ARCHIC_PUBLIC_QUALITY_STANDARD_2026.2.md'), 'Public quality standard is versioned in the repository')
check(present('ARCHIC_DESIGN_SYSTEM_IMPLEMENTATION.md'), 'Design System 1.0 implementation record is versioned')
check(present('project.config.json'), 'Design System 1.0 project contract exists')
for (const standardFile of ['docs/brand-brief.md', 'docs/direction-vector.md', 'docs/art-direction.md', 'docs/asset-provenance.md', 'docs/qa-signoff.md']) {
  check(present(standardFile), `Project standard file exists: ${standardFile}`)
}
if (present('project.config.json')) {
  const config = JSON.parse(read('project.config.json'))
  check(config.schemaVersion === '1.0', 'Project contract uses schema 1.0')
  check(config.project?.mode === 'production', 'Project contract declares production mode')
  check(config.foundation?.version === '1.0.0', 'Project contract pins Foundation 1.0.0')
  check(config.direction?.leadMedium === 'Type + Data', 'Direction Vector declares Type + Data as lead medium')
  check(config.direction?.primaryArchetype === 'Editorial Spread' && config.direction?.secondaryArchetype === 'Dossier', 'Direction Vector declares the selected archetypes')
  check(config.assets?.provenanceFile === 'docs/asset-provenance.md', 'Project contract points to asset provenance')
  check(config.project?.mode !== 'production' || config.assets?.verified === true, 'Production asset provenance is verified', 'project.config.json assets.verified is false')
}
check(present('public/brand/archic-symbol-2026.svg'), 'Canonical Archic symbol exists')
check(present('public/brand/identity-version.txt'), 'Identity manifest exists')
if (present('public/brand/identity-version.txt')) {
  const identity = read('public/brand/identity-version.txt')
  check(identity.includes('/brand/archic-symbol-2026.svg'), 'Identity manifest points to the canonical 2026 symbol')
  check(identity.includes('Legacy brand assets must not be used'), 'Identity manifest explicitly rejects legacy brand assets')
}

check(!present('public/favicon.ico'), 'Legacy favicon.ico is absent from public assets')
for (const generator of [
  'scripts/generate-static-pages.ts',
  'scripts/generate-archic-site-pages.ts',
  'scripts/generate-intent-pages.ts',
  'scripts/generate-exploration-pages.ts',
]) {
  const source = read(generator)
  check(!source.includes('/favicon.ico'), `Static generator contains no legacy favicon reference: ${generator}`)
  check(source.includes('/brand/archic-symbol-2026.svg'), `Static generator emits the canonical Archic symbol: ${generator}`)
}
check(!read('scripts/postprocess-generated-seo.ts').includes('xml = xml.replace(/<lastmod>'), 'SEO post-processing preserves page-specific sitemap dates')
check(!present('public/img'), 'Unverified legacy concept imagery is absent from public assets')
for (const archivedAsset of [
  'src/assets/concept/work-realestate.jpg',
  'src/assets/concept/work-bocana.jpg',
  'src/assets/concept/work-automotive.jpg',
  'src/assets/concept/archic-yachting-system.webp',
  'src/assets/concept/archic-hospitality-system.webp',
  'src/assets/concept/archic-automotive-system.webp',
  'src/assets/concept/archic-digital-system.webp',
]) {
  check(present(archivedAsset), `Unverified visual is retained outside the production graph: ${archivedAsset}`)
}

// Home is the reference implementation.
const home = read('src/pages/ArchicHome.tsx')
const productRoutes = read('src/pages/ArchicSitePage.tsx')
const explorationRoutes = read('src/pages/ExplorationPage.tsx')
check(home.includes('data-quality-standard="archic-design-system-1.0.0"'), 'Home declares Archic Design System 1.0.0')
check(home.includes('ControlDemo'), 'Home contains interactive Archic Control product proof')
check(
  home.includes('Más que una web.') &&
    home.includes('Un sistema para crecer.') &&
    home.includes('web apps y software web a medida'),
  'Home carries the approved web, app and custom-software positioning statement',
)
check(!home.includes('heroMarbella'), 'Home no longer uses a luxury-property hero image')
check(!home.includes("from '../assets/work-"), 'Home proof does not depend on unknown-provenance photography')
check(!productRoutes.includes("from '../assets/work-") && !productRoutes.includes("from '../assets/concept/"), 'Product routes do not depend on archived concept photography')
check(productRoutes.includes('data-quality-standard="archic-design-system-1.0.0"') && explorationRoutes.includes('data-quality-standard="archic-design-system-1.0.0"'), 'Product and exploration routes declare Design System 1.0.0')
check(productRoutes.includes('DATOS FICTICIOS / DEMO') && productRoutes.includes('FICTIONAL DATA / DEMO'), 'Product-route proof is explicitly marked as fictional data')
for (const preview of ['hospitality-preview.svg', 'mobility-preview.svg', 'real-estate-preview.svg']) {
  check(productRoutes.includes(`/software/${preview}`), `Product routes reference ${preview}`)
}
check(home.includes('HeroSystemProof') && home.includes("role=\"tablist\""), 'Hero contains the interactive three-layer system proof')
check(home.includes('ArrowLeft') && home.includes('ArrowRight') && home.includes('Home') && home.includes('End'), 'Hero system tabs implement keyboard navigation')
check((home.match(/tabIndex=\{active === index \? 0 : -1\}/g) ?? []).length >= 2, 'Home tab systems use a roving keyboard tab stop')
check(home.includes('id="ah-demo-panel"') && home.includes('aria-labelledby={`ah-demo-tab-${demo.id}`}'), 'Control demo exposes its tab-panel relationship')
check(read('src/pages/ExplorationPage.tsx').includes('id="axv-product-view"') && read('src/pages/ExplorationPage.tsx').includes('aria-controls="axv-product-view"'), 'Exploration layers expose their tab-panel relationship')
for (const preview of ['hospitality-preview.svg', 'mobility-preview.svg', 'real-estate-preview.svg']) {
  check(home.includes(`/software/${preview}`), `Home references ${preview}`)
}
check(home.includes('FICTIONAL DATA') && home.includes('DATOS FICTICIOS'), 'Public demos are explicitly marked as fictional data')

check(present('src/styles/archic-home-system-1.css'), 'Design System 1.0 home direction layer exists')
check(read('src/styles/archic-routes-2026.css').includes('--ar-gold: #c9a56a') && read('src/styles/archic-routes-2026.css').includes('--ar-ink: #0a0a0b'), 'Product routes use canonical Archic black and gold tokens')
if (present('src/styles/archic-home-system-1.css')) {
  const homeStyle = read('src/styles/archic-home-system-1.css')
  check(!homeStyle.includes('Instrument Serif'), 'Design System 1.0 home contains no decorative serif typography')
  check(!homeStyle.includes('gradient'), 'Design System 1.0 home contains no decorative gradients')
  check(homeStyle.includes('--ah-brand-gold: #c9a56a') && homeStyle.includes('--ah-ink: #0a0a0b'), 'Home direction uses the canonical Archic black and gold tokens')
  check(homeStyle.includes('.ah-proof-tabs') && homeStyle.includes("[aria-selected='true']"), 'System switcher has explicit selected-state styling')
  check(homeStyle.includes('@media (prefers-reduced-motion: reduce)'), 'Home direction defines reduced-motion behaviour')
}

// Cascade contract: hardening loads before the final safety layers.
const main = read('src/main.tsx')
const app = read('src/App.tsx')
check(!app.includes('<main id="main-content">'), 'Router shell does not nest page landmarks inside a global main')
check(app.includes('<main') && app.includes('className="as-route-fallback"'), 'Lazy-route fallback preserves the main landmark')
check(app.includes('MutationObserver') && app.includes("main.focus({ preventScroll: true })"), 'Client-side route changes transfer focus to the destination main landmark')
for (const pageFile of ['src/pages/ArchicHome.tsx', 'src/pages/ArchicSitePage.tsx', 'src/pages/ExplorationPage.tsx', 'src/pages/LegalPage.tsx', 'src/pages/ServicePage.tsx', 'src/pages/GuidePage.tsx', 'src/pages/GuidesIndex.tsx', 'src/pages/NotFound.tsx']) {
  const pageSource = read(pageFile)
  check(pageSource.includes('id="main-content"'), `Route owns its main landmark: ${pageFile}`)
  check(pageSource.includes('data-quality-standard="archic-design-system-1.0.0"'), `Route declares Design System 1.0.0: ${pageFile}`)
}
check(read('src/components/ArchicProductObject.tsx').includes("es ? 'FLUJOS DEMO' : 'DEMO FLOWS'"), 'Control product object avoids an unqualified real-system claim')
const hardeningIndex = main.indexOf("./styles/archic-hardening.css")
const homeBaseIndex = main.indexOf("./styles/archic-home-2026.css")
const homeSystemIndex = main.indexOf("./styles/archic-home-system-1.css")
const contrastIndex = main.indexOf("./styles/archic-contrast.css")
const readabilityIndex = main.indexOf("./styles/archic-readability.css")
const visibilityIndex = main.indexOf("./styles/archic-visibility-guard.css")
const surfaceIndex = main.indexOf("./styles/archic-surface-contract.css")
check(homeSystemIndex >= 0, 'Design System 1.0 home stylesheet is loaded')
check(!main.includes('archic-exploration-product-ui.css') && !main.includes('@fontsource/instrument-serif'), 'Exploration UI and decorative serif font stay out of the home entry')
check(read('src/pages/ExplorationPage.tsx').includes('archic-exploration-product-ui.css'), 'Interactive exploration CSS is route-split')
check(read('src/pages/ArchicSitePage.tsx').includes('archic-contact-route-form.css'), 'Contact and product-route CSS is route-split')
check(!read('src/pages/ArchicSitePage.tsx').includes("'../styles/studio.css'") && !read('src/pages/ArchicSitePage.tsx').includes('archic-flagship.css'), 'Product routes exclude superseded flagship and studio CSS')
check(!productRoutes.includes('@fontsource/instrument-serif') && !explorationRoutes.includes('@fontsource/instrument-serif'), 'Product and exploration routes exclude decorative serif font payloads')
check(read('src/styles/archic-product-objects.css').includes("font-family:'Space Grotesk','DM Sans',sans-serif"), 'Product objects follow the grotesk + mono direction')
check(present('src/styles/archic-hardening.css'), 'Rendered hardening layer exists')
check(present('src/styles/archic-readability.css'), 'Interactive readability safety layer exists')
check(
  hardeningIndex < homeBaseIndex && homeBaseIndex < homeSystemIndex && homeSystemIndex < contrastIndex && contrastIndex < readabilityIndex && readabilityIndex < visibilityIndex && visibilityIndex < surfaceIndex,
  'Hardening and safety styles remain in the intended order',
)

if (present('src/styles/archic-hardening.css')) {
  const hardening = read('src/styles/archic-hardening.css')
  check(hardening.includes('.as-detail .as-detail-hero'), 'Hardening protects detail heroes from fixed-height clipping')
}

if (present('src/styles/archic-readability.css')) {
  const readability = read('src/styles/archic-readability.css')
  check(readability.includes('.as-menu-inner nav a small'), 'Menu descriptions have an explicit readability rule')
  check(readability.includes("[class*='btn']") && readability.includes("[class*='cta']"), 'CTA readability applies across button systems')
  check(readability.includes('.sx-consent') && readability.includes("input[type='checkbox']"), 'Consent control has a touch-target contract')
  check(readability.includes('.axv-product button'), 'White-label demo controls have a touch-target contract')
  check(readability.includes('.as-brand') && readability.includes('.as-lang button'), 'Header identity and language controls have a touch-target contract')
  check(readability.includes('@media(max-width:760px)'), 'Interactive readability has a mobile contract')
}

const contactForm = read('src/components/StudioContact.tsx')
check(contactForm.includes('form.checkValidity()') && contactForm.includes('form.reportValidity()'), 'Contact form focuses and reports invalid required fields')
check(contactForm.includes('type="checkbox" required') && contactForm.includes("status.tone === 'error' ? 'alert' : 'status'"), 'Contact consent and submit feedback expose accessible state')
check(read('src/components/StudioHeader.tsx').includes('tabIndex={open ? 0 : -1}'), 'Closed navigation removes hidden menu links from the tab order')

const revealGuard = read('src/styles/archic-reveal-guard.css')
check(revealGuard.includes('.ag-site.as-experience-ready [data-reveal]'), 'Commercial home reveal motion cannot hide content')

// Search discovery remains open while optional model-training crawl is separated.
const robots = read('public/robots.txt')
check(/User-agent: OAI-SearchBot\s+Allow: \//m.test(robots), 'OAI-SearchBot remains allowed for search discovery')
check(/User-agent: GPTBot\s+Disallow: \//m.test(robots), 'GPTBot training crawl is explicitly separated from search discovery')

const llms = read('public/llms.txt')
const llmsFull = read('public/llms-full.txt')
check(llms.includes('Última revisión de esta descripción: 2026-08-29.'), 'Public AI summary carries the current content review date')
check(
  llms.includes('Archic diseña y desarrolla webs, web apps y software web a medida') &&
    llms.includes('## Modelo de trabajo 2026'),
  'Public AI summary uses the current Archic commercial model',
)
check(llms.includes('Archic Presence') && llms.includes('Archic Control') && llms.includes('Archic Business'), 'Public AI summary explains the three Archic layers')
check(llmsFull.includes('## Identidad verificable') && llmsFull.includes('/brand/archic-symbol-2026.svg'), 'Full AI corpus exposes only the canonical Archic identity')
check(llmsFull.includes('Los prototipos y concept builds se etiquetan como tales'), 'Full AI corpus carries the evidence policy')

// The three public white-label previews must exist and must not leak known client brands.
const bannedDemoTerms = ['Five Star Rentals', 'Marbella For Sale', 'La Bocana', 'Zusto', 'Mfinity']
for (const preview of ['hospitality-preview.svg', 'mobility-preview.svg', 'real-estate-preview.svg']) {
  const sourcePath = `public/software/${preview}`
  check(present(sourcePath), `Public white-label asset exists: ${preview}`)
  if (present(sourcePath)) {
    const source = read(sourcePath)
    check(source.includes('M1791 4103') && !source.includes('A  ARCHIC'), `${preview} embeds the canonical Archic symbol instead of a typographic substitute`)
    check(source.includes('#C9A56A') && source.includes('#0A0A0B'), `${preview} uses canonical Archic gold and black`)
    for (const term of bannedDemoTerms) {
      check(!source.toLowerCase().includes(term.toLowerCase()), `${preview} does not expose client brand: ${term}`)
    }
  }
}

// Production artifact checks. This gate is intended to run after npm run gen:pages && npm run build.
check(present('dist/index.html'), 'Production build exists')
const requiredEntries = [
  'dist/index.html',
  'dist/en/index.html',
  'dist/control/index.html',
  'dist/en/control/index.html',
  'dist/explorations/hospitality/index.html',
  'dist/explorations/mobility/index.html',
  'dist/explorations/real-estate/index.html',
  'dist/en/explorations/hospitality/index.html',
  'dist/en/explorations/mobility/index.html',
  'dist/en/explorations/real-estate/index.html',
]

for (const entry of requiredEntries) {
  check(present(entry), `Generated route ships: ${entry.replace('dist/', '/')}`)
  if (!present(entry)) continue
  const html = read(entry)
  check(/<meta[^>]+name="viewport"/i.test(html), `${entry} has viewport metadata`)
  check(/<link[^>]+rel="canonical"/i.test(html), `${entry} has canonical metadata`)
  check(html.includes('/brand/archic-symbol-2026.svg'), `${entry} exposes the current Archic favicon`)
  check(!html.includes('/favicon.ico'), `${entry} contains no legacy favicon reference`)
}

check(present('dist/software/hospitality-preview.svg'), 'Hospitality preview ships in dist')
check(present('dist/software/mobility-preview.svg'), 'Mobility preview ships in dist')
check(present('dist/software/real-estate-preview.svg'), 'Real-estate preview ships in dist')
check(!present('dist/favicon.ico'), 'Production artifact contains no legacy favicon.ico')
check(!present('dist/img'), 'Production artifact contains no archived concept imagery')

// Keep the premium experience technically lean enough to stay premium.
const mainCss = findAsset(/^main-.*\.css$/)
const mainJs = findAsset(/^main-.*\.js$/)
check(Boolean(mainCss), 'Main CSS bundle exists')
check(Boolean(mainJs), 'Main JS bundle exists')
if (mainCss) {
  const source = readFileSync(resolve(ROOT, 'dist', 'assets', mainCss))
  const size = gzipSync(source).length
  check(size <= 50 * 1024, 'Main CSS stays under 50 KiB gzip', `${Math.round(size / 1024)} KiB gzip`)
}
if (mainJs) {
  const source = readFileSync(resolve(ROOT, 'dist', 'assets', mainJs))
  const size = gzipSync(source).length
  check(size <= 150 * 1024, 'Main JS stays under 150 KiB gzip', `${Math.round(size / 1024)} KiB gzip`)
}

console.log(`\nArchic Quality Gate · Design System 1.0 — ${passes.length} checks passed`)
for (const label of passes) console.log(`  ✓ ${label}`)

if (failures.length) {
  console.error(`\n${failures.length} blocking quality check${failures.length === 1 ? '' : 's'} failed:`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
  process.exit(1)
}

console.log('\nQuality gate passed. The build is eligible to deploy.\n')
