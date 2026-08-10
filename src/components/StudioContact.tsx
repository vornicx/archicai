import { useState } from 'react'
import { CONTACT_MAIL } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'

export default function StudioContact() {
  const { t, lang } = useLang()
  const c = t.contact
  const n = t.privacyNotice
  const [status, setStatus] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)
  const [consent, setConsent] = useState(false)

  const [consentBefore, consentAfter] = n.consent.split('{link}')
  const formLabel = lang === 'es' ? 'Consulta de proyecto Archic' : 'Archic project enquiry'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const contact = String(data.get('contact') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const type = String(data.get('type') ?? '')

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
      <div className="sx-field-row">
        <div className="sx-field">
          <label htmlFor="sx-name">{c.fields.name}</label>
          <input id="sx-name" name="name" type="text" required placeholder={c.placeholders.name} />
        </div>
        <div className="sx-field">
          <label htmlFor="sx-company">{c.fields.company}</label>
          <input id="sx-company" name="company" type="text" placeholder={c.placeholders.company} />
        </div>
      </div>

      <div className="sx-field-row">
        <div className="sx-field">
          <label htmlFor="sx-contact">{c.fields.contact}</label>
          <input id="sx-contact" name="contact" type="text" required placeholder={c.placeholders.contact} />
        </div>
        <div className="sx-field">
          <label htmlFor="sx-type">{c.fields.type}</label>
          <select id="sx-type" name="type" defaultValue={c.types[0]}>
            {c.types.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

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
