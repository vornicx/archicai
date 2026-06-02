import { NAV_LINKS } from '../constants'

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div className="container-page">
        <div className="glass-panel">
          <div className="glass-inner flex items-center justify-between px-5 py-3">
            <a
              href="#top"
              className="flex items-center gap-3 no-underline"
              style={{ color: 'var(--ink)' }}
            >
              <span
                className="grid h-8 w-8 place-items-center rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #fffaf0, #d7b866)',
                  border: '1px solid rgba(126, 93, 30, 0.18)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
                }}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--gold)' }} />
              </span>
              <span className="font-semibold tracking-[0.22em] uppercase text-[13px]">Archic</span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[13px] no-underline transition-colors"
                  style={{ color: 'var(--muted)' }}
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
