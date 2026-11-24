import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const COPY = {
  es: {
    menu: 'Menú', close: 'Cerrar', project: 'Empezar proyecto',
    nav: [
      ['Archic Studio', 'studio'],
      ['Archic Lab', 'lab'],
      ['Trabajo', '#selected-work'],
      ['Recursos', 'guides'],
      ['Contacto', 'contact'],
    ],
    pages: [
      ['Archic Studio', 'Webs y software a medida', 'studio'],
      ['Archic Lab', 'Productos digitales propios', 'lab'],
      ['Trabajo', 'Trabajo publicado', '#selected-work'],
      ['Servicios', 'Presence · Control · Business', '#system'],
      ['Proceso', 'Cómo dirigimos y construimos', '#method'],
      ['Recursos', 'Guías y criterio digital', 'guides'],
      ['Contacto', 'Cuéntanos qué quieres construir', 'contact'],
    ],
  },
  en: {
    menu: 'Menu', close: 'Close', project: 'Start a project',
    nav: [
      ['Archic Studio', 'studio'],
      ['Archic Lab', 'lab'],
      ['Work', '#selected-work'],
      ['Resources', 'guides'],
      ['Contact', 'contact'],
    ],
    pages: [
      ['Archic Studio', 'Websites and custom software', 'studio'],
      ['Archic Lab', 'Independent digital products', 'lab'],
      ['Work', 'Published work', '#selected-work'],
      ['Services', 'Presence · Control · Business', '#system'],
      ['Process', 'How we direct and build', '#method'],
      ['Resources', 'Guides and digital thinking', 'guides'],
      ['Contact', 'Tell us what you want to build', 'contact'],
    ],
  },
}

function path(lang: 'es' | 'en', slug = '') {
  const root = lang === 'en' ? '/en/' : '/'
  if (!slug) return root
  if (slug === 'guides') return '/guias/'
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

    // Modal: make everything outside the header + menu panel inert so focus and the
    // accessibility tree cannot reach background content while the menu is open.
    const keep = [menuPanelRef.current, menuButtonRef.current?.closest('header')].filter(Boolean) as HTMLElement[]
    const inerted: HTMLElement[] = []
    let node: HTMLElement | null = menuPanelRef.current
    while (node && node.parentElement && node !== document.body) {
      for (const sibling of Array.from(node.parentElement.children) as HTMLElement[]) {
        if (sibling === node || keep.some((k) => sibling === k || sibling.contains(k)) || sibling.hasAttribute('inert')) continue
        if (sibling.tagName === 'SCRIPT' || sibling.tagName === 'STYLE') continue
        sibling.setAttribute('inert', '')
        inerted.push(sibling)
      }
      node = node.parentElement
    }
    // Inside the header, only the menu button stays reachable.
    const header = menuButtonRef.current?.closest('header')
    header?.querySelectorAll<HTMLElement>(':scope > a, :scope > nav, .as-lang, .as-project-link').forEach((el) => { el.setAttribute('inert', ''); inerted.push(el) })

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
      inerted.forEach((el) => el.removeAttribute('inert'))
      window.cancelAnimationFrame(focusFirstRoute)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className="as-header" data-solid={solid || open}>
        <a href={path(lang)} className="as-brand" aria-label={lang === 'es' ? 'Archic · inicio' : 'Archic · home'}>
          <img className="as-brand-light" src="/brand/archic-lockup-light.svg" alt="" width={1744} height={280} />
          <img className="as-brand-dark" src="/brand/archic-lockup-dark.svg" alt="" width={1744} height={280} />
        </a>

        <nav className="as-desktop-nav" aria-label={t.a11y.mainNav}>
          {c.nav.map(([name, slug]) => (
            <a key={slug} href={path(lang, slug)} data-archic-intent={`desktop-nav:${slug.replace('#', '')}`}>{name}</a>
          ))}
        </nav>

        <div className="as-header-actions">
          {canSwitchLang && (
            <div className="as-lang" role="group" aria-label={t.footer.langLabel}>
              <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
              <span>/</span>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            </div>
          )}
          <a className="as-project-link" href={path(lang, 'contact')} data-archic-intent="nav:audit">{c.project}<i className="as-arrow" aria-hidden="true" /></a>
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
        {...(open ? { role: 'dialog', 'aria-modal': true, 'aria-label': c.menu } : { 'aria-hidden': true, inert: '' })}
      >
        <div className="as-menu-inner">
          <div className="as-menu-meta">
            <div className="as-menu-identity">
              <span>{lang === 'es' ? 'ARCHIC / SISTEMAS DIGITALES' : 'ARCHIC / DIGITAL SYSTEMS'}</span>
              <small>{lang === 'es' ? 'Archic Studio · Archic Lab' : 'Archic Studio · Archic Lab'}</small>
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
