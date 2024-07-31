/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

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
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "https://playxdefiant.it" }, // Sostituisci con il tuo dominio effettivo
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                {
                  key: 'Content-Security-Policy',
                  value: cspHeader.replace(/\n/g, ''),
                },
                {
                  key: 'Referrer-Policy',
                  value: 'origin-when-cross-origin'
                },
            ]
        }
    ];
}
}

module.exports = nextConfig
