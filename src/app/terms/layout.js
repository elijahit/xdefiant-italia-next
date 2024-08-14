export const metadata = {
  title: "XDefiant Italia - Termini di Servizio",
  description: "Scopri tutto sui termini di servizio adottati da XDefiant Italia!",
  openGraph: {
    title: 'XDefiant Italia - Termini di Servizio',
    description: 'Scopri tutto sui termini di servizio adottati da XDefiant Italia!',
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
