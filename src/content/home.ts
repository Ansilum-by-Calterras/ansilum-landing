import type { Locale } from '@/i18n/config'

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
