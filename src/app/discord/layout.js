import siteConfig from "../../../siteConfig.json"

export const metadata = {
  title: "XDefiant Italia - Discord",
  description: "Unisciti al Discord italiano di XDefiant per connetterti con altri giocatori, discutere strategie, ricevere aggiornamenti e partecipare a eventi esclusivi. Entra nella nostra community e vivi XDefiant al massimo!",
  openGraph: {
    title: 'XDefiant Italia - Discord',
    description: 'Unisciti al Discord italiano di XDefiant per connetterti con altri giocatori, discutere strategie, ricevere aggiornamenti e partecipare a eventi esclusivi. Entra nella nostra community e vivi XDefiant al massimo!',
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
      <body>{children}</body>
    </html>
  );
}
