/**
 * JSON-LD graph for the Archic homepage.
 * Keep it aligned with what is actually visible on the page: no hidden FAQ
 * markup and no selectors from the legacy homepage.
 */
import { CONTENT, CONTACT_MAIL, type Lang } from '../i18n/content'
import { STUDIO } from '../content/studio'
import { localBusinessNode } from './localBusiness'

const ORIGIN = 'https://archic.es'

/** Physical business scope. Archic is based in Écija and can serve elsewhere. */
export const HOME_LOCAL_SCOPE = {
  city: 'Écija',
  province: 'Sevilla',
  alsoServes: ['Sevilla', 'Carmona', 'Osuna', 'Marchena', 'Utrera', 'Dos Hermanas', 'Palma del Río'],
}

export function homeCanonical(lang: Lang) {
  return lang === 'es' ? `${ORIGIN}/` : `${ORIGIN}/en/`
}

export function buildHomeGraph(lang: Lang) {
  const t = CONTENT[lang]
  const studio = STUDIO[lang]
  const canonical = homeCanonical(lang)
  const country = lang === 'es' ? 'España' : 'Spain'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${ORIGIN}/#organization`,
        name: 'Archic',
        url: `${ORIGIN}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${ORIGIN}/archic-mark-512.png`,
          contentUrl: `${ORIGIN}/archic-mark-512.png`,
          width: 512,
          height: 512,
        },
        image: `${ORIGIN}/og-image.png`,
        email: CONTACT_MAIL,
        description: studio.meta.description,
        areaServed: { '@type': 'Country', name: country },
        knowsLanguage: ['es', 'en'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: CONTACT_MAIL,
          contactType: 'sales',
          availableLanguage: ['Spanish', 'English'],
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: lang === 'es' ? 'Servicios digitales para empresas' : 'Digital services for businesses',
          itemListElement: t.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.intro,
              provider: { '@id': `${ORIGIN}/#organization` },
              areaServed: { '@type': 'Country', name: country },
            },
          })),
        },
      },
      localBusinessNode(HOME_LOCAL_SCOPE, lang),
      {
        '@type': 'WebSite',
        '@id': `${ORIGIN}/#website`,
        url: `${ORIGIN}/`,
        name: 'Archic',
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${ORIGIN}/#organization` },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: studio.meta.title,
        description: studio.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': `${ORIGIN}/#organization` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.sx-display', '.sx-statement-side'],
        },
      },
    ],
  }
}
