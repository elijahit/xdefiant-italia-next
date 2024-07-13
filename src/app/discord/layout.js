export const metadata = {
  title: "XDefiant Italia - Discord",
  description: "Discord Italiano di XDefiant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
