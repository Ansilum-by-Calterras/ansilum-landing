import icon from '@/app/icon_bg.png'
import { clsx } from 'clsx'
import Image from 'next/image'

export function Logo({
  className,
  showIcon = true,
}: {
  className?: string
  showIcon?: boolean
  width?: number | string
  height?: number | string
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2.5 text-[1.7rem] font-semibold tracking-[-0.04em] text-ink',
        className,
      )}
    >
      {showIcon && (
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-lg"
          priority
        />
      )}
      <span>
        ansilum<span className="text-brand">.</span>
      </span>
    </span>
  )
}