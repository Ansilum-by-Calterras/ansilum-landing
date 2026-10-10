import type { Locale } from '@/i18n/config'

const en = {
  skipLink: 'Skip to main content',
  homeLabel: 'Ansilum, home',
  nav: [
    { name: 'Product', href: '/product' },
    { name: 'How it works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Updates', href: '/updates' },
    { name: 'About', href: '/about' },
  ],
  navLabel: 'Main navigation',
  mobileNavLabel: 'Mobile navigation',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  languageLabel: 'Language',
  switchTo: 'Baca dalam Bahasa Indonesia',
  signIn: 'Sign in',
  requestDemo: "Let's Talk",
  footer: {
    tagline:
      'A cashier app with an AI assistant for Indonesian small businesses.',
    builder:
      'Ansilum started in March 2024. It is built by Calterras, a founder-led software venture in Indonesia.',
    groups: [
      {
        title: 'Ansilum',
        links: [
          ['Product', '/product'],
          ['How it works', '/#how-it-works'],
          ['Pricing', '/pricing'],
          ['Updates', '/updates'],
        ],
      },
      {
        title: 'Company',
        links: [
          ['About Ansilum & Calterras', '/about'],
          ['Request a demo', '/demo'],
        ],
      },
      {
        title: 'Information',
        links: [
          ['Privacy', '/privacy'],
          ['Terms', '/terms'],
          ['Security', '/security'],
        ],
      },
    ],
    contact: 'Contact',
    rights: 'Calterras. Ansilum is a Calterras product.',
    madeIn: 'Built in Indonesia',
  },
  finalCta: {
    heading: "Let's talk about your business.",
    body: 'Tell us how you sell today. We will show you the cashier app and the AI assistant, and work out together what fits your business.',
    note: 'Free, and it does not start a subscription.',
  },
}

export type CommonContent = typeof en

const id: CommonContent = {
  skipLink: 'Lewati ke konten utama',
  homeLabel: 'Ansilum, beranda',
  nav: [
    { name: 'Produk', href: '/product' },
    { name: 'Cara kerja', href: '/#how-it-works' },
    { name: 'Harga', href: '/pricing' },
    { name: 'Kabar terbaru', href: '/updates' },
    { name: 'Tentang', href: '/about' },
  ],
  navLabel: 'Navigasi utama',
  mobileNavLabel: 'Navigasi seluler',
  openMenu: 'Buka menu',
  closeMenu: 'Tutup menu',
  languageLabel: 'Bahasa',
  switchTo: 'Read in English',
  signIn: 'Masuk',
  requestDemo: "Mari Ngobrol",
  footer: {
    tagline: 'Aplikasi kasir dengan asisten AI untuk UMKM Indonesia.',
    builder:
      'Ansilum dimulai pada Maret 2024 dan dikembangkan oleh Calterras, usaha software dari Indonesia yang dipimpin founder.',
    groups: [
      {
        title: 'Ansilum',
        links: [
          ['Produk', '/product'],
          ['Cara kerja', '/#how-it-works'],
          ['Harga', '/pricing'],
          ['Kabar terbaru', '/updates'],
        ],
      },
      {
        title: 'Perusahaan',
        links: [
          ['Tentang Ansilum & Calterras', '/about'],
          ['Minta demo', '/demo'],
        ],
      },
      {
        title: 'Informasi',
        links: [
          ['Privasi', '/privacy'],
          ['Ketentuan', '/terms'],
          ['Keamanan', '/security'],
        ],
      },
    ],
    contact: 'Kontak',
    rights: 'Calterras. Ansilum adalah produk Calterras.',
    madeIn: 'Dibuat di Indonesia',
  },
  finalCta: {
    heading: 'Mari bahas kebutuhan usaha Anda.',
    body: 'Ceritakan cara Anda berjualan. Kami tunjukkan aplikasi kasir dan asisten AI-nya, lalu kita cari bersama yang paling cocok untuk usaha Anda.',
    note: 'Gratis, dan tidak memulai langganan.',
  },
}

export const commonContent: Record<Locale, CommonContent> = { en, id }
