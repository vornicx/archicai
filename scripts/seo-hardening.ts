import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GUIDES, GUIDES_INDEX_PATH } from '../src/content/guides'
import { LEGAL_PATHS } from '../src/legal/documents'
import { INTENT_PAGES } from '../src/seo/intentPages'
import { LOCAL_PAGES } from '../src/seo/localPages'
import { SERVICE_PAGES, type ServicePage } from '../src/seo/servicePages'
import { HOME_SEO, SITE_PAGE_SEO, type SitePageKey } from '../src/seo/siteSeo'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'
const SITE_PAGES: SitePageKey[] = ['presence', 'control', 'business', 'studio', 'contact']
const ALL_LANDINGS: ServicePage[] = [...SERVICE_PAGES, ...LOCAL_PAGES, ...INTENT_PAGES]

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const stripBrand = (value: string) => value.replace(/\s*[|—-]\s*Archic\s*$/i, '').trim()

function lastModified(sourceFile: string) {
  const absolute = resolve(ROOT, sourceFile)
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', relative(ROOT, absolute)], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (iso) return iso.slice(0, 10)
  } catch {
    // Use the filesystem timestamp when git history is unavailable.
  }
  return statSync(absolute).mtime.toISOString().slice(0, 10)
}

function maxDate(...dates: string[]) {
  return [...dates].sort().at(-1) ?? dates[0]
}

const MODIFIED = {
  home: maxDate(lastModified('src/i18n/content.ts'), lastModified('src/seo/siteSeo.ts')),
  site: lastModified('src/seo/siteSeo.ts'),
  service: lastModified('src/seo/servicePages.ts'),
  local: lastModified('src/seo/localPages.ts'),
  intent: lastModified('src/seo/intentPages.ts'),
  guides: lastModified('src/content/guides.ts'),
}

const pageLabels = new Map<string, string>([
  ...ALL_LANDINGS.map((page) => [page.path, page.breadcrumb] as const),
  [GUIDES_INDEX_PATH, 'Guías de Archic'],
  ...GUIDES.map((guide) => [guide.path, guide.title] as const),
  ...SITE_PAGES.map((page) => [`/${page}/`, SITE_PAGE_SEO.es[page].schemaName] as const),
])

const criticalCss = `<style data-archic-static-prerender>
  html{background:#0a0a0b;color:#f4f2ed}body{margin:0;background:#0a0a0b;color:#f4f2ed;font-family:Arial,Helvetica,sans-serif}.archic-static{box-sizing:border-box;max-width:1180px;margin:0 auto;padding:72px 28px 88px}.archic-static *{box-sizing:border-box}.archic-static header{max-width:900px;margin-bottom:56px}.archic-static .eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.68}.archic-static h1{font-size:clamp(38px,6vw,76px);line-height:1.02;letter-spacing:-.045em;margin:18px 0 22px}.archic-static h2{font-size:clamp(25px,3vw,40px);line-height:1.08;letter-spacing:-.025em;margin:0 0 18px}.archic-static h3{font-size:18px;margin:0 0 8px}.archic-static p,.archic-static li{font-size:17px;line-height:1.68;color:#d8d4cb}.archic-static section{padding:36px 0;border-top:1px solid rgba(255,255,255,.12)}.archic-static .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px}.archic-static article{padding:22px;border:1px solid rgba(255,255,255,.12)}.archic-static a{color:#fff;text-underline-offset:4px}.archic-static nav{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:30px}@media(max-width:640px){.archic-static{padding:48px 20px 64px}.archic-static h1{font-size:42px}.archic-static p,.archic-static li{font-size:16px}}
</style>`

function wrap(content: string) {
  return `${criticalCss}<main class="archic-static">${content}</main>`
}

function injectRoot(relativeFile: string, content: string) {
  const file = resolve(ROOT, relativeFile)
  if (!existsSync(file)) return
  const html = readFileSync(file, 'utf8')
  if (!html.includes('<div id="root"></div>')) return
  writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${wrap(content)}</div>`))
}

function relatedLinks(paths: string[] | undefined) {
  if (!paths?.length) return ''
  const links = paths
    .map((path) => `<a href="${path}">${esc(pageLabels.get(path) ?? path)}</a>`)
    .join('')
  return `<nav aria-label="Servicios relacionados">${links}</nav>`
}

function landingSnapshot(page: ServicePage) {
  return `<header>
    <span class="eyebrow">${esc(page.hero.eyebrow)}</span>
    <h1>${esc(page.hero.h1)}</h1>
    <p>${esc(page.hero.lead)}</p>
    ${page.hero.note ? `<p><strong>${esc(page.hero.note)}</strong></p>` : ''}
  </header>
  <section>
    <h2>${esc(page.intro.title)}</h2>
    ${page.intro.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
  </section>
  <section>
    <span class="eyebrow">${esc(page.blocks.eyebrow)}</span>
    <h2>${esc(page.blocks.title)}</h2>
    <p>${esc(page.blocks.lead)}</p>
    <div class="grid">${page.blocks.items.map((item) => `<article><h3>${esc(item.title)}</h3><p>${esc(item.desc)}</p></article>`).join('')}</div>
  </section>
  <section>
    <h2>${esc(page.includes.title)}</h2>
    <ul>${page.includes.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>${esc(page.process.title)}</h2>
    <ol>${page.process.steps.map((step) => `<li>${esc(step)}</li>`).join('')}</ol>
  </section>
  <section>
    <h2>${esc(page.faq.title)}</h2>
    ${page.faq.items.map((item) => `<article><h3>${esc(item.q)}</h3><p>${esc(item.a)}</p></article>`).join('')}
  </section>
  <section>
    <h2>${esc(page.cta.title)}</h2>
    <p>${esc(page.cta.lead)}</p>
    ${relatedLinks(page.related)}
    <nav aria-label="Archic"><a href="/">Archic</a><a href="/contact/">Contacto</a><a href="/guias/">Guías</a></nav>
  </section>`
}

function homeSnapshot(lang: 'es' | 'en') {
  const seo = HOME_SEO[lang]
  const isEs = lang === 'es'
  const prefix = isEs ? '' : '/en'
  const core = SITE_PAGES.slice(0, 3)
    .map((page) => {
      const item = SITE_PAGE_SEO[lang][page]
      return `<article><h2>${esc(item.schemaName)}</h2><p>${esc(item.description)}</p><a href="${prefix}/${page}/">${isEs ? 'Ver servicio' : 'Explore service'}</a></article>`
    })
    .join('')

  const searchLinks = isEs
    ? `<section><span class="eyebrow">Búsqueda / Servicios</span><h2>Servicios de diseño web y software</h2><nav aria-label="Servicios principales"><a href="/diseno-web-sevilla/">Diseño web en Sevilla</a><a href="/diseno-web-ecija/">Diseño web en Écija</a><a href="/desarrollo-web-a-medida/">Desarrollo web a medida</a><a href="/desarrollo-web-sevilla/">Desarrollo web en Sevilla</a><a href="/diseno-web-para-empresas/">Diseño web para empresas</a><a href="/diseno-web-marbella/">Diseño web en Marbella</a><a href="/diseno-web-inmobiliarias/">Web para inmobiliarias</a><a href="/diseno-web-restaurantes/">Web para restaurantes</a><a href="/guias/">Guías</a></nav></section>`
    : ''

  return `<header><span class="eyebrow">ARCHIC / DIGITAL SYSTEMS</span><h1>${isEs ? 'Sistemas digitales, diseño web premium y software a medida' : 'Digital systems, premium web design and custom software'}</h1><p>${esc(seo.description)}</p></header><section><div class="grid">${core}</div></section>${searchLinks}`
}

function siteSnapshot(lang: 'es' | 'en', page: SitePageKey) {
  const seo = SITE_PAGE_SEO[lang][page]
  const isEs = lang === 'es'
  const prefix = isEs ? '' : '/en'
  const siblings = SITE_PAGES.filter((candidate) => candidate !== page)
    .map((candidate) => `<a href="${prefix}/${candidate}/">${esc(SITE_PAGE_SEO[lang][candidate].schemaName)}</a>`)
    .join('')

  return `<header><span class="eyebrow">ARCHIC / ${esc(page.toUpperCase())}</span><h1>${esc(stripBrand(seo.title))}</h1><p>${esc(seo.description)}</p></header><section><h2>${isEs ? 'Archic construye sistemas alrededor del negocio' : 'Archic builds systems around the business'}</h2><p>${isEs ? 'Diseñamos la presencia pública, las herramientas privadas y el software a medida como piezas conectadas cuando el negocio lo necesita.' : 'We design public presence, private tools and custom software as connected layers when the business needs them.'}</p><nav aria-label="Archic">${siblings}<a href="${prefix || ''}/">${isEs ? 'Inicio' : 'Home'}</a></nav></section>`
}

function renderGuideBlock(block: (typeof GUIDES)[number]['sections'][number]['blocks'][number]) {
  switch (block.kind) {
    case 'p': return `<p>${esc(block.text)}</p>`
    case 'list': return `<ul>${block.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
    case 'steps': return `<ol>${block.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ol>`
    case 'table': return `<div class="grid">${block.rows.map((row) => `<article><h3>${esc(row[0] ?? '')}</h3><p>${row.slice(1).map(esc).join(' · ')}</p></article>`).join('')}</div>`
    case 'callout': return `<article><h3>${esc(block.title)}</h3><p>${esc(block.text)}</p></article>`
  }
}

function guideSnapshot(guide: (typeof GUIDES)[number]) {
  return `<header><span class="eyebrow">ARCHIC / GUÍA</span><h1>${esc(guide.title)}</h1><p>${esc(guide.description)}</p></header>${guide.sections.map((section) => `<section><h2>${esc(section.heading)}</h2>${section.blocks.map(renderGuideBlock).join('')}</section>`).join('')}<section><nav aria-label="Guías y servicios"><a href="/guias/">Todas las guías</a><a href="/desarrollo-web-a-medida/">Desarrollo web a medida</a><a href="/diseno-web-sevilla/">Diseño web en Sevilla</a><a href="/contact/">Contacto</a></nav></section>`
}

function guidesIndexSnapshot() {
  return `<header><span class="eyebrow">ARCHIC / GUÍAS</span><h1>Guías sobre diseño web, software y digitalización</h1><p>Contenido práctico de Archic para decidir mejor qué construir, cuánto debería costar y cuándo merece la pena desarrollar a medida.</p></header><section><div class="grid">${GUIDES.map((guide) => `<article><h2>${esc(guide.title)}</h2><p>${esc(guide.description)}</p><a href="${guide.path}">Leer guía</a></article>`).join('')}</div></section>`
}

// Give crawlers meaningful HTML before React executes. The client application
// replaces this snapshot with the same route content as soon as it boots.
injectRoot('index.html', homeSnapshot('es'))
injectRoot('en/index.html', homeSnapshot('en'))

for (const page of SITE_PAGES) {
  injectRoot(`${page}/index.html`, siteSnapshot('es', page))
  injectRoot(`en/${page}/index.html`, siteSnapshot('en', page))
}

for (const page of ALL_LANDINGS) injectRoot(`${page.path.replace(/^\/|\/$/g, '')}/index.html`, landingSnapshot(page))
injectRoot(`${GUIDES_INDEX_PATH.replace(/^\/|\/$/g, '')}/index.html`, guidesIndexSnapshot())
for (const guide of GUIDES) injectRoot(`${guide.path.replace(/^\/|\/$/g, '')}/index.html`, guideSnapshot(guide))

const noindexPaths = [
  ...Object.values(LEGAL_PATHS).flatMap((paths) => [paths.es, paths.en]),
  '/explorations/hospitality/',
  '/explorations/mobility/',
  '/explorations/real-estate/',
  '/en/explorations/hospitality/',
  '/en/explorations/mobility/',
  '/en/explorations/real-estate/',
]

function htmlFileForPath(path: string) {
  return resolve(ROOT, path.replace(/^\/|\/$/g, ''), 'index.html')
}

for (const path of noindexPaths) {
  const file = htmlFileForPath(path)
  if (!existsSync(file)) continue
  let html = readFileSync(file, 'utf8')
  html = html.replace(/(<meta[^>]+name="robots"[^>]+content=")[^"]*("[^>]*>)/i, '$1noindex, follow$2')
  html = html.replace(/(<meta[^>]+name="googlebot"[^>]+content=")[^"]*("[^>]*>)/i, '$1noindex, follow$2')
  writeFileSync(file, html)
}

const servicePaths = new Set(SERVICE_PAGES.map((page) => page.path))
const localPaths = new Set(LOCAL_PAGES.map((page) => page.path))
const intentPaths = new Set(INTENT_PAGES.map((page) => page.path))
const guideDates = new Map(GUIDES.map((guide) => [guide.path, guide.updated] as const))
const excludedFromSitemap = new Set(noindexPaths)

function dateForUrl(url: string) {
  const parsed = new URL(url)
  const path = parsed.pathname
  if (path === '/' || path === '/en/') return MODIFIED.home
  if (servicePaths.has(path)) return MODIFIED.service
  if (localPaths.has(path)) return MODIFIED.local
  if (intentPaths.has(path)) return MODIFIED.intent
  if (path === GUIDES_INDEX_PATH) return MODIFIED.guides
  if (guideDates.has(path)) return guideDates.get(path) ?? MODIFIED.guides
  if (/^\/(?:en\/)?(?:presence|control|business|studio|contact)\/$/.test(path)) return MODIFIED.site
  return MODIFIED.home
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, 'utf8')
  const rootOpen = xml.match(/^([\s\S]*?<urlset[^>]*>)/)?.[1]
  const blocks = xml.match(/\s*<url>[\s\S]*?<\/url>/g) ?? []
  const hardened = blocks.flatMap((raw) => {
    const block = raw.trim()
    const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    if (!loc) return []
    const path = new URL(loc).pathname
    if (excludedFromSitemap.has(path)) return []
    const date = dateForUrl(loc)
    const withDate = /<lastmod>.*?<\/lastmod>/.test(block)
      ? block.replace(/<lastmod>.*?<\/lastmod>/, `<lastmod>${date}</lastmod>`)
      : block.replace(/(<loc>.*?<\/loc>)/, `$1\n    <lastmod>${date}</lastmod>`)
    return [withDate]
  })

  if (rootOpen) writeFileSync(sitemapPath, `${rootOpen}\n${hardened.join('\n')}\n</urlset>\n`)
}

console.log(`SEO hardening complete: prerendered ${ALL_LANDINGS.length + SITE_PAGES.length * 2 + GUIDES.length + 3} public documents, reduced sitemap noise and restored truthful lastmod dates.`)
