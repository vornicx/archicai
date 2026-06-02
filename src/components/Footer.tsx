import { CONTACT_EMAIL, GITHUB_URL } from '../constants'

function Footer() {
  return (
    <footer className="container-page section-padding" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <div className="font-semibold tracking-[0.18em] uppercase text-[13px]">Archic</div>
          <div className="text-muted mt-2 text-[13px]">Midas agentic memory. 2026.</div>
        </div>
        <div className="flex flex-wrap gap-5">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[13px] no-underline" style={{ color: 'var(--muted)' }}>
            GitHub
          </a>
          <a href="#docs" className="text-[13px] no-underline" style={{ color: 'var(--muted)' }}>
            Docs
          </a>
          <a href={CONTACT_EMAIL} className="text-[13px] no-underline" style={{ color: 'var(--muted)' }}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
