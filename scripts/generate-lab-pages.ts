import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Static entrypoints for Vite's multi-page build, generated rather than hand-edited.
const root = resolve(process.cwd())
const pages = [
  { lang: 'es', path: 'lab', slug: 'lab/', title: 'Archic Lab — productos e investigación', description: 'Archic Lab es la división de Archic dedicada a investigación y productos digitales propios. Sus productos incluyen Midas y Weather.' },
  { lang: 'en', path: 'en/lab', slug: 'lab/', title: 'Archic Lab — products and research', description: 'Archic Lab is the Archic division dedicated to research and independent digital products. Its products include Midas and Weather.' },
  { lang: 'es', path: 'lab/weather', slug: 'lab/weather/', title: 'Archic Lab Weather — lluvia y previsión', description: 'Predicción meteorológica por ciudad, próximos días y litros por metro cuadrado, con fuentes transparentes. Weather es un producto de Archic Lab.' },
  { lang: 'en', path: 'en/lab/weather', slug: 'lab/weather/', title: 'Archic Lab Weather — rainfall and forecast', description: 'City forecasts, coming days and rainfall in millimetres, with transparent sources and timestamps. Weather is an Archic Lab product.' },
  { lang: 'es', path: 'lab/midas', slug: 'lab/midas/', title: 'Midas — memoria local para agentes de IA | Archic Lab', description: 'Memoria persistente de código abierto para agentes de IA. Local, trazable y sin llamadas a LLM durante la ingestión. Compatible con MCP.' },
  { lang: 'en', path: 'en/lab/midas', slug: 'lab/midas/', title: 'Midas — local memory for AI agents | Archic Lab', description: 'Open-source persistent memory for AI agents. Local, source-traceable and no LLM calls at ingest. Compatible with MCP.' },
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
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/archic\.es\/(?:en\/)?lab(?:\/(?:weather|midas))?\/<\/loc>[\s\S]*?<\/url>/g, '')
  const entries = pages.map((page) => '  <url><loc>https://archic.es/' + page.path + '/</loc></url>').join('\n')
  sitemap = sitemap.replace('</urlset>', entries + '\n</urlset>')
  writeFileSync(sitemapPath, sitemap)
}
console.log('Generated Archic Lab HTML and sitemap entries')
