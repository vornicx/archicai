import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { HOME_SEO } from '../src/seo/siteSeo'

const ROOT = resolve(import.meta.dir, '..')
const SKIP = new Set(['.git', 'node_modules', 'dist', '.vercel'])

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

for (const file of walk(ROOT)) {
  const before = readFileSync(file, 'utf8')
  const after = before
    .replaceAll('?v=3?v=3', '?v=3')
    .replaceAll('&amp;v=3?v=3', '&amp;v=3')
    .replace(/<link\s+rel="manifest"\s+href="\/site\.webmanifest"\s*\/?>(\r?\n)?/g, '')

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

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, 'utf8')
  const blocks = xml.match(/\s*<url>[\s\S]*?<\/url>/g) ?? []
  const seen = new Set<string>()
  const unique = blocks.filter((block) => {
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    if (!loc || seen.has(loc)) return false
    seen.add(loc)
    return true
  })
  const rootOpen = xml.match(/^([\s\S]*?<urlset[^>]*>)/)?.[1]
  if (rootOpen) writeFileSync(sitemapPath, `${rootOpen}\n${unique.map((block) => block.trim()).join('\n')}\n</urlset>\n`)
}

console.log('sanitized generated SEO assets')
