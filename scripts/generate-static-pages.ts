/**
 * Genera el HTML estático de cada landing de servicio y regenera sitemap.xml.
 *
 * GitHub Pages no tiene fallback SPA: cada ruta necesita su propio index.html.
 * Además, los rastreadores sociales no ejecutan JavaScript, así que el <head>
 * completo (title, description, canonical, OG, JSON-LD) debe estar ya en el
 * HTML servido, no solo en react-helmet.
 *
 * Uso: bun run scripts/generate-static-pages.ts
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SERVICE_PAGES } from '../src/seo/servicePages'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function head(page: (typeof SERVICE_PAGES)[number]) {
  const canonical = `${ORIGIN}${page.path}`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name: page.serviceName,
        description: page.meta.description,
        serviceType: page.keyword,
        provider: { '@id': `${ORIGIN}/#organization` },
        areaServed: { '@type': 'Country', name: 'España' },
        availableLanguage: ['es', 'en'],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: page.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.meta.title,
        description: page.meta.description,
        inLanguage: 'es',
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': `${ORIGIN}/#organization` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
      },
    ],
  }

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(page.meta.title)}</title>
    <meta data-rh="true" name="description" content="${esc(page.meta.description)}">
    <meta data-rh="true" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="author" content="Archic">
    <meta name="application-name" content="Archic">
    <link data-rh="true" rel="canonical" href="${canonical}">
    <meta name="theme-color" content="#12294c" />
    <link rel="icon" type="image/png" href="/archic-mark.png">
    <link rel="apple-touch-icon" href="/archic-mark.png">
    <meta data-rh="true" property="og:url" content="${canonical}" />
    <meta data-rh="true" property="og:type" content="website" />
    <meta data-rh="true" property="og:site_name" content="Archic" />
    <meta data-rh="true" property="og:locale" content="es_ES" />
    <meta data-rh="true" property="og:title" content="${esc(page.meta.title)}">
    <meta data-rh="true" property="og:description" content="${esc(page.meta.description)}">
    <meta data-rh="true" property="og:image" content="${ORIGIN}/og-image.jpg">
    <meta data-rh="true" property="og:image:secure_url" content="${ORIGIN}/og-image.jpg">
    <meta data-rh="true" property="og:image:type" content="image/jpeg">
    <meta data-rh="true" property="og:image:width" content="1500">
    <meta data-rh="true" property="og:image:height" content="500">
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:site" content="@ArchicHQ" />
    <meta data-rh="true" name="twitter:title" content="${esc(page.meta.title)}">
    <meta data-rh="true" name="twitter:description" content="${esc(page.meta.description)}">
    <meta data-rh="true" name="twitter:image" content="${ORIGIN}/og-image.jpg">
    <script data-rh="true" type="application/ld+json">
${JSON.stringify(ld, null, 2)
      .split('\n')
      .map((line) => `      ${line}`)
      .join('\n')}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
}

for (const page of SERVICE_PAGES) {
  const dir = resolve(ROOT, page.path.replace(/^\/|\/$/g, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), head(page))
  console.log(`written ${page.path}index.html`)
}

/* Sitemap: home y /en/ conservan sus alternates hreflang; las landings son
   solo en castellano, así que se listan sin alternates. */
const sitemapPath = resolve(ROOT, 'public/sitemap.xml')
const current = readFileSync(sitemapPath, 'utf8')
const withoutServices = current.replace(
  /\n  <!-- servicios -->[\s\S]*?<!-- \/servicios -->/,
  '',
)
const serviceEntries = SERVICE_PAGES.map(
  (page) => `  <url>
    <loc>${ORIGIN}${page.path}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`,
).join('\n')
const nextSitemap = withoutServices.replace(
  '</urlset>',
  `  <!-- servicios -->\n${serviceEntries}\n  <!-- /servicios -->\n</urlset>`,
)
writeFileSync(sitemapPath, nextSitemap)
console.log('sitemap.xml updated')
