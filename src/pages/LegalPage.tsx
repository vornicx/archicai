import { Fragment, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLang } from '../i18n/LanguageContext'
import { COMPANY, PROCESSORS } from '../legal/company'
import { LEGAL_DOCS, LEGAL_PATHS, type Block, type LegalDocKey } from '../legal/documents'
import Logo from '../components/Logo'
import { useScrollReveal } from '../useScrollReveal'

/** Splits `text [label](href) more` into text nodes and anchors. */
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
      <a
        key={`${key}-${index++}`}
        href={href}
        className="ar-inline-link"
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
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
  return (
    <span className="ar-legal-pending" title={t.legal.pendingHint}>
      {t.legal.pending}
    </span>
  )
}

/** Company identification required by LSSI art. 10 and GDPR art. 13. */
function IdentityBlock() {
  const { t } = useLang()
  const l = t.legal.identity

  const rows: { term: string; value: ReactNode }[] = [
    { term: l.legalName, value: COMPANY.legalName ?? <Pending /> },
    { term: l.taxId, value: COMPANY.taxId ?? <Pending /> },
    {
      term: l.address,
      value: COMPANY.address ? `${COMPANY.address} (${COMPANY.country})` : <Pending />,
    },
    {
      term: l.email,
      value: (
        <a href={`mailto:${COMPANY.email}`} className="ar-inline-link">
          {COMPANY.email}
        </a>
      ),
    },
    { term: l.phone, value: COMPANY.phone ?? <Pending /> },
  ]

  // Sole traders have no Mercantile Registry entry, so the row is dropped
  // entirely rather than shown as missing data.
  if (COMPANY.registry !== false) {
    rows.push({ term: l.registry, value: COMPANY.registry?.entry ?? <Pending /> })
  }

  rows.push({
    term: l.site,
    value: (
      <a href={COMPANY.site} className="ar-inline-link">
        {COMPANY.site.replace(/^https:\/\//, '')}
      </a>
    ),
  })

  return (
    <dl className="ar-legal-identity">
      {rows.map((row) => (
        <Fragment key={row.term}>
          <dt>{row.term}</dt>
          <dd>{row.value}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

/** Processors disclosed under GDPR art. 13.1.e. */
function ProcessorsBlock() {
  const { t, lang } = useLang()
  const l = t.legal.processors

  return (
    <div className="ar-legal-processors">
      {PROCESSORS.map((processor) => (
        <div key={processor.name} className="ar-legal-processor">
          <h3>{processor.name}</h3>
          <dl>
            <dt>{l.purpose}</dt>
            <dd>{processor.purpose[lang]}</dd>
            <dt>{l.location}</dt>
            <dd>{processor.location[lang]}</dd>
            {processor.transfer && (
              <>
                <dt>{l.transfer}</dt>
                <dd>{processor.transfer[lang]}</dd>
              </>
            )}
          </dl>
        </div>
      ))}
    </div>
  )
}

function renderBlock(block: Block, key: string) {
  switch (block.kind) {
    case 'p':
      return <p key={key}>{withLinks(block.text, key)}</p>
    case 'list':
      return (
        <ul key={key} className="ar-legal-list">
          {block.items.map((item, i) => (
            <li key={item}>{withLinks(item, `${key}-${i}`)}</li>
          ))}
        </ul>
      )
    case 'terms':
      return (
        <dl key={key} className="ar-legal-terms">
          {block.items.map((item, i) => (
            <Fragment key={item.term}>
              <dt>{item.term}</dt>
              <dd>{withLinks(item.desc, `${key}-${i}`)}</dd>
            </Fragment>
          ))}
        </dl>
      )
    case 'identity':
      return <IdentityBlock key={key} />
    case 'processors':
      return <ProcessorsBlock key={key} />
  }
}

export default function LegalPage({ doc: docKey }: { doc: LegalDocKey }) {
  const { t, lang } = useLang()
  useScrollReveal([docKey, lang])
  const doc = LEGAL_DOCS[lang][docKey]
  const home = lang === 'es' ? '/' : '/en/'
  const canonical = `${COMPANY.site}${LEGAL_PATHS[docKey][lang]}`

  return (
    <>
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

      <div className="ar-legal-page">
        <header className="ar-legal-header">
          <div className="ar-container">
            <a href={home} className="ar-legal-brand" aria-label={COMPANY.brand}>
              <Logo size={28} minSize={24} compactWordmark />
            </a>
            <nav className="ar-legal-nav" aria-label={t.footer.legalLabel}>
              <a href={LEGAL_PATHS.legal[lang]} aria-current={docKey === 'legal' ? 'page' : undefined}>
                {t.legal.legalNotice}
              </a>
              <a href={LEGAL_PATHS.privacy[lang]} aria-current={docKey === 'privacy' ? 'page' : undefined}>
                {t.legal.privacy}
              </a>
              <a href={LEGAL_PATHS.cookies[lang]} aria-current={docKey === 'cookies' ? 'page' : undefined}>
                {t.legal.cookies}
              </a>
              {/* Links to the same document in the other language, so a visitor
                  never lands on a policy they cannot read. */}
              <a
                className="ar-legal-lang"
                href={LEGAL_PATHS[docKey][lang === 'es' ? 'en' : 'es']}
                lang={lang === 'es' ? 'en' : 'es'}
                hrefLang={lang === 'es' ? 'en' : 'es'}
              >
                {lang === 'es' ? 'English' : 'Español'}
              </a>
            </nav>
          </div>
        </header>

        <article className="ar-container ar-legal">
          <h1 className="ar-h2">{doc.title}</h1>
          <p className="ar-lead">{doc.intro}</p>
          <p className="ar-legal-updated">
            {t.legal.lastUpdated}:{' '}
            <time dateTime={COMPANY.lastUpdated}>
              {new Date(`${COMPANY.lastUpdated}T00:00:00Z`).toLocaleDateString(
                lang === 'es' ? 'es-ES' : 'en-GB',
                { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
              )}
            </time>
          </p>

          <nav className="ar-legal-toc" aria-label={t.legal.onThisPage}>
            <p className="ar-eyebrow">{t.legal.onThisPage}</p>
            <ol>
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>

          {doc.sections.map((section) => (
            <section key={section.id} id={section.id} className="ar-legal-section">
              <h2>{section.heading}</h2>
              {section.blocks.map((block, i) => renderBlock(block, `${section.id}-${i}`))}
            </section>
          ))}

          <p className="ar-legal-back">
            <a href={home} className="ar-btn ar-btn-ghost">
              {t.legal.backHome}
            </a>
          </p>
        </article>
      </div>
    </>
  )
}
