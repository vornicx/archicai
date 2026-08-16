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
      await new Promise((resolve) => setTimeout(resolve, 45))
    }
    window.scrollTo(0, document.documentElement.scrollHeight)
    await new Promise((resolve) => setTimeout(resolve, 120))
    window.scrollTo(0, 0)
    await new Promise((resolve) => setTimeout(resolve, 120))
  })
}

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 })

  for (const [name, route] of routes) {
    const page = await context.newPage()
    const requestFailures = []
    const badResponses = []

    page.on('requestfailed', (request) => {
      requestFailures.push({ url: request.url(), error: request.failure()?.errorText || 'request failed' })
    })
    page.on('response', (response) => {
      if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() })
    })

    const url = new URL(route, baseUrl).toString()
    let navigationError = null

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 })
      await page.evaluate(async () => {
        if (document.fonts?.ready) await document.fonts.ready
      })
      await revealWholePage(page)
    } catch (error) {
      navigationError = error instanceof Error ? error.message : String(error)
    }

    const diagnostics = navigationError ? null : await page.evaluate(() => {
      const isVisible = (el) => {
        const style = getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) > 0.01 && rect.width > 1 && rect.height > 1
      }
      const label = (el) => {
        const text = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ')
        const id = el.id ? `#${el.id}` : ''
        const cls = typeof el.className === 'string' && el.className.trim()
          ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}`
          : ''
        return `${el.tagName.toLowerCase()}${id}${cls}${text ? ` — ${text.slice(0, 90)}` : ''}`
      }

      const all = Array.from(document.body.querySelectorAll('*'))
      const outside = []
      const clippedText = []
      const smallTargets = []

      for (const el of all) {
        if (!(el instanceof HTMLElement) || !isVisible(el)) continue
        if (el.closest('[aria-hidden="true"]')) continue
        const rect = el.getBoundingClientRect()
        const style = getComputedStyle(el)

        if ((rect.right > window.innerWidth + 2 || rect.left < -2) && style.position !== 'fixed') {
          outside.push({ element: label(el), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) })
        }

        const text = (el.textContent || '').trim()
        const clipsX = ['hidden', 'clip'].includes(style.overflowX) && el.scrollWidth > el.clientWidth + 2
        const clipsY = ['hidden', 'clip'].includes(style.overflowY) && el.scrollHeight > el.clientHeight + 2
        if (text && (clipsX || clipsY)) {
          clippedText.push({
            element: label(el),
            client: `${el.clientWidth}x${el.clientHeight}`,
            scroll: `${el.scrollWidth}x${el.scrollHeight}`,
          })
        }

        if (el.matches('a,button,input,select,textarea,[role="button"]')) {
          if (rect.width < 34 || rect.height < 34) {
            smallTargets.push({ element: label(el), size: `${Math.round(rect.width)}x${Math.round(rect.height)}` })
          }
        }
      }

      const brokenImages = Array.from(document.images)
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src)

      return {
        title: document.title,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        document: {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
        },
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 2,
        outside: outside.slice(0, 30),
        clippedText: clippedText.slice(0, 30),
        smallTargets: smallTargets.slice(0, 30),
        brokenImages,
      }
    })

    const screenshotPath = `${outputRoot}/screenshots/${viewportName}/${name}.png`
    if (!navigationError) {
      await page.screenshot({ path: screenshotPath, fullPage: true, animations: 'disabled' })
    }

    results.push({
      viewport: viewportName,
      name,
      route,
      url,
      navigationError,
      requestFailures: requestFailures.slice(0, 30),
      badResponses: badResponses.slice(0, 30),
      diagnostics,
      screenshot: navigationError ? null : screenshotPath,
    })

    await page.close()
  }

  await context.close()
}

await browser.close()

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  standard: 'Archic Quality Standard 2026.1',
  results,
}

await writeFile(`${outputRoot}/report.json`, JSON.stringify(report, null, 2))

const lines = [
  '# Archic visual audit',
  '',
  `Generated: ${report.generatedAt}`,
  `Base URL: ${baseUrl}`,
  '',
  '| Viewport | Route | H overflow | Outside | Clipped text | Broken images | HTTP/request errors |',
  '|---|---|---:|---:|---:|---:|---:|',
]

for (const item of results) {
  const d = item.diagnostics
  const errors = item.requestFailures.length + item.badResponses.length + (item.navigationError ? 1 : 0)
  lines.push(`| ${item.viewport} | ${item.route} | ${d?.horizontalOverflow ? 'YES' : 'no'} | ${d?.outside.length ?? '-'} | ${d?.clippedText.length ?? '-'} | ${d?.brokenImages.length ?? '-'} | ${errors} |`)
}

lines.push('', '## Notes', '')
lines.push('- Screenshots are full-page renders after scrolling through the document so reveal-on-scroll content is visible.')
lines.push('- “Outside” excludes elements inside `aria-hidden=true`; inspect the JSON before treating every item as a defect.')
lines.push('- Small interactive targets are recorded in `report.json` as an accessibility/UX review aid, but do not automatically fail the audit.')

await writeFile(`${outputRoot}/report.md`, `${lines.join('\n')}\n`)
console.log(lines.join('\n'))
