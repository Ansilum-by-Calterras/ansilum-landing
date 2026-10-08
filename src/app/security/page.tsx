import { LegalPage } from '@/components/marketing/legal-page'
import { pageMetadata } from '@/lib/metadata'
import Link from 'next/link'
export const metadata = pageMetadata(
  'Data & Keamanan',
  'Kenali cakupan data, akses pengguna, batas offline, dan rencana kontrol Intelligence dalam pengembangan Ansilum.',
  '/security',
)
export default function SecurityPage() {
  return (
    <LegalPage
      title="Data, akses, dan batas yang jelas."
      intro="Gambaran pendekatan produk Ansilum. Cakupan penerapan perlu dikonfirmasi pada versi Beta yang akan digunakan."
    >
      <h2>Akses bisnis dan pengguna</h2>
      <p>
        Pengembangan Ansilum mencakup konteks bisnis, outlet, dan peran
        pengguna. Informasi operasional yang dibaca perlu mengikuti akses
        pengguna tersebut. Konfigurasi akses dan cakupan laporan dibahas sebelum
        onboarding.
      </p>
      <h2>Perangkat offline</h2>
      <p>
        Pekerjaan kasir lokal memerlukan penyiapan awal dan otorisasi perangkat
        yang masih berlaku. Perubahan akses dari server tidak selalu dapat
        diketahui perangkat ketika koneksi terputus. Pengelolaan perangkat dan
        pembaruan akses merupakan bagian dari kebutuhan operasional yang perlu
        ditinjau.
      </p>
      <h2>Transaksi dan sinkronisasi</h2>
      <p>
        Alur lokal dirancang menyimpan transaksi sebelum menampilkan
        keberhasilan. Sinkronisasi merupakan proses terpisah; status tertunda
        atau yang memerlukan pemeriksaan perlu ditindaklanjuti. Laporan pusat
        mengikuti data yang sudah tersinkron.
      </p>
      <h2>Intelligence masih direncanakan</h2>
      <p>
        Integrasi Claude belum tersedia untuk merchant. Pemisahan data bisnis,
        izin akses, pembatasan alat, dan riwayat tindakan merupakan persyaratan
        untuk pengembangannya. Pengiriman data ke layanan AI perlu dijelaskan
        sebelum fitur diaktifkan.
      </p>
      <p>
        <Link href="/intelligence">Baca rencana dan batas Intelligence</Link>.
      </p>
      <h2>Sebelum penerapan</h2>
      <p>
        Bahas kebutuhan pengelolaan perangkat, akses staf, pemulihan data, dan
        proses dukungan dengan Calterras. Halaman ini tidak menyatakan
        sertifikasi keamanan, hasil audit independen, atau jaminan tingkat
        layanan.
      </p>
    </LegalPage>
  )
}
