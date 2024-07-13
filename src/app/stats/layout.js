export const metadata = {
  title: "XDefiant Italia - Tracker",
  description: "Tracker per le tue statistiche di XDefiant in Italiano",
};


export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
