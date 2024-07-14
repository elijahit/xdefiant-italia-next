import siteConfig from "../../../siteConfig.json"

export const metadata = {
  title: "XDefiant Italia - Tracker",
  description: "Tracker per le tue statistiche di XDefiant in Italiano",
  keywords: ['xdefiant tracker', 'xdefiant italia', 'ubisoft italia', 'ubisoft', 'xdefiant stats'],
  openGraph: {
    title: 'XDefiant Italia - Tracker',
    description: 'Tracker per le tue statistiche di XDefiant in Italiano',
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
