type LogoProps = {
  className?: string
  title?: string
}

function Logo({ className, title = 'Archic' }: LogoProps) {
  return (
    <span
      className={`archic-logo inline-flex items-center ${className ?? ''}`}
      aria-label={title}
    >
      <span className="midas-wordmark font-semibold uppercase leading-none tracking-[0.24em] text-[15px]">
        Archic
      </span>
    </span>
  )
}

export default Logo
