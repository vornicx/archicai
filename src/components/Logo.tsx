type LogoProps = { className?: string; title?: string }

function Logo({ className, title = 'Archic' }: LogoProps) {
  return (
    <span className={`archic-logo ${className ?? ''}`} aria-label={title}>
      <span className="archic-mark-ring" aria-hidden="true" />
      <span className="archic-wordmark">Archic</span>
    </span>
  )
}

export default Logo
