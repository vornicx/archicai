import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'
const MODIFIED = statSync(resolve(ROOT, 'src/pages/ExplorationPage.tsx')).mtime.toISOString().slice(0, 10)

const explorations = [
  {
    slug: 'hospitality',
    es: {
      title: 'Hospitality Control white-label — Archic',
      description: 'Entorno white-label interactivo de Archic para reservas, sala, clientes y operación de hostelería con datos ficticios.',
    },
    en: {
      title: 'White-label Hospitality Control — Archic',
      description: 'An interactive Archic white-label environment for bookings, floor operations, customers and hospitality workflows using fictional data.',
    },
  },
  {
    slug: 'mobility',
    es: {
      title: 'Mobility Control white-label — Archic',
      description: 'Entorno white-label interactivo de Archic para flota, disponibilidad, solicitudes, calendario y clientes con datos ficticios.',
    },
    en: {
      title: 'White-label Mobility Control — Archic',
      description: 'An interactive Archic white-label environment for fleet, availability, enquiries, calendar and clients using fictional data.',
    },
  },
  {
    slug: 'real-estate',
    es: {
      title: 'Property Control white-label — Archic',
      description: 'Entorno white-label interactivo de Archic para propiedades, CRM, leads, visitas y contenido con datos ficticios.',
    },
    en: {
      title: 'White-label Property Control — Archic',
      description: 'An interactive Archic white-label environment for properties, CRM, leads, viewings and content using fictional data.',
    },
  },
] as const

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function pageHtml(slug: string, lang: 'es' | 'en', title: string, description: string) {
  const esUrl = `${ORIGIN}/explorations/${slug}/`
  const enUrl = `${ORIGIN}/en/explorations/${slug}/`
  const canonical = lang === 'en' ? enUrl : esUrl

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${esUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${esUrl}" />
    <meta name="theme-color" content="#090908" />
    <link rel="icon" href="/brand/archic-symbol-2026.svg" type="image/svg+xml" sizes="any" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Archic" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta name="twitter:card" content="summary" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
}

for (const exploration of explorations) {
  for (const lang of ['es', 'en'] as const) {
    const copy = exploration[lang]
    const dir = lang === 'en'
      ? resolve(ROOT, 'en', 'explorations', exploration.slug)
      : resolve(ROOT, 'explorations', exploration.slug)
    mkdirSync(dir, { recursive: true })
    writeFileSync(resolve(dir, 'index.html'), pageHtml(exploration.slug, lang, copy.title, copy.description))
    console.log(`written ${lang === 'en' ? 'en/' : ''}explorations/${exploration.slug}/index.html`)
  }
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const rootOpen = sitemap.match(/^([\s\S]*?<urlset[^>]*>)/)?.[1]
  const blocks = sitemap.match(/\s*<url>[\s\S]*?<\/url>/g) ?? []
  const urls = new Set(explorations.flatMap(({ slug }) => [
    `${ORIGIN}/explorations/${slug}/`,
    `${ORIGIN}/en/explorations/${slug}/`,
  ]))
  const preserved = blocks.filter((block) => {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    return !loc || !urls.has(loc)
  })
  const entries = explorations.flatMap(({ slug }) => {
    const esUrl = `${ORIGIN}/explorations/${slug}/`
    const enUrl = `${ORIGIN}/en/explorations/${slug}/`
    return [esUrl, enUrl].map((loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${MODIFIED}</lastmod>
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />
  </url>`)
  })

  if (rootOpen) {
    writeFileSync(sitemapPath, `${rootOpen}\n${[...preserved.map((block) => block.trim()), ...entries].join('\n')}\n</urlset>\n`)
  }
  console.log('updated public/sitemap.xml with Archic white-label routes')
}
