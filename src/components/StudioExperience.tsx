import { useEffect } from 'react'
import { captureAttribution, recordIntent } from '../analytics/leadAttribution'

export default function StudioExperience() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.as-site')
    if (!root) return

    captureAttribution()

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const measurementTargets = Array.from(root.querySelectorAll<HTMLElement>('[data-archic-view]'))

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

    const revealInRange = () => {
      const viewport = window.innerHeight || document.documentElement.clientHeight
      revealTargets.forEach((target) => {
        if (target.classList.contains('is-visible')) return
        const rect = target.getBoundingClientRect()
        if (rect.top <= viewport * 1.12 && rect.bottom >= -viewport * 0.12) {
          target.classList.add('is-visible')
          observer?.unobserve(target)
        }
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
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      )
      revealTargets.forEach((target) => observer?.observe(target))
      revealInRange()
    }

    let measurementObserver: IntersectionObserver | null = null
    if ('IntersectionObserver' in window && measurementTargets.length) {
      measurementObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const value = (entry.target as HTMLElement).dataset.archicView
            if (value) recordIntent(`view:${value}`)
            measurementObserver?.unobserve(entry.target)
          })
        },
        { threshold: 0.35 },
      )
      measurementTargets.forEach((target) => measurementObserver?.observe(target))
    }

    const onIntentClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const target = event.target.closest<HTMLElement>('[data-archic-intent]')
      const intent = target?.dataset.archicIntent
      if (intent) recordIntent(intent)
    }
    document.addEventListener('click', onIntentClick)

    let raf = 0
    const updateProgress = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      root.style.setProperty('--as-progress', progress.toFixed(4))
      revealInRange()
    }
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    // Last-resort guard: motion is optional; content visibility is not.
    const visibilityGuard = window.setTimeout(() => {
      revealTargets.forEach((target) => target.classList.add('is-visible'))
    }, 4200)

    return () => {
      observer?.disconnect()
      measurementObserver?.disconnect()
      window.clearTimeout(visibilityGuard)
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('click', onIntentClick)
      revealTargets.forEach((target) => target.style.removeProperty('--as-reveal-delay'))
      root.classList.remove('as-experience-ready')
    }
  }, [])

  return <div className="as-scroll-progress" aria-hidden="true"><i /></div>
}
