import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { COMPARISON_INDEX } from '../data/comparisons'

const MIDAS_NAV = [
  { label: 'Benchmarks', href: '#benchmarks' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'SDK', href: '#docs' },
]

const ARCHIC_NAV = [
  { label: 'Why', href: '#why' },
  { label: 'Vision', href: '#vision' },
]

function Header() {
  const { pathname } = useLocation()
  const onMidas = pathname.startsWith('/midas')
  const onDocs = pathname.startsWith('/docs')
  const sectionLinks = onMidas ? MIDAS_NAV : onDocs ? [] : ARCHIC_NAV
  const [open, setOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)

  // Close menus on route change
  useEffect(() => {
    setOpen(false)
    setCompareOpen(false)
  }, [pathname])

  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="container-page">
        <div className="glass-panel header-glass">
          <div className="glass-inner flex items-center justify-between px-4 py-2.5 md:px-5">
            <Link to="/" className="brand-link no-underline" style={{ color: 'var(--ink)' }}>
              <Logo />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 md:flex">
              <Link to="/" className="nav-link" data-active={pathname === '/'}>
                Archic
              </Link>
              <Link to="/midas" className="nav-link" data-active={onMidas}>
                Midas
              </Link>
              <a
                href="https://apollo.archic.es"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Apollo
              </a>

              {/* Compare dropdown — always visible */}
              <div
                className="relative"
                onMouseEnter={() => setCompareOpen(true)}
                onMouseLeave={() => setCompareOpen(false)}
              >
                <Link
                  to="/docs/comparisons"
                  className="nav-link inline-flex items-center gap-1"
                  data-active={onDocs}
                  onClick={() => setCompareOpen(false)}
                >
                  Compare
                  <span aria-hidden className="text-[9px] opacity-70">▾</span>
                </Link>
                {compareOpen && (
                  <div className="absolute right-0 top-full pt-2">
                    <div
                      className="glass-panel min-w-[220px] overflow-hidden rounded-lg"
                      style={{ boxShadow: '0 10px 30px -10px rgba(0,0,0,0.35)' }}
                    >
                      <div className="glass-inner py-2">
                        <Link
                          to="/docs/comparisons"
                          className="block px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted-soft)] hover:text-[color:var(--gold-bright)]"
                        >
                          All comparisons
                        </Link>
                        <div className="my-1 h-px bg-[color:var(--line)]" />
                        {COMPARISON_INDEX.map((c) => (
                          <Link
                            key={c.slug}
                            to={`/docs/comparisons/${c.slug}`}
                            className="block px-4 py-2 text-[13px] text-[color:var(--ink)] hover:bg-[color:var(--line)]/40 hover:text-[color:var(--gold-bright)]"
                          >
                            vs {c.rival}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {sectionLinks.length > 0 && (
                <>
                  <span aria-hidden className="h-3 w-px bg-[color:var(--line-strong)]" />
                  {sectionLinks.map((item) => (
                    <a key={item.label} href={item.href} className="nav-link">
                      {item.label}
                    </a>
                  ))}
                </>
              )}
            </nav>

            {/* Mobile toggle */}
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

          {/* Mobile drawer */}
          {open && (
            <div className="md:hidden border-t border-[color:var(--line)]">
              <nav className="glass-inner flex flex-col gap-1 px-4 py-3">
                <Link to="/" className="nav-link py-2" data-active={pathname === '/'}>
                  Archic
                </Link>
                <Link to="/midas" className="nav-link py-2" data-active={onMidas}>
                  Midas
                </Link>
                <a
                  href="https://apollo.archic.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link py-2"
                >
                  Apollo
                </a>
                <Link to="/docs/comparisons" className="nav-link py-2" data-active={onDocs}>
                  Compare
                </Link>
                <div className="pl-3 flex flex-col gap-1">
                  {COMPARISON_INDEX.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/docs/comparisons/${c.slug}`}
                      className="text-[13px] py-1.5 text-[color:var(--muted)] hover:text-[color:var(--gold-bright)]"
                    >
                      vs {c.rival}
                    </Link>
                  ))}
                </div>
                {sectionLinks.length > 0 && (
                  <>
                    <div className="my-2 h-px bg-[color:var(--line)]" />
                    {sectionLinks.map((item) => (
                      <a key={item.label} href={item.href} className="nav-link py-2" onClick={() => setOpen(false)}>
                        {item.label}
                      </a>
                    ))}
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
