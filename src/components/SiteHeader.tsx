import { useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import Logo from './Logo'


const SECTIONS = [
  { key: 'web', href: '#servicios' },
  { key: 'software', href: '#software' },
  { key: 'maintenance', href: '#mantenimiento' },
  { key: 'projects', href: '#proyectos' },
  { key: 'about', href: '#sobre' },
  { key: 'contact', href: '#contacto' },
] as const

const SERVICE_ANCHORS = new Set(['web', 'software', 'maintenance'])

/**
 * Enlaces internos permanentes hacia las landings que deben recibir autoridad.
 * Estar en el header de todas las páginas es la señal de enlazado interno más
 * fuerte que puede dar un sitio pequeño. Solo se muestran en castellano: las
 * landings de servicio y locales no tienen versión en inglés.
 */
const SERVICE_LINKS = [
  { href: '/diseno-web-para-empresas/', label: 'Diseño web para empresas' },
  { href: '/diseno-web-para-autonomos/', label: 'Diseño web para autónomos' },
  { href: '/desarrollo-web-a-medida/', label: 'Desarrollo a medida' },
  { href: '/mantenimiento-web/', label: 'Mantenimiento web' },
] as const

const LOCAL_LINKS = [
  { href: '/diseno-web-sevilla/', label: 'Diseño web en Sevilla' },
  { href: '/diseno-web-ecija/', label: 'Diseño web en Écija' },
  { href: '/desarrollo-web-sevilla/', label: 'Desarrollo web en Sevilla' },
  { href: '/mantenimiento-web-sevilla/', label: 'Mantenimiento web en Sevilla' },
] as const

/**
 * Desde una landing de servicio los anclajes deben volver a la home; en la
 * propia home el navegador los resuelve como salto de fragmento.
 */
function useSectionBase() {
  if (typeof window === 'undefined') return '/'
  const path = window.location.pathname
  if (path === '/' || path === '/en/' || path === '/en') return ''
  return path.startsWith('/en') ? '/en/' : '/'
}


export default function SiteHeader() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const base = useSectionBase()

  return (
    <header className="ar-header">
      <div className="ar-container">
        <div className="ar-header-row">
          <a className="ar-brand" href={base || "#top"}>
            <Logo size={28} minSize={24} compactWordmark />
          </a>


          <nav className="ar-nav" aria-label={t.a11y.mainNav}>
            {lang === 'es' && (
              <div
                className="ar-nav-group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="ar-nav-trigger"
                  aria-expanded={servicesOpen}
                  aria-controls="ar-services-menu"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Servicios
                  <span aria-hidden="true" className="ar-nav-caret" />
                </button>
                <div
                  id="ar-services-menu"
                  className="ar-nav-menu"
                  hidden={!servicesOpen}
                  onFocus={() => setServicesOpen(true)}
                >
                  <p className="ar-nav-menu-title">Servicios</p>
                  {SERVICE_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setServicesOpen(false)}>
                      {link.label}
                    </a>
                  ))}
                  <p className="ar-nav-menu-title">Écija y Sevilla</p>
                  {LOCAL_LINKS.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setServicesOpen(false)}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {/* En castellano los tres servicios viven en el menú desplegable,
                que enlaza a las landings en lugar de a anclas de la home. */}
            {SECTIONS.filter((s) => lang !== 'es' || !SERVICE_ANCHORS.has(s.key)).map((s) => (
              <a key={s.key} href={`${base}${s.href}`}>
                {t.nav[s.key]}
              </a>
            ))}
          </nav>

          <div className="ar-header-actions">
            <div className="ar-lang" role="group" aria-label={t.footer.langLabel}>
              <button
                type="button"
                aria-pressed={lang === 'es'}
                lang="es"
                onClick={() => setLang('es')}
              >
                <span aria-hidden="true">ES</span>
                <span className="ar-sr-only">Español</span>
              </button>
              <button
                type="button"
                aria-pressed={lang === 'en'}
                lang="en"
                onClick={() => setLang('en')}
              >
                <span aria-hidden="true">EN</span>
                <span className="ar-sr-only">English</span>
              </button>
            </div>
            <a href={`${base}#contacto`} className="ar-btn ar-btn-primary ar-btn-sm ar-header-cta">
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="ar-burger"
              aria-expanded={open}
              aria-controls="ar-mobile-nav"
              aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav id="ar-mobile-nav" className="ar-mobile-nav" aria-label={t.a11y.mainNav}>
            {lang === 'es' && (
              <>
                <p className="ar-nav-menu-title">Servicios</p>
                {SERVICE_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <p className="ar-nav-menu-title">Écija y Sevilla</p>
                {LOCAL_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <p className="ar-nav-menu-title">Navegación</p>
              </>
            )}
            {SECTIONS.map((s) => (
              <a key={s.key} href={`${base}${s.href}`} onClick={() => setOpen(false)}>
                {t.nav[s.key]}
              </a>
            ))}
            <a href={`${base}#contacto`} className="ar-btn ar-btn-primary" style={{ marginTop: 16 }} onClick={() => setOpen(false)}>
              {t.nav.cta}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
