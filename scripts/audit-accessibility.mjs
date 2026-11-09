// Automated accessibility audit (axe-core via Playwright, Chromium).
// Scope: WCAG 2.0/2.1 A+AA and 2.2 AA tags. Automation is NOT full WCAG conformance.
// Weather data is served from a local fixture because the Cloud function rejects localhost (CORS).
// Usage: BASE_URL=http://localhost:4173 node scripts/audit-accessibility.mjs   (exit 1 on violations)
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fixture } from './audit-fixture.mjs'

const BASE = process.env.BASE_URL || 'http://localhost:8080'
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

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
      if (p.includes('weather') && !(await page.locator('.lw-temp').count())) results.push({ label: tag + ' fixture', violations: [{ id: 'fixture-not-rendered', impact: 'critical', help: 'Weather fixture did not render', targets: ['.lw-temp'], count: 1 }] })
      await scan(page, tag, results)
      if (!night && p.includes('weather')) {
        const detail = page.getByRole('button', { name: /^(Detalle|Detail)$/ })
        if (await detail.count()) { await detail.first().click(); await page.waitForTimeout(150); await scan(page, tag + ' detail', results) }
        // City search open with results (local index), then a coming-day row expanded.
        const box = page.getByRole('combobox', { name: /^(Buscar ciudad|Search city)$/ })
        await box.fill('Berlin'); await page.waitForSelector('[role=option]', { timeout: 15000 }).catch(() => {})
        const opts = await page.locator('[role=option]').count()
        results.push({ label: tag + ' search-results', violations: opts ? [] : [{ id: 'city-search-empty', impact: 'serious', help: 'City search returned no options for Berlin', targets: ['[role=combobox]'], count: 1 }] })
        await scan(page, tag + ' search-open', results)
        await page.keyboard.press('Escape')
        const day = page.locator('.lw-day').nth(1)
        if (await day.count()) { await day.click(); await scan(page, tag + ' day-open', results) }
      }
      if (!night && width === 390) {
        const menu = page.locator('.as-menu-button')
        if (await menu.count()) { await menu.click(); await page.waitForTimeout(300); await scan(page, tag + ' menu-open', results)
          // Keyboard/modal checks: background inert, Tab stays inside header+menu, Escape restores focus.
          const bgInert = await page.evaluate(() => !!document.querySelector('main')?.closest('[inert]'))
          let escaped = false
          for (let i = 0; i < 12; i++) { await page.keyboard.press('Tab'); escaped ||= await page.evaluate(() => !document.activeElement?.closest('#archic-menu, .as-menu-button')) }
          await page.keyboard.press('Escape'); await page.waitForTimeout(100)
          const restored = await page.evaluate(() => document.activeElement?.classList.contains('as-menu-button'))
          const ok = bgInert && !escaped && restored
          results.push({ label: tag + ' menu-keyboard', violations: ok ? [] : [{ id: 'menu-modal-keyboard', impact: 'serious', help: `bgInert=${bgInert} focusEscaped=${escaped} focusRestored=${restored}`, targets: ['#archic-menu'], count: 1 }] })
        }
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
