/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.playxdefiant.it',
          },
        ],
        destination: 'https://playxdefiant.it/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://playxdefiant.it/:path*',
      },
    ]
  },
}

module.exports = nextConfig
