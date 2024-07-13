export const metadata = {
  title: "XDefiant Italia - News",
  description: "Tutte le novità di XDefiant scritte da XDefiant Italia",
};


export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
