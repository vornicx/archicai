// Lab performance measurement (Lighthouse, simulated throttling) against a locally served build.
// These are LAB numbers for one environment, not field Core Web Vitals (P75 of real users).
// Usage: npm run build && npx vite preview --port 4173 & ; CHROME_PATH=... node scripts/audit-performance.mjs
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import { writeFileSync, mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL || 'http://localhost:4173'
const PATHS = (process.env.PATHS || '/,/lab/,/lab/weather/').split(',')
const RUNS = Number(process.env.RUNS || 3)
const chrome = await chromeLauncher.launch({ chromePath: process.env.CHROME_PATH, chromeFlags: ['--headless=new', '--no-sandbox'] })
const out = []
for (const formFactor of ['mobile', 'desktop']) {
  for (const p of PATHS) {
    const runs = []
    for (let i = 0; i < RUNS; i++) {
      const config = formFactor === 'desktop'
        ? { extends: 'lighthouse:default', settings: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false }, throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 }, onlyCategories: ['performance'] } }
        : { extends: 'lighthouse:default', settings: { formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 3, disabled: false }, onlyCategories: ['performance'] } }
      const r = await lighthouse(BASE + p, { port: chrome.port, logLevel: 'error' }, config)
      const a = r.lhr.audits
      runs.push({ score: Math.round(r.lhr.categories.performance.score * 100), fcp: a['first-contentful-paint'].numericValue, lcp: a['largest-contentful-paint'].numericValue, tbt: a['total-blocking-time'].numericValue, cls: a['cumulative-layout-shift'].numericValue, bytes: a['total-byte-weight'].numericValue, lcpEl: a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet })
    }
    const med = (k) => runs.map((x) => x[k]).sort((a, b) => a - b)[Math.floor(runs.length / 2)]
    const row = { formFactor, path: p, runs: runs.length, score: med('score'), fcpMs: Math.round(med('fcp')), lcpMs: Math.round(med('lcp')), tbtMs: Math.round(med('tbt')), cls: +med('cls').toFixed(3), kb: Math.round(med('bytes') / 1024), lcpElement: runs[0].lcpEl }
    out.push(row); console.log(JSON.stringify(row))
  }
}
await chrome.kill()
mkdirSync('docs/audit', { recursive: true })
writeFileSync(`docs/audit/perf-${process.env.LABEL || 'latest'}.json`, JSON.stringify(out, null, 2))
