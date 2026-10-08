import { LegalPage } from '@/components/marketing/legal-page'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Ketentuan Website & Demo',
  'Pahami cakupan website, permintaan demo, status Early Beta, dan persetujuan yang diperlukan sebelum penggunaan Ansilum.',
  '/terms',
)
export default function TermsPage() {
  return (
    <LegalPage
      title="Ketentuan website & demo."
      intro="Informasi untuk memahami website Ansilum dan langkah awal sebelum penggunaan produk."
    >
      <h2>Website dan pengembang</h2>
      <p>
        Website ini memperkenalkan Ansilum, produk yang dikembangkan oleh
        Calterras. Informasi produk membantu calon merchant membahas kebutuhan
        operasional dan kecocokan penggunaan.
      </p>
      <h2>Permintaan demo</h2>
      <p>
        Mengirim formulir berarti meminta Calterras meninjau kebutuhan Anda dan
        menghubungi kontak yang diberikan. Pengiriman tidak otomatis
        mengonfirmasi jadwal, membuka akses aplikasi, memulai langganan, atau
        menimbulkan tagihan.
      </p>
      <h2>Status Early Beta</h2>
      <p>
        Ansilum berada pada tahap Early Beta. Cakupan fitur, akses, perangkat,
        dan dukungan perlu dikonfirmasi untuk versi yang akan digunakan. Rencana
        pengembangan dapat berubah dan tidak merupakan jaminan tanggal rilis.
      </p>
      <h2>Sebelum menggunakan produk</h2>
      <p>
        Biaya, ruang lingkup layanan, penyiapan data, perangkat, dukungan, dan
        ketentuan penggunaan aplikasi perlu disepakati sebelum onboarding.
        Halaman ini tidak menggantikan kesepakatan tersebut.
      </p>
      <h2>Batas fungsi offline dan pembayaran</h2>
      <p>
        Alur offline memerlukan perangkat yang disiapkan dan otorisasi yang
        masih berlaku. Metode pembayaran melalui penyedia eksternal mengikuti
        kebutuhan koneksi serta konfirmasi penyedianya. Pencatatan pembayaran
        tidak boleh disamakan dengan konfirmasi dana dari bank atau penyedia
        pembayaran.
      </p>
      <h2>Contoh dan rencana fitur</h2>
      <p>
        Pratinjau layar menggunakan data contoh bila diberi label demikian.
        Ilustrasi Intelligence merupakan konsep pengembangan; fitur Claude belum
        ditawarkan sebagai kemampuan yang tersedia.
      </p>
    </LegalPage>
  )
}
