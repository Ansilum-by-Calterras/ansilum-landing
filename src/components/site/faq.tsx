import { PlusIcon } from '@heroicons/react/24/outline'

/** Native disclosure: works without script, by keyboard and touch. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line transition group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
              <PlusIcon className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[1.05rem] leading-8 text-soft">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
