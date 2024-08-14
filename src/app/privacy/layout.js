import siteConfig from "../../../siteConfig.json"


export const metadata = {
  title: "XDefiant Italia - Privacy",
  description: "Scopri tutto sulla privacy policy che viene adottata in XDefiant Italia!",
  openGraph: {
    title: 'XDefiant Italia - Privacy',
    description: 'Scopri tutto sulla privacy policy che viene adottata in XDefiant Italia!',
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
