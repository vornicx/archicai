type LogoProps = {
  className?: string
  title?: string
}

function Logo({ className, title = 'Archic' }: LogoProps) {
  return (
    <span className={`archic-logo ${className ?? ''}`} aria-label={title}>
      <span className="archic-mark-box" aria-hidden="true">
        <span className="archic-mark-inner" />
      </span>
      <span className="archic-wordmark">ARCHIC</span>
    </span>
  )
}

export default Logo
