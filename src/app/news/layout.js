export const metadata = {
  title: "XDefiant Italia - News",
  description: "Rimani aggiornato su tutte le novità di XDefiant con gli articoli esclusivi di XDefiant Italia. Scopri le ultime news, aggiornamenti e approfondimenti sul tuo gioco preferito!",
};


export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
