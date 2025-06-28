import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Choose Your Own Adventure - Lone Wolf",
  description:
    "Interactive Choose Your Own Adventure game based on the Lone Wolf series",
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
