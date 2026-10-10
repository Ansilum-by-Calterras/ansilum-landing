import type { Locale } from '@/i18n/config'
import type { SocialId } from '@/components/site/site-footer'

type Social = { id: SocialId; label: string; href: string }

const en = {
  skipLink: 'Skip to main content',
  homeLogo: 'Ansilum',
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
    company: {
      title: 'Contact',                        // id: 'Kontak'
      legalName: 'PT Cendekia Langit Tanah Sentosa', // TODO: registered company name
      addressLines: [                           // TODO: real office address
        'Jl. Jetis Kulon VI No.20',
        'Wonokromo, Surabaya',
        'Jawa Timur 60243, Indonesia',
      ],
      channels: [
        // TODO: replace values and hrefs, remove or add channels as needed
        { label: 'Email', value: 'support@ansilum.com', href: 'mailto:support@ansilum.com' },
        { label: 'Phone', value: '+62 878 8674 3544', href: 'tel:+6287886743544' },
        {
          label: 'WhatsApp',
          value: '+62 878 8674 3544',
          href: 'https://wa.me/6287886743544',
          external: true,
        },
      ]
    },
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
    socialsLabel: 'Follow us',
    socials: [
      { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/ansilum.id' },
      { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/ansilum' },
      { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/ansilum' },
      { id: 'x', label: 'X', href: 'https://x.com/ansilum' },
    ] satisfies Social[]
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
  homeLogo: 'Ansilum',
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
    company: {
      title: 'Kontak',
      legalName: 'PT Cendekia Langit Tanah Sentosa', // TODO: nama resmi perusahaan
      addressLines: [                                 // TODO: alamat kantor sebenarnya
        'Jl. Jetis Kulon VI No.20',
        'Wonokromo, Surabaya',
        'Jawa Timur 60243, Indonesia',
      ],
      channels: [
        // TODO: ganti nilai dan href, hapus atau tambah kanal sesuai kebutuhan
        { label: 'Email', value: 'support@ansilum.com', href: 'mailto:support@ansilum.com' },
        { label: 'Telepon', value: '+62 878 8674 3544', href: 'tel:+6287886743544' },
        {
          label: 'WhatsApp',
          value: '+62 878 8674 3544',
          href: 'https://wa.me/6287886743544',
          external: true,
        },
      ]
    },
    tagline:
      'Aplikasi kasir dengan asisten AI untuk usaha kecil di Indonesia.',
    builder:
      'Ansilum dimulai pada Maret 2024. Dibangun oleh Calterras, perusahaan perangkat lunak yang dipimpin pendirinya di Indonesia.',
    groups: [
      {
        title: 'Ansilum',
        links: [
          ['Produk', '/product'],
          ['Cara kerja', '/#how-it-works'],
          ['Harga', '/pricing'],
          ['Pembaruan', '/updates'],
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
          ['Syarat & Ketentuan', '/terms'],
          ['Keamanan', '/security'],
        ],
      },
    ],
    contact: 'Kontak',
    rights: 'Calterras. Ansilum adalah produk Calterras.',
    madeIn: 'Dibuat di Indonesia',
    socialsLabel: 'Ikuti kami',
    socials: [
      // TODO: ganti dengan URL profil sebenarnya
      { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/ansilum' },
      { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/ansilum' },
      { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/ansilum' },
      { id: 'x', label: 'X', href: 'https://x.com/ansilum' },
    ] satisfies Social[]
  },
  finalCta: {
    heading: 'Mari bahas kebutuhan usaha Anda.',
    body: 'Ceritakan cara Anda berjualan. Kami tunjukkan aplikasi kasir dan asisten AI-nya, lalu kita cari bersama yang paling cocok untuk usaha Anda.',
    note: 'Gratis, dan tidak memulai langganan.',
  },
}

export const commonContent: Record<Locale, CommonContent> = { en, id }
