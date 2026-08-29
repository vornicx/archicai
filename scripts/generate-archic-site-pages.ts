import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ARCHIC_COMMERCIAL_SUMMARY_ES,
  BRAND_VERSION,
  HOME_SEO,
  SITE_PAGE_SEO,
  SITE_ORIGIN,
  buildSitePageGraph,
  siteOgImage,
  sitePageAlternates,
  sitePageCanonical,
  type SitePageKey,
} from '../src/seo/siteSeo'
import { buildHomeGraph, homeCanonical } from '../src/seo/homeSchema'

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

function headDocument(input: {
  lang: 'es' | 'en'
  canonical: string
  title: string
  description: string
  ogAlt: string
  graph: unknown
  alternates: { es: string; en: string; xDefault: string }
}) {
  const { lang, canonical, title, description, ogAlt, graph, alternates } = input
  const image = siteOgImage(lang)

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
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
    <link rel="icon" href="/brand/archic-symbol-2026.svg" type="image/svg+xml" sizes="any" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png?v=${BRAND_VERSION}" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=${BRAND_VERSION}" />
    <link rel="manifest" href="/manifest.json?v=${BRAND_VERSION}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Archic" />
    <meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_ES'}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:secure_url" content="${image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(ogAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ArchicHQ" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="${esc(ogAlt)}" />
    <script type="application/ld+json">${JSON.stringify(graph)}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
}

function html(lang: 'es' | 'en', page: SitePageKey) {
  const seo = SITE_PAGE_SEO[lang][page]
  return headDocument({
    lang,
    canonical: sitePageCanonical(lang, page),
    title: seo.title,
    description: seo.description,
    ogAlt: seo.ogAlt,
    graph: buildSitePageGraph(page, lang),
    alternates: sitePageAlternates(page),
  })
}

for (const page of pages) {
  for (const lang of ['es', 'en'] as const) {
    const dir = lang === 'en' ? resolve(ROOT, 'en', page) : resolve(ROOT, page)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), html(lang, page))
    console.log(`written ${lang === 'en' ? 'en/' : ''}${page}/index.html`)
  }
}

const homeAlternates = {
  es: `${SITE_ORIGIN}/`,
  en: `${SITE_ORIGIN}/en/`,
  xDefault: `${SITE_ORIGIN}/`,
}

for (const lang of ['es', 'en'] as const) {
  const seo = HOME_SEO[lang]
  const dir = lang === 'en' ? resolve(ROOT, 'en') : ROOT
  mkdirSync(dir, { recursive: true })
  writeFileSync(
    resolve(dir, 'index.html'),
    headDocument({
      lang,
      canonical: homeCanonical(lang),
      title: seo.title,
      description: seo.description,
      ogAlt: seo.ogAlt,
      graph: buildHomeGraph(lang),
      alternates: homeAlternates,
    }),
  )
  console.log(`written commercial home ${lang === 'en' ? 'en/' : ''}index.html`)
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const rootOpen = sitemap.match(/^([\s\S]*?<urlset[^>]*>)/)?.[1]
  const blocks = sitemap.match(/\s*<url>[\s\S]*?<\/url>/g) ?? []
  const coreUrls = new Set(
    pages.flatMap((page) => {
      const alternates = sitePageAlternates(page)
      return [alternates.es, alternates.en]
    }),
  )
  const preserved = blocks.filter((block) => {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    return !loc || !coreUrls.has(loc)
  })

  const entries = pages.flatMap((page) => {
    const alternates = sitePageAlternates(page)
    return [alternates.es, alternates.en].map((loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${MODIFIED}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${alternates.es}" />
    <xhtml:link rel="alternate" hreflang="en" href="${alternates.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates.xDefault}" />
  </url>`)
  })

  if (rootOpen) {
    writeFileSync(
      sitemapPath,
      `${rootOpen}\n${[...preserved.map((block) => block.trim()), ...entries].join('\n')}\n</urlset>\n`,
    )
  }
  console.log('updated public/sitemap.xml with core Archic routes')
}

const commercialBlockEs = `## Modelo de trabajo 2026

- **Archic Presence**: dirección digital, web premium, contenido, conversión y base técnica de búsqueda.
- **Archic Control**: sistemas privados para clientes, reservas, recursos, disponibilidad y operación.
- **Archic Business**: software a medida, automatización, integraciones y datos.
- **Digital Opportunity Audit**: diagnóstico de presencia, conversión, búsqueda y operación para priorizar qué merece construirse primero.
- **Archic Evolution**: monitorización y mejora continua después del lanzamiento.

## Archic Method

1. Discovery — entender el negocio, el problema y la señal que demostraría una mejora.
2. Architecture — definir información, recorridos, datos, funcionalidades y dirección antes de multiplicar pantallas.
3. Build — diseño y desarrollo sobre producto real y navegable.
4. Validation — QA funcional, mobile, visual, rendimiento, accesibilidad, búsqueda y recorridos críticos.
5. Evolution — medir, aprender y priorizar mejoras con datos reales.

## Inversión orientativa

- Presence: desde 1.200 €.
- Control: desde 2.500 €.
- Business: desde 4.000 €.
- Evolution: desde 150 €/mes.

Son mínimos orientativos, no paquetes cerrados. El presupuesto final se fija después del diagnóstico y depende del alcance.

## Estándar de evidencia

Los prototipos y concept builds se etiquetan como tales y no se presentan como clientes. Archic solo publica un resultado de negocio como caso de éxito cuando existe una línea base y una fuente de datos que permita demostrarlo. La base Search & AI Readiness incluye metadatos, Schema.org, sitemap, canonicals, crawlability, contenido semántico y llms cuando aporta; no se prometen posiciones ni visibilidad en IA sin evidencia.
`

const llmsPath = resolve(ROOT, 'public', 'llms.txt')
if (existsSync(llmsPath)) {
  let llms = readFileSync(llmsPath, 'utf8')
  llms = llms.replace(/^> .*$/m, `> ${ARCHIC_COMMERCIAL_SUMMARY_ES}`)
  if (!llms.includes('## Modelo de trabajo 2026')) {
    llms = llms.replace('\n## Servicios\n', `\n${commercialBlockEs}\n## Servicios\n`)
  }
  writeFileSync(llmsPath, llms)
  console.log('updated public/llms.txt with current commercial model')
}

const llmsFullPath = resolve(ROOT, 'public', 'llms-full.txt')
if (existsSync(llmsFullPath)) {
  let llmsFull = readFileSync(llmsFullPath, 'utf8')
  llmsFull = llmsFull.replace(/^> .*$/m, `> ${ARCHIC_COMMERCIAL_SUMMARY_ES}`)
  if (!llmsFull.includes('## Modelo de trabajo 2026')) {
    const firstSection = llmsFull.indexOf('\n## ')
    if (firstSection !== -1) {
      llmsFull = `${llmsFull.slice(0, firstSection)}\n\n${commercialBlockEs}${llmsFull.slice(firstSection)}`
    }
  }
  writeFileSync(llmsFullPath, llmsFull)
  console.log('updated public/llms-full.txt with current commercial model')
}
