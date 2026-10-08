import { Container, FinalCta, LocalLink, PageHeader } from '@/components/site/page-parts'
import { formatUpdateDate, updates, type UpdateStatus } from '@/content/updates'
import { isLocale, type Locale } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'

const content = {
  en: {
    meta: {
      title: 'Updates: what we have built',
      description:
        'Dated Ansilum milestones, from the March 2024 start to today and what we are building next.',
    },
    title: 'What we have built, and what comes next.',
    lead: 'Every milestone since Ansilum started in March 2024, each with a date and a link to see it for yourself.',
    status: { origin: 'Origin', released: 'Released', 'in-development': 'Being built' } as Record<UpdateStatus, string>,
    undated: 'Next',
    customersHeading: 'Customers',
    customers:
      'Toko Kopi Kartika and The Art Barber, owned by Ibu Noer Qomariah, and Giafoodies, owned by Anggita Natalia, use the Ansilum cashier app.',
  },
  id: {
    meta: {
      title: 'Kabar terbaru: yang sudah kami bangun',
      description:
        'Perjalanan Ansilum sejak Maret 2024 hingga hari ini, dan apa yang sedang kami bangun berikutnya.',
    },
    title: 'Yang sudah kami bangun, dan langkah berikutnya.',
    lead: 'Setiap langkah sejak Ansilum dimulai pada Maret 2024, lengkap dengan tanggal dan tautan untuk melihatnya sendiri.',
    status: { origin: 'Awal', released: 'Dirilis', 'in-development': 'Sedang dibangun' } as Record<UpdateStatus, string>,
    undated: 'Berikutnya',
    customersHeading: 'Pelanggan',
    customers:
      'Toko Kopi Kartika dan The Art Barber milik Ibu Noer Qomariah, serta Giafoodies milik Anggita Natalia, menggunakan aplikasi kasir Ansilum.',
  },
}

type Props = { params: { locale: string } }

export function generateMetadata({ params }: Props) {
  if (!isLocale(params.locale)) return {}
  return pageMetadata({ locale: params.locale, path: '/updates', ...content[params.locale].meta })
}

export default function UpdatesPage({ params }: Props) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const copy = content[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHeader title={copy.title}>
        <p>{copy.lead}</p>
      </PageHeader>
      <section>
        <Container className="grid gap-14 py-20 sm:py-24 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <ol className="relative border-l-2 border-line">
            {updates.map((entry) => {
              const developing = entry.status === 'in-development'
              return (
                <li key={entry.title.en} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
                  <span
                    className={clsx(
                      'absolute -left-[0.5rem] top-1 size-3.5 rounded-full border-2 border-brand',
                      developing ? 'bg-canvas' : 'bg-brand',
                    )}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    {entry.date ? (
                      <time dateTime={entry.date} className="font-semibold">
                        {formatUpdateDate(entry.date, locale)}
                      </time>
                    ) : (
                      <span className="font-semibold text-soft">{copy.undated}</span>
                    )}
                    <span
                      className={clsx(
                        'rounded-md px-2 py-0.5 text-xs font-semibold',
                        entry.status === 'released' && 'bg-leaf-soft text-leaf',
                        developing && 'bg-brand-soft text-brand-ink',
                        entry.status === 'origin' && 'bg-mist text-steel',
                      )}
                    >
                      {copy.status[entry.status]}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold leading-snug tracking-[-0.03em] sm:text-3xl">{entry.title[locale]}</h2>
                  <p className="mt-3 max-w-2xl text-lg leading-8 text-soft">{entry.body[locale]}</p>
                  {entry.evidence &&
                    (entry.evidence.href ? (
                      <div className="mt-2">
                        <LocalLink locale={locale} href={entry.evidence.href}>
                          {entry.evidence.label[locale]}
                        </LocalLink>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-soft">{entry.evidence.label[locale]}</p>
                    ))}
                </li>
              )
            })}
          </ol>
          <aside className="h-fit rounded-2xl border border-line bg-mist p-7 sm:p-9 lg:sticky lg:top-28">
            <h2 className="font-bold tracking-[-0.03em] text-2xl">{copy.customersHeading}</h2>
            <p className="mt-4 leading-7 text-soft">{copy.customers}</p>
          </aside>
        </Container>
      </section>
      <FinalCta locale={locale} placement="updates-final" />
    </main>
  )
}
