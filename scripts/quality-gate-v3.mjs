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
  'src/styles/archic-light.css',
  'src/pages/LabWeather.tsx',
  'src/lab/weatherMath.ts',
]) check(present(file), `Required production contract exists: ${file}`)

const config = JSON.parse(read('project.config.json'))
check(config.project?.mode === 'production', 'Project remains in production mode')
check(config.foundation?.version === '1.0.0', 'Foundation remains pinned to 1.0.0')
check(config.direction?.version === 'v4-light-blue', 'V4 editorial light/blue direction is active')
check(config.direction?.accent === '#075BCD', 'Official accent is Archic blue #075BCD')
check(config.assets?.verified === true, 'Production asset graph is marked verified')

const homeEntry = read('src/pages/ArchicHome.tsx')
const home = read('src/pages/ArchicHomeAAA.tsx')
const css = read('src/styles/archic-light.css')
const weather = read('src/pages/LabWeather.tsx')
const lab = read('src/pages/LabIndex.tsx')
const header = read('src/components/StudioHeader.tsx')
const provenance = read('docs/asset-provenance.md')
const direction = read('AAA_VISUAL_DIRECTION.md')

check(homeEntry.includes("export { default } from './ArchicHomeAAA'"), 'Home entry resolves to AAA implementation')
check(home.includes('data-quality-standard="aaa-design-light-blue-v4"'), 'Home declares AAA Design light/blue v4')
check(home.includes('Diseñamos lo que viene.') && home.includes('We design what comes next.'), 'Home carries the approved ES/EN platform line')
for (const id of ['selected-work', 'system', 'method', 'audit']) check(home.includes(`id="${id}"`), `Home keeps #${id}`)
check(home.includes("'lab/weather'") && home.includes('#selected-work'), 'Hero CTAs point to Weather and selected work')
check(home.includes('Webs premium') && home.includes('Software a medida') && home.includes('Sistemas para empresas'), 'Home keeps what Archic Lab sells visible')
check(home.includes('buildHomeGraph') && home.includes('rel="canonical"'), 'Home keeps structured data and canonical')
check(!/<em>|instrument-serif/i.test(home + lab + weather), 'No decorative italic/serif emphasis on Home, Lab or Weather')
check(provenance.includes('Rise DHMN') && provenance.includes('CC BY 4.0') && present('public/media/sky/sky-portrait-1200.webp'), 'Sky photography is local WebP with documented licence')
check(home.includes('Fotografía representativa') && provenance.includes('actual fleet inventory'), 'Representative yacht imagery carries an honesty boundary')
check(!/trusted by|real results|premios|awards|testimonials/i.test(home), 'Home contains no invented social proof or outcome claims')
check(!home.includes("from '../assets/concept/") && !home.includes("from '../assets/work-"), 'Home imports no unverified archived photography')
check(!/Integración pendiente|Not connected yet/.test(weather), 'Weather has no placeholder "pending integration" blocks')
check(weather.includes('upcomingHourly') && weather.includes('rainTotal'), 'Weather rain totals use the tested contiguous-hour helpers')
check(weather.includes('MET Norway') && weather.includes('creativecommons.org/licenses/by/4.0'), 'Weather keeps MET Norway CC BY 4.0 attribution')
check(weather.includes('/functions/v1/lab-weather') && !weather.includes('api.met.no/weatherapi/locationforecast/2.0/compact'), 'Weather calls only the Cloud Edge Function')

check(css.includes('#075BCD') && css.includes('#F8F9FB') && css.includes('#101217'), 'Light/blue tokens are implemented')
check(css.includes('@media (prefers-reduced-motion:reduce)'), 'Reduced-motion behaviour is defined')
check(css.includes('.al-site .as-desktop-nav{display:none!important}'), 'Desktop nav collapses to the menu button on small screens (Home + Lab)')
check(!/glassmorphism|webgl|particle|magnetic/i.test(css), 'Generic effect fingerprints are absent')
check(header.includes('className="as-desktop-nav"') && header.includes('tabIndex={open ? 0 : -1}'), 'Desktop navigation and accessible mobile menu coexist')
check(direction.includes('Diseñamos lo que viene.'), 'Active direction records the v4 platform')

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
check(present('dist/media/sky/sky-portrait-1200.webp'), 'Optimised sky photography ships')

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

console.log(`\nArchic Quality Gate · AAA Design v4 — ${passes.length} checks passed`)
for (const label of passes) console.log(`  ✓ ${label}`)
if (failures.length) {
  console.error(`\n${failures.length} blocking quality check${failures.length === 1 ? '' : 's'} failed:`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
  process.exit(1)
}
console.log('\nQuality gate passed. The build is eligible to deploy.\n')
