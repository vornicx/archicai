import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from '../config/contact'

const COPY = {
  es: {
    menu: 'Menú', close: 'Cerrar', project: 'Proyecto', call: 'Llamar',
    pages: [
      ['Presence', 'Presencia digital', 'presence'],
      ['Control', 'Operación privada', 'control'],
      ['Business', 'Software a medida', 'business'],
      ['Studio', 'Cómo trabajamos', 'studio'],
      ['Contacto', 'Hablar de un proyecto', 'contact'],
    ],
  },
  en: {
    menu: 'Menu', close: 'Close', project: 'Project', call: 'Call',
    pages: [
      ['Presence', 'Digital presence', 'presence'],
      ['Control', 'Private operations', 'control'],
      ['Business', 'Custom software', 'business'],
      ['Studio', 'How we work', 'studio'],
      ['Contact', 'Talk about a project', 'contact'],
    ],
  },
}

function path(lang: 'es' | 'en', slug = '') {
  if (!slug) return lang === 'en' ? '/en/' : '/'
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

export default function StudioHeader() {
  const { lang, setLang, t } = useLang()
  const c = COPY[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="as-header" data-solid={solid || open}>
        <a href={path(lang)} className="as-brand" aria-label="Archic home">
          <img src="/brand/archic-lockup-light.svg" alt="Archic" width={981} height={174} />
        </a>

        <div className="as-header-actions">
          <div className="as-lang" role="group" aria-label={t.footer.langLabel}>
            <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
            <span>/</span>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="as-phone-link" href={`tel:${CONTACT_PHONE}`} aria-label={`${c.call} ${CONTACT_PHONE_DISPLAY}`}>
            <span>{c.call}</span>
            <strong>{CONTACT_PHONE_DISPLAY}</strong>
          </a>
          <a className="as-project-link" href={path(lang, 'contact')}>{c.project}<span>↗</span></a>
          <button
            type="button"
            className="as-menu-button"
            aria-label={open ? c.close : c.menu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? c.close : c.menu}</span>
            <i><b /><b /></i>
          </button>
        </div>
      </header>

      <div className="as-menu-panel" data-open={open} aria-hidden={!open}>
        <div className="as-menu-inner">
          <div className="as-menu-meta">
            <span>ARCHIC / DIGITAL SYSTEMS</span>
            <a className="as-menu-phone" href={`tel:${CONTACT_PHONE}`}>
              <small>{c.call}</small>
              <strong>{CONTACT_PHONE_DISPLAY}</strong>
            </a>
          </div>
          <nav aria-label={t.a11y.mainNav}>
            {c.pages.map(([name, desc, slug], index) => (
              <a href={path(lang, slug)} key={slug} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                <strong>{name}</strong>
                <small>{desc}</small>
                <i>↗</i>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
