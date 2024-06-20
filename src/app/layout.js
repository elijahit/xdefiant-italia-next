// import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import "./globals.css";


export const metadata = {
  title: "XDefiant Italia - Community Italiana",
  description: "Community italiana di XDefiant dal 2021. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei",
  keywords: ['xdefiant', 'xdefiant italia', 'ubisoft italia', 'ubisoft'],
  openGraph: {
    title: 'XDefiant Italia',
    description: 'Community italiana di XDefiant dal 2021. Su discord aggiorniamo i giocatori su novità, eventi e competizioni. Unisciti a noi per condividere esperienze, strategie e partecipare a tornei',
    url: 'https://playxdefiant.it/',
    siteName: 'XDefiant Italia - Community',
    images: [
      {
        url: 'http://localhost:3000/background-metadata/backgroundOg.jpg', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'http://localhost:3000/background-metadata/backgroundOg.jpg', // Must be an absolute URL
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
