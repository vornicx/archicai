import { execFileSync } from 'node:child_process'
import { GUIDES, GUIDES_INDEX_PATH } from '../src/content/guides'
import { INTENT_PAGES } from '../src/seo/intentPages'
import { LOCAL_PAGES } from '../src/seo/localPages'
import { SERVICE_PAGES } from '../src/seo/servicePages'
import { type SitePageKey } from '../src/seo/siteSeo'

const ORIGIN = 'https://archic.es'
const HOST = 'archic.es'
const KEY = '19cf58b5-e9ae-4bb8-9811-144888dab785'
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`
const SITE_PAGES: SitePageKey[] = ['presence', 'control', 'business', 'studio', 'contact']

const homeUrls = [`${ORIGIN}/`, `${ORIGIN}/en/`]
const siteUrls = SITE_PAGES.flatMap((page) => [`${ORIGIN}/${page}/`, `${ORIGIN}/en/${page}/`])
const serviceUrls = SERVICE_PAGES.map((page) => `${ORIGIN}${page.path}`)
const localUrls = LOCAL_PAGES.map((page) => `${ORIGIN}${page.path}`)
const intentUrls = INTENT_PAGES.map((page) => `${ORIGIN}${page.path}`)
const guideUrls = [`${ORIGIN}${GUIDES_INDEX_PATH}`, ...GUIDES.map((guide) => `${ORIGIN}${guide.path}`)]
const allIndexableUrls = [...new Set([...homeUrls, ...siteUrls, ...serviceUrls, ...localUrls, ...intentUrls, ...guideUrls])]

function changedFiles() {
  try {
    return execFileSync('git', ['diff', '--name-only', 'HEAD^', 'HEAD'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .split('\n')
      .map((file) => file.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

function add(target: Set<string>, urls: string[]) {
  for (const url of urls) target.add(url)
}

const changed = changedFiles()
const urls = new Set<string>()

const bootstrapOrArchitectureChange = changed.some((file) =>
  file === 'scripts/seo-hardening.ts' ||
  file === 'scripts/submit-indexnow.ts' ||
  file === 'package.json' ||
  file === 'public/sitemap.xml' ||
  file.startsWith('scripts/generate-') ||
  file === 'scripts/postprocess-generated-seo.ts',
)

if (bootstrapOrArchitectureChange || changed.length === 0) add(urls, allIndexableUrls)

if (changed.some((file) => file === 'src/i18n/content.ts' || file === 'src/pages/ArchicHome.tsx' || file === 'src/seo/homeSchema.ts')) {
  add(urls, homeUrls)
}

if (changed.some((file) => file === 'src/seo/siteSeo.ts' || file === 'src/pages/ArchicSitePage.tsx')) {
  add(urls, [...homeUrls, ...siteUrls])
}

if (changed.some((file) => file === 'src/seo/servicePages.ts' || file === 'src/pages/ServicePage.tsx' || file === 'src/seo/landingSchema.ts')) {
  add(urls, [...serviceUrls, ...localUrls, ...intentUrls])
}

if (changed.includes('src/seo/localPages.ts')) add(urls, localUrls)
if (changed.includes('src/seo/intentPages.ts')) add(urls, intentUrls)
if (changed.some((file) => file === 'src/content/guides.ts' || file === 'src/pages/GuidePage.tsx' || file === 'src/pages/GuidesIndex.tsx')) {
  add(urls, guideUrls)
}

// Shared navigation/copy can alter crawl paths across the whole public site.
if (changed.some((file) => file === 'src/components/StudioHeader.tsx' || file === 'src/components/StudioFooter.tsx')) {
  add(urls, allIndexableUrls)
}

if (urls.size === 0) {
  console.log(`IndexNow: no index-relevant URL changes in ${changed.length} changed file(s); skipping.`)
  process.exit(0)
}

const urlList = [...urls]
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
})

if (response.status === 200 || response.status === 202) {
  console.log(`IndexNow: ${urlList.length} URL(s) submitted (${response.status}).`)
} else {
  // Search-engine notification must never roll back an otherwise healthy site deployment.
  const body = await response.text().catch(() => '')
  console.warn(`IndexNow: submission returned ${response.status}. ${body.slice(0, 300)}`)
}
