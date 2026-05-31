function Footer() {
  return (
    <footer className="container-page section-padding" style={{ borderTop: '1px solid #161616' }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div style={{ fontSize: '13px', color: '#8A8A8A' }}>
          &copy; 2026 Archic. All rights reserved.
        </div>
        <div className="flex gap-8">
          <a href="https://github.com/vornicx/origin-lab" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '13px', color: '#8A8A8A', textDecoration: 'none' }}
            className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#docs"
            style={{ fontSize: '13px', color: '#8A8A8A', textDecoration: 'none' }}
            className="hover:text-white transition-colors">
            Documentation
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
