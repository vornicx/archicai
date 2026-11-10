import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Static entrypoints for Vite's multi-page build, generated rather than hand-edited.
const root = resolve(process.cwd())
const pages = [
  { lang: 'es', path: 'lab', slug: 'lab/', title: 'Lab — Weather | Archic Lab', description: 'Archic Lab diseña y mantiene Weather: predicción meteorológica por ciudad, lluvia en litros por metro cuadrado y próximos días.' },
  { lang: 'en', path: 'en/lab', slug: 'lab/', title: 'Lab — Weather | Archic Lab', description: 'Archic Lab designs and maintains Weather: city forecasts, rainfall in millimetres and the coming days.' },
  { lang: 'es', path: 'lab/weather', slug: 'lab/weather/', title: 'Archic Lab Weather — lluvia y previsión', description: 'Predicción meteorológica por ciudad, próximos días y litros por metro cuadrado, con fuentes transparentes. Weather es el producto de Archic Lab.' },
  { lang: 'en', path: 'en/lab/weather', slug: 'lab/weather/', title: 'Archic Lab Weather — rainfall and forecast', description: 'City forecasts, coming days and rainfall in millimetres, with transparent sources and timestamps. Weather is the Archic Lab product.' },
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
    '<meta name="theme-color" content="' + (page.path.endsWith('weather') ? '#14233C' : '#F8F9FB') + '" />',
    ...(page.path.endsWith('weather') ? [
      '<meta name="apple-mobile-web-app-capable" content="yes" />',
      '<meta name="mobile-web-app-capable" content="yes" />',
      '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
      '<meta name="apple-mobile-web-app-title" content="Weather" />',
      '<meta name="application-name" content="Weather" />',
      '<link rel="manifest" href="/weather/manifest' + (page.lang === 'en' ? '-en' : '') + '.webmanifest" />',
      '<link rel="apple-touch-icon" href="/weather/icons/weather-192.png" sizes="192x192" />',
    ] : []),
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
