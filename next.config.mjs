/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/company', destination: '/about', permanent: true },
      {
        source: '/our-products',
        destination: '/products/ansilum',
        permanent: true,
      },
      { source: '/contactus', destination: '/demo', permanent: true },
      { source: '/term-of-service', destination: '/privacy', permanent: true },
      { source: '/feed.xml', destination: '/blog/feed.xml', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}
export default nextConfig
