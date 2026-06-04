import { CONTACT_EMAIL, GITHUB_URL } from '../constants'

function Footer() {
  return (
    <footer className="container-page section-padding" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="mx-auto flex max-w-[760px] flex-col items-center justify-center gap-6 text-center sm:flex-row sm:gap-10">
        <div className="sm:text-right">
          <div className="font-semibold tracking-[0.18em] uppercase text-[13px]">Archic</div>
          <div className="text-muted mt-2 text-[13px]">Midas agentic memory. 2026.</div>
        </div>
        <div className="flex flex-wrap justify-center gap-5 sm:text-left">
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
