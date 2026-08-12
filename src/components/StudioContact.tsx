import { useState } from 'react'
import { CONTACT_MAIL } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { ANTERO_CONTACT, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'

export default function StudioContact() {
  const { t, lang } = useLang()
  const c = t.contact
  const n = t.privacyNotice
  const [status, setStatus] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)
  const [consent, setConsent] = useState(false)

  const [consentBefore, consentAfter] = n.consent.split('{link}')
  const formLabel = lang === 'es' ? 'Consulta de proyecto Archic' : 'Archic project enquiry'
  const directTitle = lang === 'es' ? 'CONTACTO DIRECTO' : 'DIRECT CONTACT'
  const directBody = lang === 'es'
    ? 'Habla directamente con cualquiera de los dos fundadores según lo que necesites.'
    : 'Talk directly with either founder depending on what you need.'
  const formDivider = lang === 'es' ? 'O cuéntanos el proyecto' : 'Or tell us about the project'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const contact = String(data.get('contact') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const type = String(data.get('type') ?? c.types[0])

    if (!name || !message) {
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

    const body = [
      `${c.fields.name}: ${name}`,
      `${c.fields.company}: ${company || '-'}`,
      `${c.fields.contact}: ${contact}`,
      `${c.fields.type}: ${type}`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(
      `${type} — ${company || name}`,
    )}&body=${encodeURIComponent(body)}`
    setStatus({ tone: 'ok', text: c.sent })
  }

  return (
    <form className="sx-form" onSubmit={handleSubmit} noValidate aria-label={formLabel}>
      <section className="sx-direct-team" aria-label={directTitle}>
        <div className="sx-direct-team-head">
          <span>{directTitle}</span>
          <p>{directBody}</p>
        </div>

        <div className="sx-direct-team-grid">
          <article className="sx-direct-founder">
            <span>01</span>
            <div className="sx-direct-founder-identity">
              <strong>Vadim Vornic</strong>
              <small>Co-Founder · Product &amp; Technology</small>
            </div>
            <div className="sx-direct-founder-links">
              <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
              <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE_DISPLAY}</a>
            </div>
          </article>

          <article className="sx-direct-founder">
            <span>02</span>
            <div className="sx-direct-founder-identity">
              <strong>{ANTERO_CONTACT.name}</strong>
              <small>Co-Founder · Growth &amp; Client Partnerships</small>
            </div>
            <div className="sx-direct-founder-links">
              <a href={`mailto:${ANTERO_CONTACT.email}`}>{ANTERO_CONTACT.email}</a>
              <a href={`tel:${ANTERO_CONTACT.phone}`}>{ANTERO_CONTACT.phoneDisplay}</a>
            </div>
          </article>
        </div>
      </section>

      <div className="sx-form-divider"><span>{formDivider}</span></div>

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

      <div className="sx-field">
        <label htmlFor="sx-contact">{c.fields.contact}</label>
        <input id="sx-contact" name="contact" type="text" required placeholder={c.placeholders.contact} />
      </div>

      <fieldset className="sx-type-options">
        <legend>{c.fields.type}</legend>
        <div>
          {c.types.map((option, index) => (
            <label key={option}>
              <input type="radio" name="type" value={option} defaultChecked={index === 0} />
              <span>{option}</span>
              <i aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sx-field">
        <label htmlFor="sx-message">{c.fields.message}</label>
        <textarea id="sx-message" name="message" required placeholder={c.placeholders.message} />
      </div>

      <label className="sx-consent" htmlFor="sx-consent">
        <input id="sx-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>{consentBefore}<a href={LEGAL_PATHS.privacy[lang]}>{n.consentLinkLabel}</a>{consentAfter}</span>
      </label>

      <button type="submit" className="sx-btn sx-btn-solid">
        {c.submit}
        <i className="as-arrow" aria-hidden="true" />
      </button>

      {status && <p className="sx-form-msg" data-tone={status.tone} role="status">{status.text}</p>}
    </form>
  )
}