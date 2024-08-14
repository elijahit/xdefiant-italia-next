import siteConfig from "../../../siteConfig.json"


export const metadata = {
  title: "XDefiant Italia - News",
  description: "Rimani aggiornato su tutte le novità di XDefiant con gli articoli esclusivi di XDefiant Italia. Scopri le ultime news, aggiornamenti e approfondimenti sul tuo gioco preferito!",
  openGraph: {
    title: 'XDefiant Italia - News',
    description: 'Rimani aggiornato su tutte le novità di XDefiant con gli articoli esclusivi di XDefiant Italia. Scopri le ultime news, aggiornamenti e approfondimenti sul tuo gioco preferito!',
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
