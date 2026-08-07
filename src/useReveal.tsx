import { useEffect, useRef } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('visible')
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/**
 * Aparición al entrar en pantalla, sin envolver nada en divs extra.
 *
 * Marcar el elemento con `data-reveal` basta: este efecto observa todos los que
 * haya en la página y les añade `data-reveal="in"` cuando asoman. Hacerlo por
 * atributo y no con un componente contenedor evita romper las retículas CSS,
 * donde un `<div>` intermedio destruiría el `grid-template-columns` del padre.
 *
 * Si el sistema pide movimiento reducido no se observa nada y el contenido
 * queda visible desde el principio: el CSS parte de la posición final y solo
 * anima cuando el usuario no ha pedido lo contrario.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="out"]'))
    if (targets.length === 0) return

    /* La clase en <html> es la que activa el estado inicial oculto en el CSS.
       Si este efecto no llega a ejecutarse, el contenido se ve igual: nunca
       queda una página en blanco por culpa de una animación. */
    const root = document.documentElement
    root.classList.add('js-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal', 'in')
          observer.unobserve(entry.target)
        }
      },
      /* Un poco antes de que el borde inferior lo alcance, para que el
         movimiento acompañe al scroll en lugar de ir por detrás. */
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      root.classList.remove('js-reveal')
    }
  }, [])
}
