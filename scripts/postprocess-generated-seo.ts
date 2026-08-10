import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

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

for (const file of walk(ROOT)) {
  const before = readFileSync(file, 'utf8')
  const after = before
    .replaceAll('?v=3?v=3', '?v=3')
    .replaceAll('&amp;v=3?v=3', '&amp;v=3')
    .replace(/<link\s+rel="manifest"\s+href="\/site\.webmanifest"\s*\/?>(\r?\n)?/g, '')

  if (after !== before) writeFileSync(file, after)
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
