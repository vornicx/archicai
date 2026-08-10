import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://archic.es'

const pages = {
  presence: {
    es: ['Presence — Archic', 'Dirección digital, web, contenido y conversión construidos como una única experiencia.'],
    en: ['Presence — Archic', 'Digital direction, web, content and conversion built as one experience.'],
  },
  control: {
    es: ['Control — Archic', 'Reservas, clientes, recursos y operaciones en un entorno privado construido alrededor de tu negocio.'],
    en: ['Control — Archic', 'Bookings, customers, resources and operations in a private environment built around your business.'],
  },
  business: {
    es: ['Business — Archic', 'Software a medida, automatización, integraciones y datos para negocios que necesitan una ventaja operativa propia.'],
    en: ['Business — Archic', 'Custom software, automation, integrations and data for businesses that need their own operating advantage.'],
  },
  studio: {
    es: ['Studio — Archic', 'Diseño, tecnología y criterio de negocio para construir la capa digital de negocios con un estándar alto.'],
    en: ['Studio — Archic', 'Design, technology and business judgement for building the digital layer of high-standard businesses.'],
  },
  contact: {
    es: ['Contacto — Archic', 'Cuéntanos el negocio, el problema y el resultado que quieres conseguir.'],
    en: ['Contact — Archic', 'Tell us about the business, the problem and the outcome you want to achieve.'],
  },
} as const

function esc(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function html(lang: 'es' | 'en', slug: keyof typeof pages, title: string, description: string) {
  const canonical = `${ORIGIN}${lang === 'en' ? `/en/${slug}/` : `/${slug}/`}`
  const esUrl = `${ORIGIN}/${slug}/`
  const enUrl = `${ORIGIN}/en/${slug}/`
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="es" href="${esUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${esUrl}" />
    <meta name="theme-color" content="#050505" />
    <link rel="icon" href="/favicon.ico?v=3" sizes="any">
    <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=3">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=3">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3">
    <link rel="manifest" href="/manifest.json">
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Archic" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${ORIGIN}/og-image.png?v=3" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
}

for (const [slug, page] of Object.entries(pages) as [keyof typeof pages, (typeof pages)[keyof typeof pages]][]) {
  for (const lang of ['es', 'en'] as const) {
    const dir = lang === 'en' ? resolve(ROOT, 'en', slug) : resolve(ROOT, slug)
    mkdirSync(dir, { recursive: true })
    const [title, description] = page[lang]
    writeFileSync(resolve(dir, 'index.html'), html(lang, slug, title, description))
    console.log(`written ${lang === 'en' ? 'en/' : ''}${slug}/index.html`)
  }
}

const sitemapPath = resolve(ROOT, 'public', 'sitemap.xml')
if (existsSync(sitemapPath)) {
  let sitemap = readFileSync(sitemapPath, 'utf8')
  const entries = (Object.keys(pages) as (keyof typeof pages)[]).flatMap((slug) => {
    const esUrl = `${ORIGIN}/${slug}/`
    const enUrl = `${ORIGIN}/en/${slug}/`
    return [
      `  <url>\n    <loc>${esUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />\n  </url>`,
      `  <url>\n    <loc>${enUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />\n  </url>`,
    ]
  }).join('\n')

  sitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${entries}\n</urlset>\n`)
  writeFileSync(sitemapPath, sitemap)
  console.log('updated public/sitemap.xml with Archic site routes')
}
