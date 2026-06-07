import { CONTACT_EMAIL, GITHUB_URL } from '../constants'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] py-20">
      <div className="container-page flex flex-col items-center gap-10 text-center">
        <Logo />
        <div className="flex flex-wrap justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted-soft)]">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[color:var(--gold-bright)]">
            GitHub
          </a>
          <a href="#docs" className="transition-colors hover:text-[color:var(--gold-bright)]">
            Documentation
          </a>
          <a href={CONTACT_EMAIL} className="transition-colors hover:text-[color:var(--gold-bright)]">
            Contact
          </a>
        </div>
        <p className="font-mono text-[10px] text-[color:var(--muted-soft)]">
          © 2026 Archic Systems. Midas agentic memory alpha.
        </p>
      </div>
    </footer>
  )
}

export default Footer
