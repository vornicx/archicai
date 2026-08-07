/**
 * Grafo JSON-LD de las guías, compartido por React y el generador estático.
 *
 * El tipo es `Article` y no `BlogPosting`: no son entradas de un blog con
 * cadencia, son documentos de referencia que se revisan. `dateModified` sale
 * del propio contenido, no de la fecha de compilación, para que actualizar el
 * despliegue no simule una revisión que no ha ocurrido.
 */
import { GUIDES, GUIDES_INDEX_PATH, type Guide } from '../content/guides'

const ORIGIN = 'https://archic.es'

const GUIDES_INDEX_TITLE = 'Guías de diseño web y software para empresas'
const GUIDES_INDEX_DESCRIPTION =
  'Guías prácticas sobre diseño web, presupuestos, mantenimiento y digitalización de procesos, escritas para quien tiene que tomar la decisión, no para quien programa.'

export const GUIDES_INDEX_META = {
  title: `${GUIDES_INDEX_TITLE} | Archic`,
  description: GUIDES_INDEX_DESCRIPTION,
  heading: GUIDES_INDEX_TITLE,
}

export function buildGuideGraph(guide: Guide) {
  const canonical = `${ORIGIN}${guide.path}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: guide.title,
        description: guide.description,
        /* El párrafo de respuesta directa, marcado explícitamente: es lo que
           un asistente puede citar sin arrastrar el resto del documento. */
        abstract: guide.answer,
        inLanguage: 'es',
        datePublished: guide.published,
        dateModified: guide.updated,
        author: { '@id': `${ORIGIN}/#organization` },
        publisher: { '@id': `${ORIGIN}/#organization` },
        image: `${ORIGIN}/og-image.png`,
        mainEntityOfPage: { '@id': `${canonical}#webpage` },
        about: guide.secondary.map((name) => ({ '@type': 'Thing', name })),
        keywords: [guide.keyword, ...guide.secondary].join(', '),
        wordCount: countWords(guide),
        timeRequired: `PT${guide.readingMinutes}M`,
        isPartOf: { '@id': `${ORIGIN}${GUIDES_INDEX_PATH}#collection` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Guías', item: `${ORIGIN}${GUIDES_INDEX_PATH}` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        inLanguage: 'es',
        mainEntity: guide.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: guide.metaTitle,
        description: guide.description,
        inLanguage: 'es',
        isPartOf: { '@id': `${ORIGIN}/#website` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        primaryImageOfPage: { '@id': `${ORIGIN}/#organization` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.ar-guide-answer'],
        },
      },
    ],
  }
}

export function buildGuidesIndexGraph() {
  const canonical = `${ORIGIN}${GUIDES_INDEX_PATH}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#collection`,
        url: canonical,
        name: GUIDES_INDEX_META.title,
        description: GUIDES_INDEX_META.description,
        inLanguage: 'es',
        isPartOf: { '@id': `${ORIGIN}/#website` },
        publisher: { '@id': `${ORIGIN}/#organization` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        mainEntity: { '@id': `${canonical}#list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#list`,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        numberOfItems: GUIDES.length,
        itemListElement: GUIDES.map((guide, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${ORIGIN}${guide.path}`,
          name: guide.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Guías', item: canonical },
        ],
      },
    ],
  }
}

/**
 * Recuento aproximado de palabras del cuerpo. `wordCount` es una señal menor,
 * pero declararlo mal es peor que no declararlo, así que se calcula del texto
 * real en lugar de estimarlo a ojo.
 */
function countWords(guide: Guide): number {
  const parts: string[] = [guide.answer]
  for (const section of guide.sections) {
    parts.push(section.heading)
    for (const block of section.blocks) {
      switch (block.kind) {
        case 'p':
          parts.push(block.text)
          break
        case 'list':
        case 'steps':
          parts.push(block.items.join(' '))
          break
        case 'table':
          parts.push(block.head.join(' '), block.rows.flat().join(' '))
          break
        case 'callout':
          parts.push(block.title, block.text)
          break
      }
    }
  }
  for (const item of guide.faq) parts.push(item.q, item.a)
  return parts.join(' ').trim().split(/\s+/).length
}
