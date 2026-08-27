import { useState } from 'react'
import { CONTACT_MAIL } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { ARCHIC_FOUNDERS } from '../config/contact'
import { getAttributionSummary, recordIntent } from '../analytics/leadAttribution'

const QUALIFY = {
  es: {
    directTitle: 'CONTACTO DIRECTO',
    directBody: 'Habla directamente con cualquiera de los dos fundadores según lo que necesites.',
    divider: 'O cuéntanos cómo funciona el negocio',
    website: 'Web actual',
    websitePlaceholder: 'https://tuempresa.es (opcional)',
    revenue: '¿Cómo gana dinero el negocio?',
    revenuePlaceholder: 'Qué vendéis, a quién y cómo suele llegar una venta o reserva.',
    challenge: '¿Qué no está funcionando como debería?',
    challengePlaceholder: 'Describe el cuello de botella, la oportunidad o la fricción que quieres resolver.',
    outcome: '¿Qué debería cambiar si hacemos bien el proyecto?',
    outcomePlaceholder: 'Más solicitudes cualificadas, menos trabajo manual, mejor percepción, un flujo nuevo…',
    investment: 'Inversión prevista',
    investmentOptions: ['Aún no definido', 'Menos de 1.500 €', '1.500–3.000 €', '3.000–7.500 €', '7.500–15.000 €', '15.000 €+'],
    details: 'Contexto adicional',
    detailsPlaceholder: 'Plazos, herramientas actuales, referencias, restricciones o cualquier detalle que debamos conocer.',
    auditType: 'Digital Opportunity Audit',
    contextLabel: 'Contexto de llegada (sesión, sin tracking externo)',
  },
  en: {
    directTitle: 'DIRECT CONTACT',
    directBody: 'Talk directly with either founder depending on what you need.',
    divider: 'Or tell us how the business works',
    website: 'Current website',
    websitePlaceholder: 'https://yourcompany.com (optional)',
    revenue: 'How does the business make money?',
    revenuePlaceholder: 'What you sell, to whom and how a sale or booking usually happens.',
    challenge: 'What is not working as it should?',
    challengePlaceholder: 'Describe the bottleneck, opportunity or friction you want to solve.',
    outcome: 'What should change if we do this well?',
    outcomePlaceholder: 'More qualified enquiries, less manual work, stronger perception, a new workflow…',
    investment: 'Expected investment',
    investmentOptions: ['Not defined yet', 'Under €1,500', '€1,500–3,000', '€3,000–7,500', '€7,500–15,000', '€15,000+'],
    details: 'Additional context',
    detailsPlaceholder: 'Timing, current tools, references, constraints or anything else we should know.',
    auditType: 'Digital Opportunity Audit',
    contextLabel: 'Arrival context (session only, no external tracking)',
  },
} as const

export default function StudioContact() {
  const { t, lang } = useLang()
  const c = t.contact
  const n = t.privacyNotice
  const q = QUALIFY[lang]
  const [status, setStatus] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)
  const [consent, setConsent] = useState(false)

  const [consentBefore, consentAfter] = n.consent.split('{link}')
  const formLabel = lang === 'es' ? 'Consulta de proyecto Archic' : 'Archic project enquiry'
  const isAudit = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('intent') === 'audit'
  const typeOptions = isAudit ? [q.auditType, ...c.types] : c.types

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const contact = String(data.get('contact') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const website = String(data.get('website') ?? '').trim()
    const type = String(data.get('type') ?? typeOptions[0])
    const revenue = String(data.get('revenue') ?? '').trim()
    const challenge = String(data.get('challenge') ?? '').trim()
    const outcome = String(data.get('outcome') ?? '').trim()
    const investment = String(data.get('investment') ?? q.investmentOptions[0])
    const details = String(data.get('details') ?? '').trim()

    if (!name || !revenue || !challenge || !outcome) {
      setStatus({ tone: 'error', text: c.errorRequired })
      return
    }
    if (!contact) {
      setStatus({ tone: 'error', text: c.errorContact })
      return
    }
    if (!consent) {
      setStatus({ tone: 'error', text: n.consentError })
      return
    }

    recordIntent('contact:submit')
    const attribution = getAttributionSummary()
    const body = [
      `${c.fields.name}: ${name}`,
      `${c.fields.company}: ${company || '-'}`,
      `${c.fields.contact}: ${contact}`,
      `${q.website}: ${website || '-'}`,
      `${c.fields.type}: ${type}`,
      `${q.investment}: ${investment}`,
      '',
      `${q.revenue}`,
      revenue,
      '',
      `${q.challenge}`,
      challenge,
      '',
      `${q.outcome}`,
      outcome,
      '',
      `${q.details}`,
      details || '-',
      ...(attribution.length ? ['', `— ${q.contextLabel} —`, ...attribution] : []),
    ].join('\n')

    window.location.href = `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(
      `${type} — ${company || name}`,
    )}&body=${encodeURIComponent(body)}`
    setStatus({ tone: 'ok', text: c.sent })
  }

  return (
    <form className="sx-form" onSubmit={handleSubmit} noValidate aria-label={formLabel}>
      <section className="sx-direct-team" aria-label={q.directTitle}>
        <div className="sx-direct-team-head">
          <span>{q.directTitle}</span>
          <p>{q.directBody}</p>
        </div>

        <div className="sx-direct-team-grid">
          {ARCHIC_FOUNDERS.map((founder, index) => (
            <article className="sx-direct-founder" key={founder.email}>
              <span>0{index + 1}</span>
              <div className="sx-direct-founder-identity">
                <strong>{founder.name}</strong>
                <small>{founder.role} · {founder.focus}</small>
              </div>
              <div className="sx-direct-founder-links">
                <a href={`mailto:${founder.email}`}>{founder.email}</a>
                <a href={`tel:${founder.phone}`}>{founder.phoneDisplay}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="sx-form-divider"><span>{q.divider}</span></div>

      <div className="sx-field-row">
        <div className="sx-field">
          <label htmlFor="sx-name">{c.fields.name}</label>
          <input id="sx-name" name="name" type="text" autoComplete="name" required placeholder={c.placeholders.name} />
        </div>
        <div className="sx-field">
          <label htmlFor="sx-company">{c.fields.company}</label>
          <input id="sx-company" name="company" type="text" autoComplete="organization" placeholder={c.placeholders.company} />
        </div>
      </div>

      <div className="sx-field-row">
        <div className="sx-field">
          <label htmlFor="sx-contact">{c.fields.contact}</label>
          <input id="sx-contact" name="contact" type="text" required placeholder={c.placeholders.contact} />
        </div>
        <div className="sx-field">
          <label htmlFor="sx-website">{q.website}</label>
          <input id="sx-website" name="website" type="url" autoComplete="url" placeholder={q.websitePlaceholder} />
        </div>
      </div>

      <fieldset className="sx-type-options">
        <legend>{c.fields.type}</legend>
        <div>
          {typeOptions.map((option, index) => (
            <label key={option}>
              <input type="radio" name="type" value={option} defaultChecked={index === 0} />
              <span>{option}</span>
              <i aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sx-field">
        <label htmlFor="sx-revenue">{q.revenue}</label>
        <textarea id="sx-revenue" name="revenue" required placeholder={q.revenuePlaceholder} />
      </div>

      <div className="sx-field">
        <label htmlFor="sx-challenge">{q.challenge}</label>
        <textarea id="sx-challenge" name="challenge" required placeholder={q.challengePlaceholder} />
      </div>

      <div className="sx-field">
        <label htmlFor="sx-outcome">{q.outcome}</label>
        <textarea id="sx-outcome" name="outcome" required placeholder={q.outcomePlaceholder} />
      </div>

      <fieldset className="sx-type-options sx-investment-options">
        <legend>{q.investment}</legend>
        <div>
          {q.investmentOptions.map((option, index) => (
            <label key={option}>
              <input type="radio" name="investment" value={option} defaultChecked={index === 0} />
              <span>{option}</span>
              <i aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sx-field">
        <label htmlFor="sx-details">{q.details}</label>
        <textarea id="sx-details" name="details" placeholder={q.detailsPlaceholder} />
      </div>

      <label className="sx-consent" htmlFor="sx-consent">
        <input id="sx-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{consentBefore}<a href={LEGAL_PATHS.privacy[lang]}>{n.consentLinkLabel}</a>{consentAfter}</span>
      </label>

      <button type="submit" className="sx-btn sx-btn-solid" data-archic-intent="contact:send">
        {c.submit}
        <i className="as-arrow" aria-hidden="true" />
      </button>

      {status && <p className="sx-form-msg" data-tone={status.tone} role="status">{status.text}</p>}
    </form>
  )
}
