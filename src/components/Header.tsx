import { NAV_LINKS } from '../constants'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="container-page flex items-center justify-between" style={{ padding: '2.5rem 1.5rem', borderBottom: '1px solid #161616' }}>
        <a href="#top" style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', color: '#FFFFFF' }}>
          Archic
        </a>
        <nav className="flex items-center gap-12">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ color: '#8A8A8A', textDecoration: 'none', fontSize: '14px' }}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
