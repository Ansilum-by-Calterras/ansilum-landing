import { LegalPage } from '@/components/marketing/legal-page'
import { siteConfig } from '@/config/site'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Privasi',
  'Informasi mengenai data permintaan demo pada website Ansilum, penggunaannya oleh Calterras, serta cara menyampaikan pertanyaan privasi.',
  '/privacy',
)
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privasi permintaan demo."
      intro="Halaman ini menjelaskan pemrosesan informasi melalui website Ansilum oleh Calterras."
    >
      <h2>Informasi yang Anda berikan</h2>
      <p>
        Formulir meminta nama, nama usaha, jenis usaha, jumlah outlet, kota,
        satu kontak yang dapat dihubungi, dan kendala utama. Catatan tambahan
        bersifat opsional. Formulir juga menyimpan persetujuan dihubungi, waktu
        penerimaan, dan nomor referensi permintaan.
      </p>
      <p>
        Jangan memasukkan data pelanggan, kata sandi, informasi pembayaran, atau
        rincian transaksi usaha ke kolom catatan.
      </p>
      <h2>Tujuan penggunaan</h2>
      <p>
        Calterras menggunakan informasi tersebut untuk meninjau kebutuhan usaha,
        menghubungi Anda terkait permintaan, serta membahas demo dan kecocokan
        Ansilum. Pengiriman formulir tidak membuat akun atau langganan berbayar.
      </p>
      <h2>Penyimpanan dan akses</h2>
      <p>
        Permintaan disimpan melalui layanan website atau sistem penerimaan
        permintaan yang dikonfigurasi Calterras. Informasi kontak diperlukan
        untuk tindak lanjut. Data formulir tidak ditampilkan pada halaman
        publik.
      </p>
      <p>
        Calterras perlu membatasi akses operasional kepada pihak yang menangani
        permintaan. Untuk menanyakan penggunaan, memperbaiki, atau meminta
        penghapusan informasi Anda, gunakan kontak di bawah. Identitas atau
        nomor referensi mungkin diperlukan untuk menemukan permintaan yang
        tepat.
      </p>
      <h2>Pengukuran website</h2>
      {siteConfig.analytics ? (
        <p>
          Website menggunakan Vercel Analytics untuk mengukur penggunaan halaman
          dan alur permintaan demo. Peristiwa interaksi memuat nama halaman,
          posisi tombol, dan status proses. Nama, email, nomor WhatsApp, dan isi
          catatan formulir tidak disertakan dalam peristiwa analitik yang dibuat
          website ini.
        </p>
      ) : (
        <p>
          Analitik pihak ketiga tidak diaktifkan pada konfigurasi website ini.
          Layanan hosting tetap dapat memproses informasi teknis permintaan
          untuk menyajikan dan mengoperasikan website.
        </p>
      )}
      <h2>AI dan data bisnis</h2>
      <p>
        Formulir demo ini tidak mengirim isinya ke Claude atau layanan model AI.
        Integrasi Intelligence masih direncanakan. Penjelasan pemrosesan data
        untuk fitur AI perlu tersedia sebelum fitur tersebut diaktifkan.
      </p>
      <h2>Cakupan informasi ini</h2>
      <p>
        Halaman ini mencakup website dan permintaan demo. Penggunaan aplikasi
        Ansilum untuk transaksi merchant, serta pengaturan data dan layanan yang
        terkait, perlu dijelaskan dalam ketentuan onboarding tersendiri sebelum
        penggunaan produk.
      </p>
    </LegalPage>
  )
}
