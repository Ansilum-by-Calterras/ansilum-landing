'use client'
import icon from '@/app/icon_bg.png'
import type { HomeContent } from '@/content/home'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { trackEvent } from './analytics'

type Copy = HomeContent['preview']

/** How long each checkout step stays on screen. */
const STEP_MS = 2600

/**
 * Real captures of the cashier app and the owner dashboard with the sample business
 * (see docs/CLAIMS.md for provenance). The frame keeps one 16:10 shape for every view,
 * so switching never moves the page. The cashier view steps through one real sale.
 */
export function ProductTour({ copy }: { copy: Copy }) {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [motionOk, setMotionOk] = useState(false)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const frame = useRef<HTMLDivElement>(null)
  const view = copy.views[active]
  const steps = view.steps ?? []
  const playing = steps.length > 1 && onScreen && motionOk && !paused

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const update = () => setMotionOk(query.matches)
    update()
    query.addEventListener('change', update)
    let observer: IntersectionObserver | undefined
    if (frame.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => setOnScreen(entry.isIntersecting),
        { threshold: 0.35 },
      )
      observer.observe(frame.current)
    }
    return () => {
      query.removeEventListener('change', update)
      observer?.disconnect()
    }
  }, [])

  // Steps advance only while the cashier view is open, on screen, and motion is allowed.
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % steps.length),
      STEP_MS,
    )
    return () => window.clearInterval(timer)
  }, [playing, steps.length])

  function select(index: number, focus = false) {
    setActive(index)
    setStep(0)
    if (focus) tabs.current[index]?.focus()
    trackEvent('preview_view', { view: copy.views[index].id })
  }
  function onKeyDown(event: React.KeyboardEvent, index: number) {
    const last = copy.views.length - 1
    const keys: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    select(keys[event.key], true)
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={copy.label}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {copy.views.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tabs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`preview-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="preview-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className="ui-chip shrink-0 aria-selected:border-ink aria-selected:bg-ink aria-selected:text-white"
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div
        id="preview-panel"
        role="tabpanel"
        aria-labelledby={`preview-tab-${view.id}`}
        className="mt-6"
      >
        <figure className="ui-window overflow-hidden text-ink">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
            <Image
              src={icon}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-lg"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{copy.business}</p>
              <p
                key={view.id}
                className="motion-fade truncate text-xs text-soft"
              >
                {view.surface}
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-mist px-2 py-1 text-xs font-semibold text-soft">
              {copy.sample}
            </span>
          </div>
          <div ref={frame} className="relative aspect-[16/10] bg-mist">
            {copy.views.flatMap((item, index) =>
              (item.steps ?? [{ image: item.image, label: '' }]).map(
                (shot, shotIndex) => {
                  const shown =
                    index === active && (!item.steps || shotIndex === step)
                  return (
                    <Image
                      key={shot.image}
                      src={shot.image}
                      alt={
                        shown
                          ? `${item.alt}${shot.label ? ` ${shot.label}.` : ''}`
                          : ''
                      }
                      aria-hidden={!shown}
                      fill
                      sizes="(min-width: 1280px) 1216px, 100vw"
                      className={`object-cover object-top transition-opacity duration-[240ms] ${shown ? 'opacity-100' : 'opacity-0'}`}
                      unoptimized
                    />
                  )
                },
              ),
            )}
          </div>
        </figure>

        {/* Room for the longest description, so the page below never shifts. */}
        <div
          key={view.id}
          className="motion-fade mt-8 grid gap-4 lg:min-h-[10.5rem] lg:grid-cols-[1fr_1fr] lg:gap-x-20 lg:gap-y-6"
        >
          <h3 className="display-md text-balance">{view.title}</h3>
          <p className="text-[1.05rem] leading-8 text-soft">{view.body}</p>
          {steps.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 max-sm:flex-col max-sm:items-start lg:col-span-2">
              <ol
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
                aria-label={copy.steps}
              >
                {steps.map((shot, index) => (
                  <li key={shot.image} className="shrink-0">
                    <button
                      type="button"
                      aria-current={index === step ? 'step' : undefined}
                      onClick={() => {
                        setStep(index)
                        setPaused(true)
                      }}
                      className="ui-chip gap-1.5 !px-3 aria-[current=step]:border-ink aria-[current=step]:bg-ink aria-[current=step]:text-white"
                    >
                      <span className="tabular-nums opacity-60">
                        {index + 1}
                      </span>
                      {shot.label}
                    </button>
                  </li>
                ))}
              </ol>
              {motionOk && (
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  className="text-link px-1"
                >
                  {paused ? (
                    <PlayIcon className="size-4" aria-hidden="true" />
                  ) : (
                    <PauseIcon className="size-4" aria-hidden="true" />
                  )}
                  {paused ? copy.play : copy.pause}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
