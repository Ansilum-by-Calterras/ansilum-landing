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
        ' text-[1.7rem] font-semibold tracking-[-0.04em] text-ink',
        className,
      )}
    >
      ansilum<span className="text-brand">.</span>
    </span>
  )
}
export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        ' text-3xl font-semibold text-foreground',
        className,
      )}
      aria-label="Ansilum"
    >
      a.
    </span>
  )
}
