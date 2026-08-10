import { useLang } from '../i18n/LanguageContext'
import { LEGAL_PATHS } from '../legal/documents'
import { STUDIO } from '../content/studio'
import { CONTACT_MAIL } from '../i18n/content'
import { SERVICE_PAGES } from '../seo/servicePages'

/** Pie del estudio: navegación mínima, servicios indexables y bloque legal. */
export default function StudioFooter() {
  const { lang, t } = useLang()
  const s = STUDIO[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="sx-footer">
      <div className="sx-wrap">
        <div className="sx-footer-grid">
          <div>
            <p className="sx-display sx-h3" style={{ margin: 0 }}>
              Archic
            </p>
            <p className="sx-lead" style={{ marginTop: 12, fontSize: 15 }}>
              {s.footer.tagline}
            </p>
            <p className="sx-label" style={{ marginTop: 16 }}>
              {s.footer.base}
            </p>
          </div>

          <nav aria-label={s.nav.build}>
            <p className="sx-footer-col-title">{s.nav.build}</p>
            {s.build.layers.map((layer) => (
              <a key={layer.name} href="#build">
                Archic {layer.name}
              </a>
            ))}
          </nav>

          <div>
            <p className="sx-footer-col-title">{s.footer.legal}</p>
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
          <span>
            © {year} Archic. {s.footer.rights}
          </span>
          <span>{s.footer.base}</span>
        </div>
      </div>
    </footer>
  )
}
