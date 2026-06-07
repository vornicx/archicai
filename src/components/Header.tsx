import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

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
  const sectionLinks = onMidas ? MIDAS_NAV : ARCHIC_NAV

  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="container-page">
        <div className="glass-panel header-glass">
          <div className="glass-inner flex items-center justify-between px-4 py-2.5 md:px-5">
            <Link to="/" className="brand-link no-underline" style={{ color: 'var(--ink)' }}>
              <Logo />
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link to="/" className="nav-link" data-active={!onMidas}>
                Archic
              </Link>
              <Link to="/midas" className="nav-link" data-active={onMidas}>
                Midas
              </Link>
              <span aria-hidden className="h-3 w-px bg-[color:var(--line-strong)]" />
              {sectionLinks.map((item) => (
                <a key={item.label} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
