/**
 * Pie común a todas las páginas.
 *
 * Estaba duplicado en la portada y en las landings, con listas de enlaces que
 * ya habían empezado a divergir. Al unificarlo, cada página nueva hereda el
 * mapa completo de enlaces internos, que en un sitio pequeño es la señal de
 * enlazado más constante que se puede dar.
 *
 * Los destinos van en rutas absolutas y no en anclas relativas para que
 * funcionen igual desde una guía, una landing o la portada.
 */
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_MAIL } from '../i18n/content'
import { LEGAL_PATHS } from '../legal/documents'
import { GUIDES, GUIDES_INDEX_PATH } from '../content/guides'
import { SERVICE_PAGES } from '../seo/servicePages'
import { LOCAL_PAGES } from '../seo/localPages'
import Logo from './Logo'

export default function SiteFooter() {
  const { t, lang } = useLang()
  const home = lang === 'es' ? '/' : '/en/'

  return (
    <footer className="ar-footer">
      <div className="ar-container">
        <div className="ar-footer-grid">
          <div>
            <Logo size={30} className="ar-logo-footer" />
            <p className="ar-lead" style={{ fontSize: 14, marginTop: 12 }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Las landings y las guías solo existen en castellano; en inglés se
              muestra la navegación de la portada para no enlazar a páginas que
              el visitante no puede leer. */}
          {lang === 'es' ? (
            <div className="ar-footer-cols">
              <div>
                <p className="ar-footer-col-title">Servicios</p>
                {SERVICE_PAGES.map((page) => (
                  <a key={page.path} href={page.path}>
                    {page.breadcrumb}
                  </a>
                ))}
              </div>
              <div>
                <p className="ar-footer-col-title">Écija y Sevilla</p>
                {LOCAL_PAGES.map((page) => (
                  <a key={page.path} href={page.path}>
                    {page.breadcrumb}
                  </a>
                ))}
              </div>
              <div>
                <p className="ar-footer-col-title">Guías</p>
                {GUIDES.map((guide) => (
                  <a key={guide.path} href={guide.path}>
                    {guide.title.split(':')[0]}
                  </a>
                ))}
                <a href={GUIDES_INDEX_PATH}>Todas las guías</a>
              </div>
              <div>
                <p className="ar-footer-col-title">Archic</p>
                <a href={`${home}#sobre`}>{t.nav.about}</a>
                <a href={`${home}#proyectos`}>{t.nav.projects}</a>
                <a href={`${home}#faq`}>Preguntas frecuentes</a>
                <a href="https://midas.archic.es" target="_blank" rel="noreferrer">
                  Archic Labs
                </a>
                <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
              </div>
            </div>
          ) : (
            <div className="ar-footer-links">
              <a href={`${home}#servicios`}>{t.nav.web}</a>
              <a href={`${home}#proyectos`}>{t.nav.projects}</a>
              <a href={`${home}#sobre`}>{t.nav.about}</a>
              <a href={`${home}#faq`}>FAQ</a>
              <a href={`${home}#contacto`}>{t.nav.contact}</a>
              <a href="https://midas.archic.es" target="_blank" rel="noreferrer">
                Archic Labs
              </a>
              <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
            </div>
          )}
        </div>

        {/* Art. 10 LSSI-CE exige acceso permanente, fácil y directo al aviso
            legal desde cualquier página. */}
        <nav className="ar-footer-legal" aria-label={t.footer.legalLabel}>
          <a href={LEGAL_PATHS.legal[lang]}>{t.legal.legalNotice}</a>
          <a href={LEGAL_PATHS.privacy[lang]}>{t.legal.privacy}</a>
          <a href={LEGAL_PATHS.cookies[lang]}>{t.legal.cookies}</a>
        </nav>

        <div className="ar-footer-bottom">
          <span>
            © {new Date().getFullYear()} ARCHIC · {t.footer.rights}
          </span>
          <span>ÉCIJA · SEVILLA · ESPAÑA</span>
        </div>
      </div>
    </footer>
  )
}
