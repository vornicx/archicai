import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

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

function bytes(relative) {
  return statSync(resolve(ROOT, relative)).size
}

function findAsset(pattern) {
  const dir = resolve(ROOT, 'dist', 'assets')
  if (!existsSync(dir)) return null
  return readdirSync(dir).find((name) => pattern.test(name)) ?? null
}

// Standard and canonical identity.
check(present('ARCHIC_QUALITY_STANDARD_2026.md'), 'Quality standard is versioned in the repository')
check(present('public/brand/archic-symbol-2026.svg'), 'Canonical Archic symbol exists')
check(present('public/brand/identity-version.txt'), 'Identity manifest exists')
if (present('public/brand/identity-version.txt')) {
  const identity = read('public/brand/identity-version.txt')
  check(identity.includes('/brand/archic-symbol-2026.svg'), 'Identity manifest points to the canonical 2026 symbol')
  check(identity.includes('Legacy brand assets must not be used'), 'Identity manifest explicitly rejects legacy brand assets')
}

check(!present('public/favicon.ico'), 'Legacy favicon.ico is absent from public assets')

// Home is the reference implementation.
const home = read('src/pages/ArchicHome.tsx')
check(home.includes('data-quality-standard="archic-2026.1"'), 'Home declares Archic Quality Standard 2026.1')
check(home.includes('HeroSystemConsole'), 'Home contains immediate interactive product proof')
for (const preview of ['hospitality-preview.svg', 'mobility-preview.svg', 'real-estate-preview.svg']) {
  check(home.includes(`/software/${preview}`), `Home references ${preview}`)
}
check(home.includes('FICTIONAL DATA') && home.includes('DATOS FICTICIOS'), 'Public demos are explicitly marked as fictional data')

// Cascade contract: product refinement must load before the safety layers.
const main = read('src/main.tsx')
const standardIndex = main.indexOf("./styles/archic-standard-2026.css")
const contrastIndex = main.indexOf("./styles/archic-contrast.css")
const visibilityIndex = main.indexOf("./styles/archic-visibility-guard.css")
const surfaceIndex = main.indexOf("./styles/archic-surface-contract.css")
check(standardIndex >= 0, 'Archic Standard stylesheet is loaded')
check(standardIndex < contrastIndex && contrastIndex < visibilityIndex && visibilityIndex < surfaceIndex, 'Safety styles remain last in the intended order')

// The three public white-label previews must exist and must not leak known client brands.
const bannedDemoTerms = ['Five Star Rentals', 'Marbella For Sale', 'La Bocana', 'Zusto', 'Mfinity']
for (const preview of ['hospitality-preview.svg', 'mobility-preview.svg', 'real-estate-preview.svg']) {
  const sourcePath = `public/software/${preview}`
  check(present(sourcePath), `Public white-label asset exists: ${preview}`)
  if (present(sourcePath)) {
    const source = read(sourcePath)
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

// Keep the premium experience technically lean enough to stay premium.
const mainCss = findAsset(/^main-.*\.css$/)
const mainJs = findAsset(/^main-.*\.js$/)
check(Boolean(mainCss), 'Main CSS bundle exists')
check(Boolean(mainJs), 'Main JS bundle exists')
if (mainCss) {
  const size = bytes(join('dist', 'assets', mainCss))
  check(size <= 380 * 1024, 'Main CSS stays under 380 KiB', `${Math.round(size / 1024)} KiB`)
}
if (mainJs) {
  const size = bytes(join('dist', 'assets', mainJs))
  check(size <= 430 * 1024, 'Main JS stays under 430 KiB', `${Math.round(size / 1024)} KiB`)
}

console.log(`\nArchic Quality Gate 2026.1 — ${passes.length} checks passed`)
for (const label of passes) console.log(`  ✓ ${label}`)

if (failures.length) {
  console.error(`\n${failures.length} blocking quality check${failures.length === 1 ? '' : 's'} failed:`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
  process.exit(1)
}

console.log('\nQuality gate passed. The build is eligible to deploy.\n')
