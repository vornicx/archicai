import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../constants'

function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      if (!headerRef.current) return
      if (window.scrollY > 12) {
        headerRef.current.classList.add('header-scrolled')
      } else {
        headerRef.current.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {NAV_LINKS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={onClick}
          {...('external' in item && item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-sm text-ink-muted hover:text-ink transition-colors"
        >
          {item.label}
        </a>
      ))}
    </>
  )

  return (
    <header ref={headerRef} className="site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-page flex items-center justify-between px-6 h-16">
        <a href="#top" className="text-[15px] font-medium text-ink tracking-[-0.01em]">
          Archic
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-4 h-px bg-ink transition-all ${mobileOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-4 h-px bg-ink transition-all ${mobileOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      <div
        className={`md:hidden mx-4 rounded-2xl border border-line bg-surface transition-all overflow-hidden ${
          mobileOpen ? 'opacity-100 mb-4' : 'opacity-0 h-0 border-0 mb-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-4 p-5">
          <NavLinks onClick={() => setMobileOpen(false)} />
        </nav>
      </div>
    </header>
  )
}

export default Header
