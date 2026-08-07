/**
 * Genera todo lo que un rastreador debe poder leer sin ejecutar JavaScript.
 *
 * GitHub Pages no tiene fallback SPA: cada ruta necesita su propio index.html.
 * Además, los rastreadores sociales y buena parte de los rastreadores de IA no
 * ejecutan JS, así que el <head> completo (title, description, canonical, Open
 * Graph y JSON-LD) tiene que estar ya en el HTML servido, no solo en
 * react-helmet.
 *
 * Salidas:
 *   - index.html y en/index.html          → portada en cada idioma
 *   - <landing>/index.html                → una por intención de búsqueda
 *   - public/sitemap.xml                  → con lastmod real por página
 *   - public/llms.txt y llms-full.txt     → índice y texto plano para asistentes
 *
 * Uso: bun run scripts/generate-static-pages.ts
 */
import { mkdirSync, writeFileSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SERVICE_PAGES, type ServicePage } from '../src/seo/servicePages'
import { LOCAL_PAGES } from '../src/seo/localPages'
import { buildLandingGraph } from '../src/seo/landingSchema'
import { buildHomeGraph, homeCanonical } from '../src/seo/homeSchema'
import { LEGAL_PATHS, LEGAL_DOCS } from '../src/legal/documents'
import { GUIDES, GUIDES_INDEX_PATH } from '../src/content/guides'
import { buildGuideGraph, buildGuidesIndexGraph, GUIDES_INDEX_META } from '../src/seo/guideSchema'
import { CONTENT, CONTACT_MAIL, type Lang } from '../src/i18n/content'
import { LOCAL_BUSINESS } from '../src/seo/localBusiness'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'
const GSC_TOKEN = 'y-ywY3wwLbE0VyTO3ex8Nf7c4FWClx9R_y4mz_V75ks'

/* Landings nacionales por servicio + landings locales (Écija / Sevilla). */
const ALL_PAGES: ServicePage[] = [...SERVICE_PAGES, ...LOCAL_PAGES]

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * `mkdirSync(dir, { recursive: true })` debería ser idempotente, pero en Bun
 * sobre Windows lanza EEXIST si el directorio ya está. Como aquí se regenera
 * sobre carpetas que existen desde el primer despliegue, se ignora ese error
 * concreto y se dejan pasar los demás.
 */
function ensureDir(dir: string) {
  try {
    mkdirSync(dir, { recursive: true })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
  }
}

/**
 * Fecha de última modificación real del contenido de una página.
 *
 * Se toma del último commit que tocó el fichero de datos correspondiente, no
 * del momento de compilar: un `lastmod` que cambia en cada despliegue aunque
 * nada haya cambiado deja de ser una señal y Google lo ignora. Si el script se
 * ejecuta fuera de un repositorio git, se cae a la fecha del sistema de
 * ficheros, que es lo mejor disponible en ese caso.
 */
function lastModified(sourceFile: string): string {
  const absolute = resolve(ROOT, sourceFile)
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', relative(ROOT, absolute)], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (iso) return iso.slice(0, 10)
  } catch {
    /* sin git disponible o fichero sin historial */
  }
  return statSync(absolute).mtime.toISOString().slice(0, 10)
}

const MODIFIED = {
  home: lastModified('src/i18n/content.ts'),
  services: lastModified('src/seo/servicePages.ts'),
  local: lastModified('src/seo/localPages.ts'),
  legal: lastModified('src/legal/documents.ts'),
  guides: lastModified('src/content/guides.ts'),
}

/* ─────────────────────────────────────────────────────────────────────────
   HTML
   ───────────────────────────────────────────────────────────────────────── */

type HeadInput = {
  lang: Lang
  canonical: string
  title: string
  description: string
  ogImage: string
  ogImageAlt: string
  /** Alternates hreflang; se omiten en las landings, que solo existen en es. */
  alternates?: { hreflang: string; href: string }[]
  /** `article` en guías y documentos legales; `website` en el resto. */
  ogType?: 'website' | 'article'
  graph: unknown
}

function document_({
  lang,
  canonical,
  title,
  description,
  ogImage,
  ogImageAlt,
  alternates,
  ogType = 'website',
  graph,
}: HeadInput) {
  const alternateTags = (alternates ?? [])
    .map((alt) => `    <link data-rh="true" rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}">`)
    .join('\n')

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta data-rh="true" name="description" content="${esc(description)}">
    <meta data-rh="true" name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta data-rh="true" name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="author" content="Archic">
    <meta name="application-name" content="Archic">
    <link data-rh="true" rel="canonical" href="${canonical}">
${alternateTags}
    <meta name="theme-color" content="#12294c" />
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="icon" type="image/png" sizes="512x512" href="/archic-mark-512.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="google-site-verification" content="${GSC_TOKEN}" />
    <!-- Webfonts are self-hosted (see src/main.tsx): no third-party requests. -->
    <meta data-rh="true" property="og:url" content="${canonical}" />
    <meta data-rh="true" property="og:type" content="${ogType}" />
    <meta data-rh="true" property="og:site_name" content="Archic" />
    <meta data-rh="true" property="og:locale" content="${lang === 'es' ? 'es_ES' : 'en_US'}" />
    <meta data-rh="true" property="og:locale:alternate" content="${lang === 'es' ? 'en_US' : 'es_ES'}" />
    <meta data-rh="true" property="og:title" content="${esc(title)}">
    <meta data-rh="true" property="og:description" content="${esc(description)}">
    <meta data-rh="true" property="og:image" content="${ORIGIN}/${ogImage}">
    <meta data-rh="true" property="og:image:secure_url" content="${ORIGIN}/${ogImage}">
    <meta data-rh="true" property="og:image:type" content="image/png">
    <meta data-rh="true" property="og:image:width" content="1200">
    <meta data-rh="true" property="og:image:height" content="630">
    <meta data-rh="true" property="og:image:alt" content="${esc(ogImageAlt)}">
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:site" content="@ArchicHQ" />
    <meta data-rh="true" name="twitter:title" content="${esc(title)}">
    <meta data-rh="true" name="twitter:description" content="${esc(description)}">
    <meta data-rh="true" name="twitter:image" content="${ORIGIN}/${ogImage}">
    <meta data-rh="true" name="twitter:image:alt" content="${esc(ogImageAlt)}">
    <script data-rh="true" type="application/ld+json">
${JSON.stringify(graph, null, 2)
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

const HOME_ALTERNATES = [
  { hreflang: 'es', href: `${ORIGIN}/` },
  { hreflang: 'en', href: `${ORIGIN}/en/` },
  { hreflang: 'x-default', href: `${ORIGIN}/` },
]

/* Portada en cada idioma. */
for (const lang of ['es', 'en'] as Lang[]) {
  const t = CONTENT[lang]
  const dir = lang === 'es' ? ROOT : resolve(ROOT, 'en')
  ensureDir(dir)
  writeFileSync(
    resolve(dir, 'index.html'),
    document_({
      lang,
      canonical: homeCanonical(lang),
      title: t.meta.title,
      description: t.meta.description,
      ogImage: t.meta.ogImage,
      ogImageAlt: t.meta.ogImageAlt,
      alternates: HOME_ALTERNATES,
      graph: buildHomeGraph(lang),
    }),
  )
  console.log(`written ${lang === 'es' ? '' : 'en/'}index.html`)
}

/* Una landing por intención de búsqueda. */
for (const page of ALL_PAGES) {
  const dir = resolve(ROOT, page.path.replace(/^\/|\/$/g, ''))
  ensureDir(dir)
  writeFileSync(
    resolve(dir, 'index.html'),
    document_({
      lang: 'es',
      canonical: `${ORIGIN}${page.path}`,
      title: page.meta.title,
      description: page.meta.description,
      ogImage: CONTENT.es.meta.ogImage,
      ogImageAlt: CONTENT.es.meta.ogImageAlt,
      graph: buildLandingGraph(page, 'es'),
    }),
  )
  console.log(`written ${page.path}index.html`)
}

/* Índice de guías y una página por guía. */
{
  const dir = resolve(ROOT, GUIDES_INDEX_PATH.replace(/^\/|\/$/g, ''))
  ensureDir(dir)
  writeFileSync(
    resolve(dir, 'index.html'),
    document_({
      lang: 'es',
      canonical: `${ORIGIN}${GUIDES_INDEX_PATH}`,
      title: GUIDES_INDEX_META.title,
      description: GUIDES_INDEX_META.description,
      ogImage: CONTENT.es.meta.ogImage,
      ogImageAlt: CONTENT.es.meta.ogImageAlt,
      graph: buildGuidesIndexGraph(),
    }),
  )
  console.log(`written ${GUIDES_INDEX_PATH}index.html`)
}

for (const guide of GUIDES) {
  const dir = resolve(ROOT, guide.path.replace(/^\/|\/$/g, ''))
  ensureDir(dir)
  writeFileSync(
    resolve(dir, 'index.html'),
    document_({
      lang: 'es',
      canonical: `${ORIGIN}${guide.path}`,
      title: guide.metaTitle,
      description: guide.description,
      ogImage: CONTENT.es.meta.ogImage,
      ogImageAlt: CONTENT.es.meta.ogImageAlt,
      ogType: 'article',
      graph: buildGuideGraph(guide),
    }),
  )
  console.log(`written ${guide.path}index.html`)
}

/* Documentos legales. También se generan: hasta ahora eran HTML escrito a mano
   que ya se había desincronizado de los textos de `documents.ts`. */
for (const key of Object.keys(LEGAL_PATHS) as (keyof typeof LEGAL_PATHS)[]) {
  for (const lang of ['es', 'en'] as Lang[]) {
    const doc = LEGAL_DOCS[lang][key]
    const path = LEGAL_PATHS[key][lang]
    const canonical = `${ORIGIN}${path}`
    const dir = resolve(ROOT, path.replace(/^\/|\/$/g, ''))
    ensureDir(dir)
    writeFileSync(
      resolve(dir, 'index.html'),
      document_({
        lang,
        canonical,
        title: `${doc.title} | Archic`,
        description: doc.intro,
        ogImage: CONTENT[lang].meta.ogImage,
        ogImageAlt: CONTENT[lang].meta.ogImageAlt,
        ogType: 'article',
        alternates: [
          { hreflang: 'es', href: `${ORIGIN}${LEGAL_PATHS[key].es}` },
          { hreflang: 'en', href: `${ORIGIN}${LEGAL_PATHS[key].en}` },
          { hreflang: 'x-default', href: `${ORIGIN}${LEGAL_PATHS[key].es}` },
        ],
        graph: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${canonical}#webpage`,
              url: canonical,
              name: `${doc.title} | Archic`,
              description: doc.intro,
              inLanguage: lang,
              isPartOf: { '@id': `${ORIGIN}/#website` },
              publisher: { '@id': `${ORIGIN}/#organization` },
              breadcrumb: { '@id': `${canonical}#breadcrumb` },
              dateModified: MODIFIED.legal,
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${canonical}#breadcrumb`,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: lang === 'es' ? 'Inicio' : 'Home',
                  item: homeCanonical(lang),
                },
                { '@type': 'ListItem', position: 2, name: doc.title, item: canonical },
              ],
            },
          ],
        },
      }),
    )
    console.log(`written ${path}index.html`)
  }
}

/* ─────────────────────────────────────────────────────────────────────────
   sitemap.xml
   ───────────────────────────────────────────────────────────────────────── */

type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: string
  priority: string
  alternates?: { hreflang: string; href: string }[]
}

const legalAlternates = (key: keyof typeof LEGAL_PATHS) => [
  { hreflang: 'es', href: `${ORIGIN}${LEGAL_PATHS[key].es}` },
  { hreflang: 'en', href: `${ORIGIN}${LEGAL_PATHS[key].en}` },
  { hreflang: 'x-default', href: `${ORIGIN}${LEGAL_PATHS[key].es}` },
]

const sitemapEntries: SitemapEntry[] = [
  {
    loc: `${ORIGIN}/`,
    lastmod: MODIFIED.home,
    changefreq: 'weekly',
    priority: '1.0',
    alternates: HOME_ALTERNATES,
  },
  {
    loc: `${ORIGIN}/en/`,
    lastmod: MODIFIED.home,
    changefreq: 'weekly',
    priority: '0.8',
    alternates: HOME_ALTERNATES,
  },
  ...SERVICE_PAGES.map((page) => ({
    loc: `${ORIGIN}${page.path}`,
    lastmod: MODIFIED.services,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  ...LOCAL_PAGES.map((page) => ({
    loc: `${ORIGIN}${page.path}`,
    lastmod: MODIFIED.local,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  {
    loc: `${ORIGIN}${GUIDES_INDEX_PATH}`,
    lastmod: MODIFIED.guides,
    changefreq: 'monthly',
    priority: '0.7',
  },
  /* Las guías declaran la fecha de revisión que llevan escrita en el propio
     contenido, no la del fichero: es la que el lector ve en la página. */
  ...GUIDES.map((guide) => ({
    loc: `${ORIGIN}${guide.path}`,
    lastmod: guide.updated,
    changefreq: 'yearly',
    priority: '0.8',
  })),
  ...(Object.keys(LEGAL_PATHS) as (keyof typeof LEGAL_PATHS)[]).flatMap((key) =>
    (['es', 'en'] as const).map((lang) => ({
      loc: `${ORIGIN}${LEGAL_PATHS[key][lang]}`,
      lastmod: MODIFIED.legal,
      changefreq: 'yearly',
      priority: '0.3',
      alternates: legalAlternates(key),
    })),
  ),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por scripts/generate-static-pages.ts. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${(entry.alternates ?? [])
      .map((alt) => `\n    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
      .join('')}
  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap)
console.log(`sitemap.xml updated (${sitemapEntries.length} urls)`)

/* ─────────────────────────────────────────────────────────────────────────
   llms.txt — índice legible para asistentes de IA
   ─────────────────────────────────────────────────────────────────────────
   Convención de llmstxt.org: un H1 con el nombre, una cita con el resumen y
   listas de enlaces con descripción. La gracia es dar el mapa del sitio en
   texto plano, sin navegación ni plantillas, para que un asistente pueda
   resolver «¿quién hace webs en Écija?» sin rastrear ocho páginas de HTML.
   ───────────────────────────────────────────────────────────────────────── */

const es = CONTENT.es

const llms = `# Archic

> ${es.answer.body}

Archic es una marca comercial española. Contacto: ${CONTACT_MAIL}. Base en ${LOCAL_BUSINESS.city} (${LOCAL_BUSINESS.postalCode}), provincia de ${LOCAL_BUSINESS.province}, ${LOCAL_BUSINESS.region}, España. Idiomas de trabajo: castellano e inglés.

Esta web no instala cookies, no usa analítica de terceros y no carga recursos externos.

## Servicios

${es.services.map((s) => `- **${s.title}**: ${s.intro}`).join('\n')}

## Páginas de servicio

${SERVICE_PAGES.map((p) => `- [${p.breadcrumb}](${ORIGIN}${p.path}): ${p.meta.description}`).join('\n')}

## Páginas locales

${LOCAL_PAGES.map((p) => `- [${p.breadcrumb}](${ORIGIN}${p.path}): ${p.meta.description}`).join('\n')}

## Guías

${GUIDES.map((g) => `- [${g.title}](${ORIGIN}${g.path}): ${g.description}`).join('\n')}

## Preguntas frecuentes

${es.homeFaq.items.map((item) => `- [${item.q}](${ORIGIN}/#faq)`).join('\n')}

## Legal

- [Aviso legal](${ORIGIN}${LEGAL_PATHS.legal.es})
- [Política de privacidad](${ORIGIN}${LEGAL_PATHS.privacy.es})
- [Política de cookies](${ORIGIN}${LEGAL_PATHS.cookies.es})

## Opcional

- [English version](${ORIGIN}/en/)
- [Texto completo del sitio](${ORIGIN}/llms-full.txt)
`

writeFileSync(resolve(ROOT, 'public/llms.txt'), llms)
console.log('llms.txt updated')

/* ─────────────────────────────────────────────────────────────────────────
   llms-full.txt — el contenido entero en texto plano
   ───────────────────────────────────────────────────────────────────────── */

function landingToMarkdown(page: ServicePage) {
  return `## ${page.breadcrumb}

URL: ${ORIGIN}${page.path}
Keyword principal: ${page.keyword}

${page.hero.lead}

### ${page.intro.title}

${page.intro.body.join('\n\n')}

### ${page.blocks.title}

${page.blocks.items.map((item) => `- **${item.title}**: ${item.desc}`).join('\n')}

### ${page.includes.title}

${page.includes.items.map((item) => `- ${item}`).join('\n')}

### ${page.process.title}

${page.process.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

### ${page.faq.title}

${page.faq.items.map((item) => `**${item.q}**\n\n${item.a}`).join('\n\n')}
`
}

function guideToMarkdown(guide: (typeof GUIDES)[number]) {
  const blocks = (section: (typeof guide.sections)[number]) =>
    section.blocks
      .map((block) => {
        switch (block.kind) {
          case 'p':
            return block.text
          case 'list':
            return block.items.map((item) => `- ${item}`).join('\n')
          case 'steps':
            return block.items.map((item, i) => `${i + 1}. ${item}`).join('\n')
          case 'table':
            return [
              `| ${block.head.join(' | ')} |`,
              `| ${block.head.map(() => '---').join(' | ')} |`,
              ...block.rows.map((row) => `| ${row.join(' | ')} |`),
            ].join('\n')
          case 'callout':
            return `> **${block.title}** — ${block.text}`
        }
      })
      .join('\n\n')

  return `## ${guide.title}

URL: ${ORIGIN}${guide.path}
Keyword principal: ${guide.keyword}
Publicada: ${guide.published} · Revisada: ${guide.updated}

${guide.answer}

${guide.sections.map((section) => `### ${section.heading}\n\n${blocks(section)}`).join('\n\n')}

### Preguntas frecuentes

${guide.faq.map((item) => `**${item.q}**\n\n${item.a}`).join('\n\n')}
`
}

const llmsFull = `# Archic — contenido completo

Última actualización: ${MODIFIED.home}
Origen: ${ORIGIN}/

> ${es.answer.body}

## ${es.facts.title}

${es.facts.items.map((f) => `- **${f.value} ${f.label}**: ${f.desc}`).join('\n')}

## ${es.servicesIntro.title}

${es.servicesIntro.lead}

${es.services
  .map((s) => `### ${s.title}\n\n${s.intro}\n\n${s.items.map((i) => `- ${i}`).join('\n')}`)
  .join('\n\n')}

## ${es.value.title}

${es.value.lead}

${es.value.principles.map((p) => `- **${p.title}**: ${p.desc}`).join('\n')}

## ${es.process.title}

${es.process.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## ${es.clients.title}

${es.clients.items.map((item) => `- ${item}`).join('\n')}

## ${es.projects.title}

${es.projects.lead}

${es.projects.items.map((p) => `- **${p.title}** (${p.tag}, ${es.projects.conceptLabel.toLowerCase()}): ${p.desc}`).join('\n')}

## ${es.about.title}

${es.about.body.join('\n\n')}

## ${es.homeFaq.title}

${es.homeFaq.items.map((item) => `### ${item.q}\n\n${item.a}`).join('\n\n')}

## ${es.labs.title}

${es.labs.lead}

${es.labs.items.map((item) => `- **${item.name}** (${item.status}): ${item.desc}`).join('\n')}

## Zona de actuación

Base en ${LOCAL_BUSINESS.city}, ${LOCAL_BUSINESS.postalCode}, provincia de ${LOCAL_BUSINESS.province} (${LOCAL_BUSINESS.region}, España). Trabajo presencial en la provincia de Sevilla y en remoto con el resto de España.

## Contacto

${es.contact.lead} Correo: ${CONTACT_MAIL}.

---

# Páginas de servicio

${ALL_PAGES.map(landingToMarkdown).join('\n---\n\n')}
---

# Guías

${GUIDES.map(guideToMarkdown).join('\n---\n\n')}
`

writeFileSync(resolve(ROOT, 'public/llms-full.txt'), llmsFull)
console.log('llms-full.txt updated')
