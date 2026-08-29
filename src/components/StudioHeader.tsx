import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  es: {
    menu: 'Menú', close: 'Cerrar', project: 'Diagnóstico',
    pages: [
      ['Trabajo', 'Concept builds seleccionados', '#selected-work'],
      ['Sistema', 'Presence · Control · Business', '#system'],
      ['Método', 'Cómo construimos y validamos', '#method'],
      ['Inversión', 'Puntos de entrada', '#investment'],
      ['Contacto', 'Cuéntanos qué debe cambiar', '#contact'],
    ],
  },
  en: {
    menu: 'Menu', close: 'Close', project: 'Diagnosis',
    pages: [
      ['Work', 'Selected concept builds', '#selected-work'],
      ['System', 'Presence · Control · Business', '#system'],
      ['Method', 'How we build and validate', '#method'],
      ['Investment', 'Entry points', '#investment'],
      ['Contact', 'Tell us what must change', '#contact'],
    ],
  },
}

function path(lang: 'es' | 'en', slug = '') {
  const root = lang === 'en' ? '/en/' : '/'
  if (!slug) return root
  if (slug.startsWith('#')) return `${root}${slug}`
  return lang === 'en' ? `/en/${slug}/` : `/${slug}/`
}

export default function StudioHeader() {
  const { lang, setLang, canSwitchLang, t } = useLang()
  const c = COPY[lang]
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return () => { document.body.style.overflow = '' }

    const focusFirstRoute = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLAnchorElement>('nav a')?.focus()
    })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }

      if (event.key !== 'Tab') return
      const panel = menuPanelRef.current
      const button = menuButtonRef.current
      if (!panel || !button) return

      const panelLinks = Array.from(panel.querySelectorAll<HTMLAnchorElement>('a[href]'))
      const focusable: HTMLElement[] = [button, ...panelLinks]
      if (focusable.length < 2) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.cancelAnimationFrame(focusFirstRoute)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="as-header" data-solid={solid || open}>
        <a href={path(lang)} className="as-brand" aria-label={lang === 'es' ? 'Archic · inicio' : 'Archic · home'}>
          <img className="as-brand-light" src="/brand/archic-lockup-light.svg" alt="" width={981} height={174} />
          <img className="as-brand-dark" src="/brand/archic-lockup-dark.svg" alt="" width={981} height={174} />
        </a>

        <div className="as-header-actions">
          {canSwitchLang && (
            <div className="as-lang" role="group" aria-label={t.footer.langLabel}>
              <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
              <span>/</span>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            </div>
          )}
          <a className="as-project-link" href={path(lang, '#audit')} data-archic-intent="nav:audit">{c.project}<i className="as-arrow" aria-hidden="true" /></a>
          <button
            ref={menuButtonRef}
            type="button"
            className="as-menu-button"
            aria-label={open ? c.close : c.menu}
            aria-expanded={open}
            aria-controls="archic-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? c.close : c.menu}</span>
            <i><b /><b /></i>
          </button>
        </div>
      </header>

      <div
        ref={menuPanelRef}
        id="archic-menu"
        className="as-menu-panel"
        data-open={open}
        aria-hidden={!open}
        role="dialog"
        aria-modal={open}
        aria-label={c.menu}
      >
        <div className="as-menu-inner">
          <div className="as-menu-meta">
            <div className="as-menu-identity">
              <span>{lang === 'es' ? 'ARCHIC / SISTEMAS DIGITALES' : 'ARCHIC / DIGITAL SYSTEMS'}</span>
              <small>{lang === 'es' ? 'Presencia · Operación · Software' : 'Presence · Operations · Software'}</small>
            </div>
          </div>
          <nav aria-label={t.a11y.mainNav}>
            {c.pages.map(([name, desc, slug], index) => (
              <a
                href={path(lang, slug)}
                key={slug}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                data-archic-intent={`menu:${slug.replace('#', '')}`}
              >
                <span>0{index + 1}</span>
                <strong>{name}</strong>
                <small>{desc}</small>
                <i className="as-arrow" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
