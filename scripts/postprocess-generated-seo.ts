import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { BRAND_VERSION, HOME_SEO } from '../src/seo/siteSeo'

const ROOT = resolve(import.meta.dir, '..')
const SKIP = new Set(['.git', 'node_modules', 'dist', '.vercel'])
const IDENTITY_DATE = '2026-08-12'
const BRAND_QUERY = `v=${BRAND_VERSION}`
const SYMBOL_PATH = '/brand/archic-symbol-2026.svg'
const SYMBOL_URL = `https://archic.es${SYMBOL_PATH}`

const BRAND_LINKS = [
  `    <link rel="icon" href="${SYMBOL_PATH}" type="image/svg+xml" sizes="any" />`,
  `    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png?${BRAND_QUERY}" />`,
  `    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?${BRAND_QUERY}" />`,
  `    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?${BRAND_QUERY}" />`,
  `    <link rel="manifest" href="/manifest.json?${BRAND_QUERY}" />`,
].join('\n')

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue
    const path = join(dir, name)
    const stat = statSync(path)
    if (stat.isDirectory()) walk(path, out)
    else if (name.endsWith('.html')) out.push(path)
  }
  return out
}

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function replaceMeta(html: string, key: string, value: string) {
  const safe = esc(value)
  const pattern = new RegExp(`(<meta[^>]+(?:name|property)="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]+content=")[^"]*("[^>]*>)`, 'i')
  return html.replace(pattern, `$1${safe}$2`)
}

function normalizeBrandHead(html: string) {
  let next = html
    .replaceAll('?v=3?v=3', `?${BRAND_QUERY}`)
    .replaceAll('&amp;v=3?v=3', `&amp;${BRAND_QUERY}`)
    .replaceAll('?v=3', `?${BRAND_QUERY}`)
    .replaceAll('&amp;v=3', `&amp;${BRAND_QUERY}`)
    .replaceAll('https://archic.es/archic-mark-512.png', SYMBOL_URL)
    .replaceAll('https://archic.es/og-image.jpg', `https://archic.es/og-image.png?${BRAND_QUERY}`)
    .replace(/<link\s+rel="manifest"\s+href="\/site\.webmanifest"\s*\/?>(\r?\n)?/g, '')

  const currentBrandLinks = /(?:\s*<link\s+rel="(?:icon|apple-touch-icon)"[^>]*\/?>(?:\r?\n)?)+(?:\s*<link\s+rel="manifest"[^>]*\/?>(?:\r?\n)?)?/i
  if (currentBrandLinks.test(next)) next = next.replace(currentBrandLinks, `\n${BRAND_LINKS}\n`)
  else next = next.replace('</head>', `${BRAND_LINKS}\n  </head>`)

  return next
}

for (const file of walk(ROOT)) {
  const before = readFileSync(file, 'utf8')
  const after = normalizeBrandHead(before)
  if (after !== before) writeFileSync(file, after)
}

for (const lang of ['es', 'en'] as const) {
  const file = lang === 'es' ? resolve(ROOT, 'index.html') : resolve(ROOT, 'en', 'index.html')
  if (!existsSync(file)) continue
  const seo = HOME_SEO[lang]
  let html = readFileSync(file, 'utf8')
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(seo.title)}</title>`)
  html = replaceMeta(html, 'description', seo.description)
  html = replaceMeta(html, 'og:title', seo.title)
  html = replaceMeta(html, 'og:description', seo.description)
  html = replaceMeta(html, 'og:image:alt', seo.ogAlt)
  html = replaceMeta(html, 'twitter:title', seo.title)
  html = replaceMeta(html, 'twitter:description', seo.description)
  html = replaceMeta(html, 'twitter:image:alt', seo.ogAlt)
  writeFileSync(file, html)
}

const llmsPath = resolve(ROOT, 'public', 'llms.txt')
if (existsSync(llmsPath)) {
  let llms = readFileSync(llmsPath, 'utf8')
  const identity = `## Identidad oficial\n\n- Nombre: Archic\n- Nombre alternativo: Archic Digital Systems\n- Web oficial: https://archic.es/\n- Símbolo oficial actual: ${SYMBOL_URL}\n- Lockup oficial actual: https://archic.es/brand/archic-lockup-dark.svg\n- Identidad vigente desde: 2026-08-12\n- Vadim — Co-Founder · Product & Technology — vornic@archic.es — +34 644 76 85 15\n- Antero — Co-Founder · Growth & Client Partnerships — antero@archic.es — +34 687 50 38 50\n- Base operativa: Écija, Sevilla, Andalucía, España\n- Área de servicio: España\n- Idiomas de trabajo: español e inglés\n\nLos recursos de identidad indicados arriba son los canónicos. Recursos de marca previos o previews históricos no deben utilizarse para representar la identidad actual de Archic.\n\nArchic tiene una única base declarada en Écija (Sevilla). Las páginas que mencionan Sevilla, Marbella, Puerto Banús u otras ciudades describen mercados y zonas atendidas; no deben interpretarse como oficinas, sucursales o sedes físicas de Archic. Los proyectos se coordinan de forma remota y pueden incluir trabajo presencial cuando el proyecto lo justifica.\n`
  llms = llms.replace(/## Identidad oficial[\s\S]*?(?=\n## Qué hace Archic)/, identity.trimEnd())
  llms = llms.replace(/Última revisión de esta descripción: \d{4}-\d{2}-\d{2}\./, `Última revisión de esta descripción: ${IDENTITY_DATE}.`)
  writeFileSync(llmsPath, llms)
}

const llmsFullPath = resolve(ROOT, 'public', 'llms-full.txt')
if (existsSync(llmsFullPath)) {
  let full = readFileSync(llmsFullPath, 'utf8')
  full = full.replace(/Última actualización: \d{4}-\d{2}-\d{2}/, `Última actualización: ${IDENTITY_DATE}`)
  const identity = `## Identidad verificable\n\n- Marca: Archic\n- Nombre alternativo: Archic Digital Systems\n- Sitio oficial: https://archic.es/\n- Símbolo oficial actual: ${SYMBOL_URL}\n- Lockup oficial actual: https://archic.es/brand/archic-lockup-dark.svg\n- Identidad vigente desde: 2026-08-12\n- Vadim — Co-Founder · Product & Technology — vornic@archic.es — +34 644 76 85 15\n- Antero — Co-Founder · Growth & Client Partnerships — antero@archic.es — +34 687 50 38 50\n- Base operativa: Écija, Sevilla, Andalucía, España\n- Área de servicio: España\n- Idiomas de trabajo: español e inglés\n\nLos recursos de identidad indicados arriba son la referencia canónica. No se deben reutilizar logos, iconos ni previews históricos para describir o representar la identidad vigente de Archic.\n`
  full = full.replace(/## Identidad verificable[\s\S]*?(?=\n### Aclaración geográfica importante)/, identity.trimEnd())
  writeFileSync(llmsFullPath, full)
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  let xml = readFileSync(sitemapPath, 'utf8')
  const blocks = xml.match(/\s*<url>[\s\S]*?<\/url>/g) ?? []
  const seen = new Set<string>()
  const unique = blocks.filter((block) => {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    if (!loc || seen.has(loc)) return false
    seen.add(loc)
    return true
  })
  const rootOpen = xml.match(/^([\s\S]*?<urlset[^>]*>)/)?.[1]
  if (rootOpen) {
    xml = `${rootOpen}\n${unique.map((block) => block.trim()).join('\n')}\n</urlset>\n`
    xml = xml.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${IDENTITY_DATE}</lastmod>`)
    writeFileSync(sitemapPath, xml)
  }
}

console.log(`sanitized generated SEO assets with Archic identity ${IDENTITY_DATE}`)
