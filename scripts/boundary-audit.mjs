import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputRoot = process.env.AUDIT_OUTPUT || 'visual-audit'

const scenarios = [
  { name: 'compact-320', viewport: { width: 320, height: 700 }, reducedMotion: 'no-preference' },
  { name: 'mobile-reduced', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' },
]

const routes = [
  ['home-es', '/'],
  ['home-en', '/en/'],
  ['contact-es', '/contact/'],
  ['contact-en', '/en/contact/'],
]

await mkdir(outputRoot, { recursive: true })
const browser = await chromium.launch({ headless: true })
const results = []

for (const scenario of scenarios) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    deviceScaleFactor: 1,
    reducedMotion: scenario.reducedMotion,
  })

  for (const [name, route] of routes) {
    const page = await context.newPage()
    const consoleErrors = []
    const pageErrors = []
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    page.on('pageerror', (error) => pageErrors.push(error.message))

    let navigationError = null
    try {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: 'networkidle', timeout: 45_000 })
      await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready })
    } catch (error) {
      navigationError = error instanceof Error ? error.message : String(error)
    }

    const diagnostics = navigationError ? null : await page.evaluate((reducedMotion) => {
      const visible = (element) => {
        const style = getComputedStyle(element)
        const rect = element.getBoundingClientRect()
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0.01 && rect.width > 0 && rect.height > 0
      }
      const describe = (element) => {
        const id = element.id ? `#${element.id}` : ''
        const classes = typeof element.className === 'string' && element.className.trim()
          ? `.${element.className.trim().split(/\s+/).slice(0, 3).join('.')}`
          : ''
        return `${element.tagName.toLowerCase()}${id}${classes}`
      }
      const seconds = (value) => value.split(',').reduce((max, part) => {
        const raw = part.trim()
        const amount = Number.parseFloat(raw)
        if (!Number.isFinite(amount)) return max
        return Math.max(max, raw.endsWith('ms') ? amount / 1000 : amount)
      }, 0)

      const all = Array.from(document.body.querySelectorAll('*')).filter((element) => element instanceof HTMLElement && visible(element))
      const outside = []
      const clippedText = []
      const duplicateIds = []
      const reducedMotionViolations = []
      const idCounts = new Map()

      for (const element of document.querySelectorAll('[id]')) {
        idCounts.set(element.id, (idCounts.get(element.id) || 0) + 1)
      }
      for (const [id, count] of idCounts) {
        if (count > 1) duplicateIds.push({ id, count })
      }

      for (const element of all) {
        if (element.closest('[aria-hidden="true"]') || element.classList.contains('skip-link')) continue
        const rect = element.getBoundingClientRect()
        const style = getComputedStyle(element)

        if (style.position !== 'fixed' && (rect.left < -2 || rect.right > window.innerWidth + 2)) {
          outside.push({ element: describe(element), left: Math.round(rect.left), right: Math.round(rect.right) })
        }

        const text = (element.textContent || '').trim()
        const clipsX = ['hidden', 'clip'].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 2
        const clipsY = ['hidden', 'clip'].includes(style.overflowY) && element.scrollHeight > element.clientHeight + 2
        if (text && (clipsX || clipsY)) {
          clippedText.push({
            element: describe(element),
            client: `${element.clientWidth}x${element.clientHeight}`,
            scroll: `${element.scrollWidth}x${element.scrollHeight}`,
          })
        }

        if (reducedMotion === 'reduce' && style.animationName !== 'none' && seconds(style.animationDuration) > 0.01) {
          reducedMotionViolations.push({
            element: describe(element),
            animationName: style.animationName,
            animationDuration: style.animationDuration,
          })
        }
      }

      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        outside: outside.slice(0, 30),
        clippedText: clippedText.slice(0, 30),
        duplicateIds,
        reducedMotionViolations: reducedMotionViolations.slice(0, 30),
      }
    }, scenario.reducedMotion)

    const blockers = []
    if (navigationError) blockers.push('navigation')
    if (consoleErrors.length || pageErrors.length) blockers.push('runtime-console')
    if (diagnostics?.horizontalOverflow) blockers.push('horizontal-overflow')
    if (diagnostics?.clippedText.length) blockers.push('clipped-text')
    if (diagnostics?.duplicateIds.length) blockers.push('duplicate-ids')
    if (diagnostics?.reducedMotionViolations.length) blockers.push('reduced-motion')

    results.push({
      scenario: scenario.name,
      route,
      name,
      navigationError,
      consoleErrors: consoleErrors.slice(0, 20),
      pageErrors: pageErrors.slice(0, 20),
      diagnostics,
      blockers,
    })

    await page.close()
  }
  await context.close()
}

await browser.close()

const blocking = results.filter((result) => result.blockers.length)
const report = {
  generatedAt: new Date().toISOString(),
  standard: 'Archic Staff Boundary Gate 2026.1',
  baseUrl,
  blocking: blocking.length,
  results,
}

await writeFile(`${outputRoot}/boundary-report.json`, JSON.stringify(report, null, 2))

console.log(`\nArchic boundary audit — ${results.length} route/scenario checks`)
for (const result of results) {
  console.log(`${result.blockers.length ? '✗' : '✓'} ${result.scenario} ${result.route}${result.blockers.length ? ` — ${result.blockers.join(', ')}` : ''}`)
}

if (blocking.length) {
  console.error(`\nBoundary audit failed: ${blocking.length} route/scenario combination(s) violate release boundaries.`)
  process.exit(1)
}
console.log('\nBoundary audit passed: 320px reflow, runtime and reduced-motion boundaries are healthy.')
