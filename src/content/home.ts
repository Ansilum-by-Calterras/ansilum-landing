import type { Locale } from '@/i18n/config'

type PreviewView = {
  id: string
  tab: string
  surface: string
  title: string
  body: string
  alt: string
  image: string
  /** Screens of one real sale, shown one after another; `image` is the first. */
  steps?: { image: string; label: string }[]
}

const en = {
  meta: {
    title: 'Cashier app with an AI assistant for Indonesian small businesses',
    description:
      'Ansilum is a cashier app with an AI assistant for Indonesian small businesses. Record every sale, ask about your business in everyday words, and know what to do next.',
  },
  hero: {
    headline: 'Turn daily sales into your next business decision.',
    supporting:
      'Ansilum is a cashier app with an AI assistant for Indonesian small businesses. Record every sale, ask about your business in everyday words, and get answers from your own numbers.',
    tryIt: 'Sign up Now',
    usedBy: 'Already used by',
    flow: {
      order: 'Order 360',
      items: [
        ['Es kopi susu ×1', 'Rp22,000'],
        ['Pisang goreng ×1', 'Rp15,000'],
      ] as [string, string][],
      total: ['Total', 'Rp37,000'] as [string, string],
      saved: 'Saved',
    },
  },
  beta: {
    badge: 'Closed beta',
    heading: 'Get the Ansilum app early.',
    body: 'The app is in closed beta on Google Play and the App Store. Request access with your email, and once you are whitelisted you will get an invite to download it.',
    stores: { android: 'Google Play', ios: 'App Store' },
    storeHint: 'Choose your platform, then request access. The store link only works for whitelisted accounts.',
    form: {
      platformLabel: 'Platform',
      emailLabel: 'Email used for your store account',
      emailPlaceholder: 'you@business.com',
      submit: 'Request access',
      submitting: 'Sending…',
      success: "Request received. We'll email you once you're whitelisted.",
      error: 'Something went wrong. Please try again.',
      note: 'Use the same email as your Google or Apple account so we can whitelist the right one.',
    },
  },
  demo: {
    label: 'Ansilum assistant example',
  },
  how: {
    heading: 'As easy as ringing up a sale.',
    intro: 'No AI skills needed. No spreadsheets to clean up.',
    receipt: ['Es kopi susu ×1', 'Pisang goreng ×1', 'Total Rp37,000'],
    ask: 'Why were sales down?',
    steps: [
      {
        title: 'Record your sales',
        body: 'Your cashier rings up every order in Ansilum, the same way as always.',
      },
      {
        title: 'Ansilum sorts the numbers',
        body: 'Sales are grouped by day and by product, and compared with last week. Automatically.',
      },
      {
        title: 'Ask in your own words',
        body: '“Why were sales down this week?” Ansilum answers with the numbers and tells you what to check.',
      },
    ],
  },
  preview: {
    heading: 'See the app before you try it.',
    intro: 'The cashier rings up orders. You read the numbers.',
    lead: 'Real screens from the Ansilum cashier app and owner dashboard, shown with a sample coffee shop.',
    label: 'Ansilum screens',
    business: 'Kedai Kopi Contoh',
    sample: 'Sample data',
    steps: 'Checkout steps',
    play: 'Play',
    pause: 'Pause',
    views: [
      {
        id: 'pos',
        tab: 'Cashier',
        surface: 'Cashier app on a tablet',
        title: 'Ring up an order in a few taps.',
        body: 'Pick the menu, set the sugar level or add an extra shot, then take cash, transfer, or QRIS. Cash sales are saved on the tablet first, so the till keeps going when the internet drops.',
        alt: 'The Ansilum cashier app with sample data, ringing up an Es kopi susu and a Pisang goreng. Step:',
        image: '/product/preview/pos-1-menu.en.webp',
        steps: [
          { image: '/product/preview/pos-1-menu.en.webp', label: 'Pick the menu' },
          { image: '/product/preview/pos-2-options.en.webp', label: 'Set the options' },
          { image: '/product/preview/pos-3-order.en.webp', label: 'Check the order' },
          { image: '/product/preview/pos-4-payment.en.webp', label: 'Take payment' },
          { image: '/product/preview/pos-5-saved.en.webp', label: 'Saved' },
        ],
      },
      {
        id: 'outlets',
        tab: 'All outlets',
        surface: 'Owner dashboard',
        title: 'Every outlet, today, on one screen.',
        body: 'Sales collected, orders, and which outlet is busy right now, compared with yesterday at the same time.',
        alt: 'Ansilum dashboard with sample data: today’s sales for two outlets, an outlet map, and orders by hour.',
        image: '/product/preview/outlets.en.webp',
      },
      {
        id: 'sales',
        tab: 'Sales report',
        surface: 'Owner dashboard',
        title: 'A sales report you can read at a glance.',
        body: 'Daily sales against the previous period, how customers paid, and the average spend per order.',
        alt: 'Ansilum sales report with sample data: total sales, orders, a daily trend chart, and payment methods.',
        image: '/product/preview/sales.en.webp',
      },
      {
        id: 'analytics',
        tab: 'Best sellers',
        surface: 'Owner dashboard',
        title: 'Know your best sellers and your busiest hours.',
        body: 'Top products, gross profit after the cost of ingredients, and the hours that need more hands.',
        alt: 'Ansilum analytics with sample data: revenue, gross profit, top products, and busy hours.',
        image: '/product/preview/analytics.en.webp',
      },
      {
        id: 'customers',
        tab: 'Customers',
        surface: 'Owner dashboard',
        title: 'Regulars get points. You see who comes back.',
        body: 'Points add up from every order, with visits, total spend, and rewards they can redeem.',
        alt: 'Ansilum customer list with sample data: members with points, total spend, visits, and last visit.',
        image: '/product/preview/customers.en.webp',
      },
    ] as PreviewView[],
    features: {
      heading: 'What’s inside.',
      items: [
        ['Cashier on a tablet or phone', 'Orders, menu options, and payments by cash, transfer, or QRIS.'],
        ['Keeps going offline', 'Cash sales are still recorded and sync once the internet is back.'],
        ['Receipts and printers', 'Print receipts on a Bluetooth thermal printer.'],
        ['Sales reports', 'By day, week, or month, for each outlet or all of them.'],
        ['Several outlets', 'Watch every branch from one dashboard.'],
        ['Stock and cost of goods', 'Recipes lower ingredient stock as you sell and give the cost of each item.'],
        ['Customers and points', 'A points programme with rewards your regulars can redeem.'],
        ['Staff with their own PIN', 'Each cashier signs in with a PIN, so every sale has a name on it.'],
      ] as [string, string][],
      note: 'Features follow the plan you choose.',
      link: 'Compare plans',
    },
  },
  umkm: {
    heading: 'Made for every UMKM that sells every day.',
    intro:
      'Food stalls, cafés, shops, salons, workshops. If you ring up sales, Ansilum can help you read them.',
    scene: { question: 'Which menu sells best?', answer: 'Es kopi susu: Rp2.8M this week' },
    examples: [
      ['Food stall', 'Which dish sells best at lunchtime?'],
      ['Grocery shop', 'Which items did customers buy most this week?'],
      ['Coffee shop', 'Why was Tuesday so quiet?'],
      ['Barbershop', 'Which service was booked most this month?'],
      ['Bakery', 'What time of day is the shop busiest?'],
      ['Laundry', 'How does this month compare with last month?'],
      ['Clothing shop', 'Which products are selling less than before?'],
      ['Catering', 'Which days get the most orders?'],
    ] as [string, string][],
  },
  product: {
    heading: 'A cashier app that already works hard every day.',
    body: 'The AI assistant reads from the same cashier app your team uses. So every answer comes from your real sales.',
    points: [
      ['Sales reports', 'See total sales and orders by day, week, or month.'],
      ['Best-selling products', 'See which products sell most and how much each one earns.'],
      ['Works when the internet drops', 'Keep recording cash sales. Everything syncs when the connection is back.'],
      ['Every outlet in one place', 'Check sales for each of your outlets from one app.'],
    ] as [string, string][],
    link: 'See the product',
  },
  customers: {
    heading: 'Already running at Indonesian small businesses.',
    intro: 'These businesses record their sales with the Ansilum cashier app.',
    entries: [
      { name: 'Toko Kopi Kartika', type: 'Coffee shop', owner: 'Owned by Ibu Noer Qomariah' },
      { name: 'The Art Barber', type: 'Barbershop', owner: 'Owned by Ibu Noer Qomariah' },
      { name: 'Giafoodies', type: 'Dimsum business', owner: 'Owned by Anggita Natalia' },
    ],
  },
  mission: {
    heading: 'Every small business deserves its own business analyst.',
    body: 'Big companies have data teams. The owner of a warung has a notebook and a gut feeling. We are building Ansilum so that more than 60 million Indonesian UMKM can use AI, starting with the cashier app they already open every morning.',
    link: 'Read our story',
    stats: [
      ['60M+', 'small businesses (UMKM) in Indonesia'],
      ['March 2024', 'Ansilum started'],
    ] as [string, string][],
  },
  pricing: {
    heading: 'From Rp50,000 a month.',
    body: 'Pay monthly for your cashier, and move up a plan whenever your business grows.',
    ai: 'AI assistant coming soon: pay as you go with credits.',
    link: 'See full pricing',
  },
  faq: {
    heading: 'Questions owners ask.',
    items: [
      {
        q: 'Who is Ansilum for?',
        a: 'Indonesian small businesses that sell every day: food stalls, coffee shops, grocery shops, barbershops, salons, laundries, and more. The cashier records each sale. The owner reads the numbers and decides what to do.',
      },
      {
        q: 'Do I need to understand AI?',
        a: 'No. You ask the way you would ask a friend, for example “Which menu sold most this week?” Ansilum answers in plain language, with the numbers.',
      },
      {
        q: 'Where do the answers come from?',
        a: 'From the sales and products recorded in your Ansilum cashier app. Each answer shows the period and the numbers it used, so you can check it yourself.',
      },
      {
        q: 'When can I use the AI assistant?',
        a: 'We are preparing the AI assistant for Ansilum customers now. The cashier app and sales reports are ready to use today. In a demo, we show you the assistant with sample data.',
      },
      {
        q: 'What if the internet goes down?',
        a: 'Keep recording cash sales on a prepared device. Sales sync when the connection comes back. QRIS and card payments, and the AI assistant, need internet.',
      },
      {
        q: 'How do I start?',
        a: 'Request a free demo. We talk about how you sell, show you the app, and help you pick a plan. Plans start at Rp50,000 a month.',
      },
    ],
    gettingStarted: 'See pricing',
  },
}

export type HomeContent = typeof en

const id: HomeContent = {
  meta: {
    title: 'Aplikasi kasir dengan asisten AI untuk UMKM Indonesia',
    description:
      'Ansilum adalah aplikasi kasir dengan asisten AI untuk UMKM Indonesia. Catat setiap penjualan, tanya soal usaha Anda dengan bahasa sehari-hari, dan tahu langkah berikutnya.',
  },
  hero: {
    headline: 'Ubah penjualan harian menjadi langkah usaha berikutnya.',
    supporting:
      'Ansilum adalah aplikasi kasir dengan asisten AI untuk UMKM Indonesia. Catat setiap penjualan, tanya apa saja soal usaha Anda, dan dapatkan jawaban dari angka penjualan Anda sendiri.',
    tryIt: 'Daftar Sekarang',
    usedBy: 'Sudah dipakai oleh',
    flow: {
      order: 'Pesanan 360',
      items: [
        ['Es kopi susu ×1', 'Rp22.000'],
        ['Pisang goreng ×1', 'Rp15.000'],
      ],
      total: ['Total', 'Rp37.000'],
      saved: 'Tersimpan',
    },
  },
  beta: {
    badge: 'Closed beta',
    heading: 'Jadi yang pertama pakai aplikasi Ansilum.',
    body: 'Aplikasi kami sedang closed beta di Google Play dan App Store. Ajukan akses dengan email Anda, dan setelah masuk whitelist Anda akan mendapat undangan untuk mengunduhnya.',
    stores: { android: 'Google Play', ios: 'App Store' },
    storeHint: 'Pilih platform, lalu ajukan akses. Tautan toko hanya berfungsi untuk akun yang sudah di-whitelist.',
    form: {
      platformLabel: 'Platform',
      emailLabel: 'Email akun Google / Apple Anda',
      emailPlaceholder: 'anda@usaha.com',
      submit: 'Ajukan akses',
      submitting: 'Mengirim…',
      success: 'Permintaan diterima. Kami akan mengirim email setelah Anda masuk whitelist.',
      error: 'Terjadi kesalahan. Silakan coba lagi.',
      note: 'Gunakan email yang sama dengan akun Google atau Apple Anda agar kami bisa mendaftarkan akun yang tepat.',
    },
  },
  demo: {
    label: 'Contoh asisten Ansilum',
  },
  how: {
    heading: 'Semudah mencatat penjualan.',
    intro: 'Tidak perlu paham AI. Tidak perlu repot mengolah Excel.',
    receipt: ['Es kopi susu ×1', 'Pisang goreng ×1', 'Total Rp37.000'],
    ask: 'Kenapa minggu ini turun?',
    steps: [
      {
        title: 'Catat penjualan',
        body: 'Kasir mencatat setiap pesanan di Ansilum, seperti biasa.',
      },
      {
        title: 'Ansilum merapikan angkanya',
        body: 'Penjualan otomatis dikelompokkan per hari dan per produk, lalu dibandingkan dengan minggu lalu.',
      },
      {
        title: 'Tanya dengan bahasa sendiri',
        body: '“Kenapa penjualan minggu ini turun?” Ansilum menjawab dengan angkanya dan memberi tahu apa yang perlu dicek.',
      },
    ],
  },
  preview: {
    heading: 'Lihat aplikasinya dulu.',
    intro: 'Kasir mencatat pesanan. Anda membaca angkanya.',
    lead: 'Tampilan asli aplikasi kasir dan dasbor pemilik Ansilum, dengan contoh sebuah kedai kopi.',
    label: 'Tampilan Ansilum',
    business: 'Kedai Kopi Contoh',
    sample: 'Data contoh',
    steps: 'Langkah di kasir',
    play: 'Putar',
    pause: 'Jeda',
    views: [
      {
        id: 'pos',
        tab: 'Kasir',
        surface: 'Aplikasi kasir di tablet',
        title: 'Catat pesanan dalam beberapa ketukan.',
        body: 'Pilih menu, atur tingkat gula atau tambah shot, lalu terima tunai, transfer, atau QRIS. Penjualan tunai tersimpan dulu di tablet, jadi kasir tetap jalan saat internet putus.',
        alt: 'Aplikasi kasir Ansilum dengan data contoh, mencatat Es kopi susu dan Pisang goreng. Langkah:',
        image: '/product/preview/pos-1-menu.id.webp',
        steps: [
          { image: '/product/preview/pos-1-menu.id.webp', label: 'Pilih menu' },
          { image: '/product/preview/pos-2-options.id.webp', label: 'Atur pilihan' },
          { image: '/product/preview/pos-3-order.id.webp', label: 'Cek pesanan' },
          { image: '/product/preview/pos-4-payment.id.webp', label: 'Terima bayaran' },
          { image: '/product/preview/pos-5-saved.id.webp', label: 'Tersimpan' },
        ],
      },
      {
        id: 'outlets',
        tab: 'Semua outlet',
        surface: 'Dasbor pemilik',
        title: 'Semua outlet, hari ini, di satu layar.',
        body: 'Penjualan masuk, jumlah pesanan, dan outlet yang sedang ramai, dibandingkan dengan kemarin di jam yang sama.',
        alt: 'Dasbor Ansilum dengan data contoh: penjualan hari ini di dua outlet, peta outlet, dan pesanan per jam.',
        image: '/product/preview/outlets.id.webp',
      },
      {
        id: 'sales',
        tab: 'Laporan penjualan',
        surface: 'Dasbor pemilik',
        title: 'Laporan penjualan yang langsung terbaca.',
        body: 'Penjualan harian dibanding periode sebelumnya, cara pelanggan membayar, dan rata-rata belanja per pesanan.',
        alt: 'Laporan penjualan Ansilum dengan data contoh: total penjualan, pesanan, grafik tren harian, dan metode pembayaran.',
        image: '/product/preview/sales.id.webp',
      },
      {
        id: 'analytics',
        tab: 'Produk terlaris',
        surface: 'Dasbor pemilik',
        title: 'Tahu menu andalan dan jam paling ramai.',
        body: 'Produk terlaris, laba kotor setelah biaya bahan, dan jam-jam yang butuh tambahan tenaga.',
        alt: 'Analitik Ansilum dengan data contoh: pendapatan, laba kotor, produk terlaris, dan jam ramai.',
        image: '/product/preview/analytics.id.webp',
      },
      {
        id: 'customers',
        tab: 'Pelanggan',
        surface: 'Dasbor pemilik',
        title: 'Pelanggan setia dapat poin. Anda tahu siapa yang kembali.',
        body: 'Poin bertambah dari setiap pesanan, lengkap dengan jumlah kunjungan, total belanja, dan hadiah yang bisa ditukar.',
        alt: 'Daftar pelanggan Ansilum dengan data contoh: anggota dengan poin, total belanja, kunjungan, dan terakhir datang.',
        image: '/product/preview/customers.id.webp',
      },
    ],
    features: {
      heading: 'Yang sudah ada di dalamnya.',
      items: [
        ['Kasir di tablet atau HP', 'Pesanan, pilihan menu, dan pembayaran tunai, transfer, atau QRIS.'],
        ['Tetap jalan saat offline', 'Penjualan tunai tetap tercatat dan tersinkron begitu internet kembali.'],
        ['Struk dan printer', 'Cetak struk lewat printer thermal Bluetooth.'],
        ['Laporan penjualan', 'Per hari, minggu, atau bulan, untuk tiap outlet atau semuanya.'],
        ['Banyak outlet', 'Pantau semua cabang dari satu dasbor.'],
        ['Stok bahan dan HPP', 'Resep mengurangi stok bahan setiap ada penjualan dan menghitung modal tiap menu.'],
        ['Pelanggan dan poin', 'Program poin dengan hadiah yang bisa ditukar pelanggan setia.'],
        ['Karyawan dengan PIN', 'Setiap kasir masuk dengan PIN sendiri, jadi setiap penjualan tercatat atas namanya.'],
      ],
      note: 'Fitur mengikuti paket yang Anda pilih.',
      link: 'Bandingkan paket',
    },
  },
  umkm: {
    heading: 'Dibuat untuk semua UMKM yang berjualan setiap hari.',
    intro:
      'Warung, kedai, toko, salon, bengkel. Selama ada transaksi di kasir, Ansilum bisa membantu Anda membacanya.',
    scene: { question: 'Menu apa yang paling laku?', answer: 'Es kopi susu: Rp2,8 jt minggu ini' },
    examples: [
      ['Warung makan', 'Menu apa yang paling laku saat jam makan siang?'],
      ['Toko kelontong', 'Barang apa yang paling sering dibeli minggu ini?'],
      ['Kedai kopi', 'Kenapa hari Selasa sepi?'],
      ['Barbershop', 'Layanan apa yang paling banyak dipesan bulan ini?'],
      ['Toko roti', 'Jam berapa toko paling ramai?'],
      ['Laundry', 'Bagaimana pendapatan bulan ini dibanding bulan lalu?'],
      ['Toko baju', 'Produk apa yang penjualannya menurun?'],
      ['Katering', 'Hari apa pesanan paling banyak?'],
    ],
  },
  product: {
    heading: 'Aplikasi kasir yang sudah bekerja keras setiap hari.',
    body: 'Asisten AI membaca data dari aplikasi kasir yang sama dengan yang dipakai tim Anda. Jadi setiap jawaban berasal dari penjualan Anda yang sebenarnya.',
    points: [
      ['Laporan penjualan', 'Lihat total penjualan dan jumlah pesanan per hari, minggu, atau bulan.'],
      ['Produk terlaris', 'Lihat produk yang paling laku dan berapa pendapatan dari masing-masing.'],
      ['Tetap jalan saat internet putus', 'Penjualan tunai tetap tercatat. Data tersinkron begitu internet kembali.'],
      ['Semua outlet di satu tempat', 'Pantau penjualan setiap outlet dari satu aplikasi.'],
    ],
    link: 'Lihat produknya',
  },
  customers: {
    heading: 'Sudah berjalan di UMKM Indonesia.',
    intro: 'Usaha-usaha ini mencatat penjualannya dengan aplikasi kasir Ansilum.',
    entries: [
      { name: 'Toko Kopi Kartika', type: 'Kedai kopi', owner: 'Milik Ibu Noer Qomariah' },
      { name: 'The Art Barber', type: 'Barbershop', owner: 'Milik Ibu Noer Qomariah' },
      { name: 'Giafoodies', type: 'Usaha dimsum', owner: 'Milik Anggita Natalia' },
    ],
  },
  mission: {
    heading: 'Setiap UMKM layak punya analis bisnis sendiri.',
    body: 'Perusahaan besar punya tim data. Pemilik warung punya buku catatan dan feeling. Kami membangun Ansilum agar lebih dari 60 juta UMKM Indonesia bisa memakai AI, dimulai dari aplikasi kasir yang mereka buka setiap pagi.',
    link: 'Baca cerita kami',
    stats: [
      ['60 jt+', 'UMKM di Indonesia'],
      ['Maret 2024', 'Ansilum dimulai'],
    ],
  },
  pricing: {
    heading: 'Mulai Rp50.000 per bulan.',
    body: 'Bayar bulanan untuk kasir Anda, dan naik paket kapan saja saat usaha berkembang.',
    ai: 'Asisten AI segera hadir: bayar sesuai pemakaian dengan kredit.',
    link: 'Lihat detail harga',
  },
  faq: {
    heading: 'Pertanyaan yang sering diajukan.',
    items: [
      {
        q: 'Ansilum cocok untuk usaha apa?',
        a: 'UMKM Indonesia yang berjualan setiap hari: warung makan, kedai kopi, toko kelontong, barbershop, salon, laundry, dan banyak lagi. Kasir mencatat penjualan. Pemilik membaca angkanya dan menentukan langkah.',
      },
      {
        q: 'Apakah saya harus paham AI?',
        a: 'Tidak. Cukup bertanya seperti bertanya ke teman, misalnya “Menu apa yang paling laku minggu ini?” Ansilum menjawab dengan bahasa sederhana, lengkap dengan angkanya.',
      },
      {
        q: 'Jawabannya berasal dari mana?',
        a: 'Dari penjualan dan produk yang tercatat di aplikasi kasir Ansilum Anda. Setiap jawaban menunjukkan periode dan angka yang dipakai, jadi Anda bisa mengeceknya sendiri.',
      },
      {
        q: 'Kapan asisten AI bisa saya pakai?',
        a: 'Asisten AI sedang kami siapkan untuk pelanggan Ansilum. Aplikasi kasir dan laporan penjualan sudah bisa dipakai hari ini. Saat demo, kami tunjukkan asistennya dengan data contoh.',
      },
      {
        q: 'Bagaimana kalau internet mati?',
        a: 'Penjualan tunai tetap bisa dicatat di perangkat yang sudah disiapkan. Data tersinkron saat internet kembali. Pembayaran QRIS dan kartu, juga asisten AI, membutuhkan internet.',
      },
      {
        q: 'Bagaimana cara mulai?',
        a: 'Minta demo gratis. Kami ngobrol soal cara Anda berjualan, menunjukkan aplikasinya, lalu membantu memilih paket. Paket mulai Rp50.000 per bulan.',
      },
    ],
    gettingStarted: 'Lihat harga',
  },
}

export const homeContent: Record<Locale, HomeContent> = { en, id }
