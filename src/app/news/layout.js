import { schemaSite } from "../layout";

export const metadata = {
  title: "XDefiant Italia - News",
};

schemaSite = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "url": "https://playxdefiant.it/news",
  "image": '/header-images/logo.webp',
  "name": "XDefiant Italia - News",
  "description": "Notizie sul gioco di XDefiant e approfondimenti forniti dalla redazione di XDefiant Italia",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://playxdefiant.it",
    "name": "XDefiant Italia"
  },
  "publisher": {
    '@type': 'Organization',
    'name': 'XDefiant Italia',
    'logo': '/header-images/logo.webp',
    'keywords': 'xdefiant italia, xdefiant, news xdefiant italia, news, tornei, community, discord',
    'founder': [{
      '@type': 'Person',
      'name': 'Gabriele Mario Tosto',
      'description': 'CEO e Developer di XDefiant Italia, lavora attualmente come sviluppatore attivo.',
      'jobTitle': 'Software Engineer',
      'givenName': 'Gabriele',
      'email': 'gabriele.tosto@outlook.com'
    }]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
