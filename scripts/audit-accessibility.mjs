// Automated accessibility audit (axe-core via Playwright, Chromium).
// Scope: WCAG 2.0/2.1 A+AA and 2.2 AA tags. Automation is NOT full WCAG conformance.
// Weather data is served from a local fixture because the Cloud function rejects localhost (CORS).
// Usage: BASE_URL=http://localhost:4173 node scripts/audit-accessibility.mjs   (exit 1 on violations)
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:8080'
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

export function fixture({ night = false } = {}) {
  const start = new Date(); start.setUTCMinutes(0, 0, 0)
  const codes = night ? ['clearsky_night', 'rain', 'heavyrainandthunder', 'cloudy'] : ['clearsky_day', 'partlycloudy_day', 'lightrain', 'heavyrainandthunder']
  const points = Array.from({ length: 48 }, (_, i) => ({
    time: new Date(start.getTime() + i * 3600e3).toISOString(),
    temperatureC: 14 + Math.round(Math.sin(i / 4) * 5), feelsLikeC: 13, humidityPct: 70, dewPointC: 8,
    pressureHpa: 1014, cloudPct: 60, fogPct: 0, uvClearSky: 1, windKmh: 12, gustKmh: 20, windFromDegrees: 220,
    precipitationMm: i % 5 === 0 ? 1.2 : i % 7 === 0 ? 0.3 : 0, precipitationProbabilityPct: null, periodHours: 1,
    symbolCode: codes[Math.floor(i / 3) % codes.length],
  }))
  return { source: { name: 'MET Norway', url: 'https://api.met.no/', type: 'model_forecast' }, updatedAt: start.toISOString(), points,
    limitations: { observedStationData: false, officialAlerts: false, radar: false, timesAreUtc: true } }
}

const PAGES = ['/', '/en/', '/lab/', '/en/lab/', '/lab/weather/', '/en/lab/weather/']
const WIDTHS = [390, 1440]

async function scan(page, label, results) {
  const r = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  results.push({ label, violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.map((n) => n.target.join(' ')).slice(0, 8), count: v.nodes.length })) })
}

const browser = await chromium.launch({ headless: true })
const results = []
for (const width of WIDTHS) {
  for (const night of [false, true]) {
    for (const p of PAGES) {
      if (night && !p.includes('weather')) continue
      const ctx = await browser.newContext({ viewport: { width, height: width < 800 ? 844 : 900 }, reducedMotion: 'reduce' })
      const page = await ctx.newPage()
      await page.route('**/functions/v1/lab-weather**', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(fixture({ night })) }))
      await page.goto(BASE + p, { waitUntil: 'networkidle' })
      const tag = `${p} @${width}${night ? ' night' : ''}`
      await scan(page, tag, results)
      if (!night && p.includes('weather')) {
        const detail = page.getByRole('button', { name: /^(Detalle|Detail)$/ })
        if (await detail.count()) { await detail.first().click(); await page.waitForTimeout(150); await scan(page, tag + ' detail', results) }
      }
      if (!night && width === 390) {
        const menu = page.locator('.as-menu-button')
        if (await menu.count()) { await menu.click(); await page.waitForTimeout(300); await scan(page, tag + ' menu-open', results) }
      }
      await ctx.close()
    }
  }
}
await browser.close()

mkdirSync('docs/audit', { recursive: true })
writeFileSync('docs/audit/a11y-latest.json', JSON.stringify(results, null, 2))
let total = 0
for (const r of results) {
  const n = r.violations.reduce((a, v) => a + v.count, 0); total += n
  console.log(`${n === 0 ? 'PASS' : 'FAIL'}  ${r.label}  rules=${r.violations.length} nodes=${n}`)
  for (const v of r.violations) console.log(`   - ${v.id} [${v.impact}] x${v.count}: ${v.targets.join(' | ')}`)
}
console.log(`\nScans: ${results.length}  violating nodes: ${total}  (axe automated subset only)`)
process.exit(total ? 1 : 0)
