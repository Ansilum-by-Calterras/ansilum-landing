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
    title: 'Cashier app for Indonesian small businesses',
    description:
      'Ansilum is a cashier app for Indonesian small businesses. Record every sale, keep selling when the internet drops, and read your sales on the web. An AI assistant that answers from your own numbers is in development.',
  },
  hero: {
    headline: 'Turn daily sales into your next business decision.',
    supporting:
      'Ansilum is a cashier app for Indonesian small businesses. Record every sale, even when the internet drops, and read your sales on the web. Next, an AI assistant you can ask about your business, answering from your own numbers.',
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
        body: 'Sales add up by day and by outlet on your web dashboard. Automatically.',
      },
      {
        title: 'Soon: ask in your own words',
        body: 'The assistant we are building will answer “Why were sales down this week?” with the numbers and what to check.',
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
        body: 'Pick the menu, set the sugar level or add an extra shot, then take payment. Cash and confirmed transfers are saved on the tablet first, so the till keeps going when the internet drops. QRIS payments are recorded while online.',
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
        body: 'On the Full plan: top products, gross profit after the cost of ingredients, and the hours that need more hands.',
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
        ['Cashier on a tablet or phone', 'Menu options and notes, open bills, discounts, taxes, and service charge.'],
        ['Keeps going offline', 'Cash and confirmed transfer sales are still recorded and sync once the internet is back.'],
        ['Receipts and printers', 'Receipts and kitchen tickets on Bluetooth, network, or USB thermal printers, 58 or 80 mm.'],
        ['Sales reports', 'Sales for any date range on the web. Profit, margin, and top products on Full.'],
        ['Several outlets', 'Today’s cash in and out for every outlet, live. Up to 2 outlets on Standard, 5 on Full.'],
        ['Stock and cost of goods', 'On Standard and Full, recipes lower ingredient stock as you sell and give the cost of each item.'],
        ['Customers and points', 'A points programme with rewards your regulars can redeem.'],
        ['Staff with their own PIN', 'Each cashier signs in with a PIN and works in shifts, so every sale has a name on it.'],
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
    body: 'Our customers ring up sales on it every day. The AI assistant we are building will read from the same records, so its answers come from your real sales.',
    points: [
      ['Sales reports', 'See your sales total and trend for any date range.'],
      ['Best-selling products', 'On Full, see which products sell most and the gross profit on each.'],
      ['Works when the internet drops', 'Keep recording cash and confirmed transfer sales. Everything syncs when the connection is back.'],
      ['Every outlet in one place', 'See today’s cash in and out for each outlet from one dashboard.'],
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
    body: 'Pay monthly, or yearly on Standard and Full to save 10%. Move up a plan whenever your business grows.',
    ai: 'The AI assistant is in development and not part of any plan yet.',
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
        a: 'No. When the assistant launches, you ask the way you would ask a friend, for example “Which menu sold most this week?”, and it answers in plain language, with the numbers.',
      },
      {
        q: 'Where will the answers come from?',
        a: 'From the sales and products recorded in your Ansilum cashier app. Each answer is designed to show the period and the numbers it used, so you can check it yourself.',
      },
      {
        q: 'When can I use the AI assistant?',
        a: 'We are preparing the AI assistant for Ansilum customers now. The cashier app and sales reports are ready to use today. In a demo, we show you the assistant with sample data.',
      },
      {
        q: 'What if the internet goes down?',
        a: 'Keep recording cash and confirmed transfer sales on a prepared device. Sales sync when the connection comes back. Recording QRIS payments, the web dashboard, and the AI assistant need internet.',
      },
      {
        q: 'Can customers pay with QRIS?',
        a: 'Yes, with your own QRIS code. Ansilum records the QRIS payment on the bill while you are online. It does not create QR codes or move money for you.',
      },
      {
        q: 'How many outlets can I have?',
        a: 'Basic covers 1 business with 1 outlet. Standard covers up to 2 businesses and 2 outlets in total, and Full up to 5 of each. No plan limits staff, products, or cashier devices.',
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
    title: 'Aplikasi kasir untuk UMKM Indonesia',
    description:
      'Ansilum adalah aplikasi kasir untuk UMKM Indonesia. Catat setiap penjualan, tetap jualan saat internet mati, dan baca penjualan Anda di web. Asisten AI yang menjawab dari angka Anda sendiri sedang dikembangkan.',
  },
  hero: {
    headline: 'Ubah penjualan harian menjadi langkah usaha berikutnya.',
    supporting:
      'Ansilum adalah aplikasi kasir untuk UMKM Indonesia. Catat setiap penjualan, bahkan saat internet mati, dan baca penjualan Anda di web. Berikutnya, asisten AI yang bisa ditanya soal usaha Anda dan menjawab dari angka Anda sendiri.',
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
        body: 'Penjualan otomatis terjumlah per hari dan per outlet di dasbor web Anda.',
      },
      {
        title: 'Segera: tanya dengan bahasa sendiri',
        body: 'Asisten yang sedang kami bangun akan menjawab “Kenapa penjualan minggu ini turun?” dengan angkanya dan apa yang perlu dicek.',
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
        body: 'Pilih menu, atur tingkat gula atau tambah shot, lalu terima pembayaran. Tunai dan transfer yang sudah dikonfirmasi tersimpan dulu di tablet, jadi kasir tetap jalan saat internet putus. Pembayaran QRIS dicatat saat online.',
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
        body: 'Di paket Full: produk terlaris, laba kotor setelah biaya bahan, dan jam-jam yang butuh tambahan tenaga.',
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
        ['Kasir di tablet atau HP', 'Pilihan menu dan catatan, tagihan terbuka, diskon, pajak, dan biaya layanan.'],
        ['Tetap jalan saat offline', 'Penjualan tunai dan transfer terkonfirmasi tetap tercatat dan tersinkron begitu internet kembali.'],
        ['Struk dan printer', 'Struk dan tiket dapur ke printer thermal Bluetooth, jaringan, atau USB, 58 atau 80 mm.'],
        ['Laporan penjualan', 'Penjualan per periode di web. Laba, margin, dan produk terlaris di paket Full.'],
        ['Banyak outlet', 'Kas masuk dan keluar tiap outlet hari ini, langsung. Hingga 2 outlet di Standard, 5 di Full.'],
        ['Stok bahan dan HPP', 'Di paket Standard dan Full, resep mengurangi stok bahan setiap ada penjualan dan menghitung modal tiap menu.'],
        ['Pelanggan dan poin', 'Program poin dengan hadiah yang bisa ditukar pelanggan setia.'],
        ['Karyawan dengan PIN', 'Setiap kasir masuk dengan PIN sendiri dan bekerja per shift, jadi setiap penjualan tercatat atas namanya.'],
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
    body: 'Pelanggan kami mencatat penjualan dengannya setiap hari. Asisten AI yang sedang kami bangun akan membaca catatan yang sama, jadi jawabannya berasal dari penjualan Anda yang sebenarnya.',
    points: [
      ['Laporan penjualan', 'Lihat total dan tren penjualan untuk periode mana pun.'],
      ['Produk terlaris', 'Di paket Full, lihat produk yang paling laku dan laba kotor dari masing-masing.'],
      ['Tetap jalan saat internet putus', 'Penjualan tunai dan transfer terkonfirmasi tetap tercatat. Data tersinkron begitu internet kembali.'],
      ['Semua outlet di satu tempat', 'Pantau kas masuk dan keluar tiap outlet hari ini dari satu dasbor.'],
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
    body: 'Bayar bulanan, atau tahunan untuk Standard dan Full agar hemat 10%. Naik paket kapan saja saat usaha berkembang.',
    ai: 'Asisten AI sedang dikembangkan dan belum termasuk dalam paket mana pun.',
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
        a: 'Tidak. Saat asisten diluncurkan, Anda cukup bertanya seperti bertanya ke teman, misalnya “Menu apa yang paling laku minggu ini?”, dan asisten menjawab dengan bahasa sederhana, lengkap dengan angkanya.',
      },
      {
        q: 'Jawabannya akan berasal dari mana?',
        a: 'Dari penjualan dan produk yang tercatat di aplikasi kasir Ansilum Anda. Setiap jawaban dirancang untuk menunjukkan periode dan angka yang dipakai, jadi Anda bisa mengeceknya sendiri.',
      },
      {
        q: 'Kapan asisten AI bisa saya pakai?',
        a: 'Asisten AI sedang kami siapkan untuk pelanggan Ansilum. Aplikasi kasir dan laporan penjualan sudah bisa dipakai hari ini. Saat demo, kami tunjukkan asistennya dengan data contoh.',
      },
      {
        q: 'Bagaimana kalau internet mati?',
        a: 'Penjualan tunai dan transfer terkonfirmasi tetap bisa dicatat di perangkat yang sudah disiapkan. Data tersinkron saat internet kembali. Pencatatan pembayaran QRIS, dasbor web, dan asisten AI membutuhkan internet.',
      },
      {
        q: 'Apakah pelanggan bisa bayar dengan QRIS?',
        a: 'Bisa, dengan kode QRIS milik Anda sendiri. Ansilum mencatat pembayaran QRIS pada tagihan selama online. Ansilum tidak membuat kode QR dan tidak memproses uangnya.',
      },
      {
        q: 'Berapa outlet yang bisa saya punya?',
        a: 'Basic untuk 1 usaha dengan 1 outlet. Standard hingga 2 usaha dan total 2 outlet, dan Full hingga 5 usaha dan 5 outlet. Tidak ada paket yang membatasi karyawan, produk, atau perangkat kasir.',
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
