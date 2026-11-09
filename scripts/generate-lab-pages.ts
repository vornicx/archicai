import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Static entrypoints for Vite's multi-page build, generated rather than hand-edited.
const root = resolve(process.cwd())
const pages = [
  { lang: 'es', path: 'lab', slug: 'lab/', title: 'Lab — productos y experimentos | Archic Lab', description: 'Herramientas experimentales desarrolladas por Archic Lab. Conoce Weather, predicción meteorológica clara y lluvia en litros por metro cuadrado.' },
  { lang: 'en', path: 'en/lab', slug: 'lab/', title: 'Lab — products and experiments | Archic Lab', description: 'Independent products by Archic Lab. Explore Weather, clear forecasts and rainfall totals.' },
  { lang: 'es', path: 'lab/weather', slug: 'lab/weather/', title: 'Archic Lab Weather — lluvia y previsión', description: 'Consulta la predicción meteorológica y los litros por metro cuadrado con fuentes transparentes. Weather es un experimento de Archic Lab.' },
  { lang: 'en', path: 'en/lab/weather', slug: 'lab/weather/', title: 'Archic Lab Weather — rainfall and forecast', description: 'Explore weather forecasts and rainfall in millimetres with transparent sources and timestamps. Weather is an Archic Lab experiment.' },
] as const

const esc = (input: string) => input.replace(/[&<>"']/g, (char) => {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return map[char] ?? char
})
for (const page of pages) {
  const es = 'https://archic.es/' + page.slug
  const en = 'https://archic.es/en/' + page.slug
  const canonical = page.lang === 'es' ? es : en
  const html = [
    '<!doctype html>',
    '<html lang="' + page.lang + '">',
    '<head>',
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<title>' + esc(page.title) + '</title>',
    '<meta name="description" content="' + esc(page.description) + '" />',
    '<meta name="theme-color" content="#080808" />',
    '<meta name="robots" content="index, follow" />',
    '<link rel="canonical" href="' + canonical + '" />',
    '<link rel="alternate" hreflang="es" href="' + es + '" />',
    '<link rel="alternate" hreflang="en" href="' + en + '" />',
    '<link rel="alternate" hreflang="x-default" href="' + es + '" />',
    '<link rel="icon" href="/brand/archic-symbol-2026.svg" type="image/svg+xml" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Archic Lab" />',
    '<meta property="og:title" content="' + esc(page.title) + '" />',
    '<meta property="og:description" content="' + esc(page.description) + '" />',
    '<meta property="og:url" content="' + canonical + '" />',
    '</head>',
    '<body>',
    '<div id="root"><main style="min-height:50vh;padding:2rem;font-family:system-ui"><h1>' + esc(page.title) + '</h1><p>' + esc(page.description) + '</p></main></div>',
    '<script type="module" src="/src/main.tsx"></script>',
    '</body></html>',
  ].join('\n')
  const directory = resolve(root, page.path)
  mkdirSync(directory, { recursive: true })
  writeFileSync(resolve(directory, 'index.html'), html)
}
const sitemapPath = resolve(root, 'public/sitemap.xml')
if (existsSync(sitemapPath)) {
  let sitemap = readFileSync(sitemapPath, 'utf8')
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/archic\.es\/(?:en\/)?lab(?:\/weather)?\/<\/loc>[\s\S]*?<\/url>/g, '')
  const entries = pages.map((page) => '  <url><loc>https://archic.es/' + page.path + '/</loc></url>').join('\n')
  sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>')
  writeFileSync(sitemapPath, sitemap)
}
console.log('Generated Archic Lab HTML and sitemap entries')
