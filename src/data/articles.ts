export const articles = [
  {
    slug: 'aplikasi-kasir-offline-untuk-kafe',
    title: 'Aplikasi kasir offline: apa yang perlu diuji di kafe Anda?',
    description:
      'Pisahkan alur kasir lokal, konfirmasi pembayaran, dan sinkronisasi saat mengevaluasi POS offline untuk kafe.',
    category: 'Operasional kasir',
    sections: [
      {
        title: 'Mulai dari alur satu pesanan',
        paragraphs: [
          'Koneksi yang terputus bisa terjadi di tengah jam sibuk. Saat mengevaluasi aplikasi kasir offline, minta demonstrasi satu pesanan dari pemilihan menu sampai penyimpanan transaksi. Putuskan koneksi pada perangkat uji dan perhatikan langkah mana yang masih berjalan.',
          'Catat prasyaratnya: apakah menu sudah dimuat, kasir sudah masuk, dan perangkat masih memiliki otorisasi? Perangkat yang belum disiapkan tidak selalu dapat memulai alur yang sama tanpa internet.',
        ],
      },
      {
        title: 'Pencatatan pembayaran berbeda dari konfirmasi pembayaran',
        paragraphs: [
          'Mencatat pembayaran tunai di perangkat berbeda dari meminta konfirmasi ke penyedia pembayaran. Jangan menganggap QRIS, kartu, atau gateway bisa dikonfirmasi tanpa koneksi hanya karena kasir mempunyai mode offline.',
          'Untuk transfer yang diverifikasi manual, sepakati siapa yang memeriksa pembayaran dan bagaimana bukti dicatat. Uji alur yang benar-benar dipakai outlet Anda bersama tim produk.',
        ],
      },
      {
        title: 'Uji penyimpanan, struk, dan koneksi yang kembali',
        paragraphs: [
          'Setelah transaksi dicatat, periksa riwayat dan cetak struk pada printer yang akan digunakan. Kemudian sambungkan kembali internet dan periksa kapan transaksi muncul di laporan pusat.',
          'Lakukan pengujian ulang dengan koneksi terputus beberapa kali. Tanyakan bagaimana sistem menangani pengiriman ulang, data yang tertunda, dan transaksi yang memerlukan pemeriksaan. Laporan pusat belum tentu mencakup transaksi yang masih tersimpan di perangkat.',
        ],
      },
      {
        title: 'Kaitannya dengan Ansilum',
        paragraphs: [
          'Ansilum berada pada tahap Early Beta. Pendekatan offline-first berfokus pada data operasional lokal, transaksi tunai, dan sinkronisasi saat koneksi tersedia. Cakupan perangkat, otorisasi, printer, dan akses merchant perlu dikonfirmasi dalam demo.',
          'Gunakan kebutuhan outlet Anda sebagai skenario demo. Penjelasan arsitektur membantu memahami rancangan; uji alur pada perangkat yang sesuai sebelum menentukan kesiapan penerapan.',
        ],
      },
    ],
  },
  {
    slug: 'checklist-demo-pos-kafe',
    title: 'Checklist demo POS untuk usaha F&B dengan 1–5 outlet',
    description:
      'Siapkan skenario kasir, perangkat, stok, dan laporan agar demo POS menjawab kebutuhan operasional usaha Anda.',
    category: 'Panduan memilih POS',
    sections: [
      {
        title: 'Bawa contoh hari operasional Anda',
        paragraphs: [
          'Siapkan beberapa menu yang mewakili penjualan sehari-hari: produk sederhana, varian ukuran, dan tambahan bila dipakai. Jelaskan jam ramai, jumlah kasir, dan cara outlet menerima pembayaran.',
          'Tujuan demo adalah melihat kecocokan alur. Daftar fitur saja belum menjawab apakah staf dapat menyelesaikan pesanan dengan perangkat dan koneksi yang tersedia.',
        ],
      },
      {
        title: 'Periksa perangkat dan batasan offline',
        paragraphs: [
          'Sebutkan model perangkat, sistem operasi, dan printer yang sudah dimiliki. Minta penjelasan perangkat yang didukung, langkah persiapan online, dan kondisi yang membutuhkan koneksi.',
          'Uji alur tunai, pembatalan, dan pengiriman data setelah koneksi kembali sesuai cakupan produk. Jangan mengasumsikan semua tindakan tersedia offline.',
        ],
      },
      {
        title: 'Tentukan laporan yang perlu dijawab',
        paragraphs: [
          'Tuliskan tiga pertanyaan rutin, misalnya penjualan bersih hari ini, produk terlaris minggu ini, dan outlet mana yang perlu ditinjau. Pastikan definisi angka, rentang waktu, serta kelengkapan data dapat dijelaskan.',
          'Jika margin penting, tanyakan sumber biaya barang dan cara menangani data biaya yang belum lengkap. Jika stok penting, jelaskan apakah usaha melacak produk jadi, bahan baku, resep, atau semuanya.',
        ],
      },
      {
        title: 'Sepakati ruang lingkup sebelum mulai',
        paragraphs: [
          'Sebelum onboarding, pastikan fitur yang tersedia, status Beta, biaya, dukungan, akses data, dan cara evaluasi sudah jelas. Catat fitur yang masih direncanakan secara terpisah.',
          'Untuk Ansilum, permintaan demo memulai percakapan kebutuhan. Permintaan tersebut tidak otomatis membuat akun, menjanjikan tanggal aktivasi, atau memulai langganan berbayar.',
        ],
      },
    ],
  },
  {
    slug: 'membaca-laporan-penjualan-stok-margin',
    title: 'Membaca penjualan, stok, dan margin tanpa kehilangan konteks',
    description:
      'Periksa periode, sinkronisasi transaksi, dan kelengkapan biaya sebelum menarik kesimpulan dari laporan operasional.',
    category: 'Visibilitas usaha',
    sections: [
      {
        title: 'Pastikan periode dan data sebanding',
        paragraphs: [
          'Sebelum menyimpulkan penjualan turun, periksa outlet, tanggal, jam operasional, dan definisi penjualan yang dibandingkan. Hari penuh dan hari yang belum selesai dapat menghasilkan perbandingan yang menyesatkan.',
          'Pada sistem yang menyimpan transaksi secara lokal, laporan pusat bergantung pada data yang sudah tersinkron. Tinjau transaksi tertunda sebelum memakai angka laporan untuk keputusan operasional.',
        ],
      },
      {
        title: 'Pisahkan angka penjualan dari penyebabnya',
        paragraphs: [
          'Penurunan pada suatu kategori menunjukkan bagian penjualan yang berubah. Angka itu belum membuktikan penyebabnya. Jam buka, stok kosong, perubahan menu, atau kejadian di sekitar outlet mungkin membutuhkan informasi tambahan.',
          'Gunakan laporan untuk menentukan pertanyaan berikutnya: produk apa yang berubah, kapan perubahan terjadi, dan apakah pola yang sama terlihat pada outlet lain?',
        ],
      },
      {
        title: 'Margin membutuhkan data biaya yang memadai',
        paragraphs: [
          'Angka penjualan saja tidak cukup untuk memastikan margin. Perhitungan membutuhkan biaya yang relevan terhadap transaksi dan perlakuan yang jelas untuk diskon, retur, serta biaya yang belum tercatat.',
          'Data biaya yang kosong tidak boleh dibaca sebagai biaya nol. Saat melihat laporan, minta penjelasan cakupan biaya dan apakah angka tersebut sudah lengkap untuk periode yang dipilih.',
        ],
      },
      {
        title: 'Peran intelligence yang direncanakan',
        paragraphs: [
          'Arah Ansilum Intelligence adalah membantu pemilik bertanya tentang data penjualan, produk, stok, dan biaya yang dapat diakses sesuai izin. Claude direncanakan menjadi bagian dari lapisan ini; fiturnya belum tersedia untuk merchant.',
          'Jawaban yang berguna perlu menyebut periode, sumber data, dan batas kesimpulannya. Ringkasan bahasa sehari-hari tetap harus berpijak pada perhitungan operasional yang dapat diperiksa.',
        ],
      },
    ],
  },
] as const
export const articleDate = '2026-10-08'
export const articleAuthor = 'Calterras'
