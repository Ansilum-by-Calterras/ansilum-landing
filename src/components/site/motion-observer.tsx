'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * One observer for the whole site, so server components only need data attributes:
 * - `data-reveal`: gains `is-in` the first time it scrolls into view (then stays).
 * - `data-anim`: gains `is-playing` while on screen, so looping SVG animations pause off screen.
 */
export function MotionObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const reveal = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    const anim = Array.from(document.querySelectorAll<HTMLElement>('[data-anim]'))
    if (!('IntersectionObserver' in window)) {
      reveal.forEach((element) => element.classList.add('is-in'))
      anim.forEach((element) => element.classList.add('is-playing'))
      return
    }
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          revealObserver.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    const animObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-playing', entry.isIntersecting)
    })
    reveal.forEach((element) => revealObserver.observe(element))
    anim.forEach((element) => animObserver.observe(element))
    return () => {
      revealObserver.disconnect()
      animObserver.disconnect()
    }
  }, [pathname])
  return null
}
