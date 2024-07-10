// import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import "./globals.css";
import siteConfig from "../../siteConfig.json"
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";

const schemaSite = {
  '@context': 'https://schema.org',
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


export const metadata = {
  title: "XDefiant Italia - Community Italiana",
  description: "Community italiana di XDefiant dal 2021. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei",
  keywords: ['xdefiant', 'xdefiant italia', 'ubisoft italia', 'ubisoft'],
  openGraph: {
    title: 'XDefiant Italia',
    description: 'Community italiana di XDefiant dal 2021. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei',
    url: siteConfig.site.baseUri,
    siteName: 'XDefiant Italia - Community',
    images: [
      {
        url: `${siteConfig.site.baseUri}metadata/backgroundOg.jpg`, // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: `${siteConfig.site.baseUri}metadata/backgroundOg.jpg`, // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Background XDefiant Italia',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaSite),
        }}
      />
      <body>{children}</body>
      <GoogleAnalytics gaId="G-4YW7FLVCPY" />
    </html>
  );
}
