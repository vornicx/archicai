import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { STUDIO } from '../content/studio'
import { CONTACT_MAIL } from '../i18n/content'
import { SERVICE_PAGES } from '../seo/servicePages'

/** Pie: identidad, capas del sistema, servicios indexables y bloque legal. */
export default function StudioFooter() {
  const { lang, t } = useLang()
  const s = STUDIO[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="sx-footer">
      <div className="sx-footer-grid">
        <div>
          <div className="sx-brand sx-brand-footer" role="img" aria-label="Archic">
            <img
              className="sx-brand-lockup"
              src="/brand/archic-lockup-light.svg"
              alt=""
              width={981}
              height={174}
            />
          </div>
          <p className="sx-footer-tagline">{s.footer.tagline}</p>
          <p className="sx-footer-base">{s.footer.base}</p>
        </div>

        <nav aria-label={s.footer.systems}>
          <p className="sx-footer-title">{s.footer.systems}</p>
          {s.system.steps.map((step) => (
            <a key={step.name} href="#systems">
              {step.name}
            </a>
          ))}
        </nav>

        <div>
          <p className="sx-footer-title">{s.footer.legal}</p>
          <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
          <a href={LEGAL_PATHS.legal[lang]}>{t.legal.legalNotice}</a>
          <a href={LEGAL_PATHS.privacy[lang]}>{t.legal.privacy}</a>
          <a href={LEGAL_PATHS.cookies[lang]}>{t.legal.cookies}</a>
          {SERVICE_PAGES.slice(0, 2).map((page) => (
            <a key={page.path} href={page.path}>
              {page.breadcrumb}
            </a>
          ))}
        </div>
      </div>

      <div className="sx-footer-bottom">
        <span>© {year} Archic. {s.footer.rights}</span>
        <span>{s.footer.base}</span>
      </div>
    </footer>
  )
}
