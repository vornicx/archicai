import { CONTACT_EMAIL, GITHUB_URL, DOCS_REPO } from '../constants'

function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] mt-0">
      <div className="container-page">
        <div className="blueprint-frame border-l-0 border-r-0">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[color:var(--line)]">
            <div className="md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[color:var(--line)]">
              <div className="flex items-center gap-3 mb-6">
                <span className="archic-mark-box"><span className="archic-mark-inner" /></span>
                <span className="archic-wordmark">ARCHIC</span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-soft)] leading-loose">
                Engineered for long-horizon agents.<br />
                Built with rigor, verifiable by design.
              </p>
            </div>

            <div className="md:col-span-4 p-8 md:p-12 border-b md:border-b-0 md:border-r border-[color:var(--line)]">
              <div className="tag-mono mb-6">[ NAVIGATE ]</div>
              <ul className="space-y-3 text-[12px]">
                <li><a href="https://midas.archic.es" target="_blank" rel="noopener noreferrer" className="text-[color:var(--ink)] hover:text-[color:var(--gold)] no-underline">→ midas.archic.es</a></li>
                <li><a href="https://apollo.archic.es" target="_blank" rel="noopener noreferrer" className="text-[color:var(--ink)] hover:text-[color:var(--gold)] no-underline">→ apollo.archic.es</a></li>
                <li><a href={`${DOCS_REPO}/blob/main/docs/README.md`} target="_blank" rel="noopener noreferrer" className="text-[color:var(--ink)] hover:text-[color:var(--gold)] no-underline">→ Documentation</a></li>
                <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[color:var(--ink)] hover:text-[color:var(--gold)] no-underline">→ GitHub</a></li>
                <li><a href={CONTACT_EMAIL} className="text-[color:var(--ink)] hover:text-[color:var(--gold)] no-underline">→ Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-3 p-8 md:p-12">
              <div className="tag-mono mb-6">[ META ]</div>
              <ul className="space-y-2 text-[11px] text-[color:var(--muted)]">
                <li>ID: ARCH_HUB_001</li>
                <li>COORDS: 40.41° N · 3.70° W</li>
                <li>UPLINK: STABLE</li>
                <li>LATENCY: 12ms</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-6 md:px-12">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted-deep)]">
              © 2026 Archic Systems · All rights reserved
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--gold)]">
              STABLE_RELEASE_V0.2.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
