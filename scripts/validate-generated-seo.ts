import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BRAND_VERSION } from '../src/seo/siteSeo'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'
const core = [
  'index.html',
  'en/index.html',
  'presence/index.html',
  'control/index.html',
  'business/index.html',
  'studio/index.html',
  'contact/index.html',
  'en/presence/index.html',
  'en/control/index.html',
  'en/business/index.html',
  'en/studio/index.html',
  'en/contact/index.html',
]

const errors: string[] = []
const escapedBrandVersion = BRAND_VERSION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function sourceFileForUrl(url: string) {
  const pathname = new URL(url).pathname
  if (pathname === '/') return resolve(ROOT, 'index.html')
  return resolve(ROOT, pathname.replace(/^\/|\/$/g, ''), 'index.html')
}

function hasEmptyRoot(html: string) {
  return /<div\s+id=["']root["']\s*>\s*<\/div>/i.test(html)
}

for (const relative of core) {
  const file = resolve(ROOT, relative)
  if (!existsSync(file)) {
    errors.push(`${relative}: missing file`)
    continue
  }

  const html = readFileSync(file, 'utf8')
  const required = [
    ['title', /<title>[^<]{8,}<\/title>/i],
    ['description', /<meta[^>]+name="description"[^>]+content="[^"]{40,}"/i],
    ['canonical', /<link[^>]+rel="canonical"[^>]+href="https:\/\/archic\.es\//i],
    ['robots', /<meta[^>]+name="robots"[^>]+content="index, follow(?:,|\")/i],
    ['manifest', new RegExp(`<link[^>]+rel="manifest"[^>]+href="/manifest\\.json\\?v=${escapedBrandVersion}"`, 'i')],
    ['canonical brand symbol', /<link[^>]+rel="icon"[^>]+href="\/brand\/archic-symbol-2026\.svg"[^>]+image\/svg\+xml/i],
    ['Open Graph image', new RegExp(`<meta[^>]+property="og:image"[^>]+content="https://archic\\.es/og-image(?:-en)?\\.png\\?v=${escapedBrandVersion}"`, 'i')],
    ['JSON-LD', /<script[^>]+application\/ld\+json[^>]*>[\s\S]+?<\/script>/i],
  ] as const

  for (const [label, pattern] of required) {
    if (!pattern.test(html)) errors.push(`${relative}: missing or invalid ${label}`)
  }

  if (hasEmptyRoot(html)) errors.push(`${relative}: empty root leaves crawlers without prerendered content`)
  if (html.includes('?v=3')) errors.push(`${relative}: legacy v=3 brand resource remains`)
  if (html.includes('/archic-mark-512.png')) errors.push(`${relative}: legacy organization logo URL remains`)
  if (html.includes('/og-image.jpg')) errors.push(`${relative}: legacy social preview URL remains`)
  if (html.includes('/site.webmanifest')) errors.push(`${relative}: legacy manifest reference`)
  if (relative === 'index.html' || relative === 'en/index.html') {
    if (html.includes('#localbusiness') || html.includes('openingHoursSpecification')) {
      errors.push(`${relative}: unverified LocalBusiness data in homepage schema`)
    }
  }

  const jsonLd = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]+?)<\/script>/i)?.[1]
  if (jsonLd) {
    try {
      JSON.parse(jsonLd.trim())
    } catch {
      errors.push(`${relative}: invalid JSON-LD JSON`)
    }
  }
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  const unique = new Set(locs)
  if (unique.size !== locs.length) errors.push('public/sitemap.xml: duplicate URLs')

  const forbiddenPrefixes = [
    '/aviso-legal/',
    '/privacidad/',
    '/cookies/',
    '/en/legal-notice/',
    '/en/privacy/',
    '/en/cookies/',
    '/explorations/',
    '/en/explorations/',
  ]

  for (const loc of locs) {
    let url: URL
    try {
      url = new URL(loc)
    } catch {
      errors.push(`public/sitemap.xml: invalid URL ${loc}`)
      continue
    }

    if (url.origin !== ORIGIN) errors.push(`public/sitemap.xml: foreign origin ${loc}`)
    if (forbiddenPrefixes.some((path) => url.pathname.startsWith(path))) {
      errors.push(`public/sitemap.xml: noindex/non-commercial route leaked into sitemap: ${url.pathname}`)
    }

    const htmlFile = sourceFileForUrl(loc)
    if (!existsSync(htmlFile)) {
      errors.push(`public/sitemap.xml: ${url.pathname} has no generated HTML document`)
      continue
    }

    const html = readFileSync(htmlFile, 'utf8')
    if (hasEmptyRoot(html)) errors.push(`${url.pathname}: sitemap URL has an empty prerender root`)
    if (/<meta[^>]+name="robots"[^>]+content="noindex\b/i.test(html)) {
      errors.push(`${url.pathname}: noindex URL must not appear in sitemap`)
    }
  }
} else {
  errors.push('public/sitemap.xml: missing file')
}

if (errors.length) {
  console.error(`SEO validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  process.exit(1)
}

console.log(`SEO validation passed for ${core.length} core HTML documents and every sitemap URL with Archic brand ${BRAND_VERSION}`)
