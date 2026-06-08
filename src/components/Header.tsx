import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { GITHUB_URL } from '../constants'

const ARCHIC_NAV = [
  { label: 'Why', href: '#why' },
  { label: 'Products', href: '#products' },
  { label: 'Vision', href: '#vision' },
]

function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="container-page">
        <div className="glass-panel header-glass">
          <div className="glass-inner flex items-center justify-between px-4 py-2.5 md:px-5">
            <Link to="/" className="brand-link no-underline" style={{ color: 'var(--ink)' }}>
              <Logo />
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {ARCHIC_NAV.map((item) => (
                <a key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
              <span aria-hidden className="h-3 w-px bg-[color:var(--line-strong)]" />
              <a
                href="https://midas.archic.es"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Midas ↗
              </a>
              <a
                href="https://apollo.archic.es"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Apollo ↗
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-1.5 !px-3 !text-[11px]"
              >
                GitHub
              </a>
            </nav>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-[color:var(--ink)] hover:bg-[color:var(--line)]/40"
            >
              <span className="sr-only">Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          {open && (
            <div className="md:hidden border-t border-[color:var(--line)]">
              <nav className="glass-inner flex flex-col gap-1 px-4 py-3">
                {ARCHIC_NAV.map((item) => (
                  <a key={item.label} href={item.href} className="nav-link py-2" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <div className="my-2 h-px bg-[color:var(--line)]" />
                <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="nav-link py-2">
                  Midas ↗
                </a>
                <a href="https://apollo.archic.es" target="_blank" rel="noopener noreferrer" className="nav-link py-2">
                  Apollo ↗
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="nav-link py-2">
                  GitHub ↗
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
