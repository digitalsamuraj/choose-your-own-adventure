import "./globals.css";

export const metadata = {
  title: "Choose Your Own Adventure",
  description: "An interactive text adventure game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
