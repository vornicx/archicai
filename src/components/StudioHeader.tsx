import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { STUDIO } from '../content/studio'

/**
 * Cabecera transparente sobre el hero y sólida en cuanto se baja. El estado
 * vive en atributos del DOM para no duplicar clases.
 */
export default function StudioHeader() {
  const { lang, setLang, t } = useLang()
  const s = STUDIO[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#work', label: s.nav.work },
    { href: '#systems', label: s.nav.systems },
    { href: '#sectors', label: s.nav.sectors },
    { href: '#about', label: s.nav.about },
  ]

  return (
    <header className="sx-header" data-solid={solid || open}>
      <a className="sx-brand" href={lang === 'en' ? '/en/' : '/'}>
        <img src="/brand/archic-mark-light.svg" alt="" width={26} height={26} />
        <span>ARCHIC</span>
      </a>

      <nav className="sx-nav" aria-label={t.a11y.mainNav}>
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="sx-header-actions">
        <div className="sx-lang" role="group" aria-label={t.footer.langLabel}>
          <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>
            ES
          </button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
        <a className="sx-header-cta" href="#contact">
          {s.nav.cta}
          <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          className="sx-burger"
          aria-expanded={open}
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
            <path
              d={open ? 'M2 1 L18 11 M18 1 L2 11' : 'M0 1.5 H20 M0 10.5 H20'}
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="sx-mobile-nav" aria-label={t.a11y.mainNav}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            {s.nav.cta}
          </a>
        </nav>
      )}
    </header>
  )
}
