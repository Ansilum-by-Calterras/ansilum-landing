import {
  AIExample,
  FinalCTA,
  PageIntro,
  Section,
  SectionTitle,
} from '@/components/marketing/sections'
import { pageMetadata } from '@/lib/metadata'
export const metadata = pageMetadata(
  'Rencana AI untuk Data Operasional',
  'Lihat rencana integrasi Claude untuk tanya jawab penjualan, stok, dan margin di Ansilum, termasuk data, batasan, dan status pengembangannya.',
  '/intelligence',
)
export default function IntelligencePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageIntro
        eyebrow="Ansilum Intelligence · Direncanakan"
        title="Dari data operasional ke jawaban yang bisa ditelusuri."
      >
        <p>
          Kami merencanakan integrasi Claude untuk membantu pemilik memahami apa
          yang terjadi dalam bisnisnya, menggunakan data operasional Ansilum
          yang dapat diakses pengguna tersebut.
        </p>
        <p className="mt-6 rounded-2xl border border-[#d9c5ac] bg-[#f5ecdf] p-5 text-sm leading-7 text-foreground">
          <strong>Fitur belum tersedia untuk merchant.</strong> Contoh di
          halaman ini merupakan ilustrasi konsep dengan data contoh, bukan hasil
          dari fitur yang sudah dirilis.
        </p>
      </PageIntro>
      <Section className="!pt-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="section-title">
              Pertanyaan sehari-hari. Dasar jawaban yang jelas.
            </h2>
            <ul className="mt-7 divide-y divide-[var(--marketing-line)]">
              {[
                'Menu apa yang paling laku minggu ini?',
                'Bagian penjualan mana yang turun?',
                'Produk mana yang marginnya menurun?',
                'Bahan apa yang perlu saya periksa stoknya?',
                'Apa yang berubah dibanding minggu lalu?',
              ].map((question) => (
                <li key={question} className="py-4 text-base">
                  {question}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Prioritas awal: tanya jawab penjualan dan ringkasan harian.
              Pengamatan margin dan stok bergantung pada kelengkapan biaya,
              resep, dan catatan bahan.
            </p>
          </div>
          <AIExample />
        </div>
      </Section>
      <Section className="bg-[var(--marketing-paper)]">
        <SectionTitle
          eyebrow="Peran Claude yang direncanakan"
          title="Menjelaskan data, dengan konteks bisnisnya."
        >
          <p>
            Claude direncanakan untuk memahami pertanyaan dan menjelaskan hasil
            pembacaan data. Angka penjualan, biaya, dan margin tetap perlu
            berasal dari fungsi perhitungan Ansilum yang dapat diperiksa.
          </p>
        </SectionTitle>
        <ol className="mt-9 grid gap-4 md:grid-cols-3">
          {[
            [
              'Pertanyaan pemilik',
              'Periode dan outlet diperjelas, lalu hak akses pengguna diperiksa.',
            ],
            [
              'Data operasional',
              'Fungsi bisnis membaca ringkasan penjualan, produk, stok, atau biaya yang relevan.',
            ],
            [
              'Penjelasan Claude',
              'Jawaban menyertakan konteks periode, sumber angka, dan keterbatasan data.',
            ],
          ].map(([title, text], i) => (
            <li key={title} className="surface-card p-7">
              <span className="font-mono text-xs text-[#765134]">0{i + 1}</span>
              <h3 className="mt-5 font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {text}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-xs text-muted-foreground">
          Alur di atas adalah rancangan integrasi, bukan kemampuan yang sudah
          tersedia.
        </p>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionTitle
            eyebrow="Batas & kendali"
            title="Mulai dari membaca dan menjelaskan."
          >
            <p>
              AI direncanakan untuk membantu pemahaman. Pencatatan transaksi dan
              perhitungan keuangan tetap memiliki aturan bisnisnya sendiri.
            </p>
          </SectionTitle>
          <div className="space-y-7">
            {[
              [
                'Lingkup bisnis dan izin',
                'Akses harus mengikuti pengguna, bisnis, dan outlet yang berwenang. Model tidak diberi kebebasan memilih data bisnis lain.',
              ],
              [
                'Data yang cukup dan mutakhir',
                'Transaksi belum tersinkron dan biaya belum lengkap harus dijelaskan. Pola penjualan tidak otomatis membuktikan penyebabnya.',
              ],
              [
                'Eksekusi yang terkendali',
                'Aplikasi perlu memeriksa setiap permintaan alat dan menyimpan riwayat yang dapat diperiksa. Kontrol ini merupakan syarat pengembangan integrasi.',
              ],
              [
                'Tindakan operasional di tahap berikutnya',
                'Perubahan stok, harga, dan tindakan keuangan belum ditawarkan melalui AI. Arah ini memerlukan izin, konfirmasi sesuai risiko, dan audit tindakan.',
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <h3 className="font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-12 rounded-3xl border border-[var(--marketing-line)] p-7">
          <h2 className="text-xl font-medium">Status pengembangan</h2>
          <dl className="mt-5 divide-y divide-[var(--marketing-line)]">
            {[
              [
                'Tersedia saat ini',
                'Belum ada fitur Claude yang dinyatakan tersedia.',
              ],
              [
                'Beta / eksperimen merchant',
                'Belum ada akses eksperimen merchant yang dikonfirmasi.',
              ],
              [
                'Direncanakan lebih dahulu',
                'Tanya jawab penjualan dan ringkasan operasional.',
              ],
              [
                'Arah lanjutan',
                'Penjelasan tren, margin, dan stok; tindakan terbatas setelah kontrolnya siap.',
              ],
            ].map(([term, detail]) => (
              <div
                key={term}
                className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr]"
              >
                <dt className="text-sm font-medium">{term}</dt>
                <dd className="text-sm leading-7 text-muted-foreground">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            Rencana dapat berubah. Integrasi Claude akan memerlukan koneksi ke
            layanan AI. Rincian pemrosesan data akan dijelaskan sebelum fitur
            diaktifkan.
          </p>
        </div>
      </Section>
      <FinalCTA placement="intelligence-final" />
    </main>
  )
}
