import { useState } from 'react'
import { CONTACT_MAIL } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'

export default function ContactForm() {
  const { t, lang } = useLang()
  const c = t.contact
  const n = t.privacyNotice
  const [status, setStatus] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null)
  const [consent, setConsent] = useState(false)

  const [consentBefore, consentAfter] = n.consent.split('{link}')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const contact = String(data.get('contact') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const type = String(data.get('type') ?? '')
    const budget = String(data.get('budget') ?? '').trim()

    if (!name || !message) {
      setStatus({ tone: 'error', text: c.errorRequired })
      return
    }
    if (!contact) {
      setStatus({ tone: 'error', text: c.errorContact })
      return
    }
    // Consent is collected before any data leaves the browser (art. 7 GDPR).
    if (!consent) {
      setStatus({ tone: 'error', text: n.consentError })
      return
    }

    const body = [
      `${c.fields.name}: ${name}`,
      `${c.fields.company}: ${company || '-'}`,
      `${c.fields.contact}: ${contact}`,
      `${c.fields.type}: ${type}`,
      `${c.fields.budget}: ${budget || '-'}`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(
      `${type} — ${company || name}`,
    )}&body=${encodeURIComponent(body)}`
    setStatus({ tone: 'ok', text: c.sent })
  }

  return (
    <form className="ar-form" onSubmit={handleSubmit} noValidate>
      <div className="ar-field">
        <label htmlFor="cf-name">{c.fields.name}</label>
        <input id="cf-name" name="name" type="text" required placeholder={c.placeholders.name} />
      </div>

      <div className="ar-field">
        <label htmlFor="cf-company">
          {c.fields.company} <span className="ar-note">({c.optional})</span>
        </label>
        <input id="cf-company" name="company" type="text" placeholder={c.placeholders.company} />
      </div>

      <div className="ar-field">
        <label htmlFor="cf-contact">{c.fields.contact}</label>
        <input id="cf-contact" name="contact" type="text" required placeholder={c.placeholders.contact} />
      </div>

      <div className="ar-field">
        <label htmlFor="cf-type">{c.fields.type}</label>
        <select id="cf-type" name="type" defaultValue={c.types[0]}>
          {c.types.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="ar-field">
        <label htmlFor="cf-budget">
          {c.fields.budget} <span className="ar-note">({c.optional})</span>
        </label>
        <input id="cf-budget" name="budget" type="text" placeholder={c.placeholders.budget} />
      </div>

      <div className="ar-field">
        <label htmlFor="cf-message">{c.fields.message}</label>
        <textarea id="cf-message" name="message" required placeholder={c.placeholders.message} />
      </div>

      {/* First information layer required by art. 11 LOPDGDD and the AEPD's
          model, with the full detail one click away in the privacy policy. */}
      <div className="ar-privacy-notice">
        <p>{n.heading}</p>
        <dl>
          {n.rows.map((row) => (
            <div key={row.term} style={{ display: 'contents' }}>
              <dt>{row.term}</dt>
              <dd>{row.desc}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="ar-consent">
        <input
          id="cf-consent"
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="cf-consent">
          {consentBefore}
          <a
            href={LEGAL_PATHS.privacy[lang]}
            className="ar-inline-link"
            target="_blank"
            rel="noreferrer"
          >
            {n.consentLinkLabel}
          </a>
          {consentAfter}
        </label>
      </div>

      <div>
        <button type="submit" className="ar-btn ar-btn-primary">
          {c.submit}
        </button>
      </div>

      {status && (
        <p className="ar-form-msg" data-tone={status.tone} role="status">
          {status.text}
        </p>
      )}
    </form>
  )
}
