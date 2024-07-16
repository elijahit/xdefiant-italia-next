import siteConfig from "../../../siteConfig.json"

export const metadata = {
  title: "XDefiant Italia - Tracker",
  description: "Monitora le tue statistiche di XDefiant con il nostro tracker avanzato. Visualizza performance dettagliate, confronta risultati con gli amici e migliora il tuo gameplay. Raggiungi nuovi traguardi e scala le classifiche!",
  keywords: ['xdefiant tracker', 'xdefiant italia', 'ubisoft italia', 'ubisoft', 'xdefiant stats'],
  openGraph: {
    title: 'XDefiant Italia - Tracker',
    description: 'Monitora le tue statistiche di XDefiant con il nostro tracker avanzato. Visualizza performance dettagliate, confronta risultati con gli amici e migliora il tuo gameplay. Raggiungi nuovi traguardi e scala le classifiche!',
    url: siteConfig.site.baseUri,
    siteName: 'XDefiant Italia',
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
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
