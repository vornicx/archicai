import { useEffect } from 'react'

/**
 * Coreografía de entrada de toda la web.
 *
 * En lugar de envolver cada bloque en un componente, se marcan los elementos
 * desde aquí con `data-reveal` y un IntersectionObserver los va activando al
 * entrar en pantalla. Así el movimiento llega igual a la home, a las landings
 * de servicio y a las páginas legales sin tocar su JSX.
 *
 * Dos garantías:
 *  - La clase `ar-motion` se pone en <html> desde el guion. El estado inicial
 *    (opacidad 0) cuelga de ella, así que sin JavaScript la página se ve
 *    entera: el contenido nunca depende de una animación para existir.
 *  - Con `prefers-reduced-motion` no se observa nada y no se oculta nada.
 */

/* Qué se anima, en orden de aparición dentro de cada sección. Los hijos de un
   mismo grupo entran escalonados para que la lectura acompañe al movimiento. */
const TARGETS = [
  '.ar-sec-head',
  '.ar-service',
  '.ar-tile',
  '.ar-project',
  '.ar-lab',
  '.ar-proof-item',
  '.ar-steps li',
  '.ar-chips',
  '.ar-hero-sub',
  '.ar-hero-ctas',
  '.ar-hero-note',
  '.ar-spec',
  '.ar-hero-plate',
  '.ar-contact-grid > *',
  '.ar-faq-item',
  '.ar-legal-toc',
  '.ar-legal-section',
].join(',')

/** Escalonado entre hermanos, en ms. Corto: acompaña, no hace esperar. */
const STAGGER = 70
const MAX_STAGGER = 5

export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const root = document.documentElement
    root.classList.add('ar-motion')

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(TARGETS))

    // El escalonado se calcula por padre: cada grupo de hermanos arranca de cero.
    const seen = new Map<Element, number>()
    for (const node of nodes) {
      node.setAttribute('data-reveal', '')
      const parent = node.parentElement
      if (!parent) continue
      const index = seen.get(parent) ?? 0
      seen.set(parent, index + 1)
      if (index > 0) {
        node.style.setProperty('--reveal-delay', `${Math.min(index, MAX_STAGGER) * STAGGER}ms`)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      },
      // Se dispara un poco antes de que el bloque toque el borde inferior, de
      // modo que llega ya empezado y no "salta" a la vista.
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    )

    for (const node of nodes) observer.observe(node)

    // El titular del hero entra por líneas nada más cargar, sin esperar scroll.
    const title = document.querySelector('.ar-hero-title')
    const raf = requestAnimationFrame(() => title?.classList.add('is-in'))

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
      root.classList.remove('ar-motion')
      for (const node of nodes) {
        node.removeAttribute('data-reveal')
        node.style.removeProperty('--reveal-delay')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
