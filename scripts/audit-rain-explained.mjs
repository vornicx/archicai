// Synthetic fixtures only; no claim of live MET or production CORS verification.
import { chromium } from 'playwright'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import { fixture } from './audit-fixture.mjs'
const out = '/tmp/browser/rain-explained'
mkdirSync(out, { recursive: true })
const cases = {
  dry: Array(24).fill(0), shower: [0, 0, 2, 4, 2, ...Array(19).fill(0)],
  intermittent: Array.from({ length: 24 }, (_, i) => i % 3 === 0 ? 0.6 : 0),
  partial: Array(10).fill(0.2), night: Array(24).fill(0.15), storm: [0, 2, 3, 1, ...Array(20).fill(0.1)],
}
const browser = await chromium.launch({ headless: true })
const results = []
for (const lang of ['es', 'en']) for (const width of [1440, 390, 375, 320]) for (const [name, values] of Object.entries(cases)) {
  const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 900 : width === 375 ? 812 : 844 }, reducedMotion: 'reduce' })
  const page = await context.newPage(), errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.route('**/functions/v1/lab-weather**', async (route) => {
    const f = fixture({ night: name === 'night' })
    f.points = f.points.slice(0, values.length).map((p, i) => ({ ...p, precipitationMm: values[i], symbolCode: name === 'night' ? 'clearsky_night' : name === 'storm' ? 'heavyrainandthunder' : p.symbolCode }))
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(f) })
  })
  await page.goto(`http://localhost:8080/${lang === 'en' ? 'en/' : ''}lab/weather/`, { waitUntil: 'networkidle' })
  const section = page.locator('.re-section')
  await section.waitFor()
  assert.equal(await page.locator('.re-bar').count(), 6)
  assert.equal(await section.getByRole('button', { name: '24 h', exact: true }).isDisabled(), name === 'partial')
  assert.equal(await section.getByRole('button', { name: /^(Episodio|Episode)$/ }).isDisabled(), name === 'partial' || name === 'dry')
  if (name !== 'partial') {
    await section.getByRole('button', { name: '24 h', exact: true }).click()
    assert.equal(await page.locator('.re-bar').count(), 24)
    if (name !== 'dry') {
      await section.getByRole('button', { name: /^(Episodio|Episode)$/ }).click()
      assert.equal(await section.getByRole('button', { name: /^(Episodio|Episode)$/ }).getAttribute('aria-pressed'), 'true')
    }
    await section.getByRole('button', { name: '6 h', exact: true }).click()
  }
  if (name === 'dry') assert.equal(await page.locator('.re-bar').evaluateAll((els) => els.every((e) => Number(e.getAttribute('height')) === 0)), true)
  await page.locator('.lw-strip button').first().focus()
  await page.keyboard.press('ArrowRight')
  assert.equal(await page.locator('.re-storyline g[data-selected]').count(), 1)
  await section.scrollIntoViewIfNeeded()
  await page.screenshot({ path: `${out}/${lang}-${width}-${name}.png` })
  await section.locator('summary').click()
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(100)
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
  if (r.violations.length) console.log(lang, width, name, JSON.stringify(r.violations.map(v => ({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})))); assert.deepEqual(r.violations.map((v) => v.id), [])
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), false)
  assert.deepEqual(errors, [])
  // Return to 24h, then switch cities: mode must reset and old data region vanish before request resolves.
  if (name === 'shower' && width === 390) {
    await section.getByRole('button', { name: '24 h', exact: true }).click()
    await page.unroute('**/functions/v1/lab-weather**')
    await page.route('**/functions/v1/lab-weather**', async (route) => {
      await new Promise((r) => setTimeout(r, 350))
      const f = fixture(); f.points = f.points.map((p) => ({ ...p, precipitationMm: 0, temperatureC: 7 }))
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(f) })
    })
    for (const city of ['tokyo', 'ecija']) {
      await page.locator('#lw-place').selectOption(city)
      assert.equal(await page.locator('.re-section').count(), 0)
      await page.locator('.re-section').waitFor()
      assert.equal(await page.locator('.re-selector button[aria-pressed=true]').innerText(), '6 h')
      assert.equal(await page.locator('.re-bar').evaluateAll((els) => els.every((e) => Number(e.getAttribute('height')) === 0)), true)
    }
    await page.unroute('**/functions/v1/lab-weather**')
    await page.route('**/functions/v1/lab-weather**', (route) => route.fulfill({ status: 502, body: '{}' }))
    await page.getByRole('button', { name: /^(Actualizar|Refresh)$/ }).click()
    await page.locator('.lw-state[role=alert]').waitFor()
    assert.equal(await page.locator('.re-section').count(), 0)
  }
  results.push({ lang, width, fixture: name, axeViolations: r.violations.length, overflow: false, runtimeErrors: errors.length })
  await context.close()
}
await browser.close()
mkdirSync('docs/audit', { recursive: true })
writeFileSync('docs/audit/rain-explained.json', JSON.stringify({ scope: 'Synthetic local fixtures; not live provider or production hosting', results }, null, 2))
console.log(`PASS ${results.length} fixture/viewports; 0 axe violations, overflow or runtime errors. Screenshots: ${out}`)