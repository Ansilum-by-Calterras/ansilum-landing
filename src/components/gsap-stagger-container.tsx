'use client'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type TagName = 'div' | 'ul' | 'ol' | 'section' | 'article'

interface GSAPStaggerContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  duration?: number
  from?: 'bottom' | 'left' | 'right'
  distance?: number
  as?: TagName
  triggerStart?: string
}

export function GSAPStaggerContainer({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  duration = 0.7,
  from = 'bottom',
  distance = 40,
  as: Tag = 'div',
  triggerStart = 'top 88%',
  ...rest
}: GSAPStaggerContainerProps) {
  const ref = useRef<HTMLElement & HTMLDivElement & HTMLUListElement & HTMLOListElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.children.length === 0) return

    const directionVars: Record<string, { x?: number; y?: number }> = {
      bottom: { y: distance },
      left: { x: -distance },
      right: { x: distance },
    }

    const ctx = gsap.context(() => {
      gsap.from(Array.from(el.children), {
        opacity: 0,
        ...directionVars[from],
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [stagger, delay, duration, from, distance, triggerStart])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
