import type { Locale } from '@/i18n/config'
import Image from 'next/image'

const alt = {
  en: [
    'Ansilum sales summary with sample data: period, outlet selection, net sales, and number of transactions.',
    'Ansilum sales summary with sample data: costs, gross profit, and a sales chart.',
  ],
  id: [
    'Ringkasan penjualan Ansilum dengan data contoh: periode, pilihan outlet, penjualan bersih, dan jumlah transaksi.',
    'Ringkasan penjualan Ansilum dengan data contoh: biaya, laba kotor, dan grafik penjualan.',
  ],
}

/** Real captures of the cashier app's sales summary (see docs/CLAIMS.md for provenance). */
export function ProductScreens({ locale }: { locale: Locale }) {
  return (
    <div>
      <div className="flex items-start justify-center gap-4 sm:gap-6">
        {['/product/sales-report.png', '/product/sales-report-chart.png'].map((src, index) => (
          <div
            key={src}
            className={`w-[46%] max-w-[16rem] rounded-[1.4rem] border border-line bg-white p-1.5 shadow-[0_24px_48px_-28px_rgb(17_20_24/0.4)] ${index ? 'mt-12' : ''}`}
          >
            <Image
              src={src}
              width={440}
              height={860}
              alt={alt[locale][index]}
              className="h-auto w-full rounded-[1.05rem]"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}
