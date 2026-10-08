'use client'
import { Container } from '@/components/site/page-parts'
import { isLocale, localePath } from '@/i18n/config'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const copy = {
  en: {
    title: 'This page is not here.',
    body: 'The address may have changed. Start from the homepage or see how Ansilum works.',
    home: 'Go to the homepage',
    product: 'See the product',
  },
  id: {
    title: 'Halaman ini tidak ditemukan.',
    body: 'Alamatnya mungkin sudah berubah. Mulai dari beranda atau lihat cara kerja Ansilum.',
    home: 'Ke beranda',
    product: 'Lihat produk',
  },
}

export default function NotFound() {
  const params = useParams<{ locale: string }>()
  const locale = isLocale(params?.locale) ? params.locale : 'id'
  const text = copy[locale]
  return (
    <main id="main-content" tabIndex={-1}>
      <Container className="py-24 sm:py-32">
        <p className="font-bold tracking-[-0.03em] text-7xl text-brand" aria-hidden="true">404</p>
        <h1 className="display-lg mt-6 max-w-3xl">{text.title}</h1>
        <p className="lead mt-6 max-w-2xl">{text.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={localePath(locale)} className="btn-primary">{text.home}</Link>
          <Link href={localePath(locale, '/product')} className="btn-secondary">{text.product}</Link>
        </div>
      </Container>
    </main>
  )
}
