import { clsx } from 'clsx'
export function Logo({
  className,
}: {
  className?: string
  width?: number | string
  height?: number | string
}) {
  return (
    <span
      className={clsx(
        'font-display text-[1.65rem] font-semibold tracking-[-0.065em] text-foreground',
        className,
      )}
    >
      ansilum<span className="text-primary">.</span>
    </span>
  )
}
export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        'font-display text-3xl font-semibold text-foreground',
        className,
      )}
      aria-label="Ansilum"
    >
      a.
    </span>
  )
}
