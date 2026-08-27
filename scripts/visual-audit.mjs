import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const outputRoot = process.env.AUDIT_OUTPUT || 'visual-audit'

const routes = [
  ['home', '/'],
  ['presence', '/presence/'],
  ['control', '/control/'],
  ['business', '/business/'],
  ['studio', '/studio/'],
  ['contact', '/contact/'],
  ['hospitality', '/explorations/hospitality/'],
  ['mobility', '/explorations/mobility/'],
  ['real-estate', '/explorations/real-estate/'],
  ['seo-restaurants', '/diseno-web-restaurantes/'],
  ['seo-sevilla', '/diseno-web-sevilla/'],
  ['seo-reservations', '/software-reservas-a-medida/'],
  ['seo-software', '/precio-software-a-medida/'],
]

const viewports = [
  ['desktop', { width: 1440, height: 1000 }],
  ['mobile', { width: 390, height: 844 }],
]

await mkdir(`${outputRoot}/screenshots/desktop`, { recursive: true })
await mkdir(`${outputRoot}/screenshots/mobile`, { recursive: true })

const browser = await chromium.launch({ headless: true })
const results = []

async function revealWholePage(page) {
  await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.72))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 70))
    }
    window.scrollTo(0, document.documentElement.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 180))
    window.scrollTo(0, 0)
    await new Promise((resolve) => setTimeout(resolve, 180))
  })
}

async function verifyMenu(page) {
  const button = page.locator('.as-menu-button').first()
  if (!(await button.count())) return null

  const panel = page.locator('#archic-menu')
  const firstLink = panel.locator('nav a').first()
  await button.click()
  await page.waitForFunction(() => document.querySelector('#archic-menu')?.getAttribute('data-open') === 'true')
  await firstLink.waitFor({ state: 'visible', timeout: 2_000 })
  const opened = await button.getAttribute('aria-expanded') === 'true'
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => document.querySelector('.as-menu-button')?.getAttribute('aria-expanded') === 'false')
  return opened
}

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })

  for (const [name, route] of routes) {
    const page = await context.newPage()
    const requestFailures = []
    const badResponses = []
    const consoleErrors = []
    const pageErrors = []

    page.on('requestfailed', (request) => requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'request failed' }))
    page.on('response', (response) => { if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() }) })
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    page.on('pageerror', (error) => pageErrors.push(error.message))

    const url = new URL(route, baseUrl).toString()
    let navigationError = null
    let menuHealthy = null

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 })
      await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready })
      menuHealthy = await verifyMenu(page)
      await revealWholePage(page)
    } catch (error) {
      navigationError = error instanceof Error ? error.message : String(error)
    }

    const diagnostics = navigationError ? null : await page.evaluate((mode) => {
      const isVisible = (el) => {
        const style = getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0.01 && rect.width > 1 && rect.height > 1
      }
      const label = (el) => {
        const text = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ')
        const id = el.id ? `#${el.id}` : ''
        const cls = typeof el.className === 'string' && el.className.trim() ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}` : ''
        return `${el.tagName.toLowerCase()}${id}${cls}${text ? ` — ${text.slice(0, 90)}` : ''}`
      }
      const hasDirectText = (el) => Array.from(el.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      const isTextElement = (el) => el.matches('p,h1,h2,h3,h4,h5,h6,span,strong,small,label,a,button,li,dt,dd,legend,time,em,b')

      const all = Array.from(document.body.querySelectorAll('*'))
      const outside = []
      const clippedText = []
      const smallTargets = []
      const weakPrimaryTargets = []

      for (const el of all) {
        if (!(el instanceof HTMLElement) || !isVisible(el) || el.closest('[aria-hidden="true"]') || el.classList.contains('skip-link')) continue
        const rect = el.getBoundingClientRect()
        const style = getComputedStyle(el)

        if ((rect.right > window.innerWidth + 2 || rect.left < -2) && style.position !== 'fixed') {
          outside.push({ element: label(el), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) })
        }

        const text = (el.textContent || '').trim()
        const clipsX = ['hidden', 'clip'].includes(style.overflowX) && el.scrollWidth > el.clientWidth + 2
        const clipsY = ['hidden', 'clip'].includes(style.overflowY) && el.scrollHeight > el.clientHeight + 2
        if (text && (hasDirectText(el) || isTextElement(el)) && (clipsX || clipsY)) {
          clippedText.push({ element: label(el), client: `${el.clientWidth}x${el.clientHeight}`, scroll: `${el.scrollWidth}x${el.scrollHeight}`, overflow: `${style.overflowX}/${style.overflowY}` })
        }

        if (el.matches('a,button,input,select,textarea,[role="button"]') && (rect.width < 34 || rect.height < 34)) {
          smallTargets.push({ element: label(el), size: `${Math.round(rect.width)}x${Math.round(rect.height)}` })
        }

        const primary = el.matches('.ag-btn,.as-btn,.sx-btn,.sx-button,.as-menu-button,.as-project-link,.as-brand,.axv-layer-switch button,.axv-product button')
        const min = mode === 'mobile' ? 40 : 36
        if (primary && (rect.width < min || rect.height < min)) weakPrimaryTargets.push({ element: label(el), size: `${Math.round(rect.width)}x${Math.round(rect.height)}`, required: min })
      }

      const brokenImages = Array.from(document.images).filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc || img.src)
      const hiddenReveals = Array.from(document.querySelectorAll('[data-reveal]')).filter((el) => {
        const style = getComputedStyle(el)
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) < 0.5
      }).map(label)

      return {
        title: document.title,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        document: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight },
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        outside: outside.slice(0, 30),
        clippedText: clippedText.slice(0, 30),
        smallTargets: smallTargets.slice(0, 30),
        weakPrimaryTargets: weakPrimaryTargets.slice(0, 30),
        hiddenReveals: hiddenReveals.slice(0, 30),
        brokenImages,
      }
    }, viewportName)

    const screenshotPath = `${outputRoot}/screenshots/${viewportName}/${name}.png`
    if (!navigationError) await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled' })

    const blockers = []
    if (navigationError) blockers.push('navigation')
    if (requestFailures.length || badResponses.length) blockers.push('network/http')
    if (consoleErrors.length || pageErrors.length) blockers.push('runtime-console')
    if (menuHealthy === false) blockers.push('menu-interaction')
    if (diagnostics?.horizontalOverflow) blockers.push('horizontal-overflow')
    if (diagnostics?.brokenImages.length) blockers.push('broken-images')
    if (diagnostics?.clippedText.length) blockers.push('clipped-text')
    if (diagnostics?.weakPrimaryTargets.length) blockers.push('primary-target-size')
    if (diagnostics?.hiddenReveals.length) blockers.push('hidden-reveal-content')

    results.push({ viewport: viewportName, name, route, url, navigationError, menuHealthy, requestFailures: requestFailures.slice(0, 30), badResponses: badResponses.slice(0, 30), consoleErrors: consoleErrors.slice(0, 30), pageErrors: pageErrors.slice(0, 30), diagnostics, blockers, screenshot: navigationError ? null : screenshotPath })
    await page.close()
  }
  await context.close()
}

await browser.close()

const blockingResults = results.filter((item) => item.blockers.length)
const report = { generatedAt: new Date().toISOString(), baseUrl, standard: 'Archic Quality Standard 2026.1', blocking: blockingResults.length, results }
await writeFile(`${outputRoot}/report.json`, JSON.stringify(report, null, 2))

const lines = [
  '# Archic visual audit', '', `Generated: ${report.generatedAt}`, `Base URL: ${baseUrl}`, `Blocking route/view combinations: ${blockingResults.length}`, '',
  '| Viewport | Route | Overflow | Clipped | Primary targets | Hidden reveals | Broken images | Runtime/network | Menu |',
  '|---|---|---:|---:|---:|---:|---:|---:|---:|',
]

for (const item of results) {
  const d = item.diagnostics
  const errors = item.requestFailures.length + item.badResponses.length + item.consoleErrors.length + item.pageErrors.length + (item.navigationError ? 1 : 0)
  lines.push(`| ${item.viewport} | ${item.route} | ${d?.horizontalOverflow ? 'YES' : 'no'} | ${d?.clippedText.length ?? '-'} | ${d?.weakPrimaryTargets.length ?? '-'} | ${d?.hiddenReveals.length ?? '-'} | ${d?.brokenImages.length ?? '-'} | ${errors} | ${item.menuHealthy === false ? 'FAIL' : 'ok'} |`)
}

lines.push('', '## Blocking details', '')
for (const item of blockingResults) {
  lines.push(`### ${item.viewport} ${item.route}`)
  lines.push(`- blockers: ${item.blockers.join(', ')}`)
  for (const clip of item.diagnostics?.clippedText ?? []) lines.push(`- clipped: ${clip.element} (${clip.client} → ${clip.scroll}; ${clip.overflow})`)
  for (const reveal of item.diagnostics?.hiddenReveals ?? []) lines.push(`- hidden reveal: ${reveal}`)
  for (const target of item.diagnostics?.weakPrimaryTargets ?? []) lines.push(`- target: ${target.element} (${target.size}, min ${target.required})`)
  if (item.navigationError) lines.push(`- navigation: ${item.navigationError}`)
}

lines.push('', '## Blocking policy', '', '- Navigation, HTTP/request failures, runtime console errors, horizontal overflow, broken images and a broken menu interaction fail the audit.', '- Visible clipped text, hidden reveal content and undersized primary controls fail the audit.', '- Clipping is evaluated on semantic/direct text nodes so decorative pseudo-elements cannot create false positives.', '- Secondary tiny links remain recorded under `smallTargets` for review, but do not block release by themselves.', '- Screenshots are full-page renders after scrolling through the document so reveal-on-scroll content is exercised.')
await writeFile(`${outputRoot}/report.md`, `${lines.join('\n')}\n`)
console.log(lines.join('\n'))

if (blockingResults.length) {
  console.error(`\nVisual audit failed: ${blockingResults.length} route/view combination(s) contain blocking defects.`)
  process.exit(1)
}
console.log('\nVisual audit passed with zero blocking defects.')