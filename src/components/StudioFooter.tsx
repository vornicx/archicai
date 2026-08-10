import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { CONTACT_MAIL } from '../i18n/content'

const COPY = {
  es: { tagline: 'La parte digital de negocios excepcionales.', location: 'España · Remote & on-site', legal: 'Legal', rights: 'Todos los derechos reservados.' },
  en: { tagline: 'The digital side of exceptional businesses.', location: 'Spain · Remote & on-site', legal: 'Legal', rights: 'All rights reserved.' },
}

export default function StudioFooter() {
  const { lang, t } = useLang()
  const c = COPY[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="ax-footer">
      <div className="ax-footer-top">
        <div className="ax-footer-brand">
          <img src="/brand/archic-lockup-light.svg" alt="Archic" width={981} height={174} />
          <p>{c.tagline}</p>
        </div>

        <div className="ax-footer-contact">
          <span>CONTACT</span>
          <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
        </div>

        <nav className="ax-footer-legal" aria-label={c.legal}>
          <span>{c.legal}</span>
          <a href={LEGAL_PATHS.legal[lang]}>{t.legal.legalNotice}</a>
          <a href={LEGAL_PATHS.privacy[lang]}>{t.legal.privacy}</a>
          <a href={LEGAL_PATHS.cookies[lang]}>{t.legal.cookies}</a>
        </nav>
      </div>

      <div className="ax-footer-bottom">
        <span>© {year} ARCHIC — {c.rights}</span>
        <span>{c.location}</span>
      </div>
    </footer>
  )
}
