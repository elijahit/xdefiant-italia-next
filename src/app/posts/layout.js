// import { Inter } from "next/font/google";


export const metadata = {
  title: "XDefiant Italia - Chi siamo",
  description: "Scopri XDefiant Italia, la comunità italiana dedicata al frenetico sparatutto di Ubisoft. Unisciti a noi per condividere strategie, partecipare a tornei e rimanere aggiornato sulle ultime novità di XDefiant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
