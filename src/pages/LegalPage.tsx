import { Fragment, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { COMPANY, PROCESSORS } from '../legal/company'
import { LEGAL_DOCS, LEGAL_PATHS, type Block, type LegalDocKey } from '../legal/documents'
import StudioHeader from '../components/StudioHeader'
import StudioFooter from '../components/StudioFooter'
import StudioExperience from '../components/StudioExperience'

function withLinks(text: string, key: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let cursor = 0
  let match: RegExpExecArray | null
  let index = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    const href = match[2].replace('{email}', COMPANY.email)
    const external = href.startsWith('http')
    nodes.push(
      <a key={`${key}-${index++}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {match[1]}
      </a>,
    )
    cursor = match.index + match[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

function Pending() {
  const { t } = useLang()
  return <span title={t.legal.pendingHint}>{t.legal.pending}</span>
}

function IdentityBlock() {
  const { t } = useLang()
  const l = t.legal.identity
  const rows: { term: string; value: ReactNode }[] = [
    { term: l.legalName, value: COMPANY.legalName ?? <Pending /> },
    { term: l.taxId, value: COMPANY.taxId ?? <Pending /> },
    { term: l.address, value: COMPANY.address ? `${COMPANY.address} (${COMPANY.country})` : <Pending /> },
    { term: l.email, value: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> },
    { term: l.phone, value: COMPANY.phone ?? <Pending /> },
  ]

  if (COMPANY.registry !== false) rows.push({ term: l.registry, value: COMPANY.registry?.entry ?? <Pending /> })
  rows.push({ term: l.site, value: <a href={COMPANY.site}>{COMPANY.site.replace(/^https:\/\//, '')}</a> })

  return (
    <dl>
      {rows.map((row) => <Fragment key={row.term}><dt>{row.term}</dt><dd>{row.value}</dd></Fragment>)}
    </dl>
  )
}

function ProcessorsBlock() {
  const { t, lang } = useLang()
  const l = t.legal.processors
  return (
    <div>
      {PROCESSORS.map((processor) => (
        <div key={processor.name}>
          <h3>{processor.name}</h3>
          <dl>
            <dt>{l.purpose}</dt><dd>{processor.purpose[lang]}</dd>
            <dt>{l.location}</dt><dd>{processor.location[lang]}</dd>
            {processor.transfer && <><dt>{l.transfer}</dt><dd>{processor.transfer[lang]}</dd></>}
          </dl>
        </div>
      ))}
    </div>
  )
}

function renderBlock(block: Block, key: string) {
  switch (block.kind) {
    case 'p': return <p key={key}>{withLinks(block.text, key)}</p>
    case 'list': return <ul key={key}>{block.items.map((item, i) => <li key={item}>{withLinks(item, `${key}-${i}`)}</li>)}</ul>
    case 'terms':
      return (
        <dl key={key}>
          {block.items.map((item, i) => <Fragment key={item.term}><dt>{item.term}</dt><dd>{withLinks(item.desc, `${key}-${i}`)}</dd></Fragment>)}
        </dl>
      )
    case 'identity': return <IdentityBlock key={key} />
    case 'processors': return <ProcessorsBlock key={key} />
  }
}

export default function LegalPage({ doc: docKey }: { doc: LegalDocKey }) {
  const { t, lang } = useLang()
  const doc = LEGAL_DOCS[lang][docKey]
  const home = lang === 'es' ? '/' : '/en/'
  const canonical = `${COMPANY.site}${LEGAL_PATHS[docKey][lang]}`
  const otherLang = lang === 'es' ? 'en' : 'es'

  return (
    <div className="as-site as-legal-shell">
      <Helmet htmlAttributes={{ lang }}>
        <title>{`${doc.title} | ${COMPANY.brand}`}</title>
        <meta name="description" content={doc.intro} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="es" href={`${COMPANY.site}${LEGAL_PATHS[docKey].es}`} />
        <link rel="alternate" hrefLang="en" href={`${COMPANY.site}${LEGAL_PATHS[docKey].en}`} />
        <link rel="alternate" hrefLang="x-default" href={`${COMPANY.site}${LEGAL_PATHS[docKey].es}`} />
        <meta property="og:title" content={`${doc.title} | ${COMPANY.brand}`} />
        <meta property="og:description" content={doc.intro} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={COMPANY.brand} />
        <meta property="og:locale" content={lang === 'es' ? 'es_ES' : 'en_US'} />
      </Helmet>

      <StudioExperience />
      <StudioHeader />

      <main className="as-legal-main">
        <header>
          <div className="as-seo-breadcrumb"><a href={home}>Archic</a><span>/</span><span>{doc.title}</span></div>
          <div className="as-seo-layer">ARCHIC / LEGAL</div>
          <h1>{doc.title}</h1>
          <p>{doc.intro}</p>
          <p className="as-legal-updated">
            {t.legal.lastUpdated}: <time dateTime={COMPANY.lastUpdated}>{new Date(`${COMPANY.lastUpdated}T00:00:00Z`).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>
            {' · '}<a href={LEGAL_PATHS[docKey][otherLang]} lang={otherLang} hrefLang={otherLang}>{lang === 'es' ? 'Read in English' : 'Leer en español'}</a>
          </p>
        </header>

        <nav className="as-legal-toc-new" aria-label={t.legal.onThisPage}>
          <span>{t.legal.onThisPage}</span>
          <ol>{doc.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
        </nav>

        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} className="as-legal-section-new">
            <h2>{section.heading}</h2>
            {section.blocks.map((block, i) => renderBlock(block, `${section.id}-${i}`))}
          </section>
        ))}

        <a className="as-btn" style={{ border: '1px solid rgba(5,5,5,.28)', color: '#17140f' }} href={home}>{t.legal.backHome}</a>
      </main>

      <StudioFooter />
    </div>
  )
}
