import Image from 'next/image'
export function ProductImage({
  chart = false,
  priority = false,
}: {
  chart?: boolean
  priority?: boolean
}) {
  return (
    <figure className="mx-auto w-full max-w-[340px]">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#d3c1ad] bg-[#fcf9f7] p-2 shadow-[0_24px_70px_-30px_#69452e66]">
        <Image
          src={
            chart
              ? '/product/sales-report-chart.png'
              : '/product/sales-report.png'
          }
          width={440}
          height={860}
          alt={
            chart
              ? 'Pratinjau laporan Ansilum dengan data contoh: biaya, laba kotor, dan grafik penjualan.'
              : 'Pratinjau laporan Ansilum dengan data contoh: periode, pilihan outlet, penjualan bersih, dan jumlah transaksi.'
          }
          className="h-auto w-full rounded-[1.3rem]"
          priority={priority}
          unoptimized
        />
      </div>
      <figcaption className="mt-4 text-center text-xs leading-5 text-muted-foreground">
        Antarmuka aplikasi · Data contoh
        <br />
        Pratinjau pengembangan, bukan data pelanggan
      </figcaption>
    </figure>
  )
}
