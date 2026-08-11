import { useEffect } from 'react'

export default function StudioExperience() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.as-site')
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    root.classList.add('as-experience-ready')

    if (!reduceMotion) {
      const parentOrder = new Map<HTMLElement, number>()
      revealTargets.forEach((target) => {
        if (target.dataset.reveal === 'hero') {
          target.style.setProperty('--as-reveal-delay', '0ms')
          return
        }

        const parent = target.parentElement
        if (!parent) return
        const order = parentOrder.get(parent) ?? 0
        parentOrder.set(parent, order + 1)
        target.style.setProperty('--as-reveal-delay', `${Math.min(order, 3) * 55}ms`)
      })
    }

    let observer: IntersectionObserver | null = null
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
      )
      revealTargets.forEach((target) => observer?.observe(target))
    }

    let raf = 0
    const updateProgress = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      root.style.setProperty('--as-progress', progress.toFixed(4))
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      observer?.disconnect()
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      revealTargets.forEach((target) => target.style.removeProperty('--as-reveal-delay'))
      root.classList.remove('as-experience-ready')
    }
  }, [])

  return <div className="as-scroll-progress" aria-hidden="true"><i /></div>
}
