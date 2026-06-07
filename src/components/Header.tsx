import { NAV_LINKS } from '../constants'
import Logo from './Logo'

function Header() {
  return (
    <header className="site-header">
      <div className="container-page flex items-center justify-between py-4">
        <a href="#top" className="no-underline">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
