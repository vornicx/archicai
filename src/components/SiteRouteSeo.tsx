import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'
import {
  SITE_PAGE_SEO,
  buildSitePageGraph,
  siteOgImage,
  sitePageAlternates,
  sitePageCanonical,
  type SitePageKey,
} from '../seo/siteSeo'

const CORE_PAGES = new Set<SitePageKey>(['presence', 'control', 'business', 'studio', 'contact'])

export default function SiteRouteSeo() {
  const { pathname } = useLocation()
  const { lang } = useLang()
  const parts = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean)
  const slug = (parts[0] === 'en' ? parts[1] : parts[0]) as SitePageKey | undefined

  if (!slug || !CORE_PAGES.has(slug)) return null

  const seo = SITE_PAGE_SEO[lang][slug]
  const canonical = sitePageCanonical(lang, slug)
  const alternates = sitePageAlternates(slug)
  const ogImage = siteOgImage(lang)
  const graph = buildSitePageGraph(slug, lang)

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es" href={alternates.es} />
      <link rel="alternate" hrefLang="en" href={alternates.en} />
      <link rel="alternate" hrefLang="x-default" href={alternates.xDefault} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Archic" />
      <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.ogAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={seo.ogAlt} />
      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  )
}
