import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { INTENT_PAGES } from '../src/seo/intentPages'
import { buildLandingGraph } from '../src/seo/landingSchema'
import { BRAND_VERSION, siteOgImage } from '../src/seo/siteSeo'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'
const GSC_TOKEN = 'y-ywY3wwLbE0VyTO3ex8Nf7c4FWClx9R_y4mz_V75ks'
const LASTMOD = new Date().toISOString().slice(0, 10)

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function html(page: (typeof INTENT_PAGES)[number]) {
  const canonical = `${ORIGIN}${page.path}`
  const graph = buildLandingGraph(page, 'es')
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(page.meta.title)}</title>
    <meta name="description" content="${esc(page.meta.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="author" content="Archic" />
    <meta name="application-name" content="Archic" />
    <link rel="canonical" href="${canonical}" />
    <meta name="theme-color" content="#0a0a0b" />
    <link rel="icon" href="/brand/archic-symbol-2026.svg" type="image/svg+xml" sizes="any" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png?v=${BRAND_VERSION}" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=${BRAND_VERSION}" />
    <link rel="manifest" href="/manifest.json?v=${BRAND_VERSION}" />
    <meta name="google-site-verification" content="${GSC_TOKEN}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Archic" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(page.meta.title)}" />
    <meta property="og:description" content="${esc(page.meta.description)}" />
    <meta property="og:image" content="${siteOgImage('es')}" />
    <meta property="og:image:secure_url" content="${siteOgImage('es')}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Archic — diseño web premium y software a medida" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ArchicHQ" />
    <meta name="twitter:title" content="${esc(page.meta.title)}" />
    <meta name="twitter:description" content="${esc(page.meta.description)}" />
    <meta name="twitter:image" content="${siteOgImage('es')}" />
    <script type="application/ld+json">${JSON.stringify(graph)}</script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
}

for (const page of INTENT_PAGES) {
  const dir = resolve(ROOT, page.path.replace(/^\/|\/$/g, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), html(page))
  console.log(`written ${page.path}index.html`)
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  let sitemap = readFileSync(sitemapPath, 'utf8')
  for (const page of INTENT_PAGES) {
    const loc = `${ORIGIN}${page.path}`
    if (sitemap.includes(`<loc>${loc}</loc>`)) continue
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>`
    sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entry}\n</urlset>\n`)
  }
  writeFileSync(sitemapPath, sitemap)
}

const llmsPath = resolve(ROOT, 'public', 'llms.txt')
if (existsSync(llmsPath)) {
  let llms = readFileSync(llmsPath, 'utf8')
  const marker = '## Intenciones de compra'
  const section = `${marker}\n\n${INTENT_PAGES.map((page) => `- [${page.breadcrumb}](${ORIGIN}${page.path}): ${page.meta.description}`).join('\n')}\n`
  if (llms.includes(marker)) llms = llms.replace(new RegExp(`${marker}[\\s\\S]*?(?=\\n## |$)`), section.trimEnd())
  else llms += `\n${section}`
  writeFileSync(llmsPath, llms)
}

const llmsFullPath = resolve(ROOT, 'public', 'llms-full.txt')
if (existsSync(llmsFullPath)) {
  let full = readFileSync(llmsFullPath, 'utf8')
  const marker = '# Intenciones de compra'
  const section = `${marker}\n\n${INTENT_PAGES.map((page) => `## ${page.breadcrumb}\n\nURL: ${ORIGIN}${page.path}\n\n${page.hero.lead}\n\n### ${page.intro.title}\n\n${page.intro.body.join('\n\n')}\n\n### ${page.blocks.title}\n\n${page.blocks.items.map((item) => `- **${item.title}**: ${item.desc}`).join('\n')}\n\n### Preguntas frecuentes\n\n${page.faq.items.map((item) => `**${item.q}**\n\n${item.a}`).join('\n\n')}`).join('\n\n---\n\n')}\n`
  if (full.includes(marker)) full = full.replace(new RegExp(`${marker}[\\s\\S]*$`), section)
  else full += `\n\n${section}`
  writeFileSync(llmsFullPath, full)
}
