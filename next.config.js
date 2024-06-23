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
}

module.exports = nextConfig
