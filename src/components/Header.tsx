import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { GITHUB_URL } from '../constants'

const NAV = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Stack', href: '#products' },
  { label: 'Vision', href: '#vision' },
]

function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="site-header">
      <div className="container-page">
        <div className="blueprint-frame border-l-0 border-r-0">
          <div className="header-row px-4 md:px-6">
            <Link to="/" className="no-underline">
              <Logo />
            </Link>

            <nav className="hidden md:flex items-center gap-9">
              {NAV.map((item) => (
                <a key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
              <span aria-hidden className="h-3 w-px bg-[color:var(--line-strong)]" />
              <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="nav-link">
                Midas ↗
              </a>
              <a href="https://apollo.archic.es" target="_blank" rel="noopener noreferrer" className="nav-link">
                Apollo ↗
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--gold)' }}>
                [ GitHub ]
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-4 nav-link" style={{ fontSize: '10px', color: 'var(--muted-deep)' }}>
              <span>SYS: 200</span>
              <span>·</span>
              <span>V.0.2.0</span>
            </div>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center text-[color:var(--ink)] border border-[color:var(--line-strong)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <nav className="flex flex-col px-4 py-3 gap-1">
                {NAV.map((item) => (
                  <a key={item.label} href={item.href} className="nav-link py-3" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <div className="my-2 h-px bg-[color:var(--line)]" />
                <a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="nav-link py-3">
                  Midas ↗
                </a>
                <a href="https://apollo.archic.es" target="_blank" rel="noopener noreferrer" className="nav-link py-3">
                  Apollo ↗
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="nav-link py-3" style={{ color: 'var(--gold)' }}>
                  [ GitHub ]
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
