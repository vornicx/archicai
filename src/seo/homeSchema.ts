/**
 * Grafo JSON-LD de la portada, compartido por la página React y el generador
 * de HTML estático.
 *
 * Existe por el mismo motivo que `landingSchema.ts`: si el marcado que sirve
 * GitHub Pages y el que inyecta react-helmet en cliente divergen, Search
 * Console lo reporta como datos estructurados inconsistentes. Con una única
 * función no hay dos verdades que mantener sincronizadas a mano.
 */
import { CONTENT, CONTACT_MAIL, type Lang } from '../i18n/content'
import { localBusinessNode } from './localBusiness'

const ORIGIN = 'https://archic.es'

/** Ámbito local de la portada: la base física en Écija y su provincia. */
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
        /* Dimensiones reales del fichero. Declarar un tamaño que no coincide
           con la imagen servida hace que Google descarte el nodo `logo`. */
        logo: {
          '@type': 'ImageObject',
          url: `${ORIGIN}/archic-mark-512.png`,
          contentUrl: `${ORIGIN}/archic-mark-512.png`,
          width: 512,
          height: 512,
        },
        image: `${ORIGIN}/og-image.png`,
        email: CONTACT_MAIL,
        description: t.meta.description,
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
      /* Las mismas preguntas que se ven en pantalla. El texto debe coincidir
         literalmente con el visible: marcar respuestas que el visitante no
         puede leer es motivo de acción manual en Search Console. */
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        inLanguage: lang,
        mainEntity: t.homeFaq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { '@id': `${ORIGIN}/#website` },
        about: { '@id': `${ORIGIN}/#organization` },
        /* Los dos bloques que resumen la página sin contexto previo: son los
           que un asistente de voz o de texto puede leer tal cual. */
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.ar-answer-body', '.ar-hero-title'],
        },
      },
    ],
  }
}
