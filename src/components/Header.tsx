import { NAV_LINKS } from '../constants'
import Logo from './Logo'

function Header() {
  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="container-page">
        <div className="glass-panel header-glass">
          <div className="glass-inner flex items-center justify-between px-4 py-2.5 md:px-5">
            <a
              href="#top"
              className="brand-link no-underline"
              style={{ color: 'var(--ink)' }}
            >
              <Logo />
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link"
                >
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
