// import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import "./globals.css";
import siteConfig from "../../siteConfig.json"
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
import GoogleAdsense from '../../components/GoogleAdsense';
import Clarity from '../../components/Clarity';


export const metadata = {
  title: "XDefiant Italia",
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
      <GoogleAdsense pId={5871152138430543}/>
      <Clarity/>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-4YW7FLVCPY" />
    </html>
  );
}
