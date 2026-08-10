import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_PAGE_SEO,
  SITE_ORIGIN,
  buildSitePageGraph,
  siteOgImage,
  sitePageAlternates,
  sitePageCanonical,
  type SitePageKey,
} from '../src/seo/siteSeo'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const GSC_TOKEN = 'y-ywY3wwLbE0VyTO3ex8Nf7c4FWClx9R_y4mz_V75ks'
const pages: SitePageKey[] = ['presence', 'control', 'business', 'studio', 'contact']

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function lastModified(sourceFile: string): string {
  const absolute = resolve(ROOT, sourceFile)
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', relative(ROOT, absolute)], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (iso) return iso.slice(0, 10)
  } catch {
    // Fallback below.
  }
  return statSync(absolute).mtime.toISOString().slice(0, 10)
}

const MODIFIED = lastModified('src/seo/siteSeo.ts')

function html(lang: 'es' | 'en', page: SitePageKey) {
  const seo = SITE_PAGE_SEO[lang][page]
  const canonical = sitePageCanonical(lang, page)
  const alternates = sitePageAlternates(page)
  const image = siteOgImage(lang)
  const graph = buildSitePageGraph(page, lang)

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(seo.title)}</title>
    <meta name="description" content="${esc(seo.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="author" content="Archic" />
    <meta name="application-name" content="Archic" />
    <meta name="google-site-verification" content="${GSC_TOKEN}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${alternates.es}" />
    <link rel="alternate" hreflang="en" href="${alternates.en}" />
    <link rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />
    <meta name="theme-color" content="#0a0a0b" />
    <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
    <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=3" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=3" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
    <link rel="manifest" href="/manifest.json" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Archic" />
    <meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_ES'}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(seo.title)}" />
    <meta property="og:description" content="${esc(seo.description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(seo.ogAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ArchicHQ" />
    <meta name="twitter:title" content="${esc(seo.title)}" />
    <meta name="twitter:description" content="${esc(seo.description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${esc(seo.ogAlt)}" />
    <script type="application/ld+json">${JSON.stringify(graph)}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
}

for (const page of pages) {
  for (const lang of ['es', 'en'] as const) {
    const dir = lang === 'en' ? resolve(ROOT, 'en', page) : resolve(ROOT, page)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), html(lang, page))
    console.log(`written ${lang === 'en' ? 'en/' : ''}${page}/index.html`)
  }
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  let sitemap = readFileSync(sitemapPath, 'utf8')

  for (const page of pages) {
    const escaped = page.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const routePattern = new RegExp(`\\s*<url>[\\s\\S]*?<loc>https://archic\\.es/(?:en/)?${escaped}/<\\/loc>[\\s\\S]*?<\\/url>`, 'g')
    sitemap = sitemap.replace(routePattern, '')
  }

  const entries = pages.flatMap((page) => {
    const alternates = sitePageAlternates(page)
    return [
      { loc: alternates.es, lang: 'es' },
      { loc: alternates.en, lang: 'en' },
    ].map(({ loc }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${MODIFIED}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${alternates.es}" />
    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />
  </url>`)
  }).join('\n')

  sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`)
  writeFileSync(sitemapPath, sitemap)
  console.log('updated public/sitemap.xml with core Archic routes')
}
