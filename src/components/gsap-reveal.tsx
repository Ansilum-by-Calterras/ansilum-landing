'use client'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface GSAPRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  from?: 'bottom' | 'left' | 'right' | 'top'
  duration?: number
  distance?: number
  triggerStart?: string
  scale?: number
}

export function GSAPReveal({
  children,
  className,
  delay = 0,
  from = 'bottom',
  duration = 0.9,
  distance = 50,
  triggerStart = 'top 88%',
  scale,
}: GSAPRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const directionVars: Record<string, { x?: number; y?: number }> = {
      bottom: { y: distance },
      top: { y: -distance },
      left: { x: -distance },
      right: { x: distance },
    }

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      ...directionVars[from],
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    }

    if (scale !== undefined) {
      fromVars.scale = scale
    }

    const ctx = gsap.context(() => {
      gsap.from(el, fromVars)
    })

    return () => ctx.revert()
  }, [delay, from, duration, distance, triggerStart, scale])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
