/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Earlier public URLs. Unprefixed paths without an entry here are localized by the middleware.
    const legacy = [
      ['/company', '/about'],
      ['/our-products', '/product'],
      ['/products/ansilum', '/product'],
      ['/intelligence', '/product'],
      ['/contactus', '/demo'],
      ['/term-of-service', '/privacy'],
      ['/blog', '/updates'],
      ['/blog/:slug*', '/updates'],
      ['/feed.xml', '/updates'],
    ]
    return legacy.flatMap(([source, destination]) => [
      { source, destination: `/id${destination}`, permanent: true },
      {
        source: `/:locale(en|id)${source}`,
        destination: `/:locale${destination}`,
        permanent: true,
      },
    ])
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
